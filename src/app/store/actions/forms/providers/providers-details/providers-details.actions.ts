import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = '[Provider Details Actions]';

export const SAVE_PROVIDER_DATA = createAction('[ProviderFormStep1] Save data providers');
export const SET_INITIAL_DATA_ADD_EDIT_PROVIDER = createAction(
  '[ProviderFormStep1] set initial data add edit provider',
);
export const SET_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Selected'),
  props<{tab: ITabOption}>(),
);
export const TAB_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Tab Effect'),
  props<{tab: ITabOption}>(),
);
export const SET_IS_IN_TRADEMARK = createAction(
  buildingStringActionType(typeReducer, 'Set Is In Trademark'),
  props<{isInTrademark: boolean}>(),
);
export const SET_TRADEMARK_PAGE_BAR_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Trademark Page Bar Option'),
  props<{option: OptionBar}>(),
);
export const ON_INIT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Oninit component effect'),
);
export const SAVE_STEPS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Save steps component effect'),
  props<{stepId: string}>(),
);
export const EDIT_BUTTON_HANDLER_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Edit button handler component effect'),
);
export const RESTORE_BACKUP_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Restore backup component effect'),
);
export const SAVE_HANDLER_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Save handler component effect'),
);
export const CLOSE_ALERT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Close alert component effect'),
  props<{status: boolean}>(),
);
// DOCS: ACTION TO SHOW CONFIRM DIALOG
export const SHOW_CONFIRM_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Cancel Dialog'),
  props<{isEdit: boolean}>(),
);
export const CANCEL_HANDLER_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Cancel handler component effect'),
);
export const TRADEMARK_OFFER_ALERT_POP = createAction(
  buildingStringActionType(typeReducer, 'Trademark offer alert pop'),
  props<{active: boolean}>(),
);
export const SET_PRESELECTED_TAB = createAction(
  buildingStringActionType(typeReducer, 'Set Preselected Tab'),
  props<{preSelectedTab: ITabOption}>(),
);
export const INIT_TRADEMARK_PAGE_BAR_OPTIONS = createAction(
  buildingStringActionType(typeReducer, 'Init Trademark Page Bar Options'),
);
export const TRADEMARK_CHECK_CHANGES = createAction(
  buildingStringActionType(typeReducer, 'Check Changes'),
  props<{option: OptionBar}>(),
);
