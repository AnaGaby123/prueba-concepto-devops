import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import * as servicesLogger from '@appUtil/logger';
import {EMPTY, forkJoin, of} from 'rxjs';
import {
  ArchivoDetalle,
  ConfiguracionProductosMarcasFamiliasService,
  ConfiguracionProductosRelacionService,
  ConfiguracionProductosService,
  ConfiguracionProductosTipoEspecificadoService,
  ConfiguracionProductosWizardContenidoService,
  ConfiguracionProveedoresRelacionesService,
  Producto,
  ProductoPublicacion,
  ProductoSuplementario,
  VMarcaFamilia,
  VProductoSuplementario,
} from 'api-catalogos';
import {
  attendInvestigationAddProductActions,
  attendInvestigationDetailsActions,
} from '@appActions/pendings/attend-investigation';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {MinioService} from '@appServices/minio/minio.service';
import {attendInvestigationDetailsSelectors} from '@appSelectors/pendings/attend-investigation';
import {extractID} from '@appUtil/util';
import {RETURN_EMPTY, SET_LOADING} from '@appActions/utils/utils.action';
import {
  DEFAULT_DATE,
  DEFAULT_UUID,
  ENUM_PRODUCT_FAMILY_KEY,
  MINIO_BUCKETS,
} from '@appUtil/common.protocols';
import * as catalogActions from '@appActions/catalogs/catalogos.actions';
import {find} from 'lodash-es';

const FILE_NAME = 'attend-investigation-details-add-product.effects';

@Injectable()
export class AttendInvestigationDetailsAddProductEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private configuracionProductosWizardContenidoService: ConfiguracionProductosWizardContenidoService,
    private configuracionProductosMarcasFamiliasService: ConfiguracionProductosMarcasFamiliasService,
    private configService: ConfiguracionProveedoresRelacionesService,
    private configuracionProductosService: ConfiguracionProductosService,
    private configuracionProductosTipoEspecificadoService: ConfiguracionProductosTipoEspecificadoService,
    private minioService: MinioService,
    private configuracionProductosRelacionService: ConfiguracionProductosRelacionService,
  ) {}

  // DOCS Se consultan los tipos de producto (familia) con base al id de la marca
  getTypeProductFamily = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationAddProductActions.SET_LOAD_TYPE_PRODUCT_FAMILY),
      mergeMap((action) => {
        let body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdMarca',
          ValorFiltro: action.selectedTradeMarkdId,
        });
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'NombreFamilia',
        };
        return this.configuracionProductosMarcasFamiliasService.vMarcaFamiliaQueryResult(body).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener la lista de tipos de producto',
              ),
              response,
            );
            return attendInvestigationAddProductActions.SET_SUCCESS_TYPE_PRODUCT_FAMILY({
              payload: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener la lista de tipos de producto',
              ),
              error,
            );
            return of(attendInvestigationAddProductActions.SET_ERROR_TYPE_PRODUCT_FAMILY());
          }),
        );
      }),
    ),
  );

  // DOCS Después de la selección inicial de la familia cuando se navega,
  //  se cosultan los catálogos necesarios y se setean los datos necesarios
  getCatalogsByFamily$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationAddProductActions.SET_SUCCESS_TYPE_PRODUCT_FAMILY),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectProductTypeFamily),
        this.store.select(attendInvestigationDetailsSelectors.selectProductTypeFamilySelected),
        this.store.select(attendInvestigationDetailsSelectors.selectNameValidationConfiguration),
      ),
      mergeMap(([action, familiesList, selectedFammily, nodeRoot]) => {
        const familySelected: VMarcaFamilia = find(
          familiesList,
          (o: VMarcaFamilia) => o.IdMarcaFamilia === selectedFammily.value,
        );
        this.store.dispatch(
          attendInvestigationAddProductActions.SET_VALUE_DROP({
            value: selectedFammily,
            node: 'IdMarcaFamilia',
            nodeSelected: 'productTypeFamilySelected',
          }),
        );
        this.store.dispatch(
          attendInvestigationAddProductActions.SET_INITIAL_DATA_CONFIGURATION({
            nodeRoot,
            familySelected,
          }),
        );
        this.store.dispatch(
          attendInvestigationAddProductActions.SET_LOAD_CHARASTERISTIC_GROUPER({
            payload: selectedFammily.value,
          }),
        );
        this.store.dispatch(
          catalogActions.GET_CAT_CLASSIFICATIONS_LOAD({
            IdCatSubtipoProducto: familySelected.IdCatSubtipoProducto,
          }),
        );
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // DOCS Se consultan los agrupadores de caracteristicas con base al id de la marcaFamilia
  getCharacteristicGrouper = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationAddProductActions.SET_LOAD_CHARASTERISTIC_GROUPER),
      mergeMap((action) => {
        let body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdMarcaFamilia',
          ValorFiltro: action.payload,
        });
        body = {
          ...body,
          SortField: 'Descripcion',
          SortDirection: 'asc',
        };
        return this.configService.AgrupadorCaracteristicaQueryResult(body).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener el agrupador de caracterisiticas ',
              ),
              response,
            );
            return attendInvestigationAddProductActions.SET_SUCCESS_CHARASTERISTIC_GROUPER({
              payload: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener el agrupador de caracterisiticas ',
              ),
              error,
            );
            return of(attendInvestigationAddProductActions.SET_FAILED_CHARASTERISTIC_GROUPER());
          }),
        );
      }),
    ),
  );
  // DOCS Se hace el guardado o actualización para un producto
  saveProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationAddProductActions.SET_SAVE_PRODUCT_LOAD),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectProductData),
        this.store.select(attendInvestigationDetailsSelectors.selectProviderSelected),
      ),
      mergeMap(([action, product, provider]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        product = {
          ...product,
          IdProveedor: provider.IdProveedor,
        };
        return this.configuracionProductosService.ProductoGuardarOActualizar(product).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar un producto ',
              ),
              response,
            );
            return attendInvestigationAddProductActions.SET_SAVE_PRODUCT_SUCCESS({
              payload: extractID(response),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar un producto ',
              ),
              error,
            );
            return of(attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAILED());
          }),
        );
      }),
    ),
  );
  // DOCS: GUARDAR ARCHIVO ESTRUCTURA MOLECULAR
  saveMolecularStructure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationAddProductActions.SET_SAVE_PRODUCT_SUCCESS),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectProductDetails),
        this.store.select(attendInvestigationDetailsSelectors.selectStructureMolecular),
      ),
      mergeMap(async ([action, vProduct, structureMolecular]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        if (structureMolecular !== null) {
          try {
            const fileName = `${new Date().getFullYear()}/${
              vProduct.IdProducto
            }/${new Date().getTime()}/${structureMolecular.name}`;
            const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
              structureMolecular,
              fileName,
              MINIO_BUCKETS.Products,
            );
            return attendInvestigationAddProductActions.SAVE_MOLECULAR_STRUCTURE_FILE_SUCCESS({
              file: fileUploaded,
            });
          } catch (error) {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar el archivo estructura molecular',
              ),
              error,
            );
            return SET_LOADING({payload: false});
          }
        } else {
          return attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_LOAD();
        }
      }),
    ),
  );
  // DOCS Se hace el guardado o actualización para un producto dependiendo de la configuración
  saveTypeProductFamily$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        attendInvestigationAddProductActions.SAVE_MOLECULAR_STRUCTURE_FILE_SUCCESS,
        attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_LOAD,
      ),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectProduct),
        this.store.select(attendInvestigationDetailsSelectors.selectProductToSave),
      ),
      mergeMap(([action, product, productFamilySelected]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        if (product.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards) {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoEstandarGuardarOActualizar(productFamilySelected)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar un producto estandar ',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS({
                  payload: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar un producto estandar ',
                  ),
                  error,
                );
                return of(
                  attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED(),
                );
              }),
            );
        } else if (product.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives) {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoReactivoGuardarOActualizar(productFamilySelected)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar un producto reactivo ',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS({
                  payload: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar un producto reactivo ',
                  ),
                  error,
                );
                return of(
                  attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED(),
                );
              }),
            );
        } else if (product.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications) {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoPublicacionGuardarOActualizar(productFamilySelected)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar un producto publicaciones ',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS({
                  payload: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar un producto publicaciones ',
                  ),
                  error,
                );
                return of(
                  attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED(),
                );
              }),
            );
        } else if (product.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware) {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoLabwareGuardarOActualizar(productFamilySelected)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar un producto publicaciones ',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS({
                  payload: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar un producto publicaciones ',
                  ),
                  error,
                );
                return of(
                  attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED(),
                );
              }),
            );
        } else if (product.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.medicalDevice) {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoDispositivoMedicoGuardarOActualizar(productFamilySelected)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar un producto dispositivo medico',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS({
                  payload: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar un producto dispositivo medico ',
                  ),
                  error,
                );
                return of(
                  attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED(),
                );
              }),
            );
        } else if (product.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.trainings) {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoCapacitacionGuardarOActualizar(productFamilySelected)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar una capacitacion',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS({
                  payload: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar una capacitacion',
                  ),
                  error,
                );
                return of(
                  attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED(),
                );
              }),
            );
        }
      }),
    ),
  );
  // DOCS Se hace el guardado de un producto para la relacion del producto suplementarios
  saveProductSupplement = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationAddProductActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectProductData),
        this.store.select(attendInvestigationDetailsSelectors.selectsSupplementaryProductsToSave),
      ),
      mergeMap(([action, product, productSupplementary]) => {
        if (productSupplementary.length > 0) {
          const data: any[] = [];
          productSupplementary.forEach((item: VProductoSuplementario) => {
            const supplementProduct: Producto = {
              ...product,
              IdProducto: DEFAULT_UUID,
              Descripcion: item.Descripcion,
              PrecioLista: 0,
              Catalogo: null,
            };
            data.push(
              this.configuracionProductosService.ProductoGuardarOActualizar(supplementProduct),
            );
          });
          return forkJoin(data).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar un producto para la relacion de producto suplementario',
                ),
                response,
              );
              return response;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar un producto para la relacion de producto suplementario',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
        }
        this.store.dispatch(
          attendInvestigationAddProductActions.SET_DELETE_PRODUCT_SUPPLEMENT_LOAD(),
        );
        return EMPTY;
      }),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectProductPublicationsData),
        this.store.select(attendInvestigationDetailsSelectors.selectsSupplementaryProductsToSave),
      ),
      switchMap(([productsId, productPublications, productSupplementary]) => {
        const data: any[] = [];
        productSupplementary.forEach((o: VProductoSuplementario, index: number) => {
          const supplementProductPublications: ProductoPublicacion = {
            ...productPublications,
            IdProductoPublicacion: DEFAULT_UUID,
            ISBN: o.ISBN,
            Edicion: o.Edicion,
            Editorial: o.Editorial,
            IdProducto: extractID(productsId[index]),
          };
          data.push(
            this.configuracionProductosTipoEspecificadoService.ProductoPublicacionGuardarOActualizar(
              supplementProductPublications,
            ),
          );
        });
        return forkJoin(data).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar un producto publicacion para la relacion de producto suplementario',
              ),
              response,
            );
            return productsId;
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar un producto publicacion para la relacion de producto suplementario',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(attendInvestigationAddProductActions.SET_SAVE_PRODUCT_SUPPLEMENT_FAILED());
          }),
        );
      }),
      withLatestFrom(this.store.select(attendInvestigationDetailsSelectors.selectProductData)),
      switchMap(([productsId, product]: [any, Producto]) => {
        const data: any[] = [];
        productsId.forEach((o, index: number) => {
          const supplementProduct: ProductoSuplementario = {
            Activo: true,
            IdProducto: product.IdProducto,
            FechaRegistro: DEFAULT_DATE,
            IdProductoSuplemento: extractID(productsId[index]),
            IdProductoSuplementario: DEFAULT_UUID,
          };
          data.push(
            this.configuracionProductosRelacionService.ProductoSuplementarioGuardarOActualizar(
              supplementProduct,
            ),
          );
        });
        return forkJoin(data).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar la relacion de producto suplementario',
              ),
              response,
            );
            return attendInvestigationAddProductActions.SET_SAVE_PRODUCT_SUPPLEMENT_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar la relacion de producto suplementario',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(attendInvestigationAddProductActions.SET_SAVE_PRODUCT_SUPPLEMENT_FAILED());
          }),
        );
      }),
    ),
  );
  // DOCS Se hace el desactivado de un producto para la relacion del producto suplementarios y su relacion
  saveProductSupplementDelete = createEffect(() =>
    this.actions$.pipe(
      ofType(
        attendInvestigationAddProductActions.SET_SAVE_PRODUCT_SUPPLEMENT_SUCCESS,
        attendInvestigationAddProductActions.SET_DELETE_PRODUCT_SUPPLEMENT_LOAD,
      ),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectsSupplementaryProductsToDelete),
        this.store.select(attendInvestigationDetailsSelectors.selectProductData),
      ),
      mergeMap(([action, productSupplementary, productData]) => {
        if (productSupplementary.length > 0) {
          const data: any[] = [];
          productSupplementary.forEach((item: VProductoSuplementario) => {
            data.push(this.configuracionProductosService.ProductoDesactivar(item.IdProducto));
          });
          return forkJoin(data).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al desactivar un producto',
                ),
                response,
              );
              return productSupplementary;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al desactivar un producto',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(
                attendInvestigationAddProductActions.SET_DELETE_PRODUCT_SUPPLEMENT_FAILED(),
              );
            }),
          );
        } else {
          this.store.dispatch(attendInvestigationDetailsActions.SEND_PROVIDER_RESPONSE_LOAD());
        }
        return EMPTY;
      }),
      withLatestFrom(this.store.select(attendInvestigationDetailsSelectors.selectProductData)),
      switchMap(
        ([productSupplementary, productData]: [Array<VProductoSuplementario>, Producto]) => {
          const data: any[] = [];
          productSupplementary.forEach((o: VProductoSuplementario, index: number) => {
            data.push(
              this.configuracionProductosRelacionService.ProductoSuplementarioDesactivar(
                o.IdProductoSuplementario,
              ),
            );
          });
          return forkJoin(data).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al desactivar la relacion de producto suplementario',
                ),
                response,
              );
              return attendInvestigationDetailsActions.SEND_PROVIDER_RESPONSE_LOAD();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al desactivar la relacion de producto suplementario',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(
                attendInvestigationAddProductActions.SET_DELETE_PRODUCT_SUPPLEMENT_FAILED(),
              );
            }),
          );
        },
      ),
    ),
  );

  // DOCS Se valida el cat del producto estándar
  getCatValidation = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationAddProductActions.SET_VALIDATE_CAS),
      mergeMap((action) => {
        if (action.value.toLowerCase() === 'n/d') {
          return of(
            attendInvestigationAddProductActions.SET_VALIDATE_CAS_SUCCESS({
              value: true,
            }),
          );
        } else {
          return this.configuracionProductosWizardContenidoService
            .ValidadorCASProcess(action.value)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al validar el cas ',
                  ),
                  response,
                );
                return attendInvestigationAddProductActions.SET_VALIDATE_CAS_SUCCESS({
                  value: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al validar el cas ',
                  ),
                  error,
                );
                return of(attendInvestigationAddProductActions.SET_VALIDATE_CAS_FAILED());
              }),
            );
        }
      }),
    ),
  );
}
