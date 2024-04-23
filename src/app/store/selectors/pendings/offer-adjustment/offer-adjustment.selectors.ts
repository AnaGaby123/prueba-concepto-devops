import {createSelector} from '@ngrx/store';
import {OfferAdjustmentState} from '@appModels/store/pendings/offer-adjustment/offer-adjustment.model';
import {selectOfferAdjustment} from '@appSelectors/pendings/pendings.selectors';

export const selectOfferAdjustmentList = createSelector(
  selectOfferAdjustment,
  (state: OfferAdjustmentState) => state.offerAdjustmentList,
);
export const selectOfferAdjustmentDetails = createSelector(
  selectOfferAdjustment,
  (state: OfferAdjustmentState) => state.offerAdjustmentDetails,
);
export const selectDetailsMode = createSelector(
  selectOfferAdjustment,
  (state: OfferAdjustmentState) => state.detailsMode,
);
export const selectOfferAdjustmentDetailsComponent = createSelector(
  selectOfferAdjustment,
  (state: OfferAdjustmentState) => state.offerAdjustmentDetailsComponent,
);
export const selectTitle = createSelector(
  selectOfferAdjustment,
  (state: OfferAdjustmentState) => state.title,
);
