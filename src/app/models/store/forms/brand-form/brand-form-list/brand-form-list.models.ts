import {QueryResultVMarca, VMarca} from 'api-catalogos';
import {API_REQUEST_STATUS_DEFAULT, PAGING_LIMIT} from '@appUtil/common.protocols';
import {IImageItem} from '@appModels/shared/shared.models';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';

export interface IBrandFormList {
  searchTerm: string;
  filterOptions: Array<FilterOptionPqf>;
  filterOptionSelected: Array<FilterOptionPqf>;
  brands: QueryResultVMarca;
  brandsStatus: number;
  desiredPage: number;
  pageSize: number;
}

export interface IVMarca extends VMarca, IImageItem {
  Index?: string;
}

export interface IQueryResultVMarca {
  Results?: Array<IVMarca>;
  TotalResults?: number;
}

export const initialBrandFormListState = (): IBrandFormList => ({
  searchTerm: '',
  filterOptions: [
    {
      id: '1',
      text: 'filters.enable',
      isActive: false,
      enable: true,
    },
    {
      id: '2',
      text: 'filters.disable',
      isActive: false,
      enable: true,
    },
  ],
  filterOptionSelected: [],
  brands: {TotalResults: 0, Results: []},
  brandsStatus: API_REQUEST_STATUS_DEFAULT,
  desiredPage: 0,
  pageSize: PAGING_LIMIT,
});
