import {createSelector} from '@ngrx/store';
import {selectOrderModificationL} from '@appSelectors/pendings/order-modification/order-modification.selectors';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {DateFormatNumber} from '@appPipes/date-format.pipe';
import {IOrderModificationList} from '@appModels/store/pendings/order-modification/order-modification-list/order-modification-list.model';
import {flow, forEach, isEmpty} from 'lodash-es';

import {
  IBarChart,
  IDoughnutChart,
  IDoughnutChartDetails,
  InitialIBarChart,
} from '@appModels/chart/chart';
import {VClienteModificacionPedido} from 'api-logistica';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';

export const selectOrderModificationList = createSelector(
  selectOrderModificationL,
  (state) => state,
);
export const selectDataFilters = createSelector(
  selectOrderModificationList,
  (state) => state.dataByType,
);
export const selectFilterSelected = createSelector(
  selectOrderModificationList,
  (state) => state.filterByType,
);
export const selectTab = createSelector(selectOrderModificationList, (state) => state.tabSelected);
export const selectQueryInfo = createSelector(
  selectOrderModificationList,
  (state) => state.queryInfo,
);
export const selectTotalOrders = createSelector(
  selectOrderModificationList,
  (state: IOrderModificationList) => state.totals.TotalPedidos,
);
export const selectTotalOrderWithIncidences = createSelector(
  selectOrderModificationList,
  (state: IOrderModificationList) => state.totals.TotalPedidosConIncidencias,
);
export const selectTotalOrderWithoutIncidences = createSelector(
  selectOrderModificationList,
  (state: IOrderModificationList) => state.totals.TotalPedidosSinIncidencias,
);
export const selectTotalOrdersShow = createSelector(
  [selectOrderModificationList, selectTab],
  (state: IOrderModificationList, tabSelected: ITabOption) => {
    let totalOrder = 0;
    if (tabSelected.id === '1') {
      totalOrder = state.totals.TotalPedidos;
    } else if (tabSelected.id === '2') {
      totalOrder = state.totals.TotalPedidosSinIncidencias;
    } else if (tabSelected.id === '3') {
      totalOrder = state.totals.TotalPedidosConIncidencias;
    }

    return totalOrder;
  },
);
export const selectTotalAmount = createSelector(
  [selectOrderModificationList, selectTab],
  (state: IOrderModificationList, tabSelected: ITabOption) => {
    let totalAmount = 0;
    if (tabSelected.id === '1') {
      totalAmount = state.totals.ValorTotal;
    } else if (tabSelected.id === '2') {
      totalAmount = state.totals.ValorTotalPedidosSinIncidencias;
    } else if (tabSelected.id === '3') {
      totalAmount = state.totals.ValorTotalPedidosConIncidencias;
    }

    return totalAmount;
  },
);
export const selectNeedsToReloadTotals = createSelector(
  selectOrderModificationList,
  (state: IOrderModificationList) => state.totalsNeedsToReload,
);
export const selectDataTabs = createSelector(
  [
    selectOrderModificationList,
    selectTotalOrders,
    selectTotalOrderWithIncidences,
    selectTotalOrderWithoutIncidences,
  ],
  (
    state: IOrderModificationList,
    totalOrders: number,
    totalOrdersWithIncidences: number,
    totalOrdersWithoutIncidences: number,
  ) => {
    const data: Array<ITabOption> = [
      {
        id: '1',
        label: 'Todos los pedidos',
        activeSubtitle: true,
        labelSubtitle: 'Pedidos',
        totalSubtitle: totalOrders,
      },
      {
        id: '2',
        label: 'Sin Incidencias',
        activeSubtitle: true,
        labelSubtitle: 'Pedidos',
        totalSubtitle: totalOrdersWithoutIncidences,
      },
      {
        id: '3',
        label: 'Con Incidencias',
        activeSubtitle: true,
        labelSubtitle: 'Pedidos',
        totalSubtitle: totalOrdersWithIncidences,
      },
    ];
    return data;
  },
);
export const selectParams = createSelector(
  selectTab,
  selectQueryInfo,
  selectFilterSelected,
  (tab, queryInfo, orderBy) => {
    const params = new FiltersOnlyActive();
    if (tab.id !== '1') {
      const types = {
        2: 'SinIncidencias',
        3: 'ConIncidencias',
      };
      params.Filters.push({
        NombreFiltro: types[tab.id],
        ValorFiltro: true,
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
        NombreFiltro: 'ClientePedido',
        ValorFiltro: queryInfo.searchTerm,
      });
    }
    params.SortField = 'FechaPedidoMasAntigua';
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
export const selectCustomerList = createSelector(
  selectOrderModificationList,
  (state) => state.customers.Results,
);
export const selectTotalCustomers = createSelector(
  selectOrderModificationList,
  (state) => state.customers.TotalResults,
);
export const selectCurrentPage = createSelector(selectQueryInfo, (state) => state.desiredPage);
export const selectStatusListCustomer = createSelector(
  selectQueryInfo,
  (state) => state.requestStatus,
);
export const selectDataBarChart = createSelector(selectOrderModificationList, (state) => {
  const chartBartData: IBarChart = InitialIBarChart();
  if (!isEmpty(state.barchart)) {
    chartBartData.labels = ['Sin Incidencias', 'Con Incidencias'];
    chartBartData.values = [
      state.barchart.TotalPedidosSinIncidencias,
      state.barchart.TotalPedidosConIncidencias,
    ];
    chartBartData.backgroundColor = ['#4ba92b', '#cc4757'];
    chartBartData.backgroundColorHover = ['#4ba92b', '#cc4757'];
  }
  return chartBartData;
});
export const selectDataDonutChart = createSelector(selectOrderModificationList, (state) => {
  let data: IDoughnutChart;
  const labels: Array<string> = [];
  const values: Array<number> = [];
  state.doughnutChart.customers.forEach((customer: VClienteModificacionPedido) => {
    labels.push(customer.Nombre);
    values.push(customer.ValorTotalUSD);
  });
  data = {labels, values};
  return data;
});
export const selectDataDonutDetails = createSelector(selectOrderModificationList, (state) => {
  return flow([
    (): Array<IDoughnutChartDetails> => {
      let clientes = 0;
      let pedidos = 0;
      let totValor = 0;
      forEach(state.doughnutChart.customers, (o: VClienteModificacionPedido) => {
        clientes++;
        pedidos += o.TotalPedidos;
        totValor += o.ValorTotalUSD;
      });
      const val = new CurrencyFormat().transform(totValor, 'USD');
      return [
        {
          label: 'Clientes',
          value: clientes,
        },
        {
          label: 'Pedidos',
          value: pedidos,
        },
        {
          label: 'Valor Total',
          value: val,
        },
      ];
    },
  ])();
});
export const selectDataDonutOptionDetailHover = createSelector(
  selectOrderModificationList,
  (state) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(state.doughnutChart.customers, (o: VClienteModificacionPedido) => {
          const details: Array<IDoughnutChartDetails> = [];

          details.push(
            {
              label: 'Total Pedidos',
              value: o.TotalPedidos.toString(),
            },
            {
              label: 'Total Partidas',
              value: o.TotalPartidas.toString(),
            },
            {
              label: 'Pedidos con Incidencias',
              value: o.PedidosConIncidencias.toString(),
            },
            {
              label: 'Pedidos sin Incidencias',
              value: o.PedidosSinIncidencias.toString(),
            },
            {
              label: 'Valor Total',
              value: new CurrencyFormat().transform(o.ValorTotalUSD, 'USD'),
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
export const selectChartStatus = createSelector(
  selectOrderModificationList,
  (state) => state.totalsStatus,
);
