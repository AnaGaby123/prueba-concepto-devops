/*MODELS*/
import {
  IClientsListForm,
  initialStateClientsList,
} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';

/*ACTIONS*/
import * as clientListActions from '@appActions/forms/client-form/clients-list-form/clients-list-form.actions';

import {createReducer, on} from '@ngrx/store';
import {
  ALL_VALUE,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

const initialClientsFormState: IClientsListForm = {
  ...initialStateClientsList(),
};

export const clientsListFormReducers = createReducer(
  initialClientsFormState,
  on(clientListActions.SET_CLIENTS_FILTER, (state, {selectedFilter, filterName}) => ({
    ...state,
    [filterName]: selectedFilter,
    corporativeIsSelected: false,
  })),
  on(
    clientListActions.FETCH_CLIENT_FILTER_SUCCESS,
    (
      state: IClientsListForm,
      {esacOptions, routeOptions, incomeLevelOptions, evOptions, type},
    ): IClientsListForm => ({
      ...state,
      incomeLevelOptions: [...state.incomeLevelOptions, ...incomeLevelOptions],
      routeOptions: [...state.routeOptions, ...routeOptions],
      esacOptions: [...state.esacOptions, ...esacOptions],
      evOptions: [...state.evOptions, ...evOptions],
      queryInfo: {
        ...state.queryInfo,
        desiredPage: 1,
      },
      clientsRequestStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(clientListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
  on(clientListActions.SET_CLIENTS_STATUS, (state, {clientsStatus}) => ({
    ...state,
    clientsRequestStatus: clientsStatus,
  })),
  on(clientListActions.FETCH_CAT_CLIENTS, (state, action) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: action.isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
    clientsRequestStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(clientListActions.FETCH_CAT_CLIENTS_SUCCESS, (state, {response}) => ({
    ...state,
    clientsList: {
      ...state.clientsList,
      Results:
        state.queryInfo.desiredPage === 1
          ? [...response.Results]
          : [...state.clientsList.Results, ...response.Results],
      TotalResults: response.TotalResults,
    },
    clientsRequestStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(clientListActions.FETCH_CORPORATES, (state) => ({
    ...state,
    clientsList: {
      Results: [],
      TotalResults: 0,
    },
    corporativeIsSelected: !state.corporativeIsSelected,
    corporates: {
      ...state.corporates,
      corporatesStatus: API_REQUEST_STATUS_LOADING,
    },
    selectedIncomeLevelOption: {
      value: '1',
      label: ALL_VALUE,
    },
    selectedRouteOption: {
      value: '1',
      label: ALL_VALUE,
    },
    selectedClientsOption: {
      value: '1',
      label: ALL_VALUE,
    },
    selectedEsacOption: {
      value: '1',
      label: ALL_VALUE,
    },
    selectedEvOption: {
      value: '1',
      label: ALL_VALUE,
    },
  })),
  on(clientListActions.FETCH_KAY_ACCOUNT, (state) => ({
    ...state,
    KeyAccountIsSelected: !state.KeyAccountIsSelected,
  })),
  on(
    clientListActions.FETCH_CORPORATES_SUCCESS,
    (state, {corporatesToShow, corporatesStatus, totalCorporates, needsToReloadCorporates}) => ({
      ...state,
      corporates: {
        totalCorporates,
        corporatesToShow,
        corporatesStatus: API_REQUEST_STATUS_SUCCEEDED,
        needsToReloadCorporates: false,
      },
    }),
  ),
  on(
    clientListActions.CLEAR_CLIENTS_LIST,
    (state): IClientsListForm => ({
      ...state,
      queryInfo: {...state.queryInfo, desiredPage: 1},
      clientsRequestStatus: API_REQUEST_STATUS_LOADING,
      clientsList: {
        Results: [],
        TotalResults: 0,
      },
    }),
  ),
  on(clientListActions.CLEAN_STATE, (state) => ({
    ...initialStateClientsList(),
  })),
  on(clientListActions.DOWNLOAD_CSV_CLIENTS_FILE_SUCCESS, (state, {csvFile}) => ({
    ...state,
    csvFile,
  })),
);
