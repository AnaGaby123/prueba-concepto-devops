import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {IStrategyByClient} from '@appModels/store/pendings/strategy/strategy-dashboard/strategy-dashboard.model';
import {AttributeDashboard} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'StrategyDashboard';
const typeApi = 'StrategyDashboardAPI';

export const HANDLE_SET_CLIENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Handle set selected client effect'),
  props<{selectedClient: IStrategyByClient}>(),
);
export const INIT_STRATEGY_DASHBOARD_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Init strategy dashboard component Effect'),
);
export const GET_STRATEGY_DASHBOARD_TABS_TOTALS_INIT = createAction(
  buildingStringActionType(typeApi, 'Get strategy dashboard tabs totals init'),
);
export const GET_STRATEGY_DASHBOARD_TABS_TOTALS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get strategy dashboard tabs totals success'),
  props<{tabs: Array<AttributeDashboard>}>(),
);
export const GET_STRATEGY_DASHBOARD_TABS_TOTALS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get strategy dashboard tabs totals failed'),
);
export const SET_TAP = createAction(
  buildingStringActionType(typeReducer, 'Set Tab'),
  props<{tab: ITabOption}>(),
);
export const SET_FILTER_BY_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Filter By Type'),
  props<{filter: DropListOption}>(),
);
export const CHANGE_LOADING_STATUS = createAction(
  buildingStringActionType(typeApi, 'Loading Status'),
);
export const GET_CLIENTS_QUOTATIONS_FOR_STRATEGY_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients Quotations For Strategy Succes'),
  props<{clientsList: Array<IStrategyByClient>}>(),
);
export const GET_CLIENTS_QUOTATIONS_FOR_STRATEGY_FAILDED = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients Quotations For Strategy Failed'),
);
export const SET_FILTER_BY_DATES = createAction(
  buildingStringActionType(typeReducer, 'Set Filter By Dates'),
  props<{filters: IFilterDate}>(),
);
export const SET_LIST_API_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set list api status'),
  props<{apiStatus: number}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_SEARCH_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set search type'),
  props<{searchType: DropListOption}>(),
);
export const SET_ACTIVE_CHART = createAction(
  buildingStringActionType(typeReducer, 'Set Active Chart'),
  props<{active: boolean}>(),
);
