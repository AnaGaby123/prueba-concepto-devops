import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';
import {AttributeDashboard} from 'api-catalogos';
import {IClientQuotation} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/details/daily-meeting-dashboard-details.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';

const typeApi = 'DailyMeetingDashboardDetailsApi';
const typeReducer = 'DailyMeetingDashboardDetails';

export const SET_SELECTED_CLIENT_DASHBOARD = createAction(
  buildingStringActionType(typeApi, 'Set Selected Client'),
  props<{
    clientSelected: IClientQuotation;
  }>(),
);
export const FETCH_CLIENTS_TABS_DASHBOARD_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients Tabs Dashboard Success'),
  props<{tabs: Array<AttributeDashboard>}>(),
);
export const FETCH_CLIENTS_TABS_DASHBOARD_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients Tabs Dashboard Failed'),
);
export const FETCH_CLIENTS_DASHBOARD_DETAILS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Clients Dashboard Details Load'),
);
export const FETCH_CLIENTS_DASHBOARD_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients Dashboard Details Success '),
  props<{listClients: Array<IClientQuotation>; clientSelected: IClientQuotation}>(),
);
export const FETCH_CLIENTS_DASHBOARD_DETAILS_SUCCESS_ZERO = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients Dashboard Details Success Zero'),
);
export const FETCH_CLIENTS_DASHBOARD_DETAILS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients Dashboard Details Failed'),
);
export const SET_SEARCH_TYPE_DASHBOARD_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Type Selected'),
  props<{searchTypeSelected: DropListOption}>(),
);
export const SET_TYPE_FILTER_DASHBOARD_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Value Filter Selected'),
  props<{typeFilterOptionSelected: DropListOption}>(),
);
export const SET_TAB_DASHBOARD_SELECTED_IPAD = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Ipad Selected'),
  props<{tabSelectedIpad: DropListOption}>(),
);
export const SET_TAB_DASHBOARD_SELECTED_MACBOOK = createAction(
  buildingStringActionType(typeReducer, 'Set Tab MacBook Selected'),
  props<{tabSelectedMacBook: ITabOption}>(),
);
export const SET_SEARCH_TERM_DASHBOARD = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term Dashboard'),
  props<{searchTerm: string}>(),
);
