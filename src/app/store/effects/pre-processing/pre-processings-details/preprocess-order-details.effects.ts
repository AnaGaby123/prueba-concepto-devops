import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {filter, forEach, isEmpty} from 'lodash-es';

// Actions
import {
  addItemsQuoteActions,
  preProcessDetailsActions,
  preProcessingActions,
  quotedItemActions,
} from '@appActions/pre-processing';
import {SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
// Services API
import * as apiLogistica from 'api-logistica';
import * as apiLogistics from 'api-logistica';
import * as apiLogistic from 'api-logistica';
import {
  CorreoRecibidoClienteRequerimientoObj,
  GMPretramitarPedido,
  PretramitarPedidoPartidaObj,
  ProcesosMailbotService,
  QueryResultPretramitarPedidoPartidaDetalle,
  QueryResultVPpPedidoObj,
} from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import {
  ConfiguracionClientesDireccionesService,
  ConfiguracionDireccionesService,
  QueryResultVDireccion,
  SolicitudAutorizacionCambio,
  VCliente,
} from 'api-catalogos';
// Selectors
import {addItemSelectors, preProcessOrderDetailsSelectors} from '@appSelectors/pre-processing';
// Models
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {IOrder} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';
// Utils
import {API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';
import {convertPDFFileFromURLToBase64, getBase64FromUrl} from '@appUtil/files';
import {appRoutes} from '@appHelpers/core/app-routes';
import {
  buildBodyRequestSaveOrderTransaction,
  buildItemFromPreProcessingOrderDetails,
  buildItemsQuoteOrderPurchase,
} from '@appHelpers/pending/pre-processing/pre-processing.helpers';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {buildImageNameSave} from '@appUtil/strings';
import {getNameFile, isImage, isPdf} from '@appUtil/util';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';
import {currentDateWithoutHoursUTCFormat, getDateWithoutHoursUTCFormat} from '@appUtil/dates';
import {MatDialog} from '@angular/material/dialog';
import {SeeQuotedItemPopUpComponent} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/list-quoted-items/see-quoted-item-pop-up/see-quoted-item-pop-up.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {CustomerList} from '@appModels/store/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.models';

const FILE_NAME = 'preprocess-order-details.effects.ts';

@Injectable()
export class PreprocessOrderDetailsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private pretramitarPedidoServices: apiLogistica.ProcesosL04PretramitarPedidoService,
    private processPurchasePServices: apiLogistic.ProcesosL03PromesaDeCompraService,
    private sistemaArchivosService: apiCatalogs.SistemaArchivosService,
    private usuarioServices: apiCatalogs.SistemaUsuariosService,
    private clientServices: apiCatalogs.ConfiguracionClientesService,
    private router: Router,
    private usuariosAccesosService: apiCatalogs.SistemaUsuariosAccessosService,
    private procesosCotizacionService: apiLogistics.ProcesosL01CotizacionService,
    private configuracionClientesDirecciones: ConfiguracionClientesDireccionesService,
    private processMailboxService: ProcesosMailbotService,
    private addressesConfigurationService: ConfiguracionDireccionesService,
    private appService: CoreContainerService,
    private dialog: MatDialog,
  ) {}

  //DOCS: SELECCIONAR UN CLIENTE Y NAVEGAR A LA VISTA DETALLES
  fetchIncomeLevel = createEffect(() =>
    this.actions$.pipe(
      ofType(preProcessDetailsActions.SET_CLIENT_SELECTED),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        // DOCS: Se consulta el catálogo para las addendas
        this.store.dispatch(catalogsActions.GET_UNIDAD_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_LEGAL_REPRESENTATIVE_LOAD());
        this.store.dispatch(
          preProcessingActions.SET_DETAILS_MODE({
            detailsMode: true,
          }),
        );
        this.store.dispatch(
          preProcessingActions.SET_DETAILS_COMPONENT({
            detailsComponent: true,
          }),
        );
        return this.clientServices.vClienteObtener(action.customer.IdCliente).pipe(
          map((response: VCliente) => {
            this.router.navigate([
              appRoutes.protected,
              appRoutes.pendings.pendings,
              appRoutes.preProcessing.preProcess,
              appRoutes.preProcessing.orderDetails,
            ]);
            this.store.dispatch(
              preProcessDetailsActions.SET_CLIENT_SELECTED_SUCCESS({
                customer: {
                  ...action.customer,
                  level: response.NivelIngreso,
                  ...response,
                  imageHover: buildImageNameSave(
                    `assets/Images/logos/${response.NombreImagen}_hover.png`,
                  ),
                } as CustomerList,
              }),
            );
            this.store.dispatch(preProcessDetailsActions.GET_DELIVERY_ADDRESSES());
            return preProcessDetailsActions.FETCH_PURCHASE_ORDER_LOAD();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Obtener Nivel de Ingreso.',
              ),
              error,
            );
            this.router.navigate([
              appRoutes.protected,
              appRoutes.pendings.pendings,
              appRoutes.preProcessing.preProcess,
              appRoutes.preProcessing.orderDetails,
            ]);
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
    ),
  );

  //DOCS: OBTENER LOS DIAS INHABILES
  fetchNonWorkingDays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(preProcessDetailsActions.SET_OPEN_POP_UP_TEE_ITEM_ORDER),
      withLatestFrom(this.store.select(preProcessOrderDetailsSelectors.selectDeliveryAddress)),
      mergeMap(([action, vDireccion]) => {
        const toDate: Date = new Date();
        toDate.setFullYear(toDate.getFullYear() + 2);
        const params: ConfiguracionClientesDireccionesService.DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoParams = {
          idDireccionCliente: vDireccion.IdDireccionCliente,
          desde: currentDateWithoutHoursUTCFormat(),
          hasta: getDateWithoutHoursUTCFormat(toDate),
        };
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.configuracionClientesDirecciones
          .DireccionClienteExtensionsFechasNoSePuedeEntregarPedido(params)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener dias inhabiles',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return preProcessDetailsActions.FETCH_NON_WORKING_DAYS_SUCCESS({
                nonWorkingDays: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener dias inhabiles',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(preProcessDetailsActions.FETCH_NON_WORKING_DAYS_FAILED());
            }),
          );
      }),
    ),
  );

  //DOCS: OBTENER LAS ORDENES DE COMPRA
  fetchPurchaseOrders = createEffect(() =>
    this.actions$.pipe(
      ofType(
        preProcessDetailsActions.FETCH_PURCHASE_ORDER_LOAD,
        preProcessDetailsActions.SET_OPTION_KEYPAD,
        preProcessDetailsActions.SET_ORDER_LIST,
        preProcessDetailsActions.SET_SEARCH_TERM,
        preProcessDetailsActions.FETCH_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(preProcessOrderDetailsSelectors.selectClient),
        this.store.select(preProcessOrderDetailsSelectors.selectQueryInfoListOrders),
      ),
      mergeMap(([action, client, queryInfo]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.pretramitarPedidoServices.vPpPedidoObtenerClientesOrdenDeCompra(queryInfo).pipe(
          map((response: QueryResultVPpPedidoObj) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Exito al obtener las ordenes de compra.',
              ),
              response,
            );
            const itemsOrder = buildItemFromPreProcessingOrderDetails(response, client);
            if (itemsOrder.TotalResults > 0) {
              this.store.dispatch(
                preProcessDetailsActions.SET_PURCHASE_ORDER_SELECTED({
                  item: itemsOrder.Results[0],
                  index: 1,
                }),
              );
              this.store.dispatch(
                preProcessDetailsActions.FETCH_COMPLETE_DATA_ESAC_LOAD({
                  item: itemsOrder.Results[0],
                }),
              );
              if (itemsOrder.Results[0].IdSolicitudAutorizacionCambio) {
                //DOCS: CODIGO DE VERIFICACIÓN
                // this.store.dispatch(
                //   quotedItemActions.GET_VERIFICATION_CODE_LOAD({
                //     order: itemsOrder.Results[0],
                //   }),
                // );
              }
              this.router.navigate([
                appRoutes.protected,
                appRoutes.pendings.pendings,
                appRoutes.preProcessing.preProcess,
                appRoutes.preProcessing.orderDetails,
              ]);
            } else {
              this.store.dispatch(SET_LOADING({payload: false}));
              // DOCS: SE REMOVIÓ action.type === '[Api-PreProcessOrderDetails] Set Order List' PORQUE CAUSABA REDIRECCIONAMIENTO A DASHBOARD
              if (action.type === '[PreProcessOrderDetails] Fetch Success') {
                this.router.navigate([
                  appRoutes.protected,
                  appRoutes.pendings.pendings,
                  appRoutes.preProcessing.preProcess,
                ]);
              } else {
                this.router.navigate([
                  appRoutes.protected,
                  appRoutes.pendings.pendings,
                  appRoutes.preProcessing.preProcess,
                  appRoutes.preProcessing.orderDetails,
                ]);
              }
            }
            return preProcessDetailsActions.FETCH_PURCHASE_ORDER_SUCCESS({
              data: itemsOrder,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Error al obtener las ordenes de compra.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(preProcessDetailsActions.FETCH_PURCHASE_ORDER_ERROR(error));
          }),
        );
      }),
    ),
  );

  //DOCS: OBTENER LOS DATOS DEL ESAC
  fetchDataCompleteOC = createEffect(() =>
    this.actions$.pipe(
      ofType(preProcessDetailsActions.FETCH_COMPLETE_DATA_ESAC_LOAD),
      mergeMap((action) => {
        if (isEmpty(action.item.user)) {
          this.store.dispatch(SET_LOADING({payload: true}));
          return this.usuarioServices.UsuarioObtener(action.item.IdUsuarioESAC).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al Obtener Datos del ESAC.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return preProcessDetailsActions.FETCH_COMPLETE_DATA_ESAC_SUCCESS({
                idPPPedido: action.item.IdPPPedido,
                user: response,
              });
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al Obtener Datos del ESAC.',
                ),
                error,
              );
              return of(preProcessDetailsActions.FETCH_COMPLETE_DATA_ESAC_FAILED());
            }),
          );
        } else {
          this.store.dispatch(SET_LOADING({payload: false}));
          return EMPTY;
        }
      }),
    ),
  );

  //DOCS: OBTENER LOS DETALLES DEL REQUERIMIENTO ( NUEVA FORMA)
  getDetailsIssues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(preProcessDetailsActions.SET_PURCHASE_ORDER_SELECTED),
      withLatestFrom(
        this.store.select(preProcessOrderDetailsSelectors.selectPurchaseOrderList),
        this.store.select(preProcessOrderDetailsSelectors.selectOrderSelected),
      ),
      mergeMap(([state, list, selectedOrder$]) => {
        if (state.item.needsToReload) {
          this.store.dispatch(
            preProcessDetailsActions.FETCH_ITEMS_ORDER_SELECTED_LOAD({
              itemId: state.item.IdPPPedido,
            }),
          );
          /*          this.store.dispatch(
            preProcessDetailsActions.SET_STATUS_API({
              status: API_REQUEST_STATUS_LOADING,
            }),
          );*/
          return this.processMailboxService
            .CorreoRecibidoClienteRequerimientoObtener(state.item.IdCorreoRecibidoCliente)
            .pipe(
              map((response: CorreoRecibidoClienteRequerimientoObj) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener los detalles de requerimientos',
                  ),
                  response,
                );
                this.store.dispatch(
                  preProcessDetailsActions.SET_STATUS_API({
                    status: API_REQUEST_STATUS_SUCCEEDED,
                  }),
                );
                return preProcessDetailsActions.FETCH_MAIL_PURCHASE_SUCCESS({
                  mail: response,
                  idPPedido: state.item.IdPPPedido,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener los detalles de requerimientos',
                  ),
                  error,
                );
                this.store.dispatch(preProcessDetailsActions.FETCH_MAIL_PURCHASE_FAILED({error}));
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        } else {
          this.store.dispatch(
            preProcessDetailsActions.RESTORE_PURCHASE_ORDER_BACKUP({
              selected: filter(list, (o: IOrder) => o.IdPPPedido === state.item.IdPPPedido)[0],
            }),
          );

          return EMPTY;
        }
      }),
    ),
  );

  // DOCS: OBTENER LAS PARTIDAS DE LA ORDEN DE COMPRA SELECCIONADA
  fetchMailPPOrderDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(preProcessDetailsActions.FETCH_ITEMS_ORDER_SELECTED_LOAD),
      withLatestFrom(
        this.store.select(preProcessOrderDetailsSelectors.selectClient),
        this.store.select(preProcessOrderDetailsSelectors.selectQueryItemsQuoteDetails),
      ),
      mergeMap(([{itemId}, client, queryInfo]) => {
        return this.pretramitarPedidoServices
          .PretramitarPedidoPartidasDetalleQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultPretramitarPedidoPartidaDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener partida pedido detalle.',
                ),
                response,
              );

              const itemsOrder = buildItemsQuoteOrderPurchase(client, response);
              forEach(itemsOrder.Results, (obj: PretramitarPedidoPartidaObj, index: number) => {
                this.store.dispatch(
                  preProcessDetailsActions.SET_VALIDATE_ENTRY_ITEM({
                    idQuote:
                      obj?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
                        ?.IdCotPartidaCotizacion,
                    value: obj.Tramitada,
                  }),
                );
              });

              this.store.dispatch(
                preProcessDetailsActions.FETCH_ITEMS_ORDER_SELECTED_SUCCESS({
                  itemsOrder,
                }),
              );
              this.store.dispatch(
                preProcessDetailsActions.SET_ENTRY_NEEDS_TO_RELOAD({
                  needsToReload: false,
                }),
              );

              return SET_LOADING({payload: false});
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener partida pedido detalle.',
                ),
                error,
              );
              this.store.dispatch(preProcessDetailsActions.FETCH_ITEMS_ORDER_SELECTED_FAILED());
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );

  //DOCS: ELIMINAR UNA PARTIDA DE LA ORDEN DE COMPRA SELECCIONADA
  //TODO: SE COMENTA PORQUE YA SE MENEJARÁ LA ELIMINACIÓN POR ESTADO
  deleteEntry = createEffect(() =>
    this.actions$.pipe(
      ofType(preProcessDetailsActions.DELETE_PP_ORDER_DETAILS_LOAD),
      withLatestFrom(this.store.select(preProcessOrderDetailsSelectors.selectOrderSelected)),
      mergeMap(([{entry}, selectedOrder$]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.pretramitarPedidoServices
          .ppPartidaPedidoDesactivar(entry.IdPPPartidaPedido)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al eliminar una partida pedido detalle.',
                ),
                response,
              );
              // this.store.dispatch(preProcessDetailsActions.INVALIDATE_AUTHORIZED_CODE_LOAD());
              return preProcessDetailsActions.FETCH_ITEMS_ORDER_SELECTED_LOAD({
                itemId: selectedOrder$.IdPPPedido,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al eliminar una partida pedido detalle.',
                ),
                error,
              );
              this.store.dispatch(preProcessDetailsActions.DELETE_PP_ORDER_DETAILS_FAILED());
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );

  //DOCS: OBTENER LA SOLICITUD DEL CODIGO DE AUTENTICACIÓN
  getCode = createEffect(() =>
    this.actions$.pipe(
      ofType(quotedItemActions.GET_VERIFICATION_CODE_LOAD),
      withLatestFrom(this.store.select(preProcessOrderDetailsSelectors.selectOrderSelected)),
      mergeMap(([action, selectedOrder$]) => {
        if (selectedOrder$.IdSolicitudAutorizacionCambio) {
          return this.usuariosAccesosService
            .SolicitudAutorizacionCambioObtener(selectedOrder$.IdSolicitudAutorizacionCambio)
            .pipe(
              map((response: SolicitudAutorizacionCambio) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener la solicitud del codigo de autenticacion.',
                  ),
                  response,
                );
                return quotedItemActions.GENERATE_VERIFICATION_CODE_SUCCESS({
                  codeRequest: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener la solicitud del codigo de autenticacion.',
                  ),
                  error,
                );
                this.store.dispatch(quotedItemActions.GENERATE_VERIFICATION_CODE_FAILED());
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

  //DOCS: ACTUALIZAR UNA PARTIDA DE PEDIDO DETALLE
  revertEntry = createEffect(() =>
    this.actions$.pipe(
      ofType(
        preProcessDetailsActions.UPDATE_PP_ORDER_DETAILS_LOAD,
        preProcessDetailsActions.RESTORE_REPLACED_PP_ORDER_DETAILS_LOAD,
      ),
      withLatestFrom(this.store.select(preProcessOrderDetailsSelectors.selectOrderSelected)),
      mergeMap(([action, selectedOrder$]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.pretramitarPedidoServices.ppPartidaPedidoGuardarOActualizar(action.entry).pipe(
          map((response: string) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al actualizar una partida pedido detalle.',
              ),
              response,
            );
            if (action['isReplaced']) {
              const replaced = {
                ...action.entry.ListaPPPartidaPedidoOriginales[0],
                IdPPPPartidaPedidoCorregida: null,
                Activo: true,
              };
              return preProcessDetailsActions.RESTORE_REPLACED_PP_ORDER_DETAILS_LOAD({
                entry: replaced,
              });
            } else {
              // this.store.dispatch(preProcessDetailsActions.INVALIDATE_AUTHORIZED_CODE_LOAD());
              return preProcessDetailsActions.FETCH_ITEMS_ORDER_SELECTED_LOAD({
                itemId: selectedOrder$.IdPPPedido,
              });
            }
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al actualizar una partida pedido detalle.',
              ),
              error,
            );
            this.store.dispatch(preProcessDetailsActions.UPDATE_PP_ORDER_DETAILS_FAILED());
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
    ),
  );

  //DOCS: TRANSACCIÓN PARA TRAMITAR ORDEN DE COMRPA (NUEVA FORMA)
  processEntries = createEffect(() =>
    this.actions$.pipe(
      ofType(preProcessDetailsActions.PROCESS_ENTRIES_LOAD),
      withLatestFrom(
        this.store.select(preProcessOrderDetailsSelectors.selectOrderSelected),
        this.store.select(preProcessOrderDetailsSelectors.validatorForTramitableAndIntramitable),
        this.store.select(preProcessOrderDetailsSelectors.selectClient),
      ),
      mergeMap(([action, selectedOrder, validator, selectedClient]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const body: GMPretramitarPedido = buildBodyRequestSaveOrderTransaction(
          selectedOrder,
          validator,
        );
        return this.pretramitarPedidoServices
          .PretramitarPedidoTramitarProcessTransaccion(body)
          .pipe(
            map((response: GMPretramitarPedido) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al pretramitar un pedido.',
                ),
                response,
              );
              const extraMessage = selectedOrder.OrdenDeCompra
                ? `el pedido de ${selectedClient.Nombre} · ${selectedOrder.OrdenDeCompra} `
                : `el pedido de ${selectedClient.Nombre} sin OC`;
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has pretramitado',
                  extraMessage,
                }),
              );
              return preProcessDetailsActions.FETCH_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al pretramitar un pedido.',
                ),
                error,
              );
              this.store.dispatch(preProcessDetailsActions.PROCESS_ENTRIES_FAILED());
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );

  viewFileRequest = createEffect(
    () =>
      this.actions$.pipe(
        ofType(preProcessDetailsActions.VIEW_FILE_LOAD),
        mergeMap((action) => {
          this.store.dispatch(preProcessDetailsActions.VIEW_FILE_IS_LOADING({value: true}));
          this.appService.setFile({isLoading: true});
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response) => {
              let base64 = null;
              if (response && response.Url) {
                if (isPdf(action.ext)) {
                  base64 = await convertPDFFileFromURLToBase64(response.Url, true);
                  if (action.ext === 'pdf') {
                    this.store.dispatch(preProcessDetailsActions.SET_IS_PDF({value: true}));
                  }
                }
                if (isImage(action.ext)) {
                  this.store.dispatch(preProcessDetailsActions.SET_IS_PDF({value: false}));
                  base64 = await getBase64FromUrl(response.Url, action.ext);
                }
              }
              this.store.dispatch(preProcessDetailsActions.SET_OPEN_VIEW_FILE({active: true}));
              this.store.dispatch(
                preProcessDetailsActions.VIEW_FILE_SUCCESS({
                  fileBase64: base64,
                }),
              );
              this.appService.setFile({
                ...response,
                nombre: getNameFile(response?.FileKey),
                archivoBase64: base64,
                isPdf: isPdf(action.ext),
              });
              this.store.dispatch(preProcessDetailsActions.VIEW_FILE_IS_LOADING({value: false}));
            }),
            catchError((error) => {
              return of(preProcessDetailsActions.VIEW_FILE_ERROR());
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  // DOCS: OBTIENE EL PDF DE LAS COTIZACIONES VINCULADAS PDF
  itemsLinted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(preProcessDetailsActions.SET_ITEM_LINKED),
        withLatestFrom(
          this.store.select(preProcessOrderDetailsSelectors.selectClient),
          this.store.select(preProcessOrderDetailsSelectors.selectIsInAddItem),
          this.store.select(addItemSelectors.selectQuoteSelect),
          this.store.select(preProcessOrderDetailsSelectors.selectTermSearch),
        ),
        mergeMap(([action, client, isInAddItem, quoteSelected, termSearch]) => {
          const quote = action.item.vPartidaCotizacion;
          const params = new FiltersOnlyActive();
          if (isInAddItem) {
            if (isEmpty(termSearch)) {
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
                  ValorFiltro: quoteSelected.IdCotCotizacion,
                },
              );
            }
          } else {
            params.Filters.push({
              NombreFiltro: 'IdPPPartidaPedido',
              ValorFiltro: action.item.IdPPPartidaPedido,
            });
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
                if (isInAddItem) {
                  this.store.dispatch(
                    addItemsQuoteActions.UPDATE_ADD_ITEM_LIST({
                      IdCotPartidaCotizacion: action.item.IdCotPartidaCotizacion,
                      linkedQuotes: response.Results,
                    }),
                  );
                } else {
                  this.store.dispatch(
                    preProcessDetailsActions.UPDATE_QUOTE_ITEMS_LIST({
                      IdPPPartidaPedido: action.item.IdPPPartidaPedido,
                      linkedQuotes: response.Results,
                    }),
                  );
                }
                if (response.TotalResults === 1) {
                  this.store.dispatch(
                    preProcessDetailsActions.SET_ITEM_LINKED_OPEN({
                      item: 'FO-' + response.Results[0].Folio,
                    }),
                  );
                  this.store.dispatch(
                    preProcessDetailsActions.SET_OPEN_VIEW_FILE({
                      active: true,
                    }),
                  );
                  this.store.dispatch(
                    preProcessDetailsActions.SET_ID_ARCHIVO_PDF({
                      IdArchivo: response.Results[0].IdArchivoPDF,
                    }),
                  );
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
            if (action.item.quotesLinked.length === 1) {
              this.store.dispatch(
                preProcessDetailsActions.SET_ID_ARCHIVO_PDF({
                  IdArchivo: action.item.quotesLinked[0].IdArchivoPDF,
                }),
              );
              this.store.dispatch(
                preProcessDetailsActions.SET_ITEM_LINKED_OPEN({
                  item: 'FO-' + action.item.quotesLinked[0].Folio,
                }),
              );
            }
            this.store.dispatch(
              addItemsQuoteActions.UPDATE_ADD_ITEM_LIST({
                linkedQuotes: [],
                IdCotPartidaCotizacion: action.item.IdCotPartidaCotizacion,
              }),
            );
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );

  //DOCS: INVALIDAR CODIGO DE AUTORIZACIÓN
  //TODO: EFECTOS DEL CODIGO DE VERIFICACIÓN, ACTUALMENTE NO ES REQUERIDO

  // invalidateAuthorizedCode = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(preProcessDetailsActions.INVALIDATE_AUTHORIZED_CODE_LOAD),
  //     withLatestFrom(this.store.select(preProcessOrderDetailsSelectors.selectPurchaseOrderItem)),
  //     mergeMap(([action, selectedOrder$]) => {
  //       if (!selectedOrder$.IdSolicitudAutorizacionCambio) {
  //         return EMPTY;
  //       }
  //       const order = {
  //         ...selectedOrder$,
  //         IdSolicitudAutorizacionCambio: null,
  //       };
  //       return this.pretramitarPedidoServices.ppPedidoGuardarOActualizar(order).pipe(
  //         map((response: string) => {
  //           this.logger.debug(
  //             servicesLogger.generateMessage(
  //               FILE_NAME,
  //               servicesLogger.LOG_SUCCEEDED,
  //               'al invalidar el codigo de autorizacion.',
  //             ),
  //             response,
  //           );
  //           return preProcessDetailsActions.INVALIDATE_AUTHORIZED_CODE_SUCCESS();
  //         }),
  //         catchError((error) => {
  //           this.logger.debug(
  //             servicesLogger.generateMessage(
  //               FILE_NAME,
  //               servicesLogger.LOG_FAILED,
  //               'al invalidar el codigo de autorizacion.',
  //             ),
  //             error,
  //           );
  //           this.store.dispatch(preProcessDetailsActions.INVALIDATE_AUTHORIZED_CODE_FAILED());
  //           this.store.dispatch(SET_LOADING({payload: false}));
  //           return EMPTY;
  //         }),
  //       );
  //     }),
  //   ),
  // );

  //DOCS: VALIDAR CODIGO DE AUTORIZACIÓN
  //TODO: EFECTOS DEL CODIGO DE VERIFICACIÓN, ACTUALMENTE NO ES REQUERIDO

  // fetchCodeRequestOC = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(preProcessDetailsActions.FETCH_VERIFICATION_CODE_REQUEST_LOAD),
  //     mergeMap((action) => {
  //       return this.usuariosAccesosService
  //         .SolicitudAutorizacionCambioObtener(action.item.IdSolicitudAutorizacionCambio)
  //         .pipe(
  //           map((response: SolicitudAutorizacionCambio) => {
  //             this.logger.debug(
  //               servicesLogger.generateMessage(
  //                 FILE_NAME,
  //                 servicesLogger.LOG_SUCCEEDED,
  //                 'Al Obtener Datos del ESAC.',
  //               ),
  //               response,
  //             );
  //             return preProcessDetailsActions.FETCH_VERIFICATION_CODE_REQUEST_SUCCESS({
  //               idPPPedido: action.item.IdPPPedido,
  //               codeRequest: response,
  //             });
  //           }),
  //           catchError((error) => {
  //             this.store.dispatch(SET_LOADING({payload: false}));
  //             this.logger.debug(
  //               servicesLogger.generateMessage(
  //                 FILE_NAME,
  //                 servicesLogger.LOG_FAILED,
  //                 'Al Obtener Datos del ESAC.',
  //               ),
  //               error,
  //             );
  //             return of(preProcessDetailsActions.FETCH_VERIFICATION_CODE_REQUEST_FAILED());
  //           }),
  //         );
  //     }),
  //   ),
  // );

  // DOCS: Descarga el archivo vinculado seleccionado
  getIDArchivoDetalle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(preProcessDetailsActions.SET_ID_ARCHIVO_PDF),
        mergeMap((action) => {
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response) => {
              const splits = response.FileKey.split('.');
              const ext = splits[splits.length - 1];
              this.store.dispatch(
                preProcessDetailsActions.VIEW_FILE_LOAD({
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

  // DOCS: GET DELIVERY ADDRESSES BY CLIENT
  getDeliveryAddresses = createEffect(() =>
    this.actions$.pipe(
      ofType(preProcessDetailsActions.GET_DELIVERY_ADDRESSES),
      withLatestFrom(this.store.select(preProcessOrderDetailsSelectors.selectClient)),
      mergeMap(([action, clientSelected]) => {
        const payload = {
          Filters: [
            {
              NombreFiltro: 'IdCliente',
              ValorFiltro: clientSelected.IdCliente,
            },
            {
              NombreFiltro: 'ClaveTipoDireccion',
              ValorFiltro: 'entrega',
            },
          ],
        };

        return this.addressesConfigurationService.vDireccionQueryResult(payload).pipe(
          map((response: QueryResultVDireccion) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener direcciones de entrega.',
              ),
              response,
            );
            return preProcessDetailsActions.GET_DELIVERY_ADDRESSES_SUCCESS({
              deliveryAddresses: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener direcciones de entrega.',
              ),
              error,
            );
            return of(preProcessDetailsActions.GET_DELIVERY_ADDRESSES_ERROR());
          }),
        );
      }),
    ),
  );

  // DOCS: ABRE DIALOG DE DETALLES DE PARTIDA DESPUÉS DE OBTENER LOS DÍAS NO LABORALES.
  showItemDetailsDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(preProcessDetailsActions.FETCH_NON_WORKING_DAYS_SUCCESS),
        mergeMap((action) => {
          const dialogRef = this.dialog.open(SeeQuotedItemPopUpComponent, buildDialogConfig({}));

          dialogRef.afterClosed().subscribe((event: boolean) => {
            if (event) {
              this.store.dispatch(preProcessDetailsActions.SET_DATA_ITEM_ORDER_SELECTED());
            }
            this.store.dispatch(
              preProcessDetailsActions.CLOSE_POP_UP_TEE_ITEM_ORDER({value: false}),
            );
          });
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: ACTUALIZA LA REFERENCIA DEL PEDIDO
  updateReference$ = createEffect(() =>
    this.actions$.pipe(
      ofType(preProcessDetailsActions.SET_UPDATE_REFERENCE_LOAD),
      withLatestFrom(
        this.store.select(preProcessOrderDetailsSelectors.selectOrderSelected),
        this.store.select(preProcessOrderDetailsSelectors.selectClient),
      ),
      mergeMap(([{reference}, order, client]) => {
        if (reference === order.OrdenDeCompra) {
          return EMPTY;
        }
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.processPurchasePServices
          .pcPromesaDeCompraExtensionsActulizarRefecrenciaOrdenDeCompra({
            IdCliente: client.IdCliente,
            NuevaReferenciaOC: reference,
            IdppPedido: order.IdPPPedido,
          })
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Actualizar la referencia del pedido',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return preProcessDetailsActions.SET_UPDATE_REFERENCE_SUCCESS({reference});
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Actualizar la referencia del pedido',
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
