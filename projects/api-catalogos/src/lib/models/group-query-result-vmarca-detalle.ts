/* tslint:disable */
import { QueryResultVMarcaDetalle } from './query-result-vmarca-detalle';
export interface GroupQueryResultVMarcaDetalle {
  GroupColumn?: string;
  Groups?: {[key: string]: QueryResultVMarcaDetalle};
  TotalGroups?: number;
}
