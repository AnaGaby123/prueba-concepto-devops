// Core imports
import {Injectable} from '@angular/core';

// Selectors
import {brandFormSelectorsDetails, brandFormSelectorsList} from '@appSelectors/forms/brand-form';

// Actions
import {brandFormListAction} from '@appActions/forms/brand-form';
import {SET_LOADING} from '@appActions/utils/utils.action';
import {Actions, createEffect, ofType} from '@ngrx/effects';

// Models
// Services
import {ConfiguracionProductosMarcasService, QueryResultVMarca} from 'api-catalogos';

// Dev tools
import {NGXLogger} from 'ngx-logger';
import {Store} from '@ngrx/store';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

// Utils
import {addRowIndex} from '@appUtil/util';
import * as servicesLogger from '@appUtil/logger';
import {API_REQUEST_STATUS_FAILED, API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';
import {AppState} from '@appCore/core.state';
import {buildBrandsListAddImage} from '@appHelpers/catalogs/brands/brands-list.helpers';

// Variables de apoyo
const FILE_NAME = 'brand-form-list.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class BrandFormListEffects {
  constructor(
    private logger: NGXLogger,
    private store: Store<AppState>,
    private action$: Actions,
    private configBrandsProductsService: ConfiguracionProductosMarcasService,
  ) {}

  // DOCS se obtiene el listado de las marcas paginado
  getListBrands = createEffect(() =>
    this.action$.pipe(
      ofType(
        brandFormListAction.GET_LIST_BRANDS_LOAD,
        brandFormListAction.SET_FILTER_OPTION_SELECTED,
        brandFormListAction.SET_SEARCH_TERM,
      ),
      withLatestFrom(this.store.select(brandFormSelectorsList.selectQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(SET_LOADING({payload: false}));

        this.store.dispatch(
          brandFormListAction.SET_LOADING_CHARGER({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.configBrandsProductsService.vMarcaQueryResult(queryInfo).pipe(
          map((response: QueryResultVMarca) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las marcas',
              ),
              response,
            );
            return brandFormListAction.GET_LIST_BRANDS_SUCCESS({
              data: {
                Results: addRowIndex(
                  queryInfo.desiredPage,
                  queryInfo.pageSize,
                  buildBrandsListAddImage(response.Results),
                ),
                TotalResults: response.TotalResults,
              },
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
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              brandFormListAction.SET_LOADING_CHARGER({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
            return of(brandFormListAction.GET_LIST_BRANDS_ERROR());
          }),
        );
      }),
    ),
  );

  // DOCS: Obtiene la lista de filtros para la ista detalles
  getFiltersList$ = createEffect(() =>
    this.action$.pipe(
      ofType(brandFormListAction.FETCH_FILTERS_LIST_LOAD),
      withLatestFrom(this.store.select(brandFormSelectorsDetails.selectNeedsToReloadFiltersList)),
      mergeMap(([action, needsToReload]) => {
        if (needsToReload) {
          return this.configBrandsProductsService.FiltrosMarcasObjObtener().pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener listad de filtros',
                ),
                response,
              );
              return brandFormListAction.FETCH_FILTERS_LIST_SUCCESS({filtersList: response});
            }),
          );
        } else {
          return EMPTY;
        }
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al obtener listado de filtros',
          ),
          error,
        );
        return EMPTY;
      }),
    ),
  );
}
