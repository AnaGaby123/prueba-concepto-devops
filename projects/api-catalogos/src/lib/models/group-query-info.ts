/* tslint:disable */
import { FilterTuple } from './filter-tuple';
export interface GroupQueryInfo {
  Filters?: Array<FilterTuple>;
  GroupColumn?: string;
  SortDirection?: string;
  SortField?: string;
  desiredPage?: number;
  pageSize?: number;
}
