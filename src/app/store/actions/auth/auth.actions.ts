import {createAction, props} from '@ngrx/store';
import {AuthState, IUser} from '@appModels/store/auth/auth.models';
import {AppToken} from '@appModels/auth/token.model';

export const LOGIN_LOAD = createAction('[Auth] Login Load', props<{user: IUser}>());
export const SET_LOGIN_TOKEN = createAction('[Auth] Set login token', props<{token: AppToken}>());
export const LOGIN_SUCCESS = createAction(
  '[Auth] Login',
  props<{auth: AuthState; returnUrl: string; delay: boolean}>(),
);
export const LOGIN_FAILED = createAction('[Auth] Login Failed');
export const authLogout = createAction('[Auth] Logout');
export const SET_TOKEN = createAction('[Auth] Set token', props<{auth: AuthState}>());
export const UPDATE_TOKEN = createAction(
  '[Auth] Update token',
  props<{auth: AuthState; delay: boolean}>(),
);
export const SET_RETURN_URL = createAction('[Auth] Set Return url', props<{returnUrl: string}>());
export const START_REFRESH_TOKEN = createAction('[Auth] Start refresh token');
