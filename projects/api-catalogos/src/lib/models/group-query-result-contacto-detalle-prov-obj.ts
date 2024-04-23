/* tslint:disable */
import { QueryResultContactoDetalleProvObj } from './query-result-contacto-detalle-prov-obj';
export interface GroupQueryResultContactoDetalleProvObj {
  GroupColumn?: string;
  Groups?: {[key: string]: QueryResultContactoDetalleProvObj};
  TotalGroups?: number;
}
