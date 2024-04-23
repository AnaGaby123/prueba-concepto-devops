import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

// Models
import * as apiLogistic from 'api-logistica';
import {
  CotPartidaCotizacion,
  GMCotFletes,
  GMSolicitarAjustesCerrarOferta,
  QueryResultCotCotizacion,
  QueryResultVCOCotizacionesTotalesPartidas,
  QueryResultVCotCotizacion,
  TipoAjustePrecioObj,
  TipoAjusteTEntregaFleteExpressObj,
  TipoAjusteTEntregaMenosDosDiasObj,
  TotalesPartidasConfiguradasMarcadas,
  VProveedor,
} from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import {
  ArchivoDetalle,
  CatEstadoCotizacion,
  CatMoneda,
  CorreoEnviado,
  QueryResultCatMotivoCancelacionPartidaCotizacion,
  QueryResultCatMotivoSeguimientoCotizacion,
  QueryResultContactoDetalleObj,
} from 'api-catalogos';
import {IContact} from '@appModels/catalogos/contacto/contacto';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {
  AJUSTE_DE_OFERTA,
  CANCELACION,
  CONFIGIRACION_ESTADOS,
  CustomerDetails,
  ESTADOS_COTIZACION,
  IGeneralDataClient,
  IItemQuotation,
  initialCloseOfferDetailsState,
  initialFormPrice,
  initialGeneralDataClient,
  initialIQuotation,
  initialQuotationStrategyData,
  IQuotation,
  IQuotationStrategyResponse,
  ITipoAjustePrecioObj,
  PROMESA_DE_COMPRA,
  QUOTES_ROUTES,
  SEARCH_OPTIONS,
  SEGUIMIENTO,
} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';
import {ITabOption} from '@appModels/botonera/botonera-option';

// Actions
import {closeOfferDetailsActions} from '@appActions/pendings/close-offer';
import * as utilsActions from '@appActions/utils/utils.action';
import {DOWLOAD_FILE_LOAD, RETURN_EMPTY, SET_LOADING} from '@appActions/utils/utils.action';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {
  GET_CAT_ESTADO_COTIZACION,
  GET_CAT_PAYMENT_CONDITIONS_LOAD,
} from '@appActions/catalogs/catalogos.actions';
import {GET_PURCHASE_ORDERS_LOAD} from '@appActions/pendings/close-offer/close-offer-details/close-offer-details.actions';

// Selectors
import {closeOfferDetailsSelector} from '@appSelectors/pendings/close-offer';
import {selectIdUser} from '@appSelectors/auth/auth.selectors';
import * as clientCatalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {
  selectCatEstadoCotizacion,
  selectCatMoneda,
  selectTipoTelefono,
} from '@appSelectors/catalogs/catalogs.selectors';

// Utils
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, forkJoin, of} from 'rxjs';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
  QUOTATION_STRATEGY_BALANCED,
  QUOTATION_STRATEGY_DEFENSIVE,
  QUOTATION_STRATEGY_OFFENSIVE,
} from '@appUtil/common.protocols';
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {
  filter,
  find,
  findIndex,
  flatMap,
  flow,
  forEach,
  isEmpty,
  join,
  map as _map,
} from 'lodash-es';

import {addRowIndex, patchContacts} from '@appUtil/util';
import {appRoutes} from '@appHelpers/core/app-routes';
import * as closeOfferActions from '@appActions/pendings/close-offer/close-offer.actions';
import {
  buildGetEntriesBody,
  buildParamsAdjustOffer,
  buildSendQuotationBody,
  generateItemsQuotation,
} from '@appHelpers/pending/closeOffer/closeOffer.helpers';
import {patchContactsClient, patchContactsMail} from '@appHelpers/shared/shared.helpers';
import {buildImageNameSave} from '@appUtil/strings';
import {IDataMail, IMailDialogData} from '@appModels/correo/correo';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {SendEmailDialogComponent} from '@appComponents/shared/send-email-dialog/send-email-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';

const FILE_NAME = 'Close-offer-details';

@Injectable()
export class CloseOfferDetailsEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private router: Router,
    private logger: NGXLogger,
    private procesosCotizacionService: apiLogistic.ProcesosL01CotizacionService,
    private procesosCotizacionPromesaService: apiLogistic.ProcesosL01CotizacionPromesaDeCompraService,
    private procesosCotizacionPartidasService: apiLogistic.ProcesosL01CotizacionPartidasService,
    private procesosCotizacionCancelacionService: apiLogistic.ProcesosL01CotizacionCancelacionService,
    private procesosCotizacionCerrarOferta: apiLogistic.ProcesosL01CotizacionCerrarOfertaService,
    private procesosAjustarOfertaService: apiLogistic.ProcesosL02AjustarOfertaService,
    private configuracionClientesService: apiCatalogs.ConfiguracionClientesService,
    private configuracionContactosService: apiCatalogs.ConfiguracionContactosService,
    private configuracionDireccionesService: apiCatalogs.ConfiguracionDireccionesService,
    private configuracionProductosMarcasServices: apiCatalogs.ConfiguracionProductosMarcasService,
    private catalogosService: apiCatalogs.CatalogosService,
    private sistemaUsuariosService: apiCatalogs.SistemaUsuariosService,
    private configuracionClientesConfiguracionService: apiCatalogs.ConfiguracionClientesConfiguracionService,
    private sistemaArchivoService: apiCatalogs.SistemaArchivosService,
    private procesosL01CotizacionCorreosService: apiLogistic.ProcesosL01CotizacionCorreosService,
    private processAdjustOffer: apiLogistic.ProcesosL02AjustarOfertaEstablecerEstrategiaService,
    private processCloseOfferService: apiLogistic.ProcesosL01CotizacionCerrarOfertaPopsAjustesService,
    private procesosL01CotizacionAtenderCierreService: apiLogistic.ProcesosL01CotizacionAtenderCierreService,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  initialViewDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        closeOfferDetailsActions.SET_CLIENT_SELECTED_LOAD,
        closeOfferDetailsActions.REFRESH_CLOSE_OFFER_DETAILS,
      ),
      withLatestFrom(
        this.store.select(closeOfferDetailsSelector.selectClient),
        this.store.select(closeOfferDetailsSelector.selectQuotes),
        this.store.select(closeOfferDetailsSelector.selectDataClient),
        this.store.select(selectCatMoneda),
      ),
      mergeMap(([action, client, quotes, clientData, catMoneda]) => {
        this.store.dispatch(closeOfferActions.SET_IS_IN_DETAILS_VIEW({isInDetailsView: true}));
        this.store.dispatch(SET_LOADING({payload: true}));
        this.store.dispatch(closeOfferDetailsActions.GET_CAT_MOTIVO_SEGUIMIENTO_LOAD());
        this.store.dispatch(closeOfferDetailsActions.GET_CAT_MOTIVO_CANCELACION_LOAD());
        this.store.dispatch(GET_CAT_ESTADO_COTIZACION());
        this.store.dispatch(GET_CAT_PAYMENT_CONDITIONS_LOAD());
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.closeOffer.closeOffer,
          appRoutes.closeOffer.details,
          appRoutes.closeOffer.generalData,
        ]);
        if (quotes.needsToReloadQuotation) {
          const generalData: IGeneralDataClient = {
            ...initialGeneralDataClient(),
            client: client,
            clientData,
            idClient: client.IdCliente,
          };
          const body = {
            Filters: [],
          };
          body.Filters.push(
            {
              NombreFiltro: 'IdCliente',
              ValorFiltro: generalData.idClient,
            },
            {
              NombreFiltro: 'IdAjOfEstrategiaCotizacion',
              ValorFiltro: client.IdAjOfEstrategiaCotizacion,
            },
          );
          return this.procesosCotizacionCerrarOferta
            .vCOCotizacionesTotalesPartidasQueryResult(body)
            .pipe(
              map((response: QueryResultVCOCotizacionesTotalesPartidas) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener las cotizaciones asociadas por cliente.',
                  ),
                  response,
                );
                if (response.Results.length === 0) {
                  this.router.navigate([
                    appRoutes.protected,
                    appRoutes.pendings.pendings,
                    appRoutes.closeOffer.closeOffer,
                    appRoutes.closeOffer.list,
                  ]);
                  return null;
                }
                const listQuotes: Array<IQuotation> = _map(
                  response.Results,
                  (o: apiLogistic.VCOCotizacionesTotalesPartidas, index) => ({
                    ...o,
                    claveMoneda:
                      filter(catMoneda, (i: CatMoneda) => i.IdCatMoneda === o.IdCatMoneda)[0]
                        ?.ClaveMoneda || '',
                    isSelected: index === 0,
                    index: index + 1,
                    ...initialIQuotation(),
                  }),
                );
                this.store.dispatch(
                  closeOfferDetailsActions.SET_QUOTES({
                    quotes: {
                      listQuotes,
                      listQuotesStatus: API_REQUEST_STATUS_SUCCEEDED,
                      needsToReloadQuotation: false,
                    },
                  }),
                );
                return {
                  ...generalData,
                  idQuotation:
                    response.Results && response.Results.length > 0
                      ? response.Results[0].IdCotCotizacion
                      : '',
                  quotation: listQuotes.length > 0 ? listQuotes[0] : generalData.quotation,
                };
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener las cotizaciones asociadas por cliente.',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        }
        this.store.dispatch(closeOfferDetailsActions.GET_SELECTED_QUOTE_DATA_LOAD());
        return of(RETURN_EMPTY());
      }),
      switchMap((generalData: IGeneralDataClient) => {
        if (!generalData) {
          this.store.dispatch(SET_LOADING({payload: false}));
          return EMPTY;
        }
        if (generalData.quotation.needsToReloadFreights) {
          return this.procesosL01CotizacionAtenderCierreService
            .GMCotFletesProcess(generalData.quotation.IdCotCotizacion)
            .pipe(
              map((response: GMCotFletes) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener los fletes de la cotizacion',
                  ),
                  response,
                );
                this.store.dispatch(
                  closeOfferDetailsActions.SET_FREIGHTS_QUOTATION({
                    freights: response,
                    idQuotation: generalData.quotation.IdCotCotizacion,
                  }),
                );
                return {
                  ...generalData,
                  quotation: {
                    ...generalData.quotation,
                    needsToReloadFreights: false,
                    freights: response,
                  },
                };
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener los fletes de la cotizacion',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        } else {
          return of(generalData);
        }
      }),
      switchMap((generalData: IGeneralDataClient) => {
        if (!generalData) {
          this.store.dispatch(SET_LOADING({payload: false}));
          return EMPTY;
        }
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdCotCotizacion',
          ValorFiltro: generalData.quotation?.IdCotCotizacion,
        });
        return this.procesosCotizacionService.vCotCotizacionQueryResult(body).pipe(
          map((response: apiLogistic.QueryResultVCotCotizacion) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las información extra de la cotización.',
              ),
              response,
            );
            this.store.dispatch(
              closeOfferDetailsActions.SET_QUOTATION_DATA({
                quotation: {
                  ...generalData.quotation,
                  ...response.Results[0],
                },
              }),
            );
            return {
              ...generalData,
              quotation: {
                ...generalData.quotation,
                ...response.Results[0],
              },
            };
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
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
      //TODO: se comentó por que este servicio es muy lento y no se está ocupando actualmente. Descomentar cuando se defina y se utilize este servicio
      /* switchMap((generalData: IGeneralDataClient) => {
        const body = new FiltersOnlyActive();
        body.Filters.push(
          {
            NombreFiltro: 'IdCliente',
            ValorFiltro: generalData.idClient,
          },
          {
            NombreFiltro: 'IdAjOfEstrategiaCotizacion',
            ValorFiltro: generalData.client.IdAjOfEstrategiaCotizacion,
          },
        );
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
              (o: apiLogistic.VClienteCotizaciones) => ({
                ...o,
                TasaEfectividad:
                  isNumber(o.TotalCotizadoUSD) &&
                  isNumber(o.ObjetivoFundamentalUSD) &&
                  o.ObjetivoFundamentalUSD > 0
                    ? (o.TotalCotizadoUSD * 100) / o.ObjetivoFundamentalUSD
                    : 0,
              }),
            );
            this.store.dispatch(
              closeOfferDetailsActions.SET_CLIENT_TOTALS({
                clientTotals: !isEmpty(totals) ? totals[0] : ({} as IClientTotals),
              }),
            );
            return generalData;
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
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),*/
      switchMap((generalData: IGeneralDataClient) => {
        if (
          generalData.clientData.Nombre === 'ND' &&
          generalData.clientData.NivelIngreso === 'ND'
        ) {
          return this.configuracionClientesService.vClienteObtener(generalData.idClient).pipe(
            map((response: apiCatalogs.VCliente): any => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la información del cliente.',
                ),
                response,
              );

              const res: CustomerDetails = {
                ...response,
                imageHover: `assets/Images/logos/${response.NombreImagen?.toLowerCase()}_hover.png`,
              };
              this.store.dispatch(
                closeOfferDetailsActions.SET_CLIENT_DATA({
                  clientData: res,
                }),
              );
              return generalData;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la información del cliente.',
                ),
                error,
              );
              return EMPTY;
            }),
          );
        } else {
          return of(generalData);
        }
      }),
      switchMap((generalData: IGeneralDataClient) => {
        if (generalData.quotation.needsToReloadContact) {
          this.store.dispatch(SET_LOADING({payload: true}));
          const body = new FiltersOnlyActive();
          body.Filters = [
            {
              NombreFiltro: 'IdCliente',
              ValorFiltro: generalData.idClient,
            },
            {
              NombreFiltro: 'IdContacto',
              ValorFiltro: generalData.quotation.IdContacto,
            },
          ];
          return this.configuracionContactosService.ContactoDetalleQueryResult(body).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los contactos del cliente.',
                ),
                response,
              );
              const contacts: Array<IContact> = patchContacts(
                response,
                generalData.typePhones,
                generalData.quotation.IdContactoCliente,
              );
              if (contacts.length > 0) {
                this.store.dispatch(
                  closeOfferDetailsActions.SET_CONTACT({
                    contact: contacts[0],
                    idQuotation: generalData.quotation.IdCotCotizacion,
                  }),
                );
              }
              return generalData;
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
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
        } else {
          return of(generalData);
        }
      }),
      switchMap((generalData: IGeneralDataClient) => {
        if (generalData.quotation.needsToReloadGeneralData) {
          this.store.dispatch(SET_LOADING({payload: true}));
          const request = [
            this.configuracionContactosService.vContactoObtener(generalData.quotation.IdContacto),
            this.configuracionClientesConfiguracionService.vDatosFacturacionClienteObtener(
              generalData.quotation.IdDatosFacturacionCliente,
            ),
            this.catalogosService.catMonedaObtener(generalData.quotation.IdCatMoneda),
            this.catalogosService.catCondicionesDePagoObtener(
              generalData.quotation.IdCatCondicionesDePagoDeOrigen,
            ),
            this.sistemaUsuariosService.UsuarioObtener(generalData.quotation.IdUsuarioTramita),
            this.configuracionDireccionesService.vDireccionObtener(
              generalData.quotation.IdDireccion,
            ),
          ];

          return forkJoin(request).pipe(
            map(
              (
                response: Array<
                  | apiCatalogs.DatosFacturacionCliente
                  | apiCatalogs.CatMoneda
                  | apiCatalogs.CatCondicionesDePago
                  | apiCatalogs.Usuario
                  | apiCatalogs.Direccion
                >,
              ): any => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener la información general del cliente.',
                  ),
                  response,
                );
                this.store.dispatch(
                  closeOfferDetailsActions.SET_GENERAL_DATA({
                    generalData: {
                      billingData: response[1],
                      currency: response[2],
                      paymentConditions: response[3],
                      user: response[4],
                      address: response[5],
                    },
                    idQuotation: generalData.quotation.IdCotCotizacion,
                  }),
                );
                return closeOfferDetailsActions.GET_SELECTED_QUOTE_DATA_LOAD();
              },
            ),
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
  /* DOCS: Obtiene los datos de contacto del cliente al entrar a la pantalla detalle para el drop de los correos */
  getClientContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.SET_CLIENT_SELECTED_LOAD),
      withLatestFrom(
        this.store.select(closeOfferDetailsSelector.selectClient),
        this.store.select(closeOfferDetailsSelector.needsToReloadContacts),
        this.store.select(selectTipoTelefono),
      ),
      mergeMap(([action, client, needsToReloadContacts, typePhones]) => {
        if (needsToReloadContacts) {
          const body = new FiltersOnlyActive();
          body.Filters = [
            {
              NombreFiltro: 'IdCliente',
              ValorFiltro: client?.IdCliente,
            },
            {
              NombreFiltro: 'Activo',
              ValorFiltro: true,
            },
          ];
          return this.configuracionContactosService.ContactoDetalleQueryResult(body).pipe(
            map((response: QueryResultContactoDetalleObj) => {
              const contacts = patchContactsClient(response.Results, typePhones);
              return closeOfferDetailsActions.SET_CONTACTS_EMAIL({
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
              return of(RETURN_EMPTY());
            }),
          );
        }
      }),
    ),
  );
  getGeneralDataPerQuotation = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.SET_SELECTED_QUOTE),
      withLatestFrom(
        this.store.select(closeOfferDetailsSelector.selectClient),
        this.store.select(closeOfferDetailsSelector.selectDataClient),
        this.store.select(closeOfferDetailsSelector.selectedQuote),
      ),
      mergeMap(([action, client, clientData, selectedQuote]) => {
        const generalData: IGeneralDataClient = {
          ...initialGeneralDataClient(),
          client: client,
          clientData,
          idClient: client.IdCliente,
          quotation: selectedQuote,
        };
        if (generalData.quotation.needsToReloadFreights) {
          return this.procesosL01CotizacionAtenderCierreService
            .GMCotFletesProcess(selectedQuote.IdCotCotizacion)
            .pipe(
              map((response: GMCotFletes) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener los fletes de la cotizacion',
                  ),
                  response,
                );
                this.store.dispatch(
                  closeOfferDetailsActions.SET_FREIGHTS_QUOTATION({
                    freights: response,
                    idQuotation: selectedQuote.IdCotCotizacion,
                  }),
                );
                return {
                  ...generalData,
                  quotation: {
                    ...generalData.quotation,
                    needsToReloadFreights: false,
                    freights: response,
                  },
                };
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener los fletes de la cotizacion',
                  ),
                  error,
                );
                return of(RETURN_EMPTY());
              }),
            );
        } else {
          return of(generalData);
        }
      }),
      switchMap((generalData: IGeneralDataClient) => {
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdCotCotizacion',
          ValorFiltro: generalData.quotation.IdCotCotizacion,
        });
        return this.procesosCotizacionService.vCotCotizacionQueryResult(body).pipe(
          map((response: apiLogistic.QueryResultVCotCotizacion) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las información extra de la cotización.',
              ),
              response,
            );
            this.store.dispatch(
              closeOfferDetailsActions.SET_QUOTATION_DATA({
                quotation: {
                  ...generalData.quotation,
                  ...response.Results[0],
                },
              }),
            );
            return {
              ...generalData,
              quotation: {
                ...generalData.quotation,
                ...response.Results[0],
              },
            };
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
            return of(RETURN_EMPTY());
          }),
        );
      }),
      switchMap((generalData: IGeneralDataClient) => {
        if (generalData.quotation.needsToReloadContact) {
          const body = new FiltersOnlyActive();
          body.Filters = [
            {
              NombreFiltro: 'IdCliente',
              ValorFiltro: generalData.idClient,
            },
            {
              NombreFiltro: 'IdContacto',
              ValorFiltro: generalData.quotation.IdContacto,
            },
          ];
          return this.configuracionContactosService.ContactoDetalleQueryResult(body).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los contactos del cliente.',
                ),
                response,
              );
              const contacts: Array<IContact> = patchContacts(
                response,
                generalData.typePhones,
                generalData.quotation.IdContactoCliente,
              );
              if (contacts.length > 0) {
                this.store.dispatch(
                  closeOfferDetailsActions.SET_CONTACT({
                    contact: contacts[0],
                    idQuotation: generalData.quotation.IdCotCotizacion,
                  }),
                );
              }
              return generalData;
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
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(RETURN_EMPTY());
            }),
          );
        } else {
          return of(generalData);
        }
      }),
      switchMap((generalData: IGeneralDataClient) => {
        if (generalData.quotation.needsToReloadGeneralData) {
          const request = [
            this.configuracionContactosService.vContactoObtener(generalData.quotation.IdContacto),
            this.configuracionClientesConfiguracionService.DatosFacturacionClienteObtener(
              generalData.quotation.IdDatosFacturacionCliente,
            ),
            this.catalogosService.catMonedaObtener(generalData.quotation.IdCatMoneda),
            this.catalogosService.catCondicionesDePagoObtener(
              generalData.quotation.IdCatCondicionesDePagoDeOrigen,
            ),
            this.sistemaUsuariosService.UsuarioObtener(generalData.quotation.IdUsuarioTramita),
            this.configuracionDireccionesService.vDireccionObtener(
              generalData.quotation.IdDireccion,
            ),
          ];
          return forkJoin(request).pipe(
            map(
              (
                response: Array<
                  | apiCatalogs.VDatosFacturacionCliente
                  | apiCatalogs.CatMoneda
                  | apiCatalogs.CatCondicionesDePago
                  | apiCatalogs.Usuario
                  | apiCatalogs.VDireccion
                >,
              ): any => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener la información general del cliente.',
                  ),
                  response,
                );
                this.store.dispatch(
                  closeOfferDetailsActions.SET_GENERAL_DATA({
                    generalData: {
                      billingData: response[1],
                      currency: response[2],
                      paymentConditions: response[3],
                      user: response[4],
                      address: response[5],
                    },
                    idQuotation: generalData.quotation.IdCotCotizacion,
                  }),
                );
                return closeOfferDetailsActions.GET_SELECTED_QUOTE_DATA_LOAD();
              },
            ),
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
              return of(RETURN_EMPTY());
            }),
          );
        } else {
          this.store.dispatch(SET_LOADING({payload: false}));
          return of(closeOfferDetailsActions.GET_SELECTED_QUOTE_DATA_LOAD());
        }
      }),
    ),
  );
  fetchBrandsCloseOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.FETCH_GENERAL_DATA_CLIENT),
      withLatestFrom(
        this.store.select(closeOfferDetailsSelector.selectClient),
        this.store.select(closeOfferDetailsSelector.selectBrands),
      ),
      mergeMap(([action, client, brands]) => {
        if (brands.needsToReloadBrands) {
          const body = new FiltersOnlyActive();
          body.Filters.push({
            NombreFiltro: 'IdCliente_Contrato',
            ValorFiltro: client.IdCliente,
          });
          return this.configuracionProductosMarcasServices.vMarcaQueryResult(body).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las marcas con contrato.',
                ),
                response,
              );
              return closeOfferDetailsActions.FETCH_BRANDS_SUCCESS({
                brands: _map(response.Results, (o, index) => ({
                  ...o,
                  Index: index + 1,
                })),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las marcas con contrato.',
                ),
                error,
              );
              return of(closeOfferDetailsActions.FETCH_BRANDS_FAILED());
            }),
          );
        } else {
          return of(RETURN_EMPTY());
        }
      }),
    ),
  );

  getSelectedQuoteData = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.GET_SELECTED_QUOTE_DATA_LOAD),
      withLatestFrom(this.store.select(closeOfferDetailsSelector.selectedQuote)),
      switchMap(([action, selectedQuote]) => {
        return this.processAdjustOffer
          .TiposPartidaPorCotizacionProcess(selectedQuote.IdCotCotizacion)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los porcentajes de partidas de la cotización.',
                ),
                response,
              );
              this.store.dispatch(
                closeOfferDetailsActions.SET_ENTRIES_PERCENTAGES({
                  entriesPercentages: response,
                }),
              );
              this.store.dispatch(closeOfferDetailsActions.GET_SELECTED_QUOTE_DATA_SUCCESS());
              this.store.dispatch(SET_LOADING({payload: false}));
              const ROUTE = QUOTES_ROUTES[selectedQuote.EstadoCotizacion];
              if (ROUTE) {
                this.router.navigate([
                  appRoutes.protected,
                  appRoutes.pendings.pendings,
                  appRoutes.closeOffer.closeOffer,
                  appRoutes.closeOffer.details,
                  appRoutes.closeOffer.generalData,
                  ROUTE,
                ]);
                this.store.dispatch(closeOfferDetailsActions.GET_ENTRIES_TOTALS_LOAD());
                /*
                return closeOfferDetailsActions.SET_QUOTE_BRANDS_LOAD();
*/
                return closeOfferDetailsActions.GET_PURCHASE_ORDERS_LOAD();
              } else {
                this.router.navigate([
                  appRoutes.protected,
                  appRoutes.pendings.pendings,
                  appRoutes.closeOffer.closeOffer,
                  appRoutes.closeOffer.list,
                ]);
                return closeOfferDetailsActions.GET_SELECTED_QUOTE_DATA_SUCCESS();
              }
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los porcentajes de partidas de la cotización.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(closeOfferDetailsActions.GET_SELECTED_QUOTE_DATA_FAILED());
            }),
          );
      }),
    ),
  );

  // DOCS: Obtiene las partidas de la cotización seleccionada, se reutiliza para todas las secciones
  // DOCS: unicamente cambiando los filtros
  getSelectedQuoteEntries = createEffect(() =>
    this.actions$.pipe(
      ofType(
        closeOfferDetailsActions.GET_PURCHASE_ORDERS_LOAD,
        closeOfferDetailsActions.SET_IN_PROGRESS_TAB_OPTION,
        closeOfferDetailsActions.SET_ADJUSTMENT_TAB_OPTION,
        closeOfferDetailsActions.SET_SEARCH_TERM,
        closeOfferDetailsActions.SEND_ENTRIES_TO_PURCHASE_PROMISE_SUCCESS,
        closeOfferDetailsActions.SET_SEE_RESUME,
        closeOfferDetailsActions.SET_SELECTED_BRAND_VALUE,
        closeOfferDetailsActions.SET_FILTER_BY_BRAND,
        closeOfferDetailsActions.GET_CAT_ENTRIES_PROVIDERS_SUCCESS,
        /*
        closeOfferDetailsActions.GET_CAT_ENTRIES_BRANDS_SUCCESS,
*/
      ),
      withLatestFrom(
        this.store.select(closeOfferDetailsSelector.selectedQuote),
        this.store.select(closeOfferDetailsSelector.selectQuoteStatus),
        this.store.select(closeOfferDetailsSelector.selectedInProgressTabOption),
        this.store.select(closeOfferDetailsSelector.selectedTabOptionForAdjustment),
        this.store.select(closeOfferDetailsSelector.selectedDefaultSearchOption),
        this.store.select(closeOfferDetailsSelector.selectedDefaultSearchTerm),
        this.store.select(closeOfferDetailsSelector.selectResumeSection),
        this.store.select(closeOfferDetailsSelector.selectedResumeTabOption),
        this.store.select(closeOfferDetailsSelector.selectedResumeSearchOption),
        this.store.select(closeOfferDetailsSelector.selectedResumeSearchTerm),
        this.store.select(closeOfferDetailsSelector.selectIsInResumeView),
        this.store.select(closeOfferDetailsSelector.selectedProvidersId),
        this.store.select(closeOfferDetailsSelector.selectedBrand),
      ),
      switchMap(
        ([
          action,
          selectedQuote,
          quoteStatus,
          selectedInProgressTab,
          selectedAdjustmentTab,
          defaultSearchOption,
          defaultSearchTerm,
          resumeSection,
          selectedResumeTab,
          resumeSearchOption,
          resumeSearchTerm,
          isInResumeView,
          brandId,
          selectedBrandId,
        ]) => {
          if (selectedQuote.needsToReloadItemQuotation) {
            this.store.dispatch(
              closeOfferDetailsActions.SET_ENTRIES_API_STATUS({
                status: API_REQUEST_STATUS_LOADING,
              }),
            );
            if (
              isInResumeView &&
              selectedResumeTab.id === '2' &&
              resumeSection.selectedProviderId
            ) {
              /*
              this.store.dispatch(closeOfferDetailsActions.GET_CAT_PROVIDERS_FREIGHT_LOAD());
*/
              brandId = resumeSection.selectedProviderId;
            }

            const body = buildGetEntriesBody(
              selectedQuote,
              quoteStatus,
              selectedInProgressTab,
              selectedAdjustmentTab,
              defaultSearchOption,
              defaultSearchTerm,
              selectedResumeTab,
              resumeSearchOption,
              resumeSearchTerm,
              isInResumeView,
              brandId,
              selectedBrandId.value,
            );
            return this.procesosCotizacionCerrarOferta
              .PartidaCotizacionCerrarOfertaDetalleObtener(body)
              .pipe(
                map((response: apiLogistic.ListaPartidaCotizacionCerrarOferta) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al obtener las partidas de la cotización.',
                    ),
                    response,
                  );
                  const itemsQuotation: Array<IItemQuotation> = generateItemsQuotation(
                    response.ListaPartidaCotizacionCerrarOfertaDetalle.Results,
                  );

                  let expressFreight = false;
                  let twoDays = false;
                  if (
                    itemsQuotation.length > 0 &&
                    itemsQuotation[0].ajOfValorConfiguracionTiempoEntregaCotizacion
                  ) {
                    expressFreight = false;
                    twoDays = true;
                  } else {
                    expressFreight = true;
                    twoDays = false;
                  }
                  this.store.dispatch(
                    closeOfferDetailsActions.SET_QUOTE_IS_EXPRESS_FREIGHT({
                      expressFreight,
                      twoDays,
                    }),
                  );
                  this.store.dispatch(
                    closeOfferDetailsActions.SET_ITEMS_QUOTATIONS({
                      itemsQuotation,
                    }),
                  );
                  return closeOfferDetailsActions.SET_ENTRIES_API_STATUS({
                    status: API_REQUEST_STATUS_SUCCEEDED,
                  });
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al obtener las partidas de la cotización.',
                    ),
                    error,
                  );
                  this.store.dispatch(
                    closeOfferDetailsActions.SET_ENTRIES_API_STATUS({
                      status: API_REQUEST_STATUS_FAILED,
                    }),
                  );
                  return of(closeOfferDetailsActions.GET_SELECTED_QUOTE_DATA_FAILED());
                }),
              );
          }
          this.store.dispatch(
            closeOfferDetailsActions.SET_ENTRIES_API_STATUS({
              status: API_REQUEST_STATUS_FAILED,
            }),
          );
          return of(RETURN_EMPTY());
        },
      ),
    ),
  );

  // DOCS: Obtiene la estrategia aplicada a las cotizaciones
  fetchStrategiesCloseOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.FETCH_GENERAL_DATA_CLIENT),
      withLatestFrom(
        this.store.select(closeOfferDetailsSelector.selectClient),
        this.store.select(selectIdUser),
        this.store.select(closeOfferDetailsSelector.selectStrategies),
      ),
      mergeMap(([action, client, idUser, quotationStrategyData]) => {
        if (quotationStrategyData.needsToReloadQuotationStrategy) {
          const quotationStrategy = {...initialQuotationStrategyData()};
          const body = new FiltersOnlyActive();
          body.SortDirection = 'asc';
          body.SortField = 'Estrategia';
          return this.catalogosService.catEstrategiaCotizacionQueryResult(body).pipe(
            map((response: apiCatalogs.QueryResultCatEstrategiaCotizacion) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las marcas con contrato.',
                ),
                response,
              );
              return {
                ...quotationStrategy,
                idClient: client.IdCliente,
                idUser,
                listQuotationStrategy: response.Results,
                idAjOfQuotationStrategy: client.IdAjOfEstrategiaCotizacion,
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las marcas con contrato.',
                ),
                error,
              );
              return of(closeOfferDetailsActions.FETCH_QUOTATION_STRATEGY_FAILED());
            }),
          );
        } else {
          return of(RETURN_EMPTY());
        }
      }),
      switchMap((quotationStrategy: IQuotationStrategyResponse) => {
        const body = new FiltersOnlyActive();
        body.SortDirection = 'asc';
        body.SortField = 'Orden';
        return this.catalogosService.catEstrategiaCotizacionTacticaQueryResult(body).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las marcas con contrato.',
              ),
              response,
            );

            return {
              ...quotationStrategy,
              listQuotationStrategyTactic: response.Results,
            };
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener las marcas con contrato.',
              ),
              error,
            );
            return of(closeOfferDetailsActions.FETCH_QUOTATION_STRATEGY_FAILED());
          }),
        );
      }),
      switchMap((quotationStrategy: IQuotationStrategyResponse) => {
        const body = new FiltersOnlyActive();
        body.SortDirection = 'asc';
        body.SortField = 'Subtactica';
        return this.catalogosService.catEstrategiaCotizacionSubtacticaQueryResult(body).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las marcas con contrato.',
              ),
              response,
            );
            return {
              ...quotationStrategy,
              listQuotationStrategySubTactic: response.Results,
            };
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener las marcas con contrato.',
              ),
              error,
            );
            return of(closeOfferDetailsActions.FETCH_QUOTATION_STRATEGY_FAILED());
          }),
        );
      }),
      switchMap((quotationStrategy: IQuotationStrategyResponse) => {
        const body = new FiltersOnlyActive();
        body.Filters.push(
          {
            NombreFiltro: 'IdCliente',
            ValorFiltro: quotationStrategy.idClient,
          },
          {
            NombreFiltro: 'IdAjOfEstrategiaCotizacion',
            ValorFiltro: quotationStrategy.idAjOfQuotationStrategy,
          },
        );
        return this.procesosAjustarOfertaService.ajOfEstrategiaCotizacionQueryResult(body).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las marcas con contrato.',
              ),
              response,
            );
            let currentQuotationStrategy =
              response.Results.length > 0
                ? find(
                    quotationStrategy.listQuotationStrategy,
                    (o) =>
                      o.IdCatEstrategiaCotizacion === response.Results[0].IdCatEstrategiaCotizacion,
                  )
                : quotationStrategy.itemSelected;
            if (isEmpty(currentQuotationStrategy)) {
              currentQuotationStrategy = find(
                quotationStrategy.listQuotationStrategy,
                (o) => o.Estrategia === QUOTATION_STRATEGY_OFFENSIVE,
              );
            }
            if (isEmpty(currentQuotationStrategy)) {
              currentQuotationStrategy = find(
                quotationStrategy.listQuotationStrategy,
                (o) => o.Estrategia === QUOTATION_STRATEGY_BALANCED,
              );
            }
            if (isEmpty(currentQuotationStrategy)) {
              currentQuotationStrategy = find(
                quotationStrategy.listQuotationStrategy,
                (o) => o.Estrategia === QUOTATION_STRATEGY_DEFENSIVE,
              );
            }
            return {
              ...quotationStrategy,
              idAjOfQuotationStrategy:
                response.Results.length > 0
                  ? response.Results[0].IdAjOfEstrategiaCotizacion
                  : DEFAULT_UUID,
              ajOfQuotationStrategy:
                response.Results.length > 0
                  ? {...response.Results[0], isChanged: false}
                  : {
                      ...quotationStrategy.ajOfQuotationStrategy,
                      IdCatEstrategiaCotizacion: currentQuotationStrategy.IdCatEstrategiaCotizacion,
                      IdCliente: quotationStrategy.idClient,
                      IdUsuarioAprobacion: quotationStrategy.idUser,
                      IdUsuarioCreacion: quotationStrategy.idUser,
                    },
              itemSelected: {
                value: currentQuotationStrategy.IdCatEstrategiaCotizacion,
                label: currentQuotationStrategy.Estrategia,
              },
            };
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener las marcas con contrato.',
              ),
              error,
            );
            return of(closeOfferDetailsActions.FETCH_QUOTATION_STRATEGY_FAILED());
          }),
        );
      }),

      switchMap((quotationStrategy: IQuotationStrategyResponse) => {
        const body = new FiltersOnlyActive(false);
        body.Filters.length = 0;
        body.Filters.push({
          NombreFiltro: 'IdAjOfEstrategiaCotizacion',
          ValorFiltro: quotationStrategy.idAjOfQuotationStrategy,
        });
        return this.procesosAjustarOfertaService
          .ajOfEstrategiaCotizacionTacticaQueryResult(body)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las tactitacas.',
                ),
                response,
              );

              const result = _map(quotationStrategy.listQuotationStrategyTactic, (item) => ({
                ...item,
                isSelected:
                  findIndex(
                    response.Results,
                    (o) =>
                      o.IdCatEstrategiaCotizacionTactica ===
                        item.IdCatEstrategiaCotizacionTactica && o.Activo,
                  ) !== -1,
                listSubTactic: flow([
                  () =>
                    filter(
                      quotationStrategy.listQuotationStrategySubTactic,
                      (subTactic) =>
                        subTactic.IdCatEstrategiaCotizacionTactica ===
                        item.IdCatEstrategiaCotizacionTactica,
                    ),
                  (subTactics) =>
                    subTactics.length > 0
                      ? _map(subTactics, (subTactic) => ({
                          ...subTactic,
                          isSelected:
                            findIndex(
                              response.Results,
                              (o) =>
                                o.IdCatEstrategiaCotizacionSubtactica ===
                                  subTactic.IdCatEstrategiaCotizacionSubtactica && o.Activo,
                            ) !== -1,
                          Activo:
                            findIndex(
                              response.Results,
                              (o) =>
                                o.IdCatEstrategiaCotizacionSubtactica ===
                                  subTactic.IdCatEstrategiaCotizacionSubtactica && o.Activo,
                            ) !== -1,
                          ajOfQuotationStrategyTactic: flow([
                            () => {
                              const index = findIndex(
                                response.Results,
                                (o) =>
                                  o.IdCatEstrategiaCotizacionSubtactica ===
                                  subTactic.IdCatEstrategiaCotizacionSubtactica,
                              );
                              if (index !== -1) {
                                return response.Results[index];
                              } else {
                                return {
                                  Activo:
                                    findIndex(
                                      response.Results,
                                      (o) =>
                                        o.IdCatEstrategiaCotizacionSubtactica ===
                                          subTactic.IdCatEstrategiaCotizacionSubtactica && o.Activo,
                                    ) !== -1,
                                  FechaRegistro: DEFAULT_DATE,
                                  FechaUltimaActualizacion: DEFAULT_DATE,
                                  IdAjOfEstrategiaCotizacion: DEFAULT_UUID,
                                  IdAjOfEstrategiaCotizacionTactica: DEFAULT_UUID,
                                  IdCatEstrategiaCotizacionSubtactica:
                                    subTactic.IdCatEstrategiaCotizacionSubtactica,
                                  IdCatEstrategiaCotizacionTactica:
                                    item.IdCatEstrategiaCotizacionTactica,
                                  Justificacion: '',
                                  Observaciones: '',
                                };
                              }
                            },
                          ])(),
                        }))
                      : flow([
                          () => {
                            const indexWithActive = findIndex(
                              response.Results,
                              (o) =>
                                o.IdCatEstrategiaCotizacionTactica ===
                                  item.IdCatEstrategiaCotizacionTactica && o.Activo,
                            );
                            const indexWithoutActive = findIndex(
                              response.Results,
                              (o) =>
                                o.IdCatEstrategiaCotizacionTactica ===
                                item.IdCatEstrategiaCotizacionTactica,
                            );
                            const configTactic = find(
                              response.Results,
                              (o) =>
                                o.IdCatEstrategiaCotizacionTactica ===
                                item.IdCatEstrategiaCotizacionTactica,
                            );

                            return [
                              {
                                isSelected: indexWithActive !== -1,
                                Activo: indexWithActive !== -1,
                                ajOfQuotationStrategyTactic: {
                                  Activo: indexWithActive !== -1,
                                  FechaRegistro:
                                    indexWithoutActive !== -1
                                      ? configTactic?.FechaRegistro
                                      : DEFAULT_DATE,
                                  FechaUltimaActualizacion:
                                    indexWithoutActive !== -1
                                      ? configTactic?.FechaUltimaActualizacion
                                      : DEFAULT_DATE,
                                  IdAjOfEstrategiaCotizacion:
                                    indexWithoutActive !== -1
                                      ? configTactic?.IdAjOfEstrategiaCotizacion
                                      : DEFAULT_UUID,
                                  IdAjOfEstrategiaCotizacionTactica:
                                    indexWithoutActive !== -1
                                      ? configTactic?.IdAjOfEstrategiaCotizacionTactica
                                      : DEFAULT_UUID,
                                  IdCatEstrategiaCotizacionSubtactica: null,
                                  IdCatEstrategiaCotizacionTactica:
                                    item.IdCatEstrategiaCotizacionTactica,
                                  Justificacion:
                                    indexWithoutActive !== -1 ? configTactic?.Justificacion : '',
                                  Observaciones:
                                    indexWithoutActive !== -1 ? configTactic?.Observaciones : '',
                                },
                              },
                            ];
                          },
                        ])(),
                ])(),
              }));
              return closeOfferDetailsActions.FETCH_QUOTATION_STRATEGY_SUCCESS({
                ...quotationStrategy,
                listQuotationStrategyTacticOptions: result,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las marcas con contrato.',
                ),
                error,
              );
              return of(closeOfferDetailsActions.FETCH_QUOTATION_STRATEGY_FAILED());
            }),
          );
      }),
    ),
  );

  // DOCS: Actualiza la partida con el check correspondiente: Seguimiento,
  //  Ajuste de Oferta, Promesa de compra, Cancelación o le quita el check
  putToEntries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.CLASSIFY_ENTRIES_LOAD),
      withLatestFrom(
        this.store.select(closeOfferDetailsSelector.selectItemsQuotationToSave),
        this.store.select(closeOfferDetailsSelector.selectQuoteIsInProgress),
        this.store.select(closeOfferDetailsSelector.selectedInProgressTabOptionIsTracing),
      ),
      mergeMap(([action, entries, quoteIsInProgress, inProgressTabIsTracing]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        if (isEmpty(entries)) {
          // DOCS: Si no hay partidas, únicamente navega a Resumir
          this.router
            .navigate([
              appRoutes.protected,
              appRoutes.pendings.pendings,
              appRoutes.closeOffer.closeOffer,
              appRoutes.closeOffer.details,
              appRoutes.closeOffer.resume,
            ])
            .then(() => {
              this.store.dispatch(
                closeOfferDetailsActions.SET_IS_IS_RESUME_VIEW({
                  isInResumeView: true,
                }),
              );
            });
          this.store.dispatch(SET_LOADING({payload: false}));
          this.store.dispatch(closeOfferDetailsActions.GET_ENTRIES_TOTALS_LOAD());
          return of(RETURN_EMPTY());
        }
        // DOCS: Si es un seguimiento hay que cambiar la bandera de CoonfiguracionSeguimientoPendiente = true
        const request: Array<any> = _map(entries, (o: IItemQuotation) =>
          this.procesosCotizacionPartidasService.cotPartidaCotizacionGuardarOActualizar({
            ...o,
            ConfiguracionSeguimientoPendiente: o.Seguimiento
              ? true
              : o.ConfiguracionSeguimientoPendiente,
          }),
        );
        return forkJoin(request).pipe(
          map((response: Array<string>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al actualizar las partidas y moverlas a resumir.',
              ),
              response,
            );
            this.router
              .navigate([
                appRoutes.protected,
                appRoutes.pendings.pendings,
                appRoutes.closeOffer.closeOffer,
                appRoutes.closeOffer.details,
                appRoutes.closeOffer.resume,
              ])
              .then(() => {
                this.store.dispatch(
                  closeOfferDetailsActions.SET_IS_IS_RESUME_VIEW({
                    isInResumeView: true,
                  }),
                );
              });
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(closeOfferDetailsActions.GET_ENTRIES_TOTALS_LOAD());
            return closeOfferDetailsActions.CLASSIFY_ENTRIES_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al actualizar las partidas y moverlas a resumir.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(closeOfferDetailsActions.CLASSIFY_ENTRIES_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: Realiza la validación de que tipo de configuración es y la realiza
  sendEntriesToPurchasePromise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.SEND_ENTRIES_TO_PURCHASE_PROMISE_LOAD),
      withLatestFrom(
        this.store.select(closeOfferDetailsSelector.selectCheckedEntriesInResume),
        this.store.select(closeOfferDetailsSelector.selectResumeSection),
        this.store.select(closeOfferDetailsSelector.selectedQuote),
      ),
      mergeMap(([action, entries$, resumeSection$, quote$]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        if (action.typeProcess === 'adjustment') {
          // DOCS: Si es una configuración Ajuste de oferta se va a un effect aparte porque tiene mas validaciones
          return of(
            closeOfferDetailsActions.SEND_ENTRIES_TO_ADJUSTMENT_LOAD({
              entries: entries$,
            }),
          );
        } else if (action.typeProcess === 'following') {
          // DOCS: Si es una configuración Seguimiento se va a un effect aparte porque hace dos guardados
          return of(
            closeOfferDetailsActions.SEND_ENTRIES_TO_FOLLOWING_LOAD({
              entries: entries$,
            }),
          );
        }
        const possibleRequest = {
          promise: (): Array<any> =>
            _map(entries$, (o: IItemQuotation) =>
              this.procesosCotizacionPromesaService.cotPromesaDeCompraPartidaGuardarOActualizar({
                Activo: true,
                FechaPromesaDeCompra: resumeSection$.dateForPurchasePromiseString,
                FechaRegistro: DEFAULT_DATE,
                FechaUltimaActualizacion: DEFAULT_DATE,
                IdCotPartidaCotizacion: o.IdCotPartidaCotizacion,
                IdCotPromesaDeCompraPartida: DEFAULT_UUID,
                Justificacion: resumeSection$.purchasePromiseJustification,
              }),
            ),
          cancel: (): Array<any> =>
            _map(entries$, (o: IItemQuotation) =>
              this.procesosCotizacionCancelacionService.cotCancelacionPartidaCotizacionGuardarOActualizar(
                {
                  Activo: true,
                  FechaRegistro: DEFAULT_DATE,
                  FechaUltimaActualizacion: DEFAULT_DATE,
                  IdCotPartidaCotizacion: o.IdCotPartidaCotizacion,
                  Observaciones: resumeSection$.cancelJustification,
                  IdCatMotivoCancelacionPartidaCotizacion: resumeSection$.selectedCancelReason.value.toString(),
                  IdCotCancelacionPartidaCotizacion: DEFAULT_UUID,
                },
              ),
            ),
        };
        const request: Array<any> = possibleRequest[action.typeProcess]();
        return forkJoin(request).pipe(
          map((response: Array<any>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                `Al mandar las partidas a:${action.typeProcess}`,
              ),
              response,
            );

            if (action.typeProcess === 'promise') {
              // DOCS lIMPIA EL FORMULARIO
              this.store.dispatch(
                closeOfferDetailsActions.SET_PURCHASE_PROMISE_FOLLOWING_DATE({
                  date: null,
                  stringDate: '',
                  node: action.typeProcess,
                }),
              );
              this.store.dispatch(
                closeOfferDetailsActions.SET_JUSTIFICATION_VALUE({
                  justification: '',
                  node: action.typeProcess,
                }),
              );
            } else if (action.typeProcess === 'cancel') {
              // DOCS lIMPIA EL FORMULARIO DE CANCELAR
              this.store.dispatch(
                closeOfferDetailsActions.SET_JUSTIFICATION_VALUE({
                  justification: '',
                  node: action.typeProcess,
                }),
              );
              this.store.dispatch(
                closeOfferDetailsActions.SET_REASON_VALUE({
                  reason: null,
                  node: action.typeProcess,
                }),
              );
            }
            this.store.dispatch(closeOfferDetailsActions.GET_ENTRIES_TOTALS_LOAD());
            this.store.dispatch(SET_LOADING({payload: false}));
            return closeOfferDetailsActions.SEND_ENTRIES_TO_PURCHASE_PROMISE_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                `Al mandar las partidas a:${action.typeProcess}`,
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(closeOfferDetailsActions.SEND_ENTRIES_TO_PURCHASE_PROMISE_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: Realiza la configuración de Ajuste de oferta

  sendEntriesToAdjustment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.SEND_ENTRIES_TO_ADJUSTMENT_LOAD),
      withLatestFrom(
        this.store.select(closeOfferDetailsSelector.selectResumeSection),
        this.store.select(closeOfferDetailsSelector.selectCheckedEntriesInResume),
        this.store.select(closeOfferDetailsSelector.selectedQuote),
      ),
      mergeMap(([action, resume, items, selectedQuotation]) => {
        if (
          resume.freightIsSelected ||
          resume.priceIsSelected ||
          resume.minusTwoDaysIsSelected ||
          resume.paymentConditionsIsSelected
        ) {
          const body: GMSolicitarAjustesCerrarOferta = buildParamsAdjustOffer(
            resume,
            items,
            selectedQuotation,
          );
          return this.procesosCotizacionCerrarOferta
            .CerrarOfertaSolicitarAjustesProcessTransaccion(body)
            .pipe(
              map((response: GMSolicitarAjustesCerrarOferta) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al actualizar las partidas con el ajuste.',
                  ),
                  response,
                );
                this.store.dispatch(closeOfferDetailsActions.SET_RESTORE_RESUME_VALUES());
                if (!resume.paymentConditionsIsSelected) {
                  this.store.dispatch(closeOfferDetailsActions.GET_ENTRIES_TOTALS_LOAD());
                  this.store.dispatch(closeOfferDetailsActions.GET_CAT_ENTRIES_PROVIDERS_LOAD());
                  this.store.dispatch(SET_LOADING({payload: false}));
                  /*
                  this.store.dispatch(closeOfferDetailsActions.GET_CAT_ENTRIES_BRANDS_LOAD());
  */
                  return RETURN_EMPTY();
                }
                return closeOfferDetailsActions.SEND_ENTRIES_TO_ADJUSTMENT_SUCCESS({resume});
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al actualizar las partidas con el ajuste.',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return of(closeOfferDetailsActions.CLASSIFY_ENTRIES_FAILED());
              }),
            );
        }
        return of(closeOfferDetailsActions.SEND_ENTRIES_TO_ADJUSTMENT_SUCCESS({resume}));
      }),
    ),
  );

  // DOCS: Realiza la configuración de Seguimiento
  sendEntriesToFollowing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.SEND_ENTRIES_TO_FOLLOWING_LOAD),
      mergeMap((action) => {
        const request = _map(action.entries, (o: IItemQuotation) =>
          this.procesosCotizacionPartidasService.cotPartidaCotizacionGuardarOActualizar({
            ...o,
            ConfiguracionSeguimientoPendiente: false,
          }),
        );
        return forkJoin(request).pipe(
          map((response: Array<string>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al actualizar las partidas en seguimiento.',
              ),
              response,
            );
            return action.entries;
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al actualizar las partidas en seguimiento.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(closeOfferDetailsActions.CLASSIFY_ENTRIES_FAILED());
          }),
        );
      }),
      withLatestFrom(this.store.select(closeOfferDetailsSelector.selectResumeSection)),
      switchMap(([entries, resumeSection$]) => {
        const request: Array<any> = _map(entries, (o: IItemQuotation) =>
          this.procesosCotizacionPartidasService.cotPartidaCotizacionSeguimientoGuardarOActualizar({
            Activo: true,
            FechaRegistro: DEFAULT_DATE,
            FechaUltimaActualizacion: DEFAULT_DATE,
            IdCotPartidaCotizacion: o.IdCotPartidaCotizacion,
            IdCotPartidaCotizacionSeguimiento: DEFAULT_UUID,
            FechaProximoSeguimiento: resumeSection$.dateForFollowingString,
            IdCatMotivoSeguimientoCotizacion: resumeSection$.selectedFollowingReason.value.toString(),
            Justificacion: '',
          }),
        );
        return forkJoin(request).pipe(
          map((response: Array<any>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar el seguimiento de las partidas.',
              ),
              response,
            );
            // DOCS: Limpia los controles

            this.store.dispatch(
              closeOfferDetailsActions.SET_PURCHASE_PROMISE_FOLLOWING_DATE({
                date: null,
                stringDate: '',
                node: 'following',
              }),
            );
            this.store.dispatch(
              closeOfferDetailsActions.SET_REASON_VALUE({
                reason: null,
                node: 'following',
              }),
            );

            this.store.dispatch(closeOfferDetailsActions.GET_ENTRIES_TOTALS_LOAD());
            this.store.dispatch(SET_LOADING({payload: false}));
            return closeOfferDetailsActions.SEND_ENTRIES_TO_PURCHASE_PROMISE_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar el seguimiento de las partidas.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(closeOfferDetailsActions.CLASSIFY_ENTRIES_FAILED());
          }),
        );
      }),
    ),
  );

  getCatFollowingReasons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.GET_CAT_MOTIVO_SEGUIMIENTO_LOAD),
      mergeMap((action) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortField: 'Razones',
          SortDirection: 'asc',
        };
        return this.catalogosService.catMotivoSeguimientoCotizacionQueryResult(body).pipe(
          map((response: QueryResultCatMotivoSeguimientoCotizacion) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener el catalogo de motivos de seguimiento.',
              ),
              response,
            );
            return closeOfferDetailsActions.GET_CAT_MOTIVO_SEGUIMIENTO_SUCCESS({
              catMotivosSeguimiento: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener el catalogo de motivos de seguimiento.',
              ),
              error,
            );
            return of(closeOfferDetailsActions.GET_CAT_MOTIVO_SEGUIMIENTO_FAILED());
          }),
        );
      }),
    ),
  );
  getCatCancelReasons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.GET_CAT_MOTIVO_CANCELACION_LOAD),
      mergeMap((action) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Descripcion',
        };
        return this.catalogosService.catMotivoCancelacionPartidaCotizacionQueryResult(body).pipe(
          map((response: QueryResultCatMotivoCancelacionPartidaCotizacion) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener el catalogo de motivos de cancelación.',
              ),
              response,
            );
            return closeOfferDetailsActions.GET_CAT_MOTIVO_CANCELACION_SUCCESS({
              catMotivosCancelacion: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener el catalogo de motivos de cancelación.',
              ),
              error,
            );
            return of(closeOfferDetailsActions.GET_CAT_MOTIVO_CANCELACION_FAILED());
          }),
        );
      }),
    ),
  );

  getCatEntriesProviders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        closeOfferDetailsActions.SET_RESUME_TAB_OPTION,
        closeOfferDetailsActions.GET_CAT_ENTRIES_PROVIDERS_LOAD,
      ),
      withLatestFrom(this.store.select(closeOfferDetailsSelector.selectedQuote)),
      mergeMap(([action, quote]) => {
        return this.procesosCotizacionCerrarOferta
          .PartidaCotizacionCerrarOfertaDetalleListaProveedoresCotizacionCerrarOfertaConsulta(
            quote.IdCotCotizacion,
          )
          .pipe(
            map((response: Array<VProveedor>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el catalogo de proveedores.',
                ),
                response,
              );

              return closeOfferDetailsActions.GET_CAT_ENTRIES_PROVIDERS_SUCCESS({
                catProviders: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catalogo de proveedores.',
                ),
                error,
              );
              return of(closeOfferDetailsActions.GET_CAT_ENTRIES_PROVIDERS_FAILED());
            }),
          );
      }),
    ),
  );
  changeCotCotizacionState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.SEND_ENTRIES_TO_ADJUSTMENT_SUCCESS),
      withLatestFrom(this.store.select(closeOfferDetailsSelector.selectedQuote)),
      mergeMap(([{resume}, quote]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdCotCotizacion',
          ValorFiltro: quote.IdCotCotizacion,
        });
        return this.procesosCotizacionService.vCotCotizacionQueryResult(body).pipe(
          map((response: QueryResultCotCotizacion) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al la cotizacion para actualizar.',
              ),
              response,
            );
            return {
              quote: {...quote, ...response.Results[0]} || null,
              resume,
            };
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al la cotizacion para actualizar.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
      withLatestFrom(
        this.store.select(closeOfferDetailsSelector.selectItemsQuotation2),
        this.store.select(selectCatEstadoCotizacion),
      ),
      switchMap(([data, entries, catEstados]) => {
        if (!data.quote) {
          return of(RETURN_EMPTY());
        }
        let progress = false;
        forEach(entries, (o: IItemQuotation) => {
          if (o.Seguimiento || o.AjusteDeOferta) {
            progress = true;
          }
        });
        const state =
          data.quote.EstadoCotizacion !== ESTADOS_COTIZACION.enviada
            ? ESTADOS_COTIZACION.finalizada
            : progress || data.resume.paymentConditionsIsSelected
            ? ESTADOS_COTIZACION.enProgreso
            : ESTADOS_COTIZACION.finalizada;

        const catState: Array<CatEstadoCotizacion> = filter(
          catEstados,
          (o: CatEstadoCotizacion) => o.EstadoCotizacion === state,
        );
        const body = {
          ...data.quote,
          IdCatEstadoCotizacion: !isEmpty(catState) ? catState[0].IdCatEstadoCotizacion : null,
        };
        return this.procesosCotizacionService.cotCotizacionGuardarOActualizar(body).pipe(
          map((response: string) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al cambiar el estado de la cotizacion.',
              ),
              response,
            );
            this.store.dispatch(closeOfferDetailsActions.SET_RESET_SEE_RESUME());
            if (state === ESTADOS_COTIZACION.enProgreso) {
              this.store.dispatch(
                closeOfferDetailsActions.CHANGE_COT_COTIZACION_SUCCESS({
                  newQuotationData: {...body, EstadoCotizacion: state},
                }),
              );
              this.router.navigate([
                appRoutes.protected,
                appRoutes.pendings.pendings,
                appRoutes.closeOffer.closeOffer,
                appRoutes.closeOffer.details,
                appRoutes.closeOffer.generalData,
                appRoutes.closeOffer.generalDataInProgress,
              ]);
              this.store.dispatch(SET_LOADING({payload: false}));
              return closeOfferDetailsActions.GET_PURCHASE_ORDERS_LOAD();
            }
            return closeOfferDetailsActions.REFRESH_CLOSE_OFFER_DETAILS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al cambiar el estado de la cotizacion.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(closeOfferDetailsActions.CHANGE_COT_COTIZACION_FAILED());
          }),
        );
      }),
    ),
  );
  changeCotCotizacionStateInProcessStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.SEND_ENTRIES_IN_PROCESS_STATUS_LOAD),
      withLatestFrom(this.store.select(closeOfferDetailsSelector.selectedQuote)),
      mergeMap(([action, quote]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdCotCotizacion',
          ValorFiltro: quote.IdCotCotizacion,
        });
        return this.procesosCotizacionService.vCotCotizacionQueryResult(body).pipe(
          map((response: QueryResultVCotCotizacion) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al la cotizacion para actualizar.',
              ),
              response,
            );
            return {
              quote: {...quote, ...response.Results[0]} || null,
            };
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al la cotizacion para actualizar.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
      withLatestFrom(
        this.store.select(selectCatEstadoCotizacion),
        this.store.select(closeOfferDetailsSelector.selectItemsQuotation2),
      ),
      switchMap(([data, catEstados, entries]) => {
        if (!data.quote) {
          return of(RETURN_EMPTY());
        }
        let progress = false;
        forEach(entries, (o: IItemQuotation) => {
          if (o.Seguimiento || o.AjusteDeOferta) {
            progress = true;
          }
        });
        const state =
          progress || data.quote.ajusteCondicionesPago
            ? ESTADOS_COTIZACION.enProgreso
            : ESTADOS_COTIZACION.finalizada;
        const catState: Array<CatEstadoCotizacion> = filter(
          catEstados,
          (o: CatEstadoCotizacion) => o.EstadoCotizacion === state,
        );
        const body = {
          ...data.quote,
          IdCatEstadoCotizacion: !isEmpty(catState) ? catState[0].IdCatEstadoCotizacion : null,
        };
        return this.procesosCotizacionService.cotCotizacionGuardarOActualizar(body).pipe(
          map((response: string) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al cambiar el estado de la cotizacion.',
              ),
              response,
            );
            this.store.dispatch(closeOfferDetailsActions.SET_RESET_SEE_RESUME());
            if (state === ESTADOS_COTIZACION.enProgreso) {
              this.store.dispatch(
                closeOfferDetailsActions.CHANGE_COT_COTIZACION_SUCCESS({
                  newQuotationData: {...body, EstadoCotizacion: state},
                }),
              );
              this.router.navigate([
                appRoutes.protected,
                appRoutes.pendings.pendings,
                appRoutes.closeOffer.closeOffer,
                appRoutes.closeOffer.details,
                appRoutes.closeOffer.generalData,
                appRoutes.closeOffer.generalDataInProgress,
              ]);
              this.store.dispatch(SET_LOADING({payload: false}));
              return closeOfferDetailsActions.GET_PURCHASE_ORDERS_LOAD();
            }
            return closeOfferDetailsActions.REFRESH_CLOSE_OFFER_DETAILS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al cambiar el estado de la cotizacion.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(closeOfferDetailsActions.CHANGE_COT_COTIZACION_FAILED());
          }),
        );
      }),
    ),
  );
  // DOCS: Actualiza los totales despues de cambiar el status de la cotización
  updateTotalsQuotation = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.GET_ENTRIES_TOTALS_LOAD),
      withLatestFrom(
        this.store.select(closeOfferDetailsSelector.selectClient),
        this.store.select(closeOfferDetailsSelector.selectedQuote),
      ),
      mergeMap(([action, client, selectedQuote]) => {
        const body = {
          Filters: [],
        };
        body.Filters.push(
          {
            NombreFiltro: 'IdCliente',
            ValorFiltro: client.IdCliente,
          },
          {
            NombreFiltro: 'IdAjOfEstrategiaCotizacion',
            ValorFiltro: client.IdAjOfEstrategiaCotizacion,
          },
          {
            NombreFiltro: 'IdCotCotizacion',
            ValorFiltro: selectedQuote.IdCotCotizacion,
          },
        );
        return this.procesosCotizacionCerrarOferta
          .vCOCotizacionesTotalesPartidasQueryResult(body)
          .pipe(
            map((response: QueryResultVCOCotizacionesTotalesPartidas) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los totales actualizados de la cotización seleccionada.',
                ),
                response,
              );
              return closeOfferDetailsActions.CHANGE_TOTALS_QUOTATION({
                totals: response.Results[0],
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los totales actualizados de la cotización seleccionada.',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  ); // DOCS: Agregar partida a cotizacion
  addEntryToQuotation = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.ADD_TO_QUOTATION),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.procesosCotizacionPartidasService
          .cotPartidaCotizacionGuardarOActualizar({
            ...action.item,
            EnCerrarOferta: true,
          })
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al agregar una partida a la cotización.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(GET_PURCHASE_ORDERS_LOAD());
              return closeOfferDetailsActions.ADD_TO_QUOTATION_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al agregar una partida a la cotización.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(closeOfferDetailsActions.ADD_TO_QUOTATION_FAILED());
            }),
          );
      }),
    ),
  );
  // DOCS: Eliminar partida en promesa
  deleteEntriesPromise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.DELETE_ENTRIES_PROMISE_LOAD),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.procesosCotizacionPromesaService
          .cotPromesaDeCompraPartidaGuardarOActualizar({
            ...action.item.cotPromesaDeCompraPartida,
            Activo: false,
          })
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar la configuración promesa de una partida.',
                ),
                response,
              );
              return action.item;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al eliminar la configuración promesa de una partida.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(closeOfferDetailsActions.DELETE_ENTRIES_PROMISE_FAILED());
            }),
          );
      }),
      switchMap((item: IItemQuotation) => {
        return this.procesosCotizacionPartidasService
          .cotPartidaCotizacionGuardarOActualizar({
            ...item,
            PromesaDeCompra: false,
          })
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar la clasificación promesa de una partida.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(closeOfferDetailsActions.GET_PURCHASE_ORDERS_LOAD());
              this.store.dispatch(closeOfferDetailsActions.GET_ENTRIES_TOTALS_LOAD());
              return closeOfferDetailsActions.DELETE_ENTRIES_PROMISE_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al eliminar la clasificación promesa de una partida.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(closeOfferDetailsActions.DELETE_ENTRIES_PROMISE_FAILED());
            }),
          );
      }),
    ),
  );
  // DOCS: Eliminar partida en cancelación
  deleteEntriesCancel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.DELETE_ENTRIES_CANCEL_LOAD),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.procesosCotizacionCancelacionService
          .cotCancelacionPartidaCotizacionGuardarOActualizar({
            ...action.item.cotCancelacionPartidaCotizacion,
            Activo: false,
          })
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar la configuración cancelacion de una partida.',
                ),
                response,
              );
              return action.item;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al eliminar la configuración cancelacion de una partida.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(closeOfferDetailsActions.DELETE_ENTRIES_CANCEL_FAILED());
            }),
          );
      }),
      switchMap((item: IItemQuotation) => {
        return this.procesosCotizacionPartidasService
          .cotPartidaCotizacionGuardarOActualizar({
            ...item,
            Cancelacion: false,
          })
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar la clasificación cancelacion de una partida.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(closeOfferDetailsActions.GET_PURCHASE_ORDERS_LOAD());
              this.store.dispatch(closeOfferDetailsActions.GET_ENTRIES_TOTALS_LOAD());
              return closeOfferDetailsActions.DELETE_ENTRIES_CANCEL_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al eliminar la clasificación cancelacion de una partida.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(closeOfferDetailsActions.DELETE_ENTRIES_CANCEL_FAILED());
            }),
          );
      }),
    ),
  );
  // DOCS: Eliminar partida en seguimiento
  deleteEntriesFollow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.DELETE_ENTRIES_FOLLOW_LOAD),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.procesosCotizacionPartidasService
          .cotPartidaCotizacionSeguimientoGuardarOActualizar({
            ...action.item.ListaCotPartidaCotizacionSeguimiento[0],
            Activo: false,
          })
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar la configuración seguimiento de una partida.',
                ),
                response,
              );
              /*
              this.store.dispatch(closeOfferDetailsActions.SET_QUOTE_BRANDS_LOAD());
*/

              return action.item;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al eliminar la configuración seguimiento de una partida.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(closeOfferDetailsActions.DELETE_ENTRIES_FOLLOW_FAILED());
            }),
          );
      }),
      switchMap((item: IItemQuotation) => {
        return this.procesosCotizacionPartidasService
          .cotPartidaCotizacionGuardarOActualizar({
            ...item,
            Seguimiento: false,
          })
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar la clasificación seguimiento de una partida.',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(closeOfferDetailsActions.GET_PURCHASE_ORDERS_LOAD());
              this.store.dispatch(closeOfferDetailsActions.GET_ENTRIES_TOTALS_LOAD());
              return closeOfferDetailsActions.DELETE_ENTRIES_FOLLOW_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al eliminar la clasificación seguimiento de una partida.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(closeOfferDetailsActions.DELETE_ENTRIES_FOLLOW_FAILED());
            }),
          );
      }),
    ),
  );

  //DOCS: Reenvio de cotización con transaccion
  sendQuotationPart1$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(closeOfferDetailsActions.SEND_QUOTATION_PART_1),
        withLatestFrom(
          this.store.select(clientCatalogsSelectors.selectCatTipoPartidaCotizacion),
          this.store.select(closeOfferDetailsSelector.selectedQuote),
        ),
        mergeMap(
          ([
            {activeChangeQuotationState, sendEmailData, comments},
            typesQuotation,
            {IdCotCotizacion},
          ]) => {
            this.store.dispatch(SET_LOADING({payload: true}));
            return this.procesosL01CotizacionCorreosService
              .cotCotizacionCorreoEnviadoEnvioCorreoCotizacionTransaccion(
                buildSendQuotationBody(typesQuotation, IdCotCotizacion, comments, sendEmailData),
              )
              .pipe(
                map((response) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al reeenviar la cotización por correo',
                    ),
                    response,
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                  this.store.dispatch(
                    closeOfferDetailsActions.SET_MODAL_IS_OPEN_SEND_QUOTATION({value: false}),
                  );
                  this.store.dispatch(
                    utilsActions.SET_LOADING_SUCCESS({
                      active: true,
                      message: 'Haz reenviado una cotización',
                    }),
                  );
                  return RETURN_EMPTY();
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al reeenviar la cotización por correo',
                    ),
                    error,
                  );
                  this.store.dispatch(SET_LOADING({payload: false}));
                  return EMPTY;
                }),
              );
          },
        ),
      ),
    {dispatch: false},
  );

  // DOCS: Eliminar partida en ajuste menos dos dias
  deleteEntriesAdjustmentMinusTwoDays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.DELETE_ENTRIES_ADJUSTMENT_LOAD),
      mergeMap(({item}) => {
        if (item.ajOfValorConfiguracionTiempoEntregaCotizacion) {
          this.store.dispatch(SET_LOADING({payload: true}));
          return this.procesosAjustarOfertaService
            .ajOfValorConfiguracionTiempoEntregaCotizacionDesactivar(
              item.ajOfValorConfiguracionTiempoEntregaCotizacion
                .IdAjOfValorConfiguracionTiempoEntregaCotizacion,
            )
            .pipe(
              map((response: string) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al eliminar el ajuste del tiempo de entrega.',
                  ),
                  response,
                );

                return closeOfferDetailsActions.DELETE_ENTRIES_ADJUSTMENT_SUCCESS({item});
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al eliminar el ajuste del tiempo de entrega.',
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
  // DOCS: Eliminar partida en ajuste precio
  deleteEntriesAdjustmentPrice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.DELETE_ENTRIES_ADJUSTMENT_LOAD),
      mergeMap(({item}) => {
        if (item.ajOfPrecioCotizacion) {
          this.store.dispatch(SET_LOADING({payload: true}));
          return this.procesosAjustarOfertaService
            .ajOfPrecioCotizacionDesactivar(item.ajOfPrecioCotizacion.IdAjOfPrecioCotizacion)
            .pipe(
              map((response: string) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al eliminar el ajuste de precio.',
                  ),
                  response,
                );

                return closeOfferDetailsActions.DELETE_ENTRIES_ADJUSTMENT_SUCCESS({item});
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al eliminar el ajuste de precio.',
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

  // DOCS Eliminar partida flete express
  deleteEntriesAdjustmentB$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.DELETE_ENTRIES_ADJUSTMENT_LOAD),
      mergeMap(({item}) => {
        if (item.ajOfFleteExpressCotizacion) {
          this.store.dispatch(SET_LOADING({payload: true}));
          return this.procesosAjustarOfertaService
            .ajOfFleteExpressCotizacionDesactivarVarios(item.IdCotCotizacion)
            .pipe(
              map((response: CotPartidaCotizacion[]) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al desactivar los fletes express.',
                  ),
                  response,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(closeOfferDetailsActions.GET_ENTRIES_TOTALS_LOAD());
                this.store.dispatch(closeOfferDetailsActions.GET_PURCHASE_ORDERS_LOAD());
                return RETURN_EMPTY();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al desactivar los fletes express.',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );
  // DOCS: Eliminar datos del ajuste en la partida
  deleteEntriesAdjustment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.DELETE_ENTRIES_ADJUSTMENT_SUCCESS),
      mergeMap(({item}) => {
        return this.procesosCotizacionPartidasService
          .cotPartidaCotizacionGuardarOActualizar({
            ...item,
            AjusteDeOferta: false,
            JustificacionAjuste: null,
            IdAjOfFleteExpressCotizacion: null,
          })
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar el ajuste de la partida',
                ),
                response,
              );
              this.store.dispatch(closeOfferDetailsActions.GET_ENTRIES_TOTALS_LOAD());
              this.store.dispatch(closeOfferDetailsActions.GET_PURCHASE_ORDERS_LOAD());
              this.store.dispatch(SET_LOADING({payload: false}));
              return RETURN_EMPTY();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al eliminar el ajuste de la partida',
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

  // DOCS Obtener totales de partidas configuradas y en resumir
  getEntriesTotals = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.GET_ENTRIES_TOTALS_LOAD),
      withLatestFrom(this.store.select(closeOfferDetailsSelector.selectedQuote)),
      mergeMap(([action, selectedQuote]) => {
        return this.procesosCotizacionCerrarOferta
          .vCOCotizacionesTotalesPartidasObtenerTotalesPartidasConfiguradasMarcadas(
            selectedQuote.IdCotCotizacion,
          )
          .pipe(
            map((response: TotalesPartidasConfiguradasMarcadas) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al actualizar los totales de las partidas.',
                ),
                response,
              );
              return closeOfferDetailsActions.GET_ENTRIES_TOTALS_SUCCESS({
                entriesTotals: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al actualizar los totales de las partidas.',
                ),
                error,
              );
              return of(closeOfferDetailsActions.GET_ENTRIES_TOTALS_FAILED());
            }),
          );
      }),
    ),
  );

  // DOCS: FETCH DATA FOR FREIGHT POP UP
  fetchFreightPopUpInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.FETCH_FREIGHT_POP_UP_DATA),
      withLatestFrom(this.store.select(closeOfferDetailsSelector.selectIdCotCotizacion)),
      mergeMap(([action, idCotCotizacion]) => {
        return this.processCloseOfferService
          .CerrarOfertaTipoAjusteObtenerTiempoDeEntregaFleteExpress(idCotCotizacion)
          .pipe(
            map((response: TipoAjusteTEntregaFleteExpressObj[]) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener flete express.',
                ),
                response,
              );
              return closeOfferDetailsActions.FETCH_FREIGHT_POP_UP_DATA_SUCCESS({
                expressFreightItems: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener flete express.',
                ),
                error,
              );
              return of(closeOfferDetailsActions.FETCH_FREIGHT_POP_UP_DATA_ERROR());
            }),
          );
      }),
    ),
  );

  // DOCS: FETCH DATA FOR TWO DAYS POP UP
  fetchTwoDaysPopUpData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.FETCH_TWO_DAYS_POP_UP_DATA),
      withLatestFrom(this.store.select(closeOfferDetailsSelector.selectIdCotCotizacion)),
      mergeMap(([action, idCotCotizacion]) => {
        return this.processCloseOfferService
          .CerrarOfertaTipoAjusteObtenerTiempoDeEntregaMenosDosDias(idCotCotizacion)
          .pipe(
            map((response: TipoAjusteTEntregaMenosDosDiasObj[]) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener información de ofertas con menos dos días.',
                ),
                response,
              );
              return closeOfferDetailsActions.FETCH_TWO_DAYS_POP_UP_DATA_SUCCESS({
                twoDaysItems: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener información de ofertas con menos dos días.',
                ),
                error,
              );
              return of(closeOfferDetailsActions.FETCH_TWO_DAYS_POP_UP_DATA_ERROR());
            }),
          );
      }),
    ),
  );
  // DOCS: FETCH DATA FOR PRICE POP UP
  fetchPricePopUpInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.FETCH_PRICE_POP_UP_DATA),
      withLatestFrom(this.store.select(closeOfferDetailsSelector.selectIdCotCotizacion)),
      mergeMap(([action, idCotCotizacion]) => {
        return this.processCloseOfferService
          .CerrarOfertaTipoAjusteObtenerPrecio(idCotCotizacion)
          .pipe(
            map((response: TipoAjustePrecioObj[]) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener ajustes de precio.',
                ),
                response,
              );
              const priceItemsAdjusted = addRowIndex(0, 0, response);
              const priceItemsAdjustedImages = _map(
                priceItemsAdjusted,
                (o: ITipoAjustePrecioObj) => ({
                  ...o,
                  image: `assets/Images/logos/${buildImageNameSave(
                    o?.NombreImagenMarca,
                  )}_hover.svg`,
                }),
              );
              return closeOfferDetailsActions.FETCH_PRICE_POP_UP_DATA_SUCCESS({
                priceItems: priceItemsAdjustedImages,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener ajustes de precio.',
                ),
                error,
              );
              return of(closeOfferDetailsActions.FETCH_PRICE_POP_UP_DATA_ERROR());
            }),
          );
      }),
    ),
  );
  // DOCS Descarga el pdf de la cotización
  downloadQuotationFile = createEffect(() =>
    this.actions$.pipe(
      ofType(closeOfferDetailsActions.SET_LOAD_QUOTATION_FILE),
      withLatestFrom(this.store.select(closeOfferDetailsSelector.selectedQuote)),
      mergeMap(([action, selectedQuotation]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.sistemaArchivoService
          .ArchivoExtensionsObtenerDetalle(selectedQuotation.IdArchivoPDF)
          .pipe(
            map((response: ArchivoDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el archivo de la cotizacion.',
                ),
                response,
              );
              return DOWLOAD_FILE_LOAD({
                IdArchivo: response.IdArchivo,
                FileKey: response.FileKey,
                newTab: false,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el archivo de la cotizacion.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(closeOfferDetailsActions.SET_ERROR_QUOTATION_FILE());
            }),
          );
      }),
    ),
  );

  // DOCS: MUESTRA EL DIALOG PARA ENVIAR CORREO AL REENVIAR COTIZACIÓN
  showSendEmailDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(closeOfferDetailsActions.SHOW_SEND_EMAIL_DIALOG),
        withLatestFrom(
          this.store.select(closeOfferDetailsSelector.selectOptionsContactEmail),
          this.store.select(closeOfferDetailsSelector.selectEmailForDialog),
          this.store.select(closeOfferDetailsSelector.selectFolioQuotation),
        ),
        mergeMap(([{isShow}, contacts, mailList, folio]) => {
          this.store.dispatch(
            closeOfferDetailsActions.SET_MODAL_IS_OPEN_SEND_QUOTATION({value: isShow}),
          );
          this.store.dispatch(catalogsActions.GET_CAT_TIPO_PARTIDA_COTIZACION());
          const data: IMailDialogData = {
            contacts,
            isEditAddressEmail: true,
            mailList,
            subject: `${this.translateService.instant('common.quotation')} ${folio}`,
            titleHeader: this.translateService.instant('common.resendQuotation'),
          };

          const dialogRef = this.dialog.open(SendEmailDialogComponent, buildDialogConfig(data));

          dialogRef.afterClosed().subscribe((data: IDataMail) => {
            if (data?.activeSend) {
              const contacts = flatMap(data?.to, (o: string) => o);
              const term: CorreoEnviado = {
                IdCorreoEnviado: DEFAULT_UUID,
                ReceptoresCSV: join(contacts, ','),
                ConCopiaCSV: join(data?.carbonCopy, ','),
                Asunto: data?.subject,
                FechaRegistro: DEFAULT_DATE,
                FechaUltimaActualizacion: DEFAULT_DATE,
                Activo: true,
              };

              this.store.dispatch(
                closeOfferDetailsActions.SEND_QUOTATION_PART_1({
                  activeChangeQuotationState: true,
                  sendEmailData: term,
                  comments: data?.additionalComments,
                }),
              );
            }
          });
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
