import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import * as apiLogistic from 'api-logistica';
import {
  AttributeDashboard,
  ControlarSeguimientoPromesaDeCompraGraficas,
  DashboardData,
} from 'api-logistica';

/*Actions Imports*/
import {followPPromiseListActions} from '@appActions/pendings/follow-purchase-promise';

/*Selectors Imports*/
import {followPPromiseListSelectors} from '@appSelectors/pendings/follow-purchase-promise';
import {selectIdUser} from '@appSelectors/auth/auth.selectors';

/* Utils*/
import * as servicesLogger from '@appUtil/logger';
import {API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';
import {GET_CAT_TIPO_TELEFONO_LOAD} from '@appActions/catalogs/catalogos.actions';
import {buildFollowPurchasePromiseFromDashboard} from '@appHelpers/pending/follow-purchase-promise/follow-purchase-promise.helpers';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';

const FILE_NAME = 'Follow-Purchase-Promise-List';

@Injectable()
export class FollowPurchasePromiseListEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private purchasePromiseServices: apiLogistic.ProcesosL03PromesaDeCompraDashboardService,
    private purchasePromiseQuotationServices: apiLogistic.ProcesosL01CotizacionPromesaDeCompraService,
  ) {}

  /*DOCS: Inicializador del componente*/
  ngOnInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followPPromiseListActions.INIT_FOLLOW_PURCHASE_PROMISE_LIST_COMPONENT_EFFECT),
      map(() => {
        this.store.dispatch(
          followPPromiseListActions.FETCH_CUSTOMER_LIST_LOAD({isFirstPage: true}),
        );
        this.store.dispatch(GET_CAT_TIPO_TELEFONO_LOAD());
        return followPPromiseListActions.GET_FOLLOW_PURCHASE_PROMISE_LIST_TABS_TOTALS();
      }),
    ),
  );
  // DOCS: Se obtiene la información de las tabs
  getTabsInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followPPromiseListActions.GET_FOLLOW_PURCHASE_PROMISE_LIST_TABS_TOTALS),
      withLatestFrom(
        this.store.select(followPPromiseListSelectors.selectFollowPurchasePromiseListTabsQueryInfo),
      ),
      mergeMap(([action, queryInfo]) => {
        return this.purchasePromiseQuotationServices
          .vClienteCotizacionesPromesaDeCompraObtenerTabsDashboard(queryInfo)
          .pipe(
            map((response: Array<AttributeDashboard>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener los totales de las tabs de controlar seguimiento a promesa de compra.',
                ),
              );
              return followPPromiseListActions.GET_FOLLOW_PURCHASE_PROMISE_LIST_TABS_TOTALS_SUCCESS(
                {
                  tabs: response,
                },
              );
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener los totales de las tabs de controlar seguimiento a promesa de compra.',
                ),
                error,
              );
              return of(
                followPPromiseListActions.GET_FOLLOW_PURCHASE_PROMISE_LIST_TABS_TOTALS_FAILED(),
              );
            }),
          );
      }),
    ),
  );
  // DOCS: Obtiene el listado de dashboard
  fetchCustomerFollowP$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        followPPromiseListActions.GET_FOLLOW_PURCHASE_PROMISE_LIST_TABS_TOTALS_SUCCESS,
        followPPromiseListActions.SET_FILTERS_DATE_RANGE,
        followPPromiseListActions.SET_TAB,
        followPPromiseListActions.SET_SEARCH_TERM,
        followPPromiseListActions.SET_FILTER_ORDER,
      ),
      withLatestFrom(
        this.store.select(
          followPPromiseListSelectors.selectFollowPurchasePromiseDashboardQueryInfo,
        ),
      ),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(followPPromiseListActions.CHANGE_LOADING_STATUS());
        return this.purchasePromiseQuotationServices
          .vClienteCotizacionesPromesaDeCompraObtenerDashboard(queryInfo)
          .pipe(
            map((response: DashboardData) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener los totales del dashboard de controlar seguimiento a promesa de compra.',
                ),
              );
              const customerList = buildFollowPurchasePromiseFromDashboard(response.Resumen);
              return followPPromiseListActions.GET_FOLLOW_PURCHASE_PROMISE_DASHBOARD_SUCCESS({
                customerList,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener los totales del dashboard de controlar seguimiento a promesa de compra.',
                ),
                error,
              );
              return of(followPPromiseListActions.GET_FOLLOW_PURCHASE_PROMISE_DASHBOARD_ERROR());
            }),
          );
      }),
    ),
  );
  // DOCS: Obtiene los datos de las gráficas desde el servicio
  fetchDonutChartFollowP$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        followPPromiseListActions.GET_FOLLOW_PURCHASE_PROMISE_LIST_TABS_TOTALS_SUCCESS,
        followPPromiseListActions.SET_FILTERS_DATE_RANGE,
        followPPromiseListActions.SET_TAB,
        followPPromiseListActions.SET_SEARCH_TERM,
        followPPromiseListActions.SET_FILTER_ORDER,
      ),
      withLatestFrom(
        this.store.select(
          followPPromiseListSelectors.selectFollowPurchasePromiseDashboardQueryInfo,
        ),
        this.store.select(selectIdUser),
      ),
      mergeMap(([action, queryInfo, idUser]) => {
        return this.purchasePromiseQuotationServices
          .ControlarSeguimientoPromesaDeCompraGraficasObtener({info: queryInfo, idUsuario: idUser})
          .pipe(
            map((response: ControlarSeguimientoPromesaDeCompraGraficas) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener los totales de la dona de controlar seguimiento a promesa de compra.',
                ),
              );
              this.store.dispatch(
                followPPromiseListActions.SET_API_STATUS_DONUT_CHART({
                  status: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              return followPPromiseListActions.FETCH_DONUT_CHART_FOLLOW_SUCCESS({data: response});
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener los totales de la dona de controlar seguimiento a promesa de compra.',
                ),
                error,
              );
              return of(followPPromiseListActions.FETCH_DONUT_CHART_FOLLOW_ERROR());
            }),
          );
      }),
    ),
  );
  // DOCS: Obtiene los siguientes elementos del listado
  fetchMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followPPromiseListActions.FETCH_MORE_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(followPPromiseListSelectors.selectFetchMoreCustomersInfo)),
      mergeMap(([action, fetchMore]) => {
        if (
          action.event.endIndex !== fetchMore.itemList.length - 1 ||
          action.event.endIndex === fetchMore.itemsTotalLength - 1 ||
          fetchMore.itemsTotalLength === 0 ||
          fetchMore.desiredPage > fetchMore.totalPages ||
          fetchMore.itemList.length > fetchMore.itemsTotalLength ||
          fetchMore.listRequestStatus === 1
        ) {
          return of(RETURN_EMPTY());
        }
        return of(followPPromiseListActions.FETCH_CUSTOMER_LIST_LOAD({isFirstPage: false}));
      }),
    ),
  );
}
