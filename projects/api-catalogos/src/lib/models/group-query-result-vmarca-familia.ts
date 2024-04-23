/* tslint:disable */
import { QueryResultVMarcaFamilia } from './query-result-vmarca-familia';
export interface GroupQueryResultVMarcaFamilia {
  GroupColumn?: string;
  Groups?: {[key: string]: QueryResultVMarcaFamilia};
  TotalGroups?: number;
}
