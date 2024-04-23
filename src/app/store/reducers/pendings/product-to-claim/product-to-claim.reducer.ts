/* Store Imports */
import {ActionReducer, combineReducers} from '@ngrx/store';
/* Models Import */
import {IProductsToClaimState} from '@appModels/store/pendings/product-to-claim/product-to-claim.models';
/* Reducers Imports */
import {productToClaimReducer} from '@appReducers/pendings/product-to-claim/product-to-claim/product-to-claim.reducer';
import {controlSupplierClaimReducer} from '@appReducers/pendings/product-to-claim/control-supplier-claim/control-supplier-claim.reducer';

export const ProductToClaimReducer: ActionReducer<IProductsToClaimState> = combineReducers({
  productToClaim: productToClaimReducer,
  controlSupplierClaim: controlSupplierClaimReducer,
});
