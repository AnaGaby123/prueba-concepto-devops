import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import * as apiLogistica from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import {Router} from '@angular/router';

const FILE_NAME = 'replace-purchase-order-items.effect.ts';

@Injectable()
export class ReplacePurchaseItemEffects {
  constructor(
    private router: Router,
    private action$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private procesosCotizacionServices: apiLogistica.ProcesosL01CotizacionService,
    private procesosCotizacionPartidaServices: apiLogistica.ProcesosL01CotizacionPartidasService,
    private configuracionClienteContratoService: apiCatalogs.ConfiguracionClientesContratoService,
    private configuracionProductosService: apiCatalogs.ConfiguracionProductosService,
    private configuracionClientesCalculos: apiCatalogs.ConfiguracionClientesCalculosService,
    private sistemaUXService: apiCatalogs.SistemaUXService,
    private processPretamitarPedidoServices: apiLogistica.ProcesosL04PretramitarPedidoService,
    private configuracionIndicadoresServices: apiCatalogs.ConfiguracionIndicadoresService,
  ) {}

  // DOCS Se comento porque se eliminara la seccion de reemplazar partida

  /*  fetchQuotesClient$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        replaceItemActions.FETCH_QUOTES_CLIENT,
        replaceItemActions.SET_QUOTES_CLIENT_OF_SEARCH,
      ),
      withLatestFrom(
        this.store.select(replaceItemSelectors.selectProductToSearch),
        this.store.select(selectClient),
        this.store.select(getIdTypeQuoted('enviada')),
      ),
      mergeMap(([action, product, client, idTypeQuoted]) => {
        if (idTypeQuoted) {
          this.store.dispatch(SET_LOADING({payload: true}));
          const body = new FiltersOnlyActive();
          body.Filters.push(
            {NombreFiltro: 'IdCliente', ValorFiltro: client.IdCliente},
            {
              NombreFiltro: 'IdCatEstadoCotizacion',
              ValorFiltro: idTypeQuoted,
            },
          );
          if (!_.isEmpty(product)) {
            body.Filters.push({
              NombreFiltro: 'IdProducto',
              ValorFiltro: product.value,
            });
          }

          return this.procesosCotizacionServices.vCotCotizacionQueryResult(body).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la cotizaciones del cliente.',
                ),
                response,
              );
              if (response.TotalResults > 0) {
                if (_.isEmpty(product)) {
                  this.store.dispatch(
                    // Seleccionar cotización inicial
                    replaceItemActions.SET_QUOTED_SELECTED({
                      item: {
                        ...response.Results[0],
                        needsToReloadItems: true,
                        items: [],
                        isSelected: true,
                      },
                    }),
                  );
                  this.store.dispatch(replaceItemActions.FETCH_QUOTED_ITEMS_LOAD());
                } else {
                  this.store.dispatch(
                    replaceItemActions.SET_QUOTED_SELECTED({
                      item: null,
                    }),
                  );
                  this.store.dispatch(replaceItemActions.FETCH_LIST_QUOTED_ITEMS_LOAD());
                }
              } else if (!_.isEmpty(product)) {
                this.store.dispatch(replaceItemActions.FETCH_PRODUCTS_CATALOG_LOAD());
              } else {
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(
                  replaceItemActions.SET_ITEM_LIST_CATALOG({
                    items: [],
                  }),
                );
              }
              return replaceItemActions.SET_QUOTES_CLIENT_SUCCESS({
                quoteList: _.map(response.Results, (item, index) => {
                  return {
                    ...item,
                    needsToReloadItems: true,
                    items: [],
                    isSelected: index === 0,
                  };
                }),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la cotizaciones del cliente.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
  fetchQuoteItemList$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(replaceItemActions.FETCH_QUOTED_ITEMS_LOAD),
        withLatestFrom(
          this.store.select(replaceItemSelectors.selectQuoteSelect),
          this.store.select(replaceItemSelectors.selectProductToSearch),
          this.store.select(selectIdCatCurrency),

          this.store.select(preProcessOrderDetailsSelectors.selectPurchaseOrderItem),
        ),
        mergeMap(([action, quote, product, idCatCurrency, order]) => {
          if (quote && quote.needsToReloadItems) {
            this.store.dispatch(SET_LOADING({payload: true}));
            const body = new FiltersOnlyActive();
            body.Filters.push({
              NombreFiltro: 'IdCotCotizacion',
              ValorFiltro: quote.IdCotCotizacion,
            });
            if (!_.isEmpty(product)) {
              body.Filters.push({
                NombreFiltro: 'IdProducto',
                ValorFiltro: product.value,
              });
            }
            return this.procesosCotizacionPartidaServices.vPartidaCotizacionQueryResult(body).pipe(
              map(async (response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener las partidas de cotización.',
                  ),
                  response,
                );

                const list: Array<IQuoteItem> = [];
                for (let i = 0; i < response.Results.length; i++) {
                  const item = response.Results[i];
                  if (idCatCurrency !== item.IdCatMoneda) {
                    const params: ConversorDivisasConvertirTipoDeCambioBancarioParams = {
                      tipoDeCambio: order.DOF ? 'DOF' : 'Banamex',
                      monto: item.PrecioCotizadoSubtotal,
                      idCatMonedaOrigen: item.IdCatMoneda,
                      idCatMonedaDestino: idCatCurrency,
                    };
                    const convertPrice = await lastValueFrom(
                      this.configuracionIndicadoresServices.ConversorDivisasConvertirTipoDeCambioBancario(
                        params,
                      ),
                    );
                    const convertPriceUnit = await lastValueFrom(
                      this.configuracionIndicadoresServices.ConversorDivisasConvertirTipoDeCambioBancario(
                        {
                          ...params,
                          monto: item.PrecioCotizadoUnitarioConvertido,
                        },
                      ),
                    );
                    list.push({
                      ...item,
                      isSelected: false,
                      label: null,
                      IdContratoCliente: null,
                      IdEmpresa: null,
                      PrecioCotizadoSubtotal: convertPrice,
                      PrecioCotizadoUnitarioConvertido: convertPriceUnit,
                      isInViewQuotesLinked: false,
                      quotesLinked: [],
                      needsToReloadLinkeds: true,
                    });
                  } else {
                    list.push({
                      ...item,
                      isSelected: false,
                      label: null,
                      IdContratoCliente: null,
                      IdEmpresa: null,
                      isInViewQuotesLinked: false,
                      quotesLinked: [],
                      needsToReloadLinkeds: true,
                    });
                  }
                }
                this.store.dispatch(
                  replaceItemActions.FETCH_QUOTED_ITEMS_SUCCESS({
                    items: list,
                  }),
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
              catchError((error) => {
                this.logger.debug(
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
              replaceItemActions.FETCH_QUOTED_ITEMS_SUCCESS({
                items: quote.items,
              }),
            );
            return EMPTY;
            // return of(
            //   replaceItemActions.FETCH_QUOTED_ITEMS_SUCCESS({
            //     items: quote.items,
            //   }),
            // );
          }
        }),
      ),
    {dispatch: false},
  );
  fetchItemsOfListQuote$ = createEffect(() =>
    this.action$.pipe(
      ofType(replaceItemActions.FETCH_LIST_QUOTED_ITEMS_LOAD),
      withLatestFrom(
        this.store.select(replaceItemSelectors.selectQuoteList),
        this.store.select(replaceItemSelectors.selectProductToSearch),
      ),
      mergeMap(([action, quotes, product]) => {
        const request = _.map(quotes, (o) => {
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
          );

          return this.procesosCotizacionPartidaServices.vPartidaCotizacionQueryResult(body);
        });
        return forkJoin(request).pipe(
          map((response: Array<QueryResultVPartidaCotizacion>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las partidas de la lista de cotizaciones.',
              ),
              response,
            );
            const list: Array<IQuoteItem> = [];
            response.forEach((item) => {
              item.Results.forEach((partida) => {
                list.push({
                  ...partida,
                  isSelected: false,
                  label: 'ND',
                  IdEmpresa: null,
                  IdContratoCliente: null,
                  isInViewQuotesLinked: false,
                  quotesLinked: [],
                  needsToReloadLinkeds: true,
                });
              });
            });

            return replaceItemActions.FETCH_LIST_QUOTED_ITEMS_SUCCESS({list});
          }),
        );
      }),
    ),
  );

  // DOCS: Obtiene productos por coincidencia (evento enter)
  fetchProductCatalog$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          replaceItemActions.FETCH_PRODUCT_CATALOG_LOAD,
          replaceItemActions.SET_RUN_SEARCH_TERM,
        ),
        withLatestFrom(
          this.store.select(replaceItemSelectors.selectQueryInfo),
          this.store.select(replaceItemSelectors.selectQuoteList),
          this.store.select(selectClient),
          this.store.select(selectIdCatCurrency),
        ),
        mergeMap(([action, queryInfo, quoteList, client, idCatCurrency]) => {
          if (queryInfo.desiredPage === 1) {
            this.store.dispatch(SET_LOADING({payload: true}));
          }
          return this.configuracionProductosService.vProductoQueryResult(queryInfo).pipe(
            map(async (response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los productos de Cátalogo.',
                ),
                response,
              );

              const products = response.Results;
              const listProduct: IQuoteItem[] = [];
              for (const item of products) {
                const itemQuotation: IQuoteItem = {} as IQuoteItem;
                const params: ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoParams = {} as ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoParams;
                params.utilidad = null;
                params.factorDeCostoFijo = null;
                params.piezas = 1;
                params.idProducto = item.IdProducto;
                params.idCliente = client.IdCliente;
                params.idCatMoneda = idCatCurrency;
                const unitPrice = await lastValueFrom(
                  this.configuracionClienteContratoService.ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContrato(
                    params,
                  ),
                );
                const data = new FiltersOnlyActive();
                data.Filters.push(
                  {
                    NombreFiltro: 'IdCliente',
                    ValorFiltro: client.IdCliente,
                  },
                  {
                    NombreFiltro: 'IdProducto',
                    ValorFiltro: item.IdProducto,
                  },
                );
                const configurationClient: apiCatalogs.QueryResultVConfiguracionAplicadaCliente = await lastValueFrom(
                  this.configuracionClientesCalculos.vConfiguracionAplicadaClienteQueryResult(data),
                );
                listProduct.push({
                  ...item,
                  NumeroDePiezas: 1,
                  isSelected: false,
                  PrecioCotizadoUnitarioConvertido: unitPrice,
                  PrecioCotizadoSubtotal: unitPrice,
                  // DOCS Se cambio pór cambios en los modelos relacionados con las marcas
                  /!*label: configurationClient.Results[0]
                      .IdCatClasificacionProducto
                      ? 'De Contrato'
                      : 'De Catálogo',*!/
                  label: configurationClient.Results[0].IdAgrupadorCaracteristica
                    ? 'De Contrato'
                    : 'De Catálogo',
                  TiempoEntrega: configurationClient.Results[0].TiempoEntrega,
                  IdContratoCliente: null,
                  IdEmpresa: null,
                  isInViewQuotesLinked: false,
                  quotesLinked: [],
                  needsToReloadLinkeds: true,
                });
              }
              this.store.dispatch(
                replaceItemActions.SET_QUOTES_CLIENT_SUCCESS({
                  quoteList: _.map(quoteList, (o: IQuoteItem) => ({
                    ...o,
                    isSelected: false,
                  })),
                }),
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                replaceItemActions.SET_ITEM_LIST_CATALOG({
                  items: listProduct,
                }),
              );
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  // Docs: obtiene lista de partidas por sugerencia (lucene)
  getOptionsOfProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(replaceItemActions.GET_OPTIONS_OF_PRODUCTS),
      withLatestFrom(this.store.select(replaceItemSelectors.selectSuggestionQueryInfo)),
      mergeMap(([action, searchSuggestionParameters]) => {
        if (action.searchTerm) {
          return this.sistemaUXService.SugerenciasBusquedaProcess(searchSuggestionParameters).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener sugerencias de productos.',
                ),
                response,
              );
              return replaceItemActions.GET_OPTIONS_OF_PRODUCTS_SUCCESS({
                product: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener sugerencias de productos.',
                ),
                error,
              );
              return of(replaceItemActions.GET_OPTIONS_OF_PRODUCTS_ERROR());
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
  replaceItemOfOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(replaceItemActions.REPLACE_ITEM_LOAD),
      withLatestFrom(
        this.store.select(selectEntrySelected),
        this.store.select(replaceItemSelectors.selectItemToReplace),
      ),
      mergeMap(([action, itemToReplace, itemFromReplace]) => {
        if (!_.isEmpty(itemFromReplace)) {
          this.store.dispatch(SET_LOADING({payload: true}));
          const data: apiLogistica.PpPartidaPedidoConfiguracion = {
            Activo: true,
            DeCatalogo:
              itemFromReplace.label === 'De Catálogo' || itemFromReplace.label === 'De Contrato',
            FechaRegistro: DEFAULT_DATE,
            FechaUltimaActualizacion: DEFAULT_DATE,
            IdContratoCliente: null,
            IdCotPartidaCotizacion: itemFromReplace.IdCotPartidaCotizacion,
            IdCotProductoOferta: itemFromReplace.IdCotProductoOferta,
            IdEmpresa: null,
            IdPPPartidaPedidoConfiguracion: DEFAULT_UUID,
            TieneContrato: false,
            TieneCotizacion: !!itemFromReplace.IdCotPartidaCotizacion,
          };
          return this.processPretamitarPedidoServices
            .ppPartidaPedidoConfiguracionGuardarOActualizar(data)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar la configuracion de partida reemplazo.',
                  ),
                  response,
                );
                return {
                  itemToReplace,
                  itemFromReplace,
                  IdPPPartidaPedidoConfiguracion: extractID(response),
                };
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar la configuracion de partida reemplazo.',
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
      withLatestFrom(this.store.select(preProcessOrderDetailsSelectors.selectPurchaseOrderItem)),
      switchMap(([data, oc]) => {
        if (!_.isEmpty(data)) {
          const item: PpPartidaPedido = {
            Activo: true,
            FechaProgramada: null,
            FechaRegistro: DEFAULT_DATE,
            FechaUltimaActualizacion: DEFAULT_DATE,
            IVA: 0,
            IdPPIncidenciaPartidaPedido: null,
            IdPPPPartidaPedidoCorregida: null,
            IdPPPartidaPedido: DEFAULT_UUID,
            IdPPPartidaPedidoConfiguracion: data.IdPPPartidaPedidoConfiguracion,
            IdPPPartidaPedidoMadre: null,
            IdPPPedido: oc.IdPPPedido,
            IdProducto: data.itemFromReplace.IdProducto,
            IdValorConfiguracionTiempoEntrega: null,
            Numero: 0,
            NumeroDePiezas: 1,
            PrecioUnitario: data.itemFromReplace.PrecioCotizadoUnitarioConvertido,
            Programada: false,
            Total: 0,
            Tramitada: false,
            Validada: null,
          };
          return this.processPretamitarPedidoServices.ppPartidaPedidoGuardarOActualizar(item).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar la nueva partida pedido de reemplazo.',
                ),
                response,
              );
              return {
                itemFromReplace: data.itemFromReplace,
                itemToReplace: data.itemToReplace,
                IdPPPartidaPedido: extractID(response),
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar la nueva partida pedido de reemplazo.',
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
      withLatestFrom(this.store.select(preProcessOrderDetailsSelectors.selectPurchaseOrderItem)),
      switchMap(([replacementData, oc]) => {
        if (!_.isEmpty(replacementData)) {
          const item: PpPartidaPedido = {
            ...replacementData.itemToReplace,
            IdPPPPartidaPedidoCorregida: replacementData.IdPPPartidaPedido,
          };
          return this.processPretamitarPedidoServices.ppPartidaPedidoGuardarOActualizar(item).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al actualizar la partida a reemplazar.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Partida Reemplazada',
                }),
              );
              this.store.dispatch(
                preProcessDetailsActions.FETCH_MAIL_PP_ORDER_DETAILS_LOAD({
                  itemId: oc.IdPPPedido,
                }),
              );
              this.store.dispatch(preProcessDetailsActions.INVALIDATE_AUTHORIZED_CODE_LOAD());
              this.router.navigate([
                appRoutes.protected,
                appRoutes.pendings.pendings,
                appRoutes.preProcessing.preProcess,
                appRoutes.preProcessing.orderDetails,
              ]);
              return replaceItemActions.REPLACE_ITEM_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al actualizar la partida a reemplazar.',
                ),
                error,
              );
              return of(replaceItemActions.REPLACE_ITEM_ERROR());
            }),
          );
        } else {
          return of(replaceItemActions.REPLACE_ITEM_ERROR());
        }
      }),
    ),
  );*/
}
