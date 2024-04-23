import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IManageBackOrderList,
  initialIManageBackOrderList,
} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-list/manage-back-order-list.models';
/*Actions Imports*/
import {manageBackOrderListActions} from '@appActions/pendings/purchasing-manager/manage-back-order';
import {API_REQUEST_STATUS_LOADING, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';

export const manageBackOrderListReducer: ActionReducer<IManageBackOrderList> = createReducer(
  {...initialIManageBackOrderList()},
  on(manageBackOrderListActions.SET_SORT_OPTION, (state, {sort}) => ({
    ...state,
    filterByType: sort,
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(manageBackOrderListActions.SET_TERM_SEARCH, (state, {searchTerm}) => ({
    ...state,
    queryInfo: {...state.queryInfo, searchTerm, desiredPage: 1},
  })),
  on(manageBackOrderListActions.FETCH_PROVIDERS_LOAD, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
    statusApiDonut: API_REQUEST_STATUS_LOADING,
  })),
  on(manageBackOrderListActions.FETCH_PROVIDERS_SUCCESS, (state, {data}) => ({
    ...state,
    providers: {
      ...state.providers,
      TotalResults: data.TotalResults,
      Results:
        state.queryInfo.desiredPage === 1
          ? [...data.Results]
          : [...state.providers.Results, ...data.Results],
    },
    statusApiDonut: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(manageBackOrderListActions.SET_STATUS_API, (state, {status}) => ({
    ...state,
    queryInfo: {...state.queryInfo, requestStatus: status},
  })),
  on(manageBackOrderListActions.FETCH_DONUT_PROVIDERS_SUCCESS, (state, {data}) => ({
    ...state,
    dataChartProvider: data,
  })),
  on(manageBackOrderListActions.FETCH_DONUT_MONITORING_SUCCESS, (state, {data}) => ({
    ...state,
    dataChartMonitoring: data,
  })),
  on(manageBackOrderListActions.SET_TYPE_SEARCH, (state, {typeOfSearch}) => ({
    ...state,
    typeOfSearch,
  })),
);
