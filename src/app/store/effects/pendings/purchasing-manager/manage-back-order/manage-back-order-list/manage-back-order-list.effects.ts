import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
/*Models Import*/
import * as apiLogistic from 'api-logistica';
/*Actions Imports*/
import {manageBackOrderListActions} from '@appActions/pendings/purchasing-manager/manage-back-order';
/*Selectors Import*/
import {manageBackOrderListSelectors} from '@appSelectors/pendings/purchasing-manager/manage-back-order';
import {addRowIndex} from '@appUtil/util';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import * as servicesLogger from '@appUtil/logger';
import {FiltersOnlyActive} from '@appModels/filters/Filters';

const FILE_NAME = 'manage-back-order-list';

@Injectable()
export class ManageBackOrderListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private purchaseOrderServices: apiLogistic.ProcesosL06OrdenDeCompraService,
    private purchaseOrderEntriesServices: apiLogistic.ProcesosL06OrdenDeCompraPartidasService,
  ) {}

  fetchProvidersBackOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        manageBackOrderListActions.FETCH_PROVIDERS_LOAD,
        manageBackOrderListActions.SET_SORT_OPTION,
        manageBackOrderListActions.SET_TERM_SEARCH,
      ),
      withLatestFrom(this.store.select(manageBackOrderListSelectors.selectParams)),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          manageBackOrderListActions.SET_STATUS_API({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.purchaseOrderServices.vOcProveedorQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los proveedores.',
              ),
              response,
            );
            this.store.dispatch(
              manageBackOrderListActions.SET_STATUS_API({
                status: API_REQUEST_STATUS_SUCCEEDED,
              }),
            );
            return manageBackOrderListActions.FETCH_PROVIDERS_SUCCESS({
              data: {
                TotalResults: response.TotalResults,
                Results: addRowIndex(params.desiredPage, params.pageSize, response.Results),
              },
            });
          }),
          catchError((error) => {
            this.store.dispatch(
              manageBackOrderListActions.SET_STATUS_API({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener los proveedores.',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );
  fetchDonutProviders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manageBackOrderListActions.FETCH_DONUT_PROVIDERS_LOAD),
      mergeMap((action) => {
        const params = new FiltersOnlyActive();
        return this.purchaseOrderEntriesServices
          .vOcPartidaDatosGraficaOrdenDeCompraObj(params)
          .pipe(
            map((response) => {
              return manageBackOrderListActions.FETCH_DONUT_PROVIDERS_SUCCESS({
                data: response,
              });
            }),
          );
      }),
    ),
  );
  fetchDonutMonitoring$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manageBackOrderListActions.FETCH_DONUT_MONITORING_LOAD),
      mergeMap((action) => {
        const params = new FiltersOnlyActive();
        return this.purchaseOrderEntriesServices
          .vOcPartidaDatosGraficaOrdenDeCompraTipoEntregaObj(params)
          .pipe(
            map((response) => {
              return manageBackOrderListActions.FETCH_DONUT_MONITORING_SUCCESS({
                data: response,
              });
            }),
          );
      }),
    ),
  );
}
