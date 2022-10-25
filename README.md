# ZITADEL Node.js

This is the ZITADEL Node.js SDK.

This library contains the compiled and generated [gRPC](https://grpc.io/)
service clients for the ZITADEL API.

Also it contains helpers to create the service clients to access the API.
With two `MetadataProvider` (`accessTokenProvider` and `serviceAccountProvider`),
the clients can be created with the correct authentication already in place.

Head over to [the examples](https://github.com/smartive/zitadel-js/tree/main/examples) to see implementation
examples.

This library allows you to use the ZITADEL API in Node.js, it is not
compatible with the browser since it requires gRPC (and not gRPC-Web).
Furthermore, the library heavily relies on `openidconnect` and `crypto`
implementations since it handles RSA keys.

This library does _not_ provide authentication helpers for web applications.
If you want to use `passport js` and OAuth 2.0 introspection, head over to
[node-passport-zitadel](https://github.com/buehler/node-passport-zitadel).

### Development

To enhance this library or to fix a bug, you need to do the following:

1. Clone the repository
2. Install the dependencies with `npm install`
3. Install the submodules with `git submodule update --init --recursive`
4. Generate the gRPC types with `npm run build:grpc`

Then you can start developing with `npm run dev`. The production build can be
made with `npm run build` and the tests run with `npm test`.
