# @practera/preference-sdk

Validates a JWT with a public key, parses the token and returns the contents.

## Install

```
$ npm install @practera/preference-sdk
```

## Usage

### setting up the client
JavaScript:
```js
const preference = require("@practera/preference-sdk");
```

TypeScript:
```js
import preference from "@practera/preference-sdk";
```

### getting and setting preferences
```js
const client = new preference(
  privateKey, // the private key used to sign the request
  service, // this will identify what public key to use to validate the token, the variable called ${service}_JWT will be used. The variable should contain a key called public and the public key as the value.
  url, // the URL of the preference API, leave empty for production
);
existingPreferences = client.get('uuid');
client.save('uuid', preferences);

