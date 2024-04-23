/* Core Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  ILoadMissingList,
  initialILoadMissingList,
} from '@appModels/store/pendings/imports/load-missing/load-missing-list/load-missing-list.models';

/* Actions Imports */
import {loadMissingListActions} from '@appActions/pendings/imports/load-missing';

const initialLoadMissingList: ILoadMissingList = {
  ...initialILoadMissingList(),
};

export const loadMissingListReducer: ActionReducer<ILoadMissingList> = createReducer(
  initialLoadMissingList,
  on(loadMissingListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
);
