import {createSelector} from '@ngrx/store';
import {selectPreprocessOrderDashboard} from '@appSelectors/pre-processing/pre-processing.selectors';
import {flow, forEach, isEmpty, map as _map, sumBy} from 'lodash-es';

import {
  IBarChart,
  IDoughnutChart,
  IDoughnutChartDetails,
  InitialIBarChart,
} from '@appModels/chart/chart';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  IListItemForPreProcessing,
  IPreprocessOrderDashboardState,
} from '@appModels/store/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.models';
import {AttributeDashboard, ResumeGroupQueryInfo} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';

export const selectClient = createSelector(selectPreprocessOrderDashboard, (state) => state);
export const selectOptionsTabs = createSelector(selectClient, (state) => state.tabOptions);
export const selectTab = createSelector(selectClient, (state) => state.tapSelected);
export const selectFilter = createSelector(selectClient, (state) => state.optionsFilter);
export const selectFilterSelected = createSelector(selectClient, (state) => state.filterSelected);
export const selectCustomers = createSelector(
  selectClient,
  (state): Array<IListItemForPreProcessing> => state.customerList,
);
export const selectTotalCustomer = createSelector(
  selectClient,
  (state) => state.customerList.length,
);
export const selectTotals = createSelector(selectClient, (state) => state.tabOptions);
export const selectSearchTypes = createSelector(selectClient, (state) => state.searchTypes);
export const selectTypeSelected = createSelector(selectClient, (state) => state.typeSelected);
export const selectTermSearch = createSelector(selectClient, (state) => state.termSearch);
export const selectFiltersDate = createSelector(selectClient, (state) => state.filterByDates);
export const selectIsLoadingClientsPreProcessing = createSelector(
  selectClient,
  (state) => state.preProcessingCustomerStatus,
);
export const selectTabsQueryInfo = createSelector(
  selectPreprocessOrderDashboard,
  (state: IPreprocessOrderDashboardState): ResumeGroupQueryInfo => {
    return {
      CountElements: [
        {NombreFiltro: 'Total', ValorFiltro: ''},
        {NombreFiltro: 'ConOrdenDeCompra', ValorFiltro: true},
        {NombreFiltro: 'SinOrdenDeCompraPretramitarPedido', ValorFiltro: true},
      ],
    };
  },
);
export const selectCustomersQueryInfo = createSelector(
  [selectTypeSelected, selectTermSearch, selectTab, selectFilterSelected, selectFiltersDate],
  (
    searchType: DropListOption,
    searchTerm: string,
    selectedTab: ITabOption,
    burgerOption: DropListOption,
    dates: IFilterDate,
  ): ResumeGroupQueryInfo => {
    let filters: ResumeGroupQueryInfo = {
      Filters: [],
      //Elemtos que van a ser contados
      CountElements: [
        {NombreFiltro: 'Total', ValorFiltro: ''},
        {NombreFiltro: 'ConOrdenDeCompra', ValorFiltro: true},
        {NombreFiltro: 'SinOrdenDeCompraPretramitarPedido', ValorFiltro: true},
      ],
      //Elementos que van a ser sumados
      SumFields: [
        //Cantidada de UDS de las partidas
        {NombreFiltro: 'TotalUSD', ValorFiltro: ''},
        //Numero de partidas total
        {NombreFiltro: 'NumeroPartidasTotal', ValorFiltro: ''},
        //Numero de partidas originales
        {NombreFiltro: 'NumeroPartidasOriginal', ValorFiltro: ''},
        //Numero de partidas  Alternativas
        {NombreFiltro: 'NumeroPartidasAlternativas', ValorFiltro: ''},
        //Numero de partidas complementarias
        {NombreFiltro: 'NumeroPartidasComplementarias', ValorFiltro: ''},
        //Numero de partidas de promocion
        {NombreFiltro: 'NumeroPartidasPromocion', ValorFiltro: ''},
        //Numero de partidas de ahorro
        {NombreFiltro: 'NumeroPartidasAhorro', ValorFiltro: ''},
      ],
      //Elementos que se van a mostrar en el resultado
      Fields: [{Campo: 'Nombre'}, {Campo: 'FechaRegistroRecepcion'}],
      GroupColumn: 'IdCliente',
      //Campo mediante el cual se realiza el ordenamiento
      SortField: 'Nombre',
      SortDirection: burgerOption.value === '1' ? 'asc' : 'dsc',
    };
    if (searchTerm !== '') {
      filters.Filters.push({
        NombreFiltro: searchType.value === '1' ? 'Nombre' : 'OCFolio',
        ValorFiltro: searchTerm,
      });
    }
    if (selectedTab.id !== '1') {
      switch (selectedTab.id) {
        case '2':
          filters.Filters.push({
            NombreFiltro: 'ConOrdenDeCompra',
            ValorFiltro: true,
          });
          break;
        case '3':
          filters.Filters.push({
            NombreFiltro: 'SinOrdenDeCompraPretramitarPedido',
            ValorFiltro: true,
          });
          break;
      }
    }
    if (dates !== null) {
      filters.Filters.push({
        NombreFiltro: 'FechaInicio',
        ValorFiltro: dates.startDate.toISOString().split('T')[0],
      });
      filters.Filters.push({
        NombreFiltro: 'FechaFin',
        ValorFiltro: dates.endDate.toISOString().split('T')[0],
      });
    }
    return filters;
  },
);
export const selectMappedItemList = createSelector(
  selectCustomers,
  (state: Array<IListItemForPreProcessing>): Array<IListItemForPreProcessing> => {
    return _map(state, (o: IListItemForPreProcessing) => {
      const newObject = {...o};
      forEach(o.Atributos, (i: AttributeDashboard) => {
        newObject[i.DescriptionField] = i.ValueField;
      });
      return newObject;
    });
  },
);
export const selectTotalItems = createSelector(
  selectMappedItemList,
  (list: Array<IListItemForPreProcessing>) =>
    sumBy(list, (o: IListItemForPreProcessing) => o.NumeroPartidasTotal),
);
export const selectOCTotals = createSelector(
  selectMappedItemList,
  (list: Array<IListItemForPreProcessing>) =>
    sumBy(list, (o: IListItemForPreProcessing) => o.ConOrdenDeCompratrue),
);
export const totalValueUSD = createSelector(
  selectMappedItemList,
  (list: Array<IListItemForPreProcessing>) =>
    sumBy(list, (o: IListItemForPreProcessing) => o.TotalUSD),
);
export const selectDataBarChart = createSelector(selectCustomers, (customers) => {
  const chartBarData: IBarChart = InitialIBarChart();
  if (!isEmpty(customers)) {
    chartBarData.labels = ['Originales', 'Alternativas', 'Complementarias', 'Promocion', 'Ahorro'];
    chartBarData.images = [
      'assets/Images/pre-processing/originales.svg',
      'assets/Images/pre-processing/alternativas.svg',
      'assets/Images/pre-processing/complementarias.svg',
      'assets/Images/pre-processing/promocion.svg',
      'assets/Images/pre-processing/ahorro.svg',
    ];
    chartBarData.values = [
      sumBy(customers, (o: IListItemForPreProcessing) => o.NumeroPartidasOriginal),
      sumBy(customers, (o: IListItemForPreProcessing) => o.NumeroPartidasAlternativas),
      sumBy(customers, (o: IListItemForPreProcessing) => o.NumeroPartidasComplementarias),
      sumBy(customers, (o: IListItemForPreProcessing) => o.NumeroPartidasPromocion),
      sumBy(customers, (o: IListItemForPreProcessing) => o.NumeroPartidasAhorro),
    ];
    chartBarData.backgroundColor = ['#6a6aae', '#cbb7a3', '#008894', '#e29d2a', '#4ba92b'];
    chartBarData.backgroundColorHover = ['#6a6aae', '#cbb7a3', '#008894', '#e29d2a', '#4ba92b'];
  }
  return chartBarData;
});
export const selectDataDonutChart = createSelector(
  selectMappedItemList,
  (list: Array<IListItemForPreProcessing>): IDoughnutChart => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    list.forEach((item: IListItemForPreProcessing) => {
      labels.push(item.Nombre);
      values.push(item.TotalUSD);
    });
    data = {labels, values};
    return data;
  },
);
export const selectDataDonutOptionDetails = createSelector(
  selectMappedItemList,
  (list: Array<IListItemForPreProcessing>) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        let totalOC = 0;
        let totalSOC = 0;
        let total = 0;
        let totC = 0;
        forEach(list, (o: IListItemForPreProcessing) => {
          totalOC += o.ConOrdenDeCompratrue;
          totalSOC += o.SinOrdenDeCompraPretramitarPedidotrue;
          total += o.TotalUSD;
          totC++;
        });
        const val = new CurrencyFormat().transform(total, 'USD');
        return [
          {label: 'Clientes', value: totC.toString()},
          {label: 'Con OC', value: totalOC.toString()},
          {label: 'Sin OC', value: totalSOC.toString()},
          {label: 'Valor Total', value: `${val + ' USD'}`},
        ];
      },
    ])(),
);
export const selectDataDonutOptionDetailsHover = createSelector(
  selectMappedItemList,
  (list: Array<IListItemForPreProcessing>) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(list, (o: IListItemForPreProcessing) => {
          const details: Array<IDoughnutChartDetails> = [];
          details.push(
            {label: 'Partidas', value: o.NumeroPartidasTotal.toString()},
            {label: 'Con OC', value: o.ConOrdenDeCompratrue.toString()},
            {label: 'Sin OC', value: o.SinOrdenDeCompraPretramitarPedidotrue.toString()},
            {
              label: 'Valor Total en Cierre',
              value: `${new CurrencyFormat().transform(o.TotalUSD, 'USD') + ' USD'}`,
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
