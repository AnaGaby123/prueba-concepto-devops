import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Reducer - [Regulatory-research]';

export const SET_TITTLE = createAction(
  buildingStringActionType(typeReducer, 'Set title'),
  props<{title: string}>(),
);
export const SET_IS_IN_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set is in details'),
  props<{isInDetails: boolean}>(),
);
export const SET_ALLOW_TO_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set allow to details'),
  props<{allowToDetails: boolean}>(),
);
export const SET_ENABLE_EDIT = createAction(
  buildingStringActionType(typeReducer, 'Set enable edit'),
  props<{enableEdit: boolean}>(),
);
