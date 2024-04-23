/* Core Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectPurchasingManager} from '@appSelectors/pendings/pendings.selectors';

/* Models Imports */
import {IPurchasingManagerState} from '@appModels/store/pendings/purchasing-manager/purchasing-manager.models';
import {ICheckOcNotArrived} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived.models';

export const selectCheckOcNotArrived = createSelector(
  selectPurchasingManager,
  (state: IPurchasingManagerState) => state.checkOcNotArrived,
);
export const selectTitle = createSelector(
  selectCheckOcNotArrived,
  (state: ICheckOcNotArrived) => state.title,
);
export const selectCheckOcNotArrivedList = createSelector(
  selectCheckOcNotArrived,
  (state: ICheckOcNotArrived) => state.checkOcNotArrivedList,
);
export const selectCheckOcNotArrivedDetails = createSelector(
  selectCheckOcNotArrived,
  (state: ICheckOcNotArrived) => state.checkOcNotArrivedDetails,
);
export const selectIsInDetailsView = createSelector(
  selectCheckOcNotArrived,
  (state: ICheckOcNotArrived) => state.isInDetailsView,
);
export const selectAllowedToDetails = createSelector(
  selectCheckOcNotArrived,
  (state: ICheckOcNotArrived) => state.allowedToDetails,
);
