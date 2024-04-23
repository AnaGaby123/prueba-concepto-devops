import {createAction, props} from '@ngrx/store';
import {IQueryResultVProduct} from '@appModels/store/forms/product-form/list-products-form/list-products-form.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import * as apiCatalogs from 'api-catalogos';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Attend Investigation Product List';

export const INIT_PRODUCT_LIST_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Init product list effect'),
);
export const INIT_PRODUCT_LIST_EFFECT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Init product list effect success'),
);
export const FETCH_MORE_PRODUCTS_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more products Effect'),
  props<{event: IPageInfo}>(),
);
export const FETCH_MORE_PRODUCTS_EFFECT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch more products Effect failed'),
);
export const HANDLE_ADD_BUTTON_CLICK_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Handle add button click effect'),
);
export const HANDLE_ADD_BUTTON_CLICK_EFFECT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Handle add button click effect success'),
);

export const GET_LIST_PRODUCT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get List of Product Load'),
  props<{isFirstPage: boolean}>(),
);
export const GET_LIST_PRODUCT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get List of Product Success'),
  props<{datos: IQueryResultVProduct}>(),
);
export const GET_LIST_PRODUCT_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get List of Product Error'),
  props<{error: any}>(),
);
export const SET_LINE_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Line Selected'),
  props<{itemLines: DropListOption}>(),
);
export const UPDATE_FILTER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Update Filter for Products'),
  props<{item: DropListOption; node: string}>(),
);
export const UPDATE_SORT_DIRECTION = createAction(
  buildingStringActionType(typeReducer, 'Update Sort Direction Products'),
  props<{item: DropListOption}>(),
);
export const TYPE_DATAS_PRODUCTS = createAction(
  buildingStringActionType(typeReducer, 'Update Types List of Products'),
  props<{status: boolean}>(),
);
export const SET_TYPE_SEARCH = createAction(
  buildingStringActionType(typeReducer, 'Guardar Tipo de Búsqueda'),
  props<{typeSearch: DropListOption}>(),
);
export const SET_OPTION_OF_PRODUCT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Option Selected to Search'),
  props<{option: DropListOption}>(),
);
export const SET_RUN_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Run Search Term'),
  props<{searchTerm: string}>(),
);
export const CLEAR_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Clear Search Term'),
);
export const GET_OPTIONS_OF_PRODUCTS = createAction(
  buildingStringActionType(typeReducer, 'Get Options Of Products'),
  props<{searchTerm: string}>(),
);
export const GET_OPTIONS_OF_PRODUCTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Options Of Products Success'),
  props<{products: Array<apiCatalogs.SugerenciaBusqueda>}>(),
);
export const GET_OPTIONS_OF_PRODUCTS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get Options Of Products Failed'),
);
export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set Initial State'),
);

export const SET_RESET_ITEMS = createAction(
  buildingStringActionType(typeReducer, 'Set Reset Items'),
);
