import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import * as servicesLogger from '@appUtil/logger';
import {addRowIndex, patchBody} from '@appUtil/util';
import {EMPTY, lastValueFrom, of} from 'rxjs';
// Models
import * as apiLogistic from 'api-logistica';
import {
  AjOfEstrategiaCotizacion,
  QueryResultAjOfEstrategiaCotizacion,
  QueryResultVEviResumenGeneral,
} from 'api-logistica';
import * as apiCatalog from 'api-catalogos';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
// Actions
import * as actions from '@appActions/general-summary/general-summary.actions';
// Selectors
import * as selectors from '@appSelectors/general-summary/general-summary.selectors';

import {find, isEmpty, map as _map} from 'lodash-es';

import {RETURN_EMPTY, SET_LOADING} from '@appActions/utils/utils.action';
import {
  IStrategy,
  ITactics,
  ITacticService,
} from '@appModels/store/general-summary/general-summary.models';
import {MatDialog} from '@angular/material/dialog';
import {PopUpStrategyComponent} from '@appComponents/general-summary/summary-data/pop-up-strategy/pop-up-strategy.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';

const FILE_NAME = 'general-summary.effects';

@Injectable()
export class GeneralSummaryEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private closingQuotationServices: apiLogistic.ProcesosL01CotizacionCierreService,
    private offerAdjustment: apiLogistic.ProcesosL02AjustarOfertaService,
    private catalogServices: apiCatalog.CatalogosService,
    private dialog: MatDialog,
  ) {}

  fetchEviList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.FETCH_EVI_LIST_LOAD),
      mergeMap((action) => {
        const params = patchBody(
          null,
          null,
          null,
          null,
          null,
          [{NombreFiltro: 'Estrategia', ValorFiltro: true}],
          'asc',
        );
        return this.closingQuotationServices.vEviCotizacionesQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los EVIS.',
              ),
              response,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return actions.FETCH_EVI_LIST_SUCCESS({data: response});
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener los EVIS.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
    ),
  );
  fetchCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.FETCH_CUSTOMER_GENERAL_SUMMARY_LOAD),
      withLatestFrom(this.store.select(selectors.filtersFromClients)),
      mergeMap(([action, params]) => {
        return this.closingQuotationServices.vEviResumenGeneralQueryResult(params).pipe(
          map((response: QueryResultVEviResumenGeneral) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los clientes con alguna estrategia.',
              ),
              response,
            );

            return actions.FETCH_CUSTOMER_GENERAL_SUMMARY_SUCCESS({
              data: {
                TotalResults: response.TotalResults,
                Results: addRowIndex(
                  0,
                  0,
                  _map(response.Results, (item) => {
                    return {...item, strategy: {}};
                  }),
                ),
              },
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los clientes con alguna estrategia.',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  allCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.SET_ALL_CLIENTS_LOAD),
      mergeMap((action) => {
        return this.closingQuotationServices.vEviResumenGeneralQueryResult(patchBody()).pipe(
          map((response: QueryResultVEviResumenGeneral) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener todos losclientes con alguna estrategia.',
              ),
              response,
            );

            return actions.SET_ALL_CLIENTS({data: response});
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener todos los clientes con alguna estrategia.',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );
  strategiesCustomer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.FETCH_STRATEGIES_LOAD),
        mergeMap((action) => {
          const params = new FiltersOnlyActive();
          params.Filters.push({
            NombreFiltro: 'IdCliente',
            ValorFiltro: action.customer.IdCliente,
          });
          this.store.dispatch(actions.CUSTOMER_SELECTED({customer: action.customer}));
          if (action.customer.Estrategia) {
            this.store.dispatch(SET_LOADING({payload: true}));
            return this.offerAdjustment.ajOfEstrategiaCotizacionQueryResult(params).pipe(
              map((response: QueryResultAjOfEstrategiaCotizacion) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener las estrategias de la cotización.',
                  ),
                  response,
                );
                const result: AjOfEstrategiaCotizacion = find(
                  response.Results,
                  (o: AjOfEstrategiaCotizacion) =>
                    o.IdAjOfEstrategiaCotizacion === action.customer.IdAjOfEstrategiaCotizacion,
                );
                return {
                  ids: action.customer.IdAjOfEstrategiaCotizacion,
                  idStrategy: result.IdCatEstrategiaCotizacion,
                };
              }),
              catchError((error) => {
                this.store.dispatch(SET_LOADING({payload: false}));
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener las estrategias de la cotización.',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
          } else {
            return EMPTY;
          }
        }),
        switchMap((data: ITacticService) => {
          const params = new FiltersOnlyActive();
          params.Filters.push({
            NombreFiltro: 'IdAjOfEstrategiaCotizacion',
            ValorFiltro: data.ids,
          });
          return this.offerAdjustment.ajOfEstrategiaCotizacionTacticaQueryResult(params).pipe(
            map(async (response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las tácticas de la estrategia.',
                ),
                response,
              );
              const dataStrategy: IStrategy = {} as IStrategy;
              const strategy = await lastValueFrom(
                this.catalogServices.catEstrategiaCotizacionObtener(data.idStrategy),
              );
              dataStrategy.strategy = strategy.Estrategia;
              const arrayTactis: Array<ITactics> = [];
              for (let i = 0; i < response.TotalResults; i++) {
                const idStategy = response.Results[i];
                const tactic = await lastValueFrom(
                  this.catalogServices.catEstrategiaCotizacionTacticaObtener(
                    idStategy.IdCatEstrategiaCotizacionTactica,
                  ),
                );
                let subTactic: apiCatalog.CatEstrategiaCotizacionSubtactica = null;
                if (idStategy.IdCatEstrategiaCotizacionSubtactica) {
                  subTactic = await lastValueFrom(
                    this.catalogServices.catEstrategiaCotizacionSubtacticaObtener(
                      idStategy.IdCatEstrategiaCotizacionSubtactica,
                    ),
                  );
                }
                arrayTactis.push({
                  tactic: tactic.Tactica,
                  subTactic: isEmpty(subTactic) ? null : subTactic?.Subtactica,
                  justification: idStategy.Justificacion,
                  observations: idStategy.Observaciones,
                });
              }
              dataStrategy.tactics = arrayTactis;
              this.store.dispatch(actions.FETCH_STRATEGIES_SUCCESS({strategy: dataStrategy}));
              this.store.dispatch(SET_LOADING({payload: false}));
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las tácticas de la estrategia.',
                ),
                error,
              );
              return EMPTY;
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  // DOCS: EFFECT TO SHOW STRATEGIES LIST DIALOG
  showStrategiesDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.FETCH_STRATEGIES_SUCCESS),
        withLatestFrom(this.store.select(selectors.selectCustomerSelected)),
        mergeMap(([action, customer]) => {
          this.dialog.open(
            PopUpStrategyComponent,
            buildDialogConfig({
              customer,
            }),
          );

          return of(RETURN_EMPTY());
        }),
      ),
    {dispatch: false},
  );
}
