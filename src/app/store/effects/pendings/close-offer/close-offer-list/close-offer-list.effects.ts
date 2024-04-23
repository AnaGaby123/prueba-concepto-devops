import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
// Actions
import {closeOfferListActions} from '@appActions/pendings/close-offer';
// Selectors
import {closeOfferListSelector} from '@appSelectors/pendings/close-offer';

// Models
import * as apiLogistic from 'api-logistica';
import {AttributeDashboard, DashboardData} from 'api-logistica';
import * as servicesLogger from '@appUtil/logger';
import {
  GET_CAT_MONEDA_LOAD,
  GET_CAT_PAYMENT_CONDITIONS_LOAD,
  GET_CAT_TIPO_TELEFONO_LOAD,
} from '@appActions/catalogs/catalogos.actions';
import {buildClientsFromCloseOfferDashboard} from '@appHelpers/pending/closeOffer/closeOffer.helpers';

const FILE_NAME = '[close-offer-list]';

@Injectable()
export class CloseOfferListEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private closeOfferServices: apiLogistic.ProcesosL01CotizacionCerrarOfertaService,
    private procesosCerrarOfertaService: apiLogistic.ProcesosL01CotizacionCerrarOfertaDashboardService,
  ) {}

  ngOnInit$ = createEffect(() =>
    this.action$.pipe(
      ofType(closeOfferListActions.INIT_CLOSE_OFFER),
      map(() => {
        this.store.dispatch(GET_CAT_MONEDA_LOAD());
        this.store.dispatch(GET_CAT_PAYMENT_CONDITIONS_LOAD());
        this.store.dispatch(GET_CAT_TIPO_TELEFONO_LOAD());
        return closeOfferListActions.FETCH_TAB_OPTIONS_LOAD();
      }),
    ),
  );

  // DOCS: Obtiene la información de las tabs
  getTabsInfo$ = createEffect(() =>
    this.action$.pipe(
      ofType(closeOfferListActions.FETCH_TAB_OPTIONS_LOAD),
      withLatestFrom(this.store.select(closeOfferListSelector.selectDashboardTabsGroupQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        return this.procesosCerrarOfertaService
          .DashBoardCerrarOfertaObtenerTabsDashboard(queryInfo)
          .pipe(
            map((response: Array<AttributeDashboard>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener los totales de las tabs de cerrar oferta.',
                ),
              );
              this.store.dispatch(
                closeOfferListActions.FETCH_TAB_OPTIONS_SUCCESS({
                  tabs: response,
                }),
              );
              return closeOfferListActions.GET_CLIENT_LIST_LOAD();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener los totales de las tabs de cerrar oferta.',
                ),
                error,
              );
              return of(closeOfferListActions.FETCH_TAB_OPTIONS_FAILED());
            }),
          );
      }),
    ),
  );
  // DOCS: Obtiene la lista de clientes para el dashboard
  getClientsList$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        closeOfferListActions.GET_CLIENT_LIST_LOAD,
        closeOfferListActions.SET_TAB_OPTION_SELECTED,
        closeOfferListActions.SET_DATE_RANGE_SELECTED,
        closeOfferListActions.SET_BURGER_OPTION_SELECTED,
        closeOfferListActions.SET_SEARCH_TERM,
      ),
      withLatestFrom(this.store.select(closeOfferListSelector.selectDashboardListGroupQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(closeOfferListActions.CHANGE_LOADING_STATUS());
        return this.procesosCerrarOfertaService
          .DashBoardCerrarOfertaObtenerDashboard(queryInfo)
          .pipe(
            map((response: DashboardData) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener la lista de clientes en cerrar oferta.',
                ),
              );
              const clientsList = buildClientsFromCloseOfferDashboard(response.Resumen);
              return closeOfferListActions.FETCH_DASHBOARD_CLIENTS_LIST_SUCCESS({
                clientsList,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener la lista de clientes en cerrar oferta.',
                ),
                error,
              );
              return of(closeOfferListActions.FETCH_DASHBOARD_CLIENTS_LIST_FAILED());
            }),
          );
      }),
    ),
  );
}
