import {createAction, props} from '@ngrx/store';
import {CorreoRecibidoClienteRequerimientoObj, CotCotizacion} from 'api-logistica';
import {
  CustomerList,
  IListItemForPreProcessing,
} from '@appModels/store/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IOrder,
  IPurchaseOrders,
} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';
import {Usuario, VDireccion} from 'api-catalogos';
import {
  IItemsOrders,
  IPpPartidaPedidoDetallePretamitar,
} from '@appModels/store/pre-processing/preprocess-order-details/sections/quoted-items/quoted-items.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'Api-PreProcessOrderDetails';
const typeReducer = 'PreProcessOrderDetails';

//DOCS: INICIO
export const INITIAL_PREPROCESS_ORDER = createAction(
  buildingStringActionType(typeApi, 'Initial Preprocess Order Details'),
);

//DOCS: OBTENER INFORMACIÓN DEL ESAC
export const FETCH_COMPLETE_DATA_ESAC_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Complete Data ESAC Load'),
  props<{item: IOrder}>(),
);
export const FETCH_COMPLETE_DATA_ESAC_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Complete Data ESAC Success'),
  props<{idPPPedido: string; user: Usuario}>(),
);
export const FETCH_COMPLETE_DATA_ESAC_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Complete Data Esac Failed'),
);
//DOCS: ABRIR POP UP "VER PARTIDA (TEE)"
export const SET_OPEN_POP_UP_TEE_ITEM_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set Open Pop Up Tee Item Order'),
  props<{value: boolean; itemOrder: IPpPartidaPedidoDetallePretamitar}>(),
);
export const CLOSE_POP_UP_TEE_ITEM_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Close Pop Up Tee Item Order'),
  props<{value: boolean}>(),
);
export const SET_TEXT_NOTES = createAction(
  buildingStringActionType(typeReducer, 'Set Text Notes'),
  props<{notes: string}>(),
);

export const SET_NUMBER_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set Number Order'),
  props<{order: number}>(),
);
export const SET_VALUE_CHECK_BOX_POP_UP_TEE = createAction(
  buildingStringActionType(typeReducer, 'Set Value Check Box Pop Up Tee'),
  props<{value: boolean}>(),
);
export const SET_POP_ITEM_DATE_ESTIMATED_FEE = createAction(
  buildingStringActionType(typeReducer, 'Set item pop estimated tee'),
  props<{
    dateString: string;
    date: Date;
  }>(),
);

export const SET_UNIT_MEASUREMENT_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set Unit Measurement Value'),
  props<{
    selectedUnit: DropListOption;
  }>(),
);
export const SET_DATA_ITEM_ORDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Data Item Order Selected'),
);
export const FETCH_NON_WORKING_DAYS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Non Working Days Success'),
  props<{nonWorkingDays: string[]}>(),
);

export const FETCH_NON_WORKING_DAYS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Non Working Days Failed'),
);

//DOCS: OBTENER LAS PARTIDAS DEL PEDIDO SELECCIONADO

export const FETCH_ITEMS_ORDER_SELECTED_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Order Selected Load'),
  props<{itemId: string}>(),
);
export const FETCH_ITEMS_ORDER_SELECTED_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items Order Selected Success'),
  props<{itemsOrder: IItemsOrders}>(),
);
export const FETCH_ITEMS_ORDER_SELECTED_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Order Selected Failed'),
);

// DOCS: REGRESAR LA ORDEN DE COMPRA SELECCIONADA A LA LISTA

export const SET_PURCHASE_ORDER_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Set Purchase Order Backup'),
  props<{selectedOrder: IOrder}>(),
);
export const RETURN_ORDER_SELECTED_TO_LIST = createAction(
  buildingStringActionType(typeReducer, 'Return Order Selected To List'),
  props<{item: IOrder; index: number}>(),
);

export const SET_PURCHASE_ORDER_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Set Purchase Order Selected'),
  props<{item: IOrder; index: number}>(),
);

//DOCS: OBTENER LAS ORDENES DE COMPRA
export const FETCH_PURCHASE_ORDER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchase Load'),
);
export const FETCH_PURCHASE_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchase Load Success'),
  props<{data: IPurchaseOrders}>(),
);
export const FETCH_PURCHASE_ORDER_ERROR = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchase Load Error'),
  props<{error: any}>(),
);

//DOCS: SELECCIONAR UN CLIENTE DEL DASHBOARD
export const SET_CLIENT_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Set Client Selected'),
  props<{customer: IListItemForPreProcessing}>(),
);
export const SET_CLIENT_SELECTED_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set Client Selected Success'),
  props<{customer: CustomerList}>(),
);

//DOCS: OBTENER LOS DETALLES DEL REQUERIMIENTO

export const FETCH_MAIL_PURCHASE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Mail Purchase Success'),
  props<{mail: CorreoRecibidoClienteRequerimientoObj; idPPedido: string}>(),
);
export const FETCH_MAIL_PURCHASE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Mail Purchase Failed'),
  props<{error: any}>(),
);

//DOCS: MONEDA SELECCIONADA //TODO: VERIFICAR SI PERMANECERÁ O ELIMINARÁ
export const SET_SELECTED_TYPE_COINS = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Type Coins'),
  props<{coin: string; currencyId: string}>(),
);

//DOCS: AGEGRAR UNA NUEVA PARTIDA
export const SET_IS_IN_ADD_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Set is in add item'),
  props<{isInAddItem: boolean}>(),
);

//DOCS: RESTAURAR ORDEN DE COMRPRA BACKUP
export const RESTORE_PURCHASE_ORDER_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Restore purchase order backup'),
  props<{selected: IOrder}>(),
);

//DOCS: ACTUALIZAR LISTA DE PARTIDA DE LA ORDEN DE COMPRA SELECCIONADA
export const UPDATE_QUOTE_ITEMS_LIST = createAction(
  buildingStringActionType(typeReducer, 'Update Quote Items List'),
  props<{IdPPPartidaPedido: string; linkedQuotes: Array<CotCotizacion>}>(),
);

//DOCS: SET PARTIDA VALIDADA
export const SET_VALIDATE_ENTRY_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Set Validate Entry Item'),
  props<{idQuote: string; value: boolean}>(),
);

//DOCS: MOSTRAR INPUT DE LAS PARTIDAS (PIEZAS Y PRECIO UNITARIO)
export const SET_INPUT_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set input is visible'),
  props<{idQuote: string; field: string}>(),
);
export const SET_INPUT_IS_CLOSE = createAction(
  buildingStringActionType(typeReducer, 'Set input is invisible'),
);

export const SET_ENTRY_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeApi, 'Set entry needs to reload'),
  props<{needsToReload: boolean}>(),
);

//DOCS: TABS DEL SUB-DASHBOARD
export const SET_OPTION_KEYPAD = createAction(
  buildingStringActionType(typeApi, 'Set Option KeyPad'),
  props<{option: DropListOption}>(),
);

//DOCS: ARCHIVOS
export const VIEW_FILE_LOAD = createAction(
  buildingStringActionType(typeApi, 'View File Load'),
  props<{IdArchivo: string; ext: string}>(),
);
export const VIEW_FILE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'View File Success'),
  props<{fileBase64: string}>(),
);
export const VIEW_FILE_ERROR = createAction(buildingStringActionType(typeApi, 'View File  Error'));
export const SET_OPEN_VIEW_FILE = createAction(
  buildingStringActionType(typeApi, 'Set Open View File'),
  props<{active: boolean}>(),
);
export const VIEW_FILE_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'View File Is Loading'),
  props<{value: boolean}>(),
);

export const SET_ITEM_LINKED = createAction(
  buildingStringActionType(typeReducer, 'Set Item Linked'),
  props<{item}>(),
);

export const SET_ID_ARCHIVO_PDF = createAction(
  buildingStringActionType(typeApi, 'Set Id File PDF'),
  props<{IdArchivo: string}>(),
);
export const SET_IS_PDF = createAction(
  buildingStringActionType(typeReducer, 'Set Is pdf'),
  props<{value: boolean}>(),
);
export const SET_ITEM_LINKED_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set Item linked open'),
  props<{item}>(),
);

//DOCS: SUB-DASHBOARD
export const SET_ORDER_LIST = createAction(
  buildingStringActionType(typeApi, 'Set Order List'),
  props<{typeOrder: DropListOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeApi, 'Set search term'),
  props<{term: string}>(),
);

export const SET_STATUS_API = createAction(
  buildingStringActionType(typeApi, 'Set status API'),
  props<{status: number}>(),
);

//DOCS: ELIMINAR UNA PARTIDA DE LA ORDEN DE COMPRA SELECCIONADAO

export const DELETE_ITEM_IN_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Delete Item In Order'),
  props<{entry: IPpPartidaPedidoDetallePretamitar}>(),
);
export const REVERT_DELETE_ITEM_IN_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Revert Delete Item In Order'),
  props<{entry: IPpPartidaPedidoDetallePretamitar}>(),
);

export const DELETE_PP_ORDER_DETAILS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Delete PP Oder Details Load'),
  props<{entry: IPpPartidaPedidoDetallePretamitar}>(),
);
export const DELETE_PP_ORDER_DETAILS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Delete PP Order Details Failed'),
);

//DOCS: SELECCIONAR PARTIDA PEDIDO DETALLE PARA ACTUALIZAR

export const UPDATE_ITEM_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Update item selected'),
  props<{entry: IPpPartidaPedidoDetallePretamitar}>(),
);

export const UPDATE_PP_ORDER_DETAILS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Update PP Order details load'),
  props<{entry: IPpPartidaPedidoDetallePretamitar; isReplaced: boolean}>(),
);
export const UPDATE_PP_ORDER_DETAILS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Update PP Order Details Failed'),
);

export const RESTORE_REPLACED_PP_ORDER_DETAILS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Rstaurar partida pedido detalle reemplazada load'),
  props<{entry: IPpPartidaPedidoDetallePretamitar}>(),
);
export const PROCESS_ENTRIES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Tramitar partidas load'),
);
export const PROCESS_ENTRIES_FAILED = createAction(
  buildingStringActionType(typeApi, 'Tramitar partidas failed'),
);

//DOCS: POP UP PRODUCTOS CONTROLADOS

export const VALIDATE_ITEMS_ORDER_CONTROLLED = createAction(
  buildingStringActionType(typeReducer, 'Validate Items Order Controlled'),
);

export const ITEMS_CONTROLLED_IN_ORDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Items Controlled In Order Selected'),
  props<{value: boolean}>(),
);

export const CLOSE_POP_UP_ITEMS_CONTROLLED = createAction(
  buildingStringActionType(typeReducer, 'Close Pop Up Items Controlled'),
);

export const FETCH_SUCCESS = createAction(buildingStringActionType(typeReducer, 'Fetch Success'));

export const SET_ADDENDA_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set Addenda Data'),
  props<{key: string; data: string}>(),
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
  props<{address: VDireccion}>(),
);

export const SET_UPDATE_REFERENCE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set update reference load'),
  props<{reference: string}>(),
);
export const SET_UPDATE_REFERENCE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set update reference success'),
  props<{reference: string}>(),
);
export const SEARCH_ITEMS_BY_CATALOG = createAction(
  buildingStringActionType(typeApi, 'Search Items By Catalog'),
  props<{catalog: string}>(),
);

//DOCS: REEMPLAZAR PARTIDAS

// export const SET_SELECTED_PP_ORDER_DETAILS = createAction(
//   buildingStringActionType(typeReducer, 'Seleccionar partida pedido detalle para reemplazar'),
//   props<{entry: IPpPartidaPedidoDetallePretamitar}>(),
// );

//TODO: ACCIONES DEL CODIGO DE VERIFICACIÓN, ACTUALMENTE NO ES REQUERIDO

//DOCS: CODIGO DE VERIFICACION

// export const INVALIDATE_AUTHORIZED_CODE_LOAD = createAction(
//   buildingStringActionType(typeReducer, 'Invalidar código después de realizar un cambio load'),
// );
// export const INVALIDATE_AUTHORIZED_CODE_SUCCESS = createAction(
//   buildingStringActionType(typeReducer, 'Invalidar código después de realizar un cambio success'),
// );
// export const INVALIDATE_AUTHORIZED_CODE_FAILED = createAction(
//   buildingStringActionType(typeReducer, 'Invalidar código después de realizar un cambio failed'),
// );
//
// export const FETCH_VERIFICATION_CODE_REQUEST_LOAD = createAction(
//   buildingStringActionType(typeApi, 'Consultar Solicitud de codigo de verificación de OC'),
//   props<{item: IOrder}>(),
// );
// export const FETCH_VERIFICATION_CODE_REQUEST_SUCCESS = createAction(
//   buildingStringActionType(typeApi, 'Consultar Solicitud de codigo de verificación de OC Exitosa'),
//   props<{idPPPedido: string; codeRequest: SolicitudAutorizacionCambio}>(),
// );
// export const FETCH_VERIFICATION_CODE_REQUEST_FAILED = createAction(
//   buildingStringActionType(typeApi, 'Fetch Verification Code Request Failed'),
// );
// export const SET_CODE_VALUE_BY_POSITION = createAction(
//   buildingStringActionType(typeReducer, 'Set Code Value By Position'),
//   props<{position: number; value: number}>(),
// );
// export const UPDATE_PURCHASE_ORDER_CODE_REQUEST = createAction(
//   buildingStringActionType(typeApi, 'Update Purchase Order Code Request'),
//   props<{item: IOrder}>(),
// );
// export const RESTORE_CODE_VALUE = createAction(
//   buildingStringActionType(typeReducer, 'Restore Code Value'),
// );
//
// export const SET_SHAKED = createAction(
//   buildingStringActionType(typeReducer, 'Cambiar shaked'),
//   props<{value: boolean}>(),
// );
