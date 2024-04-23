import {createAction, props} from '@ngrx/store';
/*Utils Imports*/
/*Models Imports*/
import {
  IReviewInvoice,
  IReviewsInvoice,
} from '@appModels/store/pendings/charges/review-results/review-results-list/review-results-list.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {Archivo, FccRevisionProgramada, ResultadosRevisionTotales} from 'api-finanzas';
import {IChip} from '@appModels/chip/chip';
import {DatosFacturacionCliente, DireccionClienteDetalle} from 'api-catalogos';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Review-Results-List';

export const FETCH_REVIEWS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Reviews Load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_REVIEWS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Reviews Success'),
  props<{reviews: IReviewsInvoice}>(),
);
export const FETCH_REVIEWS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Reviews Error'),
  props<{error: any}>(),
);
export const SET_OPTION_TAB = createAction(
  buildingStringActionType(typeReducer, 'Set Option Tab'),
  props<{tab: ITabOption}>(),
);
export const SET_STATUS_API = createAction(
  buildingStringActionType(typeReducer, 'Set Status Api'),
  props<{status: number}>(),
);
export const GET_TOTALS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Totals Load'),
);
export const GET_TOTALS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Totals Success'),
  props<{totals: ResultadosRevisionTotales}>(),
);
export const GET_TOTALS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get Totals Error'),
  props<{error: any}>(),
);
export const SELECTED_OPTION_CHIP = createAction(
  buildingStringActionType(typeReducer, 'Selected Option Chip'),
  props<{chip: IChip}>(),
);
export const SET_STATUS_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Set Status Pop Up'),
  props<{isShow: boolean}>(),
);
export const SELECTED_CUSTOMER = createAction(
  buildingStringActionType(typeReducer, 'Selected Customer'),
  props<{customer: IReviewInvoice}>(),
);
export const FETCH_BILLS_CLIENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Bills Client Success'),
  props<{dataBill: DatosFacturacionCliente}>(),
);
export const FETCH_BILLS_CLIENT_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Bills Client Error'),
  props<{error: any}>(),
);
export const FETCH_ADDRESS_CLIENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Address Client Success'),
  props<{dataAddress: DireccionClienteDetalle}>(),
);
export const FETCH_ADDRESS_CLIENT_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Address Client Error'),
  props<{error: any}>(),
);

export const FETCH_EVIDENCE_REVIEW_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Evidence Review Success'),
  props<{evidenceReview: Array<Archivo>; evidenceMessenger: Array<Archivo>}>(),
);
export const FETCH_EVIDENCE_REVIEW_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Evidences Review Error'),
  props<{error: any}>(),
);
export const FETCH_INCIDENCES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Incidences Client Success'),
  props<{incidences: Array<FccRevisionProgramada>}>(),
);
export const FETCH_INCIDENCES_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Incidences Client Error'),
  props<{error: any}>(),
);
export const PRINT_TO_REVIEW_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Print to Review Load'),
);
export const PRINT_TO_REVIEW_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Print to Review Success'),
);
export const PRINT_TO_REVIEW_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Print to Review Error'),
  props<{error: any}>(),
);
export const SET_SCHEDULE_CHARGE_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set Review Date'),
  props<{date: string; dateFormat: Date}>(),
);
export const SAVE_SCHEDULE_CHARGE_DATE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save Schedule Charge Date Load'),
);
export const SAVE_SCHEDULE_CHARGE_DATE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save Schedule Charge Date Success'),
);
export const SAVE_SCHEDULE_CHARGE_DATE_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Save Schedule Charge Date Error'),
  props<{error: any}>(),
);
