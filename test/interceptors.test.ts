import test from 'ava';
import { CallOptions, Metadata } from 'nice-grpc';
import { ServiceAccount } from '../src/credentials/service-account';
import { createAuthClient } from '../src/grpc/clients';
import { createAccessTokenInterceptor, createServiceAccountInterceptor } from '../src/grpc/interceptors';
import { apiEndpoint, personalAccessToken, serviceAccountJson } from './test-data';

test('access token interceptor - create interceptor', (t) => {
  const interceptor = createAccessTokenInterceptor('asdf');
  t.truthy(interceptor);
  t.true(interceptor instanceof Function);
});

test('access token interceptor - attach token to call', async (t) => {
  const interceptor = createAccessTokenInterceptor('asdf');
  const options: CallOptions = {};
  const call = {
    next: async function* () {},
  } as any;

  for await (const _ of interceptor(call, options)) {
  }

  t.truthy(options.metadata);
  t.true(options.metadata?.has('authorization'));
  t.is(options.metadata?.get('authorization'), 'Bearer asdf');
});

test('access token interceptor - ignore if call already has auth header', async (t) => {
  const interceptor = createAccessTokenInterceptor('asdf');
  const options: CallOptions = { metadata: new Metadata({ authorization: 'Bearer foobar' }) };
  const call = {
    next: async function* () {},
  } as any;

  for await (const _ of interceptor(call, options)) {
  }

  t.truthy(options.metadata);
  t.true(options.metadata?.has('authorization'));
  t.is(options.metadata?.get('authorization'), 'Bearer foobar');
});

test('access token interceptor - allow client to fetch a profile', async (t) => {
  const client = createAuthClient(apiEndpoint, createAccessTokenInterceptor(personalAccessToken));
  const response = await client.getMyUser({});
  t.truthy(response);
  t.is(response.user?.userName, 'Zitadel Lib');
});

test('service account interceptor - create interceptor', (t) => {
  const sa = ServiceAccount.fromJson(serviceAccountJson);
  const interceptor = createServiceAccountInterceptor(apiEndpoint, sa);
  t.truthy(interceptor);
  t.true(interceptor instanceof Function);
});

test('service account interceptor - attach token to call', async (t) => {
  const sa = ServiceAccount.fromJson(serviceAccountJson);
  const interceptor = createServiceAccountInterceptor(apiEndpoint, sa);
  const options: CallOptions = {};
  const call = {
    next: async function* () {},
  } as any;
  for await (const _ of interceptor(call, options)) {
  }

  t.truthy(options.metadata);
  t.true(options.metadata?.has('authorization'));
  t.truthy(options.metadata?.get('authorization'));
});

test('service account interceptor - ignore if call already has auth header', async (t) => {
  const sa = ServiceAccount.fromJson(serviceAccountJson);
  const interceptor = createServiceAccountInterceptor(apiEndpoint, sa);
  const options: CallOptions = { metadata: new Metadata({ authorization: 'Bearer foobar' }) };
  const call = {
    next: async function* () {},
  } as any;

  for await (const _ of interceptor(call, options)) {
  }

  t.truthy(options.metadata);
  t.true(options.metadata?.has('authorization'));
  t.is(options.metadata?.get('authorization'), 'Bearer foobar');
});

test('service account interceptor - allow client to fetch a profile', async (t) => {
  const sa = ServiceAccount.fromJson(serviceAccountJson);
  const client = createAuthClient(apiEndpoint, createServiceAccountInterceptor(apiEndpoint, sa, { apiAccess: true }));
  const response = await client.getMyUser({});
  t.truthy(response);
  t.is(response.user?.userName, 'Zitadel Lib');
});
