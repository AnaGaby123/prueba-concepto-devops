import {createAction} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';
/*const typeApi = 'StrategyDetailsOfferDeliveryApi';
const typeReducer = 'StrategyDetailsOfferDelivery';*/

export const FETCH_DATA_DELIVERY = createAction(
  buildingStringActionType(typeApi, 'Fetch List Deliveries'),
);
// export const FETCH_DATA_DELIVERY_SUCCESS = createAction(
//   buildingStringActionType(typeApi, 'Fetch List Deliveries Success'),
// );
// export const FETCH_DATA_DELIVERY_FAILED = createAction(
//   buildingStringActionType(typeApi, 'Fetch List Deliveries Failed'),
// );
// export const SET_CHART_DATA_DELIVERY = createAction(
//   buildingStringActionType(typeApi, 'Set Chart Data Delivery'),
//   props<{dataChartDelivery: QueryResultGraficaEntregaPartidaPedidoObj}>(),
// );
// export const SET_LIST_DELIVERIES = createAction(
//   buildingStringActionType(typeApi, 'Set List Deliveries'),
//   props<{listDeliveries: QueryResultListaEntregaPartidaPedidoObj}>(),
// );
// export const SET_TOTAL_DELIVERIES = createAction(
//   buildingStringActionType(typeApi, 'Fetch Total Deliveries'),
//   props<{totalDeliveries: TotalPedidoEntregaObj}>(),
// );
// export const CLEAN_ALL_DELIVERY = createAction(
//   buildingStringActionType(typeReducer, 'Clean All Delivery'),
// );
