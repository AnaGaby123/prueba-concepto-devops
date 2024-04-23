import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Daily Meeting';

export const SET_DETAILS_MODE = createAction(
  buildingStringActionType(typeReducer, 'Set Details Mode'),
  props<{detailsMode: boolean}>(),
);
export const SET_DETAILS_COMPONENT = createAction(
  buildingStringActionType(typeReducer, 'Set Details Component'),
  props<{detailsComponent: boolean}>(),
);
export const SET_TITLE = createAction(
  buildingStringActionType(typeReducer, 'Set Title'),
  props<{title: string}>(),
);
export const SET_ENABLE_EDIT = createAction(
  buildingStringActionType(typeReducer, 'Set enable edit'),
  props<{enableEdit: boolean}>(),
);
export const CLEAN_ALL_DAILY_MEETING = createAction(
  buildingStringActionType(typeReducer, 'Clean All Daily Meeting'),
);
