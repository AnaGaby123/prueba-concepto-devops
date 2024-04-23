/* Core Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectRegisterConfirmationList} from '@appSelectors/pendings/purchasing-manager/register-confirmation/register-confirmation.selectors';

/* Tools Imports */
import {flow, forEach, isEmpty} from 'lodash-es';

import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';

/* Models Imports */
import {IRegisterConfirmationList} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.models';
import {IDoughnutChart, IDoughnutChartDetails, InitialIBarChart} from '@appModels/chart/chart';
import {ProveedorOcPartidaObj, QueryInfo} from 'api-logistica';

/* Common Imports */
import {API_REQUEST_STATUS_DEFAULT, API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const selectRegisterCL = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => state,
);
export const selectSortList = createSelector(
  selectRegisterCL,
  (state: IRegisterConfirmationList) => state.dataByType,
);
export const selectTypesOfSearch = createSelector(
  selectRegisterCL,
  (state: IRegisterConfirmationList) => state.listTypesOfSearch,
);
export const selectTypeOfSearchSelected = createSelector(
  selectRegisterCL,
  (state: IRegisterConfirmationList) => state.typeOfSearch,
);
export const selectSort = createSelector(
  selectRegisterCL,
  (state: IRegisterConfirmationList) => state.filterByType,
);
export const selectSearchTerm = createSelector(
  selectRegisterCL,
  (state: IRegisterConfirmationList) => state.searchTerm,
);
export const selectQueryInfoProviders = createSelector(
  [selectTypeOfSearchSelected, selectSearchTerm, selectSort],
  (typeSelected: DropListOption, searchTerm: string, sort: DropListOption) => {
    const queryInfo: QueryInfo = {};
    queryInfo.Filters = [];
    if (searchTerm !== '') {
      if (typeSelected.value === '1') {
        queryInfo.Filters.push({
          NombreFiltro: 'Nombre',
          ValorFiltro: searchTerm,
        });
      } else if (typeSelected.value === '2') {
        // TODO: PENDIENTE
        queryInfo.Filters.push({
          NombreFiltro: 'Nombre',
          ValorFiltro: searchTerm,
        });
      }
    }
    if (sort.value === '1') {
      queryInfo.SortDirection = 'desc';
    } else {
      queryInfo.SortDirection = 'asc';
    }
    queryInfo.SortField = 'MontoTotal';
    queryInfo.pageSize = 100;
    queryInfo.desiredPage = 1;
    queryInfo.Filters.push({
      NombreFiltro: 'Confirmada',
      ValorFiltro: false,
    });
    return queryInfo;
  },
);
export const selectListProviders = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => state.providers,
);
export const selectNeedsToReloadProviders = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => state.needsToReloadProviders,
);
export const selectTotalProviders = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => state.totalProviders,
);
export const selectAmountTotal = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => state.donutProviders.data.ValorTotal || 0,
);
export const selectTotalOc = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => state.donutProviders.data.TotalOc || 0,
);
export const selectTotalProducts = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => state.donutProviders.data.TotalProducto || 0,
);
export const selectTotalPieces = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => state.donutProviders.data.TotalPieza || 0,
);
export const selectIsLoadingProvider = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) =>
    state.providersStatus === API_REQUEST_STATUS_DEFAULT ||
    state.providersStatus === API_REQUEST_STATUS_LOADING,
);
export const selectIsLoadingDonutCharts = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) =>
    state.donutChartsStatus === API_REQUEST_STATUS_DEFAULT ||
    state.donutChartsStatus === API_REQUEST_STATUS_LOADING,
);
export const selectDonutChartDataProviders = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    state.donutProviders.data.ProveedorOcPartida.forEach((item: ProveedorOcPartidaObj) => {
      labels.push(item.NombreProveedor);
      values.push(item.OrdenesDeCompra);
    });
    data = {labels, values};
    return data;
  },
);
export const selectDonutChartProvidersDetails = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => {
    return flow([
      (): Array<IDoughnutChartDetails> => {
        const totalOc = !isEmpty(state.donutProviders.data) ? state.donutProviders.data.TotalOc : 0;
        const totalPieces = !isEmpty(state.donutProviders.data)
          ? state.donutProviders.data.TotalPieza
          : 0;
        const totalProducts = !isEmpty(state.donutProviders.data)
          ? state.donutProviders.data.TotalProducto
          : 0;
        const totalProviders = !isEmpty(state.donutProviders.data)
          ? state.donutProviders.data.TotalProveedor
          : 0;
        const totalAmount = !isEmpty(state.donutProviders.data)
          ? `${new CurrencyFormat().transform(state.donutProviders.data.ValorTotal, 'USD')} USD`
          : `${new CurrencyFormat().transform(0, 'USD')} USD`;

        return [
          {
            label: 'Proveedores',
            value: totalProviders,
          },
          {
            label: 'Productos',
            value: totalProducts,
          },
          {
            label: 'Piezas',
            value: totalPieces,
          },
          {
            label: 'OC',
            value: totalOc,
          },
          {
            label: 'Valor Total',
            value: totalAmount,
          },
        ];
      },
    ])();
  },
);
export const selectDonutChartProvidersDetailsHover = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        const listProviders: Array<ProveedorOcPartidaObj> =
          state.donutProviders.data.ProveedorOcPartida;
        forEach(listProviders, (provider: ProveedorOcPartidaObj) => {
          const details: Array<IDoughnutChartDetails> = [];
          details.push(
            {
              label: 'Productos',
              value: provider.Productos.toString(),
            },
            {
              label: 'Piezas',
              value: provider.Piezas.toString(),
            },
            {
              label: 'OC',
              value: provider.OrdenesDeCompra.toString(),
            },
            {
              label: 'Valor Total',
              value: `${new CurrencyFormat().transform(provider.Monto, 'USD')} USD`,
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
export const selectDonutChartDataFreight = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => {
    let data: IDoughnutChart;
    const labels: Array<string> = ['Flete Normal', 'Flete Express'];
    const values: Array<number> = [
      state.donutFreight.data.FleteNormal,
      state.donutFreight.data.FleteExpress,
    ];
    data = {labels, values};
    return data;
  },
);
export const selectDonutChartFreightDetails = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => {
    return flow([
      (): Array<IDoughnutChartDetails> => {
        const typeFreigth = !isEmpty(state.donutFreight.data)
          ? state.donutFreight.data.TipoFlete
          : 0;
        const normalFreights = !isEmpty(state.donutFreight.data)
          ? state.donutFreight.data.FleteNormal
          : 0;
        const expressFreights = !isEmpty(state.donutFreight.data)
          ? state.donutFreight.data.FleteExpress
          : 0;
        const totalAmount = !isEmpty(state.donutFreight.data)
          ? `${new CurrencyFormat().transform(state.donutFreight.data.MontoTotalFlete, 'USD')} USD`
          : `${new CurrencyFormat().transform(0, 'USD')} USD`;

        return [
          {
            label: 'Tipo de Flete',
            value: typeFreigth,
          },
          {
            label: 'Normal',
            value: normalFreights,
          },
          {
            label: 'Express',
            value: expressFreights,
          },
          {
            label: 'Valor Total',
            value: totalAmount,
          },
        ];
      },
    ])();
  },
);
export const selectDonutChartFreightDetailsHover = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];

        if (state.donutFreight.data.FleteExpress > 0) {
          data.push([
            {
              label: 'Flete Express',
              value: state.donutFreight.data.FleteExpress,
            },
            {
              label: 'Valor Total',
              value: `${new CurrencyFormat().transform(
                state.donutFreight.data.MontoFleteExpress,
                'USD',
              )} USD`,
            },
          ]);
        }
        if (state.donutFreight.data.FleteNormal > 0) {
          data.push([
            {
              label: 'Flete Normal',
              value: state.donutFreight.data.FleteNormal,
            },
            {
              label: 'Valor Total',
              value: `${new CurrencyFormat().transform(
                state.donutFreight.data.MontoFleteNormal,
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
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => {
    let data: IDoughnutChart;
    const labels: Array<string> = ['Única', 'Programada'];
    const values: Array<number> = [
      state.donutDelivery.data.EntregaUnica,
      state.donutDelivery.data.EntregaProgramada,
    ];
    data = {labels, values};
    return data;
  },
);
export const selectDonutChartDeliveryDetails = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => {
    return flow([
      (): Array<IDoughnutChartDetails> => {
        const typeDelivery = !isEmpty(state.donutDelivery.data)
          ? state.donutDelivery.data.TipoEntrega
          : 0;
        const programmingDelivery = !isEmpty(state.donutDelivery.data)
          ? state.donutDelivery.data.EntregaProgramada
          : 0;
        const onlyDelivery = !isEmpty(state.donutDelivery.data)
          ? state.donutDelivery.data.EntregaUnica
          : 0;
        const totalAmount = !isEmpty(state.donutDelivery.data)
          ? `${new CurrencyFormat().transform(
              state.donutDelivery.data.MontoTotalEntrega,
              'USD',
            )} USD`
          : `${new CurrencyFormat().transform(0, 'USD')} USD`;

        return [
          {
            label: 'Tipo de entrega',
            value: typeDelivery,
          },
          {
            label: 'Única',
            value: onlyDelivery,
          },
          {
            label: 'Programada',
            value: programmingDelivery,
          },
          {
            label: 'Valor Total',
            value: totalAmount,
          },
        ];
      },
    ])();
  },
);
export const selectDonutChartDeliveryDetailsHover = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];

        if (state.donutDelivery.data.EntregaProgramada > 0) {
          data.push([
            {
              label: 'Entrega Única',
              value: state.donutDelivery.data.EntregaUnica,
            },
            {
              label: 'Valor Total',
              value: `${new CurrencyFormat().transform(
                state.donutDelivery.data.MontoEntregaUnica,
                'USD',
              )} USD`,
            },
          ]);
        }
        if (state.donutDelivery.data.EntregaUnica > 0) {
          data.push([
            {
              label: 'Entrega Programada',
              value: state.donutDelivery.data.EntregaProgramada,
            },
            {
              label: 'Valor Total',
              value: `${new CurrencyFormat().transform(
                state.donutDelivery.data.MontoEntregProgramada,
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
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => {
    const dataBarChart = InitialIBarChart();
    dataBarChart.labels = ['3 + días', '3 días', '2 días', '1 día'];
    dataBarChart.values = [
      state.barTime.data.TiempoReferenciaMas3dias,
      state.barTime.data.TiempoReferencia3dias,
      state.barTime.data.TiempoReferencia2dias,
      state.barTime.data.TiempoReferencia1dia,
    ];
    dataBarChart.backgroundColor = ['#008894', '#008894', '#008894', '#008894'];
    return dataBarChart;
  },
);
export const selectDataBarChartDelivery = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) => {
    const dataBarChart = InitialIBarChart();
    dataBarChart.labels = ['fuera de tiempo', 'urgente', 'en tiempo'];
    dataBarChart.values = [0, 0, 0];
    dataBarChart.backgroundColor = ['#cc435e', '#e29d2a', '#4ba92b'];
    return dataBarChart;
  },
);
export const selectIsLoadingBarCharts = createSelector(
  selectRegisterConfirmationList,
  (state: IRegisterConfirmationList) =>
    state.barChartsStatus === API_REQUEST_STATUS_DEFAULT ||
    state.barChartsStatus === API_REQUEST_STATUS_LOADING,
);
