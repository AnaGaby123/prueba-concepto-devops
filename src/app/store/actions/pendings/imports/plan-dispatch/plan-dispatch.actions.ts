import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Plan-Dispatch';

export const SET_ALLOWED_TO_DETAILS_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set allowed to details'),
  props<{allowedToDetails: boolean}>(),
);
export const SET_IS_IN_DETAILS_VIEW = createAction(
  buildingStringActionType(typeReducer, 'Set is in details view'),
  props<{isInDetailsView: boolean}>(),
);
export const SET_ALLOWED_TO_STEPS_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set allowed to steps'),
  props<{allowedToSteps: boolean}>(),
);
export const SET_IS_IN_STEPS_VIEW = createAction(
  buildingStringActionType(typeReducer, 'Set is in steps'),
  props<{isInSteps: boolean}>(),
);
