import {
  CatRutaEntrega,
  ConceptoAgenteAduanal,
  ConfiguracionPrecioProveedor,
  ConfiguracionPrecioProveedorFamilia,
  ConfiguracionPrecioUtilidadCategoriaProveedorObj,
  ConfiguracionProveedoresCalculosService,
  ConfiguracionProveedorFamiliaClasificacion,
  ConfiguracionProveedorFamiliaCosto,
  ConfiguracionProveedorFamiliaGeneral,
  ConfiguracionProveedorFamiliaProducto,
  ConfiguracionTiempoEntregaProveedorFamilia,
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj,
  ConfProveedor,
  MarcaFamiliaProveedor,
  MarcaFamiliaProveedorConsolidacion,
  QueryResultVConfiguracionPrecioListaProducto,
  QueryResultVConfiguracionProductoProveedor,
  QueryResultVPrecioListaProducto,
  QueryResultVPrecioListaProductoClasificacion,
  QueryResultVPrecioListaProveedorProducto,
  QueryResultVPrecioListaProveedorProductoClasificacion,
  QueryResultVPrecioListaProveedorProductoFamilia,
  QueryResultVPrecioProductoProveedor,
  VClasificacionProductoProveedor,
  VConfiguracionPrecioListaProducto,
  VConfiguracionProductoProveedor,
  VMarcaFamilia,
  VMarcaFamiliaIndustriaObj,
  VPrecioListaProveedorProducto,
  VPrecioListaProveedorProductoClasificacion,
  VPrecioListaProveedorProductoFamilia,
  VPrecioProductoProveedor,
} from 'api-catalogos';
import {QueryInfo} from 'api-logistica';
import {
  BuildProviderConfForResponseParams,
  Configs,
  IConfProveedorUtilidadComision,
  IConfProvider,
  initialToggleSwitchOptions,
  IOfferAsidePricesList,
  IOfferDeliveryRoutes,
  IOfferListPricesList,
  IOfferProductsList,
  ITrademarkFamilyProviderConsolidation,
  IVMarcaFamiliaIndustriaObj,
  IVProductListPrice,
  IVProductListPriceConfiguration,
  IVProviderProductClassification,
  IVProviderProductConfiguration,
  IVTrademarkFamily,
  Levels,
  OfferFields,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {queryInfoWithActiveFilter} from '@appModels/filters/Filters';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {DEFAULT_DATE, DEFAULT_UUID, PAGING_LIMIT} from '@appUtil/common.protocols';
import {filter, find, isEmpty, map, omit, toLower} from 'lodash-es';
import {addRowIndex, extractID} from '@appUtil/util';
import {getObjectPercentagePriceList} from '@appUtil/math';
import ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidadParams = ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidadParams;

// DOCS: Inicializa las MarcaFamilia con datos genéricos cuando se reciben de servicio
export const initializeTrademarkFamilies = (
  trademarkFamilies: Array<VMarcaFamilia>,
): Array<IVTrademarkFamily> =>
  map(
    trademarkFamilies,
    (o: VMarcaFamilia): IVTrademarkFamily => ({
      ...o,
      generalConfiguration: {
        needsToReload: true,
      },
      actualConfiguration: {
        needsToReload: true,
      },
      backupConfiguration: {
        needsToReload: true,
      },
      prices: {
        desiredPage: 0,
        searchTerm: '',
        isLoading: false,
        needsToReload: true,
        hasConfigurationFilter: false,
        pricesList: {TotalResults: 0, Results: []},
      },
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
        searchFilter: {
          value: '1',
          label: 'Producto',
          subtitle: 'DescripcionProducto',
        },
        isLoading: false,
        needsToReload: true,
        hasConfigurationFilter: false,
        productsList: {TotalResults: 0, Results: []},
      },
      needsToReload: true,
      isSelected: false,
    }),
  );

// DOCS: Construye el objeto de una configuración de una MarcaFamilia a como se va a trabajar localmente
export const buildProviderConfFromResponse = ({
  providerConf,
  trademarkFamilyId,
  trademarkFamiliesList,
  trademarkFamilyProvider,
  providerIsMexican,
  customsAgentsList,
  customsList,
  customsAgentsConceptsList,
  incomeLevelsList,
  deliveryRoutesList,
  levelConfiguration,
  hasConfigurationAt,
  price,
  classificationId,
  productId,
  performanceProvider,
}: BuildProviderConfForResponseParams): IConfProvider => {
  // DOCS: Se arma el  objeto de configuración
  const config: IConfProvider = {
    MarcaFamiliaProveedor: buildTrademarkFamilyProvider(providerConf, trademarkFamilyProvider),
    trademarkFamiliesList: buildTrademarkFamiliesList(
      trademarkFamiliesList,
      providerConf?.MarcaFamiliaProveedorConsolidacion,
      trademarkFamilyId,
    ),
    trademarkFamilyProviderConsolidation: map(
      providerConf?.MarcaFamiliaProveedorConsolidacion,
      (o: MarcaFamiliaProveedorConsolidacion) => ({
        ...o,
        isOriginal: true,
        isChecked: true,
      }),
    ),
    trademarkFamilyProviderConsolidationToDelete: [],
    ConceptoAgenteAduanal: buildCustomsAgentConcept(providerConf),
    ConfiguracionPrecioProveedor: buildProviderPriceConfiguration(
      providerConf,
      levelConfiguration,
      hasConfigurationAt,
      providerIsMexican,
    ),
    ConfiguracionPrecioProveedorFamilia: buildFamilyProviderPriceConfiguration(
      providerConf,
      levelConfiguration,
      hasConfigurationAt,
      providerIsMexican,
    ),
    configuracionProveedorRendimiento: buildProviderCategoryUtilityPriceConfig(
      providerConf,
      levelConfiguration,
      hasConfigurationAt,
      performanceProvider,
    ),
    ConfiguracionTiempoEntregaProveedorFamilia: buildFamilyProviderDeliveryTimeConfiguration(
      providerConf,
      levelConfiguration,
      hasConfigurationAt,
    ),
    ConfiguracionProveedorFamiliaGeneral: buildGeneralFamilyProviderConfiguration(
      providerConf,
      trademarkFamilyProvider?.IdMarcaFamiliaProveedor,
      levelConfiguration,
      hasConfigurationAt,
    ),
    ConfiguracionProveedorFamiliaCosto: buildCostFamilyProviderConfiguration(
      providerConf,
      trademarkFamilyProvider?.IdMarcaFamiliaProveedor,
      levelConfiguration,
      hasConfigurationAt,
      price,
    ),
    ConfiguracionProveedorFamiliaClasificacion: buildClassificationFamilyProviderConfiguration(
      providerConf,
      trademarkFamilyProvider?.IdMarcaFamiliaProveedor,
      levelConfiguration,
      hasConfigurationAt,
      classificationId,
    ),
    ConfiguracionProveedorFamiliaProducto: buildProductFamilyProviderConfiguration(
      providerConf,
      trademarkFamilyProvider?.IdMarcaFamiliaProveedor,
      levelConfiguration,
      hasConfigurationAt,
      productId,
    ),
    deliveryRoutes: buildDeliveryRoutes(
      providerConf,
      levelConfiguration,
      hasConfigurationAt,
      deliveryRoutesList,
      providerIsMexican,
    ),
    selectedCustomsAgent: buildSelectedCustomsAgent(
      providerConf?.ConceptoAgenteAduanal,
      customsAgentsList,
      providerIsMexican,
    ),
    selectedCustoms: buildSelectedCustoms(
      providerConf?.ConceptoAgenteAduanal,
      customsList,
      providerIsMexican,
    ),
    selectedCustomsAgentConcept: buildSelectedCustomsAgentConcept(
      providerConf?.ConceptoAgenteAduanal,
      customsAgentsConceptsList,
      providerIsMexican,
    ),
    selectedToggleSwitchOption: buildSelectedToggleSwitchOption(
      providerConf?.ConfiguracionPrecioProveedorFamilia,
      initialToggleSwitchOptions(),
    ),
    needsToReload: false,
    IdConfiguracionPrecioProveedorFamilia: buildIdConfiguracionPrecioProveedorFamilia(
      providerConf,
      levelConfiguration,
    ),
  };
  // DOCS: Si existe la configuración, se devuelve junto con el objeto ya armado
  return providerConf ? {...providerConf, ...config} : config;
};
// DOCS: Obtiene el IdConfiguracionPrecioProveedorFamilia de la configuracion actual y si no tiene lo hereda de otra
const buildIdConfiguracionPrecioProveedorFamilia = (
  providerConf: ConfProveedor,
  levelConfiguration: string,
) => {
  const existsConfigAtPrice =
    providerConf?.ConfiguracionProveedorFamiliaCosto &&
    providerConf?.ConfiguracionProveedorFamiliaCosto?.IdConfiguracionPrecioProveedorFamilia !==
      DEFAULT_UUID;
  const existsConfigAtClassifications =
    providerConf?.ConfiguracionProveedorFamiliaClasificacion &&
    providerConf?.ConfiguracionProveedorFamiliaClasificacion
      ?.IdConfiguracionPrecioProveedorFamilia !== DEFAULT_UUID;
  const existsConfigAtProduct =
    providerConf?.ConfiguracionProveedorFamiliaProducto &&
    providerConf?.ConfiguracionProveedorFamiliaProducto?.IdConfiguracionPrecioProveedorFamilia !==
      DEFAULT_UUID;
  switch (levelConfiguration) {
    case Configs.General:
      return (
        providerConf?.ConfiguracionProveedorFamiliaGeneral?.IdConfiguracionPrecioProveedorFamilia ??
        DEFAULT_UUID
      );
    case Configs.Price:
      return existsConfigAtPrice
        ? providerConf?.ConfiguracionProveedorFamiliaCosto?.IdConfiguracionPrecioProveedorFamilia
        : providerConf?.ConfiguracionProveedorFamiliaGeneral?.IdConfiguracionPrecioProveedorFamilia;
    case Configs.Classification:
      return existsConfigAtClassifications
        ? providerConf?.ConfiguracionProveedorFamiliaClasificacion
            ?.IdConfiguracionPrecioProveedorFamilia
        : providerConf?.ConfiguracionProveedorFamiliaGeneral?.IdConfiguracionPrecioProveedorFamilia;
    case Configs.Product:
      return existsConfigAtProduct
        ? providerConf?.ConfiguracionProveedorFamiliaClasificacion
            ?.IdConfiguracionPrecioProveedorFamilia
        : existsConfigAtClassifications
        ? providerConf?.ConfiguracionProveedorFamiliaClasificacion
            ?.IdConfiguracionPrecioProveedorFamilia
        : existsConfigAtPrice
        ? providerConf?.ConfiguracionProveedorFamiliaCosto?.IdConfiguracionPrecioProveedorFamilia
        : providerConf?.ConfiguracionProveedorFamiliaGeneral?.IdConfiguracionPrecioProveedorFamilia;
    default:
      return DEFAULT_UUID;
  }
};
/*DOCS: Construye el objeto MarcaFamiliaProveedor*/
const buildTrademarkFamilyProvider = (
  providerConf: ConfProveedor,
  trademarkFamilyProvider: MarcaFamiliaProveedor,
) =>
  providerConf?.MarcaFamiliaProveedor
    ? {...providerConf?.MarcaFamiliaProveedor, Validada: true}
    : {...trademarkFamilyProvider, Validada: true};

/*DOCS: Construye el objeto MarcaFamiliaProveedor*/
const buildTrademarkFamiliesList = (
  trademarkFamiliesList: Array<IVTrademarkFamily>,
  trademarkFamilyProviderConsolidation: Array<MarcaFamiliaProveedorConsolidacion>,
  trademarkFamilyId: string,
) => {
  /*DOCS: Quitamos la familia que esta seleccionada ya que no tiene sentido consolidarla consigo mismo*/
  const filteredFamilies = filter(
    trademarkFamiliesList,
    (i: IVTrademarkFamily) => i.IdMarcaFamilia !== trademarkFamilyId,
  );
  return map(filteredFamilies, (o: IVTrademarkFamily) => ({
    ...o,
    isSelected: !!find(
      trademarkFamilyProviderConsolidation,
      (i: MarcaFamiliaProveedorConsolidacion) => o.IdMarcaFamilia === i.IdMarcaFamilia,
    ),
  }));
};

// DOCS: Construye el objeto ConceptoAgenteAduanal (Tarifa)
const buildCustomsAgentConcept = (providerConf: ConfProveedor): ConceptoAgenteAduanal =>
  providerConf?.ConceptoAgenteAduanal ? {...providerConf?.ConceptoAgenteAduanal} : null;

// DOCS: Construye el objeto ConfiguracionPrecioProveedor
const buildProviderPriceConfiguration = (
  providerConf: ConfProveedor,
  levelConfiguration: string,
  hasConfigurationAt: string,
  providerIsMexican: boolean,
): ConfiguracionPrecioProveedor =>
  // DOCS: Validar si tiene configuración, sino se crea un objeto nuevo
  providerConf?.ConfiguracionPrecioProveedor
    ? providerIsMexican
      ? {
          /*DOCS: Si tenía una configuración equivocada como Proveedor No Mexicano
             pero ahora se quiere configurar como Mexicano, se coloca null en los campos correspondientes*/
          ...providerConf?.ConfiguracionPrecioProveedor,
          IdConfiguracionPrecioProveedor: receivedConfigIsEqualToWishedConfig(
            levelConfiguration,
            hasConfigurationAt,
          )
            ? providerConf?.ConfiguracionPrecioProveedor.IdConfiguracionPrecioProveedor
            : DEFAULT_UUID,
          IdConceptoAgenteAduanal: null,
          IGI: 0,
          DTA: 0,
          PRV: 0,
          PrecioFletePC: 0,
          PrecioConsularizacion: 0,
          PrecioEnvioDeDocumentos: 0,
          PrecioPermiso: 0,
        }
      : {
          ...providerConf?.ConfiguracionPrecioProveedor,
          // DOCS: Validar si la configuración que tiene es del nivel que se solicitó, de lo contrario se guardará un nuevo objeto
          IdConfiguracionPrecioProveedor: receivedConfigIsEqualToWishedConfig(
            levelConfiguration,
            hasConfigurationAt,
          )
            ? providerConf?.ConfiguracionPrecioProveedor.IdConfiguracionPrecioProveedor
            : DEFAULT_UUID,
        }
    : providerIsMexican
    ? {
        Activo: true,
        DTA: 0,
        FechaCaducidad: DEFAULT_DATE,
        FechaRegistro: DEFAULT_DATE,
        FechaUltimaActualizacion: DEFAULT_DATE,
        IGI: 0,
        // DOCS: Validar si el proveedor es Mexicano, si no validar si existe ConceptoAgenteAduanal
        IdConceptoAgenteAduanal: null,
        IdConfiguracionPrecioProveedor: DEFAULT_UUID,
        PRV: 0,
        PorcentajeDescuento: 0,
        PrecioConsularizacion: 0,
        PrecioEnvioDeDocumentos: 0,
        PrecioFleteAD: 0,
        PrecioFletePC: 0,
        PrecioPermiso: 0,
        RestringidoDistribuidor: false,
        RestringidoWeb: false,
      }
    : {
        Activo: true,
        DTA: null,
        FechaCaducidad: DEFAULT_DATE,
        FechaRegistro: DEFAULT_DATE,
        FechaUltimaActualizacion: DEFAULT_DATE,
        IGI: null,
        // DOCS: Validar si el proveedor es Mexicano, si no validar si existe ConceptoAgenteAduanal
        IdConceptoAgenteAduanal:
          providerConf?.ConceptoAgenteAduanal?.IdConceptoAgenteAduanal || DEFAULT_UUID,
        IdConfiguracionPrecioProveedor: DEFAULT_UUID,
        PRV: null,
        PorcentajeDescuento: null,
        PrecioConsularizacion: null,
        PrecioEnvioDeDocumentos: null,
        PrecioFleteAD: null,
        PrecioFletePC: null,
        PrecioPermiso: null,
        RestringidoDistribuidor: false,
        RestringidoWeb: false,
      };

// DOCS: Construye el objeto ConfiguracionPrecioProveedorFamilia
const buildFamilyProviderPriceConfiguration = (
  providerConf: ConfProveedor,
  levelConfiguration: string,
  hasConfigurationAt: string,
  providerIsMexican: boolean,
): ConfiguracionPrecioProveedorFamilia =>
  // DOCS: Validar si tiene configuración, sino se crea un objeto nuevo
  providerConf?.ConfiguracionPrecioProveedorFamilia
    ? providerIsMexican
      ? {
          /*DOCS: Si tenía una configuración equivocada como Proveedor No Mexicano
                   pero ahora se quiere configurar como Mexicano, se coloca null en los campos correspondientes*/
          ...providerConf?.ConfiguracionPrecioProveedorFamilia,
          // DOCS: Validar si la configuración que tiene es del nivel que se solicitó, de lo contrario se guardará un nuevo objeto
          IdConfiguracionPrecioProveedorFamilia: receivedConfigIsEqualToWishedConfig(
            levelConfiguration,
            hasConfigurationAt,
          )
            ? providerConf?.ConfiguracionPrecioProveedorFamilia
                .IdConfiguracionPrecioProveedorFamilia
            : DEFAULT_UUID,
          // DOCS: Validar si la configuración que tiene es del nivel que se solicitó, de lo contrario se guardará un nuevo objeto
          IdConfiguracionPrecioProveedor:
            (receivedConfigIsEqualToWishedConfig(levelConfiguration, hasConfigurationAt) &&
              providerConf?.ConfiguracionPrecioProveedor?.IdConfiguracionPrecioProveedor) ||
            DEFAULT_UUID,
          VUCEM: 0,
          ServicioLogistica: 0,
          TM: 0,
          Validacion: 0,
          Previo: 0,
          Desconsolidacion: 0,
          Maniobras: 0,
          Transito: 0,
          ClasificacionProceso: 0,
          InBond: 0,
        }
      : {
          ...providerConf?.ConfiguracionPrecioProveedorFamilia,
          // DOCS: Validar si la configuración que tiene es del nivel que se solicitó, de lo contrario se guardará un nuevo objeto
          IdConfiguracionPrecioProveedorFamilia: receivedConfigIsEqualToWishedConfig(
            levelConfiguration,
            hasConfigurationAt,
          )
            ? providerConf?.ConfiguracionPrecioProveedorFamilia
                .IdConfiguracionPrecioProveedorFamilia
            : DEFAULT_UUID,
          // DOCS: Validar si la configuración que tiene es del nivel que se solicitó, de lo contrario se guardará un nuevo objeto
          IdConfiguracionPrecioProveedor:
            (receivedConfigIsEqualToWishedConfig(levelConfiguration, hasConfigurationAt) &&
              providerConf?.ConfiguracionPrecioProveedor?.IdConfiguracionPrecioProveedor) ||
            DEFAULT_UUID,
        }
    : providerIsMexican
    ? {
        // DOCS Entra al no tener una configuracion a nivel familia
        Activo: true,
        AplicaPorPieza: null,
        ClasificacionProceso: 0,
        Desconsolidacion: 0,
        FechaRegistro: DEFAULT_DATE,
        FechaUltimaActualizacion: DEFAULT_DATE,
        IdConfiguracionPrecioProveedor: DEFAULT_UUID,
        IdConfiguracionPrecioProveedorFamilia: DEFAULT_UUID,
        InBond: 0,
        Maniobras: 0,
        MontoMinimoOC: null,
        NumPiezas: null,
        Previo: 0,
        ServicioLogistica: 0,
        TM: 0,
        Transito: 0,
        VUCEM: 0,
        Validacion: 0,
      }
    : {
        // DOCS Entra al no tener una configuracion a nivel familia
        Activo: true,
        AplicaPorPieza: null,
        ClasificacionProceso: null,
        Desconsolidacion: null,
        FechaRegistro: DEFAULT_DATE,
        FechaUltimaActualizacion: DEFAULT_DATE,
        IdConfiguracionPrecioProveedor: DEFAULT_UUID,
        IdConfiguracionPrecioProveedorFamilia: DEFAULT_UUID,
        InBond: null,
        Maniobras: null,
        MontoMinimoOC: null,
        NumPiezas: null,
        Previo: null,
        ServicioLogistica: null,
        TM: null,
        Transito: null,
        VUCEM: null,
        Validacion: null,
      };
// DOCS: Construye  el arreglo de objetos configuracionPrecioUtilidadCategoriaProveedor
const buildProviderCategoryUtilityPriceConfig = (
  providerConf: ConfProveedor,
  levelConfiguration: string,
  hasConfigurationAt: string,
  configuracionProveedorRendimiento: IConfProveedorUtilidadComision,
): IConfProveedorUtilidadComision => {
  return {
    vMarcaFamiliaIndustria: map(
      configuracionProveedorRendimiento?.vMarcaFamiliaIndustria,
      (familiaIndustriaObj: VMarcaFamiliaIndustriaObj) =>
        ({
          ...familiaIndustriaObj,
          // DOCS: Recorrer catálogo de niveles de ingreso para armar cada objeto
          ConfiguracionPrecioUtilidadCategoriaProveedor: map(
            familiaIndustriaObj.ConfiguracionPrecioUtilidadCategoriaProveedor,
            (
              o: ConfiguracionPrecioUtilidadCategoriaProveedorObj,
            ): ConfiguracionPrecioUtilidadCategoriaProveedorObj => ({
              ...o,
              IdConfiguracionPrecioProveedorFamilia: receivedConfigIsEqualToWishedConfig(
                levelConfiguration,
                hasConfigurationAt,
              )
                ? o?.IdConfiguracionPrecioProveedorFamilia
                : DEFAULT_UUID,
              IdConfiguracionPrecioUtilidadCategoriaProveedor: receivedConfigIsEqualToWishedConfig(
                levelConfiguration,
                hasConfigurationAt,
              )
                ? o?.IdConfiguracionPrecioUtilidadCategoriaProveedor
                : DEFAULT_UUID,
            }),
          ),
          ConfiguracionComisionProveedor: {
            ...familiaIndustriaObj.ConfiguracionComisionProveedor,
            IdConfiguracionPrecioProveedorFamilia: receivedConfigIsEqualToWishedConfig(
              levelConfiguration,
              hasConfigurationAt,
            )
              ? familiaIndustriaObj.ConfiguracionComisionProveedor
                  .IdConfiguracionPrecioProveedorFamilia
              : DEFAULT_UUID,
            IdConfiguracionComisionProveedor: receivedConfigIsEqualToWishedConfig(
              levelConfiguration,
              hasConfigurationAt,
            )
              ? familiaIndustriaObj.ConfiguracionComisionProveedor.IdConfiguracionComisionProveedor
              : DEFAULT_UUID,
          },
          needsToSave: true,
        } as IVMarcaFamiliaIndustriaObj),
    ),
  } as IConfProveedorUtilidadComision;
};

// DOCS: Construye el objeto ConfiguracionTiempoEntregaProveedorFamilia
const buildFamilyProviderDeliveryTimeConfiguration = (
  providerConf: ConfProveedor,
  levelConfiguration: string,
  hasConfigurationAt: string,
): ConfiguracionTiempoEntregaProveedorFamilia =>
  providerConf?.ConfiguracionTiempoEntregaProveedorFamilia
    ? {
        ...providerConf?.ConfiguracionTiempoEntregaProveedorFamilia,
        // DOCS: Validar si la configuración que tiene es del nivel que se solicitó, de lo contrario se guardará un nuevo objeto
        IdConfiguracionTiempoEntregaProveedorFamilia: receivedConfigIsEqualToWishedConfig(
          levelConfiguration,
          hasConfigurationAt,
        )
          ? providerConf?.ConfiguracionTiempoEntregaProveedorFamilia
              .IdConfiguracionTiempoEntregaProveedorFamilia
          : DEFAULT_UUID,
      }
    : {
        Activo: true,
        FechaRegistro: DEFAULT_DATE,
        FechaUltimaActualizacion: DEFAULT_DATE,
        IdConfiguracionTiempoEntregaProveedorFamilia:
          providerConf?.ConfiguracionProveedorFamiliaGeneral
            ?.IdConfiguracionTiempoEntregaProveedorFamilia || DEFAULT_UUID,
      };

// DOCS: Construye el objeto ConfiguracionProveedorFamiliaGeneral
const buildGeneralFamilyProviderConfiguration = (
  providerConf: ConfProveedor,
  providerFamilyTrademarkId: string,
  levelConfiguration: string,
  hasConfigurationAt: string,
): ConfiguracionProveedorFamiliaGeneral => {
  return providerConf?.ConfiguracionProveedorFamiliaGeneral
    ? {
        ...providerConf?.ConfiguracionProveedorFamiliaGeneral,
      }
    : {
        Activo: true,
        IdConfiguracionPrecioProveedorFamilia: configIsEqualToLevel(
          levelConfiguration,
          hasConfigurationAt,
          Configs.General,
        )
          ? providerConf?.ConfiguracionPrecioProveedorFamilia
              ?.IdConfiguracionPrecioProveedorFamilia || DEFAULT_UUID
          : DEFAULT_UUID,
        IdConfiguracionProveedorFamiliaGeneral: DEFAULT_UUID,
        IdConfiguracionTiempoEntregaProveedorFamilia: configIsEqualToLevel(
          levelConfiguration,
          hasConfigurationAt,
          Configs.General,
        )
          ? providerConf?.ConfiguracionTiempoEntregaProveedorFamilia
              ?.IdConfiguracionTiempoEntregaProveedorFamilia || DEFAULT_UUID
          : DEFAULT_UUID,
        IdMarcaFamiliaProveedor: providerFamilyTrademarkId,
      };
};

// DOCS: Construye el objeto ConfiguracionProveedorFamiliaCosto
const buildCostFamilyProviderConfiguration = (
  providerConf: ConfProveedor,
  providerFamilyTrademarkId: string,
  levelConfiguration: string,
  hasConfigurationAt: string,
  price: number,
): ConfiguracionProveedorFamiliaCosto =>
  providerConf?.ConfiguracionProveedorFamiliaCosto
    ? {
        ...providerConf?.ConfiguracionProveedorFamiliaCosto,
        IdConfiguracionPrecioProveedorFamilia: configIsEqualToLevel(
          levelConfiguration,
          hasConfigurationAt,
          Configs.Price,
        )
          ? providerConf?.ConfiguracionProveedorFamiliaCosto.IdConfiguracionPrecioProveedorFamilia
          : DEFAULT_UUID,
        IdConfiguracionTiempoEntregaProveedorFamilia: configIsEqualToLevel(
          levelConfiguration,
          hasConfigurationAt,
          Configs.Price,
        )
          ? providerConf?.ConfiguracionTiempoEntregaProveedorFamilia
              .IdConfiguracionTiempoEntregaProveedorFamilia
          : DEFAULT_UUID,
      }
    : {
        Activo: true,
        Costo: price,
        IdConfiguracionPrecioProveedorFamilia: configIsEqualToLevel(
          levelConfiguration,
          hasConfigurationAt,
          Configs.Price,
        )
          ? providerConf?.ConfiguracionPrecioProveedorFamilia?.IdConfiguracionPrecioProveedorFamilia
          : DEFAULT_UUID,
        IdConfiguracionProveedorFamiliaCosto: DEFAULT_UUID,
        IdConfiguracionTiempoEntregaProveedorFamilia: configIsEqualToLevel(
          levelConfiguration,
          hasConfigurationAt,
          Configs.Price,
        )
          ? providerConf?.ConfiguracionTiempoEntregaProveedorFamilia
              ?.IdConfiguracionTiempoEntregaProveedorFamilia
          : DEFAULT_UUID,
        IdMarcaFamiliaProveedor: providerFamilyTrademarkId,
      };

// DOCS: Construye el objeto ConfiguracionProveedorFamiliaClasificacion
const buildClassificationFamilyProviderConfiguration = (
  providerConf: ConfProveedor,
  providerFamilyTrademarkId: string,
  levelConfiguration: string,
  hasConfigurationAt: string,
  classificationId: string,
): ConfiguracionProveedorFamiliaClasificacion =>
  providerConf?.ConfiguracionProveedorFamiliaClasificacion
    ? {
        ...providerConf?.ConfiguracionProveedorFamiliaClasificacion,
        IdConfiguracionPrecioProveedorFamilia: configIsEqualToLevel(
          levelConfiguration,
          hasConfigurationAt,
          Configs.Classification,
        )
          ? providerConf?.ConfiguracionProveedorFamiliaClasificacion
              .IdConfiguracionPrecioProveedorFamilia
          : DEFAULT_UUID,
        IdConfiguracionTiempoEntregaProveedorFamilia: configIsEqualToLevel(
          levelConfiguration,
          hasConfigurationAt,
          Configs.Classification,
        )
          ? providerConf?.ConfiguracionProveedorFamiliaClasificacion
              .IdConfiguracionProveedorFamiliaClasificacion
          : DEFAULT_UUID,
      }
    : {
        Activo: true,
        IdAgrupadorCaracteristica: classificationId,
        IdConfiguracionPrecioProveedorFamilia: configIsEqualToLevel(
          levelConfiguration,
          hasConfigurationAt,
          Configs.Classification,
        )
          ? providerConf?.ConfiguracionPrecioProveedorFamilia.IdConfiguracionPrecioProveedorFamilia
          : DEFAULT_UUID,
        IdConfiguracionProveedorFamiliaClasificacion: DEFAULT_UUID,
        IdConfiguracionTiempoEntregaProveedorFamilia: configIsEqualToLevel(
          levelConfiguration,
          hasConfigurationAt,
          Configs.Classification,
        )
          ? providerConf?.ConfiguracionTiempoEntregaProveedorFamilia
              .IdConfiguracionTiempoEntregaProveedorFamilia
          : DEFAULT_UUID,
        IdMarcaFamiliaProveedor: providerFamilyTrademarkId,
      };

// DOCS: Construye el objeto ConfiguracionProveedorFamiliaProducto
const buildProductFamilyProviderConfiguration = (
  providerConf: ConfProveedor,
  providerFamilyTrademarkId: string,
  levelConfiguration: string,
  hasConfigurationAt: string,
  productId: string,
): ConfiguracionProveedorFamiliaProducto =>
  providerConf?.ConfiguracionProveedorFamiliaProducto
    ? {
        ...providerConf?.ConfiguracionProveedorFamiliaProducto,
        IdConfiguracionPrecioProveedorFamilia: configIsEqualToLevel(
          levelConfiguration,
          hasConfigurationAt,
          Configs.Product,
        )
          ? providerConf?.ConfiguracionProveedorFamiliaProducto
              .IdConfiguracionPrecioProveedorFamilia
          : DEFAULT_UUID,
        IdConfiguracionTiempoEntregaProveedorFamilia: configIsEqualToLevel(
          levelConfiguration,
          hasConfigurationAt,
          Configs.Product,
        )
          ? providerConf?.ConfiguracionProveedorFamiliaProducto
              .IdConfiguracionTiempoEntregaProveedorFamilia
          : DEFAULT_UUID,
      }
    : {
        Activo: true,
        IdProducto: productId,
        IdConfiguracionPrecioProveedorFamilia: configIsEqualToLevel(
          levelConfiguration,
          hasConfigurationAt,
          Configs.Product,
        )
          ? providerConf?.ConfiguracionPrecioProveedorFamilia.IdConfiguracionPrecioProveedorFamilia
          : DEFAULT_UUID,
        IdConfiguracionProveedorFamiliaProducto: DEFAULT_UUID,
        IdConfiguracionTiempoEntregaProveedorFamilia: configIsEqualToLevel(
          levelConfiguration,
          hasConfigurationAt,
          Configs.Product,
        )
          ? providerConf?.ConfiguracionTiempoEntregaProveedorFamilia
              .IdConfiguracionTiempoEntregaProveedorFamilia
          : DEFAULT_UUID,
        IdMarcaFamiliaProveedor: providerFamilyTrademarkId,
      };

/*DOCS: Construye el arreglo ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega y ValorConfiguracionTiempoEntrega*/
const buildDeliveryRoutes = (
  providerConf: ConfProveedor,
  levelConfiguration: string,
  hasConfigurationAt: string,
  deliveryRoutesList: Array<IOfferDeliveryRoutes>,
  providerIsMexican: boolean,
): Array<IOfferDeliveryRoutes> =>
  map(deliveryRoutesList, (o: CatRutaEntrega) => {
    const catDeliveryRouteMatched: ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj = find(
      providerConf?.ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega,
      (i) => i.IdCatRutaEntrega === o.IdCatRutaEntrega,
    );
    if (catDeliveryRouteMatched) {
      return {
        ...o,
        configuracionTiempoEntregaProveedorFamiliaRutaEntrega: {
          /*DOCS: Se recuperan los valores de tiempos logísticos desde el objeto que hizo match quitando los objetos que no se usan*/
          ...omit(catDeliveryRouteMatched, ['ValorConfiguracionTiempoEntrega', 'catRutaEntrega']),
          IdConfiguracionTiempoEntregaProveedorFamilia: receivedConfigIsEqualToWishedConfig(
            levelConfiguration,
            hasConfigurationAt,
          )
            ? catDeliveryRouteMatched.IdConfiguracionTiempoEntregaProveedorFamilia
            : DEFAULT_UUID,
          IdConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega: receivedConfigIsEqualToWishedConfig(
            levelConfiguration,
            hasConfigurationAt,
          )
            ? catDeliveryRouteMatched.IdConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega
            : DEFAULT_UUID,
          IdValorConfiguracionTiempoEntrega: null,
          RutaEntrega: catDeliveryRouteMatched.catRutaEntrega.RutaEntrega,
          /*AplicaFleteExpress:
            catDeliveryRouteMatched.catRutaEntrega.AplicaFleteExpress,*/
          IdCatRutaEntrega: o.IdCatRutaEntrega,
          /*DOCS: Si tenía una configuración equivocada como Proveedor No Mexicano
                 pero ahora se quiere configurar como Mexicano, se coloca null en los campos correspondientes*/
          DiasConsolidacionPharma: providerIsMexican
            ? null
            : catDeliveryRouteMatched.DiasConsolidacionPharma,
          DiasImportacionAAlmacen: providerIsMexican
            ? null
            : catDeliveryRouteMatched.DiasImportacionAAlmacen,
          /*DOCS: Siempre se sobreescriben los valores para que se cumpla la regla de negocio en caso de que vengan en null*/
        },
        isConfigured: false,
        isSelected: false,
      };
    }
    return {
      ...o,
      configuracionTiempoEntregaProveedorFamiliaRutaEntrega: {
        IdConfiguracionTiempoEntregaProveedorFamilia:
          (receivedConfigIsEqualToWishedConfig(levelConfiguration, hasConfigurationAt) &&
            providerConf?.ConfiguracionTiempoEntregaProveedorFamilia
              ?.IdConfiguracionTiempoEntregaProveedorFamilia) ||
          DEFAULT_UUID,
        IdConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega: DEFAULT_UUID,
        IdValorConfiguracionTiempoEntrega: null,
        IdCatRutaEntrega: o.IdCatRutaEntrega,
        RutaEntrega: o.RutaEntrega,
        /*AplicaFleteExpress: false,*/
        DiasConsolidacionPharma: null,
        DiasAlmacenAInspeccion: null,
        DiasArriboAImportacion: null,
        DiasCompraAEmbarque: null,
        DiasImportacionAAlmacen: null,
        DiasInspeccionAEmbalaje: null,
        DiasPedidoACompra: null,
        DiasEmbarqueAArribo: null,
      },
      isConfigured: false,
      isSelected: false,
    };
  });

/*DOCS: Construye el agente aduanal seleccionado*/
const buildSelectedCustomsAgent = (
  customsAgentConcept: ConceptoAgenteAduanal,
  customsAgentsList: Array<DropListOption>,
  providerIsMexican: boolean,
) => {
  const customsAgent: DropListOption = providerIsMexican
    ? ({} as DropListOption)
    : find(
        customsAgentsList,
        (o: DropListOption) => o.value.toString() === customsAgentConcept?.IdAgenteAduanal,
      );
  return customsAgent || ({} as DropListOption);
};

/*DOCS: Construye la aduana seleccionada*/
const buildSelectedCustoms = (
  customsAgentConcept: ConceptoAgenteAduanal,
  customsList: Array<DropListOption>,
  providerIsMexican: boolean,
) => {
  const customs: DropListOption = providerIsMexican
    ? ({} as DropListOption)
    : find(
        customsList,
        (o: DropListOption) => o.value.toString() === customsAgentConcept?.IdAduana,
      );
  return customs || ({} as DropListOption);
};

/*DOCS: Construye el concepto agente aduanal seleccionada*/
const buildSelectedCustomsAgentConcept = (
  customsAgentConcept: ConceptoAgenteAduanal,
  customsAgentConceptsList: Array<DropListOption>,
  providerIsMexican: boolean,
) => {
  const customsAgentConceptObject: DropListOption = providerIsMexican
    ? ({} as DropListOption)
    : find(
        customsAgentConceptsList,
        (o: DropListOption) => o.value.toString() === customsAgentConcept?.IdConceptoAgenteAduanal,
      );
  return customsAgentConceptObject || ({} as DropListOption);
};

const buildSelectedToggleSwitchOption = (
  familyProviderPriceConfiguration: ConfiguracionPrecioProveedorFamilia,
  toggleSwitchOptions: Array<DropListOption>,
) => {
  return familyProviderPriceConfiguration?.AplicaPorPieza === true
    ? toggleSwitchOptions[1]
    : familyProviderPriceConfiguration?.AplicaPorPieza === false
    ? toggleSwitchOptions[0]
    : null;
};

// DOCS Valida si el nivel de configuracion es igual al que se esta solicitando y si tiene una configuracion al nivel seleccionado
const receivedConfigIsEqualToWishedConfig = (levelConfiguration, hasConfigurationAt) =>
  !!(
    levelConfiguration === Configs.General ||
    (levelConfiguration === Configs.Price && hasConfigurationAt === Levels.listPrice) ||
    (levelConfiguration === Configs.Classification &&
      hasConfigurationAt === Levels.CharacteristicGrouper) ||
    (levelConfiguration === Configs.Product && hasConfigurationAt === Levels.Product)
  );

const configIsEqualToLevel = (levelConfiguration, hasConfigurationAt, configToCompare): boolean => {
  const objectToCompare = {
    [Configs.General]: () =>
      !!(levelConfiguration === Configs.General && hasConfigurationAt === Levels.Family),
    [Configs.Price]: () =>
      !!(levelConfiguration === Configs.Price && hasConfigurationAt === Levels.listPrice),
    [Configs.Classification]: () =>
      !!(
        levelConfiguration === Configs.Classification &&
        hasConfigurationAt === Levels.CharacteristicGrouper
      ),
    [Configs.Product]: () =>
      !!(levelConfiguration === Configs.Product && hasConfigurationAt === Levels.Product),
  };

  return objectToCompare[configToCompare]();
};

export const buildFamilyFromTrademarkFamilyProviderResp = ({
  selectedFamily,
  id,
}: {
  selectedFamily: IVTrademarkFamily;
  id: string;
}): IVTrademarkFamily => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
  },
});

export const buildFamilyFromProviderPriceResp = ({
  selectedFamily,
  id,
}: {
  selectedFamily: IVTrademarkFamily;
  id: string;
}): IVTrademarkFamily => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
    ConfiguracionPrecioProveedor: {
      ...selectedFamily.actualConfiguration.ConfiguracionPrecioProveedor,
      IdConfiguracionPrecioProveedor: id,
    },
    ConfiguracionPrecioProveedorFamilia: {
      ...selectedFamily.actualConfiguration.ConfiguracionPrecioProveedorFamilia,
      IdConfiguracionPrecioProveedor: id,
    },
  },
});

export const buildFamilyFromFamilyProviderPriceResp = ({
  selectedFamily,
  id,
}: {
  selectedFamily: IVTrademarkFamily;
  id: string;
}): IVTrademarkFamily => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
    ConfiguracionPrecioProveedorFamilia: {
      ...selectedFamily.actualConfiguration.ConfiguracionPrecioProveedorFamilia,
      IdConfiguracionPrecioProveedorFamilia: id,
    },
    configuracionProveedorRendimiento: {
      ...selectedFamily.actualConfiguration.configuracionProveedorRendimiento,
      vMarcaFamiliaIndustria: map(
        selectedFamily.actualConfiguration?.configuracionProveedorRendimiento
          ?.vMarcaFamiliaIndustria,
        (familiaIndustriaObj: IVMarcaFamiliaIndustriaObj) =>
          ({
            ...familiaIndustriaObj,
            ConfiguracionPrecioUtilidadCategoriaProveedor: map(
              familiaIndustriaObj.ConfiguracionPrecioUtilidadCategoriaProveedor,
              (
                o: ConfiguracionPrecioUtilidadCategoriaProveedorObj,
              ): ConfiguracionPrecioUtilidadCategoriaProveedorObj => ({
                ...o,
                IdConfiguracionPrecioProveedorFamilia: id,
              }),
            ),
            ConfiguracionComisionProveedor: {
              ...familiaIndustriaObj.ConfiguracionComisionProveedor,
              IdConfiguracionPrecioProveedorFamilia: id,
            },
          } as IVMarcaFamiliaIndustriaObj),
      ),
    },
    ConfiguracionProveedorFamiliaGeneral: {
      ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaGeneral,
      IdConfiguracionPrecioProveedorFamilia: id,
    },
    ConfiguracionProveedorFamiliaCosto: {
      ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaCosto,
      IdConfiguracionPrecioProveedorFamilia: id,
    },
    ConfiguracionProveedorFamiliaClasificacion: {
      ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaClasificacion,
      IdConfiguracionPrecioProveedorFamilia: id,
    },
    ConfiguracionProveedorFamiliaProducto: {
      ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaProducto,
      IdConfiguracionPrecioProveedorFamilia: id,
    },
    IdConfiguracionPrecioProveedorFamilia: id,
  },
});
// TODO Revisar luego de que se tenga el nuevo guardado de las utlidades y el cambio relacionado a al sector y las industrias

export const buildFamilyFromUtilityPriceResp = (
  ids: string[],
  familyBrandIndustryItem: IVMarcaFamiliaIndustriaObj,
): IVMarcaFamiliaIndustriaObj => ({
  ...familyBrandIndustryItem,
  ConfiguracionPrecioUtilidadCategoriaProveedor: map(
    familyBrandIndustryItem.ConfiguracionPrecioUtilidadCategoriaProveedor,
    (utility, index: number) => ({
      ...utility,
      IdConfiguracionPrecioUtilidadCategoriaProveedor: extractID(ids[index]),
    }),
  ),
  ConfiguracionComisionProveedor: {
    ...familyBrandIndustryItem.ConfiguracionComisionProveedor,
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    Activo: true,
  },
  Activo: true,
});
export const buildFamilyFromCommissionProviderResp = (
  id: string,
  familyBrandIndustryItem: IVMarcaFamiliaIndustriaObj,
): IVMarcaFamiliaIndustriaObj => ({
  ...familyBrandIndustryItem,
  needsToSave: false,
  ConfiguracionComisionProveedor: {
    ...familyBrandIndustryItem.ConfiguracionComisionProveedor,
    IdConfiguracionComisionProveedor: extractID(id),
  },
});

export const buildFamilyFromDeliveryTimeResp = ({
  selectedFamily,
  id,
}: {
  selectedFamily: IVTrademarkFamily;
  id: string;
}): IVTrademarkFamily => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
    deliveryRoutes: map(
      selectedFamily.actualConfiguration.deliveryRoutes,
      (o: IOfferDeliveryRoutes) => ({
        ...o,
        configuracionTiempoEntregaProveedorFamiliaRutaEntrega: {
          ...o.configuracionTiempoEntregaProveedorFamiliaRutaEntrega,
          IdConfiguracionTiempoEntregaProveedorFamilia: id,
        },
      }),
    ),
    ConfiguracionProveedorFamiliaGeneral: {
      ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaGeneral,
      IdConfiguracionTiempoEntregaProveedorFamilia: id,
    },
    ConfiguracionProveedorFamiliaCosto: {
      ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaCosto,
      IdConfiguracionTiempoEntregaProveedorFamilia: id,
    },
    ConfiguracionProveedorFamiliaClasificacion: {
      ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaClasificacion,
      IdConfiguracionTiempoEntregaProveedorFamilia: id,
    },
    ConfiguracionProveedorFamiliaProducto: {
      ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaProducto,
      IdConfiguracionTiempoEntregaProveedorFamilia: id,
    },
  },
});

export const buildFamilyFromDeliveryRouteDeliveryTimeResp = ({
  selectedFamily,
  ids,
}: {
  selectedFamily: IVTrademarkFamily;
  ids: Array<string>;
}): IVTrademarkFamily => {
  let counter = -1;
  return {
    ...selectedFamily,
    actualConfiguration: {
      ...selectedFamily.actualConfiguration,
      deliveryRoutes: map(
        selectedFamily.actualConfiguration.deliveryRoutes,
        (o: IOfferDeliveryRoutes) => {
          counter++;
          return {
            ...o,
            configuracionTiempoEntregaProveedorFamiliaRutaEntrega: {
              ...o.configuracionTiempoEntregaProveedorFamiliaRutaEntrega,
              IdConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega: extractID(ids[counter]),
            },
          };
        },
      ),
    },
  };
};

export const buildFamilyFromGeneralConfigResp = ({
  selectedFamily,
  id,
}: {
  selectedFamily: IVTrademarkFamily;
  id: string;
}): IVTrademarkFamily => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
    ConfiguracionProveedorFamiliaGeneral: {
      ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaGeneral,
      IdConfiguracionProveedorFamiliaGeneral: id,
    },
  },
  generalConfiguration: {
    ...selectedFamily.actualConfiguration,
    ConfiguracionProveedorFamiliaGeneral: {
      ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaGeneral,
      IdConfiguracionProveedorFamiliaGeneral: id,
    },
  },
});

export const buildFamilyFromTrademarkFamilyProviderConsolidationResp = ({
  selectedFamily,
  ids,
}: {
  selectedFamily: IVTrademarkFamily;
  ids: Array<string>;
}): IVTrademarkFamily => {
  let counter = -1;
  return {
    ...selectedFamily,
    actualConfiguration: {
      ...selectedFamily.actualConfiguration,
      trademarkFamilyProviderConsolidation: map(
        selectedFamily.actualConfiguration.trademarkFamilyProviderConsolidation,
        (o: ITrademarkFamilyProviderConsolidation) => {
          if (o.isChecked && !o.isOriginal) {
            counter++;
            return {
              ...o,
              IdMarcaFamiliaProveedorConsolidacion: ids[counter],
              isOriginal: true,
            };
          }
          return {...o};
        },
      ),
      trademarkFamilyProviderConsolidationToDelete: [],
    },
    /*generalConfiguration: {
      ...selectedFamily.generalConfiguration,
      trademarkFamilyProviderConsolidation: map(
        selectedFamily.generalConfiguration
          .trademarkFamilyProviderConsolidation,
        (o: ITrademarkFamilyProviderConsolidation, index: number) => ({
          ...o,
          IdMarcaFamiliaProveedorConsolidacion: ids[index],
          isOriginal: true,
        }),
      ),
    },*/
  };
};

export const buildFamilyFromTrademarkFamilyProviderConsolidationDeleteResp = ({
  selectedFamily,
}: {
  selectedFamily: IVTrademarkFamily;
}): IVTrademarkFamily => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
    trademarkFamilyProviderConsolidationToDelete: [],
  },
  generalConfiguration: {
    ...selectedFamily.generalConfiguration,
    trademarkFamilyProviderConsolidationToDelete: [],
  },
});

export const buildFamilyFromCostConfigResp = ({
  selectedFamily,
  id,
}: {
  selectedFamily: IVTrademarkFamily;
  id: string;
}): IVTrademarkFamily => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
    ConfiguracionProveedorFamiliaCosto: {
      ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaCosto,
      IdConfiguracionProveedorFamiliaCosto: id,
    },
  },
  prices: {
    ...selectedFamily.prices,
    pricesList: {
      ...selectedFamily.prices.pricesList,
      Results: map(
        selectedFamily.prices.pricesList.Results,
        (o: IVProductListPriceConfiguration) => {
          if (o.isSelected) {
            return {
              ...o,
              needsToReload: false,
              NivelConfiguracionProductoProveedor: Levels.listPrice,
              configuration: {
                ...selectedFamily.actualConfiguration,
                ConfiguracionProveedorFamiliaCosto: {
                  ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaCosto,
                  IdConfiguracionProveedorFamiliaCosto: id,
                },
              },
            };
          }
          return {...o};
        },
      ),
    },
  },
});

export const buildFamilyFromClassificationConfigResp = ({
  selectedFamily,
  id,
}: {
  selectedFamily: IVTrademarkFamily;
  id: string;
}): IVTrademarkFamily => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
    ConfiguracionProveedorFamiliaClasificacion: {
      ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaClasificacion,
      IdConfiguracionProveedorFamiliaClasificacion: id,
    },
  },
  classifications: {
    ...selectedFamily.classifications,
    classificationsList: {
      ...selectedFamily.classifications.classificationsList,
      Results: map(
        selectedFamily.classifications.classificationsList.Results,
        (o: IVProviderProductClassification) => {
          if (o.isSelected) {
            return {
              ...o,
              needsToReload: false,
              NivelConfiguracionProductoProveedor: Levels.CharacteristicGrouper,
              configuration: {
                ...selectedFamily.actualConfiguration,
                ConfiguracionProveedorFamiliaClasificacion: {
                  ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaClasificacion,
                  IdConfiguracionProveedorFamiliaClasificacion: id,
                },
              },
            };
          }
          return {...o};
        },
      ),
    },
  },
});

export const buildFamilyFromProductConfigResp = ({
  selectedFamily,
  id,
}: {
  selectedFamily: IVTrademarkFamily;
  id: string;
}): IVTrademarkFamily => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
    ConfiguracionProveedorFamiliaProducto: {
      ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaProducto,
      IdConfiguracionProveedorFamiliaProducto: id,
    },
  },
  products: {
    ...selectedFamily.products,
    productsList: {
      ...selectedFamily.products.productsList,
      Results: map(
        selectedFamily.products.productsList.Results,
        (o: IVProviderProductConfiguration) => {
          if (o.isSelected) {
            return {
              ...o,
              needsToReload: false,
              NivelConfiguracionProductoProveedor: Levels.Product,
              configuration: {
                ...selectedFamily.actualConfiguration,
                ConfiguracionProveedorFamiliaProducto: {
                  ...selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaProducto,
                  IdConfiguracionProveedorFamiliaProducto: id,
                },
              },
            };
          }
          return {...o};
        },
      ),
    },
  },
});

/*DOCS: Construye la lista de precios de lista de una familia nivel Precio de lista*/
export const buildPriceLevelListOfPrices = (
  desiredPage: number,
  prices: QueryResultVConfiguracionPrecioListaProducto,
): IOfferListPricesList => {
  const results = addRowIndex(desiredPage, PAGING_LIMIT, prices.Results);
  return {
    TotalResults: prices.TotalResults,
    Results: map(results, (o: IVProductListPriceConfiguration, index: number) => ({
      ...o,
      needsToReload: true,
      isSelected: false,
    })),
  };
};

/*DOCS: Construye el objeto de precio de lista actualizado*/
export const buildPriceLevelObject = (
  price: VConfiguracionPrecioListaProducto,
): IVProductListPriceConfiguration => ({
  ...price,
  needsToReload: true,
  isSelected: true,
});

/*DOCS: Construye la lista de productos de una familia nivel Producto*/
export const buildProductLevelListOfProducts = (
  desiredPage: number,
  products: QueryResultVConfiguracionProductoProveedor,
): IOfferProductsList => {
  const results = addRowIndex(desiredPage, PAGING_LIMIT, products.Results);
  return {
    TotalResults: products.TotalResults,
    Results: map(results, (o: IVProviderProductConfiguration, index: number) => ({
      ...o,
      needsToReload: true,
      isSelected: false,
    })),
  };
};
/*DOCS: Construye el objeto de precio de lista actualizado*/
export const buildCharacteristicGrouperObject = (
  characteristicGrouper: VClasificacionProductoProveedor,
): IVProviderProductClassification => ({
  ...characteristicGrouper,
  needsToReload: true,
  isSelected: true,
});
/*DOCS: Construye el objeto del producto seleccionado*/
export const buildProductLevelObject = (
  product: VConfiguracionProductoProveedor,
): IVProviderProductConfiguration => ({
  ...product,
  needsToReload: true,
  isSelected: true /*DOCS: Se marca como seleccionado porque solo el precio seleccionado se puede actualizar de nuevo*/,
});

export const buildGeneralLevelAsidePrices = (
  prices: QueryResultVPrecioListaProducto,
  response: QueryResultVPrecioListaProveedorProductoFamilia[],
): IOfferAsidePricesList =>
  response.length > 0
    ? {
        TotalResults: prices.TotalResults,
        Results: map(
          prices.Results,
          (o: IVProductListPrice, index: number): IVProductListPrice => ({
            ...o,
            isSelected: false,
            NumPiezas: !isEmpty(response[index].Results)
              ? response[index].Results[0].NumPiezas
              : null,
            incomeLevelsValues: map(
              response[index].Results,
              (i: VPrecioListaProveedorProductoFamilia) => ({
                ...i,
                isSelected: toLower(i.NivelIngreso) === toLower(OfferFields.AAPlus),
                isNegative: getObjectPercentagePriceList(
                  i.PrecioProquifaNetProveedor,
                  i.PrecioLista,
                ).isNegative,
                percentage: getObjectPercentagePriceList(
                  i.PrecioProquifaNetProveedor,
                  i.PrecioLista,
                ).percentage,
              }),
            ),
          }),
        ),
      }
    : {
        Results: [],
        TotalResults: 0,
      };
export const buildPriceListLevelAsidePrices = (
  prices: IVProductListPriceConfiguration,
  response: QueryResultVPrecioListaProveedorProducto,
): IOfferAsidePricesList =>
  response.TotalResults > 0
    ? {
        TotalResults: 1,
        Results: [
          {
            ...prices,
            isSelected: false,
            NumPiezas: !isEmpty(response.Results) ? response.Results[0].NumPiezas : null,
            incomeLevelsValues: map(response.Results, (i: VPrecioListaProveedorProducto) => ({
              ...i,
              isSelected: toLower(i.NivelIngreso) === toLower(OfferFields.AAPlus),
              isNegative: getObjectPercentagePriceList(i.PrecioProquifaNetProveedor, i.PrecioLista)
                .isNegative,
              percentage: getObjectPercentagePriceList(i.PrecioProquifaNetProveedor, i.PrecioLista)
                .percentage,
            })),
          },
        ],
      }
    : {
        Results: [],
        TotalResults: 0,
      };
export const buildProductLevelAsidePrices = (
  product: IVProviderProductConfiguration,
  response: QueryResultVPrecioProductoProveedor,
): IOfferAsidePricesList =>
  response.Results.length > 0
    ? {
        TotalResults: 1,
        Results: [
          {
            ...product,
            isSelected: false,
            NumPiezas: !isEmpty(response.Results) ? response.Results[0].NumPiezas : null,
            incomeLevelsValues: map(response.Results, (i: VPrecioProductoProveedor) => ({
              ...i,
              isSelected: toLower(i.NivelIngreso) === toLower(OfferFields.AAPlus),
              isNegative: getObjectPercentagePriceList(i.PrecioProquifaNetProveedor, i.PrecioLista)
                .isNegative,
              percentage: getObjectPercentagePriceList(i.PrecioProquifaNetProveedor, i.PrecioLista)
                .percentage,
            })),
          },
        ],
      }
    : {
        Results: [],
        TotalResults: 0,
      };
export const buildClassifLevelAsidePrices = (
  prices: QueryResultVPrecioListaProductoClasificacion,
  response: QueryResultVPrecioListaProveedorProductoClasificacion[],
): IOfferAsidePricesList =>
  response.length > 0
    ? {
        TotalResults: prices.TotalResults,
        Results: map(
          prices.Results,
          (o: IVProductListPrice, index: number): IVProductListPrice => ({
            ...o,
            isSelected: false,
            NumPiezas: response[index].Results[0].NumPiezas,
            incomeLevelsValues: map(
              response[index].Results,
              (i: VPrecioListaProveedorProductoClasificacion) => ({
                ...i,
                isSelected: toLower(i.NivelIngreso) === toLower(OfferFields.AAPlus),
                isNegative: getObjectPercentagePriceList(
                  i.PrecioProquifaNetProveedor,
                  i.PrecioLista,
                ).isNegative,
                percentage: getObjectPercentagePriceList(
                  i.PrecioProquifaNetProveedor,
                  i.PrecioLista,
                ).percentage,
              }),
            ),
          }),
        ),
      }
    : {
        Results: [],
        TotalResults: 0,
      };

/*DOCS: Construye el body para la petición que obtiene los valores de los niveles de ingreso de precio seleccionado
   y para los precios del panel derecho en General y Clasificacion*/
export const buildQueryInfoForIncomeLevelsByPrice = (
  price: VConfiguracionPrecioListaProducto | IVProductListPrice,
  catIndustryBrandFamily: VMarcaFamiliaIndustriaObj,
  featureGroup?: IVProviderProductClassification,
) => {
  const queryInfo: QueryInfo = queryInfoWithActiveFilter();
  queryInfo.Filters.unshift(
    {
      NombreFiltro: 'IdMarcaFamilia',
      ValorFiltro: price.IdMarcaFamilia,
    },
    {
      NombreFiltro: 'BasePrecioLista',
      ValorFiltro: price.BasePrecioLista.toString(),
    },
    {
      NombreFiltro: 'IdMarcaFamiliaCatIndustria',
      ValorFiltro: catIndustryBrandFamily.IdMarcaFamiliaCatIndustria,
    },
  );
  if (featureGroup) {
    queryInfo.Filters.push(
      {
        NombreFiltro: 'IdAgrupadorCaracteristica',
        ValorFiltro: featureGroup.IdAgrupadorCaracteristica,
      },
      {
        NombreFiltro: 'NivelConfiguracionProductoProveedor',
        ValorFiltro: featureGroup.NivelConfiguracionProductoProveedor,
      },
    );
  }
  return queryInfo;
};
/*DOCS: Construye el body para la petición que obtiene los valores de los niveles de ingreso de precio seleccionado a
 *  nivel precio de lista*/
export const buildQueryInfoForIncomeLevelsByListPrice = (
  priceList: IVProductListPriceConfiguration,
  catIndustryBrandFamily: VMarcaFamiliaIndustriaObj,
) => {
  const queryInfo: QueryInfo = queryInfoWithActiveFilter();
  queryInfo.Filters.unshift(
    {
      NombreFiltro: 'IdMarcaFamilia',
      ValorFiltro: priceList.IdMarcaFamilia,
    },
    {
      NombreFiltro: 'BasePrecioLista',
      ValorFiltro: priceList.BasePrecioLista.toString(),
    },
    {
      NombreFiltro: 'IdMarcaFamiliaCatIndustria',
      ValorFiltro: catIndustryBrandFamily.IdMarcaFamiliaCatIndustria,
    },
  );
  return queryInfo;
};
/*DOCS: Construye el body para la petición que obtiene los valores de los niveles de ingreso del producto seleccionado*/
export const buildQueryInfoForIncomeLevelsByProduct = (
  selectedFamily: IVTrademarkFamily,
  selectedProduct: IVProviderProductConfiguration,
  catIndustryBrandFamily: VMarcaFamiliaIndustriaObj,
) => {
  const queryInfo: QueryInfo = queryInfoWithActiveFilter();
  queryInfo.Filters.unshift(
    {
      NombreFiltro: 'IdMarcaFamilia',
      ValorFiltro: selectedFamily.IdMarcaFamilia,
    },
    {
      NombreFiltro: 'IdProducto',
      ValorFiltro: selectedProduct.IdProducto,
    },
    {
      NombreFiltro: 'IdMarcaFamiliaCatIndustria',
      ValorFiltro: catIndustryBrandFamily.IdMarcaFamiliaCatIndustria,
    },
  );
  return queryInfo;
};

export const buildPerformanceQuery = (
  selectedFamily: IVTrademarkFamily,
  confProvider: ConfProveedor,
): ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidadParams => ({
  IdConfiguracionPrecioProveedorFamilia:
    confProvider?.ConfiguracionPrecioProveedorFamilia?.IdConfiguracionPrecioProveedorFamilia ??
    DEFAULT_UUID,
  IdMarcaFamilia: selectedFamily.IdMarcaFamilia,
});
