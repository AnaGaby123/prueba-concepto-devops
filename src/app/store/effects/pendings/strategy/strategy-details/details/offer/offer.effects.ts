/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {EMPTY, of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';

/* Services Imports */
import * as apiFinances from 'api-finanzas';
import {QueryInfo} from 'api-finanzas';

/* Models Imports */
import {AppState} from '@appCore/core.state';

/* Actions Imports */
import {offerActions} from '@appActions/pendings/strategy/strategy-details/details';

/* Selectors Imports */
import {strategyDetailsSelectors} from '@appSelectors/pendings';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {FilterTuple} from 'api-catalogos';
import * as apiLogistic from 'api-logistica';
import {offerSelectors} from '@appSelectors/pendings/strategy/strategy-details/details';

const FILE_NAME = 'offer.effects.ts';

@Injectable()
export class OfferStrategyEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private customerBillingScheduleService: apiFinances.CobranzaClientesCalendariosService,
    private quotationClosingProcessService: apiLogistic.ProcesosL01CotizacionCierreService,
  ) {}

  fetchPendingsInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.FETCH_PENDING_INVOICES),
      withLatestFrom(
        this.store.select(offerSelectors.selectNeedsToReloadPendingInvoices),
        this.store.select(strategyDetailsSelectors.selectIdClient),
      ),
      mergeMap(([actions, needsToReloadPendingInvoices, idClient]) => {
        if (needsToReloadPendingInvoices) {
          return this.customerBillingScheduleService
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
                return offerActions.FETCH_PENDING_INVOICES_SUCCESS({
                  dataPendingInvoices: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'No se obtuvieron las facturas pendientes.',
                  ),
                  error,
                );
                return of(offerActions.FETCH_PENDING_INVOICES_FAILED());
              }),
            );
        }
        return EMPTY;
      }),
    ),
  );
  fetchListDeliveries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.FETCH_DATA_DELIVERY),
      withLatestFrom(
        this.store.select(offerSelectors.selectNeedsToReloadListDeliveries),
        this.store.select(strategyDetailsSelectors.selectClientNameHeader),
      ),
      mergeMap(([actions, needsToReloadListDeliveries, nameClient]) => {
        if (needsToReloadListDeliveries) {
          const queryInfo: QueryInfo = {
            Filters: [
              {
                NombreFiltro: 'Nombre',
                ValorFiltro: nameClient,
              },
            ],
            pageSize: 100,
            desiredPage: 1,
          };
          return this.quotationClosingProcessService
            .vEntregaPartidaPedidoObtenerListaEntregaPartidaPedido(queryInfo)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Se obtuvó la lista de entregas de forma exitosa.',
                  ),
                  response,
                );

                this.store.dispatch(
                  offerActions.SET_LIST_DELIVERIES({
                    listDeliveries: response,
                  }),
                );

                return {...queryInfo};
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener la lista de entregas.',
                  ),
                  error,
                );

                return of(offerActions.FETCH_DATA_DELIVERY_FAILED());
              }),
            );
        } else {
          return EMPTY;
        }
      }),
      switchMap((queryInfo: QueryInfo) => {
        return this.quotationClosingProcessService
          .vEntregaPartidaPedidoObtenerGraficaEntregaPartidaPedido(queryInfo)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Se obtuvó la data chart forma exitosa.',
                ),
                response,
              );
              this.store.dispatch(
                offerActions.SET_CHART_DATA_DELIVERY({
                  dataChartDelivery: response,
                }),
              );
              return {...queryInfo};
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la data chart de entregas.',
                ),
                error,
              );

              return of(offerActions.FETCH_DATA_DELIVERY_FAILED());
            }),
          );
      }),
      switchMap((queryInfo: QueryInfo) => {
        const filterArray: FilterTuple[] = [];
        filterArray.push({
          NombreFiltro: 'Nombre',
          ValorFiltro: queryInfo.Filters[0].ValorFiltro,
        });
        return this.quotationClosingProcessService
          .vEntregaPartidaPedidoGroupQueryResult(filterArray)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Se obtuvieron los totales de entregas de forma exitosa.',
                ),
                response,
              );

              this.store.dispatch(
                offerActions.SET_TOTAL_DELIVERIES({
                  totalDeliveries: response,
                }),
              );

              return offerActions.FETCH_DATA_DELIVERY_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los totales de entregas.',
                ),
                error,
              );

              return of(offerActions.FETCH_DATA_DELIVERY_FAILED());
            }),
          );
      }),
    ),
  );
}
