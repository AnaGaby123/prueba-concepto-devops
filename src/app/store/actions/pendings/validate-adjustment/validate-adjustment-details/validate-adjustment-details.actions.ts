import {createAction, props} from '@ngrx/store';
import {CorreoRecibidoClienteRequerimientoObj, VPpPedidoObj} from 'api-logistica';
import {Usuario, VDireccion} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  ICustomer,
  IOrder,
  IPpPartidaPedidoDetalleValidateAdjustment,
  IPurchase,
} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.models';
import {buildingStringActionType} from '@appUtil/strings';
import {IValidateAdjustment} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard.models';

const typeApi = 'API-Validate-Adjustment-Details';
const typeReducer = 'Reducer-Validate-Adjustment-Details';

export const FETCH_PURCHASE_ORDER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchase Load'),
);
export const FETCH_PURCHASE_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchase Load Success'),
  props<{data: IPurchase}>(),
);
export const FETCH_PURCHASE_ORDER_ERROR = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchase Load Error'),
  props<{error: any}>(),
);
export const FETCH_COMPLETE_DATA_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Complete Data Success'),
  props<{idOc: string; user: Usuario; order: IOrder}>(),
);
// export const FETCH_COMPLETE_DATA_ERROR = createAction(
//   buildingStringActionType(typeApi, 'Fetch Complete Data Error'),
// );
// export const FETCH_MAIL_PURCHASE_LOAD = createAction(
// //   buildingStringActionType(typeApi, 'Obtener Mail de Orde de Compra'),
// //   props<{purchaseOrder: VPpPedidoObj}>(),
// // );
// export const FETCH_MAIL_PP_ORDER_DETAILS_LOAD = createAction(
//   buildingStringActionType(typeApi, 'Obtener partida pedido detalle load'),
//   props<{purchaseOrder: IOrder}>(),
// );
export const FETCH_MAIL_PURCHASE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Mail Purchase Success'),
  props<{mail: CorreoRecibidoClienteRequerimientoObj; order: IOrder}>(),
);
export const FETCH_MAIL_PURCHASE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Mail Purchase Success'),
);

export const FETCH_COMPLETE_DATA_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Mail Purchase Failed'),
  props<{error: any}>(),
);
export const FETCH_MAIL_PP_ORDER_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Mail PP Order Details Success'),
  props<{itemsOrder: IPpPartidaPedidoDetalleValidateAdjustment[]}>(),
);
export const FETCH_MAIL_PP_ORDER_DETAILS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Mail PP Order Details Failed'),
);
export const UPDATE_ORDER_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Update Order Details Totals'),
  props<{order: VPpPedidoObj}>(),
);
export const SET_CUSTOMER_VALIDATE_ADJUSTMENT = createAction(
  buildingStringActionType(typeReducer, 'Set Customer'),
  props<{customer: IValidateAdjustment}>(),
);
export const SET_CUSTOMER_VALIDATE_ADJUSTMENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Customer Success'),
  props<{customer: ICustomer}>(),
);
export const CLEAN_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Clean State of Details'),
);
export const SET_OPTION_KEYPAD = createAction(
  buildingStringActionType(typeApi, 'Set Option KeyPad'),
  props<{option: DropListOption}>(),
);
export const SET_ORDER_LIST = createAction(
  buildingStringActionType(typeApi, 'Set Order List'),
  props<{typeOrder: DropListOption}>(),
);
export const SET_PURCHASE_ORDER_BACKUP = createAction(
  buildingStringActionType(typeApi, 'Set Purchase Order backup'),
  props<{order: IOrder}>(),
);
export const SET_PURCHASE_ORDER_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Set Purchase Order Selected'),
  props<{order: IOrder}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeApi, 'Set Search Term'),
  props<{term: string}>(),
);
export const VIEW_FILE_LOAD = createAction(
  buildingStringActionType(typeApi, 'View File Load'),
  props<{IdFile: string; ext: string}>(),
);
export const VIEW_FILE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'View File Success'),
  props<{fileBase64: string}>(),
);
export const VIEW_FILE_FAILED = createAction(
  buildingStringActionType(typeApi, 'View File Load'),
  props<{error: any}>(),
);
export const SET_OPEN_VIEW_FILE = createAction(
  buildingStringActionType(typeApi, 'Set Open View File'),
  props<{active: boolean}>(),
);
export const SET_DATA_VALIDATE = createAction(
  buildingStringActionType(typeReducer, 'Set Data Validate'),
  props<{value: boolean; typeValidate: string}>(),
);
export const SET_VALIDATE_ENTRY_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Set Validate Entry Item'),
  props<{IdPPPartidaPedido: string; value: boolean}>(),
);
export const SET_INPUT_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set Input Is Open'),
  props<{idQuoted: string; field: string}>(),
);
export const SET_INPUT_IS_CLOSE = createAction(
  buildingStringActionType(typeReducer, 'Set Input Is Close'),
);
export const SET_INCIDENCE_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set Incidence Value'),
  props<{entryId: string; field: string; value: boolean | string}>(),
);
export const UPDATE_ITEM_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Update PP Order Details'),
  props<{entry: IPpPartidaPedidoDetalleValidateAdjustment}>(),
);
export const PROCESS_ENTRIES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Process Entries Load'),
  props<{tramitable: boolean}>(),
);
export const PROCESS_ENTRIES_FAILED = createAction(
  buildingStringActionType(typeApi, 'Process Entries Failed'),
);
export const WITHOUT_ORDERS_RESULT = createAction(
  buildingStringActionType(typeApi, 'Without Orders Result'),
);
export const GET_DELIVERY_ADDRESSES = createAction(
  buildingStringActionType(typeApi, 'Get Delivery Addresses'),
);
export const GET_DELIVERY_ADDRESSES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Delivery Addresses Success'),
  props<{deliveryAddresses: VDireccion[]}>(),
);
export const GET_DELIVERY_ADDRESSES_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get Delivery Addresses Error'),
);
export const SELECT_DELIVERY_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Select Delivery Address'),
  props<{deliveryAddress: VDireccion}>(),
);
export const SET_UPDATE_REFERENCE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set update reference load'),
  props<{reference: string}>(),
);
export const SET_UPDATE_REFERENCE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set update reference success'),
  props<{reference: string}>(),
);
