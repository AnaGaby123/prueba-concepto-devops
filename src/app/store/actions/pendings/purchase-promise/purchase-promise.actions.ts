import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Purchase-Promise';
export const SET_IS_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set is details'),
  props<{isDetails: boolean}>(),
);
