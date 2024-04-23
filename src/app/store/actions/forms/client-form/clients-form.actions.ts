import {createAction, props} from '@ngrx/store';
import {VCliente} from 'api-catalogos';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = '[clients-form]';

export const RESET_FORM_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Reset form client'),
);
export const SET_CLIENT_ACTUAL_STEP = createAction(
  buildingStringActionType(typeReducer, 'Set client actual step'),
  props<{actualStep: number}>(),
);
export const SET_CLIENT_EDIT_MODE = createAction(
  buildingStringActionType(typeReducer, 'Set client edit mode'),
  props<{editMode: boolean}>(),
);
export const SET_CLIENT_LIST_VIEW = createAction(
  buildingStringActionType(typeReducer, 'Set client list view'),
  props<{clientListView: boolean}>(),
);

// Acciones para reestructura del catalogo

export const SET_TITLE = createAction(
  buildingStringActionType(typeReducer, 'Set title'),
  props<{title: string}>(),
);

export const SET_EDIT_MODE = createAction(
  buildingStringActionType(typeReducer, 'Set edit mode'),
  props<{value: boolean}>(),
);
export const SET_ENABLE_EDIT = createAction(
  buildingStringActionType(typeReducer, 'Set enable edit'),
  props<{value: boolean}>(),
);
export const SET_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set tab selected'),
  props<{tab: ITabOption}>(),
);
export const RESTORE_STATE = createAction(buildingStringActionType(typeReducer, 'Reset state'));
export const SET_IS_IN_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set is in details'),
  props<{value: boolean}>(),
);
export const SET_PRESELECTED_TAB = createAction(
  buildingStringActionType(typeReducer, 'Set preselected tab'),
  props<{preSelectedTab: ITabOption}>(),
);
export const SET_SELECTED_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set selected client'),
  props<{client: VCliente}>(),
);
