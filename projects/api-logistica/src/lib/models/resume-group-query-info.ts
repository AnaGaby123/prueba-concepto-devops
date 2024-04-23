/* tslint:disable */
import { FilterTuple } from './filter-tuple';
import { NameField } from './name-field';
export interface ResumeGroupQueryInfo {
  CountElements?: Array<FilterTuple>;
  DistinctFields?: Array<FilterTuple>;
  Fields?: Array<NameField>;
  Filters?: Array<FilterTuple>;
  GroupColumn?: string;
  SortDirection?: string;
  SortField?: string;
  SumFields?: Array<FilterTuple>;
  desiredPage?: number;
  pageSize?: number;
}
