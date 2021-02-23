# @practera/settings-sdk

Facilitates the communication with the Practera preferences API.

## Health

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=intersective_settings-sdk&metric=alert_status&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_settings-sdk)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=intersective_settings-sdk&metric=coverage&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_settings-sdk)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=intersective_settings-sdk&metric=security_rating&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_settings-sdk)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=intersective_settings-sdk&metric=sqale_rating&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_settings-sdk)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=intersective_settings-sdk&metric=bugs&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_settings-sdk)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=intersective_settings-sdk&metric=code_smells&token=19814e72d32dd8ab193bb168320116a41f84beb3)](https://sonarcloud.io/dashboard?id=intersective_settings-sdk)


## Install

```
$ npm install @practera/settings-sdk
```

## Usage

### setting up the client
JavaScript:
```js
const settings = require("@practera/settings-sdk");
```

TypeScript:
```js
import settings from "@practera/settings-sdk";
```

### getting and setting settings
```js
const client = new settings(
  privateKey, // the private key used to sign the request
  service, // this will identify what public key to use to validate the token, the variable called ${service}_JWT will be used. The variable should contain a key called public and the public key as the value.
  url, // the URL of the settings API, leave empty for production
);
existingSettings = client.get('[uuid]');
client.save('[uuid]', settings);

