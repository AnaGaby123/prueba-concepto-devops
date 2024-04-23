import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'ShippingPaidByCustomerList';
const typeApi = 'ShippingPaidByCustomerListApi';

export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_CLIENTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients Load'),
);
export const FETCH_CLIENTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Clients Success'),
  props<{clients: Array<any>}>(),
);
export const SET_CLIENTS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Clients Status'),
  props<{clientsStatus: number}>(),
);
