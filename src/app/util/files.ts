import {split as _split} from 'lodash-es';

/** Función que permite obtener un base64 o blob, de archivo PDF desde una url
 *
 */
export const convertPDFFileFromURLToBase64 = (
  url: string,
  blob: boolean = false,
): Promise<string> => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      // TODO: Retornar object URL
      if (blob) {
        resolve(window.URL.createObjectURL(new Blob([xhr.response], {type: 'application/pdf'})));
      } else {
        // TODO: Retornar base64
        const reader = new FileReader();

        reader.onload = (event) => {
          if (typeof event.target.result === 'string') {
            let result = event.target.result;
            if (event.target.result.indexOf('application/pdf') === -1) {
              // TODO: Sustituimos el tipo data:application/octet-stream; por data:application/pdf
              result = event.target.result.substr(30);
              result = `data:application/pdf;${result}`;
            }
            resolve(result);
          } else {
            resolve(null);
          }
        };
        reader.readAsDataURL(xhr.response);
      }
    };
    xhr.onerror = (e) => {
      resolve(null);
    };
    xhr.send();
  });
};
export const getOnlyFileName = (fileKey: string) =>
  _split(fileKey, '/')[_split(fileKey, '/').length - 1];
// TODO: funcion que retorna la extensión del archivo.
//  Si el archivo no tiene no tiene extensión o una composición valida
//  ejem: ('.gitignore', 'file_name', 'filename.') retorna null
export const getOnlyFileExtension = (fileKey: string) => {
  const filename = getOnlyFileName(fileKey);
  const split = _split(filename, '.');
  return split.length < 2 || (split.length === 2 && (split[0] === '' || split[1] === ''))
    ? null
    : split[split.length - 1];
};
export const getOnlyFileNameWithOutExtension = (fileKey: string) => {
  const filename = getOnlyFileName(fileKey);
  const split = _split(filename, '.');
  return split.length < 2 || (split.length === 2 && (split[0] === '' || split[1] === ''))
    ? null
    : split[0];
};
export const convertFileFromURLToBase64 = (url: string, blob: boolean = false): Promise<string> => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      // TODO: Retornar object URL
      if (blob) {
        resolve(window.URL.createObjectURL(new Blob([xhr.response])));
      } else {
        // TODO: Retornar base64
        const reader = new FileReader();
        reader.onload = (event) => {
          if (typeof event.target.result === 'string') {
            let result = event?.target?.result;
            const validateBase64 = result.split(',');
            if (validateBase64.length > 1) {
              result = validateBase64[1];
            }
            resolve(result);
          } else {
            resolve(null);
          }
        };
        reader.readAsDataURL(xhr.response);
      }
    };
    xhr.onerror = (e) => {
      resolve(null);
    };
    xhr.send();
  });
};
export const convertFromBase64ToByteArray = (base64: string): ArrayBuffer => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};
export const dowloadFile = (data, name: string): void => {
  const url = window.URL.createObjectURL(new Blob([data], {}));
  const a = document.createElement('a');
  const fileName = name;
  a.setAttribute('href', url);
  a.setAttribute('download', fileName);
  a.setAttribute('target', '_blank');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
export const getBase64FromUrl = async (url, ext) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const splitString = 'base64,';
      const split = reader.result.toString().split(splitString);
      const base64 = `data:image/${ext};${splitString}${split[1]}`;
      resolve(base64);
    };
  });
};
export const getBase64FromFile = (file: File, ext: string): Promise<string> => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (typeof event.target.result === 'string') {
        const splitString = 'base64,';
        const split = reader.result.toString().split(splitString);
        const base64 = `data:image/${ext};${splitString}${split[1]}`;
        resolve(base64);
      } else {
        resolve(null);
      }
    };
  });
}; // DOCS Muestra un archivo cargado localmente o de servicio recuperado
export const showDocument = (file: File) => {
  const blob = window.URL.createObjectURL(file);
  const anchor = document.createElement('a');
  anchor.setAttribute('href', blob);
  anchor.setAttribute('target', '_blank');
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};
