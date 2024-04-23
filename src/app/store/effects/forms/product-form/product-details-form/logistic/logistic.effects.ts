/* Core Imports*/
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, forkJoin} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';

/* Dev Tools*/
import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';

/* Services */
import {MinioService} from '@appServices/minio/minio.service';
import {productFormActions, productLogisticActions} from '@appActions/forms/product-form';
import {productDetailsSelectors, productLogisticSelectors} from '@appSelectors/forms/product-form';
import * as apiCatalogs from 'api-catalogos';
import {ArchivoDetalle, ArchivoTratadosOtrosDetalle} from 'api-catalogos';
import {SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import {IUploadFileCustom} from '@appModels/files/files.models';
import {DEFAULT_UUID, MINIO_BUCKETS} from '@appUtil/common.protocols';
import {forEach, map as _map} from 'lodash-es';
import {extractID} from '@appUtil/util';

const FILE_NAME = 'Product-form-logistic';

@Injectable()
export class ProductsFormLogisticEffects {
  constructor(
    private store: Store,
    private action$: Actions,
    private logger: NGXLogger,
    private minioService: MinioService,
    private wizardService: apiCatalogs.ConfiguracionProductosWizardContenidoService,
    private productosService: apiCatalogs.ConfiguracionProductosService,
    private productosConfigService: apiCatalogs.ConfiguracionProductosTipoEspecificadoService,
    private configuracionArchivosProducto: apiCatalogs.ConfiguracionProductosArchivosService,
  ) {}

  // DOCS: OBTIENE DATOS DEL AGENTE ADUANAL
  fetchCustomAgent$ = createEffect(() =>
    this.action$.pipe(
      ofType(productLogisticActions.FETCH_CUSTOM_AGENT_LOAD),
      withLatestFrom(this.store.select(productLogisticSelectors.selectQueryInfoToCustomAgent)),
      mergeMap(([action, queryInfo]) => {
        return this.wizardService.ProductoTarifaAgenteAduanalObtener(queryInfo).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener agente aduanal',
              ),
              response,
            );
            return productLogisticActions.FETCH_CUSTOM_AGENT_SUCCESS({
              customAgenteData: response,
            });
          }),
        );
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_SUCCEEDED,
            'Al obtener agente aduanal',
          ),
          error,
        );
        return EMPTY;
      }),
    ),
  );

  // DOCS: Guardado de formulario
  savelogisticForm$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(productLogisticActions.SAVE_LOGISTIC_FORM_LOAD),
        withLatestFrom(
          this.store.select(productDetailsSelectors.selectProductDetails),
          this.store.select(productLogisticSelectors.selectLogisticFiles),
        ),
        mergeMap(async ([action, vProduct, logisticFiles]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          if (logisticFiles.ArchivoCertificadoLote !== null) {
            // DOCS: Guarda el archivo de certificado
            try {
              const fileName = `${new Date().getFullYear()}/${
                vProduct.IdProducto
              }/${new Date().getTime()}/${logisticFiles.ArchivoCertificadoLote.name}`;
              const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
                logisticFiles.ArchivoCertificadoLote,
                fileName,
                MINIO_BUCKETS.Products,
              );
              this.store.dispatch(
                productLogisticActions.SAVE_CERTIFICATE_FILE_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar achivo de certificado',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          } else {
            this.store.dispatch(productLogisticActions.SAVE_SECURITY_FILE_LOAD());
          }
        }),
      ),
    {dispatch: false},
  );

  saveProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(productLogisticActions.SAVE_CERTIFICATE_FILE_SUCCESS),
      withLatestFrom(this.store.select(productDetailsSelectors.selectProductDetails)),
      mergeMap(([action, vproduct]) => {
        return this.productosService.ProductoGuardarOActualizar(vproduct).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar producto',
              ),
              response,
            );
            return productLogisticActions.SAVE_PRODUCT_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar producto',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: true}));
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // DOCS: GUARDA HOJA DE SEGURIDAD
  saveSecurityFile$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          productLogisticActions.SAVE_PRODUCT_SUCCESS,
          productLogisticActions.SAVE_SECURITY_FILE_LOAD,
        ),
        withLatestFrom(
          this.store.select(productDetailsSelectors.selectProductDetails),
          this.store.select(productLogisticSelectors.selectLogisticFiles),
        ),
        mergeMap(async ([action, vProduct, logisticFiles]) => {
          if (logisticFiles.ArchivoHojaSeguridad !== null) {
            try {
              const fileName = `${new Date().getFullYear()}/${
                vProduct.IdProducto
              }/${new Date().getTime()}/${logisticFiles.ArchivoHojaSeguridad.name}`;
              const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
                logisticFiles.ArchivoHojaSeguridad,
                fileName,
                MINIO_BUCKETS.Products,
              );
              this.store.dispatch(
                productLogisticActions.SAVE_SECURITY_FILE_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar hoja de seguridad',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }
          }
          this.store.dispatch(productLogisticActions.SAVE_DATASHEET_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA ARCHIVO DE FICHA TECNICA
  savedatasheet$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(productLogisticActions.SAVE_DATASHEET_LOAD),
        withLatestFrom(
          this.store.select(productDetailsSelectors.selectProductDetails),
          this.store.select(productLogisticSelectors.selectLogisticFiles),
        ),
        mergeMap(async ([action, vProduct, logisticFiles]) => {
          if (logisticFiles.ArchivoFichaTecnica !== null) {
            try {
              const fileName = `${new Date().getFullYear()}/${
                vProduct.IdProducto
              }/${new Date().getTime()}/${logisticFiles.ArchivoFichaTecnica.name}`;
              const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
                logisticFiles.ArchivoFichaTecnica,
                fileName,
                MINIO_BUCKETS.Products,
              );
              this.store.dispatch(
                productLogisticActions.SAVE_DATASHEET_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar ficha tecnica',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }
          }
          this.store.dispatch(productLogisticActions.SAVE_TREATY_FILE_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA ARCHIVO TRATADO
  saveTreatyFile$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(productLogisticActions.SAVE_TREATY_FILE_LOAD),
        withLatestFrom(
          this.store.select(productDetailsSelectors.selectProductDetails),
          this.store.select(productLogisticSelectors.selectLogisticFiles),
        ),
        mergeMap(async ([action, vProduct, logisticFiles]) => {
          if (logisticFiles.ArchivoTratado !== null) {
            try {
              const fileName = `${new Date().getFullYear()}/${
                vProduct.IdProducto
              }/${new Date().getTime()}/${logisticFiles.ArchivoTratado.name}`;
              const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
                logisticFiles.ArchivoTratado,
                fileName,
                MINIO_BUCKETS.Products,
              );
              this.store.dispatch(
                productLogisticActions.SAVE_TREATY_FILE_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar archivo tratado',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }
          }
          this.store.dispatch(productLogisticActions.DISABLE_TREATY_FILES_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DESHABILITA ARCHIVOS DE TRATADOS
  disableFiles$ = createEffect(() =>
    this.action$.pipe(
      ofType(productLogisticActions.DISABLE_TREATY_FILES_LOAD),
      withLatestFrom(this.store.select(productDetailsSelectors.selectFilesToDelete)),
      mergeMap(([action, files]) => {
        if (files.length > 0) {
          const request = _map(files, (o: string) => {
            return this.configuracionArchivosProducto.ArchivoTratadosOtrosDesactivar(o);
          });
          return forkJoin(request).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al deshabilitar archivo',
                ),
                response,
              );
              return productLogisticActions.SAVE_OTHER_FILES_LOAD();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al deshabilitar archivo',
                ),
                error,
              );
              return EMPTY;
            }),
          );
        } else {
          this.store.dispatch(productLogisticActions.SAVE_OTHER_FILES_LOAD());
          return EMPTY;
        }
      }),
    ),
  );

  // DOCS: GUARDA ARREGLO DE ARCHIVOS PARA TRATADOS
  saveOtherFiles$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(productLogisticActions.SAVE_OTHER_FILES_LOAD),
        withLatestFrom(
          this.store.select(productDetailsSelectors.selectProductDetails),
          this.store.select(productLogisticSelectors.selectLogisticFiles),
          this.store.select(productLogisticSelectors.selectTypeName),
        ),
        mergeMap(async ([action, vProduct, logisticFiles, typeName]) => {
          if (logisticFiles.OtrosTratados.length > 0) {
            try {
              const updateFiles: Array<IUploadFileCustom> = [];
              forEach(logisticFiles.OtrosTratados, (o: File, index) => {
                const fileName = `${new Date().getFullYear()}/${
                  vProduct.IdProducto
                }/${new Date().getTime()}/${o.name}`;
                updateFiles.push({
                  file: o,
                  name: fileName,
                  destinyBucketName: MINIO_BUCKETS.Products,
                });
              });
              const filesUpdated = await this.minioService
                .uploadFiles(updateFiles)
                .catch((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al guardar otros tratados',
                    ),
                    error,
                  );
                  return [];
                });
              this.store.dispatch(
                productLogisticActions.SAVE_OTHER_FILES_SUCCESS({
                  otherFiles: filesUpdated,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar otros tratados',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }
          }
          this.store.dispatch(productLogisticActions.SAVE_PRODUCT_CONFIG_LOAD({typeName}));
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA OTROS TRATADOS
  savetreatylist$ = createEffect(() =>
    this.action$.pipe(
      ofType(productLogisticActions.SAVE_OTHER_FILES_SUCCESS),

      withLatestFrom(
        this.store.select(productDetailsSelectors.selectProductDetails),
        this.store.select(productLogisticSelectors.selectTypeName),
      ),
      mergeMap(([action, vProduct, typeName]) => {
        const otherFiles: Array<ArchivoDetalle> = action.otherFiles as Array<ArchivoDetalle>;
        let list: Array<ArchivoTratadosOtrosDetalle> = _map(
          otherFiles,
          (o: ArchivoDetalle): ArchivoTratadosOtrosDetalle => {
            return {
              Activo: true,
              IdProducto: vProduct.IdProducto,
              IdArchivo: o.IdArchivo,
              FechaRegistro: o.FechaRegistro,
              IdArchivoTratadosOtros: DEFAULT_UUID,
              FechaUltimaModificacion: o.FechaUltimaActualizacion,
              Archivo: o,
            };
          },
        );
        const request: Array<any> = _map(list, (o: ArchivoDetalle) => {
          return this.configuracionArchivosProducto.ArchivoTratadosOtrosGuardarOActualizar(o);
        });
        return forkJoin(request).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar otros tratados',
              ),
              response,
            );
            list = _map(list, (o: ArchivoTratadosOtrosDetalle, index) => {
              return {
                ...o,
                IdArchivoTratadosOtros: extractID(response[index]),
              };
            });
            this.store.dispatch(productLogisticActions.SAVE_TREATY_LIST_SUCCESS({list}));
            return productLogisticActions.SAVE_PRODUCT_CONFIG_LOAD({typeName});
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar otros tratados',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // DOCS: GUARDA CONFIGURACION DEL PRODUCTO
  saveProductconfig$ = createEffect(() =>
    this.action$.pipe(
      ofType(productLogisticActions.SAVE_PRODUCT_CONFIG_LOAD),
      withLatestFrom(this.store.select(productDetailsSelectors.selectProductDetails)),
      mergeMap(([action, vProduct]) => {
        if (vProduct.ProductoEstandar !== null) {
          return this.productosConfigService
            .ProductoEstandarGuardarOActualizar(vProduct.ProductoEstandar)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar configuracion del producto',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(productFormActions.SET_ENABLE_EDIT({enableEdit: false}));
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: 'Has guardado',
                  }),
                );
                return productLogisticActions.SAVE_PRODUCT_CONFIG_SUCCESS();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar configuracion del producto',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        }
        if (vProduct.ProductoPublicacion !== null) {
          return this.productosConfigService
            .ProductoPublicacionGuardarOActualizar(vProduct.ProductoPublicacion)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar configuracion del producto',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(productFormActions.SET_ENABLE_EDIT({enableEdit: false}));
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: 'Has guardado',
                  }),
                );
                return productLogisticActions.SAVE_PRODUCT_CONFIG_SUCCESS();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar configuracion del producto',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        }
        if (vProduct.ProductoLabware !== null) {
          return this.productosConfigService
            .ProductoLabwareGuardarOActualizar(vProduct.ProductoLabware)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar configuracion del producto',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(productFormActions.SET_ENABLE_EDIT({enableEdit: false}));
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: 'Has guardado',
                  }),
                );
                return productLogisticActions.SAVE_PRODUCT_CONFIG_SUCCESS();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar configuracion del producto',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        }
        if (vProduct.ProductoReactivo !== null) {
          return this.productosConfigService
            .ProductoReactivoGuardarOActualizar(vProduct.ProductoReactivo)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar configuracion del producto',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(productFormActions.SET_ENABLE_EDIT({enableEdit: false}));
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: 'Has guardado',
                  }),
                );
                this.store.dispatch(productFormActions.SET_ENABLE_EDIT({enableEdit: false}));
                return productLogisticActions.SAVE_PRODUCT_CONFIG_SUCCESS();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar configuracion del producto',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        }
        if (vProduct.ProductoDispositivoMedico !== null) {
          return this.productosConfigService
            .ProductoDispositivoMedicoGuardarOActualizar(vProduct.ProductoDispositivoMedico)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar configuracion del producto',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(productFormActions.SET_ENABLE_EDIT({enableEdit: false}));
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: 'Has guardado',
                  }),
                );
                this.store.dispatch(productFormActions.SET_ENABLE_EDIT({enableEdit: false}));
                return productLogisticActions.SAVE_PRODUCT_CONFIG_SUCCESS();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar configuracion del producto',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        }
      }),
    ),
  );
}
