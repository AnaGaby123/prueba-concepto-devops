/* Core Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialIRegisterDispatchList,
  IRegisterDispatchList,
} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-list/register-dispatch-list.models';

/* Actions Imports */
import {registerDispatchListActions} from '@appActions/pendings/imports/register-dispatch';

const initialRegisterDispatchList: IRegisterDispatchList = {
  ...initialIRegisterDispatchList(),
};

export const registerDispatchListReducer: ActionReducer<IRegisterDispatchList> = createReducer(
  initialRegisterDispatchList,
  on(registerDispatchListActions.SET_SEARCH_TERM, (state: IRegisterDispatchList, {searchTerm}) => ({
    ...state,
    searchTerm,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: 1,
    },
  })),
  on(registerDispatchListActions.FETCH_CUSTOMS_BROKER_LOAD, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
  })),
  on(registerDispatchListActions.FETCH_CUSTOMS_BROKER_SUCCESS, (state, {data}) => ({
    ...state,
    customsBrokers: {
      TotalResults: data.TotalResults,
      Results:
        state.queryInfo.desiredPage === 1
          ? [...data.Results]
          : [...state.customsBrokers.Results, ...data.Results],
    },
  })),
  on(registerDispatchListActions.FETCH_TOTALS_SUCCESS, (state, {totals}) => ({
    ...state,
    totals,
  })),
  on(registerDispatchListActions.SET_SELECTED_OPTION, (state, {selectedOption}) => ({
    ...state,
    selectedOption,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: 1,
    },
  })),
  on(registerDispatchListActions.SET_STATUS_API, (state, {status}) => ({
    ...state,
    queryInfo: {...state.queryInfo, requestStatus: status},
  })),
);
