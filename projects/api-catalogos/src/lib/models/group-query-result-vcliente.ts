/* tslint:disable */
import { QueryResultVCliente } from './query-result-vcliente';
export interface GroupQueryResultVCliente {
  GroupColumn?: string;
  Groups?: {[key: string]: QueryResultVCliente};
  TotalGroups?: number;
}
