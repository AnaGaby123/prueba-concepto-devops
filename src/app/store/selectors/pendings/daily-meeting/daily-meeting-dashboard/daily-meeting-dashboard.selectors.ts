import {createSelector} from '@ngrx/store';
import {selectDailyMeetingDashboard} from '@appSelectors/pendings/daily-meeting/daily-meeting.selectors';
import {
  DailyMeetingDashboardState,
  Evi,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard.model';
import {flow, forEach, map as _map, sumBy} from 'lodash-es';

import {IDoughnutChart, IDoughnutChartDetails, InitialIBarChart} from '@appModels/chart/chart';
import {IFilterDate} from '@appModels/filters/Filters';
import {AttributeDashboard, ResumeGroupQueryInfo} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {HIGHER_VALUE} from '@appUtil/common.protocols';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';

export const selectDataFilterByType = createSelector(
  selectDailyMeetingDashboard,
  (state: DailyMeetingDashboardState): DropListOption[] => state.typeFilterOptions,
);
export const selectedTypeFilterOption = createSelector(
  selectDailyMeetingDashboard,
  (state: DailyMeetingDashboardState): DropListOption => state.selectedTypeFilterOption,
);
export const selectSearchTypes = createSelector(
  selectDailyMeetingDashboard,
  (state: DailyMeetingDashboardState): DropListOption[] => state.selectSearchTypes,
);
export const selectedSearchTypeOption = createSelector(
  selectDailyMeetingDashboard,
  (state: DailyMeetingDashboardState): DropListOption => state.selectedSearchType,
);
export const selectSearchTerm = createSelector(
  selectDailyMeetingDashboard,
  (state: DailyMeetingDashboardState): string => state.searchTerm,
);
export const selectFilterByDates = createSelector(
  selectDailyMeetingDashboard,
  (state: DailyMeetingDashboardState): IFilterDate => state.selectedDateFilterOption,
);

export const selectEviListRequestStatus = createSelector(
  selectDailyMeetingDashboard,
  (state: DailyMeetingDashboardState): number => state.listDailyMeetingsStatus,
);

export const selectDashboardListGroupQueryInfo = createSelector(
  [
    selectDailyMeetingDashboard,
    selectFilterByDates,
    selectedSearchTypeOption,
    selectSearchTerm,
    selectedTypeFilterOption,
  ],
  (
    state: DailyMeetingDashboardState,
    dateFilterOptionSelected: IFilterDate,
    searchTypeOptionSelected: DropListOption,
    searchTerm: string,
    selectTypeFilterOption: DropListOption,
  ): ResumeGroupQueryInfo => {
    let filters: ResumeGroupQueryInfo = {
      Filters: [
        {NombreFiltro: 'TieneEstrategia', ValorFiltro: true},
        {NombreFiltro: 'Publicada', ValorFiltro: false},
      ],
      SumFields: [{NombreFiltro: 'TotalCotizadoUSD', ValorFiltro: ''}],
      DistinctFields: [
        {NombreFiltro: 'IdCliente', ValorFiltro: ''},
        {NombreFiltro: 'IdCotCotizacion', ValorFiltro: ''},
      ],
      Fields: [{Campo: 'UsuarioTramita'}],
      GroupColumn: 'IdUsuarioTramita',
      SortField: 'TotalCotizadoUSD',
      SortDirection: 'desc',
    };
    if (searchTerm) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {NombreFiltro: searchTypeOptionSelected.value, ValorFiltro: searchTerm},
        ],
      };
    }
    if (dateFilterOptionSelected) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: 'FechaInicio',
            ValorFiltro: dateFilterOptionSelected.startDate.toISOString().split('T')[0],
          },
          {
            NombreFiltro: 'FechaFin',
            ValorFiltro: dateFilterOptionSelected.endDate.toISOString().split('T')[0],
          },
        ],
      };
    }
    if (selectTypeFilterOption.label !== HIGHER_VALUE) {
      filters = {
        ...filters,
        SortDirection: 'asc',
      };
    }
    return filters;
  },
);

export const selectListDailyMeetings = createSelector(
  selectDailyMeetingDashboard,
  (state: DailyMeetingDashboardState): Array<Evi> => state.listEvisDailyMeetings,
);

export const selectMappedEvisClientForDailyMeetingList = createSelector(
  selectListDailyMeetings,
  (state: Array<Evi>): Array<Evi> => {
    return _map(state, (o: Evi) => {
      const newObject = {...o};
      forEach(o.Atributos, (i: AttributeDashboard) => {
        newObject[i.DescriptionField] = i.ValueField;
      });
      return newObject;
    });
  },
);

export const selectTotalClients = createSelector(
  selectMappedEvisClientForDailyMeetingList,
  (state: Array<any>) => sumBy(state, (o) => o.IdCliente),
);

export const selectTotalQuotes = createSelector(
  selectMappedEvisClientForDailyMeetingList,
  (state: Array<any>) => sumBy(state, (o) => o.IdCotCotizacion),
);

export const selectTotalClosingValue = createSelector(
  selectMappedEvisClientForDailyMeetingList,
  (state: Array<any>) => sumBy(state, (o) => o.TotalCotizadoUSD),
);

export const selectDoughnutChartData = createSelector(
  selectMappedEvisClientForDailyMeetingList,
  (state: Array<Evi>) =>
    flow([
      (): IDoughnutChart => {
        const labels: Array<string> = [];
        const values: Array<number> = [];
        forEach(state, (o) => {
          labels.push(o.UsuarioTramita);
          values.push(o.IdCotCotizacion);
        });
        return {labels, values};
      },
    ])(),
);

export const selectDoughnutChartOptionDetails = createSelector(
  selectMappedEvisClientForDailyMeetingList,
  (state: Array<Evi>) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        let clients = 0;
        let amount = 0;
        let quotations = 0;
        forEach(state, (o) => {
          clients += o.IdCliente;
          amount += o.TotalCotizadoUSD;
          quotations += o.IdCotCotizacion;
        });
        return [
          {label: 'Clientes', value: clients.toString()},
          {label: 'Cotizaciones', value: quotations.toString()},
          {
            label: 'Valor Total en Cierre',
            value: `${new CurrencyFormat().transform(amount, 'USD')} USD`,
          },
        ];
      },
    ])(),
);

export const selectDoughnutChartOptionDetailsHover = createSelector(
  selectMappedEvisClientForDailyMeetingList,
  (state: Array<any>) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        let data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(state, (o) => {
          let details: Array<IDoughnutChartDetails> = [];
          details = [
            ...details,
            {label: 'Clientes', value: o.IdCliente},
            {label: 'Cotizaciones', value: o.IdCotCotizacion},
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
  selectMappedEvisClientForDailyMeetingList,
  (chartData: Array<any>) => {
    const dataBarChart = InitialIBarChart();
    forEach(chartData, (o) => {
      dataBarChart.labels = [...dataBarChart.labels, o.UsuarioTramita || 'N/D'];
      dataBarChart.values = [...dataBarChart.values, o.TotalCotizadoUSD];
    });
    return dataBarChart;
  },
);
