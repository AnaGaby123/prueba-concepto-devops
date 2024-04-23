import {createAction, props} from '@ngrx/store';

import {ITabOption} from '@appModels/botonera/botonera-option';
import {ClientsListItemForQuotation} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {AttributeDashboard} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'ClientQuotations';
const typeApi = 'ClientQuotationsAPI';

export const INIT_QUOTATION_DASHBOARD_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Init quotation dashboard component Effect'),
);
export const HANDLE_SET_SELECTED_CLIENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Handle set selected client Effect'),
  props<{selectedClient: ClientsListItemForQuotation}>(),
);
export const GET_QUOTATION_DASHBOARD_TABS_TOTALS_INIT = createAction(
  buildingStringActionType(typeApi, 'Get quotation dashboard tabs totals init'),
);
export const GET_QUOTATION_DASHBOARD_TABS_TOTALS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get quotation dashboard tabs totals success'),
  props<{tabs: Array<AttributeDashboard>}>(),
);
export const GET_QUOTATION_DASHBOARD_TABS_TOTALS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get quotation dashboard tabs totals failed'),
);
export const GET_QUOTATION_DASHBOARD_LIST_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get quotation dashboard list success'),
  props<{clientsList: Array<ClientsListItemForQuotation>}>(),
);
export const GET_QUOTATION_DASHBOARD_LIST_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get quotation dashboard list totals failed'),
);
export const RETURN_MAIN_PAGE_QUOTATION_EFFECT = createAction(
  buildingStringActionType(typeApi, 'return main page in quotation'),
);
export const CHANGE_LOADING_STATUS = createAction(
  buildingStringActionType(typeApi, 'Loading Status'),
);
export const SET_TAP = createAction(
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
  props<{
    searchTerm: string;
  }>(),
);
export const SET_SEARCH_TYPE = createAction(
  buildingStringActionType(typeApi, 'Update search type quotes'),
  props<{searchType: DropListOption}>(),
);
export const SET_ACTIVE_CHART = createAction(
  buildingStringActionType(typeReducer, 'Set Active Chart'),
  props<{active: boolean}>(),
);
export const UPDATE_STATUS_MAIL = createAction(
  buildingStringActionType(typeReducer, 'Update Status Mail'),
  props<{status: number}>(),
);
