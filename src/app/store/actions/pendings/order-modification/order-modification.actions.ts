import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Order-Modification';
export const SET_TITLE = createAction(buildingStringActionType(typeReducer, 'Set Title'));
export const SET_IS_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set is Details'),
  props<{detailsMode: boolean}>(),
);
export const SET_ALLOWED_TO_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set allowed to Details'),
  props<{allowedToDetails: boolean}>(),
);
