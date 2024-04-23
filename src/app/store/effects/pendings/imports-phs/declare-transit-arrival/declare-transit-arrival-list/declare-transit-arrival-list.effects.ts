import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import * as apiLogistic from 'api-logistica';
import {declareTransitArrivalListActions} from '@appActions/pendings/imports-phs/declare-transit-arrival';
import {declareTransitArrivalListSelectors} from '@appSelectors/pendings/imports-phs/declare-transit-arrival';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import * as servicesLogger from '@appUtil/logger';
import {addRowIndex} from '@appUtil/util';
import {EMPTY} from 'rxjs';
import {Router} from '@angular/router';
/* Tools Imports */

const FILE_NAME = 'Declare-Transit-Arrival';

@Injectable()
export class DeclareTransitArrivalListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private purchaseOrdersDeclareServices: apiLogistic.ProcesosL06OrdenDeCompraDeclararArribosService,
    private purchaseOrdersDeclareDashBoardServices: apiLogistic.ProcesosL06OrdenDeCompraDeclararArribosDashboardService,
  ) {}

  fetchProvidersDeclare$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        declareTransitArrivalListActions.FETCH_PROVIDERS_LOAD,
        declareTransitArrivalListActions.SET_TAB_SELECTED,
        declareTransitArrivalListActions.SET_FILTER_ORDER,
        declareTransitArrivalListActions.SET_TERM_SEARCH,
      ),
      withLatestFrom(this.store.select(declareTransitArrivalListSelectors.selectParamsProviders)),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          declareTransitArrivalListActions.SET_STATUS_API({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.purchaseOrdersDeclareServices
          .vOcProveedorDeclararArriboQueryResult(params)
          .pipe(
            map((response) => {
              this.store.dispatch(
                declareTransitArrivalListActions.SET_STATUS_API({
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
              return declareTransitArrivalListActions.FETCH_PROVIDERS_SUCCESS({
                data: {
                  TotalResults: response.TotalResults,
                  Results: addRowIndex(params.desiredPage, params.pageSize, response.Results),
                },
              });
            }),
            catchError((error) => {
              this.store.dispatch(
                declareTransitArrivalListActions.SET_STATUS_API({
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
      ofType(
        declareTransitArrivalListActions.FETCH_DONUT_CHART_LOAD,
        declareTransitArrivalListActions.FETCH_TOTALS_LOAD,
      ),
      mergeMap((action) => {
        return this.purchaseOrdersDeclareDashBoardServices
          .GraficasDashboardDeclararArribosObtener(true)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al Obtener Graficas',
                ),
                response,
              );

              if (response.Proveedores === 0) {
                response.OrdenesDeCompra = 0;
                response.OrdenesDeCompraEnTiempo = 0;
                response.OrdenesDeCompraUrgente = 0;
                response.OrdenesDeCompraFueraDeTiempo = 0;
              }
              return declareTransitArrivalListActions.FETCH_DONUT_CHART_SUCCESS({data: response});
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al Obtener Graficas',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );
  // TODO: DESCOMENTAR SI SE UTILIZA
  /* setProviderSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(declareTransitArrivalDetailsActions.SET_SELECTED_PROVIDER),
      withLatestFrom(this.store.select(declareTransitArrivalListSelectors.selectListProviders)),
      mergeMap(([action, dataProviders]) => {
        const dataProviderSelected = filter(
          dataProviders,
          (provider) => provider.NombreProveedor === action.selectedProvider.NombreProveedor,
        )[0];
        this.store.dispatch(
          declareTransitArrivalActions.SET_ALLOWED_TO_DETAILS_VALUE({
            allowedToDetails: true,
          }),
        );
        this.store.dispatch(
          declareTransitArrivalActions.SET_IS_IN_DETAILS_VIEW({
            isInDetailsView: true,
          }),
        );
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.declareTransitArrival.declareTransitArrival,
          appRoutes.declareTransitArrival.details,
        ]);
        return of(RETURN_EMPTY());
      }),
    ),
  );*/
}
