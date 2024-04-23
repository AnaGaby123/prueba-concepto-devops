import {createAction, props} from '@ngrx/store';
/*Models Imports*/
import {ICustomerAttend} from '@appModels/store/pendings/charges/attend-review/attend-review-list/attend-review-list.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IBills,
  IProgrammingReview,
} from '@appModels/store/pendings/charges/attend-review/attend-review-details/attend-review-details.models';
import {ContactoDetalleObj, DatosFacturacionClienteDetalle} from 'api-logistica';
import {DireccionClienteDetalle} from 'api-catalogos';
import {IFile, IUploadFileCustom} from '@appModels/files/files.models';
import {IRadioButton} from '@appModels/radio-button/radio-button.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'AttendReviewDetails';

export const SET_SELECTED_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Client'),
  props<{selectedClient: ICustomerAttend}>(),
);
export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all details state'),
);
export const FETCH_INVOICES_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Invoices Load'),
);
export const FETCH_INVOICES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Invoices Success'),
  props<{bills: Array<IBills>}>(),
);
export const FETCH_INVOICES_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Invoices Error'),
  props<{error: any}>(),
);
export const SET_OPTION_FILTER = createAction(
  buildingStringActionType(typeReducer, 'Set Option Filter'),
  props<{option: DropListOption}>(),
);
export const SET_SELECTED_BILL = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Bill'),
  props<{bill: IBills}>(),
);
export const SET_TERM_SEARCH = createAction(
  buildingStringActionType(typeReducer, 'Set term search'),
  props<{searchTerm: string}>(),
);
export const SET_REQUEST_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Request Status'),
  props<{status: number}>(),
);
export const FETCH_CONTACT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Contact Load'),
);
export const FETCH_CONTACT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Contact Success'),
  props<{contact: ContactoDetalleObj}>(),
);
export const FETCH_CONTACT_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Contact Error'),
  props<{error: any}>(),
);
export const FETCH_ADDRESS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Address Load'),
);
export const FETCH_ADDRESS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Address Success'),
  props<{address: DireccionClienteDetalle}>(),
);
export const FETCH_ADDRESS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Address Error'),
  props<{error: any}>(),
);
export const SAVE_SCHEDULE_REVIEW_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save Schedule Review Load'),
);
export const SAVE_SCHEDULE_REVIEW_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save Schedule Review Success'),
);
export const SAVE_SCHEDULE_REVIEW_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Save Schedule Review Error'),
  props<{error: any}>(),
);
export const FETCH_BILLS_CLIENT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Bills of Client Load'),
);
export const FETCH_BILLS_CLIENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Bills of Client Success'),
  props<{billsOfClient: DatosFacturacionClienteDetalle}>(),
);
export const FETCH_BILLS_CLIENT_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Bills of Client Error'),
  props<{error: any}>(),
);
export const SET_PRIORITY = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Priority'),
  props<{priority: DropListOption}>(),
);
export const SET_REVIEW_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set Review Date'),
  props<{date: string; dateFormat: Date}>(),
);
export const SET_COMMENT = createAction(
  buildingStringActionType(typeReducer, 'Set additional comment'),
  props<{comment: string}>(),
);
export const ADD_FILE = createAction(
  buildingStringActionType(typeReducer, 'Add file'),
  props<{file: IUploadFileCustom}>(),
);
export const DELETE_FILE = createAction(
  buildingStringActionType(typeReducer, 'Delete file'),
  props<{name: string}>(),
);
export const SAVE_FILES_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save Files Load'),
  props<{IdFCCRevisionProgramadaArchivo: string}>(),
);
export const FETCH_DATA_REVIEW_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Data Review Load'),
);
export const FETCH_DATA_REVIEW_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Data Review Success'),
  props<{dataReview: IProgrammingReview}>(),
);
export const FETCH_DATA_REVIEW_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Data Review Error'),
  props<{error: any}>(),
);
export const CREATE_BILL_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Create PDF Bill Load'),
);
export const CREATE_BILL_LOAD_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Create PDF Bill Success'),
);
export const GET_URL_PROFORMA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Recuperar URL Proforma Success'),
);
export const CHECK_GENERATE_PROFORMA_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Check Genereate Proforma Status'),
  props<{idFile: string}>(),
);
export const GET_PROFORMA_FILE_DETAIL = createAction(
  buildingStringActionType(typeReducer, 'Get Proforma File Details'),
  props<{idFile: string}>(),
);
export const SET_URL_PROFORMA = createAction(
  buildingStringActionType(typeReducer, 'Guardar URL PDF'),
  props<{url: string}>(),
);
export const SET_REQUEST_STATUS_FILE = createAction(
  buildingStringActionType(typeReducer, 'Request Status Generate to PDF'),
  props<{status: number}>(),
);
export const GET_PROCESO_SISTEMA_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Proceso Sistema Load'),
  props<{IdProcesoSistema: string}>(),
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
