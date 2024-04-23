/* tslint:disable */
import { FilterTuple } from './filter-tuple';
export interface QueryInfo {
  Filters?: Array<FilterTuple>;
  SortDirection?: string;
  SortField?: string;
  desiredPage?: number;
  pageSize?: number;
}
