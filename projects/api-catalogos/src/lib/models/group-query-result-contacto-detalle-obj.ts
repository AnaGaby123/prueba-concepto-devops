/* tslint:disable */
import { QueryResultContactoDetalleObj } from './query-result-contacto-detalle-obj';
export interface GroupQueryResultContactoDetalleObj {
  GroupColumn?: string;
  Groups?: {[key: string]: QueryResultContactoDetalleObj};
  TotalGroups?: number;
}
