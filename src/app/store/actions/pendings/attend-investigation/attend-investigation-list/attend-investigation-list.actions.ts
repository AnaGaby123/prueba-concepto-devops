import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {buildingStringActionType} from '@appUtil/strings';
import {AttributeDashboard} from 'api-logistica';
import {IProvider} from '@appModels/store/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.model';

export const typeReducer = 'Attend-Investigation-List';
export const typeApi = 'Attend-Investigation-List-API';
export const SET_TAB_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Option Selected'),
  props<{tabOptionSelected: ITabOption}>(),
);
export const INIT_ATTEND_INVESTIGATION_DASHBOARD_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Init Attend Investigation Dashboard Component Effect'),
);
export const SET_ACTIVE_CHART = createAction(
  buildingStringActionType(typeReducer, 'Set Active Chart'),
  props<{active: boolean}>(),
);
export const FETCH_ATTEND_INVESTIGATION_DASHBOARD_TABS_TOTALS_INIT = createAction(
  buildingStringActionType(typeReducer, 'Fetch Attend Investigation Dashboard Tabs Totals Init'),
);
export const FETCH_ATTEND_INVESTIGATION_DASHBOARD_TABS_TOTALS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Attend Investigation Dashboard Tabs Totals Success'),
  props<{tabs: Array<AttributeDashboard>}>(),
);
export const FETCH_ATTEND_INVESTIGATION_DASHBOARD_TABS_TOTALS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Attend Investigation Dashboard Tabs Totals Failed'),
);
export const CHANGE_LOADING_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Change Loading Status'),
);
export const FETCH_LIST_PROVIDERS_ATTEND_INVESTIGATION_DASHBOARD_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch List Providers Attend Investigation Dashboard Success'),
  props<{listProviders: Array<IProvider>}>(),
);
export const FETCH_LIST_PROVIDERS_ATTEND_INVESTIGATION_DASHBOARD_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch List Providers Attend Investigation Dashboard Failed'),
);
