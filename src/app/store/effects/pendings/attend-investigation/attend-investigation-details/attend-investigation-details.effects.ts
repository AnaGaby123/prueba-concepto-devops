// CORE
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import * as servicesLogger from '@appUtil/logger';
// MODELS
import {
  ArchivoDetalle,
  ConfiguracionContactosService,
  ConfiguracionProveedoresService,
} from 'api-catalogos';
import {
  ICotPartidaInvetigacionAtencionComentariosObj,
  IProductInvestigation,
} from '@appModels/store/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.model';
// ACTIONS
import {
  attendInvestigationAddProductActions,
  attendInvestigationDetailsActions,
} from '@appActions/pendings/attend-investigation';
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY, SET_LOADING} from '@appActions/utils/utils.action';
// SELECTORS
import {selectIdUser} from '@appSelectors/auth/auth.selectors';
import {attendInvestigationDetailsSelectors} from '@appSelectors/pendings/attend-investigation';
// UTILS
import {filter, find, map as _map} from 'lodash-es';
import {
  AttributeDashboard,
  CotPartidaCotizacionInvestigacionComentario,
  GMCorreoCotPartidaInvestigacion,
  GMPartidaInvestigacionCotizadorAtencion,
  ProcesosL01CotizacionInvestigacionService,
  ProcesosL01CotizacionPartidasService,
  QueryResultProductoInvestigacionObj,
} from 'api-logistica';
import {EMPTY, of} from 'rxjs';
import {DEFAULT_UUID, MINIO_BUCKETS} from '@appUtil/common.protocols';
import {Location} from '@angular/common';
import {MinioService} from '@appServices/minio/minio.service';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';
import {
  buildICotPartidaInvetigacionAtencionComentariosObj,
  buildIProductInvestigation,
  buildProviderContacts,
  buildProviderMail,
  buildProvidersAttendInvestigationFromTabs,
} from '@appHelpers/pending/new-product-existing-supplier/attend-investigation/attend-investigation.helper';
import {IDataMail, IMailDialogData} from '@appModels/correo/correo';
import {EmailContentComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details-investigation/email-content/email-content.component';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {SendEmailDialogComponent} from '@appComponents/shared/send-email-dialog/send-email-dialog.component';
import {
  buildDialogChildrenContent,
  buildDialogConfig,
} from '@appHelpers/dialogs/buildDialogConfig.helpers';

const FILE_NAME = 'Attend-investigation-details';

@Injectable()
export class AttendInvestigationDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private procesosL01CotizacionInvestigacionService: ProcesosL01CotizacionInvestigacionService,
    private procesosL01CotizacionPartidasService: ProcesosL01CotizacionPartidasService,
    private configuracionContactosService: ConfiguracionContactosService,
    private configuracionProveedoresService: ConfiguracionProveedoresService,
    private location: Location,
    private minioService: MinioService,
    private router: Router,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  // DOCS: OBTIENE LAS OPCIONES DE LAS TABS
  $getTabOptions = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationDetailsActions.FETCH_TAB_OPTIONS_LOAD),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectDetailsTabsGroupQueryInfo),
      ),
      mergeMap(([{fetchList}, queryInfo]) => {
        return this.procesosL01CotizacionInvestigacionService
          .ProductoInvestigacionObtenerProductoInvestigacionTabs(queryInfo)
          .pipe(
            map((response: AttributeDashboard[]) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener tabs',
                ),
                response,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              if (fetchList) {
                this.store.dispatch(
                  attendInvestigationDetailsActions.FETCH_PROVIDER_PRODUCTS_LIST_LOAD(),
                );
              }
              this.store.dispatch(attendInvestigationDetailsActions.CHANGE_INVESTIGATION_STATUS());
              return attendInvestigationDetailsActions.FETCH_TAB_OPTIONS_SUCCESS({
                tabs: buildProvidersAttendInvestigationFromTabs(response),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener tabs',
                ),
                error,
              );
              return of(attendInvestigationDetailsActions.FETCH_TAB_OPTIONS_FAILED());
            }),
          );
      }),
    ),
  );
  // DICS: OBTIENE LA LISTA DE PRODUCTOS A INVESTIGAR
  $providerProductsList = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationDetailsActions.FETCH_PROVIDER_PRODUCTS_LIST_LOAD),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectProviderProductsListQueryInfo),
        this.store.select(selectIdUser),
      ),
      mergeMap(([action, queryInfo, idUser]) => {
        return this.procesosL01CotizacionInvestigacionService
          .ProductoInvestigacionQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultProductoInvestigacionObj) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener listado de productos',
                ),
              );
              const products = buildIProductInvestigation(response.Results, idUser);
              return attendInvestigationDetailsActions.FETCH_PROVIDER_PRODUCTS_LIST_SUCCESS({
                items: products,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener listado de productos',
                ),
                error,
              );
              return of(attendInvestigationDetailsActions.FETCH_PROVIDER_PRODUCTS_LIST_FAILED());
            }),
          );
      }),
    ),
  );
  // DOCS: OBTIENE EL HISTORIAL DE MENSAJES Y DETALLES DEL PRODUCTO A INVESTIGAR SELECCIONADO
  $getProductInvestigationDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationDetailsActions.OPEN_PRODUCT_DETAILS),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectedProductInvestigation),
        this.store.select(selectIdUser),
      ),
      mergeMap(([action, selectedProduct, idUser]) => {
        if (
          selectedProduct.EstadoInvestigacion !== 'En Espera De Respuesta' &&
          selectedProduct.needsToReloadAttention
        ) {
          return this.procesosL01CotizacionPartidasService
            .cotPartidaCotizacionInvestigacionPartidaInvetigacionAtencionComentariosDetalle(
              selectedProduct.IdCotPartidaCotizacionInvestigacion,
            )
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener detalles del producto de investigacion',
                  ),
                );
                const details: ICotPartidaInvetigacionAtencionComentariosObj = buildICotPartidaInvetigacionAtencionComentariosObj(
                  response,
                  selectedProduct.IdCotPartidaCotizacionInvestigacion,
                  idUser,
                );
                return attendInvestigationDetailsActions.FETCH_PRODUCT_INVESTIGATION_DETAIL({
                  details: details,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener detalles del producto de investigacion',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        } else {
          return of(RETURN_EMPTY());
        }
      }),
    ),
  );
  // DOCS: ENVIA LA RESPUESTA DEL PRODUCTO A INVESTIGAR (STATUS NUEVO Y POR REATENDER)
  sendResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationDetailsActions.SEND_RESPONSE_LOAD),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectGmItemAttention),
        this.store.select(attendInvestigationDetailsSelectors.selectProductInvestigationList),
        this.store.select(attendInvestigationDetailsSelectors.selectedProductInvestigation),
      ),
      mergeMap(([action, gmItemAttention, attendItems, selectedProduct]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const res: GMPartidaInvestigacionCotizadorAtencion = {
          IdUsuarioAtiende: gmItemAttention.cotPartidaCotizacionInvestigacion.IdUsuarioAtiende,
          cotPartidaCotizacionInvestigacionAtencion:
            gmItemAttention.cotPartidaCotizacionInvestigacionAtencion,
          cotPartidaCotizacionInvestigacionComentario: find(
            gmItemAttention.cotPartidaCotizacionInvestigacionComentario,
            (o: CotPartidaCotizacionInvestigacionComentario) =>
              o.IdCotPartidaCotizacionInvestigacionComentario === DEFAULT_UUID,
          ),
        };
        return this.procesosL01CotizacionInvestigacionService
          .cotPartidaCotizacionInvestigacionAtencionGuardarOActualizarPartidaCotizacionInvestigacionAtencion(
            res,
          )
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al enviar respuesta',
                ),
              );
              const items: Array<IProductInvestigation> = filter(
                attendItems,
                (o: IProductInvestigation) => !o.selected,
              );
              if (items.length > 0) {
                this.store.dispatch(
                  attendInvestigationDetailsActions.UPDATE_ITEMS_ATTENTION_LIST({
                    items,
                  }),
                );
              } else {
                this.location.back();
              }
              this.store.dispatch(SET_LOADING({payload: false}));
              const message = gmItemAttention.cotPartidaCotizacionInvestigacionAtencion
                .ProductoDisponible
                ? ' de un producto disponible'
                : ' de una sugerencia';
              return utilsActions.SET_LOADING_SUCCESS({
                active: true,
                message: 'Has enviado una notificación a ' + selectedProduct.EVI + message,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al enviar respuesta',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );
  // DOCS: ENVIA LA RESPUESTA A PROVEEDOR DEL PRODUCTO POR INVESTIGAR SELECCIONADO (status en espera de respuesta)
  sendProviderResponse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(attendInvestigationDetailsActions.SEND_PROVIDER_RESPONSE_LOAD),
        withLatestFrom(
          this.store.select(attendInvestigationDetailsSelectors.selectGMProviderResponse),
          this.store.select(attendInvestigationDetailsSelectors.selectedProductInvestigation),
        ),
        mergeMap(async ([action, gmProviderResponse, selectedProduct]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          const fileName = `${new Date().getFullYear()}/${selectedProduct.IdCotCotizacion}/${
            gmProviderResponse.cotPartidaInvestigacionProducto.IdCotPartidaCotizacionInvestigacion
          }/${new Date().getTime()}/${gmProviderResponse.file.name}`;
          try {
            const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
              gmProviderResponse.file,
              fileName,
              MINIO_BUCKETS.Quotations,
            );
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al mover archivo subido a bucket contracts.',
              ),
              fileUploaded,
            );
            return (gmProviderResponse = {
              ...gmProviderResponse,
              cotPartidaInvestigacionProducto: {
                ...gmProviderResponse.cotPartidaInvestigacionProducto,
                IdArchivoEvidenciaProvedor: fileUploaded.IdArchivo,
              },
            });
          } catch (error) {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al mover archivo subido a bucket contracts.',
              ),
              error,
            );
            SET_LOADING({payload: false});
          }
        }),
        withLatestFrom(
          this.store.select(attendInvestigationDetailsSelectors.selectProductInvestigationList),
          this.store.select(attendInvestigationDetailsSelectors.selectIsAddProduct),
        ),
        switchMap(([gmProviderResponse, attendItems, isAddProduct]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          return this.procesosL01CotizacionInvestigacionService
            .cotPartidaInvestigacionProductoGuardarCorreoCotPartidaInvestigacion(gmProviderResponse)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al enviar respuesta a provedor',
                  ),
                  response,
                );
                const items: Array<IProductInvestigation> = filter(
                  attendItems,
                  (o: IProductInvestigation) => !o.selected,
                );
                if (items.length > 0) {
                  this.store.dispatch(
                    attendInvestigationDetailsActions.UPDATE_ITEMS_ATTENTION_LIST({
                      items,
                    }),
                  );
                  if (isAddProduct) {
                    this.location.back();
                  }
                } else {
                  this.router.navigate([
                    appRoutes.protected,
                    appRoutes.pendings.pendings,
                    appRoutes.attendInvestigation.attendInvestigation,
                    appRoutes.attendInvestigation.list,
                  ]);
                }
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(
                  utilsActions.SET_LOADING_SUCCESS({
                    active: true,
                    message: 'Has guardado',
                  }),
                );
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al enviar respuesta',
                  ),
                  error,
                );
                return of(SET_LOADING({payload: false}));
              }),
            );
        }),
      ),
    {dispatch: false},
  );

  // DOCS: OBTIENE LOS CONTACTOS DEL PROVEEDOR
  getProviderContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationDetailsActions.GET_PROVIDER_CONTACTS_LOAD),
      withLatestFrom(this.store.select(attendInvestigationDetailsSelectors.selectProviderSelected)),
      mergeMap(([action, provider]) => {
        return this.configuracionProveedoresService
          .ProveedorExtensionsObtenerListaContactoDetalle(provider.IdProveedor)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener contactos del proveedor',
                ),
                response,
              );
              return attendInvestigationDetailsActions.GET_PROVIDER_CONTACTS_SUCCESS({
                contacts: buildProviderContacts(response),
              });
            }),
          );
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al obtener contactos del proveedor',
          ),
          error,
        );
        return EMPTY;
      }),
    ),
  );
  // DOCS: METODO PARA ENVIAR LA RESPUESTA AL PROVEEDOR SI NO ENCONTRO EL PRODUCTO O COMENZAR EL ALTA DE UN PRODUCTO NUEVO SI SE ENCONTRO
  foundOrNotMethod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationDetailsActions.FOUND_OR_NOT_METHOD),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectGMProviderResponse),
        this.store.select(attendInvestigationDetailsSelectors.selectedProductInvestigation),
      ),
      mergeMap(([action, gmProviderResponse, investigation]) => {
        if (gmProviderResponse.cotPartidaInvestigacionProducto.NoEncontrado) {
          return of(attendInvestigationDetailsActions.SEND_PROVIDER_RESPONSE_LOAD());
        } else {
          this.router.navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.attendInvestigation.attendInvestigation,
            appRoutes.attendInvestigation.details,
            appRoutes.attendInvestigation.addProduct,
          ]);
          this.store.dispatch(
            attendInvestigationDetailsActions.SET_BRAND_FAMILY({
              brand: {
                value: investigation.IdMarca,
                label: investigation.Marca,
              },
              IdFamily: investigation.IdMarcaFamilia,
            }),
          );
          this.store.dispatch(
            attendInvestigationAddProductActions.SET_LOAD_TYPE_PRODUCT_FAMILY({
              selectedTradeMarkdId: investigation.IdMarca,
            }),
          );
          return EMPTY;
        }
      }),
    ),
  );
  senProviderMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationDetailsActions.SEND_PROVIDER_MAIL_LOAD),
      withLatestFrom(
        this.store.select(attendInvestigationDetailsSelectors.selectProviderSelected),
        this.store.select(selectIdUser),
        this.store.select(attendInvestigationDetailsSelectors.selectProductsChecked),
        this.store.select(attendInvestigationDetailsSelectors.selectProviderIsMexican),
      ),
      switchMap(async ([{data}, provider, user, products, isMexican]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const productsId = _map(products, (o: IProductInvestigation) => {
          return o.IdCotPartidaCotizacionInvestigacion;
        });

        const emailContent = await buildDialogChildrenContent(
          this.translateService,
          isMexican ? 'es' : 'en',
        );

        const mailHeader = emailContent.contentTitle;

        const mailBody = emailContent.contentDescription;

        const mail = buildProviderMail(
          data,
          user,
          provider.IdProveedor,
          productsId,
          mailHeader,
          mailBody,
        );
        return {mail, provider};
      }),
      switchMap(({mail, provider}) => {
        return this.procesosL01CotizacionInvestigacionService
          .cotPartidaCotizacionInvestigacionCorreoGuardarCorreoCotPartidaInvestigacion(mail)
          .pipe(
            map((response: GMCorreoCotPartidaInvestigacion) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al enviar correo',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                attendInvestigationDetailsActions.FETCH_TAB_OPTIONS_LOAD({fetchList: false}),
              );

              return utilsActions.SET_LOADING_SUCCESS({
                active: true,
                message: 'Has enviado un mail a ' + provider.NombreProveedor,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener contactos del proveedor',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS: MUESTRA EL DIALOG PARA ENVIAR CORREO PARA CONFIRMACIÓN DE PEDIDO
  showSendEmailDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(attendInvestigationDetailsActions.SHOW_SEND_EMAIL_DIALOG),
        withLatestFrom(
          this.store.select(attendInvestigationDetailsSelectors.selectProviderContacts),
          this.store.select(attendInvestigationDetailsSelectors.selectProviderIsMexican),
        ),
        mergeMap(async ([{viewType}, mailList, isMexican]) => {
          const data: IMailDialogData = {
            activeSaveSubject: true,
            childrenContent: await buildDialogChildrenContent(
              this.translateService,
              isMexican ? 'es' : 'en',
            ),
            hasInnerHTMLTemplate: true,
            height: '620px',
            innerHtml: EmailContentComponent,
            isEditAddressEmail: true,
            mailList,
            subject: '',
            titleHeader: this.translateService.instant(
              'attendInvestigation.attendInvestigationDetail.sendEmailToProvider',
            ),
            width: '795px',
          };

          const dialogRef = this.dialog.open(SendEmailDialogComponent, buildDialogConfig(data));

          dialogRef.afterClosed().subscribe((data: IDataMail) => {
            if (data?.activeSend) {
              this.store.dispatch(
                attendInvestigationDetailsActions.SEND_PROVIDER_MAIL_LOAD({data}),
              );
            }
          });
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
