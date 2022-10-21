import test from 'ava';
import { createAdminClient, createAuthClient, createManagementClient } from '../src/grpc/clients';
import { apiEndpoint } from './test-data';

test('auth client - create client', (t) => {
  const client = createAuthClient(apiEndpoint);
  t.truthy(client);
});

test('auth client - call healthz endpoint', async (t) => {
  const client = createAuthClient(apiEndpoint);
  const response = await client.healthz({});
  t.deepEqual(response, {});
});

test('admin client - create client', (t) => {
  const client = createAdminClient(apiEndpoint);
  t.truthy(client);
});

test('admin client - call healthz endpoint', async (t) => {
  const client = createAdminClient(apiEndpoint);
  const response = await client.healthz({});
  t.deepEqual(response, {});
});

test('management client - create client', (t) => {
  const client = createManagementClient(apiEndpoint);
  t.truthy(client);
});

test('management client - call healthz endpoint', async (t) => {
  const client = createManagementClient(apiEndpoint);
  const response = await client.healthz({});
  t.deepEqual(response, {});
});
