import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Payment Order';
const typeApi = 'Api Payment Order';

export const SET_WEEK = createAction(
  buildingStringActionType(typeReducer, 'Set Week'),
  props<{week: any}>(),
);
