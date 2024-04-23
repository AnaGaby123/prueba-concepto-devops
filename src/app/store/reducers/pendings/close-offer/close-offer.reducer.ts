import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  CloseOfferState,
  initialCloseOfferState,
} from '@appModels/store/pendings/close-offer/close-offer.models';
import * as closeOfferActions from '@appActions/pendings/close-offer/close-offer.actions';
import {closeOfferListReducer} from '@appReducers/pendings/close-offer/close-offer-list/close-offer-list.reducer';
import {closeOfferDetailsReducer} from '@appReducers/pendings/close-offer/close-offer-details/close-offer-details.reducer';

export const closeOfferReducer: ActionReducer<CloseOfferState> = combineReducers(
  {
    closeOfferList: closeOfferListReducer,
    closeOfferDetails: closeOfferDetailsReducer,
    title: createReducer(initialCloseOfferState().title),
    allowedToDetails: createReducer(
      initialCloseOfferState().allowedToDetails,
      on(
        closeOfferActions.SET_ALLOWED_TO_DETAILS_VALUE,
        (state, {allowedToDetails}) => allowedToDetails,
      ),
    ),
    isInDetailsView: createReducer(
      initialCloseOfferState().isInDetailsView,
      on(closeOfferActions.SET_IS_IN_DETAILS_VIEW, (state, {isInDetailsView}) => isInDetailsView),
    ),
  },
  {...initialCloseOfferState()},
);
