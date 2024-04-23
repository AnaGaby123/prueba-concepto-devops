import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
/*Actions Imports*/
import {controlMaterialDeliveryListActions} from '@appActions/pendings/imports-phs/control-material-delivery';
/*Selectors Imports*/
import {controlMaterialDeliveryListSelectors} from '@appSelectors/pendings/imports-phs/control-material-delivery';
import * as apiLogistic from 'api-logistica';
/*Utils Imports*/
import {addRowIndex} from '@appUtil/util';
import * as servicesLogger from '@appUtil/logger';
import {selectIdUser} from '@appSelectors/auth/auth.selectors';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {FiltersOnlyActive} from '@appModels/filters/Filters';

const FILE_NAME = 'Control-Material-Delivery-List';

@Injectable()
export class ControlMaterialDeliveryListEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private importAssistantServices: apiLogistic.ProcesosL07ImportacionesAsistenteImportacionesService,
  ) {}

  fetchCustomsAgents$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        controlMaterialDeliveryListActions.FETCH_CUSTOMS_AGENTS_LOAD,
        controlMaterialDeliveryListActions.SET_SEARCH_TERM,
        controlMaterialDeliveryListActions.SET_FILTER_ORDER,
      ),
      withLatestFrom(this.store.select(controlMaterialDeliveryListSelectors.selectParamsList)),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          controlMaterialDeliveryListActions.SET_API_STATUS({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.importAssistantServices.vGARImportadorQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consultar Agentes Aduanales.',
              ),
              response,
            );
            this.store.dispatch(
              controlMaterialDeliveryListActions.SET_API_STATUS({
                status: API_REQUEST_STATUS_SUCCEEDED,
              }),
            );

            return controlMaterialDeliveryListActions.FETCH_CUSTOMS_AGENTS_SUCCESS({
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
                'Consultar Agentes Aduanales.',
              ),
              error,
            );
            this.store.dispatch(
              controlMaterialDeliveryListActions.SET_API_STATUS({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );

            return of(controlMaterialDeliveryListActions.FETCH_CUSTOMS_AGENTS_ERROR(error));
          }),
        );
      }),
    ),
  );
  totalsAgent$ = createEffect(() =>
    this.action$.pipe(
      ofType(controlMaterialDeliveryListActions.FETCH_TOTALS_AGENT_LOAD),
      withLatestFrom(this.store.select(selectIdUser)),
      mergeMap(([action, idUser]) => {
        return this.importAssistantServices
          .AsistenteImportacionAcuseReciboGraficaTotalesObtener(idUser)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consultar Totales de Agentes Aduanales.',
                ),
                response,
              );
              return controlMaterialDeliveryListActions.FETCH_TOTALS_AGENT_SUCCESS({
                totals: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Consultar Totales de Agentes Aduanales.',
                ),
                error,
              );
              return of(controlMaterialDeliveryListActions.FETCH_TOTALS_AGENT_ERROR(error));
            }),
          );
      }),
    ),
  );
  fetchDonutAgent$ = createEffect(() =>
    this.action$.pipe(
      ofType(controlMaterialDeliveryListActions.FETCH_DONUT_AGENT_LOAD),

      mergeMap((action) => {
        const params = new FiltersOnlyActive();

        return this.importAssistantServices.vGARImportadorQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consultar Todos los Agentes Aduanales.',
              ),
              response,
            );

            return controlMaterialDeliveryListActions.FETCH_DONUT_AGENT_SUCCESS({
              list: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Consultar Todos los Agentes Aduanales.',
              ),
              error,
            );

            return of(controlMaterialDeliveryListActions.FETCH_DONUT_AGENT_ERROR(error));
          }),
        );
      }),
    ),
  );
}
