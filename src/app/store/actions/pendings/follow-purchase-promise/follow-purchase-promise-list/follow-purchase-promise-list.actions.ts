import {createAction, props} from '@ngrx/store';
/*models import*/
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {ICustomerFPP} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise.models';
import {AttributeDashboard, ControlarSeguimientoPromesaDeCompraGraficas} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';

const typeReducer = 'Follow Purchase Promise List';
const typeApi = 'FollowPurchasePromiseList';

export const SET_TAB = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Selected'),
  props<{tab: ITabOption}>(),
);
export const SET_FILTER_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set Filter By Order'),
  props<{filter: DropListOption}>(),
);
export const SET_FILTERS_DATE_RANGE = createAction(
  buildingStringActionType(typeReducer, 'Set Filer Range Date'),
  props<{dateRange: IFilterDate}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_CUSTOMER_LIST_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customers Load'),
  props<{isFirstPage: boolean}>(),
);
export const SET_CUSTOMERS_LIST_API_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Customers List Api Status'),
  props<{requestStatus: number}>(),
);
export const FETCH_CUSTOMER_LIST_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customers Failed'),
);
export const FETCH_DONUT_CHART_FOLLOW_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Data of Donut Chart Load'),
);
export const FETCH_DONUT_CHART_FOLLOW_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Data of Donut Chart Success'),
  props<{data: ControlarSeguimientoPromesaDeCompraGraficas}>(),
);
export const FETCH_DONUT_CHART_FOLLOW_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Data of Donut Chart Error'),
);
export const SET_API_STATUS_DONUT_CHART = createAction(
  buildingStringActionType(typeReducer, 'Set Api Status of Donut Chart'),
  props<{status: number}>(),
);
export const INIT_FOLLOW_PURCHASE_PROMISE_LIST_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Init follow purchase promise list component Effect'),
);
export const GET_FOLLOW_PURCHASE_PROMISE_LIST_TABS_TOTALS = createAction(
  buildingStringActionType(typeApi, 'Get follow purchase promise list tabs totals'),
);
export const GET_FOLLOW_PURCHASE_PROMISE_LIST_TABS_TOTALS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get follow purchase promise list tabs totals success'),
  props<{tabs: Array<AttributeDashboard>}>(),
);
export const GET_FOLLOW_PURCHASE_PROMISE_LIST_TABS_TOTALS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get follow purchase promise list tabs totals failed'),
);
export const GET_FOLLOW_PURCHASE_PROMISE_DASHBOARD_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get follow purchase promise dashboard success'),
  props<{customerList: Array<ICustomerFPP>}>(),
);
export const GET_FOLLOW_PURCHASE_PROMISE_DASHBOARD_ERROR = createAction(
  buildingStringActionType(typeApi, 'Get follow purchase promise dashboard failed'),
);
export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set Initial State Brand Details'),
);
export const CHANGE_LOADING_STATUS = createAction(
  buildingStringActionType(typeApi, 'Set Loading status'),
);
export const FETCH_MORE_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch More Component Effect'),
  props<{event: IPageInfo}>(),
);
