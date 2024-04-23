import {createSelector} from '@ngrx/store';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
/*Models Import*/
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {CargarFacturaDonaTotalesObj} from 'api-logistica';
/*Utils Imports*/
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {flow, forEach} from 'lodash-es';

/*Selectors Import*/
import {selectUploadInvoiceList} from '@appSelectors/pendings/purchasing-manager/upload-invoice/upload-invoice.selectors';

import {selectIdUser} from '@appSelectors/auth/auth.selectors';
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const selectUploadIL = createSelector(selectUploadInvoiceList, (state) => state);
export const selectListSort = createSelector(selectUploadIL, (state) => state.dataByType);
export const selectSort = createSelector(selectUploadIL, (state) => state.filterByType);
export const selectQueryInfoOptions = createSelector(selectUploadIL, (state) => state.queryInfo);
export const selectSearchTerm = createSelector(selectQueryInfoOptions, (state) => state.searchTerm);

export const selectParams = createSelector(
  [selectQueryInfoOptions, selectSort, selectSearchTerm, selectIdUser],
  (queryInfo: IQueryInfoOptions, sort: DropListOption, searchTerm, idUser) => {
    const params = new FiltersOnlyActive();
    params.pageSize = queryInfo.pageSize;
    params.desiredPage = queryInfo.desiredPage;

    params.SortField = 'TotalUSD';
    params.SortDirection = sort.value === '1' ? 'Desc' : 'Asc';
    if (searchTerm && searchTerm !== '') {
      params.Filters.push({
        NombreFiltro: 'Nombre',
        ValorFiltro: searchTerm,
      });
    }
    params.Filters.push({
      NombreFiltro: 'IdUsuarioComprador',
      ValorFiltro: idUser,
    });
    return params;
  },
);
export const selectProviders = createSelector(selectUploadIL, (state) => state.providers.Results);
export const selectTotalProviders = createSelector(
  selectUploadIL,
  (state) => state.providers.TotalResults,
);
export const selectCurrentPage = createSelector(
  selectQueryInfoOptions,
  (state) => state.desiredPage,
);
export const selectTotals = createSelector(selectUploadIL, (state) => state.donutChart);
export const selectElementChart = createSelector(
  selectTotals,
  (state) => state.ListaCargarFacturaDonaTotalesObj,
);
export const selectDoughnutData = createSelector(
  selectElementChart,
  (list): IDoughnutChart => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    list.forEach((item: CargarFacturaDonaTotalesObj) => {
      labels.push(item.NombreProveedor);
      values.push(item.Piezas);
    });
    data = {labels, values};
    return data;
  },
);
export const selectDoughnutChartDetails = createSelector(selectElementChart, (list) => {
  return flow([
    (): Array<IDoughnutChartDetails> => {
      let totCompras = 0;
      let totType = 0;
      let amount = 0;
      let totPiezas = 0;

      forEach(list, (o: CargarFacturaDonaTotalesObj) => {
        totCompras += o.Compras;
        totPiezas += o.Piezas;
        amount += o.ValorTotalProveedor;
        totType++;
      });

      return [
        {label: 'Proveedores', value: totType.toString()},
        {label: 'Compras', value: totCompras.toString()},
        {label: 'Piezas', value: totPiezas.toString()},

        {
          label: 'Valor Total',
          value: `${new CurrencyFormat().transform(amount, 'USD')} USD`,
        },
      ];
    },
  ])();
});
export const selectDoughnutChartDetailsHover = createSelector(selectElementChart, (list) =>
  flow([
    (): Array<Array<IDoughnutChartDetails>> => {
      const data: Array<Array<IDoughnutChartDetails>> = [];
      forEach(list, (o: CargarFacturaDonaTotalesObj) => {
        const details: Array<IDoughnutChartDetails> = [];

        details.push(
          {
            label: 'Compras',
            value: o.Compras.toString(),
          },
          {
            label: 'Piezas',
            value: o.Piezas.toString(),
          },
          {
            label: 'Valor Total',
            value: new CurrencyFormat().transform(o.ValorTotalProveedor, 'USD'),
          },
        );
        data.push(details);
      });
      return data;
    },
  ])(),
);
export const selectIsLoadingApi = createSelector(
  selectQueryInfoOptions,
  (state) => state.requestStatus === API_REQUEST_STATUS_LOADING,
);
