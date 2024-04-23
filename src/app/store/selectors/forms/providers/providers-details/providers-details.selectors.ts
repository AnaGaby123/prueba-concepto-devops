import {createSelector} from '@ngrx/store';
import {selectProviderForms} from '@appSelectors/forms/forms.selectors';
import {ProvidersState} from '@appModels/store/forms/providers/providers.models';
import {
  ProvidersDetailsState,
  ProvidersTabsOptions,
} from '@appModels/store/forms/providers/providers-details/providers-details.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {filter, forEach, map as _map} from 'lodash-es';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {
  IVTrademarkDetail,
  IVTrademarkFamilyDetail,
  Trademark,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-4-trademark.model';
import {DEFAULT_UUID} from '@appUtil/common.protocols';

export const selectProvidersAddEdit = createSelector(
  selectProviderForms,
  (state: ProvidersState): ProvidersDetailsState => state.providersAddEdit,
);

export const selectedStepsOptionsITabOptions = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState): ITabOption => state.selectedStepsOption,
);
export const selectIsInTrademarkPage = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState): boolean => state.isInTrademarkPage,
);

export const selectTrademark = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState): Trademark => state.trademark,
);
export const selectHasTrademarkLinked = createSelector(
  selectTrademark,
  (state: Trademark): boolean => {
    let valid = true;
    forEach(state.associatedList, (o: IVTrademarkDetail) => {
      const linkedBrands = filter(
        o.vMarcaFamiliaDetalle,
        (i: IVTrademarkFamilyDetail) =>
          i.MarcaFamiliaProveedor?.Activo &&
          i?.MarcaFamiliaProveedor?.IdMarcaFamiliaProveedor !== DEFAULT_UUID,
      );
      if (linkedBrands.length <= 0) {
        valid = false;
      }
    });
    return valid;
  },
);
export const selectTrademarkPageBarOptions = createSelector(
  selectProvidersAddEdit,
  selectHasTrademarkLinked,
  (state: ProvidersDetailsState, hasLinkedTrademark): Array<OptionBar> =>
    _map(state.trademarkPageBarOptions, (o: OptionBar) => {
      if (o.label === ProvidersTabsOptions.Offer) {
        return {...o, isEnable: hasLinkedTrademark};
      } else {
        return {
          ...o,
        };
      }
    }),
);

export const selectedProvider = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState) => state.selectedProvider,
);
export const selectedProviderId = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState) => state.selectedProvider.IdProveedor,
);
export const selectedProviderName = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState) => state?.selectedProvider?.Nombre,
);
export const selectStepsOptionsITabOptions = createSelector(
  [selectProvidersAddEdit, selectProviderForms],
  (state: ProvidersDetailsState, providersForm: ProvidersState): Array<ITabOption> =>
    _map(state.stepsOptions, (o: ITabOption, index: number) => ({
      ...o,
      disable: !!(!providersForm.modeEdit && index !== 0),
    })),
);
export const selectTradeMarkOfferAlertPop = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState) => state.tradeMarkAndOfferAlertPop,
);
export const selectPreSelectedTab = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState): ITabOption => state.preSelectedTab,
);
