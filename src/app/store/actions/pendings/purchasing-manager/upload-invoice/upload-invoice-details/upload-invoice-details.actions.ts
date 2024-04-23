import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProviderUpload} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list.models';
import {
  IFileUpload,
  IPurchaseItemUploadInvoice,
  IPurchaseOrderOc,
  IPurchaseOrdersOc,
} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-details/upload-invoice-details.models';
import {CalcularMontosImportacion, VOcOrdenDeCompra} from 'api-logistica';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Upload-Invoice-Details';

export const FETCH_PURCHASE_ORDERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Orders Load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_PURCHASE_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Orders Success'),
  props<{purchaseOrder: IPurchaseOrdersOc}>(),
);
export const FETCH_SELECTED_PURCHASE_ORDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Selected Purchase Order Load'),
  props<{IdOcOrdenDeCompra: string}>(),
);
export const FETCH_SELECTED_PURCHASE_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Selected Purchase Order Success'),
  props<{purchaseOrder: VOcOrdenDeCompra}>(),
);
export const SET_OPTION_SORT = createAction(
  buildingStringActionType(typeReducer, 'Set Sort By Purchase Orders'),
  props<{sort: DropListOption}>(),
);

export const SET_TERM_SEARCH = createAction(
  buildingStringActionType(typeReducer, 'Set Term Search By Purchase Orders'),
  props<{searchTerm: string}>(),
);

export const SET_CURRENT_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set CURRENT PROVIDER'),
  props<{provider: IProviderUpload}>(),
);
export const UPLOAD_INVOICE_FILES_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Upload invoice files load'),
);
export const UPLOAD_INVOICE_FILES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Upload invoice files success'),
  props<{fileData: Array<IFileUpload>}>(),
);
export const UPLOAD_INVOICE_FILES_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Upload invoice files failed'),
);
export const FETCH_MORE_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Orders More Load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_ITEMS_PURCHASE_ORDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items Of OC Load'),
  props<{oc: IPurchaseOrderOc}>(),
);
export const FETCH_ITEMS_PURCHASE_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items Of OC Success'),
  props<{items: Array<IPurchaseItemUploadInvoice>}>(),
);
export const SET_ITEM_INVOICE = createAction(
  buildingStringActionType(typeReducer, 'Set item invoice'),
  props<{item: IPurchaseItemUploadInvoice}>(),
);
export const DELETE_ITEM_INVOICE = createAction(
  buildingStringActionType(typeReducer, 'Delete item of Invoice'),
  props<{item: IPurchaseItemUploadInvoice}>(),
);
export const SELECTED_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Selected Purchase Order'),
  props<{order: IPurchaseOrderOc}>(),
);
export const SET_STATUS_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Set status pop up'),
  props<{active: boolean}>(),
);
export const SET_PARAM_INVOICE = createAction(
  buildingStringActionType(typeReducer, 'Set Param Of Invoice'),
  props<{value: string | number | File | Date; param: string}>(),
);
export const SET_CALCULATED_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set Calculated Data'),
  props<{amounts: CalcularMontosImportacion}>(),
);
export const GENERATE_INVOICE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Generate Inovice Load'),
);
export const GENERATE_INVOICE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Generate Inovice Success'),
);
export const SET_STATUS_API_ORDERS = createAction(
  buildingStringActionType(typeReducer, 'Set Status Api Orders'),
  props<{status: number}>(),
);

export const MODIFIED_PRICE_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Update Price of Item'),
  props<{item: IPurchaseItemUploadInvoice}>(),
);
export const MODIFIED_PRICE_ITEM_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Update Price of Item Success'),
  props<{item: IPurchaseItemUploadInvoice}>(),
);

export const CLEAN_INVOICE_LOCAL_DATA = createAction(
  buildingStringActionType(typeReducer, 'Clean invoice local data'),
);
export const CLEAN_INPUTS_FILES = createAction(
  buildingStringActionType(typeReducer, 'Clean inputs files'),
);
export const PROVIDER_IS_NATIONAL = createAction(
  buildingStringActionType(typeReducer, 'Provider is National'),
  props<{isNational: boolean}>(),
);

export const SET_SELECTED_CONTACT_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Contact Provider'),
  props<{contactSelected: DropListOption}>(),
);

export const SET_PROVIDER_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set Provider Contacts'),
  props<{contacts: Array<ContactoDetalleProvObj>}>(),
);
