import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';

import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, forkJoin, from, lastValueFrom, Observable, of} from 'rxjs';
import {Router} from '@angular/router';

/* Actions Imports */
import {
  orderModificationDetailsActions,
  orderModificationListActions,
} from '@appActions/pendings/order-modification';

/* Selectors Imports */
import {orderModificationDetailSelectors} from '@appSelectors/pendings/order-modification';
import * as authSelectors from '@appSelectors/auth/auth.selectors';

/* Models Import */
import * as apiCatalogs from 'api-catalogos';
import {
  ArchivoDetalle,
  RequestMoverArchivo,
  SistemaUsuariosAccessosService,
  SolicitudAutorizacionCambio,
  UrlSubirArchivo,
} from 'api-catalogos';
import * as apiLogistic from 'api-logistica';
import {
  ParametroSepararPedido,
  QueryResultVTramitarPedido,
  TpArchivoAdicionalPedido,
  TpPartidaPedido,
  TpPedido,
  TupleBooleanString,
  VTramitarPedidoPartidaDetalle,
} from 'api-logistica';
import {
  IFileUpload,
  initialIOrdersC,
  IOrdersC,
  IPurchaseOrderDetails,
  IPurchaseOrderItem,
} from '@appModels/store/pendings/order-modification/order-modification-details/order-modification-details.models';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
  MINIO_BUCKETS,
} from '@appUtil/common.protocols';
import {FiltersOnlyActive} from '@appModels/filters/Filters';

/* Utils */
import {isEmpty, map as _map} from 'lodash-es';

import {SET_LOADING, SET_LOADING_ERROR, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import * as servicesLogger from '@appUtil/logger';
import {patchBody} from '@appUtil/util';
import {convertPDFFileFromURLToBase64, getBase64FromUrl} from '@appUtil/files';
import {appRoutes} from '@appHelpers/core/app-routes';
import ConversorDivisasConvertirTipoDeCambioBancarioParams = apiCatalogs.ConfiguracionIndicadoresService.ConversorDivisasConvertirTipoDeCambioBancarioParams;
import SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedidoParams = SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedidoParams;
import SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoParams = SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoParams;

const FILE_NAME = 'Order-Modification-Details';

@Injectable()
export class OrderModificationDetailsEffect {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private router: Router,
    private contactsConfigurationsService: apiCatalogs.ConfiguracionContactosService,
    private clientAddressesConfigurationService: apiCatalogs.ConfiguracionClientesDireccionesService,
    private checkoutDashboardService: apiLogistic.ProcesosL05TramitarPedidoDashboardService,
    private checkoutItemsService: apiLogistic.ProcesosL05TramitarPedidoPartidasService,
    private tramitarPedidoPartidasServices: apiLogistic.ProcesosL05TramitarPedidoPartidasService,
    private tramitarPedidoSepararService: apiLogistic.ProcesosL05TramitarPedidoSepararPedidoService,
    private tramitarServices: apiLogistic.ProcesosL05TramitarPedidoService,
    private configuracionFleteService: apiCatalogs.ConfiguracionProductosFletesService,
    private providerService: apiCatalogs.ConfiguracionProveedoresService,
    private tramitarPedidoFleteServices: apiLogistic.ProcesosL05TramitarPedidoFletesService,
    private configuracionIndicadoresServices: apiCatalogs.ConfiguracionIndicadoresService,
    private orderModificationServices: apiLogistic.ProcesosL05TramitarPedidoModificacionService,
    private filesSystemService: apiCatalogs.SistemaArchivosService,
    private procesosCotizacionService: apiLogistic.ProcesosL01CotizacionService,
    private sistemaArchivosService: apiCatalogs.SistemaArchivosService,
    private usersAccessService: apiCatalogs.SistemaUsuariosAccessosService, // private stamperService: apiFinance.TimbradorService,
  ) {}

  initialView$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.CUSTOMER_SELECTED),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.orderModification.orderModification,
          appRoutes.orderModification.details,
        ]);
        return of(orderModificationDetailsActions.FETCH_ORDERS_LOAD());
      }),
    ),
  );

  fetchClientAddresses$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.FETCH_CLIENT_ADDRESSES_LOAD),
      withLatestFrom(this.store.select(orderModificationDetailSelectors.selectCustomerSelected)),
      mergeMap(([action, client]) => {
        const params = new FiltersOnlyActive();
        params.Filters.push({
          NombreFiltro: 'IdCliente',
          ValorFiltro: client.IdCliente,
        });
        return this.clientAddressesConfigurationService
          .DireccionClienteDetalleQueryResult(params)
          .pipe(
            map((response: apiCatalogs.QueryResultDireccionClienteDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta Direcciones del cliente.',
                ),
                response,
              );
              return orderModificationDetailsActions.FETCH_CLIENT_ADDRESSES_SUCCESS({
                addresses: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta Direcciones del cliente.',
                ),
                error,
              );
              return of(orderModificationDetailsActions.FETCH_CLIENT_ADDRESSES_FAILED());
            }),
          );
      }),
    ),
  );

  fetchClientContacts$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.FETCH_CLIENT_CONTACTS_LOAD),
      withLatestFrom(this.store.select(orderModificationDetailSelectors.selectCustomerSelected)),
      mergeMap(([action, client]) => {
        const body = new FiltersOnlyActive();
        // body.Filters.push({
        //   NombreFiltro: 'IdCliente',
        //   ValorFiltro: client.IdCliente,
        // });
        body.Filters = [
          {
            NombreFiltro: 'IdCliente',
            ValorFiltro: client.IdCliente,
          },
        ];

        return this.contactsConfigurationsService.ContactoDetalleQueryResult(body).pipe(
          map((response: apiCatalogs.QueryResultContactoDetalleObj) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los contactos del cliente.',
              ),
              response,
            );
            return orderModificationDetailsActions.FETCH_CLIENT_CONTACTS_SUCCESS({
              contacts: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener los contactos del cliente.',
              ),
              error,
            );
            return of(orderModificationDetailsActions.FETCH_CLIENT_CONTACTS_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: Obtener ordenes de compra
  fetchOrders$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        orderModificationDetailsActions.FETCH_ORDERS_LOAD,
        orderModificationDetailsActions.SEGMENT_ORDER_SUCCESS,
        orderModificationDetailsActions.DELETE_ORDER_SUCCESS,
        orderModificationDetailsActions.SAVE_ORDER_SUCCESS,
        orderModificationDetailsActions.SET_SEARCH_TERM,
        orderModificationDetailsActions.SET_FILTER_SELECTED,
      ),
      withLatestFrom(
        this.store.select(orderModificationDetailSelectors.selectCustomerSelected),
        this.store.select(orderModificationDetailSelectors.selectOrderSelected),
        this.store.select(orderModificationDetailSelectors.selectQueryInfo),
      ),
      mergeMap(([action, customer, selectedOrder, queryInfo]) => {
        return this.checkoutDashboardService.vTramitarPedidoQueryResult(queryInfo).pipe(
          map((response: QueryResultVTramitarPedido) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Obtener Pedidos',
              ),
              response,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            if (response.Results.length > 0) {
              this.store.dispatch(
                orderModificationDetailsActions.FETCH_ORDERS_SUCCESS({
                  list: _map(
                    response.Results,
                    (order, index): IOrdersC => {
                      return {
                        ...order,
                        index,
                        ...initialIOrdersC(),
                      };
                    },
                  ),
                  listStatus: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              // if (
              //   action.type === '[Order-Modification-List] Set search term'
              // ) {
              //   IdTPPedido = response.Results[0].IdTPPedido;
              // }
              /*                if (
                  action.type ===
                  '[Order-Modification-List] Set Filter Selected'
                ) {
                }*/
              const IdTPPedido =
                !isEmpty(selectedOrder) &&
                action.type !== '[Order-Modification-List] Delete Order Success' &&
                action.type !== '[Order-Modification-List] Set search term' &&
                action.type !== '[Order-Modification-List] Set Filter Selected'
                  ? selectedOrder.IdTPPedido
                  : response.Results[0].IdTPPedido;

              return orderModificationDetailsActions.SET_ORDER_SELECTED({
                IdTPPedido,
              });
            } else {
              /*this.router.navigate()*/
              this.store.dispatch(
                orderModificationDetailsActions.SET_ORDER_SELECTED({
                  IdTPPedido: null,
                }),
              );
              return orderModificationDetailsActions.FETCH_ORDERS_SUCCESS({
                list: [],
                listStatus: API_REQUEST_STATUS_SUCCEEDED,
              });
            }
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Obtener Pedidos',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(orderModificationDetailsActions.FETCH_ORDERS_FAILED());
          }),
        );
      }),
    ),
  );

  // Obtener partidas
  fetchSelectedPurchaseOrderEntries$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        orderModificationDetailsActions.SET_ORDER_SELECTED,
        orderModificationDetailsActions.DELETE_ITEM_SUCCESS,
      ),
      withLatestFrom(this.store.select(orderModificationDetailSelectors.selectedPurchaseOrder)),
      mergeMap(([action, purchaseOrder]) => {
        if (!purchaseOrder.IdTPPedido || !purchaseOrder.needsToReload) {
          return of(
            orderModificationDetailsActions.SET_ENTRIES_API_STATUS({
              listStatus: API_REQUEST_STATUS_SUCCEEDED,
            }),
          );
        }
        const params = new FiltersOnlyActive();
        params.Filters.push({
          NombreFiltro: 'IdTPPedido',
          ValorFiltro: purchaseOrder.IdTPPedido,
        });
        return this.checkoutItemsService.vTramitarPedidoPartidaDetalleQueryResult(params).pipe(
          map((response: apiLogistic.QueryResultVTramitarPedidoPartidaDetalle) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta Partidas de Orden de Compra.',
              ),
              response,
            );
            const entries: Array<IPurchaseOrderItem> = _map(
              response.Results,
              (o: VTramitarPedidoPartidaDetalle) => ({
                ...o,
                isSelected: false,
                isOpen: false,
                isInViewQuotesLinked: false,
                quotesLinked: [],
                needsToReloadLinkeds: true,
              }),
            );
            return orderModificationDetailsActions.FETCH_PURCHASE_ORDER_ENTRIES_SUCCESS({
              purchaseOrderEntries: entries,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Consulta Partidas de Orden de Compra.',
              ),
              error,
            );
            return of(orderModificationDetailsActions.FETCH_PURCHASE_ORDER_ENTRIES_FAILED());
          }),
        );
      }),
    ),
  );

  fetchSelectedPurchaseOrderAsides$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        orderModificationDetailsActions.SET_ORDER_SELECTED,
        orderModificationDetailsActions.GENERATE_VERIFICATION_CODE_SUCCESS,
      ),
      withLatestFrom(this.store.select(orderModificationDetailSelectors.selectedPurchaseOrder)),
      mergeMap(([action, purchaseOrder]) => {
        if (!purchaseOrder.IdTPPedido || !purchaseOrder.needsToReload) {
          return of(
            orderModificationDetailsActions.SET_ASIDES_API_STATUS({
              apiStatus: API_REQUEST_STATUS_SUCCEEDED,
            }),
          );
        }
        return this.checkoutDashboardService
          .vTramitarPedidoDetalleObtener(purchaseOrder.IdTPPedido)
          .pipe(
            map((response: apiLogistic.VTramitarPedidoDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta Asides de Orden de Compra en modificación de pedido.',
                ),
                response,
              );
              if (
                action.type ===
                '[Order-Modification-List] Solicitar código de autorización de ajustes success'
              ) {
                this.store.dispatch(SET_LOADING({payload: false}));
                return orderModificationDetailsActions.FETCH_PURCHASE_ORDER_ASIDES_SUCCESS_ONLY_CODE(
                  {
                    tpClienteCSCreditoMorosoCorreo: response.tpClienteCSCreditoMorosoCorreo,
                  },
                );
              }
              const details: IPurchaseOrderDetails = {
                ...response,
                selectedClientAddresses: {
                  value: response.DireccionClienteDetalle.DireccionCliente.IdDireccionCliente,
                  label: `${response.DireccionClienteDetalle.catPais.NombreEspanol}, ${
                    response.DireccionClienteDetalle.Direccion.Ciudad
                  }, ${response.DireccionClienteDetalle.Direccion.Calle} #${
                    response.DireccionClienteDetalle.Direccion.NumeroExterior
                  } ${
                    response.DireccionClienteDetalle.Direccion.NumeroInterior
                      ? 'Int. ' + response.DireccionClienteDetalle.Direccion.NumeroInterior
                      : ''
                  } Col. ${response.DireccionClienteDetalle.Direccion.Colonia} · C.P. ${
                    response.DireccionClienteDetalle.Direccion.CodigoPostal
                  }`,
                },
                deletedClientContacts: [],
              };
              return orderModificationDetailsActions.FETCH_PURCHASE_ORDER_ASIDES_SUCCESS({
                purchaseOrderDetails: details,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Consulta Asides de Orden de Compra en modificación de pedido.',
                ),
                error,
              );
              return of(orderModificationDetailsActions.FETCH_PURCHASE_ORDER_ASIDES_FAILED());
            }),
          );
      }),
    ),
  );

  // TODO: Solicitar codigo de autorización
  generateVerificationCodeRequest = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.GENERATE_VERIFICATION_CODE_LOAD),
      withLatestFrom(
        this.store.select(authSelectors.selectUser),
        this.store.select(orderModificationDetailSelectors.selectedPurchaseOrder),
      ),
      mergeMap(([action, user, selectedOrder]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const params: SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedidoParams = {
          tipoDeMovimiento: selectedOrder.procedureType,
          idUsuarioSolicitaAutorizacion: user.IdUsuario,
          idUsuarioAprueba: user.IdUsuario,
          idTPPedido: selectedOrder.IdTPPedido,
          idTPPartidaPedido: action.IdTPPartidaPedido,
          // Mandar IdTpPartidaPedido en null en el action si la solicitud no es de tipo partida
        };
        return this.usersAccessService
          .SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedido(params)
          .pipe(
            map((response: SolicitudAutorizacionCambio) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Exito al obtener el código de verificación.',
                ),
                response,
              );
              return orderModificationDetailsActions.GENERATE_VERIFICATION_CODE_SUCCESS({
                codeRequest: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Error al obtener el código de verificación.',
                ),
                error,
              );
              this.store.dispatch(
                orderModificationDetailsActions.GENERATE_VERIFICATION_CODE_FAILED(),
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );
  // TODO: Comparar codigo de autorización
  compareVerificationCode = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.COMPARE_VERIFICATION_CODE_LOAD),
      withLatestFrom(
        this.store.select(orderModificationDetailSelectors.selectCode),
        this.store.select(orderModificationDetailSelectors.selectCodeRequest),
        this.store.select(orderModificationDetailSelectors.selectFinanceCodeRequest),
        this.store.select(orderModificationDetailSelectors.selectFirstCodePassed),
      ),
      mergeMap(([action, code$, codeReques$, financeCodeRequest$, firstCodePassed$]) => {
        const params: SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoParams = {
          idSolicitudAutorizacionCambio:
            action.twoCodes && firstCodePassed$
              ? financeCodeRequest$.IdSolicitudAutorizacionCambio
              : codeReques$.IdSolicitudAutorizacionCambio,
          codigoAcceso: `${code$[0]}${code$[1]}${code$[2]}${code$[3]}`,
        };
        return this.usersAccessService
          .SolicitudAutorizacionCambioExtensionsValidarCodigoAcceso(params)
          .pipe(
            map((response: boolean) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Éxito al validar codigo de autorización.',
                ),
                response,
              );
              if (response) {
                if (action.twoCodes) {
                  if (firstCodePassed$) {
                    const codeRequest: SolicitudAutorizacionCambio = {
                      ...codeReques$,
                      Autorizado: response,
                    };
                    return orderModificationDetailsActions.SET_AUTHORIZED_VERIFICATION_CODE_LOAD({
                      codeRequest,
                    });
                  } else {
                    // Set firstCodePassed y limpiar código
                    this.store.dispatch(
                      orderModificationDetailsActions.SET_FIRST_CODE_PASSED({
                        firstCodePassed: true,
                      }),
                    );
                    return orderModificationDetailsActions.RESTORE_CODE_VALUE();
                  }
                } else {
                  const codeRequest: SolicitudAutorizacionCambio = {
                    ...codeReques$,
                    Autorizado: response,
                  };
                  return orderModificationDetailsActions.SET_AUTHORIZED_VERIFICATION_CODE_LOAD({
                    codeRequest,
                  });
                }
              } else {
                // Accion para disparar el shake
                this.store.dispatch(
                  orderModificationDetailsActions.SET_SHAKED({
                    value: true,
                  }),
                );
                setTimeout(() => {
                  this.store.dispatch(
                    orderModificationDetailsActions.SET_SHAKED({
                      value: false,
                    }),
                  );
                  this.store.dispatch(orderModificationDetailsActions.RESTORE_CODE_VALUE());
                }, 1500);

                return orderModificationDetailsActions.COMPARE_VERIFICATION_CODE_FAILED();
              }
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Error al validar codigo de autorización.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(orderModificationDetailsActions.COMPARE_VERIFICATION_CODE_FAILED());
            }),
          );
      }),
    ),
  );

  // Eliminar una partida
  deleteItemOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.DELETE_ITEM_LOAD),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.tramitarPedidoPartidasServices
          .tpPartidaPedidoEliminarProcess(action.item.IdTPPartidaPedido)
          .pipe(
            map((response: TupleBooleanString) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar una partida del pedido.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(orderModificationDetailsActions.RESTORE_CODE_VALUE());
              if (response.m_Item1) {
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: `Has eliminado la partida`,
                  }),
                );
                return orderModificationDetailsActions.DELETE_ITEM_SUCCESS();
              } else {
                this.store.dispatch(SET_LOADING_ERROR({active: true, message: response.m_Item2}));
                return orderModificationDetailsActions.DELETE_ITEM_FAILED();
              }
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al eliminar una partida del pedido.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(orderModificationDetailsActions.DELETE_ITEM_FAILED());
            }),
          );
      }),
    ),
  );
  /*Modificar comenario de la partida*/
  updateCommentItem$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.UPDATE_ITEM_LOAD),
      mergeMap((action) => {
        const IdTPPartidaPedido = action.item.IdTPPartidaPedido;
        const {notes: NotasModificacion} = action.item;
        const {processSelected} = action.item;

        const tpPartidaPedido: TpPartidaPedido = {
          ...action.item.tpPartidaPedido,
          NotasModificacion,
          IdCatProceso: processSelected.value.toString(),
        };
        return this.tramitarPedidoPartidasServices
          .tpPartidaPedidoGuardarOActualizar(tpPartidaPedido)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al agregar notas a la partida.',
                ),
                response,
              );
              this.store.dispatch(
                orderModificationDetailsActions.HANDLE_POP_UP_NOTES({
                  popUpNotesIsOpen: false,
                }),
              );
              this.store.dispatch(
                orderModificationDetailsActions.SET_NOTES_AND_PROCESS({
                  NotasModificacion,
                  IdCatProceso: processSelected.value.toString(),
                  IdTPPartidaPedido,
                }),
              );

              return orderModificationDetailsActions.UPDATE_ITEM_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al agregar notas a la partida.',
                ),
                error,
              );
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message: 'Ha ocurrido un error',
                }),
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // Segmentar Pedido
  segmentOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.SEGMENT_ORDER_LOAD),
      withLatestFrom(
        this.store.select(orderModificationDetailSelectors.selectOrderSelected),
        this.store.select(orderModificationDetailSelectors.selectIdsOfItemsSelected),
      ),
      mergeMap(([action, order, items]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const params: ParametroSepararPedido = {
          ListaIdTPPartidaPedido: items,
          IdTPPedido: order.IdTPPedido,
        };
        return this.tramitarPedidoSepararService.tpPedidoSeparacionProcess(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Segmentar el pedido',
              ),
              response,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              SET_LOADING_SUCCESS({
                active: true,
                message: `Has segmentado el pedido ${order.NumeroOrdenDeCompra}`,
              }),
            );
            return orderModificationDetailsActions.SEGMENT_ORDER_SUCCESS();
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Eliminar Pedido',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // Cancelar Pedido
  deleteOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.DELETE_ORDER_LOAD),
      withLatestFrom(this.store.select(orderModificationDetailSelectors.selectOrderSelected)),
      mergeMap(([action, order]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.tramitarServices.tpPedidoDesactivar(order.IdTPPedido).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Cancelar el Pedido',
              ),
              response,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              SET_LOADING_SUCCESS({
                active: true,
                message: `Has cancelado el pedido`,
              }),
            );
            return orderModificationDetailsActions.DELETE_ORDER_SUCCESS();
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Cancelar el Pedido',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // Finalizar pedido
  saveOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.SAVE_ORDER_LOAD),
      withLatestFrom(
        this.store.select(orderModificationDetailSelectors.selectOrderSelected),
        this.store.select(orderModificationDetailSelectors.selectCustomerSelected),
      ),
      mergeMap(([action, order, client]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.tramitarServices
          .tpPedidoGuardarOActualizar({
            ...order.purchaseOrderDetails.tpPedido,
            Finalizado: true,
          })
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al Finalizar el Pedido',
                ),
                response,
              );
              const selectedOrder: TpPedido = {
                ...order.purchaseOrderDetails.tpPedido,
                Finalizado: true,
              };
              return orderModificationDetailsActions.SAVE_ORDER_SUCCESS();
              // return selectedOrder;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al Finalizar el Pedido',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
      // DOCS: Se quitó temporalmente por cambio de librería
      /*withLatestFrom(
        this.store.select(
          orderModificationDetailSelectors.selectCustomerSelected,
        ),
      ),
      switchMap(([order, client]) => {
        if (!order.FacturaPorAdelantado) {
          return of(SET_LOADING({payload: false}));
        }
        return this.stamperService
          .PqfTimbradoTpProformaPedidoTimbrarFacturasPorAdelantadoPedido(
            order.IdTPPedido,
          )
          .pipe(
            map((response: Array<CFDI>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'En el servicio de timbrado',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  active: true,
                  message: `¡Has modificado el Pedido ${order.NumeroOrdenDeCompra} de ${client.Nombre}`,
                }),
              );
              return orderModificationDetailsActions.SAVE_ORDER_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'En el servicio de timbrado',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(orderModificationDetailsActions.SAVE_ORDER_SUCCESS());
            }),
          );
      }),*/
    ),
  );

  // Obtener Flete
  getFreight$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.GET_CAT_FREIGHT_LOAD),
      mergeMap((action) => {
        return this.configuracionFleteService
          .FleteQueryResult(patchBody(null, null, true, null, 'Precio', [], 'asc'))
          .pipe(
            map((response) => {
              return orderModificationDetailsActions.GET_CAT_FREIGHT_SUCCESS({
                list: response.Results,
              });
            }),
          );
      }),
    ),
  );

  getFreightExpress$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.GET_CAT_FREIGHT_EXPRESS_LOAD),
      withLatestFrom(this.store.select(orderModificationDetailSelectors.selectOrderSelected)),
      mergeMap(([action, order]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.providerService
          .ProveedorQueryResult(
            patchBody(null, null, true, null, 'Nombre', [
              {
                NombreFiltro: 'FleteExpressPedido',
                ValorFiltro: order.IdTPPedido,
              },
            ]),
          )
          .pipe(
            map((response) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return orderModificationDetailsActions.GET_CAT_FREIGHT_EXPRESS_SUCCESS({
                list: response.Results,
              });
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // Refrescar orden de compra seleccionada
  fetchSelectedOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        orderModificationDetailsActions.DELETE_ITEM_SUCCESS,
        orderModificationDetailsActions.FINAL_SETUP_SUCCESS,
      ),
      withLatestFrom(this.store.select(orderModificationDetailSelectors.selectOrderSelected)),
      mergeMap(([action, selectedOrder]) => {
        const params = new FiltersOnlyActive();
        params.Filters.push({
          NombreFiltro: 'IdTPPedido',
          ValorFiltro: selectedOrder.IdTPPedido,
        });
        return this.checkoutDashboardService.vTramitarPedidoQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Obtener el pedido seleccionado',
              ),
              response,
            );
            return orderModificationDetailsActions.GET_ORDER_SELECTED_SUCCESS({
              order: response.Results[0],
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Obtener el pedido seleccionado',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(orderModificationDetailsActions.FETCH_ORDERS_FAILED());
          }),
        );
      }),
    ),
  );

  // Actualizar Flete Express
  updateFreightExpress$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(orderModificationDetailsActions.FINAL_SETUP_FREIGHT_EXPRESS),
        withLatestFrom(
          this.store.select(orderModificationDetailSelectors.selectedPurchaseOrder),
          this.store.select(orderModificationDetailSelectors.selectItemAddOrderFreightExpress),
        ),
        mergeMap(async ([action, orderSelected, order]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          const request = order.map((item) =>
            this.tramitarPedidoFleteServices.tpPedidoFleteExpressGuardarOActualizar(item),
          );
          for (let i = 0; i < order.length; i++) {
            const item = order[i];
            const body: ConversorDivisasConvertirTipoDeCambioBancarioParams = {
              tipoDeCambio: 'Banamex' /*orderSelected.DOF ? 'DOF' :*/,
              monto: item.PrecioFlete,
              idCatMonedaOrigen: item.IdCatMoneda,
              idCatMonedaDestino: orderSelected.IdCatMoneda,
            };
            const price = await lastValueFrom(
              this.configuracionIndicadoresServices.ConversorDivisasConvertirTipoDeCambioBancario(
                body,
              ),
            );

            const id = await lastValueFrom(
              this.tramitarPedidoFleteServices.tpPedidoFleteExpressGuardarOActualizar({
                ...item,
                PrecioFlete: price,
              }),
            );
          }
          this.store.dispatch(orderModificationDetailsActions.FINAL_SETUP_FREIGHT_EXPRESS_DELETE());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // Eliminar Flete Express
  deleteFreightExpress$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.FINAL_SETUP_FREIGHT_EXPRESS_DELETE),
      withLatestFrom(
        this.store.select(orderModificationDetailSelectors.selectItemDeleteOfOrderFreightExpress),
      ),
      mergeMap(([action, deleteList]) => {
        const request = deleteList.map((item) =>
          this.tramitarPedidoFleteServices.tpPedidoFleteExpressDesactivar(
            item.IdTPPedidoFleteExpress,
          ),
        );
        if (deleteList.length > 0) {
          return forkJoin(request).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al Eliminar Fletes Express',
                ),
                response,
              );
              return orderModificationDetailsActions.FINAL_SETUP_FREIGHT();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al  eliminar el fletes express',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
        } else {
          return of(orderModificationDetailsActions.FINAL_SETUP_FREIGHT());
        }
      }),
    ),
  );
  // Actualizar Flete Convencional
  updateOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.FINAL_SETUP_FREIGHT),
      withLatestFrom(this.store.select(orderModificationDetailSelectors.selectOrderSelected)),
      mergeMap(([action, order]) => {
        return this.tramitarServices
          .tpPedidoGuardarOActualizar(order.purchaseOrderDetails.tpPedido)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al Actualizar Fletes Convencional',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                orderModificationDetailsActions.SET_STATUS_OPEN_FREIGHT({
                  active: false,
                }),
              );
              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Guardado',
                }),
              );
              return orderModificationDetailsActions.FINAL_SETUP_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al actualizar el flete convencional',
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

  // Refrescar cliente seleccionado
  fetchCustomerOM$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        orderModificationDetailsActions.DELETE_ORDER_SUCCESS,
        orderModificationDetailsActions.SEGMENT_ORDER_SUCCESS,
        orderModificationDetailsActions.SAVE_ORDER_SUCCESS,
      ),
      withLatestFrom(this.store.select(orderModificationDetailSelectors.selectCustomerSelected)),
      mergeMap(([action, client]) => {
        const params = new FiltersOnlyActive(true);
        params.Filters.push({
          NombreFiltro: 'IdCliente',
          ValorFiltro: client.IdCliente,
        });
        return this.orderModificationServices.vClienteModificacionPedidoQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Obtener el cliente seleccionado',
              ),
              response,
            );
            return orderModificationDetailsActions.GET_CLIENT_SELECTED_SUCCESS({
              client: response.Results[0],
            });
          }),
          catchError((error) => {
            this.store.dispatch(
              orderModificationListActions.SET_STATUS_API({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // Subir archivo de oc
  uploadOcFile$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.SAVE_OC_FILE_LOAD),
      withLatestFrom(this.store.select(orderModificationDetailSelectors.selectedPurchaseOrder)),
      switchMap(([action, order]) => {
        if (!order.ocFile) {
          return EMPTY;
        }
        this.store.dispatch(SET_LOADING({payload: true}));
        const ocFileData: IFileUpload = {
          order,
          file: order.ocFile.file,
        };
        return this.filesSystemService.ArchivoExtensionsObtenerUrlSubirArchivo().pipe(
          map((response: UrlSubirArchivo) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener url para subir el archivo de Oc',
              ),
              response,
            );
            return {...ocFileData, url: response};
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener url para subir el archivo de Oc',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
      switchMap((ocFileData: IFileUpload) => {
        return from(
          fetch(ocFileData.url.UploadUrl, {
            method: 'PUT',
            body: ocFileData.file,
          }),
        ).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al subir el archivo a temporal',
              ),
              response,
            );
            return {...ocFileData, tempUploads: response};
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al subir el archivo a temporal',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
      switchMap((ocFileData: IFileUpload) => {
        const date = new Date();
        const requestMoverArchivo: RequestMoverArchivo = {
          OriginBucketName: ocFileData.url.BucketName,
          OriginFileName: ocFileData.url.FileKey,
          DestinyBucketName: MINIO_BUCKETS.Clients,
          DestinyFileName: `${date.getFullYear()}/${ocFileData.order.IdCliente}/${
            ocFileData.order.IdTPPedido
          }/${Date.now()}/${ocFileData.file.name}`,
        };
        return this.filesSystemService.ArchivoExtensionsMoverArchivoMinIO(requestMoverArchivo).pipe(
          map((response: ArchivoDetalle) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al mover el archivo de Oc',
              ),
              response,
            );

            return {...ocFileData, fileDetail: response};
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al mover el archivo de Oc',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
      switchMap((ocFileData: IFileUpload) => {
        const fileData: IFileUpload = {
          ...ocFileData,
          order: {
            ...ocFileData.order,
            purchaseOrderDetails: {
              ...ocFileData.order.purchaseOrderDetails,
              tpPedido: {
                ...ocFileData.order.purchaseOrderDetails.tpPedido,
                IdArchivo: ocFileData.fileDetail.IdArchivo,
              },
            },
          },
        };
        return this.tramitarServices
          .tpPedidoGuardarOActualizar(fileData.order.purchaseOrderDetails.tpPedido)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al subir el archivo.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));

              return orderModificationDetailsActions.SET_ORDER_UPDATED({
                fileData,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al subir el archivo.',
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

  // Subir archivos adicionales
  uploadAdditionalFiles$ = createEffect(() =>
    this.action$.pipe(
      ofType(orderModificationDetailsActions.SAVE_ADDITIONAL_FILES_LOAD),
      withLatestFrom(this.store.select(orderModificationDetailSelectors.selectedPurchaseOrder)),
      switchMap(([action, order]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        if (isEmpty(order.additionalFiles)) {
          return of(orderModificationDetailsActions.SAVE_ORDER_LOAD());
        }
        const filesUrlRequest: Observable<IFileUpload>[] = _map(
          order.additionalFiles,
          (o: IFileUpload) =>
            this.filesSystemService.ArchivoExtensionsObtenerUrlSubirArchivo().pipe(
              map(
                (response: UrlSubirArchivo): IFileUpload => ({
                  order,
                  file: o.file,
                  url: response,
                }),
              ),
            ),
        );
        return forkJoin(filesUrlRequest).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener url para subir archivos adicionales',
              ),
              response,
            );
            return response;
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener url para subir archivos adicionales',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
      switchMap((ocFileData) => {
        const filesRequest: Promise<Response>[] = _map(ocFileData, (o: IFileUpload) =>
          fetch(o.url.UploadUrl, {
            method: 'PUT',
            body: o.file,
          }),
        );
        return forkJoin(filesRequest).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al subir los archivos a temporal',
              ),
              response,
            );
            return ocFileData;
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al subir los archivos a temporal',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
      switchMap((ocFileData) => {
        const date = new Date();
        const filesMinIORequest: any[] = _map(ocFileData, (o: IFileUpload) => {
          const body: RequestMoverArchivo = {
            OriginBucketName: o.url.BucketName,
            OriginFileName: o.url.FileKey,
            DestinyBucketName: MINIO_BUCKETS.Clients,
            DestinyFileName: `${date.getFullYear()}/${o.order.IdCliente}/${
              o.order.IdTPPedido
            }/${Date.now()}/${o.file.name}`,
          };
          return this.filesSystemService
            .ArchivoExtensionsMoverArchivoMinIO(body)
            .pipe(map((response: ArchivoDetalle) => ({...o, fileDetail: response})));
        });
        return forkJoin(filesMinIORequest).pipe(
          map((response: Array<IFileUpload>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al mover los archivos de Oc',
              ),
              response,
            );
            return [...response];
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al mover los archivos de Oc',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
      withLatestFrom(this.store.select(orderModificationDetailSelectors.selectCustomerSelected)),
      switchMap(([ocFileData, client]) => {
        const filesMinIORequest: any[] = _map(ocFileData, (o: IFileUpload) => {
          const body: TpArchivoAdicionalPedido = {
            IdTpArchivoAdicionalPedido: DEFAULT_UUID,
            IdArchivo: o.fileDetail.IdArchivo,
            IdTPPedido: ocFileData[0].order.IdTPPedido,
            FechaRegistro: DEFAULT_DATE,
            FechaUltimaActualizacion: DEFAULT_DATE,
            Activo: true,
          };

          return this.orderModificationServices
            .tpArchivoAdicionalPedidoGuardarOActualizar(body)
            .pipe(
              map((response: string) => ({
                ...o,
                IdTpArchivoAdicionalPedido: response,
              })),
            );
        });
        return forkJoin(filesMinIORequest).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al modificar los archivos de la OC.',
              ),
              response,
            );
            /*this.store.dispatch(
              SET_LOADING_SUCCESS({
                active: true,
                message: `¡Has modificado el Pedido ${ocFileData[0].order.NumeroOrdenDeCompra} de ${client.Nombre}`,
              }),
            );*/
            return orderModificationDetailsActions.SAVE_ORDER_LOAD();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al modificar los archivos de la OC.',
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

  // DOCS: OBTIENE PARTIDAS VINCULADAS
  itemsLinked$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(orderModificationDetailsActions.SET_ITEM_LINKED),
        withLatestFrom(
          this.store.select(orderModificationDetailSelectors.selectCustomerSelected),
          this.store.select(orderModificationDetailSelectors.selectOrderSelected),
        ),
        mergeMap(([action, client, quoteSelected]) => {
          const item: any = action.item;
          const params = new FiltersOnlyActive();
          params.Filters.push(
            {
              NombreFiltro: 'IdCliente',
              ValorFiltro: client.IdCliente,
            },
            {
              NombreFiltro: 'IdProducto',
              ValorFiltro: item.IdProducto,
            },
            {
              NombreFiltro: 'IdTPPedido',
              ValorFiltro: item.IdTPPedido,
            },
          );
          if (item.needsToReloadLinkeds) {
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
                    orderModificationDetailsActions.UPDATE_ITEM_LIST({
                      IdTPPartidaPedido: item.IdTPPartidaPedido,
                      linkedQuotes: response.Results,
                    }),
                  );
                  this.store.dispatch(
                    orderModificationDetailsActions.SET_OPEN_VIEW_FILE({
                      active: true,
                    }),
                  );
                  this.store.dispatch(
                    orderModificationDetailsActions.SET_ID_ARCHIVO_PDF({
                      IdArchivo: response.Results[0].IdArchivoPDF,
                    }),
                  );
                  this.store.dispatch(
                    orderModificationDetailsActions.SET_INVOICE_ITEM_SELECTED({
                      item: 'FO-' + response.Results[0].Folio,
                    }),
                  );
                } else {
                  this.store.dispatch(
                    orderModificationDetailsActions.UPDATE_ITEM_LIST({
                      IdTPPartidaPedido: item.IdTPPartidaPedido,
                      linkedQuotes: response.Results,
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
            if (item.CotizacionVinculada === 1) {
              this.store.dispatch(
                orderModificationDetailsActions.SET_INVOICE_ITEM_SELECTED({
                  item: 'FO-' + item.quotesLinked[0].Folio,
                }),
              );
              this.store.dispatch(
                orderModificationDetailsActions.SET_ID_ARCHIVO_PDF({
                  IdArchivo: item.quotesLinked[0].IdArchivoPDF,
                }),
              );
            }
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Descarga el archivo vinculado seleccionado
  getIDArchivoDetalle$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(orderModificationDetailsActions.SET_ID_ARCHIVO_PDF),
        mergeMap((action) => {
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map((response) => {
              this.store.dispatch(
                orderModificationDetailsActions.SET_OPEN_VIEW_FILE({
                  active: true,
                }),
              );
              const splits = response.FileKey.split('.');
              const ext = splits[splits.length - 1];
              this.store.dispatch(
                orderModificationDetailsActions.VIEW_FILE_LOAD({
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

  // Ver el archivo
  viewFileRequest = createEffect(
    () =>
      this.action$.pipe(
        ofType(orderModificationDetailsActions.VIEW_FILE_LOAD),
        mergeMap((action) => {
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response) => {
              let base64 = null;
              if (response && response.Url) {
                if (action.ext === 'pdf' || action.ext === 'tml') {
                  base64 = await convertPDFFileFromURLToBase64(response.Url);
                } else if (
                  action.ext === 'jpg' ||
                  action.ext === 'jpeg' ||
                  action.ext === 'png' ||
                  action.ext === 'svg'
                ) {
                  base64 = await getBase64FromUrl(response.Url, action.ext);
                }
              }

              this.store.dispatch(
                orderModificationDetailsActions.VIEW_FILE_SUCCESS({
                  fileBase64: base64,
                }),
              );
              this.store.dispatch(
                orderModificationDetailsActions.VIEW_FILE_IS_LOADING({
                  value: false,
                }),
              );
            }),
            catchError((error) => {
              return of(orderModificationDetailsActions.VIEW_FILE_ERROR());
            }),
          );
        }),
      ),
    {dispatch: false},
  );
}
