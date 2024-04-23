import {createSelector} from '@ngrx/store';
import {selectAuthCodeState} from '@appSelectors/dialogs/dialogs.selectors';
import {
  AuthCode,
  IAuthorizationDetails,
  IGmAuthorizationUserTypeDetails,
} from '@appModels/store/dialogs/auth-dialog/auth-dialog.model';
import {AutorizacionUsuarios, CatTipoAutorizacion} from 'api-logistica';
import * as _ from 'lodash-es';
import {TypedAction} from '@ngrx/store/src/models';

export const selectCode = createSelector(selectAuthCodeState, (authCode: AuthCode): number[] =>
  _.filter(authCode?.code, (code) => code !== null),
);
export const selectCodeIsValid = createSelector(
  selectAuthCodeState,
  (authCode: AuthCode): boolean => authCode?.isValid,
);
export const selectValidateRequestStatus = createSelector(
  selectAuthCodeState,
  (authCode: AuthCode): number => authCode?.requestStatus,
);
export const selectGmAuthorizationUserTypeDetails = createSelector(
  selectAuthCodeState,
  (state: AuthCode): IGmAuthorizationUserTypeDetails => state?.gmAuthorizationUserTypeDetails,
);
export const selectAuthorizationType = createSelector(
  selectGmAuthorizationUserTypeDetails,
  (state: IGmAuthorizationUserTypeDetails): CatTipoAutorizacion => state?.catTipoAutorizacion,
);
export const selectFirstAuthorizationUser = createSelector(
  selectGmAuthorizationUserTypeDetails,
  (state: IGmAuthorizationUserTypeDetails) =>
    state.TipoAutorizacionUsuario?.length ? state.TipoAutorizacionUsuario[0] : null,
);
export const selectAuthUserEmail = createSelector(
  selectFirstAuthorizationUser,
  (state: AutorizacionUsuarios) => state?.Email,
);
export const selectAuthorizationDetails = createSelector(
  selectAuthCodeState,
  (authCode: AuthCode) => authCode?.authorizationDetails,
);
export const selectIdAuthorization = createSelector(
  selectAuthorizationDetails,
  (details: IAuthorizationDetails) => details?.Autorizacion?.IdAutorizacion,
);
export const selectActionAfterValid = createSelector(
  selectAuthCodeState,
  (authCode: AuthCode): TypedAction<string> => authCode?.actionAfterValid,
);
