/* Store Imports */
import {createAction, props} from '@ngrx/store';
/* Utils Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Control-Supplier-Claim-Details-Reducer';

export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_SORT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Sort Selected'),
  props<{sort: DropListOption}>(),
);
export const SET_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Selected'),
  props<{tab: ITabOption}>(),
);
