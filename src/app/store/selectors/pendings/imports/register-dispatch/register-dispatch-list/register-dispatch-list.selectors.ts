import {createSelector} from '@ngrx/store';
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';
import {flow, forEach, isEmpty} from 'lodash-es';

/*Models Imports*/
import {
  IBarChart,
  IDoughnutChart,
  IDoughnutChartDetails,
  InitialIBarChart,
} from '@appModels/chart/chart';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {QueryInfo, VProveedorRegistrarDespachoDetalle} from 'api-logistica';
/*Selectors Imports*/
import {selectRegisterDispatchList} from '@appSelectors/pendings/imports/register-dispatch/register-dispatch.selectors';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';

export const selectRegisterList = createSelector(selectRegisterDispatchList, (state) => state);
export const selectSearchTerm = createSelector(
  selectRegisterDispatchList,
  (state) => state.searchTerm,
);
export const selectOptions = createSelector(selectRegisterList, (state) => state.options);
export const selectOption = createSelector(selectRegisterList, (state) => state.selectedOption);
export const selectQueryInfo = createSelector(selectRegisterList, (state) => state.queryInfo);
export const selectParamsList = createSelector(
  selectQueryInfo,
  selectOption,
  selectSearchTerm,
  (queryInfo, optionOrder, searchTerm): QueryInfo => {
    const params = new FiltersOnlyActive();
    if (searchTerm) {
      params.Filters.push({
        NombreFiltro: 'AgenteAduanalOrdenDespacho',
        ValorFiltro: searchTerm,
      });
    }
    params.desiredPage = queryInfo.desiredPage;
    params.pageSize = queryInfo.pageSize;
    params.SortField = 'MontoTotalUSD';
    params.SortDirection = optionOrder.value === '1' ? 'Desc' : 'Asc';
    return params;
  },
);
export const selectList = createSelector(
  selectRegisterList,
  (state) => state.customsBrokers.Results,
);
export const selectTotalsList = createSelector(
  selectRegisterList,
  (state) => state.customsBrokers.TotalResults,
);
export const selectIsLoadingApi = createSelector(
  selectQueryInfo,
  (state) => state.requestStatus === API_REQUEST_STATUS_LOADING,
);
export const selectCurrentPage = createSelector(selectQueryInfo, (state) => state.desiredPage);
export const selectTotals = createSelector(selectRegisterList, (state) => state.totals);
export const selectDataBarChart = createSelector(selectTotals, (data) => {
  const dataBar: IBarChart = InitialIBarChart();
  if (!isEmpty(data)) {
    dataBar.labels = ['FUERA DE TIEMPO', 'URGENTE', 'EN TIEMPO'];
    dataBar.values = [data.PiezasFueraDeTiempo, data.PiezasUrgentes, data.PiezasATiempo];
    dataBar.backgroundColor = ['#cc435e', '#f5a623', '#4ba92b'];
    dataBar.backgroundColorHover = ['#cc435e', '#f5a623', '#4ba92b'];
  }
  return dataBar;
});
export const selectListProvider = createSelector(
  selectTotals,
  (state): Array<VProveedorRegistrarDespachoDetalle> =>
    state.ListaVProveedorRegistrarDespachoDetalle,
);
export const selectDataDoughnut = createSelector(
  selectListProvider,
  (list: Array<VProveedorRegistrarDespachoDetalle>): IDoughnutChart => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    list.forEach((item: VProveedorRegistrarDespachoDetalle) => {
      labels.push(item.Nombre);
      values.push(item.ValorTotalEnAduana);
    });
    data = {labels, values};
    return data;
  },
);
export const selectDataDetailsDoughnut = createSelector(
  selectListProvider,
  (list: Array<VProveedorRegistrarDespachoDetalle>): Array<IDoughnutChartDetails> =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        let total = 0;
        let tProvider = 0;
        let od = 0;
        let tPieces = 0;

        forEach(list, (o: VProveedorRegistrarDespachoDetalle) => {
          total += o.ValorTotalEnAduana;
          tPieces += o.Piezas;
          od += o.OrdenesDespacho;
          tProvider++;
        });
        const val = new CurrencyFormat().transform(total, 'USD') + 'USD';
        return [
          {
            label: 'Proveedores',
            value: tProvider.toString(),
          },
          {
            label: 'Ordenes de Despacho',
            value: od.toString(),
          },
          {label: 'Piezas', value: tPieces.toString()},

          {label: 'Valor Total Aduanal', value: val},
        ];
      },
    ])(),
);
export const selectDataDetailsHoverDoughnut = createSelector(
  selectListProvider,
  (list: Array<VProveedorRegistrarDespachoDetalle>) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];

        forEach(list, (item: VProveedorRegistrarDespachoDetalle) => {
          const details: Array<IDoughnutChartDetails> = [];
          details.push(
            {
              label: 'Piezas',
              value: item.Piezas.toString(),
            },
            {
              label: 'Ordenes de Despacho',
              value: item.OrdenesDespacho.toString(),
            },
            {
              label: 'Valor Total Aduanal',
              value: new CurrencyFormat().transform(item.ValorTotalEnAduana, 'USD'),
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
