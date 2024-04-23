import {createReducer, on} from '@ngrx/store';
import {initialAuthCodeState} from '@appModels/store/dialogs/auth-dialog/auth-dialog.model';
import {authDialogActions} from '@appActions/dialogs';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

export const authCodeDialogReducer = createReducer(
  initialAuthCodeState(),
  on(authDialogActions.SET_INITIAL_STATE, () => initialAuthCodeState()),
  on(authDialogActions.SET_CODE, (state, {number, position, isEmpty}) => {
    const validCode = [...state.code];

    if (isEmpty) {
      validCode[position] = null;
    } else {
      validCode[position] = number;
    }

    return {
      ...state,
      code: validCode,
    };
  }),
  // DOCS: ACTIONS FOR AUTHORIZATION DETAILS
  on(authDialogActions.FETCH_AUTHORIZATION_DETAILS, (state) => ({
    ...state,
    gmAuthorizationUserTypeDetails: {
      ...state.gmAuthorizationUserTypeDetails,
      requestStatus: API_REQUEST_STATUS_LOADING,
    },
  })),
  on(authDialogActions.FETCH_AUTHORIZATION_DETAILS_SUCCESS, (state, {details}) => ({
    ...state,
    gmAuthorizationUserTypeDetails: {
      ...state.gmAuthorizationUserTypeDetails,
      ...details,
      requestStatus: API_REQUEST_STATUS_SUCCEEDED,
    },
  })),
  on(authDialogActions.FETCH_AUTHORIZATION_DETAILS_ERROR, (state) => ({
    ...state,
    requestStatus: API_REQUEST_STATUS_FAILED,
  })),
  // DOCS: ACTIONS FOR GENERATE AUTHORIZATION CODE
  on(authDialogActions.GENERATE_AUTH_CODE, (state, {actionAfterValid}) => ({
    ...state,
    actionAfterValid,
    authorizationDetails: {
      ...state.authorizationDetails,
      requestStatus: API_REQUEST_STATUS_LOADING,
    },
  })),
  on(authDialogActions.GENERATE_AUTH_CODE_SUCCESS, (state, {details}) => ({
    ...state,
    authorizationDetails: {
      ...state.authorizationDetails,
      ...details,
      requestStatus: API_REQUEST_STATUS_SUCCEEDED,
    },
  })),
  on(authDialogActions.GENERATE_AUTH_CODE_ERROR, (state) => ({
    ...state,
    authorizationDetails: {
      ...state.authorizationDetails,
      requestStatus: API_REQUEST_STATUS_FAILED,
    },
  })),
  // DOCS: ACTIONS FOR VALIDATE AUTHORIZATION CODE
  on(authDialogActions.VALIDATE_CODE, (state) => ({
    ...state,
    requestStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(authDialogActions.VALIDATE_CODE_SUCCESS, (state, {isValid}) => ({
    ...state,
    isValid,
    requestStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(authDialogActions.VALIDATE_CODE_ERROR, (state) => ({
    ...state,
    isValid: false,
    requestStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(authDialogActions.CLEAN_CODE, (state) => ({
    ...state,
    code: [],
  })),
  on(authDialogActions.CLEAN_ACTION_AFTER_VALID, (state) => ({
    ...state,
    actionAfterValid: null,
  })),
);
