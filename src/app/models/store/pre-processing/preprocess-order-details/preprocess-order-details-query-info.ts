import {QueryInfo} from 'api-catalogos';
import {PAGING_LIMIT} from '@appUtil/common.protocols';

export const initialPreProcessingInfo = (): QueryInfo => ({
  Filters: [],
  SortDirection: 'asc',
  SortField: '',
  desiredPage: 0,
  pageSize: PAGING_LIMIT,
});
