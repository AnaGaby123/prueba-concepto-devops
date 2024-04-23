/*MODELS*/
import {Corporates, ResultCorporates} from '@appModels/store/catalogs/catalogs.models';
import {IClientsFormState} from '@appModels/store/forms/clients-form/clients-form.models';
import {IClientsListForm} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';

/*UTILS*/
import {createSelector} from '@ngrx/store';
import {filter} from 'lodash-es';
import {selectClientForms} from '@appSelectors/forms/forms.selectors';
import {IClientsFormFilter} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form-filters.models';

export const selectClientsListState = createSelector(
  selectClientForms,
  (state: IClientsFormState): IClientsListForm => state.clientsList,
);
export const selectFilters = createSelector(
  selectClientsListState,
  (state: IClientsListForm): IClientsFormFilter[] => state.filters,
);

export const selectActiveTapCorporates = createSelector(
  selectClientsListState,
  (state: IClientsListForm) => state.corporativeIsSelected,
);

export const selectQueryInfo = createSelector(selectClientsListState, (state: IClientsListForm) => {
  const queryInfo = {...state.queryInfo};

  // TODO: falta filtro para corporativo y cuenta clave

  if (state.selectedIncomeLevelOption.value !== '1') {
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'IdCatNivelIngreso',
        ValorFiltro: state.selectedIncomeLevelOption.value.toString(),
      },
    ];
  }
  if (state.selectedRouteOption.value !== '1') {
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'IdCatRutaEntrega',
        ValorFiltro: state.selectedRouteOption.value.toString(),
      },
    ];
  }
  if (state.selectedClientsOption.value !== '1') {
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'Activo',
        ValorFiltro: state.selectedClientsOption.value === '2',
      },
    ];
  }
  if (state.selectedEsacOption.value !== '1') {
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'IdUsuarioESAC',
        ValorFiltro: state.selectedEsacOption.value.toString(),
      },
    ];
  }
  if (state.selectedEvOption.value !== '1') {
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'IdUsuarioEVI',
        ValorFiltro: state.selectedEvOption.value.toString(),
      },
    ];
  }
  if (state.KeyAccountIsSelected) {
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'CuentaClave',
        ValorFiltro: true,
      },
    ];
  }
  if (state.searchTerm) {
    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'Nombre',
        ValorFiltro: state.searchTerm,
      },
    ];
  }
  return queryInfo;
});

export const selectClientsList = createSelector(
  selectClientsListState,
  (state: IClientsListForm) => state.clientsList.Results,
);

export const selectTotalResults = createSelector(
  selectClientsListState,
  (state: IClientsListForm) => state.clientsList.TotalResults,
);
export const selectClientsApiStatus = createSelector(
  selectClientsListState,
  (state: IClientsListForm) => state.clientsRequestStatus,
);
export const selectCorporates = createSelector(
  selectClientsListState,
  (state: IClientsListForm) => state.corporates,
);
export const selectClientListSearchTerm = createSelector(
  selectClientsListState,
  (state: IClientsListForm) => state.searchTerm,
);
export const selectCorporatesToShow = createSelector(
  [selectCorporates, selectClientsListState],
  (corporates: ResultCorporates, listState: IClientsListForm) =>
    filter(corporates.corporatesToShow, (c: Corporates) => {
      const clients = filter(c.Clientes, (o) => {
        return o.NombreCorporativo.toLowerCase().indexOf(listState.searchTerm.toLowerCase()) !== -1;
      });
      return clients.length > 0;
    }),
);

export const selectFetchMoreClientsInfo = createSelector(
  selectClientsListState,
  (state: IClientsListForm): IFetchMoreItemsInfo => {
    return {
      itemList: state.clientsList?.Results,
      itemsTotalLength: state.clientsList?.TotalResults,
      listRequestStatus: state.clientsRequestStatus,
      desiredPage: state.queryInfo.desiredPage,
      pageSize: state.queryInfo.pageSize,
      totalPages:
        state.clientsList?.TotalResults >= state.queryInfo.pageSize
          ? Math.ceil(state.clientsList?.TotalResults / state.queryInfo.pageSize)
          : 0,
    };
  },
);
export const selectCsvFile = createSelector(
  selectClientsListState,
  (state: IClientsListForm) => state.csvFile,
);
