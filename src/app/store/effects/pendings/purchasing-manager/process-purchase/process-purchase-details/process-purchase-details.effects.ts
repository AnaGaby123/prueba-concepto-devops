/* Core Imports */
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import * as servicesLogger from '@appUtil/logger';

/* Actions Imports*/
import {
  processPurchaseActions,
  processPurchaseDetailsActions,
} from '@appActions/pendings/purchasing-manager/process-purchase';

/* Selectors Imports*/
import {processPurchaseDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/process-purchase';
import {selectIdUser} from '@appSelectors/auth/auth.selectors';

/* Services Imports */
/* Models Imports */
import * as apiLogistic from 'api-logistica';
import {OcOrdenDeCompra, ProcesosL06OrdenDeCompraPendientesService} from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';

/* Tools Imports */
import {of} from 'rxjs';
import {extractID} from '@appUtil/util';

/* Routes Imports */
import {DEFAULT_DATE, DEFAULT_UUID, MINIO_BUCKETS} from '@appUtil/common.protocols';

/* Utils Imports */
import {
  RETURN_EMPTY,
  SET_LOADING,
  SET_LOADING_ERROR,
  SET_LOADING_SUCCESS,
} from '@appActions/utils/utils.action';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'process-purchase-details.effects.ts';

//
@Injectable()
export class ProcessPurchaseDetailsEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private router: Router,
    private purchaseOrderServices: apiLogistic.ProcesosL06OrdenDeCompraDashboardService,
    private purchaseOrderPurchaseServices: apiLogistic.ProcesosL06OrdenDeCompraPartidasService,
    private purchaseOrderPurchasePendingsServices: apiLogistic.ProcesosL06OrdenDeCompraPendientesService,
    private purchaseOrderService: apiLogistic.ProcesosL06OrdenDeCompraService,
    private purchaseOrderMailsService: apiLogistic.ProcesosL06OrdenDeCompraCorreosService,
    private pdfFilesService: apiCatalogs.SistemaArchivosPDFsService,
    private contactsService: apiCatalogs.ConfiguracionContactosService,
    private contactsServiceProviders: apiCatalogs.ConfiguracionProveedoresService,
    private emailService: apiCatalogs.SistemaCorreosService,
    private sendEmailService: apiCatalogs.SistemaCorreosEnvioService,
  ) {}

  // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
  /*fetchGeneralDataPurchase$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        processPurchaseDetailsActions.SET_PROVIDER,
        processPurchaseDetailsActions.RELOAD_GENERAL_DATA,
      ),
      withLatestFrom(
        this.store.select(processPurchaseDetailsSelectors.selectIdProvider),
        this.store.select(
          processPurchaseDetailsSelectors.selectNeedsToReloadContacts,
        ),
      ),
      mergeMap(([action, idProvider, needsToReloadContacts]) => {
        const params: ProcesosL06OrdenDeCompraDashboardService.TramitarCompraElaborarObtenerParams = {
          idProveedor: idProvider,
        };
        return this.purchaseOrderServices
          .TramitarCompraElaborarObtener(params)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la información general de la compra.',
                ),
                response,
              );

              const families: Array<IFamily> = _.map(
                response.ListaTramitarCompraElaborarCarritoCarrusel,
                (family: IFamily, index) => {
                  this.setDataTabOptions(
                    family.vProveedorFamiliaOcPendienteCompra,
                  );

                  return {
                    ...family,
                    isSelected: index === 0,
                    products: [],
                    totalProducts: 0,
                    needsToReloadProducts: true,
                    productsStatus: API_REQUEST_STATUS_DEFAULT,
                    desiredPage: 0,
                    isLoadingMoreProducts: false,
                    tabOptions: this.setDataTabOptions(
                      family.vProveedorFamiliaOcPendienteCompra,
                    ),
                    tabSelected: this.setDataTabOptions(
                      family.vProveedorFamiliaOcPendienteCompra,
                    )[0],
                    searchTerm: '',
                  };
                },
              );

              this.store.dispatch(
                processPurchaseDetailsActions.SET_FAMILIES({
                  families,
                  totalFamilies: families.length,
                }),
              );

              const idFamilyProviderCurrent = _.filter(
                families,
                (family: IFamily) => family.isSelected,
              )[0].IdProveedorFamilia;

              this.store.dispatch(
                processPurchaseDetailsActions.FETCH_PRODUCTS_LOAD({
                  isFirstPage: true,
                  IdProveedorFamilia: idFamilyProviderCurrent,
                }),
              );

              if (!_.isEmpty(response.CorreoElectronico)) {
                const mail: IDropListMulti = {
                  value: response.CorreoElectronico[0].IdCorreoElectronico,
                  labels: [
                    {
                      label: response.CorreoElectronico[0].Correo,
                      isShow: true,
                    },
                  ],
                  isSelected: true,
                };
                this.store.dispatch(
                  processPurchaseDetailsActions.ADD_MAIL_TO_LIST({
                    newMail: mail,
                  }),
                );
              }

              return {
                idProvider,
                needsToReloadContacts,
                generalData: response,
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la información general de la compra.',
                ),
                error,
              );

              this.store.dispatch(
                processPurchaseDetailsActions.FETCH_GENERAL_DATA_PURCHASE_FAILED(),
              );
              return EMPTY;
            }),
          );
      }),
      /!*switchMap((data) => {
        if (data.needsToReloadContacts) {
          const queryInfo: QueryInfo = {} as QueryInfo;
          queryInfo.Filters = [
            {
              NombreFiltro: 'IdProveedor',
              ValorFiltro: data.idProvider,
            },
            {
              NombreFiltro: 'Activo',
              ValorFiltro: true,
            },
          ];
          return this.contactsService
            .ContactoDetalleProvQueryResult(queryInfo)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener los contactos del proveedor.',
                  ),
                  response,
                );

                let contacts: Array<IDropListMulti> = [];
                _.forEach(
                  response.Results,
                  (contact: ContactoDetalleProvObj) => {
                    if (!_.isEmpty(contact.CorreoElectronico)) {
                      contacts = [
                        ...contacts,
                        {
                          value:
                            contact.CorreoElectronico[0].IdCorreoElectronico,
                          labels: [
                            {
                              label: contact.CorreoElectronico[0].Correo,
                              isShow: true,
                            },
                          ],
                          isSelected: false,
                        },
                      ];
                    }
                  },
                );

                return processPurchaseDetailsActions.FETCH_GENERAL_DATA_PURCHASE_SUCCESS(
                  {generalData: data.generalData, contacts},
                );
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener los contactos del proveedor.',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        }
        return EMPTY;
      }),*!/
      switchMap((data) => {
        if (data.needsToReloadContacts) {
          const queryInfo: QueryInfo = {} as QueryInfo;
          queryInfo.Filters = [
            {
              NombreFiltro: 'IdProveedor',
              ValorFiltro: data.idProvider,
            },
            {
              NombreFiltro: 'Activo',
              ValorFiltro: true,
            },
          ];
          return this.contactsServiceProviders
            .ProveedorExtensionsObtenerListaContactoDetalle(data.idProvider)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener los contactos del proveedor.',
                  ),
                  response,
                );

                const filteredContacts = _.filter(
                  response,
                  (o: ContactoDetalleProvObj) =>
                    !_.isEmpty(o.CorreoElectronico),
                );

                const modifiedContacts: Array<IDropListMulti> = _.map(
                  filteredContacts,
                  (o: ContactoDetalleProvObj) => ({
                    value: o.CorreoElectronico[0].IdCorreoElectronico,
                    labels: [
                      {
                        label: o.CorreoElectronico[0].Correo,
                        isShow: true,
                      },
                    ],
                    isSelected: false,
                  }),
                );

                return processPurchaseDetailsActions.FETCH_GENERAL_DATA_PURCHASE_SUCCESS(
                  {
                    generalData: data.generalData,
                    modifiedContacts,
                    contacts: response,
                  },
                );
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener los contactos del proveedor.',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        }
        return EMPTY;
      }),
    ),
  );*/

  // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
  /*fetchProductsOfFamily$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        processPurchaseDetailsActions.SET_FAMILY_SELECTED,
        processPurchaseDetailsActions.FETCH_PRODUCTS_LOAD,
        processPurchaseDetailsActions.SET_TAB_SELECTED,
        processPurchaseDetailsActions.SET_FILTER_SELECTED,
        processPurchaseDetailsActions.SET_SEARCH_TERM,
        processPurchaseDetailsActions.TAKE_PIECES_OF_STOCK_SUCCESS,
        processPurchaseDetailsActions.GENERATE_OTHER_OC_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(processPurchaseDetailsSelectors.selectQueryInfo),
        this.store.select(
          processPurchaseDetailsSelectors.selectIdFamilyProvider,
        ),
        this.store.select(processPurchaseDetailsSelectors.selectNeedsToReload),
        this.store.select(processPurchaseDetailsSelectors.selectMoreProducts),
        this.store.select(
          processPurchaseDetailsSelectors.selectControlOfCurrentFamily,
        ),
        this.store.select(
          processPurchaseDetailsSelectors.selectListProductsToGenerateOrder,
        ),
      ),
      mergeMap(
        ([
          action,
          queryInfo,
          idFamilyProvider,
          firstTime,
          moreProducts,
          control,
          productsToGenerateOrder,
        ]) => {
          if (firstTime || moreProducts) {
            return this.purchaseOrderPurchaseServices
              .vProductoPendienteCompraQueryResult(queryInfo)
              .pipe(
                map((response) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al obtener los productos.',
                    ),
                    response,
                  );
                  if (moreProducts) {
                    this.store.dispatch(
                      processPurchaseDetailsActions.SET_IS_LOADING_MORE_PRODUCTS(
                        {
                          IdProveedorFamilia: idFamilyProvider,
                          isLoadingMoreProducts: false,
                        },
                      ),
                    );
                  }

                  const results = _.filter(
                    response.Results,
                    (product: VProductoPendienteCompra) =>
                      _.findIndex(
                        productsToGenerateOrder,
                        (productToOC: IProducts) =>
                          productToOC.IdOcPendienteCompraProducto ===
                          product.IdOcPendienteCompraProducto,
                      ) === -1,
                  );

                  const products: Array<IProducts> = _.map(
                    results,
                    (product, index) => ({
                      ...product,
                      control,
                      stockPop: {
                        isOpen: false,
                        isInRange: false,
                        elementId: `stockPop${index + 1}`,
                        target: null,
                        position: 'right-center',
                        zIndex: 2,
                      },
                    }),
                  );
                  return processPurchaseDetailsActions.FETCH_PRODUCTS_SUCCESS({
                    products: addRowIndex(
                      queryInfo.desiredPage,
                      queryInfo.pageSize,
                      products,
                    ),
                    IdProveedorFamilia: idFamilyProvider,
                    totalProducts: response.TotalResults,
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
                  return processPurchaseDetailsActions.FETCH_PRODUCTS_FAILED;
                }),
              );
          }
          return EMPTY;
        },
      ),
    ),
  );*/

  linkToProvider$ = createEffect(() =>
    this.action$.pipe(
      ofType(processPurchaseDetailsActions.LINK_TO_PROVIDER_LOAD),
      withLatestFrom(
        this.store.select(processPurchaseDetailsSelectors.selectWhoToLink),
        this.store.select(processPurchaseDetailsSelectors.selectIdAlternativeProvider),
        this.store.select(processPurchaseDetailsSelectors.selectArrayIdProducts),
      ),
      mergeMap(([action, whoToLink, idAlternativeProvider, arrayIdProducts]) => {
        const params: ProcesosL06OrdenDeCompraPendientesService.OcPendienteCompraProductoExtensionsGenerarPartidasOcOrdenDeCompraParams = {
          idProveedor: idAlternativeProvider,
          ListaIdOcPendienteCompraProducto: arrayIdProducts,
        };
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.purchaseOrderPurchasePendingsServices
          .ocPendienteCompraProductoExtensionsGenerarPartidasOcOrdenDeCompra(params)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al vincular los productos seleccionados al proveedor.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return processPurchaseDetailsActions.LINK_TO_PROVIDER_SUCCESS({
                nameToLink: whoToLink,
                totalProducts: arrayIdProducts.length,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al vincular los productos seleccionados al proveedor.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message: 'Ha ocurrido un error',
                }),
              );
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );

  linkToProviderSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(processPurchaseDetailsActions.LINK_TO_PROVIDER_SUCCESS),
      mergeMap((action) => {
        this.store.dispatch(
          SET_LOADING_SUCCESS({
            active: true,
            message: 'Has vinculado',
            extraMessage: `${action.totalProducts} ${
              action.totalProducts === 1 ? 'producto' : 'productos'
            } a ${action.nameToLink}.`,
            successText: 'Exitosamente!',
          }),
        );
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.processPurchase.orderPurchase,
          appRoutes.processPurchase.list,
        ]);
        return of(RETURN_EMPTY());
      }),
    ),
  );

  generateOcAndPdf$ = createEffect(() =>
    this.action$.pipe(
      ofType(processPurchaseDetailsActions.GENERATE_OC_AND_PDF_LOAD),
      withLatestFrom(
        this.store.select(processPurchaseDetailsSelectors.selectIdCatCurrency),
        this.store.select(processPurchaseDetailsSelectors.selectCompanyBuysSelected),
        this.store.select(processPurchaseDetailsSelectors.selectShippingCompanySelected),
        this.store.select(processPurchaseDetailsSelectors.selectIdProvider),
        this.store.select(selectIdUser),
        this.store.select(processPurchaseDetailsSelectors.selectListProductsToGenerateOrder),
        this.store.select(processPurchaseDetailsSelectors.selectArrayIdProducts),
      ),
      mergeMap(
        ([
          action,
          idCatCurrency,
          companyBuys,
          companyShipping,
          idProvider,
          idUser,
          productsToGenerateOc,
          arrayIdProducts,
        ]) => {
          this.store.dispatch(SET_LOADING({payload: true}));

          const oc = this.createObjectToLinkTo(
            idCatCurrency,
            String(companyBuys.value),
            String(companyShipping.value),
            idProvider,
            idUser,
          );

          return this.purchaseOrderService.ocOrdenDeCompraGuardarOActualizar(oc).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al generar la órden de compra',
                ),
                response,
              );
              this.store.dispatch(
                processPurchaseDetailsActions.SAVE_ID_PURCHASE_ORDER({
                  idPurchaseOrder: extractID(response),
                }),
              );

              return {
                idOcOrdenDeCompra: extractID(response),
                ListaIdOcPendienteCompraProducto: arrayIdProducts,
                totalProducts: productsToGenerateOc.length,
                idProvider,
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al generar la órden de compra',
                ),
                error,
              );

              this.store.dispatch(SET_LOADING({payload: false}));

              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message: 'Ha ocurrido un error',
                }),
              );
              return of(RETURN_EMPTY());
            }),
          );
        },
      ),
      switchMap((data: any) => {
        return this.purchaseOrderService.ocOrdenDeCompraObtener(data.idOcOrdenDeCompra).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener la órden de compra',
              ),
              response,
            );

            this.store.dispatch(
              processPurchaseDetailsActions.SET_DATA_PURCHASE_ORDER({
                purchaseOrderData: response,
              }),
            );
            return {
              ...data,
              objOrden: response,
            };
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener la órden de compra',
              ),
              error,
            );

            this.store.dispatch(SET_LOADING({payload: false}));

            this.store.dispatch(
              SET_LOADING_ERROR({
                active: true,
                message: 'Ha ocurrido un error',
              }),
            );

            return of(RETURN_EMPTY());
          }),
        );
      }),
      switchMap((data: any) => {
        return this.purchaseOrderPurchaseServices
          .ocPartidaExtensionsGenerarPartidasOcOrdenDeCompra(data)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al vincular las partidas a la órden de compra.',
                ),
                response,
              );

              return {
                ...data,
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al vincular las partidas a la órden de compra.',
                ),
                error,
              );

              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message: 'Ha ocurrido un error',
                }),
              );

              return of(RETURN_EMPTY());
            }),
          );
      }),
      switchMap((data) => {
        const body: apiCatalogs.ArchivoExportarPDFParameter = {
          TipoDocumento: 'Compra',
          Parametros: {
            IdOcOrdenDeCompra: data.idOcOrdenDeCompra,
            espanol: 'true',
          },
          DestinoMinIO: {
            Key: `${new Date().getFullYear()}/${data.idProvider}/${data.idOcOrdenDeCompra}/${
              data.objOrden.NumeroOrdenDeCompra
            }.pdf`,
            Bucket: MINIO_BUCKETS.Purchases,
          },
        };

        return this.pdfFilesService.ArchivoExportarPDFsExportarPDF(body).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al generar pdf de OC.',
              ),
              response,
            );

            this.store.dispatch(
              processPurchaseDetailsActions.SET_DATA_PDF({
                pdfData: response,
              }),
            );

            this.store.dispatch(
              processPurchaseDetailsActions.HANDLE_POP_UP_SEND_MAIL({
                popUpSendMail: true,
              }),
            );

            this.store.dispatch(SET_LOADING({payload: false}));

            return processPurchaseDetailsActions.GENERATE_OC_AND_PDF_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al generar pdf de OC.',
              ),
              error,
            );

            this.store.dispatch(SET_LOADING({payload: false}));

            this.store.dispatch(
              SET_LOADING_ERROR({
                active: true,
                message: 'Ha ocurrido un error',
              }),
            );

            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );

  deletePurchaseOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(processPurchaseDetailsActions.DELETE_PURCHASE_ORDER_LOAD),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));

        return this.purchaseOrderService
          .ocOrdenDeCompraDesactivarResponse(action.idPurchaseOrder)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar la órden de compra',
                ),
                response,
              );

              this.store.dispatch(
                processPurchaseDetailsActions.HANDLE_POP_UP_SEND_MAIL({
                  popUpSendMail: false,
                }),
              );
              this.store.dispatch(SET_LOADING({payload: false}));

              return processPurchaseDetailsActions.DELETE_PURCHASE_ORDER_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al eliminar la órden de compra',
                ),
                error,
              );

              this.store.dispatch(SET_LOADING({payload: false}));

              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message: 'Ha ocurrido un error',
                }),
              );

              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );

  sendMail$ = createEffect(() =>
    this.action$.pipe(
      ofType(processPurchaseDetailsActions.SEND_MAIL_LOAD),
      withLatestFrom(
        this.store.select(processPurchaseDetailsSelectors.selectPurchaseOrderIdFile),
        this.store.select(processPurchaseDetailsSelectors.selectIdPurchaseOrder),
        this.store.select(processPurchaseDetailsSelectors.selectProvider),
      ),
      mergeMap(([action, idFile, idPurchaseOrder, provider]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const data = {
          emailSend: {
            IdCorreoEnviado: DEFAULT_UUID,
            Asunto: action.mailData.subject,
            ReceptoresCSV: action.mailData.to.toString(),
            ConCopiaCSV: action.mailData.carbonCopy.toString(),
            Emisor: '',
            FechaRegistro: DEFAULT_DATE,
            FechaUltimaActualizacion: DEFAULT_DATE,
            Activo: true,
          },
          emailSendFile: {
            IdArchivoCorreoEnviado: DEFAULT_UUID,
            IdCorreoEnviado: DEFAULT_UUID,
            IdArchivo: idFile,
            FechaRegistro: DEFAULT_DATE,
            FechaUltimaActualizacion: DEFAULT_DATE,
            Activo: true,
          },
          ocMailSendConfirmation: {
            Activo: true,
            Comentarios: action.mailData.additionalComments,
            IdOcOrdenDeCompra: idPurchaseOrder,
            FechaRegistro: DEFAULT_DATE,
            FechaUltimaActualizacion: DEFAULT_DATE,
            IdCorreoEnviado: DEFAULT_UUID,
            IdOcCorreoEnviadoConfirmacion: DEFAULT_UUID,
          },
          provider,
        };
        return this.emailService.CorreoEnviadoGuardarOActualizar(data.emailSend).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al actualizar el correo enviado.',
              ),
              response,
            );
            return {
              ...data,
              emailSend: {
                ...data.emailSend,
                IdCorreoEnviado: extractID(response),
              },
              emailSendFile: {
                ...data.emailSendFile,
                IdCorreoEnviado: extractID(response),
              },
              ocMailSendConfirmation: {
                ...data.ocMailSendConfirmation,
                IdCorreoEnviado: extractID(response),
              },
            };
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al actualizar el correo enviado.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              SET_LOADING_ERROR({
                active: true,
                message: 'Ha ocurrido un error',
              }),
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
      switchMap((data$: any) => {
        return this.emailService.ArchivoCorreoEnviadoGuardarOActualizar(data$.emailSendFile).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al actualizar el archivo correo enviado.',
              ),
              response,
            );
            return {
              ...data$,
              emailSendFile: {
                ...data$.emailSendFile,
                IdArchivoCorreoEnviado: extractID(response),
              },
            };
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al actualizar el archivo correo enviado.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              SET_LOADING_ERROR({
                active: true,
                message: 'Ha ocurrido un error',
              }),
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
      switchMap((data$) => {
        return this.purchaseOrderMailsService
          .ocCorreoEnviadoConfirmacionGuardarOActualizar(data$.ocMailSendConfirmation)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al actualizar la confirmación de correo enviado de la OC.',
                ),
                response,
              );
              return {
                ...data$,
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al actualizar la confirmación de correo enviado de la OC.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message: 'Ha ocurrido un error',
                }),
              );
              return of(RETURN_EMPTY());
            }),
          );
      }),
      switchMap((data$) => {
        return this.sendEmailService
          .CorreoEnviadoEnviarEnviarCorreo(data$.emailSend.IdCorreoEnviado)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al enviar el correo.',
                ),
                response,
              );

              if (response) {
                this.store.dispatch(
                  processPurchaseDetailsActions.HANDLE_POP_UP_SEND_MAIL({
                    popUpSendMail: false,
                  }),
                );
                this.store.dispatch(processPurchaseDetailsActions.RELOAD_GENERAL_DATA());
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: 'Has generado una OC',
                    successText: 'Exitosamente!',
                  }),
                );
                return processPurchaseDetailsActions.SEND_MAIL_SUCCESS();
              } else {
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(
                  SET_LOADING_ERROR({
                    active: true,
                    message: 'Ha ocurrido un error',
                  }),
                );
              }
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al enviar el correo.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message: 'Ha ocurrido un error',
                }),
              );

              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );

  // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
  /*takePiecesOfStock$ = createEffect(() =>
    this.action$.pipe(
      ofType(processPurchaseDetailsActions.TAKE_PIECES_OF_STOCK_LOAD),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.purchaseOrderPurchaseServices
          .ocPartidaObtener(action.product.IdOcPartida)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al tomar las piezas del stock.',
                ),
                response,
              );
              return {
                ...response,
                NumeroDePiezas:
                  action.product.NumeroPiezasOcPartidaStock >
                  action.product.NumeroDePiezas
                    ? action.product.NumeroDePiezas
                    : action.product.NumeroPiezasOcPartidaStock,
                IdOCPendienteCompraProducto:
                  action.product.IdOcPendienteCompraProducto,
                generateOtherOcItem: action.generateOtherOcItem,
                difPieces:
                  action.product.NumeroPiezasOcPartidaStock -
                  action.product.NumeroDePiezas,
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al tomar las piezas del stock.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
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
      withLatestFrom(
        this.store.select(
          processPurchaseDetailsSelectors.selectIdFamilyProvider,
        ),
      ),
      switchMap(([ocPartida, idFamily]) => {
        return this.purchaseOrderPurchaseServices
          .ocPartidaGuardarOActualizar(ocPartida)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al tomar las piezas del stock.',
                ),
                response,
              );
              if (ocPartida.generateOtherOcItem) {
                return processPurchaseDetailsActions.GENERATE_OTHER_OC_LOAD({
                  ocPartida,
                  difPieces: ocPartida.difPieces,
                });
              } else {
                this.store.dispatch(SET_LOADING({payload: false}));
                return processPurchaseDetailsActions.TAKE_PIECES_OF_STOCK_SUCCESS(
                  {IdProveedorFamilia: idFamily},
                );
              }
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al tomar las piezas del stock.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
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

  generateOtherOc$ = createEffect(() =>
    this.action$.pipe(
      ofType(processPurchaseDetailsActions.GENERATE_OTHER_OC_LOAD),
      withLatestFrom(
        this.store.select(
          processPurchaseDetailsSelectors.selectIdFamilyProvider,
        ),
      ),
      mergeMap(([action, idFamily]) => {
        const oc: OcPartida = {
          ...action.ocPartida,
          IdOCPendienteCompraProducto: null,
          IdOcPartida: DEFAULT_UUID,
          NumeroDePiezas: action.difPieces,
        };
        return this.purchaseOrderPurchaseServices
          .ocPartidaGuardarOActualizar(oc)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al generar otra oc partida.',
                ),
                response,
              );

              this.store.dispatch(SET_LOADING({payload: false}));
              return processPurchaseDetailsActions.GENERATE_OTHER_OC_SUCCESS({
                IdProveedorFamilia: idFamily,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al generar otra oc partida.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
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
  );*/

  setProvider$ = createEffect(() =>
    this.action$.pipe(
      ofType(processPurchaseDetailsActions.SET_PROVIDER),
      mergeMap((action) => {
        this.store.dispatch(
          processPurchaseActions.SET_IS_DETAILS({
            isDetails: true,
          }),
        );
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.processPurchase.orderPurchase,
          appRoutes.processPurchase.purchaseDetails,
        ]);
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
  /*setDataTabOptions(
    data: VProveedorFamiliaOcPendienteCompra,
  ): Array<ITabOption> {
    return [
      {
        id: 1,
        label: 'Todas',
        activeSubtitle: true,
        labelSubtitle: 'Pzas',
        totalSubtitle: data ? data.NumeroDePiezas : 0,
      },
      {
        id: 2,
        label: 'Regulares',
        activeSubtitle: true,
        labelSubtitle: 'Pzas',
        totalSubtitle: data ? data.NumeroDePiezasRegulares : 0,
      },
      {
        id: 3,
        label: 'Programadas',
        activeSubtitle: true,
        labelSubtitle: 'Pzas',
        totalSubtitle: data ? data.NumeroDePiezasProgramadas : 0,
      },
      {
        id: 4,
        label: 'Flete Express',
        activeSubtitle: true,
        labelSubtitle: 'Pzas',
        totalSubtitle: data ? data.NumeroDePiezasFleteExpress : 0,
      },
      {
        id: 5,
        label: 'Stock',
        activeSubtitle: true,
        labelSubtitle: 'Pzas',
        totalSubtitle: data ? data.NumeroDePiezasStock : 0,
      },
    ];
  }*/

  createObjectToLinkTo = (
    IdCatMoneda: string,
    IdEmpresaCompra: string,
    IdEmpresaEmbarque: string,
    IdProveedor: string,
    IdUsuario: string,
  ): OcOrdenDeCompra => {
    return {
      Activo: true,
      FechaCompra: DEFAULT_DATE,
      FechaRegistro: DEFAULT_DATE,
      FechaUltimaActualizacion: DEFAULT_DATE,
      IVA: 0,
      IdCatCondicionesDePago: null,
      IdCatMedioDePago: null,
      IdCatMoneda,
      IdEmpresaCompra,
      IdEmpresaEmbarque: IdEmpresaEmbarque === DEFAULT_UUID ? null : IdEmpresaEmbarque,
      IdOcOrdenDeCompra: DEFAULT_UUID,
      IdProveedor,
      IdUsuario,
      NombreConfirmacion: null,
      NumeroOrdenDeCompra: null,
      NumeroReferencia: null,
      PrecioFlete: 0,
      Subtotal: 0,
      Total: 0,
      TotalUSD: 0,
    };
  };
}
