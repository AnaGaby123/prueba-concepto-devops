import {createAction, props} from '@ngrx/store';
import {
  IOrdersC,
  IPurchaseOrderDetails,
  IPurchaseOrderItem,
} from '@appModels/store/pendings/checkout/checkout-details/checkout-details.model';
import {
  GMTipoAutorizacionUsuarioDetalle,
  GMtpPartidascotPartidaCotizacionDetalle,
  TpClienteCSCreditoMorosoCorreo,
  VTramitarPedidoPartidaDetalle,
} from 'api-logistica';
import {
  CatMetodoDePagoCFDI,
  CatUsoCFDI,
  ContactoDetalleObj,
  DireccionClienteDetalle,
  SolicitudAutorizacionCambio,
} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IDataMail} from '@appModels/correo/correo';

import {FacturasPendientesClienteObj} from 'api-finanzas';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'CheckoutDetailsApi';
const typeReducer = 'CheckoutDetails';
export const showTeeDialogString = buildingStringActionType(typeReducer, 'Show Tee Dialog');

export const INIT_COMPONENT = createAction(buildingStringActionType(typeReducer, 'Init Component'));

export const DESTROY_COMPONENT = createAction(
  buildingStringActionType(typeReducer, 'Destroy component'),
);

export const CLEAN_ALL_CHECKOUT_DETAIL = createAction(
  buildingStringActionType(typeReducer, 'Clean All Checkout Detail'),
);
export const SET_RESUME_MODE = createAction(
  buildingStringActionType(typeReducer, 'Set Resume mode'),
  props<{resumeMode: boolean}>(),
);
export const SET_RESUME_COMPONENT = createAction(
  buildingStringActionType(typeReducer, 'Set Resume component'),
  props<{resumeComponent: boolean}>(),
);
export const SET_SEND_EMAIL_POP_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set Send email is open'),
  props<{sendEmailPopUpIsOpen: boolean}>(),
);
export const FETCH_PURCHASE_ORDERS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Pruchase Orders Load'),
);
export const FETCH_PURCHASE_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Pruchase Orders Success'),
  props<{orders: Array<IOrdersC>}>(),
);
export const FETCH_PURCHASE_ORDERS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Pruchase Orders Failed'),
);
export const FETCH_CLIENT_ADDRESSES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Client addresses Load'),
);
export const FETCH_CLIENT_ADDRESSES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Client addresses Success'),
  props<{addresses: Array<DireccionClienteDetalle>}>(),
);
export const FETCH_CLIENT_ADDRESSES_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Client addresses Failed'),
);
export const FETCH_CLIENT_CONTACTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Client contacts Load'),
);
export const FETCH_CLIENT_CONTACTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Client contacts Success'),
  props<{contacts: Array<ContactoDetalleObj>}>(),
);
export const FETCH_CLIENT_CONTACTS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Client contacts Failed'),
);
export const SET_BACKUP_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set Backup Purchase Order'),
);
export const RESTORE_BACKUP_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Restore Backup Purchase Order'),
  props<{purchaseId: string}>(),
);
export const SET_SELECTED_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Purchase Order'),
  props<{IdTPPedido: string}>(),
);
export const FETCH_PURCHASE_ORDER_ENTRIES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Data Success'),
  props<{purchaseOrderEntries: GMtpPartidascotPartidaCotizacionDetalle[]}>(),
);
export const FETCH_PURCHASE_ORDER_ENTRIES_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Data Failed'),
);
export const FETCH_PURCHASE_ORDER_ASIDES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Asides Success'),
  props<{purchaseOrderDetails: IPurchaseOrderDetails}>(),
);
export const FETCH_PURCHASE_ORDER_ASIDES_SUCCESS_ONLY_CODE = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Asides Only code Success'),
  props<{tpClienteCSCreditoMorosoCorreo: TpClienteCSCreditoMorosoCorreo}>(),
);
export const FETCH_PURCHASE_ORDER_ASIDES_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Asides Failed'),
);
export const SAVE_CHECKOUT_DATA_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save Checkout Data load'),
  props<{
    IdTPPedido?: string;
  }>(),
);
export const SAVE_CHECKOUT_DATA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save Checkout Data success'),
);
export const SAVE_CHECKOUT_DATA_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save Checkout Data failed'),
);
export const SAVE_ENTRY_POP_DATA_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save Entry Pop Data load'),
);
export const SAVE_ENTRY_POP_DATA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save Entry Pop success'),
);
export const SAVE_ENTRY_POP_DATA_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save Entry Pop failed'),
);
export const SAVE_ADDENDA_SANOFI_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save Addenda Sanofi load'),
);
export const SAVE_ADDENDA_SANOFI_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save Addenda Sanofi success'),
);
export const SAVE_ADDENDA_SANOFI_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save Addenda Sanofi failed'),
);
export const REFRESH_ENTRIES_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Refresh entries load'),
);
export const CHECKOUT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Checkout load'),
  props<{mailData: IDataMail}>(),
);

export const CHECKOUT_EMAIL_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Checkout email load'),
  props<{mailData: IDataMail}>(),
);

export const CHECKOUT_EMAIL_LOAD_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Checkout email load success'),
);
export const CHECKOUT_EMAIL_LOAD_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Checkout email load error'),
);

export const CHECKOUT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Checkout success'),
);
export const CHECKOUT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Checkout failed'),
);
export const GET_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Obtener código de autorización de ajustes load'),
);
export const GENERATE_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Solicitar código de autorización de ajustes load'),
);
export const GENERATE_VERIFICATION_CODE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Solicitar código de autorización de ajustes success'),
  props<{codeRequest: SolicitudAutorizacionCambio}>(),
);
export const GENERATE_VERIFICATION_CODE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Solicitar código de autorización de ajustes failed'),
);
export const COMPARE_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Comparar código de autorización de ajustes load'),
);
export const COMPARE_VERIFICATION_CODE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Comparar código de autorización de ajustes failed'),
);
export const SET_AUTHORIZED_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Marcar como válido el código de autorización de ajustes load'),
  props<{codeRequest: SolicitudAutorizacionCambio}>(),
);
export const SET_CODE_VALUE_BY_POSITION = createAction(
  buildingStringActionType(typeReducer, 'Guardar el digito del codigo de verificación'),
  props<{position: number; value: number}>(),
);
export const RESTORE_CODE_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Limpiar el código de verificación'),
);
export const SET_SHAKED = createAction(
  buildingStringActionType(typeReducer, 'Cambiar shaked'),
  props<{value: boolean}>(),
);
export const INVALIDATE_AUTHORIZED_CODE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Invalidar código después de realizar un cambio load'),
);
export const INVALIDATE_AUTHORIZED_CODE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Invalidar código después de realizar un cambio success'),
);
export const INVALIDATE_AUTHORIZED_CODE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Invalidar código después de realizar un cambio failed'),
);
export const GET_ENTRY_POP_INFO_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get entry pop info load'),
  props<{IdTPPartidaPedido: string}>(),
);
export const GET_ENTRY_POP_INFO_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get entry pop info success'),
  props<{vTramitarPedidoPartidaDetalle: VTramitarPedidoPartidaDetalle}>(),
);
export const GET_ENTRY_POP_INFO_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get entry pop info failed'),
);
// TODO: Manejar estado local
export const SET_CAT_DESTINO = createAction(
  buildingStringActionType(typeReducer, 'Set catDestino'),
  props<{catDestino: DropListOption}>(),
);

export const SET_CONTACT_DELIVERY = createAction(
  buildingStringActionType(typeReducer, 'Set Contact Delivery'),
  props<{contactDelivery: DropListOption}>(),
);
export const SET_CLIENT_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Set clientAddress'),
  props<{clientAddress: DropListOption}>(),
);
export const SET_TPPEDIDO_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set tpPedido value'),
  props<{value; field: string}>(),
);
// export const SET_TPPEDIDO_VALUE = createAction(
//   buildingStringActionType(typeReducer, 'Set tpPedido value'),
//   props<{option: IRadioButton}>(),
// );
export const ADD_CLIENT_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Add client contact'),
  props<{
    itemId: string;
  }>(),
);
export const DELETE_CLIENT_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Delete client contact'),
  props<{
    emailId: string;
  }>(),
);
export const SET_POP_ITEM_STRING_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set item pop string value'),
  props<{
    comments: string | number;
    node: string;
  }>(),
);
export const SET_POP_ITEM_SCHEDULED = createAction(
  buildingStringActionType(typeReducer, 'Set item pop scheduled'),
  props<{
    scheduled: boolean;
  }>(),
);
export const SET_POP_ITEM_ESTIMATED_FEE = createAction(
  buildingStringActionType(typeReducer, 'Set item pop estimated tee'),
  props<{
    dateString: string;
    date: Date;
  }>(),
);
export const SET_UNIDAD_MEDIDA_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set unidad medida value'),
  props<{
    selectedUnidadMedida: string;
  }>(),
);
export const SET_USAGE_OR_PAYMENT_METHOD = createAction(
  buildingStringActionType(typeReducer, 'Set usage or payment method'),
  props<{item: CatUsoCFDI | CatMetodoDePagoCFDI; node: string}>(),
);
export const SET_CODE_POP_PROCEDURE_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set code pop procedure type'),
  props<{
    procedureType: string;
  }>(),
);
export const UPDATE_CODE_REQUEST = createAction(
  buildingStringActionType(typeReducer, 'Update code request'),
);

export const FETCH_PENDING_INVOICES_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Pending Invoices Load'),
);
export const FETCH_PENDING_INVOICES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Pending Invoices Success'),
  props<{pendingInvoices: FacturasPendientesClienteObj}>(),
);
export const FETCH_PENDING_INVOICES_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Pending Invoices Error'),
  props<{error: any}>(),
);
export const LOAD_DATE_UNAVAILABLE = createAction(
  buildingStringActionType(typeReducer, 'Load Unavailable'),
);
// DOCS: Se comenta porque actualmente no se está usando el servicio de traer las cotizaciones vinculadas, descomentar en caso de ser necesario
/*export const SET_ITEM_LINKED = createAction(
  buildingStringActionType(typeReducer, 'Set item linked'),
  props<{item: IQuoteSummaryItem}>(),
);
export const UPDATE_ITEM_LIST = createAction(
  buildingStringActionType(typeReducer, 'Update item list'),
  props<{IdTPPartidaPedido: string; linkedQuotes: Array<CotCotizacion>}>(),
);*/
export const SET_ID_ARCHIVO_PDF = createAction(
  buildingStringActionType(typeApi, 'Set Archivo PDF'),
  props<{IdArchivo: string}>(),
);
export const VIEW_FILE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Update View File Load'),
  props<{IdArchivo: string; ext: string}>(),
);
export const VIEW_FILE_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'View file is loading'),
  props<{value: boolean}>(),
);
export const VIEW_FILE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Update View Success'),
  props<{fileBase64: string}>(),
);
export const VIEW_FILE_ERROR = createAction(buildingStringActionType(typeApi, 'Update View Error'));
export const SET_IS_PDF = createAction(
  buildingStringActionType(typeReducer, 'Set is PDF'),
  props<{value: boolean}>(),
);
export const DOWN_LOAD_FILE = createAction(
  buildingStringActionType(typeApi, 'Down load file'),
  props<{IdArchivo: string}>(),
);
export const SET_INVOICE_ITEM_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Set invoice item selected'),
  props<{item: string}>(),
);
export const CHECKOUT_AUTHORIZATION_CODE_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Checkout Authorization Code Effect'),
);
export const CHECKOUT_FETCH_TYPE_AUTHORIZATION_DETAILS = createAction(
  buildingStringActionType(typeApi, 'Checkout Fetch Type Authorization Details'),
);
export const CHECKOUT_FETCH_TYPE_AUTHORIZATION_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Checkout Fetch Type Authorization Details Success'),
  props<{authorization: GMTipoAutorizacionUsuarioDetalle}>(),
);
export const CHECKOUT_FETCH_TYPE_AUTHORIZATION_DETAILS_ERROR = createAction(
  buildingStringActionType(typeApi, 'Checkout Fetch Type Authorization Details Error'),
);
export const CHECKOUT_VALID_AUTHORIZATION_CODE = createAction(
  buildingStringActionType(typeReducer, 'Checkout Valid Authorization Code'),
);
export const SHOW_CHECKOUT_CODE_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Show Checkout Code Pop Up'),
  props<{isOpen: boolean}>(),
);
export const RESTORE_BACKUP_PURCHASE_ORDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Restore purchase order backup selected'),
  props<{
    backupPurchaseOrder: IPurchaseOrderItem;
  }>(),
);
export const CHANGE_VALUE_SANOFI = createAction(
  buildingStringActionType(typeReducer, 'Change value in  node sanofi'),
  props<{
    IdTPPartidaPedido: string;
    node: string;
    value: string | number;
  }>(),
);
export const OPEN_ADDENDA_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Open Addenda Pop up'),
  props<{
    isOpen: boolean;
  }>(),
);
export const SET_BACKUP_ADDENDA_INFO = createAction(
  buildingStringActionType(typeReducer, 'Set Back Up Info'),
);
export const RESTORE_BACKUP_TP_ADDENDA_INFO = createAction(
  buildingStringActionType(typeReducer, 'Restore tpPedido addenda info'),
);
export const UPDATE_TP_PEDIDO = createAction(
  buildingStringActionType(typeReducer, 'Update tpPedico about sanofi'),
  props<{
    node: string;
    value: string;
  }>(),
);
export const GET_NOT_WORKING_DAYS = createAction(
  buildingStringActionType(typeApi, 'Get Not Working Days'),
);
export const GET_NOT_WORKING_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Not Working Days Success'),
  props<{notWorkingDays: string[]}>(),
);
export const GET_NOT_WORKING_DAYS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get Not Working Days Error'),
);
export const SET_ENTRY_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Entry Selected'),
  props<{entry: IPurchaseOrderItem}>(),
);
export const SET_SANOFI_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set Sanofi Value'),
  props<{field: string; value: boolean | string}>(),
);
export const SAVE_SANOFI_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Save Sanofi Value'),
);
export const SHOW_SEND_EMAIL_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Send Email Dialog'),
);
export const SHOW_REQUEST_AUTHORIZATION_CODE_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Request Authorization Code Dialog'),
);
export const GENERATE_AUTHORIZATION_CODE = createAction(
  buildingStringActionType(typeReducer, 'Generate Authorization Code'),
);
export const SET_UPDATE_REFERENCE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set update reference load'),
  props<{reference: string}>(),
);
export const SET_UPDATE_REFERENCE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set update reference success'),
  props<{reference: string}>(),
);
export const DOWN_LOAD_EXISTENCE_LETTER = createAction(
  buildingStringActionType(typeReducer, 'Down load existence letter'),
);
export const SHOW_TEE_DIALOG = createAction(
  showTeeDialogString,
  props<{item: IPurchaseOrderItem; emit?: boolean}>(),
);
