/* Core Imports */
import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Inspector-details [Reducer]';
const typeApi = 'Inpector-details [Api]';

export const SET_STEP = createAction(
  buildingStringActionType(typeReducer, 'Set step'),
  props<{step: number}>(),
);
export const RESTORE_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Restore details'),
);
export const SET_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set tab selected'),
  props<{tab: ITabOption}>(),
);
