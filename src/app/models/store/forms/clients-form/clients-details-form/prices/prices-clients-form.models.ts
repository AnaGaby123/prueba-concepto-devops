import {
  CatRutaEntrega,
  ConfCliente,
  ConfiguracionPrecioClienteObj,
  ConfiguracionTiempoEntregaProveedorFamilia,
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj,
  ConfProveedor,
  Direccion,
  DireccionClienteDetalle,
  MarcaFamiliaProveedor,
  ValorConfiguracionTiempoEntrega,
  VClasificacionProductoCliente,
  VMarcaFamilia,
  VPrecioListaClienteProducto,
  VPrecioListaClienteProductoClasificacion,
  VPrecioListaClienteProductoFamilia,
  VPrecioProductoCliente,
  VProveedorResumen,
} from 'api-catalogos';
import {
  initialTabsConfigurations,
  IOfferAsidePrices,
  IOfferDeliveryRoutes,
  ITrademarkFamilyProviderConsolidation,
  IVProviderProductPrice,
  LevelConfigurationOption,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICard} from '@appModels/card/card';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {GeneralConfigurationCustom} from '@appModels/catalogos/offerSegmentation/offerSegmentation';
import {initialToggleSwitchOptionsClients} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';

export interface ClientPricesState {
  catDeliveryRoutes?: Array<CatRutaEntrega>;
  clientAddresses?: Array<DireccionClienteDetalle>;
  configurationTypeSelected?: DropListOption;
  configurationTypes?: DropListOption[];
  filterOptions?: DropListOption[];
  levelConfigurationTabs?: LevelConfigurationOption[];
  preSelectedFamily: ICard;
  preSelectedLevelConfiguration: LevelConfigurationOption;
  preSelectedProvider: IVProviderResume;
  providers: OfferProviders;
  selectedProvider: IVProviderResume;
  showPricesList: boolean;
  showProviderList: boolean;
  popBreakdownIsOpen: boolean;
  openPopAfterSave: boolean;
  alertPopUpdateBreakdown: boolean;
  toggleSwitchOptions: DropListOption[];
}

export interface OfferProviders {
  apiStatus: number;
  desiredPage: number;
  needToReload: boolean;
  providersList: IVProviderResumeQueryResult;
  searchTerm: string;
}

export interface IVProviderResumeQueryResult {
  Results: Array<IVProviderResume>;
  TotalResults: number;
}

export interface IVProviderResume extends VProveedorResumen {
  familiesList: Array<IVTrademarkFamily>;
  selectedFamily: IVTrademarkFamily;
  needsToReload?: boolean;
  isSelected?: boolean;
}

export interface IVTrademarkFamily extends VMarcaFamilia {
  generalConfiguration?: IConfClient;
  actualConfiguration?: IConfClient;
  backupConfiguration?: IConfClient;
  MarcaFamiliaProveedor?: MarcaFamiliaProveedor;
  prices?: IClientPriceListPrices;
  asidePrices?: IClientAsidePrices;
  generalAsidePrices?: IOfferAsidePrices;
  classificationAsidePrices?: IOfferAsidePrices;
  classifications?: IClientPriceClassifications;
  products?: IClientPriceProducts;
  selectedLevelConfigurationTab?: LevelConfigurationOption;
  levelSubConfigurationTabs?: OptionBar[];
  trademarkFamilyProviderConsolidation?: Array<VMarcaFamilia>;
  needsToReload?: boolean;
  isSelected?: boolean;
}

// DOCS Interfaces para el pop de ver desglose
export interface IClientAsidePrices {
  pricesList?: IClientAsidePricesList;
  desiredPage?: number;
  searchTerm?: string;
  isLoading?: boolean;
  needsToReload?: boolean;
  hasConfigurationFilter?: boolean;
  selectedPrice?: IVProductListPrice;
}

export interface IClientAsidePricesList {
  Results?: Array<IVProductListPrice>;
  TotalResults?: number;
}

export interface IVProductListPrice
  extends VPrecioListaClienteProductoFamilia,
    VPrecioListaClienteProducto,
    VPrecioListaClienteProductoClasificacion /*,
    VPrecioProductoCliente*/ {
  needsToReload?: boolean;
  isSelected?: boolean;
  isNegative?: boolean;
  percentage?: number;
}

// DOCS Interfaz de configuracion en precios del cliente
export interface IConfClient extends ConfProveedor, ConfCliente {
  ConfiguracionTiempoEntregaProveedorFamilia?: ConfiguracionTiempoEntregaProveedorFamilia;
  ValorConfiguracionTiempoEntrega?: IValorConfiguracionTiempoEntregaCustom;
  configuracionTiemposLogisticos?: ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj;
  configurationPriceProvider?: IConfigurationPriceProvider;
  deliveryRoutes?: IOfferDeliveryRoutes[];
  needsToReload?: boolean;
  selectedCustoms?: DropListOption;
  selectedCustomsAgent?: DropListOption;
  selectedCustomsAgentConcept?: DropListOption;
  toggleSwitchOptions?: DropListOption[];
  selectedToggleSwitchOption?: DropListOption;
  trademarkFamiliesList?: Array<IVTrademarkFamily>;
  trademarkFamilyProviderConsolidation?: Array<ITrademarkFamilyProviderConsolidation>;
  trademarkFamilyProviderConsolidationToDelete?: Array<ITrademarkFamilyProviderConsolidation>;
}

// DOCS Interfaces para el listado de precio en la seccion de configuracion a nivel precio de lista
export interface IClientPriceListPrices {
  pricesList?: IClientListPricesList;
  desiredPage?: number;
  searchTerm?: string;
  isLoading?: boolean;
  needsToReload?: boolean;
  hasConfigurationFilter?: boolean;
}

export interface IClientListPricesList {
  Results?: Array<IVProductListPriceConfigurationClient>;
  TotalResults?: number;
}

export interface IVProductListPriceConfigurationClient extends VPrecioListaClienteProducto {
  configuration?: GeneralConfigurationCustom;
  isNegative?: boolean;
  isSelected?: boolean;
  needsToReload?: boolean;
  percentage?: number;
}

// DOCS Interfaces para el listado de agrupador caracteristica en la seccion de configuracion a nivel agrupador caracteristica
export interface IClientPriceClassifications {
  classificationsList?: IClientClassificationsList;
  desiredPage?: number;
  searchTerm?: string;
  isLoading?: boolean;
  needsToReload?: boolean;
  hasConfigurationFilter?: boolean;
}

export interface IClientClassificationsList {
  Results?: Array<IVClientProductClassification>;
  TotalResults?: number;
}

export interface IVClientProductClassification extends VClasificacionProductoCliente {
  configuration?: IConfClient;
  needsToReload?: boolean;
  isSelected?: boolean;
  Index?: number;
}

// DOCS Interfaces para el listado de productos en la seccion de configuracion a nivel producto
export interface IClientPriceProducts {
  productsList?: IClientProductList;
  desiredPage?: number;
  searchTerm?: string;
  searchFilter?: DropListOption;
  isLoading?: boolean;
  hasConfigurationFilter?: boolean;
  needsToReload?: boolean;
}

export interface IClientProductList {
  Results?: Array<IVClientProductConfiguration>;
  TotalResults?: number;
}

export interface IVClientProductConfiguration extends VPrecioProductoCliente {
  incomeLevelsValues?: IVProviderProductPrice[];
  configuration?: IConfClient;
  NumPiezas?: number;
  needsToReload?: boolean;
  isSelected?: boolean;
  Index?: number;
  isNegative?: boolean;
  percentage?: number;
}

//
export interface IConfigurationPriceProvider {
  ComisionFrenteComercial?: number;
  ComisionPharma?: number;
  incomeLevel?: string;
}

export interface IValorConfiguracionTiempoEntregaCustom extends ValorConfiguracionTiempoEntrega {
  routeName?: string;
  IdCatRutaEntrega?: string;
}

export interface BuildClientConfForResponseParams {
  classificationId?: string;
  clientAddresses: Array<Direccion>;
  clientId: string;
  customsAgentsConceptsList?: Array<DropListOption>;
  customsAgentsList?: Array<DropListOption>;
  customsList?: Array<DropListOption>;
  deliveryAddressId: string;
  deliveryRoutesList?: Array<CatRutaEntrega>;
  familyTrademarkId: string;
  hasConfigurationAt: string;
  incomeLevel: string;
  isMexican: boolean;
  levelConfiguration: string;
  price?: number;
  productId?: string;
  responseConf: ConfiguracionPrecioClienteObj;
}

// DOCS Inicializadores del estado de precio del cliente
export const initialProviders = () => ({
  apiStatus: API_REQUEST_STATUS_DEFAULT,
  desiredPage: 0,
  needToReload: true,
  providersList: {
    Results: [],
    TotalResults: 0,
  },
  searchTerm: '',
});
export const initialPricesState = (): ClientPricesState => ({
  catDeliveryRoutes: [],
  clientAddresses: [],
  providers: initialProviders(),
  selectedProvider: null,
  levelConfigurationTabs: initialTabsConfigurations(false),
  filterOptions: [
    {value: '1', label: 'Catálogo', subtitle: 'Catalogo'},
    {value: '2', label: 'Producto', subtitle: 'DescripcionProducto'},
    {value: '3', label: 'Precio de lista', subtitle: 'CoincidenciaPrecioLista'},
  ],
  configurationTypes: [
    {
      value: '1',
      label: 'Definitiva',
    },
    {
      value: '2',
      label: 'Temporal',
    },
  ],
  configurationTypeSelected: {
    value: '1',
    label: 'Definitiva',
  },
  showProviderList: true,
  preSelectedProvider: null,
  preSelectedFamily: null,
  preSelectedLevelConfiguration: null,
  showPricesList: true,
  popBreakdownIsOpen: false,
  openPopAfterSave: false,
  alertPopUpdateBreakdown: false,
  toggleSwitchOptions: initialToggleSwitchOptionsClients(),
});
