/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectProductToClaim} from '@appSelectors/pendings/pendings.selectors';

/* Models Imports */
import {IProductToClaim} from '@appModels/store/pendings/product-to-claim/product-to-claim/product-to-claim.models';
import {IProductsToClaimState} from '@appModels/store/pendings/product-to-claim/product-to-claim.models';

export const selectProductClaim = createSelector(
  selectProductToClaim,
  (state: IProductsToClaimState) => state.productToClaim,
);

export const selectTitle = createSelector(
  selectProductClaim,
  (state: IProductToClaim) => state.title,
);
export const selectProductToClaimList = createSelector(
  selectProductClaim,
  (state: IProductToClaim) => state.productToClaimList,
);
export const selectProductToClaimDetails = createSelector(
  selectProductClaim,
  (state: IProductToClaim) => state.productToClaimDetails,
);
export const selectIsInDetailsView = createSelector(
  selectProductClaim,
  (state: IProductToClaim) => state.detailsMode,
);
export const selectAllowedToDetails = createSelector(
  selectProductClaim,
  (state: IProductToClaim) => state.allowToDetails,
);
