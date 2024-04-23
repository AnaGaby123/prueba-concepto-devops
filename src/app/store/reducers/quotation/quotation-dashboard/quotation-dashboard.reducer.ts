// Core
import {createReducer, on} from '@ngrx/store';

// Librerías
import {find, map} from 'lodash-es';

// Store
import {AttributeDashboard} from 'api-logistica';
import {QuotationDashboardState} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {quotationDashboardActions, quotationDetailsActions} from '@appActions/quotation';

// Helpers
import {
  initialClientQuotations,
  mapQuotationStatusFromApi,
} from '@appHelpers/pending/quotation/quotation.helpers';
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';

export const quotationDashboardReducer = createReducer(
  initialClientQuotations(),
  on(
    quotationDashboardActions.INIT_QUOTATION_DASHBOARD_COMPONENT_EFFECT,
    (state: QuotationDashboardState): QuotationDashboardState => ({
      ...state,
      clientsListRequestStatus: ApiRequestStatus.Loading,
    }),
  ),
  on(
    quotationDashboardActions.GET_QUOTATION_DASHBOARD_TABS_TOTALS_FAILED,
    (state: QuotationDashboardState): QuotationDashboardState => ({
      ...state,
      clientsListRequestStatus: ApiRequestStatus.Error,
    }),
  ),
  on(
    quotationDashboardActions.GET_QUOTATION_DASHBOARD_TABS_TOTALS_SUCCESS,
    (state: QuotationDashboardState, {tabs}): QuotationDashboardState => ({
      ...state,
      tabOptions: map(
        state.tabOptions,
        (o: ITabOption): ITabOption => ({
          ...o,
          totalSubtitle: find(
            tabs,
            (i: AttributeDashboard): boolean =>
              i.DescriptionField === mapQuotationStatusFromApi[o.label],
          )?.ValueField as string,
        }),
      ),
      tabOptionsApi: tabs,
    }),
  ),
  on(
    quotationDashboardActions.GET_QUOTATION_DASHBOARD_LIST_SUCCESS,
    (state: QuotationDashboardState, {clientsList}): QuotationDashboardState => ({
      ...state,
      clientsList,
      clientsListRequestStatus: ApiRequestStatus.Success,
    }),
  ),
  on(
    quotationDashboardActions.GET_QUOTATION_DASHBOARD_LIST_FAILED,
    (state: QuotationDashboardState): QuotationDashboardState => ({
      ...state,
      clientsList: [],
      clientsListRequestStatus: ApiRequestStatus.Error,
    }),
  ),
  on(
    quotationDashboardActions.CHANGE_LOADING_STATUS,
    (state: QuotationDashboardState): QuotationDashboardState => ({
      ...state,
      clientsList: [],
      clientsListRequestStatus: ApiRequestStatus.Loading,
    }),
  ),
  on(
    quotationDashboardActions.SET_TAP,
    (state: QuotationDashboardState, {tab}): QuotationDashboardState => ({
      ...state,
      selectedTabOption: tab,
    }),
  ),
  on(
    quotationDashboardActions.SET_FILTER_BY_TYPE,
    (state: QuotationDashboardState, {filter}): QuotationDashboardState => ({
      ...state,
      selectedTypeFilterOption: filter,
    }),
  ),
  on(
    quotationDashboardActions.SET_FILTER_BY_DATES,
    (state: QuotationDashboardState, {filters}): QuotationDashboardState => ({
      ...state,
      selectedDateFilterOption: filters,
    }),
  ),
  on(
    quotationDashboardActions.SET_SEARCH_TERM,
    (state: QuotationDashboardState, {searchTerm}): QuotationDashboardState => ({
      ...state,
      searchTerm,
    }),
  ),
  on(
    quotationDashboardActions.SET_SEARCH_TYPE,
    (state: QuotationDashboardState, {searchType}): QuotationDashboardState => ({
      ...state,
      selectedSearchTypeOption: searchType,
    }),
  ),
  on(
    quotationDashboardActions.UPDATE_STATUS_MAIL,
    (state: QuotationDashboardState, {status}): QuotationDashboardState => ({
      ...state,
      mailDetailStatus: status,
    }),
  ),
  on(
    quotationDetailsActions.RESTORE_INITIAL_STATE,
    (state: QuotationDashboardState): QuotationDashboardState => ({
      ...initialClientQuotations(),
    }),
  ),
);
