import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

export const typeReducer = 'Attend-Investigation';

export const SET_TITLE = createAction(
  buildingStringActionType(typeReducer, 'Set Title'),
  props<{title: boolean}>(),
);

export const SET_DETAILS_MODE = createAction(
  buildingStringActionType(typeReducer, 'Set Details Mode'),
  props<{detailsMode: boolean}>(),
);

export const SET_ALLOW_TO_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set Allow To Details'),
  props<{allowToDetails: boolean}>(),
);
