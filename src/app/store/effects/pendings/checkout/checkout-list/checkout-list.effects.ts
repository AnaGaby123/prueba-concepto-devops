import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {checkoutActions, checkoutListActions} from '@appActions/pendings/checkout';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import * as apiLogistic from 'api-logistica';
import {DashboardData} from 'api-logistica';
import * as servicesLogger from '@appUtil/logger';
import {checkoutListSelectors} from '@appSelectors/pendings/checkout';
import {API_REQUEST_STATUS_LOADING, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';
import {Router} from '@angular/router';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {appRoutes} from '@appHelpers/core/app-routes';
import {buildCheckoutItemsDashboard} from '@appHelpers/pending/processing/processing.helpers';

const FILE_NAME = 'Checkout-list';

@Injectable()
export class CheckoutListEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private tramitarServices: apiLogistic.ProcesosL05TramitarPedidoDashboardService,
    private route: Router,
  ) {}

  openDetails$ = createEffect(() =>
    this.action$.pipe(
      ofType(checkoutActions.SET_CLIENT_CHECKOUT_SELECTED),
      mergeMap((action) => {
        this.route.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.checkout.checkout,
          appRoutes.checkout.details,
        ]);
        return of(RETURN_EMPTY());
      }),
    ),
  );

  fetchCustomerCheckout$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        checkoutListActions.FETCH_CUSTOMER_LOAD,
        checkoutListActions.SET_SEARCH_TERM,
        checkoutListActions.SET_FILTER_BY_TYPE,
        checkoutListActions.SET_TAB,
      ),
      withLatestFrom(this.store.select(checkoutListSelectors.selectCheckOutListQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(
          checkoutListActions.SET_IS_LOADING_CUSTOMER({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.tramitarServices
          .ClienteTramitarPedidoObtenerTramitarPedidoDashboard(queryInfo)
          .pipe(
            map((response: DashboardData) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta Clientes Exitosamente.',
                ),
                response,
              );
              this.store.dispatch(
                checkoutListActions.SET_IS_LOADING_CUSTOMER({
                  status: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              return checkoutListActions.FETCH_CUSTOMER_SUCCESS({
                data: buildCheckoutItemsDashboard(response.Resumen),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Consulta Clientes.',
                ),
                error,
              );
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );

  // DOCS: OBTIENE LOS TOTALES DE LAS TABS
  fetchTotalsTabs$ = createEffect(() =>
    this.action$.pipe(
      ofType(checkoutListActions.FETCH_TOTALS_TABS_LOAD),
      withLatestFrom(this.store.select(checkoutListSelectors.selectFiltersTabsQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(
          checkoutListActions.SET_IS_LOADING_CUSTOMER({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.tramitarServices.ClienteTramitarPedidoObtenerTramitarPedidoTabs(queryInfo).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta Totales.',
              ),
              response,
            );
            this.store.dispatch(
              checkoutListActions.FETCH_TOTALS_TABS_SUCCESS({
                options: response,
              }),
            );
            return checkoutListActions.FETCH_CUSTOMER_LOAD();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Consulta Totales.',
              ),
              error,
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );
}
