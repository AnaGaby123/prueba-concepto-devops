/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectLoadBalanceInFavor} from '@appSelectors/pendings/pendings.selectors';

/* Models Imports */
import {ILoadBalanceInFavor} from '@appModels/store/pendings/load-balance-in-favor/load-balance-in-favor.models';

export const selectTitle = createSelector(
  selectLoadBalanceInFavor,
  (state: ILoadBalanceInFavor) => state.title,
);
export const selectBalanceInFavorList = createSelector(
  selectLoadBalanceInFavor,
  (state: ILoadBalanceInFavor) => state.loadBalanceInFavorList,
);
export const selectBalanceInFavorDetails = createSelector(
  selectLoadBalanceInFavor,
  (state: ILoadBalanceInFavor) => state.loadBalanceInFavorDetails,
);
export const selectIsInDetailsView = createSelector(
  selectLoadBalanceInFavor,
  (state: ILoadBalanceInFavor) => state.detailsMode,
);
export const selectAllowedToDetails = createSelector(
  selectLoadBalanceInFavor,
  (state: ILoadBalanceInFavor) => state.allowToDetails,
);
