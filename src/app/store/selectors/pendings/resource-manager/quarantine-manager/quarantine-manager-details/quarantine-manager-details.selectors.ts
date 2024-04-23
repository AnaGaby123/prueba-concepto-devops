/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectQuarantineManagerDetails} from '@appSelectors/pendings/resource-manager/quarantine-manager/quarantine-manager.selectors';

/* Models Imports */
import {IQuarantineManagerDetails} from '@appModels/store/pendings/resource-manager/quarantine-manager/quarantine-manager-details/quarantine-manager-details.models';

export const selectSearchTerm = createSelector(
  selectQuarantineManagerDetails,
  (state: IQuarantineManagerDetails) => state.searchTerm,
);

export const selectSearchOC = createSelector(
  selectQuarantineManagerDetails,
  (state: IQuarantineManagerDetails) => state.searchOC,
);
export const selectFilters = createSelector(
  selectQuarantineManagerDetails,
  (state: IQuarantineManagerDetails) => state.filterOptions,
);
export const filterSelected = createSelector(
  selectQuarantineManagerDetails,
  (state: IQuarantineManagerDetails) => state.filterSelected,
);
