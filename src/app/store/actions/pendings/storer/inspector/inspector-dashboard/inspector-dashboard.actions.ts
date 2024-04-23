/* Core Imports */
import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Inspector-Dashboard [Reducer]';
const typeApi = 'Inspector-Dashboard [Api]';

export const SET_SELECTED_TAB = createAction(
  buildingStringActionType(typeReducer, 'Set selected tab'),
  props<{tab: ITabOption}>(),
);
export const RESTORE_ALL = createAction(buildingStringActionType(typeReducer, 'Restore All'));
