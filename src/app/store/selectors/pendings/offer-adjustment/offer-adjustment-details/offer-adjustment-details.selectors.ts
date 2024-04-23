/* Core Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectOfferAdjustmentDetails} from '@appSelectors/pendings/offer-adjustment/offer-adjustment.selectors';

/* Models Imports */
import {OfferAdjustmentDetailsState} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/offer-adjustment-details.model';

export const selectDetails = createSelector(
  selectOfferAdjustmentDetails,
  (state: OfferAdjustmentDetailsState) => state.details,
);
export const selectNameUserSelected = createSelector(
  selectOfferAdjustmentDetails,
  (state: OfferAdjustmentDetailsState) => state.userSelected.NombreEVI,
);
export const selectIdUserSelected = createSelector(
  selectOfferAdjustmentDetails,
  (state: OfferAdjustmentDetailsState) => state.userSelected?.DescripcionLlave,
);
