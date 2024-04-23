// DOCS:Enum que sirve para registrar urls globales del sistema
export enum URL_SERVER {
  // DOCS: Configuración del servidor (APIS E IDENTITY)
  dev = 'https://172.24.32.33',
  devIdentityPort = 9001,

  qa = 'https://172.24.32.32',
  qaIdentityPort = 9001,

  uat = 'https://172.24.20.17',
  uatIdentityPort = 9000,

  prod = 'https://172.24.20.17',
  prodIdentityPort = 9000,

  // DOCS: Configuración del servidor de archivos (MINIO SERVER)
  hostSettingDev = '172.24.32.33',
  portSettingDev = 9000,

  hostSettingQA = '172.24.32.32',
  portSettingQA = 9000,

  hostSettingUAT = '172.24.20.18',
  portSettingUAT = 9000,

  hostSettingPROD = '172.24.20.18',
  portSettingPROD = 9000,
}
