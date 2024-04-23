import {createReducer, on} from '@ngrx/store';
import {initialIGeneralSummary} from '@appModels/store/general-summary/general-summary.models';
// Actions
import * as actions from '@appActions/general-summary/general-summary.actions';
import {API_REQUEST_STATUS_LOADING, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';
import {map as _map} from 'lodash-es';

export const generalSummaryReducer = createReducer(
  initialIGeneralSummary(),
  on(actions.FILTER_CONTRACT_SELECTED, (state, {filter}) => ({
    ...state,
    contractFilter: filter,
  })),
  on(actions.FILTER_STATUS_SELECTED, (state, {filter}) => ({
    ...state,
    stateFilter: filter,
  })),
  on(actions.OPTION_EVI_SELECTED, (state, {option}) => ({...state, option})),
  on(actions.SET_ALL_CLIENTS, (state, {data}) => ({
    ...state,
    allCustomer: data,
  })),
  on(actions.FILTER_CUSTOMER_SELECTED, (state, {filter}) => ({
    ...state,
    customerFilter: filter,
  })),
  on(actions.FETCH_CUSTOMER_GENERAL_SUMMARY_SUCCESS, (state, {data}) => ({
    ...state,
    customers: {
      ...state.customerFilter,
      TotalResults: data.TotalResults,
      Results:
        state.queryInfo.desiredPage > 1
          ? [...state.customers.Results, ...data.Results]
          : data.Results,
    },
    statusApi: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(actions.FETCH_EVI_LIST_SUCCESS, (state, {data}) => ({
    ...state,
    listEvi: data,
  })),
  on(actions.FETCH_CUSTOMER_GENERAL_SUMMARY_LOAD, (state) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
    },
    statusApi: API_REQUEST_STATUS_LOADING,
  })),
  on(actions.CUSTOMER_SELECTED, (state, {customer}) => ({
    ...state,
    customerSelected: customer,
  })),
  on(actions.FETCH_STRATEGIES_SUCCESS, (state, {strategy}) => ({
    ...state,
    customerSelected: {...state.customerSelected, strategy},
    customers: {
      ...state.customers,
      Results: _map(state.customers.Results, (customer) => {
        if (customer.IdCliente === state.customerSelected.IdCliente) {
          return {...customer, strategy};
        }
        return customer;
      }),
    },
  })),
);
