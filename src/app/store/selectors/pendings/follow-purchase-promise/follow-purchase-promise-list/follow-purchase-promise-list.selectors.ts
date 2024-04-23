import {createSelector} from '@ngrx/store';
import {selectFollowPPromise} from '@appSelectors/pendings/follow-purchase-promise/follow-purchase-promise.selectors';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {ControlarSeguimientoPromesaDeCompraGraficas, ResumeGroupQueryInfo} from 'api-logistica';
import {IDoughnutChart, IDoughnutChartDetails, InitialIBarChart} from '@appModels/chart/chart';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {flow, forEach, isEmpty, map as _map, sumBy} from 'lodash-es';

import {DateFormatNumber} from '@appPipes/date-format.pipe';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IFollowPurchasePromiseState} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise.models';
import {
  ICustomerFPP,
  IFollowPPromiseList,
  ISearchOptions,
} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  FollowPurchasePromiseStatus,
  mapFollowPurchasePromiseState,
} from '@appHelpers/pending/follow-purchase-promise/follow-purchase-promise.helpers';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';

export const selectFollowPromiseList = createSelector(
  selectFollowPPromise,
  (state: IFollowPurchasePromiseState) => state.followPPromiseList,
);
export const selectTabs = createSelector(
  selectFollowPromiseList,
  (state): Array<ITabOption> => _map(state.options, (o: ITabOption) => ({...o})),
);
export const selectTabSelected = createSelector(
  selectFollowPromiseList,
  (state) => state.tabSelected,
);
export const selectFiltersType = createSelector(
  selectFollowPromiseList,
  (state) => state.dataByType,
);
export const selectFilterType = createSelector(
  selectFollowPromiseList,
  (state: IFollowPPromiseList) => state.filterByType,
);
export const selectQueryInfo = createSelector(
  selectFollowPromiseList,
  (state: IFollowPPromiseList) => state.queryInfo,
);
export const selectCustomerList = createSelector(
  selectFollowPromiseList,
  (state: IFollowPPromiseList) => state.customerList,
);
export const selectCustomerTotal = createSelector(
  selectFollowPromiseList,
  (state: IFollowPPromiseList) => state.customerList.length,
);
export const selectCurrentPage = createSelector(selectQueryInfo, (state) => state.desiredPage);
export const selectParams = createSelector(selectQueryInfo, selectTabSelected, (queryInfo, tab) => {
  const params = new FiltersOnlyActive();
  params.SortField = '';
  params.pageSize = queryInfo.pageSize;
  params.desiredPage = queryInfo.desiredPage;
  if (tab.id !== '1') {
    params.Filters.push({
      NombreFiltro: 'ATiempo',
      ValorFiltro: tab.id === '2',
    });
  }
  if (!isEmpty(queryInfo.dateRange)) {
    params.Filters.push({
      NombreFiltro: 'FechaInicio',
      ValorFiltro: new DateFormatNumber().transform(queryInfo.dateRange.startDate, '-', 'month'),
    });
    params.Filters.push({
      NombreFiltro: 'FechaFin',
      ValorFiltro: new DateFormatNumber().transform(queryInfo.dateRange.endDate, '-', 'month'),
    });
  }
  if (queryInfo.searchTerm && queryInfo.searchTerm !== '') {
    params.Filters.push({
      NombreFiltro: 'Nombre',
      ValorFiltro: queryInfo.searchTerm,
    });
  }
  return params;
});
export const selectDonutChart = createSelector(
  selectFollowPromiseList,
  (state: IFollowPPromiseList) => state.donutChart,
);
export const selectDoughnutChartData = createSelector(
  selectCustomerList,
  (state: ICustomerFPP[]) => {
    return flow([
      (): IDoughnutChart => {
        const labels: Array<string> = [];
        const values: Array<number> = [];
        forEach(state, (item: ICustomerFPP) => {
          labels.push(item.Nombre);
          values.push(item.TotalPromesaUSD);
        });
        return {labels, values};
      },
    ])();
  },
);
// DOCS: Selector para obtener la info del centro de la gráfica
export const selectDoughnutChartDataDetails = createSelector(
  selectDonutChart,
  (state: ControlarSeguimientoPromesaDeCompraGraficas) => {
    return flow([
      (): Array<IDoughnutChartDetails> => {
        const val = new CurrencyFormat().transform(state?.TotalPromesaDeCompraUSD, 'USD') + ' USD';
        return [
          {
            label: 'Clientes',
            value: state?.TotalClientes?.toString(),
          },
          {label: 'Cotizaciones', value: state?.TotalCotizaciones?.toString()},
          {
            label: 'Partidas Promesa',
            value: state?.TotalPartidas?.toString(),
          },
          {label: 'Valor Total Promesa', value: val},
        ];
      },
    ])();
  },
);
export const selectDoughnutChartDataDetailsHover = createSelector(
  selectCustomerList,
  (state: ICustomerFPP[]) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(state, (item: ICustomerFPP) => {
          const details: Array<IDoughnutChartDetails> = [];
          details.push(
            {
              label: 'Cotizaciones',
              value: item.Cotizaciones.toString(),
            },
            {
              label: 'Partidas Promesa',
              value: item.Partidas.toString(),
            },
            {
              label: 'Valor total Promesa',
              value: new CurrencyFormat().transform(item.TotalPromesaUSD, 'USD') + ' USD',
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
export const selectSearchTerm = createSelector(selectQueryInfo, (state) => state.searchTerm);
export const selectRequestStatus = createSelector(
  selectFollowPromiseList,
  (state: IFollowPPromiseList) => state.listRequestStatus,
);
export const selectDonutChartRequestStatus = createSelector(
  selectFollowPromiseList,
  (state: IFollowPPromiseList) => state.dataDonutRequestStatus,
);
export const selectListItemDonut = createSelector(
  selectFollowPromiseList,
  (state) => state.donutChart?.Partidas,
);
export const selectDataBarChartItem = createSelector(selectListItemDonut, (state) => {
  const dataBarChart = InitialIBarChart();
  dataBarChart.labels = ['ORIGINALES', 'ALTERNATIVAS', 'COMPLEMENTARIAS', 'PROGRAMADAS', 'AHORRO'];
  dataBarChart.values = [
    state?.Original,
    state?.Alternativa,
    state?.Promoción,
    state?.Ahorro,
    state?.Complementaria,
  ];
  dataBarChart.backgroundColor = ['#6a6aae', '#cbb7a3', '#008894', '#e29d2a', '#4ba92b'];
  dataBarChart.images = [
    'assets/Images/pre-processing/originales.svg',
    'assets/Images/pre-processing/alternativas.svg',
    'assets/Images/pre-processing/complementarias.svg',
    'assets/Images/pre-processing/promocion.svg',
    'assets/Images/pre-processing/ahorro.svg',
  ];
  return dataBarChart;
});
export const selectDataBarChartDates = createSelector(
  selectFollowPromiseList,
  (state: IFollowPPromiseList) => {
    const data = state.donutChart;
    const dataBarChart = InitialIBarChart();
    dataBarChart.labels = ['A TIEMPO', 'FUERA DE TIEMPO'];
    dataBarChart.backgroundColor = ['#4ba92b', '#cc4757'];
    dataBarChart.values = [data?.ATiempo, data?.FueraDeTiempo];
    return dataBarChart;
  },
);
export const selectFollowPurchasePromiseListTabsQueryInfo = createSelector(
  selectFollowPPromise,
  (state: IFollowPurchasePromiseState): ResumeGroupQueryInfo => ({
    CountElements: [
      {
        NombreFiltro: 'Total',
        ValorFiltro: '',
      },
      {
        NombreFiltro: 'ATiempo',
        ValorFiltro: true,
      },
      {
        NombreFiltro: 'ATiempo',
        ValorFiltro: false,
      },
    ],
  }),
);

export const selectFollowPurchasePromiseDashboardQueryInfo = createSelector(
  [selectFollowPPromise, selectTabSelected, selectFilterType, selectFiltersType, selectQueryInfo],
  (
    state: IFollowPurchasePromiseState,
    tabOption: ITabOption,
    byOrder: DropListOption,
    typeFilterOption: DropListOption[],
    {searchTerm, dateRange}: ISearchOptions,
  ): ResumeGroupQueryInfo => {
    let filters = {
      Filters: [
        {
          NombreFiltro: 'Activo',
          ValorFiltro: true || '',
        },
      ],
      CountElements: [],
      SumFields: [
        {
          NombreFiltro: 'TotalFacturadoUSD',
          ValorFiltro: '',
        },
        {
          NombreFiltro: 'TotalFacturadoMXN',
          ValorFiltro: '',
        },
        {
          NombreFiltro: 'TotalPromesa',
          ValorFiltro: '',
        },
        {
          NombreFiltro: 'TotalPromesaUSD',
          ValorFiltro: '',
        },
        {
          NombreFiltro: 'Partidas',
          ValorFiltro: '',
        },
      ],
      Fields: [
        {
          Campo: 'IdCliente',
        },
        {
          Campo: 'IdContactoCliente',
        },
        {
          Campo: 'IdCotCotizacion',
        },
        {
          Campo: 'Nombre',
        },
        {
          Campo: 'Alias',
        },
        {
          Campo: 'FechaPromesaDeCompra',
        },
        {
          Campo: 'ATiempo',
        },
        {
          Campo: 'NivelIngreso',
        },
        {
          Campo: 'IdCatNivelIngreso',
        },
        {
          Campo: 'Cotizaciones',
        },
        {
          Campo: 'Folio',
        },
        {
          Campo: 'IdArchivoPDF',
        },
      ],
      GroupColumn: 'IdCotCotizacion',
      SortField: 'Nombre',
      SortDirection: 'desc',
    };
    if (tabOption.label !== FollowPurchasePromiseStatus.Todos) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: 'ATiempo',
            ValorFiltro: mapFollowPurchasePromiseState[tabOption.label],
          },
        ],
      };
    }
    if (byOrder) {
      filters = {
        ...filters,
        SortDirection: byOrder.value,
      };
    }
    if (searchTerm) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: 'Nombre',
            ValorFiltro: searchTerm,
          },
        ],
      };
    }
    if (dateRange) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: 'FechaInicio',
            ValorFiltro: dateRange.startDate.toISOString().split('T')[0],
          },
          {
            NombreFiltro: 'FechaFin',
            ValorFiltro: dateRange.endDate.toISOString().split('T')[0],
          },
        ],
      };
    }
    return filters;
  },
);
export const selectTotalItems = createSelector(selectCustomerList, (state: ICustomerFPP[]) =>
  sumBy(state, (c: ICustomerFPP) => parseInt(c.Partidas.toString())),
);

export const selectTotalPromisePurchaseUSD = createSelector(
  selectCustomerList,
  (state: ICustomerFPP[]) => sumBy(state, (c: ICustomerFPP) => c.TotalPromesaUSD),
);
export const selectFetchMoreCustomersInfo = createSelector(
  selectFollowPromiseList,
  selectCustomerTotal,
  (state: IFollowPPromiseList, totals: number): IFetchMoreItemsInfo => {
    return {
      desiredPage: state.queryInfo.desiredPage,
      itemList: state.customerList,
      itemsTotalLength: totals,
      listRequestStatus: state.listRequestStatus,
      pageSize: state.queryInfo.pageSize,
      totalPages:
        state.totals >= state.queryInfo.pageSize ? Math.ceil(totals / state.queryInfo.pageSize) : 0,
    };
  },
);
