import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'SecurityGuard';

export const SET_IS_IN_DETAILS_VIEW = createAction(
  buildingStringActionType(typeReducer, 'Set Is Details'),
  props<{detailsMode: boolean}>(),
);

export const SET_ALLOWED_TO_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set Allowed To Details'),
  props<{allowToDetails: boolean}>(),
);
export const SET_NEW_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set New Contact'),
  props<{newContact: boolean}>(),
);

export const SET_EDIT_MODE = createAction(
  buildingStringActionType(typeReducer, 'Set Edit Mode'),
  props<{editMode: boolean}>(),
);
