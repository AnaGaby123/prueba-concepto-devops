import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {AttributeDashboard, QueryResultVClienteTramitarPedido} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';
import {ICheckOutDashboardItems} from '@appModels/store/pendings/checkout/checkout-list/checkout-list.model';

const typeReducer = 'CheckoutList';
const typeApi = 'CheckoutListAPI';

export const SET_TAB = createAction(
  buildingStringActionType(typeReducer, 'Set Tab'),
  props<{tab: ITabOption}>(),
);
export const SET_FILTER_BY_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Filter By Type'),
  props<{filter: DropListOption}>(),
);
export const SET_FILTER_BY_DATES = createAction(
  buildingStringActionType(typeReducer, 'Set Filter By Dates'),
  props<{filters: IFilterDate}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_CUSTOMER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customer Load'),
);
export const FETCH_CUSTOMER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customer Success'),
  props<{data: Array<ICheckOutDashboardItems>}>(),
);
export const FETCH_TOTALS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Totals Customer Success'),
  props<{totals: Array<AttributeDashboard>}>(),
);
export const FETCH_DONUT_CHART_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Chart Load'),
);
export const FETCH_DONUT_CHART_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Chart Success'),
  props<{data: QueryResultVClienteTramitarPedido}>(),
);
export const SET_IS_LOADING_CUSTOMER = createAction(
  buildingStringActionType(typeReducer, 'Set Status Customer'),
  props<{status: number}>(),
);
export const SET_CLIENT_SELECTED_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set Client Selected LOAD'),
  props<{client: any}>(),
);
export const FETCH_TOTALS_TABS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch totals tabs load'),
);
export const FETCH_TOTALS_TABS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch totals tabs success'),
  props<{options: Array<AttributeDashboard>}>(),
);
export const SET_SEARCH_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set search type'),
  props<{searchType: DropListOption}>(),
);
