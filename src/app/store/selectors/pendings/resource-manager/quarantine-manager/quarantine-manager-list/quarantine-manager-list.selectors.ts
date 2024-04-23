/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectQuarantineManagerList} from '@appSelectors/pendings/resource-manager/quarantine-manager/quarantine-manager.selectors';

/* Models Imports */
import {IQuarantineManagerList} from '@appModels/store/pendings/resource-manager/quarantine-manager/quarantine-manager-list/quarantine-manager-list.models';

export const selectSearchTerm = createSelector(
  selectQuarantineManagerList,
  (state: IQuarantineManagerList) => state.searchTerm,
);
export const selectFilters = createSelector(
  selectQuarantineManagerList,
  (state: IQuarantineManagerList) => state.filterOptions,
);
export const filterSelected = createSelector(
  selectQuarantineManagerList,
  (state: IQuarantineManagerList) => state.filterSelected,
);
