import {
  initialStrategyDashboardState,
  mapStrategyStatusFromApi,
  StrategyDashboardyState,
} from '@appModels/store/pendings/strategy/strategy-dashboard/strategy-dashboard.model';
import {createReducer, on} from '@ngrx/store';
import {strategyActions, strategyDashboardActions} from '@appActions/pendings/strategy';
import {map, find} from 'lodash-es';
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {AttributeDashboard} from 'api-logistica';

const initialStateDashboardList: StrategyDashboardyState = {
  ...initialStrategyDashboardState(),
};
export const strategyDashboardReducer = createReducer(
  initialStateDashboardList,
  on(
    strategyDashboardActions.INIT_STRATEGY_DASHBOARD_COMPONENT_EFFECT,
    (state: StrategyDashboardyState): StrategyDashboardyState => ({
      ...state,
      listStrategiesStatus: ApiRequestStatus.Loading,
    }),
  ),
  on(
    strategyDashboardActions.GET_STRATEGY_DASHBOARD_TABS_TOTALS_FAILED,
    (state: StrategyDashboardyState): StrategyDashboardyState => ({
      ...state,
      listStrategiesStatus: ApiRequestStatus.Error,
    }),
  ),
  on(
    strategyDashboardActions.GET_STRATEGY_DASHBOARD_TABS_TOTALS_SUCCESS,
    (state: StrategyDashboardyState, {tabs}): StrategyDashboardyState => ({
      ...state,
      tabOptions: map(state.tabOptions, (o: ITabOption) => ({
        ...o,
        totalSubtitle: find(
          tabs,
          (i: AttributeDashboard) => i.DescriptionField === mapStrategyStatusFromApi[o.label],
        )?.ValueField as string,
        labelSubtitle:
          find(
            tabs,
            (i: AttributeDashboard) => i.DescriptionField === mapStrategyStatusFromApi[o.label],
          )?.ValueField !== 1
            ? o.labelSubtitle
            : 'Cotización',
      })),
      tabOptionsApi: tabs,
    }),
  ),
  on(
    strategyDashboardActions.GET_CLIENTS_QUOTATIONS_FOR_STRATEGY_SUCCESS,
    (state: StrategyDashboardyState, {clientsList}): StrategyDashboardyState => ({
      ...state,
      listStrategies: clientsList,
      listStrategiesStatus: ApiRequestStatus.Success,
    }),
  ),
  on(
    strategyDashboardActions.GET_CLIENTS_QUOTATIONS_FOR_STRATEGY_FAILDED,
    (state: StrategyDashboardyState): StrategyDashboardyState => ({
      ...state,
      listStrategies: [],
      listStrategiesStatus: ApiRequestStatus.Error,
    }),
  ),
  on(
    strategyDashboardActions.CHANGE_LOADING_STATUS,
    (state: StrategyDashboardyState): StrategyDashboardyState => ({
      ...state,
      listStrategies: [],
      listStrategiesStatus: ApiRequestStatus.Loading,
    }),
  ),
  on(strategyDashboardActions.SET_TAP, (state, {tab}) => ({
    ...state,
    selectedTabOption: tab,
  })),
  on(
    strategyDashboardActions.SET_FILTER_BY_TYPE,
    (state: StrategyDashboardyState, {filter}): StrategyDashboardyState => ({
      ...state,
      selectedTypeFilterOption: filter,
    }),
  ),
  on(
    strategyDashboardActions.SET_FILTER_BY_DATES,
    (state: StrategyDashboardyState, {filters}): StrategyDashboardyState => ({
      ...state,
      filterByDates: filters,
    }),
  ),
  on(
    strategyDashboardActions.SET_SEARCH_TERM,
    (state: StrategyDashboardyState, {searchTerm}): StrategyDashboardyState => ({
      ...state,
      searchTerm,
    }),
  ),
  on(strategyDashboardActions.SET_SEARCH_TYPE, (state, {searchType}) => ({
    ...state,
    selectedSearchType: searchType,
    searchTerm: '',
  })),
  on(strategyDashboardActions.SET_LIST_API_STATUS, (state, {apiStatus}) => ({
    ...state,
    listStrategiesStatus: apiStatus,
  })),
  on(strategyDashboardActions.SET_ACTIVE_CHART, (state, {active}) => ({
    ...state,
    activeChart: active,
  })),
  on(strategyActions.CLEAN_ALL_STRATEGY, (state) => initialStrategyDashboardState()),
);
