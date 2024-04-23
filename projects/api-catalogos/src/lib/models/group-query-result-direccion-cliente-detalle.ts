/* tslint:disable */
import { QueryResultDireccionClienteDetalle } from './query-result-direccion-cliente-detalle';
export interface GroupQueryResultDireccionClienteDetalle {
  GroupColumn?: string;
  Groups?: {[key: string]: QueryResultDireccionClienteDetalle};
  TotalGroups?: number;
}
