/*
Copyright 2019 The Tekton Authors
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const fs = require('fs');
const path = require('path');

const basePath = process.cwd();
const localeConfig = require(`${basePath}/config_frontend/config.json`).locales; // eslint-disable-line

let messages = {};
const { supported: supportedLocales } = localeConfig;
const messagesFilePrefix = 'messages_';
const messagesPath = path.resolve(basePath, 'src/nls/');

function log(...args) {
  console.log(...args); // eslint-disable-line no-console
}

supportedLocales.forEach(locale => {
  log(
    `load ${path.resolve(messagesPath, `${messagesFilePrefix}${locale}.json`)}`
  );
  const message = require(path.resolve(messagesPath,`${messagesFilePrefix}${locale}.json`));  // eslint-disable-line
  messages = { ...messages, ...message };
});

log(`make ${path.resolve(messagesPath, 'messages.json')}`);

fs.writeFileSync(
  path.resolve(messagesPath, 'messages.json'),
  JSON.stringify(messages, null, 2)
);

log('\nFinished!\n');
