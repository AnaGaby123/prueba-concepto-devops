import {createSelector} from '@ngrx/store';
import {selectCustomAgentForms} from '@appSelectors/forms/forms.selectors';
import {queryInfoWithActiveFilter} from '@appModels/filters/Filters';
import {QueryInfo} from 'api-catalogos';

export const selectCustomsAgentsListForm = createSelector(
  selectCustomAgentForms,
  (state) => state.customsAgentsList,
);
export const selectSearchTerm = createSelector(
  selectCustomsAgentsListForm,
  (state) => state.searchTerm,
);
export const selectFilterOptions = createSelector(
  selectCustomsAgentsListForm,
  (state) => state.filterOptions,
);
export const selectedFilterOption = createSelector(
  selectCustomsAgentsListForm,
  (state) => state.filterOptionSelected,
);
export const selectCustomAgentList = createSelector(
  selectCustomsAgentsListForm,
  (state) => state.customsAgents,
);
export const selectQueryInfo = createSelector(
  selectSearchTerm,
  selectedFilterOption,
  (searchTerm: string, filterOption) => {
    const queryInfo: QueryInfo = queryInfoWithActiveFilter(false, false);
    if (filterOption.label !== 'Todos') {
      queryInfo.Filters.push({
        NombreFiltro: 'Activo',
        ValorFiltro: filterOption.label === 'Habilitados',
      });
    }
    if (searchTerm) {
      queryInfo.Filters.push({
        NombreFiltro: 'NombreComercial',
        ValorFiltro: searchTerm,
      });
    }
    queryInfo.SortDirection = 'asc';
    queryInfo.SortField = 'NombreComercial';
    return queryInfo;
  },
);
