import {URL_SERVER} from '@env/baseURL';

export const environment = {
  appName: 'ProquifaNet 2',
  environmentServerName: 'dev',
  production: false,
  serverUrl: URL_SERVER.dev,
  identityPort: URL_SERVER.devIdentityPort,
  i18nPrefix: '',
};
export const minioSettings = {
  host: URL_SERVER.hostSettingDev,
  port: URL_SERVER.portSettingDev,
  useSSL: true,
  accessKey: '7WFRDBJ0CJQ1I69WC9ZW',
  secretKey: 'YAHAoUdpPGM7w9Wow4L53M+JWMt8e9pfCNHknHLj',
};
