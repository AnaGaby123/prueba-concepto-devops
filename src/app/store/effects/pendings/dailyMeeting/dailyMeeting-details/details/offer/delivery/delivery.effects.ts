/* Core Imports */
import {Injectable} from '@angular/core';
// import {Store} from '@ngrx/store';
// import {Actions} from '@ngrx/effects';

/* Services Imports */
// import * as apiLogistic from 'api-logistica';

/* Models Imports */
// import {AppState} from '@appCore/core.state';

/* Actions Imports */
/* Selectors Imports */
/* Dev Tools */
// import {NGXLogger} from 'ngx-logger';

const FILE_NAME = 'delivery.effects.ts';

@Injectable()
export class DeliveryDailyMeetingDetailsEffects {
  constructor /*private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private procesosCotizacionCierreService: apiLogistic.ProcesosL01CotizacionCierreService,*/() {}

  //DOCS: OBTENER INFORMACIÓN DE LAS GRAFICAS
  /** TODO: Se usará en una siguiente implementación */
  // FIXME: Revisar selector para este efecto
  /*  fetchListDeliveries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dailyMeetingDetailsOfferDeliveryActions.FETCH_DATA_DELIVERY),
      withLatestFrom(
        this.store.select(dailyMeetingDetailsDeliverySelectors.selectNeedsToReloadListDeliveries),
        // this.store.select(dailyMeetingDetailsSelectors.selectClientNameHeader),
      ),
      mergeMap(([actions, needsToReloadListDeliveries]) => {
        if (needsToReloadListDeliveries) {
          const queryInfo: QueryInfo = {
            // Filters: [
            //   {
            //     NombreFiltro: 'Nombre',
            //     ValorFiltro: nameClient,
            //   },
            // ],
            pageSize: 100,
            desiredPage: 1,
          };
          return this.procesosCotizacionCierreService
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
                  dailyMeetingDetailsOfferDeliveryActions.SET_LIST_DELIVERIES({
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

                return of(dailyMeetingDetailsOfferDeliveryActions.FETCH_DATA_DELIVERY_FAILED());
              }),
            );
        } else {
          return EMPTY;
        }
      }),
      switchMap((queryInfo: QueryInfo) => {
        return this.procesosCotizacionCierreService
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
                dailyMeetingDetailsOfferDeliveryActions.SET_CHART_DATA_DELIVERY({
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

              return of(dailyMeetingDetailsOfferDeliveryActions.FETCH_DATA_DELIVERY_FAILED());
            }),
          );
      }),
      switchMap((queryInfo: QueryInfo) => {
        const filterArray: FilterTuple[] = [];
        filterArray.push({
          NombreFiltro: 'Nombre',
          ValorFiltro: queryInfo.Filters[0].ValorFiltro,
        });

        return this.procesosCotizacionCierreService
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
                dailyMeetingDetailsOfferDeliveryActions.SET_TOTAL_DELIVERIES({
                  totalDeliveries: response,
                }),
              );

              return dailyMeetingDetailsOfferDeliveryActions.FETCH_DATA_DELIVERY_SUCCESS();
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

              return of(dailyMeetingDetailsOfferDeliveryActions.FETCH_DATA_DELIVERY_FAILED());
            }),
          );
      }),
    ),
  );*/
}
