/* Store Imports */
import {createAction, props} from '@ngrx/store';

/* Models Imports */
import {ImpListaArribo, ImpOrdenDespacho} from 'api-logistica';
import {
  IPlanDispatchArrivalList,
  IProvider,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.models';
import {
  IDispatchOrder,
  IGroupArrivalList,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-details/plan-dispatch-details.models';

/* Utils Imports */
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Plan-Dispatch-Details';
const typeApi = 'Plan-Dispatch-Details-Api';

export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all details state'),
);
export const CLEAN_ALL_DETAILS_STEPS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all details steps state'),
);
export const SET_STEP_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Step'),
  props<{selectedStep: number; direction: string}>(),
);
export const SET_SELECTED_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Provider'),
  props<{selectedProvider: IProvider}>(),
);
export const SET_SELECTED_STEP_1_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Step 1 Provider'),
  props<{providerId: string}>(),
);
export const SET_ARRIVAL_LIST_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set Arrival List Is Open'),
  props<{arrivalListId: string}>(),
);
export const SET_PROVIDER_DISPATCH_ORDER_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set Provider Dispatch Order Is Open'),
  props<{providerName: string}>(),
);
export const FETCH_DISPATCH_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Dispatch Orders Success'),
  props<{dispatchOrdersList: Array<IDispatchOrder>}>(),
);
export const FETCH_DISPATCH_ORDERS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Dispatch Orders Failed'),
  props<{error: any}>(),
);
export const SET_SELECTED_DISPATCH_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Dispatch Order'),
  props<{selectedDispatchOrder: IDispatchOrder}>(),
);
export const INIT_NEW_DISPATCH_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Init New Dispatch Order'),
);
export const INIT_STEP_1 = createAction(buildingStringActionType(typeReducer, 'Init Step 1'));
export const REFRESH_SELECTED_DISPATCH_ORDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Dispatch Order Load'),
);
export const REFRESH_SELECTED_DISPATCH_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Dispatch Order Success'),
  props<{selectedDispatchOrder: ImpOrdenDespacho}>(),
);
export const REFRESH_SELECTED_DISPATCH_ORDER_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Dispatch Order Failed'),
);
export const FETCH_STEP_1_PROVIDERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Step 1 Providers Load'),
);
export const FETCH_STEP_1_PROVIDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Step 1 Providers Success'),
  props<{providersList: Array<IProvider>}>(),
);
export const FETCH_STEP_1_PROVIDERS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Step 1 Providers Failed'),
);
export const REFRESH_STEP_1_SELECTED_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Refresh Step 1 Selected Provider Success'),
  props<{selectedProvider: IProvider}>(),
);
export const REFRESH_STEP_1_SELECTED_PROVIDER_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Refresh Step 1 Selected Provider Failed'),
);
export const REFRESH_ALL_STEP_1_PROVIDERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Refresh All Step 1 Providers Load'),
);
export const FETCH_STEP_1_ARRIVAL_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Step 1 Arrival List Success'),
  props<{arrivalList: Array<IPlanDispatchArrivalList>}>(),
);
export const FETCH_STEP_1_ARRIVAL_LIST_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Step 1 Arrival List Failed'),
);
export const FETCH_STEP_1_ARRIVAL_LIST_IN_OD_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Step 1 Arrival List In OD Load'),
);
export const FETCH_STEP_1_ARRIVAL_LIST_IN_OD_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Step 1 Arrival List In OD Success'),
  props<{arrivalListGroup: IGroupArrivalList}>(),
);
export const FETCH_STEP_1_ARRIVAL_LIST_IN_OD_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Step 1 Arrival List In OD Failed'),
);
export const SET_STEP_1_PROVIDERS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Step 1 Providers Status'),
  props<{providersStatus: number}>(),
);
export const SET_STEP_1_ARRIVAL_LIST_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Step 1 Arrival List Status'),
  props<{arrivalListStatus: number}>(),
);
export const SET_RADIO_BUTTON_ID = createAction(
  buildingStringActionType(typeReducer, 'Set Radio Button Id'),
  props<{node: string; radioButtonId: string | boolean}>(),
);
export const SAVE_DISPATCH_ORDER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save Dispatch Order Load'),
);
export const SAVE_DISPATCH_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save Dispatch Order Success'),
  props<{dispatchOrderId: string}>(),
);
export const SAVE_DISPATCH_ORDER_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save Dispatch Order Failed'),
);
export const INITIAL_PROVIDER_STEP_1 = createAction(
  buildingStringActionType(typeReducer, 'Initial Provider Step 1'),
  props<{selectedProvider: IProvider}>(),
);
export const SET_PROVIDERS_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Providers Search Term'),
  props<{providersSearchTerm: string}>(),
);
export const ADD_TO_DISPATCH_ORDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Add Arrival List To Dispatch Order Load'),
  props<{arrivalList: ImpListaArribo}>(),
);
export const ADD_TO_DISPATCH_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Add Arrival List To Dispatch Order Success'),
);
export const ADD_TO_DISPATCH_ORDER_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Add Arrival List To Dispatch Order Failed'),
);
