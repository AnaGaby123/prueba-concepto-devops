/* Core Imports */
import {createSelector} from '@ngrx/store';

/* Models Imports */
import {
  IClientQuotation,
  IDashboardClients,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/details/daily-meeting-dashboard-details.model';
import {ResumeGroupQueryInfo} from 'api-logistica';

/* Selectors Imports */
import {
  selectClientsFromEvi,
  selectIdEviUser,
} from '@appSelectors/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.selectors';

/* Tools Imports */
import {forEach} from 'lodash-es';

import {selectDailyMeetingDetails} from '@appSelectors/pendings/daily-meeting/daily-meeting.selectors';
import {DailyMeetingDetailsState} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.model';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const selectDashboardClients = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState) => state.dashboardClients,
);
export const selectTotalClientsWithQuotations = createSelector(
  selectDailyMeetingDetails,
  (state: DailyMeetingDetailsState) => (state.listClients?.length ? state.listClients?.length : 0),
);
export const selectIsLoadingClientsWithQuotations = createSelector(
  selectDailyMeetingDetails,
  (clientsWithQuotations: DailyMeetingDetailsState): number =>
    clientsWithQuotations.listClientsStatus,
);
export const selectTotalQuotations = createSelector(
  selectClientsFromEvi,
  (state: Array<IClientQuotation>) => {
    let totalQuotations: number = 0;
    forEach(state, (client) => {
      totalQuotations += client.IdCotCotizacion;
    });
    return totalQuotations;
  },
);

export const selectSearchTermDashboard = createSelector(
  selectDashboardClients,
  (clientsWithQuotations: IDashboardClients) => clientsWithQuotations.searchTerm,
);
export const selectSearchTypesDashboard = createSelector(
  selectDashboardClients,
  (clientsWithQuotations: IDashboardClients) => clientsWithQuotations.searchTypes,
);
export const selectSearchTypeDashboardSelected = createSelector(
  selectDashboardClients,
  (clientsWithQuotations: IDashboardClients): DropListOption =>
    clientsWithQuotations.searchTypeSelected,
);
export const selectValuesFilterDashboard = createSelector(
  selectDashboardClients,
  (clientsWithQuotations: IDashboardClients) => clientsWithQuotations.typeFilterOptions,
);
export const selectFilterDashboardSelected = createSelector(
  selectDashboardClients,
  (clientsWithQuotations: IDashboardClients) => clientsWithQuotations.typeFilterOptionSelected,
);
export const selectFiltersTabIpadDashboard = createSelector(
  selectDashboardClients,
  (clientsWithQuotations: IDashboardClients) => clientsWithQuotations.filterTabsIpad,
);
export const selectTabSelectedIpadDashboard = createSelector(
  selectDashboardClients,
  (clientsWithQuotations: IDashboardClients) => clientsWithQuotations.tabSelectedIpad,
);
export const selectTabOptionsMacBookDashboard = createSelector(
  selectDashboardClients,
  (clientsWithQuotations: IDashboardClients) => clientsWithQuotations.tabsOptions,
);
export const selectTabSelectedMacBookDashboard = createSelector(
  selectDashboardClients,
  (clientsWithQuotations: IDashboardClients) => clientsWithQuotations.tabSelectedMacBook,
);

export const selectQueryInfoListDashboard = createSelector(
  [
    selectIdEviUser,
    selectTabSelectedMacBookDashboard,
    selectSearchTermDashboard,
    selectSearchTypeDashboardSelected,
    selectFilterDashboardSelected,
  ],
  (
    idUserEvi: string,
    tabSelected: ITabOption,
    searchTerm: string,
    searchTypeSelected: DropListOption,
    filterSelected: DropListOption,
  ): ResumeGroupQueryInfo => {
    let filters: ResumeGroupQueryInfo = {
      Filters: [{NombreFiltro: 'IdUsuarioTramita', ValorFiltro: idUserEvi}],
      CountElements: [{NombreFiltro: 'Total', ValorFiltro: ''}],
      SumFields: [{NombreFiltro: 'TotalCotizadoUSD', ValorFiltro: ''}],
      DistinctFields: [{NombreFiltro: 'IdCotCotizacion', ValorFiltro: ''}],
      Fields: [{Campo: 'Nombre'}, {Campo: 'Estrategia'}, {Campo: 'IdCliente'}],
      GroupColumn: 'IdAjOfEstrategiaCotizacion',
      SortField: 'TotalCotizadoUSD',
      SortDirection: 'desc',
    };

    if (tabSelected.label !== 'Todos') {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: 'EstadoContrato',
            ValorFiltro: tabSelected.label === 'Contrato' ? true : false,
          },
        ],
      };
    }

    if (searchTerm) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: searchTypeSelected.value === '1' ? 'Estrategia' : 'Nombre',
            ValorFiltro: searchTerm,
          },
        ],
      };
    }

    if (filterSelected) {
      filters = {
        ...filters,
        SortDirection: filterSelected.value !== '1' ? 'asc' : 'desc',
      };
    }

    return filters;
  },
);

export const selectQueryInfoTabsDashboard = createSelector(
  [selectIdEviUser],
  (idUserEvi: string): ResumeGroupQueryInfo => {
    let filters: ResumeGroupQueryInfo = {
      Filters: [{NombreFiltro: 'EstadoCotizacionJuntaDiaria', ValorFiltro: idUserEvi}],
      CountElements: [
        {NombreFiltro: 'Total', ValorFiltro: ''},
        {NombreFiltro: 'TieneContrato', ValorFiltro: true},
        {NombreFiltro: 'TieneContrato', ValorFiltro: false},
      ],
    };
    return filters;
  },
);
