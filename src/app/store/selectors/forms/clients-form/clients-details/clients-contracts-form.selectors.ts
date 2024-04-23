import {createSelector} from '@ngrx/store';
import {selectGeneralData} from '@appSelectors/forms/clients-form/clients-details/clients-form-general-data.selectors';
import {IClientsDetailsForm} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';
import {
  BrandItem,
  ContractListData,
  IBrands,
  IConfContratoCliente,
  IContract,
  IContractsForm,
  IFamilyCharacteristicGroupers,
  IFamilyPrices,
  IFamilyProducts,
  ITrademark,
  IVClasificacionProductoMarcaCliente,
  IVContractFamily,
  IVPrecioListaClienteProductoContrato,
  IVPrecioProductoCliente,
  OfferContractBrands,
} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
  ENUM_PRODUCT_FAMILY_KEY,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {filter, find, isEmpty, isEqual, map as _map, omit} from 'lodash-es';
import {
  selecCatIndustriaForDropDown,
  selectCatalogs,
  selectPaymentConditionsForDropDown,
  selectvEmpresasForDropDown,
} from '@appSelectors/catalogs/catalogs.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  selectClientDetailsForm,
  selectedClient,
} from '@appSelectors/forms/clients-form/clients-details/clients-details-form.selectors';
import {ICard} from '@appModels/card/card';
import {
  LevelConfigurationOption,
  Levels,
  ProvidersTabOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {
  ConfiguracionClientesCalculosService,
  Direccion,
  DireccionClienteDetalle,
  MarcaFamiliaProveedorConsolidacion,
  QueryInfo,
  VCliente,
  VMarcaFamilia,
} from 'api-catalogos';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {ResumeGroupQueryInfo} from 'api-logistica';
import {Empresa} from 'api-finanzas';
import {getArrayForDropDownList} from '@appUtil/util';
import {CLASS_NAMES} from '@appModels/shared-components/pqf-card';
import ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorParams = ConfiguracionClientesCalculosService.ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorParams;
import {ClientPricesState} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import {selectPrices} from '@appSelectors/forms/clients-form/clients-details/prices.selectors';

export const selectContracts = createSelector(
  selectClientDetailsForm,
  (state: IClientsDetailsForm) => state.contracts,
);
export const selectListContracts = createSelector(
  selectContracts,
  (state: IContractsForm) => state.contractsList,
);
export const selectContractBarActivities = createSelector(
  selectContracts,
  (state: IContractsForm) => state.contractBarActivities,
);
export const selectCancelPopIsOpen = createSelector(
  selectContracts,
  (state: IContractsForm) => state.cancelPop,
);
export const selectEditMode = createSelector(
  selectContracts,
  (state: IContractsForm) => state.editMode,
);
export const selectEnableEdit = createSelector(
  selectContracts,
  (state: IContractsForm) => state.enableEdit,
);
export const selectContractEditMode = createSelector(
  selectContracts,
  (state: IContractsForm) => state.contractEditMode,
);
export const selectAddStepValue = createSelector(
  selectContracts,
  (state: IContractsForm) => state.addStep,
);
export const selectTabFilters = createSelector(
  selectContracts,
  (state: IContractsForm) => state.tabFilters,
);
export const selectedTabFilter = createSelector(
  selectContracts,
  (state: IContractsForm) => state.selectedTabFilter,
);
export const selectNewContract = createSelector(
  selectContracts,
  (state: IContractsForm): IContract => state.newContract,
);
export const selectGeneratedContractUploaded = createSelector(
  selectContracts,
  (state: IContractsForm) => state.generatedContractUploaded,
);
/* DOCS: No se estan usando*/
/*export const selectAddress = createSelector(
  selectContracts,
  (state: IContractsForm) => state.clientAddresses,
);*/
/*export const selectActiveContractPop = createSelector(
  selectContracts,
  (state: IContractsForm) => state.contractPop,
);*/
export const selectAddressOnly = createSelector(
  selectContracts,
  (state: IContractsForm): Direccion[] =>
    _map(state.clientAddresses, (o: DireccionClienteDetalle): Direccion => o.Direccion),
);
export const selectedBrand = createSelector(
  selectNewContract,
  (state: IContract): OfferContractBrands => state?.selectedBrand,
);
export const selectvEmpresas = createSelector(
  selectCatalogs,
  (state): Array<Empresa> => filter(state.empresas.listEmpresas, (o: Empresa) => o.FrenteComercial),
);
export const selectvEnterpriseForDropDown = createSelector(
  selectvEmpresas,
  (state: Array<Empresa>) => {
    return getArrayForDropDownList(state, 'IdEmpresa', 'Alias');
  },
);
export const selectBrands = createSelector(selectNewContract, (state: IContract) => state.brands);
export const selectDisableBrands = createSelector(
  selectNewContract,
  (state: IContract) => state.disableBrands,
);
export const selectSignedContract = createSelector(
  selectNewContract,
  (state: IContract) => state.signedContract,
);
export const buildQueryBrandsAssociated = createSelector(
  selectNewContract,
  (state: IContract): QueryInfo => {
    const body = new FiltersOnlyActive();
    body.Filters.push({
      NombreFiltro: 'IdContratoCliente',
      ValorFiltro: state.IdContratoCliente,
    });
    if (state.searchTermBrand !== '') {
      body.Filters.push({
        NombreFiltro: 'NombreMarca',
        ValorFiltro: state.searchTermBrand,
      });
    }
    return body;
  },
);
export const selectPreSelectedFamily = createSelector(
  selectNewContract,
  (state: IContract): ICard => state.preSelectedFamily,
);
export const selectPreSelectedLevelConfiguration = createSelector(
  selectNewContract,
  (state: IContract): LevelConfigurationOption => state.preSelectedLevelConfiguration,
);
export const selectPreSelectedBrand = createSelector(
  selectNewContract,
  (state: IContract): OfferContractBrands => state.preSelectedBrand,
);
export const selectActivePopCancel = createSelector(
  selectNewContract,
  (state: IContract): boolean => state.activePopCancel,
);
// DOCS Selectores relacionados a la familia seleccionada
export const selectedFamily = createSelector(
  selectedBrand,
  (state: OfferContractBrands): IVContractFamily => state?.selectedFamily,
);
export const isMexican = createSelector(
  selectedFamily,
  (state: IVContractFamily): boolean => state?.Mexicano,
);
export const selectedLevelTabConfiguration = createSelector(
  selectedFamily,
  (state: IVContractFamily): LevelConfigurationOption => state?.selectedLevelConfigurationTab,
);
export const selectAsidePricesForSelectedLevel = createSelector(
  selectedFamily,
  (state: IVContractFamily) => state?.generalAsidePrices,
);
export const selectActualConfiguration = createSelector(
  selectedFamily,
  (state: IVContractFamily): IConfContratoCliente => state?.actualConfiguration,
);
export const selectBackupConfiguration = createSelector(
  selectedFamily,
  (state: IVContractFamily) => state?.backupConfiguration,
);
export const selectedFamilyHasCharacteristicGrouper = createSelector(
  selectedFamily,
  (state: IVContractFamily) => state?.ClaveTipo !== ENUM_PRODUCT_FAMILY_KEY.trainings,
);
export const selectLogisticTimeTotal = createSelector(
  selectActualConfiguration,
  isMexican,
  (state: IConfContratoCliente, isMexican: boolean) =>
    isMexican
      ? state?.configuracionTiemposLogisticos?.DiasPedidoACompra +
        state?.configuracionTiemposLogisticos?.DiasCompraAEmbarque +
        state?.configuracionTiemposLogisticos?.DiasEmbarqueAArribo +
        state?.configuracionTiemposLogisticos?.DiasArriboAImportacion
      : state?.configuracionTiemposLogisticos?.DiasPedidoACompra +
        state?.configuracionTiemposLogisticos?.DiasCompraAEmbarque +
        state?.configuracionTiemposLogisticos?.DiasEmbarqueAArribo +
        state?.configuracionTiemposLogisticos?.DiasConsolidacionPharma +
        state?.configuracionTiemposLogisticos?.DiasArriboAImportacion +
        state?.configuracionTiemposLogisticos?.DiasImportacionAAlmacen,
);
export const selectCommercialTimeTotal = createSelector(
  selectActualConfiguration,
  isMexican,
  (state: IConfContratoCliente, isMexican: boolean) =>
    isMexican
      ? state?.configuracionTiemposLogisticos?.DiasPedidoACompra +
        state?.configuracionTiemposLogisticos?.DiasCompraAEmbarque +
        state?.configuracionTiemposLogisticos?.DiasEmbarqueAArribo +
        state?.configuracionTiemposLogisticos?.DiasArriboAImportacion +
        state?.configuracionTiemposLogisticos?.DiasAlmacenAInspeccion +
        state?.configuracionTiemposLogisticos?.DiasInspeccionAEmbalaje
      : state?.configuracionTiemposLogisticos?.DiasPedidoACompra +
        state?.configuracionTiemposLogisticos?.DiasCompraAEmbarque +
        state?.configuracionTiemposLogisticos?.DiasEmbarqueAArribo +
        state?.configuracionTiemposLogisticos?.DiasConsolidacionPharma +
        state?.configuracionTiemposLogisticos?.DiasArriboAImportacion +
        state?.configuracionTiemposLogisticos?.DiasImportacionAAlmacen +
        state?.configuracionTiemposLogisticos?.DiasAlmacenAInspeccion +
        state?.configuracionTiemposLogisticos?.DiasInspeccionAEmbalaje,
);

// DOCS: PricesList
export const selectPriceSectionConfiguration = createSelector(
  selectedFamily,
  (state: IVContractFamily): IFamilyPrices => state?.prices,
);
export const selectPriceSectionSearchTerm = createSelector(
  selectPriceSectionConfiguration,
  (state: IFamilyPrices): string => state?.searchTerm,
);
export const selectPriceResults = createSelector(
  selectPriceSectionConfiguration,
  (state: IFamilyPrices): Array<IVPrecioListaClienteProductoContrato> => state?.pricesList?.Results,
);
export const selectPriceSelected = createSelector(
  selectPriceResults,
  (state: IVPrecioListaClienteProductoContrato[]): IVPrecioListaClienteProductoContrato =>
    find(state, (o: IVPrecioListaClienteProductoContrato) => o.isSelected),
);
// DOCS: Classifications
export const selectCharacteristicGrouperSectionConfiguration = createSelector(
  selectedFamily,
  (state: IVContractFamily): IFamilyCharacteristicGroupers => state?.characteristicGroupers,
);
export const selectClassificationsSearchTerm = createSelector(
  selectCharacteristicGrouperSectionConfiguration,
  (state: IFamilyCharacteristicGroupers): string => state?.searchTerm,
);
export const selectCharacteristicGrouperResults = createSelector(
  selectCharacteristicGrouperSectionConfiguration,
  (state: IFamilyCharacteristicGroupers): Array<IVClasificacionProductoMarcaCliente> =>
    state?.characteristicGroupersList?.Results,
);

// DOCS: Products
export const selectProductsSectionConfiguration = createSelector(
  selectedFamily,
  (state: IVContractFamily) => state?.products,
);
export const selectProductsSearchTerm = createSelector(
  selectProductsSectionConfiguration,
  (state: IFamilyProducts) => state?.searchTerm,
);
export const selectProductsResults = createSelector(
  selectProductsSectionConfiguration,
  (state: IFamilyProducts): Array<IVPrecioProductoCliente> => state?.productsList?.Results,
);
export const selectBrandsList = createSelector(selectBrands, (state: IBrands): BrandItem[] =>
  filter(state.brandList, (o: BrandItem) => o.Visible === true),
);

export const selectedProduct = createSelector(
  selectProductsResults,
  (state: IVPrecioProductoCliente[]): IVPrecioProductoCliente =>
    find(state, (o: IVPrecioProductoCliente) => o.isSelected),
);
export const selectBrandsStatus = createSelector(
  selectBrands,
  (state: IBrands) => state?.brandsStatus,
);

export const selectAddContractActualStep = createSelector(
  selectContracts,
  (state) => state?.addContractActualStep,
);
export const selectToggleSwitchOptions = createSelector(
  selectContracts,
  (state: IContractsForm): DropListOption[] => state.toggleSwitchOptions,
);

export const selectIndustryClientName = createSelector(
  [selecCatIndustriaForDropDown, selectedClient],
  (dropIndustry: Array<DropListOption>, client: VCliente): DropListOption =>
    find(dropIndustry, (o: DropListOption) => o.value === client.IdCatIndustria),
);

export const selectFamiliesForCard = createSelector(
  [selectNewContract, selectIndustryClientName],
  (state: IContract, industry: DropListOption): Array<ICard> =>
    _map(
      state?.selectedBrand?.familiesList,
      (o: IVContractFamily): ICard => ({
        active: o.isSelected,
        value: o.IdMarcaFamilia,
        labels: [
          {label: o.NombreMarca, className: CLASS_NAMES.title},
          {label: industry.label, className: CLASS_NAMES.type},
          {label: o.Tipo, className: CLASS_NAMES.type},
          {label: o.Subtipo, className: CLASS_NAMES.type},
          {label: o.Control, className: CLASS_NAMES.type},
          {
            label: `${o.Productos} ${o.Productos === 1 ? 'PRODUCTO' : 'PRODUCTOS'}`,
            className: CLASS_NAMES.countProducts,
          },
        ],
      }),
    ),
);
export const selectContractBrands = createSelector(
  selectNewContract,
  (state: IContract): Array<OfferContractBrands> => state?.contractBrands,
);
export const selectSearchTermBrand = createSelector(
  selectNewContract,
  (state: IContract): string => state?.searchTermBrand,
);
export const selectStatusBrandList = createSelector(
  selectNewContract,
  (state: IContract): boolean => state?.contractBrandsLoad,
);
export const selectedContractBrand = createSelector(
  selectNewContract,
  (state: IContract): OfferContractBrands =>
    find(state.contractBrands, (o: OfferContractBrands) => o?.isSelected),
);
export const selectFamiliesForNewContract = createSelector(
  selectNewContract,
  (state: IContract): Array<IVContractFamily> => {
    return state?.selectedBrand?.familiesList;
  },
);
export const selectTabsConfiguration = createSelector(
  [selectNewContract, selectedFamily],
  (state: IContract, selectedFamily: IVContractFamily): Array<LevelConfigurationOption> =>
    _map(
      state.tabsConfiguration,
      (o: LevelConfigurationOption): LevelConfigurationOption => ({
        ...o,
        disable:
          o.label !== ProvidersTabOptions.General &&
          !(
            !isEmpty(
              selectedFamily?.generalConfiguration?.ConfiguracionPrecioProveedorFamilia
                ?.IdConfiguracionPrecioProveedorFamilia,
            ) && !isEmpty(selectedFamily?.generalConfiguration?.configurationPriceProvider)
          ),
      }),
    ),
);
export const hasProviderConfiguration = createSelector(
  selectedFamily,
  (state: IVContractFamily): boolean =>
    !isEmpty(
      state?.generalConfiguration?.ConfiguracionPrecioProveedorFamilia
        ?.IdConfiguracionPrecioProveedorFamilia,
    ) && !isEmpty(state?.generalConfiguration?.configurationPriceProvider),
);

export const selectActiveBtnConfiguration = createSelector(
  selectNewContract,
  (state: IContract): boolean =>
    state.Contrato
      ? state.Contrato &&
        state.NombreFirma &&
        state.NombreFirma.trim() !== '' &&
        state.ApellidoPaternoFirma &&
        state.ApellidoPaternoFirma.trim() !== '' &&
        state.ApellidoMaternoFirma &&
        state.ApellidoMaternoFirma.trim() !== '' &&
        state.NombreRepresentanteLegalFirma &&
        state.NombreRepresentanteLegalFirma.trim() !== '' &&
        state.ApellidoPaternoRepresentanteLegalFirma &&
        state.ApellidoPaternoRepresentanteLegalFirma.trim() !== '' &&
        state.ApellidoMaternoRepresentanteLegalFirma &&
        state.ApellidoMaternoRepresentanteLegalFirma.trim() !== '' &&
        state.NombreRepresentanteLegalEmpresa &&
        state.NombreRepresentanteLegalEmpresa.trim() !== '' &&
        state.ApellidoMaternoRepresentanteLegalEmpresa &&
        state.ApellidoMaternoRepresentanteLegalEmpresa.trim() !== '' &&
        state.ApellidoPaternoRepresentanteLegalEmpresa &&
        state.ApellidoPaternoRepresentanteLegalEmpresa.trim() !== '' &&
        state.IdEmpresa &&
        state.IdEmpresa.trim() !== ''
      : state.Acuerdo &&
        state.NombreFirma &&
        state.NombreFirma.trim() !== '' &&
        state.ApellidoPaternoFirma &&
        state.ApellidoPaternoFirma.trim() !== '' &&
        state.ApellidoMaternoFirma &&
        state.ApellidoMaternoFirma.trim() !== '' &&
        state.NombreRepresentanteLegalEmpresa &&
        state.NombreRepresentanteLegalEmpresa.trim() !== '' &&
        state.ApellidoMaternoRepresentanteLegalEmpresa &&
        state.ApellidoMaternoRepresentanteLegalEmpresa.trim() !== '' &&
        state.ApellidoPaternoRepresentanteLegalEmpresa &&
        state.ApellidoPaternoRepresentanteLegalEmpresa.trim() !== '',
);
export const activeAdvanceContract = createSelector(selectNewContract, (state: IContract) => {
  return (
    state.preSelectedBrands.length > 0 &&
    new Date(state.FechaFinTipoDate).getTime() > new Date(state.FechaInicioTipoDate).getTime() &&
    state.IdCatCondicionesDePago !== undefined
  );
});
export const getIdContractClient = createSelector(
  selectNewContract,
  (state: IContract) => state.IdContratoCliente,
);
export const getURLContrato = createSelector(
  selectNewContract,
  (state: IContract) => state.UrlContrato,
);
export const selectSearchTerm = createSelector(selectContracts, (state) => state.searchTerm);
export const getFilterContractsList = createSelector(
  [selectedTabFilter, selectListContracts],
  (selectedFilter: ITabOption, contractList: ContractListData) => {
    switch (selectedFilter.filter.toLowerCase()) {
      case 'activo':
        return contractList.contactsActive;
      case 'guardado':
        return contractList.contractsSaved;
      case 'expirado':
        return contractList.contractsExpired;
      case 'cancelado':
        return contractList.contractsCanceled;
    }
  },
);

export const selectgetContractSeleted = createSelector(
  getFilterContractsList,
  (state: Array<IContract>) => find(state, (o: IContract) => o.isSelected),
);
export const selectFilterContractsListIsEmpty = createSelector(
  selectListContracts,
  selectedTabFilter,
  (contractList, tabFilter) => {
    switch (tabFilter.filter.toLowerCase()) {
      case 'Activo':
        return isEmpty(contractList.contactsActive);
      case 'Guardado':
        return isEmpty(contractList.contractsSaved);
      case 'Expirado':
        return isEmpty(contractList.contractsExpired);
      case 'Cancelado':
        return isEmpty(contractList.contractsCanceled);
    }
  },
);

export const selectedContract = createSelector(selectContracts, (state) => state.selectedContract);

export const selectedContractStatusNumber = createSelector(
  selectedContract,
  (state: IContract) => state.status,
);

export const selectIdContractFile = createSelector(
  selectNewContract,
  (state) => state.IdArchivoContrato,
);
export const selectIdSignedContractFile = createSelector(
  selectNewContract,
  (state) => state.IdArchivoContratoFirmado,
);
export const selectHasChanges = createSelector(
  [selectActualConfiguration, selectBackupConfiguration],
  (state: IConfContratoCliente, backup: IConfContratoCliente): boolean =>
    !isEqual(omit(state, ['needsToReload']), omit(backup, ['needsToReload'])),
);
export const selectActivateSaveConfigurationButton = createSelector(
  [selectActualConfiguration, selectBackupConfiguration, selectHasChanges],
  (state: IConfContratoCliente, backup: IConfContratoCliente, hasChanges: boolean) =>
    !!(
      state &&
      state.ContratoClienteMarcaConfiguracion &&
      state.ContratoClienteMarcaConfiguracion.FactorCostoFijo !== null &&
      state.ContratoClienteMarcaConfiguracion.Utilidad !== null &&
      hasChanges
    ),
);
export const selectActivateSaveContractButton = createSelector(
  [selectNewContract, selectAddContractActualStep, selectGeneratedContractUploaded],
  (state: IContract, actualStep: number, generatedContractUploaded: number): boolean =>
    !!(
      actualStep !== 2 &&
      !isEmpty(state.preSelectedBrands) &&
      state.FechaFinTipoDate > state.FechaInicioTipoDate &&
      state.IdCatCondicionesDePago &&
      state.IdCatCondicionesDePago !== DEFAULT_UUID
    ) ||
    !!(
      actualStep === 2 &&
      state.IdArchivoContrato &&
      state.signedContract.file === null &&
      generatedContractUploaded !== API_REQUEST_STATUS_LOADING &&
      generatedContractUploaded > 0
    ),
);
export const showGenerateContract = createSelector(
  [selectNewContract, selectAddContractActualStep],
  (state: IContract, actualStep: number) => {
    return actualStep === 1 || actualStep === 2;
  },
);
export const selectEnterpriseSelected = createSelector(
  selectvEmpresasForDropDown,
  selectNewContract,
  (enterprises$, contract$) =>
    find(enterprises$, (o: DropListOption) => o.value === contract$.IdEmpresa),
);

export const selectActivateGenerateContractButton = createSelector(
  [selectNewContract, selectAddContractActualStep, selectGeneratedContractUploaded],
  (state: IContract, actualStep: number, generatedContractUploaded: number): boolean => {
    if (actualStep === 1) {
      return (
        state.IdContratoCliente &&
        state.IdContratoCliente !== DEFAULT_UUID &&
        !isEmpty(state.selectedBrand)
      );
    } else if (actualStep === 2) {
      return state.ClienteEnvia
        ? state.ClienteEnvia && state.signedContract.file !== null
        : state.signedContract.file !== null &&
            state.IdArchivoContrato !== DEFAULT_UUID &&
            generatedContractUploaded === API_REQUEST_STATUS_SUCCEEDED;
    }
  },
);
export const selectClientId = createSelector(
  selectGeneralData,
  (state) => state.selectedClient?.IdCliente,
);
export const selectContractDetails = createSelector(
  selectContracts,
  (state: IContractsForm) => state.contractDetails,
);
export const selectedPaymentCondition = createSelector(
  selectNewContract,
  selectPaymentConditionsForDropDown,
  (newContract, paymentConditions) =>
    find(paymentConditions, (o: DropListOption) => o.value === newContract.IdCatCondicionesDePago),
);
export const getNivelIngreso = createSelector(
  selectGeneralData,
  (state) => state.selectedClient?.NivelIngreso,
);
export const getNameClient = createSelector(
  selectGeneralData,
  (state) => state.selectedClient?.Nombre,
);
/*DOCS: QueryInfo para obtener la configuración en Tab Familia*/
export const selectFamilyLevelConfigQueryInfo = createSelector(
  [selectedFamily, selectedClient, selectedContractBrand, selectNewContract],
  (
    selectedFamily$: IVContractFamily,
    client: VCliente,
    selectedBrand$: ITrademark,
    contract$: IContract,
  ): ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorParams => ({
    NivelConfiguracionCliente: Levels.Family,
    NivelConfiguracionProveedor: Levels.Family,
    idAgrupadorCaracteristica: null,
    idCliente: client?.IdCliente,
    idContratoCliente: contract$?.IdContratoCliente,
    idMarca: selectedBrand$?.IdMarca,
    idMarcaFamiliaProveedor: selectedFamily$?.IdMarcaFamiliaProveedor,
    idProducto: null,
    precioLista: null,
  }),
);
export const selectFiltersClientAddress = createSelector(
  selectedClient,
  (client): QueryInfo => {
    const body = new FiltersOnlyActive();
    body.Filters.push({
      NombreFiltro: 'IdCliente',
      ValorFiltro: client?.IdCliente,
    });
    return body;
  },
);

export const selectFiltersListLevels = createSelector(
  [selectedClient, selectedFamily, selectNewContract],
  (client: VCliente, selectedFamily$: IVContractFamily, newContract$: IContract): QueryInfo => {
    const body = new FiltersOnlyActive();
    body.desiredPage = selectedFamily$?.prices?.desiredPage;
    body.pageSize = PAGING_LIMIT;
    body.SortField = 'PrecioLista';
    body.SortDirection = 'asc';
    body.Filters.push(
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: client?.IdCliente,
      },
      {
        NombreFiltro: 'IdMarcaFamilia',
        ValorFiltro: selectedFamily$?.IdMarcaFamilia,
      },
      {
        NombreFiltro: 'IdContratoCliente',
        ValorFiltro: newContract$?.IdContratoCliente,
      },
    );
    if (selectedFamily$?.prices?.searchTerm) {
      body.Filters.push({
        NombreFiltro: 'CoincidenciaPrecioLista',
        ValorFiltro: selectedFamily$?.prices?.searchTerm,
      });
    }
    return body;
  },
);

export const selectFiltersListCharacteristicGrouper = createSelector(
  [selectedFamily, selectedClient, selectNewContract],
  (selectedFamily$: IVContractFamily, client: VCliente, newContract$: IContract): QueryInfo => {
    const body = new FiltersOnlyActive();
    body.desiredPage = selectedFamily$?.characteristicGroupers?.desiredPage;
    body.pageSize = PAGING_LIMIT;
    body.SortField = 'Descripcion';
    body.SortDirection = 'asc';
    body.Filters.push(
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: client?.IdCliente,
      },
      {
        NombreFiltro: 'IdMarcaFamilia',
        ValorFiltro: selectedFamily$?.IdMarcaFamilia,
      },
      {
        NombreFiltro: 'IdContratoCliente',
        ValorFiltro: newContract$?.IdContratoCliente,
      },
    );
    if (selectedFamily$?.characteristicGroupers?.searchTerm) {
      body.Filters.push({
        NombreFiltro: 'Descripcion',
        ValorFiltro: selectedFamily$?.characteristicGroupers?.searchTerm,
      });
    }
    return body;
  },
);

export const selectContractFamiliesFilters = createSelector(
  selectedClient,
  selectedContractBrand,
  (client$: VCliente, selectedBrand$: ITrademark): QueryInfo => {
    const body = new FiltersOnlyActive();
    body.Filters.push(
      {
        NombreFiltro: 'TieneProveedorPrincipal',
        ValorFiltro: true,
      },
      {
        NombreFiltro: 'IdMarca',
        ValorFiltro: selectedBrand$?.IdMarca,
      },
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: client$?.IdCliente,
      },
      {
        NombreFiltro: 'ProductoConfigurado',
        ValorFiltro: true,
      },
    );
    return body;
  },
);

export const selectGeneralAsidePricesFilters = createSelector(
  selectedContractBrand,
  selectNewContract,
  (selectedBrand$: ITrademark, contract$: IContract): QueryInfo => {
    const body = new FiltersOnlyActive();
    body.pageSize = PAGING_LIMIT;
    return body;
  },
);
export const selectVPrecioProductoClienteFilters = createSelector(
  [selectedClient, selectedFamily, selectNewContract],
  (client: VCliente, selectedFamily$: IVContractFamily, newContract$: IContract): QueryInfo => {
    const body = new FiltersOnlyActive();
    // const body: IFilters = {} as IFilters;
    body.desiredPage = selectedFamily$?.products?.desiredPage;
    body.pageSize = PAGING_LIMIT;
    body.SortField = 'DescripcionProducto';
    body.SortDirection = 'asc';
    body.Filters.push(
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: client?.IdCliente,
      },
      {
        NombreFiltro: 'IdMarcaFamilia',
        ValorFiltro: selectedFamily$?.IdMarcaFamilia,
      },
      {
        NombreFiltro: 'IdContratoCliente',
        ValorFiltro: newContract$?.IdContratoCliente,
      },
    );
    if (selectedFamily$?.products?.searchTerm) {
      body.Filters.push({
        NombreFiltro: 'DescripcionProducto',
        ValorFiltro: selectedFamily$?.products?.searchTerm,
      });
    }
    return body;
  },
);

export const selectFiltersByTabOption = createSelector(
  selectClientId,
  selectedTabFilter,
  selectSearchTerm,
  (clientId, selectedTab, searchTerm) => {
    const body = {
      Filters: [
        {
          NombreFiltro: 'IdCliente',
          ValorFiltro: clientId,
        },
        {
          NombreFiltro: 'Estatus',
          ValorFiltro: selectedTab.filter.toLowerCase(),
        },
      ],
    };
    if (searchTerm !== '') {
      body.Filters.push({
        NombreFiltro: 'Folio',
        ValorFiltro: searchTerm,
      });
    }
    return body;
  },
);
export const selectNeedsToReloadListData = createSelector(
  selectListContracts,
  selectedTabFilter,
  (list, tab) => {
    switch (tab.filter.toLowerCase()) {
      case 'activo':
        return list.needsToReloadActives;
      case 'guardado':
        return list.needsToReloadSaved;
      case 'expirado':
        return list.needsToReloadExpired;
      case 'cancelado':
        return list.needsToReloadCanceled;
    }
  },
);
export const selectListApiStatus = createSelector(
  selectedTabFilter,
  selectListContracts,
  (tab, list) => {
    switch (tab.filter.toLowerCase()) {
      case 'activo':
        return list.apiStatusActive;
      case 'guardado':
        return list.apiStatusSaved;
      case 'expirado':
        return list.apiStatusExpired;
      case 'cancelado':
        return list.apiStatusCanceled;
    }
  },
);
export const selectTabsSubConfiguration = createSelector(
  selectNewContract,
  (state) => state?.tabsSubConfiguration,
);
export const selectedTabSubConfiguration = createSelector(
  selectTabsSubConfiguration,
  (options: Array<OptionBar>) => find(options, (o: OptionBar) => o?.isSelected),
);
export const showSubConfigPriceList = createSelector(
  selectPriceSectionConfiguration,
  (state): boolean =>
    filter(state?.pricesList?.Results, (o: IVPrecioListaClienteProductoContrato) => o?.isSelected)
      ?.length > 0,
);
export const showSubConfigClassification = createSelector(
  selectCharacteristicGrouperSectionConfiguration,
  (state) =>
    filter(
      state.characteristicGroupersList.Results,
      (o: IVClasificacionProductoMarcaCliente) => o?.isSelected,
    ).length > 0,
);
export const showSubConfigProduct = createSelector(
  selectProductsSectionConfiguration,
  (state) =>
    filter(state.productsList.Results, (o: IVPrecioProductoCliente) => o.isSelected).length > 0,
);

export const selectSearchTermListBrand = createSelector(
  selectBrands,
  (state: IBrands): string => state.searchTerm,
);
export const selectValidateDatesContract = createSelector(
  selectNewContract,
  (state: IContract) => state.FechaInicio !== null && state.FechaFin !== null,
);
export const selectBrandQueryInfo = createSelector(
  [selectBrands, selectedClient, selectSearchTermListBrand, selectNewContract],
  (state: IBrands, client: VCliente, searchTerm: string, contract: IContract) => {
    let queryInfo: ResumeGroupQueryInfo = {
      Filters: [
        {
          NombreFiltro: 'TieneContratoMarcasCliente',
          ValorFiltro: client?.IdCliente,
        },
      ],
    };
    if (searchTerm) {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'NombreMarca',
          ValorFiltro: state.searchTerm,
        },
      ];
    }
    if (
      (contract.FechaInicio && contract.FechaFin) ||
      contract.IdContratoCliente !== DEFAULT_UUID
    ) {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'FechaInicio',
          ValorFiltro: contract.FechaInicio,
        },
        {
          NombreFiltro: 'FechaFin',
          ValorFiltro: contract.FechaFin,
        },
      ];
    }
    return queryInfo;
  },
);

export const selectClientSendContract = createSelector(
  selectNewContract,
  (state: IContract): boolean => state?.ClienteEnvia,
);
export const selectTrademarkFamilyProviderConsolidation = createSelector(
  selectNewContract,
  (state: IContract): Array<VMarcaFamilia> => state?.trademarkFamilyProviderConsolidation,
);
export const selectedTrademarkConsolidation = createSelector(
  selectActualConfiguration,
  selectTrademarkFamilyProviderConsolidation,
  (state: IConfContratoCliente, families: Array<VMarcaFamilia>): Array<VMarcaFamilia> =>
    filter(
      families,
      (o: VMarcaFamilia) =>
        !isEmpty(
          find(
            state?.MarcaFamiliaProveedorConsolidacion,
            (it: MarcaFamiliaProveedorConsolidacion) => it?.IdMarcaFamilia === o?.IdMarcaFamilia,
          ),
        ),
    ),
);

export const selectShowInputFile = createSelector(
  selectNewContract,
  (state: IContract): boolean => state?.showInputFile,
);
