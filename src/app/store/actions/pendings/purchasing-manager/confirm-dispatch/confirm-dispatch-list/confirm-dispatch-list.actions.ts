/* Core Imports */
import {createAction, props} from '@ngrx/store';

/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProvidersConfirmDispatch} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-list/confirm-dispatch-list.models';
import {ImpCDDashBoardGraficasTotales} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Confirm-Dispatch-List';
const typeApi = 'Confirm-Dispatch-List-Api';

export const CLEAN_DISPATCH_LIST = createAction(
  buildingStringActionType(typeReducer, 'Clean Dispatch List'),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Term Search'),
  props<{searchTerm: string}>(),
);
export const SET_SORT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Sort Selected'),
  props<{sort: DropListOption}>(),
);
export const SET_TYPE_OF_SEARCH = createAction(
  buildingStringActionType(typeReducer, 'Set Type of Search'),
  props<{typeOfSearch: DropListOption}>(),
);
export const FETCH_PROVIDERS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Providers Load'),
);
export const FETCH_PROVIDERS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Providers Success'),
  props<{providers: Array<IProvidersConfirmDispatch>}>(),
);
export const FETCH_PROVIDERS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Providers Failed'),
);
export const FETCH_DATA_CHARTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Data Charts Load'),
);
export const FETCH_DATA_CHARTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Data Charts Success'),
  props<{dataCharts: ImpCDDashBoardGraficasTotales}>(),
);
export const FETCH_DATA_CHARTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Data Charts Failed'),
);
export const SET_PROVIDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Provider Selected'),
  props<{providerSelected: IProvidersConfirmDispatch}>(),
);
