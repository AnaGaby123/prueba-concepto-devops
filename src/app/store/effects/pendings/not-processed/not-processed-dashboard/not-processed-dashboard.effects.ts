import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {Store} from '@ngrx/store';

// Actions
import {notProcessedDashboardActions} from '@appActions/pendings/not-processed';
import {SET_LOADING} from '@appActions/utils/utils.action';

// Models
import * as apiLogistica from 'api-logistica';

// Selectors
import {notProcessedDashboardSelectors} from '@appSelectors/pendings/not-processed';

// Utils
import * as servicesLogger from '@appUtil/logger';
import {buildClientsFromNotProcessedDashboard} from '@appHelpers/pending/not-processed/not-processed.helpers';
import {API_REQUEST_STATUS_LOADING, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';

const FILE_NAME = 'not-processed-dashboard.effects.ts';

@Injectable()
export class NotProcessedDashboardEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private processPretramitarPedidoServices: apiLogistica.ProcesosL04PretramitarPedidoService,
  ) {}

  // DOCS: OBTIENE LOS TOTALES DE LAS TABS
  fetchTabTotals$ = createEffect(() =>
    this.action$.pipe(
      ofType(notProcessedDashboardActions.FETCH_TABS_LOAD),
      withLatestFrom(this.store.select(notProcessedDashboardSelectors.selectTabsQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        return this.processPretramitarPedidoServices
          .ClienteOrdenDeCompraObtenerGestionarPedidoIntramitableTabs(queryInfo)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener totales de las tabs',
                ),
                response,
              );
              return notProcessedDashboardActions.FETCH_TABS_SUCCESS({tabs: response});
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener totales de las tabs',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS: OBTIENE EL LISTADO
  fetchClientNotProcessed$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        notProcessedDashboardActions.FETCH_CLIENT_LIST,
        notProcessedDashboardActions.SET_DATE_RANGE_SELECTED,
        notProcessedDashboardActions.SET_SEARCH_TERM,
        notProcessedDashboardActions.SET_BURGER_OPTION_SELECTED,
        notProcessedDashboardActions.SET_TAB_OPTION_SELECTED,
        notProcessedDashboardActions.SET_SEARCH_TERM,
      ),
      withLatestFrom(this.store.select(notProcessedDashboardSelectors.selectClientsQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(
          notProcessedDashboardActions.SET_API_STATUS({status: API_REQUEST_STATUS_LOADING}),
        );
        return this.processPretramitarPedidoServices
          .ClienteOrdenDeCompraObtenerGestionarPedidoIntramitableDashboard(queryInfo)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta Clientes Gestionar Intramitable exitosamente.',
                ),
                response,
              );
              this.store.dispatch(
                notProcessedDashboardActions.SET_API_STATUS({status: API_REQUEST_STATUS_SUCCEEDED}),
              );
              return notProcessedDashboardActions.FETCH_CLIENT_LIST_SUCCESS({
                clients: buildClientsFromNotProcessedDashboard(response.Resumen),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Consulta Clientes Gestionar Intramitable Error.',
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
}
