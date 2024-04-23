/* tslint:disable */
import { QueryResultConfiguracionAplicadaClienteObj } from './query-result-configuracion-aplicada-cliente-obj';
export interface GroupQueryResultConfiguracionAplicadaClienteObj {
  GroupColumn?: string;
  Groups?: {[key: string]: QueryResultConfiguracionAplicadaClienteObj};
  TotalGroups?: number;
}
