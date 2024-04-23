/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {find} from 'lodash-es';

/*services Imports */
import {
  ArchivoDetalle,
  CatTipoAutorizacion,
  ConfiguracionClientesDireccionesService,
  SistemaArchivosService,
} from 'api-catalogos';

/* Models Imports */
import {AppState} from '@appCore/core.state';

/* Actions Imports */
import * as actionsUtils from '@appActions/utils/utils.action';
import {SET_LOADING, SET_LOADING_ERROR, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';

/* Selectors Imports */
import {EMPTY, of} from 'rxjs';
import * as servicesLogger from '@appUtil/logger';
import {LOG_FAILED, LOG_SUCCEEDED} from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';
import {
  convertFileFromURLToBase64,
  convertFromBase64ToByteArray,
  convertPDFFileFromURLToBase64,
  dowloadFile,
  getOnlyFileName,
} from '@appUtil/files';
import {appRoutes} from '@appHelpers/core/app-routes';
import {selectListAuthorizationTypes} from '@appSelectors/catalogs/catalogs.selectors';
import {
  AutorizacionDetalle,
  FMessage,
  ParametroAutorizacion,
  ProcesosAutorizacionesService,
} from 'api-logistica';
import {
  AuthorizationTypesDescription,
  AuthorizationTypesDescriptions,
} from '@appUtil/common.protocols';

const FILE_NAME = 'utils.effects.ts';

@Injectable()
export class UtilsEffects {
  constructor(
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private store: Store<AppState>,
    private sistemaArchivosService: SistemaArchivosService,
    private configuracionClientesDirecciones: ConfiguracionClientesDireccionesService,
    private systemFileServices: SistemaArchivosService,
    private procesosAutorizacionesService: ProcesosAutorizacionesService,
  ) {}

  // DOCS: Navegación del segundo nivel
  setOptionFromSubmenu$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionsUtils.SET_SECOND_LEVEL_OPTION_FROM_MENU),
        tap(({selectedOption}) => {
          // TODO: Cambiar pendings por url dinámica de un nivel arriba
          if (selectedOption.childRoutes) {
            this.router.navigate([
              appRoutes.protected,
              appRoutes.pendings.pendings,
              selectedOption.childRoutes[0],
            ]);
          } else {
            this.router.navigate(['/protected/catalogs/', selectedOption.url]);
          }
          if (selectedOption.active) {
            this.store.dispatch(
              actionsUtils.SET_MENU_IS_OPEN({
                isOpen: false,
              }),
            );
          }
        }),
      ),
    {dispatch: false},
  );

  // DOCS: Navegación del tercer nivel
  setOptionFromOption$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionsUtils.SET_THIRD_LEVEL_OPTION_FROM_MENU),
        tap(({selectedOption}) => {
          this.router.navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            selectedOption.url,
          ]);
        }),
      ),
    {dispatch: false},
  );

  downloadFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionsUtils.DOWLOAD_FILE_LOAD),
        mergeMap((action) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response: ArchivoDetalle) => {
              if (response && response.Url) {
                // Si newTab = true, abre el archivo en una nueva pestaña (en chrome lo descarga)
                if (action.newTab) {
                  window.open(response.Url, '_blank');
                } else {
                  // sino, descarga el archivo normalmente
                  const base64 = await convertFileFromURLToBase64(response.Url);
                  if (base64) {
                    const byteArray = await convertFromBase64ToByteArray(base64);
                    dowloadFile(byteArray, getOnlyFileName(action.FileKey));
                  } else {
                    this.store.dispatch(
                      SET_LOADING_ERROR({
                        active: true,
                        message: 'Error al intentar descargar',
                      }),
                    );
                  }
                }
              }
              this.store.dispatch(SET_LOADING({payload: false}));
              return actionsUtils.DOWLOAD_FILE_SUCCESS();
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(actionsUtils.DOWLOAD_FILE_ERROR(error));
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  fetchNonWorkingDays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsUtils.FETCH_NON_WORKING_DAYS_LOAD),
      mergeMap((actions) => {
        const today = new Date();
        const since = new Date(today.getFullYear() - 1, today.getMonth()).toISOString();
        const until = new Date(today.getFullYear() + 1, today.getMonth()).toISOString();
        const params: ConfiguracionClientesDireccionesService.DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoParams = {
          desde: since,
          hasta: until,
        };
        return this.configuracionClientesDirecciones
          .DireccionClienteExtensionsFechasNoSePuedeEntregarPedido(params)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener dias inhabiles',
                ),
                response,
              );
              return actionsUtils.FETCH_NON_WORKING_DAYS_SUCCESS({
                nonWorkingDays: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener dias inhabiles',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );

  viewFileRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionsUtils.SET_IS_POP_FILE_EMAIL_OPEN),
        mergeMap((action) => {
          return this.systemFileServices.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al recuperar el archivo adjunto al correo',
                ),
                response,
              );
              let fileBase64Email = null;
              if (response && response?.Url) {
                fileBase64Email = await convertPDFFileFromURLToBase64(response?.Url);
                this.store.dispatch(
                  actionsUtils.VIEW_FILE_EMAIL_SUCCESS({
                    fileBase64Email,
                  }),
                );
              }
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al recuperar el archivo adjunto al correo',
                ),
                error,
              );
              return of(actionsUtils.VIEW_FILE_ERROR());
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  //DOCS: Efectos para funcionalidad del código de autorización

  // DOCS: EFECTO PARA SOLICITUAR UN NUEVO CÓDIGO DE AUTORIZACIÓN
  setRequestCodeAuthorization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsUtils.REQUEST_VALIDATION_CODE_LOAD),
      withLatestFrom(this.store.select(selectListAuthorizationTypes)),
      mergeMap(([{authorizationType, IdOperacion}, authorizationTypes]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const body: ParametroAutorizacion = {
          IdCatTipoAutorizacion: find(
            authorizationTypes,
            (o: CatTipoAutorizacion) =>
              o.Descripcion === AuthorizationTypesDescription[authorizationType],
          ).IdCatTipoAutorizacion,
          IdOperacion,
          Descripcion: AuthorizationTypesDescriptions[authorizationType],
          CodigoAutorizacion: '',
          IdUsuarioAutoriza: null,
          IdAutorizacion: null,
        };
        return this.procesosAutorizacionesService.AutorizacionGuardarOActualizar(body).pipe(
          map((response: AutorizacionDetalle) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                LOG_SUCCEEDED,
                FILE_NAME,
                'Al solicitar código de autorización',
              ),
              response,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return actionsUtils.REQUEST_VALIDATION_CODE_SUCCESS({
              authorization: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                LOG_FAILED,
                FILE_NAME,
                'Al solicitar código de autorización',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(actionsUtils.REQUEST_VALIDATION_CODE_FAILED());
          }),
        );
      }),
    ),
  );
  // DOCS: Efecto para enviar a validación un código de autorización
  sendAuthorizationCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsUtils.SEND_AUTHORIZATION_CODE_LOAD),
      mergeMap(({authorizationObj}) => {
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
                    message: 'El codigo de autorización se válido',
                  }),
                );
              }
              if (!isValid) {
                setTimeout(() => this.store.dispatch(actionsUtils.RESET_CODE_POP_INPUTS()), 1500);
              }
              return actionsUtils.SEND_AUTHORIZATION_CODE_SUCCESS({
                valid: isValid,
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
              return of(actionsUtils.SEND_AUTHORIZATION_CODE_FAILED());
            }),
          );
      }),
    ),
  );

  // DOCS: No se esta usando
  /*setOptionSelected = (options, roles) =>
    flow([
      () =>
        filter(options, (item) => {
          const rolsUser = filter(item.allowedRoles, (rol) => {
            return indexOf(roles, rol) !== -1;
          });
          return rolsUser.length > 0;
        }),
      (optionsC) =>
        _map(optionsC, (o, i) => (i === 0 ? {...o, active: true} : {...o, active: false})),
    ])();*/
}
