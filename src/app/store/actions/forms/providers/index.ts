import * as importProviderActions from '@appActions/forms/providers/providers.actions';
import * as importListProviderActions from '@appActions/forms/providers/providers-list/providers-list.actions';
import * as importAddEditProviderActions from '@appActions/forms/providers/providers-details/providers-details.actions';
import * as importGeneralDataProviderActions from '@appActions/forms/providers/providers-details/provider-form-step-1-general-data.actions';
import * as importCampaingsProviderActions from '@appActions/forms/providers/providers-details/provider-form-step-3-campaign.actions';
import * as importTrademarProviderActions from '@appActions/forms/providers/providers-details/provider-form-step-4-trademark.actions';
import * as importBuySaleLicensesProviderActions from '@appActions/forms/providers/providers-details/provider-form-step-6-buy-sale-and-licences.actions';
import * as importLogisticPaymentActions from '@appActions/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.actions';
import * as importClassificationActions from '@appActions/forms/providers/providers-details/provider-form-step-7-classification.actions';
import * as importOfferActions from '@appActions/forms/providers/providers-details/provider-form-step-8-offer.actions';

export const providerActions = importProviderActions;
export const providersListActions = importListProviderActions;
export const providersDetailsActions = importAddEditProviderActions;
export const generalDataProviderActions = importGeneralDataProviderActions;
export const campaingsProviderActions = importCampaingsProviderActions;
export const trademarkProviderActions = importTrademarProviderActions;
export const buySaleProviderActions = importBuySaleLicensesProviderActions;
export const logisticAndPaymentActions = importLogisticPaymentActions;
export const classificationActions = importClassificationActions;
export const offerActions = importOfferActions;
