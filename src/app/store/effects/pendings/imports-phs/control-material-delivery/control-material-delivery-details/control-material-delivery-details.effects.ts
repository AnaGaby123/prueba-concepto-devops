import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
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
import {EMPTY, of} from 'rxjs';
import {map as _map} from 'lodash-es';

/*Utils Imports*/
import * as servicesLogger from '@appUtil/logger';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  TIMER_SCHEDULE,
} from '@appUtil/common.protocols';

/*Selectors Imports*/
import {controlMaterialDeliveryDetailsSelectors} from '@appSelectors/pendings/imports-phs/control-material-delivery';
/*Actions Imports*/
import {controlMaterialDeliveryDetailsActions} from '@appActions/pendings/imports-phs/control-material-delivery';
import * as utilsActions from '@appActions/utils/utils.action';
import {SET_LOADING} from '@appActions/utils/utils.action';

/*Models Imports*/
import * as apiLogistic from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import * as api from 'api-catalogos';
import {convertPDFFileFromURLToBase64} from '@appUtil/files';
import {appRoutes} from '@appHelpers/core/app-routes';
import {IDispatchOrder} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery-details/control-material-delivery-details.models';

const FILE_NAME = '';

@Injectable()
export class ControlMaterialDeliveryDetailsEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private router: Router,
    private importAssistantServices: apiLogistic.ProcesosL07ImportacionesAsistenteImportacionesService,
    private importServices: apiLogistic.ProcesosL07ImportacionesService,
    private pdfFilesService: apiCatalogs.SistemaArchivosPDFsService,
    private sistemaArchivoService: apiCatalogs.SistemaArchivosService,
    private sistemaArchivosService: api.SistemaArchivosService,
  ) {}

  // DOCS: Effect para acceder al detalle de un agente y
  //  mantener en el estado el agente seleccionado
  initialView$ = createEffect(() =>
    this.action$.pipe(
      ofType(controlMaterialDeliveryDetailsActions.INITIAL_VIEW_DETAILS_LOAD),
      mergeMap((action) => {
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.controlMaterialDelivery.controlMaterialDelivery,
          appRoutes.controlMaterialDelivery.details,
        ]);
        return of(controlMaterialDeliveryDetailsActions.ACKNOWLEDGMENT_DISPATCH_ORDERS_LOAD());
      }),
    ),
  );
  // DOCS: Se consulta el servicio que devuelve
  //  un arreglo de las ordenes de despacho por agente
  fetchAcknowledgmentDispatchOrders$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        controlMaterialDeliveryDetailsActions.ACKNOWLEDGMENT_DISPATCH_ORDERS_LOAD,
        controlMaterialDeliveryDetailsActions.SET_PARAM_ORDER_LIST,
      ),
      withLatestFrom(
        this.store.select(controlMaterialDeliveryDetailsSelectors.selectParamsDispatchOrders),
      ),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          controlMaterialDeliveryDetailsActions.SET_API_REQUEST_STATUS({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.importAssistantServices.vGARImpOrdenDespachoQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta Ordenes de Despacho.',
              ),
              response,
            );
            this.store.dispatch(
              controlMaterialDeliveryDetailsActions.SET_API_REQUEST_STATUS({
                status: API_REQUEST_STATUS_SUCCEEDED,
              }),
            );
            const list = _map(response.Results, (order, index) => ({
              ...order,
              index: index + 1,
              numberOfPackages: 0,
              file: null,
            }));
            this.store.dispatch(
              controlMaterialDeliveryDetailsActions.SELECTED_ORDER({
                order: list.length > 0 ? list[0] : ({} as IDispatchOrder),
              }),
            );
            return controlMaterialDeliveryDetailsActions.ACKNOWLEDGMENT_DISPATCH_ORDERS_SUCCESS({
              orders: {
                TotalResults: response.TotalResults,
                Results: list,
              },
            });
          }),
          catchError((error) => {
            this.store.dispatch(
              controlMaterialDeliveryDetailsActions.SET_API_REQUEST_STATUS({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Consulta Ordenes de Despacho.',
              ),
              error,
            );
            return of(
              controlMaterialDeliveryDetailsActions.ACKNOWLEDGMENT_DISPATCH_ORDERS_ERROR(error),
            );
          }),
        );
      }),
    ),
  );
  // DOCS: Generar PDF Acuse de Recibo
  generatePDFAcknowledgment$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        controlMaterialDeliveryDetailsActions.GENERATE_ACKNOWLEDGMENT_LOAD,
        controlMaterialDeliveryDetailsActions.SELECTED_ORDER,
      ),
      withLatestFrom(
        this.store.select(controlMaterialDeliveryDetailsSelectors.selectDispatchOrder),
      ),
      mergeMap(([action, order]) => {
        this.store.dispatch(
          controlMaterialDeliveryDetailsActions.SET_STATUS_API_FILE({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        if (order.file) {
          return of(
            controlMaterialDeliveryDetailsActions.GENERATE_CONVERT_BASE64_LOAD({
              url: order.file.Url,
            }),
          );
        } else {
          const date = new Date();
          const body: apiCatalogs.ArchivoExportarPDFParameter = {
            TipoDocumento: 'AcuseReciboPharma',
            Parametros: {
              IdImpOrdenDespacho: order.IdImpOrdenDespacho,
              NoBultos: order.numberOfPackages.toString(),
            },
            DestinoMinIO: {
              Key: `${date.getFullYear()}/asistenteimportacion/${
                order.IdImpOrdenDespacho
              }/${date.getTime()}/${order.Folio}.pdf`,
              Bucket: 'temporal',
            },
          };
          return this.pdfFilesService.ArchivoExportarPDFsExportarPDF(body).pipe(
            map((response) => {
              this.store.dispatch(
                controlMaterialDeliveryDetailsActions.CHECK_FILE_LOAD({
                  idFile: response.IdArchivo,
                }),
              );
              return controlMaterialDeliveryDetailsActions.GENERATE_ACKNOWLEDGMENT_SUCCESS();
            }),
          );
        }
      }),
    ),
  );
  // DOCS: Consulta el Archivo para verificar que este sincronizado
  checkFile$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(controlMaterialDeliveryDetailsActions.CHECK_FILE_LOAD),
        mergeMap(({idFile}) =>
          this.sistemaArchivosService.ArchivoObtener(idFile).pipe(
            repeatWhen((completed) => completed.pipe(delay(TIMER_SCHEDULE))),
            map((response) => response),
            takeWhile((file, counter = 0) => {
              if (counter < 6) {
                if (file.Sincronizado) {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Obtener Sincronización del archivo',
                    ),
                    file,
                  );
                  this.store.dispatch(controlMaterialDeliveryDetailsActions.CHECK_FILE_SUCCESS());
                  this.store.dispatch(
                    controlMaterialDeliveryDetailsActions.GENERATE_FILE_DETAILS_LOAD({
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
                  controlMaterialDeliveryDetailsActions.CHECK_FILE_ERROR({
                    error: '',
                  }),
                );
                catchError((error) => of(utilsActions.SET_LOADING({payload: false})));
                return false;
              }
            }),
            catchError((error) => {
              this.store.dispatch(
                controlMaterialDeliveryDetailsActions.SET_STATUS_API_FILE({
                  status: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              return of(utilsActions.SET_LOADING({payload: false}));
            }),
          ),
        ),
      ),
    {dispatch: false},
  );

  // DOCS: Obtiene el detalle del archivo con respecto con el idArchivo
  fileDetails$ = createEffect(() =>
    this.action$.pipe(
      ofType(controlMaterialDeliveryDetailsActions.GENERATE_FILE_DETAILS_LOAD),
      mergeMap((action) => {
        return this.sistemaArchivoService.ArchivoExtensionsObtenerDetalle(action.idFile).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Obtener Detalle del achivo.',
              ),
              response,
            );
            this.store.dispatch(
              controlMaterialDeliveryDetailsActions.GENERATE_CONVERT_BASE64_LOAD({
                url: response.Url,
              }),
            );
            return controlMaterialDeliveryDetailsActions.GENERATE_FILE_DETAILS_SUCCESS({
              file: response,
            });
          }),
          catchError((error) => {
            this.store.dispatch(
              controlMaterialDeliveryDetailsActions.SET_STATUS_API_FILE({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Obtener Detalle del achivo',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );
  // DOCS: Se convierte y guarda el base64 del archivo
  convertBase64$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(controlMaterialDeliveryDetailsActions.GENERATE_CONVERT_BASE64_LOAD),
        mergeMap(async (action) => {
          let base64: string;
          if (action && action.url) {
            this.store.dispatch(
              controlMaterialDeliveryDetailsActions.SET_STATUS_API_FILE({
                status: API_REQUEST_STATUS_SUCCEEDED,
              }),
            );
            base64 = await convertPDFFileFromURLToBase64(action.url);
            return this.store.dispatch(
              controlMaterialDeliveryDetailsActions.GENERATE_CONVERT_BASE64_SUCCESS({base64}),
            );
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Guarda la orden despacho modificando los bultos
  saveGenerateAcknowledgment$ = createEffect(() =>
    this.action$.pipe(
      ofType(controlMaterialDeliveryDetailsActions.SAVE_LOAD),
      withLatestFrom(
        this.store.select(controlMaterialDeliveryDetailsSelectors.selectDispatchOrder),
      ),
      mergeMap(([action, order]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.importServices
          .impOrdenDespachoGuardarOActualizarResponse({
            ...order,
            Bultos: order.numberOfPackages,
            AcuseReciboGenerado: true,
          })
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Actualización de Importación Orden Despacho.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                controlMaterialDeliveryDetailsActions.ACKNOWLEDGMENT_DISPATCH_ORDERS_LOAD(),
              );
              return controlMaterialDeliveryDetailsActions.SAVE_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Actualización de Importación Orden Despacho.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(controlMaterialDeliveryDetailsActions.SAVE_ERROR(error));
            }),
          );
      }),
    ),
  );
}
