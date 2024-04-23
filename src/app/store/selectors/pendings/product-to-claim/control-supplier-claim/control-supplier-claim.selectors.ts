/* Store Imports */
import {createSelector} from '@ngrx/store';
import {selectProductToClaim} from '@appSelectors/pendings/pendings.selectors';
import {IProductsToClaimState} from '@appModels/store/pendings/product-to-claim/product-to-claim.models';
import {IControlSupplierClaim} from '@appModels/store/pendings/product-to-claim/control-supplier-claim/control-supplier-claim.models';

export const selectControlSupplierClaim = createSelector(
  selectProductToClaim,
  (state: IProductsToClaimState) => state.controlSupplierClaim,
);
export const selectTitle = createSelector(
  selectControlSupplierClaim,
  (state: IControlSupplierClaim) => state.title,
);
export const selectControlSupplierClaimList = createSelector(
  selectControlSupplierClaim,
  (state: IControlSupplierClaim) => state.controlSupplierClaimList,
);
export const selectControlSupplierClaimDetails = createSelector(
  selectControlSupplierClaim,
  (state: IControlSupplierClaim) => state.controlSupplierClaimDetails,
);
export const selectIsInDetailsView = createSelector(
  selectControlSupplierClaim,
  (state: IControlSupplierClaim) => state.detailsMode,
);
export const selectAllowedToDetails = createSelector(
  selectControlSupplierClaim,
  (state: IControlSupplierClaim) => state.allowToDetails,
);
