import {createSelector} from '@ngrx/store';
import {selectAttendInvestigationList} from '@appSelectors/pendings/attend-investigation/attend-investigation.selectors';
import {AttributeDashboard, ResumeGroupQueryInfo} from 'api-logistica';
import {
  AttendInvestigationProductsStatus,
  IAttendInvestigationList,
  IProvider,
} from '@appModels/store/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.model';
import {ITabOption} from '@appModels/botonera/botonera-option';

/* tools imports */
import {flow, forEach, map as _map, sumBy} from 'lodash-es';

import {IDoughnutChart, IDoughnutChartDetails, InitialIBarChart} from '@appModels/chart/chart';

export const selectTabOptionSelected = createSelector(
  selectAttendInvestigationList,
  (state: IAttendInvestigationList) => state.tabOptionSelected,
);

export const selectTabOptions = createSelector(
  selectAttendInvestigationList,
  (state: IAttendInvestigationList) => state.tabOptions,
);

export const selectListProviderDashboard = createSelector(
  selectAttendInvestigationList,
  (state: IAttendInvestigationList): Array<IProvider> => state.listProviders,
);

export const selectListProviderStatus = createSelector(
  selectAttendInvestigationList,
  (state: IAttendInvestigationList): number => state.listProviderStatus,
);

export const selectActiveChart = createSelector(
  selectAttendInvestigationList,
  (state: IAttendInvestigationList) => state.activeChart,
);

export const selectDashboardTabsGroupQueryInfo = createSelector(
  selectAttendInvestigationList,
  (state: IAttendInvestigationList): ResumeGroupQueryInfo => ({
    CountElements: [
      {NombreFiltro: 'Total', ValorFiltro: ''},
      {NombreFiltro: 'EstadoInvestigacion', ValorFiltro: 'Nueva'},
      {NombreFiltro: 'EstadoInvestigacion', ValorFiltro: 'Por reatender'},
      {NombreFiltro: 'EstadoInvestigacion', ValorFiltro: 'En Espera De Respuesta'},
    ],
  }),
);

export const selectDashboardListGroupQueryInfo = createSelector(
  selectAttendInvestigationList,
  selectTabOptionSelected,
  (state: IAttendInvestigationList, tabOption: ITabOption): ResumeGroupQueryInfo => {
    let filters: ResumeGroupQueryInfo = {
      CountElements: [
        {NombreFiltro: 'Total', ValorFiltro: ''},
        {NombreFiltro: 'EstadoInvestigacion', ValorFiltro: 'Nueva'},
        {NombreFiltro: 'EstadoInvestigacion', ValorFiltro: 'Por reatender'},
        {NombreFiltro: 'EstadoInvestigacion', ValorFiltro: 'En Espera De Respuesta'},
      ],
      DistinctFields: [{NombreFiltro: 'IdCotCotizacion', ValorFiltro: ''}],
      Fields: [{Campo: 'NombreProveedor'}],
      GroupColumn: 'IdProveedor',
      SortField: 'FechaRegistro',
      SortDirection: 'asc',
    };

    if (tabOption.label !== AttendInvestigationProductsStatus.Todos) {
      filters = {
        ...filters,
        Filters: [
          {
            NombreFiltro: tabOption.id === '2' ? 'PorInvestigar' : 'EstadoInvestigacion',
            ValorFiltro:
              tabOption.id === '2' ? '' : AttendInvestigationProductsStatus.Enesperaderespuesta,
          },
        ],
      };
    }
    return filters;
  },
);

export const selectMappedProvidersDashboardAttendInvestigation = createSelector(
  selectAttendInvestigationList,
  (state: IAttendInvestigationList): Array<IProvider> => {
    return _map(state.listProviders, (o: IProvider) => {
      const newObject = {...o};
      forEach(o.Atributos, (i: AttributeDashboard) => {
        newObject[i.DescriptionField] = i.ValueField;
      });
      return newObject;
    });
  },
);

export const selectDoughnutChartData = createSelector(
  selectMappedProvidersDashboardAttendInvestigation,
  (state) =>
    flow([
      (): IDoughnutChart => {
        const labels: Array<string> = [];
        const values: Array<number> = [];
        forEach(state, (o) => {
          labels.push(o.NombreProveedor);
          values.push(o.Total);
        });
        return {labels, values};
      },
    ])(),
);
export const selectDoughnutChartOptionDetails = createSelector(
  selectMappedProvidersDashboardAttendInvestigation,
  (state: Array<any>) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        let total = 0;
        let totalQuotations = 0;
        forEach(state, (o) => {
          total += o.Total;
          totalQuotations += o.IdCotCotizacion;
        });
        return [
          {label: 'Proveedores', value: state.length.toString()},
          {label: 'Productos', value: total.toString()},
          {
            label: 'Cotizaciones',
            value: totalQuotations.toString(),
          },
        ];
      },
    ])(),
);

export const selectDoughnutChartOptionDetailsHover = createSelector(
  selectMappedProvidersDashboardAttendInvestigation,
  (state: Array<any>) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        let data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(state, (o) => {
          let details: Array<IDoughnutChartDetails> = [];
          details = [
            ...details,
            {label: 'Productos', value: o.Total},
            {
              label: 'Cotizaciones',
              value: o.IdCotCotizacion,
            },
          ];
          data = [...data, details];
        });
        return data;
      },
    ])(),
);

export const selectDataBarChart = createSelector(
  selectMappedProvidersDashboardAttendInvestigation,
  (state: Array<IProvider>) => {
    const dataBarChart = InitialIBarChart();
    dataBarChart.labels = ['NUEVOS', 'REATENDIDOS', 'EN ESPERA DE RESPUESTA'];
    dataBarChart.values = [
      sumBy(state, (o) => o.EstadoInvestigacionNueva),
      sumBy(state, (o) => o.EstadoInvestigacionPorreatender),
      sumBy(state, (o) => o.EstadoInvestigacionEnEsperaDeRespuesta),
    ];
    dataBarChart.backgroundColor = ['#4BA92B', '#FEB319', '#BE2016'];
    return dataBarChart;
  },
);

export const selectTotalProducts = createSelector(
  selectMappedProvidersDashboardAttendInvestigation,
  (state: Array<IProvider>): number => sumBy(state, (o) => o.Total),
);
