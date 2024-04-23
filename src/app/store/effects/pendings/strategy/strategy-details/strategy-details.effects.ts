/* Core Imports */
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {EMPTY, forkJoin, of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {find, map as _map} from 'lodash-es';

/* Services Imports */
import * as apiLogistic from 'api-logistica';
import {
  GMCotFletes,
  GMEstrategia,
  QueryResultPartidaCotizacionTasaConversionObj,
  TupleDecimalDecimalInt32,
} from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import {ArchivoDetalle, CatRutaEntrega, QueryResultContactoDetalleObj} from 'api-catalogos';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {
  initialQuotationStrategyResponse,
  IQuotationStrategyResponse,
  IQuotationStrategyTactic,
  QuotationClientInfo,
} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';

/* Actions Imports */
import {strategyDetailsActions} from '@appActions/pendings/strategy';
import {DOWLOAD_FILE_LOAD, SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';

/* Selectors Imports */
import {strategyDetailsSelectors} from '@appSelectors/pendings';
import {selectTipoTelefono} from '@appSelectors/catalogs/catalogs.selectors';
import {selectIdUser} from '@appSelectors/auth/auth.selectors';

/* Tools Imports */
import {DEFAULT_UUID, QUOTATION_STRATEGY_DEFENSIVE} from '@appUtil/common.protocols';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {appRoutes} from '@appHelpers/core/app-routes';
import {
  selectContactDetailsQueryInfo,
  selectedQuotation,
} from '@appSelectors/pendings/strategy/strategy-details/strategy-details.selectors';
import {offerActions} from '@appActions/pendings/strategy/strategy-details/details';
import {offerSelectors} from '@appSelectors/pendings/strategy/strategy-details/details';
import {
  buildClientAddImage,
  buildItemsQuotationFromResponse,
  buildQuotationsListFromResponseStrategy,
  buildRequestForStrategySave,
  buildStrategyStructureFromResponse,
  patchContactClientStrategy,
} from '@appHelpers/pending/strategy/strategy.helpers';

const FILE_NAME = 'strategy-details.effects.ts';

@Injectable()
export class StrategyDetailsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private router: Router,
    private brandServices: apiLogistic.ProcesosL01CotizacionCerrarOfertaService,
    private catalogsService: apiCatalogs.CatalogosService,
    private configurationAddressService: apiCatalogs.ConfiguracionDireccionesService,
    private configurationClientsConfigurationService: apiCatalogs.ConfiguracionClientesConfiguracionService,
    private configurationClientsService: apiCatalogs.ConfiguracionClientesService,
    private configurationProductsBrandsServices: apiCatalogs.ConfiguracionProductosMarcasService,
    private contactsSettingsService: apiCatalogs.ConfiguracionContactosService,
    private processQuotationCloseConversionRateService: apiLogistic.ProcesosL01CotizacionCierreTasasConversionService,
    private processQuotationService: apiLogistic.ProcesosL01CotizacionService,
    private processSaveUpdateStrategyCloseService: apiLogistic.ProcesosL01CotizacionService,
    private userSystemService: apiCatalogs.SistemaUsuariosService,
    private processAdjustmentOfferEstablishStrategy: apiLogistic.ProcesosL02AjustarOfertaEstablecerEstrategiaService,
    private processQuoteEstablishStrategy: apiLogistic.ProcesosL01CotizacionAtenderCierreService,
    private sistemaArchivoService: apiCatalogs.SistemaArchivosService,
  ) {}

  //DOCS: OBTENER LAS COTIZACIONES ASOCIADAS AL CLIENTE SELECCIONADO
  getAllQuotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(strategyDetailsActions.SET_SELECTED_CLIENT_STRATEGY),
      withLatestFrom(this.store.select(strategyDetailsSelectors.selectQuotationsQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.processQuotationService.vCotCotizacionQueryResult(queryInfo).pipe(
          map((response: apiLogistic.QueryResultVCotCotizacion) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las cotizaciones asociadas por cliente.',
              ),
              response,
            );
            const quotationsList = buildQuotationsListFromResponseStrategy(response.Results);
            return strategyDetailsActions.FETCH_QUOTES_SUCCESS({
              quotationsList,
              selectedQuotation: quotationsList[0],
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
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(strategyDetailsActions.FETCH_QUOTES_FAILED());
          }),
        );
      }),
    ),
  );

  //DOCS: OBTENER LAS PARTIDAS PAGINADAS DE LA COTIZACIÓN SELECCIONADA
  fetchItemsSelectedQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        strategyDetailsActions.FETCH_QUOTES_SUCCESS,
        strategyDetailsActions.SET_QUOTATION_SELECTED,
        strategyDetailsActions.FETCH_ITEMS_QUOTATION, //DOCS: Se ejecuta al llegar al ultimo alemento visible del virtual scroller
        strategyDetailsActions.SET_SELECTED_BRAND,
        offerActions.SET_SEARCH_TERM,
        offerActions.SET_FILTER_BY_BRAND,
      ),
      withLatestFrom(
        this.store.select(offerSelectors.selectedQuotationItemsQueryInfo),
        this.store.select(strategyDetailsSelectors.selectItemsQuotationSelected),
      ),
      mergeMap(([action, queryInfo, itemsSelectedQuotation]) => {
        this.store.dispatch(strategyDetailsActions.FETCH_ITEMS_QUOTATION_LOAD());
        return this.processQuotationCloseConversionRateService
          .PartidaCotizacionTasaConversionObjQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultPartidaCotizacionTasaConversionObj) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las partidas de la cotización seleccionada',
                ),
                response,
              );
              const itemsResponse = buildItemsQuotationFromResponse(response);
              if (queryInfo?.desiredPage === 1) {
                this.store.dispatch(strategyDetailsActions.FETCH_FREIGHT());
              }
              return strategyDetailsActions.FETCH_ITEMS_QUOTATION_SUCCESS({
                response: itemsResponse,
                currentPage: queryInfo.desiredPage,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las partidas de la cotización seleccionada',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(strategyDetailsActions.FETCH_ITEMS_QUOTATION_FAILED());
            }),
          );
      }),
    ),
  );

  //DOCS: OBTENER LOS FLETES DE LA COTIZACIÓN SELECCIONADA
  getFreigth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(strategyDetailsActions.FETCH_FREIGHT),
      withLatestFrom(this.store.select(strategyDetailsSelectors.selectedQuotation)),
      mergeMap(([action, quotation]) => {
        return this.processQuoteEstablishStrategy
          .GMCotFletesProcess(quotation.IdCotCotizacion)
          .pipe(
            map((response: GMCotFletes) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los fletes de la cotización seleccionada.',
                ),
                response,
              );
              return strategyDetailsActions.FETCH_FREIGHT_SUCCESS({freight: response});
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
              return of(strategyDetailsActions.FETCH_FREIGHT_FAILED());
            }),
          );
      }),
    ),
  );

  // DOCS: OBTENER LAS MARCAS QUE ESTAN EN LAS PARTIDAS DE LA COTIZACIÓN SELECCIONADA
  fetchQuoteBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        strategyDetailsActions.FETCH_QUOTES_SUCCESS,
        strategyDetailsActions.SET_QUOTATION_SELECTED,
      ),
      withLatestFrom(
        this.store.select(strategyDetailsSelectors.selectParamsListBrandsQuotationCloseOffer),
      ),
      mergeMap(([action, paramsListBrandsQuotation]) => {
        return this.brandServices
          .PartidaCotizacionCerrarOfertaDetalleObtener_1(paramsListBrandsQuotation)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las marcas que están en las partidas de la cotización seleccionada.',
                ),
                response,
              );
              return strategyDetailsActions.FETCH_SELECTED_QUOTE_BRANDS_SUCCESS({
                brandsSelectedQuotation: _map(response, (brand: apiLogistic.Marca) => {
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
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(null);
            }),
          );
      }),
    ),
  );
  // DOCS: OBTENER LAS INFORMACIÓN DE LAS BARRAS DE PORCENTAJE (ORIGINALES, COMPLEMENETARIAS, PROMOCIÓN, ALTERNATIVAS, AHORRO)
  getInformationProgressBarTypeQuotation = createEffect(() =>
    this.actions$.pipe(
      ofType(strategyDetailsActions.FETCH_SELECTED_QUOTE_BRANDS_SUCCESS),
      withLatestFrom(this.store.select(strategyDetailsSelectors.selectedQuotation)),
      mergeMap(([action, quotationSelected]) => {
        return this.processAdjustmentOfferEstablishStrategy
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

              return strategyDetailsActions.FETCH_BAR_PERCENTAGES_SUCCESS({
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
              this.store.dispatch(strategyDetailsActions.FETCH_BAR_PERCENTAGES_FAILED());
              return EMPTY;
            }),
          );
      }),
    ),
  );

  //DOCS: OBTIENE LOS CONTACTOS DEL CLIENTE AL ENTRAR A LA PANTALLA DE DETALLE

  getClientContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(strategyDetailsActions.FETCH_BAR_PERCENTAGES_SUCCESS),
      withLatestFrom(
        this.store.select(selectTipoTelefono),
        this.store.select(selectContactDetailsQueryInfo),
        this.store.select(selectedQuotation),
      ),
      mergeMap(([action, typePhones, queryInfo, selectedQuotation]) => {
        return this.contactsSettingsService.ContactoDetalleQueryResult(queryInfo).pipe(
          map((response: QueryResultContactoDetalleObj) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los contactos del cliente de la cotización seleccionada.',
              ),
              response,
            );

            const contacts = patchContactClientStrategy(
              response,
              typePhones,
              selectedQuotation.IdContactoCliente,
            );

            return strategyDetailsActions.SET_CONTACT({contacts: contacts[0]});
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener los contactos del cliente de la cotización seleccionada.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(null);
          }),
        );
      }),
    ),
  );

  //DOCS: OBTIENE LA INFORMACIÓN DEL CLIENTE DE LA COTIZACIÓN SELECCIONADA
  getClientQuotationInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(strategyDetailsActions.SET_CONTACT),
      withLatestFrom(this.store.select(strategyDetailsSelectors.selectedQuotation)),
      mergeMap(([action, selectQuotation]) => {
        const request = [
          this.configurationClientsService.vClienteObtener(selectQuotation.IdCliente),
          this.contactsSettingsService.vContactoObtener(selectQuotation.IdContacto),
          this.configurationClientsConfigurationService.vDatosFacturacionClienteObtener(
            selectQuotation.IdDatosFacturacionCliente,
          ),
          this.catalogsService.catMonedaObtener(selectQuotation.IdCatMoneda),
          this.catalogsService.catCondicionesDePagoObtener(
            selectQuotation.IdCatCondicionesDePagoDeOrigen,
          ),
          this.userSystemService.UsuarioObtener(selectQuotation.IdUsuarioTramita),
          this.configurationAddressService.DireccionObtener(selectQuotation.IdDireccion),
        ];
        return forkJoin(request).pipe(
          map(
            (response: Array<any>): QuotationClientInfo => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la información general del cliente de la cotización seleccionada.',
                ),
                response,
              );
              return {
                client: buildClientAddImage(response[0]),
                contact: response[1],
                billingData: response[2],
                currency: response[3],
                paymentConditions: response[4],
                user: response[5],
                address: response[6],
              };
            },
          ),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener la información general del cliente.',
              ),
              error,
            );
            return of(strategyDetailsActions.FETCH_QUOTATION_DETAIL_FAILED());
          }),
        );
      }),
      switchMap((queryResult: QuotationClientInfo) => {
        return this.catalogsService
          .catRutaEntregaObtener(queryResult?.address?.IdCatRutaEntrega)
          .pipe(
            map((response: CatRutaEntrega) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la ruta de entrega.',
                ),
              );
              queryResult.deliveryRoute = response;
              this.store.dispatch(SET_LOADING({payload: false}));
              return strategyDetailsActions.FETCH_CLIENT_INFO_FOR_SELECTED_QUOTATION_SUCCESS({
                queryResult,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la ruta de entrega.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(strategyDetailsActions.FETCH_QUOTATION_DETAIL_FAILED());
            }),
          );
      }),
    ),
  );

  //DOCS: OBTENER LAS ESTRATEGIAS, TACTICAS Y SUBTACTICAS
  fetchStrategies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(strategyDetailsActions.SET_SELECTED_CLIENT_STRATEGY),
      withLatestFrom(
        this.store.select(strategyDetailsSelectors.selectIdClient),
        this.store.select(selectIdUser),
        this.store.select(strategyDetailsSelectors.selectQuotationStrategy),
        this.store.select(strategyDetailsSelectors.selectIdAjStrategy),
      ),
      //DOCS: OBTENER LAS ESTRATEGIAS
      mergeMap(([action, idClient, idUser, quotationStrategyData, idAjOfQuotationStrategy]) => {
        if (quotationStrategyData.needsToReloadQuotationStrategy) {
          const quotationStrategy = {...initialQuotationStrategyResponse()};
          const body = new FiltersOnlyActive();
          body.SortDirection = 'asc';
          body.SortField = 'Estrategia';
          return this.catalogsService.catEstrategiaCotizacionQueryResult(body).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las diferentes estrategias.',
                ),
                response,
              );
              return {
                ...quotationStrategy,
                idClient,
                idAjOfQuotationStrategy,
                idUser,
                listQuotationStrategy: response.Results,
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las diferentes estrategias.',
                ),
                error,
              );
              return of(strategyDetailsActions.FETCH_QUOTATION_STRATEGY_FAILED());
            }),
          );
        } else {
          return EMPTY;
        }
      }),
      //DOCS: OBTENER LAS TACTICAS
      switchMap((quotationStrategy: IQuotationStrategyResponse) => {
        const body = new FiltersOnlyActive();
        body.SortDirection = 'asc';
        body.SortField = 'Orden';
        return this.catalogsService.catEstrategiaCotizacionTacticaQueryResult(body).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las tacticas.',
              ),
              response,
            );
            return {
              ...quotationStrategy,
              listQuotationStrategyTactic: response.Results,
            };
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener las tacticas.',
              ),
              error,
            );
            return of(strategyDetailsActions.FETCH_QUOTATION_STRATEGY_FAILED());
          }),
        );
      }),
      //DOCS: OBTENER LAS SUBTACTICAS
      switchMap((quotationStrategy: IQuotationStrategyResponse) => {
        const body = new FiltersOnlyActive();
        body.SortDirection = 'asc';
        body.SortField = 'Subtactica';
        return this.catalogsService.catEstrategiaCotizacionSubtacticaQueryResult(body).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las subtacticas.',
              ),
              response,
            );

            const currentQuotationStrategy = find(
              quotationStrategy.listQuotationStrategy,
              (o) => o.Estrategia === QUOTATION_STRATEGY_DEFENSIVE,
            );

            quotationStrategy.listQuotationStrategySubTactic = response.Results;
            const result: Array<IQuotationStrategyTactic> = buildStrategyStructureFromResponse(
              quotationStrategy,
            );

            return strategyDetailsActions.FETCH_QUOTATION_STRATEGY_SUCCESS({
              ...quotationStrategy,
              idAjOfQuotationStrategy: DEFAULT_UUID,
              listQuotationStrategyTacticOptions: result,
              ajOfQuotationStrategy: {
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
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener las subtacticas.',
              ),
              error,
            );
            return of(strategyDetailsActions.FETCH_QUOTATION_STRATEGY_FAILED());
          }),
        );
      }),
    ),
  );

  //DOCS: OBTENER LAS MARCAS CON LAS QUE TIENE CONTRATO
  fetchBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(strategyDetailsActions.SET_SELECTED_CLIENT_STRATEGY),
      withLatestFrom(this.store.select(strategyDetailsSelectors.selectBrandsWithContractQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        return this.configurationProductsBrandsServices.vMarcaQueryResult(queryInfo).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las marcas con las que tiene contrato contrato.',
              ),
              response,
            );
            return strategyDetailsActions.FETCH_BRANDS_SUCCESS({
              brands: _map(response.Results, (o, index) => ({
                ...o,
                Index: index + 1,
              })),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener las marcas con las que tiene contrato.',
              ),
              error,
            );
            return of(strategyDetailsActions.FETCH_BRANDS_FAILED());
          }),
        );
      }),
    ),
  );
  //DOCS: GUARDAR UNA ESTRATEGIA
  saveStrategy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(strategyDetailsActions.SAVE_STRATEGY),
      withLatestFrom(
        this.store.select(strategyDetailsSelectors.selectQuotationStrategy),
        this.store.select(strategyDetailsSelectors.selectQuotes),
      ),
      mergeMap(([action, quotationStrategy, listQuotes]) => {
        const requestSaveStrategy: GMEstrategia = buildRequestForStrategySave(
          quotationStrategy,
          listQuotes,
        );
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.processSaveUpdateStrategyCloseService
          .cotCotizacionGuardarEstrategia(requestSaveStrategy)
          .pipe(
            map((response: GMEstrategia) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar la estrategia.',
                ),
                response,
              );
              this.store.dispatch(
                strategyDetailsActions.SAVE_STRATEGY_SUCCESS({
                  response,
                }),
              );
              this.router.navigate([
                appRoutes.protected,
                appRoutes.pendings.pendings,
                appRoutes.strategy.strategy,
                appRoutes.strategy.list,
              ]);
              this.store.dispatch(SET_LOADING({payload: false}));
              return SET_LOADING_SUCCESS({
                active: true,
                message:
                  'Has publicado una estrategia ' +
                  quotationStrategy.itemSelected.label.toLowerCase(),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar la estrategia.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(strategyDetailsActions.SAVE_STRATEGY_FAILED());
            }),
          );
      }),
    ),
  );
  // DOCS Descarga el pdf de la cotización
  downloadQuotationFile = createEffect(() =>
    this.actions$.pipe(
      ofType(strategyDetailsActions.SET_LOAD_QUOTATION_FILE),
      withLatestFrom(this.store.select(strategyDetailsSelectors.selectedQuotation)),
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
              return of(strategyDetailsActions.SET_ERROR_QUOTATION_FILE());
            }),
          );
      }),
    ),
  );
}
