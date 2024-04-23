// Actions
import {brandFormListAction} from '@appActions/forms/brand-form';
// Models
import {
  IBrandFormList,
  initialBrandFormListState,
} from '@appModels/store/forms/brand-form/brand-form-list/brand-form-list.models';
// Dev tools
import {createReducer, on} from '@ngrx/store';
// Utils
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

const initialListBrandsForm: IBrandFormList = {
  ...initialBrandFormListState(),
};
export const listBrandsFormReducer = createReducer(
  initialListBrandsForm,
  on(
    brandFormListAction.SET_SEARCH_TERM,
    (state: IBrandFormList, {searchTerm}): IBrandFormList => ({
      ...state,
      searchTerm,
      brands: {
        TotalResults: 0,
        Results: [],
      },
      brandsStatus: API_REQUEST_STATUS_LOADING,
      desiredPage: 1,
    }),
  ),
  on(
    brandFormListAction.SET_FILTER_OPTION_SELECTED,
    (state: IBrandFormList, {filterOptions}): IBrandFormList => ({
      ...state,
      filterOptions: filterOptions,
      brandsStatus: API_REQUEST_STATUS_LOADING,
      brands: {
        TotalResults: 0,
        Results: [],
      },
      desiredPage: 1,
    }),
  ),
  on(
    brandFormListAction.GET_LIST_BRANDS_SUCCESS,
    (state: IBrandFormList, {data}): IBrandFormList => ({
      ...state,
      brands: {
        ...state.brands,
        TotalResults: data.TotalResults,
        Results:
          state.desiredPage === 1 ? [...data.Results] : [...state.brands.Results, ...data.Results],
      },
      brandsStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    brandFormListAction.GET_LIST_BRANDS_ERROR,
    (state: IBrandFormList): IBrandFormList => ({
      ...state,
      brandsStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(
    brandFormListAction.GET_LIST_BRANDS_LOAD,
    (state: IBrandFormList, {isFirstPage}): IBrandFormList => ({
      ...state,
      desiredPage: isFirstPage ? 1 : state.desiredPage + 1,
    }),
  ),
  on(
    brandFormListAction.SET_LOADING_CHARGER,
    (state: IBrandFormList, {status}): IBrandFormList => ({
      ...state,
      brandsStatus: status,
    }),
  ),
  on(brandFormListAction.SET_INITIAL_STATE, (): IBrandFormList => initialListBrandsForm),
);
