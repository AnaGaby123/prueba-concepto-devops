import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'ShippingPaidByCustomerDetails';
const typeApi = 'ShippingPaidByCustomerDetailsApi';

export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean All Details State'),
);
export const SET_SELECTED_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Client'),
  props<{selectedClient: any}>(),
);
export const FETCH_PACKING_LIST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Packing List Load'),
);
export const FETCH_PACKING_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Packing List Success'),
  props<{packingList: Array<any>}>(),
);
export const SET_SELECTED_PACKING_LIST = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Packing List'),
  props<{packingListId: string}>(),
);
export const SET_PACKING_LIST_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Packing List Status'),
  props<{packingListStatus: number}>(),
);
