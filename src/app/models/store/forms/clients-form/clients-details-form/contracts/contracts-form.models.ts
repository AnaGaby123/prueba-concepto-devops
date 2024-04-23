import {
  API_REQUEST_STATUS_DEFAULT,
  DEFAULT_DATE,
  DEFAULT_UUID,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import * as models from 'api-catalogos';
import {
  Archivo,
  ConfCliente,
  ConfContratoCliente,
  ConfiguracionTiempoEntregaProveedorFamilia,
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj,
  ConfProveedor,
  ContratoCliente,
  DireccionClienteDetalle,
  QueryResultVPrecioListaClienteProductoFamiliaContrato,
  ResultObtenerContratosContemporaneosMismasMarcas,
  UrlSubirArchivo,
  VClasificacionProductoMarcaCliente,
  VContratoClienteMarca,
  VMarcaFamilia,
  VPrecioListaProductoMarcaCliente,
  VPrecioProductoCliente,
} from 'api-catalogos';
import {DropListOption, DropListOptionCustom} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {random} from 'lodash-es';
import {
  initialTabsConfigurations,
  initialTabsSubConfigurationsOptions,
  LevelConfigurationOption,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {ClienteEstrategiaCotizacionMarcasObj} from 'api-logistica';
import {IVTrademarkFamily} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import {ICard} from '@appModels/card/card';
import {initialToggleSwitchOptionsClients} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';

export interface IContractsForm {
  contractsList: ContractListData; // DOCS Lista de contratos del inicio
  searchTerm: string;
  clientAddresses?: Array<DireccionClienteDetalle>; // DOCS Lista de direcciones del cliente
  selectedContract: IContract; // DOCS Contrato seleccionado del listado de contratos
  addingContract: boolean; // DOCS se encuentra añadiendo un contrato
  addContractActualStep: number;
  addStep: boolean;
  editMode: boolean;
  enableEdit: boolean;
  contractEditMode: boolean; //DOCS Esta en el modo edicion en contratos
  generatedContractUploaded: number;
  newContract: IContract; // DOCS Nodo a modificar cuando se esta editando un contrato
  brandsStatus: number;
  brandQueryInfo: models.QueryInfo;
  listCompanys: DropListOptionCustom[];
  tabFilters: ITabOption[]; // DOCS Tabs de la lista de contratos (activos, guardados,expirados, cancelados)
  selectedTabFilter: ITabOption; // DOCS Tab seleccionada
  activeContractToEdit: boolean;
  validateContract: boolean;
  brandInvalidate: ResultObtenerContratosContemporaneosMismasMarcas[];
  saveContractStatus: number;
  contractDetails: boolean; // DOCS Se encuentra en los detalles del contrato
  backUp: IContracBackup; //DOCS Backup al dar en editar en la seccion de contratos
  contractBarActivities: BarActivityOption[]; //DOCS En que parte de configuracion del contrato se encuentra
  cancelPop: boolean;
  toggleSwitchOptions: DropListOption[];
}

export const initialIContractsForm = (): IContractsForm => ({
  contractsList: {
    contactsActive: [],
    contractsSaved: [],
    contractsExpired: [],
    contractsCanceled: [],
    needsToReloadActives: true,
    needsToReloadSaved: true,
    needsToReloadExpired: true,
    needsToReloadCanceled: true,
    apiStatusActive: API_REQUEST_STATUS_DEFAULT,
    apiStatusSaved: API_REQUEST_STATUS_DEFAULT,
    apiStatusExpired: API_REQUEST_STATUS_DEFAULT,
    apiStatusCanceled: API_REQUEST_STATUS_DEFAULT,
  },
  searchTerm: '',
  clientAddresses: [],
  selectedContract: initialContract(),
  addingContract: false,
  addContractActualStep: 0,
  addStep: false,
  editMode: false,
  enableEdit: false,
  contractEditMode: false,
  newContract: initialContract(),
  brandsStatus: API_REQUEST_STATUS_DEFAULT,
  brandQueryInfo: initialBrandQueryInfo(),
  listCompanys: [],
  tabFilters: initialTabFilters(),
  selectedTabFilter: initialSelectedTabFilter(),
  activeContractToEdit: false,
  validateContract: false,
  brandInvalidate: [],
  saveContractStatus: API_REQUEST_STATUS_DEFAULT,
  contractDetails: false,
  generatedContractUploaded: API_REQUEST_STATUS_DEFAULT,
  backUp: {
    newContract: null,
    selectedContract: null,
  },
  contractBarActivities: initialContractBarActivities(),
  cancelPop: false,
  toggleSwitchOptions: initialToggleSwitchOptionsClients(),
});

export interface IContracBackup {
  selectedContract: IContract;
  newContract: IContract;
}

export interface IContract extends ContratoCliente {
  brands: IBrands; //DOCS Listado de marcas posibles a vincular en vigencia y marca
  families: IVContractFamily[];
  selectedBrand: OfferContractBrands;
  preSelectedBrands: ClienteEstrategiaCotizacionMarcasObj[]; // DOCS Marcas vinculadas en el contrato
  contractBrands: Array<OfferContractBrands>; // DOCS Marcas vinculadas en el contrato
  searchTermBrand: string;
  contractBrandsLoad: boolean;
  FechaInicioTipoDate?: Date; // DOCS Fecha inicial del contrato
  FechaFinTipoDate?: Date; // DOCS Fecha final del contrato
  IdDatosFacturacionCliente?: string;
  NombreCatCondicionesDePago: string; // DOCS Texto a mostrar en el detalle del contrato del listado
  UrlContrato: string; // DOCS url del contrato en caso de que ya este generado
  tabsConfiguration?: LevelConfigurationOption[]; // DOCS Tabs nivel de configuracion
  tabsSubConfiguration: Array<OptionBar>; // DOCS Tabs subconfiguracion costos/ tiempos logisticos
  status?: number; // DOCS status que carga las marcas relacionadas al contrato en el listado y en la edicion del contrato
  signedContract?: SignedContract;
  disableBrands: Array<ITrademark>; // DOCS Marcas por desvincular del contrato
  needsToReload: boolean; // DOCS Indica si es necesario recargar la pagina
  isSelected: boolean;
  trademarkFamilyProviderConsolidation?: Array<VMarcaFamilia>;
  preSelectedFamily: ICard;
  preSelectedLevelConfiguration: LevelConfigurationOption;
  preSelectedBrand: OfferContractBrands;
  activePopCancel: boolean;
  showInputFile: boolean;
}

export interface IBrands {
  brandList?: BrandItem[];
  brandsStatus?: number;
  searchTerm?: string;
}

export interface BrandItem extends ClienteEstrategiaCotizacionMarcasObj {
  isInThisContract: boolean;
}

export const initialContract = (): IContract => ({
  brands: initialBrands(),
  families: [],
  selectedBrand: null,
  preSelectedBrands: [],
  contractBrands: [],
  searchTermBrand: '',
  contractBrandsLoad: false,
  FechaInicioTipoDate: null,
  FechaFinTipoDate: null,
  ClienteEnvia: false,
  Activo: true,
  Puesto: '',
  IdContratoCliente: DEFAULT_UUID,
  IdArchivoContratoFirmado: null,
  IdArchivoContrato: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  FechaInicio: null,
  FechaFin: null,
  NombreRepresentanteLegalFirma: '',
  Observacion: '',
  IdEmpresa: null,
  UrlContrato: null,
  Folio: random(1, 100).toString(),
  NombreCatCondicionesDePago: '',
  tabsConfiguration: initialTabsConfigurations(false),
  tabsSubConfiguration: initialTabsSubConfigurationsOptions(false),
  status: API_REQUEST_STATUS_DEFAULT,
  signedContract: {
    titulo: 'Cargar contrato Firmado',
    file: null,
    path: '',
    hash: '',
    Archivo: null,
    urlToUpload: null,
    tempUploads: null,
  },
  disableBrands: [],
  needsToReload: true,
  isSelected: false,
  preSelectedBrand: null,
  preSelectedFamily: null,
  preSelectedLevelConfiguration: null,
  activePopCancel: false,
  showInputFile: true,
});
export const initialBrands = (): IBrands => ({
  brandList: [],
  brandsStatus: API_REQUEST_STATUS_DEFAULT,
  searchTerm: '',
});
export const initialBrandQueryInfo = (): models.QueryInfo => ({
  Filters: [
    {
      NombreFiltro: 'TieneContratoMarcasCliente',
      ValorFiltro: true,
    },
    {
      NombreFiltro: 'Familia',
      ValorFiltro: true,
    },
  ],
  SortDirection: 'asc',
  SortField: 'Nombre',
  desiredPage: 0,
  pageSize: PAGING_LIMIT,
});
export const initialTabFilters = (): ITabOption[] => [
  {id: '0', label: 'ACTIVOS', filter: 'ACTIVO'},
  {id: '1', label: 'GUARDADOS', filter: 'GUARDADO'},
  {id: '2', label: 'EXPIRADOS', filter: 'EXPIRADO'},
  {id: '3', label: 'CANCELADOS', filter: 'CANCELADO'},
];
export const initialContractBarActivities = (): BarActivityOption[] => [
  {id: 1, label: 'VIGENCIA Y MARCA', activeSubtitle: false},
  {id: 2, label: 'FAMILIAS', activeSubtitle: false},
  {id: 3, label: 'CONTRATO', activeSubtitle: false},
];
export const initialSelectedTabFilter = (): ITabOption => ({
  id: '0',
  label: 'ACTIVOS',
  filter: 'ACTIVO',
  activeSubtitle: false,
});

export interface ITrademark extends VContratoClienteMarca {
  isSelected?: boolean;
}

export interface SignedContract {
  titulo: string;
  file: File;
  path: string;
  hash?: string;
  Archivo?: Archivo;
  urlToUpload?: UrlSubirArchivo;
  tempUploads?: any;
}

export interface ContractListData {
  contactsActive: Array<IContract>;
  contractsSaved: Array<IContract>;
  contractsExpired: Array<IContract>;
  contractsCanceled: Array<IContract>;
  needsToReloadActives: boolean;
  needsToReloadSaved: boolean;
  needsToReloadExpired: boolean;
  needsToReloadCanceled: boolean;
  apiStatusActive: number;
  apiStatusSaved: number;
  apiStatusExpired: number;
  apiStatusCanceled: number;
}

// DOCS ** INICIO DE INTERFACES PARA LA TAB DE FAMILIAS
// DOCS Interfaz define la estructura de las marcas vinculadas al contrato en la tab de familias
export interface OfferContractBrands extends VContratoClienteMarca {
  familiesList: Array<IVContractFamily>;
  selectedFamily: IVContractFamily;
  needsToReload?: boolean;
  isSelected?: boolean;
}

// DOCS Interfaz que define la estrucutra para cada una de las familias de la marca
export interface IVContractFamily extends VMarcaFamilia {
  IdMarca?: string;
  actualConfiguration?: IConfContratoCliente;
  backupConfiguration?: IConfContratoCliente;
  classificationAsidePrices?: IContractAsidePrices;
  characteristicGroupers?: IFamilyCharacteristicGroupers;
  generalAsidePrices?: IContractAsidePrices;
  generalConfiguration?: IConfContratoCliente;
  isSelected?: boolean;
  levelSubConfigurationTabs?: OptionBar[];
  needsToReload?: boolean;
  prices?: IFamilyPrices;
  products?: IFamilyProducts;
  selectedLevelConfigurationTab?: LevelConfigurationOption;
  title?: string;
}

// TODO Pendiente de como quedara la interfaz para el ver desglose de los precios en caso de que se implemente
export interface IContractAsidePrices {
  pricesList?: QueryResultVPrecioListaClienteProductoFamiliaContrato;
  desiredPage?: number;
  searchTerm?: string;
  isLoading?: boolean;
  needsToReload?: boolean;
}

// DOCS Interfaz de la configuracion de la familia para los 4 niveles de configuración
export interface IConfContratoCliente extends ConfContratoCliente, ConfProveedor, ConfCliente {
  ConfiguracionTiempoEntregaProveedorFamilia?: ConfiguracionTiempoEntregaProveedorFamilia;
  configuracionTiemposLogisticos?: ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj;
  configurationPriceProvider?: IConfigurationPriceProvider;
  needsToReload?: boolean;
  selectedCustoms?: DropListOption;
  selectedCustomsAgent?: DropListOption;
  selectedCustomsAgentConcept?: DropListOption;
  selectedToggleSwitchOption?: DropListOption;
  trademarkFamiliesList?: Array<IVTrademarkFamily>;
  routeName?: string;
}

// DOCS Interfaz para la configuración del proveedor de las comisiones
export interface IConfigurationPriceProvider {
  ComisionFrenteComercial?: number;
  ComisionPharma?: number;
}

// DOCS interfarces para el listado en la configuracion de precios de lista
export interface IFamilyPrices {
  desiredPage?: number;
  isLoading?: boolean;
  needsToReload?: boolean;
  pricesList?: IFamilyPricesList;
  searchTerm?: string;
}

export interface IFamilyPricesList {
  Results?: Array<IVPrecioListaClienteProductoContrato>;
  TotalResults?: number;
}

export interface IVPrecioListaClienteProductoContrato extends VPrecioListaProductoMarcaCliente {
  Index?: number;
  configuration?: IConfContratoCliente;
  isConfigured?: boolean; // DOCS Indica si esta configurado en precio de lista
  isNegative?: boolean;
  isSelected?: boolean;
  needsToReload?: boolean; // DOCS Indica si necesita volver a cargar su configuracion a ese nivel
  percentage?: number;
}

// DOCS interfarces para el listado en la configuracion de agrupador caracteristica
export interface IFamilyCharacteristicGroupers {
  characteristicGroupersList?: IFamilyCharacteristicGrouperList;
  desiredPage?: number;
  isLoading?: boolean;
  needsToReload?: boolean;
  searchTerm?: string;
}

export interface IFamilyCharacteristicGrouperList {
  Results?: Array<IVClasificacionProductoMarcaCliente>;
  TotalResults?: number;
}

export interface IVClasificacionProductoMarcaCliente extends VClasificacionProductoMarcaCliente {
  Index?: number;
  configuration?: IConfContratoCliente;
  isConfigured?: boolean; // DOCS Indica si esta configurado en precio de lista
  isSelected?: boolean;
  needsToReload?: boolean; // DOCS Indica si necesita volver a cargar su configuracion a ese nivel
}

// DOCS interfarces para el listado en la configuracion de productos
export interface IFamilyProducts {
  productsList?: IFamilyProductsList;
  desiredPage?: number;
  isLoading?: boolean;
  needsToReload?: boolean;
  searchTerm?: string;
}

export interface IFamilyProductsList {
  Results?: Array<IVPrecioProductoCliente>;
  TotalResults?: number;
}

export interface IVPrecioProductoCliente extends VPrecioProductoCliente {
  Index?: number;
  configuration?: IConfContratoCliente;
  isConfigured?: boolean; // DOCS Indica si esta configurado en precio de lista
  isNegative?: boolean;
  isSelected?: boolean;
  needsToReload?: boolean; // DOCS Indica si necesita volver a cargar su configuracion a ese nivel
  percentage?: number;
}

// DOCS Inicializador de la familia
export const initialFamilyContract = (): IVContractFamily => ({
  generalConfiguration: initialConfigurationContractFamily(),
  prices: {
    desiredPage: 0,
    isLoading: false,
    needsToReload: true,
    pricesList: {TotalResults: 0, Results: []},
    searchTerm: '',
  },
  classificationAsidePrices: {},
  characteristicGroupers: {
    characteristicGroupersList: {TotalResults: 0, Results: []},
    desiredPage: 0,
    isLoading: false,
    needsToReload: true,
    searchTerm: '',
  },
  products: {
    desiredPage: 0,
    isLoading: false,
    needsToReload: true,
    productsList: {TotalResults: 0, Results: []},
    searchTerm: '',
  },
  selectedLevelConfigurationTab: initialTabsConfigurations()[0],
  levelSubConfigurationTabs: initialTabsSubConfigurationsOptions(false),
  needsToReload: true,
  isSelected: false,
});
// DOCS Inicializador de la configuracion de la familia
export const initialConfigurationContractFamily = (): IConfContratoCliente => ({
  needsToReload: true,
  selectedCustoms: null,
  selectedCustomsAgent: null,
  selectedCustomsAgentConcept: null,
  selectedToggleSwitchOption: null,
  trademarkFamiliesList: [],
});
// DOCS ** FIN DE INTERFACES PARA LA TAB DE FAMILIAS
