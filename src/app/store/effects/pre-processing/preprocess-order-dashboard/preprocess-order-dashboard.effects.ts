import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import * as api from 'api-logistica';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {NGXLogger} from 'ngx-logger';
// Actions
import {preProcessOrderDashboardActions} from '@appActions/pre-processing';
import * as servicesLogger from '@appUtil/logger';
// Selectors
import {preProcessOrderDashboardSelectors} from '@appSelectors/pre-processing';
import {SET_LOADING} from '@appActions/utils/utils.action';
import {buildListItemsFromPreProcessingDashboard} from '@appHelpers/pending/pre-processing/pre-processing.helpers';
import {API_REQUEST_STATUS_LOADING, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';

const FILE_NAME = 'client-pre-processing.effects.ts';

@Injectable()
export class PreprocessOrderDashboardEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private pretramitarServices: api.ProcesosL04PretramitarPedidoService,
    private logger: NGXLogger,
  ) {}

  // DOCS: OBTIENE LOS TOTALES DE LAS TABS
  fetchTotalsTabs = createEffect(() =>
    this.actions$.pipe(
      ofType(preProcessOrderDashboardActions.FETCH_TOTAL_TABS_LOAD),
      withLatestFrom(this.store.select(preProcessOrderDashboardSelectors.selectTabsQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        return this.pretramitarServices
          .ClienteOrdenDeCompraObtenerPretramitarPedidoTabs(queryInfo)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta los totales de las tabs.',
                ),
                response,
              );
              return preProcessOrderDashboardActions.FETCH_TOTAL_TABS_SUCCESS({
                tabs: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Consulta los totales de las tabs.',
                ),
                error,
              );
              return of(preProcessOrderDashboardActions.FETCH_TOTAL_TABS_ERROR(error));
            }),
          );
      }),
    ),
  );

  //DOCS: OBTIENE LA LISTA DEL DASHBORD
  fetchClients = createEffect(() =>
    this.actions$.pipe(
      ofType(
        preProcessOrderDashboardActions.FETCH_CLIENTS_LOAD,
        preProcessOrderDashboardActions.SET_TAB_FILTER,
        preProcessOrderDashboardActions.SET_TERM_SEARCH,
        preProcessOrderDashboardActions.SET_ORDER_TYPE,
        preProcessOrderDashboardActions.SET_FILTER_DATES,
      ),
      withLatestFrom(this.store.select(preProcessOrderDashboardSelectors.selectCustomersQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(
          preProcessOrderDashboardActions.SET_API_STATUS({status: API_REQUEST_STATUS_LOADING}),
        );
        return this.pretramitarServices
          .ClienteOrdenDeCompraObtenerPretramitarPedidoDashboard(queryInfo)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta CLientes Pre-Tramitación exitosamente.',
                ),
                response,
              );
              this.store.dispatch(
                preProcessOrderDashboardActions.SET_API_STATUS({
                  status: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              return preProcessOrderDashboardActions.FETCH_CLIENTS_SUCCESS({
                data: buildListItemsFromPreProcessingDashboard(response.Resumen),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Consulta CLientes Pre-Tramitación.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(preProcessOrderDashboardActions.FETCH_CLIENTS_ERROR(error));
            }),
          );
      }),
    ),
  );
}
