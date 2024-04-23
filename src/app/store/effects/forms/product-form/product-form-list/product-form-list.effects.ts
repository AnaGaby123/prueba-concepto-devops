import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, debounceTime, map, mergeMap, withLatestFrom} from 'rxjs/operators';
/* Dev Tools */
import {addRowIndex} from '@appUtil/util';
import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';
// Models
// Services
import * as apiCatalogs from 'api-catalogos';
import {
  CatalogosService,
  ConfiguracionProductosMarcasService,
  ConfiguracionProductosService,
  QueryResultVProducto,
} from 'api-catalogos';
// Actions
import * as listProductActions from '@appActions/forms/product-form/product-form-list/product-form-list.actions';
// Selectors
import * as listProductSelectors from '@appSelectors/forms/product-form/product-form-list/product-form-list.selectors';
import {EMPTY, of} from 'rxjs';
import {AppState} from '@appCore/core.state';
import {buildProductsListAddImage} from '@appHelpers/catalogs/products/product-form-list.helpers';

const FILE_NAME = 'product-form-list.effects';

@Injectable({
  providedIn: 'root',
})
export class ProductFormListEffects {
  constructor(
    private logger: NGXLogger,
    private store: Store<AppState>,
    private action$: Actions,
    private configProductosMarcasService: ConfiguracionProductosMarcasService,
    private configProductosService: ConfiguracionProductosService,
    private catalogosService: CatalogosService,
    private sistemaUXService: apiCatalogs.SistemaUXService,
  ) {}

  // DOCS: Obtención del listado paginado de productos paginado y con filtros
  getListProduct = createEffect(() =>
    this.action$.pipe(
      ofType(
        listProductActions.GET_LIST_PRODUCT_LOAD,
        listProductActions.UPDATE_FILTER_SELECTED,
        listProductActions.UPDATE_SORT_DIRECTION,
        listProductActions.SET_RUN_SEARCH_TERM,
        listProductActions.SET_OPTION_OF_PRODUCT_SELECTED,
        listProductActions.CLEAR_SEARCH_TERM,
        listProductActions.SET_LINE_SELECTED,
      ),
      withLatestFrom(this.store.select(listProductSelectors.selectQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        return this.configProductosService.vProductoQueryResult(queryInfo).pipe(
          map((response: QueryResultVProducto) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los productos',
              ),
              response,
            );
            return listProductActions.GET_LIST_PRODUCT_SUCCESS({
              datos: {
                Results: addRowIndex(
                  queryInfo.desiredPage,
                  queryInfo.pageSize,
                  buildProductsListAddImage(response.Results),
                ),
                TotalResults: response.TotalResults,
              },
            });
          }),
          catchError((error) => {
            return of(listProductActions.GET_LIST_PRODUCT_ERROR({error}));
          }),
        );
      }),
    ),
  );

  getOptionsOfProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(listProductActions.GET_OPTIONS_OF_PRODUCTS),
      debounceTime(500),
      withLatestFrom(this.store.select(listProductSelectors.selectSuggestionQueryInfo)),
      mergeMap(([action, searchSuggestionParameters]) => {
        if (action.searchTerm) {
          return this.sistemaUXService.SugerenciasBusquedaProcess(searchSuggestionParameters).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los productos.',
                ),
                response,
              );
              return listProductActions.GET_OPTIONS_OF_PRODUCTS_SUCCESS({
                products: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los productos.',
                ),
                error,
              );
              return of(listProductActions.GET_OPTIONS_OF_PRODUCTS_FAILED());
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
}
