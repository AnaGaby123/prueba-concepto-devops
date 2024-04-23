import * as apiLogistic from 'api-logistica';
import {
  AjOfEstrategiaCotizacion,
  AjOfEstrategiaCotizacionTactica,
  AttributeDashboard,
  EstadoTasasConversionObj,
  GMEstrategia,
  MotivosCancelacionTasaConversionObj,
  PartidaCotizacionTasaConversionObj,
  QueryResultGraficaEntregaPartidaPedidoObj,
  QueryResultListaEntregaPartidaPedidoObj,
  QueryResultPartidaCotizacionTasaConversionObj,
  Resumen,
  TotalPedidoEntregaObj,
} from 'api-logistica';
import {addRowIndex} from '@appUtil/util';
import {Evi} from '@appModels/store/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard.model';

import {
  filter,
  find,
  findIndex,
  flow,
  forEach,
  isEmpty,
  map as _map,
  orderBy,
  reduce,
} from 'lodash-es';

import * as apiCatalogs from 'api-catalogos';
import {
  CatEstrategiaCotizacionSubtactica,
  CatEstrategiaCotizacionTactica,
  QueryInfo,
} from 'api-catalogos';
import {
  IClientQuotation,
  IDashboardClients,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/details/daily-meeting-dashboard-details.model';
import {
  API_REQUEST_STATUS_DEFAULT,
  DEFAULT_DATE,
  DEFAULT_UUID,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
  STATUS_CANCELED,
  STATUS_PURCHASE_PROMISE,
} from '@appUtil/common.protocols';
import {
  DailyMeetingDetailsState,
  IAjOfQuotationStrategy,
  ICatStrategies,
  IClientQuotationStrategyData,
  IDetails,
  IEntriesPercentages,
  IItemQuotation,
  IItemQuotationWithChild,
  IQueryResultIItemQuotation,
  IQuotation,
  IQuotationStrategyResponse,
  IQuotationStrategySubTactic,
  IQuotationStrategyTactic,
  ITabs,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IDelinquentState,
  IDeliveryState,
  IOfferState,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/details/sections/offer/offer.model';
import {FacturasPendientesClienteObj} from 'api-finanzas';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {ITabOption} from '@appModels/botonera/botonera-option';

//DOCS: INICIALIZADOR GENERAL DEL ESTADO
const initialDailyMeetingDetails = (): DailyMeetingDetailsState => ({
  eviSelected: {} as Evi,
  dashboardClients: initialDashboardClients(),
  listClients: [] as Array<IClientQuotation>,
  listClientsStatus: API_REQUEST_STATUS_DEFAULT,
  clientSelected: {} as IClientQuotation,
  clientQuotes: [] as Array<IQuotation>,
  freightSelectedQuote: null,
  listQuotesStatus: API_REQUEST_STATUS_DEFAULT,
  quotationSelected: {} as IQuotation,
  itemsQuotationSelected: initialItemSelectedQuotation(),
  itemsQuotationStatus: API_REQUEST_STATUS_DEFAULT,
  queryInfoItemsQuotation: initialItemsQuotationQueryInfo(),
  barPercentages: {} as IEntriesPercentages,
  clientQuotationStrategy: initialClientQuotationStrategyData(),
  offerSection: initialOfferState(),
  tabs: initialTabsSections(),
});

export const initialTabsSections = (): ITabs => ({
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

const initialItemSelectedQuotation = (): IQueryResultIItemQuotation => ({
  Results: [],
  TotalResults: 0,
});

const initialItemsQuotationQueryInfo = (): QueryInfo => ({
  Filters: [],
  SortDirection: 'asc',
  SortField: 'Descripcion',
  desiredPage: 1,
  pageSize: PAGING_LIMIT,
});

//DOCS: INICIALIZADORES PARA PUBLICAR ESTRATEGIA
const initialCatStrategies = (): ICatStrategies => ({
  listQuotationStrategy: [],
  listQuotationStrategyTactic: [],
  listQuotationStrategySubTactic: [],
  needsToReloadCatStrategies: true,
});

const initialClientQuotationStrategyData = (): IClientQuotationStrategyData => ({
  listQuotationStrategy: [],
  listQuotationStrategyTactic: [],
  listQuotationStrategyTacticBackup: [],
  itemSelected: {} as DropListOption,
  quotationStrategyStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadQuotationStrategy: true,
  ajOfQuotationStrategy: initialListAjOfQuotationStrategy(),
  ajOfQuotationStrategyBackup: initialListAjOfQuotationStrategy(),
});

const initialListAjOfQuotationStrategy = (): IAjOfQuotationStrategy => ({
  Activo: true,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdAjOfEstrategiaCotizacion: DEFAULT_UUID,
  IdCatEstrategiaCotizacion: DEFAULT_UUID,
  IdCliente: DEFAULT_UUID,
  IdUsuarioAprobacion: DEFAULT_UUID,
  IdUsuarioCreacion: DEFAULT_UUID,
  Publicada: false,
  isChanged: false,
});

//DOCS: INICIALIZADORES DASHBOARD CLIENTES TABS

const initialTabsDashboardClients = (): Array<ITabOption> => [
  {
    id: '1',
    label: 'Todos',
    activeSubtitle: true,
    labelSubtitle: 'Clientes',
    totalSubtitle: 0,
  },
  {
    id: '2',
    label: 'Contrato',
    activeSubtitle: true,
    labelSubtitle: 'Clientes',
    totalSubtitle: 0,
  },
  {
    id: '3',
    label: 'Sin Contrato',
    activeSubtitle: true,
    labelSubtitle: 'Clientes',
    totalSubtitle: 0,
  },
];

const initialSearchType = (): Array<DropListOption> => [
  {value: '1', label: 'Estrategia'},
  {value: '2', label: 'Cliente'},
];

const initialTypeFilterOptions = (): Array<DropListOption> => [
  {value: '1', label: HIGHER_VALUE},
  {value: '2', label: LOWER_VALUE},
];

const initialDashboardClients = (): IDashboardClients => ({
  tabsOptions: initialTabsDashboardClients(),
  tabSelectedIpad: {
    value: '1',
    label: 'Todos',
  },
  tabSelectedMacBook: initialTabsDashboardClients()[0],
  searchTerm: '',
  searchTypes: initialSearchType(),
  searchTypeSelected: initialSearchType()[0],
  typeFilterOptions: initialTypeFilterOptions(),
  typeFilterOptionSelected: initialTypeFilterOptions()[0],
  filterTabsMacBook: [
    {
      id: '1',
      label: 'Todos',
      activeSubtitle: true,
      labelSubtitle: 'clientes',
      totalSubtitle: 0,
    },
    {
      id: '2',
      label: 'Con Contrato',
      activeSubtitle: true,
      labelSubtitle: 'clientes',
      totalSubtitle: 0,
    },
    {
      id: '3',
      label: 'Sin Contrato',
      activeSubtitle: true,
      labelSubtitle: 'clientes',
      totalSubtitle: 0,
    },
  ],
  filterTabsIpad: [
    {
      value: '1',
      label: 'Todos',
    },
    {
      value: '2',
      label: 'Con Contrato',
    },
    {
      value: '3',
      label: 'Sin Contrato',
    },
  ],
});

//DOCS: INICIALIZADORES DE OFERTA EN JUNTA DIARIA

const initialOfferState = (): IOfferState => ({
  searchTerm: '',
  brandSelected: {value: DEFAULT_UUID, label: 'Todas'},
  listTypesOfSearch: initialOptions(),
  listBrandsSelectedQuotation: [],
  typeOfSearchSelected: initialOptions()[0],
  delinquent: {
    ...initialIDeliquent(),
  },
  delivery: {
    ...initialIDelivery(),
  },
});

const initialIDelivery = (): IDeliveryState => ({
  listDeliveries: {} as QueryResultListaEntregaPartidaPedidoObj,
  dataChartDelivery: {} as QueryResultGraficaEntregaPartidaPedidoObj,
  totalDeliveries: {} as TotalPedidoEntregaObj,
  needsToReloadDataDeliveries: true,
  dataDeliveriesStatus: API_REQUEST_STATUS_DEFAULT,
});

const initialIDeliquent = (): IDelinquentState => ({
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

//DOCS: FUNCIONES

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
const initialQuotationStrategyBody = (): IQuotationStrategyResponse => ({
  listQuotationStrategyTacticOptions: [],
  idClient: '',
  idUser: '',
  idAjOfQuotationStrategy: '',
  ajOfQuotationStrategy: initialListAjOfQuotationStrategy(),
  itemSelected: {} as DropListOption,
  catStrategies: initialCatStrategies(),
});

const generateDetails = (
  collectionCanceled: Array<MotivosCancelacionTasaConversionObj>,
): Array<IDetails> => {
  let value: Array<IDetails> = [];
  if (!isEmpty(collectionCanceled)) {
    forEach(orderBy(collectionCanceled, 'Partidas', 'desc'), (o) => {
      value = [
        ...value,
        {
          Partidas: o.Partidas,
          Porcentaje: o.Porcentaje, // > 0 ? o.Porcentaje * 100 : 0,
          Descripcion: o?.catMotivoCancelacionPartidaCotizacion?.Descripcion,
        },
      ];
    });
  }
  return value;
};

const generateDoughnutChart = (
  collectionCanceled: Array<MotivosCancelacionTasaConversionObj>,
  purchase: IDoughnutChartDetails,
): IDoughnutChart => {
  let result: IDoughnutChart = {values: [], labels: []};
  if (purchase && !isEmpty(collectionCanceled)) {
    let values = [Number(purchase.value)];
    let labels = [purchase.label];
    forEach(orderBy(collectionCanceled, 'Partidas', 'desc'), (o) => {
      values = [...values, o.Partidas];
      labels = [...labels, o.catMotivoCancelacionPartidaCotizacion?.Descripcion];
    });
    result = {values, labels};
  }
  return result;
};

const generateDoughnutChartDetails = (
  states: Array<EstadoTasasConversionObj>,
): Array<IDoughnutChartDetails> => {
  let result: Array<IDoughnutChartDetails> = [
    {label: 'Compras', value: '0'},
    {label: 'No Compras', value: '0'},
  ];
  if (!isEmpty(states)) {
    const totalPercentageByPurchasePromise = reduce(
      states,
      (percentage, state: EstadoTasasConversionObj) => {
        return state.Estado === STATUS_PURCHASE_PROMISE ? state.Partidas : percentage;
      },
      0,
    );
    const totalPercentageByCanceled = reduce(
      states,
      (percentage, state) => {
        return state.Estado === STATUS_CANCELED ? state.Partidas : percentage;
      },
      0,
    );
    result = [
      {label: 'Compras', value: totalPercentageByPurchasePromise.toString()},
      {label: 'No Compras', value: totalPercentageByCanceled.toString()},
    ];
  }
  return result;
};

const buildEvisDailyMeetingDashboard = (eviList: Array<Resumen>): Array<Evi> => {
  eviList = addRowIndex(0, 0, eviList);
  return _map(eviList, (o: Evi) => {
    const newObject = {...o, IdUsuario: o.DescripcionLlave};
    forEach(o.Atributos, (i: AttributeDashboard) => {
      newObject[i.DescriptionField] = i.ValueField;
    });
    return newObject;
  });
};

const buildClientsDailyMeetingDetailsDashboardDetails = (
  clientList: Array<Resumen>,
): Array<IClientQuotation> => {
  clientList = addRowIndex(0, 0, clientList);
  return _map(clientList, (o: IClientQuotation) => {
    const newObject = {...o, IdAjOfEstrategiaCotizacion: o.DescripcionLlave};
    forEach(o.Atributos, (i: AttributeDashboard) => {
      newObject[i.DescriptionField] = i.ValueField;
    });
    return newObject;
  });
};

const buildClientsQuotesFromResponse = (
  results: Array<apiLogistic.VCotCotizacion>,
): Array<IQuotation> => {
  return _map(
    results,
    (o: apiLogistic.VCotCotizacion, index): IQuotation => ({
      ...o,
      isSelected: index === 0,
      index: index + 1,
      needsToReloadItemQuotation: true,
      itemsQuotation: [],
      itemsQuotationStatus: API_REQUEST_STATUS_DEFAULT,
      currency: '',
    }),
  );
};

const buildItemsQuotationSelected = (
  response: QueryResultPartidaCotizacionTasaConversionObj,
): IQueryResultIItemQuotation => ({
  ...response,
  Results: _map(
    response.Results,
    (o: PartidaCotizacionTasaConversionObj): IItemQuotation => ({
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
        _map(
          o.PartidasHijas,
          (child: PartidaCotizacionTasaConversionObj): IItemQuotationWithChild => ({
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
          }),
        ),
        'NumeroDePiezas',
      ),
      imageHover: `assets/Images/logos/${o.NombreImagenMarca?.toLowerCase()}_hover.svg`,
    }),
  ),
});

const buildStrategyForPublic = (
  quotationStrategy: IQuotationStrategyResponse,
  results: AjOfEstrategiaCotizacionTactica[],
): IQuotationStrategyTactic[] => {
  return _map(
    quotationStrategy.catStrategies.listQuotationStrategyTactic,
    (item: CatEstrategiaCotizacionTactica): IQuotationStrategyTactic => ({
      ...item,
      isSelected:
        findIndex(
          results,
          (o: CatEstrategiaCotizacionTactica): boolean =>
            o.IdCatEstrategiaCotizacionTactica === item.IdCatEstrategiaCotizacionTactica &&
            o.Activo,
        ) !== -1,
      listSubTactic: flow([
        () =>
          filter(
            quotationStrategy.catStrategies.listQuotationStrategySubTactic,
            (subTactic: CatEstrategiaCotizacionSubtactica): boolean =>
              subTactic.IdCatEstrategiaCotizacionTactica === item.IdCatEstrategiaCotizacionTactica,
          ),
        (subTactics: CatEstrategiaCotizacionSubtactica[]) =>
          subTactics.length > 0
            ? _map(subTactics, (subTactic: CatEstrategiaCotizacionSubtactica) => ({
                ...subTactic,
                isSelected:
                  findIndex(
                    results,
                    (o: AjOfEstrategiaCotizacionTactica): boolean =>
                      o?.IdCatEstrategiaCotizacionSubtactica ===
                        subTactic.IdCatEstrategiaCotizacionSubtactica && o.Activo,
                  ) !== -1,
                Activo:
                  findIndex(
                    results,
                    (o: AjOfEstrategiaCotizacionTactica): boolean =>
                      o?.IdCatEstrategiaCotizacionSubtactica ===
                        subTactic.IdCatEstrategiaCotizacionSubtactica && o.Activo,
                  ) !== -1,
                ajOfQuotationStrategyTactic: flow([
                  () => {
                    const index = findIndex(
                      results,
                      (o: AjOfEstrategiaCotizacionTactica): boolean =>
                        o?.IdCatEstrategiaCotizacionSubtactica ===
                        subTactic.IdCatEstrategiaCotizacionSubtactica,
                    );
                    if (index !== -1) {
                      return results[index];
                    } else {
                      return {
                        Activo:
                          findIndex(
                            results,
                            (o: AjOfEstrategiaCotizacionTactica): boolean =>
                              o?.IdCatEstrategiaCotizacionSubtactica ===
                                subTactic.IdCatEstrategiaCotizacionSubtactica && o.Activo,
                          ) !== -1,
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
                    }
                  },
                ])(),
              }))
            : flow([
                () => {
                  const indexWithActive: number = findIndex(
                    results,
                    (o: CatEstrategiaCotizacionTactica): boolean =>
                      o.IdCatEstrategiaCotizacionTactica ===
                        item.IdCatEstrategiaCotizacionTactica && o.Activo,
                  );
                  const indexWithoutActive: number = findIndex(
                    results,
                    (o: CatEstrategiaCotizacionTactica): boolean =>
                      o.IdCatEstrategiaCotizacionTactica === item.IdCatEstrategiaCotizacionTactica,
                  );
                  const configTactic: AjOfEstrategiaCotizacionTactica = find(
                    results,
                    (o: AjOfEstrategiaCotizacionTactica): boolean =>
                      o.IdCatEstrategiaCotizacionTactica === item.IdCatEstrategiaCotizacionTactica,
                  );

                  return [
                    {
                      isSelected: indexWithActive !== -1,
                      Activo: indexWithActive !== -1,
                      ajOfQuotationStrategyTactic: {
                        Activo: indexWithActive !== -1,
                        FechaRegistro:
                          indexWithoutActive !== -1 ? configTactic?.FechaRegistro : DEFAULT_DATE,
                        FechaUltimaActualizacion:
                          indexWithoutActive !== -1
                            ? configTactic?.FechaUltimaActualizacion
                            : DEFAULT_DATE,
                        IdAjOfEstrategiaCotizacion:
                          indexWithoutActive !== -1
                            ? configTactic?.IdAjOfEstrategiaCotizacion
                            : DEFAULT_UUID,
                        IdAjOfEstrategiaCotizacionTactica:
                          indexWithoutActive !== -1
                            ? configTactic?.IdAjOfEstrategiaCotizacionTactica
                            : DEFAULT_UUID,
                        IdCatEstrategiaCotizacionSubtactica: null,
                        IdCatEstrategiaCotizacionTactica: item.IdCatEstrategiaCotizacionTactica,
                        Justificacion: indexWithoutActive !== -1 ? configTactic?.Justificacion : '',
                        Observaciones: indexWithoutActive !== -1 ? configTactic?.Observaciones : '',
                      },
                    },
                  ];
                },
              ])(),
      ])(),
    }),
  );
};

const initialGmDailyMeeting = (): GMEstrategia => ({
  ListaIdcotCotizacion: [] as Array<string>,
  ajOfEstrategiaCotizacion: {} as AjOfEstrategiaCotizacion,
  ajOfEstrategiaCotizacionTactica: [] as Array<AjOfEstrategiaCotizacionTactica>,
});

const buildRequestForStrategyPublic = (
  quotationStrategy: IClientQuotationStrategyData,
  listQuotes: Array<IQuotation>,
  idUser: string,
): GMEstrategia => {
  let requestSaveStrategy: GMEstrategia = initialGmDailyMeeting();

  //DOCS: AGREGAR EL ID DE LAS COTIZACIONES
  forEach(listQuotes, (quote) => {
    requestSaveStrategy.ListaIdcotCotizacion.push(quote.IdCotCotizacion);
  });

  //DOCS: AGREGAR LA ESTRATEGIA SELECCIONADA
  forEach(quotationStrategy.listQuotationStrategy, (o: apiCatalogs.CatEstrategiaCotizacion) => {
    if (o.IdCatEstrategiaCotizacion === quotationStrategy.itemSelected.value) {
      requestSaveStrategy.ajOfEstrategiaCotizacion = {
        FechaRegistro: quotationStrategy.ajOfQuotationStrategy.FechaRegistro,
        FechaUltimaActualizacion: quotationStrategy.ajOfQuotationStrategy.FechaUltimaActualizacion,
        IdAjOfEstrategiaCotizacion:
          quotationStrategy.ajOfQuotationStrategy.IdAjOfEstrategiaCotizacion,
        IdCatEstrategiaCotizacion: o.IdCatEstrategiaCotizacion,
        IdCliente: quotationStrategy.ajOfQuotationStrategy.IdCliente,
        IdUsuarioCreacion: quotationStrategy.ajOfQuotationStrategy.IdUsuarioCreacion,
        IdUsuarioAprobacion: idUser,
        Activo: true,
        Publicada: true,
      };
    }
  });
  // DOCS: AGREGAR LAS SUBTACTICAS
  quotationStrategy.listQuotationStrategyTactic.forEach((tactic: IQuotationStrategyTactic) => {
    tactic.listSubTactic.forEach((subtactic: IQuotationStrategySubTactic) => {
      //DOCS: EVALUA SI FUERON SELECCIONADAS POR EL EVI Y/O EL COORDINADOR
      if (
        subtactic.ajOfQuotationStrategyTactic.Justificacion !== '' ||
        subtactic.ajOfQuotationStrategyTactic.Observaciones !== ''
      ) {
        let iAjOfEstrategiaCotizacionTactica: AjOfEstrategiaCotizacionTactica;

        iAjOfEstrategiaCotizacionTactica = {
          FechaRegistro: subtactic.ajOfQuotationStrategyTactic.FechaRegistro,
          FechaUltimaActualizacion: subtactic.ajOfQuotationStrategyTactic.FechaUltimaActualizacion,
          IdAjOfEstrategiaCotizacion:
            requestSaveStrategy.ajOfEstrategiaCotizacion.IdAjOfEstrategiaCotizacion,
          IdCatEstrategiaCotizacionSubtactica:
            subtactic.IdCatEstrategiaCotizacionSubtactica !== undefined
              ? subtactic.IdCatEstrategiaCotizacionSubtactica
              : null,
          IdCatEstrategiaCotizacionTactica:
            subtactic.ajOfQuotationStrategyTactic.IdCatEstrategiaCotizacionTactica,
          Justificacion: subtactic.ajOfQuotationStrategyTactic.Justificacion,
          Observaciones: subtactic.ajOfQuotationStrategyTactic.Observaciones,
        };

        //DOCS: AÑADE EL CAMPO Activo Y  IdAjOfEstrategiaCotizacionTactica PARA AQUELLAS SUBTACTICAS QUE FUERON SELECCIONADAS POR EL EVI
        if (subtactic.ajOfQuotationStrategyTactic.Justificacion !== '') {
          iAjOfEstrategiaCotizacionTactica.IdAjOfEstrategiaCotizacionTactica =
            subtactic.ajOfQuotationStrategyTactic.IdAjOfEstrategiaCotizacionTactica;
          iAjOfEstrategiaCotizacionTactica.Activo = subtactic.ajOfQuotationStrategyTactic.Activo;
        }

        requestSaveStrategy.ajOfEstrategiaCotizacionTactica.push(iAjOfEstrategiaCotizacionTactica);
      }
    });
  });

  return requestSaveStrategy;
};

export {
  initialDailyMeetingDetails,
  initialCatStrategies,
  initialTabsDashboardClients,
  initialClientQuotationStrategyData,
  initialListAjOfQuotationStrategy,
  initialItemSelectedQuotation,
  initialItemsQuotationQueryInfo,
  initialIDeliquent,
  initialIDelivery,
  initialOptions,
  initialGmDailyMeeting,
  initialOfferState,
  initialDashboardClients,
  initialQuotationStrategyBody,
  buildEvisDailyMeetingDashboard,
  buildClientsDailyMeetingDetailsDashboardDetails,
  buildClientsQuotesFromResponse,
  buildItemsQuotationSelected,
  buildStrategyForPublic,
  buildRequestForStrategyPublic,
};
