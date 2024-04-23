import {Action, createReducer, on} from '@ngrx/store';
import {AuthState} from '@appModels/store/auth/auth.models';
import {
  authLogout,
  LOGIN_SUCCESS,
  SET_RETURN_URL,
  SET_TOKEN,
  UPDATE_TOKEN,
} from '@appActions/auth/auth.actions';

import {AppToken} from '@appModels/auth/token.model';
import {UserInfo} from '@appModels/auth/user-info.model';

export const initialState: AuthState = {
  isAuthenticated: false,
  token: {} as AppToken,
  userInfo: {} as UserInfo,
};

const reducer = createReducer(
  initialState,
  on(LOGIN_SUCCESS, (state, {auth}) => ({
    ...state,
    isAuthenticated: true,
    token: auth.token,
    userInfo: auth.userInfo,
  })),
  on(authLogout, (state) => ({...state, ...initialState})),
  on(SET_TOKEN, UPDATE_TOKEN, (state, {auth}) => ({...state, ...auth})),
  on(SET_RETURN_URL, (state, {returnUrl}) => ({...state, returnUrl})),
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}
