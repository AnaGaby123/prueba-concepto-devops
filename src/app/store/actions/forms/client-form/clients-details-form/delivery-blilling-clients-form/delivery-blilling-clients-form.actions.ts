// Core imports
import {createAction, props} from '@ngrx/store';

// Models
import {
  CorreoValidacionFacturacionCliente,
  RestriccionTemporalDatosFacturacion,
  ResultadoValidarCodigoPostal,
} from 'api-catalogos';
import {ITopicComments} from '@appModels/store/forms/clients-form/clients-details-form/delivery-billing/delivery-billing-client-form.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

// Utils
import {buildingStringActionType} from '@appUtil/strings';
import {typeApi} from '@appActions/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.actions';

const typeReducer = '[Reducer] - Cat Clients - Delivery Billing';

export const SET_SUCCESS_DELIVERY_BILLING_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set Success Client Delivery Billing'),
  props<{payload; typeAddress}>(),
);
export const SET_FAILED_DELIVERY_BILLING_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set Failed Client Delivery Billing'),
);
export const SET_DATA_BILLING = createAction(
  buildingStringActionType(typeReducer, 'Set Data Billing'),
  props<{payload; node}>(),
);
export const SET_DATA_BILLING_DROPLIST = createAction(
  buildingStringActionType(typeReducer, 'Set Data Billing DropList'),
  props<{payload; node; selectedNode}>(),
);
export const SET_CFDI_VALIDATION = createAction(
  buildingStringActionType(typeReducer, 'Set CFDI Validation'),
  props<{value; node}>(),
);
export const SET_DATA_RESTRICTION = createAction(
  buildingStringActionType(typeReducer, 'Set Data Restrction'),
  props<{payload; node}>(),
);
export const SET_RESTRICTION_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Restriction Type'),
  props<{value; node}>(),
);
export const SET_THEME_COMMENT = createAction(
  buildingStringActionType(typeReducer, 'Set Comment Type'),
  props<{value}>(),
);
export const GET_EMAIL_FACTURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Facturation Address Success'),
  props<{payload}>(),
);
export const GET_EMAIL_FACTURATION_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set Facturation Address Failed'),
);
export const SET_DISABLE_COMMENT = createAction(
  buildingStringActionType(typeReducer, 'Set Disable Comment Billing'),
  props<{payload: ITopicComments}>(),
);
export const SET_DISABLE_EMAIL = createAction(
  buildingStringActionType(typeReducer, 'Set Disable Email Billing'),
  props<{payload: CorreoValidacionFacturacionCliente}>(),
);
export const SET_DISABLE_EVENT = createAction(
  buildingStringActionType(typeReducer, 'Set Disable Event Billing'),
  props<{payload: RestriccionTemporalDatosFacturacion}>(),
);
export const SET_TEXT_COMMENT = createAction(
  buildingStringActionType(typeReducer, 'Set Text Comment'),
  props<{value}>(),
);
export const SET_EMAIL_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Set Email Address'),
  props<{value}>(),
);
export const SET_ADD_COMMENT = createAction(
  buildingStringActionType(typeReducer, 'Set Add Commment'),
);
export const SET_INITIAL_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set Initial Data'),
);
export const SET_ADD_EMAIL = createAction(buildingStringActionType(typeReducer, 'Set Add Email'));
export const SET_ADD_EVENT = createAction(buildingStringActionType(typeReducer, 'Set Add Event'));
export const SET_TYPE_CHANGE = createAction(
  buildingStringActionType(typeReducer, 'Set Type Change'),
  props<{payload: DropListOption}>(),
);
export const SET_RESTRICTION_DATE_START = createAction(
  buildingStringActionType(typeReducer, 'Set Restriction Date Start'),
  props<{value}>(),
);
export const SET_RESTRICTION_DATE_END = createAction(
  buildingStringActionType(typeReducer, 'Set Restriction Date End'),
  props<{value}>(),
);
export const SET_TITLE_RESTRICTION = createAction(
  buildingStringActionType(typeReducer, 'Set Restriction Title '),
  props<{value}>(),
);

export const SET_DIRECTION_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set Direction Data'),
  props<{payload; node}>(),
);
export const SET_DIRECTION_DATA_DROP = createAction(
  buildingStringActionType(typeReducer, 'Set Direction Data Drop'),
  props<{payload; node; nodeSelected}>(),
);
export const VALIDATE_ZIP_CODE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Validate zip code direction load'),
);
export const VALIDATE_ZIP_CODE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Validate zip code direction success'),
  props<{value: boolean}>(),
);
export const CHECK_ZIP_CODE_INFO_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Check zip code info load'),
);
export const SET_CHECK_RFC_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set Check rfc Valid'),
);
export const SET_RFC_VALIDATION = createAction(
  buildingStringActionType(typeReducer, 'Set rfc Validation'),
  props<{value: boolean}>(),
);
export const CHECK_ZIP_CODE_INFO_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Check zip code info success'),
  props<{zipCodeInfo: ResultadoValidarCodigoPostal}>(),
);
export const SET_OPEN_ADDRESS_MODAL = createAction(
  buildingStringActionType(typeReducer, 'Set open address modal'),
  props<{value: boolean}>(),
);
export const SET_ADDRESS_MODAL_TITLE = createAction(
  buildingStringActionType(typeReducer, 'Set address modal title'),
  props<{value: string}>(),
);
export const SET_SAVE_BILLING_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set Save Billing Load'),
);
export const SET_SAVE_BILLING_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Save Billing Success'),
);
export const SET_SAVE_BILLING_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Save Billing Failed'),
);
export const SAVE_RESTRICCION_ENTREGA_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set Restriction Delivery Load'),
);
export const SAVE_RESTRICCION_ENTREGA_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set Restriction Delivery Error'),
);
export const SAVE_DISABLE_RESTRICTION_FACTURATION = createAction(
  buildingStringActionType(typeReducer, 'Set Save Disable Restriction Facturation '),
);
export const SAVE_DISABLE_COMENTARIO_FACTURACION_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set Save Disable Restriction Facturation Failed'),
);
export const SAVE_RESTRICCION_MENSUAL_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set Save Monthly Facturation Load '),
);
export const SAVE_RESTRICCION_MENSUAL_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set Save Monthly Facturation Failed '),
);

export const SAVE_COMENTARIO_FACTURACION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set Save Comment Facturation Load '),
);
export const SAVE_COMENTARIO_FACTURACION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Save Comment Facturation Failed '),
);
export const SAVE_COMENTARIO_DISABLE_FACTURACION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set Save Comment Disable Facturation Load '),
);
export const SAVE_COMENTARIO_DISABLE_FACTURACION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Save Comment Disable Facturation Failed '),
);
export const SAVE_CORREO_CFDI_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set Save Email CFDI Load '),
);
export const SAVE_CORREO_CFDI_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set Save Email CFDI Failed '),
);
export const SAVE_DISABLE_CORREO_CFDI_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set Save Disable Email CFDI Load '),
);
export const SAVE_DISABLE_CORREO_CFDI_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set Save Disable Email CFDI Failed '),
);

export const SET_BACKUP_DELIVERY_BILLING = createAction(
  buildingStringActionType(typeReducer, 'Set BackUp Delivery Bllling'),
);
export const SET_BACKUP_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Set BackUp Address Delivery Bllling'),
);
export const SET_ALLOWED_EDIT_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set allowed form'),
  props<{value: boolean}>(),
);
export const SET_RESTORE_BACKUP_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Set Restore BackUp Address Delivery Bllling'),
);
export const SET_ADDRESS_DATA_POP = createAction(
  buildingStringActionType(typeReducer, 'Set Address Data Pop'),
);
export const SET_CLEAN_BACKUP_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Set Clean BackUp Address Delivery Bllling'),
);
export const SET_CLEAN_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Set Clean BackUp Delivery Bllling'),
);
export const SAVE_OR_UPDATE_DIRECTION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save or update direction load'),
);
export const SAVE_OR_UPDATE_DIRECTION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save or update direction success'),
  props<{payload: string}>(),
);
export const SAVE_OR_UPDATE_DIRECTION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save or update direction failed'),
);
export const SAVE_CLIENT_DIRECTION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save client direction success'),
);
export const SAVE_CLIENT_DIRECTION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save client direction failed'),
);
export const CLEAN_DELIVERY_BILLING_CLIENT_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set Clean Delivery Billing Client State'),
);
export const EDIT_ADDRESS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Edit address component effect'),
);
export const ADD_NEW_ADDRESS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Add new address component effect'),
);
export const SET_DATA_BILLING_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Set data billing component effect'),
  props<{value: any; node: string}>(),
);
export const VALIDATE_RFC = createAction(buildingStringActionType(typeReducer, 'Validate RFC '));
export const SET_DIRECTION_DATA_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Set direction data component effect'),
  props<{node: string; payload: string}>(),
);
export const CLOSE_MODAL_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Close modal component effect'),
  props<{value: boolean}>(),
);
export const HANDLE_VALIDATION_DATE = createAction(
  buildingStringActionType(typeReducer, 'Handle validation date'),
  props<{date: string}>(),
);
export const SHOW_REQUEST_AUTH_CODE = createAction(
  buildingStringActionType(typeReducer, 'Show Request Auth Code'),
);
export const GENERATE_AUTHORIZATION_CODE = createAction(
  buildingStringActionType(typeReducer, 'Generate Authorization Code'),
);
export const SET_AUTHORIZATION_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set authorization data'),
);
export const DELIVERY_BILLING_VALID_AUTHORIZATION_CODE = createAction(
  buildingStringActionType(typeApi, 'Delivery billing Valid Authorization Code'),
);
export const SAVE_EXCHANGE_RATE_EXPIRATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save exchange rate expiration load'),
);
export const SAVE_EXCHANGE_RATE_EXPIRATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save exchange rate expiration success'),
  props<{IdClienteTCDOFVigencia: string}>(),
);
export const UPDATE_CHANGE_TYPE_VALIDATION = createAction(
  buildingStringActionType(typeReducer, 'Update change type validation'),
);
export const SET_RESET_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set reset form address'),
);
