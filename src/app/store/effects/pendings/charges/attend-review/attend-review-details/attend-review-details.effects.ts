import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {
  catchError,
  delay,
  map,
  mergeMap,
  repeatWhen,
  takeWhile,
  withLatestFrom,
} from 'rxjs/operators';
import {EMPTY, lastValueFrom, of} from 'rxjs';
import * as servicesLogger from '@appUtil/logger';
import {MinioService} from '@appServices/minio/minio.service';
import {extractID} from '@appUtil/util';
import {map as _map} from 'lodash-es';

/*Selectors Imports*/
import {attendViewDetailsSelectors} from '@appSelectors/pendings/charges/attend-review';
/*Actions Import*/
import * as utilsActions from '@appActions/utils/utils.action';
import {SET_LOADING} from '@appActions/utils/utils.action';
import {attendReviewDetailsActions} from '@appActions/pendings/charges/attend-review';

/*Models Imports*/
import * as apiFinance from 'api-finanzas';
import {FccRevisionProgramadaArchivo} from 'api-finanzas';

import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
  MINIO_BUCKETS,
  TIMER_SCHEDULE,
  TYPE_OF_DOCUMENT_BILL_TO_GENERATE_PDF,
} from '@appUtil/common.protocols';
import * as apiCatalogs from 'api-catalogos';
import * as api from 'api-catalogos';
import {ArchivoDetalle, DireccionClienteDetalle} from 'api-catalogos';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {ContactoDetalleObj, DatosFacturacionClienteDetalle} from 'api-logistica';
import {
  IBills,
  IProgrammingReview,
} from '@appModels/store/pendings/charges/attend-review/attend-review-details/attend-review-details.models';
import {convertPDFFileFromURLToBase64} from '@appUtil/files';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'attend-review-details.effects.ts';

@Injectable()
export class AttendReviewDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private minioService: MinioService,
    private chargeServices: apiFinance.CobrosService,
    private contactServices: apiCatalogs.ConfiguracionContactosService,
    private configAddressServices: apiCatalogs.ConfiguracionClientesDireccionesService,
    private chargeClientServices: apiFinance.CobranzaClientesRevisionService,
    private configClientConfigServices: apiCatalogs.ConfiguracionClientesConfiguracionService,
    private costumerCollectionMonitoringServices: apiFinance.CobranzaClientesMonitoreoCobrosService,
    private sistemaArchivosPDFsService: apiCatalogs.SistemaArchivosPDFsService,
    private sistemaArchivosService: api.SistemaArchivosService,
    private sistemaServiciosSistemaService: api.SistemaServiciosSistemaService,
  ) {}

  initDetailView$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendReviewDetailsActions.SET_SELECTED_CLIENT),
      mergeMap((action) => {
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.attendReview.attendReview,
          appRoutes.attendReview.details,
        ]);

        this.store.dispatch(attendReviewDetailsActions.FETCH_ADDRESS_LOAD());
        this.store.dispatch(attendReviewDetailsActions.FETCH_BILLS_CLIENT_LOAD());
        return of(attendReviewDetailsActions.FETCH_INVOICES_LOAD());
      }),
    ),
  );
  /*TODO: Obtiene las proformas (facturas) de un cliente */
  fetchInvoicesAttend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        attendReviewDetailsActions.FETCH_INVOICES_LOAD,
        attendReviewDetailsActions.SET_OPTION_FILTER,
      ),
      withLatestFrom(this.store.select(attendViewDetailsSelectors.selectQueryInfo)),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          attendReviewDetailsActions.SET_REQUEST_STATUS({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.chargeServices.vTpProformaPedidoDetalleQueryResult(params).pipe(
          map((response) => {
            if (
              action.type === '[AttendReviewDetails] Fetch Invoices Load' &&
              response.TotalResults > 0
            ) {
              this.store.dispatch(
                attendReviewDetailsActions.SET_SELECTED_BILL({
                  bill: {
                    ...response.Results[0],
                    index: 1,
                    contact: {} as ContactoDetalleObj,
                    needToReload: true,
                    dataReview: {} as IProgrammingReview,
                    files: [],
                    url: null,
                    requestStatusFile: API_REQUEST_STATUS_DEFAULT,
                  },
                }),
              );
            }
            this.store.dispatch(
              attendReviewDetailsActions.SET_REQUEST_STATUS({
                status: API_REQUEST_STATUS_SUCCEEDED,
              }),
            );
            return attendReviewDetailsActions.FETCH_INVOICES_SUCCESS({
              bills: _map(
                response.Results,
                (item, index): IBills =>
                  /*FIXME: Quitar as IBills y llenar las propiedades que hacen falta*/
                  ({
                    ...item,
                    index: index + 1,
                    contact: {} as ContactoDetalleObj,
                    needToReload: true,
                    dataReview: {} as IProgrammingReview,
                    files: [],
                    url: null,
                  } as IBills),
              ),
            });
          }),
        );
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al obtener los clientes',
          ),
          error,
        );
        this.store.dispatch(
          attendReviewDetailsActions.SET_REQUEST_STATUS({
            status: API_REQUEST_STATUS_FAILED,
          }),
        );
        return of(attendReviewDetailsActions.FETCH_INVOICES_ERROR(error));
      }),
    ),
  );
  fetchContactAttend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        attendReviewDetailsActions.FETCH_CONTACT_LOAD,
        attendReviewDetailsActions.SET_SELECTED_BILL,
      ),
      withLatestFrom(this.store.select(attendViewDetailsSelectors.selectedBill)),
      mergeMap(([action, bill]) => {
        const params = new FiltersOnlyActive();
        if (bill.needToReload) {
          if (bill && bill.PedidosAsociados.length > 0) {
            // params.Filters.push({
            //   NombreFiltro: 'IdContactoCliente',
            //   ValorFiltro: bill.PedidosAsociados[0].IdContactoCliente,
            // });
            params.Filters = [
              {
                NombreFiltro: 'IdContactoCliente',
                ValorFiltro: bill.PedidosAsociados[0].IdContactoCliente,
              },
            ];
          }
          return this.contactServices.ContactoDetalleQueryResult(params).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el contacto del cliente',
                ),
                response,
              );
              this.store.dispatch(attendReviewDetailsActions.FETCH_DATA_REVIEW_LOAD());
              this.store.dispatch(attendReviewDetailsActions.CREATE_BILL_LOAD());
              return attendReviewDetailsActions.FETCH_CONTACT_SUCCESS({
                contact:
                  response.TotalResults > 0 ? response.Results[0] : ({} as ContactoDetalleObj),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el contacto del cliente',
                ),
                error,
              );
              return of(attendReviewDetailsActions.FETCH_CONTACT_ERROR(error));
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
  createBill$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendReviewDetailsActions.CREATE_BILL_LOAD),
      withLatestFrom(this.store.select(attendViewDetailsSelectors.selectedBill)),
      mergeMap(([action, bill]) => {
        this.store.dispatch(
          attendReviewDetailsActions.SET_REQUEST_STATUS_FILE({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        const body: apiCatalogs.ArchivoExportarPDFParameter = {
          TipoDocumento: TYPE_OF_DOCUMENT_BILL_TO_GENERATE_PDF,
          Parametros: {
            IdTPProformaPedido: bill.IdTPProformaPedido,
            IdTPPedido: bill.PedidosAsociados[0].IdTPPedido,
          },
          DestinoMinIO: {
            Key: `${new Date().getFullYear()}/${bill.NumeroFactura}.pdf`,
            Bucket: 'temporal',
          },
        };
        return this.sistemaArchivosPDFsService.ArchivoExportarPDFsExportarPDF(body).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al generar el PDF de la proforma',
              ),
              response,
            );
            this.store.dispatch(
              attendReviewDetailsActions.CHECK_GENERATE_PROFORMA_STATUS({
                idFile: response.IdArchivo,
              }),
            );
            return attendReviewDetailsActions.CREATE_BILL_LOAD_SUCCESS();
          }),
          catchError((error) => {
            this.store.dispatch(
              attendReviewDetailsActions.SET_REQUEST_STATUS_FILE({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );

            return EMPTY;
          }),
        );
      }),
    ),
  );
  checkGenerateProforma$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(attendReviewDetailsActions.CHECK_GENERATE_PROFORMA_STATUS),
        mergeMap(({idFile}) =>
          this.sistemaArchivosService.ArchivoObtener(idFile).pipe(
            repeatWhen((completed) => completed.pipe(delay(TIMER_SCHEDULE))),
            map((response) => response),
            takeWhile((file, counter = 0) => {
              if (counter < 6) {
                if (file.Sincronizado) {
                  this.store.dispatch(attendReviewDetailsActions.GET_URL_PROFORMA_SUCCESS());
                  this.store.dispatch(
                    attendReviewDetailsActions.GET_PROFORMA_FILE_DETAIL({
                      idFile: file.IdArchivo,
                    }),
                  );
                  return false;
                } else {
                  return true;
                }
              } else {
                // TODO: Se terminó el tiempo para recuperar el archivo
                this.store.dispatch(
                  attendReviewDetailsActions.SET_REQUEST_STATUS_FILE({
                    status: API_REQUEST_STATUS_FAILED,
                  }),
                );
                this.store.dispatch(
                  attendReviewDetailsActions.GET_PROCESO_SISTEMA_LOAD({
                    IdProcesoSistema: file.IdProcesoSistema,
                  }),
                );
                return false;
              }
            }),
          ),
        ),
      ),
    {dispatch: false},
  );
  getProcesoSistema$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendReviewDetailsActions.GET_PROCESO_SISTEMA_LOAD),
      mergeMap(({IdProcesoSistema}) => {
        return this.sistemaServiciosSistemaService.ProcesoSistemaObtener(IdProcesoSistema).pipe(
          map((response) => {
            const errorMessage =
              response.Etiqueta === null
                ? 'Ocurrió un error en el Servicio web'
                : response.Etiqueta;
            return utilsActions.SET_LOADING_ERROR({
              active: true,
              message: errorMessage,
            });
          }),
        );
      }),
    ),
  );
  getUrlProforma$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(attendReviewDetailsActions.GET_PROFORMA_FILE_DETAIL),
        mergeMap(({idFile}) => {
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(idFile).pipe(
            map(async (response) => {
              this.store.dispatch(
                attendReviewDetailsActions.SET_REQUEST_STATUS_FILE({
                  status: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              const url: any = await convertPDFFileFromURLToBase64(response.Url);
              this.store.dispatch(attendReviewDetailsActions.SET_URL_PROFORMA({url}));
              return attendReviewDetailsActions.GET_URL_PROFORMA_SUCCESS();
            }),
            catchError((error) => {
              this.store.dispatch(
                attendReviewDetailsActions.SET_REQUEST_STATUS_FILE({
                  status: API_REQUEST_STATUS_FAILED,
                }),
              );
              return EMPTY;
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  fetchDataReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendReviewDetailsActions.FETCH_DATA_REVIEW_LOAD),
      withLatestFrom(this.store.select(attendViewDetailsSelectors.selectedBill)),
      mergeMap(([action, bill]) => {
        if (bill.needToReload) {
          const params = new FiltersOnlyActive();
          params.Filters.push({
            NombreFiltro: 'IdTPProformaPedido',
            ValorFiltro: bill.IdTPProformaPedido,
          });
          params.desiredPage = 1;
          params.pageSize = 1;
          params.SortField = 'FechaRevision';
          params.SortDirection = 'Desc';
          return this.costumerCollectionMonitoringServices
            .fccRevisionProgramadaDetalleQueryResult(params)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener la revisión de la proforma',
                  ),
                  response,
                );
                return attendReviewDetailsActions.FETCH_DATA_REVIEW_SUCCESS({
                  dataReview:
                    response.TotalResults > 0
                      ? {
                          ...response.Results[0],
                          dateFormat: new Date(response.Results[0].FechaRevision),
                        }
                      : ({} as IProgrammingReview),
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener la revisión de la proforma',
                  ),
                  error,
                );
                return of(attendReviewDetailsActions.FETCH_DATA_REVIEW_ERROR(error));
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
  fetchAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendReviewDetailsActions.FETCH_ADDRESS_LOAD),
      withLatestFrom(this.store.select(attendViewDetailsSelectors.selectedClient)),
      mergeMap(([action, client]) => {
        const params = new FiltersOnlyActive();
        if (client) {
          params.Filters.push(
            {
              NombreFiltro: 'IdCliente',
              ValorFiltro: client.IdCliente,
            },
            {
              NombreFiltro: 'TipoDireccion',
              ValorFiltro: 'Revision',
            },
          );
        }
        params.desiredPage = 1;
        params.pageSize = 1;
        return this.configAddressServices.DireccionClienteDetalleQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener la dirección del cliente',
              ),
              response,
            );
            return attendReviewDetailsActions.FETCH_ADDRESS_SUCCESS({
              address:
                response.TotalResults > 0 ? response.Results[0] : ({} as DireccionClienteDetalle),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener la dirección del cliente',
              ),
              error,
            );
            return of(attendReviewDetailsActions.FETCH_ADDRESS_ERROR(error));
          }),
        );
      }),
    ),
  );
  billsOfClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendReviewDetailsActions.FETCH_BILLS_CLIENT_LOAD),
      withLatestFrom(this.store.select(attendViewDetailsSelectors.selectParamBills)),
      mergeMap(([action, params]) => {
        return this.configClientConfigServices
          .DatosFacturacionClienteDetalleQueryResult(params)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la datos de facturación del cliente',
                ),
                response,
              );
              return attendReviewDetailsActions.FETCH_BILLS_CLIENT_SUCCESS({
                billsOfClient:
                  response.TotalResults > 0
                    ? response.Results[0]
                    : ({} as DatosFacturacionClienteDetalle),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la datos de facturación del cliente',
                ),
                error,
              );
              return of(attendReviewDetailsActions.FETCH_BILLS_CLIENT_ERROR(error));
            }),
          );
      }),
    ),
  );
  saveScheduledReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendReviewDetailsActions.SAVE_SCHEDULE_REVIEW_LOAD),
      withLatestFrom(
        this.store.select(attendViewDetailsSelectors.selectParamsSave),
        this.store.select(attendViewDetailsSelectors.selectedBill),
      ),
      mergeMap(([action, body, bill]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.chargeClientServices.fccRevisionProgramadaGuardarOActualizar(body).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Guardado de la revisión',
              ),
              response,
            );
            if (
              (bill.TipoValidacion === 'Física' && bill.EstadoTPProformaPedidoEjecutada) ||
              bill.TipoValidacion === 'Digital' ||
              bill.TipoValidacion === 'Híbrida'
            ) {
              this.store.dispatch(
                attendReviewDetailsActions.SAVE_FILES_LOAD({
                  IdFCCRevisionProgramadaArchivo: extractID(response),
                }),
              );
            } else {
              this.store.dispatch(attendReviewDetailsActions.FETCH_INVOICES_LOAD());
              this.store.dispatch(SET_LOADING({payload: false}));
            }
            return attendReviewDetailsActions.SAVE_SCHEDULE_REVIEW_SUCCESS();
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(attendReviewDetailsActions.SAVE_SCHEDULE_REVIEW_ERROR(error));
          }),
        );
      }),
    ),
  );
  saveFiles$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(attendReviewDetailsActions.SAVE_FILES_LOAD),
        withLatestFrom(this.store.select(attendViewDetailsSelectors.selectedBill)),
        mergeMap(async ([action, bill]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          for (const file of bill.files) {
            const date = new Date();
            const filename = `${date.getFullYear()}/${bill.IdCliente}/${
              bill.IdTPProformaPedido
            }/${date.getTime()}/${file.name}`;
            const fileDetail: ArchivoDetalle = await this.minioService.uploadFile(
              file.file,
              filename,
              MINIO_BUCKETS.Charges,
            );
            const fccRevisionProgramada: FccRevisionProgramadaArchivo = {
              Activo: true,
              FechaRegistro: DEFAULT_DATE,
              FechaUltimaActualizacion: DEFAULT_DATE,
              IdArchivo: fileDetail.IdArchivo,
              IdFCCRevisionProgramada: DEFAULT_UUID,
              IdFCCRevisionProgramadaArchivo: action.IdFCCRevisionProgramadaArchivo,
            };
            const fccArchivoPagoClienteId = await lastValueFrom(
              this.chargeClientServices.fccRevisionProgramadaArchivoGuardarOActualizar(
                fccRevisionProgramada,
              ),
            );
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al subir archivo.',
              ),
              fccArchivoPagoClienteId,
            );
          }
          this.store.dispatch(SET_LOADING({payload: false}));
          this.store.dispatch(attendReviewDetailsActions.FETCH_INVOICES_LOAD());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
