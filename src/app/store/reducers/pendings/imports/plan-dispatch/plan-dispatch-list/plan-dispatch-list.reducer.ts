/* Core Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialIPlanDispatchList,
  IPlanDispatchList,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.models';

/* Actions Imports */
import {planDispatchListActions} from '@appActions/pendings/imports/plan-dispatch';

/* Common Imports */
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

const initialPlanDispatchList: IPlanDispatchList = {
  ...initialIPlanDispatchList(),
};

export const planDispatchListReducer: ActionReducer<IPlanDispatchList> = createReducer(
  initialPlanDispatchList,
  on(
    planDispatchListActions.SET_SEARCH_TERM,
    (state: IPlanDispatchList, {searchTerm}): IPlanDispatchList => ({
      ...state,
      searchTerm,
      needsToReloadProviders: true,
      providersStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    planDispatchListActions.SET_SELECTED_BURGER_OPTION,
    (state: IPlanDispatchList, {selectedBurgerOption}): IPlanDispatchList => ({
      ...state,
      selectedBurgerOption,
      needsToReloadProviders: true,
      providersStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    planDispatchListActions.FETCH_PROVIDERS_LOAD,
    (state: IPlanDispatchList): IPlanDispatchList => ({
      ...state,
      providersStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    planDispatchListActions.FETCH_PROVIDERS_SUCCESS,
    (state: IPlanDispatchList, {providersList}): IPlanDispatchList => ({
      ...state,
      providersList,
      providersStatus: API_REQUEST_STATUS_SUCCEEDED,
      needsToReloadProviders: false,
    }),
  ),
  on(
    planDispatchListActions.FETCH_PROVIDERS_FAILED,
    (state: IPlanDispatchList): IPlanDispatchList => ({
      ...state,
      providersStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(
    planDispatchListActions.FETCH_BARS_CHART_DATA_LOAD,
    (state: IPlanDispatchList): IPlanDispatchList => ({
      ...state,
      donutChartStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    planDispatchListActions.FETCH_BARS_CHART_DATA_SUCCESS,
    (state: IPlanDispatchList, {barsChartData}): IPlanDispatchList => ({
      ...state,
      barsChartData,
      donutChartStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    planDispatchListActions.FETCH_BARS_CHART_DATA_FAILED,
    (state: IPlanDispatchList): IPlanDispatchList => ({
      ...state,
      donutChartStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
);
