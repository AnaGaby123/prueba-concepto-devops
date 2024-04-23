import {createSelector} from '@ngrx/store';
import {flow, forEach, sum, sumBy} from 'lodash-es';

import {IDoughnutChart, IDoughnutChartDetails, InitialIBarChart} from '@appModels/chart/chart';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {selectCheckoutList} from '@appSelectors/pendings/checkout/checkout.selectors';
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';
import {
  CheckoutListState,
  ICheckOutDashboardItems,
  IChekoutListTotals,
} from '@appModels/store/pendings/checkout/checkout-list/checkout-list.model';
import {ResumeGroupQueryInfo} from 'api-logistica';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const selectTabSelected = createSelector(
  selectCheckoutList,
  (state: CheckoutListState) => state.tapSelected,
);
export const selectDataFilterByType = createSelector(
  selectCheckoutList,
  (state: CheckoutListState) => state.dataByType,
);
export const selectFilterByType = createSelector(
  selectCheckoutList,
  (state: CheckoutListState) => state.filterByType,
);
export const selectSearchTypes = createSelector(
  selectCheckoutList,
  (state: CheckoutListState) => state.searchTypes,
);
export const selectedSearchType = createSelector(
  selectCheckoutList,
  (state: CheckoutListState) => state.selectedSearchType,
);
export const selectIsLoadingListOrders = createSelector(
  selectCheckoutList,
  (state: CheckoutListState) => state.listOrdersStatus === API_REQUEST_STATUS_LOADING,
);
export const selectOrders = createSelector(
  selectCheckoutList,
  (state: CheckoutListState) => state.listOrders.Results,
);
export const selectDoughnutChartData = createSelector(
  selectOrders,
  (list: ICheckOutDashboardItems[]) => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    list.forEach((item: ICheckOutDashboardItems) => {
      labels.push(item.Nombre);
      values.push(item.TotalUSD);
    });
    data = {labels, values};
    return data;
  },
);
export const selectDoughnutChartOptionDetails = createSelector(
  selectOrders,
  (list: Array<ICheckOutDashboardItems>) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        let totalSinOC = 0;
        let totalOC = 0;
        let totalOCInterna = 0;
        let amount = 0;
        forEach(list, (o: ICheckOutDashboardItems) => {
          totalSinOC += o.SinOc;
          totalOC += o.ConOC;
          totalOCInterna += o.ConOcInterna;
          amount += o.TotalUSD;
        });
        return [
          {label: 'Clientes', value: list.length.toString()},
          {label: 'Sin OC', value: totalSinOC.toString()},
          {label: 'Con OC', value: totalOC.toString()},
          {label: 'OC Interna', value: totalOCInterna.toString()},
          {
            label: 'Valor Total',
            value: `${new CurrencyFormat().transform(amount, 'USD')} USD`,
          },
        ];
      },
    ])(),
);
export const selectDoughnutChartOptionDetailsHover = createSelector(
  selectOrders,
  (list: Array<ICheckOutDashboardItems>) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(list, (o: ICheckOutDashboardItems) => {
          const details: Array<IDoughnutChartDetails> = [];

          details.push(
            {
              label: 'Sin OC',
              value: o.SinOc.toString(),
            },
            {
              label: 'Con OC',
              value: o.ConOC.toString(),
            },
            {
              label: 'OC Interna',
              value: o.ConOcInterna.toString(),
            },

            {
              label: 'Valor Total',
              value: new CurrencyFormat().transform(o.TotalUSD, 'USD'),
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
export const selectSearchTerm = createSelector(
  selectCheckoutList,
  (state: CheckoutListState) => state.searchTerm,
);
export const selectOptionTabs = createSelector(
  selectCheckoutList,
  (state: CheckoutListState) => state.options,
);
export const selectDataBarChart = createSelector(
  selectOrders,
  (data: Array<ICheckOutDashboardItems>) => {
    const dataBarChart = InitialIBarChart();
    dataBarChart.labels = [
      'ORIGINALES',
      'ALTERNATIVAS',
      'COMPLEMENTARIAS',
      'PROGRAMADAS',
      'AHORRO',
    ];
    dataBarChart.values = [
      sumBy(data, (o: ICheckOutDashboardItems) => o.TipoPartidaOriginal),
      sumBy(data, (o: ICheckOutDashboardItems) => o.TipoPartidaAlternativa),
      sumBy(data, (o: ICheckOutDashboardItems) => o.TipoPartidaComplementaria),
      sumBy(data, (o: ICheckOutDashboardItems) => o.TipoPartidaProgramada),
      sumBy(data, (o: ICheckOutDashboardItems) => o.TipoPartidaAhorro),
    ];
    dataBarChart.backgroundColor = ['#6a6aae', '#cbb7a3', '#008894', '#e29d2a', '#4ba92b'];
    dataBarChart.images = [
      'assets/Images/pre-processing/originales.svg',
      'assets/Images/pre-processing/alternativas.svg',
      'assets/Images/pre-processing/complementarias.svg',
      'assets/Images/pre-processing/promocion.svg',
      'assets/Images/pre-processing/ahorro.svg',
    ];
    return dataBarChart;
  },
);
export const selectFiltersTabsQueryInfo = createSelector(
  selectTabSelected,
  (tab: ITabOption): ResumeGroupQueryInfo => {
    return {
      Filters: [],
      CountElements: [
        {
          NombreFiltro: 'Total',
          ValorFiltro: '',
        },
        {
          NombreFiltro: 'OcInterna',
          ValorFiltro: true,
        },
        {
          NombreFiltro: 'OcInternaPendiente',
          ValorFiltro: true,
        },
      ],
    };
  },
);

export const selectCheckOutListQueryInfo = createSelector(
  [selectTabSelected, selectSearchTerm, selectFilterByType, selectedSearchType],
  (
    selectedTab: ITabOption,
    searchTerm: string,
    filterByType: DropListOption,
    searchType: DropListOption,
  ): ResumeGroupQueryInfo => {
    const queryInfo: ResumeGroupQueryInfo = {
      Filters: [],
      GroupColumn: 'IdCliente',
      Fields: [
        {
          Campo: 'Nombre',
        },
        {
          Campo: 'TipoPartidaOriginal',
        },
        {
          Campo: 'TipoPartidaAhorro',
        },
        {
          Campo: 'TipoPartidaAlternativa',
        },
        {
          Campo: 'TipoPartidaComplementaria',
        },
        {
          Campo: 'TipoPartidaProgramada',
        },
        {
          Campo: 'TotalUSD',
        },
      ],
      CountElements: [
        {
          NombreFiltro: 'Total',
          ValorFiltro: '',
        },
        {
          NombreFiltro: 'OcInternaPendiente',
          ValorFiltro: true,
        },
      ],
      SumFields: [
        {
          NombreFiltro: 'ConOcInterna',
          ValorFiltro: '1',
        },
        {
          NombreFiltro: 'ConOC',
          ValorFiltro: '1',
        },
        {
          NombreFiltro: 'SinOc',
          ValorFiltro: '1',
        },
      ],
      SortField: 'TotalUSD',
      SortDirection: filterByType.value === '1' ? 'asc' : 'desc',
    };
    if (selectedTab.id !== '1') {
      queryInfo.Filters.push({
        NombreFiltro: selectedTab.id === '2' ? 'OcInterna' : 'OcInternaSinAceptar',
        ValorFiltro: true,
      });
    }
    if (searchTerm !== '') {
      switch (searchType.value) {
        case '1':
          queryInfo.Filters.push({
            NombreFiltro: 'Nombre',
            ValorFiltro: searchTerm,
          });
          break;
        case '2':
          queryInfo.Filters.push({
            NombreFiltro: 'OrdenDeCompra',
            ValorFiltro: searchTerm,
          });
      }
    }
    return queryInfo;
  },
);
export const selectListTotals = createSelector(
  selectOrders,
  (orders: Array<ICheckOutDashboardItems>): IChekoutListTotals => {
    return {
      index: orders.length,
      purchaseOrders: sum([sumBy(orders, 'ConOcInterna'), sumBy(orders, 'ConOC')]),
      totalValue: sumBy(orders, 'TotalUSD'),
    };
  },
);
