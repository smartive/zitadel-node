import { ClientMiddleware, createChannel, createClientFactory } from 'nice-grpc';
import { AdminServiceClient, AdminServiceDefinition } from './generated/zitadel/admin';
import { AuthServiceClient, AuthServiceDefinition } from './generated/zitadel/auth';
import { ManagementServiceClient, ManagementServiceDefinition } from './generated/zitadel/management';

/**
 * Create a new gRPC service client for the [Admin API](https://docs.zitadel.com/docs/apis/proto/admin) of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the [Admin API](https://docs.zitadel.com/docs/apis/proto/admin) of ZITADEL.
 */
export function createAdminClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): AdminServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(AdminServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the [Auth API](https://docs.zitadel.com/docs/apis/proto/auth) of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the [Auth API](https://docs.zitadel.com/docs/apis/proto/auth) of ZITADEL.
 */
export function createAuthClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): AuthServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(AuthServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the [Management API](https://docs.zitadel.com/docs/apis/proto/management) of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the [Management API](https://docs.zitadel.com/docs/apis/proto/management) of ZITADEL.
 */
export function createManagementClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): ManagementServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(ManagementServiceDefinition, channel);
}
