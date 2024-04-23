/* Models Imports */
import {
  initialIProductToClaim,
  IProductToClaim,
} from '@appModels/store/pendings/product-to-claim/product-to-claim/product-to-claim.models';
import {
  IControlSupplierClaim,
  initialIControlSupplierClaim,
} from '@appModels/store/pendings/product-to-claim/control-supplier-claim/control-supplier-claim.models';

export interface IProductsToClaimState {
  productToClaim: IProductToClaim;
  controlSupplierClaim: IControlSupplierClaim;
}

export const initialIProductToClaimState = (): IProductsToClaimState => ({
  productToClaim: initialIProductToClaim(),
  controlSupplierClaim: initialIControlSupplierClaim(),
});
