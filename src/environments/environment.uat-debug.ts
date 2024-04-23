import {URL_SERVER} from '@env/baseURL';

export const environment = {
  environmentServerName: 'uat',
  serverUrl: URL_SERVER.uat,
  identityPort: URL_SERVER.uatIdentityPort,
  appName: 'ProquifaNet 2',
  i18nPrefix: '',
  production: false,
};

export const minioSettings = {
  host: URL_SERVER.hostSettingUAT,
  port: URL_SERVER.portSettingUAT,
  useSSL: true,
  accessKey: '0E5gvqzdQAyyEtNl',
  secretKey: '3TDl0ymgCi6fcezUlSR6lzFC9HtVF3Gh',
};
