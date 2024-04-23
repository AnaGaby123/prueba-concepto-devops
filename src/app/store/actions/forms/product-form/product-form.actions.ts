import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = '[ProductForm]';
const typeApi = '[ProductFormApi]';
export const SET_EDIT_MODE = createAction(
  buildingStringActionType(typeReducer, 'Set edit mode'),
  props<{editMode: boolean}>(),
);
export const SET_ENABLE_EDIT = createAction(
  buildingStringActionType(typeReducer, 'Set enable edit'),
  props<{enableEdit: boolean}>(),
);
export const SET_ADD_EDIT_COMPONENT = createAction(
  buildingStringActionType(typeReducer, 'Set add or edit component'),
  props<{addEditComponent: boolean}>(),
);
export const SET_IS_IN_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set is in details'),
  props<{isInDetails: boolean}>(),
);
export const SET_TITLE = createAction(
  buildingStringActionType(typeReducer, 'Set title'),
  props<{title: string}>(),
);
export const SET_ACTUAL_STEP_NUMBER = createAction(
  buildingStringActionType(typeReducer, 'Set actual Step Number'),
  props<{actualStep: ITabOption}>(),
);
