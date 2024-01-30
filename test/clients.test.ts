import test from 'ava';
import {
  createAdminClient,
  createAuthClient,
  createManagementClient,
  createOidcClient,
  createOrganizationClient,
  createSessionClient,
  createSettingsClient,
  createSystemClient,
  createUserClient,
} from '../src/grpc/clients.js';
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

test('oidc client - create client', (t) => {
  const client = createOidcClient(apiEndpoint);
  t.truthy(client);
});

test('organization client - create client', (t) => {
  const client = createOrganizationClient(apiEndpoint);
  t.truthy(client);
});

test('session client - create client', (t) => {
  const client = createSessionClient(apiEndpoint);
  t.truthy(client);
});

test('settings client - create client', (t) => {
  const client = createSettingsClient(apiEndpoint);
  t.truthy(client);
});

test('system client - create client', (t) => {
  const client = createSystemClient(apiEndpoint);
  t.truthy(client);
});

test('user client - create client', (t) => {
  const client = createUserClient(apiEndpoint);
  t.truthy(client);
});
