import {QueryInfo} from 'api-catalogos';
import {PAGING_LIMIT} from '@appUtil/common.protocols';

export const initialSummaryInfo = (): QueryInfo => ({
  Filters: [],
  SortDirection: 'asc',
  SortField: 'Nombre',
  desiredPage: 0,
  pageSize: PAGING_LIMIT,
});
