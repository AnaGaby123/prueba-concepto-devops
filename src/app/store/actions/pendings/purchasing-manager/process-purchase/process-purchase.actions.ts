import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Process-Purchase';

export const SET_IS_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set is Details'),
  props<{isDetails: boolean}>(),
);
