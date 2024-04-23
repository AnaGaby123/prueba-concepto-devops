import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = '[clients-details-form]';

export const SAVE_CLIENTS_SECTION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save Clients Section Load'),
);
export const BACKUP_CLIENTS_SECTION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Backup Clients Sections Load'),
);
export const ON_DESTROY_DETAILS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'On destroy details component effect'),
);
export const SET_TAB_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Set tab component effect'),
  props<{tab: ITabOption}>(),
);
export const DISCARD_OR_CONTINUE_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Discard or continue component effect'),
  props<{value: boolean}>(),
);
export const DISCARD_OR_CONTINUE_CHANGE_TAB_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Discard or continue change tab component effect'),
  props<{value: boolean}>(),
);
export const CANCEL_ADD_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Cancel add component effect'),
);
export const SHOW_CONFIRM_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Confirm Dialog'),
  props<{isFromTab?: boolean}>(), // DOCS: APPEARS WHEN USER TRIES TO CHANGE TAB AND THERE ARE CHANGES
);
export const CANCEL_FORM_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Cancel form component effect'),
);
export const SAVE_DATA_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Save data component effect'),
);
