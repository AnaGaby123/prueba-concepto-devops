import {URL_SERVER} from '@env/baseURL';
import * as packageJson from 'package.json';

const packageVersion = JSON.stringify(packageJson);
export const environment = {
  environmentServerName: 'qa',
  serverUrl: URL_SERVER.qa,
  identityPort: URL_SERVER.qaIdentityPort,
  appName: 'ProquifaNet 2',
  i18nPrefix: '/ProquifaDotNet',
  production: true,
  appVersion: JSON.parse(packageVersion)?.version,
};

export const minioSettings = {
  host: URL_SERVER.hostSettingQA,
  port: URL_SERVER.portSettingQA,
  useSSL: true,
  accessKey: 'uTRpie2fhDxfOiY3',
  secretKey: 'o32Zfskj7bxDg9ABGMrSspomTxpMQFvv',
};
