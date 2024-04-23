import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import * as apiFinance from 'api-finanzas';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {EMPTY, of} from 'rxjs';
import {map as _map} from 'lodash-es';

/*Utils Imports*/
import * as servicesLogger from '@appUtil/logger';
import {addRowIndex} from '@appUtil/util';
/*Models Imports*/
import * as apiCatalogs from 'api-catalogos';
import {DatosFacturacionCliente} from 'api-catalogos';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
/*Selectors Imports*/
import {selectIdUser} from '@appSelectors/auth/auth.selectors';
import {reviewResultsListSelectors} from '@appSelectors/pendings/charges/review-results';
/*Actions Imports*/
import {
  reviewResultsActions,
  reviewResultsListActions,
} from '@appActions/pendings/charges/review-results';

const FILE_NAME = 'Review-Results-List';

@Injectable()
export class ReviewResultsListEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private collectionClientsResults: apiFinance.CobranzaClientesResultadosRevisionService,
    private configClientConfigServices: apiCatalogs.ConfiguracionClientesConfiguracionService,
    private addressClientServices: apiCatalogs.ConfiguracionClientesDireccionesService,
    private customerCollectionServices: apiFinance.CobranzaClientesRevisionService,
    private customerCollectionMonitoringServices: apiFinance.CobranzaClientesMonitoreoCobrosService,
    private customerCollectionReviewServices: apiFinance.CobranzaClientesResultadosRevisionService,
  ) {}

  fetchReviews$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        reviewResultsListActions.FETCH_REVIEWS_LOAD,
        reviewResultsActions.EXECUTE_FILTERS,
        reviewResultsListActions.SET_OPTION_TAB,
        reviewResultsListActions.SELECTED_OPTION_CHIP,
      ),
      withLatestFrom(this.store.select(reviewResultsListSelectors.selectParamsList)),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          reviewResultsListActions.SET_STATUS_API({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.collectionClientsResults.vRevisionFacturaQueryResult(params).pipe(
          map((response) => {
            this.store.dispatch(
              reviewResultsListActions.SET_STATUS_API({
                status: API_REQUEST_STATUS_SUCCEEDED,
              }),
            );
            const list = addRowIndex(params.desiredPage, params.pageSize, response.Results);
            return reviewResultsListActions.FETCH_REVIEWS_SUCCESS({
              reviews: {
                Results: _map(list, (item) => ({
                  ...item,
                  needToReload: true,
                })),
                TotalResults: response.TotalResults,
              },
            });
          }),
          catchError((error) => {
            this.store.dispatch(
              reviewResultsListActions.SET_STATUS_API({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
            return of(reviewResultsListActions.FETCH_REVIEWS_ERROR(error));
          }),
        );
      }),
    ),
  );
  totals$ = createEffect(() =>
    this.action$.pipe(
      ofType(reviewResultsListActions.GET_TOTALS_LOAD),
      withLatestFrom(this.store.select(selectIdUser)),
      mergeMap(([action, idUser]) => {
        return this.collectionClientsResults.ResultadosRevisionTotalesProcess(idUser).pipe(
          map((response) => {
            return reviewResultsListActions.GET_TOTALS_SUCCESS({
              totals: response,
            });
          }),
          catchError((error) => {
            return of(reviewResultsListActions.GET_TOTALS_ERROR(error));
          }),
        );
      }),
    ),
  );
  billsOfClient$ = createEffect(() =>
    this.action$.pipe(
      ofType(reviewResultsListActions.SELECTED_CUSTOMER),
      withLatestFrom(this.store.select(reviewResultsListSelectors.selectReviewCustomer)),
      mergeMap(([action, customer]) => {
        if (customer.Hibrida && customer.needToReload) {
          const params = new FiltersOnlyActive();
          params.Filters.push({
            NombreFiltro: 'IdCliente',
            ValorFiltro: customer.IdCliente,
          });
          return this.configClientConfigServices.DatosFacturacionClienteQueryResult(params).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la datos de facturación del cliente',
                ),
                response,
              );
              return reviewResultsListActions.FETCH_BILLS_CLIENT_SUCCESS({
                dataBill:
                  response.TotalResults > 0 ? response.Results[0] : ({} as DatosFacturacionCliente),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la datos de facturación del cliente',
                ),
                error,
              );
              return of(reviewResultsListActions.FETCH_BILLS_CLIENT_ERROR(error));
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
  addressOfClient$ = createEffect(() =>
    this.action$.pipe(
      ofType(reviewResultsListActions.SELECTED_CUSTOMER),
      withLatestFrom(this.store.select(reviewResultsListSelectors.selectReviewCustomer)),
      mergeMap(([action, customer]) => {
        if (customer.needToReload) {
          return this.addressClientServices
            .DireccionClienteDetalleObtener(customer.IdDireccionCliente)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener la dirección del cliente',
                  ),
                  response,
                );
                return reviewResultsListActions.FETCH_ADDRESS_CLIENT_SUCCESS({
                  dataAddress: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener la datos de facturación del cliente',
                  ),
                  error,
                );
                return of(reviewResultsListActions.FETCH_ADDRESS_CLIENT_ERROR(error));
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
  reviewEvidence$ = createEffect(() =>
    this.action$.pipe(
      ofType(reviewResultsListActions.SELECTED_CUSTOMER),
      withLatestFrom(this.store.select(reviewResultsListSelectors.selectReviewCustomer)),
      mergeMap(([action, customer]) => {
        if (customer.needToReload) {
          return this.customerCollectionReviewServices
            .fccRevisionProgramadaArchivoDetalleObtener(customer.IdFccRevisionProgramada)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener la archivos de revisión',
                  ),
                  response,
                );
                return reviewResultsListActions.FETCH_EVIDENCE_REVIEW_SUCCESS({
                  evidenceReview: response.ArchivosEvidenciaRevision,
                  evidenceMessenger: response.ArchivosEvidenciaMensajero,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener la archivos de revisión',
                  ),
                  error,
                );
                return of(reviewResultsListActions.FETCH_EVIDENCE_REVIEW_ERROR(error));
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
  incidence$ = createEffect(() =>
    this.action$.pipe(
      ofType(reviewResultsListActions.SELECTED_CUSTOMER),
      withLatestFrom(this.store.select(reviewResultsListSelectors.selectReviewCustomer)),
      mergeMap(([action, customer]) => {
        if (customer.needToReload) {
          const params = new FiltersOnlyActive();
          params.Filters.push({
            NombreFiltro: 'IdTPProformaPedido',
            ValorFiltro: customer.IdTPProformaPedido,
          });
          return this.customerCollectionServices.fccRevisionProgramadaQueryResult(params).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las incidencias de revisión',
                ),
                response,
              );
              return reviewResultsListActions.FETCH_INCIDENCES_SUCCESS({
                incidences: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las incidencias de revisión',
                ),
                error,
              );
              return of(reviewResultsListActions.FETCH_INCIDENCES_ERROR(error));
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
  printReview$ = createEffect(() =>
    this.action$.pipe(
      ofType(reviewResultsListActions.PRINT_TO_REVIEW_LOAD),
      withLatestFrom(this.store.select(reviewResultsListSelectors.selectReviewCustomer)),
      mergeMap(([action, review]) => {
        return this.customerCollectionServices
          .fccRevisionProgramadaGuardarOActualizar({
            ...review,
            Publicada: true,
            FechaProgramacionCobroCalculada: review.FechaProgramacionCobro,
            FechaRegistro: DEFAULT_DATE,
            FechaUltimaActualizacion: DEFAULT_DATE,
            Activo: true,
          })
          .pipe(
            map((response) => {
              this.store.dispatch(reviewResultsListActions.SAVE_SCHEDULE_CHARGE_DATE_LOAD());

              return reviewResultsListActions.PRINT_TO_REVIEW_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al publicar la revisión',
                ),
                error,
              );
              return of(reviewResultsListActions.PRINT_TO_REVIEW_ERROR(error));
            }),
          );
      }),
    ),
  );
  updateScheduleCharge$ = createEffect(() =>
    this.action$.pipe(
      ofType(reviewResultsListActions.SAVE_SCHEDULE_CHARGE_DATE_LOAD),
      withLatestFrom(this.store.select(reviewResultsListSelectors.selectReviewCustomer)),
      mergeMap(([action, review]) => {
        return this.customerCollectionMonitoringServices
          .fccProgramacionCobroGuardarOActualizar({
            Activo: true,
            Comentarios: null,
            FechaProgramacion: review.FechaProgramacionCobro,
            FechaRegistro: DEFAULT_DATE,
            FechaUltimaActualizacion: DEFAULT_DATE,
            IdFCCProgramacionCobro: DEFAULT_UUID,
            IdTPProformaPedido: review.IdTPProformaPedido,
          })
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar cobro programado',
                ),
                response,
              );
              this.store.dispatch(
                reviewResultsListActions.FETCH_REVIEWS_LOAD({
                  isFirstPage: true,
                }),
              );
              return reviewResultsListActions.SAVE_SCHEDULE_CHARGE_DATE_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar cobro programado',
                ),
                error,
              );
              return of(reviewResultsListActions.SAVE_SCHEDULE_CHARGE_DATE_ERROR(error));
            }),
          );
      }),
    ),
  );
}
