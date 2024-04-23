import {createSelector} from '@ngrx/store';
import {selectDeclareTransitArrivalList} from '@appSelectors/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival.selectors';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {GraficasDashboardDeclararArribos} from 'api-logistica';
import {IDoughnutChart, IDoughnutChartDetails, InitialIBarChart} from '@appModels/chart/chart';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {flow, forEach, isEmpty} from 'lodash-es';

import {IProvider} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';

export const selectDeclareTransitAList = createSelector(
  selectDeclareTransitArrivalList,
  (state) => state,
);
export const selectDataByOrder = createSelector(
  selectDeclareTransitAList,
  (state) => state.dataByType,
);
export const selectOrderList = createSelector(
  selectDeclareTransitAList,
  (state) => state.filterByType,
);
export const selectQueryInfoOptions = createSelector(
  selectDeclareTransitAList,
  (state) => state.queryInfo,
);
export const selectSearchTerm = createSelector(selectQueryInfoOptions, (state) => state.searchTerm);
export const selectTab = createSelector(selectDeclareTransitAList, (state) => state.selectedTab);
export const selectTotals = createSelector(selectDeclareTransitAList, (state) => state.donutChart);
export const selectStatusCharts = createSelector(
  selectDeclareTransitAList,
  (state) => state.statusApiDonut,
);
export const selectProvidersStatus = createSelector(
  selectDeclareTransitAList,
  (state) => state.queryInfo.requestStatus,
);
export const selectListTab = createSelector(
  selectDeclareTransitAList,
  selectTotals,
  (state, totals) => {
    let tabs: Array<ITabOption> = [];
    tabs = [
      {
        id: '1',
        label: 'Todos',
        activeSubtitle: true,
        labelSubtitle: 'Entregas',
        totalSubtitle: totals.OrdenesDeCompra,
      },
      {
        id: '2',
        label: 'Fuera de tiempo',
        activeSubtitle: true,
        labelSubtitle: 'Entregas',
        totalSubtitle: totals.OrdenesDeCompraFueraDeTiempo,
      },
      {
        id: '3',
        label: 'Urgente',
        activeSubtitle: true,
        labelSubtitle: 'Entregas',
        totalSubtitle: totals.OrdenesDeCompraUrgente,
      },
      {
        id: '4',
        label: 'En tiempo',
        activeSubtitle: true,
        labelSubtitle: 'Entregas',
        totalSubtitle: totals.OrdenesDeCompraEnTiempo,
      },
    ];
    return tabs;
  },
);
export const selectQueryInfo = createSelector(
  selectDeclareTransitAList,
  (state) => state.queryInfo,
);
export const selectCurrentPage = createSelector(
  selectQueryInfo,
  (state) => state.requestStatus === API_REQUEST_STATUS_LOADING,
);
export const selectParamsProviders = createSelector(
  selectQueryInfo,
  selectTab,
  selectOrderList,
  (queryInfo, tab, sort) => {
    const params = new FiltersOnlyActive();
    params.Filters.push({
      NombreFiltro: 'PHS',
      ValorFiltro: true,
    });
    if (tab.id !== '1') {
      const types = {
        2: 'TieneFueraDeTiempo ',
        3: 'TieneUrgente',
        4: 'TieneEnTiempo',
      };
      params.Filters.push({
        NombreFiltro: types[tab.id],
        ValorFiltro: true,
      });
    }
    if (queryInfo.searchTerm) {
      params.Filters.push({
        NombreFiltro: 'NombreProveedor',
        ValorFiltro: queryInfo.searchTerm,
      });
    }
    params.SortField = 'TotalUSD';
    params.SortDirection = sort.value === '1' ? 'Desc' : 'Asc';
    params.pageSize = queryInfo.pageSize;
    params.desiredPage = queryInfo.desiredPage;
    return params;
  },
);
export const selectListProviders = createSelector(
  selectDeclareTransitAList,
  (state) => state.providers.Results,
);
export const selectTotalsProviders = createSelector(
  selectDeclareTransitAList,
  (state) => state.providers.TotalResults,
);
export const selectListDoughnutChart = createSelector(
  selectDeclareTransitAList,
  (state) => state.donutChart,
);
export const selectDataDoughnutChart = createSelector(
  selectListDoughnutChart,
  selectListProviders,
  (dataChart: GraficasDashboardDeclararArribos, providers) => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    providers?.forEach((item: IProvider) => {
      labels.push(item.NombreProveedor);
      values.push(item.TotalUSD);
    });
    data = {labels, values};
    return data;
  },
);
export const selectDataDetailsDoughnutChart = createSelector(
  selectListDoughnutChart,
  (dataChart: GraficasDashboardDeclararArribos) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        const totalProviders = !isEmpty(dataChart) ? dataChart.Proveedores : 0;
        const totalPurchases = !isEmpty(dataChart) ? dataChart.OrdenesDeCompra : 0;
        const totalPieces = !isEmpty(dataChart.Piezas) ? dataChart.Piezas : 0;
        const totalAmount = !isEmpty(dataChart)
          ? `${new CurrencyFormat().transform(dataChart.MontoTotal, 'USD')} USD`
          : `${new CurrencyFormat().transform(0, 'USD')} USD`;
        return [
          {
            label: 'Proveedores',
            value: totalProviders.toString(),
          },
          {
            label: 'Compras',
            value: totalPurchases.toString(),
          },
          {
            label: 'Piezas',
            value: totalPieces.toString(),
          },
          {
            label: 'Total',
            value: totalAmount,
          },
        ];
      },
    ])(),
);
export const selectDataDetailsHoverDoughnutChart = createSelector(
  [selectListDoughnutChart, selectListProviders],
  (dataChart: GraficasDashboardDeclararArribos, providers) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(providers, (provider: IProvider) => {
          const details: Array<IDoughnutChartDetails> = [];
          details.push(
            {
              label: 'Compras',
              value: provider.TotalOrdenesDeCompra.toString(),
            },
            {
              label: 'Piezas',
              value: provider.NumeroDePiezas.toString(),
            },
            {
              label: 'Valor total',
              value: new CurrencyFormat().transform(provider.TotalUSD, 'USD'),
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
export const selectDataBarChartDelivery = createSelector(
  selectTotals,
  (dataChart: GraficasDashboardDeclararArribos) => {
    const dataBarChart = InitialIBarChart();
    dataBarChart.labels = ['fuera de tiempo', 'urgente', 'en tiempo'];
    dataBarChart.values = [
      dataChart.PiezasFueraDeTiempo,
      dataChart.PiezasUrgente,
      dataChart.PiezasEnTiempo,
    ];
    dataBarChart.backgroundColor = ['#cc435e', '#e29d2a', '#4ba92b'];
    return dataBarChart;
  },
);
