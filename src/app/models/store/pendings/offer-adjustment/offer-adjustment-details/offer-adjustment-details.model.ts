import {IDetailsState} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';
import {IOfferAdjustment} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-list/offer-adjustment-list.model';

export interface OfferAdjustmentDetailsState {
  userSelected: IOfferAdjustment;
  details: IDetailsState;
}

export const initialOfferAdjustmentDetailsState = (): OfferAdjustmentDetailsState => ({
  userSelected: {} as IOfferAdjustment,
  details: {} as IDetailsState,
});
