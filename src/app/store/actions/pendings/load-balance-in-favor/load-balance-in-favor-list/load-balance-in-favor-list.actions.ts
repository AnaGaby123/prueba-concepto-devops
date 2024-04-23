/* Store Imports */
import {createAction, props} from '@ngrx/store';

/* Utils Imports */
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Load-Balance-In-Favor-List';

export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Is Details'),
  props<{searchTerm: string}>(),
);
