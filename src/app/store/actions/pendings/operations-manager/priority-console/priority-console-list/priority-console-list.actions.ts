/* Store Imports */
import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Shipping-Console-List';
const typeApi = 'Shipping-Console-List';

export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_SELECTED_FILTER_BY_PRIORITY = createAction(
  buildingStringActionType(typeReducer, 'Set Filter By Priority'),
  props<{byPriority: DropListOption}>(),
);
export const SET_SELECTED_FILTER_BY_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Filter By Type'),
  props<{byType: DropListOption}>(),
);
export const SET_SELECTED_TAB_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set tab option selected'),
  props<{tabOptionSelected: ITabOption}>(),
);
