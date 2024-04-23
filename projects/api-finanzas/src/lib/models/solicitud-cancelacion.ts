/* tslint:disable */
import { SolicitudCancelacionFolio } from './solicitud-cancelacion-folio';
export interface SolicitudCancelacion {
  Fecha?: string;
  Folios?: Array<SolicitudCancelacionFolio>;
  RfcEmisor?: string;
}
