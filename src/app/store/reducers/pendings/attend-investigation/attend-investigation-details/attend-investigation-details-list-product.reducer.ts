import {createReducer, on} from '@ngrx/store';
import {
  initialListProduct,
  ListProductsForm,
} from '@appModels/store/forms/product-form/list-products-form/list-products-form.model';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  attendInvestigationDetailsActions,
  attendInvestigationDetailsListProductActions,
} from '@appActions/pendings/attend-investigation';

const initialListProductsForm: ListProductsForm = {
  ...initialListProduct(),
};
export const listProductsFormReducer = createReducer(
  initialListProductsForm,
  on(attendInvestigationDetailsActions.UPDATE_ITEMS_ATTENTION_LIST, (state, {items}) => ({
    ...initialListProduct(),
  })),
  // AL SELECCIONAR UN PRODUCTO EN ESTADO DE ESPERA DE RESPUESTA, LIMPIA LA SECCION DEL CATALOGO DE PRODUCTOS
  on(
    attendInvestigationDetailsActions.SET_SELECTED_PRODUCT,
    (state, {product}): ListProductsForm => {
      if (product.EstadoInvestigacion === 'En Espera De Respuesta') {
        return {
          ...initialListProduct(),
        };
      } else {
        return {
          ...state,
        };
      }
    },
  ),
  on(
    attendInvestigationDetailsListProductActions.UPDATE_FILTER_SELECTED,
    (state, {item, node}) => ({
      ...state,
      [node]: item,
      queryInfo: {...state.queryInfo, desiredPage: 1},
      productsStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(attendInvestigationDetailsListProductActions.UPDATE_SORT_DIRECTION, (state, {item}) => ({
    ...state,
    PriceSelected: item,
    productsStatus: API_REQUEST_STATUS_LOADING,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: 1,
      SortDirection: item.value.toString(),
    },
  })),
  on(attendInvestigationDetailsListProductActions.GET_LIST_PRODUCT_SUCCESS, (state, {datos}) => ({
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
  })),
  on(attendInvestigationDetailsListProductActions.GET_LIST_PRODUCT_ERROR, (state) => ({
    ...state,
    productsStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(
    attendInvestigationDetailsListProductActions.GET_LIST_PRODUCT_LOAD,
    (state, {isFirstPage}) => ({
      ...state,
      queryInfo: {
        ...state.queryInfo,
        desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
      },
      productsStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(attendInvestigationDetailsListProductActions.TYPE_DATAS_PRODUCTS, (state, {status}) => ({
    ...state,
    typeList: status,
  })),
  on(attendInvestigationDetailsListProductActions.SET_TYPE_SEARCH, (state, {typeSearch}) => ({
    ...state,
    selectedTypeOfSearch: typeSearch,
  })),
  on(
    attendInvestigationDetailsListProductActions.SET_OPTION_OF_PRODUCT_SELECTED,
    (state, {option}) => ({
      ...state,
      runSearchTerm: option.label,
      searchTerm: option.label,
      optionOfProductSelected: option,
      productsStatus: API_REQUEST_STATUS_LOADING,
      queryInfo: {
        ...state.queryInfo,
        desiredPage: 1,
      },
    }),
  ),
  on(attendInvestigationDetailsListProductActions.SET_RUN_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    runSearchTerm: searchTerm,
    optionOfProductSelected: {} as DropListOption,
    productsStatus: searchTerm !== '' ? API_REQUEST_STATUS_LOADING : API_REQUEST_STATUS_DEFAULT,
    productsQueryInfo: {
      ...state.queryInfo,
      desiredPage: 1,
    },
  })),
  on(attendInvestigationDetailsListProductActions.CLEAR_SEARCH_TERM, (state) => ({
    ...state,
    runSearchTerm: '',
    searchTerm: '',
    optionsOfProducts: [],
    optionOfProductSelected: {} as DropListOption,
    optionsOfProductsStatus: API_REQUEST_STATUS_DEFAULT,
    total: 0,

    queryInfo: {
      ...state.queryInfo,
      Filters: [],
      desiredPage: 1,
    },
  })),
  on(
    attendInvestigationDetailsListProductActions.GET_OPTIONS_OF_PRODUCTS,
    (state, {searchTerm}) => ({
      ...state,
      searchTerm,
      optionsOfProductsStatus: API_REQUEST_STATUS_LOADING,
      queryInfo: {
        ...state.queryInfo,
        Filters: [],
        desiredPage: 1,
      },
    }),
  ),
  on(
    attendInvestigationDetailsListProductActions.GET_OPTIONS_OF_PRODUCTS_SUCCESS,
    (state, {products}) => ({
      ...state,
      optionsOfProducts: products,
      optionsOfProductsStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(attendInvestigationDetailsListProductActions.GET_OPTIONS_OF_PRODUCTS_FAILED, (state) => ({
    ...state,
    optionsOfProductsStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(attendInvestigationDetailsListProductActions.SET_LINE_SELECTED, (state, {itemLines}) => ({
    ...state,
    itemLines,
    productsStatus: API_REQUEST_STATUS_LOADING,
    queryInfo: {
      ...state.queryInfo,
      Filters: [],
      desiredPage: 1,
    },
  })),
  on(
    attendInvestigationDetailsListProductActions.SET_INITIAL_STATE,
    (state) => initialListProductsForm,
  ),
  on(attendInvestigationDetailsListProductActions.SET_RESET_ITEMS, (state) => ({
    ...state,
    listProduct: {Results: [], TotalResults: 0},
  })),
);
