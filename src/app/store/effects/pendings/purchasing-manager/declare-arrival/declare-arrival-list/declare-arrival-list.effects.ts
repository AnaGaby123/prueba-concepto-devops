import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
/*Models Imports*/
import * as apiLogistic from 'api-logistica';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
/*Actions Imports*/
import {declareArrivalListActions} from '@appActions/pendings/purchasing-manager/declare-arrival';
/*Selectors Imports*/
import {declareArrivalListSelectors} from '@appSelectors/pendings/purchasing-manager/declare-arrival';
import {addRowIndex} from '@appUtil/util';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {EMPTY} from 'rxjs';
import * as servicesLogger from '@appUtil/logger';

const FILE_NAME = 'Declare-Arrival-List';

@Injectable()
export class DeclareArrivalListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private purchaseOrdersDeclareServices: apiLogistic.ProcesosL06OrdenDeCompraDeclararArribosService,
    private purchaseOrdersDeclareDashBoardServices: apiLogistic.ProcesosL06OrdenDeCompraDeclararArribosDashboardService,
  ) {}

  fetchProvidersDeclare$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        declareArrivalListActions.FETCH_PROVIDERS_LOAD,
        declareArrivalListActions.SET_TAB_SELECTED,
        declareArrivalListActions.SET_SORT_OPTION,
        declareArrivalListActions.SET_TERM_SEARCH,
      ),
      withLatestFrom(this.store.select(declareArrivalListSelectors.selectParamsProviders)),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          declareArrivalListActions.SET_STATUS_API({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.purchaseOrdersDeclareServices
          .vOcProveedorDeclararArriboQueryResult(params)
          .pipe(
            map((response) => {
              this.store.dispatch(
                declareArrivalListActions.SET_STATUS_API({
                  status: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Obtener proveedores',
                ),
                response,
              );
              return declareArrivalListActions.FETCH_PROVIDERS_SUCCESS({
                data: {
                  TotalResults: response.TotalResults,
                  Results: addRowIndex(params.desiredPage, params.pageSize, response.Results),
                },
              });
            }),
            catchError((error) => {
              this.store.dispatch(
                declareArrivalListActions.SET_STATUS_API({
                  status: API_REQUEST_STATUS_FAILED,
                }),
              );
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Obtener proveedores',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );
  fetchDonutProvidersDeclare$ = createEffect(() =>
    this.actions$.pipe(
      ofType(declareArrivalListActions.FETCH_DONUT_CHART_LOAD),

      mergeMap((action) => {
        const params = new FiltersOnlyActive();
        return this.purchaseOrdersDeclareServices
          .vOcProveedorDeclararArriboQueryResult(params)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Obtener Datos Gráfica',
                ),
                response,
              );
              return declareArrivalListActions.FETCH_DONUT_CHART_SUCCESS({
                data: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Obtener Datos Gráfica',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );
  fetchTotals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(declareArrivalListActions.FETCH_TOTALS_LOAD),
      mergeMap((action) => {
        return this.purchaseOrdersDeclareDashBoardServices
          .GraficasDashboardDeclararArribosObtener()
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Obtener Totales',
                ),
                response,
              );
              return declareArrivalListActions.FETCH_TOTALS_SUCCESS({
                data: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Obtener Totales',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );
}
