/* Store Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  ILoadBalanceInFavorDetails,
  initialILoadBalanceInFavorDetails,
} from '@appModels/store/pendings/load-balance-in-favor/load-balance-in-favor-details/load-balance-in-favor-details.models';

/* Actions Imports */
import {loadBalanceInFavorDetailsActions} from '@appActions/pendings/load-balance-in-favor';

export const loadBalanceInFavorDetailsReducer: ActionReducer<ILoadBalanceInFavorDetails> = createReducer(
  initialILoadBalanceInFavorDetails(),
  on(loadBalanceInFavorDetailsActions.SET_COMPANY_SELECTED, (state, {companySelected}) => ({
    ...state,
    companySelected,
  })),
);
