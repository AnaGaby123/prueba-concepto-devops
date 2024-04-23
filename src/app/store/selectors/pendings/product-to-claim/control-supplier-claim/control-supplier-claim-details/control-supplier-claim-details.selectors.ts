/* Store Imports */
import {createSelector} from '@ngrx/store';
/* Selectors Imports */
import {selectControlSupplierClaimDetails} from '@appSelectors/pendings/product-to-claim/control-supplier-claim/control-supplier-claim.selectors';
/* Models Imports */
import {IControlSupplierClaimDetails} from '@appModels/store/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-details/control-supplier-claim-details.models';

export const selectSearchTerm = createSelector(
  selectControlSupplierClaimDetails,
  (state: IControlSupplierClaimDetails) => state.searchTerm,
);
export const selectSortOptions = createSelector(
  selectControlSupplierClaimDetails,
  (state: IControlSupplierClaimDetails) => state.sortOptions,
);
export const selectSortSelected = createSelector(
  selectControlSupplierClaimDetails,
  (state: IControlSupplierClaimDetails) => state.sortSelected,
);
export const selectTabs = createSelector(
  selectControlSupplierClaimDetails,
  (state: IControlSupplierClaimDetails) => state.tabOptions,
);
export const selectSelectedTab = createSelector(
  selectControlSupplierClaimDetails,
  (state: IControlSupplierClaimDetails) => state.tabSelected,
);
