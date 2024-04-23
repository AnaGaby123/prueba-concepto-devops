/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';

/* Services Imports */
import * as apiLogistic from 'api-logistica';
import {AttributeDashboard, DashboardData} from 'api-logistica';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {buildClientsStrategyFromDashboard} from '@appModels/store/pendings/strategy/strategy-dashboard/strategy-dashboard.model';

/* Actions Imports */
import {strategyDashboardActions} from '@appActions/pendings/strategy';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {strategyDashboardSelectors} from '@appSelectors/pendings/strategy';

const FILE_NAME = 'strategy-dashboard.effects.ts';

@Injectable()
export class StrategyDashboardEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private procesosCotizacionService: apiLogistic.ProcesosL01CotizacionService,
  ) {}

  // DOCS: Obtiene la información de las tabs
  getTabsInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(strategyDashboardActions.GET_STRATEGY_DASHBOARD_TABS_TOTALS_INIT),
      withLatestFrom(
        this.store.select(strategyDashboardSelectors.selectDashboardTabsGroupQueryInfo),
      ),
      mergeMap(([actions, queryInfo]) => {
        return this.procesosCotizacionService
          .vCotCotizacionObtenerTabsEstablcerEstrategiaDashboard(queryInfo)
          .pipe(
            map((response: Array<AttributeDashboard>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener los totales de las tabas de establecer estrategia.',
                ),
              );
              return strategyDashboardActions.GET_STRATEGY_DASHBOARD_TABS_TOTALS_SUCCESS({
                tabs: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener los totales de las tabs de establecer estrategia',
                ),
                error,
              );
              return of(strategyDashboardActions.GET_STRATEGY_DASHBOARD_TABS_TOTALS_FAILED());
            }),
          );
      }),
    ),
  );

  getClientsForStrategyList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        strategyDashboardActions.GET_STRATEGY_DASHBOARD_TABS_TOTALS_SUCCESS,
        strategyDashboardActions.SET_TAP,
        strategyDashboardActions.SET_FILTER_BY_TYPE,
        strategyDashboardActions.SET_FILTER_BY_DATES,
        strategyDashboardActions.SET_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(strategyDashboardSelectors.selectDashboardListGroupQueryInfo),
      ),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(strategyDashboardActions.CHANGE_LOADING_STATUS());
        return this.procesosCotizacionService
          .vCotCotizacionObtenerEstablecerEstrategiaDashboard(queryInfo)
          .pipe(
            map((response: DashboardData) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener la lista de clientes de establecer estrategia.',
                ),
              );
              const clientsList = buildClientsStrategyFromDashboard(response.Resumen);
              return strategyDashboardActions.GET_CLIENTS_QUOTATIONS_FOR_STRATEGY_SUCCESS({
                clientsList,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener la lista de clientes de establecer estrategia.',
                ),
                error,
              );
              return of(strategyDashboardActions.GET_CLIENTS_QUOTATIONS_FOR_STRATEGY_FAILDED());
            }),
          );
      }),
    ),
  );
}
