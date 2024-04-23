/* Core Imports */
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
/* Services Imports*/
import {
  CotCotizacionFleteExpress,
  CotCotizacionFleteUltimaMilla,
  GMCotCotizacionDetalle,
  ProcesosL01CotizacionCorreosService,
  ProcesosL01CotizacionService,
  QueryResultVCotCotizacion,
  VCotCotizacion,
} from 'api-logistica';
import {
  CatEstadoCotizacion,
  ConfiguracionClientesContratoService,
  ConfiguracionProductosFletesService,
  ConfiguracionProductosWizardContenidoService,
  ConfiguracionProveedoresService,
  CorreoEnviado,
  ProveedorObj,
  VFleteObj,
  VProductoDetalle,
} from 'api-catalogos';
/* Models Imports */
import {AppState} from '@appCore/core.state';
import {
  IFlete,
  IFreightExpress,
} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';
/* Actions Imports */
import {
  checkOutQuotationActions,
  listQuotesActions,
  quotationDetailsActions,
  totalQuotePdfActions,
} from '@appActions/quotation';
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY, SET_LOADING} from '@appActions/utils/utils.action';
/* Selectors Imports */
import {quotationDetailsSelectors, resumeSectionSelectors} from '@appSelectors/quotation';
/* Utils Imports */
import {find, join, map as _map} from 'lodash-es';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {
  bodyPrice,
  buildCotQuotationDetails,
  builSendQuotationBody,
  CatQuotationState,
} from '@appHelpers/pending/quotation/quotation.helpers';
import {IGMCotCotizacionDetalle} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import * as clientCatalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {selectCatEstadoCotizacion} from '@appSelectors/catalogs/catalogs.selectors';
import {appRoutes} from '@appHelpers/core/app-routes';
import {Router} from '@angular/router';
import {ItemSavedDetailsDialogComponent} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/item-saved-list/item-saved-details-dialog/item-saved-details-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {IDataMail, IMailDialogData} from '@appModels/correo/correo';
import {SendEmailDialogComponent} from '@appComponents/shared/send-email-dialog/send-email-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {SET_STATUS_CONTACTS_CANCEL} from '@appActions/quotation/quotation-details/quotation-details.actions';
import {TranslateService} from '@ngx-translate/core';
import {PreviewQuotationComponent} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/preview-quotation/preview-quotation.component';

const FILE_NAME = 'saved-quotation-items.effects.ts';

@Injectable()
export class SavedQuotationItemsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private productsConfigurationWizardService: ConfiguracionProductosWizardContenidoService,
    private configuracionClienteContratoService: ConfiguracionClientesContratoService,
    private providerService: ConfiguracionProveedoresService,
    private configuracionFleteService: ConfiguracionProductosFletesService,
    private processes01QuotationService: ProcesosL01CotizacionService,
    private proccesses01AddressQuotationService: ProcesosL01CotizacionCorreosService,
    private logger: NGXLogger,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}
  /* DOCS: Guardar la cotización con transaccion*/
  $saveQuotation = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.SAVE_QUOTATION_LOAD),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectQuotationDetailsToSave),
        this.store.select(quotationDetailsSelectors.selectedAddressDelivery),
        this.store.select(selectCatEstadoCotizacion),
      ),
      mergeMap(
        ([
          {hasPreviewQuotation, showMessageSuccess},
          selectedQuotationQueryInfo,
          addressClient,
          listQuotationStates,
        ]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          return this.processes01QuotationService
            .cotCotizacionGuardarOActualizarTransaccion(selectedQuotationQueryInfo)
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
                const {EstadoCotizacion}: CatEstadoCotizacion = find(
                  listQuotationStates,
                  (o: CatEstadoCotizacion) =>
                    o.IdCatEstadoCotizacion === response.CotCotizacion.IdCatEstadoCotizacion,
                );
                this.store.dispatch(
                  quotationDetailsActions.SAVE_QUOTATION_SUCCESS({
                    quotation: buildCotQuotationDetails(response, addressClient, EstadoCotizacion),
                  }),
                );
                // DOCS Si la cotización tiene una previsualizacion primero se guarda la cotización y luego se va al pop de ver pdfs
                if (hasPreviewQuotation) {
                  this.store.dispatch(
                    quotationDetailsActions.UPDATE_STATUS_SELECTED_QUOTATION_LOAD({
                      activeNavigate: false,
                    }),
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                  return quotationDetailsActions.SET_LOAD_PREVIEW_QUOTATION();
                } else {
                  this.store.dispatch(
                    quotationDetailsActions.UPDATE_STATUS_SELECTED_QUOTATION_LOAD({
                      activeNavigate: true,
                    }),
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                  if (showMessageSuccess) {
                    this.store.dispatch(
                      utilsActions.SET_LOADING_SUCCESS({
                        active: true,
                        message: 'Has guardado la cotización',
                      }),
                    );
                  }
                }
                return RETURN_EMPTY();
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
        },
      ),
    ),
  );

  $previewQuotation = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.SET_LOAD_PREVIEW_QUOTATION),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectQuotationDetailsToSave),
        this.store.select(quotationDetailsSelectors.selectedQuotation),
      ),
      mergeMap(([action, selectedQuotationQueryInfo]) => {
        this.store.dispatch(
          totalQuotePdfActions.NAVIGATE_TO_PDF_OF_SELECTED_QUOTATION_INIT_EFFECT({
            isLinkedQuote: false,
            quotation: null,
            navigate: false,
          }),
        );
        const dialogRef = this.dialog.open(PreviewQuotationComponent, buildDialogConfig());
        dialogRef.afterClosed().subscribe((value) => {
          if (value.event) {
            this.store.dispatch(listQuotesActions.SHOW_SEND_EMAIL_DIALOG({isResend: false}));
          }
          this.store.dispatch(totalQuotePdfActions.CLEAN_DATA_QUOTE_PDF());
        });
        return of(RETURN_EMPTY());
      }),
    ),
  );

  /* DOCS: Envia o reenvia la cotización con transaccion*/
  sendQuotation = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.SEND_QUOTATION_LOAD),
      withLatestFrom(
        this.store.select(clientCatalogsSelectors.selectCatTipoPartidaCotizacion),
        this.store.select(quotationDetailsSelectors.selectedQuotation),
      ),
      mergeMap(
        ([{sendEmailData, comments, resendQuotation}, typesQuotation, {IdCotCotizacion}]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          return this.proccesses01AddressQuotationService
            .cotCotizacionCorreoEnviadoEnvioCorreoCotizacionTransaccion(
              builSendQuotationBody(typesQuotation, IdCotCotizacion, comments, sendEmailData),
            )
            .pipe(
              map((response: IGMCotCotizacionDetalle) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    `Al ${resendQuotation ? 'reenviar' : 'enviar'} una cotización por correo`,
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(
                  utilsActions.SET_LOADING_SUCCESS({
                    active: true,
                    message: resendQuotation
                      ? 'Haz reenviado una cotización'
                      : 'Haz enviado una cotización',
                  }),
                );
                if (!resendQuotation) {
                  this.store.dispatch(
                    quotationDetailsActions.UPDATE_STATUS_SELECTED_QUOTATION_LOAD({
                      activeNavigate: true,
                    }),
                  );
                  this.store.dispatch(quotationDetailsActions.FETCH_RELOAD_QUOTATION_DATA());
                }
                return RETURN_EMPTY();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    `Al ${resendQuotation ? 'reenviar' : 'enviar'} una cotización por correo`,
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return of(quotationDetailsActions.SEND_QUOTATION_FAILED());
              }),
            );
        },
      ),
    ),
  );

  /* DOCS: Actualiza el estado de la cotizacion seleccionada*/
  updateStatusQuotationSelected = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.FETCH_RELOAD_QUOTATION_DATA),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedQuotation),
        this.store.select(quotationDetailsSelectors.selectedAddressDelivery),
        this.store.select(quotationDetailsSelectors.selectedQuotationStatus),
      ),
      mergeMap(([action, selectedQuotation, addressClient, {EstadoCotizacion}]) => {
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
              return quotationDetailsActions.FETCH_SELECTED_QUOTATION_DETAILS_SUCCESS({
                selectedQuotationDetails: buildCotQuotationDetails(
                  response,
                  addressClient,
                  EstadoCotizacion,
                ),
              });
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
              return of(SET_LOADING({payload: false}));
            }),
          );
      }),
    ),
  );

  /* DOCS: Actualiza las partidas cuando se envia una cotizacion si antes estuvo en un estado de guardao*/
  updateQuotationData = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDetailsActions.UPDATE_STATUS_SELECTED_QUOTATION_LOAD),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectQuotationsListQueryInfo),
        this.store.select(selectCatEstadoCotizacion),
        this.store.select(quotationDetailsSelectors.selectedQuotation),
        this.store.select(resumeSectionSelectors.selectOptionsTabs),
      ),
      mergeMap(([{activeNavigate}, queryInfo, quotationStatus, selectedQuotation, tabs]) => {
        return this.processes01QuotationService.vCotCotizacionQueryResult(queryInfo).pipe(
          map((response: QueryResultVCotCotizacion) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener la informacion actualizada de las cotizaciones',
              ),
            );
            const quotation: VCotCotizacion = find(
              response.Results,
              (o: VCotCotizacion) => o?.IdCotCotizacion === selectedQuotation?.IdCotCotizacion,
            );
            if (activeNavigate) {
              const {EstadoCotizacion}: CatEstadoCotizacion = find(
                quotationStatus,
                (o: CatEstadoCotizacion) =>
                  o.IdCatEstadoCotizacion === quotation?.IdCatEstadoCotizacion,
              );
              this.router.navigate([
                appRoutes.protected,
                appRoutes.pendings.pendings,
                appRoutes.quoter.quoter,
                appRoutes.quoter.details,
                appRoutes.quoter.main,
                EstadoCotizacion === CatQuotationState.Enviada ||
                quotation.CotizacionDeInvestigacion ||
                quotation.EnviadaConInvestigacion
                  ? appRoutes.quoter.sent
                  : appRoutes.quoter.notSent,
              ]);
            }
            this.store.dispatch(checkOutQuotationActions.SET_TAB({tab: tabs[0]}));
            this.store.dispatch(
              quotationDetailsActions.UPDATE_STATUS_SELECTED_QUOTATION_SUCCESS({
                quotationsUpdate: response.Results,
              }),
            );
            return RETURN_EMPTY();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener la informacion actualizada de la cotizacion seleccionada',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(quotationDetailsActions.UPDATE_STATUS_SELECTED_QUOTATION_ERROR());
          }),
        );
      }),
    ),
  );
  // DOCS OBTIENE LOS DETALLES DE UN PRODUCTO CUANDO SE DA CLICK SOBRE LA PARTIDA EN EL CARRITO
  getProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(checkOutQuotationActions.SET_DETAILS_PRODUCT_LOAD),
      withLatestFrom(this.store.select(quotationDetailsSelectors.selectedClientId)),
      mergeMap(([state, idClient]) => {
        if (state.itemQuotation.vProductoDetalle) {
          return of(
            checkOutQuotationActions.SET_VPRODUCTO_DETALLE({
              vProductoDetalle: state.itemQuotation.vProductoDetalle,
            }),
          );
        }
        this.store.dispatch(SET_LOADING({payload: true}));
        const item = {...state.itemQuotation};
        return this.productsConfigurationWizardService
          .vProductoDetalleProcess(item?.VPartidaCotizacion?.IdProducto || item.product.IdProducto)
          .pipe(
            map((response: VProductoDetalle) => {
              item.needsToReloadProduct = false;
              item.product = response.Producto;
              this.store.dispatch(SET_LOADING({payload: false}));
              const dialogRef = this.dialog.open(ItemSavedDetailsDialogComponent, {
                backdropClass: 'mat-dialog-background',
                data: {
                  itemQuotation: state.itemQuotation,
                },
                panelClass: 'mat-dialog-style',
              });
              dialogRef.afterClosed().subscribe((value: boolean) => {
                this.store.dispatch(
                  checkOutQuotationActions.CLOSE_ITEM_DETAILS_POP({
                    value,
                  }),
                );
              });
              return checkOutQuotationActions.SET_VPRODUCTO_DETALLE({
                vProductoDetalle: response,
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

  // DOCS OBTIENE EL PRECIO DE LISTA DEL DETALLE DEL PRODUCTO AL MODIFICAR EL NUMERO DE PIEZAS
  calculatePrice = createEffect(() =>
    this.actions$.pipe(
      ofType(checkOutQuotationActions.SET_UNIT_PRICE_LOAD),
      withLatestFrom(this.store.select(quotationDetailsSelectors.selectedClientId)),
      mergeMap(([action, idClient]) => {
        if (action && idClient) {
          return this.configuracionClienteContratoService
            .ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContrato(
              bodyPrice(idClient, action.item, action.idCurrency),
            )
            .pipe(
              map((response) => {
                return checkOutQuotationActions.SET_UNIT_PRICE_SUCCESS({
                  priceUnit: response,
                });
              }),
              catchError((error) => {
                return of(checkOutQuotationActions.SET_UNIT_PRICE_ERROR(error));
              }),
            );
        }
        return EMPTY;
      }),
    ),
  );

  // DOCS Obtiene el catalogo de los fletes express con base a los productos agregados a la cotizacion guardados o no guardados
  getCaFreightExpress = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          quotationDetailsActions.FETCH_SELECTED_QUOTATION_DETAILS_SUCCESS,
          checkOutQuotationActions.GET_CAT_FREIGHT_EXPRESS_LOAD,
        ),
        withLatestFrom(
          this.store.select(resumeSectionSelectors.selectListsFreight),
          this.store.select(quotationDetailsSelectors.selectQueryExpressFreight),
          this.store.select(quotationDetailsSelectors.selectedFreightExpressItems),
          this.store.select(quotationDetailsSelectors.selectedQuotationItems),
          this.store.select(quotationDetailsSelectors.selectedQuotationStatus),
        ),
        mergeMap(([action, list, query, freightsExpress, quotationsItems, {EstadoCotizacion}]) => {
          if (list.listFreightsExpress.needToReload && quotationsItems.length) {
            return this.providerService.ProveedorObtenerFletesDeProveedorPorProducto(query).pipe(
              map((response: Array<ProveedorObj>) => {
                const expressFreightList = _map(
                  response,
                  (o: ProveedorObj): IFreightExpress => {
                    const freightInQuotation = find(
                      freightsExpress,
                      (i: CotCotizacionFleteExpress) => i.IdProveedor === o.IdProveedor,
                    );
                    if (freightInQuotation) {
                      return {
                        ...o,
                        isSelected: true,
                      };
                    }
                    return {
                      ...o,
                      isSelected: false,
                    };
                  },
                );
                this.store.dispatch(
                  checkOutQuotationActions.GET_CAT_FREIGHT_EXPRESS_SUCCESS({
                    list: expressFreightList,
                    statusQuotation: EstadoCotizacion,
                  }),
                );
              }),
              catchError((error) => {
                return of(RETURN_EMPTY());
              }),
            );
          }
          this.store.dispatch(checkOutQuotationActions.GET_CAT_FREIGHT_LOAD());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS Obtiene el catalogo de los fletes express actualizado por ruta entrega
  updateGetCaFreightExpressData = createEffect(
    () =>
      this.actions$.pipe(
        ofType(quotationDetailsActions.SET_DELIVERY_ADDRESS),
        withLatestFrom(
          this.store.select(resumeSectionSelectors.selectListsFreight),
          this.store.select(quotationDetailsSelectors.selectQueryExpressFreight),
          this.store.select(quotationDetailsSelectors.selectedFreightExpressItems),
          this.store.select(quotationDetailsSelectors.selectedQuotationItems),
          this.store.select(quotationDetailsSelectors.selectedQuotationStatus),
        ),
        mergeMap(([action, list, query, freightsExpress, quotationsItems, {EstadoCotizacion}]) => {
          if (list.listFreightsExpress.needToReload && quotationsItems.length) {
            return this.providerService.ProveedorObtenerFletesDeProveedorPorProducto(query).pipe(
              map((response: Array<ProveedorObj>) => {
                const expressFreightList = _map(
                  response,
                  (o: ProveedorObj): IFreightExpress => {
                    const freightInQuotation = find(
                      freightsExpress,
                      (i: CotCotizacionFleteExpress) => i.IdProveedor === o.IdProveedor,
                    );
                    if (freightInQuotation) {
                      return {
                        ...o,
                        isSelected: true,
                      };
                    }
                    return {
                      ...o,
                      isSelected: false,
                    };
                  },
                );
                this.store.dispatch(
                  checkOutQuotationActions.GET_CAT_FREIGHT_EXPRESS_UPDATE_SUCCESS({
                    list: expressFreightList,
                    statusQuotation: EstadoCotizacion,
                  }),
                );
              }),
              catchError((error) => {
                return of(RETURN_EMPTY());
              }),
            );
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  // DOCS Obtiene el catalogo de los fletes ultima milla
  getFreight = createEffect(() =>
    this.actions$.pipe(
      ofType(
        checkOutQuotationActions.GET_CAT_FREIGHT_LOAD,
        quotationDetailsActions.CHANGE_CURRENCY_QUOTATION_SUCCESS,
        checkOutQuotationActions.GET_CAT_FREIGHT_EXPRESS_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(resumeSectionSelectors.selectListsFreight),
        this.store.select(quotationDetailsSelectors.selectQueryFreight),
        this.store.select(quotationDetailsSelectors.selectedFreightItems),
        this.store.select(quotationDetailsSelectors.selectedQuotationStatus),
      ),
      mergeMap(([action, list, query, freightSelected, {EstadoCotizacion}]) => {
        if (list.lastMileFreights.needToReload) {
          return this.configuracionFleteService.vFleteVFletePorCotizacion(query).pipe(
            map((response: VFleteObj[]) => {
              const lastMileFreights = _map(
                response,
                (o: VFleteObj): IFlete => {
                  const freightInQuotation = find(
                    freightSelected,
                    (i: CotCotizacionFleteUltimaMilla) => i.IdFlete === o.IdFlete,
                  );
                  if (freightInQuotation) {
                    return {
                      ...o,
                      isSelected: true,
                    };
                  }
                  return {
                    ...o,
                    isSelected: false,
                  };
                },
              );
              return checkOutQuotationActions.GET_CAT_FREIGHT_SUCCESS({
                list: lastMileFreights,
                statusQuotation: EstadoCotizacion,
              });
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // DOCS: MUESTRA EL DIALOG PARA ENVIAR CORREO PARA CONFIRMACIÓN DE PEDIDO
  showSendEmailDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(listQuotesActions.SHOW_SEND_EMAIL_DIALOG),
        withLatestFrom(
          this.store.select(quotationDetailsSelectors.selectOptionsContactEmail),
          this.store.select(quotationDetailsSelectors.selectFolioQuotation),
          this.store.select(quotationDetailsSelectors.selectEmailForDialog),
        ),
        mergeMap(([{isResend}, contacts, folio, mailList]) => {
          const data: IMailDialogData = {
            contacts,
            isEditAddressEmail: true,
            mailList: mailList,
            subject: `${this.translateService.instant('common.quotation')} ${folio}`,
            titleHeader: isResend
              ? this.translateService.instant('common.resendQuotation')
              : this.translateService.instant('common.sendQuotation'),
            hasMultipleComments: true,
            notesOptional: true,
          };

          const dialogRef = this.dialog.open(SendEmailDialogComponent, buildDialogConfig(data));
          dialogRef.afterClosed().subscribe((data: IDataMail) => {
            if (data?.activeSend) {
              const sendEmailData: CorreoEnviado = {
                IdCorreoEnviado: DEFAULT_UUID,
                ReceptoresCSV: data.to[0] as string,
                ConCopiaCSV: join(data.carbonCopy, ','),
                Asunto: data.subject,
                FechaRegistro: DEFAULT_DATE,
                FechaUltimaActualizacion: DEFAULT_UUID,
                Activo: true,
              };
              this.store.dispatch(
                quotationDetailsActions.SEND_QUOTATION_LOAD({
                  resendQuotation: isResend ?? false,
                  sendEmailData,
                  comments: data.additionalComments,
                }),
              );
            } else {
              this.store.dispatch(SET_STATUS_CONTACTS_CANCEL());
            }
          });

          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
