/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';

/* Services Imports */
import * as apiFinances from 'api-finanzas';

/* Models Imports */
import {AppState} from '@appCore/core.state';

/* Actions Imports */
/* Selectors Imports */
/* Dev Tools */
import {NGXLogger} from 'ngx-logger';

const FILE_NAME = 'delinquent.effects.ts';

@Injectable()
export class DelinquentDailyMeetingEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private cobranzaClientesCalendariosService: apiFinances.CobranzaClientesCalendariosService,
  ) {}

  //DOCS: OBTENER LAS FACTURAS PENDIENTES
  // FIXME: La acción le gana y en este punto el IdCliente aún no existe
  /*fetchPendingsInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_DASHBOARD_DETAILS_SUCCESS),
      withLatestFrom(this.store.select(dailyMeetingDetailsSelectors.selectIdClient)),
      mergeMap(([actions, idClient]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.cobranzaClientesCalendariosService
          .FacturasPendientesClienteDetalleObtener(idClient)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Se obtuvieron las facturas pendientes de forma exitosa.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return dailyMeetingDetailsOfferDelinquentActions.FETCH_PENDING_INVOICES_SUCCESS({
                dataPendingInvoices: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Se pudo obtener las facturas pendientes.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(dailyMeetingDetailsOfferDelinquentActions.FETCH_PENDING_INVOICES_FAILED());
            }),
          );
      }),
    ),
  );*/
}
