/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';

import * as servicesLogger from '@appUtil/logger';

/* Actions Imports */
import {
  confirmDispatchActions,
  confirmDispatchDetailsActions,
  confirmDispatchListActions,
} from '@appActions/pendings/purchasing-manager/confirm-dispatch';

/* Models Imports */
import {
  ImpCDGDonaProveedor,
  ProcesosL07ImportacionesConfirmarDespachoService,
  QueryResultVImpCDProveedores,
} from 'api-logistica';
import {IProvidersConfirmDispatch} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-list/confirm-dispatch-list.models';

/* Selectors Imports */
import {confirmDispatchListSelectors} from '@appSelectors/pendings/purchasing-manager/confirm-dispatch';

/* Tools Imports */
import {filter, map as _map, sum} from 'lodash-es';

/* Common Imports */
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'confirm-dispatch-list.effects.ts';

@Injectable()
export class ConfirmDispatchListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private confirmDispatchServices: ProcesosL07ImportacionesConfirmarDespachoService,
  ) {}

  fetchProviders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        confirmDispatchListActions.FETCH_PROVIDERS_LOAD,
        confirmDispatchListActions.SET_SORT_SELECTED,
        confirmDispatchListActions.SET_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(confirmDispatchListSelectors.selectQueryInfoProviders),
        this.store.select(confirmDispatchListSelectors.selectNeedsToReloadProviders),
      ),
      mergeMap(([action, queryInfo, needsToReload]) => {
        if (needsToReload) {
          return this.confirmDispatchServices.vImpCDProveedoresQueryResult(queryInfo).pipe(
            map((response: QueryResultVImpCDProveedores) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar proveedores.',
                ),
                response,
              );
              const providers: Array<IProvidersConfirmDispatch> = _map(
                response.Results,
                (provider, index) => ({
                  ...provider,
                  Index: index + 1,
                }),
              );
              return confirmDispatchListActions.FETCH_PROVIDERS_SUCCESS({
                providers,
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

              return of(confirmDispatchListActions.FETCH_PROVIDERS_FAILED());
            }),
          );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );

  fetchDataCharts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmDispatchListActions.FETCH_DATA_CHARTS_LOAD),
      withLatestFrom(this.store.select(confirmDispatchListSelectors.selectNeedsToReloadDataCharts)),
      mergeMap(([action, needsToReload]) => {
        if (needsToReload) {
          return this.confirmDispatchServices
            .impCDDashBoardGraficasTotalesObtenerValoresGraficas()
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener la información de las gráficas.',
                  ),
                  response,
                );
                return confirmDispatchListActions.FETCH_DATA_CHARTS_SUCCESS({
                  dataCharts: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener la información de las gráficas.',
                  ),
                  error,
                );
                return of(confirmDispatchListActions.FETCH_DATA_CHARTS_FAILED);
              }),
            );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );

  setProviderSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmDispatchListActions.SET_PROVIDER_SELECTED),
      withLatestFrom(this.store.select(confirmDispatchListSelectors.selectDataChartProviders)),
      mergeMap(([action, dataProviders]) => {
        const dataProviderSelected: ImpCDGDonaProveedor = filter(
          dataProviders,
          (provider) => provider.NombreProveedor === action.providerSelected.Nombre,
        )[0];

        const {PiezasOC1Dia} = dataProviderSelected;
        const {PiezasOC2Dias} = dataProviderSelected;
        const {PiezasOC3Dias} = dataProviderSelected;
        const {PiezasOC3MasDias} = dataProviderSelected;

        this.store.dispatch(
          confirmDispatchDetailsActions.SET_TAB_TOTALS({
            all: sum([PiezasOC1Dia, PiezasOC2Dias, PiezasOC3Dias, PiezasOC3MasDias]),
            oneDay: PiezasOC1Dia,
            twoDays: PiezasOC2Dias,
            threeDays: PiezasOC3Dias,
            moreThanThreeDays: PiezasOC3MasDias,
          }),
        );
        this.store.dispatch(
          confirmDispatchActions.SET_ALLOWED_TO_DETAILS_VALUE({
            allowedToDetails: true,
          }),
        );
        this.store.dispatch(
          confirmDispatchActions.SET_IS_IN_DETAILS_VIEW({
            isInDetailsView: true,
          }),
        );
        this.store.dispatch(confirmDispatchDetailsActions.FETCH_PURCHASE_ORDERS_LOAD());
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.confirmDispatch.confirmDispatch,
          appRoutes.confirmDispatch.details,
        ]);
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
