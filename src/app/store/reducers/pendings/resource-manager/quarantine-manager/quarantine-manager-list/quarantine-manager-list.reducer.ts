/* Store Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Actions Imports */
import {quarantineManagerListActions} from '@appActions/pendings/resource-manager/quarantine-manager';

import {
  initialIQuarantineManagerList,
  IQuarantineManagerList,
} from '@appModels/store/pendings/resource-manager/quarantine-manager/quarantine-manager-list/quarantine-manager-list.models';

export const quarantineManagerListReducer: ActionReducer<IQuarantineManagerList> = createReducer(
  initialIQuarantineManagerList(),
  on(quarantineManagerListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
  on(quarantineManagerListActions.SET_FILTER_SELECTED, (state, {filter}) => ({
    ...state,
    filterSelected: filter,
  })),
);
