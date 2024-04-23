import {
  Campaign,
  initialCampaign,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-3-campaign.model';
import {
  initialTrademark,
  Trademark,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-4-trademark.model';
import {
  initialLogisticsAndPayments,
  LogisticsAndPayments,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.model';
import {
  BuySaleAndLicenses,
  initialBuySaleAndLicenses,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-6-buy-sale-and-licences.model';
import {
  ClassificationState,
  initialClassification,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-7-classification.model';
import {
  initialOffer,
  OfferState,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {
  GeneralData,
  initialGeneralData,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-1-general-data.model';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IVProveedor} from '@appModels/store/forms/providers/providers-list/providers-list.models';
import {OptionBar} from '@appModels/options-bar/options-bar';

export interface ProvidersDetailsState {
  generalData: GeneralData;
  campaign: Campaign;
  trademark: Trademark;
  logisticsAndPayments: LogisticsAndPayments;
  buySaleAndLicenses: BuySaleAndLicenses;
  classification: ClassificationState;
  offer: OfferState;
  stepsOptions: Array<ITabOption>;
  selectedStepsOption: ITabOption;
  trademarkPageBarOptions: Array<OptionBar>;
  isInTrademarkPage: boolean;
  tradeMarkAndOfferAlertPop: boolean;
  selectedProvider: IVProveedor;
  preSelectedTab: ITabOption;
}

export const InitialProvidersAddEditFormModel = (): ProvidersDetailsState => ({
  selectedProvider: null,
  generalData: initialGeneralData(),
  campaign: initialCampaign(),
  trademark: initialTrademark(),
  logisticsAndPayments: initialLogisticsAndPayments(),
  buySaleAndLicenses: initialBuySaleAndLicenses(),
  classification: initialClassification(),
  offer: initialOffer(),
  stepsOptions: initialStepsOptions(),
  trademarkPageBarOptions: initialTrademarkPageBarOptions(),
  selectedStepsOption: initialProvidersSelectedStep(),
  isInTrademarkPage: true,
  tradeMarkAndOfferAlertPop: false,
  preSelectedTab: null,
});

export enum ProvidersTabsOptions {
  GeneralData = 'DATOS GENERALES',
  TrademarkOffer = 'MARCAS Y OFERTA',
  Trademark = 'MARCAS',
  Offer = 'OFERTA',
  Campaign = 'CAMPAÑAS',
  LogisticPayment = 'LOGISTICA Y PAGOS',
  BuySale = 'COMPRA, VENTA Y LICENCIAS',
  FeatureGroup = 'AGRUPADOR POR CARACTERÍSTICA',
}

export const initialProvidersSelectedStep = (): ITabOption => ({
  id: '1',
  label: ProvidersTabsOptions.GeneralData,
  activeSubtitle: false,
});

export const initialStepsOptions = () => [
  {id: '1', label: ProvidersTabsOptions.GeneralData, activeSubtitle: false},
  {id: '2', label: ProvidersTabsOptions.TrademarkOffer, activeSubtitle: false},
  {id: '3', label: ProvidersTabsOptions.Campaign, activeSubtitle: false},
  {id: '4', label: ProvidersTabsOptions.LogisticPayment, activeSubtitle: false},
  {id: '5', label: ProvidersTabsOptions.BuySale, activeSubtitle: false},
  {id: '6', label: ProvidersTabsOptions.FeatureGroup, activeSubtitle: false},
];
export const initialTrademarkPageBarOptions = (): Array<OptionBar> => [
  {
    id: 1,
    label: ProvidersTabsOptions.Trademark,
    isEnable: true,
    isSelected: true,
  },
  {
    id: 2,
    label: ProvidersTabsOptions.Offer,
    isEnable: true,
    isSelected: false,
  },
];
