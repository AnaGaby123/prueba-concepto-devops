import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {EMPTY, forkJoin, lastValueFrom, of} from 'rxjs';
import * as apiLogistica from 'api-logistica';
import {
  CotPartidaCotizacionDetalle,
  CotProductoOferta,
  GMCotFletes,
  ProcesosL01CotizacionAtenderCierreService,
  ProcesosL01CotizacionPartidasDesglosesService,
  QueryResultVClienteCotizacionesPromesaDeCompraCarrusel,
  VCotCotizacion,
} from 'api-logistica';
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {filter, isEmpty, map as _map} from 'lodash-es';

import {Router} from '@angular/router';
// Actions
import {addItemsQuoteActions, preProcessDetailsActions} from '@appActions/pre-processing';
import {RETURN_EMPTY, SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
// Selectors
import {addItemSelectors, preProcessOrderDetailsSelectors} from '@appSelectors/pre-processing';
import {FiltersOnlyActive} from '@appModels/filters/Filters';

// models
import * as apiCatalogs from 'api-catalogos';
import {
  ConfiguracionClientesContratoService,
  ConfiguracionContratoCliente,
  SugerenciaBusqueda,
} from 'api-catalogos';
import {
  IQuoted,
  IQuoteItem,
} from '@appModels/store/pre-processing/preprocess-order-details/sections/add-purchase-order-items/add-purchase-order-items.models';
import {appRoutes} from '@appHelpers/core/app-routes';
import {buildAddItemInOrderPurchase} from '@appHelpers/pending/pre-processing/pre-processing.helpers';
import {QuoteChangeCurrency} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';
import {OF_CONTRACT} from '@appHelpers/pendings/purchase-proomise/purchase-promise-detail/purchase-promise-detail.helper';
import {generateUuid} from '@appUtil/strings';
import ConversorDivisasConvertirTipoDeCambioBancarioParams = apiCatalogs.ConfiguracionIndicadoresService.ConversorDivisasConvertirTipoDeCambioBancarioParams;
import ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContratoParams = ConfiguracionClientesContratoService.ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContratoParams;
import CotProductoOfertaGetCotProductoOfertaTemporalParams = ProcesosL01CotizacionPartidasDesglosesService.CotProductoOfertaGetCotProductoOfertaTemporalParams;

const FILE_NAME = 'add-purchase-order-items.effects.ts';
@Injectable()
export class AddPurchaseOrderItemsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private procesosCotizacionPartidaServices: apiLogistica.ProcesosL01CotizacionPartidasService,
    private sistemaUXService: apiCatalogs.SistemaUXService,
    private configuracionProductosService: apiCatalogs.ConfiguracionProductosService,
    private configuracionClienteContratoService: apiCatalogs.ConfiguracionClientesContratoService,
    private procesosL01CotizacionPartidasDesglosesService: ProcesosL01CotizacionPartidasDesglosesService,
    private processL03PromesaDeCompraService: apiLogistica.ProcesosL03PromesaDeCompraService,
    private configuracionIndicadoresServices: apiCatalogs.ConfiguracionIndicadoresService,
    private procesosL01CotizacionAtenderCierreService: ProcesosL01CotizacionAtenderCierreService,
    private router: Router,
  ) {}

  // DOCS: NAVEGA A LA VISTA PARA AGREGAR PARTIDAS
  redirectViewAddItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItemsQuoteActions.REDIRECT_ADD_NEW_QUOTES_ITEM_CLIENT),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.preProcessing.preProcess,
          appRoutes.preProcessing.orderDetails,
          appRoutes.preProcessing.details,
          appRoutes.preProcessing.preAddItem,
        ]);
        this.store.dispatch(
          preProcessDetailsActions.SET_IS_IN_ADD_ITEM({
            isInAddItem: true,
          }),
        );
        return of(addItemsQuoteActions.FETCH_QUOTES_CLIENT());
      }),
    ),
  );

  // DOCS: OBTENER LAS COTIZACIONES DEL CLIENTE
  fetchQuotesClientSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        addItemsQuoteActions.FETCH_QUOTES_CLIENT,
        addItemsQuoteActions.FETCH_QUOTES_CLIENT_OF_SEARCH, //DOCS: Se ejecuta al seleccionar un elemento de la sugerencia de búsqueda o presionar la X del buscador
      ),
      withLatestFrom(
        this.store.select(addItemSelectors.selectItemSearch),
        this.store.select(preProcessOrderDetailsSelectors.selectOrderSelected),
        this.store.select(addItemSelectors.selectQueryInfoQuotesClientSelected),
      ),
      mergeMap(([action, product, selectedOrder, queryInfo]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.processL03PromesaDeCompraService
          .vClienteCotizacionesPromesaDeCompraCarruselQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultVClienteCotizacionesPromesaDeCompraCarrusel) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la cotizaciones del cliente.',
                ),
                response,
              );

              const quotations: IQuoted[] = _map(
                response.Results,
                (item, index): IQuoted => ({
                  ...item,
                  needsToReloadItems: true,
                  items: [],
                  isSelected: index === 0,
                  freightsQuote: null,
                }),
              );

              this.store.dispatch(
                addItemsQuoteActions.FETCH_QUOTES_CLIENT_SUCCESS({
                  quoteList: quotations,
                }),
              );

              //DOCS: EL cliente cuenta con cotizaciones
              if (response?.Results?.length > 0) {
                //DOCS: No existe un producto seleccionado en la sugerencia de búsqueda
                this.store.dispatch(
                  addItemsQuoteActions.SET_QUOTED_SELECTED({
                    item: quotations[0],
                  }),
                );
                this.store.dispatch(addItemsQuoteActions.FETCH_QUOTED_ITEMS_LOAD()); //DOCS: Obtiene las partidas de la cotización seleccionada
                this.store.dispatch(addItemsQuoteActions.FETCH_GM_FREIGHTS()); // DOCS: Obtiene los fletes de la cotizaicón sleccionada (GMcotFletes)
              } else if (!isEmpty(product)) {
                // DOCS: Obtener los productos en contrato al seccionar un producto de la sugerencia de búsqueda
                this.store.dispatch(addItemsQuoteActions.FETCH_PRODUCTS_IN_CONTRACT_LOAD());
              } else {
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(
                  addItemsQuoteActions.SET_ITEM_LIST_IN_CONTRACT_SUCCESS({
                    items: [],
                  }),
                );
              }

              /*
               DOCS: OBTENER LAS COTIZACIONES QUE TIENEN UN TIPO DE MONEDA DIFERENTE DE ACUERDO
                A LA ORDEN COMPRA SELECCIONADA,

               DOCS: EN CASO DE OBTENER COTIZACIONES CON MONEDA DIFERNTE, SE REALIZA UNA CONVERSIÓN DE DIVISAS,
                CON EL PROPOSITO DE CAMBIAR DE MANERA VISUAL EL VALOR TOTAL DE LA COTIZACIÓN

                DOCS: SE IRÁ AL SWITCH MAP
            */
              const quotedToChange: IQuoted[] = filter(
                response.Results,
                (o: IQuoted) => o.IdCatMoneda !== selectedOrder.IdCatMoneda,
              );

              if (quotedToChange.length > 0) {
                //DOCS: Entrará al if si encuentra cotizaciones con moneda diferente a la orden de compra seleccionada
                const quoteChangeCurrency: QuoteChangeCurrency = {
                  quotedToChange,
                  selectedOrder,
                  quotedResults: response.Results,
                };
                return quoteChangeCurrency;
              }

              return RETURN_EMPTY();
            }),
            catchError((error) => {
              this.logger.error(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la cotizaciones del cliente.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(addItemsQuoteActions.FETCH_QUOTES_CLIENT_FAILED());
            }),
          );
      }),
      switchMap((quoteChangeCurrency: QuoteChangeCurrency) => {
        /*
         * DOCS: SE PRESUME QUE LA ORDEN DE COMPRA SELECCIONADA TOMA EL DOF DE CAT CLIENTES
         * */
        const request: any[] = _map(quoteChangeCurrency.quotedToChange, (o: IQuoted) =>
          this.configuracionIndicadoresServices.ConversorDivisasConvertirTipoDeCambioBancario({
            tipoDeCambio: quoteChangeCurrency.selectedOrder.DOF ? 'DOF' : 'Banamex',
            monto: o.TotalPromesa,
            idCatMonedaOrigen: o.IdCatMoneda,
            idCatMonedaDestino: quoteChangeCurrency.selectedOrder.IdCatMoneda,
          }),
        );
        return forkJoin(request).pipe(
          map((response: Array<any>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al convertir las divisas de las cotizaciones.',
              ),
              response,
            );
            quoteChangeCurrency.quotedToChange = _map(
              quoteChangeCurrency.quotedToChange,
              (o: IQuoted, index: number) => ({
                ...o,
                TotalCotizado: response[index],
              }),
            );

            const quotes: IQuoted[] = _map(
              quoteChangeCurrency.quotedResults,
              (item: VCotCotizacion, index) => {
                const found: IQuoted[] = filter(
                  quoteChangeCurrency.quotedToChange,
                  (o: IQuoted) => o.IdCotCotizacion === item.IdCotCotizacion,
                );
                if (!isEmpty(found)) {
                  return {
                    ...item,
                    TotalCotizado: found[0].TotalCotizado,
                    needsToReloadItems: true,
                    items: [],
                    isSelected: index === 0,
                  };
                }
                return {
                  ...item,
                  needsToReloadItems: true,
                  items: [],
                  isSelected: index === 0,
                };
              },
            );
            return addItemsQuoteActions.FETCH_QUOTES_CLIENT_SUCCESS({
              quoteList: quotes,
            });
          }),
          catchError((error) => {
            this.logger.error(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al convertir las divisas de las cotizaciones.',
              ),
              error,
            );
            return of(addItemsQuoteActions.FETCH_QUOTES_CLIENT_FAILED());
          }),
        );
        return EMPTY;
      }),
    ),
  );

  //DOCS: OBTENER LAS PARTIDAS DE LA COTIZACIÓN SELECCIONADA
  fetchQuoteItems = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addItemsQuoteActions.FETCH_QUOTED_ITEMS_LOAD),
        withLatestFrom(
          this.store.select(addItemSelectors.selectQuoteSelect),
          this.store.select(addItemSelectors.selectQueryItemsQuoteSelected),
          this.store.select(preProcessOrderDetailsSelectors.selectIdCatCurrency),
          this.store.select(preProcessOrderDetailsSelectors.selectOrderSelected),
        ),
        mergeMap(([action, quote, queryInfo, idCatCurrency, order]) => {
          if (quote && quote.needsToReloadItems) {
            this.store.dispatch(SET_LOADING({payload: true}));
            return this.procesosCotizacionPartidaServices
              .cotPartidaCotizacionDetalleObtenerPartidasConDetalle(queryInfo)
              .pipe(
                map(async (response: CotPartidaCotizacionDetalle[]) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al obtener las partidas de cotización.',
                    ),
                    response,
                  );
                  const list: Array<IQuoteItem> = [];
                  for (let i = 0; i < response.length; i++) {
                    const item = response[i];

                    /*
                   DOCS: OBTENER LAS PARTIDAS QUE TIENEN UN TIPO DE MONEDA DIFERENTE DE ACUERDO
                    A LA ORDEN COMPRA SELECCIONADA,

                    DOCS: EN CASO DE OBTENER PARTIDAS CON MONEDA DIFERNTE, SE REALIZA UNA CONVERSIÓN DE DIVISAS,
                     CON EL PROPOSITO DE CAMBIAR DE MANERA VISUAL LOS VALORES DE LA PARTIDA
                   */

                    if (
                      idCatCurrency !== item?.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCatMoneda
                    ) {
                      const params: ConversorDivisasConvertirTipoDeCambioBancarioParams = {
                        tipoDeCambio: order.DOF ? 'DOF' : 'Banamex',
                        monto:
                          item?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioCotizadoSubtotal,
                        idCatMonedaOrigen:
                          item?.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCatMoneda,
                        idCatMonedaDestino: idCatCurrency,
                      };

                      //DOCS: OBTENER LOS PRECIO
                      const convertPrice = await lastValueFrom(
                        this.configuracionIndicadoresServices.ConversorDivisasConvertirTipoDeCambioBancario(
                          params,
                        ),
                      );
                      //DOCS: OBTENER EL PRECIO UNITARIO
                      const convertPriceUnit = await lastValueFrom(
                        this.configuracionIndicadoresServices.ConversorDivisasConvertirTipoDeCambioBancario(
                          {
                            ...params,
                            monto:
                              item?.gMCotPartidasDetalle?.VPartidaCotizacion
                                ?.PrecioCotizadoUnitarioConvertido,
                          },
                        ),
                      );
                      list.push({
                        ...item,
                        Index: i + 1,
                        isSelected: false,
                        IdContratoCliente: null,
                        IdEmpresa: null,
                        PrecioCotizadoSubtotal: convertPrice,
                        PrecioCotizadoUnitarioConvertido: convertPriceUnit,
                        PrecioCotizadoUnitarioPactado: convertPriceUnit,
                        isInViewQuotesLinked: false,
                        quotesLinked: [],
                        needsToReloadLinkeds: true,
                        imageHover: `assets/Images/logos/${item?.gMCotPartidasDetalle?.VPartidaCotizacion?.NombreImagenMarca?.toLowerCase()}_hover.svg`,
                        freightItem: null,
                      });
                    } else {
                      list.push({
                        ...item,
                        Index: i + 1,
                        isSelected: false,
                        IdContratoCliente: null,
                        IdEmpresa: null,
                        isInViewQuotesLinked: false,
                        quotesLinked: [],
                        needsToReloadLinkeds: true,
                        imageHover: `assets/Images/logos/${item?.gMCotPartidasDetalle?.VPartidaCotizacion?.NombreImagenMarca?.toLowerCase()}_hover.svg`,
                        freightItem: null,
                      });
                    }
                  }
                  this.store.dispatch(
                    addItemsQuoteActions.FETCH_QUOTED_ITEMS_SUCCESS({
                      items: list,
                    }),
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                  return EMPTY;
                }),
                catchError((error) => {
                  this.logger.error(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al obtener las partidas de cotización.',
                    ),
                    error,
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                  return EMPTY;
                }),
              );
          } else {
            this.store.dispatch(
              addItemsQuoteActions.FETCH_QUOTED_ITEMS_SUCCESS({
                items: quote.items,
              }),
            );
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );

  //DOCS: OBTENER LAS PARTIDA DE LA LISTA DE COTIZACIONES
  fetchItemsOfListQuote = createEffect(() =>
    this.actions$.pipe(
      ofType(addItemsQuoteActions.FETCH_LIST_QUOTED_ITEMS_LOAD),
      withLatestFrom(
        this.store.select(addItemSelectors.selectQuoteList),
        this.store.select(addItemSelectors.selectItemSearch),
      ),
      mergeMap(([action, quotes, product]) => {
        const request = _map(quotes, (o) => {
          const body = new FiltersOnlyActive();
          body.Filters.push(
            {
              NombreFiltro: 'IdCotCotizacion',
              ValorFiltro: o.IdCotCotizacion,
            },
            {
              NombreFiltro: 'IdProducto',
              ValorFiltro: product.value,
            },
            {
              NombreFiltro: 'Originales',
              ValorFiltro: '',
            },
          );
          return this.procesosCotizacionPartidaServices.cotPartidaCotizacionDetalleObtenerPartidasConDetalle(
            body,
          );
        });
        return forkJoin(request).pipe(
          map((response: Array<CotPartidaCotizacionDetalle[]>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las partidas de la lista de cotizaciones.',
              ),
              response,
            );
            const list: Array<IQuoteItem> = [];
            response.forEach((item: CotPartidaCotizacionDetalle[]) => {
              item.forEach((partida: CotPartidaCotizacionDetalle, index: number) => {
                list.push({
                  ...partida,
                  Index: index + 1,
                  isSelected: false,
                  label: 'ND',
                  IdEmpresa: null,
                  IdContratoCliente: null,
                  isInViewQuotesLinked: false,
                  quotesLinked: [],
                  needsToReloadLinkeds: true,
                  freightItem: null,
                });
              });
            });

            return addItemsQuoteActions.FETCH_LIST_QUOTED_ITEMS_SUCCESS({list});
          }),
        );
      }),
    ),
  );

  // DOCS: OBTENER EL LISTADO DE LAS SUGERENCIAS DE PRODUCTOS EN LAS PARTIDAS (vPartidaCotizacion)
  getOptionsOfProductsQuotesClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItemsQuoteActions.GET_OPTIONS_OF_PRODUCTS), //DOCS: Se ejecuta al escribir sobre el buscador, obtiene las sugerencias de busqueda
      withLatestFrom(this.store.select(addItemSelectors.selectSuggestionInQuotationQueryInfo)),
      switchMap(([action, searchSuggestionParameters]) => {
        if (action.searchTerm) {
          return this.sistemaUXService.SugerenciasBusquedaProcess(searchSuggestionParameters).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener productos',
                ),
                response,
              );
              return addItemsQuoteActions.FETCH_OPTIONS_PRODUCTS_IN_QUOTATIONS_SUCCESS({
                products: response,
              });
            }),
            catchError((error) => {
              this.logger.error(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener productos',
                ),
                error,
              );
              return of(addItemsQuoteActions.GET_OPTIONS_OF_PRODUCTS_ERROR());
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  // DOCS: OBTENER EL LISTADO DE LAS SUGERENCIAS DE PRODCUTOS EN CONTRATO (vConfiguracionAplicadaCliente)

  getOptionsOfProductsWithContract$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItemsQuoteActions.FETCH_OPTIONS_PRODUCTS_IN_QUOTATIONS_SUCCESS),
      withLatestFrom(this.store.select(addItemSelectors.selectSuggestionInContractQueryInfo)),
      switchMap(([{products}, searchSuggestionParameters]) => {
        return this.sistemaUXService.SugerenciasBusquedaProcess(searchSuggestionParameters).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener productos',
              ),
              response,
            );
            return addItemsQuoteActions.FETCH_OPTIONS_PRODUCTS_IN_CONTRACT_SUCCESS({
              products: [...products, ...response],
            });
          }),
          catchError((error) => {
            this.logger.error(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener productos',
              ),
              error,
            );
            return of(
              addItemsQuoteActions.FETCH_OPTIONS_PRODUCTS_IN_CONTRACT_SUCCESS({
                products: [...products],
              }),
            );
          }),
        );
      }),
    ),
  );

  // DOCS: OBTENER LOS PRODUCTOS QUE SE ENCUENTRAN EN CONTRATO
  fetchProductsCatalog = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          addItemsQuoteActions.FETCH_PRODUCTS_IN_CONTRACT_LOAD, //DOCS: Se ejecuta al seleccionar un producto de la sugerencia de busqueda
          addItemsQuoteActions.SET_RUN_SEARCH_TERM, //DOCS: Se ejecuta al presionar presionar "Enter" sobre el buscador
        ),
        withLatestFrom(
          this.store.select(addItemSelectors.selectSuggestionInContractQueryInfo),
          this.store.select(addItemSelectors.selectCatalogQueryInfo),
          this.store.select(addItemSelectors.selectQuoteList),
          this.store.select(preProcessOrderDetailsSelectors.selectClient),
          this.store.select(preProcessOrderDetailsSelectors.selectIdCatCurrency),
        ),
        switchMap(
          ([
            action,
            searchSuggestionParameters,
            catalogQueryInfo,
            quoteList,
            client,
            idCatCurrency,
          ]) => {
            // if (catalogQueryInfo.desiredPage === 1) {
            //   this.store.dispatch(SET_LOADING({payload: true}));
            // }
            this.store.dispatch(SET_LOADING({payload: true}));
            return this.sistemaUXService
              .SugerenciasBusquedaProcess(searchSuggestionParameters)
              .pipe(
                map(async (response: SugerenciaBusqueda[]) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al obtener los productos de Cátalogo.',
                    ),
                    response,
                  );
                  const listProduct: IQuoteItem[] = [];
                  function removeDuplicates(arr, prop) {
                    return arr.filter(
                      (obj, index, self) =>
                        index === self.findIndex((el) => el[prop] === obj[prop]),
                    );
                  }
                  const productsSuggested = removeDuplicates(response, 'Id');

                  for (let i = 0; i < productsSuggested?.length; i++) {
                    const product = productsSuggested[i];
                    const body = {
                      ...catalogQueryInfo,
                      Filters: [
                        ...catalogQueryInfo.Filters,
                        {
                          NombreFiltro: 'IdProducto',
                          ValorFiltro: product.Id,
                        },
                      ],
                    };

                    const productInfo = await lastValueFrom(
                      this.configuracionProductosService.vProductoQueryResult(body),
                    );

                    const params: ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContratoParams = {
                      piezas: 1,
                      idProducto: product.Id,
                      idCliente: client.IdCliente,
                      idCatMoneda: idCatCurrency,
                    };
                    const paramsOffer: CotProductoOfertaGetCotProductoOfertaTemporalParams = {
                      IdCatMoneda: idCatCurrency,
                      IdClient: client.IdCliente,
                      IdProducto: productsSuggested[i].Id,
                      NumeroDePiezas: 1,
                    };
                    // DOCS: Obtener la configuración del producto en contrato
                    const configurationClient: ConfiguracionContratoCliente = await lastValueFrom(
                      this.configuracionClienteContratoService.ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContrato(
                        params,
                      ),
                    );
                    const configurationClientOffer: CotProductoOferta = await lastValueFrom(
                      this.procesosL01CotizacionPartidasDesglosesService.cotProductoOfertaGetCotProductoOfertaTemporal(
                        paramsOffer,
                      ),
                    );
                    //DOCS: AGREGAR UNICAMENTE LOS PRODUCTOS CON CONTRATO

                    if (configurationClient) {
                      listProduct.push({
                        gMCotPartidasDetalle: {
                          VPartidaCotizacion: {
                            IdCotPartidaCotizacion: generateUuid(),
                          },
                          VProducto: productInfo?.Results?.[0],
                        },
                        vProducto: productInfo?.Results?.[0],
                        Index: i + 1,
                        isSelected: false,
                        label: OF_CONTRACT,
                        NumeroDePiezas: 1,
                        IdContratoCliente: null,
                        PrecioCotizadoUnitarioConvertido:
                          configurationClientOffer?.PrecioCotizadoUnitarioConvertido,
                        PrecioCotizadoSubtotal: configurationClientOffer?.PrecioCotizadoSubtotal,
                        PrecioCotizadoUnitarioPactado:
                          configurationClientOffer?.PrecioCotizadoUnitarioConvertido,
                        PrecioCotizadoTotal: configurationClientOffer?.PrecioCotizadoTotal,
                        PrecioIVA: configurationClientOffer?.PrecioIVA,
                        PrecioTotalCotizado: configurationClientOffer?.PrecioCotizadoTotal,
                        TiempoEntrega: configurationClient?.TiempoEntrega,
                        IdEmpresa: null,
                        isInViewQuotesLinked: false,
                        PrecioFleteNoDesglosado: 0,
                        freightItem: null,
                        TiempoEstimadoEntrega: configurationClient?.TiempoEntregaDias,
                        IdValorConfiguracionTiempoEntrega:
                          configurationClient.IdValorConfiguracionTiempoEntrega,
                        Cancelacion: false,
                        Seguimiento: false,
                        PromesaDeCompra: false,
                        imageHover: `assets/Images/logos/${productInfo?.Results?.[0]?.NombreImagenMarca}_hover.svg`,
                      });
                    }
                  }
                  this.store.dispatch(
                    addItemsQuoteActions.FETCH_QUOTES_CLIENT_SUCCESS({
                      quoteList: _map(quoteList, (o: IQuoted) => ({
                        ...o,
                        freightItem: null,
                        isSelected: false,
                      })),
                    }),
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                  this.store.dispatch(
                    addItemsQuoteActions.SET_ITEM_LIST_IN_CONTRACT_SUCCESS({
                      items: listProduct,
                    }),
                  );
                }),
                catchError((error) => {
                  this.logger.error(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al obtener los productos en contrato.',
                    ),
                  );
                  this.store.dispatch(addItemsQuoteActions.SET_ITEM_LIST_IN_CONTRACT_FAILED());
                  return of(SET_LOADING({payload: false}));
                }),
              );
          },
        ),
      ),
    {dispatch: false},
  );

  //DOCS: Agregar las partidas  a la orden de compra
  addItemsOfPurchaseOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addItemsQuoteActions.ADD_ITEMS_PURCHASE_ORDER),
        withLatestFrom(
          this.store.select(addItemSelectors.selectItemSSave),
          this.store.select(preProcessOrderDetailsSelectors.selectOrderSelected),
          this.store.select(preProcessOrderDetailsSelectors.selectClient),
        ),
        map(([action, list, order, client]) => {
          if (list.length > 0) {
            const items = buildAddItemInOrderPurchase(list, order, client);
            this.store.dispatch(addItemsQuoteActions.ADD_ITEMS_PURCHASE_ORDER_SUCCESS({items}));
            this.store.dispatch(
              SET_LOADING_SUCCESS({
                active: true,
                message: 'Partidas Agregadas',
              }),
            );
            this.router.navigate([
              appRoutes.protected,
              appRoutes.pendings.pendings,
              appRoutes.preProcessing.preProcess,
              appRoutes.preProcessing.orderDetails,
            ]);
          } else {
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );

  //DOCS: OBTENER LOS FLETES DE LA COTIZACIÓN SELECCIONADA
  fetchGmFreights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItemsQuoteActions.FETCH_GM_FREIGHTS),
      withLatestFrom(this.store.select(addItemSelectors.selectQuoteSelect)),
      mergeMap(([action, quotedSelected]) => {
        if (quotedSelected && quotedSelected.needsToReloadItems) {
          return this.procesosL01CotizacionAtenderCierreService
            .GMCotFletesProcess(quotedSelected.IdCotCotizacion)
            .pipe(
              map((response: GMCotFletes) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener GM Cot Fletes',
                  ),
                  response,
                );
                return addItemsQuoteActions.FETCH_GM_FREIGHTS_SUCCESS({
                  freights: response,
                  IdCotCotizacion: quotedSelected.IdCotCotizacion,
                });
              }),
              catchError((error) => {
                this.logger.error(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener GM Cot Fletes',
                  ),
                  error,
                );
                return of(addItemsQuoteActions.FETCH_GM_FREIGHTS_ERROR());
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
}
