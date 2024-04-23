import {createSelector} from '@ngrx/store';
import {filter, flatMap, flow, forEach, map as _map, orderBy, sumBy} from 'lodash-es';

/*Selectors Imports*/
import {selectAttendReview} from '@appSelectors/pendings/charges/attend-review/attend-review.selectors';

/*Models Imports*/
import {ITabOption} from '@appModels/botonera/botonera-option';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {ClienteAtenderRevisionObj, QueryInfo} from 'api-finanzas';
import {
  IAttendReviewList,
  ICustomerAttend,
} from '@appModels/store/pendings/charges/attend-review/attend-review-list/attend-review-list.models';
import {
  IBarChart,
  IDoughnutChart,
  IDoughnutChartDetails,
  InitialIBarChart,
} from '@appModels/chart/chart';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const selectAttendReviewList = createSelector(
  selectAttendReview,
  (state) => state.attendReviewList,
);
export const selectListAllCustomer = createSelector(
  selectAttendReviewList,
  (state): ClienteAtenderRevisionObj[] => orderBy(state.dataChartCustomer, ['MontoTotal'], ['asc']),
);
export const selectTotalAmount = createSelector(selectListAllCustomer, (state) =>
  sumBy(state, (item) => item.MontoTotal),
);
export const selectOptions = createSelector(
  [selectAttendReviewList, selectListAllCustomer],
  (state, list: ClienteAtenderRevisionObj[]): Array<ITabOption> => {
    let options: Array<ITabOption> = [];
    const news = selectSumList('Nueva', list);
    const saved = selectSumList('Guardada', list);
    const execute = selectSumList('Ejecutada', list);
    const nr = selectSumList('NoRealizada', list);
    options = [
      {
        id: '1',
        label: 'Todos',
        activeSubtitle: true,
        labelSubtitle: 'Revisiones',
        totalSubtitle: news + saved + execute + nr,
      },
      {
        id: '2',
        label: 'Nuevas',
        activeSubtitle: true,
        labelSubtitle: 'Revisiones',
        totalSubtitle: news,
      },
      {
        id: '3',
        label: 'Guardadas',
        activeSubtitle: true,
        labelSubtitle: 'Revisiones',
        totalSubtitle: saved,
      },
      {
        id: '4',
        label: 'Ejecutadas',
        activeSubtitle: true,
        labelSubtitle: 'Revisiones',
        totalSubtitle: execute,
      },
      {
        id: '5',
        label: 'No Realizada',
        activeSubtitle: true,
        labelSubtitle: 'Revisiones',
        totalSubtitle: nr,
      },
    ];
    return options;
  },
);
export const selectOption = createSelector(selectAttendReviewList, (state) => state.selectedOption);
export const selectFilters = createSelector(selectAttendReviewList, (state) => state.filters);
export const selectFilter = createSelector(selectAttendReviewList, (state) => state.selectedFilter);
export const selectTermSearch = createSelector(selectAttendReviewList, (state) => state.termSearch);
export const selectQueryInfo = createSelector(
  selectOption,
  selectTermSearch,
  (option: ITabOption, termSearch: string): QueryInfo => {
    const params = new FiltersOnlyActive();
    if (option.id !== '1') {
      const types = {
        2: 'Nueva',
        3: 'Guardada',
        4: 'Ejecutada',
        5: 'NoRealizada',
      };
      params.Filters.push({
        NombreFiltro: 'EstadoTPProformaPedido',
        ValorFiltro: types[option.id],
      });
    }
    if (termSearch) {
      params.Filters.push({
        NombreFiltro: 'NombreCliente',
        ValorFiltro: termSearch,
      });
    }
    return params;
  },
);
export const selectListCustomer = createSelector(
  selectAttendReviewList,
  selectFilter,
  (state: IAttendReviewList, filter: DropListOption): Array<ICustomerAttend> =>
    _map(
      orderBy(state.customers, 'FechaEntregaMasProxima', filter.value === '1' ? 'desc' : 'asc'),
      (item, index) => ({...item, index: index + 1}),
    ),
);
export const selectApiStatus = createSelector(selectAttendReviewList, (state) => state.statusApi);

export const selectDataDoughnutChart = createSelector(
  selectListAllCustomer,
  (list: Array<ClienteAtenderRevisionObj>): IDoughnutChart => {
    const labels: Array<string> = [];
    const values: Array<number> = [];
    list.forEach((customer: ClienteAtenderRevisionObj) => {
      labels.push(customer.NombreCliente);
      values.push(customer.MontoTotal);
    });
    return {labels, values};
  },
);
// TODO: Se cambio codigo por cambios en servicio, pendiente revisar
export const selectDetailsDoughnutChart = createSelector(
  selectListAllCustomer,
  (list: Array<ClienteAtenderRevisionObj>): Array<IDoughnutChartDetails> => {
    let totalInvoice = 0;
    let totalOrders = 0;
    let total = 0;
    forEach(list, (o: ClienteAtenderRevisionObj) => {
      totalInvoice += o.TotalFacturas;
      totalOrders += o.TotalProformaPedido;
      total += o.MontoTotal;
    });
    const val = new CurrencyFormat().transform(total, 'USD');
    return [
      {label: 'Clientes', value: list.length},
      {label: 'Facturas', value: totalInvoice},
      {label: 'Pedidos', value: totalOrders},
      {label: 'Valor Total', value: val},
    ];
  },
);
// TODO: Se cambio codigo por cambios en servicio, pendiente revisar
export const selectDataHoverDoughnut = createSelector(selectListAllCustomer, (list) =>
  flow([
    (): Array<Array<IDoughnutChartDetails>> => {
      const data: Array<Array<IDoughnutChartDetails>> = [];
      forEach(list, (o: ClienteAtenderRevisionObj) => {
        const details: Array<IDoughnutChartDetails> = [];
        details.push(
          {label: 'Facturas', value: o.TotalFacturas.toString()},
          {label: 'Pedidos', value: o.TotalProformaPedido.toString()},
        );
        data.push(details);
      });
      return data;
    },
  ])(),
);
export const selectDataBarChart = createSelector(
  selectListAllCustomer,
  (list: Array<ClienteAtenderRevisionObj>): IBarChart => {
    const dataBarChart = InitialIBarChart();

    dataBarChart.labels = ['NUEVAS', 'GUARDADAS', 'EJECUTADAS', 'NO REALIZADAS'];
    dataBarChart.values = [
      selectSumList('Nueva', list),
      selectSumList('Guardada', list),
      selectSumList('Ejecutada', list),
      selectSumList('NoRealizada', list),
    ];
    dataBarChart.backgroundColor = ['#6a6aae', '#4ba92b', '#008894', '#eca735'];
    return dataBarChart;
  },
);
export const selectSumList = (type: string, list: Array<ClienteAtenderRevisionObj>): number => {
  const listAux = flatMap(_map(list, (item) => item.vTpProformaPedidoObj));
  const filterData = filter(
    flatMap(_map(list, (item) => item.vTpProformaPedidoObj)),
    (item) => item.EstadoTPProformaPedido === type,
  );
  return sumBy(
    filter(
      flatMap(_map(list, (item) => item.vTpProformaPedidoObj)),
      (item) => item.EstadoTPProformaPedido === type,
    ),
    (item) => item.TotalProformaPedidoEstado,
  );
};
