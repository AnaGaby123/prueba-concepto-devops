/* tslint:disable */
import { QueryResultProveedorMarcaObj } from './query-result-proveedor-marca-obj';
export interface GroupQueryResultProveedorMarcaObj {
  GroupColumn?: string;
  Groups?: {[key: string]: QueryResultProveedorMarcaObj};
  TotalGroups?: number;
}
