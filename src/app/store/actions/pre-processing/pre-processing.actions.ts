import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Pre-Processing';

export const SET_TITLLE = createAction(
  buildingStringActionType(typeReducer, 'Set title'),
  props<{title: string}>(),
);
export const SET_DETAILS_MODE = createAction(
  buildingStringActionType(typeReducer, 'Set Details Mode'),
  props<{detailsMode: boolean}>(),
);
export const SET_DETAILS_COMPONENT = createAction(
  buildingStringActionType(typeReducer, 'Set Details Component'),
  props<{detailsComponent: boolean}>(),
);
export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set Initial State'),
);
