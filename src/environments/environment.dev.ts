import {URL_SERVER} from '@env/baseURL';
import * as packageJson from 'package.json';

const packageVersion = JSON.stringify(packageJson);

export const environment = {
  appName: 'ProquifaNet 2',
  environmentServerName: 'dev',
  production: true,
  serverUrl: URL_SERVER.dev,
  identityPort: URL_SERVER.devIdentityPort,
  i18nPrefix: '/ProquifaDotNet',
  appVersion: JSON.parse(packageVersion)?.version,
};

export const minioSettings = {
  host: URL_SERVER.hostSettingDev,
  port: URL_SERVER.portSettingDev,
  useSSL: true,
  accessKey: '0WJJS61wmEauc2sj',
  secretKey: 'cU2SsjIv1j8AdLpyXxojmpYqKgDvZUvz',
};
