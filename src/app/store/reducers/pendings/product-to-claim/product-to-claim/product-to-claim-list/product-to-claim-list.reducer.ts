/* Store Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialIProductToClaimList,
  IProductToClaimList,
} from '@appModels/store/pendings/product-to-claim/product-to-claim/product-to-claim-list/product-to-claim-list.models';

/* Actions Imports */
import {productToClaimListActions} from '@appActions/pendings/product-to-claim/product-to-claim';

export const productToClaimListReducer: ActionReducer<IProductToClaimList> = createReducer(
  initialIProductToClaimList(),
  on(productToClaimListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
  on(productToClaimListActions.SET_FILTER_SELECTED, (state, {filter}) => ({
    ...state,
    filterSelected: filter,
  })),
);
