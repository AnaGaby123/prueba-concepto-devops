import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {generalDataReducer} from '@appReducers/forms/providers/providers-details/provider-form-step-1-general-data.reducer';
import {campaignReducer} from '@appReducers/forms/providers/providers-details/provider-form-step-3-campaign.reducer';
import {trademarkReducer} from '@appReducers/forms/providers/providers-details/provider-form-step-4-trademark.reducer';
import {logisticsAndPaymentsReducer} from '@appReducers/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.reducer';
import {buySaleAndLicensesReducer} from '@appReducers/forms/providers/providers-details/provider-form-step-6-buy-sale-and-licences.reducer';
import {classificationReducer} from '@appReducers/forms/providers/providers-details/provider-form-step-7-classification.reducer';
import {offerReducer} from '@appReducers/forms/providers/providers-details/provider-form-step-8-offer.reducer';
import {
  InitialProvidersAddEditFormModel,
  initialProvidersSelectedStep,
  initialStepsOptions,
  initialTrademarkPageBarOptions,
  ProvidersDetailsState,
  ProvidersTabsOptions,
} from '@appModels/store/forms/providers/providers-details/providers-details.models';
import {
  generalDataProviderActions,
  providerActions,
  providersDetailsActions,
  providersListActions,
} from '@appActions/forms/providers';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IVProveedor} from '@appModels/store/forms/providers/providers-list/providers-list.models';
import {SET_INITIAL_DATA_ADD_EDIT_PROVIDER} from '@appActions/forms/providers/providers-details/providers-details.actions';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {map} from 'lodash-es';

export const providersDetailsReducer: ActionReducer<ProvidersDetailsState> = combineReducers(
  {
    generalData: generalDataReducer,
    campaign: campaignReducer,
    trademark: trademarkReducer,
    logisticsAndPayments: logisticsAndPaymentsReducer,
    buySaleAndLicenses: buySaleAndLicensesReducer,
    classification: classificationReducer,
    offer: offerReducer,
    stepsOptions: createReducer(initialStepsOptions()),
    selectedStepsOption: createReducer(
      initialProvidersSelectedStep(),
      on(providersDetailsActions.SET_TAB_SELECTED, (state: ITabOption, {tab}) => tab),
      on(
        providerActions.CLEAN_ALL_PROVIDERS_STATE,
        providersDetailsActions.SET_INITIAL_DATA_ADD_EDIT_PROVIDER,
        (): ITabOption => initialProvidersSelectedStep(),
      ),
    ),
    trademarkPageBarOptions: createReducer(
      initialTrademarkPageBarOptions(),
      on(providersDetailsActions.INIT_TRADEMARK_PAGE_BAR_OPTIONS, () =>
        initialTrademarkPageBarOptions(),
      ),
      on(
        providersDetailsActions.SET_TRADEMARK_PAGE_BAR_OPTION,
        (state: Array<OptionBar>, {option}) =>
          map(state, (o: OptionBar) => ({
            ...o,
            isSelected: o.id === option.id,
          })),
      ),
      on(providersDetailsActions.SET_IS_IN_TRADEMARK, (state: Array<OptionBar>, {isInTrademark}) =>
        map(state, (o: OptionBar) => ({
          ...o,
          isSelected:
            (isInTrademark && o.label === ProvidersTabsOptions.Trademark) ||
            (!isInTrademark && o.label === ProvidersTabsOptions.Offer),
        })),
      ),
    ),
    isInTrademarkPage: createReducer(
      InitialProvidersAddEditFormModel().isInTrademarkPage,
      on(providersDetailsActions.SET_INITIAL_DATA_ADD_EDIT_PROVIDER, () => false),
      on(
        providersDetailsActions.SET_IS_IN_TRADEMARK,
        (state: boolean, {isInTrademark}) => isInTrademark,
      ),
      on(
        providersDetailsActions.SET_TAB_SELECTED,
        providerActions.CLEAN_ALL_PROVIDERS_STATE,
        () => true,
      ),
      on(
        providersDetailsActions.SET_TRADEMARK_PAGE_BAR_OPTION,
        (state: boolean, {option}) => option.label === ProvidersTabsOptions.Trademark,
      ),
    ),
    selectedProvider: createReducer(
      null,
      on(
        providersListActions.SET_SELECTED_PROVIDER,
        (state: IVProveedor, {provider}): IVProveedor => provider,
      ),
      on(
        generalDataProviderActions.GET_GENERAL_DATA_PROVIDER_SUCCESS,
        (state, {generalDataProvider}) => ({
          ...state,
          ...generalDataProvider,
        }),
      ),
      on(SET_INITIAL_DATA_ADD_EDIT_PROVIDER, (state: IVProveedor, action) => null),
    ),
    tradeMarkAndOfferAlertPop: createReducer(
      InitialProvidersAddEditFormModel().tradeMarkAndOfferAlertPop,
      on(providersDetailsActions.TRADEMARK_OFFER_ALERT_POP, (state, {active}) => active),
    ),
    preSelectedTab: createReducer(
      InitialProvidersAddEditFormModel().preSelectedTab,
      on(providersDetailsActions.SET_PRESELECTED_TAB, (state, {preSelectedTab}) => preSelectedTab),
    ),
  },
  {
    ...InitialProvidersAddEditFormModel(),
  },
);
