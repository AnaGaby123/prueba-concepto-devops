/* Core Imports */
import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import * as servicesLogger from '@appUtil/logger';

/* Actions Imports */
import {registerArrivalListActions} from '@appActions/pendings/purchasing-manager/register-arrival';

/* Selectors Imports */
import {registerArrivalListSelectors} from '@appSelectors/pendings/purchasing-manager/register-arrival';

/* Api Imports */
/* Model Imports */
import * as apiLogistic from 'api-logistica';
import {ExportadorOrdenDespachoObj, VRAImpOrdenDespacho} from 'api-logistica';
import {IPorter} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-list/register-arrival-list.models';

/* Tools Imports */
import {map as _map} from 'lodash-es';

const FILE_NAME = 'register-arrival-list.effects';

@Injectable()
export class RegisterArrivalListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private purchaseRegisterArrival: apiLogistic.ProcesosL06OrdenDeCompraRegistrarArriboService,
  ) {}

  fetchProviders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        registerArrivalListActions.FETCH_PORTERS_LOAD,
        registerArrivalListActions.SET_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(registerArrivalListSelectors.selectQueryInfo),
        this.store.select(registerArrivalListSelectors.selectNeedsToReloadPorters),
        this.store.select(registerArrivalListSelectors.selectNeedsToReloadDonutData),
      ),
      mergeMap(([action, queryInfo, needsToReloadPorters, needsToReloadDonutData]) => {
        if (needsToReloadPorters) {
          return this.purchaseRegisterArrival
            .vRAImpOrdenDespachoExportadorOrdenDespachoObj(queryInfo)
            .pipe(
              map((response: Array<ExportadorOrdenDespachoObj>) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al consultar las fleteras.',
                  ),
                  response,
                );
                const porters: Array<IPorter> = _map(response, (porter: IPorter, index) => ({
                  ...porter,
                  Index: index + 1,
                  isOpen: false,
                  TotalArribadas: porter.TotalArribadas || 0,
                  TotalNoArribadas: porter.TotalNoArribadas || 0,
                  TotalBultos: porter.TotalBultos || 0,
                  TotalGuias: porter.TotalGuias || 0,
                  vRAImpOrdenDespacho: _map(
                    porter.vRAImpOrdenDespacho,
                    (item: VRAImpOrdenDespacho) => ({
                      ...item,
                      Folio: item.Folio || 'NA',
                      Bultos: item.Bultos || 0,
                    }),
                  ),
                }));

                if (needsToReloadDonutData) {
                  const donutData: Array<ExportadorOrdenDespachoObj> = _map(
                    response,
                    (porter: ExportadorOrdenDespachoObj) => {
                      delete porter.vRAImpOrdenDespacho;
                      delete porter.TotalArribadas;
                      delete porter.TotalNoArribadas;
                      delete porter.FechaMasProxima;

                      return {
                        ...porter,
                        TotalBultos: porter.TotalBultos || 0,
                        TotalGuias: porter.TotalGuias || 0,
                      };
                    },
                  );

                  this.store.dispatch(
                    registerArrivalListActions.FETCH_DONUT_DATA_SUCCESS({
                      donutData,
                    }),
                  );
                }
                return registerArrivalListActions.FETCH_PORTERS_SUCCESS({
                  porters,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al consultar las fleteras.',
                  ),
                  error,
                );
                this.store.dispatch(registerArrivalListActions.FETCH_PORTERS_FAILED());
                return EMPTY;
              }),
            );
        }

        return EMPTY;
      }),
    ),
  );
}
