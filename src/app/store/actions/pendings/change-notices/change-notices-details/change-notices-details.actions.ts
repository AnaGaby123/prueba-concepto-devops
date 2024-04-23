import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'ChangeNoticesDetails';
const typeApi = 'ChangeNoticesDetailsApi';

export const SET_SELECTED_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Client'),
  props<{selectedClient: any}>(),
);
export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean All Details State'),
);
export const FETCH_PURCHASE_PRODUCTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchase Products Load'),
);
export const FETCH_PURCHASE_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Products Success'),
  props<{products: Array<any>}>(),
);
export const SET_PRODUCTS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Products status'),
  props<{productsStatus: number}>(),
);
export const SET_SELECTED_TAB_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Tab Option'),
  props<{selectedTabOption: ITabOption}>(),
);
export const SET_SORT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Sort Selected'),
  props<{filterByType: DropListOption}>(),
);
export const SET_SEARCH_TYPE_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Search Type Selected'),
  props<{selectedSearchTermOption: DropListOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_SELECTED_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Product'),
  props<{productId: string}>(),
);
