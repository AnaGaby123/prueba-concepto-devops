import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  regulatoryResearchDashboardActions,
  regulatoryResearchDetailsActions,
} from '@appActions/pendings/new-product-existing-supplier/regulatory-research';
import {EMPTY, forkJoin, mergeMap, of} from 'rxjs';
import * as actionsUtils from '@appActions/utils/utils.action';
import {SET_LOADING, SET_LOADING_ERROR, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {regulatoryResearchDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-index';
import {
  ProcesosL01CotizacionInvestigacionService,
  QueryResultProductoRatificacionObj,
} from 'api-logistica';
import {
  buildProductsFromRegulatoryResearchResponse,
  hasRestrictionsAndRegulations,
} from '@appHelpers/pending/new-product-existing-supplier/regulatory-research.helpers';
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {generateMessage, LOG_FAILED, LOG_SUCCEEDED} from '@appUtil/logger';
import * as apiCatalogs from 'api-catalogos';
import {
  ArchivoDetalle,
  CatalogosService,
  ConfiguracionProductosMarcasFamiliasService,
  ConfiguracionProductosRelacionService,
  ConfiguracionProductosService,
  ConfiguracionProductosTipoEspecificadoService,
  ConfiguracionProductosWizardContenidoService,
  ConfiguracionProveedoresRelacionesService,
  Producto,
  ProductoPublicacion,
  ProductoSuplementario,
  QueryResultCatClasificacionInformativaProducto,
  QueryResultVMarcaFamilia,
  SistemaArchivosService,
  VProductoDetalle,
  VProductoSuplementario,
} from 'api-catalogos';
import {queryInfoWithActiveFilter} from '@appModels/filters/Filters';
import {
  catClasificacionInformativaBuildDropListOptions,
  formatListFamily,
} from '@appHelpers/catalogs/products/catClasificacionInformativaProducto';
import {extractID, getArrayForDropListOptionsPqf} from '@appUtil/util';
import {FETCH_PRODUCT_GROUP_CHARACTERISTICS_SUCCESS} from '@appActions/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.actions';
import {DEFAULT_DATE, DEFAULT_UUID, MINIO_BUCKETS} from '@appUtil/common.protocols';
import {MinioService} from '@appServices/minio/minio.service';
import {
  convertFileFromURLToBase64,
  convertFromBase64ToByteArray,
  dowloadFile,
  getOnlyFileName,
} from '@appUtil/files';
import {productFormActions} from '@appActions/forms/product-form';
import {appRoutes} from '@appHelpers/core/app-routes';
import {Router} from '@angular/router';
import {PRODUCTS_CATALOG_TITLE_SEE_PRODUCT} from '@appModels/store/forms/product-form/product-form-.module';
import {IPqfTabOption} from '@appModels/shared-components/pqf-tab-options';
import {map as _map} from 'lodash-es';

const fileName = 'regulatory-research-details.effects.ts';

@Injectable()
export class RegulatoryResearchDetailsEffects {
  constructor(
    private actions$: Actions,
    private logger: NGXLogger,
    private store: Store<AppState>,
    private quotationInvestigationService: ProcesosL01CotizacionInvestigacionService,
    private catalogsService: CatalogosService,
    private productsWizardConfigService: ConfiguracionProductosWizardContenidoService,
    private productsBrandsFamiliesConfigService: ConfiguracionProductosMarcasFamiliasService,
    private configService: ConfiguracionProveedoresRelacionesService,
    private configuracionProductosService: ConfiguracionProductosService,
    private minioService: MinioService,
    private configuracionProductosTipoEspecificadoService: ConfiguracionProductosTipoEspecificadoService,
    private sistemaArchivosService: SistemaArchivosService,
    private configuracionProductosRelacionService: ConfiguracionProductosRelacionService,
    private productosService: apiCatalogs.ConfiguracionProductosService,
    private productosConfigService: apiCatalogs.ConfiguracionProductosTipoEspecificadoService,
    private configuracionProductosWizardContenidoService: ConfiguracionProductosWizardContenidoService,
    private processQuotationsInvestigationService: ProcesosL01CotizacionInvestigacionService,
    private router: Router,
  ) {}

  // DOCS: Obtiene la lista de productos en investigación
  loadSection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        regulatoryResearchDashboardActions.SET_SELECTED_PROVIDER,
        regulatoryResearchDetailsActions.SET_SEARCH_TERM,
        regulatoryResearchDetailsActions.SET_FILTER_OPTIONS,
      ),
      withLatestFrom(
        this.store.select(regulatoryResearchDetailsSelectors.selectProductListQueryInfo),
      ),
      mergeMap(([, queryInfo]) => {
        return this.quotationInvestigationService
          .RatificacionInvestigacionQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultProductoRatificacionObj) => {
              this.logger.debug(
                generateMessage(
                  fileName,
                  LOG_SUCCEEDED,
                  'al obtener productos en investigación del proveedor seleccionado.',
                ),
              );
              const productList = buildProductsFromRegulatoryResearchResponse(response.Results);
              return regulatoryResearchDetailsActions.FETCH_FAMILIES_LIST_SUCCESS({
                productList,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                generateMessage(
                  fileName,
                  LOG_FAILED,
                  'al obtener productos en investigación del proveedor seleccionado.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(regulatoryResearchDetailsActions.FETCH_FAMILIES_LIST_FAILED());
            }),
          );
      }),
    ),
  );

  /* DOCS: Obtiene el detalle del producto seleccionado*/
  getQuotationFreights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        regulatoryResearchDetailsActions.FETCH_FAMILIES_LIST_SUCCESS,
        regulatoryResearchDetailsActions.SET_NEW_PRODUCT_RATIFICATION,
      ),
      withLatestFrom(
        this.store.select(regulatoryResearchDetailsSelectors.selectedProductId),
        this.store.select(regulatoryResearchDetailsSelectors.selectTabOptions),
      ),
      mergeMap(([, productId, tabOptions]) => {
        this.store.dispatch(
          regulatoryResearchDetailsActions.SET_TAB_OPTIONS({
            tabOptions: _map(
              tabOptions,
              (o: IPqfTabOption, index): IPqfTabOption => ({
                ...o,
                selected: index === 0,
              }),
            ),
          }),
        );
        return this.productsWizardConfigService.vProductoDetalleProcess(productId).pipe(
          map((response: VProductoDetalle) => {
            this.logger.debug(
              generateMessage(
                fileName,
                LOG_SUCCEEDED,
                'Al obtener el detalle del producto seleccionado',
              ),
              response,
            );
            return regulatoryResearchDetailsActions.FETCH_SELECTED_PRODUCT_DETAILS_SUCCESS({
              productDetails: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              generateMessage(
                fileName,
                LOG_FAILED,
                'Al obtener el detalle del producto seleccionado',
              ),
              error,
            );
            return of(regulatoryResearchDetailsActions.FETCH_SELECTED_PRODUCT_DETAILS_FAILED());
          }),
        );
      }),
    ),
  );
  // DOCS Se consultan los productos suplementarios
  getSuplementaryProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(regulatoryResearchDetailsActions.FETCH_SELECTED_PRODUCT_DETAILS_SUCCESS),
      withLatestFrom(this.store.select(regulatoryResearchDetailsSelectors.nodeProduct)),
      mergeMap(([action, product]) => {
        return this.configuracionProductosWizardContenidoService
          .vProductoSuplementarioConsultaProcess(product.IdProducto)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  fileName,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la lista de productos suplementarios',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return regulatoryResearchDetailsActions.SET_SUPPLEMENTARY_PRODUCT_SUCCESS({
                payload: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  fileName,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la lista de productos suplementarios',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(regulatoryResearchDetailsActions.SET_SUPPLEMENTARY_PRODUCT_FAILED());
            }),
          );
      }),
    ),
  );

  // DOCS: obtención del catálogo de tipo de clasificaciones
  $getCatClassifications = createEffect(() =>
    this.actions$.pipe(
      ofType(
        regulatoryResearchDetailsActions.FETCH_SELECTED_PRODUCT_DETAILS_SUCCESS,
        regulatoryResearchDetailsActions.SET_CHANGE_SELECT_PROPERTY_PRODUCT_BRAND_FAMILY,
      ),
      withLatestFrom(this.store.select(regulatoryResearchDetailsSelectors.productDetails)),
      mergeMap(([response, productDetails]) => {
        const body = queryInfoWithActiveFilter();
        body.Filters.push({
          NombreFiltro: 'IdCatSubtipoProducto',
          ValorFiltro: productDetails.IdCatSubtipoProducto,
        });
        return this.catalogsService.catClasificacionInformativaProductoQueryResult(body).pipe(
          map((response: QueryResultCatClasificacionInformativaProducto) => {
            this.logger.debug(
              generateMessage(LOG_SUCCEEDED, fileName, 'Al obtener el catálogo de clasificaciones'),
              response,
            );
            return regulatoryResearchDetailsActions.FETCH_PRODUCT_CLASSIFICATIONS_SUCCESS({
              classificationList: catClasificacionInformativaBuildDropListOptions(response.Results),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              generateMessage(fileName, LOG_FAILED, 'Al obtener el catálogo de clasificaciones'),
              error,
            );
            return of(regulatoryResearchDetailsActions.FETCH_PRODUCT_CLASSIFICATIONS_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: Obtención de las familias de la marca del producto seleccionado
  getFamiliesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regulatoryResearchDetailsActions.FETCH_SELECTED_PRODUCT_DETAILS_SUCCESS),
      mergeMap(({productDetails}) => {
        const body = {
          ...queryInfoWithActiveFilter(),
          SortField: 'NombreFamilia',
          SortDirection: 'asc',
        };
        body.Filters.push({
          NombreFiltro: 'IdMarca',
          ValorFiltro: productDetails.IdMarca,
        });
        return this.productsBrandsFamiliesConfigService.vMarcaFamiliaQueryResult(body).pipe(
          map((response: QueryResultVMarcaFamilia) => {
            this.logger.debug(
              generateMessage(
                fileName,
                LOG_SUCCEEDED,
                'Al obtener la lista de familias de la marca del producto seleccionado',
              ),
              response,
            );
            return regulatoryResearchDetailsActions.FETCH_PRODUCT_FAMILIES_SUCCESS({
              familiesList: formatListFamily(
                getArrayForDropListOptionsPqf(response.Results, 'IdMarcaFamilia', 'NombreFamilia'),
              ),
              hasRestrictionsAndRegularizations: hasRestrictionsAndRegulations(productDetails),
              familyBrandList: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              generateMessage(
                fileName,
                LOG_FAILED,
                'Al obtener la lista de familias de la marca del producto seleccionado',
              ),
              error,
            );
            return of(regulatoryResearchDetailsActions.FETCH_PRODUCT_FAMILIES_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS Se consultan los agrupadores de caracteristicas con base al id de la marcaFamilia
  // this.configService.AgrupadorCaracteristicaQueryResult(body)
  getGroupCharacteristic = createEffect(() =>
    this.actions$.pipe(
      ofType(
        regulatoryResearchDetailsActions.FETCH_SELECTED_PRODUCT_DETAILS_SUCCESS,
        regulatoryResearchDetailsActions.SET_CHANGE_SELECT_PROPERTY_PRODUCT_BRAND_FAMILY,
      ),
      withLatestFrom(
        this.store.select(regulatoryResearchDetailsSelectors.queryGroupCharacteristics),
      ),
      mergeMap(([response, query]) => {
        return this.configService.AgrupadorCaracteristicaQueryResult(query).pipe(
          map((response) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return FETCH_PRODUCT_GROUP_CHARACTERISTICS_SUCCESS({
              groupCharacteristic: getArrayForDropListOptionsPqf(
                response.Results,
                'IdAgrupadorCaracteristica',
                'Descripcion',
              ),
            });
          }),
          catchError(() => of({type: '[Movies API] Movies Loaded Error'})),
        );
      }),
    ),
  );

  // DOCS Se hace el guardado o actualización para un producto
  saveProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT),
      withLatestFrom(this.store.select(regulatoryResearchDetailsSelectors.nodeProduct)),
      mergeMap(([action, product]) => {
        return this.configuracionProductosService.ProductoGuardarOActualizar(product).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                fileName,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar un producto ',
              ),
              response,
            );
            return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_SUCCESS({
              idProducto: extractID(response),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                fileName,
                servicesLogger.LOG_FAILED,
                'Al guardar un producto ',
              ),
              error,
            );
            return of(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: GUARDAR ARCHIVO ESTRUCTURA MOLECULAR
  saveMolecularStructure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_SUCCESS),
      withLatestFrom(
        this.store.select(regulatoryResearchDetailsSelectors.productDetails),
        this.store.select(regulatoryResearchDetailsSelectors.selectStructureMolecular),
      ),
      mergeMap(async ([{idProducto}, vProduct, structureMolecular]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        //DOCS: Sino existe estructura molecular, se guarda la familia del producto
        if (!structureMolecular) {
          return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_LOAD();
        }
        //DOCS: Se guarda la estructura molecular del producto
        try {
          const fileName = `${new Date().getFullYear()}/${
            vProduct.IdProducto
          }/${new Date().getTime()}/${structureMolecular.name}`;
          const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
            structureMolecular,
            fileName,
            MINIO_BUCKETS.Products,
          );
          return regulatoryResearchDetailsActions.SAVE_MOLECULAR_STRUCTURE_FILE_SUCCESS({
            file: fileUploaded,
          });
        } catch (error) {
          this.logger.debug(
            servicesLogger.generateMessage(
              fileName,
              servicesLogger.LOG_FAILED,
              'Al guardar el archivo estructura molecular',
            ),
            error,
          );
          return SET_LOADING({payload: false});
        }
      }),
    ),
  );

  saveTypeProductFamily$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        regulatoryResearchDetailsActions.SAVE_MOLECULAR_STRUCTURE_FILE_SUCCESS,
        regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_LOAD,
      ),
      withLatestFrom(
        this.store.select(regulatoryResearchDetailsSelectors.nodeTypeProductDetails),
        this.store.select(regulatoryResearchDetailsSelectors.selectTypeProduct),
      ),
      mergeMap(([action, productType, productFamilySelected]) => {
        this.store.dispatch(SET_LOADING({payload: true}));

        if (productFamilySelected === 'ProductoEstandar') {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoEstandarGuardarOActualizar(productType)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar un producto estandar ',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS({
                  payload: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_FAILED,
                    'Al guardar un producto estandar ',
                  ),
                  error,
                );
                return of(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED());
              }),
            );
        }
        if (productFamilySelected === 'ProductoReactivo') {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoReactivoGuardarOActualizar(productType)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar un producto reactivo ',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS({
                  payload: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_FAILED,
                    'Al guardar un producto reactivo ',
                  ),
                  error,
                );
                return of(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED());
              }),
            );
        }
        if (productFamilySelected === 'ProductoPublicacion') {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoPublicacionGuardarOActualizar(productType)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar un producto publicaciones ',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS({
                  payload: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_FAILED,
                    'Al guardar un producto publicaciones ',
                  ),
                  error,
                );
                return of(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED());
              }),
            );
        }
        if (productFamilySelected === 'ProductoLabware') {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoLabwareGuardarOActualizar(productType)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar un producto publicaciones ',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS({
                  payload: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_FAILED,
                    'Al guardar un producto publicaciones ',
                  ),
                  error,
                );
                return of(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED());
              }),
            );
        }
        if (productFamilySelected === 'ProductoDispositivoMedico') {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoDispositivoMedicoGuardarOActualizar(productType)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar un producto dispositivo medico',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS({
                  payload: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_FAILED,
                    'Al guardar un producto dispositivo medico ',
                  ),
                  error,
                );
                return of(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED());
              }),
            );
        }
        if (productFamilySelected === 'ProductoCapacitacion') {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoCapacitacionGuardarOActualizar({
              ...productType,
              FechaUltimaActualizacion: DEFAULT_DATE,
              FechaRegistro: DEFAULT_DATE,
            })
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar una capacitacion',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS({
                  payload: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_FAILED,
                    'Al guardar una capacitacion',
                  ),
                  error,
                );
                return of(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED());
              }),
            );
        }
      }),
    ),
  );

  // DOCS Se hace la eliminacion para un producto dependiendo de la configuración
  // DOCS En el caso en el que se cambie de tipo producto familia

  saveTypeProductFamilyDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS),
      withLatestFrom(
        this.store.select(regulatoryResearchDetailsSelectors.productDetails),
        this.store.select(regulatoryResearchDetailsSelectors.selectTypeProduct),
      ),
      mergeMap(([action, productDetails, productFamilySelected]) => {
        const ProductoEstandar = productDetails['ProductoEstandar'];
        const ProductoReactivo = productDetails['ProductoReactivo'];
        const ProductoPublicacion = productDetails['ProductoPublicacion'];
        const ProductoLabware = productDetails['ProductoLabware'];
        const ProductoDispositivoMedico = productDetails['ProductoDispositivoMedico'];
        const ProductoCapacitacion = productDetails['ProductoCapacitacion'];
        if (
          productFamilySelected !== 'ProductoEstandar' &&
          ProductoEstandar &&
          ProductoEstandar?.IdProductoEstandar &&
          ProductoEstandar?.IdProductoEstandar !== DEFAULT_UUID
        ) {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoEstandarDesactivar(ProductoEstandar?.IdProductoEstandar)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al Desactivar un producto estandar ',
                  ),
                  response,
                );
                return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_SUPPLEMENT();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_FAILED,
                    'Al Desactivar un producto estandar ',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        }
        if (
          productFamilySelected !== 'ProductoReactivo' &&
          ProductoReactivo &&
          ProductoReactivo?.IdProductoReactivo &&
          ProductoReactivo?.IdProductoReactivo !== DEFAULT_UUID
        ) {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoReactivoDesactivar(productDetails['ProductoReactivo']?.IdProductoReactivo)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al Desactivar un producto reactivo ',
                  ),
                  response,
                );
                return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_SUPPLEMENT();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_FAILED,
                    'Al Desactivar un producto reactivo ',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        }
        if (
          productFamilySelected !== 'ProductoPublicacion' &&
          ProductoPublicacion &&
          ProductoPublicacion?.IdProductoPublicacion &&
          ProductoPublicacion?.IdProductoPublicacion !== DEFAULT_UUID
        ) {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoPublicacionDesactivar(
              productDetails['ProductoPublicacion']?.IdProductoPublicacion,
            )
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al Desactivar un producto publicaciones ',
                  ),
                  response,
                );
                return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_SUPPLEMENT();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_FAILED,
                    'Al Desactivar un producto publicaciones ',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        }
        if (
          productFamilySelected !== 'ProductoLabware' &&
          ProductoLabware &&
          ProductoLabware?.IdProductoLabware &&
          ProductoLabware?.IdProductoLabware !== DEFAULT_UUID
        ) {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoLabwareDesactivar(productDetails['ProductoLabware']?.IdProductoLabware)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al Desactivar un producto labware ',
                  ),
                  response,
                );
                return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_SUPPLEMENT();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_FAILED,
                    'Al Desactivar un producto labware ',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        }
        if (
          productFamilySelected !== 'ProductoDispositivoMedico' &&
          ProductoDispositivoMedico &&
          ProductoDispositivoMedico?.IdProductoDispositivoMedico &&
          ProductoDispositivoMedico?.IdProductoDispositivoMedico !== DEFAULT_UUID
        ) {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoDispositivoMedicoDesactivar(
              productDetails['ProductoDispositivoMedico']?.IdProductoDispositivoMedico,
            )
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al Desactivar un producto Dispositivo Medico ',
                  ),
                  response,
                );
                return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_SUPPLEMENT();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_FAILED,
                    'Al Desactivar un producto Dispositivo Medico ',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        }
        if (
          productFamilySelected !== 'ProductoCapacitacion' &&
          ProductoCapacitacion &&
          ProductoCapacitacion?.IdProductoCapacitacion &&
          ProductoCapacitacion?.IdProductoCapacitacion !== DEFAULT_UUID
        ) {
          return this.configuracionProductosTipoEspecificadoService
            .ProductoCapacitacionDesactivar(
              productDetails['ProductoCapacitacion'].IdProductoCapacitacion,
            )
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al Desactivar una capacitacion',
                  ),
                  response,
                );
                return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_SUPPLEMENT();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_FAILED,
                    'Al Desactivar una capacitacion',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        }
        return of(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_SUPPLEMENT());
      }),
    ),
  );

  // DOCS Se hace el guardado de un producto para la relacion del producto suplementarios
  saveProductSupplement = createEffect(() =>
    this.actions$.pipe(
      ofType(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_SUPPLEMENT),
      withLatestFrom(
        this.store.select(regulatoryResearchDetailsSelectors.nodeProduct),
        this.store.select(regulatoryResearchDetailsSelectors.selectsSupplementaryProductsToSave),
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
                  fileName,
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
                  fileName,
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
        this.store.dispatch(regulatoryResearchDetailsActions.SET_DELETE_PRODUCT_SUPPLEMENT_LOAD());
        return EMPTY;
      }),
      withLatestFrom(
        this.store.select(regulatoryResearchDetailsSelectors.nodeTypeProductDetails),
        this.store.select(regulatoryResearchDetailsSelectors.selectsSupplementaryProductsToSave),
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
                fileName,
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
                fileName,
                servicesLogger.LOG_FAILED,
                'Al guardar un producto publicacion para la relacion de producto suplementario',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_SUPPLEMENT_FAILED());
          }),
        );
      }),
      withLatestFrom(this.store.select(regulatoryResearchDetailsSelectors.nodeProduct)),
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
                fileName,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar la relacion de producto suplementario',
              ),
              response,
            );
            return regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_SUPPLEMENT_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                fileName,
                servicesLogger.LOG_FAILED,
                'Al guardar la relacion de producto suplementario',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_SUPPLEMENT_FAILED());
          }),
        );
      }),
    ),
  );

  downloadFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionsUtils.DOWLOAD_FILE_LOAD),
        mergeMap((action) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response) => {
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
  // DOCS Se hace el desactivado de un producto para la relacion del producto suplementarios y su relacion
  saveProductSupplementDelete = createEffect(() =>
    this.actions$.pipe(
      ofType(
        regulatoryResearchDetailsActions.SET_SAVE_PRODUCT_SUPPLEMENT,
        regulatoryResearchDetailsActions.SET_DELETE_PRODUCT_SUPPLEMENT_LOAD,
      ),
      withLatestFrom(
        this.store.select(regulatoryResearchDetailsSelectors.selectsSupplementaryProductsToDelete),
        this.store.select(regulatoryResearchDetailsSelectors.nodeProduct),
      ),
      mergeMap(([action, productSupplementary, productData]) => {
        if (productSupplementary && productSupplementary.length > 0) {
          const data: any[] = [];
          productSupplementary.forEach((item) => {
            data.push(this.configuracionProductosService.ProductoDesactivar(item.IdProducto));
          });
          return forkJoin(data).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  fileName,
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
                  fileName,
                  servicesLogger.LOG_FAILED,
                  'Al desactivar un producto',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(regulatoryResearchDetailsActions.SET_DELETE_PRODUCT_SUPPLEMENT_FAILED());
            }),
          );
        }
        this.store.dispatch(SET_LOADING({payload: false}));
        this.store.dispatch(
          productFormActions.SET_TITLE({
            title: PRODUCTS_CATALOG_TITLE_SEE_PRODUCT,
          }),
        );
        this.store.dispatch(
          SET_LOADING_SUCCESS({
            active: true,
            message: 'Has guardado',
          }),
        );
        this.store.dispatch(
          regulatoryResearchDetailsActions.SET_PRODUCT_SELECTED({
            productSelectedId: productData.IdProducto,
          }),
        );
        return EMPTY;
      }),
      withLatestFrom(this.store.select(regulatoryResearchDetailsSelectors.nodeProduct)),
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
                  fileName,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al desactivar la relacion de producto suplementario',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                productFormActions.SET_TITLE({
                  title: PRODUCTS_CATALOG_TITLE_SEE_PRODUCT,
                }),
              );
              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has guardado',
                }),
              );
              this.store.dispatch(
                regulatoryResearchDetailsActions.SET_PRODUCT_SELECTED({
                  productSelectedId: productData.IdProducto,
                }),
              );

              return regulatoryResearchDetailsActions.SET_DELETE_PRODUCT_SUPPLEMENT_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  fileName,
                  servicesLogger.LOG_FAILED,
                  'Al desactivar la relacion de producto suplementario',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(regulatoryResearchDetailsActions.SET_DELETE_PRODUCT_SUPPLEMENT_FAILED());
            }),
          );
        },
      ),
    ),
  );

  saveProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regulatoryResearchDetailsActions.SAVE_REGULATION_DATA),
      withLatestFrom(this.store.select(regulatoryResearchDetailsSelectors.nodeProduct)),
      mergeMap(([action, proudcto]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.productosService.ProductoGuardarOActualizar(proudcto).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                fileName,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar producto',
              ),
              response,
            );
            return regulatoryResearchDetailsActions.SAVE_PRODUCT_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                fileName,
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
      this.actions$.pipe(
        ofType(regulatoryResearchDetailsActions.SAVE_PRODUCT_SUCCESS),
        withLatestFrom(
          this.store.select(regulatoryResearchDetailsSelectors.selectRegulationFiles),
          this.store.select(regulatoryResearchDetailsSelectors.nodeProduct),
        ),
        mergeMap(async ([action, files, producto]) => {
          if (files?.ArchivoCartaDeDisponibilidad !== null) {
            try {
              const fileName = `${new Date().getFullYear()}/${
                producto.IdProducto
              }/${new Date().getTime()}/${files?.ArchivoCartaDeDisponibilidad.name}`;
              const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
                files.ArchivoCartaDeDisponibilidad,
                fileName,
                MINIO_BUCKETS.Products,
              );
              this.store.dispatch(
                regulatoryResearchDetailsActions.SAVE_AVAILABLE_LETTER_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  fileName,
                  servicesLogger.LOG_FAILED,
                  'Al guardar carta de disponibilidad',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(regulatoryResearchDetailsActions.SAVE_USE_LETTER_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA CARTA DE USO
  saveUseLetter$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(regulatoryResearchDetailsActions.SAVE_USE_LETTER_LOAD),
        withLatestFrom(
          this.store.select(regulatoryResearchDetailsSelectors.nodeProduct),
          this.store.select(regulatoryResearchDetailsSelectors.selectRegulationFiles),
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
                regulatoryResearchDetailsActions.SAVE_USE_LETTER_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  fileName,
                  servicesLogger.LOG_FAILED,
                  'Al guardar carta de uso',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(regulatoryResearchDetailsActions.SAVE_ACQUISITION_IN_PLACE_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA CARTA DE ADQUISICION EN PLAZA
  saveAcquisitionInPlace$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(regulatoryResearchDetailsActions.SAVE_ACQUISITION_IN_PLACE_LOAD),
        withLatestFrom(
          this.store.select(regulatoryResearchDetailsSelectors.nodeProduct),
          this.store.select(regulatoryResearchDetailsSelectors.selectRegulationFiles),
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
                regulatoryResearchDetailsActions.SAVE_ACQUISITION_IN_PLACE_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  fileName,
                  servicesLogger.LOG_FAILED,
                  'Al guardar permiso de adquisicion en plaza',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(regulatoryResearchDetailsActions.SAVE_IMPORT_LICENSE_LOAD());
        }),
      ),
    {dispatch: false},
  );
  // DOCS: GUARDA PERMISO DE IMPOTACION
  saveImportLicense$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(regulatoryResearchDetailsActions.SAVE_IMPORT_LICENSE_LOAD),
        withLatestFrom(
          this.store.select(regulatoryResearchDetailsSelectors.nodeProduct),
          this.store.select(regulatoryResearchDetailsSelectors.selectRegulationFiles),
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
                regulatoryResearchDetailsActions.SAVE_IMPORT_LICENSE_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  fileName,
                  servicesLogger.LOG_FAILED,
                  'Al guardar permiso de importacion',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(regulatoryResearchDetailsActions.SAVE_ESSENTIAL_CHEMICALS_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA QUIMICOS ESENCIALES
  saveEssentialChemicas$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(regulatoryResearchDetailsActions.SAVE_ESSENTIAL_CHEMICALS_LOAD),
        withLatestFrom(
          this.store.select(regulatoryResearchDetailsSelectors.nodeProduct),
          this.store.select(regulatoryResearchDetailsSelectors.selectRegulationFiles),
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
                regulatoryResearchDetailsActions.SAVE_ESSENTIAL_CHEMICALS_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  fileName,
                  servicesLogger.LOG_FAILED,
                  'Al guardar aviso de quimicos esenciales',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(regulatoryResearchDetailsActions.SAVE_ZOOSANITARIE_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA ZOOSANITARIO
  saveZoosanitarie$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(regulatoryResearchDetailsActions.SAVE_ZOOSANITARIE_LOAD),
        withLatestFrom(
          this.store.select(regulatoryResearchDetailsSelectors.nodeProduct),
          this.store.select(regulatoryResearchDetailsSelectors.selectRegulationFiles),
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
                regulatoryResearchDetailsActions.SAVE_ZOOSANITARIE_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  fileName,
                  servicesLogger.LOG_FAILED,
                  'Al guardar zoosanitario',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(regulatoryResearchDetailsActions.SAVE_CICLOPAFEST_LOAD());
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA CICLOPAFEST
  saveCiclopafest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(regulatoryResearchDetailsActions.SAVE_CICLOPAFEST_LOAD),
        withLatestFrom(
          this.store.select(regulatoryResearchDetailsSelectors.nodeProduct),
          this.store.select(regulatoryResearchDetailsSelectors.selectRegulationFiles),
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
                regulatoryResearchDetailsActions.SAVE_CICLOPAFEST_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  fileName,
                  servicesLogger.LOG_FAILED,
                  'Al guardar cicoplafest',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(regulatoryResearchDetailsActions.SAVE_OTHER_PERMISSION_LOAD());
        }),
      ),
    {dispatch: false},
  );
  // DOCS: GUARDA OTRO PERMISO
  saveOtherPermission$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(regulatoryResearchDetailsActions.SAVE_OTHER_PERMISSION_LOAD),
        withLatestFrom(
          this.store.select(regulatoryResearchDetailsSelectors.nodeProduct),
          this.store.select(regulatoryResearchDetailsSelectors.selectRegulationFiles),
          this.store.select(regulatoryResearchDetailsSelectors.selectTypeProduct),
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
                regulatoryResearchDetailsActions.SAVE_OTHER_PERMISION_SUCCESS({
                  file: fileUploaded,
                }),
              );
            } catch (error) {
              this.logger.debug(
                servicesLogger.generateMessage(
                  fileName,
                  servicesLogger.LOG_FAILED,
                  'Al guardar otro permiso',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }
          }
          this.store.dispatch(
            regulatoryResearchDetailsActions.SAVE_TYPE_CONFIGURATION_LOAD({typeName}),
          );
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GUARDA CONFIGURACION DEL PRODUCTO
  saveProductConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regulatoryResearchDetailsActions.SAVE_TYPE_CONFIGURATION_LOAD),
      withLatestFrom(this.store.select(regulatoryResearchDetailsSelectors.productDetails)),
      mergeMap(([action, vProduct]) => {
        if (vProduct?.ProductoEstandar) {
          return this.productosConfigService
            .ProductoEstandarGuardarOActualizar(vProduct.ProductoEstandar)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar configuracion del producto',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: 'Has guardado',
                  }),
                );
                return regulatoryResearchDetailsActions.SAVE_TYPE_CONFIGURATION_SUCCESS();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
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
        if (vProduct?.ProductoLabware) {
          return this.productosConfigService
            .ProductoLabwareGuardarOActualizar(vProduct.ProductoLabware)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar configuracion del producto',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: 'Has guardado',
                  }),
                );
                return regulatoryResearchDetailsActions.SAVE_TYPE_CONFIGURATION_SUCCESS();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
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
        if (vProduct?.ProductoReactivo) {
          return this.productosConfigService
            .ProductoReactivoGuardarOActualizar(vProduct?.ProductoReactivo)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar configuracion del producto',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: 'Has guardado',
                  }),
                );
                return regulatoryResearchDetailsActions.SAVE_TYPE_CONFIGURATION_SUCCESS();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
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
        return of(regulatoryResearchDetailsActions.CONITUE_WITH_CLOSE_INVESTIGATION());
      }),
    ),
  );
  // DOCS Terminar la configuracion en compras para pasarlo a la siguiente configuracion
  finishPurchasingConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(
        regulatoryResearchDetailsActions.SAVE_TYPE_CONFIGURATION_SUCCESS,
        regulatoryResearchDetailsActions.SAVE_AVAILABLE_LETTER_SUCCESS,
        regulatoryResearchDetailsActions.CONITUE_WITH_CLOSE_INVESTIGATION,
      ),
      withLatestFrom(
        this.store.select(
          regulatoryResearchDetailsSelectors.selectQueryFinishPurchasingConfiguration,
        ),
        this.store.select(regulatoryResearchDetailsSelectors.countListProducts),
        this.store.select(regulatoryResearchDetailsSelectors.selectedProvider),
      ),
      mergeMap(([action, queryInfo, countListProducts, selectedProvider]) => {
        return this.processQuotationsInvestigationService
          .cotPartidaCotizacionInvestigacionSeguimientoGuardarOActualizar(queryInfo)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  fileName,
                  servicesLogger.LOG_SUCCEEDED,
                  'al terminar la configuracion de compras en investigacion de producto',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has terminado de configurar la familia',
                }),
              );
              if (countListProducts > 1) {
                this.store.dispatch(
                  regulatoryResearchDashboardActions.HANDLE_SET_SELECTED_PROVIDER({
                    item: selectedProvider,
                  }),
                );
                this.router.navigate([
                  appRoutes.protected,
                  appRoutes.pendings.pendings,
                  appRoutes.regulatoryResearch.regulatoryResearch,
                  appRoutes.regulatoryResearch.details,
                  appRoutes.regulatoryResearch.commercialTechnicalResearch,
                ]);
              } else {
                this.store.dispatch(regulatoryResearchDashboardActions.FETCH_PROVIDER_LIST_LOAD());
                this.router.navigate([
                  appRoutes.protected,
                  appRoutes.pendings.pendings,
                  appRoutes.regulatoryResearch.regulatoryResearch,
                  appRoutes.regulatoryResearch.dashboard,
                ]);
              }
              this.store.dispatch(
                regulatoryResearchDetailsActions.FINISH_PURCHASING_CONFIGURATION_SUCCESS(),
              );

              return regulatoryResearchDetailsActions.FETCH_FAMILIES_LIST_LOAD();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  fileName,
                  servicesLogger.LOG_FAILED,
                  'al terminar la configuracion de compras en investigacion de producto',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));

              return of(regulatoryResearchDetailsActions.FINISH_PURCHASING_CONFIGURATION_FAILED());
            }),
          );
      }),
    ),
  );
  // VALIDAR CAS
  validateCas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(regulatoryResearchDetailsActions.SET_VALIDATE_CAS_LOAD),
      mergeMap((action) => {
        if (action.value?.toLowerCase() === 'n/d') {
          return of(regulatoryResearchDetailsActions.SET_VALIDATE_CAS_SUCCESS({value: true}));
        } else {
          return this.configuracionProductosWizardContenidoService
            .ValidadorCASProcess(action.value)
            .pipe(
              map((response: boolean) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al validar el cas ',
                  ),
                  response,
                );
                return regulatoryResearchDetailsActions.SET_VALIDATE_CAS_SUCCESS({value: response});
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    fileName,
                    servicesLogger.LOG_FAILED,
                    'Al validar el cas ',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        }
      }),
    ),
  );
}
