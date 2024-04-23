/* tslint:disable */
import { VRAImpOrdenDespacho } from './vraimp-orden-despacho';
export interface ExportadorOrdenDespachoObj {
  FechaMasProxima?: string;
  MontoTotal?: number;
  NombreExportador?: string;
  TotalArribadas?: number;
  TotalBultos?: number;
  TotalGuias?: number;
  TotalNoArribadas?: number;
  TotalPedimentos?: number;
  vRAImpOrdenDespacho?: Array<VRAImpOrdenDespacho>;
}
