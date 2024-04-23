// Core imports
import {createAction, props} from '@ngrx/store';

// Services
import {FiltrosMarcaFamiliaObj, VMarca} from 'api-catalogos';

// Utils
// Models
import {IQueryResultVMarca} from '@appModels/store/forms/brand-form/brand-form-list/brand-form-list.models';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {buildingStringActionType} from '@appUtil/strings';

// Variables
const typeReducer = '[Reducer-BrandFormList]';
const typeApi = '[Api-BrandFormList]';

export const INIT_BRAND_FORM_LIST_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Init brand form list component Effect'),
);
export const FETCH_MORE_BRANDS_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more brands Effect'),
  props<{event: IPageInfo}>(),
);
export const FETCH_MORE_BRANDS_EFFECT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch more brands Effect failed'),
);
export const SET_BRAND_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Set brand Effect'),
  props<{brand: VMarca}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set search term'),
  props<{searchTerm: string}>(),
);
export const SET_FILTER_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set filter option selected'),
  props<{filterOptions: Array<FilterOptionPqf>}>(),
);
export const GET_LIST_BRANDS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get List of Brands Load'),
  props<{isFirstPage: boolean}>(),
);
export const GET_LIST_BRANDS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get List of Brands Success'),
  props<{data: IQueryResultVMarca}>(),
);
export const GET_LIST_BRANDS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get List of Brands Error'),
);

export const SET_LOADING_CHARGER = createAction(
  buildingStringActionType(typeReducer, 'Set Loading Charger'),
  props<{status: number}>(),
);
export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set Initial State'),
);
export const FETCH_FILTERS_LIST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch filters list load'),
);
export const FETCH_FILTERS_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch filters list success'),
  props<{filtersList: FiltrosMarcaFamiliaObj}>(),
);
