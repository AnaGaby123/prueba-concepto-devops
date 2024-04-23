/* Core Imports */
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {Router} from '@angular/router';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {IClientAdjustmentOffer} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {forEach, map as _map} from 'lodash-es';

/* Services Imports */
import * as apiLogistic from 'api-logistica';

/* Actions Imports */
import {
  offerAdjustmentDetailsActions,
  offerAdjustmentDetailsListOfferActions,
} from '@appActions/pendings/offer-adjustment';

/* Selectors Imports */
import {adjustmentDetailsDetailsSelectors} from '@appSelectors/pendings/offer-adjustment';
import {appRoutes} from '@appHelpers/core/app-routes';
import {SET_LOADING} from '@appActions/utils/utils.action';

const FILE_NAME = 'list-offer-adjustment.effects.ts';

@Injectable()
export class ListClientsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private procesosAjustarOfertaService: apiLogistic.ProcesosL02AjustarOfertaService,
    private route: Router,
  ) {}

  fetchClientsWithQuotations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        offerAdjustmentDetailsActions.FETCH_CLIENTS,
        offerAdjustmentDetailsActions.SET_SEARCH_TERM,
        offerAdjustmentDetailsActions.SET_TAB,
        offerAdjustmentDetailsActions.SET_IS_LOADING_MORE_CLIENTS,
        offerAdjustmentDetailsActions.FETCH_CLIENTS_LOAD,
        offerAdjustmentDetailsActions.SET_VALUE_FILTER_SELECTED,
        offerAdjustmentDetailsListOfferActions.REJECT_ADJUSTMENT_SUCCESS,
      ),
      withLatestFrom(this.store.select(adjustmentDetailsDetailsSelectors.selectQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.procesosAjustarOfertaService
          .vClienteEVIajusteOfertaListaQueryResult(queryInfo)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los clientes.',
                ),
                response,
              );
              if (response.Results.length === 0) {
                if (
                  action.type === '[OfferAdjustmentDetailsApi] Fetch Clients With Quotation' ||
                  action.type === '[OfferAdjustmentDetailsApi] Fetch clients load'
                ) {
                  this.route.navigate([
                    appRoutes.protected,
                    appRoutes.pendings.pendings,
                    appRoutes.offerAdjustment.offerAdjustment,
                    appRoutes.offerAdjustment.list,
                  ]);
                } else {
                  this.store.dispatch(
                    offerAdjustmentDetailsActions.CLEAR_QUOTATIONS_AND_CLIENT_SELECTED(),
                  );
                }
                return SET_LOADING({payload: false});
              }
              const listClients: Array<IClientAdjustmentOffer> = _map(
                response.Results,
                (client, index) => ({...client, Index: index + 1}),
              );

              if (listClients.length > 0) {
                this.store.dispatch(
                  offerAdjustmentDetailsActions.SET_CLIENT_SELECTED({
                    clientSelected: listClients[0],
                    idClient: listClients[0].IdCliente,
                    idAjOfQuotationStrategy: listClients[0].IdAjOfEstrategiaCotizacion,
                  }),
                );
              }
              if (
                action.type === '[OfferAdjustmentDetailsApi] Fetch Clients With Quotation' ||
                action.type === '[OfferAdjustmentDetails] Search Term'
              ) {
                const totals = {
                  Todos: 0,
                  TotalClientesAjusteCondicionesDePago: 0,
                  TotalClientesAjustePrecio: 0,
                  TotalClientesAjusteTiempoEntrega: 0,
                };
                totals.Todos = listClients.length;
                forEach(listClients, (client: IClientAdjustmentOffer) => {
                  if (client.ConAjusteCondicionesPago) {
                    totals.TotalClientesAjusteCondicionesDePago++;
                  }
                  if (client.ConAjustePrecio) {
                    totals.TotalClientesAjustePrecio++;
                  }
                  if (client.ConAjusteTiempoEntrega) {
                    totals.TotalClientesAjusteTiempoEntrega++;
                  }
                });
                this.store.dispatch(offerAdjustmentDetailsActions.SAVE_TOTAL_TABS({totals}));
              }
              return offerAdjustmentDetailsActions.FETCH_CLIENT_SUCCESS({
                listClients,
                totalClients: response.TotalResults,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los clientes.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(offerAdjustmentDetailsActions.FETCH_CLIENT_FAILED());
            }),
          );
      }),
    ),
  );
}
