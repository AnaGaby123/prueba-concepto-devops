import {createSelector} from '@ngrx/store';
import {flow, forEach} from 'lodash-es';

import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
/*Models Imports*/
import {QueryInfo} from 'api-finanzas';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {VGARImportador, VProveedorAcuseReciboDetalle} from 'api-logistica';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
/*Selectors Imports*/
import {selectControlMaterialDelivery} from '@appSelectors/pendings/imports-phs/control-material-delivery/control-material-delivery.selectors';
/*Utils Imports*/
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';

export const controlMaterialDeliveryList = createSelector(
  selectControlMaterialDelivery,
  (state) => state.controlMaterialDeliveryList,
);
export const selectOptionsOrderList = createSelector(
  controlMaterialDeliveryList,
  (state) => state.dataByType,
);
export const selectOrderList = createSelector(
  controlMaterialDeliveryList,
  (state) => state.filterByType,
);
export const selectQueryInfo = createSelector(
  controlMaterialDeliveryList,
  (state) => state.queryInfo,
);
export const selectParamsList = createSelector(
  [selectOrderList, selectQueryInfo, selectOrderList],
  (order: DropListOption, queryInfo: IQueryInfoOptions, filter: DropListOption): QueryInfo => {
    const params = new FiltersOnlyActive();
    params.desiredPage = queryInfo.desiredPage;
    params.pageSize = queryInfo.pageSize;
    params.SortField = 'MontoTotalUSD';
    params.SortDirection = filter.value === '1' ? 'Desc' : 'Asc';
    if (queryInfo.searchTerm) {
      params.Filters.push({
        NombreFiltro: 'Importador',
        ValorFiltro: queryInfo.searchTerm,
      });
    }
    return params;
  },
);
export const selectCustomsAgents = createSelector(controlMaterialDeliveryList, (state) =>
  state.customsAgents.Results ? state.customsAgents.Results : [],
);
export const selectTotalAgents = createSelector(controlMaterialDeliveryList, (state) =>
  state.customsAgents.TotalResults ? state.customsAgents.TotalResults : 0,
);
export const selectCurrentPage = createSelector(selectQueryInfo, (state) => state.desiredPage);
export const selectIsLoadingApi = createSelector(
  selectQueryInfo,
  (state) => state.requestStatus === API_REQUEST_STATUS_LOADING,
);
export const selectTotalsList = createSelector(
  controlMaterialDeliveryList,
  (state) => state.totals,
);
export const selectListProvider = createSelector(
  selectTotalsList,
  (state): Array<VProveedorAcuseReciboDetalle> =>
    state.ListaVProveedorRegistrarDespachoDetalle
      ? state.ListaVProveedorRegistrarDespachoDetalle
      : [],
);
export const selectDataProviders = createSelector(
  selectListProvider,
  (list: Array<VProveedorAcuseReciboDetalle>) => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    list.forEach((item: VProveedorAcuseReciboDetalle) => {
      labels.push(item.Nombre);
      values.push(item.ValorTotalEnAduana);
    });
    data = {labels, values};
    return data;
  },
);
export const selectDataDetailsProviders = createSelector(
  selectListProvider,
  (list: Array<VProveedorAcuseReciboDetalle>): Array<IDoughnutChartDetails> =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        let total = 0;
        let tProvider = 0;
        let tAcuses = 0;
        let tPieces = 0;

        forEach(list, (o: VProveedorAcuseReciboDetalle) => {
          total += o.ValorTotalEnAduana;
          tPieces += o.Piezas;
          tAcuses += o.OrdenesDespacho;
          tProvider++;
        });
        const val = new CurrencyFormat().transform(total, 'USD') + 'USD';
        return [
          {
            label: 'Proveedores',
            value: tProvider.toString(),
          },
          {label: 'Piezas', value: tPieces.toString()},
          {
            label: 'Acuses de recibo',
            value: tAcuses.toString(),
          },
          {label: 'Total', value: val},
        ];
      },
    ])(),
);
export const selectDataDetailsHoverProviders = createSelector(
  selectListProvider,
  (list: Array<VProveedorAcuseReciboDetalle>): Array<Array<IDoughnutChartDetails>> =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];

        forEach(list, (item: VProveedorAcuseReciboDetalle) => {
          const details: Array<IDoughnutChartDetails> = [];
          details.push(
            {
              label: 'Piezas',
              value: item.Piezas.toString(),
            },
            {
              label: 'Acuses de recibo',
              value: item.OrdenesDespacho.toString(),
            },
            {
              label: 'Valor total',
              value: new CurrencyFormat().transform(item.ValorTotalEnAduana, 'USD'),
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
export const selectListAgent = createSelector(
  controlMaterialDeliveryList,
  (state): Array<VGARImportador> => state.listAgent,
);
export const selectDataAgent = createSelector(selectListAgent, (list: Array<VGARImportador>) => {
  let data: IDoughnutChart;
  const labels: Array<string> = [];
  const values: Array<number> = [];
  list.forEach((item: VGARImportador) => {
    labels.push(
      item.NombreComercialAgenteAduanal !== 'N/A'
        ? item.NombreComercialAgenteAduanal
        : item.Fletera !== 'N/A'
        ? item.Fletera
        : item.RazonSocialEmpresaImportador,
    );
    values.push(item.MontoTotalUSD);
  });
  data = {labels, values};
  return data;
});
export const selectDataDetailsAgent = createSelector(
  selectListAgent,
  (list: Array<VGARImportador>): Array<IDoughnutChartDetails> =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        let total = 0;
        let tProvider = 0;
        let tAcuses = 0;
        let tPieces = 0;

        forEach(list, (o: VGARImportador) => {
          total += o.MontoTotalUSD;
          tPieces += o.Piezas;
          tAcuses += o.OrdenesDespacho;
          tProvider++;
        });
        const val = new CurrencyFormat().transform(total, 'USD') + 'USD';
        return [
          {label: 'Piezas', value: tPieces.toString()},
          {
            label: 'Agentes Aduanales',
            value: tProvider.toString(),
          },
          {
            label: 'Acuses de recibo',
            value: tAcuses.toString(),
          },
          {label: 'Total', value: val},
        ];
      },
    ])(),
);
export const selectDataDetailsHoverAgent = createSelector(
  selectListAgent,
  (list: Array<VGARImportador>) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(list, (o: VGARImportador) => {
          const details: Array<IDoughnutChartDetails> = [];
          details.push(
            {
              label: 'Piezas',
              value: o.Piezas.toString(),
            },
            {
              label: 'Acuses de recibo',
              value: o.OrdenesDespacho.toString(),
            },
            {
              label: 'Total',
              value: new CurrencyFormat().transform(o.MontoTotalUSD, 'USD'),
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
