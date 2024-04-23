import {createAction, props} from '@ngrx/store';
import {SolicitudAutorizacionCambio} from 'api-catalogos';
import {IOrder} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'Api QuotedItems';
const typeReducer = 'QuotedItems';

//DOCS: GENERAR CODIGO DE VERIFICACIÓN
export const GENERATE_VERIFICATION_CODE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Solicitar código de autorización de ajustes success'),
  props<{codeRequest: SolicitudAutorizacionCambio}>(),
);

//DOCS: ACTUALIZAR VALIDACIÓN DE DATOS
export const SET_DATA_VALIDATE = createAction(
  buildingStringActionType(typeReducer, 'Set Data Validate'),
  props<{value: boolean; typeValidate: string}>(),
);

//DOCS: AGEGAR INCIDENCIAS A UNA PARTIDA
export const SET_INCIDENCE_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set incidence value'),
  props<{entryId: string; field: string; value: boolean | string; index}>(),
);

//TODO: ACCIONES DEL CODIGO DE VERIFICACIÓN, ACTUALMENTE NO ES REQUERIDO

export const GET_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Verification Code Load'),
  props<{order: IOrder}>(),
);
export const GENERATE_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Generate Verification Code Load'),
);

export const GENERATE_VERIFICATION_CODE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Generate Verification Code Failed'),
);
export const COMPARE_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Compare Verification Code Load'),
);
export const COMPARE_VERIFICATION_CODE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Compare Verification Code Failed'),
);
export const SET_AUTHORIZED_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set Authorized Verification Code Load'),
  props<{codeRequest: SolicitudAutorizacionCambio}>(),
);
export const SET_AUTHORIZED_VERIFICATION_CODE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Authorized Verification Code Success'),
);
export const SET_AUTHORIZED_VERIFICATION_CODE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Set Authorized Verification Code Failed'),
);
export const CLEAR_ENTRIES = createAction(buildingStringActionType(typeReducer, 'Clean Entries'));
