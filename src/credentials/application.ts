import { importPKCS8, SignJWT } from 'jose';
import NodeRSA from 'node-rsa';

type ApplicationJson = {
  appId: string;
  clientId: string;
  keyId: string;
  key: string;
};

/**
 * Application for [ZITADEL](https://zitadel.ch/). An application is an OIDC application type
 * that allows a backend (for example an API for some single page application) to
 * check if sent credentials from a client are valid or not.
 *
 * When using ZITADEL to authenticate a user against some backend, the application
 * provides the means to access the introspection endpoint of ZITADEL.
 * It uses OIDC Introspection, defined in [RFC7662](https://tools.ietf.org/html/rfc7662).
 *
 * To create an application json, head over to your ZITADEL console
 * and execute the following steps:
 * - Create a project
 * - Create an API application
 * - Create a "key" inside the application to create and download the JWT profile
 */
export class Application {
  /**
   * The type of the object.
   */
  public static readonly type = 'application';

  /**
   * Create a new application
   *
   * @param appId The ID of the application.
   * @param clientId The client ID of the application.
   * @param keyId The ID of the RSA key.
   * @param key The private RSA key of the application. Used to sign the JWT.
   *
   * @throws {Error} If the clientId is not defined.
   * @throws {Error} If the keyId is not defined.
   * @throws {Error} If the key is not defined.
   */
  constructor(
    public readonly appId: string,
    public readonly clientId: string,
    public readonly keyId: string,
    public readonly key: string
  ) {
    if (!appId) {
      throw new Error('appId is required');
    }
    if (!clientId) {
      throw new Error('clientId is required');
    }
    if (!keyId) {
      throw new Error('keyId is required');
    }
    if (!key) {
      throw new Error('key is required');
    }
  }

  /**
   * Create an application from a JSON object.
   *
   * @param json The JSON object.
   * @returns An application.
   *
   * @throws {Error} If the constructor throws an error.
   * @throws {Error} If the passed JSON cannot be properly destructed.
   */
  public static fromJson({ appId, clientId, key, keyId }: ApplicationJson): Application {
    return new Application(appId, clientId, keyId, key);
  }

  /**
   * Create an application from a JSON string.
   * The string is parsed using `JSON.parse`.
   *
   * @param jsonString The JSON string.
   * @returns An application.
   *
   * @throws {Error} If the constructor throws an error.
   * @throws {Error} If the passed JSON cannot be properly parsed.
   * @throws {Error} If the passed JSON cannot be properly destructed.
   */
  public static fromJsonString(jsonString: string): Application {
    return Application.fromJson(JSON.parse(jsonString));
  }

  /**
   * Create a JSON object from the application.
   *
   * @returns A JSON object.
   */
  public toJson(): ApplicationJson & { type: typeof Application.type } {
    return {
      type: Application.type,
      appId: this.appId,
      clientId: this.clientId,
      keyId: this.keyId,
      key: this.key,
    };
  }

  /**
   * Create and sign a JWT token for the given audience.
   *
   * The JWT is signed by the RSA key of the application.
   * The JWT is valid for one hour.
   *
   * @param audience The audience to use in the JWT.
   * @returns A signed JWT.
   */
  public async getSignedJwt(audience: string): Promise<string> {
    const rsa = new NodeRSA(this.key);
    const key = await importPKCS8(rsa.exportKey('pkcs8-private-pem'), 'RSA256');

    return await new SignJWT({})
      .setProtectedHeader({ kid: this.keyId, alg: 'RS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .setAudience(audience)
      .setIssuer(this.clientId)
      .setSubject(this.clientId)
      .sign(key);
  }
}
