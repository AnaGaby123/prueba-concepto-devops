import {createSelector} from '@ngrx/store';
import {selectDeclareArrivalList} from '@appSelectors/pendings/purchasing-manager/declare-arrival/declare-arrival.selectors';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';
import {VOcProveedorDeclararArribo} from 'api-logistica';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
/*Utils*/
import {flow, forEach} from 'lodash-es';

export const selectDeclareArrivalL = createSelector(selectDeclareArrivalList, (state) => state);
export const selectListSort = createSelector(selectDeclareArrivalL, (state) => state.dataByType);
export const selectSort = createSelector(selectDeclareArrivalL, (state) => state.filterByType);
export const selectQueryInfoOptions = createSelector(
  selectDeclareArrivalL,
  (state) => state.queryInfo,
);
export const selectSearchTerm = createSelector(selectQueryInfoOptions, (state) => state.searchTerm);
export const selectTabSelected = createSelector(
  selectDeclareArrivalL,
  (state) => state.tabSelected,
);
export const selectTotals = createSelector(selectDeclareArrivalL, (state) => state.totals);
export const selectListTab = createSelector(
  selectDeclareArrivalL,
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
export const selectQueryInfo = createSelector(selectDeclareArrivalL, (state) => state.queryInfo);
export const selectCurrentPage = createSelector(selectQueryInfo, (state) => state.desiredPage);
export const selectIsLoadingApi = createSelector(
  selectQueryInfo,
  (state) => state.requestStatus === API_REQUEST_STATUS_LOADING,
);
export const selectParamsProviders = createSelector(
  selectQueryInfo,
  selectTabSelected,
  selectSort,
  (queryInfo, tab, sort) => {
    const params = new FiltersOnlyActive();
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
  selectDeclareArrivalL,
  (state) => state.providers.Results,
);
export const selectTotalsProviders = createSelector(
  selectDeclareArrivalL,
  (state) => state.providers.TotalResults,
);
export const selectListDoughnutChart = createSelector(
  selectDeclareArrivalL,
  (state) => state.donutChart,
);
export const selectDataDoughnutChart = createSelector(
  selectListDoughnutChart,
  (list: Array<VOcProveedorDeclararArribo>) => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    list.forEach((item: VOcProveedorDeclararArribo) => {
      labels.push(item.NombreProveedor);
      values.push(item.TotalUSD);
    });
    data = {labels, values};
    return data;
  },
);
export const selectDataDetailsDoughnutChart = createSelector(
  selectListDoughnutChart,
  (list: Array<VOcProveedorDeclararArribo>): Array<IDoughnutChartDetails> => {
    return flow([
      (): Array<IDoughnutChartDetails> => {
        let total = 0;

        let tProvider = 0;
        let tPieces = 0;
        let tCompras = 0;

        forEach(list, (o: VOcProveedorDeclararArribo) => {
          total += o.TotalUSD;
          tCompras += o.TotalOrdenesDeCompra;
          tPieces += o.NumeroDePiezas;
          tProvider++;
        });
        const val = new CurrencyFormat().transform(total, 'USD') + 'USD';
        return [
          {
            label: 'Proveedores',
            value: tProvider.toString(),
          },
          {label: 'Compras', value: tCompras.toString()},
          {
            label: 'Piezas',
            value: tPieces.toString(),
          },
          {label: 'Valor Total', value: val},
        ];
      },
    ])();
  },
);
export const selectDataDetailsHoverDoughnutChart = createSelector(
  selectListDoughnutChart,
  (list: Array<VOcProveedorDeclararArribo>) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];

        forEach(list, (item: VOcProveedorDeclararArribo) => {
          const details: Array<IDoughnutChartDetails> = [];
          details.push(
            {
              label: 'Compras',
              value: item.TotalOrdenesDeCompra.toString(),
            },
            {
              label: 'Piezas',
              value: item.NumeroDePiezas.toString(),
            },
            {
              label: 'Valor total',
              value: new CurrencyFormat().transform(item.TotalUSD, 'USD'),
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
