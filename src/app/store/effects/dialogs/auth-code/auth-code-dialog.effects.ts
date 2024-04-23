import {Injectable} from '@angular/core';
import {AppState} from '@appCore/core.state';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {authDialogActions} from '@appActions/dialogs';
import {EMPTY, mergeMap, of} from 'rxjs';
import {catchError, map, withLatestFrom} from 'rxjs/operators';
import {
  AutorizacionDetalle,
  FMessage,
  GMTipoAutorizacionUsuarioDetalle,
  ParametroAutorizacion,
  ProcesosAutorizacionesService,
} from 'api-logistica';
import * as servicesLogger from '@appUtil/logger';
import {LOG_FAILED, LOG_SUCCEEDED} from '@appUtil/logger';
import {SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import {NGXLogger} from 'ngx-logger';
import {authDialogSelectors} from '@appSelectors/dialogs';
import * as _ from 'lodash-es';
import {ValidateAuthCodeDialogComponent} from '@appComponents/shared/validate-auth-code-dialog/validate-auth-code-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

const FILE_NAME = 'auth-code-dialog.effects.ts';

@Injectable()
export class AuthCodeDialogEffects {
  constructor(
    private action$: Actions,
    private dialog: MatDialog,
    private logger: NGXLogger,
    private store: Store<AppState>,
    private procesosAutorizacionesService: ProcesosAutorizacionesService,
  ) {}

  private validateAuthCodeDialogRef: MatDialogRef<ValidateAuthCodeDialogComponent>;

  // DOCS: GET AUTHORIZATION DATA
  fetchAuthorizationDetails$ = createEffect(() =>
    this.action$.pipe(
      ofType(authDialogActions.FETCH_AUTHORIZATION_DETAILS),
      mergeMap(({authType}) => {
        const payload = {
          Filters: [{NombreFiltro: 'Clave', ValorFiltro: authType}],
        };
        return this.procesosAutorizacionesService
          .TipoAutorizacionUsuarioListaTipoAutorizacionUsuario(payload)
          .pipe(
            map((response: GMTipoAutorizacionUsuarioDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el tipo autorización detalle.',
                ),
                response,
              );
              return authDialogActions.FETCH_AUTHORIZATION_DETAILS_SUCCESS({
                details: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el tipo autorización detalle.',
                ),
                error,
              );
              return of(authDialogActions.FETCH_AUTHORIZATION_DETAILS_ERROR);
            }),
          );
      }),
    ),
  );

  // DOCS: GENERATE AUTHORIZATION CODE
  generateAuthCode$ = createEffect(() =>
    this.action$.pipe(
      ofType(authDialogActions.GENERATE_AUTH_CODE),
      withLatestFrom(this.store.select(authDialogSelectors.selectAuthorizationType)),
      mergeMap(([{payload, authCodeDialogData, actionAfterValid}, authorizationType]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        // DOCS: GET AUTHORIZATION TYPE ID FROM DIALOG STATE
        payload = {
          ...payload,
          IdCatTipoAutorizacion: authorizationType?.IdCatTipoAutorizacion,
        };
        return this.procesosAutorizacionesService.AutorizacionGuardarOActualizar(payload).pipe(
          map((response: AutorizacionDetalle) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al generar código de autorización.',
              ),
              response,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.validateAuthCodeDialogRef = this.dialog.open(
              ValidateAuthCodeDialogComponent,
              buildDialogConfig(authCodeDialogData),
            );
            this.validateAuthCodeDialogRef.afterClosed().subscribe((value: boolean) => {
              if (value) {
                this.store.dispatch(
                  authDialogActions.GENERATE_AUTH_CODE({
                    actionAfterValid,
                    authCodeDialogData,
                    payload,
                  }),
                );
              } else {
                this.store.dispatch(authDialogActions.CLEAN_CODE());
                this.store.dispatch(authDialogActions.CLEAN_ACTION_AFTER_VALID());
              }
            });
            return authDialogActions.GENERATE_AUTH_CODE_SUCCESS({
              details: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al generar código de autorización.',
              ),
              error,
            );
            return of(authDialogActions.GENERATE_AUTH_CODE_ERROR());
          }),
        );
      }),
    ),
  );

  // DOCS: FETCH TO VALIDATE AUTHORIZATION CODE
  validAuthCode$ = createEffect(() =>
    this.action$.pipe(
      ofType(authDialogActions.VALIDATE_CODE),
      withLatestFrom(
        this.store.select(authDialogSelectors.selectCode),
        this.store.select(authDialogSelectors.selectIdAuthorization),
      ),
      mergeMap(([action, code, idAuthorizationDetails]) => {
        let authorizationCode = '';
        _.map(code, (c) => (authorizationCode += c));
        const authorizationObj: ParametroAutorizacion = {
          CodigoAutorizacion: String(authorizationCode),
          Descripcion: null,
          IdAutorizacion: idAuthorizationDetails,
          IdCatTipoAutorizacion: null,
          IdOperacion: null,
          IdUsuarioAutoriza: null,
        };
        return this.procesosAutorizacionesService
          .AutorizacionAutorizarSolicitud(authorizationObj)
          .pipe(
            map((response: FMessage) => {
              const isValid = response.Message === 'Success';
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_SUCCEEDED,
                  FILE_NAME,
                  'Al validar código de autorización',
                ),
                response,
              );
              if (isValid) {
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: 'El código de autorización se válido',
                  }),
                );
              }
              return authDialogActions.VALIDATE_CODE_SUCCESS({
                isValid,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_FAILED,
                  FILE_NAME,
                  'Al validar código de autorización',
                ),
                error,
              );
              return of(authDialogActions.VALIDATE_CODE_ERROR());
            }),
          );
      }),
    ),
  );

  // DOCS: CHECK IF CODE IS VALID
  checkIfCodeIsValid = createEffect(
    () =>
      this.action$.pipe(
        ofType(authDialogActions.VALIDATE_CODE_SUCCESS),
        withLatestFrom(
          this.store.select(authDialogSelectors.selectCodeIsValid),
          this.store.select(authDialogSelectors.selectActionAfterValid),
        ),
        mergeMap(([action, isValid, actionAfterValid]) => {
          if (isValid) {
            this.store.dispatch(actionAfterValid);
            if (this.validateAuthCodeDialogRef) {
              this.validateAuthCodeDialogRef.close();
            }
            this.store.dispatch(authDialogActions.CLEAN_CODE());
            this.store.dispatch(authDialogActions.CLEAN_ACTION_AFTER_VALID());
          } else {
            // DOCS: CLEAN THE CODE AFTER 600ms FOR SHAKED ANIMATION TO SHOW CORRECTLY
            setTimeout(() => {
              this.store.dispatch(authDialogActions.CLEAN_CODE());
            }, 600);
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
