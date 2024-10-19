# ZITADEL Node.js

This is the ZITADEL Node.js SDK.

This library contains the compiled and generated [gRPC](https://grpc.io/)
service clients for the ZITADEL API.

Also it contains helpers to create the service clients to access the API.
With two `MetadataProvider` (`accessTokenProvider` and `serviceAccountProvider`),
the clients can be created with the correct authentication already in place.

Head over to [the examples](https://github.com/smartive/zitadel-node/tree/main/examples) to see implementation
examples.

This library allows you to use the ZITADEL API in Node.js, it is not
compatible with the browser since it requires gRPC (and not gRPC-Web).
Furthermore, the library heavily relies on `openidconnect` and `crypto`
implementations since it handles RSA keys.

This library does _not_ provide authentication helpers for web applications.
If you want to use `passport js` and OAuth 2.0 introspection, head over to
[node-passport-zitadel](https://github.com/buehler/node-passport-zitadel).

## Goals

This is meant to be a Node.js SDK for the ZITADEL API. It contains the compiled
proto files from the original ZITADEL repository and therefore helps to
access the API and manage resources. Moreover, it contains helpers to
authenticate a given service account against ZITADEL.

To summarize:

- Provide compiled proto clients
- Manage resources via proto clients (e.g. `OrganizationServiceClient`, `SessionServiceClient`)
- Allow authentication of a service account (fetch a token that can be sent)

## Non-Goals

In contrast to the goals of this package, this package does _not_ provide
means to check for authentication of a user. There exists a multitude
of frameworks that can be used in conjunction with NodeJS. Therefore, you need
to use specific framework packages to support authentication.

Known packages:

- [Passport.js](https://www.passportjs.org/): [node-passport-zitadel](https://github.com/buehler/node-passport-zitadel)
- [NextAuth / Auth.js](https://next-auth.js.org): [ZITADEL Provider](https://next-auth.js.org/providers/zitadel)
- [NestJS](https://nestjs.com/): [NestJS OIDC](https://github.com/5-stones/nest-oidc)

### Development

To enhance this library or to fix a bug, you need to do the following:

1. Clone the repository
2. Install the dependencies with `npm install`
3. Install the submodules with `git submodule update --init --recursive`
4. Generate the gRPC types with `npm run build:grpc`

Then you can start developing with `npm run dev`. The production build can be
made with `npm run build` and the tests run with `npm test`.
