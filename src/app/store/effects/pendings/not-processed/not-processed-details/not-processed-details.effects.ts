import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {filter, isEmpty, map as _map} from 'lodash-es';

// Actions
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY, SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import {notProcessedActions, notProcessedDetailActions} from '@appActions/pendings/not-processed';
// Selectors
import {notProcessedDetailsSelectors} from '@appSelectors/pendings/not-processed';
// Models
import * as apiLogistic from 'api-logistica';
import {
  CorreoRecibidoClienteRequerimientoObj,
  GMCotCotizacionDetalle,
  GMGeneraCorreoIntramitables,
  GMTipoAutorizacionUsuarioDetalle,
  ParametroAutorizacion,
  ProcesosAutorizacionesService,
  ProcesosL04PretramitarPedidoCorreosGestionarIntramitablesService,
  ProcesosL04PretramitarPedidoCorreosOcNoAmparadaService,
  ProcesosL04PretramitarPedidoRecalcularService,
  ProcesosMailbotService,
  QueryResultPretramitarPedidoPartidaDetalle,
  QueryResultVPpPedidoObj,
} from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import {ConfiguracionDireccionesService, QueryResultVDireccion, VCliente} from 'api-catalogos';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {
  IOrderNotProcessed,
  IPpPartidaPedidoObjNotProcess,
} from '@appModels/store/pendings/not-processed/not-processed-details/not-processed-details.models';
import {IDropListMulti} from '@appModels/drop-list/drop-list-option';
// Utils
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {getNameFile, isImage, isPdf} from '@appUtil/util';
import {convertPDFFileFromURLToBase64, getBase64FromUrl} from '@appUtil/files';
import {appRoutes} from '@appHelpers/core/app-routes';
import {selectIdUser} from '@appSelectors/auth/auth.selectors';
import {
  buildBodyRequestFEA,
  buildOrdersInSubDashboardDetails,
  buildPurchaseItemsNotProcess,
} from '@appHelpers/pending/not-processed/not-processed.helpers';
import {buildImageNameSave} from '@appUtil/strings';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';
import {ReconfigureFreightPopUpComponent} from '@appComponents/pendings/not-processed/not-processed-details/purchase-order-items/reconfigure-freight-pop-up/reconfigure-freight-pop-up.component';
import {MatDialog} from '@angular/material/dialog';
import {IDataMail, IMailDialogData} from '@appModels/correo/correo';
import {TranslateService} from '@ngx-translate/core';
import {SendEmailDialogComponent} from '@appComponents/shared/send-email-dialog/send-email-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {RequestAuthCodeDialogComponent} from '@appComponents/shared/request-auth-code-dialog/request-auth-code-dialog.component';
import {authDialogActions} from '@appActions/dialogs';

const FILE_NAME = 'not-processed-details.effects.ts';

@Injectable()
export class NotProcessedDetailsEffects {
  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private router: Router,
    private logger: NGXLogger,
    private processPurchasePServices: apiLogistic.ProcesosL03PromesaDeCompraService,
    private notProcessedOrderIntramitableService: apiLogistic.ProcesosL04PretramitarPedidoGestionarIntramitablesService,
    private notProcessedServices: apiLogistic.ProcesosL04PretramitarPedidoService,
    private systemFileServices: apiCatalogs.SistemaArchivosService,
    private customerServices: apiCatalogs.ConfiguracionClientesService,
    private userServices: apiCatalogs.SistemaUsuariosService,
    private sistemaArchivosService: apiCatalogs.SistemaArchivosService,
    private procesosCotizacionService: apiLogistic.ProcesosL01CotizacionService,
    private contactsConfigurationService: apiCatalogs.ConfiguracionContactosService,
    private processMailBoxService: ProcesosMailbotService,
    private procesosAutorizacionesService: ProcesosAutorizacionesService,
    private procesosPretramitarPedido: ProcesosL04PretramitarPedidoCorreosOcNoAmparadaService,
    private procesosPretramitarPedidoCorreosIntramitables: ProcesosL04PretramitarPedidoCorreosGestionarIntramitablesService,
    private procesosL04PretramitarPedidoRecalcularService: ProcesosL04PretramitarPedidoRecalcularService,
    private addressesConfigurationService: ConfiguracionDireccionesService,
    private appService: CoreContainerService,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  //DOCS: CLIENTE SELECCIONADO
  initialViewDetails$ = createEffect(() =>
    this.action$.pipe(
      ofType(notProcessedDetailActions.SET_CLIENT_SELECTED),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.customerServices.vClienteObtener(action.client.IdCliente).pipe(
          map((response: VCliente) => {
            this.router.navigate([
              appRoutes.protected,
              appRoutes.pendings.pendings,
              appRoutes.notProcessed.notProcessed,
              appRoutes.notProcessed.details,
            ]);
            this.store.dispatch(
              authDialogActions.FETCH_AUTHORIZATION_DETAILS({authType: 'tramitarpedidoconerrores'}),
            );
            return notProcessedDetailActions.SET_CLIENT_SELECTED_SUCCESS({
              customer: {
                ...action.client,
                selectedClient: action?.client,
                Categoria: response.Categoria,
                NombreImagen: response.NombreImagen,
                TramitarConOrdenDeCompraInterna: response.TramitarConOrdenDeCompraInterna,
                TramitarSinOrdenDeCompra: response.TramitarSinOrdenDeCompra,
                level: response.NivelIngreso,
                imageHover: buildImageNameSave(
                  `assets/Images/logos/${response.NombreImagen}_hover.png`,
                ),
              },
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

  // DOCS: GET DELIVERY ADDRESSES BY CLIENT
  getDeliveryAddresses = createEffect(() =>
    this.action$.pipe(
      ofType(notProcessedDetailActions.SET_CLIENT_SELECTED_SUCCESS),
      withLatestFrom(
        this.store.select(notProcessedDetailsSelectors.selectQueryInfoGetDeliveryAddress),
      ),
      mergeMap(([action, queryInfo]) => {
        return this.addressesConfigurationService.vDireccionQueryResult(queryInfo).pipe(
          map((response: QueryResultVDireccion) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener direcciones de entrega del cliente.',
              ),
              response,
            );
            return notProcessedDetailActions.GET_DELIVERY_ADDRESSES_SUCCESS({
              deliveryAddress: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener direcciones de entrega del cliente.',
              ),
              error,
            );
            return of(notProcessedDetailActions.GET_DELIVERY_ADDRESSES_FAILED());
          }),
        );
      }),
    ),
  );

  //DOCS: OBTENER LAS ORDENES DE COMPRA
  fetchPurchaseOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        notProcessedDetailActions.SET_CLIENT_SELECTED_SUCCESS,
        notProcessedDetailActions.SET_KEYPAD_OPTION_SELECTED,
        notProcessedDetailActions.SET_TERM_SEARCH,
        notProcessedDetailActions.SET_FILTER_FEA_SELECTED,
        notProcessedDetailActions.PPORDER_INCIDENT_SEND_EMAIL_SUCCESS,
        notProcessedDetailActions.SEND_REQUEST_FOR_FEA_SUCCESS,
        notProcessedDetailActions.OC_NOT_COVERED_SEND_EMAIL_SUCCESS,
        // notProcessedDetailActions.FETCH_SUCCESS, //DOCS: CUANDO SE CANCELA UNA ORDEN DE COMPRA
      ),
      withLatestFrom(this.store.select(notProcessedDetailsSelectors.selectFiltersOrder)),
      mergeMap(([action, filters]) => {
        return this.notProcessedServices.vPpPedidoObtenerClientesOrdenDeCompra(filters).pipe(
          map((response: QueryResultVPpPedidoObj) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las ordenes de compra.',
              ),
              response,
            );
            const orders: IOrderNotProcessed[] = buildOrdersInSubDashboardDetails(response.Results);

            this.store.dispatch(
              notProcessedDetailActions.FETCH_PURCHASE_ORDERS_SUCCESS({
                data: {
                  Results: orders,
                  TotalResults: response.TotalResults,
                },
              }),
            );
            if (response.TotalResults > 0) {
              this.store.dispatch(
                notProcessedDetailActions.SET_PURCHASE_ORDER_SELECTED({
                  item: orders[0],
                }),
              );
            } else {
              if (
                action.type === '[not-processed-details] Fetch  Success' ||
                action.type === '[Api] not-processed-details OC Not Covered Send Email Success' ||
                action.type === 'not-processed-details Send request for fea success' ||
                action.type === '[Api] not-processed-details PpOrder Incident Send Email Success'
              ) {
                this.router.navigate([
                  appRoutes.protected,
                  appRoutes.pendings.pendings,
                  appRoutes.notProcessed.notProcessed,
                ]);
              }
            }
            return RETURN_EMPTY();
          }),
          catchError((error) => {
            this.store.dispatch(
              notProcessedDetailActions.SET_STATUS({
                node: 'apiStatus',
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
    ),
  );
  getUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(notProcessedDetailActions.SET_PURCHASE_ORDER_SELECTED),
      mergeMap((action) => {
        if (isEmpty(action.item.user)) {
          return this.userServices.UsuarioObtener(action.item.IdUsuarioESAC).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el usuario ESAC.',
                ),
                response,
              );
              return notProcessedDetailActions.GET_USER_SUCCESS({
                user: response,
                idOc: action.item.IdPPPedido,
              });
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el usuario ESAC.',
                ),
                error,
              );
              return EMPTY;
            }),
          );
        } else {
          this.store.dispatch(SET_LOADING({payload: false}));
          return EMPTY;
        }
      }),
    ),
  );

  //DOCS: OBTENER LOS DETALLES DEL REQUERIMIENTO (NUEVA FORMA)

  fetchMailNotProcessedNew$ = createEffect(() =>
    this.action$.pipe(
      ofType(notProcessedDetailActions.SET_PURCHASE_ORDER_SELECTED),
      withLatestFrom(this.store.select(notProcessedDetailsSelectors.selectOrderSelected)),
      mergeMap(([state, selectedOrder]) => {
        if (isEmpty(state.item.mailData)) {
          this.store.dispatch(
            notProcessedDetailActions.SET_STATUS({
              node: 'apiStatusMail',
              status: API_REQUEST_STATUS_LOADING,
            }),
          );
          this.store.dispatch(
            notProcessedDetailActions.SET_STATUS({
              node: 'apiStatusItems',
              status: API_REQUEST_STATUS_LOADING,
            }),
          );
          this.store.dispatch(
            notProcessedDetailActions.GET_CLIENT_CONTACTS_LOAD({
              ppPedido: state.item,
            }),
          );
          return this.processMailBoxService
            .CorreoRecibidoClienteRequerimientoObtener(state.item.IdCorreoRecibidoCliente)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener el correo recibido cliente.',
                  ),
                  response,
                );
                this.store.dispatch(
                  notProcessedDetailActions.FETCH_MAIL_PURCHASE_ORDER_SUCCESS({
                    mail: response as CorreoRecibidoClienteRequerimientoObj,
                  }),
                );
                this.store.dispatch(
                  notProcessedDetailActions.SET_STATUS({
                    node: 'apiStatusMail',
                    status: API_REQUEST_STATUS_SUCCEEDED,
                  }),
                );
                return notProcessedDetailActions.FETCH_ITEMS_ORDER_LOAD({
                  order: selectedOrder,
                });
              }),
              catchError((error) => {
                this.store.dispatch(
                  notProcessedDetailActions.SET_STATUS({
                    node: 'apiStatusMail',
                    status: API_REQUEST_STATUS_FAILED,
                  }),
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener el correo recibido cliente..',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        } else {
          if (state?.item?.items?.TotalResults === 0) {
            this.store.dispatch(
              notProcessedDetailActions.SET_STATUS({
                node: 'apiStatusItems',
                status: API_REQUEST_STATUS_LOADING,
              }),
            );
            this.store.dispatch(notProcessedDetailActions.GET_ITEMS_ORDER_SELECTED());
          }
          this.store.dispatch(SET_LOADING({payload: false}));
          return EMPTY;
        }
      }),
    ),
  );

  //DOCS: CONTACTO DETALLE
  getClientContacts = createEffect(() =>
    this.action$.pipe(
      ofType(notProcessedDetailActions.GET_CLIENT_CONTACTS_LOAD),
      switchMap((action) => {
        const body = new FiltersOnlyActive();
        body.Filters = [
          {
            NombreFiltro: 'IdCliente',
            ValorFiltro: action.ppPedido.IdCliente,
          },
          {
            NombreFiltro: 'Activo',
            ValorFiltro: true,
          },
        ];
        return this.contactsConfigurationService.ContactoDetalleQueryResult(body).pipe(
          map((response: apiCatalogs.QueryResultContactoDetalleObj) => {
            this.store.dispatch(
              notProcessedDetailActions.GET_DELIVERY_INSTRUCTIONS_LOAD({
                ppPedido: action.ppPedido,
                contacts: response.Results,
              }),
            );
            const selectedContact: apiCatalogs.ContactoDetalleObj[] = filter(
              response.Results,
              (o) => o.IdContactoCliente === action.ppPedido.IdContactoCliente,
            );
            if (!isEmpty(selectedContact)) {
              const contact: IDropListMulti[] = _map(
                selectedContact,
                (o: apiCatalogs.ContactoDetalleObj) => ({
                  value: o.IdContactoCliente,
                  labels: [
                    {
                      label: `${o.Nombres} ${o.ApellidoPaterno} ${o.ApellidoMaterno}`,
                      color: '#424242',
                      size: '13px',
                    },
                    {
                      label: !isEmpty(o.CorreoElectronico) ? o.CorreoElectronico[0].Correo : '',
                      color: '#008894',
                      size: '12px',
                    },
                  ],
                }),
              );
              this.store.dispatch(
                notProcessedDetailActions.SET_SELECTED_PPPEDIDO_CONTACT_FOR_DROP({
                  email: contact[0]?.labels[1]?.label,
                }),
              );
              this.store.dispatch(
                notProcessedDetailActions.SET_SELECTED_DELIVERY_CONTACT_FOR_DROP({
                  email: contact[0]?.labels[1]?.label,
                }),
              );
            }
            return notProcessedDetailActions.GET_CLIENT_CONTACTS_SUCCESS({
              contacts: response.Results,
            });
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(notProcessedDetailActions.GET_CLIENT_CONTACTS_FAILED());
            return EMPTY;
          }),
        );
      }),
    ),
  );

  //DOCS: OBTENER LAS PARTIDAS DE LA ORDEN DE COMPRA
  fetchItemsOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        notProcessedDetailActions.GET_CLIENT_CONTACTS_SUCCESS,
        notProcessedDetailActions.GET_ITEMS_ORDER_SELECTED,
      ),
      withLatestFrom(
        this.store.select(notProcessedDetailsSelectors.selectOrderSelected),
        this.store.select(notProcessedDetailsSelectors.selectQueryInfoPurchaseItems),
      ),
      mergeMap(([action, order, queryInfo]) => {
        return this.notProcessedServices
          .PretramitarPedidoPartidasDetalleQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultPretramitarPedidoPartidaDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las partidas de la OC.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));

              const items: IPpPartidaPedidoObjNotProcess[] = buildPurchaseItemsNotProcess(
                response.Results,
              );
              this.store.dispatch(
                notProcessedDetailActions.SET_STATUS({
                  node: 'apiStatusItems',
                  status: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              return notProcessedDetailActions.FETCH_ITEMS_ORDER_SUCCESS({
                items: {
                  Results: items,
                  TotalResults: response.TotalResults,
                },
                idPPPedido: order.IdPPPedido,
              });
            }),
            catchError((error) => {
              this.store.dispatch(
                notProcessedDetailActions.SET_STATUS({
                  node: 'apiStatusItems',
                  status: API_REQUEST_STATUS_FAILED,
                }),
              );
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las partidas de la OC.',
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

  //DOCS: CANCELAR EL PROCESO DE LA OC
  cancelProcess$ = createEffect(() =>
    this.action$.pipe(
      ofType(notProcessedDetailActions.CANCEL_PROCESS_OC),
      withLatestFrom(this.store.select(notProcessedDetailsSelectors.selectOrderSelected)),
      mergeMap(([action, order]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.notProcessedServices.ppPedidoDesactivar(order.IdPPPedido).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al cancelar trámite.',
              ),
              response,
            );
            this.store.dispatch(notProcessedDetailActions.FETCH_SUCCESS());
            return notProcessedDetailActions.CANCEL_PROCESS_OC_SUCCESS();
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al cancelar el proceso de la OC.',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // DOCS: Transacción para solicitar FEA
  requestFEA$ = createEffect(() =>
    this.action$.pipe(
      ofType(notProcessedDetailActions.SEND_REQUEST_FOR_FEA_LOAD),
      withLatestFrom(this.store.select(notProcessedDetailsSelectors.selectOrderSelected)),
      mergeMap(([action, order]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const body = buildBodyRequestFEA(order);
        return this.notProcessedOrderIntramitableService
          .ppPedidosSolicitarFEAEnviaCorreoPartidasIncidencia(body)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al solicitar una FEA.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has solicitado una FEA',
                }),
              );
              return notProcessedDetailActions.SEND_REQUEST_FOR_FEA_SUCCESS();
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al solicitar una FEA.',
                ),
                error,
              );
              return of(notProcessedDetailActions.SEND_REQUEST_FOR_FEA_FAILED());
            }),
          );
      }),
    ),
  );

  viewFileRequest = createEffect(
    () =>
      this.action$.pipe(
        ofType(notProcessedDetailActions.VIEW_FILE_LOAD),
        mergeMap((action) => {
          this.appService.setFile({isLoading: true});
          return this.systemFileServices.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los detalles del archivo.',
                ),
                response,
              );
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
                notProcessedDetailActions.VIEW_FILE_SUCCESS({
                  fileBase64: base64,
                }),
              );

              this.appService.setFile({
                ...response,
                nombre: getNameFile(response?.FileKey),
                archivoBase64: base64,
                isPdf: isPdf(action.ext),
              });

              this.store.dispatch(
                notProcessedDetailActions.VIEW_FILE_IS_LOADING({
                  value: false,
                }),
              );
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los detalles del archivo.',
                ),
                error,
              );
              return of(notProcessedDetailActions.VIEW_FILE_ERROR());
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  // DOCS: Se comenta porque actualmente no se está usando el servicio de traer las cotizaciones vinculadas, descomentar en caso de ser necesario
  // DOCS: OBTIENE PARTIDAS VINCULADAS
  /*  itemsLinked$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(notProcessedDetailActions.SET_ITEM_LINKED),
        withLatestFrom(this.store.select(notProcessedDetailsSelectors.selectClient)),
        mergeMap(([action, client]) => {
          const item: any = action.item;
          const params = new FiltersOnlyActive();
          params.Filters.push({
            NombreFiltro: 'IdPPPartidaPedido',
            ValorFiltro: item.IdPPPartidaPedido,
          });
          // @ts-ignore
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
                this.store.dispatch(
                  notProcessedDetailActions.UPDATE_ITEM_LIST({
                    IdPPPartidaPedido: item.IdPPPartidaPedido,
                    linkedQuotes: response.Results,
                  }),
                );
                if (response.TotalResults === 1) {
                  this.store.dispatch(
                    notProcessedDetailActions.SET_ID_ARCHIVO_PDF({
                      IdArchivo: response.Results[0].IdArchivoPDF,
                    }),
                  );
                  this.store.dispatch(
                    notProcessedDetailActions.SET_INVOICE_ITEM_SELECTED({
                      item: 'FO - ' + response.Results[0].Folio,
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
                notProcessedDetailActions.SET_ID_ARCHIVO_PDF({
                  IdArchivo: item.quotesLinked[0].IdArchivoPDF,
                }),
              );
              this.store.dispatch(
                notProcessedDetailActions.SET_INVOICE_ITEM_SELECTED({
                  item: 'FO - ' + item.quotesLinked[0].Folio,
                }),
              );
            } else {
              this.store.dispatch(
                notProcessedDetailActions.UPDATE_ITEM_LIST({
                  IdPPPartidaPedido: item.IdPPPartidaPedido,
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
      this.action$.pipe(
        ofType(notProcessedDetailActions.SET_ID_ARCHIVO_PDF),
        mergeMap((action) => {
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response) => {
              const splits = response.FileKey.split('.');
              const ext = splits[splits.length - 1];
              this.store.dispatch(
                notProcessedDetailActions.VIEW_FILE_LOAD({
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

  // DOCS: Get data for authorization code
  fetchTypeAuthorization$ = createEffect(() =>
    this.action$.pipe(
      ofType(notProcessedDetailActions.FETCH_TYPE_AUTHORIZATION_DETAILS),
      mergeMap((action) => {
        const payload = {
          Filters: [{NombreFiltro: 'Clave', ValorFiltro: 'tramitarpedidoconerrores'}],
        };
        return this.procesosAutorizacionesService
          .TipoAutorizacionUsuarioListaTipoAutorizacionUsuario(payload)
          .pipe(
            map((response: GMTipoAutorizacionUsuarioDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el tipo autorizacion detalle.',
                ),
                response,
              );
              return notProcessedDetailActions.FETCH_TYPE_AUTHORIZATION_DETAILS_SUCCESS({
                authorization: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el tipo autorizacion detalle.',
                ),
                error,
              );
              return of(notProcessedDetailActions.FETCH_TYPE_AUTHORIZATION_DETAILS_ERROR);
            }),
          );
      }),
    ),
  );
  // DOCS: Generate authorization code para la transacción de tramitar con errores
  generateAuthorizationCode$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(notProcessedDetailActions.GENERATE_AUTHORIZATION_CODE),
        withLatestFrom(
          this.store.select(notProcessedDetailsSelectors.selectOrderSelected),
          this.store.select(notProcessedDetailsSelectors.selectClient),
        ),
        mergeMap(([action, selectedOrder, client]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          // DOCS: DATA TO REQUEST AUTHORIZATION CODE
          const payload: ParametroAutorizacion = {
            IdOperacion: selectedOrder?.IdPPPedido,
            IdAutorizacion: DEFAULT_UUID,
            IdUsuarioAutoriza: null,
            CodigoAutorizacion: '',
            Descripcion:
              'Se solicita codigo de autorizacion para tramitar pedido con errores del cliente ' +
              client?.Nombre.toUpperCase(),
          };
          // DOCS: DATA TO VALIDATE AUTH CODE DIALOG
          const authCodeDialogData = {
            customerName: client?.Nombre,
            paymentConditions:
              selectedOrder?.DatosFacturacionClienteDetalle?.catCondicionesDePago
                ?.CondicionesDePago,
            purchaseOrder: selectedOrder?.OrdenDeCompra,
            resume: this.translateService.instant('notProcessed.requestForProcessingWithErrors'),
          };

          this.store.dispatch(
            authDialogActions.GENERATE_AUTH_CODE({
              actionAfterValid: notProcessedDetailActions.PPORDER_INCIDENT_SEND_EMAIL(),
              authCodeDialogData,
              payload,
            }),
          );

          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS: TRANSACCION ENVIAR OC INTERNA
  OCNotCoveredSendEmail$ = createEffect(() =>
    this.action$.pipe(
      ofType(notProcessedDetailActions.OC_NOT_COVERED_SEND_EMAIL),
      withLatestFrom(
        this.store.select(notProcessedDetailsSelectors.selectSelectedOrderIdPPPedido),
        this.store.select(notProcessedDetailsSelectors.selectMainEmail),
        this.store.select(notProcessedDetailsSelectors.selectIncidentItems),
        this.store.select(selectIdUser),
        this.store.select(notProcessedDetailsSelectors.selectOrderSelected),
      ),
      mergeMap(([{dataEmail}, IdPPPedido, email, indicentItems, idUserLogged, selectedOrder]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        const contacts = dataEmail.to as string[];
        const payload = {
          Comentarios: dataEmail.additionalComments,
          CorreoDestinatario: contacts[0],
          IdPPPedido,
          IdUsuarioEnvia: idUserLogged,
          ListaPartidasIncidencias: [...indicentItems],
          ppPedidoConfiguracion: selectedOrder.ppPedidoConfiguracion,
        };
        return this.procesosPretramitarPedido
          .ppPedidoOcNoAmparadaCorreoEnviaCorreoOcNoAmparada(payload)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al enviar correo de OC no amparada.',
                ),
                response,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Se ha enviado el correo de OC no amparada',
                }),
              );
              return notProcessedDetailActions.OC_NOT_COVERED_SEND_EMAIL_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al enviar correo de OC no amparada.',
                ),
                error,
              );
              return of(notProcessedDetailActions.OC_NOT_COVERED_SEND_EMAIL_ERROR());
            }),
          );
      }),
    ),
  );

  // DOCS: Transacción para procesar con errores del cliente
  ppOrderSendEmail$ = createEffect(() =>
    this.action$.pipe(
      ofType(notProcessedDetailActions.PPORDER_INCIDENT_SEND_EMAIL),
      withLatestFrom(
        this.store.select(selectIdUser),
        this.store.select(notProcessedDetailsSelectors.selectIncidentItems),
        this.store.select(notProcessedDetailsSelectors.selectMainEmail),
        this.store.select(notProcessedDetailsSelectors.selectSelectedOrderIdPPPedido),
        this.store.select(notProcessedDetailsSelectors.selectDeliveryInstructions),
        this.store.select(notProcessedDetailsSelectors.selectOrderSelected),
      ),
      mergeMap(
        ([
          action,
          idUserLogged,
          indicentItems,
          email,
          IdPPPedido,
          deliveryInstructions,
          selectedOrder,
        ]) => {
          const payload: GMGeneraCorreoIntramitables = {
            CorreoDestinatario: email,
            IdPPPedido,
            IdUsuarioEnvia: idUserLogged,
            InstruccionesEntrega: deliveryInstructions,
            ListaPartidasIncidencias: [...indicentItems],
            ppPedidoConfiguracion: selectedOrder.ppPedidoConfiguracion,
          };
          return this.procesosPretramitarPedidoCorreosIntramitables
            .ppPedidoIncidenciaCorreoEnviaCorreoPartidasIncidencia(payload)
            .pipe(
              map((response: string) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al enviar correo de OC con errores.',
                  ),
                  response,
                );
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: 'Se ha enviado el correo de OC con errores de cliente.',
                  }),
                );
                this.store.dispatch(
                  notProcessedDetailActions.SET_DELIVERY_INSTRUCTIONS({
                    instructions: null,
                  }),
                );
                return notProcessedDetailActions.PPORDER_INCIDENT_SEND_EMAIL_SUCCESS();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al enviar correo de OC con errores.',
                  ),
                  error,
                );
                this.store.dispatch(
                  notProcessedDetailActions.SET_DELIVERY_INSTRUCTIONS({
                    instructions: null,
                  }),
                );
                return of(notProcessedDetailActions.PPORDER_INCIDENT_SEND_EMAIL_ERROR());
              }),
            );
        },
      ),
    ),
  );

  // DOCS: RECONFIGURE FREIGHT BY ORDER
  reconfigureFreightOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(notProcessedDetailActions.GM_RECONFIGURE_FREIGHT),
      withLatestFrom(this.store.select(notProcessedDetailsSelectors.selectGmPPPedidoRecalcular)),
      mergeMap(([action, payload]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.procesosL04PretramitarPedidoRecalcularService
          .ppPedidoRecalcularPpPedidoRecalcular(payload)
          .pipe(
            map((response: GMCotCotizacionDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al reconfigurar flete.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(notProcessedDetailActions.SHOW_RECONFIGURE_FREIGHT_DIALOG());
              return notProcessedDetailActions.GM_RECONFIGURE_FREIGHT_SUCCESS({
                gMCotCotizacionDetalle: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al reconfigurar flete.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(notProcessedDetailActions.GM_RECONFIGURE_FREIGHT_ERROR);
            }),
          );
      }),
    ),
  );

  /*DOCS: MUESTRA EL DIALOG DE RECONFIGURAR FLETE Y SE REALIZO EN EFFECT YA
   QUE SE NECESITA EL MISMO FUNCIONAMIENTO EN GM_RECONFIGURE_FREIGHT
   Y purchase-order-item.component.ts (showReconfigureFreightPopUp)*/
  reconfigureFreightSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(notProcessedDetailActions.SHOW_RECONFIGURE_FREIGHT_DIALOG),
        mergeMap((action) => {
          const dialogRef = this.dialog.open(
            ReconfigureFreightPopUpComponent,
            buildDialogConfig({}),
          );

          dialogRef
            .afterClosed()
            .subscribe((data: {event: boolean; isReconfigureFreight: boolean}) => {
              if (data?.event) {
                if (data?.isReconfigureFreight) {
                  this.store.dispatch(notProcessedDetailActions.GM_RECONFIGURE_FREIGHT());
                } else {
                  // DOCS:Abrir modal <Generar cotización>
                  this.store.dispatch(
                    notProcessedDetailActions.SHOW_SEND_EMAIL_DIALOG({
                      isNotCovered: false,
                      isFromReconfigureFreights: true,
                    }),
                  );
                }
              } else {
                this.store.dispatch(
                  notProcessedDetailActions.SHOW_RECONFIGURE_FREIGHT_POP_UP({isOpen: false}),
                );
              }
            });
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: GENERAR COTIZACIÓN EN LA RECONFIGURACIÓN DE PARTIDAS
  saveGmPPedidoGeneraCotizacion$ = createEffect(() =>
    this.action$.pipe(
      ofType(notProcessedDetailActions.FETCH_GM_PEDIDO_GENERAR_COTIZACION),
      withLatestFrom(
        this.store.select(notProcessedDetailsSelectors.selectGmPPedidoGeneraCotizacion),
        this.store.select(notProcessedDetailsSelectors.selectClientFromList),
      ),
      mergeMap(([action, payload, client]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.procesosL04PretramitarPedidoRecalcularService
          .ppPedidoGenerarCotizacionIntramitablePpPedidoGenerarCotizacionIntramitable(payload)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al reconfigurar flete.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              // DOCS: start -> Reinicia la página
              this.store.dispatch(notProcessedDetailActions.RESET_ALL());
              this.store.dispatch(
                notProcessedActions.SET_ALLOWED_TO_DETAILS_VALUE({
                  allowedToDetails: true,
                }),
              );
              this.store.dispatch(
                notProcessedActions.SET_IS_IN_DETAILS_VIEW({isInDetailsView: true}),
              );
              this.store.dispatch(notProcessedDetailActions.SET_CLIENT_SELECTED({client}));
              // DOCS: end -> Reinicia la página

              return notProcessedDetailActions.FETCH_GM_PEDIDO_GENERAR_COTIZACION_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al reconfigurar flete.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(notProcessedDetailActions.FETCH_GM_PEDIDO_GENERAR_COTIZACION_ERROR);
            }),
          );
      }),
    ),
  );

  // DOCS: MUESTRA EL DIALOG PARA ENVIAR CORREO PARA GENERAR COTIZACIÓN Y GENERAR OC NO AMPARADA
  showSendEmailDialog$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(notProcessedDetailActions.SHOW_SEND_EMAIL_DIALOG),
        withLatestFrom(this.store.select(notProcessedDetailsSelectors.selectContactEmail)),
        mergeMap(([{isNotCovered, isFromReconfigureFreights}, mailList]) => {
          const data: IMailDialogData = {
            isEditAddressEmail: true,
            additionalText: this.translateService.instant('notProcessed.sendLinkOc'),
            mailList,
            subject: this.translateService.instant('notProcessed.notCoveredOC'),
            titleHeader: isNotCovered
              ? this.translateService.instant('notProcessed.generateNotCovered')
              : this.translateService.instant('common.generateNewQuotation'),
          };

          const dialogRef = this.dialog.open(SendEmailDialogComponent, buildDialogConfig(data));

          dialogRef.afterClosed().subscribe((data: IDataMail) => {
            if (data?.activeSend) {
              if (isNotCovered) {
                this.store.dispatch(
                  notProcessedDetailActions.OC_NOT_COVERED_SEND_EMAIL({dataEmail: data}),
                );
              } else {
                // DOCS: HACE EL GUARDADO
                // DOCS: Guarda los datos del email en el estado para ser enviados en la transacción
                this.store.dispatch(
                  notProcessedDetailActions.SET_DATA_IMAIL_TO_GM_PEDIDO_GENERAR_COTIZACION({
                    iDataMail: data,
                  }),
                );
                // DOCS: Envia la transacción
                this.store.dispatch(notProcessedDetailActions.FETCH_GM_PEDIDO_GENERAR_COTIZACION());
              }
            }
            // DOCS: VALIDAR SI EL DIALOG DE CORREO ES ABIERTO DESDE EL DIALOG DE RECONFIGURAR FLETE PARA LIMPIAR SUS DATOS EN STORE AL CERRAR
            if (isFromReconfigureFreights) {
              this.store.dispatch(
                notProcessedDetailActions.SHOW_RECONFIGURE_FREIGHT_POP_UP({isOpen: false}),
              );
            }
          });

          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: MUESTRA EL DIALOG PARA SOLICITAR CÓDIGO DE AUTORIZACIÓN
  showRequestAuthCode$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(notProcessedDetailActions.SHOW_REQUEST_AUTH_CODE),
        withLatestFrom(
          this.store.select(notProcessedDetailsSelectors.selectClient),
          this.store.select(notProcessedDetailsSelectors.selectOrderSelected),
        ),
        mergeMap(([action, customer, order]) => {
          const authCodeDialogRef = this.dialog.open(
            RequestAuthCodeDialogComponent,
            buildDialogConfig({
              customerName: customer?.Nombre,
              description: this.translateService.instant('preProcessing.requestCodeMessage'),
              paymentConditions:
                order?.DatosFacturacionClienteDetalle?.catCondicionesDePago?.CondicionesDePago,
              purchaseOrder: order?.OrdenDeCompra,
              resume: this.translateService.instant('notProcessed.requestForProcessingWithErrors'),
            }),
          );

          authCodeDialogRef.afterClosed().subscribe((value: boolean) => {
            if (value) {
              this.store.dispatch(notProcessedDetailActions.GENERATE_AUTHORIZATION_CODE());
            } else {
              this.store.dispatch(
                notProcessedDetailActions.SET_DELIVERY_INSTRUCTIONS({
                  instructions: null,
                }),
              );
            }
          });
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: ACTUALIZA LA REFERENCIA DE LA PROMESA DE COMPRA
  updateReference$ = createEffect(() =>
    this.action$.pipe(
      ofType(notProcessedDetailActions.SET_UPDATE_REFERENCE_LOAD),
      withLatestFrom(
        this.store.select(notProcessedDetailsSelectors.selectOrderSelected),
        this.store.select(notProcessedDetailsSelectors.selectClient),
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
              return notProcessedDetailActions.SET_UPDATE_REFERENCE_SUCCESS({reference});
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
