/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import * as servicesLogger from '@appUtil/logger';

/* Actions Imports */
import {processPurchaseListActions} from '@appActions/pendings/purchasing-manager/process-purchase';

/* Selectors Imports */
import {processPurchaseListSelectors} from '@appSelectors/pendings/purchasing-manager/process-purchase';

/* Services Imports */
import * as apiLogistic from 'api-logistica';

/* Tools Imports */
import {EMPTY} from 'rxjs';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {SET_LOADING} from '@appActions/utils/utils.action';
import {addRowIndex} from '@appUtil/util';

const FILE_NAME = 'Process-Purchase-List';

@Injectable()
export class ProcessPurchaseListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private purchaseOrderServices: apiLogistic.ProcesosL06OrdenDeCompraDashboardService,
  ) {}

  fetchProviderProcessP$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        processPurchaseListActions.FETCH_PROVIDERS_LOAD,
        processPurchaseListActions.SET_SORT_SELECTED,
        processPurchaseListActions.SET_TAB_SELECTED,
        processPurchaseListActions.SET_SEARCH_TERM,
      ),
      withLatestFrom(this.store.select(processPurchaseListSelectors.selectParams)),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          processPurchaseListActions.SET_STATUS_API({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.purchaseOrderServices.vProveedorOcPendienteCompraQueryResult(params).pipe(
          map((response) => {
            this.store.dispatch(
              processPurchaseListActions.SET_STATUS_API({
                status: API_REQUEST_STATUS_SUCCEEDED,
              }),
            );
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta Proveedores.',
              ),
              response,
            );
            return processPurchaseListActions.FETCH_PROVIDERS_SUCCESS({
              data: {
                TotalResults: response.TotalResults,
                Results: addRowIndex(params.desiredPage, params.pageSize, response.Results),
              },
            });
          }),
          catchError((error) => {
            this.store.dispatch(
              processPurchaseListActions.SET_STATUS_API({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Consulta Proveedores.',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  fetchCharts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(processPurchaseListActions.FETCH_CHARTS_DONUT_LOAD),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.purchaseOrderServices.TramitarCompraDonasObtener().pipe(
          map((response) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return processPurchaseListActions.FETCH_CHARTS_DONUT_SUCCESS({
              data: response,
            });
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
    ),
  );
}
