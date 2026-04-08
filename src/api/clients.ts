import { ClientMiddleware, createChannel, createClientFactory } from 'nice-grpc';
import { AdminServiceClient, AdminServiceDefinition } from './generated/zitadel/admin.js';
import { AuthServiceClient, AuthServiceDefinition } from './generated/zitadel/auth.js';
import { ManagementServiceClient, ManagementServiceDefinition } from './generated/zitadel/management.js';
import { OIDCServiceClient, OIDCServiceDefinition } from './generated/zitadel/oidc/v2/oidc_service.js';
import { OrganizationServiceClient, OrganizationServiceDefinition } from './generated/zitadel/org/v2/org_service.js';
import { SessionServiceClient, SessionServiceDefinition } from './generated/zitadel/session/v2/session_service.js';
import { SettingsServiceClient, SettingsServiceDefinition } from './generated/zitadel/settings/v2/settings_service.js';
import { SystemServiceClient, SystemServiceDefinition } from './generated/zitadel/system.js';
import { UserServiceClient, UserServiceDefinition } from './generated/zitadel/user/v2/user_service.js';
import { ProjectServiceClient, ProjectServiceDefinition } from './generated/zitadel/project/v2/project_service.js';
import { ActionServiceClient, ActionServiceDefinition } from './generated/zitadel/action/v2/action_service.js';
import { ApplicationServiceClient, ApplicationServiceDefinition } from './generated/zitadel/application/v2/application_service.js';
import { AuthorizationServiceClient, AuthorizationServiceDefinition } from './generated/zitadel/authorization/v2/authorization_service.js';
import { FeatureServiceClient, FeatureServiceDefinition } from './generated/zitadel/feature/v2/feature_service.js';
import { GroupServiceClient, GroupServiceDefinition } from './generated/zitadel/group/v2/group_service.js';
import { IdentityProviderServiceClient, IdentityProviderServiceDefinition } from './generated/zitadel/idp/v2/idp_service.js';
import { InstanceServiceClient, InstanceServiceDefinition } from './generated/zitadel/instance/v2/instance_service.js';
import { InternalPermissionServiceClient, InternalPermissionServiceDefinition } from './generated/zitadel/internal_permission/v2/internal_permission_service.js';
import { SAMLServiceClient, SAMLServiceDefinition } from './generated/zitadel/saml/v2/saml_service.js';
import { WebKeyServiceClient, WebKeyServiceDefinition } from './generated/zitadel/webkey/v2/webkey_service.js';

/**
 * Create a new gRPC service client for the Admin API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the Admin API of ZITADEL.
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
 * Create a new gRPC service client for the Auth API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the Auth API of ZITADEL.
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
 * Create a new gRPC service client for the Management API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the Management API of ZITADEL.
 */
export function createManagementClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): ManagementServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(ManagementServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the OIDC API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the OIDC API of ZITADEL.
 */
export function createOidcClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): OIDCServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(OIDCServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the organization API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the organization API of ZITADEL.
 */
export function createOrganizationClient(
  apiEndpoint: string,
  ...interceptors: ClientMiddleware[]
): OrganizationServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(OrganizationServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the session API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the session API of ZITADEL.
 */
export function createSessionClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): SessionServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(SessionServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the settings API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the settings API of ZITADEL.
 */
export function createSettingsClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): SettingsServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(SettingsServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the system API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the system API of ZITADEL.
 */
export function createSystemClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): SystemServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(SystemServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the user API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the user API of ZITADEL.
 */
export function createUserClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): UserServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(UserServiceDefinition, channel);
}


/**
 * Create a new gRPC service client for the action API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the user API of ZITADEL.
 */
export function createActionServiceClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): ActionServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(ActionServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the application API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the user API of ZITADEL.
 */
export function createApplicationServiceClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): ApplicationServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(ApplicationServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the authorization API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the user API of ZITADEL.
 */
export function createAuthorizationServiceClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): AuthorizationServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(AuthorizationServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the feature API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the user API of ZITADEL.
 */
export function createFeatureServiceClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): FeatureServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(FeatureServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the group API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the user API of ZITADEL.
 */
export function createGroupServiceClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): GroupServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(GroupServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the identity API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the user API of ZITADEL.
 */
export function createIdentityProviderServiceClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): IdentityProviderServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(IdentityProviderServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the instance API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the user API of ZITADEL.
 */
export function createInstanceServiceClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): InstanceServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(InstanceServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the internal permission API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the user API of ZITADEL.
 */
export function createInternalPermissionServiceClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): InternalPermissionServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(InternalPermissionServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the saml API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the user API of ZITADEL.
 */
export function createSAMLServiceClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): SAMLServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(SAMLServiceDefinition, channel);
}

/**
 * Create a new gRPC service client for the webkey API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the user API of ZITADEL.
 */
export function createWebKeyServiceClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): WebKeyServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(WebKeyServiceDefinition, channel);
}


/**
 * Create a new gRPC service client for the project API of ZITADEL.
 * The client can be configured with multiple client interceptors. For authentication interceptors,
 * see the interceptors in this package.
 *
 * @param apiEndpoint The API endpoint of your ZITADEL instance.
 * @param interceptors A list of interceptors that should be used for the client.
 *
 * @returns A new gRPC service client for the user API of ZITADEL.
 */
export function createProjectServiceClient(apiEndpoint: string, ...interceptors: ClientMiddleware[]): ProjectServiceClient {
  const channel = createChannel(apiEndpoint);
  let factory = createClientFactory();
  for (const interceptor of interceptors) {
    factory = factory.use(interceptor);
  }
  return factory.create(ProjectServiceDefinition, channel);
}

