import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Declare-Arrival';
export const SET_IS_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set Is Details'),
  props<{detailsMode: boolean}>(),
);
export const SET_ALLOW_TO_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set Allow To Details'),
  props<{allowToDetails: boolean}>(),
);
