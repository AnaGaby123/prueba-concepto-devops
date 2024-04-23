/* Selectors Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectDispatchMonitoringList} from '@appSelectors/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring.selectors';

/* Models Imports */
import {
  IDispatchMonitoringList,
  IProvidersDispatchMonitoring,
} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list.models';
import {IDoughnutChart, IDoughnutChartDetails, InitialIBarChart} from '@appModels/chart/chart';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

/* Tools Imports */
import {flow, forEach, isEmpty} from 'lodash-es';

/* Common Imports */
import {MonitorearDespachoTotales, QueryInfo} from 'api-logistica';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';

export const selectSortList = createSelector(
  selectDispatchMonitoringList,
  (state: IDispatchMonitoringList) => state.sortList,
);
export const selectSorOption = createSelector(
  selectDispatchMonitoringList,
  (state: IDispatchMonitoringList) => state.sortByType,
);
export const selectSearchTerm = createSelector(
  selectDispatchMonitoringList,
  (state: IDispatchMonitoringList) => state.searchTerm,
);
export const selectNeedsToReloadProviders = createSelector(
  selectDispatchMonitoringList,
  (state: IDispatchMonitoringList) => state.needsToReloadProviders,
);
export const selectQueryInfoProviders = createSelector(
  [selectSearchTerm, selectSorOption],
  (searchTerm: string, sort: DropListOption) => {
    const queryInfo: QueryInfo = {};
    queryInfo.Filters = [];
    if (searchTerm !== '') {
      queryInfo.Filters.push({
        NombreFiltro: 'ProveedorONumeroDeGuia',
        ValorFiltro: searchTerm,
      });
    }
    if (sort.value === '1') {
      queryInfo.SortDirection = 'desc';
    } else {
      queryInfo.SortDirection = 'asc';
    }
    queryInfo.SortField = 'MontoTotal';
    return queryInfo;
  },
);
export const selectProviders = createSelector(
  selectDispatchMonitoringList,
  (state: IDispatchMonitoringList) => state.providers,
);
export const selectProvidersStatus = createSelector(
  selectDispatchMonitoringList,
  (state: IDispatchMonitoringList) => state.providerStatus,
);
export const selectDataChartsStatus = createSelector(
  selectDispatchMonitoringList,
  (state: IDispatchMonitoringList) => state.dataChartsStatus,
);
export const selectDataCharts = createSelector(
  selectDispatchMonitoringList,
  (state: IDispatchMonitoringList) => state.dataCharts,
);
export const selectNeedsToReloadCharts = createSelector(
  selectDispatchMonitoringList,
  (state: IDispatchMonitoringList) => state.needsToReloadCharts,
);
export const selectTotalsFooter = createSelector(
  selectDataCharts,
  (dataChart: MonitorearDespachoTotales) => {
    return {
      totalResults: !isEmpty(dataChart) ? dataChart.Proveedores : 0,
      oc: !isEmpty(dataChart) ? dataChart.OC : 0,
      products: !isEmpty(dataChart) ? dataChart.Productos : 0,
      pieces: !isEmpty(dataChart) ? dataChart.NumeroDePiezas : 0,
      TotalAmount: !isEmpty(dataChart) ? dataChart.ValorTotalUSD : 0,
    };
  },
);
export const selectDonutChartData = createSelector(
  [selectDataCharts, selectProviders],
  (dataChart: MonitorearDespachoTotales, providers: IProvidersDispatchMonitoring[]) => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    providers?.forEach((item: IProvidersDispatchMonitoring) => {
      labels.push(item.NombreProveedor);
      values.push(item.OC);
    });
    data = {labels, values};
    return data;
  },
);
export const selectDonutChartDetails = createSelector(
  selectDataCharts,
  (dataChart: MonitorearDespachoTotales) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        const totalOC = !isEmpty(dataChart) ? dataChart.OC : 0;
        const totalPieces = !isEmpty(dataChart) ? dataChart.NumeroDePiezas : 0;
        const totalProducts = !isEmpty(dataChart) ? dataChart.Productos : 0;
        const totalProviders = !isEmpty(dataChart) ? dataChart.Proveedores : 0;
        const totalAmount = !isEmpty(dataChart)
          ? `${new CurrencyFormat().transform(dataChart.ValorTotalUSD, 'USD')} USD`
          : `${new CurrencyFormat().transform(0, 'USD')} USD`;
        return [
          {
            label: 'Proveedores',
            value: totalProviders.toString(),
          },
          {
            label: 'Productos',
            value: totalProducts.toString(),
          },
          {
            label: 'Piezas',
            value: totalPieces.toString(),
          },
          {
            label: 'OC',
            value: totalOC.toString(),
          },
          {
            label: 'Valor Total',
            value: totalAmount,
          },
        ];
      },
    ])(),
);
export const selectDonutChartDetailsHover = createSelector(
  [selectDataCharts, selectProviders],
  (dataChart: MonitorearDespachoTotales, providers: IProvidersDispatchMonitoring[]) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(providers, (provider: IProvidersDispatchMonitoring) => {
          const details: Array<IDoughnutChartDetails> = [];
          details.push(
            {
              label: 'Productos',
              value: provider.Productos.toString(),
            },
            {
              label: 'Piezas',
              value: provider.NumeroDePiezas.toString(),
            },
            {
              label: 'OC',
              value: provider.OC.toString(),
            },
            {
              label: 'Valor Total',
              value: `${new CurrencyFormat().transform(provider.MontoTotal, 'USD')} USD`,
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
export const selectDataBarChartTime = createSelector(
  selectDataCharts,
  (dataChart: MonitorearDespachoTotales) => {
    const dataBarChart = InitialIBarChart();
    dataBarChart.labels = ['3 + días', '3 días', '2 días', '1 día'];
    dataBarChart.values = [
      dataChart.GuiasAMasDe3Dias,
      dataChart.GuiasA3Dias,
      dataChart.GuiasA2Dias,
      dataChart.GuiasA1Dia,
    ];
    dataBarChart.backgroundColor = ['#008894', '#008894', '#008894', '#008894'];
    return dataBarChart;
  },
);
export const selectDataBarChartDelivery = createSelector(
  selectDataCharts,
  (dataChart: MonitorearDespachoTotales) => {
    const dataBarChart = InitialIBarChart();
    dataBarChart.labels = ['fuera de tiempo', 'urgente', 'en tiempo'];
    dataBarChart.values = [
      dataChart.GuiasFueraDeTiempo,
      dataChart.GuiasUrgentes,
      dataChart.GuiasEnTiempo,
    ];
    dataBarChart.backgroundColor = ['#cc435e', '#e29d2a', '#4ba92b'];
    return dataBarChart;
  },
);
