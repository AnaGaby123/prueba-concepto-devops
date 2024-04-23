import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {of} from 'rxjs';
/*Selectors Imports*/
import {registerDispatchListSelectors} from '@appSelectors/pendings/imports/register-dispatch';
/*Actions Imports*/
import {registerDispatchListActions} from '@appActions/pendings/imports/register-dispatch';
/*Models Imports*/
import * as apiLogistic from 'api-logistica';
import {addRowIndex} from '@appUtil/util';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

const FILE_NAME = 'Register-Dispatch-List';

@Injectable()
export class RegisterDispatchListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private registerDispatchServices: apiLogistic.ProcesosL07ImportacionesRegistrarDespachoService,
  ) {}

  fetchCustomsBrokers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        registerDispatchListActions.FETCH_CUSTOMS_BROKER_LOAD,
        registerDispatchListActions.SET_SELECTED_OPTION,
        registerDispatchListActions.SET_SEARCH_TERM,
      ),
      withLatestFrom(this.store.select(registerDispatchListSelectors.selectParamsList)),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          registerDispatchListActions.SET_STATUS_API({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.registerDispatchServices.vRDImportadorQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta Agentes Aduanales.',
              ),
              response,
            );
            this.store.dispatch(
              registerDispatchListActions.SET_STATUS_API({
                status: API_REQUEST_STATUS_SUCCEEDED,
              }),
            );
            return registerDispatchListActions.FETCH_CUSTOMS_BROKER_SUCCESS({
              data: {
                TotalResults: response.TotalResults,
                Results: addRowIndex(params.desiredPage, params.pageSize, response.Results),
              },
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Consulta Agentes Aduanales.',
              ),
              error,
            );
            this.store.dispatch(
              registerDispatchListActions.SET_STATUS_API({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
            return of(registerDispatchListActions.FETCH_CUSTOMS_BROKER_ERROR(error));
          }),
        );
      }),
    ),
  );
  fetchTotals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerDispatchListActions.FETCH_TOTALS_LOAD),
      mergeMap((action) => {
        return this.registerDispatchServices.RegistrarDespachoGraficaTotalesObtener().pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta Totales.',
              ),
              response,
            );

            return registerDispatchListActions.FETCH_TOTALS_SUCCESS({
              totals: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Consulta Totales.',
              ),
              error,
            );
            return of(registerDispatchListActions.FETCH_TOTALS_ERROR(error));
          }),
        );
      }),
    ),
  );
}
