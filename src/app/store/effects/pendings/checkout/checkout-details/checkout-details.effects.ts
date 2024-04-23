import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {Router} from '@angular/router';

// Actions
import {checkoutActions, checkoutDetailsActions} from '@appActions/pendings/checkout';

// Selectors
import {checkoutDetailsSelectors} from '@appSelectors/pendings/checkout';

// Models
import * as apiLogistic from 'api-logistica';
import {
  GMTipoAutorizacionUsuarioDetalle,
  ParametroAutorizacion,
  ProcesosAutorizacionesService,
  ProcesosL05TramitarPedidoLiberarService,
  TpPedidoPartidasDetalleBO,
} from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import {
  ConfiguracionClientesDireccionesService,
  QueryResultDateTime,
  SistemaUsuariosAccessosService,
  SolicitudAutorizacionCambio,
} from 'api-catalogos';
import {
  IOrdersC,
  IPurchaseOrderDetails,
  IPurchaseOrderItem,
} from '@appModels/store/pendings/checkout/checkout-details/checkout-details.model';

// Utils
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import * as servicesLogger from '@appUtil/logger';
import {isEmpty, map as _map} from 'lodash-es';

import {
  DOWLOAD_FILE_LOAD,
  RETURN_EMPTY,
  SET_LOADING,
  SET_LOADING_SUCCESS,
} from '@appActions/utils/utils.action';
import {CLIENT_SANOFI, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import * as authSelectors from '@appSelectors/auth/auth.selectors';
import {convertPDFFileFromURLToBase64, getBase64FromUrl} from '@appUtil/files';
import {appRoutes} from '@appHelpers/core/app-routes';
import {buildGMtpPedidoTramitarCorreo} from '@appHelpers/pending/processing/processing.helpers';
import {currentDateWithoutHoursUTCFormat} from '@appUtil/dates';
import * as catalogosActions from '@appActions/catalogs/catalogos.actions';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {IDataMail, IMailDialogData} from '@appModels/correo/correo';
import {SendEmailDialogComponent} from '@appComponents/shared/send-email-dialog/send-email-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {AvailabilityLetterData} from '@appModels/store/dialogs/availability-letter/availability-letter.model';
import {AvailabilityLettersDialogComponent} from '@appComponents/shared/availability-letters-dialog/availability-letters-dialog.component';
import {authDialogActions, availabilityActions} from '@appActions/dialogs';
import {RequestAuthCodeDialogComponent} from '@appComponents/shared/request-auth-code-dialog/request-auth-code-dialog.component';
import {PROCEDURES_TYPES} from '@appModels/store/pendings/checkout/checkout-list/checkout-list.model';
import {deliveryBillingActions} from '@appActions/forms/client-form';
import {TeeDialogComponent} from '@appComponents/pendings/checkout/checkout-details/processing/tee-dialog/tee-dialog.component';
import {showTeeDialogString} from '@appActions/pendings/checkout/checkout-details/checkout-details.actions';
import {selectTeeDialogData} from '@appSelectors/dialogs/dialogs.selectors';
import SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedidoParams = SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedidoParams;
import SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoParams = SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoParams;
import DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoParams = ConfiguracionClientesDireccionesService.DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoParams;

const FILE_NAME = 'Checkout-Details';

@Injectable()
export class CheckoutDetailsEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private processPurchasePServices: apiLogistic.ProcesosL03PromesaDeCompraService,
    private usersAccessService: apiCatalogs.SistemaUsuariosAccessosService,
    private checkoutDashboardService: apiLogistic.ProcesosL05TramitarPedidoDashboardService,
    private checkoutEntryService: apiLogistic.ProcesosL05TramitarPedidoPartidasService,
    private checkoutEntrySanofiService: apiLogistic.ProcesosL05TramitarPedidoFacturasSanofiService,
    private contactsConfigurationsService: apiCatalogs.ConfiguracionContactosService,
    private procesosCotizacionService: apiLogistic.ProcesosL01CotizacionService,
    private sistemaArchivosService: apiCatalogs.SistemaArchivosService,
    private clientAddressesConfigurationService: apiCatalogs.ConfiguracionClientesDireccionesService, // private stamperService: apiFinance.TimbradorService,
    private procesosTramitarPedidoLiberarService: ProcesosL05TramitarPedidoLiberarService,
    private procesosAutorizacionesService: ProcesosAutorizacionesService,
    private dialog: MatDialog,
    private transtaleService: TranslateService,
  ) {}

  proceduresTypes = PROCEDURES_TYPES;

  // DOCS: HACE EL LLAMADO DE LAS ACCIONES NECESARIAS CUANDO SE ACCEDE A LA VISTA DE DETALLES
  initComponent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutDetailsActions.INIT_COMPONENT),
      mergeMap((action) => {
        this.store.dispatch(catalogosActions.GET_CAT_DESTINO_LOAD());
        this.store.dispatch(catalogosActions.GET_CAT_USO_CFDI());
        this.store.dispatch(catalogosActions.GET_CAT_METODO_DE_PAGO());
        this.store.dispatch(checkoutDetailsActions.FETCH_PURCHASE_ORDERS_LOAD());
        this.store.dispatch(checkoutDetailsActions.FETCH_CLIENT_ADDRESSES_LOAD());
        this.store.dispatch(checkoutDetailsActions.FETCH_CLIENT_CONTACTS_LOAD());
        this.store.dispatch(checkoutDetailsActions.CHECKOUT_FETCH_TYPE_AUTHORIZATION_DETAILS());
        this.store.dispatch(catalogsActions.GET_CAT_LEGAL_REPRESENTATIVE_LOAD());
        this.store.dispatch(
          authDialogActions.FETCH_AUTHORIZATION_DETAILS({authType: 'editardatosfacturacion'}),
        );
        this.store.dispatch(catalogsActions.GET_CAT_LEGAL_REPRESENTATIVE_LOAD());
        this.store.dispatch(
          authDialogActions.FETCH_AUTHORIZATION_DETAILS({authType: 'editardatosfacturacion'}),
        );

        return of(RETURN_EMPTY());
      }),
    ),
  );

  // DOCS: HACE EL LLAMADO DE LAS ACCIONES NECESARIAS CUANDO SALE FUERA DE LA VISTA DE DETALLES
  destroyComponent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutDetailsActions.DESTROY_COMPONENT),
      mergeMap((action) => {
        this.store.dispatch(checkoutDetailsActions.CLEAN_ALL_CHECKOUT_DETAIL());
        this.store.dispatch(authDialogActions.SET_INITIAL_STATE());
        this.store.dispatch(
          checkoutActions.SET_DETAILS_COMPONENT({
            detailsComponent: false,
          }),
        );
        this.store.dispatch(
          checkoutActions.SET_DETAILS_MODE({
            detailsMode: false,
          }),
        );

        return of(RETURN_EMPTY());
      }),
    ),
  );

  fetchClientAddresses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutDetailsActions.FETCH_CLIENT_ADDRESSES_LOAD),
      withLatestFrom(this.store.select(checkoutDetailsSelectors.selectClient)),
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
              return checkoutDetailsActions.FETCH_CLIENT_ADDRESSES_SUCCESS({
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
              return of(checkoutDetailsActions.FETCH_CLIENT_ADDRESSES_FAILED());
            }),
          );
      }),
    ),
  );
  fetchClientContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutDetailsActions.FETCH_CLIENT_CONTACTS_LOAD),
      withLatestFrom(this.store.select(checkoutDetailsSelectors.selectClient)),
      mergeMap(([action, client]) => {
        const body = new FiltersOnlyActive();
        body.Filters = [
          {
            NombreFiltro: 'IdCliente',
            ValorFiltro: client.IdCliente,
          },
          {
            NombreFiltro: 'Activo',
            ValorFiltro: true,
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
            return checkoutDetailsActions.FETCH_CLIENT_CONTACTS_SUCCESS({
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
            return of(checkoutDetailsActions.FETCH_CLIENT_CONTACTS_FAILED());
          }),
        );
      }),
    ),
  );

  fetchPurchaseOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutDetailsActions.FETCH_PURCHASE_ORDERS_LOAD),
      withLatestFrom(this.store.select(checkoutDetailsSelectors.selectClient)),
      mergeMap(([action, client]) => {
        const params = new FiltersOnlyActive();
        params.Filters.push({
          NombreFiltro: 'IdCliente',
          ValorFiltro: client.IdCliente,
        });
        params.Filters.push({
          NombreFiltro: 'Liberado',
          ValorFiltro: false,
        });
        params.Filters.push({
          NombreFiltro: 'OcInternaAceptada',
          ValorFiltro: false,
        });
        return this.checkoutDashboardService.vTramitarPedidoQueryResult(params).pipe(
          map((response: apiLogistic.QueryResultVTramitarPedido) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta Ordenes de Compra.',
              ),
              response,
            );
            this.store.dispatch(
              checkoutDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS({
                orders: _map(response.Results, (order: IOrdersC, index: number) => {
                  return {
                    ...order,
                    index,
                    isSelected: index === 0,
                    needsToReload: true,
                    codeRequest: {},
                    code: [null, null, null, null],
                    shaked: false,
                    purchaseOrderDetails: {
                      ...order.purchaseOrderDetails,
                      needsToReload: true,
                    },
                  };
                }),
              }),
            );
            return checkoutDetailsActions.SET_SELECTED_PURCHASE_ORDER({
              IdTPPedido: response.Results[0].IdTPPedido,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta Ordenes de Compra.',
              ),
              error,
            );
            return of(checkoutDetailsActions.FETCH_PURCHASE_ORDERS_FAILED());
          }),
        );
      }),
    ),
  );
  fetchSelectedPurchaseOrderEntries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        checkoutDetailsActions.FETCH_PURCHASE_ORDER_ASIDES_SUCCESS,
        checkoutDetailsActions.REFRESH_ENTRIES_LOAD,
      ),
      withLatestFrom(this.store.select(checkoutDetailsSelectors.selectedPurchaseOrder)),
      mergeMap(([action, purchaseOrder]) => {
        if (!purchaseOrder.IdTPPedido) {
          return EMPTY;
        }
        if (!purchaseOrder.needsToReload) {
          return of(
            checkoutDetailsActions.RESTORE_BACKUP_PURCHASE_ORDER({
              purchaseId: purchaseOrder.IdTPPedido,
            }),
          );
        }
        const params = new FiltersOnlyActive();
        params.Filters.push({
          NombreFiltro: 'IdTPPedido',
          ValorFiltro: purchaseOrder.IdTPPedido,
        });
        return this.checkoutEntryService
          .tpPedidoPartidasDetallePartidasDetalle(purchaseOrder.IdTPPedido)
          .pipe(
            map((response: TpPedidoPartidasDetalleBO) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta Partidas de Orden de Compra.',
                ),
                response,
              );
              const entries: IPurchaseOrderItem[] = _map(
                response.GMtpPartidasDetalle,
                (o: IPurchaseOrderItem) => ({
                  ...o,
                  isInViewQuotesLinked: false,
                  quotesLinked: [],
                  needsToReloadLinkeds: true,
                  imageHover: `assets/Images/logos/${o?.cotPartidaCotizacionDetalle?.vProducto?.NombreImagenMarca?.toLowerCase()}_hover.svg`,
                }),
              );
              return checkoutDetailsActions.FETCH_PURCHASE_ORDER_ENTRIES_SUCCESS({
                purchaseOrderEntries: entries,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta Partidas de Orden de Compra.',
                ),
                error,
              );
              return of(checkoutDetailsActions.FETCH_PURCHASE_ORDER_ENTRIES_FAILED());
            }),
          );
      }),
    ),
  );
  fetchSelectedPurchaseOrderAsides$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        checkoutDetailsActions.SET_SELECTED_PURCHASE_ORDER,
        checkoutDetailsActions.GENERATE_VERIFICATION_CODE_SUCCESS,
      ),
      withLatestFrom(this.store.select(checkoutDetailsSelectors.selectedPurchaseOrder)),
      mergeMap(([action, purchaseOrder]) => {
        if (!purchaseOrder.IdTPPedido || !purchaseOrder.needsToReload) {
          return EMPTY;
        }
        return this.checkoutDashboardService
          .vTramitarPedidoDetalleObtener(purchaseOrder.IdTPPedido)
          .pipe(
            map((response: apiLogistic.VTramitarPedidoDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta Asides de Orden de Compra.',
                ),
                response,
              );
              if (
                action.type ===
                '[CheckoutDetails] Solicitar código de autorización de ajustes success'
              ) {
                this.store.dispatch(SET_LOADING({payload: false}));
                return checkoutDetailsActions.FETCH_PURCHASE_ORDER_ASIDES_SUCCESS_ONLY_CODE({
                  tpClienteCSCreditoMorosoCorreo: response.tpClienteCSCreditoMorosoCorreo,
                });
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
              return checkoutDetailsActions.FETCH_PURCHASE_ORDER_ASIDES_SUCCESS({
                purchaseOrderDetails: details,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta Asides de Orden de Compra.',
                ),
                error,
              );
              return of(checkoutDetailsActions.FETCH_PURCHASE_ORDER_ASIDES_FAILED());
            }),
          );
      }),
    ),
  );
  savePopDataEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutDetailsActions.SAVE_ENTRY_POP_DATA_LOAD),
      withLatestFrom(
        this.store.select(checkoutDetailsSelectors.selectPurchaseTpPartidaPedido),
        this.store.select(checkoutDetailsSelectors.selectOpenedPurchaseOrderEntry),
        this.store.select(checkoutDetailsSelectors.selectClient),
      ),
      mergeMap(([action, tpPartidaPedido, openedEntry, client]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.checkoutEntryService.tpPartidaPedidoGuardarOActualizar(tpPartidaPedido).pipe(
          map((response: string) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar los datos de la partida modificada.',
              ),
              response,
            );
            if (client.Nombre === CLIENT_SANOFI) {
              return checkoutDetailsActions.SAVE_ADDENDA_SANOFI_LOAD();
            }
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(checkoutDetailsActions.SAVE_ENTRY_POP_DATA_SUCCESS());
            return checkoutDetailsActions.REFRESH_ENTRIES_LOAD();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar los datos de la partida modificada.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(checkoutDetailsActions.SAVE_ENTRY_POP_DATA_FAILED());
            return EMPTY;
          }),
        );
      }),
    ),
  );
  saveAddendaSanofi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutDetailsActions.SAVE_ADDENDA_SANOFI_LOAD),
      withLatestFrom(
        this.store.select(checkoutDetailsSelectors.selectPurchaseTpPartidaPedidoAddendaSanofi),
        this.store.select(checkoutDetailsSelectors.selectPurchaseTpPartidaPedido),
        this.store.select(checkoutDetailsSelectors.selectOpenedPurchaseOrderEntry),
      ),
      mergeMap(([action, tpPartidaPedidoAddenda, tpPartidaPedido, openedEntry]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.checkoutEntrySanofiService
          .tpPartidaPedidoAddendaSanofiGuardarOActualizar(tpPartidaPedidoAddenda)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar la addenda de Sanofi.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(checkoutDetailsActions.SAVE_ADDENDA_SANOFI_SUCCESS());
              return checkoutDetailsActions.REFRESH_ENTRIES_LOAD();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar la addenda de Sanofi.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(checkoutDetailsActions.SAVE_ADDENDA_SANOFI_FAILED());
              return EMPTY;
            }),
          );
      }),
    ),
  );
  getEntryPopInfo = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutDetailsActions.GET_ENTRY_POP_INFO_LOAD),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.checkoutEntryService
          .vTramitarPedidoPartidaDetalleObtener(action.IdTPPartidaPedido)
          .pipe(
            map((response: apiLogistic.VTramitarPedidoPartidaDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la información de la partida para el pop',
                ),
                response,
              );
              const vTramitar = {
                ...response,
                tpPartidaPedidoAddendaSanofi: response.tpPartidaPedidoAddendaSanofi
                  ? response.tpPartidaPedidoAddendaSanofi
                  : {
                      Activo: true,
                      CuentaPuente: null,
                      FechaRegistro: DEFAULT_DATE,
                      FechaUltimaActualizacion: DEFAULT_DATE,
                      IdTPPartidaPedido: response.IdTPPartidaPedido,
                      IdTPPartidaPedidoAddendaSanofi: DEFAULT_UUID,
                      LineaDeOrden: null,
                      UnidadDeMedida: '',
                    },
              };
              this.store.dispatch(
                checkoutDetailsActions.GET_ENTRY_POP_INFO_SUCCESS({
                  vTramitarPedidoPartidaDetalle: vTramitar,
                }),
              );
              return SET_LOADING({payload: false});
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la información de la partida para el pop',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(checkoutDetailsActions.GET_ENTRY_POP_INFO_FAILED());
            }),
          );
      }),
    ),
  );

  checkoutOCEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutDetailsActions.CHECKOUT_EMAIL_LOAD),
      withLatestFrom(
        this.store.select(checkoutDetailsSelectors.selectTpPedido),
        this.store.select(checkoutDetailsSelectors.selectPurchaseOrderEntries),
        this.store.select(checkoutDetailsSelectors.clientSelected),
        this.store.select(checkoutDetailsSelectors.selectOrders),
        this.store.select(checkoutDetailsSelectors.selectedPurchaseOrder),
        this.store.select(checkoutDetailsSelectors.selectListContactDeliveryNotificationIds),
      ),
      mergeMap(
        ([
          {mailData},
          tpPedido,
          orderEntries,
          clientSelected,
          orders,
          purchaseOrderSelected,
          listDeliveryNotification,
        ]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          return this.procesosTramitarPedidoLiberarService
            .tpPedidoTramitarEnviaCorreoTramitarPedido(
              buildGMtpPedidoTramitarCorreo(
                mailData,
                tpPedido,
                orderEntries,
                listDeliveryNotification,
              ),
            )
            .pipe(
              map((response: any) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Generar pdf de pedido.',
                  ),
                  response,
                );
                const meesageSuccess = purchaseOrderSelected?.OcInterna
                  ? 'con OC interna'
                  : purchaseOrderSelected?.SinOC
                  ? 'sin OC interna'
                  : purchaseOrderSelected?.NumeroOrdenDeCompra;

                this.store.dispatch(SET_LOADING({payload: false}));
                // DOCS: Inicio -> Reiniciar la vista
                // DOCS: Si queda solo una orden redirecciona a la lista de clientes
                this.store.dispatch(checkoutDetailsActions.SET_RESUME_MODE({resumeMode: false}));
                if (orders.length <= 1) {
                  this.store.dispatch(
                    SET_LOADING_SUCCESS({
                      active: true,
                      message: `Has tramitado el pedido ${meesageSuccess}`,
                    }),
                  );
                  this.router.navigate([
                    appRoutes.protected,
                    appRoutes.pendings.pendings,
                    appRoutes.checkout.checkout,
                  ]);
                  this.store.dispatch(checkoutDetailsActions.CLEAN_ALL_CHECKOUT_DETAIL());
                  return;
                }
                // DOCS: Si hay más de 1 orden redireccióna al cliente seleccionado
                this.store.dispatch(
                  checkoutDetailsActions.SET_SEND_EMAIL_POP_IS_OPEN({sendEmailPopUpIsOpen: false}),
                );
                this.store.dispatch(
                  checkoutActions.SET_CLIENT_CHECKOUT_SELECTED({customer: clientSelected}),
                );
                this.store.dispatch(checkoutDetailsActions.FETCH_PURCHASE_ORDERS_LOAD());
                this.store.dispatch(authDialogActions.SET_INITIAL_STATE());
                this.store.dispatch(
                  authDialogActions.FETCH_AUTHORIZATION_DETAILS({
                    authType: 'editardatosfacturacion',
                  }),
                );
                // DOCS: Fin -> Reiniciar la vista
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: `Has tramitado el pedido ${meesageSuccess}`,
                  }),
                );
                return checkoutDetailsActions.CHECKOUT_EMAIL_LOAD_SUCCESS();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Generar pdf de pedido.',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return of(checkoutDetailsActions.CHECKOUT_EMAIL_LOAD_ERROR());
              }),
            );
        },
      ),
    ),
  );
  // TODO: Solicitar codigo de autorización
  generateVerificationCodeRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutDetailsActions.GENERATE_VERIFICATION_CODE_LOAD),
      withLatestFrom(
        this.store.select(authSelectors.selectUser),
        this.store.select(checkoutDetailsSelectors.selectedPurchaseOrder),
      ),
      mergeMap(([action, user, selectedOrder]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const params: SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedidoParams = {
          tipoDeMovimiento: selectedOrder.procedureType,
          idUsuarioSolicitaAutorizacion: user.IdUsuario,
          idUsuarioAprueba: user.IdUsuario,
          idTPPedido: selectedOrder.IdTPPedido,
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
              return checkoutDetailsActions.GENERATE_VERIFICATION_CODE_SUCCESS({
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
              this.store.dispatch(checkoutDetailsActions.GENERATE_VERIFICATION_CODE_FAILED());
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );
  // TODO: Comparar codigo de autorización
  compareVerificationCode = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutDetailsActions.COMPARE_VERIFICATION_CODE_LOAD),
      withLatestFrom(
        this.store.select(checkoutDetailsSelectors.selectCode),
        this.store.select(checkoutDetailsSelectors.selectCodeRequest),
        this.store.select(checkoutDetailsSelectors.selectCodeRequestLocal),
      ),
      mergeMap(([action, code$, codeReques$, codeRequestLocal$]) => {
        const params: SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoParams = {
          idSolicitudAutorizacionCambio: codeReques$.IdSolicitudAutorizacionCambio,
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
                  'Exito al validar codigo de autorización.',
                ),
                response,
              );
              if (response) {
                const codeRequest: SolicitudAutorizacionCambio = {
                  ...codeReques$,
                  Autorizado: response,
                };
                return checkoutDetailsActions.SET_AUTHORIZED_VERIFICATION_CODE_LOAD({
                  codeRequest,
                });
              } else {
                // Accion para disparar el shake
                this.store.dispatch(checkoutDetailsActions.SET_SHAKED({value: true}));
                setTimeout(() => {
                  this.store.dispatch(checkoutDetailsActions.SET_SHAKED({value: false}));
                  this.store.dispatch(checkoutDetailsActions.RESTORE_CODE_VALUE());
                }, 1500);

                return checkoutDetailsActions.COMPARE_VERIFICATION_CODE_FAILED();
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
              return of(checkoutDetailsActions.COMPARE_VERIFICATION_CODE_FAILED());
            }),
          );
      }),
    ),
  );
  // DOCS: OBTIENE PARTIDAS VINCULADAS
  // DOCS: Se comenta porque actualmente no se está usando el servicio de traer las cotizaciones vinculadas, descomentar en caso de ser necesario
  /*itemsLinked$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkoutDetailsActions.SET_ITEM_LINKED),
        withLatestFrom(this.store.select(checkoutDetailsSelectors.selectClient)),
        mergeMap(([action, client]) => {
          const item: any = action.item;
          const params = new FiltersOnlyActive();
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
              NombreFiltro: 'IdTPPedido',
              ValorFiltro: item.IdTPPedido,
            },
          );
          // @ts-ignore
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
                this.store.dispatch(
                  checkoutDetailsActions.UPDATE_ITEM_LIST({
                    IdTPPartidaPedido: item.IdTPPartidaPedido,
                    linkedQuotes: response.Results,
                  }),
                );
                if (response.TotalResults === 1) {
                  this.store.dispatch(
                    checkoutDetailsActions.SET_ID_ARCHIVO_PDF({
                      IdArchivo: response.Results[0].IdArchivoPDF,
                    }),
                  );
                  this.store.dispatch(
                    checkoutDetailsActions.SET_INVOICE_ITEM_SELECTED({
                      item: 'FO-' + response.Results[0].Folio,
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
            if (item.quotesLinked.length === 1) {
              this.store.dispatch(
                checkoutDetailsActions.SET_ID_ARCHIVO_PDF({
                  IdArchivo: item.quotesLinked[0].IdArchivoPDF,
                }),
              );
              this.store.dispatch(
                checkoutDetailsActions.SET_INVOICE_ITEM_SELECTED({
                  item: 'FO-' + item.quotesLinked[0].Folio,
                }),
              );
            } else {
              this.store.dispatch(
                checkoutDetailsActions.UPDATE_ITEM_LIST({
                  IdTPPartidaPedido: item.IdTPPartidaPedido,
                  linkedQuotes: [],
                }),
              );
            }
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );*/
  // DOCS: Descarga el archivo vinculado seleccionado
  getIDArchivoDetalle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkoutDetailsActions.SET_ID_ARCHIVO_PDF, checkoutDetailsActions.DOWN_LOAD_FILE),
        mergeMap((action) => {
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response) => {
              const splits = response.FileKey.split('.');
              const ext = splits[splits.length - 1];
              if (action.type === '[CheckoutDetailsApi] Down load file') {
                this.store.dispatch(
                  DOWLOAD_FILE_LOAD({
                    IdArchivo: response.IdArchivo,
                    FileKey: response.FileKey,
                    newTab: true,
                  }),
                );
              } else {
                this.store.dispatch(
                  checkoutDetailsActions.VIEW_FILE_LOAD({
                    IdArchivo: response.IdArchivo,
                    ext,
                  }),
                );
              }
            }),
          );
        }),
      ),
    {dispatch: false},
  );
  // Ver el archivo
  viewFileRequest = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkoutDetailsActions.VIEW_FILE_LOAD),
        mergeMap((action) => {
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response) => {
              let base64 = null;
              if (response && response.Url) {
                if (action.ext === 'pdf' || action.ext === 'tml') {
                  base64 = await convertPDFFileFromURLToBase64(response.Url);
                  this.store.dispatch(checkoutDetailsActions.SET_IS_PDF({value: true}));
                } else if (
                  action.ext === 'jpg' ||
                  action.ext === 'jpeg' ||
                  action.ext === 'png' ||
                  action.ext === 'svg'
                ) {
                  base64 = await getBase64FromUrl(response.Url, action.ext);
                  this.store.dispatch(checkoutDetailsActions.SET_IS_PDF({value: false}));
                }
              }

              this.store.dispatch(
                checkoutDetailsActions.VIEW_FILE_SUCCESS({
                  fileBase64: base64,
                }),
              );
              this.store.dispatch(
                checkoutDetailsActions.VIEW_FILE_IS_LOADING({
                  value: false,
                }),
              );
            }),
            catchError((error) => {
              return of(checkoutDetailsActions.VIEW_FILE_ERROR());
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  // DOCS: Get data for authorization code
  fetchTypeAuthorization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutDetailsActions.CHECKOUT_FETCH_TYPE_AUTHORIZATION_DETAILS),
      mergeMap((action) => {
        const payload = {
          Filters: [{NombreFiltro: 'Clave', ValorFiltro: 'editardatosfacturacion'}],
        };
        return this.procesosAutorizacionesService
          .TipoAutorizacionUsuarioListaTipoAutorizacionUsuario(payload)
          .pipe(
            map((response: GMTipoAutorizacionUsuarioDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los tipos de autorización para editar datos facturación.',
                ),
                response,
              );
              return checkoutDetailsActions.CHECKOUT_FETCH_TYPE_AUTHORIZATION_DETAILS_SUCCESS({
                authorization: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los tipos de autorización para editar datos facturación.',
                ),
                error,
              );
              return of(checkoutDetailsActions.CHECKOUT_FETCH_TYPE_AUTHORIZATION_DETAILS_ERROR);
            }),
          );
      }),
    ),
  );

  // DOCS: OBTENER LOS DÍAS INHABILES
  fetchNotWorkingDays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutDetailsActions.GET_NOT_WORKING_DAYS),
      withLatestFrom(this.store.select(checkoutDetailsSelectors.getIdClientAddress)),
      mergeMap(([action, idClientAddress]) => {
        const params: DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoParams = {
          idDireccionCliente: idClientAddress,
          desde: currentDateWithoutHoursUTCFormat(),
        };
        return this.clientAddressesConfigurationService
          .DireccionClienteExtensionsFechasNoSePuedeEntregarPedido(params)
          .pipe(
            map((response: QueryResultDateTime) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener dias inhabiles',
                ),
              );
              return checkoutDetailsActions.GET_NOT_WORKING_SUCCESS({
                notWorkingDays: response.Results,
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
              return of(checkoutDetailsActions.GET_NOT_WORKING_DAYS_ERROR());
            }),
          );
      }),
    ),
  );

  // DOCS: MUESTRA EL DIALOG PARA ENVIAR CORREO PARA CONFIRMACIÓN DE PEDIDO
  showSendEmailDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkoutDetailsActions.SHOW_SEND_EMAIL_DIALOG),
        withLatestFrom(
          this.store.select(checkoutDetailsSelectors.selectClientContactsForMultiDropActive),
        ),
        mergeMap(([action, mailList]) => {
          const data: IMailDialogData = {
            isEditAddressEmail: true,
            mailList: mailList,
            subject: this.transtaleService.instant('checkout.orderConfirmation'),
            titleHeader: this.transtaleService.instant('checkout.checkout'),
          };

          const dialogRef = this.dialog.open(SendEmailDialogComponent, buildDialogConfig(data));

          dialogRef.afterClosed().subscribe((data: IDataMail) => {
            if (data?.activeSend && !isEmpty(data)) {
              this.store.dispatch(checkoutDetailsActions.CHECKOUT_EMAIL_LOAD({mailData: data}));
            }
          });
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: MUESTRA EL DIALOG PARA ENVIAR CORREO PARA CONFIRMACIÓN DE PEDIDO
  showExustenceLetterDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkoutDetailsActions.DOWN_LOAD_EXISTENCE_LETTER),
        withLatestFrom(this.store.select(checkoutDetailsSelectors.selectedPurchaseOrder)),
        mergeMap(([action, selectedPurchaseOrder]) => {
          const data: AvailabilityLetterData = {
            onlyOneButton: true,
            idPedido: selectedPurchaseOrder.IdTPPedido,
            inPreprocess: false,
          };

          const dialogRef = this.dialog.open(AvailabilityLettersDialogComponent, {
            backdropClass: 'mat-dialog-background',
            data: data,
            panelClass: 'mat-dialog-style',
          });

          dialogRef.afterClosed().subscribe((data: IDataMail) => {
            this.store.dispatch(availabilityActions.SET_INITIAL_STATE());
          });
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: EFFECT TO SHOW REQUEST AUTH DIALOG
  showRequestAuthCodeDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkoutDetailsActions.SHOW_REQUEST_AUTHORIZATION_CODE_DIALOG),
        withLatestFrom(
          this.store.select(checkoutDetailsSelectors.selectedPurchaseOrder),
          this.store.select(checkoutDetailsSelectors.selectPurchaseOrderDetails),
          this.store.select(checkoutDetailsSelectors.selectProcedureType),
        ),
        mergeMap(([action, purchaseOrder, purchaseOrderDetails, procedureType]) => {
          const requestAuthCodeRef = this.dialog.open(
            RequestAuthCodeDialogComponent,
            buildDialogConfig({
              customerName:
                purchaseOrderDetails?.DatosFacturacionClienteDetallePorDefecto
                  ?.DatosFacturacionCliente?.RazonSocial,
              description: this.getAuthorizationCodeDialogDescription(procedureType),
              paymentConditions: purchaseOrderDetails?.catCondicionesDePago?.CondicionesDePago,
              purchaseOrder: this.getAuthorizationCodeOCLabel(purchaseOrder),
              resume: this.getAuthorizationCodeDialogResume(procedureType),
            }),
          );

          requestAuthCodeRef.afterClosed().subscribe((value: boolean) => {
            if (value) {
              this.store.dispatch(checkoutDetailsActions.GENERATE_AUTHORIZATION_CODE());
            }
          });

          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  /*
  Get text for authorization dialog description
  @params procedure type from purchase order selected
  @returns the translation for description
 */
  getAuthorizationCodeDialogDescription(procedureType: string): string {
    switch (procedureType) {
      case this.proceduresTypes.editData:
        return this.transtaleService.instant('checkout.validityCodeMessageEditData');
      case this.proceduresTypes.delinquentCustomer:
        return this.transtaleService.instant('checkout.validityCodeMessageDelinquentCustomer');
      case this.proceduresTypes.invoiceInAdvance:
        return this.transtaleService.instant('checkout.validityCodeMessageInvoiceInAdvance');
    }
  }

  /*
    Get text for authorization dialog resume
    @params procedure type from purchase order selected
    @returns the translation for resume
   */
  getAuthorizationCodeDialogResume(procedureType: string): string {
    switch (procedureType) {
      case this.proceduresTypes.editData:
        return this.transtaleService.instant('checkout.editInvoiceInfo');
      case this.proceduresTypes.invoiceInAdvance:
        return this.transtaleService.instant('checkout.billInAdvance');
      case this.proceduresTypes.delinquentCustomer:
        return this.transtaleService.instant('checkout.delinquentCustomer');
    }
  }

  /*
    Get text or purchase order selected for authorization dialog
    @params Purchase order selected
    @returns Return simple text if purchase order is temporal o has file. Otherwise returns purchase order number
   */
  getAuthorizationCodeOCLabel(purchaseOrder: IOrdersC): string {
    // TODO: REVISAR SI AÚN SE UTILIZA LA PROPIEDAD DE OC TEMPORAL
    /*  : purchaseOrder?.OcTemporal
      ? 'OC-TEMPORAL'*/
    return !purchaseOrder?.IdArchivo ? 'SIN OC' : purchaseOrder?.NumeroOrdenDeCompra;
  }

  // DOCS: SHOW DIALOG TO GENERATE AUTHORIZATION CODE
  generateAuthCode$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkoutDetailsActions.GENERATE_AUTHORIZATION_CODE),
        withLatestFrom(
          this.store.select(checkoutDetailsSelectors.selectProcedureType),
          this.store.select(checkoutDetailsSelectors.selectPurchaseOrderDetails),
          this.store.select(checkoutDetailsSelectors.selectGMCatTipoAutorizacion),
          this.store.select(checkoutDetailsSelectors.selectIdTPPedido),
          this.store.select(checkoutDetailsSelectors.selectedPurchaseOrder),
        ),
        mergeMap(
          ([
            action,
            procedureType,
            purchaseOrderDetails,
            catAuthorizationType,
            idTPPedido,
            purchaseOrder,
          ]) => {
            const payload: ParametroAutorizacion = {
              IdCatTipoAutorizacion: catAuthorizationType?.IdCatTipoAutorizacion,
              IdOperacion: idTPPedido,
              IdAutorizacion: DEFAULT_UUID,
              IdUsuarioAutoriza: null,
              CodigoAutorizacion: '',
              Descripcion: 'Se solicita código de autorización para editar datos facturación',
            };

            const authCodeDialogData = {
              customerName:
                purchaseOrderDetails?.DatosFacturacionClienteDetallePorDefecto
                  ?.DatosFacturacionCliente?.RazonSocial,
              paymentConditions: purchaseOrderDetails?.catCondicionesDePago?.CondicionesDePago,
              purchaseOrder: this.getAuthorizationCodeOCLabel(purchaseOrder),
              resume: this.getAuthorizationCodeDialogResume(procedureType),
            };

            this.store.dispatch(
              authDialogActions.GENERATE_AUTH_CODE({
                actionAfterValid: deliveryBillingActions.SET_SAVE_BILLING_LOAD(),
                authCodeDialogData,
                payload,
              }),
            );

            return EMPTY;
          },
        ),
      ),
    {dispatch: false},
  );

  updateReference$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutDetailsActions.SET_UPDATE_REFERENCE_LOAD),
      withLatestFrom(
        this.store.select(checkoutDetailsSelectors.selectedPurchaseOrder),
        this.store.select(checkoutDetailsSelectors.selectClient),
      ),
      mergeMap(([{reference}, order, client]) => {
        if (reference === order.NumeroOrdenDeCompra) {
          return EMPTY;
        }
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.processPurchasePServices
          .pcPromesaDeCompraExtensionsActulizarRefecrenciaOrdenDeCompra({
            IdCliente: client.IdCliente,
            NuevaReferenciaOC: reference,
            IdtpPedido: order.IdTPPedido,
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
              return checkoutDetailsActions.SET_UPDATE_REFERENCE_SUCCESS({reference});
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

  // DOCS: EFFECT TO SHOW TEE DIALOG
  showTeeDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        checkoutDetailsActions.SHOW_TEE_DIALOG,
        checkoutDetailsActions.GET_ENTRY_POP_INFO_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(checkoutDetailsSelectors.selectBackupPurchaseOrder),
        this.store.select(selectTeeDialogData),
      ),
      mergeMap(([action, backupPurchaseOrder, teeData]) => {
        if (action.type === showTeeDialogString) {
          this.store.dispatch(checkoutDetailsActions.GET_NOT_WORKING_DAYS());
          this.store.dispatch(catalogsActions.GET_UNIDAD_LOAD());
          this.store.dispatch(
            checkoutDetailsActions.GET_ENTRY_POP_INFO_LOAD({
              IdTPPartidaPedido: teeData?.item?.tpPartidaPedido?.IdTPPartidaPedido,
            }),
          );
        } else {
          const dialogRef = this.dialog.open(
            TeeDialogComponent,
            buildDialogConfig({emit: teeData?.emit, item: teeData?.item}),
          );

          dialogRef
            .afterClosed()
            .subscribe((data: {target: any; emit?: boolean; item?: IPurchaseOrderItem}) => {
              if (!data?.emit) {
                //DOCS: Caso para cancelar la edición
                this.store.dispatch(
                  checkoutDetailsActions.RESTORE_BACKUP_PURCHASE_ORDER_SELECTED({
                    backupPurchaseOrder,
                  }),
                );
              } else {
                this.store.dispatch(checkoutDetailsActions.SAVE_SANOFI_VALUE());
              }
            });
        }

        return of(RETURN_EMPTY());
      }),
    ),
  );
}
