import * as importOfferAdjustmentActions from '@appActions/pendings/offer-adjustment/offer-adjustment.actions';
import * as importOfferAdjustmentDetailsActions from '@appActions/pendings/offer-adjustment/offer-adjustment-details/offer-adjustment-details.actions';
import * as importOfferAdjustmentListActions from '@appActions/pendings/offer-adjustment/offer-adjustment-list/offer-adjustment-list.actions';
import * as importOfferAdjustmentDetailsLisOfferActions from '@appActions/pendings/offer-adjustment/offer-adjustment-details/details/sections/list-offer-adjustment/list-offer-adjustment.actions';
import * as importOfferAdjustmentDetailsListOfferPaymentActions from '@appActions/pendings/offer-adjustment/offer-adjustment-details/details/sections/list-offer-adjustment/payment/payment-actions';
import * as importOfferAdjustmentDetailsListOfferPaymentConditionsActions from '@appActions/pendings/offer-adjustment/offer-adjustment-details/details/sections/list-offer-adjustment/payment-conditions/payment-conditions.actions';
import * as importOfferAdjustmentDetailsListOfferDeliveryActions from '@appActions/pendings/offer-adjustment/offer-adjustment-details/details/sections/list-offer-adjustment/delivery-time/delivery-time.actions';

export const offerAdjustmentActions = importOfferAdjustmentActions;
export const offerAdjustmentListActions = importOfferAdjustmentListActions;
export const offerAdjustmentDetailsActions = importOfferAdjustmentDetailsActions;
export const offerAdjustmentDetailsListOfferActions = importOfferAdjustmentDetailsLisOfferActions;
export const offerAdjustmentDetailsListOfferActionsPayment = importOfferAdjustmentDetailsListOfferPaymentActions;
export const offerAdjustmentDetailsListOfferActionsPaymentConditions = importOfferAdjustmentDetailsListOfferPaymentConditionsActions;
export const offerAdjustmentDetailsListOfferActionsDeliveryTime = importOfferAdjustmentDetailsListOfferDeliveryActions;
