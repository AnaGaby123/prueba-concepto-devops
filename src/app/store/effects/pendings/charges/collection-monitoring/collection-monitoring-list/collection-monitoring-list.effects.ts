import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

// Models
import {
  CalendarioEjecutarCobranzaDia,
  CalendarioEjecutarCobranzaPeriodo,
  CobranzaClientesEjecutarCobranzaService,
  VFacturaClienteCalendarioTotales,
} from 'api-finanzas';

// Actions
import {SET_LOADING} from '@appActions/utils/utils.action';
import {collectionMonitoringListActions} from '@appActions/pendings/charges/collection-monitoring';

// Selectors
import {collectionMonitoringListSelectors} from '@appSelectors/pendings/charges/collection-monitoring';

// Utils
import {forEach, map as _map} from 'lodash-es';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import * as servicesLogger from '@appUtil/logger';

const FILE_NAME = 'monitoring-collection-list.effects.ts';

@Injectable()
export class CollectionMonitoringListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private executeCollectionClientsService: CobranzaClientesEjecutarCobranzaService,
  ) {}

  // Get the calendar data
  fetchCalendarWeek$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        collectionMonitoringListActions.FETCH_CALENDAR_DATA_LOAD,
        collectionMonitoringListActions.SET_SEARCH_TERM,
        collectionMonitoringListActions.SET_ACTIVE_CHIP,
        collectionMonitoringListActions.SET_CURRENT_DATE,
      ),
      withLatestFrom(
        this.store.select(collectionMonitoringListSelectors.selectCalendarDataFilters),
      ),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          collectionMonitoringListActions.SET_CALENDAR_API_STATUS({
            calendarApiStatus: API_REQUEST_STATUS_LOADING,
          }),
        );
        const actualWeek = [null, null, null, null, null];
        forEach(actualWeek, (date, index) => {
          const initialDate = new Date(params.FechaInicio);
          const newDate = initialDate.setDate(initialDate.getDate() + index);
          const day = initialDate.toISOString();
          const split = day.split('T');
          actualWeek[index] = new Date(split[0]).toISOString();
        });
        this.store.dispatch(collectionMonitoringListActions.SET_ACTUAL_WEEK({actualWeek}));

        return this.executeCollectionClientsService
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
              this.store.dispatch(
                collectionMonitoringListActions.SET_CALENDAR_API_STATUS({
                  calendarApiStatus: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              const calendarWeek: CalendarioEjecutarCobranzaPeriodo = {
                ...response,
                CalendarioEjecutarCobranzaDia: _map(
                  response.CalendarioEjecutarCobranzaDia,
                  (day: CalendarioEjecutarCobranzaDia) => ({
                    ...day,
                    ListaClientes: _map(
                      day.ListaClientes,
                      (client: VFacturaClienteCalendarioTotales, index: number) => ({
                        ...client,
                        Index: index + 1,
                      }),
                    ),
                  }),
                ),
              };
              return collectionMonitoringListActions.FETCH_CALENDAR_DATA_SUCCESS({
                calendarWeek,
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
                collectionMonitoringListActions.SET_CALENDAR_API_STATUS({
                  calendarApiStatus: API_REQUEST_STATUS_FAILED,
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
