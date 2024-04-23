import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {Store} from '@ngrx/store';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
/*Models Imports*/
import * as apiLogistic from 'api-logistica';
/*Actions Imports*/
import {orderModificationListActions} from '@appActions/pendings/order-modification';
/*Selectors Imports*/
import {orderModificationListSelectors} from '@appSelectors/pendings/order-modification';
import {EMPTY} from 'rxjs';
import {addRowIndex} from '@appUtil/util';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {FilterTuple} from 'api-finanzas';
import * as servicesLogger from '@appUtil/logger';

const FILE_NAME = 'order-modification-list.effects';

@Injectable()
export class OrderModificationListEffects {
  constructor(
    private actions$: Actions,
    private logger: NGXLogger,
    private store: Store,
    private orderModificationServices: apiLogistic.ProcesosL05TramitarPedidoModificacionService,
  ) {}

  fetchCustomerOM$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        orderModificationListActions.FETCH_CUSTOMER_ORDER_MODIFICATION_LOAD,
        orderModificationListActions.SET_TAB_SELECTED,
        orderModificationListActions.SET_TERM_SEARCH,
        orderModificationListActions.SET_FILTER_DATE_RANGE,
        orderModificationListActions.SET_FILTER_ORDER,
      ),
      withLatestFrom(this.store.select(orderModificationListSelectors.selectParams)),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          orderModificationListActions.SET_STATUS_API({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.orderModificationServices.vClienteModificacionPedidoQueryResult(params).pipe(
          map((response) => {
            this.store.dispatch(
              orderModificationListActions.SET_STATUS_API({
                status: API_REQUEST_STATUS_SUCCEEDED,
              }),
            );
            return orderModificationListActions.FETCH_CUSTOMER_ORDER_MODIFICATION_SUCCESS({
              data: {
                TotalResults: response.TotalResults,
                Results: addRowIndex(params.desiredPage, params.pageSize, response.Results),
              },
            });
          }),
          catchError((error) => {
            this.store.dispatch(
              orderModificationListActions.SET_STATUS_API({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  fetchTotals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderModificationListActions.FETCH_TOTALS_LOAD),
      withLatestFrom(this.store.select(orderModificationListSelectors.selectNeedsToReloadTotals)),
      mergeMap(([action, needsToReload]) => {
        if (needsToReload) {
          const filters: Array<FilterTuple> = [];
          return this.orderModificationServices
            .vClientePedidoIncidenciaModificacionTotalesIncidenciaPedidoModificacion(filters)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener los totales.',
                  ),
                  response,
                );
                return orderModificationListActions.FETCH_TOTALS_SUCCESS({
                  totals: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener la información general de la compra.',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        }

        return EMPTY;
      }),
    ),
  );
}
