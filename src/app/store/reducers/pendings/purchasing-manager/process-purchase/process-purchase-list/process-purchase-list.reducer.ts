import {ActionReducer, createReducer, on} from '@ngrx/store';
/*Models Import*/
import {
  initialIProcessPurchaseList,
  IProcessPurchaseList,
} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase-list/process-purchase-list.models';
/*Actions Imports*/
import {processPurchaseListActions} from '@appActions/pendings/purchasing-manager/process-purchase';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {isEmpty} from 'lodash-es';

const initialProcessPurchaseList: IProcessPurchaseList = {
  ...initialIProcessPurchaseList(),
};
export const processPurchaseListReducer: ActionReducer<IProcessPurchaseList> = createReducer(
  initialProcessPurchaseList,
  on(processPurchaseListActions.SET_RANGE_DATE, (state, {dateRange}) => ({
    ...state,
    queryInfo: {...state.queryInfo, dateRange, desiredPage: 1},
  })),
  on(processPurchaseListActions.SET_SORT_SELECTED, (state, {typeSort}) => ({
    ...state,
    filterByType: typeSort,
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(processPurchaseListActions.SET_TAB_SELECTED, (state, {tab}) => ({
    ...state,
    tabSelected: tab,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: 1,
      requestStatus: API_REQUEST_STATUS_DEFAULT,
    },
  })),
  on(processPurchaseListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    queryInfo: {...state.queryInfo, searchTerm, desiredPage: 1},
  })),
  on(processPurchaseListActions.FETCH_PROVIDERS_LOAD, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
  })),
  on(processPurchaseListActions.FETCH_PROVIDERS_SUCCESS, (state, {data}) => ({
    ...state,
    providers: {
      ...state.providers,
      TotalResults: data.TotalResults,
      Results:
        state.queryInfo.desiredPage === 1
          ? [...data.Results]
          : [...state.providers.Results, ...data.Results],
    },
  })),
  on(processPurchaseListActions.SET_STATUS_API, (state, {status}) => ({
    ...state,
    queryInfo: {...state.queryInfo, requestStatus: status},
  })),
  on(processPurchaseListActions.FETCH_CHARTS_DONUT_LOAD, (state) => ({
    ...state,
    statusApiDonut: API_REQUEST_STATUS_LOADING,
  })),
  on(processPurchaseListActions.FETCH_CHARTS_DONUT_SUCCESS, (state, {data}) => ({
    ...state,
    dataDonuts: {
      ...state.dataDonuts,
      TipoDeTransito: !isEmpty(data.TipoDeTransito) ? data.TipoDeTransito : {},
      Proveedores: !isEmpty(data.Proveedores) ? data.Proveedores : {},
      LineaDeProducto: !isEmpty(data.LineaDeProducto) ? data.LineaDeProducto : {},
    },
    statusApiDonut: API_REQUEST_STATUS_SUCCEEDED,
  })),
);
