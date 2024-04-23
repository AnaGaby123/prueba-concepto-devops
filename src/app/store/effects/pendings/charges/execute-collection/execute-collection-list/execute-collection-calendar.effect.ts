import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

// Services and Models
import {
  CalendarioEjecutarCobranzaPeriodo,
  CobranzaClientesEjecutarCobranzaService,
} from 'api-finanzas';

// Actions
import {executeCollectionCalendarActions} from '@appActions/pendings/charges/execute-collection';
import {SET_LOADING} from '@appActions/utils/utils.action';

// Selectors
import {executeCollectionCalendarSelectors} from '@appSelectors/pendings/charges/execute-collection';

// Utils
import * as servicesLogger from '@appUtil/logger';
import {forEach} from 'lodash-es';

import {SET_CALENDAR_WEEK} from '@appActions/pendings/charges/execute-collection/execute-collection-list/execute-collection-list.actions';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

const FILE_NAME = 'execute-collection-calendar.effect.ts';

@Injectable()
export class ExecuteCollectionCalendarEffect {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private cobranzaClientesEjecutarCobranza: CobranzaClientesEjecutarCobranzaService,
  ) {}

  fetchCalendarWeek$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        executeCollectionCalendarActions.FETCH_COLLECTION_CALENDAR_LOAD,
        executeCollectionCalendarActions.SET_SEARCH_TERM,
        executeCollectionCalendarActions.SET_CHARGE_OPTION_SELECTED,
        executeCollectionCalendarActions.SET_CHIP_ACTIVE,
      ),
      withLatestFrom(
        this.store.select(executeCollectionCalendarSelectors.selectCalendarWeekFilters),
      ),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          executeCollectionCalendarActions.SET_DAY_STATUS({
            dayStatus: API_REQUEST_STATUS_LOADING,
          }),
        );
        const actualWeek = [null, null, null, null, null];
        forEach(actualWeek, (date, index) => {
          const initialDate = new Date(params.FechaInicio);
          const newDate = initialDate.setDate(initialDate.getDate() + index);
          const day = initialDate.toISOString();
          const dt = day.split('T');
          actualWeek[index] = new Date(dt[0]).toISOString();
        });
        this.store.dispatch(executeCollectionCalendarActions.SET_ACTUAL_WEEK({actualWeek}));

        return this.cobranzaClientesEjecutarCobranza
          .CalendarioEjecutarCobranzaPeriodoProcess(params)
          .pipe(
            map((response: CalendarioEjecutarCobranzaPeriodo) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'AL obtener la lista de clientes para el calendario',
                ),
                response,
              );
              const calendarWeek: CalendarioEjecutarCobranzaPeriodo = response;
              this.store.dispatch(SET_CALENDAR_WEEK({calendarWeek}));
              this.store.dispatch(
                executeCollectionCalendarActions.SET_DAY_STATUS({
                  dayStatus: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              return executeCollectionCalendarActions.FETCH_COLLECTION_CALENDAR_SUCCESS({
                calendarWeek: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'AL obtener la lista de clientes para el calendario',
                ),
                error,
              );
              this.store.dispatch(
                executeCollectionCalendarActions.SET_DAY_STATUS({
                  dayStatus: API_REQUEST_STATUS_FAILED,
                }),
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );
}
