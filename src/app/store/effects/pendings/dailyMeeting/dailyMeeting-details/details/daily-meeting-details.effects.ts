/* Core Imports */
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {EMPTY, of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {find, isEmpty, map as _map} from 'lodash-es';
/* Services Imports */
import * as apiLogistic from 'api-logistica';
import {
  DashboardData,
  GMCotFletes,
  GMEstrategia,
  QueryResultAjOfEstrategiaCotizacionTactica,
  QueryResultPartidaCotizacionTasaConversionObj,
  TupleDecimalDecimalInt32,
} from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import {ArchivoDetalle, AttributeDashboard} from 'api-catalogos';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {
  IQueryResultIItemQuotation,
  IQuotation,
  IQuotationStrategyResponse,
  IQuotationStrategyTactic,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.model';
import {FiltersOnlyActive} from '@appModels/filters/Filters';

/* Actions Imports */
import {DOWLOAD_FILE_LOAD, SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import {
  dailyMeetingDetailsActions,
  dailyMeetingDetailsDashboardActions,
  dailyMeetingDetailsOfferActions,
} from '@appActions/pendings/daily-meeting';

/* Selectors Imports */
import {
  dailyMeetingDashboardClientsSelectors,
  dailyMeetingDetailsOfferSelectors,
  dailyMeetingDetailsSelectors,
} from '@appSelectors/pendings/daily-meeting';

/* Tools Imports */
import {
  DEFAULT_UUID,
  QUOTATION_STRATEGY_BALANCED,
  QUOTATION_STRATEGY_DEFENSIVE,
  QUOTATION_STRATEGY_OFFENSIVE,
} from '@appUtil/common.protocols';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {
  buildClientsDailyMeetingDetailsDashboardDetails,
  buildClientsQuotesFromResponse,
  buildItemsQuotationSelected,
  buildRequestForStrategyPublic,
  buildStrategyForPublic,
  initialQuotationStrategyBody,
} from '@appHelpers/pending/daily-meeting/daily-meeting.helpers';
import {IClientQuotation} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/details/daily-meeting-dashboard-details.model';
import {selectIdUser} from '@appSelectors/auth/auth.selectors';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'daily-meeting-details.effects.ts';

@Injectable()
export class DailyMeetingDetailsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private procesosCotizacionService: apiLogistic.ProcesosL01CotizacionService,
    private procesosCotizacionCierreTasasConversionService: apiLogistic.ProcesosL01CotizacionCierreTasasConversionService,
    private catalogosService: apiCatalogs.CatalogosService,
    private configuracionService: apiCatalogs.ConfiguracionClientesService,
    private procesosAjustarOfertaService: apiLogistic.ProcesosL02AjustarOfertaService,
    private brandServices: apiLogistic.ProcesosL01CotizacionCerrarOfertaService,
    private processEstablishStrategy: apiLogistic.ProcesosL02AjustarOfertaEstablecerEstrategiaService,
    private router: Router,
    private processQuoteDailyMeeting: apiLogistic.ProcesosL01CotizacionAtenderCierreService,
    private sistemaArchivoService: apiCatalogs.SistemaArchivosService,
  ) {}

  //DOCS: OBTENER LOS VALORE DE LAS TABS EN EL DASHBOARD DE LA VISTA DETALLE

  fetchTabsDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        dailyMeetingDetailsActions.SET_SELECTED_EVI_DAILY_MEETING,
        dailyMeetingDetailsActions.SAVE_STRATEGY_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(dailyMeetingDashboardClientsSelectors.selectQueryInfoTabsDashboard),
      ),
      mergeMap(([action, queryInfoTabs]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.configuracionService
          .vClienteObtenerTabsEstadoContartoDashboard(queryInfoTabs)
          .pipe(
            map((response: Array<AttributeDashboard>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las tabs del dashboard de detalles de junta diaria de forma exitosa',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_TABS_DASHBOARD_SUCCESS({
                tabs: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las tabs del dashboard de detalles de junta diaria',
                ),
                error,
              );
              return of(dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_TABS_DASHBOARD_FAILED());
            }),
          );
      }),
    ),
  );

  //DOCS: OBTENER LOS CLIENTES QUE TIENEN COTIZACIONES DEL EVI SELECCIONADO
  fetchListClientWithQuotations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        dailyMeetingDetailsActions.SET_SELECTED_EVI_DAILY_MEETING,
        dailyMeetingDetailsDashboardActions.SET_TAB_DASHBOARD_SELECTED_MACBOOK,
        dailyMeetingDetailsDashboardActions.SET_SEARCH_TERM_DASHBOARD,
        dailyMeetingDetailsDashboardActions.SET_TYPE_FILTER_DASHBOARD_SELECTED,
        dailyMeetingDetailsActions.SAVE_STRATEGY_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(dailyMeetingDashboardClientsSelectors.selectQueryInfoListDashboard),
      ),
      mergeMap(([action, queryInfoList]) => {
        return this.procesosCotizacionService
          .vCotCotizacionObtenerJuntaDiariaClientesDashboard(queryInfoList)
          .pipe(
            map((response: DashboardData) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Se obtuvó la lista de clientes con cotizaciones de forma exitosa',
                ),
                response,
              );

              if (
                response.Resumen.length === 0 &&
                action.type !== '[DailyMeetingDetailsApi] Save Strategy Success'
              ) {
                return dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_DASHBOARD_DETAILS_SUCCESS_ZERO();
              } else if (
                response.Resumen.length === 0 &&
                action.type === '[DailyMeetingDetailsApi] Save Strategy Success'
              ) {
                this.router.navigate([
                  appRoutes.protected,
                  appRoutes.pendings.pendings,
                  appRoutes.dailyMeeting.dailyMeeting,
                ]);
                return dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_DASHBOARD_DETAILS_SUCCESS_ZERO();
              }

              const listClients: Array<IClientQuotation> = buildClientsDailyMeetingDetailsDashboardDetails(
                response.Resumen,
              );

              return dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_DASHBOARD_DETAILS_SUCCESS({
                listClients,
                clientSelected: listClients[0],
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la lista de clientes con cotizaciones ',
                ),
                error,
              );
              return of(
                dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_DASHBOARD_DETAILS_FAILED(),
              );
            }),
          );
      }),
    ),
  );

  //DOCS: OBTENER LAS COTIZACIONES DEL CLIENTE SELECCIONADO
  fetchQuotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_DASHBOARD_DETAILS_SUCCESS,
        dailyMeetingDetailsDashboardActions.SET_SELECTED_CLIENT_DASHBOARD,
      ),
      withLatestFrom(this.store.select(dailyMeetingDetailsSelectors.selectQuotationQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(SET_LOADING({payload: false}));
        return this.procesosCotizacionService.vCotCotizacionQueryResult(queryInfo).pipe(
          map((response: apiLogistic.QueryResultVCotCotizacion) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las cotizaciones asociadas por cliente.',
              ),
              response,
            );
            const clientQuotes: Array<IQuotation> = buildClientsQuotesFromResponse(
              response.Results,
            );
            return dailyMeetingDetailsActions.FETCH_QUOTATIONS_BY_SELECTED_CLIENT_SUCCESS({
              clientQuotes,
              quotationSelected: clientQuotes[0],
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener las cotizaciones asociadas por cliente.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: true}));
            this.store.dispatch(
              dailyMeetingDetailsActions.FETCH_QUOTATIONS_BY_SELECTED_CLIENT_FAILED(),
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  //DOCS: OBTENER INFORMACIÓN DE LA MONEDA POR LA COTIZACIÓN SELECCIONADA
  getCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        dailyMeetingDetailsActions.FETCH_QUOTATIONS_BY_SELECTED_CLIENT_SUCCESS,
        dailyMeetingDetailsActions.SET_QUOTATION_SELECTED,
      ),
      withLatestFrom(this.store.select(dailyMeetingDetailsSelectors.selectQuotationSelected)),
      mergeMap(([action, quotation]) => {
        if (quotation?.IdCatMoneda) {
          return this.catalogosService.catMonedaObtener(quotation.IdCatMoneda).pipe(
            map((response: apiCatalogs.CatMoneda) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la moneda de la cotización seleccionada.',
                ),
                response,
              );
              return dailyMeetingDetailsActions.SET_CURRENCY({
                currency: response.ClaveMoneda,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la moneda de la cotización.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                dailyMeetingDetailsActions.FETCH_QUOTATIONS_BY_SELECTED_CLIENT_FAILED(),
              );
              return EMPTY;
            }),
          );
        }
      }),
    ),
  );

  // DOCS: OBTIENE LAS MARCAS DE LAS PARTIDAS DE LA COTIZACIÓN SELECCIONADA
  fetchBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        dailyMeetingDetailsActions.FETCH_QUOTATIONS_BY_SELECTED_CLIENT_SUCCESS,
        dailyMeetingDetailsActions.SET_QUOTATION_SELECTED,
        dailyMeetingDetailsOfferActions.SET_SEARCH_TERM_ITEMS_OFFER,
        dailyMeetingDetailsOfferActions.SET_BRAND_OFFER_ITEMS_OFFER_SELECTED,
        dailyMeetingDetailsActions.FETCH_MORE_ITEMS_QUOTATION,
      ),
      withLatestFrom(
        this.store.select(
          dailyMeetingDetailsSelectors.selectQueryInfoParamsBrandsQuotationSelected,
        ),
      ),
      mergeMap(([action, params]) => {
        if (params.IdCotCotizacion !== DEFAULT_UUID) {
          return this.brandServices.PartidaCotizacionCerrarOfertaDetalleObtener_1(params).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las marcas que están en las partidas de la cotización seleccionada.',
                ),
                response,
              );
              return dailyMeetingDetailsOfferActions.FETCH_SELECTED_QUOTE_BRANDS_OFFER_SUCCESS({
                brands: _map(response, (brand: apiLogistic.Marca) => {
                  return {value: brand.IdMarca, label: brand.Nombre};
                }),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las marcas que están en las partidas de la cotización seleccionada.',
                ),
                error,
              );
              return of(null);
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  //DOCS: OBTENER LAS PARTIDAS DE LA COTIZACIÓN SELECCIOANDA
  fetchItemsSelecteQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        dailyMeetingDetailsActions.FETCH_QUOTATIONS_BY_SELECTED_CLIENT_SUCCESS,
        dailyMeetingDetailsActions.SET_QUOTATION_SELECTED,
        dailyMeetingDetailsActions.FETCH_MORE_ITEMS_QUOTATION,
      ),
      withLatestFrom(
        this.store.select(dailyMeetingDetailsOfferSelectors.selectQueryInfoItemsQuotationSelected),
        // this.store.select(dailyMeetingDetailsOfferSelectors.selectOnlyItemsQuotation),
      ),
      mergeMap(([action, queryInfo]) => {
        return this.procesosCotizacionCierreTasasConversionService
          .PartidaCotizacionTasaConversionObjQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultPartidaCotizacionTasaConversionObj) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las partidas de la cotización seleccionada.',
                ),
                response,
              );
              const responseItems: IQueryResultIItemQuotation = buildItemsQuotationSelected(
                response,
              );
              if (queryInfo?.desiredPage === 1) {
                this.store.dispatch(dailyMeetingDetailsActions.FETCH_FREIGHT());
              }

              return dailyMeetingDetailsActions.FETCH_ITEMS_QUOTATION_SELECTED_SUCCESS({
                response: responseItems,
                currentPage: queryInfo?.desiredPage,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las Partidas de la Cotización seleccionada',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(dailyMeetingDetailsActions.FETCH_ITEMS_QUOTATION_SELECTED_FAILED());
            }),
          );
      }),
    ),
  );

  //DOCS: OBTENER LOS FLETES DE LA COTIZACIÓN SELECCIONADA
  getFreigth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dailyMeetingDetailsActions.FETCH_FREIGHT),
      withLatestFrom(this.store.select(dailyMeetingDetailsSelectors.selectQuotationSelected)),
      mergeMap(([action, quotation]) => {
        return this.processQuoteDailyMeeting.GMCotFletesProcess(quotation.IdCotCotizacion).pipe(
          map((response: GMCotFletes) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los fletes de la cotización seleccionada.',
              ),
              response,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return dailyMeetingDetailsActions.FETCH_FREIGHT_SUCCESS({freight: response});
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener los fletes de la cotización seleccionada.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(dailyMeetingDetailsActions.FETCH_FREIGHT_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: OBTENER LAS INFORMACIÓN DE LAS BARRAS DE PORCENTAJE (ORIGINALES, COMPLEMENETARIAS, PROMOCIÓN, ALTERNATIVAS, AHORRO)
  getInformationProgressBarTypeItemsQuotation = createEffect(() =>
    this.actions$.pipe(
      ofType(
        dailyMeetingDetailsActions.FETCH_QUOTATIONS_BY_SELECTED_CLIENT_SUCCESS,
        dailyMeetingDetailsActions.SET_QUOTATION_SELECTED,
      ),
      withLatestFrom(this.store.select(dailyMeetingDetailsSelectors.selectQuotationSelected)),
      mergeMap(([action, quotationSelected]) => {
        return this.processEstablishStrategy
          .TiposPartidaPorCotizacionProcess(quotationSelected.IdCotCotizacion)
          .pipe(
            map((response: {[key: string]: TupleDecimalDecimalInt32}) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la información de las barras de porcentaje (originales, complementarias, promoción, alternativas, ahorro).',
                ),
                response,
              );

              return dailyMeetingDetailsActions.FETCH_BAR_PERCENTAGES_SUCCESS({
                itemsBarPercentage: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la información de las barras de porcentaje (originales, complementarias, promoción, alternativas, ahorro).',
                ),
                error,
              );
              this.store.dispatch(dailyMeetingDetailsActions.FETCH_BAR_PERCENTAGES_FAILED());
              return EMPTY;
            }),
          );
      }),
    ),
  );

  //DOCS: OBTENER LAS ESTRATEGIAS, TÁCTICAS Y SUBTACTICAS

  fetchStrategies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_DASHBOARD_DETAILS_SUCCESS,
        dailyMeetingDetailsDashboardActions.SET_SELECTED_CLIENT_DASHBOARD,
      ),
      withLatestFrom(
        this.store.select(dailyMeetingDetailsSelectors.selectIdClient),
        this.store.select(dailyMeetingDetailsSelectors.selectIdEviUser),
        this.store.select(dailyMeetingDetailsSelectors.selectQuotationStrategy),
        this.store.select(dailyMeetingDetailsSelectors.selectClient),
      ),
      mergeMap(([action, idClient, idEviUser, quotationStrategyData, clientSelected]) => {
        const quotationStrategy: IQuotationStrategyResponse = {
          ...initialQuotationStrategyBody(),
          idClient: clientSelected?.IdCliente || DEFAULT_UUID,
          idUser: idEviUser,
          idAjOfQuotationStrategy: clientSelected?.IdAjOfEstrategiaCotizacion || DEFAULT_UUID,
        };
        if (quotationStrategy.catStrategies.needsToReloadCatStrategies) {
          const body = new FiltersOnlyActive();
          body.SortDirection = 'asc';
          body.SortField = 'Estrategia';
          return this.catalogosService.catEstrategiaCotizacionQueryResult(body).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las estrategias del catalogo.',
                ),
                response,
              );
              return {
                ...quotationStrategy,
                catStrategies: {
                  ...quotationStrategy.catStrategies,
                  listQuotationStrategy: response.Results,
                },
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las estrategias del catalogo.',
                ),
                error,
              );
              return of(dailyMeetingDetailsActions.FETCH_QUOTATION_STRATEGY_FAILED());
            }),
          );
        }
        return of({...quotationStrategy});
      }),
      switchMap((quotationStrategy: IQuotationStrategyResponse) => {
        if (quotationStrategy.catStrategies.needsToReloadCatStrategies) {
          const body = new FiltersOnlyActive();
          body.SortDirection = 'asc';
          body.SortField = 'Orden';
          return this.catalogosService.catEstrategiaCotizacionTacticaQueryResult(body).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las tacticas del catalogo.',
                ),
                response,
              );
              return {
                ...quotationStrategy,
                catStrategies: {
                  ...quotationStrategy.catStrategies,
                  listQuotationStrategyTactic: response.Results,
                },
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las tacticas catalogos',
                ),
                error,
              );
              return of(dailyMeetingDetailsActions.FETCH_QUOTATION_STRATEGY_FAILED());
            }),
          );
        }
        return of({...quotationStrategy});
      }),
      switchMap((quotationStrategy: IQuotationStrategyResponse) => {
        if (quotationStrategy.catStrategies.needsToReloadCatStrategies) {
          const body = new FiltersOnlyActive();
          body.SortDirection = 'asc';
          body.SortField = 'Subtactica';
          return this.catalogosService.catEstrategiaCotizacionSubtacticaQueryResult(body).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las subtacticas del catalogo.',
                ),
                response,
              );
              this.store.dispatch(
                dailyMeetingDetailsActions.SET_CAT_STRATEGIES({
                  catStrategies: {
                    ...quotationStrategy.catStrategies,
                    listQuotationStrategySubTactic: response.Results,
                    needsToReloadCatStrategies:
                      quotationStrategy.catStrategies.listQuotationStrategy.length === 0 ||
                      quotationStrategy.catStrategies.listQuotationStrategyTactic.length === 0 ||
                      response.Results.length === 0,
                  },
                }),
              );
              return {
                ...quotationStrategy,
                catStrategies: {
                  ...quotationStrategy.catStrategies,
                  listQuotationStrategySubTactic: response.Results,
                },
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las subtacticas del catalogo.',
                ),
                error,
              );
              return of(dailyMeetingDetailsActions.FETCH_QUOTATION_STRATEGY_FAILED());
            }),
          );
        }
        return of({...quotationStrategy});
      }),
      switchMap((quotationStrategy: IQuotationStrategyResponse) => {
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdAjOfEstrategiaCotizacion',
          ValorFiltro: quotationStrategy.idAjOfQuotationStrategy,
        });
        return this.procesosAjustarOfertaService.ajOfEstrategiaCotizacionQueryResult(body).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las estrategia guardada en Establecer Estrategia.',
              ),
              response,
            );

            let currentQuotationStrategy =
              response.Results.length > 0
                ? find(
                    quotationStrategy.catStrategies.listQuotationStrategy,
                    (o) =>
                      o.IdCatEstrategiaCotizacion === response.Results[0].IdCatEstrategiaCotizacion,
                  )
                : quotationStrategy.itemSelected;
            if (isEmpty(currentQuotationStrategy)) {
              currentQuotationStrategy = find(
                quotationStrategy.catStrategies.listQuotationStrategy,
                (o) => o.Estrategia === QUOTATION_STRATEGY_OFFENSIVE,
              );
            }
            if (isEmpty(currentQuotationStrategy)) {
              currentQuotationStrategy = find(
                quotationStrategy.catStrategies.listQuotationStrategy,
                (o) => o.Estrategia === QUOTATION_STRATEGY_BALANCED,
              );
            }
            if (isEmpty(currentQuotationStrategy)) {
              currentQuotationStrategy = find(
                quotationStrategy.catStrategies.listQuotationStrategy,
                (o) => o.Estrategia === QUOTATION_STRATEGY_DEFENSIVE,
              );
            }
            return {
              ...quotationStrategy,
              idAjOfQuotationStrategy:
                response.Results.length > 0
                  ? response.Results[0].IdAjOfEstrategiaCotizacion
                  : DEFAULT_UUID,
              ajOfQuotationStrategy:
                response.Results.length > 0
                  ? {...response.Results[0], isChanged: false}
                  : {
                      ...quotationStrategy.ajOfQuotationStrategy,
                      IdCatEstrategiaCotizacion: currentQuotationStrategy.IdCatEstrategiaCotizacion,
                      IdCliente: quotationStrategy.idClient,
                      IdUsuarioAprobacion: quotationStrategy.idUser,
                      IdUsuarioCreacion: quotationStrategy.idUser,
                    },
              itemSelected: {
                value: currentQuotationStrategy.IdCatEstrategiaCotizacion,
                label: currentQuotationStrategy.Estrategia,
              },
            };
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener las estrategia guardada en Establecer Estrategia.',
              ),
              error,
            );
            return of(dailyMeetingDetailsActions.FETCH_QUOTATION_STRATEGY_FAILED());
          }),
        );
      }),
      switchMap((quotationStrategy: IQuotationStrategyResponse) => {
        const body = new FiltersOnlyActive(false);
        body.Filters.length = 0;
        body.Filters.push({
          NombreFiltro: 'IdAjOfEstrategiaCotizacion',
          ValorFiltro: quotationStrategy.idAjOfQuotationStrategy,
        });
        return this.procesosAjustarOfertaService
          .ajOfEstrategiaCotizacionTacticaQueryResult(body)
          .pipe(
            map((response: QueryResultAjOfEstrategiaCotizacionTactica) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las tácticas guardadas en Establecer Estrategia.',
                ),
                response,
              );

              const result: Array<IQuotationStrategyTactic> = buildStrategyForPublic(
                quotationStrategy,
                response.Results,
              );

              return dailyMeetingDetailsActions.FETCH_QUOTATION_STRATEGY_SUCCESS({
                ...quotationStrategy,
                listQuotationStrategyTacticOptions: result,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las tácticas guardadas en Establecer Estrategia.',
                ),
                error,
              );
              return of(dailyMeetingDetailsActions.FETCH_QUOTATION_STRATEGY_FAILED());
            }),
          );
      }),
    ),
  );

  //DOCS: TRANSACCION PARA PUBLICAR UNA ESTRATEGIA
  publicStrategy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dailyMeetingDetailsActions.SAVE_STRATEGY),
      withLatestFrom(
        this.store.select(dailyMeetingDetailsSelectors.selectQuotationStrategy),
        this.store.select(dailyMeetingDetailsSelectors.selectQuotesByClient),
        this.store.select(selectIdUser), //DOCS: USUARIO LOGEADO
      ),
      mergeMap(([action, strategyStructure, quotesByClient, idUser]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const strategy: GMEstrategia = buildRequestForStrategyPublic(
          strategyStructure,
          quotesByClient,
          idUser,
        );
        return this.procesosCotizacionService.cotCotizacionPublicarEstrategia(strategy).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al publicar una estrategia.',
              ),
              response,
            );
            this.store.dispatch(
              SET_LOADING_SUCCESS({
                active: true,
                message:
                  'Has publicado una estrategia ' +
                  strategyStructure.itemSelected.label.toLowerCase(),
              }),
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return dailyMeetingDetailsActions.SAVE_STRATEGY_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al publicar una estrategia.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(dailyMeetingDetailsActions.SAVE_STRATEGY_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS Descarga el pdf de la cotización
  downloadQuotationFile = createEffect(() =>
    this.actions$.pipe(
      ofType(dailyMeetingDetailsActions.SET_LOAD_QUOTATION_FILE),
      withLatestFrom(this.store.select(dailyMeetingDetailsSelectors.currentQuotation)),
      mergeMap(([action, selectedQuotation]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.sistemaArchivoService
          .ArchivoExtensionsObtenerDetalle(selectedQuotation.IdArchivoPDF)
          .pipe(
            map((response: ArchivoDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el archivo de la cotizacion.',
                ),
                response,
              );
              return DOWLOAD_FILE_LOAD({
                IdArchivo: response.IdArchivo,
                FileKey: response.FileKey,
                newTab: false,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el archivo de la cotizacion.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(dailyMeetingDetailsActions.SET_ERROR_QUOTATION_FILE());
            }),
          );
      }),
    ),
  );
}
