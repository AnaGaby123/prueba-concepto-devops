/* Core Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialIRegisterConfirmationList,
  IRegisterConfirmationList,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.models';

/* Actions Imports */
import {registerConfirmationListActions} from '@appActions/pendings/purchasing-manager/register-confirmation';

/* Common Imports */
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

const initialRegisterConfirmationList: IRegisterConfirmationList = {
  ...initialIRegisterConfirmationList(),
};
export const registerConfirmationListReducer: ActionReducer<IRegisterConfirmationList> = createReducer(
  initialRegisterConfirmationList,
  on(registerConfirmationListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
    needsToReloadProviders: true,
    providersStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(registerConfirmationListActions.SET_TYPE_OF_SEARCH, (state, {typeOfSearch}) => ({
    ...state,
    typeOfSearch,
  })),
  on(registerConfirmationListActions.SET_SORT_SELECTED, (state, {sort}) => ({
    ...state,
    filterByType: sort,
    needsToReloadProviders: true,
    providersStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(registerConfirmationListActions.FETCH_PROVIDERS_LOAD, (state) => ({
    ...state,
    providersStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(
    registerConfirmationListActions.FETCH_PROVIDERS_SUCCESS,
    (state, {providers, totalProviders}) => ({
      ...state,
      providers,
      providersStatus: API_REQUEST_STATUS_SUCCEEDED,
      totalProviders,
      needsToReloadProviders: false,
    }),
  ),
  on(registerConfirmationListActions.FETCH_PROVIDERS_FAILED, (state) => ({
    ...state,
    providersStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(registerConfirmationListActions.FETCH_CHARTS_DONUT_LOAD, (state) => ({
    ...state,
    donutChartsStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(
    registerConfirmationListActions.FETCH_CHARTS_DONUT_SUCCESS,
    (state, {donutProviders, donutFreight, donutDelivery}) => ({
      ...state,
      donutProviders,
      donutFreight,
      donutDelivery,
      donutChartsStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    registerConfirmationListActions.FETCH_CHARTS_DONUT_FAILED,
    (state, {donutProviders, donutFreight, donutDelivery}) => ({
      ...state,
      donutProviders,
      donutFreight,
      donutDelivery,
      donutChartsStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(registerConfirmationListActions.FETCH_CHARTS_BAR_LOAD, (state) => ({
    ...state,
    barChartsStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(registerConfirmationListActions.FETCH_CHARTS_BAR_SUCCESS, (state, {barTime}) => ({
    ...state,
    barTime,
    barChartsStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(registerConfirmationListActions.CLEAN_REGISTER_CONFIRMATION_STATE, (state) => ({
    ...initialRegisterConfirmationList,
  })),
);
