/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectPurchasingManager} from '@appSelectors/pendings/pendings.selectors';

/* Models Imports */
import {IPurchasingManagerState} from '@appModels/store/pendings/purchasing-manager/purchasing-manager.models';
import {IRegisterArrival} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival.models';

export const selectRegisterArrival = createSelector(
  selectPurchasingManager,
  (state: IPurchasingManagerState) => state.registerArrival,
);
export const selectTitle = createSelector(
  selectRegisterArrival,
  (state: IRegisterArrival) => state.title,
);
export const selectIsDetails = createSelector(
  selectRegisterArrival,
  (state: IRegisterArrival) =>
    state.registerArrivalDetails.stepsComponent.isInStepsView ||
    state.registerArrivalDetails.barcodeComponent.isInBarcodeView,
);
export const selectRegisterArrivalList = createSelector(
  selectRegisterArrival,
  (state: IRegisterArrival) => state.registerArrivalList,
);
export const selectRegisterArrivalDetails = createSelector(
  selectRegisterArrival,
  (state: IRegisterArrival) => state.registerArrivalDetails,
);
