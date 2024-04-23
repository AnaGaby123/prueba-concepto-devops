import {ActionReducer, createReducer, on} from '@ngrx/store';
/*Models Imports*/
import {
  initialIOrderModificationList,
  IOrderModificationList,
} from '@appModels/store/pendings/order-modification/order-modification-list/order-modification-list.model';
/*Actions Imports*/
import {orderModificationListActions} from '@appActions/pendings/order-modification';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

const initialOrderModificationList: IOrderModificationList = {
  ...initialIOrderModificationList(),
};

export const orderModificationListReducer: ActionReducer<IOrderModificationList> = createReducer(
  initialOrderModificationList,
  on(orderModificationListActions.SET_TAB_SELECTED, (state, {tab}) => ({
    ...state,
    tabSelected: tab,
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(orderModificationListActions.SET_FILTER_ORDER, (state, {filter}) => ({
    ...state,
    filterByType: filter,
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(orderModificationListActions.SET_TERM_SEARCH, (state, {termSearch}) => ({
    ...state,
    queryInfo: {...state.queryInfo, searchTerm: termSearch, desiredPage: 1},
  })),
  on(orderModificationListActions.SET_FILTER_DATE_RANGE, (state, {dateRange}) => ({
    ...state,
    queryInfo: {...state.queryInfo, dateRange, desiredPage: 1},
  })),
  on(
    orderModificationListActions.FETCH_CUSTOMER_ORDER_MODIFICATION_LOAD,
    (state, {isFirstPage}) => ({
      ...state,
      queryInfo: {
        ...state.queryInfo,
        desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
      },
    }),
  ),
  on(orderModificationListActions.FETCH_CUSTOMER_ORDER_MODIFICATION_SUCCESS, (state, {data}) => ({
    ...state,
    customers: {
      ...state.customers,
      TotalResults: data.TotalResults,
      Results:
        state.queryInfo.desiredPage === 1
          ? [...data.Results]
          : [...state.customers.Results, ...data.Results],
    },
  })),
  on(orderModificationListActions.FETCH_TOTALS_LOAD, (state) => ({
    ...state,
    totalsStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(orderModificationListActions.FETCH_TOTALS_SUCCESS, (state, {totals}) => ({
    ...state,
    barchart: {
      TotalPedidosConIncidencias: totals.TotalPedidosConIncidencias,
      TotalPedidosSinIncidencias: totals.TotalPedidosSinIncidencias,
    },
    doughnutChart: {
      customers: totals.ClientesModificacionPedido,
      Clientes: totals.ClientesModificacionPedido.length,
      TotalPedidos: totals.TotalPedidos,
      ValorTotal: totals.ValorTotal,
    },
    totals,
    totalsStatus: API_REQUEST_STATUS_SUCCEEDED,
    totalsNeedsToReload: false,
  })),
  on(orderModificationListActions.SET_NEEDS_TO_RELOAD_TOTALS, (state) => ({
    ...state,
    totalsNeedsToReload: true,
    totalsStatus: API_REQUEST_STATUS_DEFAULT,
  })),
);
