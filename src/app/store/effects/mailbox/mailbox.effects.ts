/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';

/* Services Imports */
import * as apiCatalogos from 'api-catalogos';
import * as apiCatalogs from 'api-catalogos';
import {
  Archivo,
  ArchivoDetalle,
  Cliente,
  GMCorreoRecibidoSpam,
  SistemaArchivosService,
  Usuario,
} from 'api-catalogos';
import * as apiLogistica from 'api-logistica';
import {CorreoRecibidoCliente} from 'api-logistica';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {
  FileCustom,
  PpPedidoCustom,
  ReclassifiedMail,
  SelectedMail,
} from '@appModels/store/mailbox/mailbox.models';

/* Actions Imports */
import * as mailboxActions from '@appActions/mailbox/mailbox.actions';

/* Selectors Imports */
import * as mailboxSelectors from '@appSelectors/mailbox/mailbox.selectors';
import * as authSelectors from '@appSelectors/auth/auth.selectors';
import {selectUser, selectUserFunctions} from '@appSelectors/auth/auth.selectors';

/* Utils Imports */
import {
  RETURN_EMPTY,
  SET_LOADING,
  SET_LOADING_ERROR,
  SET_LOADING_SUCCESS,
} from '@appActions/utils/utils.action';
import {EMPTY, forkJoin, of} from 'rxjs';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {filter, findIndex, forEach, isEmpty, map as _map} from 'lodash-es';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
  ENUM_USER_FUNCTIONS,
  MINIO_BUCKETS,
} from '@appUtil/common.protocols';
import {addRowIndex, getNameFile, isImage, isPdf} from '@appUtil/util';
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {
  convertPDFFileFromURLToBase64,
  getBase64FromUrl,
  getOnlyFileExtension,
} from '@appUtil/files';
import {
  buildParametroGeneradorProcesoMailBot,
  separateReferencesComments,
} from '@appHelpers/mailbox/mailbox.helpers';
import {MinioService} from '@appServices/minio/minio.service';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';
import ArchivoExtensionsBuscarArchivoClienteParams = SistemaArchivosService.ArchivoExtensionsBuscarArchivoClienteParams;

const FILE_NAME = 'mailbox.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class MailboxEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private catalogosService: apiCatalogos.CatalogosService,
    private sistemaUsuariosService: apiCatalogos.SistemaUsuariosService,
    private sistemaConfiguracionClientesService: apiCatalogos.ConfiguracionClientesService,
    private sistemaCorreosService: apiCatalogos.SistemaCorreosService,
    private sistemaCorreosClientesService: apiCatalogos.SistemaCorreosMailBotsClientesService,
    private sistemaArchivosService: apiCatalogos.SistemaArchivosService,
    private sistemaProcesosPretramitarPedido: apiLogistica.ProcesosL04PretramitarPedidoService,
    private configuracionClientesCorreosService: apiCatalogos.ConfiguracionClientesCorreosService,
    private minioService: MinioService,
    private appService: CoreContainerService,
    private systemFileServices: apiCatalogs.SistemaArchivosService,
  ) {}

  // DOCS Obtiene la lista de correos
  getMailboxList = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          mailboxActions.GET_MAILBOX_LIST_LOAD,
          mailboxActions.SET_MAILBOX_SEARCH_TERM,
          mailboxActions.SET_ORDER_VALUE,
        ),
        withLatestFrom(
          this.store.select(mailboxSelectors.selectNeedsToReload),
          this.store.select(mailboxSelectors.selectQueryInfo),
        ),
        switchMap(([action, needsToReload, vCorreoClientQueryInfo]) => {
          if (needsToReload) {
            this.store.dispatch(
              mailboxActions.SET_IS_LOADING({
                isLoading: API_REQUEST_STATUS_LOADING,
              }),
            );
            return this.sistemaCorreosService
              .vCorreoRecibidoObjQueryResult(vCorreoClientQueryInfo)
              .pipe(
                map((response) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al obtener lista de correos.',
                    ),
                    response,
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));

                  if (
                    vCorreoClientQueryInfo.queryInfo.desiredPage === 1 &&
                    response.TotalResults !== 0
                  ) {
                    this.store.dispatch(mailboxActions.SET_LOAD_TOTAL_FOOTER());
                  }
                  const datos = addRowIndex(
                    vCorreoClientQueryInfo.queryInfo.desiredPage,
                    vCorreoClientQueryInfo.queryInfo.pageSize,
                    response.Results,
                  );
                  const datosRefactory = _map(datos, (o) => {
                    return {
                      ...o,
                      isSelected: false,
                    };
                  });
                  this.store.dispatch(
                    mailboxActions.GET_MAILBOX_LIST_SUCCESS({
                      mails: datosRefactory,
                    }),
                  );
                  this.store.dispatch(
                    mailboxActions.GET_MAILBOX_LIST_LENGHT_SUCCESS({
                      totalResults: response.TotalResults,
                    }),
                  );
                  this.store.dispatch(
                    mailboxActions.SET_IS_LOADING({
                      isLoading: API_REQUEST_STATUS_SUCCEEDED,
                    }),
                  );
                  this.store.dispatch(
                    mailboxActions.SET_NEEDS_TO_RELOAD({
                      needsToReload: false,
                    }),
                  );
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al obtener lista de correos.',
                    ),
                    error,
                  );
                  this.store.dispatch(
                    mailboxActions.SET_IS_LOADING({
                      isLoading: API_REQUEST_STATUS_FAILED,
                    }),
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                  this.store.dispatch(mailboxActions.GET_MAILBOX_LIST_FAILED());
                  return EMPTY;
                }),
              );
          } else {
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );

  // DOCS Se obtiene los totales del footer
  getTotalsFooter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mailboxActions.SET_LOAD_TOTAL_FOOTER),
      withLatestFrom(
        this.store.select(selectUser),
        this.store.select(mailboxSelectors.selectMailsByFunctionsFooter),
      ),
      mergeMap(([action, user, functionsBody]) => {
        functionsBody.IdUsuario = user.IdUsuario;
        return this.sistemaCorreosClientesService.CorreosClientesTotalesProcess(functionsBody).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los totales del footer.',
              ),
              response,
            );
            return mailboxActions.SET_SUCCESS_TOTAL_FOOTER({
              totalFooter: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener los totales del footer.',
              ),
              error,
            );
            this.store.dispatch(
              mailboxActions.SET_IS_MESSAGE_LOADING({
                isMessageLoading: false,
              }),
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // DOCS se marco como leido dependiendo de la funcion que tenga el usuario
  setMailReadByRol = createEffect(() =>
    this.actions$.pipe(
      ofType(mailboxActions.SET_MAIL_READ_BY_ROL),
      withLatestFrom(
        this.store.select(authSelectors.selectUserFunctions),
        this.store.select(mailboxSelectors.selectMailsByFunctions),
      ),
      mergeMap(([action, userFunctions, functionsBody]) => {
        const superusuario = findIndex(userFunctions, ENUM_USER_FUNCTIONS.functionSuper) !== -1;
        this.store.dispatch(mailboxActions.SET_IS_MESSAGE_LOADING({isMessageLoading: true}));
        if (!superusuario) {
          functionsBody = {
            ...functionsBody,
            IdCorreoRecibido: action.IdCorreoRecibido,
            CorreoRecibidoCliente: null,
            ListaArchivosComentariosOReferencias: null,
            ListaCorreoRecibidoCliente: null,
          };
          return this.sistemaCorreosClientesService
            .CorreoRecibidoClienteExtensionsMarcarLeidoMail(functionsBody)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al marcar el correo como leído.',
                  ),
                  response,
                );
                /*                if (functionsBody.ESAC) {
                  return mailboxActions.FIND_CLIENTS_WITH_SAME_MAIL_LOAD({
                    IdCorreoRecibido: action.IdCorreoRecibido,
                  });
                }*/
                return mailboxActions.GET_SELECTED_MAIL_LOAD({
                  mailId: action.IdCorreoRecibido,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al marcar el correo como leído.',
                  ),
                  error,
                );
                this.store.dispatch(
                  mailboxActions.SET_IS_MESSAGE_LOADING({
                    isMessageLoading: false,
                  }),
                );
                return of(mailboxActions.SET_MAIL_READ_BY_ROL_FAILED());
              }),
            );
        } else {
          return of(
            mailboxActions.GET_SELECTED_MAIL_LOAD({
              mailId: action.IdCorreoRecibido,
            }),
          );
        }
      }),
    ),
  );

  // DOCS: OBTIENE LOS CLIENTES ASOCIADOS AL CORREO SELECCIONADO
  getClientsWithSameMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mailboxActions.FIND_CLIENTS_WITH_SAME_MAIL_LOAD),
      withLatestFrom(
        this.store.select(mailboxSelectors.selectCurrentMail),
        this.store.select(mailboxSelectors.selectMailsByFunctions),
      ),
      mergeMap(([action, currentMail, functionsBody]) => {
        if (functionsBody.ESAC || functionsBody.EVI) {
          return this.configuracionClientesCorreosService
            .ClientesAsociadosCorreoObtenerClientesAsociadosCorreo(
              currentMail.vCorreoCliente.CorreoEmisor,
            )
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener clientes asociados al correo',
                  ),
                  response,
                );
                return mailboxActions.FIND_CLIENTS_WITH_SAME_MAIL_SUCCESS({
                  clients: _map(
                    response,
                    (o: Cliente): DropListOption => ({
                      value: o.IdCliente,
                      label: o.Nombre,
                    }),
                  ),
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener clientes asociados al correo',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        }
        return EMPTY;
      }),
    ),
  );

  // DOCS Se comienza a cargar los datos del correo seleccionado
  getSelectedMail = createEffect(
    () =>
      this.actions$.pipe(
        ofType(mailboxActions.GET_SELECTED_MAIL_LOAD),
        mergeMap(({mailId}) => {
          this.store.dispatch(mailboxActions.GET_SELECTED_MAIL_NULL());
          this.store.dispatch(mailboxActions.SET_IS_MESSAGE_LOADING({isMessageLoading: true}));
          return this.sistemaCorreosService.CorreoRecibidoObtener(mailId).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener datos generales del correo seleccionado.',
                ),
                response,
              );
              this.store.dispatch(
                mailboxActions.GET_SELECTED_MAIL_SUCCESS({
                  mail: response,
                }),
              );
              const selectedMail: SelectedMail = {
                CorreoRecibido: response,
              };
              return selectedMail;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener datos generales del correo seleccionado.',
                ),
                error,
              );
              this.store.dispatch(
                mailboxActions.SET_IS_MESSAGE_LOADING({
                  isMessageLoading: false,
                }),
              );
              return of(mailboxActions.GET_SELECTED_MAIL_FAILED());
            }),
          );
        }),
        // DOCS se obtiene el contenido del correo
        switchMap((selectedMail: SelectedMail) => {
          return this.sistemaCorreosService
            .CorreoRecibidoContenidoObtener(selectedMail.CorreoRecibido.IdCorreoRecibidoContenido)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener el contenido del correo seleccionado.',
                  ),
                  response,
                );
                this.store.dispatch(
                  mailboxActions.GET_MAIL_CONTENT_SUCCESS({
                    CorreoRecibidoCont: response,
                  }),
                );
                return selectedMail;
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener el contenido del correo seleccionado.',
                  ),
                  error,
                );
                this.store.dispatch(
                  mailboxActions.SET_IS_MESSAGE_LOADING({
                    isMessageLoading: false,
                  }),
                );
                return of(mailboxActions.GET_MAIL_CONTENT_FAILED());
              }),
            );
        }),
        // DOCS Se obtienen las clasificaciones
        switchMap((selectedMail: SelectedMail) => {
          const info = new FiltersOnlyActive();
          info.SortField = 'Posicion';
          info.SortDirection = 'asc';
          return this.catalogosService.catClasificacionCorreoRecibidoQueryResult(info).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el catalogo de clasificaciones.',
                ),
                response,
              );
              this.store.dispatch(
                mailboxActions.GET_MAILBOX_CLASSIFICATIONS_SUCCESS({
                  classifications: response.Results,
                  IdCorreoRecibido: selectedMail.CorreoRecibido.IdCorreoRecibido,
                }),
              );
              selectedMail = {
                ...selectedMail,
                catClasificacionCorreoRecibido: [...response.Results],
              };
              return selectedMail;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catalogo de clasificaciones.',
                ),
                error,
              );
              this.store.dispatch(
                mailboxActions.SET_IS_MESSAGE_LOADING({
                  isMessageLoading: false,
                }),
              );
              return of(mailboxActions.GET_MAILBOX_CLASSIFICATIONS_FAILED());
            }),
          );
        }),
        // DOCS se obtiene las referencias
        switchMap((selectedMail: SelectedMail) => {
          const request: any[] = _map(selectedMail.catClasificacionCorreoRecibido, (o) => {
            const info = new FiltersOnlyActive();
            info.Filters.push({
              NombreFiltro: 'IdCatClasificacionCorreoRecibido',
              ValorFiltro: o.IdCatClasificacionCorreoRecibido,
            });
            return this.catalogosService.catClasificacionCorreoRecibidoReferenciaQueryResult(info);
          });
          return forkJoin(request).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el catalogo de referencias.',
                ),
                response,
              );
              forEach(response, (o) => {
                if (o.Results.length > 0) {
                  this.store.dispatch(
                    mailboxActions.GET_MAILBOX_CLASSIFICATIONS_REFERENCES_SUCCESS({
                      referenceClassifications: o.Results,
                    }),
                  );
                }
              });
              return selectedMail;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catalogo de referencias.',
                ),
                error,
              );
              this.store.dispatch(
                mailboxActions.SET_IS_MESSAGE_LOADING({
                  isMessageLoading: false,
                }),
              );
              return of(mailboxActions.GET_MAILBOX_CLASSIFICATIONS_REFERENCES_FAILED());
            }),
          );
        }),
        switchMap((selectedMail: SelectedMail) => {
          const info = new FiltersOnlyActive();
          info.Filters.push({
            NombreFiltro: 'IdCorreoRecibido',
            ValorFiltro: selectedMail.CorreoRecibido.IdCorreoRecibido,
          });
          return this.sistemaCorreosClientesService.CorreoRecibidoClienteQueryResult(info).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las clasificaciones activas del correo seleccionado.',
                ),
                response,
              );
              _map(response.Results, (o: CorreoRecibidoCliente) => {
                this.store.dispatch(
                  mailboxActions.GET_MAIL_CLIENT_MAIL_SUCCESS({
                    CorreoRecibidoCliente: o,
                  }),
                );
                /*                this.store.dispatch(
                  mailboxActions.SET_PARAMETER_MAILBOT_OBJ({
                    obj: buildParametroGeneradorProcesoMailBot(
                      find(
                        selectedMail.catClasificacionCorreoRecibido,
                        (it: CatClasificacionCorreoRecibido) =>
                          it.IdCatClasificacionCorreoRecibido ===
                          o.IdCatClasificacionCorreoRecibido,
                      ),
                      o.IdCorreoRecibido,
                    ),
                  }),
                );*/
                forEach(selectedMail.catClasificacionCorreoRecibido, (i) => {
                  if (
                    o.IdCatClasificacionCorreoRecibido === i.IdCatClasificacionCorreoRecibido &&
                    i.ClasificacionDefault
                  ) {
                    this.store.dispatch(
                      mailboxActions.SET_MAILBOX_CLASSIFICATION_DEFAULT_IS_SELECTED({value: true}),
                    );
                  }
                });
              });
              selectedMail = {
                ...selectedMail,
                CorreoRecibidoCliente: [...response.Results],
              };
              return selectedMail;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las clasificaciones activas del correo seleccionado.',
                ),
                error,
              );
              this.store.dispatch(
                mailboxActions.SET_IS_MESSAGE_LOADING({
                  isMessageLoading: false,
                }),
              );
              return of(mailboxActions.GET_MAIL_CLIENT_MAIL_FAILED());
            }),
          );
        }),
        // DOCS Obtener correo recibido cliente referencia si es que ya tiene
        switchMap((selectedMail: SelectedMail) => {
          if (selectedMail.CorreoRecibidoCliente.length > 0) {
            const request: any[] = _map(selectedMail.CorreoRecibidoCliente, (o) => {
              const info = new FiltersOnlyActive();

              info.Filters.push({
                NombreFiltro: 'IdCorreoRecibidoCliente',
                ValorFiltro: o.IdCorreoRecibidoCliente,
              });
              return this.sistemaCorreosClientesService.CorreoRecibidoClienteReferenciaQueryResult(
                info,
              );
            });
            return forkJoin(request).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener las referencias de las clasificaciones activas del correo seleccionado.',
                  ),
                  response,
                );
                forEach(response, (o) => {
                  forEach(o.Results, (r) => {
                    this.store.dispatch(
                      mailboxActions.GET_MAIL_CLIENT_MAIL_REFERENCE_SUCCESS({
                        CorreoRecibidoClienteReferencia: r,
                      }),
                    );
                  });
                });
                this.store.dispatch(mailboxActions.SET_VIEWED_MAIL_LOAD());
                return selectedMail;
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener las referencias de las clasificaciones activas del correo seleccionado.',
                  ),
                  error,
                );
                this.store.dispatch(
                  mailboxActions.SET_IS_MESSAGE_LOADING({
                    isMessageLoading: false,
                  }),
                );
                return of(mailboxActions.GET_MAIL_FILES_FAILED());
              }),
            );
          } else {
            this.store.dispatch(mailboxActions.SET_VIEWED_MAIL_LOAD());
            return of({...selectedMail});
          }
        }),
        // DOCS se obtiene el cliente del correo
        switchMap((selectedMail: SelectedMail) => {
          return this.sistemaConfiguracionClientesService
            .ClienteObtener(
              selectedMail.CorreoRecibidoCliente[0].IdCliente
                ? selectedMail.CorreoRecibidoCliente[0].IdCliente
                : DEFAULT_UUID,
            )
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener el cliente del correo seleccionado.',
                  ),
                  response,
                );
                this.store.dispatch(
                  mailboxActions.GET_MAIL_CLIENT_SUCCESS({
                    IdCorreoRecibido: selectedMail.CorreoRecibidoCliente[0].IdCorreoRecibido,
                    Cliente: response,
                  }),
                );
                this.store.dispatch(
                  mailboxActions.FIND_CLIENTS_WITH_SAME_MAIL_LOAD({
                    IdCorreoRecibido: selectedMail.CorreoRecibido.IdCorreoRecibido,
                  }),
                );
                return selectedMail;
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener el cliente del correo seleccionado.',
                  ),
                  error,
                );
                this.store.dispatch(
                  mailboxActions.SET_IS_MESSAGE_LOADING({
                    isMessageLoading: false,
                  }),
                );
                return of(mailboxActions.GET_MAIL_CLIENT_FAILED());
              }),
            );
        }),
        // DOCS Se obtiene el ArchivoCorreoRecibido del correo seleccionado
        switchMap((selectedMail: SelectedMail) => {
          const info = new FiltersOnlyActive();

          info.Filters.push(
            {
              NombreFiltro: 'IdCorreoRecibido',
              ValorFiltro: selectedMail.CorreoRecibidoCliente[0].IdCorreoRecibido,
            },
            {
              NombreFiltro: 'Mostrar',
              ValorFiltro: true,
            },
          );
          return this.sistemaCorreosService.ArchivoCorreoRecibidoQueryResult(info).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener ArchivoCorreoRecibido del correo seleccionado.',
                ),
                response,
              );

              // TODO: return ArchivoCorreoRecibido[]
              selectedMail = {
                ...selectedMail,
                ArchivoCorreoRecibido: [...response.Results],
              };
              return selectedMail;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener ArchivoCorreoRecibido del correo seleccionado.',
                ),
                error,
              );
              this.store.dispatch(
                mailboxActions.SET_IS_MESSAGE_LOADING({
                  isMessageLoading: false,
                }),
              );
              return of(mailboxActions.GET_MAIL_FILES_ARRAY_FAILED());
            }),
          );
        }),
        // DOCS se obtienen los archivos adjuntos del correo
        switchMap((selectedMail: SelectedMail) => {
          if (selectedMail.ArchivoCorreoRecibido.length > 0) {
            const request: any[] = _map(selectedMail.ArchivoCorreoRecibido, (o) => {
              return this.sistemaArchivosService.ArchivoObtener(o.IdArchivo);
            });
            return forkJoin(request).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener los archivos adjuntos del correo seleccionado.',
                  ),
                  response,
                );
                forEach(response, (o, index) => {
                  this.store.dispatch(
                    mailboxActions.GET_MAIL_FILES_SUCCESS({
                      Archivo: o,
                      IdArchivoCorreoRecibido:
                        selectedMail.ArchivoCorreoRecibido[index].IdArchivoCorreoRecibido,
                    }),
                  );
                });
                this.store.dispatch(
                  mailboxActions.GET_CLIENT_OC_PENDING_LOAD({
                    IdCliente: selectedMail.CorreoRecibidoCliente[0].IdCliente,
                  }),
                );
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener los archivos adjuntos del correo seleccionado.',
                  ),
                  error,
                );
                this.store.dispatch(
                  mailboxActions.SET_IS_MESSAGE_LOADING({
                    isMessageLoading: false,
                  }),
                );
                return of(mailboxActions.GET_MAIL_FILES_FAILED());
              }),
            );
          } else {
            this.store.dispatch(mailboxActions.SET_VIEWED_MAIL_LOAD());
            this.store.dispatch(
              mailboxActions.GET_CLIENT_OC_PENDING_LOAD({
                IdCliente: selectedMail.CorreoRecibidoCliente[0].IdCliente,
              }),
            );
            return EMPTY;
          }
        }),
        catchError((error) => {
          this.logger.debug(
            servicesLogger.generateMessage(
              FILE_NAME,
              servicesLogger.LOG_FAILED,
              'Al obtener el correo seleccionado.',
            ),
            error,
          );
          this.store.dispatch(mailboxActions.SET_IS_MESSAGE_LOADING({isMessageLoading: false}));
          return of(mailboxActions.GET_SELECTED_MAIL_FAILED());
        }),
      ),
    {dispatch: false},
  );

  // DOCS Se obtienen el cliente con oc pendiente
  getClientOCPending = createEffect(() =>
    this.actions$.pipe(
      ofType(mailboxActions.GET_CLIENT_OC_PENDING_LOAD),
      withLatestFrom(
        this.store.select(mailboxSelectors.selectCurrentMail),
        this.store.select(mailboxSelectors.selectIsUserESAC),
        this.store.select(mailboxSelectors.selectIsUserCoordinadorDeServicioAlCliente),
      ),
      mergeMap(([Cliente, currentMail, isUserESAC, isUserCoordinadorDeServicioAlCliente]) => {
        const info = new FiltersOnlyActive();
        info.Filters.push({
          NombreFiltro: 'IdCliente',
          ValorFiltro: Cliente.IdCliente,
        });
        return this.sistemaConfiguracionClientesService
          .vClienteOrdenesDeCompraQueryResult(info)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el numero de OC Pendientes del correo seleccionado.',
                ),
                response,
              );
              this.store.dispatch(
                mailboxActions.GET_CLIENT_OC_PENDING_SUCCESS({
                  OCPending: response.Results[0].OCPendientesAjuste,
                }),
              );
              if (
                response.Results[0].OCPendientesAjuste > 0 &&
                (isUserESAC || isUserCoordinadorDeServicioAlCliente)
              ) {
                this.store.dispatch(mailboxActions.BLOCK_CLASSIFICATIONS_EDITION({value: true}));
              }
              return mailboxActions.GET_USER_ERROR_CARTERA_LOAD();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el numero de OC Pendientes del correo seleccionado.',
                ),
                error,
              );
              this.store.dispatch(
                mailboxActions.SET_IS_MESSAGE_LOADING({
                  isMessageLoading: false,
                }),
              );
              this.store.dispatch(mailboxActions.GET_CLIENT_OC_PENDING_FAILED());
              return of(mailboxActions.GET_USER_ERROR_CARTERA_LOAD());
            }),
          );
      }),
    ),
  );

  // DOCS se obtienen los clientes para cargar el drop de error de cartera
  getUsersErrorCartera = createEffect(() =>
    this.actions$.pipe(
      ofType(mailboxActions.GET_USER_ERROR_CARTERA_LOAD),
      withLatestFrom(
        this.store.select(mailboxSelectors.selectCurrentMail),
        this.store.select(authSelectors.selectUser),
      ),
      mergeMap(([action, currentMail, user]) => {
        const info = new FiltersOnlyActive();
        info.Filters.push(
          {
            NombreFiltro: 'IdCliente',
            ValorFiltro: currentMail.Cliente?.IdCliente,
          },
          {
            NombreFiltro: user.Funciones[0],
            ValorFiltro: true,
          },
        );
        return this.sistemaUsuariosService.UsuarioQueryResult(info).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los usuarios para error de cartera.',
              ),
              response,
            );
            this.store.dispatch(mailboxActions.SET_IS_MESSAGE_LOADING({isMessageLoading: false}));
            // TODO cambiar funcion del usuario por texto legible sin PascalCase (AlanFernandez)
            this.store.dispatch(
              mailboxActions.GET_USER_ERROR_CARTERA_SUCCESS({
                usersWalletError: _map(
                  filter(response.Results, (o: Usuario) => o.IdUsuario !== user.IdUsuario),
                  (o: Usuario) => ({
                    value: o.IdUsuario,
                    label: o.NombreCompleto,
                  }),
                ),
              }),
            );
            return mailboxActions.SET_VIEWED_MAIL_LOAD();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener los usuarios para error de cartera.',
              ),
              error,
            );
            this.store.dispatch(mailboxActions.SET_IS_MESSAGE_LOADING({isMessageLoading: false}));
            return of(mailboxActions.GET_USER_ERROR_CARTERA_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS se obtiene la lista de clientes con oc pendientes
  getListOfClientOCPending = createEffect(() =>
    this.actions$.pipe(
      ofType(mailboxActions.GET_LIST_CLIENT_OC_PENDING_LOAD),
      withLatestFrom(
        this.store.select(mailboxSelectors.selectCurrentMail),
        this.store.select(mailboxSelectors.selectOCPending),
      ),
      mergeMap(([action, currentMail, ocPending]) => {
        if (ocPending.needsToReload) {
          this.store.dispatch(SET_LOADING({payload: true}));
          const info = new FiltersOnlyActive();
          info.SortField = 'FechaEstimadaAjuste';
          info.SortDirection = 'asc';
          info.Filters.push(
            {
              NombreFiltro: 'AjustePendiente',
              ValorFiltro: true,
            },
            {
              NombreFiltro: 'Activo',
              ValorFiltro: true,
            },
            {
              NombreFiltro: 'IdCliente',
              ValorFiltro: currentMail.Cliente.IdCliente,
            },
          );
          return this.sistemaProcesosPretramitarPedido.ppPedidoQueryResult(info).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la lista de OC Pendientes del correo seleccionado.',
                ),
                response,
              );
              this.store.dispatch(
                mailboxActions.GET_LIST_CLIENT_OC_PENDING_SUCCESS({
                  OCPendingList: response.Results as PpPedidoCustom[],
                }),
              );
              this.store.dispatch(
                mailboxActions.SET_OC_PENDING_NEEDS_TO_RELOAD({
                  needsToReload: false,
                }),
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return mailboxActions.SET_IS_MESSAGE_LOADING({
                isMessageLoading: false,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la lista de OC Pendientes del correo seleccionado.',
                ),
                error,
              );
              this.store.dispatch(
                mailboxActions.SET_IS_MESSAGE_LOADING({
                  isMessageLoading: false,
                }),
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(mailboxActions.GET_LIST_CLIENT_OC_PENDING_FAILED());
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  // DOCS se marca como leido el correo
  setViewedMail = createEffect(() => {
    return this.actions$.pipe(
      ofType(mailboxActions.SET_VIEWED_MAIL_LOAD),
      withLatestFrom(this.store.select(mailboxSelectors.selectCurrentMail)),
      mergeMap(([action, mail]) => {
        return of(mailboxActions.SET_VIEWED_MAIL_SUCCESS({mail}));
      }),
    );
  });

  // DOCS se obtiene la url del archivo seleccionado
  getUrlFileToShow = createEffect(
    () =>
      this.actions$.pipe(
        ofType(mailboxActions.GET_URL_FILE_LOAD),
        mergeMap(({IdArchivo, fileType}) => {
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(IdArchivo).pipe(
            map(async (response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la url del archivo seleccionado.',
                ),
                response,
              );
              const Url: any = await convertPDFFileFromURLToBase64(response.Url, true);
              const extension: string = await getOnlyFileExtension(response.FileKey);
              if (fileType === 'file') {
                this.store.dispatch(mailboxActions.GET_URL_FILE_SUCCESS({IdArchivo, Url}));
                this.store.dispatch(
                  mailboxActions.SET_FILE_OC_IS_PREVIEW({
                    fileType: 'file',
                    value: true,
                  }),
                );
                this.store.dispatch(
                  mailboxActions.SET_FILE_OC_IS_ACTIVE({
                    fileType: 'file',
                    value: true,
                  }),
                );
                this.store.dispatch(
                  mailboxActions.SET_FILE_OC_LOADING({
                    fileType: 'file',
                    value: false,
                  }),
                );
              } else if (fileType === 'oc') {
                this.store.dispatch(
                  mailboxActions.GET_URL_OC_PENDING_SUCCESS({
                    IdArchivo,
                    FileKey: response.FileKey,
                    Url,
                  }),
                );
                this.store.dispatch(
                  mailboxActions.SET_FILE_OC_IS_PREVIEW({
                    fileType: 'oc',
                    value: true,
                  }),
                );
                if (extension === 'pdf') {
                  this.store.dispatch(
                    mailboxActions.SET_FILE_OC_IS_ACTIVE({
                      fileType: 'oc',
                      value: true,
                    }),
                  );
                }
                this.store.dispatch(
                  mailboxActions.SET_FILE_OC_LOADING({
                    fileType: 'oc',
                    value: false,
                  }),
                );
              }
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la url del archivo seleccionado.',
                ),
                error,
              );
              if (fileType === 'file') {
                this.store.dispatch(
                  mailboxActions.SET_FILE_OC_IS_ACTIVE({
                    fileType: 'file',
                    value: true,
                  }),
                );
                this.store.dispatch(
                  mailboxActions.SET_FILE_OC_LOADING({
                    fileType: 'file',
                    value: false,
                  }),
                );
                this.store.dispatch(
                  mailboxActions.SET_FILE_OC_MESSAGE({
                    fileType: 'file',
                    message: 'ARCHIVO NO ENCONTRADO',
                  }),
                );
              } else if (fileType === 'oc') {
                this.store.dispatch(
                  mailboxActions.SET_FILE_OC_IS_ACTIVE({
                    fileType: 'oc',
                    value: true,
                  }),
                );
                this.store.dispatch(
                  mailboxActions.SET_FILE_OC_LOADING({
                    fileType: 'oc',
                    value: false,
                  }),
                );
                this.store.dispatch(
                  mailboxActions.SET_FILE_OC_MESSAGE({
                    fileType: 'oc',
                    message: 'ARCHIVO NO ENCONTRADO',
                  }),
                );
              }
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(mailboxActions.GET_URL_FILE_FAILED());
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  // DOCS se crea la url para la descargar del archivo
  downloadFile = createEffect(() =>
    this.actions$.pipe(
      ofType(mailboxActions.GET_URL_TO_DOWNLOAD_FILE_LOAD),
      mergeMap((action) => {
        return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener la url para descargar el archivo.',
              ),
              response,
            );
            return mailboxActions.GET_URL_TO_DOWNLOAD_FILE_SUCCESS({
              IdArchivo: response.IdArchivo,
              Url: response.Url,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener la url para descargar el archivo.',
              ),
              error,
            );
            return of(mailboxActions.GET_URL_TO_DOWNLOAD_FILE_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS Se elimina un mail
  deleteMail = createEffect(() =>
    this.actions$.pipe(
      ofType(mailboxActions.DELETE_MAIL_LOAD),
      withLatestFrom(this.store.select(mailboxSelectors.selectIdCurrentMail)),
      mergeMap(([{spam}, IdCorreoRecibido]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const params: GMCorreoRecibidoSpam = {
          IdCorreoRecibido,
          EsSpam: spam,
        };
        return this.sistemaCorreosService.CorreoRecibidoDesactivaYSpamCorreoRecibido(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al eliminar el correo seleccionado.',
              ),
              response,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(mailboxActions.DELETE_MAIL_SUCCESS());
            this.store.dispatch(mailboxActions.SET_MAIL_IS_SELECTED({mailIsSelected: false}));
            this.store.dispatch(mailboxActions.SET_CURRENT_PAGE({currentPage: 1}));
            this.store.dispatch(mailboxActions.GET_MAILBOX_LIST_NULL());
            this.store.dispatch(mailboxActions.SET_NEEDS_TO_RELOAD({needsToReload: true}));
            this.store.dispatch(mailboxActions.GET_MAILBOX_LIST_LOAD({isFirstPage: true}));
            return SET_LOADING_SUCCESS({
              active: true,
              message: params.EsSpam
                ? 'Has eliminado este correo y lo has marcado como spam'
                : 'Has eliminado un correo',
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al eliminar el correo seleccionado.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(mailboxActions.DELETE_MAIL_FAILED());
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // NUEVO EFECTO DE GUARDADO
  sendMail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(mailboxActions.SEND_MAIL_LOAD),
        withLatestFrom(
          this.store.select(mailboxSelectors.selectedCurrentMailClientReceiveMail),
          this.store.select(mailboxSelectors.selectCurrentMail),
        ),
        mergeMap(([action, clientMail, selectedMail]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          // DOCS: Dividir comentarios, referencias, con archivos, sin archivos etc.
          let reclassifiedMail: ReclassifiedMail = {
            selectedMail,
            classifications: clientMail,
            ...separateReferencesComments(clientMail),
          };
          // DOCS: Comprobar si el archivo ya existe / comentarios
          if (!isEmpty(reclassifiedMail.commentsFiles.files)) {
            const filesSearchRequest: any[] = _map(reclassifiedMail.commentsFiles.files, (o) => {
              const params: ArchivoExtensionsBuscarArchivoClienteParams = {
                idCliente: reclassifiedMail.selectedMail.Cliente.IdCliente,
                hash: o.hash,
              };
              return this.sistemaArchivosService.ArchivoExtensionsBuscarArchivoCliente(params);
            });
            return forkJoin(filesSearchRequest).pipe(
              map((response: Archivo[]) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al comprobar si el archivo ya existe (comentarios).',
                  ),
                  response,
                );
                reclassifiedMail = {
                  ...reclassifiedMail,
                  commentsFiles: {
                    ...reclassifiedMail.commentsFiles,
                    files: _map(reclassifiedMail.commentsFiles.files, (o, index) => {
                      return {
                        ...o,
                        IdArchivo: response[index] !== null ? response[index].IdArchivo : null,
                      };
                    }),
                  },
                };
                return {...reclassifiedMail};
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al comprobar si el archivo ya existe (comentarios).',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return of(mailboxActions.CATCH_MAIL_ERROR({error}));
              }),
            );
          } else {
            return of({...reclassifiedMail});
          }
        }),
        // DOCS: Comprobar si el archivo ya existe / referencias
        switchMap((reclassifiedMail: ReclassifiedMail) => {
          if (!isEmpty(reclassifiedMail.referencesFiles.files)) {
            const filesSearchRequest: any[] = _map(reclassifiedMail.referencesFiles.files, (o) => {
              const params: ArchivoExtensionsBuscarArchivoClienteParams = {
                idCliente: reclassifiedMail.selectedMail.Cliente.IdCliente,
                hash: o.hash,
              };
              return this.sistemaArchivosService.ArchivoExtensionsBuscarArchivoCliente(params);
            });
            return forkJoin(filesSearchRequest).pipe(
              map((response: Archivo[]) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al comprobar si el archivo ya existe (referencias).',
                  ),
                  response,
                );
                reclassifiedMail = {
                  ...reclassifiedMail,
                  referencesFiles: {
                    ...reclassifiedMail.referencesFiles,
                    files: _map(reclassifiedMail.referencesFiles.files, (o, index) => {
                      return {
                        ...o,
                        IdArchivo: response[index] !== null ? response[index].IdArchivo : null,
                      };
                    }),
                  },
                };
                return {...reclassifiedMail};
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al comprobar si el archivo ya existe (referencias).',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return of(mailboxActions.CATCH_MAIL_ERROR({error}));
              }),
            );
          } else {
            return of({...reclassifiedMail});
          }
        }),
        // DOCS: Guardado archivos
        switchMap(async (reclassifiedMail: ReclassifiedMail) => {
          // DOCS: Si tiene comentarios con archivos
          if (!isEmpty(reclassifiedMail.commentsFiles)) {
            const notDuplicated: any[] = filter(
              reclassifiedMail.commentsFiles.files,
              (o) => o.IdArchivo === null,
            );
            // TODO: Cambiar por función que ya sube todos los archivos en un solo paquete
            for (let i = 0; i < notDuplicated.length; i++) {
              const date = new Date();
              const fileName = `${date.getFullYear()}/${
                reclassifiedMail.selectedMail.CorreoRecibido.IdCorreoRecibido
              }/${Date.now()}/${notDuplicated[i].file.name}`;

              const fileUploaded: ArchivoDetalle = await this.minioService
                .uploadFile(notDuplicated[i].file, fileName, MINIO_BUCKETS.MailBot)
                .catch((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al cargar los archivos al servidor.',
                    ),
                    error,
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                  this.store.dispatch(
                    SET_LOADING_ERROR({
                      active: true,
                      message: 'Ha ocurrido un error al subir los archivos al servidor',
                    }),
                  );
                  return null;
                });
              // DOCS: Si falló el guardado devolvemos null para interrumpir el guardado
              if (!fileUploaded) {
                reclassifiedMail = null;
              } else {
                let assigned = false;
                reclassifiedMail = {
                  ...reclassifiedMail,
                  commentsFiles: {
                    ...reclassifiedMail.commentsFiles,
                    files: _map(
                      reclassifiedMail.commentsFiles.files,
                      (o: FileCustom): FileCustom => {
                        if (!assigned && o.IdArchivo === null) {
                          assigned = true;
                          return {
                            ...o,
                            IdArchivo: fileUploaded.IdArchivo,
                          };
                        }
                        return {
                          ...o,
                        };
                      },
                    ),
                  },
                };
              }
            }
          }
          // DOCS: Si tiene referencias con comentarios
          if (!isEmpty(reclassifiedMail?.referencesFiles)) {
            const notDuplicated: any[] = filter(
              reclassifiedMail.referencesFiles.files,
              (o) => o.IdArchivo === null,
            );
            // TODO: Cambiar por función que ya sube todos los archivos en un solo paquete
            for (let i = 0; i < notDuplicated.length; i++) {
              const date = new Date();
              const fileName = `${date.getFullYear()}/${
                reclassifiedMail.selectedMail.CorreoRecibido.IdCorreoRecibido
              }/${Date.now()}/${notDuplicated[i].file.name}`;

              const fileUploaded: ArchivoDetalle = await this.minioService
                .uploadFile(notDuplicated[i].file, fileName, MINIO_BUCKETS.MailBot)
                .catch((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al cargar los archivos al servidor.',
                    ),
                    error,
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                  this.store.dispatch(
                    SET_LOADING_ERROR({
                      active: true,
                      message: 'Ha ocurrido un error al subir los archivos al servidor',
                    }),
                  );
                  return null;
                });
              // DOCS: Si falló el guardado devolvemos null para interrumpir el guardado
              if (!fileUploaded) {
                reclassifiedMail = null;
              } else {
                let assigned = false;
                reclassifiedMail = {
                  ...reclassifiedMail,
                  referencesFiles: {
                    ...reclassifiedMail.referencesFiles,
                    files: _map(
                      reclassifiedMail.referencesFiles.files,
                      (o: FileCustom): FileCustom => {
                        if (!assigned && o.IdArchivo === null) {
                          assigned = true;
                          return {
                            ...o,
                            IdArchivo: fileUploaded.IdArchivo,
                          };
                        }
                        return {
                          ...o,
                        };
                      },
                    ),
                  },
                };
              }
            }
          }
          return reclassifiedMail;
        }),
        withLatestFrom(this.store.select(selectUserFunctions)),
        switchMap(([reclassifiedMail, functions]: [ReclassifiedMail, Array<string>]) => {
          if (!reclassifiedMail) {
            return EMPTY;
          }
          this.store.dispatch(
            mailboxActions.PROCESS_MAIL_LOAD({
              processMailObj: buildParametroGeneradorProcesoMailBot(reclassifiedMail, functions),
            }),
          );
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  processMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mailboxActions.PROCESS_MAIL_LOAD),
      withLatestFrom(
        this.store.select(mailboxSelectors.selectedClientToDrop),
        this.store.select(mailboxSelectors.selectCurrentMail),
      ),
      mergeMap(([{processMailObj}, selectedDropClient, mail]) => {
        processMailObj = {
          ...processMailObj,
          IdCliente:
            selectedDropClient && processMailObj.CorreoRecibidoCliente
              ? selectedDropClient?.value !== processMailObj?.CorreoRecibidoCliente?.IdCliente
                ? selectedDropClient?.value
                : null
              : selectedDropClient?.value !== mail.Cliente.IdCliente
              ? selectedDropClient?.value
              : null,
        };
        return this.sistemaCorreosClientesService
          .CorreoRecibidoClienteExtensionsProcesarTransaccion(processMailObj)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar clasificaciones',
                ),
                response,
              );
              this.store.dispatch(mailboxActions.SET_CURRENT_PAGE({currentPage: 1}));
              this.store.dispatch(mailboxActions.GET_MAILBOX_LIST_NULL());
              this.store.dispatch(
                mailboxActions.SET_NEEDS_TO_RELOAD({
                  needsToReload: true,
                }),
              );
              this.store.dispatch(mailboxActions.GET_MAILBOX_LIST_LOAD({isFirstPage: true}));
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has finalizado un correo',
                }),
              );
              return mailboxActions.SET_MAIL_IS_SELECTED({mailIsSelected: false});
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar clasificaciones',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );

  viewFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(mailboxActions.VIEW_FILE_LOAD),
        mergeMap((action) => {
          this.appService.setFile({isLoading: true});
          return this.systemFileServices.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response: ArchivoDetalle) => {
              let base64 = null;
              if (response && response.Url) {
                if (isPdf(action.ext)) {
                  base64 = await convertPDFFileFromURLToBase64(response.Url, true);
                }
                if (isImage(action.ext)) {
                  base64 = await getBase64FromUrl(response.Url, action.ext);
                }
              }
              this.appService.setFile({
                ...response,
                nombre: getNameFile(response?.FileKey),
                archivoBase64: base64,
                isPdf: isPdf(action.ext),
                isLoading: false,
              });
            }),
          );
        }),
      ),
    {dispatch: false},
  );
}
