/* Core Imports */
import {createSelector} from '@ngrx/store';
import {filter, flow, forEach, isEmpty, map as _map, orderBy} from 'lodash-es';

/* Selectors Imports */
import {
  selectedQuotation,
  selectOfferSection,
} from '@appSelectors/pendings/strategy/strategy-details/strategy-details.selectors';

/* Models Imports */
import {
  IDefaultertState,
  IDeliveries,
  IDeliveryState,
  IOfferState,
  IPercentagesDeliveries,
} from '@appModels/store/pendings/strategy/strategy-details/details/sections/offer/offer.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IItemQuotation,
  IQuotation,
  StrategyDetailsState,
} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';
import {toRound} from '@appUtil/util';

/* Tools Imports */
import {
  API_REQUEST_STATUS_LOADING,
  DEFAULT_UUID,
  ITEM_QUOTATION_TYPE_ORIGINAL,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {selectStrategyDetails} from '@appSelectors/pendings/strategy/strategy.selectors';
import {FacturasPendientesClienteObj} from 'api-finanzas';
import {
  IBarChart,
  IDoughnutChart,
  IDoughnutChartDetails,
  InitialIBarChart,
} from '@appModels/chart/chart';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {QueryInfo} from 'api-logistica';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';

export const selectSearchTerm = createSelector(
  selectOfferSection,
  (state: IOfferState) => state.searchTerm,
);
export const selectListTypesOfSearch = createSelector(
  selectOfferSection,
  (state) => state.listTypesOfSearch,
);
export const selectTypeOfSearch = createSelector(selectOfferSection, (state) => state.typeOfSearch);
// DOCS: GENERA EL DROPTLIST DEL LISTADO DE MARCAS EN LA TABLA DE PARTIDAS
export const selectBrandOptions = createSelector(
  selectStrategyDetails,
  (state): Array<DropListOption> =>
    state.brandsSelectedQuotation?.length > 0
      ? JSON.parse(JSON.stringify(state.brandsSelectedQuotation))
      : [],
);

// DOCS: Obtiene la marca seleccionada de la cotización seleccionada
export const selectBrandSelected = createSelector(
  selectStrategyDetails,
  (state): DropListOption => {
    return state?.brandSelectedFilter && state?.itemsQuotationSelected?.Results?.length > 0
      ? state.brandSelectedFilter
      : {value: DEFAULT_UUID, label: 'Todas'};
  },
);

export const selectedQuotationItemsQueryInfo = createSelector(
  [
    selectStrategyDetails,
    selectedQuotation,
    selectBrandSelected,
    selectSearchTerm,
    selectTypeOfSearch,
  ],
  (
    state: StrategyDetailsState,
    quotation: IQuotation,
    brand: DropListOption,
    searchTerm: string,
    typeOfSearch: DropListOption,
  ): QueryInfo => {
    let queryInfo: QueryInfo = {...state.queryInfo};

    queryInfo = {
      ...queryInfo,
      Filters: [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'Activo',
          ValorFiltro: true,
        },
        {
          NombreFiltro: 'IdCotCotizacion',
          ValorFiltro: quotation.IdCotCotizacion,
        },
        {
          NombreFiltro: 'TipoPartidaCotizacion',
          ValorFiltro: ITEM_QUOTATION_TYPE_ORIGINAL,
        },
      ],
      SortField: 'Orden',
      SortDirection: 'asc',
    };
    if (brand.label !== 'Todas') {
      queryInfo = {
        ...queryInfo,
        Filters: [
          ...queryInfo.Filters,
          {
            NombreFiltro: 'NombreMarca',
            ValorFiltro: brand.value,
          },
        ],
      };
    }

    if (searchTerm) {
      queryInfo = {
        ...queryInfo,
        Filters: [
          ...queryInfo.Filters,
          {
            NombreFiltro:
              typeOfSearch.value === '1'
                ? 'FiltradoPorCatalogo'
                : typeOfSearch.value === '2'
                ? 'FiltradoPorDescripcion'
                : 'FiltradoPorNombreMarca',
            ValorFiltro: searchTerm,
          },
        ],
      };
    }
    return queryInfo;
  },
);
export const selectItemsQuotation = createSelector(
  selectStrategyDetails,
  (state): Array<IItemQuotation> => state.itemsQuotationSelected.Results,
);

export const selectItemsQuotationTotal = createSelector(
  selectStrategyDetails,
  (state): number => state.itemsQuotationSelected.TotalResults,
);

export const selectItemsQuotationDesiredPage = createSelector(
  selectStrategyDetails,
  (state): number => state.queryInfo.desiredPage,
);

export const selectFetchMoreClientsInfo = createSelector(
  selectStrategyDetails,
  selectItemsQuotation,
  selectItemsQuotationTotal,
  selectItemsQuotationDesiredPage,
  (
    strategy: StrategyDetailsState,
    itemsListQuotation: Array<IItemQuotation>,
    totalResults: number,
    desiredPage: number,
  ): IFetchMoreItemsInfo => {
    return {
      itemList: itemsListQuotation,
      itemsTotalLength: totalResults,
      listRequestStatus: strategy.itemsQuotationStatus,
      desiredPage,
      pageSize: PAGING_LIMIT,
      totalPages: totalResults >= PAGING_LIMIT ? Math.ceil(totalResults / PAGING_LIMIT) : 0,
    };
  },
);

export const selectDelinquent = createSelector(
  selectOfferSection,
  (state: IOfferState) => state.defaulter,
);
export const selectDelivery = createSelector(
  selectOfferSection,
  (state: IOfferState) => state.delivery,
);

//------  DOCS: SELECTORES DE DEFAULTER GRAFICA (MOROSO)--------------------

export const selectDataPendingInvoices = createSelector(
  selectDelinquent,
  (state: IDefaultertState) => state.dataPendingInvoices,
);
export const selectPaymentConditions = createSelector(
  selectDelinquent,
  (state: IDefaultertState) => {
    return isEmpty(state.dataPendingInvoices.catCondicionesDePago)
      ? 'O Días'
      : state.dataPendingInvoices?.catCondicionesDePago?.CondicionesDePago;
  },
);
export const selectIsLoadingPendingsInvoices = createSelector(
  selectDelinquent,
  (state: IDefaultertState) => state.dataPendingInvoiceStatus === API_REQUEST_STATUS_LOADING,
);
export const selectNeedsToReloadPendingInvoices = createSelector(
  selectDelinquent,
  (state: IDefaultertState) => state.needsToReloadPendingInvoices,
);
export const selectDataByType = createSelector(
  selectDelinquent,
  (state: IDefaultertState) => state.dataByType,
);
export const selectFilterByType = createSelector(
  selectDelinquent,
  (state: IDefaultertState) => state.filterByType,
);
export const selectHealthyDebtBills = createSelector(
  [selectDataPendingInvoices, selectFilterByType],
  (pendingsInvoices: FacturasPendientesClienteObj, filterByType: DropListOption) =>
    flow([
      () => {
        if (filterByType.value === '1') {
          return orderBy(
            pendingsInvoices.FacturasDeudaSana,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item4],
            'desc',
          );
        } else if (filterByType.value === '2') {
          return orderBy(
            pendingsInvoices.FacturasDeudaSana,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item4],
            'asc',
          );
        }
      },
      (facturasDeudaSana) =>
        _map(facturasDeudaSana, (invoice, index) => ({
          ...invoice,
          Index: index + 1,
        })),
    ])(),
);
export const selectDelinquentBills = createSelector(
  [selectDataPendingInvoices, selectFilterByType],
  (pendingsInvoices: FacturasPendientesClienteObj, filterByType: DropListOption) =>
    flow([
      () => {
        if (filterByType.value === '1') {
          return orderBy(
            pendingsInvoices.FacturasMorosas,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item4],
            'desc',
          );
        } else if (filterByType.value === '2') {
          return orderBy(
            pendingsInvoices.FacturasMorosas,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item4],
            'asc',
          );
        }
      },
      (facturasMorosas) =>
        _map(facturasMorosas, (invoice, index) => ({
          ...invoice,
          Index: index + 1,
        })),
    ])(),
);
export const selectCreditNotes = createSelector(
  [selectDataPendingInvoices, selectFilterByType],
  (pendingsInvoices: FacturasPendientesClienteObj, filterByType: DropListOption) =>
    flow([
      () => {
        if (filterByType.value === '1') {
          return orderBy(
            pendingsInvoices.NotasDeCredito,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item3],
            'desc',
          );
        } else if (filterByType.value === '2') {
          return orderBy(
            pendingsInvoices.NotasDeCredito,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item3],
            'asc',
          );
        }
      },
      (notasDeCredito) =>
        _map(notasDeCredito, (invoice, index) => ({
          ...invoice,
          Index: index + 1,
        })),
    ])(),
);
export const selectDoughnutChartDataDefaulting = createSelector(
  [selectHealthyDebtBills, selectDelinquentBills, selectCreditNotes],
  (healthyDebtBills, delinquentBills, creditNotes) =>
    flow([
      (): IDoughnutChart => {
        const labels = ['Morosidad', 'Deuda Sana', 'Notas de Crédito'];
        let values: Array<number>;
        let totalCreditNotes = 0;
        let totalHealthyDebtBills = 0;
        let totalDelinquentBills = 0;
        forEach(creditNotes, (o) => {
          totalCreditNotes += o.m_Item3;
        });
        forEach(healthyDebtBills, (o) => {
          totalHealthyDebtBills += o.m_Item4;
        });
        forEach(delinquentBills, (o) => {
          totalDelinquentBills += o.m_Item4;
        });
        values = [totalDelinquentBills, totalHealthyDebtBills, totalCreditNotes];
        return {labels, values};
      },
    ])(),
);
export const selectTotalCreditNotes = createSelector(
  selectDoughnutChartDataDefaulting,
  (dataChart: IDoughnutChart) => dataChart.values[2],
);
export const selectTotalDelinquent = createSelector(
  selectDoughnutChartDataDefaulting,
  (dataChart: IDoughnutChart) => dataChart.values[0],
);
export const selectTotalHealthy = createSelector(
  selectDoughnutChartDataDefaulting,
  (dataChart: IDoughnutChart) => dataChart.values[1],
);
export const selectRemains = createSelector(
  selectDoughnutChartDataDefaulting,
  (state: IDoughnutChart) => state.values[1] + state.values[0] - state.values[2],
);
export const selectCurrencyClient = createSelector(selectDataPendingInvoices, (state) =>
  state.catMoneda ? state.catMoneda.ClaveMoneda : '',
);
export const selectDoughnutChartDefaultingDetails = createSelector(
  selectDoughnutChartDataDefaulting,
  selectDataPendingInvoices,
  selectCurrencyClient,
  (chartData, pendingsInvoices: FacturasPendientesClienteObj, currency) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        const totalDelinquentBills = chartData.values[0];
        const totalHealthyDebtBills = chartData.values[1];
        const totalCreditNotes = chartData.values[2];
        if (!isEmpty(pendingsInvoices)) {
          return [
            {
              label: 'Morosidad',
              value: `${new CurrencyFormat().transform(
                totalDelinquentBills,
                currency,
              )} ${currency}`,
            },
            {
              label: 'Deuda Sana',
              value: `${new CurrencyFormat().transform(
                totalHealthyDebtBills,
                currency,
              )} ${currency}`,
            },
            {
              label: 'Notas de Crédito',
              value: `${new CurrencyFormat().transform(totalCreditNotes, currency)} ${currency}`,
            },
          ];
        } else {
          return [];
        }
      },
    ])(),
);
export const selectDoughnutChartDefaultingDetailsHover = createSelector(
  selectDoughnutChartDefaultingDetails,
  (chartData) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        let data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(chartData, (o) => {
          let details: Array<IDoughnutChartDetails> = [];
          details = [...details, {label: o.label, value: o.value}];
          data = [...data, details];
        });
        return data;
      },
    ])(),
);
//  ----- DOCS: SELECTORES DE DELIVERY (SECCIÓN DE ENTREGAS) ------
export const selectIsLoadingListDeliveries = createSelector(
  selectDelivery,
  (state: IDeliveryState) => state.dataDeliveriesStatus === API_REQUEST_STATUS_LOADING,
);

export const selectNeedsToReloadListDeliveries = createSelector(
  selectDelivery,
  (state: IDeliveryState) => state.needsToReloadDataDeliveries,
);
export const selectListDeliveries = createSelector(
  selectDelivery,
  (state: IDeliveryState) => state.listDeliveries.Results,
);
export const selectChartDataDelivery = createSelector(
  selectDelivery,
  (state: IDeliveryState) => state.dataChartDelivery,
);
export const selectListOneDay = createSelector(
  selectListDeliveries,
  (listDeliveries: IDeliveries[]) =>
    flow([
      () =>
        filter(listDeliveries, (o) => o.DiasFueraDeTiempo === 1 && o.ConAvisoDeCambio === false),
      (deliveries) =>
        _map(deliveries, (delivery, index) => ({
          ...delivery,
          labelDays: '1 Día',
        })),
      (deliveries) =>
        _map(deliveries, (delivery, index) => ({
          ...delivery,
          Index: index + 1,
        })),
    ])(),
);
export const selectListTwoDay = createSelector(
  selectListDeliveries,
  (listDeliveries: IDeliveries[]) =>
    flow([
      () =>
        filter(listDeliveries, (o) => o.DiasFueraDeTiempo === 2 && o.ConAvisoDeCambio === false),
      (deliveries) =>
        _map(deliveries, (delivery, index) => ({
          ...delivery,
          labelDays: '2 Días',
        })),
      (deliveries) =>
        _map(deliveries, (delivery, index) => ({
          ...delivery,
          Index: index + 1,
        })),
    ])(),
);
export const selectListThreeDay = createSelector(
  selectListDeliveries,
  (listDeliveries: IDeliveries[]) =>
    flow([
      () =>
        filter(listDeliveries, (o) => o.DiasFueraDeTiempo === 3 && o.ConAvisoDeCambio === false),
      (deliveries) =>
        _map(deliveries, (delivery) => ({
          ...delivery,
          labelDays: '3 Días',
        })),
      (deliveries) =>
        _map(deliveries, (delivery, index) => ({
          ...delivery,
          Index: index + 1,
        })),
    ])(),
);
export const selectListMoreThanThreeDay = createSelector(
  selectListDeliveries,
  (listDeliveries: IDeliveries[]) =>
    flow([
      () => filter(listDeliveries, (o) => o.DiasFueraDeTiempo > 3 && o.ConAvisoDeCambio === false),
      (deliveries) =>
        _map(deliveries, (delivery, index) => ({
          ...delivery,
          labelDays: '+ De 3 Días',
        })),
      (deliveries) =>
        _map(deliveries, (delivery, index) => ({
          ...delivery,
          Index: index + 1,
        })),
    ])(),
);
export const selectListChangeNotice = createSelector(
  selectListDeliveries,
  (listDeliveries: IDeliveries[]) =>
    flow([
      () => filter(listDeliveries, (o) => o.ConAvisoDeCambio === true),
      (deliveries) =>
        _map(deliveries, (delivery, index) => ({
          ...delivery,
          labelDays:
            delivery.DiasFueraDeTiempo === 1
              ? '1 Día'
              : delivery.DiasFueraDeTiempo === 2
              ? '2 Días'
              : delivery.DiasFueraDeTiempo === 3
              ? '3 Días'
              : delivery.DiasFueraDeTiempo > 3
              ? '+ De 3 Días'
              : '',
        })),
      (deliveries) =>
        _map(deliveries, (delivery, index) => ({
          ...delivery,
          Index: index + 1,
        })),
    ])(),
);
export const selectBarChartData = createSelector(selectChartDataDelivery, (chartDataDelivery) => {
  const dataBarChart = InitialIBarChart();
  let contMoreThanThreeDays = 0;
  let contThreeDays = 0;
  let contTwoDays = 0;
  let contOneDay = 0;
  let contChangeNotice = 0;
  dataBarChart.labels = ['+ De 3 Días', '3 Días', '2 Días', '1 Día', 'Aviso de Cambio'];
  dataBarChart.backgroundColor = ['#c32644', '#d74460', '#d85971', '#df798c', '#f5a523'];
  dataBarChart.backgroundColorHover = [
    '#c32644b3',
    '#d74460b3',
    '#d85971b3',
    '#df798cb3',
    '#f5a523b3',
  ];
  forEach(chartDataDelivery.Results, (o) => {
    if (o.DiasFueraDeTiempo === 1 && o.ConAvisoDeCambio === false) {
      contOneDay++;
    } else if (o.DiasFueraDeTiempo === 2 && o.ConAvisoDeCambio === false) {
      contTwoDays++;
    } else if (o.DiasFueraDeTiempo === 3 && o.ConAvisoDeCambio === false) {
      contThreeDays++;
    } else if (o.DiasFueraDeTiempo > 3 && o.ConAvisoDeCambio === false) {
      contMoreThanThreeDays++;
    } else if (o.ConAvisoDeCambio === true) {
      contChangeNotice++;
    }
  });
  dataBarChart.values = [
    contMoreThanThreeDays,
    contThreeDays,
    contTwoDays,
    contOneDay,
    contChangeNotice,
  ];

  return dataBarChart;
});
export const selectPercentageDeliveriesOutOfTime = createSelector(
  selectDelivery,
  (state: IDeliveryState) => {
    const deliveriesOutOfTime = state.totalDeliveries.TotalPartidasEntregasFueraDeTiempo;
    const deliveriesInForm = state.totalDeliveries.TotalPartidasEntregasEnForma;

    return deliveriesOutOfTime && deliveriesInForm
      ? `${toRound((100 / (deliveriesOutOfTime + deliveriesInForm)) * deliveriesOutOfTime, 2)}% de`
      : `${0}% de`;
  },
);
export const selectPercentageDeliveriesInForm = createSelector(
  selectDelivery,
  (state: IDeliveryState) => {
    const deliveriesOutOfTime = state.totalDeliveries.TotalPartidasEntregasFueraDeTiempo;
    const deliveriesInForm = state.totalDeliveries.TotalPartidasEntregasEnForma;

    return deliveriesOutOfTime && deliveriesInForm
      ? `${toRound((100 / (deliveriesOutOfTime + deliveriesInForm)) * deliveriesInForm, 2)}%`
      : `${0}%`;
  },
);
export const selectTotalDeliveries = createSelector(
  selectDelivery,
  (state: IDeliveryState) =>
    state.totalDeliveries.TotalPartidasEntregasFueraDeTiempo +
    state.totalDeliveries.TotalPartidasEntregasEnForma,
);
export const selectPercentagesChart = createSelector(
  [selectBarChartData, selectTotalDeliveries],
  (barData: IBarChart, totalDeliveries: number) => {
    let objPercentages = {} as IPercentagesDeliveries;
    const calc = 100 / totalDeliveries;
    const totalMoreThanThreeDays = barData.values[0];
    const totalThreeDays = barData.values[1];
    const totalTwoDays = barData.values[2];
    const totalOneDay = barData.values[3];
    const totalChangeNotice = barData.values[4];

    objPercentages = {
      ...objPercentages,
      moreThanThreeDays: {
        total: totalMoreThanThreeDays,
        percentage: toRound(calc * totalMoreThanThreeDays, 2),
      },
      threeDays: {
        total: totalThreeDays,
        percentage: toRound(calc * totalThreeDays, 2),
      },
      twoDays: {
        total: totalTwoDays,
        percentage: toRound(calc * totalTwoDays, 2),
      },
      oneDay: {
        total: totalOneDay,
        percentage: toRound(calc * totalOneDay, 2),
      },
      changeNotice: {
        total: totalChangeNotice,
        percentage: toRound(calc * totalChangeNotice, 2),
      },
    };
    return objPercentages;
  },
);
