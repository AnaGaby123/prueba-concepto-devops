// Core
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
// Librerías
import {EMPTY, forkJoin, lastValueFrom, Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {find, forEach, isEmpty, map as _map} from 'lodash-es';
import {NGXLogger} from 'ngx-logger';
// Store
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as apiCatalogs from 'api-catalogos';
import {
  ArchivoDetalle,
  CatalogosService,
  CatEstadoCotizacion,
  ConfiguracionClientesConfiguracionService,
  ConfiguracionClientesContratoService,
  ConfiguracionClientesService,
  ConfiguracionContactosService,
  ConfiguracionContratoCliente,
  ConfiguracionDireccionesService,
  ConfiguracionProductosService,
  ConfiguracionProductosWizardContenidoService,
  Direccion,
  QueryResultContactoDetalleObj,
  QueryResultVCliente,
  QueryResultVProducto,
  SistemaUsuariosService,
  SistemaUXService,
  SugerenciaBusqueda,
  VProducto,
  VProductoDetalle,
} from 'api-catalogos';
import {
  CorreoRecibidoClienteRequerimientoObj,
  CotPartidaCotizacionCapacitacionFecha,
  CotPartidaInvetigacionAtencionComentariosObj,
  CotProductoOferta,
  GMCotCotizacionCambioMoneda,
  GMCotCotizacionDetalle,
  GMCotProductoOferta,
  GMPartidaInvestigacionCotizador,
  GMProductoOfertaPieza,
  ProcesosL01CotizacionPartidasDesglosesService,
  ProcesosL01CotizacionPartidasService,
  ProcesosL01CotizacionService,
  ProcesosMailbotService,
  QueryResultVCotCotizacion,
} from 'api-logistica';
import {FiltersOnlyActive, queryInfoWithActiveFilter} from '@appModels/filters/Filters';
import {
  ENUM_STATUS_INVESTIGATION_ITEM,
  ICotPartidasInvetigacionCotizacion,
  IGMCotCotizacionDetalle,
  IGMCotPartidasDetalle,
  IInvestigationProductData,
  IQuotation,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {
  checkOutQuotationActions,
  listQuotesActions,
  quotationDetailsActions,
} from '@appActions/quotation';
import {UPDATE_STATUS_MAIL} from '@appActions/quotation/quotation.dashboard/quotation-dashboard.actions';
import * as utilsActions from '@appActions/utils/utils.action';
import {
  DOWLOAD_FILE_LOAD,
  RETURN_EMPTY,
  SET_LOADING,
  SET_LOADING_ERROR,
} from '@appActions/utils/utils.action';
import {quotationDetailsSelectors, resumeSectionSelectors} from '@appSelectors/quotation';
import * as clientCatalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {selectTipoTelefono} from '@appSelectors/catalogs/catalogs.selectors';
// Helpers
import {addRowIndex, getNameFile, isImage, isPdf} from '@appUtil/util';
import {API_REQUEST_STATUS_SUCCEEDED, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import * as servicesLogger from '@appUtil/logger';
import {
  bodyPrice,
  buildCotPartidaInvetigacionAtencionComentariosObj,
  buildCotQuotation,
  buildCotQuotationDetails,
  buildCotQuotationSaving,
  buildGeneralData,
  buildQueryOffers,
  buildQueryOffersInvestigationAttended,
  buildQueryOffersInvestigationFinished,
  buildQuotationsListFromResponse,
  CatQuotationState,
  patchContacts,
  patchContactsMail,
  QuotationItemTypes,
} from '@appHelpers/pending/quotation/quotation.helpers';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';
import {appRoutes} from '@appHelpers/core/app-routes';
import {IQueryResultVCliente} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';
import {buildClientsListAfterResponse} from '@appHelpers/catalogs/clients/clients-list.helpers';
import {Archivo} from 'api-finanzas';
import {buildImageNameSave} from '@appUtil/strings';
import {GET_OPTIONS_OF_PRODUCTS_ACTION} from '@appActions/quotation/quotation-details/details/list-quotes/list-quotes.actions';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';
import {convertPDFFileFromURLToBase64, getBase64FromUrl} from '@appUtil/files';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {MatDialog} from '@angular/material/dialog';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {AddRealizationDatesPopUpComponent} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-training/add-realization-dates-pop-up/add-realization-dates-pop-up.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import CotProductoOfertaGetCotProductoOfertaTemporalParams = ProcesosL01CotizacionPartidasDesglosesService.CotProductoOfertaGetCotProductoOfertaTemporalParams;
import {selectProductDataInvestigation} from '@appSelectors/quotation/quotation-details/quotation-details.selectors';

const FILE_NAME = 'quotations-details.effects.ts';

@Injectable()
export class QuotationDetailsEffects {
  constructor(
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private store: Store<AppState>,
    private addressesConfigurationService: ConfiguracionDireccionesService,
    private catalogsService: CatalogosService,
    private clientsConfigurationService: ConfiguracionClientesService,
    private clientsContractsConfigurationService: ConfiguracionClientesContratoService,
    private clientsSettingsConfigurationService: ConfiguracionClientesConfiguracionService,
    private contactsConfigurationService: ConfiguracionContactosService,
    private processes01QuotationBreakdownItemsService: ProcesosL01CotizacionPartidasDesglosesService,
    private processes01QuotationItemsService: ProcesosL01CotizacionPartidasService,
    private processes01QuotationService: ProcesosL01CotizacionService,
    private productsConfigurationService: ConfiguracionProductosService,
    private productsConfigurationWizardService: ConfiguracionProductosWizardContenidoService,
    private usersSystemService: SistemaUsuariosService,
    private uxSystemService: SistemaUXService,
    private processMailBoxService: ProcesosMailbotService,
    private systemFileServices: apiCatalogs.SistemaArchivosService,
    private appService: CoreContainerService,
    private dialog: MatDialog,
  ) {}

  // DOCS: Obtiene las cotizaciones del cliente seleccionado
  fetchClientsQuotations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.SET_SELECTED_CLIENT),
      withLatestFrom(this.store.select(quotationDetailsSelectors.selectQuotationsListQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        return this.processes01QuotationService.vCotCotizacionQueryResult(queryInfo).pipe(
          map((response: QueryResultVCotCotizacion) => {
            // this.store.dispatch(SET_LOADING({payload: true}));
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener las cotizaciones del cliente.',
              ),
            );
            const quotationsList = buildQuotationsListFromResponse(response.Results);
            return quotationDetailsActions.FETCH_QUOTATIONS_LIST_SUCCESS({
              quotationsList,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener las cotizaciones del cliente.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(quotationDetailsActions.FETCH_QUOTATIONS_LIST_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: OBTIENE EL LISTADO DE CLIENTES
  fetchClients = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.SET_SEARCH_TERM_CLIENT),
      withLatestFrom(this.store.select(quotationDetailsSelectors.selectQueryInfoClientList)),
      mergeMap(([action, queryInfo]) => {
        return this.clientsConfigurationService.vClienteQueryResult(queryInfo).pipe(
          map((response: QueryResultVCliente) => {
            const clientImage: IQueryResultVCliente = buildClientsListAfterResponse(response);
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener la lista de clientes',
              ),
              response,
            );
            return quotationDetailsActions.FETCH_CAT_CLIENTS_SUCCESS({
              response: clientImage,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener la lista de clientes',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(quotationDetailsActions.FETCH_CAT_CLIENTS_FAILED({error}));
          }),
        );
      }),
    ),
  );
  /* DOCS: Obtiene el detalle y partidas de la cotización seleccionada*/
  getQuotationDetailsItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.FETCH_CLIENT_INFO_FOR_SELECTED_QUOTATION_SUCCESS),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedQuotation),
        this.store.select(quotationDetailsSelectors.selectOptionSwitch),
        this.store.select(quotationDetailsSelectors.selectedQuotationStatus),
      ),
      mergeMap(([action, selectedQuotation, optionsSwitch, {EstadoCotizacion}]) => {
        /* DOCS: Navega a la ruta correcta de acuerdo al estado de la cotización*/
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.quoter.quoter,
          appRoutes.quoter.details,
          appRoutes.quoter.main,
          EstadoCotizacion === CatQuotationState.Enviada ||
          selectedQuotation?.CotizacionDeInvestigacion ||
          selectedQuotation?.EnviadaConInvestigacion
            ? appRoutes.quoter.sent
            : appRoutes.quoter.notSent,
        ]);

        if (!selectedQuotation.needsToReloadInfo) {
          return EMPTY;
        }
        return this.processes01QuotationService
          .cotCotizacionObtenerGMCotCotizacion(selectedQuotation?.IdCotCotizacion)
          .pipe(
            map((response: GMCotCotizacionDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el detalle y las partidas de la cotización seleccionada.',
                ),
                response,
              );
              // DOCS Se seleccionara por defecto total para evitar validaciones extra y solo se respetara el IdCatTipoCotizacion si es diferente a nulo
              const totalQuotation: DropListOption = find(
                optionsSwitch,
                (o: DropListOption) => o.labelKey === 'total',
              );
              const GMQuotation: GMCotCotizacionDetalle = {
                ...response,
                CotCotizacion: {
                  ...response.CotCotizacion,
                  IdCatTipoCotizacion: response.CotCotizacion.IdCatTipoCotizacion
                    ? response.CotCotizacion.IdCatTipoCotizacion
                    : totalQuotation.value,
                },
              };
              return GMQuotation;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el detalle y las partidas de la cotización seleccionada.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(SET_LOADING({payload: false}));
            }),
          );
      }),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedAddressDelivery),
        this.store.select(quotationDetailsSelectors.selectedQuotation),
        this.store.select(quotationDetailsSelectors.selectedQuotationStatus),
      ),
      // DOCS Obtiene las ofertas más actuales para todas las partidas
      switchMap(
        ([quotationDetail, addressClient, selectedQuotation, {EstadoCotizacion}]: [
          GMCotCotizacionDetalle,
          Direccion,
          IQuotation,
          CatEstadoCotizacion,
        ]) => {
          const queryOffer: GMCotProductoOferta = buildQueryOffers(
            quotationDetail.CotPartidasCotizacion,
            selectedQuotation,
          );
          if (
            queryOffer.Productos.length &&
            EstadoCotizacion !== CatQuotationState.Enviada &&
            !selectedQuotation.EnviadaConInvestigacion &&
            !selectedQuotation.CotizacionDeInvestigacion
          ) {
            return this.processes01QuotationBreakdownItemsService
              .cotProductoOfertaGetsCotProductoOfertaTemporal(queryOffer)
              .pipe(
                map((response: Array<CotProductoOferta>) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al recuperar las multiples ofertas',
                    ),
                    response,
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                  this.store.dispatch(
                    quotationDetailsActions.FETCH_SELECTED_QUOTATION_DETAILS_SUCCESS({
                      selectedQuotationDetails: buildCotQuotationDetails(
                        quotationDetail,
                        addressClient,
                        EstadoCotizacion,
                        response,
                      ),
                    }),
                  );
                  return RETURN_EMPTY();
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al recuperar las multiples ofertas',
                    ),
                    error,
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                  return of(SET_LOADING({payload: false}));
                }),
              );
          }
          this.store.dispatch(SET_LOADING({payload: false}));
          return of(
            quotationDetailsActions.FETCH_SELECTED_QUOTATION_DETAILS_SUCCESS({
              selectedQuotationDetails: buildCotQuotationDetails(
                quotationDetail,
                addressClient,
                EstadoCotizacion,
              ),
            }),
          );
        },
      ),
    ),
  );

  /* DOCS: Obtiene el arreglo de partidas de investigación atendidas para obtener su detalle*/
  addItemsInvestigationToQuotation = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.FETCH_SELECTED_QUOTATION_DETAILS_SUCCESS),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedQuotation),
        this.store.select(quotationDetailsSelectors.selectValidationInvestigationAttended),
        this.store.select(quotationDetailsSelectors.selectValidationInvestigationFinished),
      ),
      mergeMap(([action, selectedQuotation, investigationAttended, investigationFinished]) => {
        if (
          selectedQuotation.needsToReloadItemsInvestigationQuotation &&
          selectedQuotation.InvestigacionesFinalizadas &&
          (selectedQuotation.EnviadaConInvestigacion ||
            selectedQuotation.CotizacionDeInvestigacion) &&
          (investigationAttended.length || investigationFinished.length) &&
          !selectedQuotation.selectedQuotationDetails.CotCotizacion.SeGuardanPartidasInvestigacion
        ) {
          this.store.dispatch(SET_LOADING({payload: true}));
          if (investigationAttended.length) {
            const request: Observable<
              CotPartidaInvetigacionAtencionComentariosObj
            >[] = investigationAttended.map(
              (o): Observable<CotPartidaInvetigacionAtencionComentariosObj> =>
                this.processes01QuotationItemsService.cotPartidaCotizacionInvestigacionPartidaInvetigacionAtencionComentariosDetalle(
                  o?.ProductoInvestigacionObj.IdCotPartidaCotizacionInvestigacion,
                ),
            );
            return forkJoin(request).pipe(
              map((response: CotPartidaInvetigacionAtencionComentariosObj[]) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    'Al consultar el arreglo de partida investigacion detalle',
                  ),
                  response,
                );
                return quotationDetailsActions.FETCH_ITEMS_INVESTIGATION_ATTENDED_SUCCESS({
                  itemsInvestigationAttended: response,
                });
              }),
            );
          }
          return of(
            quotationDetailsActions.FETCH_ITEMS_INVESTIGATION_ATTENDED_SUCCESS({
              itemsInvestigationAttended: [],
            }),
          );
        }
        return of(RETURN_EMPTY());
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            'Al consultar el arreglo de partida investigacion detalle',
          ),
          error,
        );
        this.store.dispatch(SET_LOADING({payload: false}));
        return EMPTY;
      }),
    ),
  );
  /* DOCS: Agrega a la cotizacion las partidas de investigación finalizadas */
  addItemsInvestigdatidsaonToQuotation = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.FETCH_ITEMS_INVESTIGATION_ATTENDED_SUCCESS),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectValidationInvestigationFinished),
      ),
      mergeMap(([{itemsInvestigationAttended}, investigationFinished]) => {
        if (investigationFinished.length) {
          const request: Observable<VProducto>[] = investigationFinished.map(
            (o): Observable<VProducto> =>
              this.productsConfigurationService.vProductoObtener(
                o?.CotPartidaInvestigacionProducto?.IdProducto,
              ),
          );
          return forkJoin(request).pipe(
            map((response: VProducto[]) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  'Al consultar el arreglo de vProducto de investigaciones finalizadas',
                ),
                response,
              );
              return quotationDetailsActions.FETCH_ITEMS_INVESTIGATION_FINISHED_SUCCESS({
                itemsInvestigationFinished: response,
                itemsInvestigationAttended,
              });
            }),
          );
        }
        return of(
          quotationDetailsActions.FETCH_ITEMS_INVESTIGATION_FINISHED_SUCCESS({
            itemsInvestigationFinished: [],
            itemsInvestigationAttended,
          }),
        );
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            'Al consultar el arreglo de vProducto de investigaciones finalizadas',
          ),
          error,
        );
        this.store.dispatch(SET_LOADING({payload: false}));
        return EMPTY;
      }),
    ),
  );
  // DOCS Obtiene las ofertas de los productos en investigación
  getOfferInvestigationProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.FETCH_ITEMS_INVESTIGATION_FINISHED_SUCCESS),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedQuotation),
        this.store.select(quotationDetailsSelectors.selectValidationInvestigationAttended),
        this.store.select(quotationDetailsSelectors.selectValidationInvestigationFinished),
        this.store.select(quotationDetailsSelectors.selectedQuotationClientInfoDeliveryRoute),
        this.store.select(clientCatalogsSelectors.selectCatTipoPartidaCotizacion),
      ),
      mergeMap(
        ([
          {itemsInvestigationAttended, itemsInvestigationFinished},
          selectedQuotation,
          investigationAttended,
          investigationFinished,
          deliveryRoute,
          catTipoPartidaCotizacion,
        ]) => {
          const queryOfferInvestigationAttended: GMProductoOfertaPieza[] = buildQueryOffersInvestigationAttended(
            investigationAttended,
            selectedQuotation,
            itemsInvestigationAttended,
          );
          const queryOfferInvestigationFinished: GMProductoOfertaPieza[] = buildQueryOffersInvestigationFinished(
            investigationFinished,
            selectedQuotation,
            itemsInvestigationFinished,
          );
          const queryOffer: GMCotProductoOferta = {
            IdCatMoneda: selectedQuotation?.IdCatMoneda,
            IdCliente: selectedQuotation?.IdCliente,
            Productos: [...queryOfferInvestigationAttended, ...queryOfferInvestigationFinished],
          };
          return this.processes01QuotationBreakdownItemsService
            .cotProductoOfertaGetsCotProductoOfertaTemporal(queryOffer)
            .pipe(
              map((response: Array<CotProductoOferta>) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener las ofertas de todos los productos en investigación.',
                  ),
                  response,
                );
                const typeQuotation: apiCatalogs.CatTipoPartidaCotizacion = find(
                  catTipoPartidaCotizacion,
                  (o) => o.TipoPartidaCotizacion === QuotationItemTypes.Original,
                );
                const newItemQuotationFromFinished = _map(
                  investigationFinished,
                  (o: ICotPartidasInvetigacionCotizacion, index): IGMCotPartidasDetalle => {
                    const offerProduct = find(
                      response,
                      (i: CotProductoOferta) =>
                        i.IdProducto === itemsInvestigationFinished[index].IdProducto,
                    );
                    const product = find(
                      itemsInvestigationFinished,
                      (i: VProducto) => i.IdProducto === offerProduct.IdProducto,
                    );
                    return buildCotQuotation(
                      product,
                      offerProduct,
                      selectedQuotation,
                      deliveryRoute,
                      typeQuotation,
                    );
                  },
                );
                const newItemQuotationFromAttended = _map(
                  investigationAttended,
                  (o: ICotPartidasInvetigacionCotizacion, index): IGMCotPartidasDetalle => {
                    const offerProduct = find(
                      response,
                      (i: CotProductoOferta) =>
                        i.IdProducto === itemsInvestigationAttended[index].Producto.IdProducto,
                    );
                    const {Producto}: CotPartidaInvetigacionAtencionComentariosObj = find(
                      itemsInvestigationAttended,
                      (i: CotPartidaInvetigacionAtencionComentariosObj) =>
                        i.Producto.IdProducto === offerProduct.IdProducto,
                    );
                    return buildCotQuotation(
                      Producto,
                      offerProduct,
                      selectedQuotation,
                      deliveryRoute,
                      typeQuotation,
                    );
                  },
                );
                return quotationDetailsActions.FETCH_ITEMS_INVESTIGATION_OFFERS_SUCCESS({
                  itemsInvestigationAttended,
                  itemsInvestigationFinished,
                  itemsQuotation: [
                    ...newItemQuotationFromAttended,
                    ...newItemQuotationFromFinished,
                  ],
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener las ofertas de todos los productos en investigación.',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return of(RETURN_EMPTY());
              }),
            );
        },
      ),
    ),
  );
  /* DOCS: Agrega a la cotizacion las partidas de investigación finalizadas */
  getConfigurationProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.FETCH_ITEMS_INVESTIGATION_OFFERS_SUCCESS),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedQuotation),
        this.store.select(quotationDetailsSelectors.selectValidationInvestigationAttended),
        this.store.select(quotationDetailsSelectors.selectValidationInvestigationFinished),
      ),
      mergeMap(
        ([
          {itemsInvestigationFinished, itemsInvestigationAttended, itemsQuotation},
          selectedQuotation,
          investigationAttended,
          investigationFinished,
        ]) => {
          const requestAttended: Observable<
            ConfiguracionContratoCliente
          >[] = investigationAttended.map(
            (o, index): Observable<ConfiguracionContratoCliente> =>
              this.clientsContractsConfigurationService.ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContrato(
                {
                  idCatMoneda: selectedQuotation.IdCatMoneda,
                  idCliente: selectedQuotation.IdCliente,
                  idProducto: itemsInvestigationAttended[index]?.Producto?.IdProducto,
                  piezas: o?.ProductoInvestigacionObj?.piezas,
                },
              ),
          );
          const requestFinished: Observable<
            ConfiguracionContratoCliente
          >[] = investigationFinished.map(
            (o, index): Observable<ConfiguracionContratoCliente> =>
              this.clientsContractsConfigurationService.ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContrato(
                {
                  idCatMoneda: selectedQuotation.IdCatMoneda,
                  idCliente: selectedQuotation.IdCliente,
                  idProducto: itemsInvestigationFinished[index]?.IdProducto,
                  piezas: o?.ProductoInvestigacionObj?.piezas,
                },
              ),
          );
          return forkJoin([...requestAttended, ...requestFinished]).pipe(
            map((response: ConfiguracionContratoCliente[]) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  'Al consultar el arreglo de ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContrato',
                ),
                response,
              );
              const itemsQuotationToAdd: IGMCotPartidasDetalle[] = _map(
                response,
                (o: ConfiguracionContratoCliente, index): IGMCotPartidasDetalle => {
                  const product = find(
                    itemsQuotation,
                    (i: IGMCotPartidasDetalle) => i.product.IdProducto === o.IdProducto,
                  );
                  return {
                    ...product,
                    product: {
                      ...product.product,
                      ...response,
                      TiempoEstimadoEntregaOriginal: o.TiempoEntregaDias,
                    },
                    CotPartidaCotizacion: {
                      ...product.CotPartidaCotizacion,
                      TiempoEstimadoEntregaOriginal: o.TiempoEntregaDias,
                    },
                  };
                },
              );
              forEach(itemsQuotationToAdd, (o: IGMCotPartidasDetalle) => {
                this.store.dispatch(
                  quotationDetailsActions.ADD_ITEM_TO_SELECTED_QUOTATION_SUCCESS({
                    itemQuotation: o,
                  }),
                );
              });
              this.store.dispatch(
                quotationDetailsActions.SET_ADD_ITEMS_INVESTIGATION_NEEDS_TO_RELOAD({value: false}),
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                quotationDetailsActions.SAVE_QUOTATION_LOAD({
                  hasPreviewQuotation: false,
                  showMessageSuccess: false,
                }),
              );
              return RETURN_EMPTY();
            }),
          );
        },
      ),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            'Al consultar el arreglo de ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContrato',
          ),
          error,
        );
        this.store.dispatch(SET_LOADING({payload: false}));
        return EMPTY;
      }),
    ),
  );
  /* DOCS: Obtiene los datos generales del cliente al entrar a la pantalla detalle */
  getClientContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        quotationDetailsActions.FETCH_QUOTATIONS_LIST_SUCCESS,
        quotationDetailsActions.SET_SELECTED_QUOTATION,
      ),
      withLatestFrom(
        this.store.select(selectTipoTelefono),
        this.store.select(quotationDetailsSelectors.selectedClientId),
        this.store.select(resumeSectionSelectors.selectOptionsTabs),
      ),
      mergeMap(([action, typePhones, selectedClientId, tabs]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        this.store.dispatch(checkOutQuotationActions.SET_TAB({tab: tabs[0]}));

        const body = queryInfoWithActiveFilter();
        body.Filters = [
          {
            NombreFiltro: 'IdCliente',
            ValorFiltro: selectedClientId,
          },
          {
            NombreFiltro: 'Activo',
            ValorFiltro: true,
          },
        ];
        return this.contactsConfigurationService.ContactoDetalleQueryResult(body).pipe(
          map((response: QueryResultContactoDetalleObj) => {
            const contacts = patchContacts(response.Results, typePhones);
            this.store.dispatch(quotationDetailsActions.SET_CONTACTS({contacts}));
            return quotationDetailsActions.SET_CONTACTS_EMAIL({
              contacts: patchContactsMail(contacts),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener los contactos general del cliente.',
              ),
              error,
            );
            return of(SET_LOADING({payload: false}));
          }),
        );
      }),
    ),
  );

  /* DOCS: Obtiene los datos del cliente de la cotización seleccionada*/
  getClientQuotationInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.SET_CONTACTS_EMAIL),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedQuotation),
        this.store.select(quotationDetailsSelectors.selectClientInfo),
        this.store.select(quotationDetailsSelectors.selectAddressQueryInfo),
      ),
      mergeMap(([action, selectedQuotation, clientInfo, addressQueryInfo]) => {
        if (!selectedQuotation.needsToReloadInfo) {
          this.store.dispatch(SET_LOADING({payload: false}));
          return of(
            quotationDetailsActions.FETCH_CLIENT_INFO_FOR_SELECTED_QUOTATION_SUCCESS({
              queryResult: clientInfo,
            }),
          );
        }
        const request = [
          this.clientsConfigurationService.vClienteObtener(selectedQuotation.IdCliente),
          this.contactsConfigurationService.vContactoObtener(selectedQuotation.IdContacto),
          this.clientsSettingsConfigurationService.vDatosFacturacionClienteObtener(
            selectedQuotation.IdDatosFacturacionCliente,
          ),
          this.catalogsService.catCondicionesDePagoObtener(
            selectedQuotation.IdCatCondicionesDePagoDeOrigen,
          ),
          this.usersSystemService.UsuarioObtener(selectedQuotation.IdUsuarioTramita),
          this.addressesConfigurationService.vDireccionQueryResult(addressQueryInfo),
        ];
        return forkJoin(request).pipe(
          map((response: Array<any>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener la información general del cliente de la cotización seleccionada.',
              ),
              response,
            );
            return quotationDetailsActions.FETCH_CLIENT_INFO_FOR_SELECTED_QUOTATION_SUCCESS({
              queryResult: buildGeneralData(response, selectedQuotation),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener la información general del cliente.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(quotationDetailsActions.FETCH_QUOTATION_DETAIL_FAILED());
          }),
        );
      }),
    ),
  );

  /* DOCS: Obtiene la información del requerimiento de la cotización seleccionada*/
  getDetailsRequerimentInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.FETCH_CLIENT_INFO_FOR_SELECTED_QUOTATION_SUCCESS),
      withLatestFrom(this.store.select(quotationDetailsSelectors.selectedQuotation)),
      mergeMap(([action, quotation]) => {
        return this.processMailBoxService
          .CorreoRecibidoClienteRequerimientoObtener(quotation.IdCorreoRecibidoCliente)
          .pipe(
            map((response: CorreoRecibidoClienteRequerimientoObj) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la información del requerimiento de la cotización seleccionada.',
                ),
                response,
              );
              this.store.dispatch(UPDATE_STATUS_MAIL({status: API_REQUEST_STATUS_SUCCEEDED}));
              return quotationDetailsActions.FETCH_MAIL_SUCCESS({
                data: response,
                idQuotation: null,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la información del requerimiento de la cotización seleccionada.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(quotationDetailsActions.FETCH_MAIL_ERROR(error));
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS Obtiene el archivo de evidencia del proveedor cuando se manda a investigar con el proveedor
  fetchFileEvidenceProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.SET_INVESTIGATION_PRODUCT_POP_UP),
      mergeMap(({item}) => {
        if (
          item?.ProductoInvestigacionObj?.ClaveEstadoInvestigacion ===
          ENUM_STATUS_INVESTIGATION_ITEM.FINALIZED
        ) {
          return this.systemFileServices
            .ArchivoObtener(item?.CotPartidaInvestigacionProducto?.IdArchivoEvidenciaProvedor)
            .pipe(
              map((response: Archivo) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener el archivo.',
                  ),
                  response,
                );
                return quotationDetailsActions.FETCH_FILE_EVIDENCE_SUCCESS({
                  file: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener el archivo de evidencia del proveedor.',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return of(RETURN_EMPTY());
              }),
            );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // DOCS Abre la evidencia del proveedor cuando se manda a investigar con el proveedor
  fetchExternalFileEvidenceProvider$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(quotationDetailsActions.FETCH_EXTERNAL_FILE_LOAD_EVIDENCE),
        withLatestFrom(
          this.store.select(quotationDetailsSelectors.selectInvestigationEvidenceFile),
        ),
        mergeMap(([action, evidenceFile]) => {
          if (evidenceFile !== null) {
            this.store.dispatch(
              DOWLOAD_FILE_LOAD({
                IdArchivo: evidenceFile.IdArchivo,
                FileKey: evidenceFile.FileKey,
                newTab: true,
              }),
            );
          }
          this.store.dispatch(SET_LOADING({payload: false}));
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS Obtiene el detalle del pop del chat de una partida de investigacio atendida
  attendInvestigationItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.SET_ATTEND_INVESTIGATION_LOAD),
      mergeMap(({itemInvestigation}) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.processes01QuotationItemsService
          .cotPartidaCotizacionInvestigacionPartidaInvetigacionAtencionComentariosDetalle(
            itemInvestigation?.ProductoInvestigacionObj.IdCotPartidaCotizacionInvestigacion,
          )
          .pipe(
            map((response: CotPartidaInvetigacionAtencionComentariosObj) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el detalle del producto investigación.',
                ),
                response,
              );
              this.store.dispatch(
                quotationDetailsActions.SET_ATTEND_INVESTIGATION_SUCCESS({
                  attendedInvestigationData: buildCotPartidaInvetigacionAtencionComentariosObj(
                    response,
                  ),
                }),
              );
              return quotationDetailsActions.GET_CONFIGURATION_INVESTIGATION_LOAD({
                product: response.Producto,
                investigationId:
                  response.cotPartidaCotizacionInvestigacion.IdCotPartidaCotizacionInvestigacion,
                openChat: true,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el detalle del producto investigación.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );
  // DOCS Obtiene el detalle del pop del chat de una partida de investigacio atendida
  addProductFoundByProvider = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.SET_ADD_PRODUCT_FOUND_BY_PROVIDER_LOAD),
      withLatestFrom(this.store.select(quotationDetailsSelectors.selectInvestigationProductPopUp)),
      mergeMap(([action, investigationProductData]) => {
        return this.productsConfigurationService
          .vProductoObtener(investigationProductData.CotPartidaInvestigacionProducto.IdProducto)
          .pipe(
            map((response: VProducto) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el VProducto.',
                ),
                response,
              );
              this.store.dispatch(
                quotationDetailsActions.SET_PRODUCT_TO_INVESTIGATION_SELECTED({
                  product: response,
                }),
              );
              return quotationDetailsActions.GET_CONFIGURATION_INVESTIGATION_LOAD({
                product: response,
                investigationId:
                  investigationProductData.CotPartidaInvestigacionProducto
                    .IdCotPartidaCotizacionInvestigacion,
                openChat: false,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el VProducto.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );

  // DOCS Manda a reatender una partida de investigación
  reattendInvestigationItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.SET_REATTEND_INVESTIGATION_LOAD),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectReattendedInvestigationQuery),
        this.store.select(quotationDetailsSelectors.selectQuotationDetailsToSave),
      ),
      mergeMap(([action, reattendedInvestigationQuery, selectedQuotationQueryInfo]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.processes01QuotationItemsService
          .cotPartidaCotizacionInvestigacionGuardarReatenderPartidaInvestigacionCotizador(
            reattendedInvestigationQuery,
          )
          .pipe(
            map((response: GMPartidaInvestigacionCotizador) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al reatender la investigacion del producto investigación.',
                ),
                response,
              );
              this.store.dispatch(
                quotationDetailsActions.SET_OPEN_DETAILS_PRODUCT_INVESTIGATION({
                  value: false,
                }),
              );
              this.store.dispatch(
                quotationDetailsActions.SET_REATTEND_INVESTIGATION_SUCCESS({
                  IdCotPartidaCotizacionInvestigacion:
                    reattendedInvestigationQuery.IdCotPartidaCotizacionInvestigacion,
                }),
              );
              if (isEmpty(selectedQuotationQueryInfo.CotPartidasCotizacion)) {
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(
                  quotationDetailsActions.UPDATE_STATUS_SELECTED_QUOTATION_LOAD({
                    activeNavigate: false,
                  }),
                );
                return utilsActions.SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has mandado a reatender el producto',
                });
              }
              return quotationDetailsActions.HANDLE_SAVE_QUOTATION({
                payload: selectedQuotationQueryInfo,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al reatender la investigacion del producto investigación.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );

  handleSaveQuotation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.HANDLE_SAVE_QUOTATION),
      mergeMap(({payload}) => {
        return this.processes01QuotationService
          .cotCotizacionGuardarOActualizarTransaccion(payload)
          .pipe(
            map((response: IGMCotCotizacionDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar una cotización.',
                ),
                response,
              );
              this.store.dispatch(
                quotationDetailsActions.SAVE_QUOTATION_SUCCESS({
                  quotation: response,
                }),
              );
              this.store.dispatch(
                quotationDetailsActions.UPDATE_STATUS_SELECTED_QUOTATION_LOAD({
                  activeNavigate: false,
                }),
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return utilsActions.SET_LOADING_SUCCESS({
                active: true,
                message: 'Has mandado a reatender el producto',
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar una cotización.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(quotationDetailsActions.SAVE_QUOTATION_FAILED());
            }),
          );
      }),
    ),
  );
  // DOCS Agrega una partida de investigacion a la cotizacion
  getConfigurationInvestigation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.GET_CONFIGURATION_INVESTIGATION_LOAD),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedQuotation),
        this.store.select(quotationDetailsSelectors.selectedInvestigationItems),
      ),
      mergeMap(([{product, investigationId, openChat}, selectedQuotation, investigationItems]) => {
        const itemInvestigation: ICotPartidasInvetigacionCotizacion = find(
          investigationItems,
          (o: ICotPartidasInvetigacionCotizacion) =>
            o.ProductoInvestigacionObj.IdCotPartidaCotizacionInvestigacion === investigationId,
        );
        return this.clientsContractsConfigurationService
          .ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContrato(
            bodyPrice(
              selectedQuotation.IdCliente,
              {
                ...product,
                PiezasACotizar: itemInvestigation.ProductoInvestigacionObj.piezas,
              },
              selectedQuotation.IdCatMoneda,
            ),
          )
          .pipe(
            map((response: ConfiguracionContratoCliente) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el precio unitario.',
                ),
                response,
              );
              this.store.dispatch(
                quotationDetailsActions.GET_CONFIGURATION_INVESTIGATION_SUCCESS({
                  productDataInvestigation: {
                    ConfiguracionContratoCliente: response,
                    product: product,
                  } as IInvestigationProductData,
                }),
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              if (openChat) {
                return quotationDetailsActions.SET_OPEN_DETAILS_PRODUCT_INVESTIGATION({
                  value: true,
                });
              }
              return RETURN_EMPTY();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el precio unitario',
                ),
                error,
              );
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );
  // DOCS Agrega una partida de investigacion a la cotizacion
  addItemInvestigationToSelectedQuotation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.SET_ADD_ITEM_INVESTIGATION_TO_QUOTATION_LOAD),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedQuotation),
        this.store.select(quotationDetailsSelectors.selectedQuotationClientInfoDeliveryRoute),
        this.store.select(clientCatalogsSelectors.selectCatTipoPartidaCotizacion),
        this.store.select(quotationDetailsSelectors.selectProductDataInvestigation),
        this.store.select(quotationDetailsSelectors.selectedInvestigationItems),
      ),
      mergeMap(
        ([
          {investigationId},
          selectedQuotation,
          deliveryRoute,
          catTipoPartidaCotizacion,
          productDataInvestigation,
          investigationItems,
        ]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          const itemInvestigation: ICotPartidasInvetigacionCotizacion = find(
            investigationItems,
            (o: ICotPartidasInvetigacionCotizacion) =>
              o.ProductoInvestigacionObj.IdCotPartidaCotizacionInvestigacion === investigationId,
          );
          const params: CotProductoOfertaGetCotProductoOfertaTemporalParams = {
            NumeroDePiezas: itemInvestigation.ProductoInvestigacionObj.piezas,
            IdProducto: productDataInvestigation.product.IdProducto,
            IdClient: selectedQuotation.IdCliente,
            IdCatMoneda: selectedQuotation.IdCatMoneda,
          };
          return this.processes01QuotationBreakdownItemsService
            .cotProductoOfertaGetCotProductoOfertaTemporal(params)
            .pipe(
              map((response: CotProductoOferta) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener la oferta del producto de investigación.',
                  ),
                  response,
                );
                const typeQuotation: apiCatalogs.CatTipoPartidaCotizacion = find(
                  catTipoPartidaCotizacion,
                  (o) => o.TipoPartidaCotizacion === QuotationItemTypes.Original,
                );
                let cotQuotation: IGMCotPartidasDetalle = buildCotQuotation(
                  productDataInvestigation.product,
                  response,
                  selectedQuotation,
                  deliveryRoute,
                  typeQuotation,
                );
                cotQuotation = {
                  ...cotQuotation,
                  product: {
                    ...cotQuotation.product,
                    ...productDataInvestigation.ConfiguracionContratoCliente,
                    TiempoEstimadoEntregaOriginal:
                      productDataInvestigation.ConfiguracionContratoCliente.TiempoEntregaDias,
                  },
                  CotPartidaCotizacion: {
                    ...cotQuotation.CotPartidaCotizacion,
                    TiempoEstimadoEntregaOriginal:
                      productDataInvestigation.ConfiguracionContratoCliente.TiempoEntregaDias,
                  },
                } as IGMCotPartidasDetalle;

                this.store.dispatch(
                  quotationDetailsActions.ADD_ITEM_TO_SELECTED_QUOTATION_SUCCESS({
                    itemQuotation: cotQuotation,
                  }),
                );
                this.store.dispatch(
                  quotationDetailsActions.SET_OPEN_DETAILS_PRODUCT_INVESTIGATION({
                    value: false,
                  }),
                );
                this.store.dispatch(
                  quotationDetailsActions.SET_INVESTIGATION_PRODUCT_POP_UP({item: null}),
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return utilsActions.SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Se ha agregado la partida de investigación a la cotización',
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener la oferta del producto a agregarse en la cotización.',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        },
      ),
    ),
  );

  /* DOCS: Obtiene la lista de productos coincidentes para mostrar en el buscador*/
  getOptionsOfProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listQuotesActions.GET_OPTIONS_OF_PRODUCTS),
      withLatestFrom(this.store.select(quotationDetailsSelectors.selectSuggestionQueryInfo)),
      mergeMap(([action, searchSuggestionParameters]) => {
        if (action.runSearchTerm) {
          return this.uxSystemService.SugerenciasBusquedaProcess(searchSuggestionParameters).pipe(
            map((response: Array<SugerenciaBusqueda>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los productos.',
                ),
                response,
              );
              return listQuotesActions.GET_OPTIONS_OF_PRODUCTS_SUCCESS({
                products: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los productos.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(listQuotesActions.GET_OPTIONS_OF_PRODUCTS_FAILED());
            }),
          );
        } else {
          return of(RETURN_EMPTY());
        }
      }),
    ),
  );

  /* DOCS: Obtiene la lista de productos coincidentes al darle Enter en el buscador (Se dejo comentado abajo como estaba
   *  Se va a dejar de considerar que el producto ya esta guardado en la cotización a ver si es correcto.*/
  fetchProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          listQuotesActions.FETCH_PRODUCTS,
          listQuotesActions.SET_RUN_SEARCH_TERM,
          listQuotesActions.SET_OPTION_OF_PRODUCT_SELECTED,
          listQuotesActions.SET_FILTER_SELECTED,
          listQuotesActions.CLEAR_SEARCH_TERM,
        ),
        withLatestFrom(
          this.store.select(quotationDetailsSelectors.selectProductSearchResultsQueryInfo),
          this.store.select(quotationDetailsSelectors.selectedQuotation),
          this.store.select(quotationDetailsSelectors.selectRunSearchTerm),
        ),
        mergeMap(([action, queryInfo, selectedQuotation, runSearchTerm]) => {
          /* DOCS: Para esta acción solo hará la búsqueda cuando no haya nada en el término de búsqueda
              Para las demás acciones siempre se ejecuta*/
          if (action.type === GET_OPTIONS_OF_PRODUCTS_ACTION && runSearchTerm) {
            return EMPTY;
          }
          if (queryInfo.desiredPage === 1) {
            this.store.dispatch(SET_LOADING({payload: true}));
          }
          return this.productsConfigurationService.vProductoQueryResult(queryInfo).pipe(
            map(async (response: QueryResultVProducto) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los productos resultantes de la búsqueda.',
                ),
                response,
              );
              const productsSearchResultsList = addRowIndex(
                queryInfo.desiredPage,
                queryInfo.pageSize,
                response.Results,
              );
              const finalProductsList: Array<ProductSearchResult> = [];
              for (const productSearchResult of productsSearchResultsList) {
                /* DOCS: Obtener el precio de venta de los productos resultantes de la búsqueda*/
                const productUnitPrice = await lastValueFrom(
                  this.clientsContractsConfigurationService.ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContrato(
                    bodyPrice(
                      selectedQuotation.IdCliente,
                      {...productSearchResult, PiezasACotizar: 1},
                      selectedQuotation.IdCatMoneda,
                    ),
                  ),
                );
                const body = new FiltersOnlyActive();
                body.Filters.push({
                  NombreFiltro: 'IdCliente',
                  ValorFiltro: selectedQuotation.IdCliente,
                });
                body.Filters.push({
                  NombreFiltro: 'IdProducto',
                  ValorFiltro: productSearchResult.IdProducto,
                });

                // DOCS: obtener las cotizaciones vinculadas
                // DOCS: REVISAR QUÉ SE HARÁ CON LAS PROPIEDADES DE COTIZACIONES VINCULADAS
                /*                const linkedQuotations: QueryResultVConfiguracionAplicadaClienteEstante = await lastValueFrom(
                  this.processes03PurchasePromiseService.vConfiguracionAplicadaClienteEstanteQueryResult(
                    body,
                  ),
                );*/
                finalProductsList.push({
                  ...productSearchResult,
                  // DOCS: REVISAR QUÉ SE HARÁ CON LAS PROPIEDADES DE COTIZACIONES VINCULADAS
                  /*                  ...linkedQuotations.Results[0],*/
                  /*                  TotalCotizacionesVinculadas:
                    linkedQuotations.Results.length > 0
                      ? linkedQuotations.Results[0].TotalCotizacionesVinculadas
                      : 0,*/
                  /*                  CotizacionesVinculadas:
                    linkedQuotations.Results.length > 0
                      ? linkedQuotations.Results[0].CotizacionesVinculadas
                      : [],*/
                  PiezasACotizar: 1,
                  isSelected: false,
                  needsToReload: true,
                  PrecioDeVenta: productUnitPrice.Precio ?? 0,
                  TiempoEntrega: productUnitPrice.TiempoEntrega ?? 'N/D',
                  TiempoEstimadoEntrega: productUnitPrice.TiempoEntregaDias ?? 0,
                  TiempoEstimadoEntregaOriginal: productUnitPrice.TiempoEntregaDias,
                  Configurado:
                    productUnitPrice.Configurado &&
                    productSearchResult?.FechaCaducidadVigenciaCuraduria
                      ? new Date(DEFAULT_DATE.split('T')[0]) <=
                        new Date(productSearchResult?.FechaCaducidadVigenciaCuraduria.split('T')[0])
                      : productUnitPrice.Configurado,
                  isInViewQuotesLinked: false,
                  needsToReloadLinkeds: false,
                  // DOCS: Se cambia el nombre de la marca por la presentación
                  image: `assets/Images/products/${buildImageNameSave(
                    productSearchResult?.TipoPresentacion,
                  )}.svg`,
                  imageBrand: `assets/Images/logos/${buildImageNameSave(
                    productSearchResult?.NombreImagenMarca,
                  )}_hover.svg`,
                });
              }
              this.store.dispatch(
                listQuotesActions.FETCH_PRODUCTS_SUCCESS({
                  products: finalProductsList,
                  universeProducts: response.Results,
                  total: response.TotalResults,
                }),
              );
              this.store.dispatch(SET_LOADING({payload: false}));
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los productos.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(listQuotesActions.FETCH_PRODUCTS_FAILED());
              return of(listQuotesActions.FETCH_PRODUCTS_FAILED());
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  /* DOCS: Valida si es necesario ir por la siguiente página de productos resultantes de la búsqueda */
  fetchMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.FETCH_MORE_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectFetchMoreProductosQueryInfo),
      ),
      mergeMap(([action, queryInfo]) => {
        const {
          itemList,
          itemsTotalLength,
          listRequestStatus,
          desiredPage,
          totalPages,
        }: IFetchMoreItemsInfo = queryInfo;
        if (
          action.event.endIndex !== itemList.length - 1 ||
          action.event.endIndex === itemsTotalLength - 1 ||
          itemsTotalLength === 0 ||
          desiredPage > totalPages ||
          itemList.length > itemsTotalLength ||
          listRequestStatus === 1
        ) {
          return EMPTY;
        } else {
          return of(listQuotesActions.FETCH_PRODUCTS({isFirstPage: false}));
        }
      }),
    ),
  );

  /* DOCS: Calcula nuevamente el precio de venta cuando cambia el número de piezas*/
  updatePieces = createEffect(() =>
    this.actions$.pipe(
      ofType(listQuotesActions.SET_PIECES_PRODUCT_LOAD),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedClientId),
        this.store.select(quotationDetailsSelectors.selectedQuotation),
      ),
      mergeMap(([action, idClient, quotation]) => {
        return this.clientsContractsConfigurationService
          .ContratoClienteExtensionsGetConfiguracionProquifaNetClienteContrato(
            bodyPrice(
              idClient,
              {
                ...action.item,
                PiezasACotizar: action.pieces,
              },
              quotation.IdCatMoneda,
            ),
          )
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el precio unitario.',
                ),
                response,
              );
              return listQuotesActions.SET_PIECES_PRODUCT_SUCCESS({
                item: {
                  ...action.item,
                  PiezasACotizar: action.pieces,
                  PrecioDeVenta: response.Precio,
                },
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el precio unitario',
                ),
                error,
              );
              return of(listQuotesActions.SET_PIECES_PRODUCT_ERROR(error));
            }),
          );
      }),
    ),
  );

  /* DOCS: Obtiene el detalle del producto cuando se abren los detalles de la partida mientras se esta buscando*/
  setProductSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listQuotesActions.SET_PRODUCT_SELECTED),
      withLatestFrom(this.store.select(quotationDetailsSelectors.selectSelectedProductSearchList)),
      mergeMap(([action, product]) => {
        if (!product?.needsToReload) {
          this.store.dispatch(listQuotesActions.SET_PRODUCT_SELECTED_SUCCESS({}));
          return EMPTY;
        }
        return this.productsConfigurationWizardService
          .vProductoDetalleProcess(product.IdProducto)
          .pipe(
            map((response: VProductoDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el detalle del producto seleccionado.',
                ),
                response,
              );
              return listQuotesActions.SET_PRODUCT_SELECTED_SUCCESS({
                vProductDetails: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el detalle del producto seleccionado.',
                ),
                error,
              );
              return of(listQuotesActions.SET_PRODUCT_SELECTED_FAILED());
            }),
          );
      }),
    ),
  );

  /* DOCS: Agrega la partida a la cotización*/
  addItemToSelectedQuotation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.ADD_ITEM_TO_SELECTED_QUOTATION),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedQuotation),
        this.store.select(quotationDetailsSelectors.selectedQuotationClientInfoDeliveryRoute),
        this.store.select(clientCatalogsSelectors.selectCatTipoPartidaCotizacion),
      ),
      mergeMap(([{product, dates}, selectedQuotation, deliveryRoute, catTipoPartidaCotizacion]) => {
        const params: CotProductoOfertaGetCotProductoOfertaTemporalParams = {
          NumeroDePiezas: product.PiezasACotizar,
          IdProducto: product.IdProducto,
          IdClient: selectedQuotation.IdCliente,
          IdCatMoneda: selectedQuotation.IdCatMoneda,
        };
        return this.processes01QuotationBreakdownItemsService
          .cotProductoOfertaGetCotProductoOfertaTemporal(params)
          .pipe(
            map((response: CotProductoOferta) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la oferta del producto a agregarse en la cotización.',
                ),
                response,
              );
              const typeQuotation: apiCatalogs.CatTipoPartidaCotizacion = find(
                catTipoPartidaCotizacion,
                (o) => o.TipoPartidaCotizacion === QuotationItemTypes.Original,
              );
              const cotQuotation = buildCotQuotation(
                product,
                response,
                selectedQuotation,
                deliveryRoute,
                typeQuotation,
                dates,
              );
              this.store.dispatch(
                quotationDetailsActions.ADD_ITEM_TO_SELECTED_QUOTATION_SUCCESS({
                  itemQuotation: cotQuotation,
                }),
              );
              return RETURN_EMPTY();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la oferta del producto a agregarse en la cotización.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(quotationDetailsActions.SAVE_ITEM_QUOTATION_FAILED());
              return EMPTY;
            }),
          );
      }),
    ),
  );

  /* DOCS: Agrega n partidas de ahorro a la cotización*/
  addItemSavedToSelectedQuotation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.ADD_ITEM_SAVING_TO_SELECTED_QUOTATION_LOAD),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedQuotation),
        this.store.select(quotationDetailsSelectors.selectedQuotationClientInfoDeliveryRoute),
        this.store.select(clientCatalogsSelectors.selectCatTipoPartidaCotizacion),
      ),
      mergeMap(
        ([
          {item, itemsNumberPieces, productIndex},
          selectedQuotation,
          deliveryRoute,
          catTipoPartidaCotizacion,
        ]) => {
          const request: Array<any> = _map(itemsNumberPieces, (o: number) =>
            this.processes01QuotationBreakdownItemsService.cotProductoOfertaGetCotProductoOfertaTemporal(
              {
                IdClient: selectedQuotation.IdCliente,
                IdCatMoneda: selectedQuotation.IdCatMoneda,
                IdProducto: item.VPartidaCotizacion
                  ? item.VPartidaCotizacion.IdProducto
                  : item.product.IdProducto,
                NumeroDePiezas: o,
              },
            ),
          );
          return forkJoin(request).pipe(
            map((response: Array<CotProductoOferta>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la oferta del producto a agregarse en la cotización como partida de ahorro.',
                ),
                response,
              );
              const typeQuotation: apiCatalogs.CatTipoPartidaCotizacion = find(
                catTipoPartidaCotizacion,
                (o) => o.TipoPartidaCotizacion === QuotationItemTypes.Saving,
              );
              const array = _map(response, (o: CotProductoOferta) =>
                buildCotQuotationSaving(o, selectedQuotation, deliveryRoute, typeQuotation, item),
              );
              this.store.dispatch(
                quotationDetailsActions.ACTIVE_INPUT_CONTROLLED_IN_ITEM_QUOTATION({
                  idItemQuotation: DEFAULT_UUID,
                }),
              );
              return quotationDetailsActions.ADD_ITEM_SAVING_TO_SELECTED_QUOTATION_SUCCESS({
                itemsQuotation: array,
                productIndex,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la oferta del producto a agregarse en la cotización como partida de ahorro.',
                ),
                error,
              );
              return of(SET_LOADING({payload: false}));
            }),
          );
        },
      ),
    ),
  );

  // DOCS: Consulta la oferta al editar la cantidad de piezas en el modal del detalle del producto en el carrito
  getOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkOutQuotationActions.SET_PIECES_IN_PRODUCT_DETAIL),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectSelectedProductDetail),
        this.store.select(quotationDetailsSelectors.selectedQuotation),
      ),
      mergeMap(([{NumeroDePiezas}, selectedProduct, selectedQuotation]) => {
        const params: CotProductoOfertaGetCotProductoOfertaTemporalParams = {
          NumeroDePiezas,
          IdCatMoneda: selectedQuotation.IdCatMoneda,
          IdClient: selectedQuotation.IdCliente,
          IdProducto: selectedProduct.CotProductoOferta.IdProducto,
        };
        return this.processes01QuotationBreakdownItemsService
          .cotProductoOfertaGetCotProductoOfertaTemporal(params)
          .pipe(
            map((response: CotProductoOferta) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la oferta del producto.',
                ),
                response,
              );
              return checkOutQuotationActions.UPDATE_COT_COTIZACION({CotCotizacion: response});
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la oferta del producto.',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );
  // DOCS VER ARCHIVO
  fetchExternalFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(quotationDetailsActions.FETCH_EXTERNAL_FILE_LOAD),
        withLatestFrom(
          this.store.select(quotationDetailsSelectors.selectProductSearchResultDetailsSelected),
          this.store.select(quotationDetailsSelectors.selectSelectedProductDetail),
        ),
        mergeMap(([action, productDetails, productDetailsPop]) => {
          let typeFile: Archivo;
          const productDetailsData =
            action.location === 'list' ? productDetails : productDetailsPop.vProductoDetalle;
          switch (action.node) {
            case 'ArchivoHojaSeguridad':
              typeFile = productDetailsData.ArchivoHojaSeguridad
                ? productDetailsData.ArchivoHojaSeguridad
                : null;
              break;
            case 'ArchivoCertificadoLote':
              typeFile = productDetailsData.ArchivoCertificadoLote
                ? productDetailsData.ArchivoCertificadoLote
                : null;
              break;
            case 'ArchivoFichaTecnica':
              typeFile = productDetailsData.ArchivoFichaTecnica
                ? productDetailsData.ArchivoFichaTecnica
                : null;
              break;
            case 'ArchivoTratado':
              typeFile = productDetailsData.ArchivoTratado
                ? productDetailsData.ArchivoTratado
                : null;
              break;
            case 'OtrosTratados':
              typeFile = productDetailsData.ArchivoOtroPermiso
                ? productDetailsData.ArchivoOtroPermiso
                : null;
              break;
            case 'ArchivoCartaDeDisponibilidad':
              typeFile = productDetailsData.ArchivoCartaDeDisponibilidad
                ? productDetailsData.ArchivoCartaDeDisponibilidad
                : null;
              break;
            case 'ArchivoEstructuraMolecular':
              typeFile = productDetailsData.ArchivoEstructuraMolecular
                ? productDetailsData.ArchivoEstructuraMolecular
                : null;
              break;
            case 'ArchivoPermisoDeAdquisicionEnPlaza':
              typeFile = productDetailsData?.ArchivoPermisoDeAdquisicionEnPlaza || null;
              break;
          }
          if (typeFile !== null) {
            this.store.dispatch(
              DOWLOAD_FILE_LOAD({
                IdArchivo: typeFile.IdArchivo,
                FileKey: typeFile.FileKey,
                newTab: true,
              }),
            );
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: VISUALIZAR ACHIVOS
  viewFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(quotationDetailsActions.VIEW_FILE_LOAD),
        mergeMap((action) => {
          this.appService.setFile({isLoading: true});
          return this.systemFileServices.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response: ArchivoDetalle) => {
              let base64 = null;
              if (response && response.Url) {
                if (isPdf(action.ext)) {
                  base64 = await convertPDFFileFromURLToBase64(response.Url, true);
                }
                if (isImage(action.ext)) {
                  base64 = await getBase64FromUrl(response.Url, action.ext);
                }
              }
              this.appService.setFile({
                ...response,
                nombre: getNameFile(response?.FileKey),
                archivoBase64: base64,
                isPdf: isPdf(action.ext),
                isLoading: false,
              });
            }),
          );
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Cambiar moneda de la cotización
  changeCurrencyMethod$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(quotationDetailsActions.CHANGE_CURRENCY_QUOTATION),
        withLatestFrom(this.store.select(quotationDetailsSelectors.selectHasQuotationItems)),
        mergeMap(([{currency}, hasItems]) => {
          if (hasItems) {
            this.store.dispatch(
              SET_LOADING_ERROR({
                active: true,
                message:
                  'Para poder cambiar la moneda necesitas borrar las partidas de la cotización',
              }),
            );
            return of(RETURN_EMPTY);
          }
          this.store.dispatch(quotationDetailsActions.CHANGE_CURRENCY_QUOTATION_LOAD({currency}));
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  changeCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.CHANGE_CURRENCY_QUOTATION_LOAD),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedQuotation),
        this.store.select(quotationDetailsSelectors.selectOptionSwitch),
        this.store.select(quotationDetailsSelectors.selectedAddressDelivery),
      ),
      mergeMap(([{currency}, selectedQuotation, optionsSwitch, addressClient]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const params: GMCotCotizacionCambioMoneda = {
          IdCatMonedaACambiar: currency.value,
          IdCotCotizacion: selectedQuotation.IdCotCotizacion,
        };
        return this.processes01QuotationService.cotCotizacionCambioMonedaCotCotizacion(params).pipe(
          map((response: GMCotCotizacionDetalle) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                `Al cambiar la moneda de la cotización a ${currency.label}`,
              ),
              response,
            );
            // DOCS Eliminar validacion al tener la definicion correcta de las cotizaciones parciales
            const totalQuotation: DropListOption = find(
              optionsSwitch,
              (o: DropListOption) => o.labelKey === 'total',
            );
            const GMQuotation: GMCotCotizacionDetalle = {
              ...response,
              CotCotizacion: {
                ...response.CotCotizacion,
                IdCatTipoCotizacion: totalQuotation.value,
              },
            };
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              utilsActions.SET_LOADING_SUCCESS({
                active: true,
                message: `Has cambiado la moneda a ${currency.label}`,
              }),
            );
            return quotationDetailsActions.CHANGE_CURRENCY_QUOTATION_SUCCESS({
              value: buildCotQuotationDetails(
                GMQuotation,
                addressClient,
                selectedQuotation.EstadoCotizacion,
              ),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                `Al cambiar la moneda de la cotización a ${currency.label}`,
              ),
              error,
            );
            this.store.dispatch(quotationDetailsActions.CHANGE_CURRENCY_QUOTATION_FAILED());
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // DOCS: EFFECT TO SHOW REALIZATION DATES DIALOG
  showRealizationDatesDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.SHOW_REALIZATION_DATES_DIALOG),
      withLatestFrom(this.store.select(selectUtils.selectNonWorkingDays)),
      mergeMap(([{trainingItem}, nonWorkingDays]) => {
        const dialogRef = this.dialog.open(
          AddRealizationDatesPopUpComponent,
          buildDialogConfig({
            nonWorkingDays,
          }),
        );

        dialogRef
          .afterClosed()
          .subscribe(
            (data: {
              event: boolean;
              datesArray: CotPartidaCotizacionCapacitacionFecha[] | null;
            }) => {
              if (data?.datesArray !== null) {
                this.store.dispatch(
                  quotationDetailsActions.ADD_ITEM_TO_SELECTED_QUOTATION({
                    product: trainingItem,
                    dates: data?.datesArray,
                  }),
                );
              }
            },
          );
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
