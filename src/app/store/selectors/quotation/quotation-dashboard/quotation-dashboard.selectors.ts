// Core
// Librerías
import {createSelector} from '@ngrx/store';
import {flow, forEach, map, sumBy} from 'lodash-es';

// Store
import {
  ClientsListItemForQuotation,
  QuotationDashboardState,
} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';
import {AttributeDashboard, ResumeGroupQueryInfo} from 'api-logistica';
import {IFilterDate} from '@appModels/filters/Filters';
import {IDoughnutChart, IDoughnutChartDetails, InitialIBarChart} from '@appModels/chart/chart';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {selectClientQuotations} from '@appSelectors/quotation/quotation.selectors';

// Helpers
import {
  mapQuotationStatusCatQuotationState,
  QuotationStatus,
  QuotationTypes,
} from '@appHelpers/pending/quotation/quotation.helpers';
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';

export const selectOptionsTabs = createSelector(
  selectClientQuotations,
  (state: QuotationDashboardState): Array<ITabOption> =>
    map(state.tabOptions, (o: ITabOption) => ({...o})),
);
export const selectedTabOption = createSelector(
  selectClientQuotations,
  (state: QuotationDashboardState): ITabOption => state.selectedTabOption,
);
export const selectedTypeFilterOption = createSelector(
  selectClientQuotations,
  (state: QuotationDashboardState): DropListOption => state.selectedTypeFilterOption,
);
export const selectDataFilterByType = createSelector(
  selectClientQuotations,
  (state: QuotationDashboardState): DropListOption[] => state.typeFilterOptions,
);
export const selectedDateFilterOption = createSelector(
  selectClientQuotations,
  (state: QuotationDashboardState): IFilterDate => state.selectedDateFilterOption,
);
export const selectSearchTerm = createSelector(
  selectClientQuotations,
  (state: QuotationDashboardState): string => state.searchTerm,
);
export const selectSearchTypes = createSelector(
  selectClientQuotations,
  (state: QuotationDashboardState): DropListOption[] => state.searchTypeOptions,
);
export const selectedSearchTypeOption = createSelector(
  selectClientQuotations,
  (state: QuotationDashboardState) => state.selectedSearchTypeOption,
);
export const selectDashboardTabsGroupQueryInfo = createSelector(
  selectClientQuotations,
  (state: QuotationDashboardState): ResumeGroupQueryInfo => ({
    CountElements: [
      {NombreFiltro: 'Total', ValorFiltro: ''},
      {NombreFiltro: 'EstadoCotizacion', ValorFiltro: 'Nueva'},
      {NombreFiltro: 'EstadoCotizacion', ValorFiltro: 'Guardada'},
      {NombreFiltro: 'EstadoCotizacion', ValorFiltro: 'Enviada'},
    ],
  }),
);
export const selectDashboardListGroupQueryInfo = createSelector(
  [
    selectClientQuotations,
    selectedSearchTypeOption,
    selectSearchTerm,
    selectedTypeFilterOption,
    selectedTabOption,
    selectedDateFilterOption,
  ],
  (
    state: QuotationDashboardState,
    searchTypeOption: DropListOption,
    searchTerm: string,
    typeFilterOption: DropListOption,
    tabOption: ITabOption,
    dateFilterOption: IFilterDate,
  ): ResumeGroupQueryInfo => {
    let filters = {
      Filters: [],
      CountElements: [
        {NombreFiltro: 'Total', ValorFiltro: ''},
        {NombreFiltro: 'EstadoCotizacion', ValorFiltro: 'Nueva'},
        {NombreFiltro: 'EstadoCotizacion', ValorFiltro: 'Guardada'},
        {NombreFiltro: 'EstadoCotizacion', ValorFiltro: 'Enviada'},
        {NombreFiltro: 'TipoCotizacion', ValorFiltro: 'Total'},
        {NombreFiltro: 'TipoCotizacion', ValorFiltro: 'Parcial'},
      ],
      SumFields: [
        {NombreFiltro: 'ProductoDisponible', ValorFiltro: ''},
        /*
        {NombreFiltro: 'ProductoNoDisponible', ValorFiltro: ''},
*/
        {NombreFiltro: 'Sugerencias', ValorFiltro: ''},
      ],
      Fields: [{Campo: 'Nombre'}, {Campo: 'NivelIngreso'}, {Campo: 'Categoria'}],
      GroupColumn: 'IdCliente',
      SortField: 'FechaCotizacion',
      SortDirection: 'desc',
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
    if (typeFilterOption.label !== QuotationTypes.TodosLosTipos) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {NombreFiltro: 'TipoCotizacion', ValorFiltro: typeFilterOption.label},
        ],
      };
    }
    if (tabOption.label !== QuotationStatus.Todas) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: 'EstadoCotizacion',
            ValorFiltro: mapQuotationStatusCatQuotationState[tabOption.label],
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
export const selectClientList = createSelector(
  selectClientQuotations,
  (state: QuotationDashboardState): Array<ClientsListItemForQuotation> => state.clientsList,
);
export const selectMappedClientList = createSelector(
  selectClientList,
  (state: Array<ClientsListItemForQuotation>): ClientsListItemForQuotation[] => {
    return map(state, (o: ClientsListItemForQuotation) => {
      const newObject = {...o};
      forEach(o.Atributos, (i: AttributeDashboard) => {
        newObject[i.DescriptionField] = i.ValueField;
      });
      return newObject;
    });
  },
);
export const selectTotalQuotesOfClients = createSelector(
  selectMappedClientList,
  (state: ClientsListItemForQuotation[]) =>
    sumBy(state, (o: ClientsListItemForQuotation) => o.Total),
);
export const selectDoughnutChartData = createSelector(
  selectMappedClientList,
  (state: ClientsListItemForQuotation[]) =>
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
  selectMappedClientList,
  (state: ClientsListItemForQuotation[]) => {
    const res = flow([
      (): IDoughnutChartDetails[] => {
        let total = 0;
        forEach(state, (o) => {
          total += o.Total;
        });
        return [
          {label: 'Clientes', value: state.length.toString()},
          {label: 'Requisiciones', value: total.toString()},
        ];
      },
    ])();
    return res;
  },
);
export const selectDoughnutChartOptionDetailsHover = createSelector(
  selectMappedClientList,
  (state: ClientsListItemForQuotation[]) =>
    flow([
      (): IDoughnutChartDetails[][] => {
        const data: IDoughnutChartDetails[][] = [];
        forEach(state, (o: ClientsListItemForQuotation) => {
          const details: IDoughnutChartDetails[] = [];
          details.push({label: 'Requisiciones', value: o.Total.toString()});
          data.push(details);
        });
        return data;
      },
    ])(),
);
export const selectDataBarChart = createSelector(
  selectMappedClientList,
  (state: ClientsListItemForQuotation[]) => {
    const dataBarChart = InitialIBarChart();
    dataBarChart.labels = ['TOTAL', 'PARCIAL'];
    dataBarChart.values = [
      sumBy(state, (o: ClientsListItemForQuotation) => o.TipoCotizacionTotal),
      sumBy(state, (o: ClientsListItemForQuotation) => o.TipoCotizacionParcial),
    ];
    dataBarChart.backgroundColor = ['#5FBA67', '#9135A4'];
    return dataBarChart;
  },
);
export const selectStatusMailData = createSelector(
  selectClientQuotations,
  (state: QuotationDashboardState): boolean => state.mailDetailStatus === 1,
);
export const selectClientsListRequestStatus = createSelector(
  selectClientQuotations,
  (state: QuotationDashboardState): number => state.clientsListRequestStatus,
);
