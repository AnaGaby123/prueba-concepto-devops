import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {
  ArchivoDetalle,
  ClienteFamilia,
  ConceptoAgenteAduanal,
  ConfiguracionClienteFamiliaClasificacion,
  ConfiguracionClienteFamiliaCosto,
  ConfiguracionClienteFamiliaGeneral,
  ConfiguracionClienteFamiliaProducto,
  ConfiguracionPrecioCliente,
  ConfiguracionPrecioProveedor,
  ConfiguracionPrecioProveedorFamilia,
  ConfiguracionProveedorFamiliaGeneral,
  QueryResultVProveedorResumen,
  VClasificacionProductoCliente,
  VMarcaFamilia,
  VPrecioListaClienteProducto,
  VPrecioProductoCliente,
} from 'api-catalogos';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {LevelConfigurationOption} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {IValorConfiguracionTiempoEntregaCustom} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';

export class Provider {
  IdProveedor = '';
  Nombre = '';
  Productos = 0;
  Familias = 0;
  families: VProveedorFamiliaCustom[] = [];
  Mexicano = false;
  needsToReloadFamily = true;
}

export class Family {
  IdProveedorFamilia = '';
  IdProveedor = '';
  IdFamilia = '';
  IdCatTipoProducto = '';
  Tipo = '';
  IdCatSubtipoProducto = '';
  Subtipo = '';
  IdCatControl = '';
  Control = '';
  Productos = 0;
  generalConfiguration: Configuration = null;
  chargeConfiguration: Configuration[] = null;
  classificationConfiguration: Configuration[] = null;
  productConfiguration: Configuration[] = null;
  generalConfigurationNeedsToReload = true;
  chargeConfigurationNeedsToReload = true;
  classificationConfigurationNeedsToReload = true;
  productConfigurationNeedsToReload = true;
}

export class Configuration {
  idConfiguracionTiempoEntregaProveedorFamilia = null;
  idValorConfiguracionTiempoEntrega = null;

  // TODO: Ids utilizados en contratos
  idContratoClienteMarcaConfiguracion? = DEFAULT_UUID;
  idContratoClienteMarcaConfiguracionGeneral? = DEFAULT_UUID;
  idContratoClienteMarcaConfiguracionPrecioLista? = DEFAULT_UUID;
  idContratoClienteMarcaConfiguracionCatClasificacionProducto? = DEFAULT_UUID;
  idContratoClienteMarcaConfiguracionProducto? = DEFAULT_UUID;

  priceConfiguration: PriceConfiguration = new PriceConfiguration();
  deliveryTimeConfiguration: ValueDeliveryTime = new ValueDeliveryTime();
  relationOfConfiguration: RelationOfConfiguration = new RelationOfConfiguration();
  description: Description = new Description();
  chargeListGruped: ChargeListGrouped[] = [];
  configurationClientFamily: ConfigurationClientFamily = new ConfigurationClientFamily();
  searchTerm = '';
  isSelected = false;
}

export class PriceConfiguration {
  IdConfiguracionPrecioCliente = DEFAULT_UUID;
  IdContratoClienteMarcaConfiguracion? = DEFAULT_UUID;
  IdConceptoAgenteAduanal = null;
  IdHonorariosAgenteAduanal = null;
  nameHonorariosAgenteAduanal = '';
  nameConceptoAgenteAduanal = '';
  montoonceptoAgenteAduanal = 0;
  IdValorConfiguracionTiempoEntrega = null;
  FactorDeCostoFijo = 0;
  Utilidad = 0;
  FechaRegistro = new Date().toISOString();
  FechaUltimaActualizacion = new Date().toISOString();
  PorcentajeDescuento = 0;
  PrecioFletePC = 0;
  IGI = 0;
  DTA = 0;
  PrecioConsularizacion = 0;
  PrecioEnvioDeDocumentos = 0;
  PrecioPermiso = 0;
  PrecioFleteAD = 0;
  nivelIngreso = '';
  Activo = true;
}

export class ValueDeliveryTime {
  rutaName = 'ND';
  IdValorConfiguracionTiempoEntrega = DEFAULT_UUID;
  EsIntervalo = false;
  ValorEsperado = 0;
  ValorMinimoIntervalo = 0;
  ValorMaximoIntervalo = 0;
  IdCatUnidadTiempo = null;
  nameCatUnidadTiempo = '';
}

export class RelationOfConfiguration {
  IdConfiguracionClienteFamiliaGeneral? = DEFAULT_UUID;
  IdConfiguracionClienteFamiliaCosto? = DEFAULT_UUID;
  IdConfiguracionClienteFamiliaClasificacion? = DEFAULT_UUID;
  IdConfiguracionClienteFamiliaProducto? = DEFAULT_UUID;
  IdClienteFamilia = null;
  IdConfiguracionPrecioCliente = null;
  Vigencia = null;
  Costo? = null;
  IdProducto? = null;
  IdCatClasificacionProducto? = null;
  IdProveedorFamilia? = '';
  Activo = true;
}

export class Description {
  IdProducto = null;
  Descripcion = null;
  ClasificacionProducto = null;
  IdCatClasificacionProducto = null;
  Edit = null;
  Catalogo = null;
  PrecioLista = null;
  porcentaje = null;
  negativo = null;
  listPro = null;
  idProveedorFamilia = null;
  PrecioProquifaNet = null;
  cantidadProd = 0;
  isConfigurationsThisLevel = false;
  isSelected = false;
}

export class ChargeListGrouped {
  IdCatClasificacionProducto = null;
  ClasificacionProducto = null;
  IdProveedor = null;
  NombreProveedor = null;
  IdProducto = null;
  IdFamilia = null;
  IdProveedorFamilia = null;
  DescripcionProducto = null;
  NumPiezas = null;
  PrecioLista = null;
  ValorEnAduana = null;
  Importacion = null;
  CVT = null;
  CVU = null;
  CFT = null;
  UtilidadTotal = null;
  CostoFijoUnitario = null;
  UtilidadUnitaria = null;
  PrecioUnitario = null;
  PrecioProquifaNet = null;
  porcentaje = null;
  negativo = null;
  PrecioTotal = null;
  NivelConfiguracionProductoProveedor = null;
  MontoMinimoOC;
  PrecioPermiso = null;
  PrecioFleteAD = null;
  priceConfiguration: PriceConfiguration = new PriceConfiguration();
}

export class RequestObjects {
  level = '';
  indexConfigurationSelected = 0;
  configurationName = '';
  deliveryTimeConfiguration: ValueDeliveryTime = new ValueDeliveryTime();
  priceConfiguration: PriceConfiguration = new PriceConfiguration();
  configurationClientFamily: ConfigurationClientFamily = new ConfigurationClientFamily();
  relationOfConfiguration: RelationOfConfiguration = new RelationOfConfiguration();
}

export class ConfigurationClientFamily {
  IdClienteFamilia = DEFAULT_UUID;
  IdCliente = DEFAULT_UUID;
  Activo = true;
  IdProveedorFamilia = DEFAULT_UUID;
}

export class LevelConfigurationData {
  id = 1;
  label = 'GENERALES';
  activeSubtitle? = false;
  level? = 'General';
  groupColumn? = 'IdFamilia';
  configurationName? = 'generalConfiguration';
}

/***** nuevas interfaces para la restructuracion de segmentacion de la oferta ******/

export interface Providers {
  providersList: QueryResultVProveedorResumen;
  needToReload: boolean;
  desiredPage: number;
}

export interface VProveedorFamiliaCustom extends VMarcaFamilia {
  generalConfiguration?: GeneralConfigurationCustom;
  actualConfiguration?: GeneralConfigurationCustom;
  backupConfiguration?: GeneralConfigurationCustom;
  prices?: Prices;
  pricesAsideGeneral?: Prices;
  pricesAsideClassification?: Prices;
  classifications?: Classifications;
  products?: Products;
  selectedConfiguration?: LevelConfigurationOption;
  selectedSubConfiguration?: ITabOption;
  csvFile?: ArchivoDetalle;
  needsToReload?: boolean;
  isSelected?: boolean;
  IdMarca?: string;
}

export interface GeneralConfigurationCustom {
  clienteFamilia?: ClienteFamilia;
  configuracionPrecioCliente?: ConfiguracionPrecioCliente;
  configuracionPrecioProveedor?: ConfiguracionPrecioProveedor;
  configuracionPrecioProveedorFamilia?: ConfiguracionPrecioProveedorFamilia;
  conceptoAgenteAduanal?: ConceptoAgenteAduanal;
  valorConfiguracionTiempoEntrega?: IValorConfiguracionTiempoEntregaCustom;
  configuracionClienteFamiliaGeneral?: ConfiguracionClienteFamiliaGeneral;
  configuracionClienteFamiliaCosto?: ConfiguracionClienteFamiliaCosto;
  configuracionClienteFamiliaClasificacion?: ConfiguracionClienteFamiliaClasificacion;
  configuracionClienteFamiliaProducto?: ConfiguracionClienteFamiliaProducto;
  configuracionProveedorFamiliaGeneral?: ConfiguracionProveedorFamiliaGeneral;
  selectedAgent?: DropListOption;
  selectedConcept?: DropListOption;
  selectedUnidadTiempo?: DropListOption;
  needsToReload?: boolean;
}

export interface Prices {
  pricesList?: PricesListCustom;
  desiredPage?: number;
  searchTerm?: string;
  isLoading?: boolean;
  needsToReload?: boolean;
  hasConfigurationFilter?: boolean;
  selectedPrice?: VPrecioListaClienteProducto;
}

export interface Classifications {
  classificationsList?: ClassificationListCustom;
  desiredPage?: number;
  searchTerm?: string;
  isLoading?: boolean;
  hasConfigurationFilter?: boolean;
  needsToReload?: boolean;
}

export interface Products {
  productsList?: ProductsListCustom;
  desiredPage?: number;
  searchTerm?: string;
  isLoading?: boolean;
  hasConfigurationFilter?: boolean;
  needsToReload?: boolean;
}

export interface PricesListCustom {
  Results?: Array<VPrecioListaClienteProductoCustom>;
  TotalResults?: number;
}

export interface ClassificationListCustom {
  Results?: Array<VClasificacionCustom>;
  TotalResults?: number;
}

export interface ProductsListCustom {
  Results?: Array<VPrecioProductoClienteCustom>;
  TotalResults?: number;
}

export interface VPrecioListaClienteProductoCustom extends VPrecioListaClienteProducto {
  configuration?: GeneralConfigurationCustom;
  needsToReload?: boolean;
  isSelected?: boolean;
  isNegative?: boolean;
  percentage?: number;
}

export interface VClasificacionCustom extends VClasificacionProductoCliente {
  configuration?: GeneralConfigurationCustom;
  needsToReload?: boolean;
  isSelected?: boolean;
  Index?: number;
}

export interface VPrecioProductoClienteCustom extends VPrecioProductoCliente {
  configuration?: GeneralConfigurationCustom;
  needsToReload?: boolean;
  isSelected?: boolean;
  isNegative?: boolean;
  percentage?: number;
  Index?: number;
}
