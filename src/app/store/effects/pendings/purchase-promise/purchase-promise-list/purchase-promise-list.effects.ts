import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
// Models
import * as apiLogistic from 'api-logistica';
import {AttributeDashboard, DashboardData} from 'api-logistica';
// Actions
import {purchasePromiseListActions} from '@appActions/pendings/purchase-promise';
// Selectors
import {purchasePromiseListSelectors} from '@appSelectors/pendings/purchase-promise';
import * as servicesLogger from '@appUtil/logger';
import {selectPurchasePromiseTabsQueryInfo} from '@appSelectors/pendings/purchase-promise/purchase-promise-list/purchase-promise-list.selectors';
import {INIT_PURCHASE_PROMISE_LIST_COMPONENT_EFFECT} from '@appActions/pendings/purchase-promise/purchase-promise-list/purchase-promise-list.actions';
import {buildPurchasePromiseFromDashboard} from '@appHelpers/pending/purchase-promise/purchase-promise.helpers';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';

const FILE_NAME = 'Purchase-Promise-List';

@Injectable()
export class PurchasePromiseListEffects {
  constructor(
    private actions$: Actions,
    private logger: NGXLogger,
    private store: Store,
    private purchasePromiseCustomerServices: apiLogistic.ProcesosL03PromesaDeCompraDashboardService,
  ) {}

  // DOCS: Dispara los efectos al iniciar el componente
  ngOnInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(INIT_PURCHASE_PROMISE_LIST_COMPONENT_EFFECT),
      map(() => {
        this.store.dispatch(
          purchasePromiseListActions.FETCH_CUSTOMER_PURCHASE_PROMISE_LOAD({
            isFirstPage: true,
          }),
        );
        return purchasePromiseListActions.GET_PURCHASE_PROMISE_LIST_TABS_INFO();
      }),
    ),
  );
  // DOCS: Obtiene los valores de cada tab
  getTabsInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseListActions.GET_PURCHASE_PROMISE_LIST_TABS_INFO),
      withLatestFrom(this.store.select(selectPurchasePromiseTabsQueryInfo)),
      mergeMap(([actions, queryInfo]) => {
        return this.purchasePromiseCustomerServices
          .vClientePromesasDeCompraObtenerTabsDashboard(queryInfo)
          .pipe(
            map((response: AttributeDashboard[]) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener los totales de las tabs de controlar promesa de compra.',
                ),
              );
              return purchasePromiseListActions.GET_PURCHASE_PROMISE_LIST_TABS_INFO_SUCCESS({
                tabs: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener los totales de las tabs de controlar  promesa de compra.',
                ),
                error,
              );
              return of(purchasePromiseListActions.GET_PURCHASE_PROMISE_LIST_TABS_INFO_ERROR());
            }),
          );
      }),
    ),
  );
  // DOCS: Obtiene el listado del dashoard
  customersPurchasePromise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        purchasePromiseListActions.GET_PURCHASE_PROMISE_LIST_TABS_INFO_SUCCESS,
        purchasePromiseListActions.SET_DATE_RANGE_PROMISE,
        purchasePromiseListActions.SET_FILTER_PROMISE,
        purchasePromiseListActions.SET_TAB_PROMISE,
        purchasePromiseListActions.SET_SEARCH_TERM_PROMISE,
      ),
      withLatestFrom(
        this.store.select(purchasePromiseListSelectors.selectPurchasePromiseDashboardQueryInfo),
      ),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(purchasePromiseListActions.CHANGE_LOADING_STATUS());
        return this.purchasePromiseCustomerServices
          .vClientePromesasDeCompraQueryResult_1(queryInfo)
          .pipe(
            map((response: DashboardData) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener los totales de listado de controlar promesa de compra.',
                ),
                response,
              );
              const customerList = buildPurchasePromiseFromDashboard(response.Resumen);
              return purchasePromiseListActions.FETCH_CUSTOMER_PURCHASE_PROMISE_LIST_SUCCESS({
                customerList,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener los totales de listado de controlar promesa de compra.',
                ),
                error,
              );
              return of(purchasePromiseListActions.FETCH_CUSTOMER_PURCHASE_PROMISE_LIST_ERROR());
            }),
          );
      }),
    ),
  );
  // DOCS: Obtiene los siguientes elementos del listado
  fetchMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseListActions.FETCH_MORE_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(purchasePromiseListSelectors.selectFetchMoreCustomersInfo)),
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
        return of(
          purchasePromiseListActions.FETCH_CUSTOMER_PURCHASE_PROMISE_LOAD({
            isFirstPage: false,
          }),
        );
      }),
    ),
  );
}
