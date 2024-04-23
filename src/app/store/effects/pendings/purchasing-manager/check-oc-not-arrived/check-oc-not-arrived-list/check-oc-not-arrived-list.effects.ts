/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';

/* Actions Imports */
import {checkOcNotArrivedListActions} from '@appActions/pendings/purchasing-manager/check-oc-not-arrived';

/* Selectors Imports */
import {checkNotArrivedListSelectors} from '@appSelectors/pendings/purchasing-manager/check-oc-not-arrived';

/* Services Imports */
import * as apiLogistic from 'api-logistica';
import * as servicesLogger from '@appUtil/logger';

/* Models Imports */
import {
  IChartInfo,
  IProvider,
} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-list/check-oc-not-arrived-list.models';

/* Common Imports */
import {API_REQUEST_STATUS_FAILED, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';

/* Tools Imports */
import {map as _map} from 'lodash-es';

import {RETURN_EMPTY} from '@appActions/utils/utils.action';

const FILE_NAME = 'check-oc-not-arrived-list.effects.ts';

@Injectable()
export class CheckOcNotArrivedListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private purchaseOrderServices: apiLogistic.ProcesosL06OrdenDeCompraService,
    private purchaseOrderEntriesServices: apiLogistic.ProcesosL06OrdenDeCompraPartidasService,
  ) {}

  fetchListProviders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        checkOcNotArrivedListActions.FETCH_PROVIDERS_LOAD,
        checkOcNotArrivedListActions.SET_TERM_SEARCH,
        checkOcNotArrivedListActions.SET_SORT_OPTION,
      ),
      withLatestFrom(
        this.store.select(checkNotArrivedListSelectors.selectQueryInfoProviders),
        this.store.select(checkNotArrivedListSelectors.selectNeedsToReloadProviders),
      ),
      mergeMap(([action, queryInfo, needsToReload]) => {
        if (needsToReload) {
          return this.purchaseOrderServices.vOcProveedorQueryResult(queryInfo).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar proveedores.',
                ),
                response,
              );
              const providers: Array<IProvider> = _map(response.Results, (provider, index) => ({
                ...provider,
                Index: index + 1,
              }));

              return checkOcNotArrivedListActions.FETCH_PROVIDERS_SUCCESS({
                providers,
                totalProviders: response.TotalResults,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar proveedores.',
                ),
                error,
              );

              return of(checkOcNotArrivedListActions.FETCH_PROVIDERS_FAILED());
            }),
          );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );

  fetchChartsDonutData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkOcNotArrivedListActions.FETCH_CHARTS_DONUT_LOAD),
      mergeMap((action) => {
        const data = {
          queryInfo: {
            Filters: [
              {
                NombreFiltro: 'Confirmada',
                ValorFiltro: true,
              },
            ],
          },
          donutProviders: {} as IChartInfo,
          donutFreight: {} as IChartInfo,
          donutDelivery: {} as IChartInfo,
        };
        return this.purchaseOrderEntriesServices
          .vOcPartidaDatosGraficaOrdenDeCompraObj(data.queryInfo)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar la data de la gráfica de dona de proveedores.',
                ),
                response,
              );
              return {
                ...data,
                donutProviders: {
                  ...data.donutProviders,
                  data: response,
                  status: API_REQUEST_STATUS_SUCCEEDED,
                },
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar la data de la gráfica de dona de proveedores.',
                ),
                error,
              );
              return of({
                ...data,
                donutProviders: {
                  ...data.donutProviders,
                  status: API_REQUEST_STATUS_FAILED,
                },
              });
            }),
          );
      }),
      switchMap((data) => {
        return this.purchaseOrderEntriesServices
          .vOcPartidaDatosGraficaOrdenDeCompraFleteObj(data.queryInfo)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar la data de la gráfica de dona de flete.',
                ),
                response,
              );
              return {
                ...data,
                donutFreight: {
                  ...data.donutFreight,
                  data: response,
                  status: API_REQUEST_STATUS_SUCCEEDED,
                },
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar la data de la gráfica de dona de flete.',
                ),
                error,
              );
              return of({
                ...data,
                donutFreight: {
                  ...data.donutFreight,
                  status: API_REQUEST_STATUS_FAILED,
                },
              });
            }),
          );
      }),
      switchMap((data) => {
        return this.purchaseOrderEntriesServices
          .vOcPartidaDatosGraficaOrdenDeCompraTipoEntregaObj(data.queryInfo)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar la data de la gráfica de dona de entrega.',
                ),
                response,
              );
              data = {
                ...data,
                donutDelivery: {
                  ...data.donutDelivery,
                  data: response,
                  status: API_REQUEST_STATUS_SUCCEEDED,
                },
              };
              return checkOcNotArrivedListActions.FETCH_CHARTS_DONUT_SUCCESS({
                donutProviders: data.donutProviders,
                donutDelivery: data.donutDelivery,
                donutFreight: data.donutFreight,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar la data de la gráfica de dona de entrega.',
                ),
                error,
              );
              this.store.dispatch(
                checkOcNotArrivedListActions.FETCH_CHARTS_DONUT_FAILED({
                  donutProviders: data.donutProviders,
                  donutFreight: data.donutFreight,
                  donutDelivery: {
                    ...data.donutDelivery,
                    status: API_REQUEST_STATUS_FAILED,
                  },
                }),
              );
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );

  fetchChartBarData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkOcNotArrivedListActions.FETCH_CHARTS_BAR_LOAD),
      mergeMap((action) => {
        const data = {
          queryInfo: {
            Filters: [
              {
                NombreFiltro: 'Confirmada',
                ValorFiltro: true,
              },
            ],
          },
          barTime: {} as IChartInfo,
          barDelivery: {} as IChartInfo,
        };

        return this.purchaseOrderEntriesServices
          .vOcPartidaDatosGraficaOrdenDeCompraTiempoDeReferenciaObj(data.queryInfo)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar la data de la gráfica de barra de tiempo de entrega.',
                ),
                response,
              );
              return {
                ...data,
                barTime: {
                  ...data.barTime,
                  data: response,
                  status: API_REQUEST_STATUS_SUCCEEDED,
                },
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar la data de la gráfica de barra de tiempo de entrega.',
                ),
                error,
              );
              return of({
                ...data,
                barTime: {
                  ...data.barTime,
                  status: API_REQUEST_STATUS_FAILED,
                },
              });
            }),
          );
      }),
      switchMap((data) => {
        this.store.dispatch(
          checkOcNotArrivedListActions.FETCH_CHARTS_BAR_SUCCESS({
            barTime: data.barTime,
            barDelivery: data.barDelivery,
          }),
        );
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
