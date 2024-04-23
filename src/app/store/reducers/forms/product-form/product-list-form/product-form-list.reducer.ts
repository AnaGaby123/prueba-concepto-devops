import {createReducer, on} from '@ngrx/store';
import {
  initialListProduct,
  ListProductsForm,
} from '@appModels/store/forms/product-form/list-products-form/list-products-form.model';
// Selectors
import * as productsListActions from '@appActions/forms/product-form/product-form-list/product-form-list.actions';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

const initialListProductsForm: ListProductsForm = {
  ...initialListProduct(),
};
export const listProductsFormReducer = createReducer(
  initialListProductsForm,
  on(productsListActions.UPDATE_FILTER_SELECTED, (state, {item, node}) => ({
    ...state,
    [node]: item,
    queryInfo: {...state.queryInfo, desiredPage: 1},
    productsStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(productsListActions.UPDATE_SORT_DIRECTION, (state, {item}) => ({
    ...state,
    PriceSelected: item,
    productsStatus: API_REQUEST_STATUS_LOADING,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: 1,
      SortDirection: item.value.toString(),
    },
  })),
  on(productsListActions.GET_LIST_PRODUCT_SUCCESS, (state, {datos}) => ({
    ...state,
    listProduct: {
      ...state.listProduct,
      TotalResults: datos.TotalResults,
      Results:
        state.queryInfo.desiredPage === 1
          ? [...datos.Results]
          : [...state.listProduct.Results, ...datos.Results],
    },
    productsStatus: API_REQUEST_STATUS_SUCCEEDED,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: state.queryInfo.desiredPage === 1 ? 2 : state.queryInfo.desiredPage,
    },
  })),
  on(productsListActions.GET_LIST_PRODUCT_ERROR, (state) => ({
    ...state,
    productsStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(productsListActions.GET_LIST_PRODUCT_LOAD, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
    productsStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(productsListActions.TYPE_DATAS_PRODUCTS, (state, {status}) => ({
    ...state,
    typeList: status,
  })),
  on(productsListActions.SET_TYPE_SEARCH, (state, {typeSearch}) => ({
    ...state,
    selectedTypeOfSearch: typeSearch,
  })),
  on(productsListActions.SET_OPTION_OF_PRODUCT_SELECTED, (state, {option}) => ({
    ...state,
    runSearchTerm: option.label,
    searchTerm: option.label,
    optionOfProductSelected: option,
    productsStatus: API_REQUEST_STATUS_LOADING,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: 1,
    },
  })),
  on(productsListActions.SET_RUN_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    runSearchTerm: searchTerm,
    optionOfProductSelected: {} as DropListOption,
    productsStatus: API_REQUEST_STATUS_LOADING,
    productsQueryInfo: {
      ...state.queryInfo,
      desiredPage: 1,
    },
  })),
  on(productsListActions.CLEAR_SEARCH_TERM, (state) => ({
    ...state,
    runSearchTerm: '',
    searchTerm: '',
    optionsOfProducts: [],
    optionOfProductSelected: {} as DropListOption,
    optionsOfProductsStatus: API_REQUEST_STATUS_DEFAULT,
    total: 0,
    productsStatus: API_REQUEST_STATUS_LOADING,
    queryInfo: {
      ...state.queryInfo,
      Filters: [],
      desiredPage: 1,
    },
  })),
  on(productsListActions.GET_OPTIONS_OF_PRODUCTS, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
    optionsOfProductsStatus: API_REQUEST_STATUS_LOADING,
    queryInfo: {
      ...state.queryInfo,
      Filters: [],
      desiredPage: 1,
    },
  })),
  on(productsListActions.GET_OPTIONS_OF_PRODUCTS_SUCCESS, (state, {products}) => ({
    ...state,
    optionsOfProducts: products,
    optionsOfProductsStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(productsListActions.GET_OPTIONS_OF_PRODUCTS_FAILED, (state) => ({
    ...state,
    optionsOfProductsStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(productsListActions.SET_LINE_SELECTED, (state, {itemLines}) => ({
    ...state,
    itemLines,
    productsStatus: API_REQUEST_STATUS_LOADING,
    queryInfo: {
      ...state.queryInfo,
      Filters: [],
      desiredPage: 1,
    },
  })),
  on(productsListActions.SET_INITIAL_STATE, (state) => initialListProductsForm),
  on(productsListActions.SET_RESET_ITEMS, (state) => ({
    ...state,
    listProduct: {Results: [], TotalResults: 0},
  })),
);
