/* Store Imports */
import {createAction, props} from '@ngrx/store';

/* Utils Imports */
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Product-To-Claim';

export const SET_IS_IN_DETAILS_VIEW = createAction(
  buildingStringActionType(typeReducer, 'Set Is Details'),
  props<{detailsMode: boolean}>(),
);
export const SET_ALLOWED_TO_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set Allowed to Details'),
  props<{allowToDetails: boolean}>(),
);
