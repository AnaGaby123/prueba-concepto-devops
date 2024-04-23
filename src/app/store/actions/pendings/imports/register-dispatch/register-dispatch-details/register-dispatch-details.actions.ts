import {createAction, props} from '@ngrx/store';
import {ICustomBroken} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-list/register-dispatch-list.models';
import {
  IDispatchOrder,
  IItemsDispatchOrder,
} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-details/register-dispatch-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'RegisterDispatchDetails';
const typeApi = 'RegisterDispatchDetailsApi';

export const SET_SELECTED_AGENT = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Agent'),
  props<{selectedCustomBroker: ICustomBroken}>(),
);
export const SET_ACTUAL_STEP = createAction(
  buildingStringActionType(typeReducer, 'Set Actual step'),
  props<{actualStep: number}>(),
);
export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all details state'),
);
export const READ_BARCODE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Read Barcode Load'),
  props<{barcode: string}>(),
);
export const READ_BARCODE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Read Barcode Success'),
);
export const FETCH_USERS_BUYERS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Users Buyers Load'),
);
export const FETCH_USERS_BUYERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Users Buyers Success'),
  props<{usersList: Array<DropListOption>}>(),
);
export const FETCH_PURCHASE_ORDERS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchase Order Load'),
);
export const FETCH_PURCHASE_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Success'),
  props<{dispatchOrders: Array<IDispatchOrder>}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set search term'),
  props<{searchTerm: string}>(),
);
export const SET_ITEMS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set items status'),
  props<{itemsStatus: number}>(),
);
export const SET_ORDERS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set orders status'),
  props<{dispatchOrdersStatus: number}>(),
);
export const INITIAL_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Initial Purchase Order'),
  props<{dispatchOrder: IDispatchOrder}>(),
);
export const FETCH_ITEMS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Items of Order Load'),
);
export const FETCH_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items of Order Success'),
  props<{list: Array<IItemsDispatchOrder>}>(),
);
export const SET_SELECTED_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set selected order'),
  props<{dispatchOrderId: string}>(),
);
export const SET_DISPATCH_ORDER_FIELD_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set dispatch order field value'),
  props<{node: string; value: any}>(),
);
export const SET_PETITION_FILE = createAction(
  buildingStringActionType(typeReducer, 'Set petition file'),
  props<{file: File}>(),
);
export const SET_EVIDENCE_FILES = createAction(
  buildingStringActionType(typeReducer, 'Set evidence files'),
  props<{files: Array<File>}>(),
);
export const FINALIZE_OD_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Finalize OD load'),
);
export const FINALIZE_OD_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Finalize OD success'),
);
export const FINALIZE_OD_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Finalize OD failed'),
);
