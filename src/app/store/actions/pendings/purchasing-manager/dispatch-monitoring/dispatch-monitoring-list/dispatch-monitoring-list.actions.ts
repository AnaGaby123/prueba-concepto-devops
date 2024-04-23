/* Store Imports */
import {createAction, props} from '@ngrx/store';

/* Utils Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProvidersDispatchMonitoring} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list.models';
import {MonitorearDespachoTotales} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Dispatch-Monitoring-List';
const typeApi = 'Dispatch-Monitoring-List-Api';

export const CLEAN_ALL_DISPATCH_MONITORING_LIST = createAction(
  buildingStringActionType(typeReducer, 'Clean All Dispatch Monitoring List'),
);
export const SET_SORT_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Sort Option'),
  props<{sort: DropListOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_PROVIDERS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Providers Load'),
);
export const FETCH_PROVIDERS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Providers Success'),
  props<{providers: Array<IProvidersDispatchMonitoring>}>(),
);
export const FETCH_PROVIDERS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Providers Failed'),
);
export const FETCH_DATA_CHARTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Data Charts Load'),
);
export const FETCH_DATA_CHARTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Data Charts Success'),
  props<{dataCharts: MonitorearDespachoTotales}>(),
);
export const FETCH_DATA_CHARTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Data Charts Failed'),
);
export const SET_PROVIDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Provider Selected'),
  props<{providerSelected: IProvidersDispatchMonitoring}>(),
);
