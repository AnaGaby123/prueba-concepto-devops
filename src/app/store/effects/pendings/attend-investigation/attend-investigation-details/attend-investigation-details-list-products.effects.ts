import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {catchError, debounceTime, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {
  attendInvestigationAddProductActions,
  attendInvestigationDetailsListProductActions,
} from '@appActions/pendings/attend-investigation';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {attendInvestigationDetailsSelectors} from '@appSelectors/pendings/attend-investigation';
import * as servicesLogger from '@appUtil/logger';
import {addRowIndex} from '@appUtil/util';
import {buildProductsListAddImage} from '@appHelpers/pending/new-product-existing-supplier/attend-investigation/attend-investigation.helper';
import {EMPTY, of} from 'rxjs';
import * as apiCatalogs from 'api-catalogos';
import {
  CatalogosService,
  ConfiguracionProductosMarcasService,
  ConfiguracionProductosService,
} from 'api-catalogos';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'attend-investigation-details-list-products.effects';

@Injectable()
export class AttendInvestigationDetailsListProductsEffects {
  constructor(
    private actions$: Actions,
    private catalogosService: CatalogosService,
    private configProductosMarcasService: ConfiguracionProductosMarcasService,
    private configProductosService: ConfiguracionProductosService,
    private logger: NGXLogger,
    private router: Router,
    private sistemaUXService: apiCatalogs.SistemaUXService,
    private store: Store,
  ) {}

  // DOCS: Init de la lista de productos
  ngOnInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationDetailsListProductActions.INIT_PRODUCT_LIST_EFFECT),
      map((action) => {
        this.store.dispatch(catalogsActions.GET_CAT_AVALABILITY_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_TRADEMARK_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_FAMILY_LINE_LOAD());
        this.store.dispatch(catalogsActions.GET_UNIDAD_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_RESTRICCIONES_FLETE_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_BILLING_RESTRICTION_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_PHYSICAL_STATE_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_USE_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_INTERNATIONAL_DEPOSITARY_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_PRESENTATION_TYPE_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_APPLICATION_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_TRANSPORTATION_WAY_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_TRANSPORTATION_MANAGEMENT_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_PUBLICATIONS_FORMAT_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_UNIT_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_CLASIFICACION_REGULATORIA_LOAD());
        return attendInvestigationDetailsListProductActions.INIT_PRODUCT_LIST_EFFECT_SUCCESS();
      }),
    ),
  );

  // DOCS: Obtención del listado paginado de productos paginado y con filtros
  getListProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(
        attendInvestigationDetailsListProductActions.UPDATE_FILTER_SELECTED,
        attendInvestigationDetailsListProductActions.UPDATE_SORT_DIRECTION,
        attendInvestigationDetailsListProductActions.SET_RUN_SEARCH_TERM,
        attendInvestigationDetailsListProductActions.SET_OPTION_OF_PRODUCT_SELECTED,
        attendInvestigationDetailsListProductActions.SET_LINE_SELECTED,
        attendInvestigationDetailsListProductActions.GET_LIST_PRODUCT_LOAD,
      ),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectQueryInfo),
        this.store.select(attendInvestigationDetailsSelectors.selectSearchTerm),
      ),
      mergeMap(([action, queryInfo, searchTerm]) => {
        if (searchTerm === '') {
          return EMPTY;
        }
        return this.configProductosService.vProductoQueryResult(queryInfo).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los productos',
              ),
              response,
            );
            return attendInvestigationDetailsListProductActions.GET_LIST_PRODUCT_SUCCESS({
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
            return of(attendInvestigationDetailsListProductActions.GET_LIST_PRODUCT_ERROR({error}));
          }),
        );
      }),
    ),
  );

  // DOCS Listado de productos en el buscador de la lista de productos
  getOptionsOfProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationDetailsListProductActions.GET_OPTIONS_OF_PRODUCTS),
      debounceTime(500),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectSuggestionQueryInfo),
      ),
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
              return attendInvestigationDetailsListProductActions.GET_OPTIONS_OF_PRODUCTS_SUCCESS({
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
              return of(
                attendInvestigationDetailsListProductActions.GET_OPTIONS_OF_PRODUCTS_FAILED(),
              );
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  /*DOCS: Obtener mas productos*/
  fetchMoreProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationDetailsListProductActions.FETCH_MORE_PRODUCTS_EFFECT),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectFetchMoreProductsInfo),
      ),
      map(([{event}, {itemList, itemsTotalLength, listRequestStatus, desiredPage, totalPages}]) => {
        // DOCS Validar antes de pedir la siguiente página
        if (
          event.endIndex !== itemList.length - 1 || // DOCS El index del último item no coincida con el final de la página
          event.endIndex === itemsTotalLength - 1 || // DOCS Ya se cargaron todos los resultados
          itemsTotalLength === 0 || // DOCS No hay resultados
          desiredPage > totalPages || // DOCS Se intenta cargar una página que no existe
          itemList.length > itemsTotalLength || // DOCS La lista actual supera el total de resultados
          listRequestStatus === 1 // DOCS Se está obteniendo una página
        ) {
          return attendInvestigationDetailsListProductActions.FETCH_MORE_PRODUCTS_EFFECT_FAILED();
        }
        return attendInvestigationDetailsListProductActions.GET_LIST_PRODUCT_LOAD({
          isFirstPage: false,
        });
      }),
    ),
  );
  // DOCS Dio click sobre agregar producto
  handleAddButtonClick$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationDetailsListProductActions.HANDLE_ADD_BUTTON_CLICK_EFFECT),
      map(() => {
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.attendInvestigation.attendInvestigation,
          appRoutes.attendInvestigation.details,
          appRoutes.attendInvestigation.addProduct,
        ]);
        this.store.dispatch(attendInvestigationAddProductActions.SET_IS_ADD_PRODUCT({value: true}));
        return attendInvestigationDetailsListProductActions.HANDLE_ADD_BUTTON_CLICK_EFFECT_SUCCESS();
      }),
    ),
  );
}
