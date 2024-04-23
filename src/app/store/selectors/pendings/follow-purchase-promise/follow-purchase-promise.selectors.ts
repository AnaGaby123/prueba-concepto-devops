import {createSelector} from '@ngrx/store';
import {selectFollowPurchasePromise} from '@appSelectors/pendings/pendings.selectors';
import {IFollowPurchasePromiseState} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise.models';

export const selectFollowPPromise = createSelector(selectFollowPurchasePromise, (state) => state);
export const selectTitle = createSelector(selectFollowPPromise, (state) => state.title);
export const selectAllowedToDetails = createSelector(
  selectFollowPPromise,
  (state: IFollowPurchasePromiseState) => state.allowToDetailsView,
);
export const selectIsDetails = createSelector(
  selectFollowPPromise,
  (state) => state.isInDetailsView,
);
