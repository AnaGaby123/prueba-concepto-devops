import {URL_SERVER} from '@env/baseURL';
import * as packageJson from 'package.json';

const packageVersion = JSON.stringify(packageJson);
export const environment = {
  environmentServerName: 'prod',
  serverUrl: URL_SERVER.prod,
  identityPort: URL_SERVER.prodIdentityPort,
  appName: 'ProquifaNet 2',
  i18nPrefix: '',
  production: false,
  appVersion: JSON.parse(packageVersion)?.version,
};

export const minioSettings = {
  host: URL_SERVER.hostSettingPROD,
  port: URL_SERVER.portSettingPROD,
  useSSL: true,
  accessKey: '0E5gvqzdQAyyEtNl',
  secretKey: '3TDl0ymgCi6fcezUlSR6lzFC9HtVF3Gh',
};
