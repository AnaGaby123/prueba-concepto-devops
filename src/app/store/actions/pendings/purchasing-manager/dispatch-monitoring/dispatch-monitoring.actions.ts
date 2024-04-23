import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Dispatch-Monitoring';

export const SET_IS_IN_DETAILS_VIEW = createAction(
  buildingStringActionType(typeReducer, 'Set is Details'),
  props<{isInDetailsView: boolean}>(),
);
export const SET_ALLOWED_TO_DETAILS_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set allowed to details'),
  props<{allowedToDetails: boolean}>(),
);
