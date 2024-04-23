import {
  initialOfferAdjustmentListState,
  OfferAdjustmentListState,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-list/offer-adjustment-list.model';
import {
  initialOfferAdjustmentDetailsState,
  OfferAdjustmentDetailsState,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/offer-adjustment-details.model';

export interface OfferAdjustmentState {
  offerAdjustmentList: OfferAdjustmentListState;
  offerAdjustmentDetails: OfferAdjustmentDetailsState;
  detailsMode: boolean;
  offerAdjustmentDetailsComponent: boolean;
  title: string;
}

export const initialOfferAdjustmentState = (): OfferAdjustmentState => ({
  offerAdjustmentList: initialOfferAdjustmentListState(),
  offerAdjustmentDetails: initialOfferAdjustmentDetailsState(),
  detailsMode: false,
  offerAdjustmentDetailsComponent: false,
  title: TITLE_OFFER_ADJUSTMENT,
});

export const TITLE_OFFER_ADJUSTMENT = 'Ajustar oferta';
