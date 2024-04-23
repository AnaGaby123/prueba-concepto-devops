import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {FacturasPendientesClienteObj} from 'api-finanzas';
import {
  QueryResultGraficaEntregaPartidaPedidoObj,
  QueryResultListaEntregaPartidaPedidoObj,
  TotalPedidoEntregaObj,
} from 'api-logistica';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'StrategyDetailsOfferApi';
const typeReducer = 'StrategyDetailsOffer';

export const CLEAN_ALL_OFFER = createAction(
  buildingStringActionType(typeReducer, 'Clean All Offer'),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_FILTER_BY_BRAND = createAction(
  buildingStringActionType(typeReducer, 'Set Filter Brand'),
  props<{value: DropListOption}>(),
);
export const SET_SEARCH_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Search Type'),
  props<{searchType: DropListOption}>(),
);
export const FETCH_MORE_ITEMS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch More Items Component Effect'),
  props<{event: IPageInfo}>(),
);
export const FETCH_MORE_ITEMS_COMPONENT_EFFECT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch more Items Component Effect failed'),
);

//DOCS: ACTIONS DE CONDICIONES DE PAGO (MOROSO)

export const FETCH_PENDING_INVOICES = createAction(
  buildingStringActionType(typeApi, 'Fetch Pending Invoices'),
);

export const FETCH_PENDING_INVOICES_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Pending Invoices Success'),
  props<{dataPendingInvoices: FacturasPendientesClienteObj}>(),
);

export const FETCH_PENDING_INVOICES_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Pending Invoices Failed'),
);
export const SET_FILTER_BY_TYPE_PENDING_INVOICES = createAction(
  buildingStringActionType(typeReducer, 'Set Filter by Type'),
  props<{filterByType: DropListOption}>(),
);
export const CLEAN_ALL_INFORMATION_DEFAULTER = createAction(
  buildingStringActionType(typeReducer, 'Clean All Delinquent'),
);

//DOCS: ACTIONS DE ENTREGA (GRAFICA)

export const FETCH_DATA_DELIVERY = createAction(
  buildingStringActionType(typeApi, 'Fetch List Deliveries'),
);
export const FETCH_DATA_DELIVERY_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch List Deliveries Success'),
);
export const FETCH_DATA_DELIVERY_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch List Deliveries Failed'),
);
export const SET_CHART_DATA_DELIVERY = createAction(
  buildingStringActionType(typeApi, 'Set Chart Data Delivery'),
  props<{dataChartDelivery: QueryResultGraficaEntregaPartidaPedidoObj}>(),
);
export const SET_LIST_DELIVERIES = createAction(
  buildingStringActionType(typeApi, 'Set List Deliveries'),
  props<{listDeliveries: QueryResultListaEntregaPartidaPedidoObj}>(),
);
export const SET_TOTAL_DELIVERIES = createAction(
  buildingStringActionType(typeApi, 'Fetch Total Deliveries'),
  props<{totalDeliveries: TotalPedidoEntregaObj}>(),
);
export const CLEAN_ALL_DELIVERY = createAction(
  buildingStringActionType(typeReducer, 'Clean All Delivery'),
);
