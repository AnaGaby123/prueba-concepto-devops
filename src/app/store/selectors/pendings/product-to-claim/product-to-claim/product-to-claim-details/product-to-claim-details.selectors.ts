/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectProductToClaimDetails} from '@appSelectors/pendings/product-to-claim/product-to-claim/product-to-claim.selectors';

/* Models Imports */
import {IProductToClaimDetails} from '@appModels/store/pendings/product-to-claim/product-to-claim/product-to-claim-details/product-to-claim-details.models';
import {IProductToClaimList} from '@appModels/store/pendings/product-to-claim/product-to-claim/product-to-claim-list/product-to-claim-list.models';

export const selectSearchTerm = createSelector(
  selectProductToClaimDetails,
  (state: IProductToClaimDetails) => state.searchTerm,
);
export const selectFilters = createSelector(
  selectProductToClaimDetails,
  (state: IProductToClaimList) => state.filterOptions,
);
export const filterSelected = createSelector(
  selectProductToClaimDetails,
  (state: IProductToClaimList) => state.filterSelected,
);
