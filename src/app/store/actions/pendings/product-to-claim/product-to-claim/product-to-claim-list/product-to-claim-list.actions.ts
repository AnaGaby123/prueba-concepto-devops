/* Store Imports */
import {createAction, props} from '@ngrx/store';

/* Utils Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Product-To-Claim-List';

export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_FILTER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Filter Selected'),
  props<{filter: DropListOption}>(),
);
