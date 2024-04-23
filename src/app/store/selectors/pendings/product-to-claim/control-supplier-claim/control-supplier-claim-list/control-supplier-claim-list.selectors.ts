/* Store Imports */
import {createSelector} from '@ngrx/store';
/* Selectors Imports */
import {selectControlSupplierClaimList} from '@appSelectors/pendings/product-to-claim/control-supplier-claim/control-supplier-claim.selectors';
/* Models Imports */
import {IControlSupplierClaimList} from '@appModels/store/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-list/control-supplier-claim-list.models';

export const selectSearchTerm = createSelector(
  selectControlSupplierClaimList,
  (state: IControlSupplierClaimList) => state.searchTerm,
);
export const selectSortOptions = createSelector(
  selectControlSupplierClaimList,
  (state: IControlSupplierClaimList) => state.sortOptions,
);
export const selectSortSelected = createSelector(
  selectControlSupplierClaimList,
  (state: IControlSupplierClaimList) => state.sortSelected,
);
export const selectTabs = createSelector(
  selectControlSupplierClaimList,
  (state: IControlSupplierClaimList) => state.tabOptions,
);
export const selectSelectedTab = createSelector(
  selectControlSupplierClaimList,
  (state: IControlSupplierClaimList) => state.tabSelected,
);
