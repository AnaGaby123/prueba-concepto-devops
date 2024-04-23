/* Core Imports */
import {createSelector} from '@ngrx/store';
import {filter, find, isEmpty, isEqual} from 'lodash-es';
/* Models Imports */
/* Interface Imports */
import {ProvidersDetailsState} from '@appModels/store/forms/providers/providers-details/providers-details.models';
import {
  BuySaleAndLicenses,
  BuySaleLicensesBackUp,
  ProviderCompanyList,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-6-buy-sale-and-licences.model';
import {Proveedor, ProveedorRegalias} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
/* Selectors Imports */
import {selectvCatMonedaForDropDownList} from '@appSelectors/catalogs/catalogs.selectors';
import {selectProvidersAddEdit} from '@appSelectors/forms/providers/providers-details/providers-details.selectors';
/* Dev Tools */
import {DEFAULT_UUID} from '@appUtil/common.protocols';

export const selectProvidersBuySaleAndLicenses = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState): BuySaleAndLicenses => state.buySaleAndLicenses,
);
export const selectProviderCompanies = createSelector(
  selectProvidersBuySaleAndLicenses,
  (state: BuySaleAndLicenses): Array<ProviderCompanyList> => state.listProviderCompanies,
);

export const selectProviderLicenses = createSelector(
  selectProvidersBuySaleAndLicenses,
  (state: BuySaleAndLicenses): Array<ProveedorRegalias> => state.providerLicenses,
);
export const selectProviderNode = createSelector(
  selectProvidersBuySaleAndLicenses,
  (state: BuySaleAndLicenses): Proveedor => state.providerNode,
);
export const selectedCatMoneyBuy = createSelector(
  selectProviderNode,
  selectvCatMonedaForDropDownList,
  (state: Proveedor, typeProduct: Array<DropListOption>): DropListOption =>
    find(typeProduct, (o: DropListOption) => state?.IdCatMonedaPagos === o?.value),
);
export const selectedCatMoneySale = createSelector(
  selectProviderNode,
  selectvCatMonedaForDropDownList,
  (state: Proveedor, typeProduct: Array<DropListOption>): DropListOption =>
    find(typeProduct, (o: DropListOption) => state?.IdCatMonedaVentas === o?.value),
);
export const selectProviderBackup = createSelector(
  selectProvidersBuySaleAndLicenses,
  (state: BuySaleAndLicenses): BuySaleLicensesBackUp => state.backUp,
);
export const selectedMonth = createSelector(
  selectProvidersBuySaleAndLicenses,
  (state: BuySaleAndLicenses): DropListOption => state.monthSelected,
);
export const selectCustomizedCheck = createSelector(
  selectProvidersBuySaleAndLicenses,
  (state: BuySaleAndLicenses): boolean => state.customizedCheck,
);
export const sellBuyLicensesHasChanges = createSelector(
  [
    selectProviderNode,
    selectProviderBackup,
    selectProviderCompanies,
    selectProviderLicenses,
    selectCustomizedCheck,
    selectedMonth,
  ],
  (
    providerNode: Proveedor,
    backup: BuySaleLicensesBackUp,
    listProviderCompanies: Array<ProviderCompanyList>,
    providerLicenses: Array<ProveedorRegalias>,
    customizedCheck: boolean,
    monthSelected: DropListOption,
  ): boolean => {
    return (
      !isEqual(JSON.stringify(providerNode), JSON.stringify(backup.providerNode)) ||
      !isEqual(
        JSON.stringify(listProviderCompanies),
        JSON.stringify(backup.listProviderCompanies),
      ) ||
      !isEqual(JSON.stringify(providerLicenses), JSON.stringify(backup.providerLicenses)) ||
      !isEqual(JSON.stringify(monthSelected), JSON.stringify(backup.monthSelected)) ||
      !isEqual(JSON.stringify(customizedCheck), JSON.stringify(backup.customizedCheck))
    );
  },
);
export const sellBuyLicencesSaveValidator = createSelector(
  [
    sellBuyLicensesHasChanges,
    selectProviderNode,
    selectCustomizedCheck,
    selectedMonth,
    selectProviderCompanies,
  ],
  (
    hasChanges: boolean,
    providerNode: Proveedor,
    customizedCheck: boolean,
    monthSelected: DropListOption,
    listProviderCompanies: Array<ProviderCompanyList>,
  ): boolean =>
    !!(
      hasChanges &&
      providerNode?.IdCatMonedaPagos &&
      providerNode?.IdCatMonedaPagos !== DEFAULT_UUID &&
      providerNode?.IdCatMonedaVentas &&
      providerNode?.IdCatMonedaVentas !== DEFAULT_UUID &&
      ((providerNode?.IdCatMonedaPagos !== providerNode?.IdCatMonedaVentas &&
        providerNode?.FactorConversion) ||
        providerNode?.IdCatMonedaPagos === providerNode?.IdCatMonedaVentas) &&
      (providerNode?.CompraEnLinea || providerNode?.CompraTradicional) &&
      ((customizedCheck && monthSelected) || !customizedCheck) &&
      // DOCS: Que al menos haya una empresa seleccionada y con número de cliente
      !isEmpty(
        filter(
          listProviderCompanies,
          (o: ProviderCompanyList) => o.selected && o.providerCompany.NumeroCliente,
        ),
      ) &&
      // DOCS: Que todas las empresas seleccionadas tengan su número de cliente
      filter(listProviderCompanies, (o: ProviderCompanyList) => o.selected).length ===
        filter(listProviderCompanies, (o: ProviderCompanyList) => o.providerCompany.NumeroCliente)
          .length
    ),
);
export const buyLicenseFieldToShowConfirm = createSelector(
  selectProviderNode,
  selectProviderBackup,
  (providerNode: Proveedor, backup: BuySaleLicensesBackUp): boolean =>
    !!(
      providerNode?.IdCatMonedaPagos !== backup.providerNode.IdCatMonedaPagos ||
      providerNode?.IdCatMonedaVentas !== backup.providerNode.IdCatMonedaVentas ||
      providerNode?.FactorConversion !== backup.providerNode.FactorConversion
    ),
);
export const selectLicenseForm = createSelector(
  selectProvidersBuySaleAndLicenses,
  (state: BuySaleAndLicenses): ProveedorRegalias => state.licenseForm,
);
export const enableAddLicense = createSelector(
  selectLicenseForm,
  (state: ProveedorRegalias): boolean => !isEmpty(state.Etiqueta) && state.Porcentaje > 0,
);
export const selectMonthsOptions = createSelector(
  selectProvidersBuySaleAndLicenses,
  (state: BuySaleAndLicenses): Array<DropListOption> => state.monthsOptions,
);
export const selectFactorConversion = createSelector(
  selectProviderNode,
  (state: Proveedor): number => state.FactorConversion,
);
export const selectCompaniesToDelete = createSelector(
  selectProvidersBuySaleAndLicenses,
  (state: BuySaleAndLicenses): Array<ProviderCompanyList> => state.listProviderCompaniesToDelete,
);
export const selectCompaniesToSave = createSelector(
  selectProviderCompanies,
  (state: Array<ProviderCompanyList>): Array<ProviderCompanyList> =>
    filter(state, (o: ProviderCompanyList) => o.selected),
);
export const selectLicensesToDelete = createSelector(
  selectProvidersBuySaleAndLicenses,
  (state: BuySaleAndLicenses): Array<ProveedorRegalias> => state.providerLicensesToDelete,
);
