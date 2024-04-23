/* Store Imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  ILoadBalanceInFavor,
  initialILoadBalanceInFavor,
  TITLE_LOAD_BALANCE_IN_FAVOR,
} from '@appModels/store/pendings/load-balance-in-favor/load-balance-in-favor.models';

/* Actions Imports */
import {loadBalanceInFavorActions} from '@appActions/pendings/load-balance-in-favor';

/* Reducers Imports */
import {loadBalanceInFavorListReducer} from '@appReducers/pendings/load-balance-in-favor/load-balance-in-favor-list/load-balance-in-favor-list.reducer';
import {loadBalanceInFavorDetailsReducer} from '@appReducers/pendings/load-balance-in-favor/load-balance-in-favor-details/load-balance-in-favor-details.reducer';

export const loadBalanceInFavorReducer: ActionReducer<ILoadBalanceInFavor> = combineReducers({
  title: createReducer(TITLE_LOAD_BALANCE_IN_FAVOR),
  detailsMode: createReducer(
    initialILoadBalanceInFavor().detailsMode,
    on(loadBalanceInFavorActions.SET_IS_IN_DETAILS_VIEW, (state, {detailsMode}) => detailsMode),
  ),
  allowToDetails: createReducer(
    initialILoadBalanceInFavor().allowToDetails,
    on(
      loadBalanceInFavorActions.SET_ALLOWED_TO_DETAILS,
      (state, {allowToDetails}) => allowToDetails,
    ),
  ),
  loadBalanceInFavorList: loadBalanceInFavorListReducer,
  loadBalanceInFavorDetails: loadBalanceInFavorDetailsReducer,
});
