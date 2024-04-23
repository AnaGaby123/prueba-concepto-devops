/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, delayWhen, exhaustMap, map, tap, withLatestFrom} from 'rxjs/operators';
import {AUTH_KEY} from '@appUtil/common.protocols';

/* Services Imports */
import {AuthService} from '@appServices/auth/auth.service';
import {LocalStorageService} from '@appCore/local-storage/local-storage.service';

/* Models Imports */
import {AppState} from '@appCore/core.state';

/* Actions Imports */
import {
  authLogout,
  LOGIN_SUCCESS,
  SET_LOGIN_TOKEN,
  SET_TOKEN,
  UPDATE_TOKEN,
} from '@appActions/auth/auth.actions';

/* Selectors Imports */
import {selectReturnUrl} from '@appSelectors/auth/auth.selectors';
import {appRoutes} from '@appHelpers/core/app-routes';
import {EMPTY, timer} from 'rxjs';
import {AppToken} from '@appModels/auth/token.model';
import {UserInfo} from '@appModels/auth/user-info.model';
import {AuthState} from '@appModels/store/auth/auth.models';
import {SistemaService, VUsuarioDetalle} from 'api-catalogos';
import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';
import {SET_INITIALIZATION_COMPLETE} from '@appActions/settings/settings.actions';
import {selectCurrentRoute} from '@appSelectors/router/router.selectors';
import {MatDialog} from '@angular/material/dialog';
import {SignalRService} from '@appServices/signalR/signal-r.service';

const FILE_NAME = 'auth.effects.ts';

@Injectable()
export class AuthEffects {
  updateCheckText = '';
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private systemService: SistemaService,
    private router: Router,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private matDialog: MatDialog,
    private signalR: SignalRService,
  ) {}

  loginLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SET_LOGIN_TOKEN),
      exhaustMap(({token}) => {
        return this.authService.userInfo(token.access_token).pipe(
          map((userInfo: UserInfo) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener el UserInfo',
              ),
              userInfo,
            );
            return {
              token,
              userInfo,
            };
          }),
          catchError((error) => {
            this.logger.error(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener el UserInfo',
              ),
              error.message,
            );
            this.store.dispatch(authLogout());
            return EMPTY;
          }),
        );
      }),
      exhaustMap((authData: AuthState) => {
        return this.authService.refreshToken(authData.token.refresh_token).pipe(
          map((token: AppToken) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al actualizar el token',
              ),
              token,
            );
            return SET_TOKEN({auth: {...authData, token}});
          }),
          catchError((error) => {
            this.logger.error(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al actualizar el token',
              ),
              error.message,
            );
            this.store.dispatch(authLogout());
            return EMPTY;
          }),
        );
      }),
    ),
  );

  whoAmI$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SET_TOKEN),
      withLatestFrom(this.store.select(selectReturnUrl)),
      exhaustMap(([{auth}, returnUrl]) => {
        return this.systemService.HomeWhoAmI().pipe(
          map((userDetail: VUsuarioDetalle) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al consultar WhoAmI',
              ),
              userDetail,
            );
            const authState: AuthState = {
              isAuthenticated: true,
              token: auth.token,
              userInfo: {...auth.userInfo, ...userDetail},
            };

            this.localStorageService.setItem(AUTH_KEY, authState);
            this.router
              .navigate([returnUrl])
              .then(() => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Respondio la promesa',
                  ),
                  returnUrl,
                );
              })
              .catch(() => {
                this.logger.error(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Fallo la promesa',
                  ),
                  returnUrl,
                );
              })
              .finally(() => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Finalizo la promesa',
                  ),
                  returnUrl,
                );
              });
            return LOGIN_SUCCESS({auth: authState, returnUrl, delay: true});
          }),
          catchError((error) => {
            this.logger.error(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al consultar WhoAmI',
              ),
              error.message,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  startRefreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGIN_SUCCESS, UPDATE_TOKEN),
      // DOCS: Se refresca el token 1 minutos antes de expirar
      delayWhen(({auth, delay}) => {
        return delay ? timer((auth.token.expires_in - 60) * 1000) : timer(0);
      }),
      // delay((300 - 120) * 1000),
      exhaustMap(({auth, delay}) => {
        // DOCS: Cerró sesión antes de cumplirse el tiempo de actualizar el token
        const storageToken = this.localStorageService.getItem(AUTH_KEY);
        if (!storageToken?.token?.refresh_token) {
          this.store.dispatch(authLogout());
          return EMPTY;
        }

        // DOCS: Cambio de sesión antes de cumplirse el tiempo de actualizar el token
        if (
          storageToken.token.refresh_token &&
          storageToken.token.refresh_token !== auth.token.refresh_token
        ) {
          return EMPTY;
        }
        // TODO: DESCOMENTAR CUANDO SE IMPLEMENTE SW NUEVAMENTE
        // DOCS: SW VERIFICA SI EXISTE UNA VERSIÓN NUEVA DEL SISTEMA
        /*        this.swUpdate
          .checkForUpdate()
          .then(() => (this.updateCheckText = 'resolved'))
          .catch((err) => (this.updateCheckText = `rejected: ${err.message}`));*/
        return this.authService.refreshToken(auth.token.refresh_token).pipe(
          map((token: AppToken) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al actualizar el token',
              ),
              token,
            );
            this.localStorageService.updateItem(AUTH_KEY, token, 'token');
            if (!delay) {
              this.store.dispatch(SET_INITIALIZATION_COMPLETE());
            }
            return UPDATE_TOKEN({auth: {...auth, token}, delay: true});
          }),
          catchError((error) => {
            this.logger.error(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al actualizar el token',
              ),
              error,
            );
            this.store.dispatch(authLogout());
            return EMPTY;
          }),
        );
      }),
    ),
  );

  logOut = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        withLatestFrom(this.store.select(selectCurrentRoute)),
        tap(([, currentRoute]) => {
          this.localStorageService.removeItem(AUTH_KEY);
          this.matDialog.closeAll();
          this.signalR.stopConnection();
          // FIXME: Rara vez currentRoute trae /login esto es incorrecto.
          //  Cuando se determine porque trae /login, quitar la validación de abajo y mandar siempre currentRoute
          this.router.navigate([appRoutes.login], {
            queryParams: {
              returnUrl: currentRoute?.includes(appRoutes.login)
                ? appRoutes.protected
                : currentRoute,
            },
          });
        }),
      ),
    {dispatch: false},
  );
}
