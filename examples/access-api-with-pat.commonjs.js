const { createAccessTokenInterceptor, createAuthClient } = require('@zitadel/node/grpc');

const apiEndpoint = 'https://zitadel-libraries-l8boqa.zitadel.cloud';
const personalAccessToken = 'Dp6uT84aVTqYLSMpk-H1-B3SPuqFms-Tz77cgWKlyrY3JxsZcDmb7kZoRK2ixaVNfuqmXfE';

async function main() {
  const client = createAuthClient(apiEndpoint, createAccessTokenInterceptor(personalAccessToken));
  const response = await client.getMyUser({});

  console.log(response);
}

main();
