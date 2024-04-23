import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'Api Process Details';
const typeReducer = 'Process Details';

export const SET_CLIENT_SELECTED_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set Client Selected LOAD'),
  props<{client: any}>(),
);
export const SET_QUOTES = createAction(
  buildingStringActionType(typeReducer, 'Set Quotes'),
  props<{quotes: any}>(),
);
