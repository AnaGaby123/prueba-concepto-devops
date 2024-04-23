import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';

import {map as _map} from 'lodash-es';

/*Actions Import*/
import {attendReviewListActions} from '@appActions/pendings/charges/attend-review';

import * as apiFinance from 'api-finanzas';
import {attendViewListSelectors} from '@appSelectors/pendings/charges/attend-review';
import * as servicesLogger from '@appUtil/logger';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {of} from 'rxjs';

const FILE_NAME = 'attend-review-list.effects';

@Injectable()
export class AttendReviewListEffects {
  constructor(
    private store: Store,
    private logger: NGXLogger,
    private actions$: Actions,
    private chargeServices: apiFinance.CobrosService,
  ) {}

  fetchCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        attendReviewListActions.FETCH_CUSTOMER_LOAD,
        attendReviewListActions.SET_TAB_SELECTED,
        attendReviewListActions.SET_TERM_SEARCH,
      ),
      withLatestFrom(this.store.select(attendViewListSelectors.selectQueryInfo)),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          attendReviewListActions.SET_API_STATUS({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.chargeServices.vTpProformaPedidoClienteAtenderRevisionObj(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los clientes',
              ),
              response,
            );
            this.store.dispatch(
              attendReviewListActions.SET_API_STATUS({
                status: API_REQUEST_STATUS_SUCCEEDED,
              }),
            );

            if (action.type === '[Attend-Review-List] Fetch Customer Load') {
              this.store.dispatch(attendReviewListActions.SET_DATA_CHART({data: response}));
            }
            return attendReviewListActions.FETCH_CUSTOMER_SUCCESS({
              customers: _map(response, (item, index) => {
                return {...item, index: index + 1};
              }),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener los clientes',
              ),
              error,
            );
            this.store.dispatch(
              attendReviewListActions.SET_API_STATUS({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
            return of(attendReviewListActions.FETCH_CUSTOMER_ERROR());
          }),
        );
      }),
    ),
  );
}
