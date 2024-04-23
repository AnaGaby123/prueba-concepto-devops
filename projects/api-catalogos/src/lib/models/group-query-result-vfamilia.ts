/* tslint:disable */
import { QueryResultVFamilia } from './query-result-vfamilia';
export interface GroupQueryResultVFamilia {
  GroupColumn?: string;
  Groups?: {[key: string]: QueryResultVFamilia};
  TotalGroups?: number;
}
