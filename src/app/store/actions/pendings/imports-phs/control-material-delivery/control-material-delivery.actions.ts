import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Control-Material-Delivery';

export const SET_IS_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set Is Details'),
  props<{isDetails: boolean}>(),
);
