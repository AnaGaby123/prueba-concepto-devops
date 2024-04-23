import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
// Actions
import {offerAdjustmentListActions} from '@appActions/pendings/offer-adjustment';
// Selectors
import {offerAdjustmentListSelectors} from '@appSelectors/pendings/offer-adjustment';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import * as apiLogistic from 'api-logistica';
import {AttributeDashboard} from 'api-logistica';
import {addRowIndex} from '@appUtil/util';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import * as servicesLogger from '@appUtil/logger';

import {FilterTuple} from 'api-finanzas';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {buildOfferAdjustmentFromDashboard} from '@appHelpers/pending/offer-adjustment/offer-adjustment.helpers';

const FILE_NAME = '';

@Injectable()
export class OfferAdjustmenListEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private adjustmentService: apiLogistic.ProcesosL02AjustarOfertaService,
  ) {}

  fetchCustomerOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        offerAdjustmentListActions.FETCH_CUSTOMER_LOAD,
        offerAdjustmentListActions.SET_FILTER_BY_DATES,
      ),
      withLatestFrom(this.store.select(offerAdjustmentListSelectors.selectFiltersCustomer)),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          offerAdjustmentListActions.SET_LOADING_LIST({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.adjustmentService.vEVIcotizacionesAjusteOfertaQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta EVIS.',
              ),
              response,
            );
            this.store.dispatch(
              offerAdjustmentListActions.SET_LOADING_LIST({
                status: API_REQUEST_STATUS_SUCCEEDED,
              }),
            );
            return offerAdjustmentListActions.FETCH_CUSTOMER_SUCCESS({
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
                'Consulta EVIS.',
              ),
              error,
            );
            return of(
              offerAdjustmentListActions.SET_LOADING_LIST({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
          }),
        );
      }),
    ),
  );
  fetchDonutChartTrademark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerAdjustmentListActions.FETCH_CHART_TRADEMARK_LOAD),
      mergeMap((action) => {
        return this.adjustmentService
          .vMarcaPartidaAjusteOfertaQueryResult(new FiltersOnlyActive())
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta Marcas.',
                ),
                response,
              );
              return offerAdjustmentListActions.FETCH_CHART_TRADEMARK_SUCCESS({
                data: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Consulta EVIS.',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );
  fetchDonutChartCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerAdjustmentListActions.FETCH_CHART_CUSTOMER_LOAD),
      mergeMap((action) => {
        return this.adjustmentService
          .vClienteCotizacionAjusteOfertaQueryResult(new FiltersOnlyActive())
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta clientes.',
                ),
                response,
              );
              return offerAdjustmentListActions.FETCH_CHART_CUSTOMER_SUCCESS({
                data: response,
              });
            }),
          );
      }),
    ),
  );
  fetchBarAdjustment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerAdjustmentListActions.FETCH_CHART_ADJUSTMENT_LOAD),
      mergeMap((action) => {
        const filters: Array<FilterTuple> = [];
        return this.adjustmentService
          .vTotalPorTipoAjusteDeOfertaVTotalPorTipoAjusteDeOfertaGrafica(filters)
          .pipe(
            map((response) => {
              return offerAdjustmentListActions.FETCH_CHART_ADJUSTMENT_SUCCESS({
                data: response,
              });
            }),
          );
      }),
    ),
  );
  fetchTotalsOfferAdjustment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerAdjustmentListActions.FETCH_TOTALS_LOAD),
      mergeMap((action) => {
        const filters: Array<FilterTuple> = [];
        return this.adjustmentService
          .vTotalPorTipoAjusteDeOfertaVTotalClientesPorTipoAjusteDeOferta(filters)
          .pipe(
            map((response) => {
              return offerAdjustmentListActions.FETCH_TOTALS_SUCCESS({
                data: response,
              });
            }),
          );
      }),
    ),
  );
  fetchTotalAmounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerAdjustmentListActions.FETCH_TOTAL_AMOUNTS_LOAD),
      mergeMap((action) => {
        const filters: Array<FilterTuple> = [];
        return this.adjustmentService
          .vClienteCotizacionAjusteOfertaVClienteCotizacionAjusteOfertaTotales(filters)
          .pipe(
            map((response) => {
              return offerAdjustmentListActions.FETCH_TOTAL_AMOUNTS_SUCCESS({
                data: response,
              });
            }),
          );
      }),
    ),
  );

  fetchChartItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerAdjustmentListActions.FETCH_CHART_ITEMS_LOAD),
      mergeMap((action) => {
        const filters: Array<FilterTuple> = [];
        return this.adjustmentService
          .vCotizacionTipoPartidaAjusteOfertaVCotizacionTipoPartidaAjusteOfertaTotales(filters)
          .pipe(
            map((response) => {
              return offerAdjustmentListActions.FETCH_CHART_ITEMS_SUCCESS({
                data: response,
              });
            }),
          );
      }),
    ),
  );

  // DOCS: EFFECTS FOR NEW SERVICES
  // DOCS: GET TABS DATA
  fetchTabs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerAdjustmentListActions.FETCH_TOTALS_TABS_LOAD),
      mergeMap((action) => {
        const payload = {
          CountElements: [
            // Se obtiene las tasb para mostrar los totales por tipo de ajuste.
            // Total de EVIs en el listado.
            {NombreFiltro: 'Total', ValorFiltro: ''},
            //Con ajuste de Tiempo de entrega
            {NombreFiltro: 'TiempoEntrega', ValorFiltro: true},
            //Con ajuste de Condiciones de pago
            {NombreFiltro: 'CondicionesPago', ValorFiltro: true},
            //Con ajuste de precio
            {NombreFiltro: 'Precio', ValorFiltro: true},
          ],
        };
        return this.adjustmentService.AjustarOfertaObtenerTabsAjustarOfertaDashboard(payload).pipe(
          map((response: AttributeDashboard[]) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta de tabs en ajustar oferta.',
              ),
              response,
            );
            return offerAdjustmentListActions.FETCH_TOTALS_TABS_SUCCESS({
              tabs: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Consulta de tabs en ajustar oferta.',
              ),
              error,
            );
            return of(offerAdjustmentListActions.FETCH_TOTALS_TABS_ERROR());
          }),
        );
      }),
    ),
  );
  // DOCS: GET DASHBOARD DATA
  fetchDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        offerAdjustmentListActions.FETCH_TOTALS_TABS_SUCCESS,
        offerAdjustmentListActions.SET_TAP,
        offerAdjustmentListActions.SET_SEARCH_TERM,
        offerAdjustmentListActions.SET_FILTER_BY_TYPE,
      ),
      withLatestFrom(
        this.store.select(offerAdjustmentListSelectors.selectOfferAdjustemDashboardQueryInfo),
      ),
      mergeMap(([action, queryInfo]) => {
        return this.adjustmentService.AjustarOfertaObtenerAjustarOfertaDashboard(queryInfo).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta evis.',
              ),
              response,
            );
            const offerAdjustments = buildOfferAdjustmentFromDashboard(response.Resumen);
            return offerAdjustmentListActions.FETCH_OFFER_ADJUSTMENT_DASHBOARD_SUCCESS({
              offerAdjustments: offerAdjustments,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Consulta EVIS.',
              ),
              error,
            );
            return of(offerAdjustmentListActions.FETCH_OFFER_ADJUSTMENT_DASHBOARD_ERROR());
          }),
        );
      }),
    ),
  );
}
