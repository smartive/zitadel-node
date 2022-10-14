import { importPKCS8, SignJWT } from 'jose';
import NodeRSA from 'node-rsa';
import { Issuer, TokenSet } from 'openid-client';

type ServiceAccountJson = {
  userId: string;
  keyId: string;
  key: string;
};

/**
 * Options for the authentication of a service account.
 * Define specific access options like ZITADEL API access or additional scopes
 * that should be attached to the returned access token.
 */
export type AuthenticationOptions = {
  /**
   * Whether the requested access token from ZITADEL will include the "ZITADEL API" project
   * in its audience. The returned token will be able to access the API on the service accounts
   * behalf. Essentially, this attaches the [apiAccessScope] to the token.
   */
  apiAccess?: boolean;

  /**
   * A list of required roles to add to the fetched token.
   * Translates to the role scope (`urn:zitadel:iam:org:project:role:{Role}`).
   */
  roles?: string[];

  /**
   * List of audiences that should be attached to the token.
   * Translates to the additional audience scope
   * (`urn:zitadel:iam:org:project:id:{ProjectId}:aud`).
   */
  projectAudiences?: string[];

  /**
   * List of arbitrary additional scopes that are concatenated into the scope.
   */
  additionalScopes?: string[];
};

/**
 * A service account for [ZITADEL](https://zitadel.ch/). The service
 * account can be loaded from a valid JSON string or from a file containing the JSON string.
 * The account is used to communicate with the ZITADEL API and may serve as access token
 * provider for a gRPC service client.
 *
 * The service account can be used with the provided access rights in ZITADEL. If you
 * want to use the ZITADEL API itself (for example to manage organizations),
 * you need to authenticate with [AuthenticationOptions.apiAccess] set to `true`.
 *
 * To create a service account json, head over to your ZITADEL console
 * and execute the following steps:
 * - create a `Service User` in your organization
 * - Give the service user the relevant authorization (e.g. ORG_OWNER or access to a specific project)
 * - Create a "key" in the account detail page of the service user and download it
 */
export class ServiceAccount {
  /**
   * The type of the object.
   */
  public static readonly type = 'serviceaccount';

  /**
   * Create a new service account
   *
   * @param userId The user ID of the service account.
   * @param keyId The ID of the RSA key.
   * @param key The private RSA key of the service account. Used to sign the JWT.
   *
   * @throws {Error} If the userId is not defined.
   * @throws {Error} If the keyId is not defined.
   * @throws {Error} If the key is not defined.
   */
  constructor(public readonly userId: string, public readonly keyId: string, public readonly key: string) {
    if (!userId) {
      throw new Error('userId is required');
    }
    if (!keyId) {
      throw new Error('keyId is required');
    }
    if (!key) {
      throw new Error('key is required');
    }
  }

  /**
   * Create an service account from a JSON object.
   *
   * @param json The JSON object.
   * @returns A service account.
   *
   * @throws {Error} If the constructor throws an error.
   * @throws {Error} If the passed JSON cannot be properly destructed.
   */
  public static fromJson({ userId, key, keyId }: ServiceAccountJson): ServiceAccount {
    return new ServiceAccount(userId, keyId, key);
  }

  /**
   * Create an service account from a JSON string.
   * The string is parsed using `JSON.parse`.
   *
   * @param jsonString The JSON string.
   * @returns A service account.
   *
   * @throws {Error} If the constructor throws an error.
   * @throws {Error} If the passed JSON cannot be properly parsed.
   * @throws {Error} If the passed JSON cannot be properly destructed.
   */
  public static fromJsonString(jsonString: string): ServiceAccount {
    return ServiceAccount.fromJson(JSON.parse(jsonString));
  }

  /**
   * Create a JSON object from the application.
   *
   * @returns A JSON object.
   */
  public toJson(): ServiceAccountJson & { type: typeof ServiceAccount.type } {
    return {
      type: ServiceAccount.type,
      userId: this.userId,
      keyId: this.keyId,
      key: this.key,
    };
  }

  /**
   * Authenticates the service account against the provided audience (or issuer) to
   * fetch an access token. To authenticate with special options, use the
   * options parameter.
   *
   * The function returns an access token that can be sent
   * to authenticate any request as the given service account. The access token
   * is valid for 60 minutes.
   *
   * @param audience The audience to authenticate against.
   * @param options The options to use for authentication.
   *
   * @returns An access token that is valid for 60 minutes.
   *
   * @example Just authenticate the service account against ZITADEL
   * ```typescript
   * const sa = ServiceAccount.fromJson(serviceAccountJson);
   * const token = await sa.authenticate('https://issuer.zitadel.ch');
   * ```
   *
   * @example Authenticate the service account against ZITADEL with ZITADEL API access
   * ```typescript
   * const sa = ServiceAccount.fromJson(serviceAccountJson);
   * const token = await sa.authenticate('https://issuer.zitadel.ch', { apiAccess: true });
   * ```
   */
  public async authenticate(audience: string, options?: AuthenticationOptions): Promise<string> {
    const { default: axios } = await import('axios');

    const issuer = await Issuer.discover(audience);
    const tokenEndpoint = issuer.metadata.token_endpoint ?? 'N/A';

    const jwt = await this.getSignedJwt(audience);

    const response = await axios.post<TokenSet>(
      tokenEndpoint,
      new URLSearchParams({
        assertion: jwt,
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        scope: createScopes(options ?? {}),
      })
    );

    if (response.status > 299) {
      throw new Error(`Authentication failed with status ${response.status}: ${response.statusText}.`);
    }

    if (!response.data.access_token) {
      throw new Error(`Authentication failed. No access token returned.`);
    }

    return response.data.access_token;
  }

  private async getSignedJwt(audience: string): Promise<string> {
    const rsa = new NodeRSA(this.key);
    const key = await importPKCS8(rsa.exportKey('pkcs8-private-pem'), 'RSA256');

    return await new SignJWT({})
      .setProtectedHeader({ kid: this.keyId, alg: 'RS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .setAudience(audience)
      .setIssuer(this.userId)
      .setSubject(this.userId)
      .sign(key);
  }
}

const createScopes = ({
  additionalScopes = [],
  apiAccess = false,
  projectAudiences = [],
  roles = [],
}: AuthenticationOptions): string =>
  [
    'openid',
    apiAccess ? 'urn:zitadel:iam:org:project:id:zitadel:aud' : undefined,
    ...additionalScopes,
    ...roles.map((r) => `urn:zitadel:iam:org:project:role:${r}`),
    ...projectAudiences.map((a) => `urn:zitadel:iam:org:project:id:${a}:aud`),
  ]
    .filter(Boolean)
    .join(' ');
