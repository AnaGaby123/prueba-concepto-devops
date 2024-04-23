/* Store Imports */
import {ActionReducer, combineReducers, createReducer} from '@ngrx/store';

/* Reducers Imports */
import {loadMissingListReducer} from '@appReducers/pendings/imports/load-missing/load-missing-list/load-missing-list.reducer';

/* Models Imports */
import {
  ILoadMissingState,
  TITLE_LOAD_MISSING,
} from '@appModels/store/pendings/imports/load-missing/load-missing.models';

/* Actions Imports */

export const loadMissingReducer: ActionReducer<ILoadMissingState> = combineReducers({
  title: createReducer(TITLE_LOAD_MISSING),
  detailsMode: createReducer(false),
  loadMissingList: loadMissingListReducer,
});
