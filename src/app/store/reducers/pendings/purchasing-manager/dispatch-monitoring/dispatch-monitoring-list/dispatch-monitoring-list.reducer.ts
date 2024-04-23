/* Store Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  IDispatchMonitoringList,
  initialIDispatchMonitoringList,
} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list.models';

/* Actions Imports */
import {dispatchMonitoringListActions} from '@appActions/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring.dictionaty.actions';

/* Common Imports */
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

const initialDispatchMonitoringList: IDispatchMonitoringList = {
  ...initialIDispatchMonitoringList(),
};

export const dispatchMonitoringListReducer: ActionReducer<IDispatchMonitoringList> = createReducer(
  initialDispatchMonitoringList,
  on(
    dispatchMonitoringListActions.CLEAN_ALL_DISPATCH_MONITORING_LIST,
    (state: IDispatchMonitoringList) => ({
      ...initialDispatchMonitoringList,
    }),
  ),
  on(dispatchMonitoringListActions.SET_SORT_OPTION, (state, {sort}) => ({
    ...state,
    sortByType: sort,
    providerStatus: API_REQUEST_STATUS_LOADING,
    needsToReloadProviders: true,
  })),
  on(dispatchMonitoringListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
    portersStatus: API_REQUEST_STATUS_LOADING,
    needsToReloadPorter: true,
  })),
  on(dispatchMonitoringListActions.FETCH_PROVIDERS_LOAD, (state) => ({
    ...state,
    providerStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(dispatchMonitoringListActions.FETCH_PROVIDERS_SUCCESS, (state, {providers}) => ({
    ...state,
    providers,
    needsToReloadProviders: false,
    providerStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(dispatchMonitoringListActions.FETCH_PROVIDERS_FAILED, (state) => ({
    ...state,
    providerStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(dispatchMonitoringListActions.FETCH_DATA_CHARTS_LOAD, (state) => ({
    ...state,
    dataChartsStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(dispatchMonitoringListActions.FETCH_DATA_CHARTS_SUCCESS, (state, {dataCharts}) => ({
    ...state,
    dataCharts,
    needsToReloadCharts: false,
    dataChartsStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(dispatchMonitoringListActions.FETCH_DATA_CHARTS_FAILED, (state) => ({
    ...state,
    dataChartsStatus: API_REQUEST_STATUS_FAILED,
  })),
);
