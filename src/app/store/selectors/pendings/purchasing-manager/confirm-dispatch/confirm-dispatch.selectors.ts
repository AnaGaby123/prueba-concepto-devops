/* Core Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectPurchasingManager} from '@appSelectors/pendings/pendings.selectors';

/* Models Imports */
import {IPurchasingManagerState} from '@appModels/store/pendings/purchasing-manager/purchasing-manager.models';
import {IConfirmDispatch} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch.models';
import {IConfirmDispatchDetails} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-details/confirm-dispatch-details.models';

export const selectConfirmDispatch = createSelector(
  selectPurchasingManager,
  (state: IPurchasingManagerState) => state.confirmDispatch,
);
export const selectTitle = createSelector(
  selectConfirmDispatch,
  (state: IConfirmDispatch) => state.title,
);
export const selectConfirmDispatchList = createSelector(
  selectConfirmDispatch,
  (state: IConfirmDispatch) => state.confirmDispatchList,
);
export const selectConfirmDispatchDetails = createSelector(
  selectConfirmDispatch,
  (state: IConfirmDispatch): IConfirmDispatchDetails => state.confirmDispatchDetails,
);
export const selectIsInDetailsView = createSelector(
  selectConfirmDispatch,
  (state: IConfirmDispatch) => state.isInDetailsView,
);
export const selectAllowedToDetails = createSelector(
  selectConfirmDispatch,
  (state: IConfirmDispatch) => state.allowedToDetails,
);
