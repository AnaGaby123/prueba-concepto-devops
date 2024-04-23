/* Core Imports */
import {createSelector} from '@ngrx/store';
import {flow, forEach, map as _map, sumBy} from 'lodash-es';

/* Models Imports */
import {
  IStrategyByClient,
  StrategyDashboardyState,
  StrategyStatus,
  StrategyStatusApiRequest,
} from '@appModels/store/pendings/strategy/strategy-dashboard/strategy-dashboard.model';
import {IFilterDate} from '@appModels/filters/Filters';
import {IDoughnutChart, IDoughnutChartDetails, InitialIBarChart} from '@appModels/chart/chart';

/* Selectors Imports */
import {selectStrategyDashboard} from '@appSelectors/pendings/strategy/strategy.selectors';

/* Tools Imports */
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {AttributeDashboard, ResumeGroupQueryInfo} from 'api-logistica';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {SortOptionsDashboard} from '@appModels/store/utils/utils.model';

export const selectOptionTabs = createSelector(
  selectStrategyDashboard,
  (state: StrategyDashboardyState): Array<ITabOption> =>
    _map(state.tabOptions, (o: ITabOption) => ({...o})),
);
export const selectedTabOption = createSelector(
  selectStrategyDashboard,
  (state: StrategyDashboardyState): ITabOption => state.selectedTabOption,
);
export const selectDashboardTabsGroupQueryInfo = createSelector(
  selectStrategyDashboard,
  (state: StrategyDashboardyState): ResumeGroupQueryInfo => ({
    Filters: [{NombreFiltro: 'TieneEstrategia', ValorFiltro: false}],
    CountElements: [
      {NombreFiltro: 'Total', ValorFiltro: ''},
      {NombreFiltro: 'EstadoCorreoCotizacion', ValorFiltro: 'Confirmada'},
      {NombreFiltro: 'EstadoCorreoCotizacion', ValorFiltro: 'Pendiente'},
      {NombreFiltro: 'EstadoCorreoCotizacion', ValorFiltro: 'ErrorEnEnvio'},
    ],
  }),
);
export const selectDataFilterByType = createSelector(
  selectStrategyDashboard,
  (state: StrategyDashboardyState): DropListOption[] => state.typeFilterOptions,
);
export const selectedTypeFilterOption = createSelector(
  selectStrategyDashboard,
  (state: StrategyDashboardyState): DropListOption => state.selectedTypeFilterOption,
);
export const selectSearchTypes = createSelector(
  selectStrategyDashboard,
  (state: StrategyDashboardyState): DropListOption[] => state.selectSearchTypes,
);
export const selectedSearchTypeOption = createSelector(
  selectStrategyDashboard,
  (state: StrategyDashboardyState) => state.selectedSearchType,
);
export const selectSearchTerm = createSelector(
  selectStrategyDashboard,
  (state: StrategyDashboardyState): string => state.searchTerm,
);
export const selectedDateFilterOption = createSelector(
  selectStrategyDashboard,
  (state: StrategyDashboardyState): IFilterDate => state.filterByDates,
);
export const selectDashboardListGroupQueryInfo = createSelector(
  [
    selectStrategyDashboard,
    selectedSearchTypeOption,
    selectSearchTerm,
    selectedTypeFilterOption,
    selectedTabOption,
    selectedDateFilterOption,
  ],
  (
    state: StrategyDashboardyState,
    searchTypeOption: DropListOption,
    searchTerm: string,
    typeFilterOption: DropListOption,
    tabOption: ITabOption,
    dateFilterOption: IFilterDate,
  ): ResumeGroupQueryInfo => {
    let filters: ResumeGroupQueryInfo = {
      Filters: [{NombreFiltro: 'TieneEstrategia', ValorFiltro: false}],
      CountElements: [
        {NombreFiltro: 'Total', ValorFiltro: ''},
        {NombreFiltro: 'EstadoCorreoCotizacion', ValorFiltro: 'Confirmada'},
        {NombreFiltro: 'EstadoCorreoCotizacion', ValorFiltro: 'Pendiente'},
        {NombreFiltro: 'EstadoCorreoCotizacion', ValorFiltro: 'ErrorEnEnvio'},
      ],
      // TODO: CAMBIAR POR TotalCotizadoUSD
      SumFields: [{NombreFiltro: 'TotalCotizadoUSD', ValorFiltro: ''}],
      Fields: [{Campo: 'Nombre'}],
      GroupColumn: 'IdCliente',
      // SortField: 'Nombre',
      SortField: 'FechaCotizacion',
      SortDirection: 'asc',
    };
    if (searchTerm) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {NombreFiltro: searchTypeOption.value, ValorFiltro: searchTerm},
        ],
      };
    }
    if (typeFilterOption.label !== SortOptionsDashboard.MasNuevas) {
      filters = {
        ...filters,
        SortDirection: 'desc',
      };
    }
    if (tabOption.label !== StrategyStatus.Todas) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: 'EstadoCorreoCotizacion',
            ValorFiltro: StrategyStatusApiRequest[tabOption.label.split(' ').join('')],
          },
        ],
      };
    }
    if (dateFilterOption) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: 'FechaInicio',
            ValorFiltro: dateFilterOption.startDate.toISOString().split('T')[0],
          },
          {
            NombreFiltro: 'FechaFin',
            ValorFiltro: dateFilterOption.endDate.toISOString().split('T')[0],
          },
        ],
      };
    }
    return filters;
  },
);
export const selectClientForStrategyList = createSelector(
  selectStrategyDashboard,
  (state: StrategyDashboardyState): Array<IStrategyByClient> => state.listStrategies,
);
export const selectedSearchType = createSelector(
  selectStrategyDashboard,
  (state) => state.selectedSearchType,
);
export const selectClientsForStrategyListRequestStatus = createSelector(
  selectStrategyDashboard,
  (state: StrategyDashboardyState): number => state.listStrategiesStatus,
);
export const selectMappedClientForStrategyList = createSelector(
  selectClientForStrategyList,
  (state: Array<IStrategyByClient>): Array<IStrategyByClient> => {
    return _map(state, (o: IStrategyByClient) => {
      const newObject = {...o};
      forEach(o.Atributos, (i: AttributeDashboard) => {
        newObject[i.DescriptionField] = i.ValueField;
      });
      return newObject;
    });
  },
);
export const selectTotalQuotes = createSelector(
  selectMappedClientForStrategyList,
  (state: Array<any>) => sumBy(state, (o) => o.Total),
);
export const selectTotalQuoteAmount = createSelector(
  selectMappedClientForStrategyList,
  (state: Array<any>) => sumBy(state, (o) => o.TotalCotizadoUSD),
);

export const selectActiveChart = createSelector(
  selectStrategyDashboard,
  (state: StrategyDashboardyState) => state.activeChart,
);

export const selectDoughnutChartData = createSelector(selectMappedClientForStrategyList, (state) =>
  flow([
    (): IDoughnutChart => {
      const labels: Array<string> = [];
      const values: Array<number> = [];
      forEach(state, (o) => {
        labels.push(o.Nombre);
        values.push(o.Total);
      });
      return {labels, values};
    },
  ])(),
);
export const selectDoughnutChartOptionDetails = createSelector(
  selectMappedClientForStrategyList,
  (state) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        let total = 0;
        let amount = 0;
        forEach(state, (o) => {
          total += o.Total;
          amount += o.TotalCotizadoUSD;
        });
        return [
          {label: 'Clientes', value: state.length.toString()},
          {label: 'Cotizaciones', value: total.toString()},
          {
            label: 'Valor Total en Cierre',
            value: `${new CurrencyFormat().transform(amount, 'USD')} USD`,
          },
        ];
      },
    ])(),
);
export const selectDoughnutChartOptionDetailsHover = createSelector(
  selectMappedClientForStrategyList,
  (state: Array<any>) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        let data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(state, (o) => {
          let details: Array<IDoughnutChartDetails> = [];
          details = [
            ...details,
            {label: 'Cotizaciones', value: o.Total},
            {
              label: 'Valor Total en Cierre',
              value: `${new CurrencyFormat().transform(o.TotalCotizadoUSD, 'USD')} USD`,
            },
          ];
          data = [...data, details];
        });
        return data;
      },
    ])(),
);

export const selectDataBarChart = createSelector(
  selectMappedClientForStrategyList,
  (state: Array<any>) => {
    const dataBarChart = InitialIBarChart();
    dataBarChart.labels = ['CONFIRMADAS', 'PENDIENTES', 'ERROR EN ENVIO'];
    dataBarChart.values = [
      sumBy(state, (o) => o.EstadoCorreoCotizacionConfirmada),
      sumBy(state, (o) => o.EstadoCorreoCotizacionPendiente),
      sumBy(state, (o) => o.EstadoCorreoCotizacionErrorEnEnvio),
    ];
    dataBarChart.backgroundColor = ['#4ba92b', '#f09600', '#cc4757'];
    return dataBarChart;
  },
);
