import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IDeclareArrivalList,
  initialIDeclareArrivalList,
} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';
import {declareArrivalListActions} from '@appActions/pendings/purchasing-manager/declare-arrival';

export const declareArrivalListReducer: ActionReducer<IDeclareArrivalList> = createReducer(
  {...initialIDeclareArrivalList()},
  on(declareArrivalListActions.SET_SORT_OPTION, (state, {sort}) => ({
    ...state,
    filterByType: sort,
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(declareArrivalListActions.SET_TERM_SEARCH, (state, {searchTerm}) => ({
    ...state,
    queryInfo: {...state.queryInfo, searchTerm, desiredPage: 1},
  })),
  on(declareArrivalListActions.SET_TAB_SELECTED, (state, {tab}) => ({
    ...state,
    tabSelected: tab,
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(declareArrivalListActions.FETCH_PROVIDERS_LOAD, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
  })),
  on(declareArrivalListActions.FETCH_PROVIDERS_SUCCESS, (state, {data}) => ({
    ...state,
    providers: {
      TotalResults: data.TotalResults,
      Results:
        state.queryInfo.desiredPage === 1
          ? [...data.Results]
          : [...state.providers.Results, ...data.Results],
    },
  })),
  on(declareArrivalListActions.SET_STATUS_API, (state, {status}) => ({
    ...state,
    queryInfo: {...state.queryInfo, requestStatus: status},
  })),
  on(declareArrivalListActions.FETCH_DONUT_CHART_SUCCESS, (state, {data}) => ({
    ...state,
    donutChart: data,
  })),
  on(declareArrivalListActions.FETCH_TOTALS_SUCCESS, (state, {data}) => ({
    ...state,
    totals: data,
  })),
);
