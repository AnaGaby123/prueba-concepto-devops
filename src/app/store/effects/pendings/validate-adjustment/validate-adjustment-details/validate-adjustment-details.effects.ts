import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';

// Services API
import * as apiLog from 'api-logistica';
import * as apiLogistic from 'api-logistica';
import {
  CorreoRecibidoClienteRequerimientoObj,
  GMPretramitarPedido,
  ProcesosMailbotService,
  QueryResultPretramitarPedidoPartidaDetalle,
} from 'api-logistica';
import * as apiCat from 'api-catalogos';
import {ConfiguracionDireccionesService, QueryResultVDireccion} from 'api-catalogos';

// Models
import {
  IOrder,
  IPpPartidaPedidoDetalleValidateAdjustment,
} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.models';

// Actions
import {
  validateAdjustmentActions,
  validateAdjustmentDetailActions,
} from '@appActions/pendings/validate-adjustment';
import {SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';

// Selectors
import {validateAdjustmentDetailsSelectors} from '@appSelectors/pendings/validate-adjustment';

// Utils
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import * as servicesLogger from '@appUtil/logger';
import {convertPDFFileFromURLToBase64, getBase64FromUrl} from '@appUtil/files';
import {appRoutes} from '@appHelpers/core/app-routes';
import {
  buildBodyRequestSaveOrderTransactionValidate,
  buildItemsOrderDetails,
  buildOrdersFromSubDashboardDetails,
} from '@appHelpers/pending/validate-adjustment/validate-adjusment.helpers';
import {getNameFile, isImage, isPdf} from '@appUtil/util';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

const FILE_NAME = 'validate-adjustment-details.effects.ts';

@Injectable()
export class ValidateAdjustmentDetailsEffects {
  constructor(
    private route: Router,
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private customersServices: apiCat.ConfiguracionClientesService,
    private pretramitarPedidoServices: apiLog.ProcesosL04PretramitarPedidoService,
    private sistemaArchivosService: apiCat.SistemaArchivosService,
    private usuarioServices: apiCat.SistemaUsuariosService,
    private processMailboxService: ProcesosMailbotService,
    private addressesConfigurationService: ConfiguracionDireccionesService,
    private appService: CoreContainerService,
    private processPurchasePServices: apiLogistic.ProcesosL03PromesaDeCompraService,
  ) {}

  setCustomerValidateAdjustment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(validateAdjustmentDetailActions.SET_CUSTOMER_VALIDATE_ADJUSTMENT),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        this.store.dispatch(
          validateAdjustmentActions.SET_ALLOWED_TO_DETAILS_VALUE({
            allowedToDetails: true,
          }),
        );
        this.store.dispatch(
          validateAdjustmentActions.SET_IS_IN_DETAILS_VIEW({isInDetailsView: true}),
        );
        return this.customersServices.vClienteObtener(action.customer.IdCliente).pipe(
          map((response: apiCat.VCliente) => {
            this.route.navigate([
              appRoutes.protected,
              appRoutes.pendings.pendings,
              appRoutes.validateAdjustment.validateAdjustment,
              appRoutes.validateAdjustment.details,
            ]);
            return validateAdjustmentDetailActions.SET_CUSTOMER_VALIDATE_ADJUSTMENT_SUCCESS({
              customer: {
                ...response,
                level: response.NivelIngreso,
                dataDashboard: {...action.customer},
                NombreImagen: response.NombreImagen,
                Categoria: response.Categoria,
                imageHover: `assets/Images/logos/${response.NombreImagen?.toLowerCase()}_hover.png`,
              },
            });
          }),
        );
      }),
    ),
  );
  fetchPurchaseOrders = createEffect(() =>
    this.actions$.pipe(
      ofType(
        validateAdjustmentDetailActions.SET_CUSTOMER_VALIDATE_ADJUSTMENT_SUCCESS,
        validateAdjustmentDetailActions.FETCH_PURCHASE_ORDER_LOAD, //DOCS: CUANDO SE EJECUTA LA TRANSACCIÓN CON ÉXITO
        // validateAdjustmentDetailActions.SET_OPTION_KEYPAD,
        validateAdjustmentDetailActions.SET_ORDER_LIST,
        validateAdjustmentDetailActions.SET_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(validateAdjustmentDetailsSelectors.selectQueryInfoSubDashboardDetails),
      ),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.pretramitarPedidoServices.vPpPedidoObtenerClientesOrdenDeCompra(queryInfo).pipe(
          map((response: apiLog.QueryResultVPpPedidoObj) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Exito al obtener las ordenes de compra.',
              ),
              response,
            );
            const orders: IOrder[] = buildOrdersFromSubDashboardDetails(response);
            if (response.TotalResults > 0) {
              this.store.dispatch(
                validateAdjustmentDetailActions.FETCH_PURCHASE_ORDER_SUCCESS({
                  data: {
                    Results: orders,
                    TotalResults: response.TotalResults,
                  },
                }),
              );

              return validateAdjustmentDetailActions.SET_PURCHASE_ORDER_SELECTED({
                order: orders[0],
              });
            }
            if (
              action.type === '[API-Validate-Adjustment-Details] Fetch Purchase Load' &&
              response.TotalResults == 0
            ) {
              this.route.navigate([
                appRoutes.protected,
                appRoutes.pendings.pendings,
                appRoutes.validateAdjustment.validateAdjustment,
              ]);
            }
            this.store.dispatch(SET_LOADING({payload: false}));
            return validateAdjustmentDetailActions.WITHOUT_ORDERS_RESULT();
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
            return of(validateAdjustmentDetailActions.FETCH_PURCHASE_ORDER_ERROR(error));
          }),
        );
      }),
    ),
  );

  //DOCS: OBTENER LOS DETALLES DEL REQUERIMIENTO (NUEVA FORMA)
  fetchMailValidateAdjustment = createEffect(() =>
    this.actions$.pipe(
      ofType(validateAdjustmentDetailActions.SET_PURCHASE_ORDER_SELECTED),
      switchMap(({order}) => {
        if (order.IdCorreoRecibidoCliente && order.needsToReload) {
          return this.processMailboxService
            .CorreoRecibidoClienteRequerimientoObtener(order.IdCorreoRecibidoCliente)
            .pipe(
              map((response: CorreoRecibidoClienteRequerimientoObj) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener el correo recibido cliente.',
                  ),
                  response,
                );
                return validateAdjustmentDetailActions.FETCH_MAIL_PURCHASE_SUCCESS({
                  mail: response,
                  order,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener el correo recibido cliente.',
                  ),
                  error,
                );
                return of(validateAdjustmentDetailActions.FETCH_MAIL_PURCHASE_FAILED());
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  //DOCS: OBTENER DATOS DEL ESAC
  fetchDataCompleteOC = createEffect(() =>
    this.actions$.pipe(
      ofType(validateAdjustmentDetailActions.FETCH_MAIL_PURCHASE_SUCCESS),
      mergeMap(({order}) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        if (order.needsToReload) {
          return this.usuarioServices.UsuarioObtener(order.IdUsuarioESAC).pipe(
            map((response: apiCat.Usuario) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al Obtener Datos del ESAC.',
                ),
                response,
              );
              // this.store.dispatch(
              //   validateAdjustmentDetailActions.FETCH_MAIL_PP_ORDER_DETAILS_LOAD({
              //     purchaseOrder: orderSelected,
              //   }),
              // );
              return validateAdjustmentDetailActions.FETCH_COMPLETE_DATA_SUCCESS({
                idOc: order.IdPPPedido,
                user: response,
                order,
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
              return of(validateAdjustmentDetailActions.FETCH_COMPLETE_DATA_FAILED({error}));
            }),
          );
        } else {
          return of(
            validateAdjustmentDetailActions.FETCH_COMPLETE_DATA_SUCCESS({
              idOc: order.IdPPPedido,
              user: order.user,
              order,
            }),
          );
        }
      }),
    ),
  );
  fetchItemsOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(validateAdjustmentDetailActions.FETCH_COMPLETE_DATA_SUCCESS),
      withLatestFrom(
        this.store.select(validateAdjustmentDetailsSelectors.selectQueryItemsQuoteDetails),
      ),
      mergeMap(([{order}, queryInfo]) => {
        if (order.needsToReload) {
          return this.pretramitarPedidoServices
            .PretramitarPedidoPartidasDetalleQueryResult(queryInfo)
            .pipe(
              map((response: QueryResultPretramitarPedidoPartidaDetalle) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener partidas pedido detalle.',
                  ),
                  response,
                );
                const itemsOrder: IPpPartidaPedidoDetalleValidateAdjustment[] = buildItemsOrderDetails(
                  response.Results,
                );
                this.store.dispatch(
                  validateAdjustmentDetailActions.FETCH_MAIL_PP_ORDER_DETAILS_SUCCESS({
                    itemsOrder,
                  }),
                );
                this.store.dispatch(
                  validateAdjustmentDetailActions.UPDATE_ORDER_DETAILS({
                    order,
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
                this.store.dispatch(
                  validateAdjustmentDetailActions.FETCH_MAIL_PP_ORDER_DETAILS_FAILED(),
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        } else {
          this.store.dispatch(
            validateAdjustmentDetailActions.FETCH_MAIL_PP_ORDER_DETAILS_SUCCESS({
              itemsOrder: order.itemsOrderSelected,
            }),
          );
          this.store.dispatch(
            validateAdjustmentDetailActions.UPDATE_ORDER_DETAILS({
              order,
            }),
          );
          return of(SET_LOADING({payload: false}));
        }
      }),
    ),
  );

  viewFileRequest = createEffect(
    () =>
      this.actions$.pipe(
        ofType(validateAdjustmentDetailActions.VIEW_FILE_LOAD),
        mergeMap((action) => {
          this.appService.setFile({isLoading: true});
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdFile).pipe(
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
                validateAdjustmentDetailActions.VIEW_FILE_SUCCESS({
                  fileBase64: base64,
                }),
              );
              this.appService.setFile({
                ...response,
                nombre: getNameFile(response?.FileKey),
                archivoBase64: base64,
                isPdf: isPdf(action.ext),
              });
            }),
            catchError((error) => {
              return of(validateAdjustmentDetailActions.VIEW_FILE_FAILED(error));
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  //DOCS: TRANSACCCIÓN PARA TRAMITAR OC SIN ERRORES
  processEntries = createEffect(() =>
    this.actions$.pipe(
      ofType(validateAdjustmentDetailActions.PROCESS_ENTRIES_LOAD),
      withLatestFrom(
        this.store.select(validateAdjustmentDetailsSelectors.selectedOrder),
        this.store.select(validateAdjustmentDetailsSelectors.validatorForTramitableAndIntramitable),
        this.store.select(validateAdjustmentDetailsSelectors.selectCustomer),
      ),
      switchMap(([action, selectedOrder, validator, selectedClient]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const body: GMPretramitarPedido = buildBodyRequestSaveOrderTransactionValidate(
          selectedOrder,
          validator,
        );
        return this.pretramitarPedidoServices
          .PretramitarPedidoTramitarProcessTransaccionValidarAjusteOC(body)
          .pipe(
            map((response: GMPretramitarPedido) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al validar ajuste de un pedido.',
                ),
                response,
              );
              const extraMessage = `en la OC-${selectedOrder.OrdenDeCompra} de ${selectedClient.Nombre}`;
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has validado ajustes',
                  extraMessage,
                }),
              );
              return validateAdjustmentDetailActions.FETCH_PURCHASE_ORDER_LOAD();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al validar ajuste de un peddo.',
                ),
                error,
              );
              this.store.dispatch(validateAdjustmentDetailActions.PROCESS_ENTRIES_FAILED());
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS: GET DELIVERY ADDRESSES LIST BY CLIENT ID
  getDeliveryAddresses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        validateAdjustmentDetailActions.SET_CUSTOMER_VALIDATE_ADJUSTMENT_SUCCESS,
        validateAdjustmentDetailActions.GET_DELIVERY_ADDRESSES,
      ),
      withLatestFrom(this.store.select(validateAdjustmentDetailsSelectors.selectCustomer)),
      mergeMap(([action, clientSelected]) => {
        const payload = {
          Filters: [
            {
              NombreFiltro: 'IdCliente',
              ValorFiltro: clientSelected?.IdCliente,
            },
            {
              NombreFiltro: 'ClaveTipoDireccion',
              ValorFiltro: 'entrega',
            },
          ],
        };
        return this.addressesConfigurationService.vDireccionQueryResult(payload).pipe(
          map((response: QueryResultVDireccion) => {
            return validateAdjustmentDetailActions.GET_DELIVERY_ADDRESSES_SUCCESS({
              deliveryAddresses: response.Results,
            });
          }),
          catchError((error) => {
            return of(validateAdjustmentDetailActions.GET_DELIVERY_ADDRESSES_ERROR());
          }),
        );
      }),
    ),
  );

  // DOCS: ACTUALIZAR LA REFERENCIA DE LA ORDEN DE COMPRA SELECCIONADA
  updateReference$ = createEffect(() =>
    this.actions$.pipe(
      ofType(validateAdjustmentDetailActions.SET_UPDATE_REFERENCE_LOAD),
      withLatestFrom(
        this.store.select(validateAdjustmentDetailsSelectors.selectedOrder),
        this.store.select(validateAdjustmentDetailsSelectors.selectCustomer),
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
                  'Actualizar la referencia de la orden de compra',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return validateAdjustmentDetailActions.SET_UPDATE_REFERENCE_SUCCESS({reference});
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Actualizar la referencia de la orden de compra',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // processEntries = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(validateAdjustmentDetailActions.PROCESS_ENTRIES_LOAD),
  //     withLatestFrom(
  //       this.store.select(validateAdjustmentDetailsSelectors.selectedOrder),
  //       this.store.select(validateAdjustmentDetailsSelectors.selectActiveEntriesListResults),
  //     ),
  //     mergeMap(([action, selectedOrder$, entries$]) => {
  //       this.store.dispatch(SET_LOADING({payload: true}));
  //       const body = {
  //         ...selectedOrder$.ppPedidoConfiguracion,
  //         DireccionClienteEntregaValidado: true,
  //         ContactoClienteEntregaValidado: true,
  //         IdContactoClienteEntrega: selectedOrder$.IdContactoCliente,
  //       };
  //       return this.pretramitarPedidoServices.ppPedidoConfiguracionGuardarOActualizar(body).pipe(
  //         map((response) => {
  //           this.logger.debug(
  //             servicesLogger.generateMessage(
  //               FILE_NAME,
  //               servicesLogger.LOG_SUCCEEDED,
  //               'al actualizar ppPedidoConfiguracion.',
  //             ),
  //             response,
  //           );
  //           const tramitableObj: TramitableObject = {
  //             tramitable: action.tramitable,
  //             selectedOrder: {
  //               ...selectedOrder$,
  //               ppPedidoConfiguracion: {...body},
  //             },
  //             entries: entries$,
  //           };
  //           return tramitableObj;
  //         }),
  //         catchError((error) => {
  //           this.logger.debug(
  //             servicesLogger.generateMessage(
  //               FILE_NAME,
  //               servicesLogger.LOG_FAILED,
  //               'al actualizar ppPedidoConfiguracion.',
  //             ),
  //             error,
  //           );
  //           this.store.dispatch(validateAdjustmentDetailActions.PROCESS_ENTRIES_FAILED());
  //           this.store.dispatch(SET_LOADING({payload: false}));
  //           return EMPTY;
  //         }),
  //       );
  //     }),
  //     switchMap((tramitableObj$: TramitableObject) => {
  //       const incidences: IPpPartidaPedidoDetalle[] = _.filter(
  //         tramitableObj$.entries,
  //         (o: IPpPartidaPedidoDetalle) =>
  //           o.ppIncidenciaPartida.Comentarios &&
  //           (o.ppIncidenciaPartida.Catalogo ||
  //             o.ppIncidenciaPartida.Descripcion ||
  //             o.ppIncidenciaPartida.Presentacion ||
  //             o.ppIncidenciaPartida.Marca ||
  //             o.ppIncidenciaPartida.TiempoEstimadoEntrega ||
  //             o.ppIncidenciaPartida.IVA ||
  //             o.ppIncidenciaPartida.PrecioUnitario),
  //       );
  //       if (!_.isEmpty(incidences)) {
  //         const request: any[] = _.map(incidences, (o) =>
  //           this.pretramitarPedidoServices.ppIncidenciaPartidaGuardarOActualizar(
  //             o.ppIncidenciaPartida,
  //           ),
  //         );
  //         return forkJoin(request).pipe(
  //           map((response) => {
  //             this.logger.debug(
  //               servicesLogger.generateMessage(
  //                 FILE_NAME,
  //                 servicesLogger.LOG_SUCCEEDED,
  //                 'al guardar las incidencias de las partidas.',
  //               ),
  //               response,
  //             );
  //             let counter = -1;
  //             const newEntries: IPpPartidaPedidoDetalle[] = _.map(
  //               tramitableObj$.entries,
  //               (o: IPpPartidaPedidoDetalle) => {
  //                 if (
  //                   o.ppIncidenciaPartida.Comentarios &&
  //                   (o.ppIncidenciaPartida.Catalogo ||
  //                     o.ppIncidenciaPartida.Descripcion ||
  //                     o.ppIncidenciaPartida.Presentacion ||
  //                     o.ppIncidenciaPartida.Marca ||
  //                     o.ppIncidenciaPartida.TiempoEstimadoEntrega ||
  //                     o.ppIncidenciaPartida.IVA ||
  //                     o.ppIncidenciaPartida.PrecioUnitario)
  //                 ) {
  //                   counter++;
  //                   return {
  //                     ...o,
  //                     IdPPIncidenciaPartidaPedido: extractID(response[counter]),
  //                     ppIncidenciaPartida: {
  //                       ...o.ppIncidenciaPartida,
  //                       IdPPIncidenciaPartida: extractID(response[counter]),
  //                     },
  //                   };
  //                 } else {
  //                   return {...o};
  //                 }
  //               },
  //             );
  //             const tramitableObj: TramitableObject = {
  //               ...tramitableObj$,
  //               entries: newEntries,
  //             };
  //             return tramitableObj;
  //           }),
  //           catchError((error) => {
  //             this.logger.debug(
  //               servicesLogger.generateMessage(
  //                 FILE_NAME,
  //                 servicesLogger.LOG_FAILED,
  //                 'al guardar las incidencias de las partidas.',
  //               ),
  //               error,
  //             );
  //             this.store.dispatch(validateAdjustmentDetailActions.PROCESS_ENTRIES_FAILED());
  //             this.store.dispatch(SET_LOADING({payload: false}));
  //             return EMPTY;
  //           }),
  //         );
  //       } else {
  //         return of(tramitableObj$);
  //       }
  //     }),
  //     switchMap((tramitableObj$: TramitableObject) => {
  //       const request: any[] = _.map(tramitableObj$.entries, (o) =>
  //         this.pretramitarPedidoServices.ppPartidaPedidoGuardarOActualizar(o),
  //       );
  //       return forkJoin(request).pipe(
  //         map((response) => {
  //           this.logger.debug(
  //             servicesLogger.generateMessage(
  //               FILE_NAME,
  //               servicesLogger.LOG_SUCCEEDED,
  //               'al tramitar partidas.',
  //             ),
  //             response,
  //           );
  //           return {...tramitableObj$} as TramitableObject;
  //         }),
  //         catchError((error) => {
  //           this.logger.debug(
  //             servicesLogger.generateMessage(
  //               FILE_NAME,
  //               servicesLogger.LOG_FAILED,
  //               'al tramitar partidas.',
  //             ),
  //             error,
  //           );
  //           this.store.dispatch(validateAdjustmentDetailActions.PROCESS_ENTRIES_FAILED());
  //           this.store.dispatch(SET_LOADING({payload: false}));
  //           return EMPTY;
  //         }),
  //       );
  //     }),
  //     withLatestFrom(this.store.select(validateAdjustmentDetailsSelectors.selectCustomer)),
  //     switchMap(([tramitableObj$, client$]) => {
  //       const order = {
  //         ...tramitableObj$.selectedOrder,
  //         Intramitable: !tramitableObj$.tramitable
  //           ? true
  //           : tramitableObj$.selectedOrder.Intramitable,
  //         Tramitado: tramitableObj$.tramitable ? true : tramitableObj$.selectedOrder.Tramitado,
  //       };
  //       return this.pretramitarPedidoServices.ppPedidoGuardarOActualizar(order).pipe(
  //         map((response: string) => {
  //           this.logger.debug(
  //             servicesLogger.generateMessage(
  //               FILE_NAME,
  //               servicesLogger.LOG_SUCCEEDED,
  //               'al tramitar la orden de compra.',
  //             ),
  //             response,
  //           );
  //           const extraMessage = `en la OC-${tramitableObj$.selectedOrder.OrdenDeCompra} de ${client$.Nombre}`;
  //           this.store.dispatch(SET_LOADING({payload: false}));
  //           this.store.dispatch(
  //             SET_LOADING_SUCCESS({
  //               active: true,
  //               message: 'Has validado ajustes',
  //               extraMessage,
  //             }),
  //           );
  //           return validateAdjustmentDetailActions.FETCH_PURCHASE_ORDER_LOAD();
  //         }),
  //         catchError((error) => {
  //           this.logger.debug(
  //             servicesLogger.generateMessage(
  //               FILE_NAME,
  //               servicesLogger.LOG_FAILED,
  //               'al tramitar la orden de compra.',
  //             ),
  //             error,
  //           );
  //           this.store.dispatch(validateAdjustmentDetailActions.PROCESS_ENTRIES_FAILED());
  //           this.store.dispatch(SET_LOADING({payload: false}));
  //           return EMPTY;
  //         }),
  //       );
  //     }),
  //   ),
  // );
}
