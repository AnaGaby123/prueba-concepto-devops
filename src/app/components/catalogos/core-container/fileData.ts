import {Archivo} from 'api-catalogos';

export interface FilesData extends Archivo {
  nombre?: string;
  archivoBase64?: string;
  isPdf?: boolean;
  isLoading?: boolean;
}
