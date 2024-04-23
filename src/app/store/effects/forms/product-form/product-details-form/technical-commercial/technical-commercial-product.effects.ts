import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {SET_LOADING, SET_LOADING_ERROR, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import * as servicesLogger from '@appUtil/logger';
import {LOG_SUCCEEDED} from '@appUtil/logger';
import {EMPTY, forkJoin, of} from 'rxjs';
import {
  productFormActions,
  technicalCommercialInvestigationActions,
} from '@appActions/forms/product-form';
import {
  CatalogosService,
  ConfiguracionProductosMarcasFamiliasService,
  ConfiguracionProductosRelacionService,
  ConfiguracionProductosService,
  ConfiguracionProductosTipoEspecificadoService,
  ConfiguracionProductosWizardContenidoService,
  ConfiguracionProveedoresRelacionesService,
  Producto,
  ProductoCapacitacion,
  ProductoDispositivoMedico,
  ProductoEstandar,
  ProductoLabware,
  ProductoPublicacion,
  ProductoReactivo,
  ProductoSuplementario,
  VProductoDetalle,
  VProductoSuplementario,
} from 'api-catalogos';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {
  productDetailsSelectors,
  productTechnicalCommercialInvestigationSelectors,
} from '@appSelectors/forms/product-form';
import {filter, isEmpty} from 'lodash-es';
import {extractID} from '@appUtil/util';
import * as catalogsSelector from '@appSelectors/catalogs/catalogs.selectors';
import * as catalogActions from '@appActions/catalogs/catalogos.actions';
import * as catalogosActions from '@appActions/catalogs/catalogos.actions';
import {
  IProductDetails,
  ProductDetailsData,
} from '@appHelpers/catalogs/products/technicalCommercialInvestigation.helpers';
import {
  DEFAULT_DATE,
  DEFAULT_UUID,
  ENUM_PRODUCT_FAMILY_KEY,
  MINIO_BUCKETS,
} from '@appUtil/common.protocols';
import {MinioService} from '@appServices/minio/minio.service';
import {PRODUCTS_CATALOG_TITLE_SEE_PRODUCT} from '@appModels/store/forms/product-form/product-form-.module';

const FILE_NAME = 'add-edit-product.ts';

@Injectable()
export class ProductsFormDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private configuracionProductosWizardContenidoService: ConfiguracionProductosWizardContenidoService,
    private configuracionProductosMarcasFamiliasService: ConfiguracionProductosMarcasFamiliasService,
    private configService: ConfiguracionProveedoresRelacionesService,
    private configuracionProductosService: ConfiguracionProductosService,
    private configuracionProductosTipoEspecificadoService: ConfiguracionProductosTipoEspecificadoService,
    private catalogosService: CatalogosService,
    private minioService: MinioService,
    private configuracionProductosRelacionService: ConfiguracionProductosRelacionService,
  ) {}

  // DOCS SE obtiene el vProductoDetalle del producto seleccionado
  getProductDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(technicalCommercialInvestigationActions.SET_PRODUCT_SELECTED),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.configuracionProductosWizardContenidoService
          .vProductoDetalleProcess(action.productSelectedId)
          .pipe(
            map((response: VProductoDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los detalle del producto',
                ),
                response,
              );
              this.store.dispatch(
                catalogActions.GET_CAT_CLASSIFICATIONS_LOAD({
                  IdCatSubtipoProducto: response.IdCatSubtipoProducto,
                }),
              );
              return response;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los detalle del producto',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));

              return of(technicalCommercialInvestigationActions.GET_PRODUCT_DETAILS_ERROR());
            }),
          );
      }),
      switchMap((productDetails: VProductoDetalle) => {
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdMarca',
          ValorFiltro: productDetails.IdMarca,
        });
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
            this.store.dispatch(
              technicalCommercialInvestigationActions.SET_SUCCESS_TYPE_PRODUCT_FAMILY({
                payload: response.Results,
              }),
            );
            return {productDetails, typeProduct: response.Results};
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
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(technicalCommercialInvestigationActions.SET_ERROR_TYPE_PRODUCT_FAMILY());
          }),
        );
      }),
      switchMap((data: IProductDetails) => {
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdMarcaFamilia',
          ValorFiltro: data.productDetails.IdMarcaFamilia,
        });
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
            this.store.dispatch(
              technicalCommercialInvestigationActions.SET_SUCCESS_CHARASTERISTIC_GROUPER({
                payload: response.Results,
              }),
            );
            return {...data, characteristicGrouper: response.Results};
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
            return of(technicalCommercialInvestigationActions.SET_FAILED_CHARASTERISTIC_GROUPER());
          }),
        );
      }),
      withLatestFrom(
        this.store.select(
          productTechnicalCommercialInvestigationSelectors.selectCatTrademarkDropDownList,
        ),
        this.store.select(productDetailsSelectors.selectListAvailabilityForDropDown),
        this.store.select(catalogsSelector.selectCatUnitForDropDown),
        this.store.select(catalogsSelector.selectRestriccionesFleteForDropDown),
        this.store.select(catalogsSelector.selectCatBillingRestrictionForDropDown),
        this.store.select(catalogsSelector.selectCatPhysicalStateForDropDown),
        this.store.select(catalogsSelector.selectCatUseForDropDown),
        this.store.select(catalogsSelector.selectCatPublicationsFormatForDropDown),
        this.store.select(catalogsSelector.selectCatInternationalDepositaryForDropDown),
        this.store.select(catalogsSelector.selectCatPresentationTypeForDropDown),
        this.store.select(catalogsSelector.selectCatApplicationForDropDown),
        this.store.select(catalogsSelector.selectCatTransportationWayForDropDown),
        this.store.select(catalogsSelector.selectCatTransportationManagmentForDropDown),
      ),
      switchMap(
        ([
          data,
          CatTrademark,
          CatAvailability,
          CatUnit,
          CatFreightRestrictions,
          CatBillingRestrictions,
          CatPhyscalState,
          CatUse,
          CatPublicationFormate,
          CatInternationalDepositary,
          CatPresentationType,
          CatApplication,
          CatTransportationWay,
          CatTransportationManagment,
        ]) => {
          const body = new FiltersOnlyActive();
          body.Filters.push({
            NombreFiltro: 'IdCatSubtipoProducto',
            ValorFiltro: data['productDetails'].IdCatSubtipoProducto,
          });
          return this.catalogosService.catClasificacionInformativaProductoQueryResult(body).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_SUCCEEDED,
                  FILE_NAME,
                  'Al obtener el catálogo de clasificaciones',
                ),
                response,
              );
              this.store.dispatch(
                catalogosActions.GET_CAT_CLASSIFICATIONS_SUCCESS({
                  listClassifications: response.Results,
                }),
              );
              const dataResult = {
                ...data,
                classificationProduct: response.Results,
              } as IProductDetails;
              this.store.dispatch(SET_LOADING({payload: false}));
              return technicalCommercialInvestigationActions.GET_PRODUCT_DETAILS_SUCCESS({
                payload: ProductDetailsData(
                  dataResult,
                  CatTrademark,
                  CatAvailability,
                  CatUnit,
                  CatBillingRestrictions,
                  CatFreightRestrictions,
                  CatPhyscalState,
                  CatUse,
                  CatPublicationFormate,
                  CatInternationalDepositary,
                  CatPresentationType,
                  CatApplication,
                  CatTransportationWay,
                  CatTransportationManagment,
                ),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catálogo de clasificaciones',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(catalogosActions.GET_CAT_CLASSIFICATIONS_FAILED());
            }),
          );
        },
      ),
    ),
  );

  // DOCS Se consultan los productos suplementarios
  getSuplementaryProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(technicalCommercialInvestigationActions.GET_PRODUCT_DETAILS_SUCCESS),
      withLatestFrom(
        this.store.select(productTechnicalCommercialInvestigationSelectors.selectProductData),
      ),
      mergeMap(([action, product]) => {
        return this.configuracionProductosWizardContenidoService
          .vProductoSuplementarioConsultaProcess(product.IdProducto)
          .pipe(
            map((response: VProductoSuplementario[]) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la lista de productos suplementarios',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return technicalCommercialInvestigationActions.SET_SUPPLEMENTARY_PRODUCT_SUCCESS({
                payload: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la lista de productos suplementarios',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(technicalCommercialInvestigationActions.SET_SUPPLEMENTARY_PRODUCT_FAILED());
            }),
          );
      }),
    ),
  );

  // DOCS Se consultan los tipos de producto (familia) con base al id de la marca
  getTypeProductFamily = createEffect(() =>
    this.actions$.pipe(
      ofType(technicalCommercialInvestigationActions.SET_LOAD_TYPE_PRODUCT_FAMILY),
      mergeMap((action) => {
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdMarca',
          ValorFiltro: action.selectedTradeMarkdId,
        });
        body.defineSort('NombreFamilia');
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
            return technicalCommercialInvestigationActions.SET_SUCCESS_TYPE_PRODUCT_FAMILY({
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
            return of(technicalCommercialInvestigationActions.SET_ERROR_TYPE_PRODUCT_FAMILY());
          }),
        );
      }),
    ),
  );

  // DOCS Se valida el cat del producto estandar
  getCatValidation = createEffect(() =>
    this.actions$.pipe(
      ofType(technicalCommercialInvestigationActions.SET_VALIDATE_CAS),
      mergeMap((action) => {
        if (action.value?.toLowerCase() === 'n/d') {
          return of(
            technicalCommercialInvestigationActions.SET_VALIDATE_CAS_SUCCESS({
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
                return technicalCommercialInvestigationActions.SET_VALIDATE_CAS_SUCCESS({
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
                return of(technicalCommercialInvestigationActions.SET_VALIDATE_CAS_FAILED());
              }),
            );
        }
      }),
    ),
  );

  // DOCS Se consultan los agrupadores de caracteristicas con base al id de la marcaFamilia
  getCharacteristicGrouper = createEffect(() =>
    this.actions$.pipe(
      ofType(technicalCommercialInvestigationActions.SET_LOAD_CHARASTERISTIC_GROUPER),
      mergeMap((action) => {
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdMarcaFamilia',
          ValorFiltro: action.payload,
        });
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
            return technicalCommercialInvestigationActions.SET_SUCCESS_CHARASTERISTIC_GROUPER({
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
            return of(technicalCommercialInvestigationActions.SET_FAILED_CHARASTERISTIC_GROUPER());
          }),
        );
      }),
    ),
  );

  // DOCS: Se hace el guardado o actualización para un producto
  saveProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_LOAD),
      withLatestFrom(
        this.store.select(productTechnicalCommercialInvestigationSelectors.selectProductData),
      ),
      mergeMap(([action, product]) => {
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
            return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUCCESS({
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
            return of(technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAILED());
          }),
        );
      }),
    ),
  );
  // DOCS: GUARDAR ARCHIVO ESTRUCTURA MOLECULAR
  saveMolecularStructure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUCCESS),
      withLatestFrom(
        this.store.select(productDetailsSelectors.selectProductDetails),
        this.store.select(
          productTechnicalCommercialInvestigationSelectors.selectStructureMolecular,
        ),
      ),
      mergeMap(async ([action, vProduct, structureMolecular]) => {
        if (structureMolecular !== null) {
          try {
            const fileName = `${new Date().getFullYear()}/${
              vProduct.IdProducto
            }/${new Date().getTime()}/${structureMolecular.name}`;
            const fileUploaded = await this.minioService
              .uploadFile(structureMolecular, fileName, MINIO_BUCKETS.Products)
              .catch((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar el archivo de estructura molecular.',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(
                  SET_LOADING_ERROR({
                    active: true,
                    message: 'Ha ocurrido un error',
                  }),
                );
                return EMPTY;
              });
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar el archivo de estructura molecular.',
              ),
            );
            return technicalCommercialInvestigationActions.SAVE_MOLECULAR_STRUCTURE_FILE_SUCCESS({
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
          return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_LOAD();
        }
      }),
    ),
  );

  // DOCS Se hace el guardado o actualización para un producto dependiendo de la configuración
  saveTypeProductFamily$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        technicalCommercialInvestigationActions.SAVE_MOLECULAR_STRUCTURE_FILE_SUCCESS,
        technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_LOAD,
      ),
      withLatestFrom(
        this.store.select(productTechnicalCommercialInvestigationSelectors.selectProduct),
        this.store.select(productTechnicalCommercialInvestigationSelectors.selectProductToSave),
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
                return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS(
                  {
                    payload: response,
                  },
                );
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
                  technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED(),
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
                return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS(
                  {
                    payload: response,
                  },
                );
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
                  technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED(),
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
                return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS(
                  {
                    payload: response,
                  },
                );
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
                  technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED(),
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
                return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS(
                  {
                    payload: response,
                  },
                );
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
                  technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED(),
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
                return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS(
                  {
                    payload: response,
                  },
                );
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
                  technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED(),
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
                return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS(
                  {
                    payload: response,
                  },
                );
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
                  technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED(),
                );
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
      ofType(technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS),
      withLatestFrom(
        this.store.select(productTechnicalCommercialInvestigationSelectors.selectProductToDelete),
        this.store.select(productTechnicalCommercialInvestigationSelectors.selectProductData),
      ),
      mergeMap(([action, productConfiguration, productData]) => {
        if (!isEmpty(productConfiguration)) {
          const typeProductFamily = filter(Object.keys(productConfiguration), (o) =>
            o === 'IdProductoReactivo'
              ? 'Reactivos'
              : o === 'IdProductoEstandar'
              ? 'Estandares'
              : o === 'IdProductoPublicacion'
              ? 'Publicaciones'
              : o === 'IdProductoLabware'
              ? 'Labware'
              : o === 'IdDispositivoMedico'
              ? 'Dispositivo Medico'
              : o === 'IdProductoCapacitacion'
              ? 'Capacitaciones'
              : null,
          );

          if (typeProductFamily[0] === 'IdProductoEstandar') {
            return this.configuracionProductosTipoEspecificadoService
              .ProductoEstandarDesactivar(
                (productConfiguration as ProductoEstandar).IdProductoEstandar,
              )
              .pipe(
                map((response) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al Desactivar un producto estandar ',
                    ),
                    response,
                  );
                  return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUPPLEMENT();
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al Desactivar un producto estandar ',
                    ),
                    error,
                  );
                  return EMPTY;
                }),
              );
          } else if (typeProductFamily[0] === 'IdProductoReactivo') {
            return this.configuracionProductosTipoEspecificadoService
              .ProductoReactivoDesactivar(
                (productConfiguration as ProductoReactivo).IdProductoReactivo,
              )
              .pipe(
                map((response) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al Desactivar un producto reactivo ',
                    ),
                    response,
                  );
                  return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUPPLEMENT();
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al Desactivar un producto reactivo ',
                    ),
                    error,
                  );
                  return EMPTY;
                }),
              );
          } else if (typeProductFamily[0] === 'IdProductoPublicacion') {
            return this.configuracionProductosTipoEspecificadoService
              .ProductoPublicacionDesactivar(
                (productConfiguration as ProductoPublicacion).IdProductoPublicacion,
              )
              .pipe(
                map((response) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al Desactivar un producto publicaciones ',
                    ),
                    response,
                  );
                  return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUPPLEMENT();
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al Desactivar un producto publicaciones ',
                    ),
                    error,
                  );
                  return EMPTY;
                }),
              );
          } else if (typeProductFamily[0] === 'IdProductoLabware') {
            return this.configuracionProductosTipoEspecificadoService
              .ProductoLabwareDesactivar(
                (productConfiguration as ProductoLabware).IdProductoLabware,
              )
              .pipe(
                map((response) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al Desactivar un producto labware ',
                    ),
                    response,
                  );
                  return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUPPLEMENT();
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al Desactivar un producto labware ',
                    ),
                    error,
                  );
                  return EMPTY;
                }),
              );
          } else if (typeProductFamily[0] === 'IdProductoDispositivoMedico') {
            return this.configuracionProductosTipoEspecificadoService
              .ProductoDispositivoMedicoDesactivar(
                (productConfiguration as ProductoDispositivoMedico).IdProductoDispositivoMedico,
              )
              .pipe(
                map((response) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al Desactivar un producto Dispositivo Medico ',
                    ),
                    response,
                  );
                  return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUPPLEMENT();
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al Desactivar un producto Dispositivo Medico ',
                    ),
                    error,
                  );
                  return EMPTY;
                }),
              );
          } else if (typeProductFamily[0] === 'IdProductoCapacitacion') {
            return this.configuracionProductosTipoEspecificadoService
              .ProductoCapacitacionDesactivar(
                (productConfiguration as ProductoCapacitacion).IdProductoCapacitacion,
              )
              .pipe(
                map((response) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al Desactivar una capacitacion',
                    ),
                    response,
                  );
                  return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUPPLEMENT();
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al Desactivar una capacitacion',
                    ),
                    error,
                  );
                  return EMPTY;
                }),
              );
          }
        } else {
          return of(technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUPPLEMENT());
        }
      }),
    ),
  );
  // DOCS Se hace el guardado de un producto para la relacion del producto suplementarios
  saveProductSupplement = createEffect(() =>
    this.actions$.pipe(
      ofType(technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUPPLEMENT),
      withLatestFrom(
        this.store.select(productTechnicalCommercialInvestigationSelectors.selectProductData),
        this.store.select(
          productTechnicalCommercialInvestigationSelectors.selectsSupplementaryProductsToSave,
        ),
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
          technicalCommercialInvestigationActions.SET_DELETE_PRODUCT_SUPPLEMENT_LOAD(),
        );
        return EMPTY;
      }),
      withLatestFrom(
        this.store.select(
          productTechnicalCommercialInvestigationSelectors.selectProductPublicationsData,
        ),
        this.store.select(
          productTechnicalCommercialInvestigationSelectors.selectsSupplementaryProductsToSave,
        ),
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
            return of(technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUPPLEMENT_FAILED());
          }),
        );
      }),
      withLatestFrom(
        this.store.select(productTechnicalCommercialInvestigationSelectors.selectProductData),
      ),
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
            return technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUPPLEMENT_SUCCESS();
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
            return of(technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUPPLEMENT_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS Se hace el desactivado de un producto para la relacion del producto suplementarios y su relacion
  saveProductSupplementDelete = createEffect(() =>
    this.actions$.pipe(
      ofType(
        technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUPPLEMENT_SUCCESS,
        technicalCommercialInvestigationActions.SET_DELETE_PRODUCT_SUPPLEMENT_LOAD,
      ),
      withLatestFrom(
        this.store.select(
          productTechnicalCommercialInvestigationSelectors.selectsSupplementaryProductsToDelete,
        ),
        this.store.select(productTechnicalCommercialInvestigationSelectors.selectProductData),
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
                technicalCommercialInvestigationActions.SET_DELETE_PRODUCT_SUPPLEMENT_FAILED(),
              );
            }),
          );
        }
        this.store.dispatch(SET_LOADING({payload: false}));
        this.store.dispatch(productFormActions.SET_ENABLE_EDIT({enableEdit: false}));
        this.store.dispatch(productFormActions.SET_EDIT_MODE({editMode: true}));
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
          technicalCommercialInvestigationActions.SET_PRODUCT_SELECTED({
            productSelectedId: productData.IdProducto,
          }),
        );
        return EMPTY;
      }),
      withLatestFrom(
        this.store.select(productTechnicalCommercialInvestigationSelectors.selectProductData),
      ),
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
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(productFormActions.SET_ENABLE_EDIT({enableEdit: false}));
              this.store.dispatch(productFormActions.SET_EDIT_MODE({editMode: true}));
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
                technicalCommercialInvestigationActions.SET_PRODUCT_SELECTED({
                  productSelectedId: productData.IdProducto,
                }),
              );

              return technicalCommercialInvestigationActions.SET_DELETE_PRODUCT_SUPPLEMENT_SUCCESS();
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
                technicalCommercialInvestigationActions.SET_DELETE_PRODUCT_SUPPLEMENT_FAILED(),
              );
            }),
          );
        },
      ),
    ),
  );
}
