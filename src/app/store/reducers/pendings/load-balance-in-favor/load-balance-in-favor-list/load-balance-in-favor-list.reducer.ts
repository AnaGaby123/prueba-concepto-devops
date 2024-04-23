/* Store Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  ILoadBalanceInFavorList,
  initialILoadBalanceInFavorList,
} from '@appModels/store/pendings/load-balance-in-favor/load-balance-in-favor-list/load-balance-in-favor-list.models';

/* Actions Imports */
import {loadBalanceInFavorListActions} from '@appActions/pendings/load-balance-in-favor';

export const loadBalanceInFavorListReducer: ActionReducer<ILoadBalanceInFavorList> = createReducer(
  initialILoadBalanceInFavorList(),
  on(loadBalanceInFavorListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
);
