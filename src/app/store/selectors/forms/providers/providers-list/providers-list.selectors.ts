import {createSelector} from '@ngrx/store';
import {selectProviderForms} from '@appSelectors/forms/forms.selectors';
import {ProvidersState} from '@appModels/store/forms/providers/providers.models';
import {ProvidersListState} from '@appModels/store/forms/providers/providers-list/providers-list.models';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';

export const selectListProviders = createSelector(
  selectProviderForms,
  (state: ProvidersState): ProvidersListState => state.listProviders,
);
export const selectFiltersProviders = createSelector(selectListProviders, (state) => state.filters);
export const selectQueryInfo = createSelector(selectListProviders, (state) => state.queryInfo);
export const selectProviders = createSelector(
  selectListProviders,
  (state) => state?.providersList?.Results,
);
export const selectTotalProviders = createSelector(
  selectListProviders,
  (state) => state?.providersList?.TotalResults,
);
export const selectCurrentPage = createSelector(
  selectListProviders,
  (state) => state.queryInfo.desiredPage,
);
export const selectProvidersStatus = createSelector(
  selectListProviders,
  (state: ProvidersListState): number => {
    return state.providersRequestStatus;
  },
);
export const selectSearchTerm = createSelector(selectListProviders, (state) => state.searchTerm);
export const selectProviderQueryInfo = createSelector(
  selectListProviders,
  (state: ProvidersListState) => {
    const queryInfo = {...state.queryInfo};

    if (state.strategicIsSelected) {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'ExisteRelacionComercial',
          ValorFiltro: true,
        },
      ];
    }

    if (state.selectedProductTypesOption.value !== '1') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'IdCatTipoProducto',
          ValorFiltro: state.selectedProductTypesOption.value.toString(),
        },
      ];
    }
    if (state.selectedCustomAgentsOption.value !== '1') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'IdAgenteAduanal',
          ValorFiltro: state.selectedCustomAgentsOption.value.toString(),
        },
      ];
    }
    if (state.selectedProvidersOption.value !== '1') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'Activo',
          ValorFiltro: state.selectedProvidersOption.value === '2',
        },
      ];
    }
    if (state.selectedRegionOption.value !== '1') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'Mexicano',
          ValorFiltro: state.selectedRegionOption.value === '2',
        },
      ];
    }
    if (state.selectedBuyerOption.value !== '1') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'IdUsuarioComprador',
          ValorFiltro: state.selectedBuyerOption.value.toString(),
        },
      ];
    }
    if (state.selectedPayerOption.value !== '1') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'IdUsuarioPagador',
          ValorFiltro: state.selectedPayerOption.value.toString(),
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
  },
);
export const selectFetchMoreProvidersInfo = createSelector(
  selectListProviders,
  (state: ProvidersListState): IFetchMoreItemsInfo => {
    return {
      itemList: state.providersList?.Results,
      itemsTotalLength: state.providersList?.TotalResults,
      listRequestStatus: state.providersRequestStatus,
      desiredPage: state.queryInfo.desiredPage,
      pageSize: state.queryInfo.pageSize,
      totalPages:
        state.providersList?.TotalResults >= state.queryInfo.pageSize
          ? Math.ceil(state.providersList?.TotalResults / state.queryInfo.pageSize)
          : 0,
    };
  },
);
