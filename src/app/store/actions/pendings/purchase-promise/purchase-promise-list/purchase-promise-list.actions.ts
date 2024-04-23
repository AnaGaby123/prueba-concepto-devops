import {createAction, props} from '@ngrx/store';
import {ICustomerResults} from '@appModels/store/pendings/purchase-promise/purchase-promise-list/purchase-promise-list.model';
import {AttributeDashboard, QueryResultVClientePromesasDeCompra} from 'api-logistica';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {buildingStringActionType} from '@appUtil/strings';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';

const typeReducer = 'Purchase-Promise-List';
const typeApi = 'PurchasePromiseList';
export const INIT_PURCHASE_PROMISE_LIST_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Init purchase promise list component Effect'),
);
export const FETCH_CUSTOMER_PURCHASE_PROMISE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customers of Purchase Promise Load'),
  props<{isFirstPage: boolean}>(),
);
export const CHANGE_LOADING_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Change Loading Status'),
);
export const FETCH_CUSTOMER_PURCHASE_PROMISE_LIST_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Customers of Purchase Promise List Success'),
  props<{customerList: Array<ICustomerResults>}>(),
);
export const FETCH_CUSTOMER_PURCHASE_PROMISE_LIST_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customers of Purchase Promise List Error'),
);
export const FETCH_DONUT_CHART_PROMISE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Chart of Purchase Promise Success'),
  props<{data: QueryResultVClientePromesasDeCompra}>(),
);
export const SET_TAB_PROMISE = createAction(
  buildingStringActionType(typeReducer, 'Set Tab of Promise'),
  props<{tab: ITabOption}>(),
);
export const SET_FILTER_PROMISE = createAction(
  buildingStringActionType(typeReducer, 'Set Filter of Promise'),
  props<{filter: DropListOption}>(),
);
export const SET_DATE_RANGE_PROMISE = createAction(
  buildingStringActionType(typeReducer, 'Set Filter Date'),
  props<{dateRange: IFilterDate}>(),
);
export const SET_SEARCH_TERM_PROMISE = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term of Promise'),
  props<{searchTerm: string}>(),
);
export const GET_PURCHASE_PROMISE_LIST_TABS_INFO = createAction(
  buildingStringActionType(typeApi, 'Get purchase promise list tabs total'),
);
export const GET_PURCHASE_PROMISE_LIST_TABS_INFO_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get purchase promise list tabs total success'),
  props<{tabs: Array<AttributeDashboard>}>(),
);
export const GET_PURCHASE_PROMISE_LIST_TABS_INFO_ERROR = createAction(
  buildingStringActionType(typeApi, 'Get purchase promise list tabs total error'),
);
export const FETCH_MORE_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch More Component Effect'),
  props<{event: IPageInfo}>(),
);
