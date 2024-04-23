import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {Credit} from '@appModels/store/forms/clients-form/clients-details-form/charges/charges-clients-form.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = '[Reducer] - Cat Clients - Charges';

export const SET_LOAD_CHARGES_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set Load Charges Client'),
);

export const SET_SUCCESS_CHARGES_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set Success Charges Client'),
  props<{payload}>(),
);
export const SET_FAILED_CHARGES_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set Failed Charges Client'),
);

export const SET_PAYMENT_CONDITIONS = createAction(
  buildingStringActionType(typeReducer, 'Set Payment Condition'),
  props<{paymentCondition: DropListOption}>(),
);
export const SET_PAYMENT_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set Payment Form'),
  props<{paymentForm: DropListOption}>(),
);
export const SET_ACCOUNT_NUMBER = createAction(
  buildingStringActionType(typeReducer, 'Set Account Number Form'),
  props<{accountNumber: string}>(),
);
export const SET_CREDIT_LINE = createAction(
  buildingStringActionType(typeReducer, 'Set Credit Line Form'),
  props<{creditLine: string}>(),
);
export const SET_OVERDRAFT = createAction(
  buildingStringActionType(typeReducer, 'Set Overdraft Form'),
  props<{overdraft}>(),
);
export const SET_PROCESS_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set Process Purchase Order'),
  props<{value: boolean}>(),
);
export const SET_PROCESS_WITHOUT_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set Process Without Purchase Order'),
  props<{value: boolean}>(),
);
export const SET_ACCOUNT_NUMBER_STP = createAction(
  buildingStringActionType(typeReducer, 'Set Account Number stp'),
  props<{accountNumber: string}>(),
);
export const SET_PUBLICATIONS_ACCOUNT_NUMBER_STP = createAction(
  buildingStringActionType(typeReducer, 'Set Publications Account Number stp'),
  props<{accountNumber: string}>(),
);
export const SET_ALIAS = createAction(
  buildingStringActionType(typeReducer, 'Set Alias'),
  props<{alias: string}>(),
);
export const SET_PUBLICATIONS_ALIAS = createAction(
  buildingStringActionType(typeReducer, 'Set Publications Alias'),
  props<{publicationAlias: string}>(),
);

export const SET_REVIEW_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Review Type Form'),
  props<{reviewType: DropListOption}>(),
);

export const SET_USE_CFDI = createAction(
  buildingStringActionType(typeReducer, 'Set Use cfdi'),
  props<{useCfdi: DropListOption}>(),
);

export const SET_PAYMENT_METHOD = createAction(
  buildingStringActionType(typeReducer, 'Set Payment Method'),
  props<{paymentMethod: DropListOption}>(),
);
export const SAVE_CHARGES_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set Save Charges Load'),
);
export const SAVE_CHARGES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Save Charges Success'),
);
export const SAVE_CHARGES_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set Save Charges Error'),
);
export const SAVE_PAYMENTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Save Payments Success'),
);
export const SAVE_PAYMENTS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set Save Payments Error'),
);
export const SAVE_CLIENT_STP_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Save Client Stp Success'),
);
export const SAVE_CLIENT_STP_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set Save Client Stp Error'),
);
export const SAVE_CLIENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Save Client Success'),
);
export const SAVE_CLIENT_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set Save Client Error'),
);
export const SET_BACKUP_CHARGES = createAction(
  buildingStringActionType(typeReducer, 'Set Backup Charges'),
);
export const SET_CLEAN_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Set Clean Backup'),
);
export const CLEAN_CHARGES_CLIENT_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set Clean Charges Client State'),
);
export const GET_DATADROPLIST_PAGO_LOAD = createAction(
  buildingStringActionType('[API]', 'Datadroplist Pago Load'),
);
export const CHECK_CHARGES_DATA = createAction(
  buildingStringActionType(typeReducer, 'Check charges data'),
);
export const UPDATE_CREDIT_DATA = createAction(
  buildingStringActionType(typeReducer, 'Update credit data'),
  props<{credit: Credit}>(),
);
export const SET_PAYMENT_CONFIG_ID = createAction(
  buildingStringActionType(typeReducer, 'Set payment condig id'),
  props<{IdConfiguracionPagos: string}>(),
);
