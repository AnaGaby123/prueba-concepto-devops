import {QueryInfo} from 'api-catalogos';
import {PAGING_LIMIT} from '@appUtil/common.protocols';

export const initialProductsInfo = (): QueryInfo => ({
  Filters: [],
  SortDirection: 'asc',
  SortField: 'PrecioLista',
  desiredPage: 0,
  pageSize: PAGING_LIMIT,
});
