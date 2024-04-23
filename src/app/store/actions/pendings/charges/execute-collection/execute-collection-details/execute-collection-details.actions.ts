import {createAction, props} from '@ngrx/store';
// Models
import {
  FacturasPendientesClienteObj,
  VFacturaClienteCalendario,
  VFacturaClienteCalendarioTotales,
} from 'api-finanzas';
import {ContactoDetalleObj} from 'api-logistica';
import {
  IExecuteCollectionPayment,
  IFccNotaCredito,
  IInvoice,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {Archivo, DatosBancarios, VCorreoCliente} from 'api-catalogos';
import {IFilterDate} from '@appModels/filters/Filters';
import {IFile, IUploadFileCustom} from '@appModels/files/files.models';
import {IRadioButton} from '@appModels/radio-button/radio-button.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Execute-Collection-Details';
const typeApi = 'Api Execute-Collection-Details';

export const FETCH_REQUEST_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Request Load'),
);
export const FETCH_REQUEST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Request Success'),
  props<{email: VCorreoCliente}>(),
);
export const FETCH_REQUEST_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Request Error'),
);
export const SET_SELECTED_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Client'),
  props<{selectedClient: VFacturaClienteCalendarioTotales}>(),
);
export const FETCH_PAYMENTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Payments Load'),
);
export const FETCH_PAYMENTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Payments Success'),
  props<{paymentList: Array<IExecuteCollectionPayment>}>(),
);
export const INITIAL_PAYMENT = createAction(
  buildingStringActionType(typeReducer, 'Initial Payment'),
  props<{selectedPayment: IExecuteCollectionPayment}>(),
);
export const INITIAL_WITHOUT_PAYMENT = createAction(
  buildingStringActionType(typeReducer, 'Initial Without Payment'),
  props<{fccFolioPagoCliente: IExecuteCollectionPayment}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search term'),
  props<{searchTerm: string}>(),
);
export const SET_SELECTED_PAYMENT_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Payment Search term'),
  props<{searchTerm: string}>(),
);
export const SET_SELECTED_BURGER_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Burger Option'),
  props<{burgerOptionSelected: DropListOption}>(),
);
export const SET_SELECTED_DROP_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Drop Option'),
  props<{node: string; selectedOption: DropListOption}>(),
);
export const SET_PAYMENTS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Payment Status'),
  props<{paymentStatus: number}>(),
);
export const SET_ITEMS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Items Status'),
  props<{itemsStatus: number}>(),
);
export const FETCH_ITEMS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Items of Payment Load'),
);
export const FETCH_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items of Payment Success'),
  props<{itemsList?: Array<VFacturaClienteCalendario>}>(),
);
export const FETCH_PAYMENT_BARS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Payment Bars Load'),
);
export const FETCH_PAYMENT_BARS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Payment Bars Success'),
  props<{barsData: FacturasPendientesClienteObj}>(),
);
export const FETCH_PAYMENT_BARS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Payment Bars Failed'),
);
export const SET_SELECTED_PAYMENT = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Payment'),
  props<{paymentId: string}>(),
);
export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all details state'),
);
export const FETCH_DATA_TABS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Data Tabs Load'),
);
export const FETCH_DATA_TABS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Data Tabs Success'),
  props<{tabs: any}>(),
);
export const FETCH_DATA_TABS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Data Tabs Error'),
  props<{error: any}>(),
);
export const FETCH_CLIENT_CONTACT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Client Contact Load'),
);
export const FETCH_CLIENT_CONTACT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Client Contact Success'),
  props<{clientContact: ContactoDetalleObj}>(),
);
export const FETCH_CLIENT_CONTACT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Client Contact Failed'),
);
export const FETCH_LIST_INVOICE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Invoice Load'),
);
export const FETCH_LIST_INVOICE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Invoice Success'),
  props<{itemsList: Array<IInvoice>}>(),
);
export const FETCH_LIST_INVOICE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Invoice Failed'),
);
export const SET_OPTION_TAB = createAction(
  buildingStringActionType(typeReducer, 'Set Option Tab'),
  props<{tab: ITabOption}>(),
);
export const SET_SELECTED_BILL = createAction(
  buildingStringActionType(typeReducer, 'Selected or Unselected Bill'),
  props<{bill: IInvoice}>(),
);
export const FETCH_FILES_MAIL_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Files Load'),
);
export const FETCH_FILES_MAIL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Files Success'),
  props<{file: Archivo}>(),
);
export const VIEW_FILE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Visualizar archivo'),
  props<{IdArchivo: string; ext: string}>(),
);
export const SET_OPEN_VIEW_FILE = createAction(
  buildingStringActionType(typeReducer, 'Actualizar visualización'),
  props<{active: boolean}>(),
);
export const VIEW_FILE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Update View Success'),
  props<{fileBase64: string}>(),
);
export const VIEW_FILE_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Update View Error'),
  props<{error: any}>(),
);
export const FETCH_CREDIT_NOTES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Credit Notes Success'),
  props<{creditNotes: Array<IFccNotaCredito>}>(),
);
export const CLEAN_PAYMENT_TRANSACTION = createAction(
  buildingStringActionType(typeReducer, 'Clean Payment Transaction'),
);
export const SET_INITIAL_PAYMENT_TRANSACTION_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set Initial Payment Transaction Data'),
);
export const FETCH_BANK_DATA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Bank Data Success'),
  props<{bankData: Array<DatosBancarios>}>(),
);
export const SET_FIELD_VALUE_PAYMENT_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set field value payment data'),
  props<{field: string; value: string | Date}>(),
);
export const SET_DROP_LIST_OPTION_PAYMENT_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set drop list option payment data'),
  props<{field: string; value: DropListOption}>(),
);
export const SET_CHECK_BOX_VALUE_PAYMENT_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set checkbox value payment data'),
  props<{field: string; value: boolean}>(),
);
export const SET_CREDIT_NOTE_CHECK_BOX_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set credit note checkbox value'),
  props<{creditNodeId: string}>(),
);
export const SET_FILTER_RANGE_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set Range Filter Date'),
  props<{rangeDate: IFilterDate; param: string}>(),
);
export const ADD_FILE = createAction(
  buildingStringActionType(typeReducer, 'Add file'),
  props<{file: IUploadFileCustom}>(),
);
export const DELETE_FILE = createAction(
  buildingStringActionType(typeReducer, 'Delete file'),
  props<{name: string}>(),
);
export const DELETE_SELECTED_BILL = createAction(
  buildingStringActionType(typeReducer, 'Set selected bill'),
  props<{billId: string}>(),
);
export const SET_SELECTED_BILLS = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Bills'),
);
export const UPDATE_AMOUNT_TO_PAY_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Update Amount to Pay Item'),
  props<{bill: IInvoice}>(),
);
export const SET_INPUT_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set input is visible'),
  props<{billId: string}>(),
);
export const SET_INVOICE_CURRENCY = createAction(
  buildingStringActionType(typeReducer, 'Set Invoice Currency'),
  props<{node: string; billId: string}>(),
);
export const SET_INPUT_IS_CLOSE = createAction(
  buildingStringActionType(typeReducer, 'Set input is invisible'),
);
export const MANAGE_PAYMENT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Manage Payment Load'),
);
export const MANAGE_PAYMENT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Manage Payment Failed'),
);
export const MANAGE_PAYMENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Manage Payment Success'),
);
export const CALCULATE_PAYMENT_CURRENCIES = createAction(
  buildingStringActionType(typeReducer, 'Calculate payment currencies'),
);

// Acciones en Rebill

export const SET_RADIO_BUTTON_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set radio button selected'),
  props<{radioButton: IRadioButton}>(),
);
export const SET_REASON_CANCEL_INVOICE = createAction(
  buildingStringActionType(typeReducer, 'Set reason cancel invoice'),
  props<{reason: DropListOption}>(),
);
export const SET_REASON_REBILL = createAction(
  buildingStringActionType(typeReducer, 'Set reason rebill'),
  props<{reason: DropListOption}>(),
);
export const SET_CHECK_BOX = createAction(buildingStringActionType(typeReducer, 'Set Check Box'));
export const SET_IS_IN_ITEMS_VIEW = createAction(
  buildingStringActionType(typeReducer, 'Set is in items view'),
  props<{value: boolean}>(),
);
export const SET_CFDI = createAction(
  buildingStringActionType(typeReducer, 'Set CFDI'),
  props<{item: DropListOption}>(),
);
export const CLEAN_ALL_REBILL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all rebill state'),
);
export const SET_FILE_INVOICE = createAction(
  buildingStringActionType(typeReducer, 'Set file invoice'),
  props<{file: IFile}>(),
);
