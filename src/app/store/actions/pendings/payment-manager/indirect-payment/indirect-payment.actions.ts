import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Indirect Payment';
const typeApi = 'Api Indirect Payment';

export const SET_SEE_RESUME = createAction(
  buildingStringActionType(typeReducer, 'Set See Resume'),
  props<{seeResume: boolean}>(),
);
