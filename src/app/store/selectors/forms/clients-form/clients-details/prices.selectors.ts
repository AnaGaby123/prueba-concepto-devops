import {createSelector} from '@ngrx/store';
import {
  ClientPricesState,
  IClientAsidePrices,
  IClientPriceClassifications,
  IClientPriceListPrices,
  IClientPriceProducts,
  IConfClient,
  IVClientProductClassification,
  IVClientProductConfiguration,
  IVProductListPriceConfigurationClient,
  IVProviderResume,
  IVProviderResumeQueryResult,
  IVTrademarkFamily,
  OfferProviders,
} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import {FiltersOnlyActive, IFilters, queryInfoWithActiveFilter} from '@appModels/filters/Filters';
import {ENUM_PRODUCT_FAMILY_KEY, PAGING_LIMIT} from '@appUtil/common.protocols';
import {filter, find, isEmpty, isEqual, map as _map} from 'lodash-es';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';
import {
  ConfiguracionClientesCalculosService,
  DireccionClienteDetalle,
  MarcaFamiliaProveedorConsolidacion,
  QueryInfo,
  VCliente,
  VMarcaFamilia,
} from 'api-catalogos';
import {
  IOfferDeliveryRoutes,
  LevelConfigurationOption,
  Levels,
  OfferState,
  ProvidersTabOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {ICard} from '@appModels/card/card';
import {
  selectClientDetailsForm,
  selectedClient,
} from '@appSelectors/forms/clients-form/clients-details/clients-details-form.selectors';
import {IClientsDetailsForm} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {selecCatIndustriaForDropDown} from '@appSelectors/catalogs/catalogs.selectors';
import {CLASS_NAMES} from '@appModels/shared-components/pqf-card';
import ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorParams = ConfiguracionClientesCalculosService.ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorParams;
import {selectOffer} from '@appSelectors/forms/providers/providers-details/provider-form-step-8-offer.selectors';

export const selectPrices = createSelector(
  selectClientDetailsForm,
  (state: IClientsDetailsForm): ClientPricesState => state.prices,
);
export const selectClientAddresses = createSelector(selectPrices, (state: ClientPricesState) =>
  _map(state.clientAddresses, (o: DireccionClienteDetalle) => o.Direccion),
);
export const selectLevelConfigurationTabs = createSelector(
  selectPrices,
  (state: ClientPricesState) =>
    _map(state.levelConfigurationTabs, (o: LevelConfigurationOption) => ({
      ...o,
      disable:
        o.label !== ProvidersTabOptions.General &&
        !(
          !isEmpty(
            state.selectedProvider?.selectedFamily?.generalConfiguration
              ?.ConfiguracionPrecioProveedorFamilia?.IdConfiguracionPrecioProveedorFamilia,
          ) &&
          !isEmpty(
            state.selectedProvider?.selectedFamily?.generalConfiguration
              ?.configurationPriceProvider,
          )
        ),
    })),
);

export const hasProviderConfiguration = createSelector(
  selectPrices,
  (state: ClientPricesState): boolean =>
    !isEmpty(
      state.selectedProvider?.selectedFamily?.generalConfiguration
        ?.ConfiguracionPrecioProveedorFamilia?.IdConfiguracionPrecioProveedorFamilia,
    ) &&
    !isEmpty(
      state.selectedProvider?.selectedFamily?.generalConfiguration?.configurationPriceProvider,
    ),
);
export const selectConfigurationTypes = createSelector(
  selectPrices,
  (state: ClientPricesState): Array<DropListOption> => state.configurationTypes,
);
export const selectConfigurationTypeSelected = createSelector(
  selectPrices,
  (state: ClientPricesState): DropListOption => state.configurationTypeSelected,
);
export const selectShowProviderList = createSelector(
  selectPrices,
  (state: ClientPricesState): boolean => state.showProviderList,
);
export const selectPreSelectedProvider = createSelector(
  selectPrices,
  (state: ClientPricesState): IVProviderResume => state.preSelectedProvider,
);
export const selectPreSelectedFamily = createSelector(
  selectPrices,
  (state: ClientPricesState): ICard => state.preSelectedFamily,
);
export const selectPreSelectedLevelConfiguration = createSelector(
  selectPrices,
  (state: ClientPricesState): LevelConfigurationOption => state.preSelectedLevelConfiguration,
);
export const selectProvidersNode = createSelector(
  selectPrices,
  (state: ClientPricesState): OfferProviders => state.providers,
);
export const selectProductsFilterOptions = createSelector(
  selectPrices,
  (state: ClientPricesState): Array<DropListOption> => state.filterOptions,
);
export const selectIsMexicanProvider = createSelector(
  selectProvidersNode,
  (state: OfferProviders): boolean => {
    const providerSelected = find(state?.providersList?.Results, (o) => o.isSelected);
    return providerSelected?.Mexicano;
  },
);
export const selectedProvider = createSelector(
  selectPrices,
  (state: ClientPricesState): IVProviderResume => state.selectedProvider,
);
export const selectToggleSwitchOptions = createSelector(
  selectPrices,
  (state: ClientPricesState): Array<DropListOption> => state.toggleSwitchOptions,
);
export const selectedProviderId = createSelector(
  selectedProvider,
  (state: IVProviderResume): string => state?.IdProveedor,
);
export const selectedProviderNeedsToReload = createSelector(
  selectedProvider,
  (state: IVProviderResume): boolean => state?.needsToReload,
);
export const selectedProviderFamiliesList = createSelector(
  selectedProvider,
  (state: IVProviderResume): Array<IVTrademarkFamily> => state?.familiesList,
);
export const selectedProviderFamily = createSelector(
  selectedProvider,
  (state: IVProviderResume): IVTrademarkFamily => state?.selectedFamily,
);
export const selectActualGeneralConfiguration = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily): IConfClient => state?.generalConfiguration,
);
export const selectTabCharacteristicGrouper = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily): IClientPriceClassifications => state?.classifications,
);
export const selectedFamilyHasCharacteristicGrouper = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily) => state?.ClaveTipo !== ENUM_PRODUCT_FAMILY_KEY.trainings,
);
export const selectClassificationsSearchTermCharacteristicGrouper = createSelector(
  selectTabCharacteristicGrouper,
  (state: IClientPriceClassifications) => state?.searchTerm,
);
export const selectHasConfigurationFilterCharacteristicGrouper = createSelector(
  selectTabCharacteristicGrouper,
  (state: IClientPriceClassifications) => state?.hasConfigurationFilter,
);

export const selectCharacteristicGrouperResults = createSelector(
  selectTabCharacteristicGrouper,
  (state: IClientPriceClassifications): Array<IVClientProductClassification> =>
    state?.classificationsList?.Results,
);
export const selectTabPrices = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily): IClientPriceListPrices => state?.prices,
);
export const selectedFamilySelectedPrice = createSelector(
  selectTabPrices,
  (state: IClientPriceListPrices): IVProductListPriceConfigurationClient =>
    find(state?.pricesList?.Results, (o: IVProductListPriceConfigurationClient) => o.isSelected),
);
export const selectPricesHasConfigurationFilter = createSelector(
  selectTabPrices,
  (state: IClientPriceListPrices): boolean => state?.hasConfigurationFilter,
);
export const selectPricesSearchTerm = createSelector(
  selectTabPrices,
  (state: IClientPriceListPrices): string => state?.searchTerm,
);
export const selectHasConfigurationFilter = createSelector(
  selectTabPrices,
  (state: IClientPriceListPrices): boolean => state?.hasConfigurationFilter,
);
export const selectPriceResults = createSelector(
  selectTabPrices,
  (state: IClientPriceListPrices): Array<IVProductListPriceConfigurationClient> =>
    state?.pricesList?.Results,
);

export const selectedFamilyClassifications = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily): IClientPriceClassifications => state?.classifications,
);
export const selectedFamilySelectedClassification = createSelector(
  selectedFamilyClassifications,
  (state: IClientPriceClassifications): IVClientProductClassification =>
    find(state?.classificationsList?.Results, (o: IVClientProductClassification) => o.isSelected),
);
export const selectedFamilyProducts = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily): IClientPriceProducts => state?.products,
);
export const selectProductsSearchFilter = createSelector(
  selectedFamilyProducts,
  (state: IClientPriceProducts): DropListOption => state?.searchFilter,
);
export const selectProductsSearchTerm = createSelector(
  selectedFamilyProducts,
  (state: IClientPriceProducts): string => state?.searchTerm,
);
export const selectHasConfigurationProductFilter = createSelector(
  selectedFamilyProducts,
  (state: IClientPriceProducts): boolean => state?.hasConfigurationFilter,
);
export const selectProductsResults = createSelector(
  selectedFamilyProducts,
  (state: IClientPriceProducts): Array<IVClientProductConfiguration> =>
    state?.productsList?.Results,
);
export const selectProductSelected = createSelector(
  selectedFamilyProducts,
  (state: IClientPriceProducts): IVClientProductConfiguration =>
    find(state?.productsList?.Results, (o: IVClientProductConfiguration) => o.isSelected),
);
export const selectActualConfiguration = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily) => {
    return state?.actualConfiguration || ({} as IConfClient);
  },
);
export const selectBackupConfiguration = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily): IConfClient => state?.backupConfiguration,
);
export const selectACDeliveryRoutes = createSelector(
  selectActualConfiguration,
  (state: IConfClient): IOfferDeliveryRoutes[] => state?.deliveryRoutes || [],
);
export const haveChangesActualConfiguration = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily): boolean =>
    !isEqual(
      JSON.stringify(state?.actualConfiguration),
      JSON.stringify(state?.backupConfiguration),
    ),
);
export const selectedProviderFamilyTrademarkId = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily): string => state?.IdMarcaFamiliaProveedor,
);
export const selectedLevelConfigurationTab = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily): LevelConfigurationOption => state?.selectedLevelConfigurationTab,
);
export const selectLevelsSubConfigurationsTab = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily): Array<OptionBar> => state?.levelSubConfigurationTabs,
);
export const selectTrademarkFamilyProviderConsolidation = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily): Array<VMarcaFamilia> => state?.trademarkFamilyProviderConsolidation,
);
export const selectedLevelSubConfigurationTab = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily): OptionBar =>
    find(state?.levelSubConfigurationTabs, (o: OptionBar) => o?.isSelected),
);
/*DOCS: Aside prices*/
export const selectAsidePrices = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily): IClientAsidePrices => state?.asidePrices,
);
/*DOCS: Selected price*/
export const selectedAsidePrices = createSelector(
  selectedProviderFamily,
  (state: IVTrademarkFamily): IClientAsidePrices => state?.asidePrices?.selectedPrice,
);
export const selectGetNextPanelPageIsAllowed = createSelector(
  selectAsidePrices,
  (state: IClientAsidePrices): boolean =>
    state?.desiredPage !== null &&
    state?.desiredPage !== undefined &&
    state?.pricesList &&
    state?.desiredPage < state?.pricesList?.TotalResults,
);
export const selectGetPreviousPanelPageIsAllowed = createSelector(
  selectAsidePrices,
  (state: IClientAsidePrices) =>
    state?.desiredPage !== null && state?.desiredPage !== undefined && state?.desiredPage > 1,
);
export const selectIndustryClientName = createSelector(
  [selecCatIndustriaForDropDown, selectedClient],
  (dropIndustry: Array<DropListOption>, client: VCliente): DropListOption =>
    find(dropIndustry, (o: DropListOption) => o.value === client.IdCatIndustria),
);
export const selectFamiliesToCards = createSelector(
  [selectedProviderFamiliesList, selectIndustryClientName],
  (state: Array<IVTrademarkFamily>, industry: DropListOption): Array<ICard> =>
    _map(
      state,
      (o: IVTrademarkFamily): ICard => ({
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

export const selectProvidersList = createSelector(
  selectProvidersNode,
  (state: OfferProviders): IVProviderResumeQueryResult => state?.providersList,
);
export const selectProvidersSearchTerm = createSelector(
  selectProvidersNode,
  (state: OfferProviders): string => state.searchTerm,
);
export const selectProvidersApiStatus = createSelector(
  selectProvidersNode,
  (state: OfferProviders): number => state.apiStatus,
);

/*DOCS: QueryInfos*/
/*DOCS: QueryInfo para obtener la lista de proveedores*/
export const selectProvidersQueryInfo = createSelector(
  selectProvidersNode,
  (state: OfferProviders) => {
    const queryInfo = queryInfoWithActiveFilter();
    queryInfo.SortField = 'Nombre';
    queryInfo.SortDirection = 'asc';
    queryInfo.desiredPage = state.desiredPage;
    queryInfo.pageSize = PAGING_LIMIT;
    if (state.searchTerm) {
      queryInfo.Filters.push({
        NombreFiltro: 'Nombre',
        ValorFiltro: state.searchTerm,
      });
    }
    return queryInfo;
  },
);

/*DOCS: QueryInfo para obtener Familias de las marcas asociadas al proveedor que pertenezcan a su sector e industria*/
export const selectTrademarkFamiliesQueryInfo = createSelector(
  [selectedProviderId, selectedClient],
  (providerId: string, client: VCliente): QueryInfo => {
    const queryInfo = queryInfoWithActiveFilter();
    queryInfo.Filters.unshift(
      {
        NombreFiltro: 'TieneProveedorPrincipal',
        ValorFiltro: true,
      },
      {
        NombreFiltro: 'IdProveedorPrincipal',
        ValorFiltro: providerId,
      },
      {
        NombreFiltro: 'ProductoConfigurado',
        ValorFiltro: true,
      },
    );
    return queryInfo;
  },
);

/*DOCS: QueryInfo para obtener la configuración en Tab Familia*/
export const selectFamilyLevelConfigQueryInfo = createSelector(
  selectedProviderFamilyTrademarkId,
  selectedClient,
  (
    providerFamilyTrademarkId: string,
    client: VCliente,
  ): ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorParams => ({
    IdMarcaFamiliaProveedor: providerFamilyTrademarkId,
    NivelConfiguracionCliente: Levels.Family,
    NivelConfiguracionProveedor: Levels.Family,
    IdCliente: client?.IdCliente,
  }),
);

export const selectFetchMoreProvidersInfo = createSelector(
  selectProvidersNode,
  (state: OfferProviders): IFetchMoreItemsInfo => {
    return {
      itemList: state.providersList?.Results,
      itemsTotalLength: state.providersList?.TotalResults,
      listRequestStatus: state.apiStatus,
      desiredPage: state.desiredPage,
      pageSize: PAGING_LIMIT,
      totalPages:
        state.providersList?.TotalResults >= PAGING_LIMIT
          ? Math.ceil(state.providersList?.TotalResults / PAGING_LIMIT)
          : 0,
    };
  },
);
/*DOCS: Validators*/
export const pricesSaveValidator = createSelector(
  [selectActualConfiguration, selectBackupConfiguration, selectedProvider],
  (state: IConfClient, backupConfiguration: IConfClient, provider: IVProviderResume) =>
    !!(
      state &&
      state.ConfiguracionPrecioCliente?.Utilidad &&
      state.ConfiguracionPrecioCliente?.FactorDeCostoFijo &&
      !isEqual(JSON.stringify(state), JSON.stringify(backupConfiguration))
    ),
);
export const pricesHasChanges = createSelector(
  [selectActualConfiguration, selectBackupConfiguration],
  (state: IConfClient, backupConfiguration: IConfClient): boolean =>
    !isEqual(JSON.stringify(state), JSON.stringify(backupConfiguration)),
);

export const selectLogisticTimeTotal = createSelector(
  [selectActualConfiguration, selectIsMexicanProvider],
  (state: IConfClient, isMexican: boolean): number =>
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

export const selectComercialTimeTotal = createSelector(
  [selectActualConfiguration, selectIsMexicanProvider],
  (state: IConfClient, isMexican: boolean): number =>
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

export const selectQueryInfoPricesTab = createSelector(
  selectedClient,
  selectedProviderFamily,
  selectPricesHasConfigurationFilter,
  (client: VCliente, selectedFamily$: IVTrademarkFamily, hasConfigurationFilter$: boolean) => {
    const body: IFilters = new FiltersOnlyActive();
    body.desiredPage = selectedFamily$?.prices?.desiredPage;
    body.pageSize = PAGING_LIMIT;
    body.SortField = 'PrecioLista';
    body.SortDirection = 'asc';
    body.Filters.push(
      {
        NombreFiltro: 'IdMarcaFamilia',
        ValorFiltro: selectedFamily$?.IdMarcaFamilia,
      },
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: client?.IdCliente,
      },
    );
    if (selectedFamily$?.prices?.searchTerm) {
      body.Filters.push({
        NombreFiltro: 'CoincidenciaPrecioLista',
        ValorFiltro: selectedFamily$?.prices?.searchTerm,
      });
    }
    if (hasConfigurationFilter$) {
      body.Filters.push({
        NombreFiltro: 'NivelConfiguracionProductoCliente',
        ValorFiltro: 'PrecioLista',
      });
    }

    return body;
  },
);
export const selectFiltersToListPrices = createSelector(
  selectedClient,
  selectedProviderFamily,
  selectedFamilySelectedClassification,
  selectedLevelConfigurationTab,
  (
    client: VCliente,
    selectedFamily$: IVTrademarkFamily,
    selectedClassification$: IVClientProductClassification,
    selectedTabConfiguration$: LevelConfigurationOption,
  ): IFilters => {
    const body: IFilters = new FiltersOnlyActive();
    body.desiredPage =
      selectedTabConfiguration$?.id === 1
        ? selectedFamily$?.generalAsidePrices?.desiredPage
        : selectedFamily$?.classificationAsidePrices?.desiredPage;
    body.pageSize = 1;
    body.Filters.push(
      {
        NombreFiltro: 'IdMarcaFamilia',
        ValorFiltro: selectedFamily$?.IdMarcaFamilia,
      },
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: client?.IdCliente,
      },
    );
    if (selectedTabConfiguration$?.id === 1 && selectedFamily$?.generalAsidePrices?.searchTerm) {
      body.Filters.push({
        NombreFiltro: 'CoincidenciaPrecioLista',
        ValorFiltro: selectedFamily$?.generalAsidePrices?.searchTerm,
      });
    }
    if (selectedTabConfiguration$?.id === 3) {
      body.Filters.push({
        NombreFiltro: 'IdAgrupadorCaracteristica',
        ValorFiltro: selectedClassification$?.IdAgrupadorCaracteristica,
      });
      if (selectedFamily$.classificationAsidePrices.searchTerm) {
        body.Filters.push({
          NombreFiltro: 'CoincidenciaPrecioLista',
          ValorFiltro: selectedFamily$?.classificationAsidePrices.searchTerm,
        });
      }
    }
    return body;
  },
);

export const selectFiltersToCharacteristicGrouper = createSelector(
  selectedClient,
  selectedProviderFamily,
  selectHasConfigurationFilterCharacteristicGrouper,
  (client: VCliente, selectedFamily$: IVTrademarkFamily, hasConfigurationFilter$: boolean) => {
    const body: IFilters = new FiltersOnlyActive();
    body.SortDirection = 'Descripcion';
    body.desiredPage = selectedFamily$?.classifications?.desiredPage;
    body.pageSize = PAGING_LIMIT;
    body.Filters.push(
      {
        NombreFiltro: 'IdMarcaFamilia',
        ValorFiltro: selectedFamily$?.IdMarcaFamilia,
      },
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: client?.IdCliente,
      },
    );
    if (selectedFamily$?.classifications?.searchTerm) {
      body.Filters.push({
        NombreFiltro: 'Descripcion ',
        ValorFiltro: selectedFamily$?.classifications?.searchTerm,
      });
    }
    if (hasConfigurationFilter$) {
      body.Filters.push({
        NombreFiltro: 'NivelConfiguracionProductoCliente',
        ValorFiltro: 'AgrupadorCaracteristica',
      });
    }
    return body;
  },
);
export const selectFiltersToProductList = createSelector(
  selectedClient,
  selectedProviderFamily,
  selectHasConfigurationProductFilter,
  (client: VCliente, selectedFamily$: IVTrademarkFamily, hasConfigurationFilter$: boolean) => {
    const body: IFilters = new FiltersOnlyActive();
    body.SortField = 'IdProducto';
    body.SortDirection = 'asc';
    body.desiredPage = selectedFamily$?.products?.desiredPage;
    body.pageSize = PAGING_LIMIT;
    body.Filters.push(
      {
        NombreFiltro: 'IdMarcaFamilia',
        ValorFiltro: selectedFamily$?.IdMarcaFamilia,
      },
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: client?.IdCliente,
      },
    );
    if (selectedFamily$?.products?.searchTerm) {
      body.Filters.push({
        NombreFiltro: selectedFamily$?.products?.searchFilter.subtitle,
        ValorFiltro: selectedFamily$?.products?.searchTerm,
      });
    }
    if (hasConfigurationFilter$) {
      body.Filters.push({
        NombreFiltro: 'NivelConfiguracionProductoCliente',
        ValorFiltro: 'Producto',
      });
    }
    return body;
  },
);

export const selectGeneralLevelAsidePricesQueryInfo = createSelector(
  selectedProviderFamily,
  selectedClient,
  (family: IVTrademarkFamily, selectedClient: VCliente): QueryInfo => {
    const queryInfo: QueryInfo = queryInfoWithActiveFilter();
    queryInfo.desiredPage = family?.asidePrices?.desiredPage;
    queryInfo.pageSize = 1;
    queryInfo.Filters.unshift(
      {
        NombreFiltro: 'IdMarcaFamilia',
        ValorFiltro: family?.IdMarcaFamilia,
      },
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: selectedClient?.IdCliente,
      },
      {
        NombreFiltro: 'IdCatIndustria',
        ValorFiltro: selectedClient?.IdCatIndustria,
      },
      {
        NombreFiltro: 'IdCatSector',
        ValorFiltro: selectedClient?.IdCatSector,
      },
    );
    if (family?.asidePrices.searchTerm) {
      queryInfo.Filters.push({
        NombreFiltro: 'CoincidenciaPrecioLista',
        ValorFiltro: family?.asidePrices?.searchTerm,
      });
    }
    return queryInfo;
  },
);

export const selectPriceLevelAsidePricesQueryInfo = createSelector(
  selectedProviderFamily,
  selectedClient,
  selectedFamilySelectedPrice,
  (
    family: IVTrademarkFamily,
    selectedClient: VCliente,
    selectedPrice: IVProductListPriceConfigurationClient,
  ): QueryInfo => {
    const queryInfo: QueryInfo = queryInfoWithActiveFilter();
    queryInfo.desiredPage = family?.asidePrices?.desiredPage;
    queryInfo.pageSize = 1;
    queryInfo.Filters.unshift(
      {
        NombreFiltro: 'IdMarcaFamilia',
        ValorFiltro: family?.IdMarcaFamilia,
      },
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: selectedClient?.IdCliente,
      },
      {
        NombreFiltro: 'IdCatIndustria',
        ValorFiltro: selectedClient?.IdCatIndustria,
      },
      {
        NombreFiltro: 'IdCatSector',
        ValorFiltro: selectedClient?.IdCatSector,
      },
      {
        NombreFiltro: 'BasePrecioLista',
        ValorFiltro: selectedPrice?.BasePrecioLista.toString(),
      },
    );
    return queryInfo;
  },
);

export const selectCharacteristicGrouperlLevelAsidePricesQueryInfo = createSelector(
  selectedProviderFamily,
  selectedClient,
  selectedFamilySelectedClassification,
  (
    family: IVTrademarkFamily,
    selectedClient: VCliente,
    selectedCharacteristicGrouper: IVClientProductClassification,
  ): QueryInfo => {
    const queryInfo: QueryInfo = queryInfoWithActiveFilter();
    queryInfo.desiredPage = family?.asidePrices?.desiredPage;
    queryInfo.pageSize = 1;
    queryInfo.Filters.unshift(
      {
        NombreFiltro: 'IdMarcaFamilia',
        ValorFiltro: family?.IdMarcaFamilia,
      },
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: selectedClient?.IdCliente,
      },
      {
        NombreFiltro: 'IdCatIndustria',
        ValorFiltro: selectedClient?.IdCatIndustria,
      },
      {
        NombreFiltro: 'IdCatSector',
        ValorFiltro: selectedClient?.IdCatSector,
      },
      {
        NombreFiltro: 'IdAgrupadorCaracteristica',
        ValorFiltro: selectedCharacteristicGrouper?.IdAgrupadorCaracteristica,
      },
    );
    if (family?.asidePrices.searchTerm) {
      queryInfo.Filters.push({
        NombreFiltro: 'CoincidenciaPrecioLista',
        ValorFiltro: family?.asidePrices?.searchTerm,
      });
    }
    return queryInfo;
  },
);

export const selectProductlLevelAsidePricesQueryInfo = createSelector(
  selectedProviderFamily,
  selectedClient,
  selectProductSelected,
  (
    family: IVTrademarkFamily,
    selectedClient: VCliente,
    selectedProduct: IVClientProductConfiguration,
  ): QueryInfo => {
    const queryInfo: QueryInfo = queryInfoWithActiveFilter();
    queryInfo.desiredPage = family?.asidePrices?.desiredPage;
    queryInfo.pageSize = 1;
    queryInfo.Filters.unshift(
      {
        NombreFiltro: 'IdMarcaFamilia',
        ValorFiltro: family?.IdMarcaFamilia,
      },
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: selectedClient?.IdCliente,
      },
      {
        NombreFiltro: 'IdCatIndustria',
        ValorFiltro: selectedClient?.IdCatIndustria,
      },
      {
        NombreFiltro: 'IdCatSector',
        ValorFiltro: selectedClient?.IdCatSector,
      },
      {
        NombreFiltro: 'IdProducto',
        ValorFiltro: selectedProduct?.IdProducto,
      },
    );
    if (family?.asidePrices.searchTerm) {
      queryInfo.Filters.push({
        NombreFiltro: 'CoincidenciaPrecioLista',
        ValorFiltro: family?.asidePrices?.searchTerm,
      });
    }
    return queryInfo;
  },
);

export const selectPopBreakdownIsOpen = createSelector(
  selectPrices,
  (state: ClientPricesState) => state.popBreakdownIsOpen,
);
export const selectOpenPopBreakdownAferSave = createSelector(
  selectPrices,
  (state: ClientPricesState) => state.openPopAfterSave,
);
export const selectOpenAlerPopUpdaeBreakdown = createSelector(
  selectPrices,
  (state: ClientPricesState) => state.alertPopUpdateBreakdown,
);
export const selectedTrademarkConsolidation = createSelector(
  selectActualConfiguration,
  selectTrademarkFamilyProviderConsolidation,
  (state: IConfClient, families: Array<VMarcaFamilia>): Array<VMarcaFamilia> =>
    filter(
      families,
      (o: VMarcaFamilia) =>
        !isEmpty(
          find(
            state.MarcaFamiliaProveedorConsolidacion,
            (it: MarcaFamiliaProveedorConsolidacion) => it.IdMarcaFamilia === o.IdMarcaFamilia,
          ),
        ),
    ),
);
