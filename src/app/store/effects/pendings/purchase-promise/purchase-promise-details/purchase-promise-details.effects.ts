import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, forkJoin, lastValueFrom, of} from 'rxjs';

// Models
import * as apiCatalogs from 'api-catalogos';
import {
  ConfiguracionClientesConfiguracionService,
  ConfiguracionClientesContratoService,
  ConfiguracionClientesDireccionesService,
  ConfiguracionContratoCliente,
  QueryResultContactoDetalleObj,
  QueryResultDateTime,
  SugerenciaBusqueda,
} from 'api-catalogos';
import * as apiLogistic from 'api-logistica';
import {
  CorreoRecibidoClienteRequerimientoObj,
  CotProductoOferta,
  GMPretramitarPromesaDeCompra,
  ProcesosL01CotizacionAtenderCierreService,
  ProcesosL01CotizacionPartidasDesglosesService,
  ProcesosMailbotService,
  QueryResultVPromesaDeCompra,
} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IPurchasePromiseQuotation,
  IQuoteItem,
  IQuotesSummary,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.models';
import {IMail} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';
import {FiltersOnlyActive} from '@appModels/filters/Filters';

// Actions
import {
  purchasePromiseActions,
  purchasePromiseDetailsActions,
} from '@appActions/pendings/purchase-promise';
import * as utilsActions from '@appActions/utils/utils.action';
import {SET_LOADING} from '@appActions/utils/utils.action';

// Selectors
import {purchasePromiseDetailsSelectors} from '@appSelectors/pendings/purchase-promise';

// Utils
import * as servicesLogger from '@appUtil/logger';
import {addRowIndex, getNameFile, isImage, isPdf} from '@appUtil/util';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {isEmpty, isNumber, map as _map, sumBy} from 'lodash-es';

import {ICloseOfferCustomer} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import {
  IClientTotals,
  IQuotation,
} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';
import {IGeneralDataStrategy} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';
import {convertPDFFileFromURLToBase64, getBase64FromUrl} from '@appUtil/files';
import {appRoutes} from '@appHelpers/core/app-routes';
import {
  buildParamsGMPartidaPromesaDeCompra,
  OF_CONTRACT,
} from '@appHelpers/pendings/purchase-proomise/purchase-promise-detail/purchase-promise-detail.helper';
import {currentDateWithoutHoursUTCFormat, getDateWithoutHoursUTCFormat} from '@appUtil/dates';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';
import {generateUuid} from '@appUtil/strings';
import {closeSaleSuccessType} from '@appActions/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.actions';
import DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoParams = ConfiguracionClientesDireccionesService.DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoParams;
import ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContratoParams = ConfiguracionClientesContratoService.ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContratoParams;
import CotProductoOfertaGetCotProductoOfertaTemporalParams = ProcesosL01CotizacionPartidasDesglosesService.CotProductoOfertaGetCotProductoOfertaTemporalParams;

const FILE_NAME = 'Purchase-Promise-Details';

interface IGeneralDataClient {
  client: ICloseOfferCustomer;
  clientData: apiCatalogs.VCliente;
  typePhones: Array<apiCatalogs.CatTipoNumeroTelefonico>;
  quotation: IQuotation;
  data: IGeneralDataStrategy;
  idClient: string;
  idUser: string;
  idQuotation: string;
}

const initialGeneralDataClient = (): IGeneralDataClient => ({
  client: {} as ICloseOfferCustomer,
  clientData: {} as apiCatalogs.VCliente,
  typePhones: [],
  quotation: {} as IQuotation,
  data: {} as IGeneralDataStrategy,
  idClient: '',
  idUser: '',
  idQuotation: '',
});

@Injectable()
export class PurchasePromiseDetailsEffects {
  constructor(
    private actions$: Actions,
    private logger: NGXLogger,
    private store: Store,
    private router: Router,
    private sistemaArchivosService: apiCatalogs.SistemaArchivosService,
    private contactServices: apiCatalogs.ConfiguracionContactosService,
    private processPurchasePServices: apiLogistic.ProcesosL03PromesaDeCompraService,
    private configuracionProductosService: apiCatalogs.ConfiguracionProductosService,
    private configuracionClienteContratoService: apiCatalogs.ConfiguracionClientesContratoService,
    private sistemaUXService: apiCatalogs.SistemaUXService,
    private cotizacionPartidasServices: apiLogistic.ProcesosL01CotizacionPartidasService,
    private procesosCotizacionService: apiLogistic.ProcesosL01CotizacionService,
    private processMailBotService: ProcesosMailbotService,
    private configuracionClientesDirecciones: ConfiguracionClientesDireccionesService,
    private procesosL01CotizacionAtenderCierreService: ProcesosL01CotizacionAtenderCierreService,
    private procesosL01CotizacionPartidasDesglosesService: ProcesosL01CotizacionPartidasDesglosesService,
    private appService: CoreContainerService,
    private configuracionClientesConfiguracionService: ConfiguracionClientesConfiguracionService,
  ) {}

  // DOCS: Selecciona el cliente y dispara demás peticiones
  initDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.SET_CUSTOMER_SELECTED),
      mergeMap(({customer}) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        this.store.dispatch(purchasePromiseActions.SET_IS_DETAILS({isDetails: true}));
        return this.configuracionClientesConfiguracionService
          .DatosFacturacionClienteDetalleObtenerResponse(customer.IdCliente)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Se obtuvieron datos facturación cliente',
                ),
                response,
              );
              this.store.dispatch(
                purchasePromiseDetailsActions.SET_CUSTOMER_SELECTED_SUCCESS({
                  customer: {
                    ...customer,
                    ...response.body,
                    level: response.body.NivelIngreso,
                    category: response.body.Categoria,
                    NombreImagen: response.body.NombreImagen,
                    imageHover: `assets/Images/logos/${response.body.NombreImagen?.toLowerCase()}_hover.png`,
                    IdDireccionCliente: response.body.IdDireccionCliente,
                  },
                }),
              );
              this.store.dispatch(
                purchasePromiseDetailsActions.FETCH_QUOTATIONS_LOAD({
                  DescripcionLlave: customer.DescripcionLlave,
                }),
              );
              return purchasePromiseDetailsActions.FETCH_CLIENT_TOTALS_LOAD({
                IdClient: customer.DescripcionLlave,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al Obtener datos facturacion cliente',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );
  // TODO: DESCOMENTAR CUANDO SE DEFINA
  /*  fetchClientTotals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.FETCH_CLIENT_TOTALS_LOAD),
      mergeMap(({IdClient}) => {
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdCliente',
          ValorFiltro: IdClient,
        });
        return this.procesosCotizacionService.vClienteCotizacionesQueryResult(body).pipe(
          map((response: apiLogistic.QueryResultVClienteCotizaciones) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Se obtuvieron las cotizaciones de forma exitosa.',
              ),
              response,
            );
            const totals: IClientTotals[] = _map(
              response.Results,
              (o: apiLogistic.VClienteCotizaciones): IClientTotals =>
                ({
                  ...o,
                  TasaEfectividad:
                    isNumber(o.TotalFacturadoUSD) &&
                    isNumber(o.ObjetivoFundamentalUSD) &&
                    o.ObjetivoFundamentalUSD > 0
                      ? (o.TotalFacturadoUSD * 100) / o.ObjetivoFundamentalUSD
                      : 0,
                } as IClientTotals),
            );

            return purchasePromiseDetailsActions.SET_CLIENT_TOTALS({
              clientTotals: !isEmpty(totals) ? totals[0] : ({} as IClientTotals),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Se pudo obtener la colección de cotizaciones.',
              ),
              error,
            );
            return of(SET_LOADING({payload: false}));
          }),
        );
      }),
    ),
  );*/

  // DOCS: Obtener Contacto de cliente
  fetchContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.FETCH_CONTACT_CUSTOMER_LOAD),
      mergeMap((action) => {
        const params = new FiltersOnlyActive();
        params.Filters = [
          {
            NombreFiltro: 'IdCliente',
            ValorFiltro: action.idCustomer,
          },
          {
            NombreFiltro: 'Activo',
            ValorFiltro: true,
          },
        ];
        return this.contactServices.ContactoDetalleQueryResult(params).pipe(
          map((response: QueryResultContactoDetalleObj) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Obtener Contacto de Cliente.',
              ),
              response,
            );
            this.router.navigate([
              appRoutes.protected,
              appRoutes.pendings.pendings,
              appRoutes.purchasePromise.purchasePromise,
              appRoutes.purchasePromise.details,
            ]);
            return purchasePromiseDetailsActions.FETCH_CONTACT_CUSTOMER_SUCCESS({
              contact: response.Results[0],
            });
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Obtener Contacto de Cliente.',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // DOCS: Obtener contaco por correo de la orden de compra seleccionada
  fetchOrderContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.SET_PURCHASE_ORDER_SELECTED),
      withLatestFrom(this.store.select(purchasePromiseDetailsSelectors.selectedPurchaseOrder)),
      mergeMap(([action, order]) => {
        const params = new FiltersOnlyActive();
        params.Filters = [
          {
            NombreFiltro: 'IdContactoCliente',
            ValorFiltro: order.IdContactoCliente,
          },
        ];
        return this.contactServices.ContactoDetalleQueryResult(params).pipe(
          map((response: QueryResultContactoDetalleObj) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Obtener Contacto de Cliente.',
              ),
              response,
            );
            this.router.navigate([
              appRoutes.protected,
              appRoutes.pendings.pendings,
              appRoutes.purchasePromise.purchasePromise,
              appRoutes.purchasePromise.details,
            ]);
            return purchasePromiseDetailsActions.FETCH_CONTACT_CUSTOMER_SUCCESS({
              contact: response.Results[0],
            });
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Obtener Contacto de Cliente.',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  //DOCS: Obtiene cotizaciones del cliente para el carrousel
  fetchQuotations = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          purchasePromiseDetailsActions.FETCH_QUOTATIONS_LOAD,
          purchasePromiseDetailsActions.FETCH_QUOTES_CLIENT_OF_SEARCH, // DOCS: Se ejecuta al seleccionar un elemento la sugerencia de busqueda
        ),
        withLatestFrom(
          this.store.select(purchasePromiseDetailsSelectors.selectItemSearch),
          this.store.select(purchasePromiseDetailsSelectors.selectQuotationListQueryInfo),
        ),
        mergeMap(([action, product, params]) => {
          this.store.dispatch(
            purchasePromiseDetailsActions.SET_ESTATUS_SUMMARY_LIST({
              statusRequest: API_REQUEST_STATUS_LOADING,
            }),
          );
          return this.processPurchasePServices
            .vClienteCotizacionesPromesaDeCompraCarruselQueryResult(params)
            .pipe(
              map(
                (response: apiLogistic.QueryResultVClienteCotizacionesPromesaDeCompraCarrusel) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al Obtener las cotizaciones de Cliente.',
                    ),
                    response,
                  );
                  const quotations: Array<IPurchasePromiseQuotation> = _map(
                    response.Results,
                    (
                      o: apiLogistic.VClienteCotizacionesPromesaDeCompraCarrusel,
                      index: number,
                    ) => ({
                      ...o,
                      Index: index,
                      isSelected: index === 0,
                      items: [],
                      needsToReloadItems: true,
                      contact: {} as apiCatalogs.ContactoDetalleObj,
                    }),
                  );
                  this.store.dispatch(
                    purchasePromiseDetailsActions.FETCH_QUOTATIONS_SUCCESS({
                      quotations: {
                        TotalResults: response.TotalResults,
                        Results: quotations,
                      },
                    }),
                  );

                  //DOCS: Obtener el total para "Valor Total En Promesa"
                  if (action.type === '[Purchase-Promise-Details] Fetch Quotations Load') {
                    const total: number = sumBy(
                      quotations,
                      (quote: IPurchasePromiseQuotation) => quote?.TotalPromesaUSD,
                    );
                    this.store.dispatch(
                      purchasePromiseDetailsActions.SET_VALUE_TOTAL_IN_PROMISE({total}),
                    );
                  } else {
                    this.store.dispatch(
                      purchasePromiseDetailsActions.SET_SEE_RESUME_ACTIVE({
                        seeResumeActive: false,
                      }),
                    );
                  }

                  if (response.Results.length > 0) {
                    this.store.dispatch(
                      purchasePromiseDetailsActions.FETCH_QUOTED_ITEMS_LOAD({
                        quote: quotations[0],
                      }),
                    );
                    /*                   this.store.dispatch(
                      purchasePromiseDetailsActions.FETCH_CONTACT_LOAD({quote: quotations[0]}),
                    );*/
                    this.store.dispatch(
                      purchasePromiseDetailsActions.FETCH_FREIGHT_LOAD({
                        IdCotCotizacion: quotations[0]?.IdCotCotizacion,
                      }),
                    );
                  } else if (!isEmpty(product)) {
                    /* DOCS: Si hay un producto seleccionado de la sugerencia de busqueda que no se encuentra dentro de las cotizaciones
                          Va ir a buscar el producto en contratos
                      */
                    this.store.dispatch(
                      purchasePromiseDetailsActions.FETCH_PRODUCTS_IN_CONTRACT_LOAD(),
                    );
                  } else {
                    this.store.dispatch(
                      purchasePromiseDetailsActions.SET_ITEM_LIST_CONTRACT({
                        items: [],
                      }),
                    );
                  }
                  // this.store.dispatch(SET_LOADING({payload: false}));
                  this.store.dispatch(
                    purchasePromiseDetailsActions.SET_ESTATUS_SUMMARY_LIST({
                      statusRequest: API_REQUEST_STATUS_SUCCEEDED,
                    }),
                  );
                },
              ),
              catchError((error) => {
                this.store.dispatch(
                  purchasePromiseDetailsActions.SET_ESTATUS_SUMMARY_LIST({
                    statusRequest: API_REQUEST_STATUS_FAILED,
                  }),
                );
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al Obtener Contacto de Cliente.',
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

  // DOCS: OBTENER EL LISTADO DE LAS SUGERENCIAS DE PRODCUTOS EN LAS PARTIDAS (vPartidaCotizacion)
  fetchSuggestionProductsVPartidaCotizacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.FETCH_OPTIONS_OF_PRODUCTS_LOAD),
      withLatestFrom(
        this.store.select(purchasePromiseDetailsSelectors.selectSuggestionInQuotationQueryInfo),
      ),
      switchMap(([action, searchSuggestionParameters]) => {
        if (searchSuggestionParameters.NombreAtributo) {
          this.store.dispatch(
            purchasePromiseDetailsActions.SET_STATUS_API_PRODUCTS({
              status: API_REQUEST_STATUS_LOADING,
            }),
          );
          if (action.searchTerm) {
            return this.sistemaUXService
              .SugerenciasBusquedaProcess(searchSuggestionParameters)
              .pipe(
                map((response: SugerenciaBusqueda[]) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al obtener sugerencias de productos en las cotizaciones.',
                    ),
                    response,
                  );
                  return purchasePromiseDetailsActions.FETCH_OPTIONS_PRODUCTS_IN_QUOTATIONS_SUCCESS(
                    {
                      product: response,
                    },
                  );
                }),
                catchError((error) => {
                  this.logger.error(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al obtener sugerencias de productos en las cotizaciones.',
                    ),
                    error,
                  );
                  return of(
                    purchasePromiseDetailsActions.FETCH_OPTIONS_PRODUCTS_IN_QUOTATIONS_FAILED(),
                  );
                }),
              );
          } else {
            return EMPTY;
          }
        }
      }),
    ),
  );

  // DOCS: OBTENER EL LISTADO DE LAS SUGERENCIAS DE PRODCUTOS EN CONTRATO (vConfiguracionAplicadaCliente)
  fetchSuggestionProductsVConfiguracionAplicadaCliente$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.FETCH_OPTIONS_PRODUCTS_IN_QUOTATIONS_SUCCESS),
      withLatestFrom(
        this.store.select(purchasePromiseDetailsSelectors.selectSuggestionInContractQueryInfo),
      ),
      switchMap(([{product}, searchSuggestionParameters]) => {
        return this.sistemaUXService.SugerenciasBusquedaProcess(searchSuggestionParameters).pipe(
          map((response: SugerenciaBusqueda[]) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener sugerencias de productos en contrato.',
              ),
              response,
            );
            return purchasePromiseDetailsActions.FETCH_OPTIONS_PRODUCTS_IN_CONTRACT_SUCCESS({
              product: [...product, ...response],
            });
          }),
          catchError((error) => {
            this.logger.error(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener sugerencias de productos en contrato.',
              ),
              error,
            );
            return of(
              purchasePromiseDetailsActions.FETCH_OPTIONS_PRODUCTS_IN_CONTRACT_SUCCESS({
                product: [...product],
              }),
            );
          }),
        );
      }),
    ),
  );
  fetchItemsCatalog = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          purchasePromiseDetailsActions.FETCH_PRODUCTS_IN_CONTRACT_LOAD, // DOCS: Se ejecuta al momento de seleccionar un producto de las sugerencias de busqueda y que no se encuentre en las cotizaciones
          purchasePromiseDetailsActions.SET_RUN_SEARCH_TERM, //DOCS: Se ejecuta al presionar Enter en el buscador
        ),
        withLatestFrom(
          this.store.select(purchasePromiseDetailsSelectors.selectSuggestionInContractQueryInfo),
          this.store.select(purchasePromiseDetailsSelectors.selectQuotations),
          this.store.select(purchasePromiseDetailsSelectors.selectItemSearch),
          this.store.select(purchasePromiseDetailsSelectors.selectedClient),
          this.store.select(purchasePromiseDetailsSelectors.selectIdCatCurrency),
          this.store.select(purchasePromiseDetailsSelectors.selectCatalogQueryInfo),
          this.store.select(purchasePromiseDetailsSelectors.selectedPurchaseOrder),
        ),
        switchMap(
          ([
            action,
            searchSuggestionParameters,
            quotations,
            productSelected,
            client,
            idCatCurrency,
            queryInfoCatalog,
            orderSelected,
          ]) => {
            this.store.dispatch(
              purchasePromiseDetailsActions.SET_API_STATUS_ITEM_LIST({
                status: API_REQUEST_STATUS_LOADING,
                node: 'statusApiItemList',
              }),
            );
            this.store.dispatch(SET_LOADING({payload: true}));
            return this.sistemaUXService
              .SugerenciasBusquedaProcess(searchSuggestionParameters)
              .pipe(
                map(async (response: SugerenciaBusqueda[]) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al obtener los productos en contrato.',
                    ),
                    response,
                  );

                  function removeDuplicates(arr, prop) {
                    return arr.filter(
                      (obj, index, self) =>
                        index === self.findIndex((el) => el[prop] === obj[prop]),
                    );
                  }

                  const productsSuggested: SugerenciaBusqueda[] = removeDuplicates(response, 'Id');
                  const listProduct: IQuoteItem[] = [];
                  // for (const product of productsSuggested) {
                  for (let i = 0; i < productsSuggested?.length; i++) {
                    const payload = {
                      ...queryInfoCatalog,
                      Filters: [
                        ...queryInfoCatalog.Filters,
                        {
                          NombreFiltro: 'IdProducto',
                          ValorFiltro: productsSuggested[i].Id,
                        },
                      ],
                    };
                    const productInfo = await lastValueFrom(
                      this.configuracionProductosService.vProductoQueryResult(payload),
                    );

                    const paramsContract: ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContratoParams = {
                      piezas: 1,
                      idProducto: productsSuggested[i].Id,
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
                        paramsContract,
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
                        ...productInfo?.Results?.[0],
                        Index: i,
                        IdCotPartidaCotizacion: generateUuid(),
                        Programada: false,
                        NumeroDePiezas: 1,
                        isSelected: false,
                        PrecioCotizadoUnitarioConvertido:
                          configurationClientOffer?.PrecioCotizadoUnitarioConvertido,
                        PrecioIVA: configurationClientOffer?.PrecioIVA,
                        PrecioCotizadoSubtotal: configurationClientOffer?.PrecioCotizadoSubtotal,
                        PrecioCotizadoTotal: configurationClientOffer?.PrecioCotizadoTotal,
                        label: OF_CONTRACT,
                        TiempoEntrega: configurationClient.TiempoEntrega,
                        IdContratoCliente: null,
                        IdEmpresa: null,
                        TiempoEstimadoEntregaOriginal: configurationClient?.TiempoEntregaDias,
                        PrecioTotalUSD: configurationClient?.Precio,
                        PrecioTotalMXN: configurationClient?.Precio,
                        IdValorConfiguracionTiempoEntrega:
                          configurationClient.IdValorConfiguracionTiempoEntrega,
                        isInViewQuotesLinked: false,
                        PrecioCotizadoUnitarioPactado: configurationClient?.Precio,
                        TiempoEstimadoEntrega: configurationClient?.TiempoEntregaDias,
                        PrecioFleteNoDesglosado: 0,
                        freightItem: null,
                        Cancelacion: false,
                        Seguimiento: false,
                        PromesaDeCompra: false,
                        imageHover: `assets/Images/logos/${productInfo?.Results?.[0]?.NombreImagenMarca}_hover.svg`,
                        valuePriceOriginal: configurationClient?.Precio,
                        orderSelected,
                        ClaveMoneda: orderSelected?.ClaveMoneda,
                      });
                    }
                  }
                  this.store.dispatch(
                    purchasePromiseDetailsActions.SET_API_STATUS_ITEM_LIST({
                      status: API_REQUEST_STATUS_SUCCEEDED,
                      node: 'statusApiItemList',
                    }),
                  );
                  this.store.dispatch(
                    purchasePromiseDetailsActions.FETCH_QUOTATIONS_SUCCESS({
                      quotations: {
                        ...quotations,
                        Results: _map(quotations.Results, (o, index: number) => ({
                          ...o,
                          freightItem: null,
                          isSelected: false,
                        })),
                      },
                    }),
                  );
                  this.store.dispatch(
                    purchasePromiseDetailsActions.SET_ITEM_LIST_CONTRACT({
                      items: listProduct,
                    }),
                  );
                  this.store.dispatch(
                    purchasePromiseDetailsActions.SET_SEE_RESUME_ACTIVE({
                      seeResumeActive: false,
                    }),
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al obtener los productos en contrato.',
                    ),
                  );
                  this.store.dispatch(
                    purchasePromiseDetailsActions.SET_API_STATUS_ITEM_LIST({
                      status: API_REQUEST_STATUS_FAILED,
                      node: 'statusApiItemList',
                    }),
                  );
                  return of(SET_LOADING({payload: false}));
                }),
              );
          },
        ),
      ),
    {dispatch: false},
  );

  /*DOCS: Obtener partidas de cotizaciones*/
  fetchQuoteItems = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          purchasePromiseDetailsActions.FETCH_QUOTED_ITEMS_LOAD,
          purchasePromiseDetailsActions.FETCH_QUOTED_SELECT_ITEMS_LOAD,
        ),
        withLatestFrom(
          this.store.select(purchasePromiseDetailsSelectors.selectIdCatCurrency),
          this.store.select(purchasePromiseDetailsSelectors.selectedOrder),
          this.store.select(purchasePromiseDetailsSelectors.selectQuoteSelected),
        ),
        mergeMap(([action, idCatCurrency, order, quote]) => {
          const quotation =
            action.type === '[API Purchase-Promise-Details] Fetch Quote Items Load'
              ? action.quote
              : quote;
          if (!isEmpty(action.quote) && isEmpty(quotation.items)) {
            this.store.dispatch(
              purchasePromiseDetailsActions.SET_API_STATUS_ITEM_LIST({
                status: API_REQUEST_STATUS_LOADING,
                node: 'statusApiItemList',
              }),
            );
            const params = new FiltersOnlyActive();
            params.SortField = 'Numero';
            params.SortDirection = 'asc';
            params.Filters.push(
              {
                NombreFiltro: 'EnCerrarOferta',
                ValorFiltro: true,
              },
              {
                NombreFiltro: 'IdCotCotizacion',
                ValorFiltro: quotation.IdCotCotizacion, // Cambiar al obtener el seleccionado
              },
            );
            return this.cotizacionPartidasServices
              .PartidaCotizacionObjControlarPromesaDeCompra(params)
              .pipe(
                map((response) => {
                  const list: Array<IQuoteItem> = [];
                  for (let i = 0; i < response.Results.length; i++) {
                    const item = response.Results[i];
                    list.push({
                      ...item,
                      Index: i,
                      imageHover: `assets/Images/logos/${item?.NombreImagenMarca?.toLowerCase()}_hover.svg`,
                      isSelected: false,
                      label: null,
                      IdContratoCliente: null,
                      IdEmpresa: null,
                      isInViewQuotesLinked: false,
                      quotesLinked: [],
                      needsToReloadLinkeds: true,
                      EsFleteDesglosado: quotation?.FleteDesglosado,
                      valuePriceOriginal: item.PrecioCotizadoUnitarioPactado,
                    });
                  }
                  this.store.dispatch(
                    purchasePromiseDetailsActions.SET_API_STATUS_ITEM_LIST({
                      status: API_REQUEST_STATUS_SUCCEEDED,
                      node: 'statusApiItemList',
                    }),
                  );
                  this.store.dispatch(
                    purchasePromiseDetailsActions.FETCH_QUOTED_ITEMS_SUCCESS({
                      list,
                    }),
                  );
                }),
                catchError((erro) => {
                  this.store.dispatch(
                    purchasePromiseDetailsActions.SET_API_STATUS_ITEM_LIST({
                      status: API_REQUEST_STATUS_FAILED,
                      node: 'statusApiItemList',
                    }),
                  );
                  return EMPTY;
                }),
              );
          } else {
            this.store.dispatch(
              purchasePromiseDetailsActions.FETCH_QUOTED_ITEMS_SUCCESS({
                list: quotation.items,
              }),
            );
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );

  // TODO: REVISAR SI SE CONSERVA, YA QUE SE HIZO EL CAMBIO (EFFECT fetchOrderContact$) PARA QUE EL CONTACTO SE OBTENGA DE LA ORDEN DE COMPRA
  //DOCS: Contacto de coticación
  fetchContactQuote = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.FETCH_CONTACT_LOAD),
      withLatestFrom(
        this.store.select(purchasePromiseDetailsSelectors.selectQuoteSelected),
        this.store.select(purchasePromiseDetailsSelectors.selectQuotationsResults),
      ),
      mergeMap(([action, quote, quotes]) => {
        if (quote && !isEmpty(quote)) {
          const params = new FiltersOnlyActive();
          params.Filters = [
            {
              NombreFiltro: 'IdContactoCliente',
              ValorFiltro: quote.IdContactoCliente,
            },
          ];
          const hasContactClient: IPurchasePromiseQuotation = quotes.find(
            (it: IPurchasePromiseQuotation) => it.IdCotCotizacion === quote.IdCotCotizacion,
          );
          if (hasContactClient.contact?.IdContactoCliente) {
            return EMPTY;
          }
          return this.contactServices.ContactoDetalleQueryResult(params).pipe(
            map((response: QueryResultContactoDetalleObj) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al Obtener Contacto de Cliente.',
                ),
                response,
              );
              const contact = response.Results;
              return purchasePromiseDetailsActions.FETCH_CONTACT_SUCCESS({
                contact: contact.length > 0 ? contact[0] : {},
                IdCotCotizacion: quote.IdCotCotizacion,
              });
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al Obtener Contacto de Cliente.',
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
    ),
  );

  //DOCS: Consultas fletes de la cotización seleccionada
  fetchFreightQuote = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.FETCH_FREIGHT_LOAD),
      withLatestFrom(this.store.select(purchasePromiseDetailsSelectors.selectQuotations)),
      mergeMap(([{IdCotCotizacion}, quotations]) => {
        const quotation: IPurchasePromiseQuotation = quotations.Results.find(
          (it) => it.IdCotCotizacion === IdCotCotizacion,
        );
        if (quotation?.FleteExpress || quotation?.FletesUltimaMilla) {
          return EMPTY;
        }

        if (IdCotCotizacion) {
          return this.procesosL01CotizacionAtenderCierreService
            .GMCotFletesProcess(IdCotCotizacion)
            .pipe(
              map((response: apiLogistic.GMCotFletes) => {
                this.store.dispatch(SET_LOADING({payload: false}));
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al Obtener Contacto de Cliente.',
                  ),
                  response,
                );
                return purchasePromiseDetailsActions.FETCH_FREIGHT_SUCCESS({
                  fletes: response,
                  IdCotCotizacion: IdCotCotizacion,
                });
              }),
              catchError((error) => {
                this.store.dispatch(SET_LOADING({payload: false}));
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al Obtener Contacto de Cliente.',
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
    ),
  );

  // DOCS: Obtener ordenes de compra
  fetchPurchaseOrdersPromise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        purchasePromiseDetailsActions.SET_CUSTOMER_SELECTED_SUCCESS,
        purchasePromiseDetailsActions.CLOSE_SALE_WITH_OC_SUCCESS,
        purchasePromiseDetailsActions.FETCH_PURCHASE_ORDERS_LOAD,
        purchasePromiseDetailsActions.SET_OC_SEARCH_TERM,
        purchasePromiseDetailsActions.SET_SELECTED_OC_BURGER_OPTION,
      ),
      withLatestFrom(
        this.store.select(purchasePromiseDetailsSelectors.selectParamsPurchaseOrder),
        this.store.select(purchasePromiseDetailsSelectors.selectorSummaryList),
      ),
      mergeMap(([action, filters, itemList]) => {
        if (filters.reloadStates) {
          this.store.dispatch(purchasePromiseDetailsActions.RESET_PURCHASE_PROMISE_LIST());
        }
        this.store.dispatch(
          purchasePromiseDetailsActions.SET_API_STATUS_REQUEST({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.processPurchasePServices.vPromesaDeCompraQueryResult(filters).pipe(
          map((response: QueryResultVPromesaDeCompra) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Obtener Ordenes de Compra.',
              ),
              response,
            );

            if (isEmpty(response.Results) && action.type === closeSaleSuccessType) {
              this.router.navigate([
                appRoutes.protected,
                appRoutes.pendings.pendings,
                appRoutes.purchasePromise.purchasePromise,
              ]);
              // DOCS: Se agrega el return para detener los procesos restantes del effect.
              return purchasePromiseDetailsActions.PURCHASE_ORDERS_EMPTY();
            }
            const results = addRowIndex(filters.desiredPage, filters.pageSize, response.Results);

            if (filters.desiredPage === 1) {
              const itemO = {
                ...results[0],
                selectedOrder: true,
                selectedPurchaseSearchOption: {} as DropListOption,
                purchaseSearchTerm: null,
                seeResumeActive: false,
                mailData: {} as IMail,
              };
              this.store.dispatch(
                purchasePromiseDetailsActions.SET_PURCHASE_ORDER_SELECTED({
                  item: itemO,
                }),
              );
            }
            this.store.dispatch(
              purchasePromiseDetailsActions.SET_API_STATUS_REQUEST({
                status: API_REQUEST_STATUS_SUCCEEDED,
              }),
            );
            return purchasePromiseDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS({
              data: {
                TotalResults: response.TotalResults,
                Results: _map(results, (item) => {
                  return {
                    ...item,
                    selectedOrder: false,
                    selectedPurchaseSearchOption: {} as DropListOption,
                    purchaseSearchTerm: null,
                    seeResumeActive: false,
                    mailData: {} as IMail,
                  };
                }),
              },
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Obtener Ordenes de Compra.',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  //DOCS:  Obtener la información de la Orden compra seleccionada (NUEVA FORMA)

  fetchRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.SET_PURCHASE_ORDER_SELECTED),
      mergeMap((action) => {
        if (action.item.IdCorreoRecibidoCliente && isEmpty(action.item.mailData)) {
          this.store.dispatch(
            purchasePromiseDetailsActions.SET_STATUS_API_REQUEST({
              status: API_REQUEST_STATUS_LOADING,
            }),
          );
          return this.processMailBotService
            .CorreoRecibidoClienteRequerimientoObtener(action.item.IdCorreoRecibidoCliente)
            .pipe(
              map((response: CorreoRecibidoClienteRequerimientoObj) => {
                this.store.dispatch(SET_LOADING({payload: false}));
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al Obtener los requerimientos del cliente.',
                  ),
                  response,
                );
                this.store.dispatch(
                  purchasePromiseDetailsActions.SET_STATUS_API_REQUEST({
                    status: API_REQUEST_STATUS_SUCCEEDED,
                  }),
                );
                return purchasePromiseDetailsActions.FETCH_MAIL_PURCHASE_SUCCESS({
                  mail: response,
                  idPPedido: action.item.IdPPPedido,
                });
              }),
              catchError((error) => {
                this.store.dispatch(SET_LOADING({payload: false}));
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al Obtener los requerimientos del cliente.',
                  ),
                  error,
                );
                this.store.dispatch(purchasePromiseDetailsActions.FETCH_MAIL_ERROR(error));
                return EMPTY;
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  // Ver el archivo
  viewFileRequest = createEffect(
    () =>
      this.actions$.pipe(
        ofType(purchasePromiseDetailsActions.VIEW_FILE_LOAD),
        mergeMap((action) => {
          this.store.dispatch(purchasePromiseDetailsActions.VIEW_FILE_IS_LOADING({value: true}));
          this.appService.setFile({isLoading: true});
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response) => {
              let base64 = null;
              if (response && response.Url) {
                if (isPdf(action.ext)) {
                  base64 = await convertPDFFileFromURLToBase64(response.Url, true);
                }
                if (isImage(action.ext)) {
                  base64 = await getBase64FromUrl(response.Url, action.ext);
                }
              }

              this.store.dispatch(
                purchasePromiseDetailsActions.VIEW_FILE_SUCCESS({
                  fileBase64: base64,
                }),
              );
              this.appService.setFile({
                ...response,
                nombre: getNameFile(response?.FileKey),
                archivoBase64: base64,
                isPdf: isPdf(action.ext),
                isLoading: false,
              });

              this.store.dispatch(
                purchasePromiseDetailsActions.VIEW_FILE_IS_LOADING({
                  value: false,
                }),
              );
            }),
            catchError((error) => {
              return of(purchasePromiseDetailsActions.VIEW_FILE_ERROR());
            }),
          );
        }),
      ),
    {dispatch: false},
  );
  // Agregar partida a resumen
  addSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.ADD_ITEMS_SUMMARY_LOAD),
      withLatestFrom(
        this.store.select(purchasePromiseDetailsSelectors.selectSummaryListBackUp),
        this.store.select(purchasePromiseDetailsSelectors.selectPurchaseSelected),
      ),
      mergeMap(([action, list, order]) => {
        if (list && list.length > 0) {
          this.store.dispatch(SET_LOADING({payload: true}));
          // pcPartidaPromesaDeCompraGuardarOActualizar
          const request = list.map((entry: IQuoteItem) =>
            this.processPurchasePServices.pcPartidaPromesaDeCompraGuardarOActualizar({
              Activo: true,
              FechaRegistro: DEFAULT_DATE,
              FechaUltimaActualizacion: DEFAULT_DATE,
              IdCotPartidaCotizacion:
                entry.label === 'De Contrato' || entry.label === 'De Catálogo'
                  ? null
                  : entry.IdCotPartidaCotizacion,
              IdPcPartidaPromesaDeCompra: DEFAULT_UUID,
              IdPcPromesaDeCompra: order.IdPcPromesaDeCompra,
              IdProducto: entry.IdProducto,
              IdValorConfiguracionTiempoEntrega: entry.IdValorConfiguracionTiempoEntrega
                ? entry.IdValorConfiguracionTiempoEntrega
                : null,
              Numero: entry.Numero ? entry.Numero : null,
              NumeroDePiezas: entry.NumeroDePiezas,
              PrecioTotalUSD: 0,
              Verificada: true,
              // TODO:Propiedades faltantes
              PrecioUnitarioMonedaCliente: null,
              Observaciones: false,
              PorcentajeVariacionPrecio: null,
              DeContrato: entry.label === 'De Contrato',
              // DOCS:Total calculado
              PrecioTotal: order.USD ? entry.PrecioTotalUSD : entry.PrecioTotalMXN,
            }),
          );
          return forkJoin(request).pipe(
            map((response) => {
              // this.logger.debug(
              //   servicesLogger.generateMessage(
              //     FILE_NAME,
              //     servicesLogger.LOG_SUCCEEDED,
              //     'Al agregar en resumen.',
              //   ),
              //   response,
              // );
              this.store.dispatch(SET_LOADING({payload: false}));
              return purchasePromiseDetailsActions.ADD_ITEMS_SUMMARY_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al agregar en resumen.',
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
  // Obtener Orden de compra actualizada
  fetchPurchaseOrderPromiseUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        purchasePromiseDetailsActions.ADD_ITEMS_SUMMARY_SUCCESS,
        purchasePromiseDetailsActions.DELETE_ITEM_SUMMARY_SUCCESS,
        purchasePromiseDetailsActions.FETCH_SUMMARY_LIST_SUCCESS,
      ),
      withLatestFrom(this.store.select(purchasePromiseDetailsSelectors.selectPurchaseSelected)),
      mergeMap(([action, order]) => {
        const body = new FiltersOnlyActive(true);
        body.Filters.push({
          NombreFiltro: 'IdPcPromesaDeCompra',
          ValorFiltro: order.IdPcPromesaDeCompra,
        });
        return this.processPurchasePServices.vPromesaDeCompraQueryResult(body).pipe(
          map((response: apiLogistic.QueryResultVPromesaDeCompra) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Obtener la Orden de Compra actualizada.',
              ),
              response,
            );

            return purchasePromiseDetailsActions.FETCH_PURCHASE_ORDER_UPDATE_SUCCESS({
              order: response.Results[0],
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Obtener la Ordene de Compra actualizada.',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );
  // Obtener partidas en resumen
  fetchSummaryList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.FETCH_SUMMARY_LIST_LOAD),
      withLatestFrom(
        this.store.select(purchasePromiseDetailsSelectors.selectPurchaseSelected),
        this.store.select(purchasePromiseDetailsSelectors.selectSummaryList),
      ),
      mergeMap(([action, order, items]) => {
        if (items.length === order.Partidas && !action.ignoreLength) {
          return EMPTY;
        }
        this.store.dispatch(
          purchasePromiseDetailsActions.SET_API_STATUS_ITEM_LIST({
            status: API_REQUEST_STATUS_LOADING,
            node: 'statusApiSummaryList',
          }),
        );
        const params = new FiltersOnlyActive();
        params.Filters.push({
          NombreFiltro: 'IdPcPromesaDeCompra',
          ValorFiltro: order.IdPcPromesaDeCompra,
        });
        params.SortField = 'Numero';
        params.SortDirection = 'asc';
        return this.processPurchasePServices.vPartidaPromesaDeCompraQueryResult(params).pipe(
          map((response: apiLogistic.QueryResultVPartidaPromesaDeCompra) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las partidas en resumen.',
              ),
              response,
            );

            const summaryList: IQuotesSummary = {
              TotalResults: response.TotalResults,
              Results: _map(response.Results, (o: apiLogistic.VPartidaPromesaDeCompra) => ({
                ...o,
                tempUnitPrice: Number(o.PrecioUnitario.toFixed(2)),
                tempQuantity: o.NumeroDePiezas,
                quantityInputIsOpen: false,
                priceInputIsOpen: false,
                incidence: {
                  Activo: true,
                  Catalogo: false,
                  Comentarios: '',
                  Descripcion: false,
                  FechaRegistro: DEFAULT_DATE,
                  FechaUltimaActualizacion: DEFAULT_DATE,
                  IdPcIncidenciaPartidaPromesaDeCompra: DEFAULT_UUID,
                  IdPcPartidaPromesaDeCompra: o.IdPcPartidaPromesaDeCompra,
                  Marca: false,
                  Moneda: false,
                  Precio: false,
                  Presentacion: false,
                  TEE: false,
                },
                isInViewQuotesLinked: false,
                quotesLinked: [],
                needsToReloadLinkeds: true,
              })),
            };

            this.store.dispatch(
              purchasePromiseDetailsActions.SET_API_STATUS_ITEM_LIST({
                status: API_REQUEST_STATUS_SUCCEEDED,
                node: 'statusApiSummaryList',
              }),
            );

            return purchasePromiseDetailsActions.FETCH_SUMMARY_LIST_SUCCESS({
              data: summaryList,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener las partidas en resumen.',
              ),
              error,
            );
            this.store.dispatch(
              purchasePromiseDetailsActions.SET_API_STATUS_ITEM_LIST({
                status: API_REQUEST_STATUS_FAILED,
                node: 'statusApiSummaryList',
              }),
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );
  // Eliminar partida de resumen
  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.DELETE_ITEM_SUMMARY_LOAD),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        // Reemplazar el'id' por el idPcPartidaPromesaDeCompra
        return this.processPurchasePServices
          .pcPartidaPromesaDeCompraDesactivar(action.item.IdPcPartidaPromesaDeCompra)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar una partida en resumen.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                purchasePromiseDetailsActions.FETCH_SUMMARY_LIST_LOAD({
                  ignoreLength: true,
                }),
              );
              return purchasePromiseDetailsActions.DELETE_ITEM_SUMMARY_SUCCESS();
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al eliminar una partida en resumen.',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );
  // Cambiar precio a una partida
  updatePrice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.UPDATE_PRICE_QUANTITY_ITEM_LOAD),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.processPurchasePServices
          .pcPartidaPromesaDeCompraGuardarOActualizar(action.item)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al modificar el precio de una partida.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                purchasePromiseDetailsActions.FETCH_SUMMARY_LIST_LOAD({
                  ignoreLength: true,
                }),
              );
              return purchasePromiseDetailsActions.UPDATE_PRICE_QUANTITY_ITEM_SUCCESS();
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al modificar el precio de una partida.',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );
  // Obtener totales
  fetchTotals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.FETCH_TOTALS_LOAD),
      withLatestFrom(this.store.select(purchasePromiseDetailsSelectors.selectPurchaseSelected)),
      mergeMap(([action, order]) => {
        const params = new FiltersOnlyActive();
        params.Filters.push({
          ValorFiltro: order.IdPcPromesaDeCompra,
          NombreFiltro: 'IdPcPromesaDeCompra',
        });
        return this.processPurchasePServices.vPromesaDeCompraQueryResult(params).pipe(
          map((response) => {
            return purchasePromiseDetailsActions.FETCH_TOTALS_SUCCESS({
              result: response,
            });
          }),
        );
      }),
    ),
  );

  // DOCS: OBTIENE PARTIDAS VINCULADAS
  itemsLinked$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(purchasePromiseDetailsActions.SET_ITEM_LINKED),
        withLatestFrom(
          this.store.select(purchasePromiseDetailsSelectors.selectedClient),
          this.store.select(purchasePromiseDetailsSelectors.selectSeeResumeActive),
        ),
        mergeMap(([action, client, seeResumeActive]) => {
          const params = new FiltersOnlyActive();
          if (seeResumeActive) {
            params.Filters.push({
              NombreFiltro: 'IdPcPartidaPromesaDeCompra',
              ValorFiltro: action.item.IdPcPartidaPromesaDeCompra,
            });
          } else {
            params.Filters.push(
              {
                NombreFiltro: 'IdCliente',
                ValorFiltro: client.IdCliente,
              },
              {
                NombreFiltro: 'IdProducto',
                ValorFiltro: action.item.IdProducto,
              },
              {
                NombreFiltro: 'Caducada',
                ValorFiltro: false,
              },
              {
                NombreFiltro: 'NoIdCotCotizacion',
                ValorFiltro: action.item.IdCotPartidaCotizacion,
              },
            );
          }
          if (action.item.needsToReloadLinkeds) {
            return this.procesosCotizacionService.vCotCotizacionQueryResult(params).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener las información extra de la cotización.',
                  ),
                  response,
                );
                if (response.TotalResults === 1) {
                  this.store.dispatch(
                    purchasePromiseDetailsActions.SET_OPEN_VIEW_FILE({
                      active: true,
                    }),
                  );
                  this.store.dispatch(
                    purchasePromiseDetailsActions.UPDATE_ITEM_LIST({
                      IdCotPartidaCotizacion: action.item.IdCotPartidaCotizacion,
                      linkedQuotes: response.Results,
                    }),
                  );
                  this.store.dispatch(
                    purchasePromiseDetailsActions.SET_ID_ARCHIVO_PDF({
                      IdArchivo: response.Results[0].IdArchivoPDF,
                    }),
                  );
                } else {
                  if (seeResumeActive) {
                    this.store.dispatch(
                      purchasePromiseDetailsActions.UPDATE_SUMMARY_LIST({
                        linkedQuotes: response.Results,
                        IdPcPartidaPromesaDeCompra: action.item.IdPcPartidaPromesaDeCompra,
                      }),
                    );
                  } else {
                    this.store.dispatch(
                      purchasePromiseDetailsActions.UPDATE_ITEM_LIST({
                        IdCotPartidaCotizacion: action.item.IdCotPartidaCotizacion,
                        linkedQuotes: response.Results,
                      }),
                    );
                  }
                }
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener las información extra de la cotización.',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
          } else {
            this.store.dispatch(
              purchasePromiseDetailsActions.UPDATE_ITEM_LIST({
                IdCotPartidaCotizacion: action.item.IdCotPartidaCotizacion,
                linkedQuotes: [],
              }),
            );
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );

  // DOCS: Descarga el archivo vinculado seleccionado
  getIDArchivoDetalle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(purchasePromiseDetailsActions.SET_ID_ARCHIVO_PDF),
        mergeMap((action) => {
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map((response) => {
              const splits = response.FileKey.split('.');
              const ext = splits[splits.length - 1];
              this.store.dispatch(
                purchasePromiseDetailsActions.VIEW_FILE_LOAD({
                  IdArchivo: response.IdArchivo,
                  ext,
                }),
              );
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  // DOCS: Envia la transacción
  closeSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.CLOSE_SALE_WITH_OC_LOAD),
      withLatestFrom(
        this.store.select(purchasePromiseDetailsSelectors.selectedPurchasePromise),
        this.store.select(purchasePromiseDetailsSelectors.selectPurchaseOrders),
        this.store.select(purchasePromiseDetailsSelectors.selectedClient),
        this.store.select(purchasePromiseDetailsSelectors.selectedPurchaseOrder),
        this.store.select(purchasePromiseDetailsSelectors.isFreightFull),
      ),
      switchMap(
        ([
          action,
          selectedPurchasePromise,
          selectPurchaseOrders,
          selectedClient,
          purchaseOrderSelected,
          isFreightFull,
        ]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          return this.processPurchasePServices
            .pcPromesaDeCompraExtensionsProcessTransaccion(
              buildParamsGMPartidaPromesaDeCompra(
                selectedPurchasePromise,
                purchaseOrderSelected,
                isFreightFull,
              ),
            )
            .pipe(
              map((data: GMPretramitarPromesaDeCompra) => {
                // DOCS: Si hay mas de la promesa actual de compra, solo recargamos la informacion de purchase-oderder-details.component.ts
                if (selectPurchaseOrders.Results.length > 1) {
                  // Selecciona el cliente
                  this.store.dispatch(
                    purchasePromiseDetailsActions.SET_CUSTOMER_SELECTED_SUCCESS({
                      customer: {
                        ...selectedClient,
                      },
                    }),
                  );
                  // Contacto de cliente
                  this.store.dispatch(
                    purchasePromiseDetailsActions.FETCH_CONTACT_CUSTOMER_LOAD({
                      idCustomer: selectedClient.DescripcionLlave,
                    }),
                  );
                  // Obtiene las cotizaciones
                  this.store.dispatch(
                    purchasePromiseDetailsActions.FETCH_QUOTATIONS_LOAD({
                      DescripcionLlave: selectedClient.DescripcionLlave,
                    }),
                  );
                }

                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(
                  utilsActions.SET_LOADING_SUCCESS({
                    active: true,
                    message: 'Has cerrado la venta',
                  }),
                );
                return purchasePromiseDetailsActions.CLOSE_SALE_WITH_OC_SUCCESS();
              }),
              catchError((data) => {
                return EMPTY;
              }),
            );
        },
      ),
    ),
  );

  // DOCS: OBTIENE FECHAS INHÁBILES PARA ENTREGA
  fetchNonWorkingDays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.SELECTED_IQUOTE_ITEM),
      withLatestFrom(this.store.select(purchasePromiseDetailsSelectors.selectQuoteSelected)),
      mergeMap(([{item}, quote]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const toDate: Date = new Date();
        toDate.setFullYear(toDate.getFullYear() + 2);
        const params: DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoParams = {
          idDireccionCliente: quote?.IdDireccionCliente,
          desde: currentDateWithoutHoursUTCFormat(),
          hasta: getDateWithoutHoursUTCFormat(toDate),
        };
        return this.configuracionClientesDirecciones
          .DireccionClienteExtensionsFechasNoSePuedeEntregarPedido(params)
          .pipe(
            map((response: QueryResultDateTime) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener dias inhabiles',
                ),
                response,
              );
              return purchasePromiseDetailsActions.FETCH_NON_WORKING_DAYS_SUCCESS({
                nonWorkingDays: response.Results,
              });
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener dias inhabiles',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS: ACTUALIZA LA REFERENCIA DE LA PROMESA DE COMPRA
  updateReference$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasePromiseDetailsActions.SET_UPDATE_REFERENCE_LOAD),
      withLatestFrom(
        this.store.select(purchasePromiseDetailsSelectors.selectPurchaseSelected),
        this.store.select(purchasePromiseDetailsSelectors.selectedClient),
      ),
      mergeMap(([{reference}, purchasePromise, client]) => {
        if (reference === purchasePromise.OrdenDeCompra) {
          return EMPTY;
        }
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.processPurchasePServices
          .pcPromesaDeCompraExtensionsActulizarRefecrenciaOrdenDeCompra({
            IdCliente: client.IdCliente,
            NuevaReferenciaOC: reference,
            IdPcPromesaDeCompra: purchasePromise.IdPcPromesaDeCompra,
          })
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Actualizar la referencia de la promesa de compra',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return purchasePromiseDetailsActions.SET_UPDATE_REFERENCE_SUCCESS({reference});
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Actualizar la referencia de la promesa de compra',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );
}
