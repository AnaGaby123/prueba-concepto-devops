import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICustomerResults} from '@appModels/store/pendings/order-modification/order-modification-list/order-modification-list.model';
import {
  IFileUpload,
  IFreightProvider,
  IOrdersC,
  IPurchaseOrderDetails,
  IPurchaseOrderItem,
} from '@appModels/store/pendings/order-modification/order-modification-details/order-modification-details.models';
import {
  CotCotizacion,
  TpClienteCSCreditoMorosoCorreo,
  VClienteModificacionPedido,
  VTramitarPedido,
} from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import {
  ArchivoDetalle,
  CatMetodoDePagoCFDI,
  CatUsoCFDI,
  Flete,
  Proveedor,
  SolicitudAutorizacionCambio,
} from 'api-catalogos';
import {IFlete} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';
import {IPurchaseOrderItemSelected} from '@appComponents/pendings/order-modification/order-modification-details/order-modification-details.component';
import {IQuoteSummaryItem} from '@appModels/store/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Order-Modification-List';
const typeApi = 'Api-Order-Modification-List';

export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all details state'),
);
export const SET_OPTION_DESTINY = createAction(
  buildingStringActionType(typeReducer, 'Set Option Destiny'),
  props<{option: DropListOption}>(),
);
export const SET_OPTION_PROCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Option Process'),
  props<{option: DropListOption}>(),
);
export const SET_FILTER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Filter Selected'),
  props<{filter: DropListOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set search term'),
  props<{searchTerm: string}>(),
);
export const CUSTOMER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Initial view details'),
  props<{customer: ICustomerResults}>(),
);
export const FETCH_ORDERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Orders Load'),
);
export const FETCH_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Orders Success'),
  props<{list: Array<IOrdersC>; listStatus: number}>(),
);
export const FETCH_ORDERS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Orders Failed'),
);
export const SET_ORDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Order Selected'),
  props<{IdTPPedido: string}>(),
);
export const GET_ORDER_SELECTED_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Order Selected'),
  props<{order: VTramitarPedido}>(),
);
export const GET_CLIENT_SELECTED_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Client Selected'),
  props<{client: VClienteModificacionPedido}>(),
);
export const SET_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Set BackUp Order Selected'),
);
export const SET_ITEM_IS_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Item Is Selected'),
  props<{isSelected: boolean; item: IPurchaseOrderItem}>(),
);
export const SET_ITEM_ALLOW_ADD_FILES = createAction(
  buildingStringActionType(typeReducer, 'Set Item Allow Add Files'),
  props<{allowAddFiles: boolean}>(),
);
export const SET_CODE_POP_PROCEDURE_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set code pop procedure type'),
  props<{
    procedureType: string;
  }>(),
);
export const SET_CODE_VALUE_BY_POSITION = createAction(
  buildingStringActionType(typeReducer, 'Guardar el digito del codigo de verificación'),
  props<{position: number; value: number}>(),
);
export const RESTORE_CODE_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Limpiar el código de verificación'),
);
export const SET_FIRST_CODE_PASSED = createAction(
  buildingStringActionType(typeReducer, 'First code passed'),
  props<{firstCodePassed: boolean}>(),
);
export const SET_SHAKED = createAction(
  buildingStringActionType(typeReducer, 'Cambiar shaked'),
  props<{value: boolean}>(),
);
export const GENERATE_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Solicitar código de autorización de ajustes load'),
  props<{IdTPPartidaPedido?: string}>(),
);
export const GENERATE_VERIFICATION_CODE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Solicitar código de autorización de ajustes success'),
  props<{codeRequest: SolicitudAutorizacionCambio}>(),
);
export const GENERATE_VERIFICATION_CODE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Solicitar código de autorización de ajustes failed'),
);
export const FETCH_PURCHASE_ORDER_ASIDES_SUCCESS_ONLY_CODE = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Asides Only code Success'),
  props<{tpClienteCSCreditoMorosoCorreo: TpClienteCSCreditoMorosoCorreo}>(),
);
export const COMPARE_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Comparar código de autorización de ajustes load'),
  props<{twoCodes: boolean}>(),
);
export const COMPARE_VERIFICATION_CODE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Comparar código de autorización de ajustes failed'),
);
export const SET_AUTHORIZED_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Marcar como válido el código de autorización de ajustes load'),
  props<{codeRequest: SolicitudAutorizacionCambio}>(),
);

export const DELETE_ITEM_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Delete item of Order Load'),
  props<{item: IPurchaseOrderItem}>(),
);
export const DELETE_ITEM_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Delete item of Order Success'),
);
export const DELETE_ITEM_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Delete item of Order Failed'),
);
export const SEGMENT_ORDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Segment Order Load'),
);
export const SEGMENT_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Segment Order Success'),
);
export const UPDATE_ITEM_LOAD = createAction(
  buildingStringActionType(typeApi, 'Update item of Order Load'),
  props<{item: IPurchaseOrderItemSelected}>(),
);
export const UPDATE_ITEM_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Update item of Order Success'),
);
export const DELETE_ORDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Delete Order Load'),
);
export const DELETE_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Delete Order Success'),
);
export const SAVE_ORDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save Order Load'),
);
export const SAVE_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save Order Success'),
);
export const FETCH_PURCHASE_ORDER_ASIDES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Asides Success'),
  props<{purchaseOrderDetails: IPurchaseOrderDetails}>(),
);
export const FETCH_PURCHASE_ORDER_ASIDES_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Asides Failed'),
);
export const FETCH_PURCHASE_ORDER_ENTRIES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Data Success'),
  props<{
    purchaseOrderEntries: Array<IPurchaseOrderItem>;
  }>(),
);
export const FETCH_PURCHASE_ORDER_ENTRIES_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Data Failed'),
);
export const SET_CLIENT_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Set clientAddress'),
  props<{clientAddress: DropListOption}>(),
);
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
export const SET_TPPEDIDO_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set tpPedido value'),
  props<{value; field: string}>(),
);
export const FETCH_CLIENT_ADDRESSES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Client addresses Load'),
);
export const FETCH_CLIENT_ADDRESSES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Client addresses Success'),
  props<{addresses: Array<apiCatalogs.DireccionClienteDetalle>}>(),
);
export const FETCH_CLIENT_ADDRESSES_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Client addresses Failed'),
);
export const FETCH_CLIENT_CONTACTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Client contacts Load'),
);
export const FETCH_CLIENT_CONTACTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Client contacts Success'),
  props<{contacts: Array<apiCatalogs.ContactoDetalleObj>}>(),
);
export const FETCH_CLIENT_CONTACTS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Client contacts Failed'),
);
export const SET_USAGE_OR_PAYMENT_METHOD = createAction(
  buildingStringActionType(typeReducer, 'Set usage or payment method'),
  props<{item: CatUsoCFDI | CatMetodoDePagoCFDI; node: string}>(),
);

export const GET_CAT_FREIGHT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Freight Load'),
);
export const GET_CAT_FREIGHT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Freight Success'),
  props<{list: Array<Flete>}>(),
);
export const GET_CAT_FREIGHT_EXPRESS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Freight Express Load'),
);
export const GET_CAT_FREIGHT_EXPRESS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Freight Express Success'),
  props<{list: Array<Proveedor>}>(),
);

export const SET_ENTRIES_API_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set entries api status'),
  props<{listStatus: number}>(),
);
export const SET_ASIDES_API_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set asides api status'),
  props<{apiStatus: number}>(),
);
export const SET_OPTION_FREIGHT_CONVENTIONAL = createAction(
  buildingStringActionType(typeReducer, 'Set Option Freight Conventional'),
  props<{item: IFlete}>(),
);
export const SET_BACKUP_FREIGHT = createAction(
  buildingStringActionType(typeReducer, 'Set BackUp Freight'),
);
export const RESTORE_BACKUP_FREIGHT = createAction(
  buildingStringActionType(typeReducer, 'Restore Backup Freight'),
);
export const SET_ITEMIZED_FREIGHT = createAction(
  buildingStringActionType(typeReducer, 'Set Itemized Freight'),
);
export const SET_COMMENT_FREIGHT = createAction(
  buildingStringActionType(typeReducer, 'Set Comment Freight'),
  props<{comment: string}>(),
);
export const FINAL_SETUP_FREIGHT = createAction(
  buildingStringActionType(typeReducer, 'Final Set Up Freight'),
);

export const FINAL_SETUP_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Final Set Up Freight Success'),
);
export const FINAL_SETUP_FREIGHT_EXPRESS = createAction(
  buildingStringActionType(typeReducer, 'Final Set Up Freight Express'),
);
export const FINAL_SETUP_FREIGHT_EXPRESS_DELETE = createAction(
  buildingStringActionType(typeReducer, 'Final Set Up Freight Express Delete'),
);
export const ADD_FREIGHT_EXPRESS = createAction(
  buildingStringActionType(typeReducer, 'Add Freight Express'),
  props<{freight: IFreightProvider}>(),
);
export const DELETE_FREIGHT_EXPRESS = createAction(
  buildingStringActionType(typeReducer, 'Delete Freight Express'),
  props<{freight: IFreightProvider}>(),
);

export const SAVE_ADDITIONAL_FILE = createAction(
  buildingStringActionType(typeReducer, 'Save additional file'),
  props<{file: File}>(),
);
export const REMOVE_ADDITIONAL_FILE = createAction(
  buildingStringActionType(typeReducer, 'Remove additional file'),
  props<{name: string}>(),
);
export const SAVE_OC_FILE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save oc file load'),
);
export const SAVE_OC_FILE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save oc file success'),
  props<{fileDetail: ArchivoDetalle}>(),
);
export const SAVE_OC_FILE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save oc file failed'),
);
export const SAVE_ADDITIONAL_FILES_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save additional files load'),
);
export const SAVE_ADDITIONAL_FILES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save additional files success'),
  props<{files: Array<any>}>(),
);
export const SAVE_ADDITIONAL_FILES_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save additional files failed'),
);
export const SAVE_OC_FILE = createAction(
  buildingStringActionType(typeReducer, 'Save oc file'),
  props<{file: File}>(),
);
export const REMOVE_OC_FILE = createAction(buildingStringActionType(typeReducer, 'Remove oc file'));
export const SET_NOTES = createAction(
  buildingStringActionType(typeReducer, 'Set notes'),
  props<{notes: string}>(),
);
export const SET_REFERENCE = createAction(
  buildingStringActionType(typeReducer, 'Set reference'),
  props<{reference: string}>(),
);
export const SET_STATUS_OPEN_FREIGHT = createAction(
  buildingStringActionType(typeReducer, 'Set Status Pop Freight'),
  props<{active: boolean}>(),
);
export const SET_ORDER_UPDATED = createAction(
  buildingStringActionType(typeReducer, 'Set Order Updated'),
  props<{fileData: IFileUpload}>(),
);
export const HANDLE_POP_UP_NOTES = createAction(
  buildingStringActionType(typeReducer, 'Handle Pop Up Notes'),
  props<{popUpNotesIsOpen: boolean}>(),
);
export const SET_NOTES_AND_PROCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Notes and Process'),
  props<{
    NotasModificacion: string;
    IdCatProceso: string;
    IdTPPartidaPedido: string;
  }>(),
);
export const SET_ITEM_LINKED = createAction(
  buildingStringActionType(typeReducer, 'Set item linked'),
  props<{item: IQuoteSummaryItem}>(),
);
export const UPDATE_ITEM_LIST = createAction(
  buildingStringActionType(typeReducer, 'Update item list'),
  props<{IdTPPartidaPedido: string; linkedQuotes: Array<CotCotizacion>}>(),
);
export const SET_OPEN_VIEW_FILE = createAction(
  buildingStringActionType(typeApi, 'Actualizar visualización'),
  props<{active: boolean}>(),
);
export const SET_ID_ARCHIVO_PDF = createAction(
  buildingStringActionType(typeApi, 'Set Archivo PDF'),
  props<{IdArchivo: string}>(),
);
export const VIEW_FILE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Update View File Load'),
  props<{IdArchivo: string; ext: string}>(),
);
export const VIEW_FILE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Update View Success'),
  props<{fileBase64: string}>(),
);
export const VIEW_FILE_ERROR = createAction(buildingStringActionType(typeApi, 'Update View Error'));
export const VIEW_FILE_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'View file is loading'),
  props<{value: boolean}>(),
);
export const SET_INVOICE_ITEM_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set invoice item selected'),
  props<{item: string}>(),
);
