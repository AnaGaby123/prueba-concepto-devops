import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IControlMaterialDeliveryDetails,
  IDispatchOrder,
  initialIControlMaterialDeliveryDetails,
} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery-details/control-material-delivery-details.models';
import {controlMaterialDeliveryDetailsActions} from '@appActions/pendings/imports-phs/control-material-delivery';
import {map as _map} from 'lodash-es';

export const controlMaterialDeliveryDetailsReducer: ActionReducer<IControlMaterialDeliveryDetails> = createReducer(
  {...initialIControlMaterialDeliveryDetails()},
  on(controlMaterialDeliveryDetailsActions.INITIAL_VIEW_DETAILS_LOAD, (state, {agent}) => ({
    ...state,
    selectedAgent: agent,
  })),
  on(
    controlMaterialDeliveryDetailsActions.ACKNOWLEDGMENT_DISPATCH_ORDERS_SUCCESS,
    (state, {orders}) => ({...state, dispatchOrders: orders}),
  ),
  on(controlMaterialDeliveryDetailsActions.SET_PARAM_ORDER_LIST, (state, {param}) => ({
    ...state,
    filterByType: param,
  })),
  on(controlMaterialDeliveryDetailsActions.SET_API_REQUEST_STATUS, (state, {status}) => ({
    ...state,
    queryInfo: {...state.queryInfo, requestStatus: status},
  })),
  on(controlMaterialDeliveryDetailsActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    queryInfo: {...state.queryInfo, searchTerm},
  })),
  on(controlMaterialDeliveryDetailsActions.SELECTED_ORDER, (state, {order}) => ({
    ...state,
    dispatchOrders: {
      ...state.dispatchOrders,
      Results: state.selectedOrder
        ? _map(state.dispatchOrders.Results, (item: IDispatchOrder) => {
            if (item.IdImpOrdenDespacho === state.selectedOrder.IdImpOrdenDespacho) {
              return {...state.selectedOrder};
            }
            return item;
          })
        : state.dispatchOrders.Results,
    },
    selectedOrder: order,
    base64: null,
  })),

  on(controlMaterialDeliveryDetailsActions.SET_NUMBER_OF_PACKAGES, (state, {numberOfPackages}) => ({
    ...state,
    selectedOrder: {...state.selectedOrder, numberOfPackages},
  })),
  on(controlMaterialDeliveryDetailsActions.GENERATE_CONVERT_BASE64_SUCCESS, (state, {base64}) => ({
    ...state,
    base64,
  })),
  on(controlMaterialDeliveryDetailsActions.GENERATE_FILE_DETAILS_SUCCESS, (state, {file}) => ({
    ...state,
    selectedOrder: {...state.selectedOrder, file},
  })),
  on(controlMaterialDeliveryDetailsActions.SET_STATUS_API_FILE, (state, {status}) => ({
    ...state,
    loadingFile: status,
  })),
);
