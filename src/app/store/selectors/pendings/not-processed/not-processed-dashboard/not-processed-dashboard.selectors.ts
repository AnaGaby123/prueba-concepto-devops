import {createSelector} from '@ngrx/store';
import {selectNotProcessedNode} from '@appSelectors/pendings/not-processed/not-processed.selectors';
import {NotProcessedState} from '@appModels/store/pendings/not-processed/not-processed.models';
import {
  IClientItemForNotProcessed,
  NotProcessedDashboardState,
} from '@appModels/store/pendings/not-processed/not-processed-list/not-processed-list.models';
import {AttributeDashboard, ResumeGroupQueryInfo} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {flow, forEach, isEmpty, map, sumBy} from 'lodash-es';
import {
  IBarChart,
  IDoughnutChart,
  IDoughnutChartDetails,
  InitialIBarChart,
} from '@appModels/chart/chart';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {IFilterDate} from '@appModels/filters/Filters';

export const selectNotProcessedList = createSelector(
  selectNotProcessedNode,
  (state: NotProcessedState) => state.notProcessedDashboard,
);
export const selectTabOptions = createSelector(
  selectNotProcessedList,
  (state: NotProcessedDashboardState) => state.tabOptions,
);
export const selectedTabOption = createSelector(
  selectNotProcessedList,
  (state: NotProcessedDashboardState) => state.selectedTabOption,
);
export const selectBurgerOptions = createSelector(
  selectNotProcessedList,
  (state: NotProcessedDashboardState) => state.burgerOptions,
);
export const selectedBurgerOption = createSelector(
  selectNotProcessedList,
  (state: NotProcessedDashboardState) => state.selectedBurgerOption,
);
export const selectDateRange = createSelector(
  selectNotProcessedList,
  (state: NotProcessedDashboardState): IFilterDate => state.dateRange,
);
export const selectListClient = createSelector(
  selectNotProcessedList,
  (state: NotProcessedDashboardState): IClientItemForNotProcessed[] => state.clients,
);
export const selectSearchTerm = createSelector(
  selectNotProcessedList,
  (state: NotProcessedDashboardState): string => state.searchTerm,
);
export const selectSearchTypes = createSelector(
  selectNotProcessedList,
  (state: NotProcessedDashboardState): DropListOption[] => state.searchTypes,
);
export const selectSearchTypeSelected = createSelector(
  selectNotProcessedList,
  (state: NotProcessedDashboardState): DropListOption => state.searchTypeSelected,
);
export const selectApiStatus = createSelector(
  selectNotProcessedList,
  (state: NotProcessedDashboardState) => state.apiStatus,
);
export const selectMappedClientList = createSelector(
  selectListClient,
  (state: Array<IClientItemForNotProcessed>): Array<IClientItemForNotProcessed> => {
    return map(state, (o: IClientItemForNotProcessed) => {
      const newObject = {...o};
      forEach(o.Atributos, (i: AttributeDashboard) => {
        newObject[i.DescriptionField] = i.ValueField;
      });
      return newObject;
    });
  },
);
export const selectDataBarChart = createSelector(selectMappedClientList, (list) => {
  const chartBarData: IBarChart = InitialIBarChart();
  if (!isEmpty(list)) {
    chartBarData.labels = ['A TIEMPO', 'POR VENCER', 'FUERA DE TIEMPO', 'SIN FECHA'];
    chartBarData.values = [
      sumBy(list, (o: IClientItemForNotProcessed) => o.FEAATiempo),
      sumBy(list, (o: IClientItemForNotProcessed) => o.FEAPorVencer),
      sumBy(list, (o: IClientItemForNotProcessed) => o.FEAFueraDeTiempo),
      sumBy(list, (o: IClientItemForNotProcessed) => o.SinFEA),
    ];
    chartBarData.backgroundColor = ['#4ba92b', '#f09600', '#cc4757', '#6a6aae'];
    chartBarData.backgroundColorHover = ['#4ba92b', '#f09600', '#cc4757', '#6a6aae'];
  }
  return chartBarData;
});
export const selectDataDonutChart = createSelector(selectMappedClientList, (list) => {
  let data: IDoughnutChart;
  const labels: Array<string> = [];
  const values: Array<number> = [];
  list.forEach((item) => {
    labels.push(item.Nombre);
    values.push(item.TotalUSD);
  });
  data = {labels, values};
  return data;
});
export const selectDataDonutOptionDetails = createSelector(selectMappedClientList, (list) => {
  return flow([
    (): Array<IDoughnutChartDetails> => {
      let totalOC = 0;
      let totalSOC = 0;
      let total = 0;
      let totC = 0;
      forEach(list, (o: IClientItemForNotProcessed) => {
        totalOC += o.ConOrdenDeCompratrue;
        totalSOC += o.SinOrdenDeCompratrue;
        total += o.TotalUSD;
        totC++;
      });
      const val = new CurrencyFormat().transform(total, 'USD') + ' USD';
      return [
        {label: 'Clientes', value: totC.toString()},
        {label: 'Con OC', value: totalOC.toString()},
        {label: 'Sin OC', value: totalSOC.toString()},
        {label: 'Valor Total', value: val},
      ];
    },
  ])();
});
export const selectDataDonutOptionDetailsHover = createSelector(selectMappedClientList, (list) =>
  flow([
    (): Array<Array<IDoughnutChartDetails>> => {
      const data: Array<Array<IDoughnutChartDetails>> = [];
      forEach(list, (o: IClientItemForNotProcessed) => {
        const details: Array<IDoughnutChartDetails> = [];
        details.push(
          {label: 'Con OC', value: o.ConOrdenDeCompratrue.toString()},
          {label: 'Sin OC', value: o.SinOrdenDeCompratrue.toString()},
        );
        data.push(details);
      });
      return data;
    },
  ])(),
);

export const selectTabsQueryInfo = createSelector(
  selectNotProcessedList,
  (state: NotProcessedDashboardState): ResumeGroupQueryInfo => ({
    CountElements: [
      {NombreFiltro: 'Total', ValorFiltro: ''},
      {NombreFiltro: 'ConOrdenDeCompra', ValorFiltro: true},
      {NombreFiltro: 'SinOrdenDeCompra', ValorFiltro: true},
    ],
  }),
);
export const selectClientsQueryInfo = createSelector(
  [
    selectSearchTerm,
    selectSearchTypeSelected,
    selectedBurgerOption,
    selectedTabOption,
    selectDateRange,
  ],
  (
    searchTerm: string,
    searchTypeSelected: DropListOption,
    burgerOption: DropListOption,
    tabOption: ITabOption,
    dateRange: IFilterDate,
  ): ResumeGroupQueryInfo => {
    let filters: ResumeGroupQueryInfo = {
      Filters: [],
      CountElements: [
        {NombreFiltro: 'Total', ValorFiltro: ''},
        {NombreFiltro: 'ConOrdenDeCompra', ValorFiltro: true},
        {NombreFiltro: 'SinOrdenDeCompra', ValorFiltro: true},
      ],
      SumFields: [
        {NombreFiltro: 'TotalUSD', ValorFiltro: ''},
        {NombreFiltro: 'NumeroPartidasTotal', ValorFiltro: ''},
        {NombreFiltro: 'FEAATiempo', ValorFiltro: ''},
        {NombreFiltro: 'FEAPorVencer', ValorFiltro: ''},
        {NombreFiltro: 'FEAFueraDeTiempo', ValorFiltro: ''},
        {NombreFiltro: 'SinFEA', ValorFiltro: ''},
      ],
      Fields: [{Campo: 'Nombre'}],
      GroupColumn: 'IdCliente',
      SortField: 'TotalUSD',
      SortDirection: 'asc',
    };
    if (searchTerm !== '') {
      filters.Filters.push({NombreFiltro: searchTypeSelected.value, ValorFiltro: searchTerm});
    }
    if (dateRange !== null) {
      filters.Filters.push(
        {NombreFiltro: 'FechaInicio', ValorFiltro: dateRange.startDate.toISOString()},
        {NombreFiltro: 'FechaFin', ValorFiltro: dateRange.endDate.toISOString()},
      );
    }
    if (burgerOption.value !== '1') {
      switch (burgerOption.value) {
        case '2':
          filters.Filters.push({NombreFiltro: 'FEAaTiempo', ValorFiltro: true});
          break;
        case '3':
          filters.Filters.push({NombreFiltro: 'FEAfueraDeTiempo', ValorFiltro: true});
          break;
        case '4':
          filters.Filters.push({NombreFiltro: 'FEAporVencer', ValorFiltro: true});
          break;
        case '5':
          filters.Filters.push({NombreFiltro: 'SinFEA', ValorFiltro: true});
          break;
      }
    }
    if (tabOption.id === '2') {
      filters.Filters.push({
        NombreFiltro: 'ConOrdenDeCompra',
        ValorFiltro: true,
      });
    }
    if (tabOption.id === '3') {
      filters.Filters.push({
        NombreFiltro: 'SinOrdenDeCompra',
        ValorFiltro: true,
      });
    }
    return filters;
  },
);
export const selectPurchaseOrdersTotals = createSelector(
  selectMappedClientList,
  (list: Array<IClientItemForNotProcessed>) =>
    sumBy(list, (o: IClientItemForNotProcessed) => o.NumeroPartidasTotal),
);
export const selectTotalValue = createSelector(
  selectMappedClientList,
  (list: Array<IClientItemForNotProcessed>) =>
    sumBy(list, (o: IClientItemForNotProcessed) => o.TotalUSD),
);
