/* Core Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectConfirmDispatchList} from '@appSelectors/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch.selectors';

/* Models Imports */
import {IDoughnutChart, IDoughnutChartDetails, InitialIBarChart} from '@appModels/chart/chart';
import {
  ImpCDDashBoardGraficasTotales,
  ImpCDgDonaEntrega,
  ImpCDGDonaFlete,
  ImpCDGDonaProveedor,
  QueryInfo,
} from 'api-logistica';
import {IConfirmDispatchList} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-list/confirm-dispatch-list.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';

/* Common Imports */
import {API_REQUEST_STATUS_DEFAULT, API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';

/* Tools Imports */
import {filter, flow, forEach, isEmpty} from 'lodash-es';

export const selectSearchTerm = createSelector(
  selectConfirmDispatchList,
  (state: IConfirmDispatchList) => state.searchTerm,
);
export const selectSortList = createSelector(
  selectConfirmDispatchList,
  (state: IConfirmDispatchList) => state.dataByType,
);
export const selectSort = createSelector(
  selectConfirmDispatchList,
  (state: IConfirmDispatchList) => state.filterByType,
);
export const selectTypesOfSearch = createSelector(
  selectConfirmDispatchList,
  (state: IConfirmDispatchList) => state.listTypesOfSearch,
);
export const selectNeedsToReloadProviders = createSelector(
  selectConfirmDispatchList,
  (state: IConfirmDispatchList) => state.needsToReloadProviders,
);
export const selectTypeOfSearchSelected = createSelector(
  selectConfirmDispatchList,
  (state: IConfirmDispatchList) => state.typeOfSearch,
);
export const selectQueryInfoProviders = createSelector(
  [selectSearchTerm, selectTypeOfSearchSelected, selectSort],
  (searchTerm: string, typeSelected: DropListOption, sort: DropListOption) => {
    const queryInfo: QueryInfo = {};
    queryInfo.Filters = [];
    if (searchTerm !== '') {
      if (typeSelected.value === '1') {
        queryInfo.Filters.push({
          NombreFiltro: 'NombreProveedor',
          ValorFiltro: searchTerm,
        });
      } else if (typeSelected.value === '2') {
        queryInfo.Filters.push({
          NombreFiltro: 'OrdenDeCompraProveedor',
          ValorFiltro: searchTerm,
        });
      }
    }
    if (sort.value === '1') {
      queryInfo.SortDirection = 'desc';
    } else {
      queryInfo.SortDirection = 'asc';
    }
    queryInfo.SortField = 'TotalUSD';
    /*queryInfo.pageSize = 100;
    queryInfo.desiredPage = 1;*/

    return queryInfo;
  },
);
export const selectProviders = createSelector(
  selectConfirmDispatchList,
  (state: IConfirmDispatchList) => state.providers,
);
export const selectIsLoadingProviders = createSelector(
  selectConfirmDispatchList,
  (state: IConfirmDispatchList) =>
    state.providersStatus === API_REQUEST_STATUS_DEFAULT ||
    state.providersStatus === API_REQUEST_STATUS_LOADING,
);
export const selectIsLoadingDataCharts = createSelector(
  selectConfirmDispatchList,
  (state: IConfirmDispatchList) =>
    state.dataChartsStatus === API_REQUEST_STATUS_DEFAULT ||
    state.dataChartsStatus === API_REQUEST_STATUS_LOADING,
);
export const selectNeedsToReloadDataCharts = createSelector(
  selectConfirmDispatchList,
  (state: IConfirmDispatchList) => state.needsToReloadDataCharts,
);
export const selectDataCharts = createSelector(
  selectConfirmDispatchList,
  (state: IConfirmDispatchList) => state.dataCharts,
);
export const selectDataChartProviders = createSelector(
  selectConfirmDispatchList,
  (state: IConfirmDispatchList) => state.dataCharts.listImpCDGDonaProveedor,
);
export const selectDonutChartDataProviders = createSelector(
  selectDataCharts,
  (dataChart: ImpCDDashBoardGraficasTotales) => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    dataChart?.listImpCDGDonaProveedor.forEach((item: ImpCDGDonaProveedor) => {
      labels.push(item.NombreProveedor);
      values.push(item.OrdenesCompra);
    });
    data = {labels, values};

    return data;
  },
);
export const selectDonutChartProvidersDetails = createSelector(
  selectDataCharts,
  (dataChart: ImpCDDashBoardGraficasTotales) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        const totalOc = !isEmpty(dataChart) ? dataChart.OrdenesCompraTotal : 0;
        const totalPieces = !isEmpty(dataChart) ? dataChart.PiezasTotal : 0;
        const totalProducts = !isEmpty(dataChart) ? dataChart.ProductosTotal : 0;
        const totalProviders = !isEmpty(dataChart) ? dataChart.ProveedoresTotal : 0;
        const totalAmount = !isEmpty(dataChart)
          ? `${new CurrencyFormat().transform(dataChart.ValorTotalProveedor, 'USD')} USD`
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
            value: totalOc.toString(),
          },
          {
            label: 'Valor Total',
            value: totalAmount,
          },
        ];
      },
    ])(),
);
export const selectDonutChartProvidersDetailsHover = createSelector(
  selectDataCharts,
  (dataChart: ImpCDDashBoardGraficasTotales) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        const listProviders: Array<ImpCDGDonaProveedor> = dataChart.listImpCDGDonaProveedor;
        forEach(listProviders, (provider: ImpCDGDonaProveedor) => {
          const details: Array<IDoughnutChartDetails> = [];
          details.push(
            {
              label: 'Productos',
              value: provider.Prodcutos.toString(),
            },
            {
              label: 'Piezas',
              value: provider.Piezas.toString(),
            },
            {
              label: 'OC',
              value: provider.OrdenesCompra.toString(),
            },
            {
              label: 'Valor Total',
              value: `${new CurrencyFormat().transform(provider.ValotTotal, 'USD')} USD`,
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
export const selectDonutChartDataFreight = createSelector(
  selectDataCharts,
  (dataChart: ImpCDDashBoardGraficasTotales) => {
    let data: IDoughnutChart;
    const labels: Array<string> = ['Flete Normal', 'Flete Express'];
    const values: Array<number> = [dataChart.FletesNormalTotal, dataChart.FletesExpressTotal];
    data = {labels, values};
    return data;
  },
);
export const selectDonutChartFreightDetails = createSelector(
  selectDataCharts,
  (dataChart: ImpCDDashBoardGraficasTotales) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        const typeFreigth = !isEmpty(dataChart) ? dataChart.TiposFleteTotal : 0;
        const normalFreights = !isEmpty(dataChart) ? dataChart.FletesNormalTotal : 0;
        const expressFreights = !isEmpty(dataChart) ? dataChart.FletesExpressTotal : 0;
        const totalAmount = !isEmpty(dataChart)
          ? `${new CurrencyFormat().transform(dataChart.ValorTotalFlete, 'USD')} USD`
          : `${new CurrencyFormat().transform(0, 'USD')} USD`;

        return [
          {
            label: 'Tipo de Flete',
            value: typeFreigth.toString(),
          },
          {
            label: 'Normal',
            value: normalFreights.toString(),
          },
          {
            label: 'Express',
            value: expressFreights.toString(),
          },
          {
            label: 'Valor Total',
            value: totalAmount,
          },
        ];
      },
    ])(),
);
export const selectDonutChartFreightDetailsHover = createSelector(
  selectDataCharts,
  (dataChart: ImpCDDashBoardGraficasTotales) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        if (dataChart.FletesNormalTotal > 0) {
          const total: Array<ImpCDGDonaFlete> = filter(
            dataChart.listImpCDGDonaFlete,
            (o: ImpCDGDonaFlete) => o.NombreFlete === 'Normal',
          );
          data.push([
            {
              label: 'Flete Normal',
              value: dataChart.FletesNormalTotal.toString(),
            },
            {
              label: 'Valor Total',
              value: `${new CurrencyFormat().transform(
                !isEmpty(total) ? total[0].ValotTotal : 0,
                'USD',
              )} USD`,
            },
          ]);
        }
        if (dataChart.FletesExpressTotal > 0) {
          const total: Array<ImpCDGDonaFlete> = filter(
            dataChart.listImpCDGDonaFlete,
            (o: ImpCDGDonaFlete) => o.NombreFlete === 'Express',
          );
          data.push([
            {
              label: 'Flete Express',
              value: dataChart.FletesExpressTotal.toString(),
            },
            {
              label: 'Valor Total',
              value: `${new CurrencyFormat().transform(
                !isEmpty(total) ? total[0].ValotTotal : 0,
                'USD',
              )} USD`,
            },
          ]);
        }
        return data;
      },
    ])(),
);
export const selectDonutChartDataDelivery = createSelector(
  selectDataCharts,
  (dataChart: ImpCDDashBoardGraficasTotales) => {
    let data: IDoughnutChart;
    const labels: Array<string> = ['Únicas', 'Programadas'];
    const values: Array<number> = [
      dataChart.EntregasUnicasTotal,
      dataChart.EntregasProgramadasTotal,
    ];
    data = {labels, values};
    return data;
  },
);
export const selectDonutChartDeliveryDetails = createSelector(
  selectDataCharts,
  (dataChart: ImpCDDashBoardGraficasTotales) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        const typeDelivery = !isEmpty(dataChart) ? dataChart.TiposEntregaTotal : 0;
        const programmingDelivery = !isEmpty(dataChart) ? dataChart.EntregasProgramadasTotal : 0;
        const onlyDelivery = !isEmpty(dataChart) ? dataChart.EntregasUnicasTotal : 0;
        const totalAmount = !isEmpty(dataChart)
          ? `${new CurrencyFormat().transform(dataChart.ValorTotalEntregas, 'USD')} USD`
          : `${new CurrencyFormat().transform(0, 'USD')} USD`;

        return [
          {
            label: 'Tipo de entrega',
            value: typeDelivery.toString(),
          },
          {
            label: 'Únicas',
            value: onlyDelivery.toString(),
          },
          {
            label: 'Programadas',
            value: programmingDelivery.toString(),
          },
          {
            label: 'Valor Total',
            value: totalAmount,
          },
        ];
      },
    ])(),
);
export const selectDonutChartDeliveryDetailsHover = createSelector(
  selectDataCharts,
  (dataChart: ImpCDDashBoardGraficasTotales) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];

        if (dataChart.EntregasUnicasTotal > 0) {
          const total: Array<ImpCDgDonaEntrega> = filter(
            dataChart.listImpCDgDonaEntrega,
            (o: ImpCDgDonaEntrega) => o.NombreEntrega === 'Únicas',
          );
          data.push([
            {
              label: 'Entrega Única',
              value: dataChart.EntregasUnicasTotal.toString(),
            },
            // TODO: Pendiente por implementar en backend
            {
              label: 'Valor Total',
              value: `${new CurrencyFormat().transform(
                !isEmpty(total) ? total[0].ValotTotal : 0,
                'USD',
              )} USD`,
            },
          ]);
        }
        if (dataChart.EntregasProgramadasTotal > 0) {
          const total: Array<ImpCDgDonaEntrega> = filter(
            dataChart.listImpCDgDonaEntrega,
            (o: ImpCDgDonaEntrega) => o.NombreEntrega === 'Programadas',
          );
          data.push([
            {
              label: 'Entrega Programada',
              value: dataChart.EntregasProgramadasTotal.toString(),
            },
            // TODO: Pendiente por implementar en backend
            {
              label: 'Valor Total',
              value: `${new CurrencyFormat().transform(
                !isEmpty(total) ? total[0].ValotTotal : 0,
                'USD',
              )} USD`,
            },
          ]);
        }
        return data;
      },
    ])(),
);
export const selectDataBarChartTime = createSelector(
  selectDataCharts,
  (dataChart: ImpCDDashBoardGraficasTotales) => {
    const dataBarChart = InitialIBarChart();
    dataBarChart.labels = ['3 + días', '3 días', '2 días', '1 día'];
    dataBarChart.values = [
      dataChart.objImpCDGBarrasTReferencia.TresMasDias,
      dataChart.objImpCDGBarrasTReferencia.TresDias,
      dataChart.objImpCDGBarrasTReferencia.DosDias,
      dataChart.objImpCDGBarrasTReferencia.UnDia,
    ];
    dataBarChart.backgroundColor = ['#008894', '#008894', '#008894', '#008894'];
    return dataBarChart;
  },
);
export const selectDataBarChartDelivery = createSelector(
  selectDataCharts,
  (dataChart: ImpCDDashBoardGraficasTotales) => {
    const dataBarChart = InitialIBarChart();
    dataBarChart.labels = ['fuera de tiempo', 'urgente', 'en tiempo'];
    dataBarChart.values = [
      dataChart.objImpCDGBarrasSemaforoEntrega.OcFueraDeTiempo,
      dataChart.objImpCDGBarrasSemaforoEntrega.OcUrgente,
      dataChart.objImpCDGBarrasSemaforoEntrega.OcEnTiempo,
    ];
    dataBarChart.backgroundColor = ['#cc435e', '#e29d2a', '#4ba92b'];
    return dataBarChart;
  },
);
export const selectTotalFooter = createSelector(
  selectDataCharts,
  (dataChart: ImpCDDashBoardGraficasTotales) => {
    return {
      totalResults: !isEmpty(dataChart) ? dataChart.ProveedoresTotal : 0,
      oc: !isEmpty(dataChart) ? dataChart.OrdenesCompraTotal : 0,
      products: !isEmpty(dataChart) ? dataChart.ProductosTotal : 0,
      pieces: !isEmpty(dataChart) ? dataChart.PiezasTotal : 0,
      amountTotal: !isEmpty(dataChart) ? dataChart.ValorTotalProveedor : 0,
    };
  },
);
