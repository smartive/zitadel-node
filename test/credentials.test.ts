import { Application } from '../src/credentials/application';
import { ServiceAccount } from '../src/credentials/service-account';
import { apiEndpoint, applicationJson, serviceAccountJson } from './test-data';

describe('application', () => {
  test('load from JSON', () => {
    const app = Application.fromJson(applicationJson);
    expect(app.appId).toBe('183300856840454401');
  });

  test('load from JSON string', () => {
    const app = Application.fromJsonString(JSON.stringify(applicationJson));
    expect(app.appId).toBe('183300856840454401');
  });

  test('throw on emtpy JSON', () => {
    expect(() => Application.fromJson({} as any)).toThrowError();
  });

  test('throw on incomplete application JSON', () => {
    expect(() => Application.fromJson({ ...applicationJson, appId: '' })).toThrowError();
  });

  test('create a signed JWT', async () => {
    const app = Application.fromJson(applicationJson);
    const jwt = await app.getSignedJwt('https://api.zitadel.ch');
    expect(jwt).toMatch(/^ey.*/);
  });
});

describe('service account', () => {
  test('load from JSON', () => {
    const sa = ServiceAccount.fromJson(serviceAccountJson);
    expect(sa.userId).toBe('183285169220747521');
  });

  test('load from JSON string', () => {
    const sa = ServiceAccount.fromJsonString(JSON.stringify(serviceAccountJson));
    expect(sa.userId).toBe('183285169220747521');
  });

  test('throw on emtpy JSON', () => {
    expect(() => ServiceAccount.fromJson({} as any)).toThrowError();
  });

  test('throw on incomplete ServiceAccount JSON', () => {
    expect(() => ServiceAccount.fromJson({ ...serviceAccountJson, userId: '' })).toThrowError();
  });

  test('successfully log in against ZITADEL', async () => {
    const sa = ServiceAccount.fromJson(serviceAccountJson);
    const token = await sa.authenticate(apiEndpoint);
    expect(token).toBeDefined();
  });
});
