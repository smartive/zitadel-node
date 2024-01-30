import test from 'ava';
import { Application } from '../src/credentials/application.js';
import { ServiceAccount } from '../src/credentials/service-account.js';
import { apiEndpoint, applicationJson, serviceAccountJson } from './test-data.js';

test('application - load from JSON', (t) => {
  const app = Application.fromJson(applicationJson);
  t.is(app.appId, '183300856840454401');
});

test('application - load from JSON string', (t) => {
  const app = Application.fromJsonString(JSON.stringify(applicationJson));
  t.is(app.appId, '183300856840454401');
});

test('application - throw on emtpy JSON', (t) => {
  t.throws(() => Application.fromJson({} as any));
});

test('application - throw on incomplete application JSON', (t) => {
  t.throws(() => Application.fromJson({ ...applicationJson, appId: '' }));
});

test('application - create a signed JWT', async (t) => {
  const app = Application.fromJson(applicationJson);
  const jwt = await app.getSignedJwt('https://api.zitadel.ch');
  t.regex(jwt, /^ey.*/);
});

test('service account - load from JSON', (t) => {
  const sa = ServiceAccount.fromJson(serviceAccountJson);
  t.is(sa.userId, '183285169220747521');
});

test('service account - load from JSON string', (t) => {
  const sa = ServiceAccount.fromJsonString(JSON.stringify(serviceAccountJson));
  t.is(sa.userId, '183285169220747521');
});

test('service account - throw on emtpy JSON', (t) => {
  t.throws(() => ServiceAccount.fromJson({} as any));
});

test('service account - throw on incomplete ServiceAccount JSON', (t) => {
  t.throws(() => ServiceAccount.fromJson({ ...serviceAccountJson, userId: '' }));
});

test('service account - successfully log in against ZITADEL', async (t) => {
  const sa = ServiceAccount.fromJson(serviceAccountJson);
  const token = await sa.authenticate(apiEndpoint);
  t.truthy(token);
});
