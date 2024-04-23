/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import * as servicesLogger from '@appUtil/logger';

/* Tools Imports */
import {filter, map as _map} from 'lodash-es';

/* Models Imports */
import {
  MonitorearDespachoTotales,
  ProcesosL07ImportacionesMonitorearDespachoService,
  QueryResultVImpMDProveedor,
} from 'api-logistica';

/* Actions Imports */
import {
  dispatchMonitoringActions,
  dispatchMonitoringDetailsActions,
  dispatchMonitoringListActions,
} from '@appActions/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring.dictionaty.actions';

/* Selectors Imports */
import {dispatchMonitoringListSelectors} from '@appSelectors/pendings/purchasing-manager/dispatch-monitoring';
import {IProvidersDispatchMonitoring} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list.models';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'Dispatch-Monitoring-List.effects';

@Injectable()
export class DispatchMonitoringListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private dispatchMonitoringServices: ProcesosL07ImportacionesMonitorearDespachoService,
  ) {}

  fetchProviders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        dispatchMonitoringListActions.FETCH_PROVIDERS_LOAD,
        dispatchMonitoringListActions.SET_SEARCH_TERM,
        dispatchMonitoringListActions.SET_SORT_OPTION,
      ),
      withLatestFrom(
        this.store.select(dispatchMonitoringListSelectors.selectQueryInfoProviders),
        this.store.select(dispatchMonitoringListSelectors.selectNeedsToReloadProviders),
      ),
      mergeMap(([action, queryInfo, needsToReload]) => {
        if (needsToReload) {
          return this.dispatchMonitoringServices.vImpMDProveedorQueryResult(queryInfo).pipe(
            map((response: QueryResultVImpMDProveedor) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar proveedores.',
                ),
                response,
              );
              const providers: Array<IProvidersDispatchMonitoring> = _map(
                response.Results,
                (provider, index) => ({
                  ...provider,
                  Index: index + 1,
                }),
              );
              return dispatchMonitoringListActions.FETCH_PROVIDERS_SUCCESS({
                providers,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar proveedores.',
                ),
                error,
              );
              return of(dispatchMonitoringListActions.FETCH_PROVIDERS_FAILED);
            }),
          );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );

  fetchDataCharts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dispatchMonitoringListActions.FETCH_DATA_CHARTS_LOAD),
      withLatestFrom(this.store.select(dispatchMonitoringListSelectors.selectNeedsToReloadCharts)),
      mergeMap(([action, needsToReload]) => {
        if (needsToReload) {
          return this.dispatchMonitoringServices.MonitorearDespachoTotalesObtener().pipe(
            map((response: MonitorearDespachoTotales) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la información de las gráficas.',
                ),
                response,
              );
              return dispatchMonitoringListActions.FETCH_DATA_CHARTS_SUCCESS({
                dataCharts: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la información de las gráficas.',
                ),
                error,
              );
              return of(dispatchMonitoringListActions.FETCH_DATA_CHARTS_FAILED);
            }),
          );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );
  setProviderSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dispatchMonitoringDetailsActions.SET_PROVIDER_SELECTED),
      withLatestFrom(this.store.select(dispatchMonitoringListSelectors.selectProviders)),
      mergeMap(([action, dataProviders]) => {
        const dataProviderSelected: IProvidersDispatchMonitoring = filter(
          dataProviders,
          (provider) => provider.NombreProveedor === action.providerSelected.NombreProveedor,
        )[0];
        this.store.dispatch(
          dispatchMonitoringActions.SET_ALLOWED_TO_DETAILS_VALUE({
            allowedToDetails: true,
          }),
        );
        this.store.dispatch(
          dispatchMonitoringActions.SET_IS_IN_DETAILS_VIEW({
            isInDetailsView: true,
          }),
        );
        this.store.dispatch(dispatchMonitoringDetailsActions.FETCH_GUIDES_LOAD());
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.dispatchMonitoring.dispatchMonitoring,
          appRoutes.dispatchMonitoring.details,
        ]);
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
