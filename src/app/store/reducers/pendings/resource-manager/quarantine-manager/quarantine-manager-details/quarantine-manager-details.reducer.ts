/* Store Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Actions Imports */
import {quarantineManagerDetailsActions} from '@appActions/pendings/resource-manager/quarantine-manager';
import {
  initialIQuarantineManagerDetails,
  IQuarantineManagerDetails,
} from '@appModels/store/pendings/resource-manager/quarantine-manager/quarantine-manager-details/quarantine-manager-details.models';

export const quarantineManagerDetailsReducer: ActionReducer<IQuarantineManagerDetails> = createReducer(
  initialIQuarantineManagerDetails(),
  on(quarantineManagerDetailsActions.SET_SEARCH_OC, (state, {searchOC}) => ({
    ...state,
    searchOC,
  })),
  on(quarantineManagerDetailsActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
  on(quarantineManagerDetailsActions.SET_FILTER_SELECTED, (state, {filter}) => ({
    ...state,
    filterSelected: filter,
  })),
);
