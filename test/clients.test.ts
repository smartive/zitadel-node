import { createAdminClient, createAuthClient, createManagementClient } from '../src/grpc/clients';
import { apiEndpoint } from './test-data';

describe('auth client', () => {
  test('create client', () => {
    const client = createAuthClient(apiEndpoint);
    expect(client).toBeDefined();
  });

  test('call healthz endpoint', async () => {
    const client = createAuthClient(apiEndpoint);
    const response = await client.healthz({});
    expect(response).toEqual({});
  });
});

describe('admin client', () => {
  test('create client', () => {
    const client = createAdminClient(apiEndpoint);
    expect(client).toBeDefined();
  });

  test('call healthz endpoint', async () => {
    const client = createAdminClient(apiEndpoint);
    const response = await client.healthz({});
    expect(response).toEqual({});
  });
});

describe('management client', () => {
  test('create client', () => {
    const client = createManagementClient(apiEndpoint);
    expect(client).toBeDefined();
  });

  test('call healthz endpoint', async () => {
    const client = createManagementClient(apiEndpoint);
    const response = await client.healthz({});
    expect(response).toEqual({});
  });
});
