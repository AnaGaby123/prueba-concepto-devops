import {PAGING_LIMIT} from '@appUtil/common.protocols';
import {QueryInfo} from 'api-catalogos';

export const initialClientQueryInfo = (): QueryInfo => ({
  Filters: [],
  SortDirection: 'asc',
  SortField: 'Nombre',
  desiredPage: 0,
  pageSize: PAGING_LIMIT,
});
