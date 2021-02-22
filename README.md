# @practera/jwt-parser

Validates a JWT with a public key, parses the token and returns the contents.

## Install

```
$ npm install @practera/jwt-parser
```

## Usage

JavaScript:
```js
const jwtParse = require("@practera/jwt-parser");

jwtContents = jwtParse(
  token, // the token to be verified and parsed
  process.env, // environmental variables or another array of tokens that are accepted
  service, // this will identify what public key to use to validate the token, the variable called ${service}_JWT will be used. The variable should contain a key called public and the public key as the value.
  ['RS256'], // list of algorithms that will be used to validate the token. Default: ['RS256']
);
```

TypeScript:
```js
import jwtParse from "@practera/jwt-parser";

jwtContents = jwtParse(
  token, // the token to be verified and parsed
  process.env, // environmental variables or another array of tokens that are accepted
  service, // this will identify what public key to use to validate the token, the variable called ${service}_JWT will be used. The variable should contain a key called public and the public key as the value.
  ['RS256'], // list of algorithms that will be used to validate the token. Default: ['RS256']
);
```
