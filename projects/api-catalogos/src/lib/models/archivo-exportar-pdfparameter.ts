/* tslint:disable */
import { ObjDestinoMinIO } from './obj-destino-min-io';
export interface ArchivoExportarPDFParameter {
  DestinoMinIO?: ObjDestinoMinIO;
  Parametros?: {[key: string]: string};
  RutaDestinoArchivoLocal?: string;
  TipoDocumento?: string;
}
