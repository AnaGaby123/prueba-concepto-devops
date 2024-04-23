import {createSelector} from '@ngrx/store';

import {AuthState} from '@appModels/store/auth/auth.models';
import {selectAuthState} from '@appCore/core.state';
import {UserInfo} from '@appModels/auth/user-info.model';

export const selectAuth = createSelector(selectAuthState, (state: AuthState) => state);

export const selectIsAuthenticated = createSelector(
  selectAuth,
  (state: AuthState) => state.isAuthenticated,
);

export const selectToken = createSelector(selectAuth, (state: AuthState) => state.token);
export const selectReturnUrl = createSelector(selectAuth, (state: AuthState) => state.returnUrl);

export const selectUser = createSelector(
  selectAuth,
  (state: AuthState): UserInfo => state.userInfo,
);
export const selectIdUser = createSelector(selectUser, (state: UserInfo) => state.IdUsuario);

export const selectUserRoles = createSelector(selectUser, (state: UserInfo) => state.Roles);

export const selectUserFunctions = createSelector(
  selectUser,
  (state: UserInfo): Array<string> => state.Funciones,
);
