# @practera/settings-sdk

Validates a JWT with a public key, parses the token and returns the contents.

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

