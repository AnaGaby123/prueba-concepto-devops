import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {AutorizacionDetalle, GMTipoAutorizacionUsuarioDetalle} from 'api-logistica';
import {TypedAction} from '@ngrx/store/src/models';

export interface AuthCode {
  actionAfterValid?: TypedAction<string>; // DOCS: ATTRIBUTE TO SAVE THE ACTION WHEN CODE IS VALID
  authorizationDetails?: IAuthorizationDetails; // DOCS: ATTRIBUTE TO SAVE AUTHORIZATION DETAILS
  code: number[]; // DOCS: ATTRIBUTE TO SAVE AN ARRAY OF CODE NUMBERS
  gmAuthorizationUserTypeDetails?: IGmAuthorizationUserTypeDetails; // DOCS: ATTRIBUTE TO SAVE THE AUTHORIZATION USER TYPE DETAILS
  isValid: boolean; // DOCS: ATTRIBUTE TO CHECK IF CODE IS VALID
  requestStatus: number; // DOCS: ATTRIBUTE FOR REQUEST STATUS (LOADING, SUCCEEDED, ERROR
}

interface RequestStatus {
  requestStatus: number;
}

export interface IAuthorizationDetails extends AutorizacionDetalle, RequestStatus {}

export interface IGmAuthorizationUserTypeDetails
  extends GMTipoAutorizacionUsuarioDetalle,
    RequestStatus {}

export const initialAuthCodeState = (): AuthCode => ({
  code: [],
  isValid: false,
  requestStatus: API_REQUEST_STATUS_DEFAULT,
});
