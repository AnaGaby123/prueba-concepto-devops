import {createAction, props} from '@ngrx/store';
// Models
//TODO: SE COMENTA DEBIDO A CAMBIOS EN LA API, VERIFICAR SI SE VA A CAMBIAR O ELIMINAR
// import {CotCotizacion, PpPedidoInstruccionesEntrega, VClienteppPedidoObj} from 'api-logistica';
import {
  CorreoRecibidoClienteRequerimientoObj,
  GMCotCotizacionDetalle,
  GMTipoAutorizacionUsuarioDetalle,
  VClienteppPedidoObj,
} from 'api-logistica';
import {
  ICustomer,
  IDataItem,
  IOrderNotProcessed,
  IPpPartidaPedidoObjNotProcess,
  IPurchase,
} from '@appModels/store/pendings/not-processed/not-processed-details/not-processed-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

import {ContactoDetalleObj, Usuario, VDireccion} from 'api-catalogos';

import {IDataMail} from '@appModels/correo/correo';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'not-processed-details';
const typeApi = '[Api] not-processed-details';
export const SET_CLIENT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Client Selected'),
  props<{client: VClienteppPedidoObj}>(),
);
export const SET_CLIENT_SELECTED_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Client Selected Success'),
  props<{customer: ICustomer}>(),
);
export const CLEAN_ALL_NOT_PROCESSED_DETAIL = createAction(
  buildingStringActionType(typeReducer, 'Clean All Details'),
);
export const FETCH_PURCHASE_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Orders Success'),
  props<{data: IPurchase}>(),
);
export const GET_CLIENT_CONTACTS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Client Contacts'),
  props<{ppPedido: IOrderNotProcessed}>(),
);
export const GET_CLIENT_CONTACTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Client Contacts Success'),
  props<{contacts: ContactoDetalleObj[]}>(),
);
export const GET_ITEMS_ORDER_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Get Client Contacts Success'),
);
export const GET_CLIENT_CONTACTS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get Client Contacts Failed'),
);
export const GET_DELIVERY_INSTRUCTIONS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Delivery Instructions Load'),
  props<{ppPedido: IOrderNotProcessed; contacts: ContactoDetalleObj[]}>(),
);

export const SET_PURCHASE_ORDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Purchase Order'),
  props<{item: IOrderNotProcessed}>(),
);
export const SET_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Status'),
  props<{node: string; status: number}>(),
);
export const SET_KEYPAD_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Key Pad Option Selected'),
  props<{option: DropListOption}>(),
);
export const SET_TERM_SEARCH = createAction(
  buildingStringActionType(typeReducer, 'Set Term Search'),
  props<{termSearch: string}>(),
);
export const SET_FILTER_FEA_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Filter FEA'),
  props<{option: DropListOption}>(),
);
export const FETCH_MAIL_PURCHASE_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Mail of Order'),
  props<{mail: CorreoRecibidoClienteRequerimientoObj}>(),
);
export const GET_USER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Data User Success'),
  props<{user: Usuario; idOc: string}>(),
);
export const FETCH_ITEMS_ORDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items Of Order Load'),
  props<{order: IOrderNotProcessed}>(),
);
export const FETCH_ITEMS_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items Of Order Success'),
  props<{items: IDataItem; idPPPedido: string}>(),
);
export const UPDATE_STATUS_ITEM_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Delete Item of Purchase Order'),
  props<{item: IPpPartidaPedidoObjNotProcess}>(),
);
export const CANCEL_PROCESS_OC = createAction(
  buildingStringActionType(typeReducer, 'Cancel Process OC'),
);
export const CANCEL_PROCESS_OC_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Cancel Process OC Success'),
);
export const SET_INCIDENCE_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set incidence value'),
  props<{IdPPOrderItem: string; field: string; value: boolean | string}>(),
);
export const SET_SELECTED_PPPEDIDO_CONTACT_FOR_DROP = createAction(
  buildingStringActionType(typeReducer, 'Set selected ppPedido contact for drop'),
  props<{email: string}>(),
);
export const SET_SELECTED_DELIVERY_CONTACT_FOR_DROP = createAction(
  buildingStringActionType(typeReducer, 'Set selected delivery contact for drop'),
  props<{email: string}>(),
);
export const SET_PPPEDIDO_OBSERVATIONS = createAction(
  buildingStringActionType(typeReducer, 'Set ppPedido observations'),
  props<{observations: string}>(),
);
export const SET_DELIVERY_INSTRUCTIONS = createAction(
  buildingStringActionType(typeReducer, 'Set delivery instructions'),
  props<{instructions: string}>(),
);
export const SET_PPPEDIDO_FEA = createAction(
  buildingStringActionType(typeReducer, 'Set ppPedido FEA'),
  props<{date: Date; stringDate: string}>(),
);
export const SEND_REQUEST_FOR_FEA_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Send request for fea load'),
);
export const SEND_REQUEST_FOR_FEA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Send request for fea success'),
);
export const SEND_REQUEST_FOR_FEA_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Send request for fea failed'),
);
export const SET_OPEN_VIEW_FILE = createAction(
  buildingStringActionType(typeApi, 'Actualizar visualización'),
  props<{active: boolean}>(),
);
export const VIEW_FILE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Visualizar archivo'),
  props<{IdArchivo: string; ext: string}>(),
);
export const VIEW_FILE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Visualizar archivo Exitosamente'),
  props<{fileBase64: string}>(),
);
export const VIEW_FILE_ERROR = createAction(
  buildingStringActionType(typeApi, 'Visualizar archivo Error'),
);
export const FETCH_SUCCESS = createAction(buildingStringActionType(typeReducer, 'Fetch  Success'));
// DOCS: Se comenta porque actualmente no se está usando el servicio de traer las cotizaciones vinculadas, descomentar en caso de ser necesario
/*export const SET_ITEM_LINKED = createAction(
  buildingStringActionType(typeReducer, 'Set item linked'),
  props<{item: IQuoteSummaryItem}>(),
);

export const UPDATE_ITEM_LIST = createAction(
  buildingStringActionType(typeReducer, 'Update item list'),
  props<{IdPPPartidaPedido: string; linkedQuotes: Array<CotCotizacion>}>(),
);*/

export const SET_ID_ARCHIVO_PDF = createAction(
  buildingStringActionType(typeApi, 'Set Archivo PDF'),
  props<{IdArchivo: string}>(),
);
export const VIEW_FILE_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'View file is loading'),
  props<{value: boolean}>(),
);
export const SET_INVOICE_ITEM_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set invoice item selected'),
  props<{item: string}>(),
);
export const FETCH_TYPE_AUTHORIZATION_DETAILS = createAction(
  buildingStringActionType(typeApi, 'Fetch Type Authorization Details'),
);
export const FETCH_TYPE_AUTHORIZATION_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Type Authorization Details Success'),
  props<{authorization: GMTipoAutorizacionUsuarioDetalle}>(),
);
export const FETCH_TYPE_AUTHORIZATION_DETAILS_ERROR = createAction(
  buildingStringActionType(typeApi, 'Fetch Type Authorization Details Error'),
);
export const GENERATE_AUTHORIZATION_CODE = createAction(
  buildingStringActionType(typeApi, 'Generate Authorization Code'),
);
export const OC_NOT_COVERED_SEND_EMAIL = createAction(
  buildingStringActionType(typeApi, 'OC Not Covered Send Email'),
  props<{dataEmail: IDataMail}>(),
);
export const OC_NOT_COVERED_SEND_EMAIL_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'OC Not Covered Send Email Success'),
);
export const OC_NOT_COVERED_SEND_EMAIL_ERROR = createAction(
  buildingStringActionType(typeApi, 'OC Not Covered Send Email Error'),
);
export const PPORDER_INCIDENT_SEND_EMAIL = createAction(
  buildingStringActionType(typeApi, 'PpOrder Incident Send Email'),
);
export const PPORDER_INCIDENT_SEND_EMAIL_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'PpOrder Incident Send Email Success'),
);
export const PPORDER_INCIDENT_SEND_EMAIL_ERROR = createAction(
  buildingStringActionType(typeApi, 'PpOrder Incident Send Email Error'),
);
export const SHOW_RECONFIGURE_FREIGHT_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Show Reconfigure Freight Pop Up'),
  props<{isOpen: boolean}>(),
);
export const RESET_ALL = createAction(buildingStringActionType(typeReducer, 'Reset all Pop Up'));
export const SELECT_DELIVERY_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Select Delivery Type'),
  props<{deliveryType: DropListOption}>(),
);
export const SET_GM_RECONFIGURE_FREIGHT_DATA = createAction(
  buildingStringActionType(typeReducer, 'Gm Reconfigure Freight Data'),
  props<{key: string; data: boolean | string}>(),
);
export const GM_RECONFIGURE_FREIGHT = createAction(
  buildingStringActionType(typeApi, 'Gm Reconfigure Freight'),
);
export const GM_RECONFIGURE_FREIGHT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Gm Reconfigure Freight Success'),
  props<{gMCotCotizacionDetalle: GMCotCotizacionDetalle}>(),
);
export const SET_DATA_IMAIL_TO_GM_PEDIDO_GENERAR_COTIZACION = createAction(
  buildingStringActionType(typeReducer, 'Set IDataMail to GMPPedidoGeneraCotizacion'),
  props<{iDataMail: IDataMail}>(),
);
export const GM_RECONFIGURE_FREIGHT_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Gm Reconfigure Freight Error'),
);
export const FETCH_GM_PEDIDO_GENERAR_COTIZACION = createAction(
  buildingStringActionType(typeReducer, 'Save GMPPedidoGeneraCotizacion Data'),
);
export const FETCH_GM_PEDIDO_GENERAR_COTIZACION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Success GMPPedidoGeneraCotizacion Data'),
);
export const FETCH_GM_PEDIDO_GENERAR_COTIZACION_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Success GMPPedidoGeneraCotizacion Data'),
);
export const GET_DELIVERY_ADDRESSES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Delivery Addresses Success'),
  props<{deliveryAddress: VDireccion[]}>(),
);
export const GET_DELIVERY_ADDRESSES_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get Delivery Addresses Failed'),
);
export const SET_SELECTED__DELIVERY_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Select Selected Delivery Address'),
  props<{address: VDireccion}>(),
);
export const SHOW_RECONFIGURE_FREIGHT_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Configure Freight Dialog'),
);
export const SHOW_SEND_EMAIL_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Send Email Dialog'),
  props<{isNotCovered?: boolean; isFromReconfigureFreights?: boolean}>(),
);
export const SHOW_REQUEST_AUTH_CODE = createAction(
  buildingStringActionType(typeReducer, 'Show Request Auth Code'),
);
export const SET_UPDATE_REFERENCE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set update reference load'),
  props<{reference: string}>(),
);
export const SET_UPDATE_REFERENCE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set update reference success'),
  props<{reference: string}>(),
);
