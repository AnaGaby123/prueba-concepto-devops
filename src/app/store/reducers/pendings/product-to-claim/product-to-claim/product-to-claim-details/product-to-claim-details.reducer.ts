/* Store Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialIProductToClaimDetails,
  IProductToClaimDetails,
} from '@appModels/store/pendings/product-to-claim/product-to-claim/product-to-claim-details/product-to-claim-details.models';

/* Actions Imports */
import {productToClaimDetailsActions} from '@appActions/pendings/product-to-claim/product-to-claim';

export const productToClaimDetailsReducer: ActionReducer<IProductToClaimDetails> = createReducer(
  initialIProductToClaimDetails(),
  on(productToClaimDetailsActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
  on(productToClaimDetailsActions.SET_FILTER_SELECTED, (state, {filter}) => ({
    ...state,
    filterSelected: filter,
  })),
);
