import { CallOptions, Metadata } from 'nice-grpc';
import { ServiceAccount } from '../src/credentials/service-account';
import { createAuthClient } from '../src/grpc/clients';
import { createAccessTokenInterceptor, createServiceAccountInterceptor } from '../src/grpc/interceptors';
import { apiEndpoint, personalAccessToken, serviceAccountJson } from './test-data';

describe('access token interceptor', () => {
  test('create interceptor', () => {
    const interceptor = createAccessTokenInterceptor('asdf');
    expect(interceptor).toBeDefined();
    expect(interceptor).toBeInstanceOf(Function);
  });

  test('attach token to call', async () => {
    const interceptor = createAccessTokenInterceptor('asdf');
    const options: CallOptions = {};
    const call = {
      next: async function* () {},
    } as any;

    for await (const _ of interceptor(call, options)) {
    }

    expect(options.metadata).toBeDefined();
    expect(options.metadata?.has('authorization')).toBe(true);
    expect(options.metadata?.get('authorization')).toBe('Bearer asdf');
  });

  test('ignore if call already has auth header', async () => {
    const interceptor = createAccessTokenInterceptor('asdf');
    const options: CallOptions = { metadata: new Metadata({ authorization: 'Bearer foobar' }) };
    const call = {
      next: async function* () {},
    } as any;

    for await (const _ of interceptor(call, options)) {
    }

    expect(options.metadata).toBeDefined();
    expect(options.metadata?.has('authorization')).toBe(true);
    expect(options.metadata?.get('authorization')).toBe('Bearer foobar');
  });

  test('allow client to fetch a profile', async () => {
    const client = createAuthClient(apiEndpoint, createAccessTokenInterceptor(personalAccessToken));
    const response = await client.getMyUser({});
    expect(response).toBeDefined();
    expect(response.user?.userName).toBe('Zitadel Lib');
  });
});

describe('service account interceptor', () => {
  const sa = ServiceAccount.fromJson(serviceAccountJson);

  test('create interceptor', () => {
    const interceptor = createServiceAccountInterceptor(apiEndpoint, sa);
    expect(interceptor).toBeDefined();
    expect(interceptor).toBeInstanceOf(Function);
  });

  test('attach token to call', async () => {
    const interceptor = createServiceAccountInterceptor(apiEndpoint, sa);
    const options: CallOptions = {};
    const call = {
      next: async function* () {},
    } as any;

    for await (const _ of interceptor(call, options)) {
    }

    expect(options.metadata).toBeDefined();
    expect(options.metadata?.has('authorization')).toBe(true);
    expect(options.metadata?.get('authorization')).toBeTruthy;
  });

  test('ignore if call already has auth header', async () => {
    const interceptor = createServiceAccountInterceptor(apiEndpoint, sa);
    const options: CallOptions = { metadata: new Metadata({ authorization: 'Bearer foobar' }) };
    const call = {
      next: async function* () {},
    } as any;

    for await (const _ of interceptor(call, options)) {
    }

    expect(options.metadata).toBeDefined();
    expect(options.metadata?.has('authorization')).toBe(true);
    expect(options.metadata?.get('authorization')).toBe('Bearer foobar');
  });

  test('allow client to fetch a profile', async () => {
    const client = createAuthClient(apiEndpoint, createServiceAccountInterceptor(apiEndpoint, sa, { apiAccess: true }));
    const response = await client.getMyUser({});
    expect(response).toBeDefined();
    expect(response.user?.userName).toBe('Zitadel Lib');
  });
});
