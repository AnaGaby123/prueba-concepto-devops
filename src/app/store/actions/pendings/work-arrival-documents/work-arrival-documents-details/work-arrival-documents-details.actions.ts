import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'WorkArrivalDocumentsDetails';
const typeApi = 'WorkArrivalDocumentsDetailsApi';

export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean All Details State'),
);
export const SET_SELECTED_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Provider'),
  props<{selectedProvider: any}>(),
);
export const FETCH_PRODUCTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Products Load'),
);
export const FETCH_PRODUCTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Products Success'),
  props<{products: Array<any>}>(),
);
export const FETCH_CONTACT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Contact Load'),
);
export const FETCH_CONTACT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Contact Success'),
  props<{contact: Array<any>}>(),
);
export const SET_SELECTED_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Product'),
  props<{productId: string}>(),
);
export const SET_PRODUCTS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Products Status'),
  props<{productsStatus: number}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
