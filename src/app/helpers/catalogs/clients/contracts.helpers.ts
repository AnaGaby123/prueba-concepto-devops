import {DropListOption, DropListOptionCustom} from '@appModels/drop-list/drop-list-option';
import {
  IConfContratoCliente,
  IContract,
  IFamilyCharacteristicGrouperList,
  IFamilyPricesList,
  IFamilyProductsList,
  initialBrands,
  ITrademark,
  IVClasificacionProductoMarcaCliente,
  IVContractFamily,
  IVPrecioListaClienteProductoContrato,
  IVPrecioProductoCliente,
  OfferContractBrands,
} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {DEFAULT_DATE, DEFAULT_UUID, PAGING_LIMIT} from '@appUtil/common.protocols';
import {
  Configs,
  initialToggleSwitchOptions,
  Levels,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {filter, find, isEmpty, map, omit} from 'lodash-es';

import {
  CatRutaEntrega,
  CatUnidadTiempo,
  ConfiguracionClientesCalculosService,
  ConfiguracionPrecioClienteObj,
  ConfiguracionPrecioContratoClienteObj,
  ConfiguracionPrecioProveedorFamilia,
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj,
  ContratoClienteMarcaConfiguracion,
  ContratoClienteMarcaConfiguracionCatClasificacionProducto,
  ContratoClienteMarcaConfiguracionGeneral,
  ContratoClienteMarcaConfiguracionPrecioLista,
  Direccion,
  QueryResultVClasificacionProductoMarcaCliente,
  QueryResultVPrecioListaProductoMarcaCliente,
  QueryResultVPrecioProductoCliente,
  VCliente,
  VMarcaFamilia,
} from 'api-catalogos';
import {addRowIndex} from '@appUtil/util';
import {ClienteEstrategiaCotizacionMarcasObj} from 'api-logistica';
import {IConfigurationPriceProvider} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import {getObjectPercentagePriceList} from '@appUtil/math';
import ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorParams = ConfiguracionClientesCalculosService.ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorParams;

export const pacthCompanys = (lista) => {
  const list: DropListOptionCustom[] = [];
  lista.Results.forEach((item, i) => {
    const it: DropListOptionCustom = {} as DropListOptionCustom;
    it.id = item.IdEmpresa;
    it.nombre = item.RazonSocial + ' · ' + item.RFC;
    it.key = i;
    list.push(it);
  });
  return list;
};

// DOCS Contruye el cuerpo inicial de cada uno de los contratos
export const filterContract = (data): IContract[] => {
  return data.Results.map((item, index: number) => {
    return {
      ...item,
      brands: initialBrands(),
      contractBrands: [],
      UrlContrato: '',
      needsToReload: true,
      isSelected: index === 0,
    };
  });
};

export const buildConfContratoClienteFromResponse = (
  contractConf: ConfiguracionPrecioContratoClienteObj,
  contract: IContract,
  selectedFamily: IVContractFamily,
  client: VCliente,
  selectedBrand: OfferContractBrands,
  timeUnitList: CatUnidadTiempo[],
  deliveryRoutesList: CatRutaEntrega[],
  clientAddress: Direccion[],
  billingAddressId: string,
  deliveryAddressId: string,
  levelConfiguration: string,
  hasConfigurationAt: string,
  price: number,
  classificationId: string,
  productId: string,
  customsAgentsConceptsList: Array<DropListOption>,
  customList: Array<DropListOption>,
  customsAgentsList: Array<DropListOption>,
): IConfContratoCliente => {
  const brandClientContractId = selectedBrand?.IdContratoClienteMarca;
  const idDeliveryRoute = getDeliveryRouteIdForLogisticsTimes(clientAddress, deliveryAddressId);
  const deliveryRouteName = getDeliveryRouteName(deliveryRoutesList, idDeliveryRoute);

  return {
    ContratoCliente: contractConf?.ConfContratoCliente
      ? {...contractConf?.ConfContratoCliente?.ContratoCliente}
      : {
          ...omit(contract, [
            'brands',
            'families',
            'selectedBrand',
            'selectedFamily',
            'preSelectedBrands',
            'contractBrands',
            'FechaInicioTipoDate',
            'FechaFinTipoDate',
            'IdDatosFacturacionCliente',
            'NombreCatCondicionesDePago',
            'UrlContrato',
            'tabsConfiguration',
            'tabsSubConfiguration',
            'status',
            'signedContract',
            'disableBrands',
            'needsToReload',
            'isSelected',
          ]),
        },

    ContratoClienteMarca: contractConf?.ConfContratoCliente
      ? {
          ...contractConf?.ConfContratoCliente?.ContratoClienteMarca,
        }
      : {
          ...omit(selectedBrand, ['familiesList', 'selectedFamily', 'needsToReload', 'isSelected']),
        },
    ConceptoAgenteAduanal: buildConceptoAgenteAduanal(contractConf, selectedFamily.Mexicano),
    ConfiguracionPrecioProveedor: buildConfiguracionPrecioProveedor(contractConf),
    ConfiguracionPrecioProveedorFamilia: buildConfiguracionPrecioProveedorFamilia(contractConf),
    configuracionTiemposLogisticos: builConfiguracionTiemposLogisticos(
      contractConf,
      idDeliveryRoute,
    ),
    selectedCustomsAgentConcept: buildSelectedCustomsAgentConcept(
      contractConf,
      selectedFamily?.Mexicano,
      customsAgentsConceptsList,
    ),
    selectedCustomsAgent: buildSelectedAgent(
      contractConf,
      selectedFamily?.Mexicano,
      customsAgentsList,
    ),
    selectedCustoms: buildSelectedCustoms(contractConf, selectedFamily?.Mexicano, customList),
    ContratoClienteMarcaConfiguracion: buildContratoClienteMarcaConfiguracion(
      contractConf,
      client,
      levelConfiguration,
      hasConfigurationAt,
    ),
    ContratoClienteMarcaConfiguracionGeneral: buildContratoClienteMarcaConfiguracionGeneral(
      contractConf,
      selectedFamily,
      levelConfiguration,
      hasConfigurationAt,
      brandClientContractId,
    ),
    ContratoClienteMarcaConfiguracionPrecioLista: buildContratoClienteMarcaConfiguracionPrecioLista(
      contractConf,
      selectedFamily,
      levelConfiguration,
      hasConfigurationAt,
      brandClientContractId,
      price,
    ),
    ContratoClienteMarcaConfiguracionCatClasificacionProducto: buildContratoClienteMarcaConfiguracionCatClasificacionProducto(
      contractConf,
      selectedFamily,
      levelConfiguration,
      hasConfigurationAt,
      brandClientContractId,
      classificationId,
    ),
    ContratoClienteMarcaConfiguracionProducto: buildContratoClienteMarcaConfiguracionProducto(
      contractConf,
      selectedFamily,
      levelConfiguration,
      hasConfigurationAt,
      brandClientContractId,
      productId,
    ),
    selectedToggleSwitchOption: buildSelectedToggleSwitchOption(
      contractConf?.ConfProveedor?.ConfiguracionPrecioProveedorFamilia,
      initialToggleSwitchOptions(),
    ),
    configurationPriceProvider: buildConfigurationPriceProvider(contractConf),
    needsToReload: false,
    MarcaFamiliaProveedorConsolidacion:
      contractConf?.ConfProveedor?.MarcaFamiliaProveedorConsolidacion ?? [],
    MarcaFamiliaProveedor: contractConf?.ConfProveedor?.MarcaFamiliaProveedor ?? {},
    routeName: deliveryRouteName,
  };
};
const buildConfiguracionPrecioProveedor = (response: ConfiguracionPrecioClienteObj) =>
  response?.ConfProveedor?.ConfiguracionPrecioProveedor || {};
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

const buildConfigurationPriceProvider = (
  response: ConfiguracionPrecioContratoClienteObj,
): IConfigurationPriceProvider => {
  return !!response?.ConfProveedorUtilidadComision?.vMarcaFamiliaIndustria?.length
    ? {
        ComisionFrenteComercial:
          response.ConfProveedorUtilidadComision?.vMarcaFamiliaIndustria[0]
            ?.ConfiguracionComisionProveedor?.ComisionFrenteComercial,
        ComisionPharma:
          response.ConfProveedorUtilidadComision?.vMarcaFamiliaIndustria[0]
            ?.ConfiguracionComisionProveedor?.ComisionPharma,
        incomeLevel:
          response.ConfProveedorUtilidadComision?.vMarcaFamiliaIndustria[0]
            ?.ConfiguracionPrecioUtilidadCategoriaProveedor[0]?.catNivelIngreso?.NivelIngreso,
      }
    : {};
};
/*DOCS: Construye la aduana seleccionada*/
const buildSelectedCustoms = (
  contractResponse: ConfiguracionPrecioContratoClienteObj,
  isMexican: boolean,
  customsList: Array<DropListOption>,
) => {
  /*TODO: Buscar el concepto agente aduanal en el cliente, si no existe buscar en el proveedor*/
  if (isMexican) {
    return {} as DropListOption;
  }
  const customs: DropListOption = find(
    customsList,
    (o: DropListOption) =>
      o.value.toString() === contractResponse.ConfProveedor?.ConceptoAgenteAduanal?.IdAduana,
  );
  return customs || ({} as DropListOption);
};
const buildConceptoAgenteAduanal = (
  response: ConfiguracionPrecioContratoClienteObj,
  esMexicano: boolean,
) => {
  return !esMexicano && response?.ConfProveedor?.ConceptoAgenteAduanal
    ? {
        ...response?.ConfProveedor?.ConceptoAgenteAduanal,
      }
    : {};
};
/*DOCS: Construye el concepto agente aduanal seleccionada*/
const buildSelectedCustomsAgentConcept = (
  contractResponse: ConfiguracionPrecioContratoClienteObj,
  isMexican: boolean,
  customsAgentConceptsList: Array<DropListOption>,
) => {
  if (isMexican) {
    return {} as DropListOption;
  }
  const customsAgentConceptObject: DropListOption = find(
    customsAgentConceptsList,
    (o: DropListOption) =>
      o.value.toString() ===
      contractResponse?.ConfProveedor?.ConceptoAgenteAduanal?.IdConceptoAgenteAduanal,
  );
  return customsAgentConceptObject || ({} as DropListOption);
};

/*DOCS: Obtiene el agente aduanal seleccionado*/
const buildSelectedAgent = (
  contractResponse: ConfiguracionPrecioContratoClienteObj,
  isMexican: boolean,
  customsAgentsList: Array<DropListOption>,
) => {
  if (isMexican) {
    return {} as DropListOption;
  }
  const selectedAgent: DropListOption = find(
    customsAgentsList,
    (o: DropListOption) =>
      o.value.toString() === contractResponse.ConfProveedor?.ConceptoAgenteAduanal?.IdAgenteAduanal,
  );
  return selectedAgent || ({} as DropListOption);
};

const buildConfiguracionPrecioProveedorFamilia = (response: ConfiguracionPrecioClienteObj) =>
  response.ConfProveedor?.ConfiguracionPrecioProveedorFamilia || {};

export const buildContratoClienteMarcaConfiguracion = (
  contractConf: ConfiguracionPrecioContratoClienteObj,
  client: VCliente,
  levelConfiguration: string,
  hasConfigurationAt: string,
) => {
  const contractClient = !!(
    contractConf?.ConfContratoCliente &&
    contractConf?.ConfContratoCliente?.ContratoClienteMarcaConfiguracion
  );
  const clientConf = !!(
    contractConf?.ConfCliente && contractConf?.ConfCliente?.ConfiguracionPrecioCliente
  );
  const providerConf = !!contractConf?.ConfProveedor;

  const utility = contractClient
    ? contractConf.ConfContratoCliente?.ContratoClienteMarcaConfiguracion?.Utilidad
    : clientConf
    ? contractConf.ConfCliente?.ConfiguracionPrecioCliente?.Utilidad
    : providerConf
    ? contractConf.ConfProveedorUtilidadComision?.vMarcaFamiliaIndustria[0]
        ?.ConfiguracionPrecioUtilidadCategoriaProveedor[0]?.UtilidadNivelIngreso
    : null;
  const fixedCost = contractClient
    ? contractConf.ConfContratoCliente?.ContratoClienteMarcaConfiguracion?.FactorCostoFijo
    : clientConf
    ? contractConf?.ConfCliente?.ConfiguracionPrecioCliente?.FactorDeCostoFijo
    : providerConf
    ? contractConf?.ConfProveedorUtilidadComision?.vMarcaFamiliaIndustria[0]
        ?.ConfiguracionComisionProveedor?.FactorDeCostoFijo
    : null;

  let configuracionPrecioCliente: ContratoClienteMarcaConfiguracion = {};

  if (providerConf) {
    switch (levelConfiguration) {
      case Configs.General:
        configuracionPrecioCliente = contractClient
          ? {
              ...contractConf.ConfContratoCliente.ContratoClienteMarcaConfiguracion,
              FactorCostoFijo: fixedCost,
            }
          : {
              Activo: true,
              FactorCostoFijo: fixedCost,
              FechaRegistro: DEFAULT_DATE,
              FechaUltimaActualizacion: DEFAULT_DATE,
              IdContratoClienteMarcaConfiguracion: DEFAULT_UUID,
              IdValorConfiguracionTiempoEntrega: null,
              Utilidad: utility,
            };
        break;
      case Configs.Price:
        configuracionPrecioCliente = contractClient
          ? {
              ...contractConf.ConfContratoCliente.ContratoClienteMarcaConfiguracion,
              IdContratoClienteMarcaConfiguracion:
                hasConfigurationAt === 'Familia'
                  ? DEFAULT_UUID
                  : hasConfigurationAt === 'PrecioLista'
                  ? contractConf.ConfContratoCliente.ContratoClienteMarcaConfiguracion
                      .IdContratoClienteMarcaConfiguracion
                  : DEFAULT_UUID,
              FactorCostoFijo: fixedCost,
            }
          : {
              Activo: true,
              FactorCostoFijo: fixedCost,
              FechaRegistro: DEFAULT_DATE,
              FechaUltimaActualizacion: DEFAULT_DATE,
              IdContratoClienteMarcaConfiguracion: DEFAULT_UUID,
              IdValorConfiguracionTiempoEntrega: null,
              Utilidad: utility,
            };
        break;
      case Configs.Classification:
        configuracionPrecioCliente = contractClient
          ? {
              ...contractConf.ConfContratoCliente.ContratoClienteMarcaConfiguracion,
              IdContratoClienteMarcaConfiguracion:
                hasConfigurationAt === 'Familia'
                  ? DEFAULT_UUID
                  : hasConfigurationAt === 'AgrupadorCaracteristica'
                  ? contractConf.ConfContratoCliente.ContratoClienteMarcaConfiguracion
                      .IdContratoClienteMarcaConfiguracion
                  : DEFAULT_UUID,
              FactorCostoFijo: fixedCost,
            }
          : {
              Activo: true,
              FactorCostoFijo: fixedCost,
              FechaRegistro: DEFAULT_DATE,
              FechaUltimaActualizacion: DEFAULT_DATE,
              IdContratoClienteMarcaConfiguracion: DEFAULT_UUID,
              IdValorConfiguracionTiempoEntrega: null,
              Utilidad: utility,
            };
        break;
      case Configs.Product:
        configuracionPrecioCliente = contractClient
          ? {
              ...contractConf.ConfContratoCliente.ContratoClienteMarcaConfiguracion,
              IdContratoClienteMarcaConfiguracion:
                hasConfigurationAt === 'Producto'
                  ? contractConf.ConfContratoCliente.ContratoClienteMarcaConfiguracion
                      .IdContratoClienteMarcaConfiguracion
                  : DEFAULT_UUID,
              FactorCostoFijo: fixedCost,
            }
          : {
              Activo: true,
              FactorCostoFijo: fixedCost,
              FechaRegistro: DEFAULT_DATE,
              FechaUltimaActualizacion: DEFAULT_DATE,
              IdContratoClienteMarcaConfiguracion: DEFAULT_UUID,
              IdValorConfiguracionTiempoEntrega: null,
              Utilidad: utility,
            };
        break;
    }
  }
  return configuracionPrecioCliente;
};
/*DOCS: Construye ConfiguracionDeTiemposLogisticos*/
export const builConfiguracionTiemposLogisticos = (
  response: ConfiguracionPrecioContratoClienteObj,
  deliveryRoute: string,
): ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj => {
  return find(
    response.ConfProveedor?.ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega,
    (o: ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj) =>
      o.catRutaEntrega.IdCatRutaEntrega === deliveryRoute,
  );
};

export const buildContratoClienteMarcaConfiguracionGeneral = (
  contractConf: ConfiguracionPrecioContratoClienteObj,
  selectedFamily: IVContractFamily,
  levelConfiguration: string,
  hasConfigurationAt: string,
  brandClientContractId: string,
): ContratoClienteMarcaConfiguracionGeneral => {
  return contractConf?.ConfContratoCliente?.ContratoClienteMarcaConfiguracionGeneral
    ? {
        ...contractConf.ConfContratoCliente.ContratoClienteMarcaConfiguracionGeneral,
      }
    : {
        IdContratoClienteMarca: contractConf?.ConfContratoCliente?.ContratoClienteMarca
          ? contractConf.ConfContratoCliente.ContratoClienteMarca.IdContratoClienteMarca
          : brandClientContractId,
        IdContratoClienteMarcaConfiguracion:
          contractConf?.ConfContratoCliente?.ContratoClienteMarcaConfiguracion &&
          levelConfiguration === Configs.General &&
          hasConfigurationAt === Levels.Family
            ? contractConf.ConfContratoCliente.ContratoClienteMarcaConfiguracion
                .IdContratoClienteMarcaConfiguracion
            : DEFAULT_UUID,
        IdContratoClienteMarcaConfiguracionGeneral: DEFAULT_UUID,
        IdMarcaFamilia: selectedFamily.IdMarcaFamilia,
      };
};
export const buildContratoClienteMarcaConfiguracionPrecioLista = (
  contractConf: ConfiguracionPrecioContratoClienteObj,
  selectedFamily: IVContractFamily,
  levelConfiguration: string,
  hasConfigurationAt: string,
  brandClientContractId: string,
  price: number,
): ContratoClienteMarcaConfiguracionPrecioLista =>
  contractConf?.ConfContratoCliente?.ContratoClienteMarcaConfiguracionPrecioLista
    ? {
        ...contractConf.ConfContratoCliente.ContratoClienteMarcaConfiguracionPrecioLista,
      }
    : {
        IdContratoClienteMarca: contractConf?.ConfContratoCliente?.ContratoClienteMarca
          ? contractConf.ConfContratoCliente.ContratoClienteMarca.IdContratoClienteMarca
          : brandClientContractId,
        IdContratoClienteMarcaConfiguracion:
          contractConf?.ConfContratoCliente?.ContratoClienteMarcaConfiguracion &&
          levelConfiguration === Configs.Price &&
          hasConfigurationAt === Levels.listPrice
            ? contractConf.ConfContratoCliente.ContratoClienteMarcaConfiguracion
                .IdContratoClienteMarcaConfiguracion
            : DEFAULT_UUID,
        IdContratoClienteMarcaConfiguracionPrecioLista: DEFAULT_UUID,
        IdMarcaFamilia: selectedFamily.IdMarcaFamilia,
        PrecioLista: price,
      };

export const buildContratoClienteMarcaConfiguracionCatClasificacionProducto = (
  contractConf: ConfiguracionPrecioContratoClienteObj,
  selectedFamily: IVContractFamily,
  levelConfiguration: string,
  hasConfigurationAt: string,
  brandClientContractId: string,
  classificationId: string,
): ContratoClienteMarcaConfiguracionCatClasificacionProducto =>
  contractConf?.ConfContratoCliente?.ContratoClienteMarcaConfiguracionCatClasificacionProducto
    ? {
        ...contractConf.ConfContratoCliente
          .ContratoClienteMarcaConfiguracionCatClasificacionProducto,
      }
    : {
        IdContratoClienteMarca: contractConf?.ConfContratoCliente?.ContratoClienteMarca
          ? contractConf.ConfContratoCliente.ContratoClienteMarca.IdContratoClienteMarca
          : brandClientContractId,
        IdContratoClienteMarcaConfiguracion:
          contractConf?.ConfContratoCliente?.ContratoClienteMarcaConfiguracion &&
          levelConfiguration === Configs.Classification &&
          hasConfigurationAt === Levels.CharacteristicGrouper
            ? contractConf.ConfContratoCliente.ContratoClienteMarcaConfiguracion
                .IdContratoClienteMarcaConfiguracion
            : null,
        IdContratoClienteMarcaConfiguracionCatClasificacionProducto: DEFAULT_UUID,
        IdMarcaFamilia: selectedFamily.IdMarcaFamilia,
        IdAgrupadorCaracteristica: classificationId,
      };

export const buildContratoClienteMarcaConfiguracionProducto = (
  contractConf: ConfiguracionPrecioContratoClienteObj,
  selectedFamily: IVContractFamily,
  levelConfiguration: string,
  hasConfigurationAt: string,
  brandClientContractId: string,
  productId: string,
) =>
  contractConf?.ConfContratoCliente?.ContratoClienteMarcaConfiguracionProducto
    ? {
        ...contractConf.ConfContratoCliente.ContratoClienteMarcaConfiguracionProducto,
      }
    : {
        IdContratoClienteMarca: contractConf?.ConfContratoCliente?.ContratoClienteMarca
          ? contractConf.ConfContratoCliente.ContratoClienteMarca.IdContratoClienteMarca
          : brandClientContractId,
        IdContratoClienteMarcaConfiguracion:
          contractConf?.ConfContratoCliente?.ContratoClienteMarcaConfiguracion &&
          levelConfiguration === Configs.Product &&
          hasConfigurationAt === Levels.Product
            ? contractConf.ConfContratoCliente.ContratoClienteMarcaConfiguracion
                .IdContratoClienteMarcaConfiguracion
            : null,
        IdContratoClienteMarcaConfiguracionProducto: DEFAULT_UUID,
        IdMarcaFamilia: selectedFamily.IdMarcaFamilia,
        IdProducto: productId,
      };

export const getDeliveryRouteName = (
  deliveryRoutesList: Array<CatRutaEntrega>,
  idRutaEntrega,
): string => {
  const routesFiltered = filter(
    deliveryRoutesList,
    (o: CatRutaEntrega) => o.IdCatRutaEntrega === idRutaEntrega,
  );
  return !isEmpty(routesFiltered) ? routesFiltered[0].RutaEntrega : 'N/D';
};
const getDeliveryRouteIdForLogisticsTimes = (
  clientAddresses: Array<Direccion>,
  deliveryAddressId,
): string => {
  const address = find(
    clientAddresses,
    (o: Direccion) => o.IdCatTipoDireccion === deliveryAddressId,
  );
  return address?.IdCatRutaEntrega || null;
};

/*DOCS: QueryInfo para obtener la configuración en Tab Precios*/
export const paramsFilterListPriceConfiguration = (
  price: IVPrecioListaClienteProductoContrato,
  client: VCliente,
  selectedFamily: IVContractFamily,
  contract: IContract,
  brand: ITrademark,
): ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorParams => ({
  NivelConfiguracionProveedor: price.NivelConfiguracionProductoProveedor
    ? price.NivelConfiguracionProductoProveedor
    : 'null',
  NivelConfiguracionCliente: price.NivelConfiguracionProductoContrato
    ? price.NivelConfiguracionProductoContrato
    : price.NivelConfiguracionProductoCliente
    ? price.NivelConfiguracionProductoCliente
    : price.NivelConfiguracionProductoProveedor,
  idAgrupadorCaracteristica: null,
  idCliente: client.IdCliente,
  idContratoCliente: contract.IdContratoCliente,
  idMarca: brand.IdMarca,
  idMarcaFamiliaProveedor: selectedFamily.IdMarcaFamiliaProveedor,
  idProducto: null,
  precioLista: price.PrecioLista,
});

export const buildIFamilyPricesList = (
  selectedFamily$: IVContractFamily,
  response: QueryResultVPrecioListaProductoMarcaCliente,
): IFamilyPricesList => {
  const indexesResults = addRowIndex(
    selectedFamily$.prices.desiredPage,
    PAGING_LIMIT,
    response.Results,
  );
  return {
    TotalResults: response.TotalResults,
    Results: map(
      indexesResults,
      (o: IVPrecioListaClienteProductoContrato): IVPrecioListaClienteProductoContrato => ({
        ...o,
        configuration: {},
        isConfigured: o.NivelConfiguracionProductoContrato === 'PrecioLista',
        isNegative: getObjectPercentagePriceList(o.PrecioProquifaNet, o.PrecioLista).isNegative,
        isSelected: false,
        needsToReload: true,
        percentage: getObjectPercentagePriceList(o.PrecioProquifaNet, o.PrecioLista).percentage,
      }),
    ),
  };
};
export const buildIFamilyCharacteristicGrouperList = (
  selectedFamily$: IVContractFamily,
  response: QueryResultVClasificacionProductoMarcaCliente,
): IFamilyCharacteristicGrouperList => {
  const indexesResults: Array<IVClasificacionProductoMarcaCliente> = addRowIndex(
    selectedFamily$.characteristicGroupers.desiredPage,
    PAGING_LIMIT,
    response.Results,
  );
  return {
    TotalResults: response.TotalResults,
    Results: map(indexesResults, (o: IVClasificacionProductoMarcaCliente) => ({
      ...o,
      isSelected: false,
      needsToReload: true,
      isConfigured: o.NivelConfiguracionProductoContrato === 'AgrupadorCaracteristica',
    })),
  };
};

export const buildIVProveedorFamilia = (families: Array<VMarcaFamilia>): Array<IVContractFamily> =>
  map(
    families,
    (o: IVContractFamily, i): IVContractFamily => ({
      ...o,
      isSelected: i === 0,
    }),
  );
export const paramsFilterListCharacteristicGrouperConfiguration = (
  classification: IVClasificacionProductoMarcaCliente,
  client: VCliente,
  selectedFamily: IVContractFamily,
  contract: IContract,
  brand: ITrademark,
): ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorParams => ({
  NivelConfiguracionProveedor: classification.NivelConfiguracionProductoProveedor
    ? classification.NivelConfiguracionProductoProveedor
    : 'null',
  NivelConfiguracionCliente: classification.NivelConfiguracionProductoContrato
    ? classification.NivelConfiguracionProductoContrato
    : classification.NivelConfiguracionProductoCliente
    ? classification.NivelConfiguracionProductoCliente
    : classification.NivelConfiguracionProductoProveedor,
  idAgrupadorCaracteristica: classification.IdAgrupadorCaracteristica,
  idCliente: client.IdCliente,
  idContratoCliente: contract.IdContratoCliente,
  idMarca: brand.IdMarca,
  idMarcaFamiliaProveedor: selectedFamily.IdMarcaFamiliaProveedor,
  idProducto: null,
  precioLista: null,
});

export const buildIFamilyProductsList = (
  selectedFamily$: IVContractFamily,
  response: QueryResultVPrecioProductoCliente,
): IFamilyProductsList => {
  const indexesResults = addRowIndex(
    selectedFamily$.products.desiredPage,
    PAGING_LIMIT,
    response.Results,
  );
  return {
    TotalResults: response.TotalResults,
    Results: map(indexesResults, (o: IVPrecioProductoCliente) => ({
      ...o,
      configuration: {},
      isConfigured: o.NivelConfiguracionProductoContratoCliente === 'Producto',
      isNegative: getObjectPercentagePriceList(o.PrecioProquifaNet, o.PrecioLista).isNegative,
      isSelected: false,
      needsToReload: true,
      percentage: getObjectPercentagePriceList(o.PrecioProquifaNet, o.PrecioLista).percentage,
    })),
  };
};
export const paramsFilterListProductConfiguration = (
  product: IVPrecioProductoCliente,
  client: VCliente,
  selectedFamily: IVContractFamily,
  contract: IContract,
  brand: ITrademark,
): ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedorParams => ({
  NivelConfiguracionProveedor: product.NivelConfiguracionProductoProveedor
    ? product.NivelConfiguracionProductoProveedor
    : 'null',
  NivelConfiguracionCliente: product.NivelConfiguracionProductoContratoCliente
    ? product.NivelConfiguracionProductoContratoCliente
    : product.NivelConfiguracionProductoCliente
    ? product.NivelConfiguracionProductoCliente
    : product.NivelConfiguracionProductoProveedor,
  idAgrupadorCaracteristica: null,
  idCliente: client.IdCliente,
  idContratoCliente: contract.IdContratoCliente,
  idMarca: brand.IdMarca,
  idMarcaFamiliaProveedor: selectedFamily.IdMarcaFamiliaProveedor,
  idProducto: product.IdProducto,
  precioLista: null,
});

export const buildBrandsContract = (
  response: Array<ClienteEstrategiaCotizacionMarcasObj>,
): Array<OfferContractBrands> =>
  map(
    response,
    (o: ClienteEstrategiaCotizacionMarcasObj): OfferContractBrands => ({
      ...o,
      familiesList: [],
      selectedFamily: null,
      needsToReload: true,
    }),
  );
