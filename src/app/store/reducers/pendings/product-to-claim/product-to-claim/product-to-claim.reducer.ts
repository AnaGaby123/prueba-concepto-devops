/* Store Imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialIProductToClaim,
  IProductToClaim,
  TITLE_PRODUCT_TO_CLAIM,
} from '@appModels/store/pendings/product-to-claim/product-to-claim/product-to-claim.models';

/* Reducers Imports */
import {productToClaimListReducer} from '@appReducers/pendings/product-to-claim/product-to-claim/product-to-claim-list/product-to-claim-list.reducer';
import {productToClaimDetailsReducer} from '@appReducers/pendings/product-to-claim/product-to-claim/product-to-claim-details/product-to-claim-details.reducer';

/* Actions Imports */
import {productToClaimActions} from '@appActions/pendings/product-to-claim/product-to-claim';

export const productToClaimReducer: ActionReducer<IProductToClaim> = combineReducers({
  title: createReducer(TITLE_PRODUCT_TO_CLAIM),
  detailsMode: createReducer(
    initialIProductToClaim().detailsMode,
    on(productToClaimActions.SET_IS_IN_DETAILS_VIEW, (state, {detailsMode}) => detailsMode),
  ),
  allowToDetails: createReducer(
    initialIProductToClaim().allowToDetails,
    on(productToClaimActions.SET_ALLOWED_TO_DETAILS, (state, {allowToDetails}) => allowToDetails),
  ),
  productToClaimList: productToClaimListReducer,
  productToClaimDetails: productToClaimDetailsReducer,
});
