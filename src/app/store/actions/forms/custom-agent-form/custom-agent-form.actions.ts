import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = '[CustomActionForm]';
export const SET_EDIT_MODE = createAction(
  buildingStringActionType(typeApi, 'Set edit mode'),
  props<{editMode: boolean}>(),
);
export const SET_ENABLE_EDIT = createAction(
  buildingStringActionType(typeApi, 'Set enable edit'),
  props<{enableEdit: boolean}>(),
);
export const SET_ALLOW_TO_DETAILS = createAction(
  buildingStringActionType(typeApi, 'Set allow to details'),
  props<{allowToDetails: boolean}>(),
);
export const SET_IS_IN_DETAILS = createAction(
  buildingStringActionType(typeApi, 'Set is in details'),
  props<{isInDetails: boolean}>(),
);
export const SET_TITLE = createAction(
  buildingStringActionType(typeApi, 'Set title'),
  props<{title: string}>(),
);
