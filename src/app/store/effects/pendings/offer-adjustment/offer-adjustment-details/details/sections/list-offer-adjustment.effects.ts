/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {EMPTY, forkJoin, Observable, of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {
  ICatProvidersFreight,
  IConfigExpressFreight,
  IProvider,
  offerAdjustCarrousel,
  quotationOfferAdjustmentConfig,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
/* Services Imports */
import * as apiLogistic from 'api-logistica';
import {
  AjOfEstrategiaCotizacionTactica,
  AjusteFleteExpressPartidaObj,
  AjustePrecioPartidaObj,
  GMAutorizarAjusteOferta,
  ParametroAutorizacion,
  VCotizacionesCarruselAjusteOferta,
} from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import {CatEstrategiaCotizacionSubtactica, CatEstrategiaCotizacionTactica} from 'api-catalogos';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {find, findIndex, isEmpty, map as _map, orderBy} from 'lodash-es';

/* Actions Imports */
import {
  offerAdjustmentDetailsActions,
  offerAdjustmentDetailsListOfferActions,
  offerAdjustmentDetailsListOfferActionsDeliveryTime,
} from '@appActions/pendings/offer-adjustment';

/* Tools Imports */
import {
  API_REQUEST_STATUS_LOADING,
  ENUM_SECURE_POP,
  QUOTATION_STRATEGY_SUB_TACTIC_1_1,
  QUOTATION_STRATEGY_SUB_TACTIC_1_2,
  QUOTATION_STRATEGY_TACTIC_2,
} from '@appUtil/common.protocols';
import {RETURN_EMPTY, SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';

/* Selectors Imports */
import {
  adjustmentDetailsDetailsListOfferAdjustmentSelectors,
  adjustmentDetailsDetailsSelectors,
} from '@appSelectors/pendings/offer-adjustment';
import {
  buildAjOfRechazo,
  buildAjustesOfertaArray,
  someoneNeedsAuthorization,
} from '@appHelpers/pending/offer-adjustment/offer-adjustment.helpers';

const FILE_NAME = 'list-offer-adjustment.effects.ts';

@Injectable()
export class ListOfferAdjustmentEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private procesosAjustarOfertaService: apiLogistic.ProcesosL02AjustarOfertaService,
    private catalogsService: apiCatalogs.CatalogosService,
    private configuracionProductosMarcasServices: apiCatalogs.ConfiguracionProductosMarcasService,
    private procesosL02AjustarOfertaAutorizarAjusteOfertaService: apiLogistic.ProcesosL02AjustarOfertaAutorizarAjusteOfertaService,
    private procesosAutorizacionesService: apiLogistic.ProcesosAutorizacionesService,
  ) {}

  //DOCS: OBTIENE LA LISTA DE COTIZACIONES DEL CLIENTE SELECCIONADO
  fetchQuotations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        offerAdjustmentDetailsListOfferActions.SEND_ADJUSTMENT_OFFER_SUCCESS,
        offerAdjustmentDetailsActions.SET_CLIENT_SELECTED,
        offerAdjustmentDetailsListOfferActions.REJECT_ADJUSTMENT_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(
          adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectQueryInfoQuotation,
        ),
        this.store.select(adjustmentDetailsDetailsSelectors.selectClientSelected),
      ),
      mergeMap(([action, queryInfo, client]) => {
        return this.procesosAjustarOfertaService
          .vCotizacionesCarruselAjusteOfertaQueryResult(queryInfo)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener cotizaciones del carrousel',
                ),
                response,
              );
              if (response.TotalResults > 0) {
                const items: Array<offerAdjustCarrousel> = _map(
                  response.Results,
                  (o: VCotizacionesCarruselAjusteOferta, i): offerAdjustCarrousel => {
                    return {
                      ...o,
                      index: i + 1,
                      selected: i === 0,
                      configApiStatus: API_REQUEST_STATUS_LOADING,
                      deliveryTimeControls: {
                        twoDays: false,
                        expressFreight: false,
                      },
                      authorizationObj: null,
                    };
                  },
                );
                return offerAdjustmentDetailsActions.SET_CLIENT_QUOTES({
                  clientQuotations: items,
                });
              } else {
                return offerAdjustmentDetailsActions.FETCH_CLIENTS_LOAD();
              }
            }),
          );
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al obtener configuracion de fletes express',
          ),
          error,
        );
        this.store.dispatch(SET_LOADING({payload: false}));
        return EMPTY;
      }),
    ),
  );

  // DOCS: BUSCA SI LA COTIZACIÓN CUENTA CON UN CÓDIGO DE AUTORIZACIÓN VIGENTE
  authorizationCodeFinder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        offerAdjustmentDetailsActions.SET_CLIENT_QUOTES,
        offerAdjustmentDetailsActions.SET_SELECTED_QUOTATION,
      ),
      withLatestFrom(
        this.store.select(adjustmentDetailsDetailsSelectors.authorizationFinderQueryInfo),
        this.store.select(adjustmentDetailsDetailsSelectors.selectedCarrouselCard),
      ),
      mergeMap(([action, queryInfo, quotation]) => {
        return this.procesosAutorizacionesService
          .AutorizacionListadoAutorizacionCodigoValidos(queryInfo)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener códigos de autorización vigentes',
                ),
                response,
              );
              if (response.TotalResults > 0) {
                if (quotation.offerConfig) {
                  this.store.dispatch(
                    offerAdjustmentDetailsListOfferActions.HANDLE_POP_UP_CODE({popUpCode: true}),
                  );
                }
                this.store.dispatch(
                  offerAdjustmentDetailsActions.SEND_CODE_VERIFICATION_SUCCESS({
                    response: response.Results[0],
                  }),
                );
              } else {
                this.store.dispatch(
                  offerAdjustmentDetailsListOfferActions.HANDLE_POP_UP_CODE({
                    popUpCode: false,
                  }),
                );
              }
              return offerAdjustmentDetailsActions.SET_QUOTATION_CONFIG_LOAD();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener códigos de autorización vigentes',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS: OBTIENE LOS AJUSTES (-2 DIAS, FLETE, CONDICIONES DE PAGO Y PRECIO)
  fetchQuotationConfig$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(offerAdjustmentDetailsActions.SET_QUOTATION_CONFIG_LOAD),
        withLatestFrom(this.store.select(adjustmentDetailsDetailsSelectors.selectedCarrouselCard)),
        // DOCS: OBTIENE AJUSTES DE MENOS DOS DÍAS
        mergeMap(([action, card]) => {
          if (card.offerConfig) {
            return EMPTY;
          }
          const body = new FiltersOnlyActive();
          body.Filters.push({
            NombreFiltro: 'IdCotCotizacion',
            ValorFiltro: card.IdCotCotizacion,
          });
          return this.procesosAjustarOfertaService
            .AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteMenosDosDias(body)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener configuracion de menos 2 días',
                  ),
                  response,
                );
                return {
                  IdCotCotizacion: card.IdCotCotizacion,
                  twoDaysConfig: response,
                };
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener configuracion de menos 2 días',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        }),
        // DOCS: OBTIENE AJSUSTES DE FLETE EXPRESS
        switchMap((quotationConfig: quotationOfferAdjustmentConfig) => {
          return this.procesosAjustarOfertaService
            .AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteFleteExpress(
              quotationConfig.IdCotCotizacion,
            )
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener configuracion de flete express',
                  ),
                  response,
                );
                const freight: Array<IConfigExpressFreight> = _map(
                  response,
                  (o: AjusteFleteExpressPartidaObj): IConfigExpressFreight => {
                    return {
                      ...o,
                      showItems: false,
                      showComments: false,
                      originalPercentage: o?.ajOfFleteExpressCotizacion?.PorcentajeProquifa || null,
                    };
                  },
                );
                return {
                  ...quotationConfig,
                  expressFreight: freight,
                };
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener configuracion de fletes express',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        }),
        // DOCS: OBTIENE AJUSTES DE CONDICIONES DE PAGO
        switchMap((quotationConfig: quotationOfferAdjustmentConfig) => {
          return this.procesosAjustarOfertaService
            .AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteCondicionesDePago(
              quotationConfig.IdCotCotizacion,
            )
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener configuracion de condiciones de pago',
                  ),
                  response,
                );
                return {
                  ...quotationConfig,
                  paymentConditions: !isEmpty(response)
                    ? {
                        ...response,
                        Aceptado: true,
                        IdCatCondicionesDePagoOriginal: response.IdCatCondicionesDePago,
                        DiasAdicionalesOriginal: response.DiasAdicionales,
                      }
                    : null,
                };
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener configuracion de fletes express',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        }),
        // DOCS: OBTIENE AJUSTES DE PRECIO
        withLatestFrom(this.store.select(adjustmentDetailsDetailsSelectors.selectAuthorization)),
        switchMap(([quotationConfig, authorization]) => {
          const body = new FiltersOnlyActive();
          body.Filters.push({
            NombreFiltro: 'IdCotCotizacion',
            ValorFiltro: quotationConfig.IdCotCotizacion,
          });
          return this.procesosAjustarOfertaService
            .AjustarOfertaMostrarAjustesSolicitadosObtenerAjustePrecio(body)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener configuracion ajuste de precio',
                  ),
                  response,
                );
                quotationConfig = {
                  ...quotationConfig,
                  priceConfig: _map(response, (o: AjustePrecioPartidaObj) => {
                    return {
                      ...o,
                      PrecioUnitarioPactadoOriginal: o.ajOfPrecioCotizacion.PrecioUnitarioPactado,
                    };
                  }),
                };
                this.store.dispatch(
                  offerAdjustmentDetailsActions.SET_QUOTATION_CONFIG_SUCCESS({quotationConfig}),
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                if (authorization) {
                  this.store.dispatch(
                    offerAdjustmentDetailsListOfferActions.HANDLE_POP_UP_CODE({
                      popUpCode: true,
                    }),
                  );
                }
                return EMPTY;
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener configuracion ajuste de precio',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        }),
      ),
    {dispatch: false},
  );

  fetchDataProgressBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        // offerAdjustmentDetailsListOfferActions.FETCH_PROGRESS_BAR_TOTAL_IN_CLOSING,
        offerAdjustmentDetailsActions.SET_CLIENT_SELECTED,
      ),
      withLatestFrom(
        this.store.select(
          adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectQueryDataProgressBarTotalInClosing,
        ),
      ),
      mergeMap(([action, filters]) => {
        return this.procesosAjustarOfertaService
          .vcotPartidaTipoCerrarOfertaVcotPartidaTipoCerrarOfertaBarra(filters)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los datos de total en cierre.',
                ),
                response,
              );
              return offerAdjustmentDetailsListOfferActions.FETCH_PROGRESS_BAR_TOTAL_IN_CLOSING_SUCCESS(
                {
                  dataProgressBar: response,
                },
              );
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los datos de total en cierre.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(
                offerAdjustmentDetailsListOfferActions.FETCH_PROGRESS_BAR_TOTAL_IN_CLOSING_FAILED(),
              );
            }),
          );
      }),
    ),
  );

  getCatProvidersFreights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerAdjustmentDetailsListOfferActions.GET_CAT_PROVIDERS_FREIGHT_LOAD),
      withLatestFrom(
        this.store.select(
          adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectCatProvidersFreight,
        ),
      ),
      mergeMap(([action, catProvidersFreight]) => {
        const index = findIndex(catProvidersFreight, (o) => o.idBrand === action.idBrand);
        if (index === -1) {
          const body = new FiltersOnlyActive();
          body.Filters.push({
            NombreFiltro: 'IdMarca',
            ValorFiltro: action.idBrand,
          });
          return this.configuracionProductosMarcasServices
            .ProveedorMarcaDetalleObtener(action.idBrand)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener el catalogo de Proveedores Marca.',
                  ),
                  response,
                );

                return {
                  idBrand: response.IdMarca,
                  list: response.Proveedores,
                };
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener el catalogo de Proveedores Marca.',
                  ),
                  error,
                );
                this.store.dispatch(
                  offerAdjustmentDetailsListOfferActions.GET_CAT_PROVIDERS_FREIGHT_FAILED(),
                );
                return EMPTY;
              }),
            );
        }
        return EMPTY;
      }),
      switchMap((catProvidersFreight: ICatProvidersFreight) => {
        if (catProvidersFreight.list.length > 0) {
          const request: Observable<IProvider>[] = _map(
            catProvidersFreight.list,
            (provider: apiCatalogs.Proveedor) =>
              this.catalogsService
                .catMonedaObtener(provider.IdCatMonedaVentas)
                .pipe(
                  map((response: apiCatalogs.CatMoneda) => {
                    return {
                      ...provider,
                      ClaveMoneda: response.ClaveMoneda,
                    };
                  }),
                )
                .pipe(catchError(() => of({...provider, ClaveMoneda: null}))),
          );
          return forkJoin(request).pipe(
            map((response: IProvider[]) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las marcas con contrato.',
                ),
                response,
              );
              return offerAdjustmentDetailsListOfferActions.GET_CAT_PROVIDERS_FREIGHT_SUCCESS({
                catProvidersFreight: {
                  ...catProvidersFreight,
                  list: orderBy(response, 'Nombre'),
                },
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las marcas con contrato.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(offerAdjustmentDetailsListOfferActions.GET_CAT_PROVIDERS_FREIGHT_FAILED());
            }),
          );
        }
        return of(
          offerAdjustmentDetailsListOfferActions.GET_CAT_PROVIDERS_FREIGHT_SUCCESS({
            catProvidersFreight,
          }),
        );
      }),
    ),
  );

  // DOCS: EFECTO PARA ENVIAR RESPUESTA DE AJUSTE
  sendAdjustmentResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        offerAdjustmentDetailsListOfferActions.REJECT_ADJUSTMENT_LOAD,
        offerAdjustmentDetailsListOfferActions.SEND_ADJUSTMENT_OFFER_LOAD,
      ),
      withLatestFrom(
        this.store.select(adjustmentDetailsDetailsSelectors.selectOfferConfigObj),
        this.store.select(adjustmentDetailsDetailsSelectors.selectedCarrouselCard),
      ),
      mergeMap(([action, offerConfigObj, quotation]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const props: any = {
          ...action,
        };
        const needsAuthorization = someoneNeedsAuthorization(offerConfigObj);
        const params: GMAutorizarAjusteOferta = {
          IdCotCotizacion: quotation.IdCotCotizacion,
          ajOfRechazo: props?.IdAjOfRazonRechazo
            ? buildAjOfRechazo(props?.IdAjOfRazonRechazo, quotation.IdCotCotizacion)
            : null,
          AjustesOferta: buildAjustesOfertaArray(offerConfigObj),
        };
        return this.procesosL02AjustarOfertaAutorizarAjusteOfertaService
          .AutorizarAjusteOfertaProcessTransaccion(params)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  params.ajOfRechazo ? 'Al rechazar el ajuste' : 'Enviar ajustes',
                ),
                response,
              );
              if (params.ajOfRechazo) {
                this.store.dispatch(
                  offerAdjustmentDetailsListOfferActions.HANDLE_POP_UP_REJECT({
                    popUpReject: false,
                  }),
                );
              }
              this.store.dispatch(SET_LOADING({payload: false}));
              if (needsAuthorization) {
                this.store.dispatch(offerAdjustmentDetailsActions.REQUEST_VERIFICATION_CODE_LOAD());
              }
              if (!needsAuthorization) {
                this.store.dispatch(
                  offerAdjustmentDetailsListOfferActions.SET_OPTION_BAR_ACTIVITY({
                    barActivitySelected: 0,
                  }),
                );
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: params.ajOfRechazo
                      ? 'Has rechazado el ajuste'
                      : 'Haz enviado el ajuste',
                    successText: 'Exitosamente!',
                  }),
                );
                return offerAdjustmentDetailsListOfferActions.SEND_ADJUSTMENT_OFFER_SUCCESS();
              }
              return RETURN_EMPTY();
            }),
          );
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al rechazar el ajuste o enviar ajuste',
          ),
          error,
        );
        this.store.dispatch(SET_LOADING({payload: false}));
        return EMPTY;
      }),
    ),
  );

  // DOCS: SOLICITAR CÓDIGO DE AUTORIZACIÓN
  requestCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerAdjustmentDetailsActions.REQUEST_VERIFICATION_CODE_LOAD),
      withLatestFrom(
        this.store.select(adjustmentDetailsDetailsSelectors.selectCatAuthorizationType),
        this.store.select(adjustmentDetailsDetailsSelectors.selectedCarrouselCard),
        this.store.select(adjustmentDetailsDetailsSelectors.selectClientSelected),
      ),
      mergeMap(([action, authorizationType, quotation, client]) => {
        const params: ParametroAutorizacion = {
          IdCatTipoAutorizacion: authorizationType.IdCatTipoAutorizacion,
          IdOperacion: quotation.IdCotCotizacion,
          IdAutorizacion: null,
          IdUsuarioAutoriza: null,
          CodigoAutorizacion: '',
          Descripcion: `para ajustar oferta de la Cotización #${quotation.Folio} del cliente ${client.Nombre}`,
        };
        return this.procesosAutorizacionesService.AutorizacionGuardarOActualizar(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al enviar solicitud de autorización',
              ),
              response,
            );
            this.store.dispatch(
              offerAdjustmentDetailsActions.REQUEST_VERIFICATION_CODE_SUCCESS({
                AutorizacionDetalle: response,
              }),
            );
            return offerAdjustmentDetailsListOfferActions.HANDLE_POP_UP_CODE({popUpCode: true});
          }),
        );
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al enviar solicitud de autorización',
          ),
          error,
        );
        return EMPTY;
      }),
    ),
  );

  // DOCS: CANCELAR CÓDIGO DE AUTORIZACIÓN
  cancelAuthorization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerAdjustmentDetailsActions.CANCEL_AUTHORIZATION_CODE_LOAD),
      withLatestFrom(this.store.select(adjustmentDetailsDetailsSelectors.cancelCodeQueryInfo)),
      mergeMap(([action, cancelQueryInfo]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.procesosAutorizacionesService.AutorizacionCancelar(cancelQueryInfo).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al cancelar solicitud de autorización',
              ),
              response,
            );
            this.store.dispatch(
              offerAdjustmentDetailsListOfferActions.HANDLE_POP_UP_CODE({
                popUpCode: false,
              }),
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return offerAdjustmentDetailsActions.CANCEL_AUTHORIZATION_CODE_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al cancelar solicitud de autorización',
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

  // DOCS: ENVIAR CÓDIGO PARA VALIDACIÓN
  sendCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerAdjustmentDetailsActions.VERIFICATION_CODE_REVIEW_LOAD),
      withLatestFrom(this.store.select(adjustmentDetailsDetailsSelectors.sendCodeQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        if (action.code) {
          return this.procesosAutorizacionesService.AutorizacionAutorizarSolicitud(queryInfo).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al enviar código de autorización',
                ),
                response,
              );
              if (response.Message === 'Success') {
                this.store.dispatch(
                  offerAdjustmentDetailsActions.VERIFICATION_CORE_REVIEW_SUCCESS({
                    valid: true,
                    status: ENUM_SECURE_POP.success,
                  }),
                );
                return offerAdjustmentDetailsListOfferActions.SEND_ADJUSTMENT_OFFER_LOAD();
              }
              return offerAdjustmentDetailsActions.VERIFICATION_CORE_REVIEW_SUCCESS({
                valid: false,
                status: ENUM_SECURE_POP.error,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al enviar código de autorización',
                ),
                error,
              );
              return EMPTY;
            }),
          );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );
  setMode(
    listTacticsAndSubtactics: Array<AjOfEstrategiaCotizacionTactica>,
    tactics: Array<CatEstrategiaCotizacionTactica>,
    subtactics: Array<CatEstrategiaCotizacionSubtactica>,
  ) {
    const timeOfDelivery = find(
      tactics,
      (tactic) => tactic.Tactica === QUOTATION_STRATEGY_TACTIC_2,
    );
    const searchTactic = find(
      listTacticsAndSubtactics,
      (tacticOrSub) =>
        tacticOrSub.IdCatEstrategiaCotizacionTactica ===
          timeOfDelivery.IdCatEstrategiaCotizacionTactica && tacticOrSub.Activo === true,
    );
    const searchSubTactic = find(
      subtactics,
      (subtactic) =>
        subtactic?.IdCatEstrategiaCotizacionSubtactica ===
          searchTactic?.IdCatEstrategiaCotizacionSubtactica &&
        subtactic?.IdCatEstrategiaCotizacionTactica ===
          searchTactic?.IdCatEstrategiaCotizacionTactica,
    );

    if (searchSubTactic) {
      if (searchSubTactic.Subtactica === QUOTATION_STRATEGY_SUB_TACTIC_1_1) {
        this.store.dispatch(
          offerAdjustmentDetailsListOfferActionsDeliveryTime.SET_TWO_DAYS_MODE({
            value: true,
          }),
        );
      } else if (searchSubTactic.Subtactica === QUOTATION_STRATEGY_SUB_TACTIC_1_2) {
        this.store.dispatch(
          offerAdjustmentDetailsListOfferActionsDeliveryTime.SET_FREIGTH_EXPRESS_MODE({
            value: true,
          }),
        );
      }
    } else {
      this.store.dispatch(offerAdjustmentDetailsListOfferActionsDeliveryTime.WITHOUT_SUBTACTIC());
    }
  }
}
