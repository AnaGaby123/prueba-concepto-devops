import {
  CatNivelIngreso,
  CatRutaEntrega,
  CatUnidadTiempo,
  ConceptoAgenteAduanal,
  ConfCliente,
  ConfiguracionPrecioUtilidadCategoriaProveedor,
  ConfiguracionTiempoEntregaProveedorFamilia,
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega,
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj,
  ConfProveedor,
  ConfProveedorUtilidadComision,
  MarcaFamiliaProveedor,
  MarcaFamiliaProveedorConsolidacion,
  VClasificacionProductoProveedor,
  VConfiguracionPrecioListaProducto,
  VConfiguracionProductoProveedor,
  VMarcaFamilia,
  VMarcaFamiliaIndustriaObj,
  VPrecioListaProductoClasificacion,
  VPrecioListaProveedorProducto,
  VPrecioListaProveedorProductoFamilia,
  VPrecioProductoProveedor,
} from 'api-catalogos';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {GeneralConfigurationCustom} from '@appModels/catalogos/offerSegmentation/offerSegmentation';
import {ICard} from '@appModels/card/card';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {DEFAULT_UUID} from '@appUtil/common.protocols';

export interface OfferState {
  alertPop: boolean;
  alertPopUpdateBreakdown: boolean;
  catDeliveryRoutes?: Array<CatRutaEntrega>;
  catIncomeLevels?: IProviderCategoryUtilityPriceConfiguration[];
  customsAgentsConceptList: Array<ConceptoAgenteAduanal>;
  familiesList: Array<IVTrademarkFamily>;
  filterOptions?: DropListOption[];
  levelConfigurationTabs?: LevelConfigurationOption[];
  openPopAfterSave: boolean;
  popBreakdownIsOpen: boolean;
  preSelectedFamily: ICard;
  preSelectedLevelConfiguration: LevelConfigurationOption;
  selectedFamily: IVTrademarkFamily;
  toggleIntervalSwitchOptions: DropListOption[];
  toggleSwitchOptions: DropListOption[];
}

export interface LevelConfigurationOption {
  id: number;
  label: string;
  activeSubtitle?: boolean;
  level?: string;
  groupColumn?: string;
  configurationName?: string;
  subConfiguration?: ITabOption;
  disable?: boolean;
}

export const initialOffer = (): OfferState => ({
  alertPop: false,
  alertPopUpdateBreakdown: false,
  customsAgentsConceptList: [],
  familiesList: [],
  filterOptions: [
    {value: '1', label: 'Catálogo', subtitle: 'Catalogo'},
    {value: '2', label: 'Producto', subtitle: 'DescripcionProducto'},
    {value: '3', label: 'Precio de lista', subtitle: 'CoincidenciaPrecioLista'},
  ],
  levelConfigurationTabs: initialTabsConfigurations(false),
  openPopAfterSave: false,
  popBreakdownIsOpen: false,
  preSelectedFamily: null,
  preSelectedLevelConfiguration: null,
  selectedFamily: initialFamily(),
  toggleIntervalSwitchOptions: initialIntervalToggleSwitchOptions(),
  toggleSwitchOptions: initialToggleSwitchOptions(),
});
export const initialTabsConfigurations = (
  hasFamilyProducts: boolean = true,
): LevelConfigurationOption[] => {
  const tabs = [
    {
      id: 1,
      label: ProvidersTabOptions.General,
      level: Levels.Family,
    },
    {
      id: 2,
      label: ProvidersTabOptions.ListPrice,
      level: Levels.listPrice,
    },
    {
      id: 3,
      label: ProvidersTabOptions.FeatureGroup,
      level: Levels.CharacteristicGrouper,
    },
    {
      id: 4,
      label: ProvidersTabOptions.Product,
      level: Levels.Product,
    },
  ];
  if (hasFamilyProducts) {
    tabs.push({
      id: 5,
      label: ProvidersTabOptions.FamilyOfProducts,
      level: Levels.FamilyOfProducts,
    });
  }
  return tabs;
};
export const initialTabsSubConfigurationsOptions = (
  hasPerformance: boolean = true,
): OptionBar[] => {
  const subConfigOptions = [
    {
      id: '1',
      label: SubTabOptions.Cost,
      isSelected: true,
      isEnable: true,
    },
  ];
  if (hasPerformance) {
    subConfigOptions.push({
      id: '2',
      label: SubTabOptions.Performance,
      isSelected: false,
      isEnable: true,
    });
    subConfigOptions.push({
      id: '3',
      label: SubTabOptions.logisticsTimes,
      isSelected: false,
      isEnable: true,
    });
  } else {
    subConfigOptions.push({
      id: '2',
      label: SubTabOptions.logisticsTimes,
      isSelected: false,
      isEnable: true,
    });
  }
  return subConfigOptions;
};
export const initialToggleSwitchOptions = (): DropListOption[] => [
  {
    value: '1',
    label: OfferToggleOptions.Monto,
  },
  {
    value: '2',
    label: OfferToggleOptions.Unidad,
  },
];
export const initialIntervalToggleSwitchOptions = (): DropListOption[] => [
  {
    value: '1',
    label: IntervalToggleOptions.Fijo,
  },
  {
    value: '2',
    label: IntervalToggleOptions.Intervalo,
  },
];
export const initialFamily = (hasPerformance: boolean = true): IVTrademarkFamily => ({
  generalConfiguration: initialConfiguration(),
  actualConfiguration: initialConfiguration(),
  prices: {
    desiredPage: 0,
    searchTerm: '',
    isLoading: false,
    needsToReload: true,
    hasConfigurationFilter: false,
    pricesList: {TotalResults: 0, Results: []},
  },
  asidePrices: {},
  selectedCatIndustryBrandFamily: null,
  classificationAsidePrices: {},
  classifications: {
    desiredPage: 0,
    searchTerm: '',
    isLoading: false,
    needsToReload: true,
    classificationsList: {TotalResults: 0, Results: []},
  },
  products: {
    desiredPage: 0,
    searchTerm: '',
    isLoading: false,
    needsToReload: true,
    productsList: {TotalResults: 0, Results: []},
  },
  selectedLevelConfigurationTab: initialTabsConfigurations()[0],
  levelSubConfigurationTabs: initialTabsSubConfigurationsOptions(hasPerformance),
  needsToReload: true,
  isSelected: false,
});
export const initialConfiguration = (): IConfProvider => ({
  deliveryRoutes: [],
  trademarkFamiliesList: [],
  configuracionProveedorRendimiento: {},
  trademarkFamilyProviderConsolidation: [],
  trademarkFamilyProviderConsolidationToDelete: [],
  selectedCustomsAgent: null,
  selectedCustoms: null,
  selectedCustomsAgentConcept: null,
  selectedToggleSwitchOption: null,
  needsToReload: true,
  IdConfiguracionPrecioProveedorFamilia: DEFAULT_UUID,
});

export interface IVTrademarkFamily extends VMarcaFamilia {
  generalConfiguration?: IConfProvider;
  actualConfiguration?: IConfProvider;
  backupConfiguration?: IConfProvider;
  MarcaFamiliaProveedor?: MarcaFamiliaProveedor;
  prices?: IOfferListPrices;
  asidePrices?: IOfferAsidePrices;
  selectedCatIndustryBrandFamily?: IVMarcaFamiliaIndustriaObj;
  classificationAsidePrices?: IOfferAsidePrices;
  classifications?: IOfferClassifications;
  products?: IOfferProducts;
  selectedLevelConfigurationTab?: LevelConfigurationOption;
  levelSubConfigurationTabs?: OptionBar[];
  needsToReload?: boolean;
  isSelected?: boolean;
}

export interface IConfProvider extends ConfProveedor, ConfCliente {
  ConfiguracionTiempoEntregaProveedorFamilia?: ConfiguracionTiempoEntregaProveedorFamilia;
  configuracionProveedorRendimiento?: IConfProveedorUtilidadComision;
  configuracionTiemposLogisticos?: ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj;
  deliveryRoutes?: IOfferDeliveryRoutes[];
  needsToReload?: boolean;
  routeName?: string;
  selectedCustoms?: DropListOption;
  selectedCustomsAgent?: DropListOption;
  selectedCustomsAgentConcept?: DropListOption;
  selectedToggleSwitchOption?: DropListOption;
  trademarkFamiliesList?: Array<IVTrademarkFamily>;
  trademarkFamilyProviderConsolidation?: Array<ITrademarkFamilyProviderConsolidation>;
  trademarkFamilyProviderConsolidationToDelete?: Array<ITrademarkFamilyProviderConsolidation>;
  IdConfiguracionPrecioProveedorFamilia?: string;
}

export interface IConfProveedorUtilidadComision {
  vMarcaFamiliaIndustria?: Array<IVMarcaFamiliaIndustriaObj>;
}

export interface IVMarcaFamiliaIndustriaObj extends VMarcaFamiliaIndustriaObj {
  needsToSave?: boolean;
}

export interface ITrademarkFamilyProviderConsolidation extends MarcaFamiliaProveedorConsolidacion {
  isOriginal?: boolean;
  isChecked?: boolean;
}

export interface IProviderCategoryUtilityPriceConfiguration
  extends ConfiguracionPrecioUtilidadCategoriaProveedor,
    CatNivelIngreso {}

export interface IOfferDeliveryRoutes extends CatRutaEntrega {
  configuracionTiempoEntregaProveedorFamiliaRutaEntrega?: IDeliveryRouteFamilyProviderDeliveryTimeConfiguration;
  isConfigured?: boolean;
  isSelected?: boolean;
}

export interface IDeliveryRouteFamilyProviderDeliveryTimeConfiguration
  extends ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega,
    CatRutaEntrega {}

// Interfaces para los precios de lista del panel
export interface IOfferAsidePrices {
  pricesList?: IOfferAsidePricesList;
  desiredPage?: number;
  searchTerm?: string;
  isLoading?: boolean;
  needsToReload?: boolean;
  hasConfigurationFilter?: boolean;
  selectedPrice?: IVProductListPrice;
}

export interface IOfferAsidePricesList {
  Results?: Array<IVProductListPrice>;
  TotalResults?: number;
}

export interface IVProductListPrice
  extends VPrecioListaProveedorProductoFamilia,
    VPrecioListaProveedorProducto,
    VPrecioListaProductoClasificacion,
    VPrecioProductoProveedor {
  incomeLevelsValues?: IVProductProviderListPrice[];
  configuration?: GeneralConfigurationCustom;
  needsToReload?: boolean;
  isSelected?: boolean;
  isNegative?: boolean;
  percentage?: number;
  index?: number;
}

// DOCS Interfaces para el listado de precios del panel derecho
export interface IVProductProviderListPrice extends VPrecioListaProveedorProducto {
  configuration?: GeneralConfigurationCustom;
  needsToReload?: boolean;
  isSelected?: boolean;
  isNegative?: boolean;
  percentage?: number;
  index?: number;
}

// DOCS Interfaces para el listado de precio en la seccion de configuracion a nivel precio de lista
export interface IOfferListPrices {
  pricesList?: IOfferListPricesList;
  desiredPage?: number;
  searchTerm?: string;
  isLoading?: boolean;
  needsToReload?: boolean;
  hasConfigurationFilter?: boolean;
  selectedPrice?: IVProductListPriceConfiguration;
}

export interface IOfferListPricesList {
  Results?: Array<IVProductListPriceConfiguration>;
  TotalResults?: number;
}

export interface IVProductListPriceConfiguration extends VConfiguracionPrecioListaProducto {
  configuration?: IConfProvider;
  needsToReload?: boolean;
  isSelected?: boolean;
  Index?: number;
}

// DOCS Interfaces para el listado de agrupador caracteristica en la seccion de configuracion a nivel agrupador caracteristica
export interface IOfferClassifications {
  classificationsList?: IOfferClassificationsList;
  desiredPage?: number;
  searchTerm?: string;
  isLoading?: boolean;
  needsToReload?: boolean;
  hasConfigurationFilter?: boolean;
}

export interface IOfferClassificationsList {
  Results?: Array<IVProviderProductClassification>;
  TotalResults?: number;
}

export interface IVProviderProductClassification extends VClasificacionProductoProveedor {
  configuration?: IConfProvider;
  needsToReload?: boolean;
  isSelected?: boolean;
  Index?: number;
}

// DOCS Interfaces para el listado de productos en la seccion de configuracion a nivel producto
export interface IOfferProducts {
  productsList?: IOfferProductsList;
  desiredPage?: number;
  searchTerm?: string;
  searchFilter?: DropListOption;
  isLoading?: boolean;
  hasConfigurationFilter?: boolean;
  needsToReload?: boolean;
}

export interface IOfferProductsList {
  Results?: Array<IVProviderProductConfiguration>;
  TotalResults?: number;
}

export interface IVProviderProductConfiguration extends VConfiguracionProductoProveedor {
  incomeLevelsValues?: IVProviderProductPrice[];
  configuration?: IConfProvider;
  NumPiezas?: number;
  needsToReload?: boolean;
  isSelected?: boolean;
  Index?: number;
}

export interface IVProviderProductPrice extends VPrecioProductoProveedor {
  isNegative?: boolean;
  percentage?: number;
}

export interface BuildProviderConfForResponseParams {
  providerConf: ConfProveedor;
  performanceProvider?: ConfProveedorUtilidadComision;
  trademarkFamilyId?: string;
  trademarkFamiliesList?: Array<IVTrademarkFamily>;
  trademarkFamilyProvider: MarcaFamiliaProveedor;
  providerIsMexican: boolean;
  customsAgentsList?: Array<DropListOption>;
  customsList?: Array<DropListOption>;
  customsAgentsConceptsList?: Array<DropListOption>;
  incomeLevelsList?: Array<IProviderCategoryUtilityPriceConfiguration>;
  deliveryRoutesList?: Array<IOfferDeliveryRoutes>;
  levelConfiguration: string;
  hasConfigurationAt: string;
  price?: number;
  classificationId?: string;
  productId?: string;
}

export interface performancePrice {
  priceItem: IVProductListPriceConfiguration;
  confProvider: ConfProveedor;
}

export interface performanceClassification {
  classificationItem: IVProviderProductClassification;
  confProvider: ConfProveedor;
}

export interface performanceProduct {
  productItem: IVProviderProductConfiguration;
  confProvider: ConfProveedor;
}

export interface dropDownListConfiguration {
  timeUnitList: Array<CatUnidadTiempo>;
  customsAgentsList: Array<DropListOption>;
  customsList: Array<DropListOption>;
  customsAgentsConceptsList: Array<DropListOption>;
}

export enum Configs {
  General = 'general',
  Price = 'price',
  Classification = 'classification',
  Product = 'product',
}

export enum Levels {
  Family = 'Familia',
  listPrice = 'PrecioLista',
  CharacteristicGrouper = 'AgrupadorCaracteristica',
  Product = 'Producto',
  FamilyOfProducts = 'FamiliaDeProductos',
}

export enum ProvidersTabOptions {
  General = 'GENERAL',
  ListPrice = 'PRECIO DE LISTA',
  FeatureGroup = 'AGRUPADOR POR CARACTERÍSTICA',
  Product = 'PRODUCTO',
  FamilyOfProducts = 'FAMILIA DE PRODUCTOS',
}

export enum SubTabOptions {
  Price = 'PRECIO',
  DeliveryTime = 'TIEMPO DE ENTREGA',
  Cost = 'COSTO',
  Performance = 'RENDIMIENTO',
  logisticsTimes = 'TIEMPOS LOGÍSTICOS',
}

export enum OfferFields {
  DTA = 'DTA',
  IGI = 'IGI',
  MontoMinimoOC = 'MontoMinimoOC',
  NumPiezas = 'NumPiezas',
  AplicaConsolidacion = 'AplicaConsolidacion',
  PorcentajeDescuento = 'PorcentajeDescuento',
  PrecioFletePC = 'PrecioFletePC',
  PRV = 'PRV',
  selectedToggleSwitchOption = 'selectedToggleSwitchOption',
  selectedCustomsAgent = 'selectedCustomsAgent',
  selectedCustoms = 'selectedCustoms',
  selectedCustomsAgentConcept = 'selectedCustomsAgentConcept',
  selectedTimeUnit = 'selectedTimeUnit',
  selectedIntervalOption = 'selectedIntervalOption',
  VUCEM = 'VUCEM',
  ServicioLogistica = 'ServicioLogistica',
  TM = 'TM',
  Validacion = 'Validacion',
  Previo = 'Previo',
  Desconsolidacion = 'Desconsolidacion',
  Maniobras = 'Maniobras',
  Transito = 'Transito',
  ClasificacionProceso = 'ClasificacionProceso',
  InBond = 'InBond',
  PrecioConsularizacion = 'PrecioConsularizacion',
  PrecioEnvioDeDocumentos = 'PrecioEnvioDeDocumentos',
  PrecioPermiso = 'PrecioPermiso',
  PrecioFleteAD = 'PrecioFleteAD',
  FactorDeCostoFijo = 'FactorDeCostoFijo',
  Utilidad = 'Utilidad',
  ComisionFrenteComercial = 'ComisionFrenteComercial',
  ComisionPharma = 'ComisionPharma',
  AAPlus = 'AA+',
  AA = 'AA',
  MA = 'MA',
  AM = 'AM',
  MM = 'MM',
  AB = 'AB',
  MB = 'MB',
  BAJO = 'BAJO',
  WEB = 'WEB',
  DIST = 'DIST',
  PrecioLista = 'PrecioLista',
  EsIntervalo = 'EsIntervalo',
  ValorEsperado = 'ValorEsperado',
  ValorMinimoIntervalo = 'ValorMinimoIntervalo',
  ValorMaximoIntervalo = 'ValorMaximoIntervalo',
  Fijo = 'Fijo',
  Intervalo = 'Intervalo',
  DiasAlmacenAInspeccion = 'DiasAlmacenAInspeccion',
  DiasArriboAImportacion = 'DiasArriboAImportacion',
  DiasCompraAEmbarque = 'DiasCompraAEmbarque',
  DiasConsolidacionPharma = 'DiasConsolidacionPharma',
  DiasEmbarqueAArribo = 'DiasEmbarqueAArribo',
  DiasImportacionAAlmacen = 'DiasImportacionAAlmacen',
  DiasInspeccionAEmbalaje = 'DiasInspeccionAEmbalaje',
  DiasPedidoACompra = 'DiasPedidoACompra',
}

export enum DeliveryRoutes {
  RestoDelMundo = 'Resto del mundo',
  Foraneo = 'Foraneo',
  Local = 'Local',
  Centroamerica = 'Centroamérica',
  Guadalajara = 'Guadalajara',
  Sudamerica = 'Sudamérica',
}

export enum OfferToggleOptions {
  Monto = 'Monto',
  Unidad = 'Unidad',
}

export enum IntervalToggleOptions {
  Fijo = 'Fijo',
  Intervalo = 'Intervalo',
}

export enum FormulasTitles {
  Import = 'Importación =',
  TotalCostOfSale = 'Costo de venta total =',
  TotalFixedCost = 'Costo fijo total =',
  TotalUtility = 'Utilidad total =',
  TotalPrice = 'Precio total =',
  UnitCostOfSale = 'Costo de venta unitario =',
  UnitFixedCost = 'Costo fijo unitario =',
  UnitUtility = 'Utilidad unitaria =',
  UnitPrice = 'Precio unitario =',
}

export enum FormulasDescription {
  CustomValue = 'Número de Piezas * (PrecioLista * (1-Descuento)) + FletePC + (Número de Piezas * (Precio de Lista * (1-Descuento))) * Porcentaje Pharma) + Otros Conceptos',
  Import = '(Valor en aduana * IGI) + (Valor en aduana * DTA) + Honorarios AA + PRV + VUCEM + Desconsolidación + Servicio Logística + Maniobras + TM + Tránsito + Validación + Clasificación y Proceso + Previo + InBond',
  PiecesNumber = '(Monto Mínimo OC)/(PrecioLista*(1-Descuento))',
  TotalCostOfSale = 'Valor en aduana + Importación + Consularización + Envío de documentos + Permiso + Flete Almacén Destino',
  TotalFixedCost = 'Costo de venta * Factor de costo fijo',
  TotalPrice = 'Costo de venta total + Costo fijo total + Utilidad total + (Costo de venta total * Utilidad Frente Comercial)',
  TotalUtility = 'Costo de venta total * Factor de utilidad',
  UnitCostOfSale = 'Costo de venta total / Número de piezas',
  UnitFixedCost = 'Costo fijo total / Número de piezas',
  UnitPrice = 'Costo de venta unitario + Costo fijo unitario + Utilidad unitaria + Frente Comercial Unitario',
  UnitUtility = 'Utilidad total / Número de piezas',
}

export const FIXED_FACTORR = 'FactorCostoFijo';
export const UTILITY = 'Utilidad';
export const AA = 'AA';
export const MM = 'MM';
export const MB = 'MB';
