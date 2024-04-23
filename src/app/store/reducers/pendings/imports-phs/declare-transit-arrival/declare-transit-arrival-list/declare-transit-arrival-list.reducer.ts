import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IDeclareTransitArrivalList,
  initialIDeclareTransitArrivalList,
} from '@appModels/store/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-list/declare-transit-arrival-list.models';
/*Actions Imports*/
import {declareTransitArrivalListActions} from '@appActions/pendings/imports-phs/declare-transit-arrival';
import {API_REQUEST_STATUS_LOADING, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';

export const declareTransitArrivalListReducer: ActionReducer<IDeclareTransitArrivalList> = createReducer(
  {...initialIDeclareTransitArrivalList()},
  on(declareTransitArrivalListActions.SET_FILTER_ORDER, (state, {filter}) => ({
    ...state,
    filterByType: filter,
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(declareTransitArrivalListActions.SET_TAB_SELECTED, (state, {tab}) => ({
    ...state,
    selectedTab: tab,
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(declareTransitArrivalListActions.SET_TERM_SEARCH, (state, {searchTerm}) => ({
    ...state,
    queryInfo: {...state.queryInfo, searchTerm, desiredPage: 1},
  })),
  on(declareTransitArrivalListActions.FETCH_PROVIDERS_LOAD, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
    statusApiDonut: API_REQUEST_STATUS_LOADING,
  })),
  on(declareTransitArrivalListActions.FETCH_PROVIDERS_SUCCESS, (state, {data}) => ({
    ...state,
    providers: {
      TotalResults: data.TotalResults,
      Results:
        state.queryInfo.desiredPage === 1
          ? [...data.Results]
          : [...state.providers.Results, ...data.Results],
    },
  })),
  on(declareTransitArrivalListActions.SET_STATUS_API, (state, {status}) => ({
    ...state,
    queryInfo: {...state.queryInfo, requestStatus: status},
  })),
  on(declareTransitArrivalListActions.FETCH_DONUT_CHART_SUCCESS, (state, {data}) => ({
    ...state,
    donutChart: data,
    statusApiDonut: API_REQUEST_STATUS_SUCCEEDED,
  })),
);
