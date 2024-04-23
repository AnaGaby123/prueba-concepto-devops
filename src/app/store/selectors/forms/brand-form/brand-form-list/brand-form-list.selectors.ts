// Selectors
import {selectBrandForms} from '@appSelectors/forms/forms.selectors';
// Models
import {IBrandFormState} from '@appModels/store/forms/brand-form/brand-form.models';
import {IBrandFormList} from '@appModels/store/forms/brand-form/brand-form-list/brand-form-list.models';
import {IFilters} from '@appModels/filters/Filters';
// Dev tools
import {createSelector} from '@ngrx/store';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';
import {QueryResultVMarca} from 'api-catalogos';
import {filter} from 'lodash-es';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';

export const selectBrandList = createSelector(
  selectBrandForms,
  (state: IBrandFormState) => state.brandFormList,
);

export const selectSearchTerm = createSelector(
  selectBrandList,
  (state: IBrandFormList) => state.searchTerm,
);

export const selectBrands = createSelector(
  selectBrandList,
  (state: IBrandFormList) => state.brands,
);

export const selectBrandsResults = createSelector(
  selectBrands,
  (state: QueryResultVMarca) => state.Results,
);

export const selectTotalBrands = createSelector(
  selectBrands,
  (state: QueryResultVMarca) => state.TotalResults,
);

export const selectFilterOptions = createSelector(
  selectBrandList,
  (state: IBrandFormList) => state.filterOptions,
);

export const selectFilterOptionSelected = createSelector(
  selectBrandList,
  (state: IBrandFormList) => state.filterOptionSelected,
);

export const selectApiStatus = createSelector(
  selectBrandList,
  (state: IBrandFormList) => state.brandsStatus,
);

export const selectDesiredPage = createSelector(
  selectBrandList,
  (state: IBrandFormList) => state.desiredPage,
);

export const selectSizePage = createSelector(
  selectBrandList,
  (state: IBrandFormList) => state.pageSize,
);

export const selectQueryInfo = createSelector(
  selectSearchTerm,
  selectFilterOptions,
  selectDesiredPage,
  selectSizePage,
  (searchTerm: string, filterOption, desiredPage: number, sizePage: number) => {
    const queryInfo: IFilters = {Filters: []};
    if (filter(filterOption, (o: FilterOptionPqf) => o.isActive).length === 1) {
      filter(filterOption, (o: FilterOptionPqf) => {
        if (o.isActive) {
          return queryInfo.Filters.push({
            NombreFiltro: 'Activo',
            ValorFiltro: o.text === 'filters.enable',
          });
        }
      });
    }

    if (searchTerm) {
      queryInfo.Filters.push({
        NombreFiltro: 'Nombre',
        ValorFiltro: searchTerm,
      });
    }
    queryInfo.desiredPage = desiredPage;
    queryInfo.pageSize = sizePage;
    queryInfo.SortField = 'Nombre';
    queryInfo.SortDirection = 'asc';
    return queryInfo;
  },
);
export const selectFetchMoreBrandsInfo = createSelector(
  [selectBrands, selectApiStatus, selectDesiredPage, selectSizePage],
  (
    brands: QueryResultVMarca,
    apiStatus: number,
    desiredPage: number,
    pageSize: number,
  ): IFetchMoreItemsInfo => {
    return {
      itemList: brands?.Results,
      itemsTotalLength: brands?.TotalResults,
      listRequestStatus: apiStatus,
      desiredPage,
      pageSize,
      totalPages: brands?.TotalResults >= pageSize ? Math.ceil(brands?.TotalResults / pageSize) : 0,
    };
  },
);
