import * as apiLogistic from 'api-logistica';
import {
  GMEstrategia,
  PartidaCotizacionTasaConversionObj,
  QueryInfo,
  QueryResultGraficaEntregaPartidaPedidoObj,
  QueryResultListaEntregaPartidaPedidoObj,
  QueryResultPartidaCotizacionTasaConversionObj,
  TotalPedidoEntregaObj,
  VCotCotizacion,
} from 'api-logistica';
import {addRowIndex} from '@appUtil/util';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_LOADING,
  DEFAULT_DATE,
  DEFAULT_UUID,
  MOBILE,
  PAGING_LIMIT,
  PHONE_1,
  PHONE_2,
  STATUS_PURCHASE_PROMISE,
} from '@appUtil/common.protocols';
import {
  IAjOfEstrategiaCotizacion,
  IAjOfEstrategiaCotizacionTactica,
  IItemQuotation,
  initialBrands,
  initialQuotationStrategy,
  IQueryResultIItemQuotation,
  IQuotation,
  IQuotationStrategyData,
  IQuotationStrategyResponse,
  IQuotationStrategyTactic,
  ITabs,
  IVClientStrategy,
  QuotationClientInfo,
  QuotationsList,
  StrategyDetailsState,
} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';
import {filter, find, findIndex, flow, forEach, isEmpty, map, orderBy, reduce} from 'lodash-es';
import * as apiCatalogs from 'api-catalogos';
import {VCliente} from 'api-catalogos';
import {IContact, IContactWithId} from '@appModels/catalogos/contacto/contacto';
import {IStrategyByClient} from '@appModels/store/pendings/strategy/strategy-dashboard/strategy-dashboard.model';
import {initialContentStrategyState} from '@appModels/store/pendings/strategy/strategy-details/details/sections/content-strategy.models';
import {
  IDefaultertState,
  IDeliveryState,
  IOfferState,
} from '@appModels/store/pendings/strategy/strategy-details/details/sections/offer/offer.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {FacturasPendientesClienteObj} from 'api-finanzas';

// --- DOCS: INICIALIZADOR GENERAL
const initialStrategyDetails = (): StrategyDetailsState => ({
  selectedClient: {} as IStrategyByClient,
  generalDataClient: {} as QuotationClientInfo,
  contact: {} as IContact,
  brandsContract: initialBrands(),
  quotations: initialQuotationsList(),
  selectedQuotation: {} as IQuotation,
  freightSelectedQuote: null,
  itemsQuotationStatus: API_REQUEST_STATUS_LOADING,
  itemsQuotationSelected: initialItemSelectedQuotation(),
  brandsSelectedQuotation: [],
  brandSelectedFilter: null,
  quotationStrategy: initialQuotationStrategy(),
  contentStrategySection: initialContentStrategyState(),
  tabs: initialTabs(),
  offerSection: initialOfferState(),
  queryInfo: initialClientQueryInfo(),
});

const initialItemSelectedQuotation = (): IQueryResultIItemQuotation => ({
  Results: [],
  TotalResults: 0,
});

const initialClientQueryInfo = (): QueryInfo => ({
  Filters: [],
  SortDirection: 'asc',
  SortField: 'Descripcion',
  desiredPage: 0,
  pageSize: PAGING_LIMIT,
});

const initialIAjOfEstrategiaCotizacionTactica = (): IAjOfEstrategiaCotizacionTactica => ({
  IdCatEstrategiaCotizacionSubtactica: null,
  Justificacion: null,
  IdCatEstrategiaCotizacionTactica: null,
});

const initialGmStrategy = (): GMEstrategia => ({
  ListaIdcotCotizacion: [],
  ajOfEstrategiaCotizacion: {} as IAjOfEstrategiaCotizacion,
  ajOfEstrategiaCotizacionTactica: [],
});

export const initialTabs = (): ITabs => ({
  tabsOptions: [
    {
      id: '1',
      label: 'Oferta',
    },
    {
      id: '2',
      label: 'Relación',
    },
    {
      id: '3',
      label: 'Contacto',
    },
    {
      id: '4',
      label: 'Smart Business',
    },
  ],
  tabSelected: {
    id: '1',
    label: 'Oferta',
  },
});

// export const initialItemsQuotationSelected = (): ItemsQuotationSelected => ({
//   itemsQuotationStatus: API_REQUEST_STATUS_DEFAULT,
//   itemsQuotation: [],
// });
export const initialQuotationsList = (): QuotationsList => ({
  listQuotesStatus: API_REQUEST_STATUS_DEFAULT,
  quotationsList: [],
});

//DOCS: INICIALIZADORES DE LA SECCIÓN DE OFERTA
const initialOfferState = (): IOfferState => ({
  searchTerm: '',
  selectedBrand: {value: DEFAULT_UUID, label: 'Todas'},
  listTypesOfSearch: initialOptions(),
  typeOfSearch: initialOptions()[0],
  defaulter: {
    ...initialIDefaulter(),
  },
  delivery: {
    ...initialIDelivery(),
  },
});

const initialIDefaulter = (): IDefaultertState => ({
  dataPendingInvoices: {} as FacturasPendientesClienteObj,
  needsToReloadPendingInvoices: true,
  dataPendingInvoiceStatus: API_REQUEST_STATUS_DEFAULT,
  dataByType: [
    {value: '1', label: 'Más Nuevas'},
    {value: '2', label: 'Más Antiguas'},
  ],
  filterByType: {value: '1', label: 'Más Recientes'},
});

const initialOptions = (): Array<DropListOption> => [
  {value: '1', label: 'Catálogo'},
  {value: '2', label: 'Concepto'},
  {value: '3', label: 'Marca'},
];

const initialIDelivery = (): IDeliveryState => ({
  listDeliveries: {} as QueryResultListaEntregaPartidaPedidoObj,
  dataChartDelivery: {} as QueryResultGraficaEntregaPartidaPedidoObj,
  totalDeliveries: {} as TotalPedidoEntregaObj,
  needsToReloadDataDeliveries: true,
  dataDeliveriesStatus: API_REQUEST_STATUS_DEFAULT,
});

const initialQuotation = (): IQuotation => ({
  Activo: false,
  AgregarDatosFacturacion: false,
  Ajustada: false,
  Caducada: false,
  ComentarioFlete: '',
  Consecutivo: 0,
  DiasDePagoAdicionales: 0,
  DiasDePagoAdicionalesDeOrigen: 0,
  DiasDePagoDeOrigen: 0,
  Enviado: false,
  EstadoCotizacion: '',
  FechaCaducidad: '',
  FechaCotizacion: '',
  FechaEnvio: '',
  FechaLectura: '',
  FechaRecepcion: '',
  FechaRegistro: '',
  FechaUltimaActualizacion: '',
  FleteDesglosado: false,
  Folio: '',
  IdCatCondicionesDePago: '',
  IdCatCondicionesDePagoDeOrigen: '',
  IdCatEstadoCotizacion: '',
  IdCatMoneda: '',
  IdCatNivelIngreso: '',
  IdCatTipoCotizacion: '',
  IdCatZona: '',
  IdCliente: '',
  IdContacto: '',
  IdContactoCliente: '',
  IdCotCotizacion: '',
  IdDatosFacturacionCliente: '',
  IdDireccion: '',
  IdEmpresa: '',
  IdFlete: '',
  IdSolicitudAutorizacionCambio: '',
  IdUsuarioTramita: '',
  Leido: false,
  NivelIngreso: '',
  Nombre: '',
  Piezas: 0,
  Recibido: false,
  TipoCotizacion: '',
  TotalArchivos: 0,
  TotalControlados: 0,
  TotalCotizado: 0,
  TotalNoControlados: 0,
  TotalProductos: 0,
  TotalUSDPartidas: 0,
  montoFlete: 0,
  subtotalFlete: 0,
  subtotalIVA: 0,
  subtotalPartidas: 0,
  isSelected: false,
  Index: 0,
  needsToReloadGeneralData: false,
  needsToReloadContact: false,
  needsToReloadItemQuotation: false,
  // itemsQuotation: [],
  UsuarioTramita: '',
});

export const buildClientAddImage = (response: VCliente): IVClientStrategy => {
  return {
    ...response,
    image: `assets/Images/logos/${response?.NombreImagen?.replace(' ', '')}.png`,
    imageHover: `assets/Images/logos/${response?.NombreImagen?.replace(' ', '')}_hover.png`,
  };
};
const buildQuotationsListFromResponseStrategy = (
  quotationsList: Array<VCotCotizacion>,
): Array<IQuotation> => {
  quotationsList = addRowIndex(0, 0, quotationsList);
  return map(
    quotationsList,
    (o: VCotCotizacion, index: number): IQuotation => ({
      ...o,
      isSelected: index === 0,
      needsToReloadInfo: true,
    }),
  );
};

const totalByPercentage = (states: Array<apiLogistic.EstadoTasasConversionObj>): number => {
  return reduce(
    states,
    (percentage, state) => {
      return state.Estado === STATUS_PURCHASE_PROMISE ? state.Porcentaje : percentage;
    },
    0,
  );
  // return totalPercentage * 100;
};

const buildItemsQuotationFromResponse = (
  response: QueryResultPartidaCotizacionTasaConversionObj,
): IQueryResultIItemQuotation => ({
  ...response,
  Results: map(
    response.Results,
    (o: PartidaCotizacionTasaConversionObj, index): IItemQuotation => ({
      ...o,
      PorcentajeTasasConversionMarca: !isEmpty(o.TasasConversionObj)
        ? totalByPercentage(o.TasasConversionObj.Estados)
        : 0,
      PorcentajeTasasConversionTipo: !isEmpty(o.TasasConversionObjTipo)
        ? totalByPercentage(o.TasasConversionObjTipo.Estados)
        : 0,
      popUpByType: {
        isOpen: false,
        isInRange: false,
        elementId: `type_${o.IdCotPartidaCotizacion}`,
        target: null,
        position: 'top-start',
        zIndex: 2,
      },
      popUpByBrand: {
        isOpen: false,
        isInRange: false,
        elementId: `brand_${o.IdCotPartidaCotizacion}`,
        target: null,
        position: 'top-start',
        zIndex: 2,
      },
      PartidasHijas: orderBy(
        map(o.PartidasHijas, (child: PartidaCotizacionTasaConversionObj) => ({
          ...child,
          PorcentajeTasasConversionMarca: !isEmpty(child.TasasConversionObj)
            ? totalByPercentage(child.TasasConversionObj.Estados)
            : 0,
          PorcentajeTasasConversionTipo: !isEmpty(child.TasasConversionObjTipo)
            ? totalByPercentage(child.TasasConversionObjTipo.Estados)
            : 0,
          popUpByType: {
            isOpen: false,
            isInRange: false,
            elementId: `type_${child.IdCotPartidaCotizacion}`,
            target: null,
            position: 'top-start',
            zIndex: 2,
          },
          popUpByBrand: {
            isOpen: false,
            isInRange: false,
            elementId: `brand_${child.IdCotPartidaCotizacion}`,
            target: null,
            position: 'top-start',
            zIndex: 2,
          },
          imageHover: `assets/Images/logos/${child.NombreImagenMarca?.toLowerCase()}_hover.svg`,
        })),
        'NumeroDePiezas',
      ),
      imageHover: `assets/Images/logos/${o.NombreImagenMarca?.toLowerCase()}_hover.svg`,
    }),
  ),
});

const buildStrategyStructureFromResponse = (
  quotationStrategy: IQuotationStrategyResponse,
): Array<IQuotationStrategyTactic> => {
  return map(quotationStrategy.listQuotationStrategyTactic, (item) => ({
    ...item,
    isSelected: false,
    listSubTactic: flow([
      () =>
        filter(
          quotationStrategy.listQuotationStrategySubTactic,
          (subTactic) =>
            subTactic.IdCatEstrategiaCotizacionTactica === item.IdCatEstrategiaCotizacionTactica,
        ),
      (subTactics) =>
        subTactics.length > 0
          ? map(subTactics, (subTactic) => ({
              ...subTactic,
              isSelected: false,
              Activo: false,
              ajOfQuotationStrategyTactic: flow([
                () => {
                  return {
                    Activo: false,
                    FechaRegistro: DEFAULT_DATE,
                    FechaUltimaActualizacion: DEFAULT_DATE,
                    IdAjOfEstrategiaCotizacion: DEFAULT_UUID,
                    IdAjOfEstrategiaCotizacionTactica: DEFAULT_UUID,
                    IdCatEstrategiaCotizacionSubtactica:
                      subTactic.IdCatEstrategiaCotizacionSubtactica,
                    IdCatEstrategiaCotizacionTactica: item.IdCatEstrategiaCotizacionTactica,
                    Justificacion: '',
                    Observaciones: '',
                  };
                },
              ])(),
            }))
          : flow([
              () => {
                return [
                  {
                    isSelected: false,
                    Activo: false,
                    ajOfQuotationStrategyTactic: {
                      Activo: false,
                      FechaRegistro: DEFAULT_DATE,
                      FechaUltimaActualizacion: DEFAULT_DATE,
                      IdAjOfEstrategiaCotizacion: DEFAULT_UUID,
                      IdAjOfEstrategiaCotizacionTactica: DEFAULT_UUID,
                      IdCatEstrategiaCotizacionSubtactica: null,
                      IdCatEstrategiaCotizacionTactica: item.IdCatEstrategiaCotizacionTactica,
                      Justificacion: '',
                      Observaciones: '',
                    },
                  },
                ];
              },
            ])(),
    ])(),
  }));
};

const patchContactClientStrategy = (
  contacts: apiCatalogs.QueryResultContactoDetalleObj,
  typePhones: Array<apiCatalogs.CatTipoNumeroTelefonico>,
  idContactClient: string,
): Array<IContact> => {
  let data: Array<IContact> = [];
  let results: Array<IContactWithId> = [];
  if (contacts.Results.length > 0) {
    results = map(contacts.Results, (o) => ({
      ...o,
      IdContactoCliente: idContactClient,
    }));

    const getEmail = (
      emails: Array<apiCatalogs.CorreoElectronico>,
    ): apiCatalogs.CorreoElectronico => {
      if (emails.length > 0) {
        return emails[0];
      }
      return {} as apiCatalogs.CorreoElectronico;
    };
    const getPhone = (
      phones: Array<apiCatalogs.VNumeroTelefonico>,
      idTypePhone: string,
    ): apiCatalogs.VNumeroTelefonico => {
      const index = findIndex(phones, (o) => o.IdCatTipoNumeroTelefonico === idTypePhone);
      if (index !== -1) {
        return phones[index];
      }
      return {} as apiCatalogs.VNumeroTelefonico;
    };
    data = map(
      results,
      (contact: IContactWithId): IContact => {
        return {
          Activo: contact.Activo,
          AgregadoExpo: contact.AgregadoExpo,
          ApellidoMaterno: contact.ApellidoMaterno,
          ApellidoPaterno: contact.ApellidoPaterno,
          Departamento: contact.Departamento,
          Dificultad: contact.Dificultad,
          FechaRegistro: contact.FechaRegistro,
          FechaUltimaActualizacion: contact.FechaUltimaActualizacion,
          IdCatDificultad: contact.IdCatDificultad,
          IdCatMantenimiento: contact.IdCatMantenimiento,
          IdCatNivelDecision: contact.IdCatNivelDecision,
          IdCatNivelPuesto: contact.IdCatNivelPuesto,
          IdContacto: contact.IdContacto,
          IdDatosPersona: contact.IdDatosPersona,
          Mantenimiento: contact.Mantenimiento,
          NivelDecision: contact.NivelDecision,
          NivelPuesto: contact.NivelPuesto,
          Nombres: contact.Nombres,
          OrigenRegistro: contact.OrigenRegistro,
          Prioridad: contact.Prioridad,
          PrioridadContacto: contact.PrioridadContacto,
          Puesto: contact.Puesto,
          Titulo: contact.Titulo,
          IdContactoCliente: contact.IdContactoCliente,
          Email: getEmail(contact.CorreoElectronico),
          Phone1: getPhone(
            contact.NumeroTelefonico,
            find(
              typePhones,
              (o: apiCatalogs.CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === PHONE_1,
            )?.IdCatTipoNumeroTelefonico,
          ),
          Phone2: getPhone(
            contact.NumeroTelefonico,
            find(
              typePhones,
              (o: apiCatalogs.CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === PHONE_2,
            )?.IdCatTipoNumeroTelefonico,
          ),
          Mobile: getPhone(
            contact.NumeroTelefonico,
            find(
              typePhones,
              (o: apiCatalogs.CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === MOBILE,
            )?.IdCatTipoNumeroTelefonico,
          ),
        };
      },
    );
  }

  return data;
};

const buildRequestForStrategySave = (
  quotationStrategy: IQuotationStrategyData,
  listQuotes: Array<IQuotation>,
): GMEstrategia => {
  let requestSaveStrategy: GMEstrategia = initialGmStrategy();

  //DOCS: AGREGAR EL ID DE LAS COTIZACIONES
  forEach(listQuotes, (quote) => {
    requestSaveStrategy.ListaIdcotCotizacion.push(quote.IdCotCotizacion);
  });

  //DOCS: AGREGAR LA ESTRATEGIA SELECCIONADA
  forEach(quotationStrategy.listQuotationStrategy, (o: apiCatalogs.CatEstrategiaCotizacion) => {
    if (o.IdCatEstrategiaCotizacion === quotationStrategy.itemSelected.value) {
      requestSaveStrategy.ajOfEstrategiaCotizacion.IdCatEstrategiaCotizacion =
        o.IdCatEstrategiaCotizacion;
      requestSaveStrategy.ajOfEstrategiaCotizacion.IdCliente =
        quotationStrategy.ajOfQuotationStrategy.IdCliente;
      requestSaveStrategy.ajOfEstrategiaCotizacion.IdUsuarioCreacion =
        quotationStrategy.ajOfQuotationStrategy.IdUsuarioCreacion;
    }
  });

  forEach(quotationStrategy.listQuotationStrategyTactic, (tactic: IQuotationStrategyTactic) => {
    if (tactic.isSelected) {
      //DOCS: EVALUA SI LA TACTICA ES SELECCIONADA
      tactic.listSubTactic.forEach((subtactic) => {
        if (subtactic.isSelected) {
          // DOCS: EVALUA SI LA SUBTACTICA ES SELECCIONADA
          let iAjOfEstrategiaCotizacionTactica: IAjOfEstrategiaCotizacionTactica = initialIAjOfEstrategiaCotizacionTactica();

          if (subtactic.IdCatEstrategiaCotizacionSubtactica !== undefined) {
            iAjOfEstrategiaCotizacionTactica.IdCatEstrategiaCotizacionTactica =
              subtactic.IdCatEstrategiaCotizacionTactica;
            iAjOfEstrategiaCotizacionTactica.IdCatEstrategiaCotizacionSubtactica =
              subtactic.IdCatEstrategiaCotizacionSubtactica;
          } else {
            iAjOfEstrategiaCotizacionTactica.IdCatEstrategiaCotizacionTactica =
              subtactic.ajOfQuotationStrategyTactic.IdCatEstrategiaCotizacionTactica;
            iAjOfEstrategiaCotizacionTactica.IdCatEstrategiaCotizacionSubtactica = null;
          }

          iAjOfEstrategiaCotizacionTactica.Justificacion =
            subtactic.ajOfQuotationStrategyTactic.Justificacion;

          requestSaveStrategy.ajOfEstrategiaCotizacionTactica.push(
            iAjOfEstrategiaCotizacionTactica,
          );
        }
      });
    }
  });

  return requestSaveStrategy;
};

export {
  initialStrategyDetails,
  initialItemSelectedQuotation,
  initialOfferState,
  initialQuotation,
  initialIDefaulter,
  patchContactClientStrategy,
  buildQuotationsListFromResponseStrategy,
  buildItemsQuotationFromResponse,
  buildStrategyStructureFromResponse,
  buildRequestForStrategySave,
};
