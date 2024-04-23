import {
  CatRutaEntrega,
  ConfiguracionClientesCalculosService,
  ConfiguracionPrecioCliente,
  ConfiguracionPrecioClienteObj,
  ConfiguracionPrecioProveedorFamilia,
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj,
  Direccion,
  QueryResultVProveedorResumen,
  VMarcaFamilia,
  VProveedorResumen,
} from 'api-catalogos';
import {find, map} from 'lodash-es';
import {
  BuildClientConfForResponseParams,
  IConfClient,
  IConfigurationPriceProvider,
  IVClientProductClassification,
  IVClientProductConfiguration,
  IVProductListPriceConfigurationClient,
  IVProviderResumeQueryResult,
  IVTrademarkFamily,
} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  Configs,
  initialToggleSwitchOptions,
  Levels,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorParams = ConfiguracionClientesCalculosService.ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorParams;

export const buildProviders = (
  response: QueryResultVProveedorResumen,
): IVProviderResumeQueryResult => ({
  TotalResults: response.TotalResults,
  Results: map(response.Results, (o: VProveedorResumen) => ({
    ...o,
    familiesList: [],
    selectedFamily: null,
    needsToReload: true,
  })),
});
// DOCS: Procesa todo el objeto de configuracion devuelto y arma los objetos de acuerdo a como se van a guardar
export const buildConfigurationFromResponse = ({
  responseConf,
  familyTrademarkId,
  clientId,
  customsAgentsList,
  customsList,
  customsAgentsConceptsList,
  levelConfiguration,
  hasConfigurationAt,
  clientAddresses,
  deliveryAddressId,
  deliveryRoutesList,
  isMexican,
  incomeLevel,
  price,
  classificationId,
  productId,
}: BuildClientConfForResponseParams): IConfClient => {
  const idDeliveryRoute = getDeliveryRouteId(clientAddresses, deliveryAddressId);
  const deliveryRouteName = getDeliveryRouteName(deliveryRoutesList, idDeliveryRoute);
  return {
    ClienteFamilia: buildClienteFamilia(responseConf, clientId, familyTrademarkId),
    ConceptoAgenteAduanal: buildConceptoAgenteAduanal(responseConf, isMexican),
    ConfiguracionPrecioProveedor: buildConfiguracionPrecioProveedor(responseConf),
    ConfiguracionPrecioProveedorFamilia: buildConfiguracionPrecioProveedorFamilia(responseConf),
    configuracionTiemposLogisticos: builConfiguracionTiemposLogisticos(
      responseConf,
      idDeliveryRoute,
    ),
    selectedCustomsAgentConcept: buildSelectedCustomsAgentConcept(
      responseConf,
      isMexican,
      customsAgentsConceptsList,
    ),
    selectedCustomsAgent: buildSelectedAgent(responseConf, isMexican, customsAgentsList),
    selectedCustoms: buildSelectedCustoms(responseConf, isMexican, customsList),
    ValorConfiguracionTiempoEntrega: buildValorConfiguracionTiempoEntrega(
      responseConf,
      levelConfiguration,
      hasConfigurationAt,
      idDeliveryRoute,
      deliveryRouteName,
    ),
    ConfiguracionPrecioCliente: buildConfiguracionPrecioCliente(
      responseConf,
      levelConfiguration,
      hasConfigurationAt,
      isMexican,
      incomeLevel,
    ),
    ConfiguracionClienteFamiliaGeneral: buildConfiguracionClienteFamiliaGeneral(
      responseConf,
      levelConfiguration,
      hasConfigurationAt,
    ),
    ConfiguracionClienteFamiliaCosto: buildConfiguracionClienteFamiliaCosto(
      responseConf,
      levelConfiguration,
      hasConfigurationAt,
      price,
    ),
    ConfiguracionClienteFamiliaClasificacion: buildConfiguracionClienteFamiliaClasificacion(
      responseConf,
      levelConfiguration,
      hasConfigurationAt,
      classificationId,
    ),
    ConfiguracionClienteFamiliaProducto: buildConfiguracionClienteFamiliaProducto(
      responseConf,
      levelConfiguration,
      hasConfigurationAt,
      productId,
    ),
    selectedToggleSwitchOption: buildSelectedToggleSwitchOption(
      responseConf.ConfProveedor?.ConfiguracionPrecioProveedorFamilia,
      initialToggleSwitchOptions(),
    ),
    MarcaFamiliaProveedorConsolidacion:
      responseConf.ConfProveedor?.MarcaFamiliaProveedorConsolidacion ?? [],
    configurationPriceProvider: buildConfigurationPriceProvider(responseConf),
    MarcaFamiliaProveedor: responseConf.ConfProveedor?.MarcaFamiliaProveedor ?? {},
    needsToReload: false,
  };
};
/*DOCS: Obtener IdCatRutaEntrega de la dirección del cliente de tipo Facturación o Entrega*/

const getDeliveryRouteId = (
  clientAddresses: Array<Direccion>,
  deliveryAddressId: string,
): string => {
  // TODO la regla es que siempre se va a utilizar la direccion de entrega del cliente ya que es obligatoria para cotizarlo
  const address = find(
    clientAddresses,
    (o: Direccion) => o.IdCatTipoDireccion === deliveryAddressId,
  );
  return address?.IdCatRutaEntrega || null;
};

/*DOCS: Obtener el nombre de la ruta que le corresponde a la dirección del cliente*/
const getDeliveryRouteName = (listRutaEntrega: Array<CatRutaEntrega>, idRutaEntrega: string) => {
  let nameRutaEntrega = '';
  const filterResponse = listRutaEntrega.filter(
    (item) => item.IdCatRutaEntrega === idRutaEntrega,
  )[0];
  if (filterResponse) {
    nameRutaEntrega = filterResponse.RutaEntrega;
  }
  return nameRutaEntrega;
};

/*DOCS: Construye ClienteFamilia*/
const buildClienteFamilia = (
  response: ConfiguracionPrecioClienteObj,
  IdCliente: string,
  IdMarcaFamilia: string,
) => {
  return response.ConfCliente && response.ConfCliente.ClienteFamilia
    ? {...response.ConfCliente.ClienteFamilia}
    : {
        IdClienteFamilia: DEFAULT_UUID,
        IdCliente,
        IdMarcaFamilia,
        Activo: true,
      };
};

/*DOCS: Construye el agente aduanal que le corresponde, si el proveedor es mexicano no aplica*/
const buildConceptoAgenteAduanal = (
  response: ConfiguracionPrecioClienteObj,
  esMexicano: boolean,
) => {
  return !esMexicano && response.ConfCliente && response.ConfCliente.ConceptoAgenteAduanal
    ? {
        ...response.ConfCliente.ConceptoAgenteAduanal,
      }
    : !esMexicano && response.ConfProveedor && response.ConfProveedor.ConceptoAgenteAduanal
    ? {
        ...response.ConfProveedor.ConceptoAgenteAduanal,
      }
    : {};
};

/*DOCS: Construye ConfiguraciónPrecioProveedor*/
const buildConfiguracionPrecioProveedor = (response: ConfiguracionPrecioClienteObj) =>
  response.ConfProveedor?.ConfiguracionPrecioProveedor || {};

/*DOCS: Construye ConfiguracionPrecioProveedorFamilia*/
const buildConfiguracionPrecioProveedorFamilia = (response: ConfiguracionPrecioClienteObj) =>
  response.ConfProveedor?.ConfiguracionPrecioProveedorFamilia || {};
/*DOCS: Construye ConfiguracionDeTiemposLogisticos*/
const builConfiguracionTiemposLogisticos = (
  response: ConfiguracionPrecioClienteObj,
  deliveryRoute: string,
) => {
  return find(
    response.ConfProveedor?.ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega,
    (o: ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj) =>
      o.catRutaEntrega.IdCatRutaEntrega === deliveryRoute,
  );
};

/*DOCS: Obtiene el agente aduanal seleccionado*/
const buildSelectedAgent = (
  response: ConfiguracionPrecioClienteObj,
  esMexicano: boolean,
  customsAgentsList: Array<DropListOption>,
) => {
  return esMexicano
    ? ({} as DropListOption)
    : response.ConfCliente?.ConceptoAgenteAduanal
    ? find(
        customsAgentsList,
        (o: DropListOption) =>
          o.value.toString() === response.ConfCliente.ConceptoAgenteAduanal.IdAgenteAduanal,
      )
    : response.ConfProveedor?.ConceptoAgenteAduanal
    ? find(
        customsAgentsList,
        (o: DropListOption) =>
          o.value.toString() === response.ConfProveedor?.ConceptoAgenteAduanal?.IdAgenteAduanal,
      )
    : ({} as DropListOption);
};

/*DOCS: Construye la aduana seleccionada*/
const buildSelectedCustoms = (
  response: ConfiguracionPrecioClienteObj,
  isMexican: boolean,
  customsList: Array<DropListOption>,
) => {
  /*TODO: Buscar el concepto agente aduanal en el cliente, si no existe buscar en el proveedor*/
  if (isMexican) {
    return {} as DropListOption;
  }
  const customsAgentConcept =
    response.ConfCliente?.ConceptoAgenteAduanal || response.ConfProveedor?.ConceptoAgenteAduanal;

  const customs: DropListOption = find(
    customsList,
    (o: DropListOption) => o.value.toString() === customsAgentConcept?.IdAduana,
  );
  return customs || ({} as DropListOption);
};

/*DOCS: Construye el concepto agente aduanal seleccionada*/
const buildSelectedCustomsAgentConcept = (
  response: ConfiguracionPrecioClienteObj,
  isMexican: boolean,
  customsAgentConceptsList: Array<DropListOption>,
) => {
  if (isMexican) {
    return {} as DropListOption;
  }
  const customsAgentConcept =
    response.ConfCliente?.ConceptoAgenteAduanal || response.ConfProveedor?.ConceptoAgenteAduanal;

  const customsAgentConceptObject: DropListOption = find(
    customsAgentConceptsList,
    (o: DropListOption) => o.value.toString() === customsAgentConcept?.IdConceptoAgenteAduanal,
  );
  return customsAgentConceptObject || ({} as DropListOption);
};

const buildValorConfiguracionTiempoEntrega = (
  response: ConfiguracionPrecioClienteObj,
  levelConfiguration: string,
  hasConfigurationAt: string,
  idDeliveryRoute: string,
  deliveryRouteName: string,
) => {
  return {
    IdCatRutaEntrega: idDeliveryRoute,
    routeName: deliveryRouteName,
  };
};

const buildConfiguracionPrecioCliente = (
  response: ConfiguracionPrecioClienteObj,
  levelConfiguration: string,
  hasConfigurationAt: string,
  esMexicano: boolean,
  nivelIngreso: string,
) => {
  const confClienteExist = !!response.ConfCliente?.ConfiguracionPrecioCliente;
  const confProveedorExist = !!response.ConfProveedorUtilidadComision?.vMarcaFamiliaIndustria
    .length;
  let utilidad = confClienteExist
    ? response.ConfCliente?.ConfiguracionPrecioCliente?.Utilidad
    : null;
  if (!utilidad) {
    utilidad =
      response.ConfProveedorUtilidadComision?.vMarcaFamiliaIndustria[0]
        ?.ConfiguracionPrecioUtilidadCategoriaProveedor[0]?.UtilidadNivelIngreso;
  }
  let configuracionPrecioCliente: ConfiguracionPrecioCliente = {};
  if (confProveedorExist) {
    switch (levelConfiguration) {
      case Configs.General:
        configuracionPrecioCliente = confClienteExist
          ? {
              ...response.ConfCliente.ConfiguracionPrecioCliente,
              IdConceptoAgenteAduanal:
                !esMexicano && confClienteExist
                  ? response.ConfCliente.ConfiguracionPrecioCliente.IdConceptoAgenteAduanal
                  : !esMexicano
                  ? response.ConfProveedor?.ConfiguracionPrecioProveedor.IdConceptoAgenteAduanal
                  : null,
              FactorDeCostoFijo: response.ConfCliente.ConfiguracionPrecioCliente.FactorDeCostoFijo
                ? response.ConfCliente.ConfiguracionPrecioCliente.FactorDeCostoFijo
                : response.ConfProveedorUtilidadComision.vMarcaFamiliaIndustria[0]
                    .ConfiguracionComisionProveedor.FactorDeCostoFijo,
            }
          : {
              IdConfiguracionPrecioCliente: DEFAULT_UUID,
              IdConceptoAgenteAduanal:
                !esMexicano && confProveedorExist
                  ? response.ConfProveedor?.ConfiguracionPrecioProveedor.IdConceptoAgenteAduanal
                  : null,
              FactorDeCostoFijo: response.ConfProveedorUtilidadComision.vMarcaFamiliaIndustria[0]
                .ConfiguracionComisionProveedor.FactorDeCostoFijo
                ? response.ConfProveedorUtilidadComision.vMarcaFamiliaIndustria[0]
                    .ConfiguracionComisionProveedor.FactorDeCostoFijo
                : null,
              Utilidad: utilidad,
              FechaRegistro: DEFAULT_DATE,
              FechaUltimaActualizacion: DEFAULT_DATE,
              Activo: true,
              IdValorConfiguracionTiempoEntrega: null,
            };
        break;
      case Configs.Price:
        configuracionPrecioCliente = confClienteExist
          ? {
              ...response.ConfCliente.ConfiguracionPrecioCliente,
              IdConfiguracionPrecioCliente:
                hasConfigurationAt === 'Familia'
                  ? DEFAULT_UUID
                  : hasConfigurationAt === 'PrecioLista'
                  ? response.ConfCliente.ConfiguracionPrecioCliente.IdConfiguracionPrecioCliente
                  : DEFAULT_UUID,
              IdValorConfiguracionTiempoEntrega:
                hasConfigurationAt === 'Familia'
                  ? null
                  : hasConfigurationAt === 'PrecioLista'
                  ? response.ConfCliente.ConfiguracionPrecioCliente
                      .IdValorConfiguracionTiempoEntrega
                  : DEFAULT_UUID,
              IdConceptoAgenteAduanal:
                !esMexicano && confClienteExist
                  ? response.ConfCliente.ConfiguracionPrecioCliente.IdConceptoAgenteAduanal
                  : !esMexicano
                  ? response.ConfProveedor?.ConfiguracionPrecioProveedor.IdConceptoAgenteAduanal
                  : null,
              FactorDeCostoFijo: response.ConfCliente.ConfiguracionPrecioCliente.FactorDeCostoFijo
                ? response.ConfCliente.ConfiguracionPrecioCliente.FactorDeCostoFijo
                : response.ConfProveedorUtilidadComision.vMarcaFamiliaIndustria[0]
                    .ConfiguracionComisionProveedor.FactorDeCostoFijo,
            }
          : {
              IdConfiguracionPrecioCliente: DEFAULT_UUID,
              IdConceptoAgenteAduanal:
                !esMexicano && confProveedorExist
                  ? response.ConfProveedor?.ConfiguracionPrecioProveedor.IdConceptoAgenteAduanal
                  : null,
              FactorDeCostoFijo: response.ConfProveedorUtilidadComision.vMarcaFamiliaIndustria[0]
                .ConfiguracionComisionProveedor.FactorDeCostoFijo
                ? response.ConfProveedorUtilidadComision.vMarcaFamiliaIndustria[0]
                    .ConfiguracionComisionProveedor.FactorDeCostoFijo
                : null,
              Utilidad: utilidad,
              FechaRegistro: DEFAULT_DATE,
              FechaUltimaActualizacion: DEFAULT_DATE,
              Activo: true,
              IdValorConfiguracionTiempoEntrega: null,
            };
        break;
      case Configs.Classification:
        configuracionPrecioCliente = confClienteExist
          ? {
              ...response.ConfCliente.ConfiguracionPrecioCliente,
              IdConfiguracionPrecioCliente:
                hasConfigurationAt === 'Familia'
                  ? DEFAULT_UUID
                  : hasConfigurationAt === 'AgrupadorCaracteristica'
                  ? response.ConfCliente.ConfiguracionPrecioCliente.IdConfiguracionPrecioCliente
                  : DEFAULT_UUID,
              IdValorConfiguracionTiempoEntrega:
                hasConfigurationAt === 'Familia'
                  ? null
                  : hasConfigurationAt === 'AgrupadorCaracteristica'
                  ? response.ConfCliente.ConfiguracionPrecioCliente
                      .IdValorConfiguracionTiempoEntrega
                  : DEFAULT_UUID,
              IdConceptoAgenteAduanal:
                !esMexicano && confClienteExist
                  ? response.ConfCliente.ConfiguracionPrecioCliente.IdConceptoAgenteAduanal
                  : !esMexicano
                  ? response.ConfProveedor?.ConfiguracionPrecioProveedor.IdConceptoAgenteAduanal
                  : null,
              FactorDeCostoFijo: response.ConfCliente.ConfiguracionPrecioCliente.FactorDeCostoFijo
                ? response.ConfCliente.ConfiguracionPrecioCliente.FactorDeCostoFijo
                : response.ConfProveedorUtilidadComision.vMarcaFamiliaIndustria[0]
                    .ConfiguracionComisionProveedor.FactorDeCostoFijo,
            }
          : {
              IdConfiguracionPrecioCliente: DEFAULT_UUID,
              IdConceptoAgenteAduanal:
                !esMexicano && confProveedorExist
                  ? response.ConfProveedor?.ConfiguracionPrecioProveedor.IdConceptoAgenteAduanal
                  : null,
              FactorDeCostoFijo: response.ConfProveedorUtilidadComision.vMarcaFamiliaIndustria[0]
                .ConfiguracionComisionProveedor.FactorDeCostoFijo
                ? response.ConfProveedorUtilidadComision.vMarcaFamiliaIndustria[0]
                    .ConfiguracionComisionProveedor.FactorDeCostoFijo
                : null,
              Utilidad: utilidad,
              FechaRegistro: DEFAULT_DATE,
              FechaUltimaActualizacion: DEFAULT_DATE,
              Activo: true,
              IdValorConfiguracionTiempoEntrega: null,
            };
        break;
      case Configs.Product:
        configuracionPrecioCliente = confClienteExist
          ? {
              ...response.ConfCliente.ConfiguracionPrecioCliente,
              IdConfiguracionPrecioCliente:
                hasConfigurationAt === 'Producto'
                  ? response.ConfCliente.ConfiguracionPrecioCliente.IdConfiguracionPrecioCliente
                  : DEFAULT_UUID,
              IdValorConfiguracionTiempoEntrega:
                hasConfigurationAt === 'Familia'
                  ? null
                  : hasConfigurationAt === 'Producto'
                  ? response.ConfCliente.ConfiguracionPrecioCliente
                      .IdValorConfiguracionTiempoEntrega
                  : DEFAULT_UUID,
              IdConceptoAgenteAduanal:
                !esMexicano && confClienteExist
                  ? response.ConfCliente.ConfiguracionPrecioCliente.IdConceptoAgenteAduanal
                  : !esMexicano
                  ? response.ConfProveedor?.ConfiguracionPrecioProveedor.IdConceptoAgenteAduanal
                  : null,
              FactorDeCostoFijo: response.ConfCliente.ConfiguracionPrecioCliente.FactorDeCostoFijo
                ? response.ConfCliente.ConfiguracionPrecioCliente.FactorDeCostoFijo
                : response.ConfProveedorUtilidadComision.vMarcaFamiliaIndustria[0]
                    .ConfiguracionComisionProveedor.FactorDeCostoFijo,
            }
          : {
              IdConfiguracionPrecioCliente: DEFAULT_UUID,
              IdConceptoAgenteAduanal:
                !esMexicano && confProveedorExist
                  ? response.ConfProveedor?.ConfiguracionPrecioProveedor.IdConceptoAgenteAduanal
                  : null,
              FactorDeCostoFijo: response.ConfProveedorUtilidadComision.vMarcaFamiliaIndustria[0]
                .ConfiguracionComisionProveedor.FactorDeCostoFijo
                ? response.ConfProveedorUtilidadComision.vMarcaFamiliaIndustria[0]
                    .ConfiguracionComisionProveedor.FactorDeCostoFijo
                : null,
              Utilidad: utilidad,
              FechaRegistro: DEFAULT_DATE,
              FechaUltimaActualizacion: DEFAULT_DATE,
              Activo: true,
              IdValorConfiguracionTiempoEntrega: null,
            };
        break;
    }
  }
  return configuracionPrecioCliente;
};
const buildConfiguracionClienteFamiliaGeneral = (
  response: ConfiguracionPrecioClienteObj,
  levelConfiguration: string,
  hasConfigurationAt: string,
) => {
  return response.ConfCliente && response.ConfCliente.ConfiguracionClienteFamiliaGeneral
    ? {...response.ConfCliente.ConfiguracionClienteFamiliaGeneral}
    : {
        Activo: true,
        IdClienteFamilia:
          response.ConfCliente && response.ConfCliente.ClienteFamilia
            ? response.ConfCliente.ClienteFamilia.IdClienteFamilia
            : DEFAULT_UUID,
        IdConfiguracionClienteFamiliaGeneral: DEFAULT_UUID,
        IdConfiguracionPrecioCliente:
          (levelConfiguration === 'general' ||
            (levelConfiguration === 'price' && hasConfigurationAt === 'Familia') ||
            (levelConfiguration === 'classification' && hasConfigurationAt === 'Familia') ||
            (levelConfiguration === 'product' && hasConfigurationAt === 'Producto')) &&
          response.ConfCliente &&
          response.ConfCliente.ConfiguracionPrecioCliente
            ? response.ConfCliente.ConfiguracionPrecioCliente.IdConfiguracionPrecioCliente
            : DEFAULT_UUID,
        Vigencia: null,
      };
};
const buildConfiguracionClienteFamiliaCosto = (
  response: ConfiguracionPrecioClienteObj,
  levelConfiguration: string,
  hasConfigurationAt: string,
  price: number,
) => {
  return response.ConfCliente && response.ConfCliente.ConfiguracionClienteFamiliaCosto
    ? {...response.ConfCliente.ConfiguracionClienteFamiliaCosto}
    : {
        Activo: true,
        Costo: levelConfiguration === 'price' && price ? price : null,
        IdClienteFamilia:
          response.ConfCliente && response.ConfCliente.ClienteFamilia
            ? response.ConfCliente.ClienteFamilia.IdClienteFamilia
            : DEFAULT_UUID,
        IdConfiguracionClienteFamiliaCosto: DEFAULT_UUID,
        IdConfiguracionPrecioCliente:
          levelConfiguration === 'price' &&
          hasConfigurationAt === 'PrecioLista' &&
          response.ConfCliente &&
          response.ConfCliente.ConfiguracionPrecioCliente
            ? response.ConfCliente.ConfiguracionPrecioCliente.IdConfiguracionPrecioCliente
            : DEFAULT_UUID,
        Vigencia: null,
      };
};
const buildConfiguracionClienteFamiliaClasificacion = (
  response: ConfiguracionPrecioClienteObj,
  levelConfiguration: string,
  hasConfigurationAt: string,
  classificationId: string,
) => {
  return response.ConfCliente && response.ConfCliente.ConfiguracionClienteFamiliaClasificacion
    ? {...response.ConfCliente.ConfiguracionClienteFamiliaClasificacion}
    : {
        Activo: true,
        IdClienteFamilia:
          response.ConfCliente && response.ConfCliente.ClienteFamilia
            ? response.ConfCliente.ClienteFamilia.IdClienteFamilia
            : DEFAULT_UUID,
        IdConfiguracionClienteFamiliaClasificacion: DEFAULT_UUID,
        IdConfiguracionPrecioCliente:
          levelConfiguration === 'classification' &&
          hasConfigurationAt === 'AgrupadorCaracteristica' &&
          response.ConfCliente &&
          response.ConfCliente.ConfiguracionPrecioCliente
            ? response.ConfCliente.ConfiguracionPrecioCliente.IdConfiguracionPrecioCliente
            : DEFAULT_UUID,
        IdAgrupadorCaracteristica: classificationId,
        Vigencia: null,
      };
};
const buildConfiguracionClienteFamiliaProducto = (
  response: ConfiguracionPrecioClienteObj,
  levelConfiguration: string,
  hasConfigurationAt: string,
  idProducto: string,
) => {
  return response.ConfCliente && response.ConfCliente.ConfiguracionClienteFamiliaProducto
    ? {...response.ConfCliente.ConfiguracionClienteFamiliaProducto}
    : {
        Activo: true,
        IdClienteFamilia:
          response.ConfCliente && response.ConfCliente.ClienteFamilia
            ? response.ConfCliente.ClienteFamilia.IdClienteFamilia
            : DEFAULT_UUID,
        IdConfiguracionClienteFamiliaProducto: DEFAULT_UUID,
        IdConfiguracionPrecioCliente:
          levelConfiguration === 'product' &&
          hasConfigurationAt === 'Producto' &&
          response.ConfCliente &&
          response.ConfCliente.ConfiguracionPrecioCliente
            ? response.ConfCliente.ConfiguracionPrecioCliente.IdConfiguracionPrecioCliente
            : DEFAULT_UUID,
        Idproducto: idProducto,
        Vigencia: null,
      };
};
const buildConfigurationPriceProvider = (
  response: ConfiguracionPrecioClienteObj,
): IConfigurationPriceProvider => {
  return !!response.ConfProveedorUtilidadComision?.vMarcaFamiliaIndustria.length
    ? {
        ComisionFrenteComercial:
          response.ConfProveedorUtilidadComision?.vMarcaFamiliaIndustria[0]
            .ConfiguracionComisionProveedor.ComisionFrenteComercial,
        ComisionPharma:
          response.ConfProveedorUtilidadComision?.vMarcaFamiliaIndustria[0]
            .ConfiguracionComisionProveedor.ComisionPharma,
        incomeLevel:
          response.ConfProveedorUtilidadComision?.vMarcaFamiliaIndustria[0]
            ?.ConfiguracionPrecioUtilidadCategoriaProveedor[0]?.catNivelIngreso?.NivelIngreso,
      }
    : {};
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
export const buildIVTrademarkFamilyAfterClienteFamilia = (
  selectedFamily: IVTrademarkFamily,
  id: string,
) => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
    ClienteFamilia: {
      ...selectedFamily.actualConfiguration.ClienteFamilia,
      IdClienteFamilia: id,
    },
    ConfiguracionClienteFamiliaGeneral: {
      ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaGeneral,
      IdClienteFamilia: id,
    },
    ConfiguracionClienteFamiliaCosto: {
      ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaCosto,
      IdClienteFamilia: id,
    },
    ConfiguracionClienteFamiliaClasificacion: {
      ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaClasificacion,
      IdClienteFamilia: id,
    },
    ConfiguracionClienteFamiliaProducto: {
      ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaProducto,
      IdClienteFamilia: id,
    },
  },
});
export const buildIVTrademarkFamilyAfterValorConfiguracionTiempoEntrega = (
  selectedFamily: IVTrademarkFamily,
  id: string,
) => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
    ValorConfiguracionTiempoEntrega: {
      ...selectedFamily.actualConfiguration.ValorConfiguracionTiempoEntrega,
      IdValorConfiguracionTiempoEntrega: id,
    },
    ConfiguracionPrecioCliente: {
      ...selectedFamily.actualConfiguration.ConfiguracionPrecioCliente,
      IdValorConfiguracionTiempoEntrega: id,
    },
  },
});
export const buildIVTrademarkFamilyAfterConfiguracionPrecioCliente = (
  selectedFamily: IVTrademarkFamily,
  id: string,
  configurationType: string,
) => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
    ConfiguracionPrecioCliente: {
      ...selectedFamily.actualConfiguration.ConfiguracionPrecioCliente,
      IdConfiguracionPrecioCliente: id,
    },
    ConfiguracionClienteFamiliaGeneral:
      configurationType === Levels.Family
        ? {
            ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaGeneral,
            IdConfiguracionPrecioCliente: id,
          }
        : {
            ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaGeneral,
          },
    ConfiguracionClienteFamiliaCosto:
      configurationType === Levels.listPrice
        ? {
            ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaCosto,
            IdConfiguracionPrecioCliente: id,
          }
        : {
            ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaCosto,
          },
    ConfiguracionClienteFamiliaClasificacion:
      configurationType === Levels.CharacteristicGrouper
        ? {
            ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaClasificacion,
            IdConfiguracionPrecioCliente: id,
          }
        : {
            ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaClasificacion,
          },
    ConfiguracionClienteFamiliaProducto:
      configurationType === Levels.Product
        ? {
            ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaProducto,
            IdConfiguracionPrecioCliente: id,
          }
        : {
            ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaProducto,
          },
  },
});
export const buildIVTrademarkFamilyAfterConfiguracionClienteFamiliaGeneral = (
  selectedFamily: IVTrademarkFamily,
  id: string,
): IVTrademarkFamily => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
    ConfiguracionClienteFamiliaGeneral: {
      ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaGeneral,
      IdConfiguracionClienteFamiliaGeneral: id,
    },
  },
  generalConfiguration: {
    ...selectedFamily.actualConfiguration,
    needsToReload: true,
    ConfiguracionClienteFamiliaGeneral: {
      ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaGeneral,
      IdConfiguracionClienteFamiliaGeneral: id,
    },
  },
});
export const buildIVTrademarkFamilyAfterConfiguracionClientePrecio = (
  selectedFamily: IVTrademarkFamily,
  id: string,
) => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
    ConfiguracionClienteFamiliaCosto: {
      ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaCosto,
      IdConfiguracionClienteFamiliaCosto: id,
    },
  },
  prices: {
    ...selectedFamily.prices,
    pricesList: {
      ...selectedFamily.prices.pricesList,
      Results: map(
        selectedFamily.prices.pricesList.Results,
        (o: IVProductListPriceConfigurationClient) => {
          if (o.isSelected) {
            return {
              ...o,
              needsToReload: true,
              NivelConfiguracionProductoCliente: Levels.listPrice,
              Temporal: !!selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaCosto
                .Vigencia,
              configuration: {
                ...selectedFamily.actualConfiguration,
                configuracionClienteFamiliaCosto: {
                  ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaCosto,
                  IdConfiguracionClienteFamiliaCosto: id,
                },
              },
            } as IVProductListPriceConfigurationClient;
          } else {
            return {...o};
          }
        },
      ),
    },
  },
});

export const buildIVTrademarkFamilyAfterConfiguracionClienteClasificacion = (
  selectedFamily: IVTrademarkFamily,
  id: string,
): IVTrademarkFamily => ({
  ...selectedFamily,
  actualConfiguration: {
    ...selectedFamily.actualConfiguration,
    ConfiguracionClienteFamiliaClasificacion: {
      ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaClasificacion,
      IdConfiguracionClienteFamiliaClasificacion: id,
    },
  },
  classifications: {
    ...selectedFamily.classifications,
    classificationsList: {
      ...selectedFamily.classifications.classificationsList,
      Results: map(
        selectedFamily.classifications.classificationsList.Results,
        (o: IVClientProductClassification): IVClientProductClassification => {
          if (o.isSelected) {
            return {
              ...o,
              needsToReload: true,
              NivelConfiguracionProductoCliente: Levels.CharacteristicGrouper,
              configuration: {
                ...selectedFamily.actualConfiguration,
                ConfiguracionClienteFamiliaClasificacion: {
                  ...selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaClasificacion,
                  IdConfiguracionClienteFamiliaClasificacion: id,
                },
              },
            };
          } else {
            return {...o};
          }
        },
      ),
    },
  },
});

export const buildIVTrademarkFamilyAfterConfiguracionClienteProducto = (
  selectedFamily$: IVTrademarkFamily,
  id: string,
): IVTrademarkFamily => ({
  ...selectedFamily$,
  actualConfiguration: {
    ...selectedFamily$.actualConfiguration,
    ConfiguracionClienteFamiliaClasificacion: {
      ...selectedFamily$.actualConfiguration.ConfiguracionClienteFamiliaClasificacion,
      IdConfiguracionClienteFamiliaClasificacion: id,
    },
  },
  products: {
    ...selectedFamily$.products,
    productsList: {
      ...selectedFamily$.products.productsList,
      Results: map(
        selectedFamily$.products.productsList.Results,
        (o: IVClientProductConfiguration): IVClientProductConfiguration => {
          if (o.isSelected) {
            return {
              ...o,
              needsToReload: true,
              NivelConfiguracionProductoCliente: Levels.Product,
              configuration: {
                ...selectedFamily$.actualConfiguration,
                ConfiguracionClienteFamiliaProducto: {
                  ...selectedFamily$.actualConfiguration.ConfiguracionClienteFamiliaProducto,
                  IdConfiguracionClienteFamiliaProducto: id,
                },
              },
            };
          } else {
            return {...o};
          }
        },
      ),
    },
  },
});

export const paramsPriceListConfiguration = (
  item: IVProductListPriceConfigurationClient,
  clientId: string,
  selectedFamily: IVTrademarkFamily,
): ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorParams => ({
  IdCliente: clientId,
  PrecioLista: item.PrecioLista,
  NivelConfiguracionCliente: item.NivelConfiguracionProductoCliente
    ? item.NivelConfiguracionProductoCliente
    : 'null',
  NivelConfiguracionProveedor: item.NivelConfiguracionProductoProveedor
    ? item.NivelConfiguracionProductoProveedor
    : 'null',
  IdMarcaFamiliaProveedor: selectedFamily.IdMarcaFamiliaProveedor,
});

export const paramsCharacteristicGrouperListConfiguration = (
  data,
  clientId: string,
  selectedFamily: IVTrademarkFamily,
): ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorParams => ({
  IdCliente: clientId,
  NivelConfiguracionCliente: data.NivelConfiguracionProductoCliente
    ? data.NivelConfiguracionProductoCliente
    : 'null',
  NivelConfiguracionProveedor: data.NivelConfiguracionProductoProveedor
    ? data.NivelConfiguracionProductoProveedor
    : 'null',
  IdMarcaFamiliaProveedor: selectedFamily.IdMarcaFamiliaProveedor,
  IdAgrupadorCaracteristica: data.IdAgrupadorCaracteristica,
});

export const paramsProductListConfiguration = (
  data: IVClientProductConfiguration,
  clientId: string,
  selectedFamily: IVTrademarkFamily,
  hasConfigurationAt: string,
  hasConfigurationProviderAt: string,
): ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorParams => {
  const params: ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedorParams = {
    IdCliente: clientId,
    NivelConfiguracionCliente: data.NivelConfiguracionProductoCliente
      ? data.NivelConfiguracionProductoCliente
      : 'null',
    NivelConfiguracionProveedor: data.NivelConfiguracionProductoProveedor
      ? data.NivelConfiguracionProductoProveedor
      : 'null',
    IdProducto: data.IdProducto,
    IdMarcaFamiliaProveedor: selectedFamily.IdMarcaFamiliaProveedor,
  };
  if (hasConfigurationAt === 'PrecioLista') {
    params.PrecioLista = data.PrecioLista;
  }
  if (
    hasConfigurationAt === 'AgrupadorCaracteristica' ||
    hasConfigurationProviderAt === 'AgrupadorCaracteristica'
  ) {
    params.IdAgrupadorCaracteristica = data.IdAgrupadorCaracteristica;
  }
  return params;
};

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
