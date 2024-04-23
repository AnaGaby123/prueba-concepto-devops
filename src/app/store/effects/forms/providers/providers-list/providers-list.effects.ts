import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';

// Actions
import {providersListActions} from '@appActions/forms/providers';
import {SET_LOADING} from '@appActions/utils/utils.action';

// Selectors
import * as providerSelectors from '@appSelectors/forms/providers';

// Models
// Services
import * as apiCatalogos from 'api-catalogos';

import {FiltersOnlyActive} from '@appModels/filters/Filters';

// Utils
import {getArrayForDropDownList} from '@appUtil/util';
import {AppState} from '@appCore/core.state';
import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';
import {QueryResultIVProveedor} from '@appModels/store/forms/providers/providers-list/providers-list.models';
import {buildProvidersListAfterResponse} from '@appHelpers/catalogs/providers/providers-list.helpers';

const FILE_NAME = 'providers-list.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class ProvidersListEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private configuracionProveedoresService: apiCatalogos.ConfiguracionProveedoresService,
    private catalogosService: apiCatalogos.CatalogosService,
    private configuracionAduanasService: apiCatalogos.ConfiguracionAduanasService,
    private sistemaUsuariosService: apiCatalogos.SistemaUsuariosService,
  ) {}

  // DOCS: se obtienen los filtros para la lista de Proveedores ******/
  getProvidersFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(providersListActions.FETCH_PROVIDERS_FILTERS),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const body = new FiltersOnlyActive();
        const buyerBody = new FiltersOnlyActive();
        buyerBody.Filters.push({NombreFiltro: 'GestorDeComprasEImportaciones', ValorFiltro: true});
        const payerBody = new FiltersOnlyActive();
        payerBody.Filters.push({NombreFiltro: 'AnalistaDeCuentasPorPagar', ValorFiltro: true});
        return forkJoin([
          this.catalogosService.catTipoProductoQueryResult({
            ...body,
            SortDirection: 'asc',
            SortField: 'Clave',
          }),
          this.configuracionAduanasService.AgenteAduanalQueryResult({
            ...body,
            SortDirection: 'asc',
            SortField: 'NombreLegal',
          }),
          this.catalogosService.catRutaEntregaQueryResult({
            ...body,
            SortDirection: 'asc',
            SortField: 'RutaEntrega',
          }),
          this.sistemaUsuariosService.UsuarioQueryResult({
            ...buyerBody,
            SortDirection: 'asc',
            SortField: 'NombreCompleto',
          }),
          this.sistemaUsuariosService.UsuarioQueryResult({
            ...payerBody,
            SortDirection: 'asc',
            SortField: 'NombreCompleto',
          }),
        ]).pipe(
          map(
            ([
              resultCatTipoDeProducto,
              resultAgenteAduanal,
              resultCatRutaEntrega,
              resultUsuarioComprador,
              resultUsuarioPagador,
            ]) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return providersListActions.FETCH_PROVIDERS_FILTERS_SUCCESS({
                productTypesOptions: getArrayForDropDownList(
                  resultCatTipoDeProducto.Results,
                  'IdCatTipoProducto',
                  'Tipo',
                ),
                customAgentsOptions: getArrayForDropDownList(
                  resultAgenteAduanal.Results,
                  'IdAgenteAduanal',
                  'NombreComercial',
                ),
                regionOptions: getArrayForDropDownList(
                  resultCatRutaEntrega.Results,
                  'IdCatRutaEntrega',
                  'RutaEntrega',
                ),
                buyerOptions: getArrayForDropDownList(
                  resultUsuarioComprador.Results,
                  'IdUsuario',
                  'NombreCompleto',
                ),
                payerOptions: getArrayForDropDownList(
                  resultUsuarioPagador.Results,
                  'IdUsuario',
                  'NombreCompleto',
                ),
              });
            },
          ),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(providersListActions.FETCH_PROVIDERS_FILTERS_FAILED({error}));
          }),
        );
      }),
    ),
  );

  // DOCS: Obtiene la lista de Proveedores
  fetchProviders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        providersListActions.FETCH_PROVIDERS_FILTERS_SUCCESS,
        providersListActions.SET_STRATEGIC_IS_SELECTED,
        providersListActions.SET_PROVIDERS_FILTER,
        providersListActions.FETCH_CAT_PROVIDERS,
        providersListActions.SET_SEARCH_TERM,
        providersListActions.SET_QUERY_INFO,
      ),
      withLatestFrom(
        this.store.select(providerSelectors.providerListSelectors.selectProviderQueryInfo),
      ),
      mergeMap(([action, queryInfo]) => {
        return this.configuracionProveedoresService.vProveedorQueryResult(queryInfo).pipe(
          map((response) => {
            const providersImage: QueryResultIVProveedor = buildProvidersListAfterResponse(
              response,
            );
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener una página de la lista de proveedores',
              ),
              response,
            );
            return providersListActions.FETCH_CAT_PROVIDERS_SUCCESS({
              response: providersImage,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener una página de la lista de proveedores',
              ),
              error,
            );
            return of(providersListActions.FETCH_CAT_PROVIDERS_FAILED());
          }),
        );
      }),
    ),
  );
}
