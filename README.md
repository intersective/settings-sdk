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

### Getting and setting settings

Given this response from the server
```js
categories: [
  {
    name: 'Sample Notifications',
    order: 1,
    settings: [
      {
        description: 'Sample notifications',
        key: 'sample-key',
        name: 'Notify me',
        options: [
          {
            locked: false,
            locked_name: '',
            medium: 'email',
            name: 'Email',
            value: true
          },
          {
            locked: false,
            locked_name: '',
            medium: 'sms',
            name: 'SMS',
            value: false
          }
        ],
        remarks: 'sample remarks'
      }
    ]
  }
]
```

You can query the result in multiple ways.

```js
const client = new settings(
  privateKey, // the private key used to sign the request
  service, // this will identify what public key to use to validate the token, the variable called ${service}_JWT will be used. The variable should contain a key called public and the public key as the value.
  url, // the URL of the settings API, leave empty for production
);

// to perform the api call for the data, note this does not return the data but a reference to self. This allows to chain requests if you want.
client.get('[uuid]');

// to get the actual data you can
client.get('[uuid]');
existingSettings = client.data; // the entire response from above
// or 
existingSettings = client.get('[uuid]').data; // the entire response from above


// to search for a setting in our normal json response 
client.get('[uuid]');
existingSettingEmail = client.findSetting('sample-key', 'email'); // true
existingSettingSMS = client.findSetting('sample-key', 'sms'); // false
// or 
existingSettingEmail = client.get('[uuid]').findSetting('sample-key', 'email'); // true
existingSettingSMS = client.findSetting('sample-key', 'sms'); // false


// to search for a specific value in the array you can use a regular expression
client.get('[uuid]');
existingSettings = client.findValue(/^categories\.0\.settings\.0\.options\.1\.medium$/); // sms
// or 
existingSettings = client.get('[uuid]').findValue(/^categories\.0\.settings\.0\.options\.1\.medium$/); // sms


// to search for a neighbor or a specific key, you can use. This basically searches all the mediums for the value email then returns the field next to it called 'value'
client.get('[uuid]');
existingSettings = client.findNeighbor(/^categories\.0\.settings\.0\.options\.[0-9]\.medium$/, "email", "value"); // true
// or 
existingSettings = client.get('[uuid]').findValue(/^categories\.0\.settings\.0\.options\.[0-9]\.medium$/, "email", "value"); // false


// to save data base to the settings
client.save('[uuid]', settingsJson);
```
