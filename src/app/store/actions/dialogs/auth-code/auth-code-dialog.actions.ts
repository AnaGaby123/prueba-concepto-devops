import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';
import {
  AutorizacionDetalle,
  GMTipoAutorizacionUsuarioDetalle,
  ParametroAutorizacion,
} from 'api-logistica';
import {AuthCodeDialog} from '@appInterfaces/dialogs/AuthCode.dialog';
import {TypedAction} from '@ngrx/store/src/models';

const typeReducer = 'auth-code-dialog';
const typeApi = '[Api] auth-code-dialog';

export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set Initial State'),
);
export const SET_CODE = createAction(
  buildingStringActionType(typeReducer, 'Set Code'),
  props<{number?: number; position: number; isEmpty?: boolean}>(),
);
// DOCS: ACTIONS TO FETCH AUTHORIZATION DETAILS
export const FETCH_AUTHORIZATION_DETAILS = createAction(
  buildingStringActionType(typeApi, 'Fetch Authorized Users'),
  props<{authType: string}>(),
);
export const FETCH_AUTHORIZATION_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Authorized Users Success'),
  props<{details: GMTipoAutorizacionUsuarioDetalle}>(),
);
export const FETCH_AUTHORIZATION_DETAILS_ERROR = createAction(
  buildingStringActionType(typeApi, 'Fetch Authorized Users Error'),
);
// DOCS: ACTIONS TO GENERATE AUTH CODE
export const GENERATE_AUTH_CODE = createAction(
  buildingStringActionType(typeApi, 'Generate Auth Code'),
  props<{
    actionAfterValid: TypedAction<string>; // DOCS: ATTRIBUTE TO EXECUTE AN ACTION WHEN CODE IS VALID
    authCodeDialogData: AuthCodeDialog; // DOCS: ATTRIBUTE FOR SET DATA TO SECOND DIALOG
    payload: ParametroAutorizacion; // DOCS: ATTRIBUTE TO SAVE DATA FOR REQUEST AUTH DIALOG
  }>(),
);
export const GENERATE_AUTH_CODE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Generate Auth Code Success'),
  props<{details: AutorizacionDetalle}>(),
);
export const GENERATE_AUTH_CODE_ERROR = createAction(
  buildingStringActionType(typeApi, 'Generate Auth Code Error'),
);
// DOCS: ACTIONS TO VALIDATE AUTH CODE
export const VALIDATE_CODE = createAction(buildingStringActionType(typeReducer, 'Validate Code'));
export const VALIDATE_CODE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Validate Code Success'),
  props<{isValid: boolean}>(),
);
export const VALIDATE_CODE_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Validate Code Error'),
);
export const CLEAN_CODE = createAction(buildingStringActionType(typeReducer, 'Clean Code'));
export const CLEAN_ACTION_AFTER_VALID = createAction(
  buildingStringActionType(typeReducer, 'Clean Action After Valid'),
);
