/* Core Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  IConfirmDispatchList,
  initialIConfirmDispatchList,
} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-list/confirm-dispatch-list.models';

/* Actions Imports */
import {confirmDispatchListActions} from '@appActions/pendings/purchasing-manager/confirm-dispatch';

/* Common Imports */
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

const initialConfirmDispatchList: IConfirmDispatchList = {
  ...initialIConfirmDispatchList(),
};

export const confirmDispatchListReducer: ActionReducer<IConfirmDispatchList> = createReducer(
  initialConfirmDispatchList,
  on(confirmDispatchListActions.CLEAN_DISPATCH_LIST, (state) => ({
    ...initialConfirmDispatchList,
  })),
  on(confirmDispatchListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
    providersStatus: API_REQUEST_STATUS_LOADING,
    needsToReloadProviders: true,
  })),
  on(confirmDispatchListActions.SET_SORT_SELECTED, (state, {sort}) => ({
    ...state,
    filterByType: sort,
    providersStatus: API_REQUEST_STATUS_LOADING,
    needsToReloadProviders: true,
  })),
  on(confirmDispatchListActions.SET_TYPE_OF_SEARCH, (state, {typeOfSearch}) => ({
    ...state,
    typeOfSearch,
    providersStatus: API_REQUEST_STATUS_LOADING,
    needsToReloadProviders: true,
  })),
  on(confirmDispatchListActions.FETCH_PROVIDERS_LOAD, (state) => ({
    ...state,
    providersStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(confirmDispatchListActions.FETCH_PROVIDERS_SUCCESS, (state, {providers}) => ({
    ...state,
    providers,
    needsToReloadProviders: false,
    providersStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(confirmDispatchListActions.FETCH_PROVIDERS_FAILED, (state) => ({
    ...state,
    providersStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(confirmDispatchListActions.FETCH_DATA_CHARTS_LOAD, (state) => ({
    ...state,
    dataChartsStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(confirmDispatchListActions.FETCH_DATA_CHARTS_SUCCESS, (state, {dataCharts}) => ({
    ...state,
    dataCharts,
    needsToReloadDataCharts: false,
    dataChartsStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(confirmDispatchListActions.FETCH_DATA_CHARTS_FAILED, (state) => ({
    ...state,
    dataChartsStatus: API_REQUEST_STATUS_FAILED,
  })),
);
