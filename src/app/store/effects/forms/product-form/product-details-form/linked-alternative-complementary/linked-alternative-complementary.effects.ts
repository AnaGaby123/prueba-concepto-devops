/* Core Imports*/
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, debounceTime, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import * as apiCatalogs from 'api-catalogos';
import {
  ConfiguracionProductosService,
  ProductoAlternativoRelacion,
  ProductoComplementarioRelacion,
  VProductoComplementario,
} from 'api-catalogos';

/* Dev Tools*/
import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';
import {productLinkedActions} from '@appActions/forms/product-form';
import {
  productDetailsSelectors,
  productLinkedSelectors,
  productLogisticSelectors,
} from '@appSelectors/forms/product-form';
import {SET_LOADING} from '@appActions/utils/utils.action';
import {DEFAULT_UUID, PAGING_LIMIT} from '@appUtil/common.protocols';
import {addRowIndex, extractID} from '@appUtil/util';
import {
  buildAlternativeProductsAddImage,
  buildComplementaryProductsAddImage,
  buildProductsAddImage,
} from '@appHelpers/catalogs/products/linked-alternative-complementary.helper';

const FILE_NAME = 'Product-form-linked';

@Injectable()
export class LinkedAlternativeComplementaryEffects {
  constructor(
    private store: Store,
    private action$: Actions,
    private logger: NGXLogger,
    private productosRelacionService: apiCatalogs.ConfiguracionProductosRelacionService,
    private sistemaUXService: apiCatalogs.SistemaUXService,
    private configProductosService: ConfiguracionProductosService,
    private configuracionProductoWizard: apiCatalogs.ConfiguracionProductosWizardContenidoService,
  ) {}

  // DOCS: OBTIENE PRODUCTOS ALTERNATIVOS RELACIONADOS
  fetchAlternativeProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(productLinkedActions.FETCH_ALTERNATIVE_PRODUCTS_LOAD),
      withLatestFrom(
        this.store.select(productDetailsSelectors.selectProductDetails),
        this.store.select(productLinkedSelectors.selectNeedsToReloadLinkes),
      ),
      mergeMap(([action, productDetails, needToReload]) => {
        if (needToReload) {
          return this.configuracionProductoWizard
            .vProductoAlternativoConsultaProcess(productDetails.IdProducto)
            .pipe(
              map((response: VProductoComplementario[]) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener productos alternativos',
                  ),
                  response,
                );
                const buildAlternativeProducts = buildAlternativeProductsAddImage(response);
                this.store.dispatch(
                  productLinkedActions.FETCH_ALTERNATIVE_PRODUCTS_SUCCESS({
                    alternatives: buildAlternativeProducts,
                  }),
                );
                return productLinkedActions.FETCH_COMPLEMENTARIES_PRODUCTS_LOAD();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener productos alternativos',
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

  // DOCS: OBTIENE LOS PRODUCTOS COMPLEMENTARIOS RELACIONADOS
  fetchComplementary$ = createEffect(() =>
    this.action$.pipe(
      ofType(productLinkedActions.FETCH_COMPLEMENTARIES_PRODUCTS_LOAD),
      withLatestFrom(this.store.select(productDetailsSelectors.selectProductDetails)),
      mergeMap(([action, productDetails]) => {
        return this.configuracionProductoWizard
          .vProductoComplementarioConsultaProcess(productDetails.IdProducto)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener productos complementarios',
                ),
                response,
              );
              const buildCompletaryProducts = buildComplementaryProductsAddImage(response);
              return productLinkedActions.FETCH_COMPLEMENTARIES_PRODUCTS_SUCCESS({
                complementaries: buildCompletaryProducts,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener productos complementarios',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS: OBTIENE LA LISTA DE PRODUCTOS
  fetchProductsList$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        productLinkedActions.SET_SELECTED_SEARCH_OPTION,
        productLinkedActions.FETCH_PRODUCTS_LOAD,
      ),
      withLatestFrom(
        this.store.select(productLinkedSelectors.selectQueryInfo),
        this.store.select(productLinkedSelectors.selectSearchTerm),
        this.store.select(productLinkedSelectors.selectedSearchOption),
        this.store.select(productLinkedSelectors.selectVProductoAlternativo),
        this.store.select(productLinkedSelectors.selectvProductoComplementario),
        this.store.select(productLinkedSelectors.selectTabSelected),
        this.store.select(productLinkedSelectors.selectedTypeOfSearch),
      ),
      mergeMap(
        ([
          action,
          queryInfo,
          searchTerm,
          searchOption,
          alternative,
          complementary,
          tab,
          typeOfSearch,
        ]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          let pageSize = PAGING_LIMIT;
          if (tab.id === '1') {
            pageSize = pageSize - alternative.length;
          } else {
            pageSize = pageSize - complementary.length;
          }
          const query = {...queryInfo};
          query.pageSize = pageSize;
          const nombreFiltro =
            typeOfSearch.value === '1'
              ? 'Catalogo'
              : typeOfSearch.value === '2'
              ? 'Descripcion'
              : 'CAS';
          query.Filters = [
            {
              NombreFiltro: nombreFiltro,
              ValorFiltro: searchTerm,
            },
          ];
          return this.configProductosService.vProductoQueryResult(query).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los productos',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              const buildProducts = buildProductsAddImage(
                addRowIndex(queryInfo.desiredPage, pageSize, response.Results),
              );
              return productLinkedActions.FETCH_PRODUCTS_SUCCESS({
                list: buildProducts,
                totalResults: response.TotalResults,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los productos',
                ),
                error,
              );
              return EMPTY;
            }),
          );
        },
      ),
    ),
  );

  // DOCS: OBTIENE LA SUGERENCIA DE BUSQUEDA DE PRODUCTOS
  fetchOptionsOfProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(productLinkedActions.FETCH_OPTIONS_OF_PRODUCTS_LOAD),
      debounceTime(500),
      withLatestFrom(this.store.select(productLinkedSelectors.selectSuggestionQueryInfo)),
      mergeMap(([action, searchSuggestion]) => {
        if (searchSuggestion.ParametroBusqueda !== '') {
          return this.sistemaUXService.SugerenciasBusquedaProcess(searchSuggestion).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los productos.',
                ),
                response,
              );
              return productLinkedActions.FETCH_OPTIONS_OF_PRODUCTS_SUCCESS({
                products: response,
              });
            }),
          );
        }
        return EMPTY;
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_SUCCEEDED,
            'Al obtener los productos.',
          ),
          error,
        );
        return EMPTY;
      }),
    ),
  );

  // DOCS: GUARDA RELACION DE PRODUCTO SELECCIONADO
  saveRelatedProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(productLinkedActions.SAVE_PRODUCT_RELATED_LOAD),
      withLatestFrom(
        this.store.select(productLinkedSelectors.selectTabSelected),
        this.store.select(productLogisticSelectors.selectProductType),
      ),
      mergeMap(([action, tab, productNode]) => {
        let product = action.product;
        if (tab.id === '1') {
          let query: ProductoAlternativoRelacion = {
            Activo: true,
            IdProducto: productNode.IdProducto,
            IdProductoAlternativo: action.product.IdProducto,
            IdProductoAlternativoRelacion: DEFAULT_UUID,
          };
          return this.productosRelacionService
            .ProductoAlternativoRelacionGuardarOActualizar(query)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar relacion de producto alternativo',
                  ),
                  response,
                );
                query = {
                  ...query,
                  IdProductoAlternativoRelacion: extractID(response),
                };
                product = {
                  ...product,
                  ...query,
                };
                return productLinkedActions.SAVE_PRODUCT_ALTERNATIVE_SUCCESS({
                  product,
                  IdProducto: query.IdProductoAlternativo,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar relacion de producto alternativo',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        } else {
          let query: ProductoComplementarioRelacion = {
            Activo: true,
            IdProducto: productNode.IdProducto,
            IdProductoComplementario: action.product.IdProducto,
            IdProductoComplementarioRelacion: DEFAULT_UUID,
          };
          return this.productosRelacionService
            .ProductoComplementarioRelacionGuardarOActualizar(query)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar relacion de producto complementario',
                  ),
                  response,
                );
                query = {
                  ...query,
                  IdProductoComplementarioRelacion: extractID(response),
                };
                product = {
                  ...product,
                  ...query,
                };
                return productLinkedActions.SAVE_PRODUCT_COMPLEMENTARY_SUCCESS({
                  product,
                  IdProducto: query.IdProductoComplementario,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar relacion de producto alternativo',
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

  // DOCS: DESHABILITA RELACION DE PRODUCTO SELECCIONADO
  disableRelatedProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(productLinkedActions.DISABLE_PRODUCT_RELATED_LOAD),
      withLatestFrom(this.store.select(productLinkedSelectors.selectTabSelected)),
      mergeMap(([action, tab]) => {
        if (tab.id === '1') {
          const IdProducto = action.product.IdProducto;
          return this.productosRelacionService
            .ProductoAlternativoRelacionDesactivar(action.product.IdProductoAlternativoRelacion)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al deshabilitar relacion de producto alternativo',
                  ),
                  response,
                );
                return productLinkedActions.DISABLE_ALTERNATIVE_SUCCESS({
                  response: extractID(response),
                  IdProducto,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al deshabilitar relacion de producto alternativo',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        } else {
          const IdProducto = action.product.IdProducto;
          return this.productosRelacionService
            .ProductoComplementarioRelacionDesactivar(
              action.product.IdProductoComplementarioRelacion,
            )
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al deshabilitar relacion de producto complementario',
                  ),
                  response,
                );
                return productLinkedActions.DISABLE_COMPLEMENTARY_SUCCESS({
                  response: extractID(response),
                  IdProducto,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al deshabilitar relacion de producto complementario',
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
