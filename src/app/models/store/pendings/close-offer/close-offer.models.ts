import {
  CloseOfferListState,
  initialCloseOfferListState,
} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import {
  CloseOfferDetailsState,
  initialCloseOfferDetailsState,
} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';

export interface CloseOfferState {
  closeOfferList: CloseOfferListState;
  closeOfferDetails: CloseOfferDetailsState;
  title: string;
  allowedToDetails: boolean;
  isInDetailsView: boolean;
}

export const initialCloseOfferState = (): CloseOfferState => ({
  closeOfferList: initialCloseOfferListState(),
  closeOfferDetails: initialCloseOfferDetailsState(),
  title: 'CERRAR OFERTA',
  allowedToDetails: false,
  isInDetailsView: false,
});
