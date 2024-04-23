import {createSelector} from '@ngrx/store';

// Models
import {ProvidersDetailsState} from '@appModels/store/forms/providers/providers-details/providers-details.models';
import {
  dropDownListConfiguration,
  IConfProveedorUtilidadComision,
  IConfProvider,
  IDeliveryRouteFamilyProviderDeliveryTimeConfiguration,
  IOfferAsidePrices,
  IOfferClassifications,
  IOfferDeliveryRoutes,
  IOfferListPrices,
  IOfferProducts,
  IProviderCategoryUtilityPriceConfiguration,
  IVMarcaFamiliaIndustriaObj,
  IVProductListPrice,
  IVProductListPriceConfiguration,
  IVProductProviderListPrice,
  IVProviderProductClassification,
  IVProviderProductConfiguration,
  IVTrademarkFamily,
  LevelConfigurationOption,
  Levels,
  OfferState,
  ProvidersTabOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {ICard} from '@appModels/card/card';
import {
  Aduana,
  ConceptoAgenteAduanal,
  ConfiguracionPrecioProveedor,
  ConfiguracionPrecioProveedorFamilia,
  ConfiguracionPrecioUtilidadCategoriaProveedorObj,
  ConfiguracionProveedoresCalculosService,
  ConfProveedorUtilidadComision,
  QueryInfo,
} from 'api-catalogos';
import {queryInfoWithActiveFilter} from '@appModels/filters/Filters';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

// Selectors
import {
  selectedProvider,
  selectProvidersAddEdit,
} from '@appSelectors/forms/providers/providers-details/providers-details.selectors';
import {getProviderId} from '@appSelectors/forms/providers/providers-details/provider-form-step-1-general-data.selectors';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {
  selectListAduana,
  selectListConceptoAgenteAduanal,
} from '@appSelectors/catalogs/catalogs.selectors';

// Utils
import {
  capitalize,
  countBy,
  filter,
  find,
  flow,
  forEach,
  isEmpty,
  isEqual,
  join,
  map as _map,
  omit,
  sum,
  toLower,
} from 'lodash-es';
import {getArrayForDropDownList, validateFieldsRequiredNumber} from '@appUtil/util';
import {DEFAULT_UUID, ENUM_PRODUCT_FAMILY_KEY, PAGING_LIMIT} from '@appUtil/common.protocols';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {IVProveedor} from '@appModels/store/forms/providers/providers-list/providers-list.models';
import {CLASS_NAMES} from '@appModels/shared-components/pqf-card';
import ConfiguracionProveedorExtensionConfiguracionProveedorParams = ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorParams;

export const selectOffer = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState) => state.offer,
);

export const selectFamilies = createSelector(
  selectOffer,
  (state: OfferState) => state.familiesList,
);
export const selectToggleSwitchOptions = createSelector(
  selectOffer,
  (state: OfferState): Array<DropListOption> => state.toggleSwitchOptions,
);
export const selectProductsFilterOptions = createSelector(
  selectOffer,
  (state: OfferState) => state.filterOptions,
);
export const selectFamiliesToCards = createSelector(
  selectFamilies,
  (state: Array<IVTrademarkFamily>): Array<ICard> =>
    _map(
      state,
      (o: any): ICard => ({
        active: o.isSelected,
        value: o.IdMarcaFamilia,
        labels: [
          {label: o.NombreMarca, className: CLASS_NAMES.title},
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

// TODO: SelectedFamily first level
export const selectedFamily = createSelector(
  selectOffer,
  (state: OfferState): IVTrademarkFamily => state.selectedFamily,
);
export const selectLevelConfigurationTabs = createSelector(
  selectOffer,
  (state: OfferState): Array<LevelConfigurationOption> =>
    _map(state.levelConfigurationTabs, (o: LevelConfigurationOption) => ({
      ...o,
      disable:
        o.label !== ProvidersTabOptions.General &&
        (!state.selectedFamily?.generalConfiguration?.ConfiguracionProveedorFamiliaGeneral
          ?.IdConfiguracionProveedorFamiliaGeneral ||
          state.selectedFamily?.generalConfiguration?.ConfiguracionProveedorFamiliaGeneral
            ?.IdConfiguracionProveedorFamiliaGeneral === DEFAULT_UUID),
    })),
);
export const selectProviderFamilyTrademarkId = createSelector(
  selectedFamily,
  (state: IVTrademarkFamily) => state.IdMarcaFamiliaProveedor,
);
export const selectedLevelConfigurationTab = createSelector(
  selectedFamily,
  (state: IVTrademarkFamily) => state.selectedLevelConfigurationTab,
);
export const selectLevelsSubConfigurationsTab = createSelector(
  selectedFamily,
  (state: IVTrademarkFamily) => state.levelSubConfigurationTabs,
);
export const selectedLevelSubConfigurationTab = createSelector(
  selectedFamily,
  (state: IVTrademarkFamily) =>
    find(state.levelSubConfigurationTabs, (o: OptionBar) => o.isSelected),
);
export const selectGeneralConfiguration = createSelector(
  selectedFamily,
  (state: IVTrademarkFamily) => state.generalConfiguration || ({} as IConfProvider),
);
export const selectActualConfiguration = createSelector(
  selectedFamily,
  (state: IVTrademarkFamily) => state.actualConfiguration || ({} as IConfProvider),
);
export const selectedCatIndustryBrandFamily = createSelector(
  selectedFamily,
  (state: IVTrademarkFamily) => state.selectedCatIndustryBrandFamily,
);
export const selectedFamilyHasCharacteristicGrouper = createSelector(
  selectedFamily,
  (state: IVTrademarkFamily) => state?.ClaveTipo !== ENUM_PRODUCT_FAMILY_KEY.trainings,
);
export const selectPerformanceProviderConfiguration = createSelector(
  selectActualConfiguration,
  (state: IConfProvider) => state?.configuracionProveedorRendimiento,
);
export const selectIndustryFamilyList = createSelector(
  selectPerformanceProviderConfiguration,
  (state: ConfProveedorUtilidadComision) => state?.vMarcaFamiliaIndustria,
);

export const selectBackupConfiguration = createSelector(
  selectedFamily,
  (state: IVTrademarkFamily) => state.backupConfiguration,
);

// TODO: ActualConfiguration
export const selectACDeliveryRoutes = createSelector(
  selectActualConfiguration,
  (state: IConfProvider) => state?.deliveryRoutes || [],
);
export const selectTrademarkFamiliesListForDropDown = createSelector(
  selectActualConfiguration,
  (state: IConfProvider): Array<DropListOption> => {
    return _map(
      state.trademarkFamiliesList,
      (item: IVTrademarkFamily): DropListOption => ({
        label: `${capitalize(item.Tipo)} ${
          toLower(item.Subtipo) !== 'n/a' ? capitalize(item.Subtipo) : ''
        } ${toLower(item.Control) !== 'n/a' ? capitalize(item.Control) : ''}`,
        value: item.IdMarcaFamilia,
        isSelected: item.isSelected,
      }),
    );
  },
);
export const selectProviderConfigurationPerformanceToSave = createSelector(
  selectActualConfiguration,
  (state: IConfProvider): IVMarcaFamiliaIndustriaObj =>
    find(
      state.configuracionProveedorRendimiento?.vMarcaFamiliaIndustria,
      (o: IVMarcaFamiliaIndustriaObj) => o?.needsToSave,
    ),
);

/*DOCS: Se arma el string de familias consolidables para el modo solo lectura
    Se toma desde la configuración general ya que en los demás niveles no cambia*/
export const selectTrademarkFamiliesListForLabel = createSelector(
  selectGeneralConfiguration,
  (state: IConfProvider): string => {
    return (
      join(
        _map(
          filter(state.trademarkFamiliesList, (o: IVTrademarkFamily) => o.isSelected),
          (item: IVTrademarkFamily) =>
            `${capitalize(item.Tipo)} ${
              toLower(item.Subtipo) !== 'n/a' ? capitalize(item.Subtipo) : ''
            } ${toLower(item.Control) !== 'n/a' ? capitalize(item.Control) : ''}`,
        ),
        ', ',
      ) || 'N/A'
    );
  },
);
export const selectedCustomsAgent = createSelector(
  selectActualConfiguration,
  (state: IConfProvider) => state.selectedCustomsAgent,
);
export const selectedCustoms = createSelector(
  selectActualConfiguration,
  (state: IConfProvider) => state.selectedCustoms,
);
export const selectedCustomsAgentConcept = createSelector(
  selectActualConfiguration,
  (state: IConfProvider) => state.selectedCustomsAgentConcept,
);
export const selectProviderPriceConfiguration = createSelector(
  selectActualConfiguration,
  (state: IConfProvider): ConfiguracionPrecioProveedor => state.ConfiguracionPrecioProveedor,
);
export const selectProviderPriceConfigurationFamily = createSelector(
  selectActualConfiguration,
  (state: IConfProvider): ConfiguracionPrecioProveedorFamilia =>
    state.ConfiguracionPrecioProveedorFamilia,
);

export const selectProviderCategoryUtilityPriceConfig = createSelector(
  selectActualConfiguration,
  (state: IConfProvider) => state.configuracionProveedorRendimiento,
);

export const selectACSelectedDeliveryRoute = createSelector(
  selectACDeliveryRoutes,
  (state: IOfferDeliveryRoutes[]) => find(state, (o: IOfferDeliveryRoutes) => o.isSelected) || {},
);

export const selectDeliveryRouteTimeConfig = createSelector(
  selectACSelectedDeliveryRoute,
  (state: IOfferDeliveryRoutes) => state.configuracionTiempoEntregaProveedorFamiliaRutaEntrega,
);

export const selectProviderIsMexican = createSelector(
  selectedProvider,
  (state: IVProveedor) => state?.Mexicano,
);
export const selectSumLogisticsTime = createSelector(
  selectDeliveryRouteTimeConfig,
  (state: IDeliveryRouteFamilyProviderDeliveryTimeConfiguration) => {
    const sumLogistics: {timeLogistics: any; timeCommerce: any} = {
      timeLogistics: sum([
        Number(state?.DiasPedidoACompra),
        Number(state?.DiasCompraAEmbarque),
        Number(state?.DiasEmbarqueAArribo),
        Number(state?.DiasConsolidacionPharma),
        Number(state?.DiasArriboAImportacion),
        Number(state?.DiasImportacionAAlmacen),
      ]),
      timeCommerce: 0,
    };
    sumLogistics.timeCommerce = sum([
      Number(sumLogistics.timeLogistics),
      Number(state?.DiasAlmacenAInspeccion),
      Number(state?.DiasInspeccionAEmbalaje),
    ]);
    return sumLogistics;
  },
);

// DOCS: Catalogs
export const selectCustomsListForDrop = createSelector(
  selectListAduana,
  selectedCustomsAgent,
  (state: Array<Aduana>, customsAgent: DropListOption): Array<DropListOption> =>
    getArrayForDropDownList(
      filter(
        state,
        (o: Aduana) => o.Activo && o.IdAgenteAduanal === customsAgent?.value?.toString(),
      ),
      'IdAduana',
      'NombreLugar',
    ),
);
export const selectCustomsAgentsConceptListForDrop = createSelector(
  selectListConceptoAgenteAduanal,
  selectedCustoms,
  (state: Array<ConceptoAgenteAduanal>, customs: DropListOption): Array<DropListOption> =>
    getArrayForDropDownList(
      filter(
        state,
        (o: ConceptoAgenteAduanal) => o.Activo && o.IdAduana === customs?.value?.toString(),
      ),
      'IdConceptoAgenteAduanal',
      'Concepto',
    ),
);
export const selectCatIncomeLevelsList = createSelector(
  selectOffer,
  (state: OfferState): Array<IProviderCategoryUtilityPriceConfiguration> => state?.catIncomeLevels,
);
export const selectCatDeliveryRoutesList = createSelector(
  selectOffer,
  (state: OfferState): Array<IOfferDeliveryRoutes> => state?.catDeliveryRoutes,
);

export const selectDropDownListForGetConfiguration = createSelector(
  [
    catalogsSelectors.selectCustomsAgentsListForDropDown,
    catalogsSelectors.selectCustomsListForDropDown,
    catalogsSelectors.selectCustomsAgentsConceptListForDrop,
  ],
  (customsAgentsList, customsList, customsAgentsConceptsList): dropDownListConfiguration =>
    ({
      customsAgentsList,
      customsList,
      customsAgentsConceptsList,
    } as dropDownListConfiguration),
);
// TODO: PricesList
export const selectSFPriceList = createSelector(
  selectedFamily,
  (state: IVTrademarkFamily) => state.prices,
);
export const selectedFamilyPrice = createSelector(
  selectSFPriceList,
  (state: IOfferListPrices): IVProductListPriceConfiguration =>
    find(state?.pricesList?.Results, (o: IVProductListPriceConfiguration) => o.isSelected),
);
export const selectPricesSearchTerm = createSelector(
  selectSFPriceList,
  (state: IOfferListPrices) => state.searchTerm,
);
export const selectPriceResults = createSelector(
  selectSFPriceList,
  (state: IOfferListPrices): Array<IVProductListPriceConfiguration> =>
    state.pricesList?.Results as Array<IVProductListPriceConfiguration>,
);
export const selectedPrice = createSelector(
  selectPriceResults,
  (state: Array<IVProductListPriceConfiguration>): IVProductListPriceConfiguration =>
    find(state, (o: IVProductListPriceConfiguration) => o.isSelected),
);
// TODO: Classifications
export const selectCharacteristicsGroupers = createSelector(
  selectedFamily,
  (state: IVTrademarkFamily) => state.classifications,
);
export const selectedFamilyClassification = createSelector(
  selectCharacteristicsGroupers,
  (state: IOfferClassifications): IVProviderProductClassification =>
    find(state?.classificationsList?.Results, (o: IVProviderProductClassification) => o.isSelected),
);
export const selectClassificationsSearchTerm = createSelector(
  selectCharacteristicsGroupers,
  (state: IOfferClassifications) => state.searchTerm,
);
export const selectClassificationsNeedsToReload = createSelector(
  selectCharacteristicsGroupers,
  (state: IOfferClassifications) => state?.needsToReload,
);
export const selectClassificationsResults = createSelector(
  selectCharacteristicsGroupers,
  (state: IOfferClassifications) => state.classificationsList?.Results,
);
export const selectSFActualClassification = createSelector(
  selectCharacteristicsGroupers,
  (state: IOfferClassifications): IVProviderProductClassification =>
    state && state.classificationsList
      ? filter(state.classificationsList?.Results, (o) => o.isSelected)[0]
      : {},
);
export const selectSFActualClassificationId = createSelector(
  selectSFActualClassification,
  (state: IVProviderProductClassification): string => state?.IdAgrupadorCaracteristica,
);
// TODO: Products
export const selectSFProducts = createSelector(
  selectedFamily,
  (state: IVTrademarkFamily): IOfferProducts => state.products,
);
export const selectProductsSearchTerm = createSelector(
  selectSFProducts,
  (state: IOfferProducts) => state.searchTerm,
);
export const selectProductsSearchFilter = createSelector(
  selectSFProducts,
  (state: IOfferProducts) => state.searchFilter,
);
export const selectProductsResults = createSelector(
  selectSFProducts,
  (state: IOfferProducts) => state.productsList?.Results,
);
export const selectedFamilyProduct = createSelector(
  selectSFProducts,
  (state: IOfferProducts): IVProviderProductConfiguration =>
    find(state?.productsList?.Results, (o: IVProviderProductConfiguration) => o.isSelected),
);
/*DOCS: Aside prices*/
export const selectAsidePrices = createSelector(
  selectedFamily,
  (state: IVTrademarkFamily) => state.asidePrices,
);
export const selectedAsidePrice = createSelector(
  selectAsidePrices,
  (state: IOfferAsidePrices) => state.selectedPrice,
);
export const selectIncomeLevelsSelectedAsidePrice = createSelector(
  selectedAsidePrice,
  (state: IVProductListPrice) =>
    state && state.incomeLevelsValues ? state.incomeLevelsValues : [],
);
export const selectAsidePriceIncomeLevelByName = (incomeLevelName: string) =>
  createSelector(selectIncomeLevelsSelectedAsidePrice, (state: IVProductProviderListPrice[]) =>
    flow(
      () => filter(state, (o: IVProductProviderListPrice) => o.NivelIngreso === incomeLevelName),
      (selected) => (!isEmpty(selected) ? selected[0] : {}),
    )(),
  );
export const selectedAsidePriceIncomeLevel = createSelector(
  selectIncomeLevelsSelectedAsidePrice,
  (state: IVProductProviderListPrice[]): IVProductProviderListPrice => {
    const selected: IVProductProviderListPrice[] = state
      ? filter(state, (o: IVProductProviderListPrice) => o.isSelected)
      : [];
    return !isEmpty(selected) ? selected[0] : {};
  },
);

export const selectedAsidePriceIncomeLevelUtility = createSelector(
  [selectActualConfiguration, selectedAsidePriceIncomeLevel],
  (state: IConfProvider, selectedIncomeLevel: IVProductProviderListPrice) => {
    const incomeLevel: IProviderCategoryUtilityPriceConfiguration[] =
      isEmpty(state) && selectedIncomeLevel ? [] : [];
    return !isEmpty(incomeLevel) ? incomeLevel[0].UtilidadNivelIngreso : 0;
  },
);
export const selectGetNextPanelPageIsAllowed = createSelector(
  selectAsidePrices,
  (state: IOfferAsidePrices) =>
    state.desiredPage !== null &&
    state.desiredPage !== undefined &&
    state.pricesList &&
    state.desiredPage < state.pricesList.TotalResults,
);
export const selectGetPreviousPanelPageIsAllowed = createSelector(
  selectAsidePrices,
  (state: IOfferAsidePrices) =>
    state.desiredPage !== null && state.desiredPage !== undefined && state.desiredPage > 1,
);
export const selectGeneralLevelAsidePricesQueryInfo = createSelector(
  selectedFamily,
  (family: IVTrademarkFamily): QueryInfo => {
    const queryInfo: QueryInfo = queryInfoWithActiveFilter();
    queryInfo.desiredPage = family?.asidePrices?.desiredPage;
    queryInfo.pageSize = 1;
    queryInfo.Filters.unshift({
      NombreFiltro: 'IdMarcaFamilia',
      ValorFiltro: family?.IdMarcaFamilia,
    });
    if (family?.asidePrices.searchTerm) {
      queryInfo.Filters.push({
        NombreFiltro: 'CoincidenciaPrecioLista',
        ValorFiltro: family?.asidePrices?.searchTerm,
      });
    }
    return queryInfo;
  },
);

/*DOCS: Utils*/
export const selectHasConfigurationFilter = createSelector(
  selectedFamily,
  (state: IVTrademarkFamily) =>
    state.selectedLevelConfigurationTab?.id === 2
      ? state.prices.hasConfigurationFilter
      : state.selectedLevelConfigurationTab.id === 3
      ? state.classifications.hasConfigurationFilter
      : state.selectedLevelConfigurationTab.id === 4
      ? state.products.hasConfigurationFilter
      : null,
);
// DOCS: Indica si algunos de los objetos de configuracion está vacio
const selectConfigObjectsAreEmpty = createSelector(
  [
    selectProviderPriceConfiguration,
    selectACDeliveryRoutes,
    selectProviderCategoryUtilityPriceConfig,
  ],
  (
    providerPriceConfig: ConfiguracionPrecioProveedor,
    deliveryRoutes: IOfferDeliveryRoutes[],
    providerCategoryUtilityPriceConfig: ConfProveedorUtilidadComision,
  ): boolean => {
    return !!(
      isEmpty(providerPriceConfig) ||
      isEmpty(deliveryRoutes) ||
      isEmpty(providerCategoryUtilityPriceConfig)
    );
  },
);
// DOCS: Indica si los valores del agente aduanal NO son validos
const selectCustomsAgentsInfoIsNotValid = createSelector(
  [selectedCustomsAgent, selectedCustoms, selectedCustomsAgentConcept, selectProviderIsMexican],
  (
    customsAgent: DropListOption,
    customs: DropListOption,
    customsAgentConcept: DropListOption,
    providerIsMexican: boolean,
  ): boolean => {
    return !!(
      !providerIsMexican &&
      (isEmpty(customsAgent) || isEmpty(customs) || isEmpty(customsAgentConcept))
    );
  },
);
// DOCS: Indica si la configuracion Internacional del provedor NO es valida
const selectConfigForInternationalProviderIsNotValid = createSelector(
  [selectProviderPriceConfiguration, selectProviderPriceConfigurationFamily],
  (providerPriceConfig: ConfiguracionPrecioProveedor, familyPriceConfig: any): boolean => {
    return !!(
      familyPriceConfig?.VUCEM === null ||
      familyPriceConfig?.VUCEM < 0 ||
      familyPriceConfig?.ServicioLogistica === null ||
      familyPriceConfig?.ServicioLogistica < 0 ||
      familyPriceConfig?.TM === null ||
      familyPriceConfig?.TM < 0 ||
      familyPriceConfig?.Validacion === null ||
      familyPriceConfig?.Validacion < 0 ||
      familyPriceConfig?.Previo === null ||
      familyPriceConfig?.Previo < 0 ||
      familyPriceConfig?.Desconsolidacion === null ||
      familyPriceConfig?.Desconsolidacion < 0 ||
      familyPriceConfig?.Maniobras === null ||
      familyPriceConfig?.Maniobras < 0 ||
      familyPriceConfig?.Transito === null ||
      familyPriceConfig?.Transito < 0 ||
      familyPriceConfig?.ClasificacionProceso === null ||
      familyPriceConfig?.ClasificacionProceso < 0 ||
      familyPriceConfig?.InBond === null ||
      familyPriceConfig?.InBond < 0 ||
      providerPriceConfig?.PrecioConsularizacion === null ||
      providerPriceConfig?.PrecioConsularizacion < 0 ||
      providerPriceConfig?.PrecioEnvioDeDocumentos === null ||
      providerPriceConfig?.PrecioEnvioDeDocumentos < 0 ||
      providerPriceConfig?.PrecioPermiso === null ||
      providerPriceConfig?.PrecioPermiso < 0 ||
      providerPriceConfig?.PrecioFletePC === null ||
      providerPriceConfig?.PrecioFletePC < 0 ||
      providerPriceConfig?.IGI === null ||
      providerPriceConfig?.IGI < 0 ||
      providerPriceConfig?.DTA === null ||
      providerPriceConfig?.DTA < 0 ||
      providerPriceConfig?.PRV === null ||
      providerPriceConfig?.PRV < 0
    );
  },
);
// DOCS: Indica si la configuracion del provedor sin importar su origen NO es valida
const selectConfigForAllProvidersIsNotValid = createSelector(
  [selectProviderPriceConfiguration, selectProviderPriceConfigurationFamily],
  (providerPriceConfig: any, familyPriceConfig: ConfiguracionPrecioProveedorFamilia): boolean => {
    return !!(
      familyPriceConfig?.AplicaPorPieza === null ||
      (familyPriceConfig?.AplicaPorPieza === false &&
        (familyPriceConfig?.MontoMinimoOC === null || familyPriceConfig?.MontoMinimoOC < 0)) ||
      (familyPriceConfig?.AplicaPorPieza === true &&
        (familyPriceConfig?.NumPiezas === null || familyPriceConfig?.NumPiezas < 0)) ||
      providerPriceConfig?.PorcentajeDescuento === null ||
      providerPriceConfig?.PorcentajeDescuento < 0 ||
      providerPriceConfig?.PrecioFleteAD === null ||
      providerPriceConfig?.PrecioFleteAD < 0
    );
  },
);

// DOCS: Indica si la configuracion del provedor NO es valida
const selectConfigForProviderIsNotValid = createSelector(
  [
    selectConfigForInternationalProviderIsNotValid,
    selectConfigForAllProvidersIsNotValid,
    selectProviderIsMexican,
  ],
  (
    configForInternationalProviderIsNotValid,
    configForAllProvidersIsNotValid,
    providerIsMexican,
  ): boolean => {
    return !!(
      configForAllProvidersIsNotValid ||
      (!providerIsMexican && configForInternationalProviderIsNotValid)
    );
  },
);

// DOCS: Indica si  todas la configuracion del nivel de ingreso son validas
const selectUtilitiesAreValid = createSelector(
  [selectProviderCategoryUtilityPriceConfig, selectProviderIsMexican],
  (state: IConfProveedorUtilidadComision, providerIsMexican): boolean => {
    let valid = true;
    forEach(state?.vMarcaFamiliaIndustria, (o: IVMarcaFamiliaIndustriaObj) => {
      forEach(
        filter(
          o?.ConfiguracionPrecioUtilidadCategoriaProveedor,
          (i: ConfiguracionPrecioUtilidadCategoriaProveedorObj) =>
            i?.catNivelIngreso?.NivelIngreso !== 'AAplus' &&
            i?.catNivelIngreso?.NivelIngreso !== 'Nuevo' &&
            i?.catNivelIngreso?.NivelIngreso !== 'Distribuidor',
        ),
        (utility: ConfiguracionPrecioUtilidadCategoriaProveedorObj) => {
          if (!utility?.UtilidadNivelIngreso || utility?.UtilidadNivelIngreso < 0) {
            valid = false;
          }
        },
      );
      if (!providerIsMexican) {
        if (
          o?.ConfiguracionComisionProveedor?.ComisionFrenteComercial === null ||
          o?.ConfiguracionComisionProveedor?.ComisionFrenteComercial < 0 ||
          o?.ConfiguracionComisionProveedor?.ComisionPharma === null ||
          o?.ConfiguracionComisionProveedor?.ComisionPharma < 0
        ) {
          valid = false;
        }
      } else if (
        o?.ConfiguracionComisionProveedor?.FactorDeCostoFijo === null ||
        o?.ConfiguracionComisionProveedor?.FactorDeCostoFijo <= 0
      ) {
        valid = false;
      }
    });
    return valid;
  },
);
// DOCS: Indica si todas las rutas de entrega son válidas
export const selectDeliveryProvidersRoutesTimeAreValid = createSelector(
  [selectProviderIsMexican, selectACDeliveryRoutes],
  (providerIsMexican: boolean, deliveryRoutes: IOfferDeliveryRoutes[]): boolean => {
    const validRoutes = filter(deliveryRoutes, (o: IOfferDeliveryRoutes) => {
      const route = o?.configuracionTiempoEntregaProveedorFamiliaRutaEntrega;
      return (
        validateFieldsRequiredNumber(route?.DiasPedidoACompra) &&
        validateFieldsRequiredNumber(route?.DiasCompraAEmbarque) &&
        validateFieldsRequiredNumber(route?.DiasEmbarqueAArribo) &&
        validateFieldsRequiredNumber(route?.DiasArriboAImportacion) &&
        validateFieldsRequiredNumber(route?.DiasAlmacenAInspeccion) &&
        validateFieldsRequiredNumber(route?.DiasInspeccionAEmbalaje) &&
        (providerIsMexican ||
          (validateFieldsRequiredNumber(route?.DiasConsolidacionPharma) &&
            validateFieldsRequiredNumber(route?.DiasImportacionAAlmacen)))
      );
    });
    return deliveryRoutes.length > 0 && validRoutes.length === deliveryRoutes.length;
  },
);

export const selectACHasChanges = createSelector(
  [selectActualConfiguration, selectBackupConfiguration],
  (actualConfig: IConfProvider, backupConfiguration: IConfProvider) => {
    /*DOCS: Cuales rutas son exactamente igual que su backup*/
    const deliveryRoutesEquals =
      !isEmpty(backupConfiguration?.deliveryRoutes) && !isEmpty(actualConfig?.deliveryRoutes)
        ? countBy(
            _map(
              actualConfig?.deliveryRoutes,
              (o: IOfferDeliveryRoutes, index: number) =>
                !!isEqual(
                  JSON.stringify(omit(o, ['isSelected'])),
                  JSON.stringify(omit(backupConfiguration?.deliveryRoutes[index], ['isSelected'])),
                ),
            ),
            (o) => o === true,
          )
        : {};

    const consolidatedFamiliesHasChanges = !isEqual(
      omit(actualConfig?.trademarkFamilyProviderConsolidation, ['isOriginal', 'isChecked']),
      omit(backupConfiguration?.trademarkFamilyProviderConsolidation, ['isOriginal', 'isChecked']),
    );

    const consolidatedFamiliesToDeleteHasChanges = !isEqual(
      JSON.stringify(
        omit(actualConfig?.trademarkFamilyProviderConsolidationToDelete, [
          'isOriginal',
          'isChecked',
        ]),
      ),
      JSON.stringify(
        omit(backupConfiguration?.trademarkFamilyProviderConsolidationToDelete, [
          'isOriginal',
          'isChecked',
        ]),
      ),
    );

    const hasChanges =
      !isEqual(
        JSON.stringify(
          omit(
            {
              ...actualConfig,
              configuracionProveedorRendimiento: {
                ...actualConfig?.configuracionProveedorRendimiento,
                vMarcaFamiliaIndustria: _map(
                  actualConfig?.configuracionProveedorRendimiento?.vMarcaFamiliaIndustria,
                  (i) => omit(i, 'needsToSave'),
                ),
              },
            },
            [
              /*DOCS: Omitimos los siguientes arreglos porque se evaluan por separado*/
              'deliveryRoutes',
              'trademarkFamilyProviderConsolidation',
              'trademarkFamilyProviderConsolidationToDelete',
              /*DOCS: Se omite porque solo es un catálogo*/
              'trademarkFamiliesList',
            ],
          ),
        ),
        JSON.stringify(
          omit(
            {
              ...backupConfiguration,
              configuracionProveedorRendimiento: {
                ...backupConfiguration?.configuracionProveedorRendimiento,
                vMarcaFamiliaIndustria: _map(
                  backupConfiguration?.configuracionProveedorRendimiento?.vMarcaFamiliaIndustria,
                  (i) => omit(i, 'needsToSave'),
                ),
              },
            },
            [
              /*DOCS: Omitimos los siguientes arreglos porque se evaluan por separado*/
              'deliveryRoutes',
              'trademarkFamilyProviderConsolidation',
              'trademarkFamilyProviderConsolidationToDelete',
              /*DOCS: Se omite porque solo es un catálogo*/
              'trademarkFamiliesList',
            ],
          ),
        ),
      ) || deliveryRoutesEquals?.true !== actualConfig?.deliveryRoutes?.length;

    return hasChanges || consolidatedFamiliesHasChanges || consolidatedFamiliesToDeleteHasChanges;
  },
);

export const saveValidatorStep8 = createSelector(
  [
    selectActualConfiguration,
    selectBackupConfiguration,
    selectConfigObjectsAreEmpty,
    selectCustomsAgentsInfoIsNotValid,
    selectConfigForProviderIsNotValid,
    selectDeliveryProvidersRoutesTimeAreValid,
    selectUtilitiesAreValid,
    selectACHasChanges,
  ],
  (
    actualConfig: IConfProvider,
    backupConfiguration: IConfProvider,
    configObjectsAreEmpty: boolean,
    customsAgentsInfoIsNotValid: boolean,
    providerConfigIsNotValid: boolean,
    deliveryProvidersRouteTimeConfigIsValid: boolean,
    utilitiesAreValid: boolean,
    actualConfigHasChanges: boolean,
  ) =>
    !!(
      !configObjectsAreEmpty &&
      !customsAgentsInfoIsNotValid &&
      deliveryProvidersRouteTimeConfigIsValid &&
      !providerConfigIsNotValid &&
      actualConfigHasChanges &&
      utilitiesAreValid &&
      (!actualConfig.MarcaFamiliaProveedor?.AplicaConsolidacion ||
        (actualConfig.MarcaFamiliaProveedor?.AplicaConsolidacion &&
          !isEmpty(actualConfig.trademarkFamilyProviderConsolidation)))
    ),
);

/*DOCS: QueryInfos*/

/*DOCS: QueryInfo para obtener Familias de las marcas asociadas al proveedor*/
export const selectTrademarkFamiliesQueryInfo = createSelector(
  getProviderId,
  (providerId: string): QueryInfo => {
    const queryInfo = queryInfoWithActiveFilter();
    queryInfo.Filters.push(
      {
        NombreFiltro: 'IdProveedorPrincipal',
        ValorFiltro: providerId,
      },
      {
        NombreFiltro: 'TieneProveedorPrincipal',
        ValorFiltro: true,
      },
    );
    return queryInfo;
  },
);
/*DOCS: QueryInfo para obtener la lista de Precios de lista*/
export const selectPriceLevelListOfPricesQueryInfo = createSelector(
  selectedFamily,
  (family: IVTrademarkFamily): QueryInfo => {
    const queryInfo: QueryInfo = queryInfoWithActiveFilter();
    queryInfo.desiredPage = family?.prices?.desiredPage;
    queryInfo.pageSize = PAGING_LIMIT;
    queryInfo.SortField = 'PrecioLista';
    queryInfo.SortDirection = 'asc';
    queryInfo.Filters.unshift({
      NombreFiltro: 'IdMarcaFamilia',
      ValorFiltro: family?.IdMarcaFamilia,
    });
    if (family?.prices.searchTerm) {
      queryInfo.Filters.push({
        NombreFiltro: 'CoincidenciaPrecioLista',
        ValorFiltro: family?.prices.searchTerm,
      });
    }
    if (family?.prices.hasConfigurationFilter) {
      queryInfo.Filters.push({
        NombreFiltro: 'NivelConfiguracionProductoProveedor',
        ValorFiltro: Levels.listPrice,
      });
    }
    return queryInfo;
  },
);
/*DOCS: QueryInfo para obtener la info del Precio de lista seleccionado*/
export const selectedPriceLevelQueryInfo = createSelector(
  selectedFamilyPrice,
  (price: IVProductListPriceConfiguration): QueryInfo => {
    const queryInfo: QueryInfo = queryInfoWithActiveFilter();
    queryInfo.Filters.unshift(
      {
        NombreFiltro: 'IdMarcaFamilia',
        ValorFiltro: price?.IdMarcaFamilia,
      },
      {
        NombreFiltro: 'PrecioLista',
        ValorFiltro: price?.PrecioLista.toString(),
      },
    );
    return queryInfo;
  },
); /*DOCS: QueryInfo para obtener la info del agrupador por caracteristica seleccionado*/
export const selectedCharacteristicGrouperLevelQueryInfo = createSelector(
  selectedFamilyClassification,
  (characterisitcGrouper: IVProviderProductClassification): QueryInfo => {
    const queryInfo: QueryInfo = queryInfoWithActiveFilter();
    queryInfo.Filters.unshift(
      {
        NombreFiltro: 'IdMarcaFamilia',
        ValorFiltro: characterisitcGrouper?.IdMarcaFamilia,
      },
      {
        NombreFiltro: 'IdAgrupadorCaracteristica',
        ValorFiltro: characterisitcGrouper?.IdAgrupadorCaracteristica,
      },
    );
    return queryInfo;
  },
);
/*DOCS: QueryInfo para obtener la lista de Clasificaciones*/
export const selectFeatureGroupListQueryInfo = createSelector(
  selectedFamily,
  (family: IVTrademarkFamily): QueryInfo => {
    const queryInfo = queryInfoWithActiveFilter();
    queryInfo.desiredPage = family?.classifications.desiredPage;
    queryInfo.pageSize = PAGING_LIMIT;
    queryInfo.SortField = 'Descripcion';
    queryInfo.SortDirection = 'desc';
    queryInfo.Filters.unshift({
      NombreFiltro: 'IdMarcaFamilia',
      ValorFiltro: family?.IdMarcaFamilia,
    });
    if (family?.classifications.searchTerm) {
      queryInfo.Filters.push({
        NombreFiltro: 'Descripcion',
        ValorFiltro: family?.classifications.searchTerm,
      });
    }
    if (family?.classifications.hasConfigurationFilter) {
      queryInfo.Filters.push({
        NombreFiltro: 'NivelConfiguracionProductoProveedor',
        ValorFiltro: Levels.CharacteristicGrouper,
      });
    }
    return queryInfo;
  },
);
/*DOCS: QueryInfo para obtener la lista de Productos*/
export const selectProductListQueryInfo = createSelector(
  selectedFamily,
  (family: IVTrademarkFamily): QueryInfo => {
    const queryInfo = queryInfoWithActiveFilter();
    queryInfo.desiredPage = family?.products.desiredPage;
    queryInfo.pageSize = PAGING_LIMIT;
    queryInfo.SortField = 'DescripcionProducto';
    queryInfo.SortDirection = 'asc';
    queryInfo.Filters.unshift({
      NombreFiltro: 'IdMarcaFamiliaProveedor',
      ValorFiltro: family?.IdMarcaFamiliaProveedor,
    });
    if (family?.products.searchTerm) {
      queryInfo.Filters.push({
        NombreFiltro: family?.products.searchFilter.subtitle,
        ValorFiltro: family?.products.searchTerm,
      });
    }
    if (family?.products.hasConfigurationFilter) {
      queryInfo.Filters.push({
        NombreFiltro: 'NivelConfiguracionProductoProveedor',
        ValorFiltro: Levels.Product,
      });
    }
    return queryInfo;
  },
);
/*DOCS: QueryInfo para obtener la info del Producto seleccionado*/
export const selectedProductLevelQueryInfo = createSelector(
  [selectedFamilyProduct, selectProviderFamilyTrademarkId],
  (product: IVProviderProductConfiguration, providerFamilyTrademarkId: string): QueryInfo => {
    const queryInfo: QueryInfo = queryInfoWithActiveFilter();
    queryInfo.Filters.unshift(
      {
        NombreFiltro: 'IdMarcaFamiliaProveedor',
        ValorFiltro: providerFamilyTrademarkId,
      },
      {
        NombreFiltro: 'IdProducto',
        ValorFiltro: product?.IdProducto,
      },
    );
    return queryInfo;
  },
);
/*DOCS: QueryInfo para obtener la lista de Precios de lista nivel Clasificación*/
export const selectClassifLevelAsidePricesQueryInfo = createSelector(
  selectedFamily,
  selectSFActualClassification,
  (family: IVTrademarkFamily, classif: IVProviderProductClassification): QueryInfo => {
    const queryInfo: QueryInfo = queryInfoWithActiveFilter();
    queryInfo.desiredPage = family?.asidePrices?.desiredPage;
    queryInfo.pageSize = 1;
    queryInfo.Filters.unshift(
      {
        NombreFiltro: 'IdMarcaFamilia',
        ValorFiltro: family?.IdMarcaFamilia,
      },
      {
        NombreFiltro: 'IdAgrupadorCaracteristica',
        ValorFiltro: classif?.IdAgrupadorCaracteristica,
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
/*DOCS: QueryInfo para obtener la configuración en Tab Familia*/
export const selectFamilyLevelConfigQueryInfo = createSelector(
  selectProviderFamilyTrademarkId,
  (
    providerFamilyTrademarkId: string,
  ): ConfiguracionProveedorExtensionConfiguracionProveedorParams => ({
    IdMarcaFamiliaProveedor: providerFamilyTrademarkId,
    NivelConfiguracion: Levels.Family,
  }),
);
/*DOCS: QueryInfo para obtener la configuración en Tab Precio de lista*/
export const selectListPriceLevelConfigQueryInfo = createSelector(
  selectedFamilyPrice,
  selectProviderFamilyTrademarkId,
  (
    price: IVProductListPriceConfiguration,
    providerFamilyTrademarkId: string,
  ): ConfiguracionProveedorExtensionConfiguracionProveedorParams => ({
    IdMarcaFamiliaProveedor: providerFamilyTrademarkId,
    NivelConfiguracion: price?.NivelConfiguracionProductoProveedor,
    PrecioLista: price?.PrecioLista,
  }),
);
/*DOCS: QueryInfo para obtener la configuración en Tab Agrupador por característica*/
export const selectFeatureGroupLevelConfigQueryInfo = createSelector(
  selectedFamilyClassification,
  selectProviderFamilyTrademarkId,
  (
    featureGroup: IVProviderProductClassification,
    providerFamilyTrademarkId: string,
  ): ConfiguracionProveedorExtensionConfiguracionProveedorParams => ({
    IdMarcaFamiliaProveedor: providerFamilyTrademarkId,
    NivelConfiguracion: featureGroup?.NivelConfiguracionProductoProveedor,
    IdAgrupadorCaracteristica: featureGroup?.IdAgrupadorCaracteristica,
  }),
);
// DOCS: QueryInfo para obtener la configuración de un producto
export const selectProductLevelConfigQueryInfo = createSelector(
  selectedFamilyProduct,
  selectProviderFamilyTrademarkId,
  (
    product: IVProviderProductConfiguration,
    providerFamilyTrademarkId: string,
  ): ConfiguracionProveedorExtensionConfiguracionProveedorParams => {
    const params: ConfiguracionProveedorExtensionConfiguracionProveedorParams = {
      IdMarcaFamiliaProveedor: providerFamilyTrademarkId,
      NivelConfiguracion: product?.NivelConfiguracionProductoProveedor,
      IdProducto: product?.IdProducto,
    };
    // DOCS El producto puede tener una config. a nivel familia, precio de lista o producto
    if (product?.NivelConfiguracionProductoProveedor === Levels.listPrice) {
      params.PrecioLista = product?.PrecioLista;
    } else if (product?.NivelConfiguracionProductoProveedor === Levels.CharacteristicGrouper) {
      params.IdAgrupadorCaracteristica = product.IdAgrupadorCaracteristica;
    }
    return params;
  },
);
export const selectPreSelectedLevelConfig = createSelector(
  selectOffer,
  (state) => state.preSelectedLevelConfiguration,
);
export const selectPreSelectedFamily = createSelector(
  selectOffer,
  (state) => state.preSelectedFamily,
);
export const selectOfferAlertPop = createSelector(selectOffer, (state) => state.alertPop);
export const selectOfferAlertPopUpdateBreakdown = createSelector(
  selectOffer,
  (state) => state.alertPopUpdateBreakdown,
);
export const selectOfferPopBreakdownIsOpen = createSelector(
  selectOffer,
  (state) => state.popBreakdownIsOpen,
);
export const selectNeedsOpenPopAfterSave = createSelector(
  selectOffer,
  (state) => state.openPopAfterSave,
);
