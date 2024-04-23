export const generateMessage = (
  fileName: string = '',
  info: string = '',
  description: string = '',
): string => {
  return `[${message[info] ? message[info] : info ? info : ''} ${description}`;
  // return `[${fileName}] Info: ${message[info] ? message[info] : info ? info : ''} ${description}`;
};

export const GET_METHOD = 'GET';
export const POST_METHOD = 'POST';
export const PUT_METHOD = 'PUT';
export const DELETE_METHOD = 'DELETE';
export const PATCH_METHOD = 'PATCH';

export const LOG_MESSAGE_NONE = 'LOG_MESSAGE_NONE';
export const LOG_INFO = 'LOG_INFO';
export const LOG_VALIDATE = 'LOG_VALIDATE';
export const LOG_LOADING = 'LOG_LOADING';
export const LOG_SUCCEEDED = 'LOG_SUCCEEDED';
export const LOG_FAILED = 'LOG_FAILED';
export const LOG_APPLY_CHANGES = 'LOG_APPLY_CHANGES';
export const LOG_GETTING = 'LOG_GETTING';
export const LOG_NOT_LOADED_ERROR = 'LOG_NOT_LOADED_ERROR';
export const LOG_NOT_SAVE_ERROR = 'LOG_NOT_SAVE_ERROR';
export const LOG_NOT_UPDATED_ERROR = 'LOG_NOT_UPDATED_ERROR';
export const LOG_NOT_DELETED_ERROR = 'LOG_NOT_DELETED_ERROR';
export const LOG_NOT_DISABLED_ERROR = 'LOG_NOT_DISABLED_ERROR';
export const LOG_PASSWORD_NOT_UPDATED_ERROR = 'LOG_PASSWORD_NOT_UPDATED_ERROR';

const message = {
  [GET_METHOD]: 'GET:',
  [POST_METHOD]: 'POST:',
  [PUT_METHOD]: 'PUT:',
  [DELETE_METHOD]: 'DELETE:',
  [PATCH_METHOD]: 'PATCH:',
  [LOG_MESSAGE_NONE]: 'Ningún mensaje',
  [LOG_INFO]: 'Info: ',
  [LOG_VALIDATE]: 'Validar',
  [LOG_LOADING]: 'Cargando datos',
  [LOG_SUCCEEDED]: 'Exitó',
  [LOG_FAILED]: 'Ocurrió un error',
  [LOG_APPLY_CHANGES]: 'Aplicando cambios',
  [LOG_GETTING]: 'Obteniendo',
  [LOG_NOT_LOADED_ERROR]: 'Error: No se pudo cargar',
  [LOG_NOT_SAVE_ERROR]: 'Error: No se pudo guardar',
  [LOG_NOT_UPDATED_ERROR]: 'Error: No se pudo actualizar',
  [LOG_NOT_DELETED_ERROR]: 'Error: No se pudo eliminar',
  [LOG_NOT_DISABLED_ERROR]: 'Error: No se pudo inhabilitar',
  [LOG_PASSWORD_NOT_UPDATED_ERROR]: 'Error: No se pudo cambiar la contraseña.',
};
