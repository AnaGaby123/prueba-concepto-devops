import {createSelector} from '@ngrx/store';
import {ProvidersState} from '@appModels/store/forms/providers/providers.models';
import {selectProviderForms} from '@appSelectors/forms/forms.selectors';
import {
  generalDataHasChanges,
  saveValidatorStep1,
} from '@appSelectors/forms/providers/providers-details/provider-form-step-1-general-data.selectors';
import {
  saveValidatorStep3,
  selectCampaignHasChanges,
} from '@appSelectors/forms/providers/providers-details/provider-form-step-3-campaign.selectors';
import {
  logisticPaymentHasChanges,
  saveValidatorLogisticPayments,
} from '@appSelectors/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.selectors';
import {
  sellBuyLicencesSaveValidator,
  sellBuyLicensesHasChanges,
} from '@appSelectors/forms/providers/providers-details/provider-form-step-6-buy-sale-and-licences.selectors';
import {
  saveValidatorStep8,
  selectACHasChanges,
} from '@appSelectors/forms/providers/providers-details/provider-form-step-8-offer.selectors';

import {
  selectedStepsOptionsITabOptions,
  selectIsInTrademarkPage,
} from '@appSelectors/forms/providers/providers-details/providers-details.selectors';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {ProvidersTabsOptions as tabs} from '@appModels/store/forms/providers/providers-details/providers-details.models';
import {
  selectTrademarkHasChanges,
  selectValidatorTrademark,
} from '@appSelectors/forms/providers/providers-details/provider-form-step-4-trademark.selectors';
import {saveValidationFeatureGroup} from '@appSelectors/forms/providers/providers-details/provider-form-step-7-classification.selectors';

export const selectModeEdit = createSelector(
  selectProviderForms,
  (state: ProvidersState): boolean => state.modeEdit,
);
export const selectAddEditComponent = createSelector(
  selectProviderForms,
  (state: ProvidersState): boolean => state.addEditComponent,
);
export const selectTitle = createSelector(
  selectProviderForms,
  (state: ProvidersState): string => state.title,
);
export const selectEnableEdit = createSelector(
  selectProviderForms,
  (state: ProvidersState): boolean => state.enableEdit,
);
export const selectSaveOfferNode = createSelector(
  [selectIsInTrademarkPage, selectValidatorTrademark, saveValidatorStep8],
  (isInTrademark: boolean, trademark: boolean, offer: boolean) => {
    return {
      isInTrademark,
      trademark,
      offer,
    };
  },
);
export const selectSaveValidatorsBySteps = createSelector(
  [
    selectedStepsOptionsITabOptions,
    selectSaveOfferNode,
    saveValidatorStep1,
    saveValidatorStep3,
    saveValidatorLogisticPayments,
    sellBuyLicencesSaveValidator,
    saveValidationFeatureGroup,
  ],
  (
    step: ITabOption,
    offerNode: {isInTrademark; trademark; offer},
    generalData: boolean,
    campaign: boolean,
    logisticPayment: boolean,
    sellBuyLicenses: boolean,
    FeatureGroup: boolean,
  ): boolean => {
    const validator = {
      [tabs.GeneralData]: () => generalData,
      [tabs.TrademarkOffer]: () =>
        offerNode.isInTrademark ? offerNode.trademark : offerNode.offer,
      [tabs.Campaign]: () => campaign,
      [tabs.LogisticPayment]: () => logisticPayment,
      [tabs.BuySale]: () => sellBuyLicenses,
      [tabs.FeatureGroup]: () => FeatureGroup,
    };
    return validator[step.label]();
  },
);

export const selectDiscardChanges = createSelector(
  [
    selectedStepsOptionsITabOptions,
    generalDataHasChanges,
    selectCampaignHasChanges,
    selectIsInTrademarkPage,
    selectTrademarkHasChanges,
    selectACHasChanges,
    logisticPaymentHasChanges,
    sellBuyLicensesHasChanges,
    saveValidationFeatureGroup,
  ],
  (
    tab: ITabOption,
    generalData: boolean,
    campaign: boolean,
    isInMarkPage: boolean,
    tradeMarkChanges: boolean,
    offerChanges: boolean,
    logistic: boolean,
    sellBuyLicenses: boolean,
    FeatureGroup: boolean,
  ): boolean => {
    let {label} = tab;
    label = label === tabs.TrademarkOffer ? (isInMarkPage ? tabs.Trademark : tabs.Offer) : label;
    const validator = {
      [tabs.GeneralData]: () => generalData,
      [tabs.Trademark]: () => tradeMarkChanges,
      [tabs.Offer]: () => offerChanges,
      [tabs.Campaign]: () => campaign,
      [tabs.LogisticPayment]: () => logistic,
      [tabs.BuySale]: () => sellBuyLicenses,
      [tabs.FeatureGroup]: () => FeatureGroup,
    };
    return validator[label]();
  },
);
