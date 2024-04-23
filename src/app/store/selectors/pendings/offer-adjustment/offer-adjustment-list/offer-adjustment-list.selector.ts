/* Core Imports */
import {createSelector} from '@ngrx/store';
import {flow, forEach, isEmpty, reduce, sumBy} from 'lodash-es';

/* Models Imports */
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {
  IOfferAdjustment,
  OfferAdjustmentListState,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-list/offer-adjustment-list.model';

/* Selectors Imports */
import {selectOfferAdjustmentList} from '@appSelectors/pendings/offer-adjustment/offer-adjustment.selectors';

/* Tools Imports */
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {API_REQUEST_STATUS_LOADING, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';
import {IDoughnutChart, IDoughnutChartDetails, InitialIBarChart} from '@appModels/chart/chart';
import {ResumeGroupQueryInfo} from 'api-logistica';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {ISearchOptions} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import {DateFormatNumber} from '@appPipes/date-format.pipe';
import {
  findTabFilter,
  OfferAdjustmentStatus,
} from '@appHelpers/pending/offer-adjustment/offer-adjustment.helpers';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const selectTotals = createSelector(
  selectOfferAdjustmentList,
  (state: OfferAdjustmentListState) => state.totals,
);
export const totalAmount = createSelector(
  selectOfferAdjustmentList,
  (state: OfferAdjustmentListState) => state.totalAmounts,
);
export const selectOptionTabs = createSelector(
  selectOfferAdjustmentList,
  (state: OfferAdjustmentListState): Array<ITabOption> => state.options,
);
export const selectTabSelected = createSelector(
  selectOfferAdjustmentList,
  (state: OfferAdjustmentListState) => state.tabSelected,
);
export const selectDataFilterByType = createSelector(
  selectOfferAdjustmentList,
  (state: OfferAdjustmentListState) => state.dataByType,
);
export const selectFilterByType = createSelector(
  selectOfferAdjustmentList,
  (state: OfferAdjustmentListState) => state.filterByType,
);
export const selectSearchTerm = createSelector(
  selectOfferAdjustmentList,
  (state: OfferAdjustmentListState) => state.searchTerm,
);
export const selectUsers = createSelector(
  selectOfferAdjustmentList,
  (state: OfferAdjustmentListState) => {
    return state.users.Results;
  },
);
export const selectTotalClients = createSelector(
  selectOfferAdjustmentList,
  (state: OfferAdjustmentListState) => 5,
);
export const selectTotalQuotes = createSelector(
  selectOfferAdjustmentList,
  (state: OfferAdjustmentListState) => 41,
);
export const selectEvis = createSelector(
  selectOfferAdjustmentList,
  (state: OfferAdjustmentListState): IOfferAdjustment[] => state.offerAdjustments,
);
export const selectOfferTotals = createSelector(selectEvis, (state: IOfferAdjustment[]): {
  quotations: number;
  adjustments: number;
} => {
  const totals = {
    adjustments: 0,
    quotations: 0,
  };
  forEach(state, (offer: IOfferAdjustment) => {
    totals.adjustments += offer.ValorTotalAjuste;
    totals.quotations += offer.IdCotCotizacion;
  });
  return totals;
});
export const selectDoughnutChartDataMarks = createSelector(
  selectEvis,
  (list: IOfferAdjustment[]): IDoughnutChart => {
    const labels: Array<string> = [];
    const values: Array<number> = [];
    list.forEach((item: IOfferAdjustment) => {
      labels.push(item.NombreEVI);
      values.push(Number(item.Marcas) || 0);
    });
    return {labels, values};
  },
);
export const selectDoughnutChartDataClients = createSelector(
  selectEvis,
  (list: IOfferAdjustment[]): IDoughnutChart => {
    const labels: Array<string> = [];
    const values: Array<number> = [];
    list.forEach((item: IOfferAdjustment) => {
      labels.push(item.NombreEVI);
      values.push(Number(item.IdCliente));
    });
    return {labels, values};
  },
);
export const selectDoughnutChartMarksOptionDetails = createSelector(
  selectEvis,
  (list: IOfferAdjustment[]) => {
    return flow([
      (): Array<IDoughnutChartDetails> => {
        let totTrademark = 0;
        forEach(list, (o: IOfferAdjustment) => {
          totTrademark += Number(o.Marcas) || 0;
        });
        return [
          {
            label: 'Marcas',
            value: totTrademark.toString(),
          },
        ];
      },
    ])();
  },
);
export const selectDoughnutChartMarksOptionDetailsHover = createSelector(
  selectEvis,
  (list: IOfferAdjustment[]) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(list, (o: IOfferAdjustment) => {
          const details: Array<IDoughnutChartDetails> = [];

          details.push({
            label: 'Marcas',
            value: o.Marcas.toString(),
          });
          data.push(details);
        });
        return data;
      },
    ])(),
);
export const selectDoughnutChartClientsOptionDetails = createSelector(
  selectEvis,
  (list: IOfferAdjustment[]) => {
    return flow([
      (): Array<IDoughnutChartDetails> => {
        let total = 0;
        let totalQuotation = 0;
        let totCustomer = 0;

        forEach(list, (o: IOfferAdjustment) => {
          totalQuotation += o.IdCotCotizacion;
          total += o.ValorTotalAjuste;
          totCustomer += Number(o.IdCliente);
        });
        const val: string = new CurrencyFormat().transform(total, 'USD') + ' USD';
        return [
          {
            label: 'Clientes',
            value: totCustomer.toString(),
          },
          {label: 'Cotizaciones', value: totalQuotation.toString()},
          {label: 'Valor Total en Ajuste', value: val},
        ];
      },
    ])();
  },
);
export const selectDonutCustomerHover = createSelector(selectEvis, (list) =>
  flow([
    (): Array<Array<IDoughnutChartDetails>> => {
      const data: Array<Array<IDoughnutChartDetails>> = [];

      forEach(list, (item: IOfferAdjustment) => {
        const details: Array<IDoughnutChartDetails> = [];
        details.push(
          {
            label: 'Cotizaciones',
            value: item.IdCotCotizacion.toString(),
          },
          {
            label: 'Valor total en Ajuste',
            value: new CurrencyFormat().transform(item.ValorTotalAjuste, 'USD') + ' USD',
          },
        );
        data.push(details);
      });
      return data;
    },
  ])(),
);
export const selectDataBarChartSettings = createSelector(
  selectEvis,
  (options: Array<IOfferAdjustment>) => {
    const dataBarChart = InitialIBarChart();
    dataBarChart.labels = ['t. entrega', 'c.pago', 'precio'];
    dataBarChart.values = [
      sumBy(options, (o: IOfferAdjustment) => o.AjuteTiempoEntrega),
      sumBy(options, (o: IOfferAdjustment) => o.AjuteCondicionesPago),
      sumBy(options, (o: IOfferAdjustment) => o.AjutePrecio),
    ];
    dataBarChart.backgroundColor = ['#4ba92b', '#5d80e4', '#cc4757'];
    return dataBarChart;
  },
);
export const selectDataBarChartItems = createSelector(selectEvis, (items: IOfferAdjustment[]) => {
  const dataBarChart = InitialIBarChart();
  dataBarChart.labels = ['ORIGINALES', 'ALTERNATIVAS', 'COMPLEMENTARIAS', 'PROMOCIÓN', 'AHORRO'];

  // DOCS: Utilizar reduce para calcular las sumas de las partidas
  const totalPartidas = reduce(
    items,
    (totals, item) => {
      totals[0] += item.PartidasOriginal;
      totals[1] += item.PartidasAlternativa;
      totals[2] += item.PartidasComplementaria;
      totals[3] += item.PartidasPromocion;
      totals[4] += item.PartidasAhorro;
      return totals;
    },
    [0, 0, 0, 0, 0],
  );

  dataBarChart.values = [...totalPartidas];

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
export const selectQueryInfo = createSelector(
  selectOfferAdjustmentList,
  (state) => state.clientsOptions,
);
export const selectFilterByDate = createSelector(
  selectOfferAdjustmentList,
  (state) => state.filterByDates,
);
export const selectFiltersCustomer = createSelector(
  selectQueryInfo,
  selectTabSelected,
  selectFilterByType,
  selectFilterByDate,
  selectSearchTerm,
  (queryInfo: ISearchOptions, tabFilter, orderBy, filterDate, searchTerm) => {
    const params = new FiltersOnlyActive();

    if (searchTerm && searchTerm !== '') {
      params.Filters.push({
        NombreFiltro: 'ClienteFolio',
        ValorFiltro: searchTerm,
      });
    }
    if (!isEmpty(filterDate)) {
      params.Filters.push({
        NombreFiltro: 'FechaInicio',
        ValorFiltro: new DateFormatNumber().transform(filterDate.startDate, '-', 'month'),
      });
      params.Filters.push({
        NombreFiltro: 'FechaFin',
        ValorFiltro: new DateFormatNumber().transform(filterDate.endDate, '-', 'month'),
      });
    }

    if (tabFilter.id !== '1') {
      const types = {
        2: 'ConAjusteTiempoEntrega',
        3: 'ConAjusteCondicionesPago',
        4: 'ConAjustePrecio',
      };
      params.Filters.push({
        NombreFiltro: types[tabFilter.id],
        ValorFiltro: true,
      });
    }
    params.SortField = 'TotalUSDPartidasEnAjuste';
    if (orderBy.value === '1') {
      params.SortDirection = 'Desc';
    } else {
      params.SortDirection = 'Asc';
    }
    params.desiredPage = queryInfo.desiredPage;
    params.pageSize = queryInfo.pageSize;
    return params;
  },
);
export const selectCurrentPage = createSelector(selectQueryInfo, (state) => state.desiredPage);
export const selectIsSuccessTrademark = createSelector(
  selectOfferAdjustmentList,
  (state) => state.isLoadingTrademark === API_REQUEST_STATUS_SUCCEEDED,
);
export const selectIsSuccessCustomer = createSelector(
  selectOfferAdjustmentList,
  (state) => state.isLoadingCustomers === API_REQUEST_STATUS_SUCCEEDED,
);
export const selectIsLadingEvi = createSelector(
  selectOfferAdjustmentList,
  (state) => state.listUsersStatus === API_REQUEST_STATUS_LOADING,
);

// DOCS: SELECTORS FOR NEW SERVICES
export const selectOfferAdjustemDashboardQueryInfo = createSelector(
  [selectOfferAdjustmentList, selectTabSelected, selectSearchTerm, selectFilterByType],
  (
    state: OfferAdjustmentListState,
    tabSelected: ITabOption,
    searchTerm: string,
    filterByType: DropListOption,
  ): ResumeGroupQueryInfo => {
    let filters = {
      Filters: [],
      GroupColumn: 'IdUsuarioEVI',
      Fields: [{Campo: 'NombreEVI'}, {Campo: 'ValorTotalAjuste'}],
      CountElements: [{NombreFiltro: 'Total', ValorFiltro: ''}],
      SumFields: [
        {NombreFiltro: 'AjuteTiempoEntrega', ValorFiltro: ''},
        {NombreFiltro: 'AjuteCondicionesPago', ValorFiltro: ''},
        {NombreFiltro: 'AjutePrecio', ValorFiltro: ''},
        {NombreFiltro: 'PartidasOriginal', ValorFiltro: ''},
        {NombreFiltro: 'PartidasAlternativa', ValorFiltro: ''},
        {NombreFiltro: 'PartidasComplementaria', ValorFiltro: ''},
        {NombreFiltro: 'PartidasPromocion', ValorFiltro: ''},
        {NombreFiltro: 'PartidasAhorro', ValorFiltro: ''},
        {NombreFiltro: 'Marcas', ValorFiltro: ''},
      ],
      DistinctFields: [
        {NombreFiltro: 'IdCliente', ValorFiltro: ''},
        {NombreFiltro: 'IdCotCotizacion', ValorFiltro: ''},
      ],
      //Ordenamiento por defecto
      SortField: 'ValorTotalAjuste',
      SortDirection: filterByType?.value === '1' ? 'asc' : 'desc',
    };
    if (tabSelected.label !== OfferAdjustmentStatus.Todos) {
      const tabFilter = findTabFilter(tabSelected.label);
      filters = {
        ...filters,
        Filters: [...filters.Filters, {NombreFiltro: `${tabFilter}`, ValorFiltro: true}],
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
    return filters;
  },
);
export const selectDashboardApiStatus = createSelector(
  selectOfferAdjustmentList,
  (state: OfferAdjustmentListState): number => state.dashboardApiStatus,
);
