import {createSelector} from '@ngrx/store';
import {CloseOfferState} from '@appModels/store/pendings/close-offer/close-offer.models';
import {selectCloseOffer} from '@appSelectors/pendings/pendings.selectors';

export const selectCloseOfferNode = createSelector(
  selectCloseOffer,
  (state: CloseOfferState) => state,
);
export const selectTitle = createSelector(
  selectCloseOfferNode,
  (state: CloseOfferState) => state.title,
);
export const selectIsInDetailsView = createSelector(
  selectCloseOfferNode,
  (state: CloseOfferState) => state.isInDetailsView,
);
export const selectAllowedToDetails = createSelector(
  selectCloseOfferNode,
  (state: CloseOfferState) => state.allowedToDetails,
);
