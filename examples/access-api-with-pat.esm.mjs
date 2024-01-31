import { createAccessTokenInterceptor, createAuthClient } from '@zitadel/node/api';

const apiEndpoint = 'https://zitadel-libraries-l8boqa.zitadel.cloud';
const personalAccessToken = 'Dp6uT84aVTqYLSMpk-H1-B3SPuqFms-Tz77cgWKlyrY3JxsZcDmb7kZoRK2ixaVNfuqmXfE';

const client = createAuthClient(apiEndpoint, createAccessTokenInterceptor(personalAccessToken));
const response = await client.getMyUser({});

console.log(response);
