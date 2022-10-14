import { CallOptions, ClientMiddleware, ClientMiddlewareCall } from 'nice-grpc';
import { Metadata } from 'nice-grpc-common';
import { AuthenticationOptions, ServiceAccount } from '../credentials/service-account';

/**
 * Create a simple gRPC `Interceptor` that attaches a given access token to any request
 * a client sends. The token is attached with the `Bearer` auth-scheme.
 *
 * The access token may be any valid access token for ZITADEL. A token
 * can be fetched with service account
 * credentials or you may create a `Personal Access Token` for a service account
 * in the ZITADEL console. Also, you could also use access tokens that are
 * passed from users.
 *
 * The interceptor does not insert the access token if the intercepted call
 * already has an `Authorization` header.
 *
 * @param token The access token that should be added to the gRPC request.
 *
 * @returns A gRPC client middleware (interceptor) that attaches the given token to each request, if no other authorization header is present.
 */
export const createAccessTokenInterceptor = (token: string): ClientMiddleware =>
  async function* <Request, Response>(call: ClientMiddlewareCall<Request, Response>, options: CallOptions) {
    options.metadata ??= new Metadata();
    if (!options.metadata.has('authorization')) {
      options.metadata.set('authorization', `Bearer ${token}`);
    }
    return yield* call.next(call.request, options);
  };

/**
 * Create a gRPC `Interceptor` that authenticates the service client calls
 * with the given service account.
 *
 * When no access token is available, the interceptor will fetch a new
 * token from the given audience (sometimes also called issuer) with
 * the - optionally - provided authentication options. If the options
 * are omitted, the default options will be used.
 *
 * When a token was fetched, the interceptor will only fetch a new token
 * when the lifetime of the token has expired (default 60 minutes).
 *
 * @param audience The audience to authenticate the service account against.
 * @param serviceAccount The service account that authenticates against ZITADEL.
 * @param authOptions Optional authentication options like additional scopes or API ACCESS.
 *
 * @returns A gRPC client middleware (interceptor) that fetches an access token for a given service account and attaches it to each request, if no other authorization header is present.
 *
 * @example Create a client with an interceptor for a service account
 * ```typescript
 * const serviceAccount = ServiceAccount.fromJson({...});
 * const apiEndpoint = 'https://my-zitadel-instance.zitadel.cloud';
 * const client = createAuthClient(
 *   apiEndpoint,
 *   createServiceAccountInterceptor(apiEndpoint, serviceAccount)
 * );
 * await client.getMyUser({}); // this call will not work since no "api access" is granted
 * ```
 *
 * @example Create a client with an interceptor that has API access
 * ```typescript
 * const serviceAccount = ServiceAccount.fromJson({...});
 * const apiEndpoint = 'https://my-zitadel-instance.zitadel.cloud';
 * const client = createAuthClient(
 *   apiEndpoint,
 *   createServiceAccountInterceptor(apiEndpoint, serviceAccount, { apiAccess: true })
 * );
 * await client.getMyUser({});
 * ```
 */
export const createServiceAccountInterceptor = (
  audience: string,
  serviceAccount: ServiceAccount,
  authOptions?: AuthenticationOptions
): ClientMiddleware => {
  let token: string | undefined;
  let expiryDate = new Date(0);

  return async function* <Request, Response>(call: ClientMiddlewareCall<Request, Response>, options: CallOptions) {
    options.metadata ??= new Metadata();
    if (!options.metadata.has('authorization')) {
      if (expiryDate < new Date()) {
        token = await serviceAccount.authenticate(audience, authOptions);
        expiryDate.setTime(new Date().getTime() + 59 * 60 * 1000);
      }
      options.metadata.set('authorization', `Bearer ${token}`);
    }
    return yield* call.next(call.request, options);
  };
};
