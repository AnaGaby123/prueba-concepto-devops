/* Core Imports*/
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {MINIO_BUCKETS} from '@appUtil/common.protocols';

/* Dev Tools*/
import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';

/* Services Imports*/
import {MinioService} from '@appServices/minio/minio.service';

/* Models*/
import * as apiCatalogs from 'api-catalogos';
import {ArchivoDetalle} from 'api-catalogos';
/* Selectors*/
import {
  productLogisticSelectors,
  productRegulationSelectors,
} from '@appSelectors/forms/product-form';
/* Actions*/
import {SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import {productFormActions, productRegulationActions} from '@appActions/forms/product-form';

const FILE_NAME = 'regulaion-restriction-non-tariff.effects.ts';

@Injectable()
export class RegulationRestrictionNonTariffEffects {
  constructor(
    private store: Store,
    private action$: Actions,
    private logger: NGXLogger,
    private minioService: MinioService,
    private sistemaArchivosService: apiCatalogs.SistemaArchivosService,
    private productosService: apiCatalogs.ConfiguracionProductosService,
    private productosConfigService: apiCatalogs.ConfiguracionProductosTipoEspecificadoService,
  ) {}

  // DOCS: GUARDA EN PRODUCTO
  saveProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(productRegulationActions.SAVE_REGULATION_DATA),
      withLatestFrom(this.store.select(productRegulationSelectors.selectProducto)),
      mergeMap(([action, proudcto]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.productosService.ProductoGuardarOActualizar(proudcto).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar producto',
              ),
              response,
            );
            return productRegulationActions.SAVE_PRODUCT_SUCCESS();
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
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // DOCS INICIA GUARDADO DE RCHIVOS
  // GUARDA CARTA DE DISPONIBILIDAD
  saveAvailableLetter$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(productRegulationActions.SAVE_PRODUCT_SUCCESS),
        withLatestFrom(
          this.store.select(productRegulationSelectors.selectRegulationFiles),
          this.store.select(productRegulationSelectors.selectProducto),
        ),
        mergeMap(async ([action, files, producto]) => {
          if (files.ArchivoCartaDeDisponibilidad !== null) {
            try {
              const fileName = `${new Date().getFullYear()}/${
                producto.IdProducto
              }/${new Date().getTime()}/${files.ArchivoCartaDeDisponibilidad.name}`;
              const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
                files.ArchivoCartaDeDisponibilidad,
                fileName,
                MINIO_BUCKETS.Products,
              );
              this.store.dispatch(
                productRegulationActions.SAVE_AVAILABLE_LETTER_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar carta de disponibilidad',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(productRegulationActions.SAVE_USE_LETTER_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA CARTA DE USO
  saveUseLetter$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(productRegulationActions.SAVE_USE_LETTER_LOAD),
        withLatestFrom(
          this.store.select(productRegulationSelectors.selectProducto),
          this.store.select(productRegulationSelectors.selectRegulationFiles),
        ),
        mergeMap(async ([action, producto, files]) => {
          if (files.ArchivoCartaDeUso !== null) {
            try {
              const fileName = `${new Date().getFullYear()}/${
                producto.IdProducto
              }/${new Date().getTime()}/${files.ArchivoCartaDeUso.name}`;
              const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
                files.ArchivoCartaDeUso,
                fileName,
                MINIO_BUCKETS.Products,
              );
              this.store.dispatch(
                productRegulationActions.SAVE_USE_LETTER_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar carta de uso',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(productRegulationActions.SAVE_ACQUISITION_IN_PLACE_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA CARTA DE ADQUISICION EN PLAZA
  saveAcquisitionInPlace$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(productRegulationActions.SAVE_ACQUISITION_IN_PLACE_LOAD),
        withLatestFrom(
          this.store.select(productRegulationSelectors.selectProducto),
          this.store.select(productRegulationSelectors.selectRegulationFiles),
        ),
        mergeMap(async ([action, producto, files]) => {
          if (files.ArchivoPermisoDeAdquisicionEnPlaza !== null) {
            try {
              const fileName = `${new Date().getFullYear()}/${
                producto.IdProducto
              }/${new Date().getTime()}/${files.ArchivoPermisoDeAdquisicionEnPlaza.name}`;
              const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
                files.ArchivoPermisoDeAdquisicionEnPlaza,
                fileName,
                MINIO_BUCKETS.Products,
              );
              this.store.dispatch(
                productRegulationActions.SAVE_ACQUISITION_IN_PLACE_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar permiso de adquisicion en plaza',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(productRegulationActions.SAVE_IMPORT_LICENSE_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA PERMISO DE IMPOTACION
  saveImportLicense$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(productRegulationActions.SAVE_IMPORT_LICENSE_LOAD),
        withLatestFrom(
          this.store.select(productRegulationSelectors.selectProducto),
          this.store.select(productRegulationSelectors.selectRegulationFiles),
        ),
        mergeMap(async ([action, producto, files]) => {
          if (files.ArchivoPermisoDeImprotacion !== null) {
            try {
              const fileName = `${new Date().getFullYear()}/${
                producto.IdProducto
              }/${new Date().getTime()}/${files.ArchivoPermisoDeImprotacion.name}`;
              const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
                files.ArchivoPermisoDeImprotacion,
                fileName,
                MINIO_BUCKETS.Products,
              );
              this.store.dispatch(
                productRegulationActions.SAVE_IMPORT_LICENSE_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar permiso de importacion',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(productRegulationActions.SAVE_ESSENTIAL_CHEMICALS_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA QUIMICOS ESENCIALES
  saveEssentialChemicas$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(productRegulationActions.SAVE_ESSENTIAL_CHEMICALS_LOAD),
        withLatestFrom(
          this.store.select(productRegulationSelectors.selectProducto),
          this.store.select(productRegulationSelectors.selectRegulationFiles),
        ),
        mergeMap(async ([action, producto, files]) => {
          if (files.ArchivoAvisoDeQuimicosEsenciales !== null) {
            try {
              const fileName = `${new Date().getFullYear()}/${
                producto.IdProducto
              }/${new Date().getTime()}/${files.ArchivoAvisoDeQuimicosEsenciales.name}`;
              const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
                files.ArchivoAvisoDeQuimicosEsenciales,
                fileName,
                MINIO_BUCKETS.Products,
              );
              this.store.dispatch(
                productRegulationActions.SAVE_ESSENTIAL_CHEMICALS_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar aviso de quimicos esenciales',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(productRegulationActions.SAVE_ZOOSANITARIE_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA ZOOSANITARIO
  saveZoosanitarie$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(productRegulationActions.SAVE_ZOOSANITARIE_LOAD),
        withLatestFrom(
          this.store.select(productRegulationSelectors.selectProducto),
          this.store.select(productRegulationSelectors.selectRegulationFiles),
        ),
        mergeMap(async ([action, producto, files]) => {
          if (files.ArchivoZoosanitarios !== null) {
            try {
              const fileName = `${new Date().getFullYear()}/${
                producto.IdProducto
              }/${new Date().getTime()}/${files.ArchivoZoosanitarios.name}`;
              const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
                files.ArchivoZoosanitarios,
                fileName,
                MINIO_BUCKETS.Products,
              );
              this.store.dispatch(
                productRegulationActions.SAVE_ZOOSANITARIE_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar zoosanitario',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(productRegulationActions.SAVE_CICLOPAFEST_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA CICLOPAFEST
  saveCiclopafest$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(productRegulationActions.SAVE_CICLOPAFEST_LOAD),
        withLatestFrom(
          this.store.select(productRegulationSelectors.selectProducto),
          this.store.select(productRegulationSelectors.selectRegulationFiles),
        ),
        mergeMap(async ([action, producto, files]) => {
          if (files.ArchivoCicoplafest !== null) {
            try {
              const fileName = `${new Date().getFullYear()}/${
                producto.IdProducto
              }/${new Date().getTime()}/${files.ArchivoCicoplafest.name}`;
              const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
                files.ArchivoCicoplafest,
                fileName,
                MINIO_BUCKETS.Products,
              );
              this.store.dispatch(
                productRegulationActions.SAVE_CICLOPAFEST_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar cicoplafest',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(productRegulationActions.SAVE_OTHER_PERMISSION_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA OTRO PERMISO
  saveOtherPermission$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(productRegulationActions.SAVE_OTHER_PERMISSION_LOAD),
        withLatestFrom(
          this.store.select(productRegulationSelectors.selectProducto),
          this.store.select(productRegulationSelectors.selectRegulationFiles),
          this.store.select(productLogisticSelectors.selectTypeName),
        ),
        mergeMap(async ([action, producto, files, typeName]) => {
          if (files.ArchivoOtroPermiso !== null) {
            try {
              const fileName = `${new Date().getFullYear()}/${
                producto.IdProducto
              }/${new Date().getTime()}/${files.ArchivoOtroPermiso.name}`;
              const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
                files.ArchivoOtroPermiso,
                fileName,
                MINIO_BUCKETS.Products,
              );
              this.store.dispatch(
                productRegulationActions.SAVE_OTHER_PERMISION_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar otro permiso',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(productRegulationActions.SAVE_TYPE_CONFIGURATION_LOAD({typeName}));
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA CONFIGURACION DEL PRODUCTO
  saveProductConfig$ = createEffect(() =>
    this.action$.pipe(
      ofType(productRegulationActions.SAVE_TYPE_CONFIGURATION_LOAD),
      withLatestFrom(this.store.select(productRegulationSelectors.selectProduct)),
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
                return productRegulationActions.SAVE_TYPE_CONFIGURATION_SUCCESS();
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
                return productRegulationActions.SAVE_TYPE_CONFIGURATION_SUCCESS();
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
                return productRegulationActions.SAVE_TYPE_CONFIGURATION_SUCCESS();
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
