import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'ProviderForm';

export const SET_MODE_EDIT = createAction(
  '[ProviderForm] Set edit mode',
  props<{modeEdit: boolean}>(),
);
export const SET_ADD_EDIT_COMPONENT = createAction(
  '[ProviderForm] Set add or edit component',
  props<{addEditComponent: boolean}>(),
);
export const SET_TITLE = createAction('[ProviderForm] Set title', props<{title: string}>());
export const SET_ENABLE_EDIT = createAction(
  '[ProviderForm] Set enable edit',
  props<{enableEdit: boolean}>(),
);
export const SET_ACTUAL_STEP = createAction(
  '[ProviderForm] Set actual step',
  props<{step: number}>(),
);
export const CLEAN_ALL_PROVIDERS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all providers state'),
);
export const RETURN_MAIN_PAGE_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Return main page component effect'),
);
