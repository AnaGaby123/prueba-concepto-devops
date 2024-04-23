/* Core Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Actions Imports */
import {checkOcNotArrivedListActions} from '@appActions/pendings/purchasing-manager/check-oc-not-arrived';

/* Models Imports */
import {
  ICheckOcNotArrivedList,
  initialICheckOcNotArrivedList,
} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-list/check-oc-not-arrived-list.models';

/* Common Imports */
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

const initialCheckOcNotArrivedList: ICheckOcNotArrivedList = {
  ...initialICheckOcNotArrivedList(),
};
export const checkOcNotArrivedListReducer: ActionReducer<ICheckOcNotArrivedList> = createReducer(
  initialCheckOcNotArrivedList,
  on(checkOcNotArrivedListActions.SET_SORT_OPTION, (state, {sort}) => ({
    ...state,
    filterByType: sort,
    needsToReloadProviders: true,
    providersStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(checkOcNotArrivedListActions.SET_TERM_SEARCH, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
    needsToReloadProviders: true,
    providersStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(checkOcNotArrivedListActions.SET_SEARCH_TYPE, (state, {typeOfSearch}) => ({
    ...state,
    typeOfSearch,
  })),

  on(checkOcNotArrivedListActions.FETCH_PROVIDERS_LOAD, (state) => ({
    ...state,
    providersStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(
    checkOcNotArrivedListActions.FETCH_PROVIDERS_SUCCESS,
    (state, {providers, totalProviders}) => ({
      ...state,
      providersStatus: API_REQUEST_STATUS_SUCCEEDED,
      providers,
      totalProviders,
      needsToReloadProviders: false,
    }),
  ),
  on(checkOcNotArrivedListActions.FETCH_PROVIDERS_FAILED, (state) => ({
    ...state,
    providersStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(checkOcNotArrivedListActions.FETCH_CHARTS_DONUT_LOAD, (state) => ({
    ...state,
    donutChartsStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(
    checkOcNotArrivedListActions.FETCH_CHARTS_DONUT_SUCCESS,
    (state, {donutProviders, donutFreight, donutDelivery}) => ({
      ...state,
      donutProviders,
      donutFreight,
      donutDelivery,
      donutChartsStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    checkOcNotArrivedListActions.FETCH_CHARTS_DONUT_FAILED,
    (state, {donutProviders, donutFreight, donutDelivery}) => ({
      ...state,
      donutProviders,
      donutFreight,
      donutDelivery,
      donutChartsStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(checkOcNotArrivedListActions.FETCH_CHARTS_BAR_LOAD, (state) => ({
    ...state,
    barChartsStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(checkOcNotArrivedListActions.FETCH_CHARTS_BAR_SUCCESS, (state, {barTime}) => ({
    ...state,
    barTime,
    barChartsStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(checkOcNotArrivedListActions.CLEAN_CHECK_OC_STATE, (state) => ({
    ...initialCheckOcNotArrivedList,
  })),
);
