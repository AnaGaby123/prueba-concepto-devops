import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {EMPTY, of} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';

// Models
// Services
import {
  DatosGraficaSemaforoEntregaObj,
  ProcesosL07ImportacionesPlanificarDespachoService,
  ProveedorListaArriboObj,
} from 'api-logistica';
import {IProvider} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.models';

// Actions
import {planDispatchListActions} from '@appActions/pendings/imports/plan-dispatch';

// Selectors
import {planDispatchListSelectors} from '@appSelectors/pendings/imports/plan-dispatch';

// Utils
import {map as _map, orderBy} from 'lodash-es';
import * as servicesLogger from '@appUtil/logger';

const FILE_NAME = 'plan-dispatch-list.effects.ts';

@Injectable()
export class PlanDispatchListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private planDispatchImportsService: ProcesosL07ImportacionesPlanificarDespachoService,
  ) {}

  // Get providers list
  fetchProviders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        planDispatchListActions.FETCH_PROVIDERS_LOAD,
        planDispatchListActions.SET_SEARCH_TERM,
        planDispatchListActions.SET_SELECTED_BURGER_OPTION,
      ),
      withLatestFrom(
        this.store.select(planDispatchListSelectors.selectProvidersListFilters),
        this.store.select(planDispatchListSelectors.selectNeedsToReloadProviders),
      ),
      mergeMap(([action, params, needsToReload]) => {
        if (!needsToReload) {
          return EMPTY;
        }
        return this.planDispatchImportsService
          .vPDImpListaArriboDetalleProveedorListaArriboObj(params)
          .pipe(
            map((response: Array<ProveedorListaArriboObj>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'AL obtener la lista de proveedores',
                ),
                response,
              );
              let providersList: Array<IProvider> = orderBy(
                response,
                ['MontoTotal'],
                [params.SortDirection as 'asc' | 'desc'],
              );
              providersList = _map(providersList, (o: ProveedorListaArriboObj, index: number) => ({
                ...o,
                Index: index + 1,
              }));
              return planDispatchListActions.FETCH_PROVIDERS_SUCCESS({
                providersList,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'AL obtener la lista de proveedores',
                ),
                error,
              );
              return of(planDispatchListActions.FETCH_PROVIDERS_FAILED());
            }),
          );
      }),
    ),
  );

  // Get chart data
  fetchChartsData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        planDispatchListActions.FETCH_PROVIDERS_LOAD,
        planDispatchListActions.SET_SEARCH_TERM,
        planDispatchListActions.SET_SELECTED_BURGER_OPTION,
      ),
      withLatestFrom(
        this.store.select(planDispatchListSelectors.selectProvidersListFilters),
        this.store.select(planDispatchListSelectors.selectNeedsToReloadProviders),
      ),
      mergeMap(([action, params, needsToReload]) => {
        if (!needsToReload) {
          return EMPTY;
        }
        return this.planDispatchImportsService
          .vPDImpListaArriboDetalleDatosGraficaSemaforoEntregaObj(params)
          .pipe(
            map((response: DatosGraficaSemaforoEntregaObj) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'AL obtener los datos de la gráfica de barras',
                ),
                response,
              );
              return planDispatchListActions.FETCH_BARS_CHART_DATA_SUCCESS({
                barsChartData: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'AL obtener los datos de la gráfica de barras',
                ),
                error,
              );
              return of(planDispatchListActions.FETCH_BARS_CHART_DATA_FAILED());
            }),
          );
      }),
    ),
  );
}
