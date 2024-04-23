import {createSelector} from '@ngrx/store';
import {selectDataList} from '@appSelectors/pendings/purchasing-manager/manage-back-order/manage-back-order.selectors';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';
import {flow, forEach, isEmpty} from 'lodash-es';

import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {ProveedorOcPartidaObj} from 'api-logistica';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {IManageBackOrderList} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-list/manage-back-order-list.models';

export const selectManageBackOrderList = createSelector(selectDataList, (state) => state);

export const selectSortList = createSelector(
  selectManageBackOrderList,
  (state) => state.dataByType,
);
export const selectSortSelected = createSelector(
  selectManageBackOrderList,
  (state) => state.filterByType,
);
export const selectQueryOptions = createSelector(
  selectManageBackOrderList,
  (state) => state.queryInfo,
);
export const selectSearchTerm = createSelector(selectQueryOptions, (state) => state.searchTerm);
export const selectTypeSearch = createSelector(
  selectManageBackOrderList,
  (state) => state.typeOfSearch,
);
export const selectOptionsSearch = createSelector(
  selectManageBackOrderList,
  (state) => state.typeOptionsSearch,
);
export const selectParams = createSelector(
  selectQueryOptions,
  selectSortSelected,
  selectTypeSearch,
  (queryInfo, sort, typeSearch) => {
    const params = new FiltersOnlyActive();
    params.Filters.push({
      NombreFiltro: 'GestionarBackOrder',
      ValorFiltro: true,
    });
    if (queryInfo.searchTerm) {
      params.Filters.push({
        NombreFiltro: typeSearch.value === '1' ? 'Nombre' : '',
        ValorFiltro: queryInfo.searchTerm,
      });
    }
    params.SortField = 'MontoTotal';
    params.SortDirection = sort.value === '1' ? 'Desc' : 'Asc';
    params.desiredPage = queryInfo.desiredPage;
    params.pageSize = queryInfo.pageSize;
    return params;
  },
);
export const selectDonutStatus = createSelector(
  selectManageBackOrderList,
  (state: IManageBackOrderList) => state.statusApiDonut,
);
export const selectProviders = createSelector(
  selectManageBackOrderList,
  (state) => state.providers.Results,
);
export const selectTotalProviders = createSelector(
  selectManageBackOrderList,
  (state) => state.providers.TotalResults,
);
export const selectIsLoadingApi = createSelector(
  selectManageBackOrderList,
  (state) => state.queryInfo.requestStatus === API_REQUEST_STATUS_LOADING,
);
export const selectCurrentPage = createSelector(selectQueryOptions, (state) => state.desiredPage);
export const selectListDonutProvider = createSelector(selectManageBackOrderList, (state) =>
  isEmpty(state.dataChartProvider) ? [] : state.dataChartProvider.ProveedorOcPartida,
);
export const selectChartDataProvider = createSelector(
  selectListDonutProvider,
  (list: Array<ProveedorOcPartidaObj>) => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    list.forEach((item: ProveedorOcPartidaObj) => {
      labels.push(item.NombreProveedor);
      values.push(item.Monto);
    });
    data = {labels, values};
    return data;
  },
);
export const selectChartDataDetailsProvider = createSelector(
  selectListDonutProvider,
  (list: Array<ProveedorOcPartidaObj>) => {
    return flow([
      (): Array<IDoughnutChartDetails> => {
        let total = 0;

        let tProvider = 0;
        let tPieces = 0;
        let tProduct = 0;

        forEach(list, (o: ProveedorOcPartidaObj) => {
          total += o.Monto;
          tProduct += o.Productos;
          tPieces += o.Piezas;
          tProvider++;
        });
        const val = new CurrencyFormat().transform(total, 'USD') + 'USD';
        return [
          {
            label: 'Proveedores',
            value: tProvider.toString(),
          },
          {label: 'Productos', value: tProduct.toString()},
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
export const selectChartDataDetailsHoverProvider = createSelector(
  selectListDonutProvider,
  (list: Array<ProveedorOcPartidaObj>) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];

        forEach(list, (item: ProveedorOcPartidaObj) => {
          const details: Array<IDoughnutChartDetails> = [];
          details.push(
            {
              label: 'Productos',
              value: item.Productos.toString(),
            },
            {
              label: 'Piezas',
              value: item.Piezas.toString(),
            },
            {
              label: 'Valor total',
              value: new CurrencyFormat().transform(item.Monto, 'USD'),
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
export const selectDonutChartDataDelivery = createSelector(
  selectManageBackOrderList,
  (state: IManageBackOrderList) => {
    let data: IDoughnutChart;
    const labels: Array<string> = ['Única', 'Programa'];
    const values: Array<number> = [
      state.dataChartMonitoring.EntregaUnica,
      state.dataChartMonitoring.EntregaProgramada,
    ];
    data = {labels, values};
    return data;
  },
);
export const selectDonutChartDeliveryDetails = createSelector(selectManageBackOrderList, (state) =>
  flow([
    (): Array<IDoughnutChartDetails> => {
      const typeDelivery = !isEmpty(state.dataChartMonitoring)
        ? state.dataChartMonitoring.TipoEntrega
        : 0;
      const programmingDelivery = !isEmpty(state.dataChartMonitoring)
        ? state.dataChartMonitoring.EntregaProgramada
        : 0;
      const onlyDelivery = !isEmpty(state.dataChartMonitoring)
        ? state.dataChartMonitoring.EntregaUnica
        : 0;
      const totalAmount = !isEmpty(state.dataChartMonitoring)
        ? `${new CurrencyFormat().transform(
            state.dataChartMonitoring.MontoTotalEntrega,
            'USD',
          )} USD`
        : `${new CurrencyFormat().transform(0, 'USD')} USD`;

      return [
        {
          label: 'Tipo de entrega',
          value: typeDelivery.toString(),
        },
        {
          label: 'Única',
          value: onlyDelivery.toString(),
        },
        {
          label: 'Programada',
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
  selectManageBackOrderList,
  (state) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        if (state.dataChartMonitoring.EntregaUnica > 0) {
          data.push([
            {
              label: 'Entrega Única',
              value: state.dataChartMonitoring.EntregaUnica.toString(),
            },
            {
              label: 'Valor Total',
              value: `${new CurrencyFormat().transform(
                state.dataChartMonitoring.MontoEntregaUnica,
                'USD',
              )} USD`,
            },
          ]);
        }
        if (state.dataChartMonitoring.EntregaProgramada > 0) {
          data.push([
            {
              label: 'Entrega Programada',
              value: state.dataChartMonitoring.EntregaProgramada.toString(),
            },
            {
              label: 'Valor Total',
              value: `${new CurrencyFormat().transform(
                state.dataChartMonitoring.MontoEntregProgramada,
                'USD',
              )} USD`,
            },
          ]);
        }

        return data;
      },
    ])(),
);
export const totalsProvider = createSelector(
  selectManageBackOrderList,
  (state) => state.dataChartProvider,
);
