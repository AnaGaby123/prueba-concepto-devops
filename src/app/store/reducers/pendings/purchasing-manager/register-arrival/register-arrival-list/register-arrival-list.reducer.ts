/* Store Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialIRegisterArrivalList,
  IPorter,
  IRegisterArrivalList,
} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-list/register-arrival-list.models';

/* Actions Imports */
import {registerArrivalListActions} from '@appActions/pendings/purchasing-manager/register-arrival';

/* Common Imports */
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

/* Tools Imports */
import {map as _map} from 'lodash-es';

export const registerArrivalListReducer: ActionReducer<IRegisterArrivalList> = createReducer(
  {...initialIRegisterArrivalList()},
  on(registerArrivalListActions.CLEAN_ALL_REGISTER_ARRIVAL_LIST, (state) => ({
    ...initialIRegisterArrivalList(),
  })),
  on(registerArrivalListActions.SET_SORT_OPTION, (state, {sort}) => ({
    ...state,
    sortByType: sort,
  })),
  on(registerArrivalListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
    portersStatus: API_REQUEST_STATUS_LOADING,
    needsToReloadPorter: true,
  })),
  on(registerArrivalListActions.FETCH_PORTERS_LOAD, (state) => ({
    ...state,
    portersStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(registerArrivalListActions.FETCH_PORTERS_SUCCESS, (state, {porters}) => ({
    ...state,
    porters,
    portersStatus: API_REQUEST_STATUS_SUCCEEDED,
    needsToReloadPorter: false,
  })),
  on(registerArrivalListActions.FETCH_PORTERS_FAILED, (state) => ({
    ...state,
    portersStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(registerArrivalListActions.FETCH_DONUT_DATA_LOAD, (state) => ({
    ...state,
    donutDataStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(registerArrivalListActions.FETCH_DONUT_DATA_SUCCESS, (state, {donutData}) => ({
    ...state,
    donutData,
    donutDataStatus: API_REQUEST_STATUS_SUCCEEDED,
    needsToReloadDonutData: false,
  })),
  on(registerArrivalListActions.FETCH_DONUT_DATA_FAILED, (state) => ({
    ...state,
    donutDataStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(registerArrivalListActions.SET_IS_OPEN_PORTER, (state, {namePorter}) => ({
    ...state,
    porters: _map(state.porters, (porter: IPorter) => ({
      ...porter,
      isOpen: porter.NombreExportador === namePorter ? !porter.isOpen : false,
    })),
  })),
);
