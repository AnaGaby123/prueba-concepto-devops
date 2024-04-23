import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'Api Close Offer';
const typeReducer = 'Close Offer';

export const SET_ALLOWED_TO_DETAILS_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set allowed to details'),
  props<{allowedToDetails: boolean}>(),
);
export const SET_IS_IN_DETAILS_VIEW = createAction(
  buildingStringActionType(typeReducer, 'Set is in details view'),
  props<{isInDetailsView: boolean}>(),
);
export const SET_IS_IN_REVIEW_VIEW = createAction(
  buildingStringActionType(typeReducer, 'Set is in review view'),
  props<{reviewView: boolean}>(),
);
