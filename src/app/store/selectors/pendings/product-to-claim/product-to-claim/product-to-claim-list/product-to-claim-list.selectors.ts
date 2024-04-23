/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectProductToClaimList} from '@appSelectors/pendings/product-to-claim/product-to-claim/product-to-claim.selectors';

/* Models Imports */
import {IProductToClaimList} from '@appModels/store/pendings/product-to-claim/product-to-claim/product-to-claim-list/product-to-claim-list.models';

export const selectSearchTerm = createSelector(
  selectProductToClaimList,
  (state: IProductToClaimList) => state.searchTerm,
);
export const selectFilters = createSelector(
  selectProductToClaimList,
  (state: IProductToClaimList) => state.filterOptions,
);
export const filterSelected = createSelector(
  selectProductToClaimList,
  (state: IProductToClaimList) => state.filterSelected,
);
