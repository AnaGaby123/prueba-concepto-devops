import {createSelector} from '@ngrx/store';
import {selectPurchasePromise} from '@appSelectors/pendings/pendings.selectors';
import {IPurchasePromiseState} from '@appModels/store/pendings/purchase-promise/purchase-promise.model';

export const selectTitle = createSelector(
  selectPurchasePromise,
  (state: IPurchasePromiseState) => state.title,
);
export const selectAllowedToDetailsView = createSelector(
  selectPurchasePromise,
  (state: IPurchasePromiseState) => state.allowedToDetailsView,
);
export const selectIsDetails = createSelector(
  selectPurchasePromise,
  (state: IPurchasePromiseState) => state.isInDetailsView,
);
