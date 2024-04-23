import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {Store} from '@ngrx/store';
import {EMPTY, forkJoin, of} from 'rxjs';
import {Router} from '@angular/router';

// Models
import * as apiLogistic from 'api-logistica';
import {
  CotPromesaDeCompraPartida,
  GenerarPromesaDeCompraSinOCParametro,
  GMCotFletes,
  PcPromesaDeCompra,
  QueryResultVCotCotizacion,
} from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import * as apiCatalogos from 'api-catalogos';
import {QueryResultContactoDetalleObj, VCliente} from 'api-catalogos';
import {IContact} from '@appModels/catalogos/contacto/contacto';
import {
  IFollowPPromiseClientData,
  IFollowPPromiseItem,
  searchFields,
} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-details/follow-purchase-promise-details.models';
import {FiltersOnlyActive} from '@appModels/filters/Filters';

// Actions
import {
  followPPromiseActions,
  followPPromiseDetailsActions,
} from '@appActions/pendings/follow-purchase-promise';
import {DOWLOAD_FILE_LOAD, SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';

// Selectors
import {followPPromiseDetailsSelectors} from '@appSelectors/pendings/follow-purchase-promise';
import {selectTipoTelefono} from '@appSelectors/catalogs/catalogs.selectors';

// Utils
import {filter, find, isEmpty, map as _map} from 'lodash-es';
import * as servicesLogger from '@appUtil/logger';
import {patchContacts} from '@appUtil/util';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {appRoutes} from '@appHelpers/core/app-routes';
import {ProductsTypes, QuotationItemTypes} from '@appHelpers/pending/quotation/quotation.helpers';
import {MatDialog} from '@angular/material/dialog';
import {HistoryDialogComponent} from '@appComponents/pendings/follow-purchase-promise/follow-purchase-promise-details/history-dialog/history-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';

const FILE_NAME = 'Follow-Purchase-Promise-Details';
const typeItem = ProductsTypes;
const quotationItemTypes = QuotationItemTypes;
@Injectable()
export class FollowPurchasePromiseDetailsEffects {
  constructor(
    private actions$: Actions,
    private logger: NGXLogger,
    private store: Store,
    private router: Router,
    private clientsConfigService: apiCatalogs.ConfiguracionClientesService,
    private contactsConfigService: apiCatalogs.ConfiguracionContactosService,
    private quoteEntriesService: apiLogistic.ProcesosL01CotizacionPartidasService,
    private purchasePromiseQuotationService: apiLogistic.ProcesosL01CotizacionPromesaDeCompraService,
    private sistemaArchivosService: apiCatalogos.SistemaArchivosService,
    private brandServices: apiLogistic.ProcesosL01CotizacionCerrarOfertaService,
    private processQuotationService: apiLogistic.ProcesosL01CotizacionService,
    private processQuoteEstablishStrategy: apiLogistic.ProcesosL01CotizacionAtenderCierreService,
    private dialog: MatDialog,
  ) {}

  getDetailsData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followPPromiseDetailsActions.SET_CLIENT_FOLLOW_SELECTED),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        this.store.dispatch(followPPromiseActions.SET_IS_DETAILS());
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.followPurchasePromise.followPurchasePromise,
          appRoutes.followPurchasePromise.details,
        ]);
        const clientData: IFollowPPromiseClientData = {
          selectedClient: action.customer,
        };
        return of(clientData);
      }),
      switchMap((clientData$: IFollowPPromiseClientData) => {
        return this.clientsConfigService.vClienteObtener(clientData$.selectedClient.IdCliente).pipe(
          map((response: VCliente) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener la información del cliente.',
              ),
              response,
            );
            const clientData: IFollowPPromiseClientData = {
              ...clientData$,
              vCliente: response,
            };
            return clientData;
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
            this.store.dispatch(followPPromiseDetailsActions.GET_CLIENT_DATA_FAILED());
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
      withLatestFrom(this.store.select(selectTipoTelefono)),
      switchMap(([clientData$, phoneTypes]) => {
        const body = new FiltersOnlyActive();
        // body.Filters.push({
        //   NombreFiltro: 'IdCliente',
        //   ValorFiltro: clientData$.vCliente.IdCliente,
        // });
        // body.Filters.push({
        //   NombreFiltro: 'IdContactoCliente',
        //   ValorFiltro: clientData$.selectedClient.IdContactoCliente,
        // });
        body.Filters = [
          {
            NombreFiltro: 'IdContactoCliente',
            ValorFiltro: clientData$.selectedClient.IdContactoCliente,
          },
        ];
        return this.contactsConfigService.ContactoDetalleQueryResult(body).pipe(
          map((response: QueryResultContactoDetalleObj) => {
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
              phoneTypes,
              clientData$.selectedClient.IdContactoCliente,
            );
            const clientData: IFollowPPromiseClientData = {
              ...clientData$,
              contacts,
            };
            this.store.dispatch(
              followPPromiseDetailsActions.GET_CLIENT_DATA_SUCCESS({
                clientData,
              }),
            );

            return SET_LOADING({payload: false});
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
            this.store.dispatch(followPPromiseDetailsActions.GET_CLIENT_DATA_FAILED());
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
    ),
  );

  //DOCS: OBTENER INFORMAICÓN  DE LA COTIZACIÓN
  getQuotation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followPPromiseDetailsActions.GET_CLIENT_DATA_SUCCESS),
      withLatestFrom(this.store.select(followPPromiseDetailsSelectors.selectedClient)),
      mergeMap(([action, client]) => {
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdCotCotizacion',
          ValorFiltro: client.IdCotCotizacion,
        });
        return this.processQuotationService.vCotCotizacionQueryResult(body).pipe(
          map((response: QueryResultVCotCotizacion) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener la información de la cotización.',
              ),
              response,
            );
            return followPPromiseDetailsActions.FETCH_QUOTATION_SUCCESS({
              quotation: response?.Results?.[0],
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener la información de la cotización.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(followPPromiseDetailsActions.FETCH_QUOTATION_FAILED());
          }),
        );
      }),
    ),
  );

  //
  getSelectedQuoteEntries = createEffect(() =>
    this.actions$.pipe(
      ofType(
        followPPromiseDetailsActions.FETCH_QUOTATION_SUCCESS,
        followPPromiseDetailsActions.SET_SEARCH_TERM,
        followPPromiseDetailsActions.SEND_ENTRIES_TO_PURCHASE_PROMISE_SUCCESS,
        followPPromiseDetailsActions.SEND_ENTRIES_WITHOUT_OC_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(followPPromiseDetailsSelectors.selectedClient),
        this.store.select(followPPromiseDetailsSelectors.selectedSearchOption),
        this.store.select(followPPromiseDetailsSelectors.selectSearchTerm),
      ),
      switchMap(([action, client, searchOption, searchTerm]) => {
        this.store.dispatch(
          followPPromiseDetailsActions.SET_ENTRIES_API_STATUS({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        const body = new FiltersOnlyActive(true);
        body.SortField = 'Orden';
        body.SortDirection = 'asc';
        body.Filters.push(
          {
            NombreFiltro: 'IdCotCotizacion',
            ValorFiltro: client.IdCotCotizacion,
          },
          {
            NombreFiltro: 'FechaCotPromesaDeCompra',
            ValorFiltro: client.FechaPromesaDeCompra,
          },
        );
        if (searchTerm) {
          body.Filters.push({
            NombreFiltro: searchFields[searchOption.value],
            ValorFiltro: searchTerm,
          });
        }
        return this.quoteEntriesService.vPartidaCotizacionQueryResult(body).pipe(
          map((response: apiLogistic.QueryResultVPartidaCotizacion) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener las partidas del cliente.',
              ),
              response,
            );
            if (isEmpty(response.Results) && !searchTerm) {
              this.router.navigate([
                appRoutes.protected,
                appRoutes.pendings.pendings,
                appRoutes.followPurchasePromise.followPurchasePromise,
              ]);
              return followPPromiseDetailsActions.SET_ENTRIES_API_STATUS({
                status: API_REQUEST_STATUS_SUCCEEDED,
              });
            }
            let contIndex: number = 0;
            const itemsQuotation: Array<IFollowPPromiseItem> = _map(
              response.Results,
              (o: apiLogistic.VPartidaCotizacion, index: number) => {
                if (o.TipoPartidaCotizacion === quotationItemTypes.Original) {
                  contIndex++;
                }
                return {
                  ...o,
                  Index: contIndex,
                  isSelected: false,
                  imageHover: `assets/Images/logos/${o.NombreMarca?.toLowerCase()}_hover.svg`,
                };
              },
            );
            this.store.dispatch(
              followPPromiseDetailsActions.FETCH_BRANDS_LOAD({
                idQuotation: client.IdCotCotizacion,
              }),
            );
            return followPPromiseDetailsActions.GET_PURCHASE_ORDERS_SUCCESS({
              purchaseOrders: {
                TotalResults: response.TotalResults,
                Results: itemsQuotation,
              },
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener las partidas del cliente.',
              ),
              error,
            );
            this.store.dispatch(
              followPPromiseDetailsActions.SET_ENTRIES_API_STATUS({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
            return of(followPPromiseDetailsActions.GET_PURCHASE_ORDERS_FAILED());
          }),
        );
      }),
    ),
  );

  //DOCS: Obtener las fechas de capacitación
  getDatesTraining$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followPPromiseDetailsActions.GET_PURCHASE_ORDERS_SUCCESS),
      mergeMap(({purchaseOrders}) => {
        const itemsTraining = filter(
          purchaseOrders.Results,
          (o) => o.Tipo === typeItem.trainings || o.Tipo === typeItem.training,
        );

        if (itemsTraining?.length > 0) {
          const request: Array<any> = _map(itemsTraining, (o: IFollowPPromiseItem) =>
            this.quoteEntriesService.cotPartidaCotizacionCapacitacionFechaObtener(
              o?.IdCotPartidaCotizacion,
            ),
          );

          return forkJoin(request).pipe(
            map((response: Array<any>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las fechas de capacitación',
                ),
                response,
              );

              const itemsWithDatesTraining = _map(
                purchaseOrders.Results,
                (o: IFollowPPromiseItem) => {
                  const datesTraining = find(
                    response,
                    (res: any) => res[0].IdCotPartidaCotizacion === o.IdCotPartidaCotizacion,
                  );
                  if (datesTraining !== undefined) {
                    return {
                      ...o,
                      datesTraining,
                    };
                  } else {
                    return {
                      ...o,
                    };
                  }
                },
              );

              return followPPromiseDetailsActions.FETCH_DATES_TRAINING_SUCCESS({
                items: {
                  Results: itemsWithDatesTraining,
                  TotalResults: purchaseOrders.TotalResults,
                },
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las fechas de capacitación',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(
                followPPromiseDetailsActions.SET_ENTRIES_API_STATUS({
                  status: API_REQUEST_STATUS_FAILED,
                }),
              );
            }),
          );
        } else {
          this.store.dispatch(
            followPPromiseDetailsActions.FETCH_DATES_TRAINING_SUCCESS({items: purchaseOrders}),
          );
        }
      }),
    ),
  );

  //DOCS: OBTENER LOS FLETES DE LA COTIZACIÓN SELECCIONADA
  getFreigth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followPPromiseDetailsActions.FETCH_DATES_TRAINING_SUCCESS),
      withLatestFrom(this.store.select(followPPromiseDetailsSelectors.selectedClient)),
      mergeMap(([action, client]) => {
        return this.processQuoteEstablishStrategy.GMCotFletesProcess(client.IdCotCotizacion).pipe(
          map((response: GMCotFletes) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los fletes de la cotización.',
              ),
              response,
            );
            this.store.dispatch(
              followPPromiseDetailsActions.FETCH_FREIGHTS_SUCCESS({freights: response}),
            );
            return followPPromiseDetailsActions.SET_ENTRIES_API_STATUS({
              status: API_REQUEST_STATUS_SUCCEEDED,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener los fletes de la cotización.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(followPPromiseDetailsActions.FETCH_FREIGHTS_FAILED);
          }),
        );
      }),
    ),
  );
  sendEntriesToPurchasePromise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followPPromiseDetailsActions.SEND_ENTRIES_TO_PURCHASE_PROMISE_LOAD),
      withLatestFrom(
        this.store.select(followPPromiseDetailsSelectors.checkedItems),
        this.store.select(followPPromiseDetailsSelectors.selectJustification),
        this.store.select(followPPromiseDetailsSelectors.selectDateForPromiseString),
        this.store.select(followPPromiseDetailsSelectors.selectedClient),
      ),
      mergeMap(([action, entries$, justification, dateString, client]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const request: Array<any> = _map(entries$, (o: IFollowPPromiseItem) =>
          this.purchasePromiseQuotationService.cotPromesaDeCompraPartidaGuardarOActualizar({
            Activo: true,
            FechaPromesaDeCompra: dateString,
            FechaRegistro: DEFAULT_DATE,
            FechaUltimaActualizacion: DEFAULT_DATE,
            IdCotPartidaCotizacion: o.IdCotPartidaCotizacion,
            IdCotPromesaDeCompraPartida: DEFAULT_UUID,
            Justificacion: justification,
          }),
        );
        return forkJoin(request).pipe(
          map((response: Array<any>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al mandar las partidas a Promesa de compra',
              ),
              response,
            );

            this.store.dispatch(
              followPPromiseDetailsActions.SET_PURCHASE_PROMISE_DATE({
                date: null,
                stringDate: '',
              }),
            );
            this.store.dispatch(
              followPPromiseDetailsActions.SET_PROMISE_CHECK_VALUE({
                value: false,
              }),
            );
            this.store.dispatch(
              followPPromiseDetailsActions.SET_JUSTIFICATION_VALUE({
                justification: '',
              }),
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              SET_LOADING_SUCCESS({
                active: true,
                message: 'Has ajustado una nueva fecha',
                successText: `promesa de compra para ${client.Nombre}!`,
              }),
            );
            return followPPromiseDetailsActions.SEND_ENTRIES_TO_PURCHASE_PROMISE_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al mandar las partidas a Promesa de compra',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(followPPromiseDetailsActions.SEND_ENTRIES_TO_PURCHASE_PROMISE_FAILED());
          }),
        );
      }),
    ),
  );
  sendEntriesWithoutOc$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followPPromiseDetailsActions.SEND_ENTRIES_WITHOUT_OC_LOAD),
      withLatestFrom(
        this.store.select(followPPromiseDetailsSelectors.checkedItems),
        this.store.select(followPPromiseDetailsSelectors.selectJustification),
        this.store.select(followPPromiseDetailsSelectors.selectedClient),
      ),
      mergeMap(([action, entries$, justification, client]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const body: GenerarPromesaDeCompraSinOCParametro = {
          FechaPromesaDeCompra: client.FechaPromesaDeCompra,
          idCotCotizacion: entries$[0].IdCotCotizacion,
          ListIdCotPartidaCotizacion: _map(
            entries$,
            (o: IFollowPPromiseItem) => o.IdCotPartidaCotizacion,
          ),
          Justificacion: justification,
        };
        return this.purchasePromiseQuotationService.GenerarPromesaDeCompraSinOCProcess(body).pipe(
          map((response: PcPromesaDeCompra) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al mandar las partidas Sin OC',
              ),
              response,
            );
            this.store.dispatch(
              followPPromiseDetailsActions.SET_JUSTIFICATION_VALUE({
                justification: '',
              }),
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              SET_LOADING_SUCCESS({
                active: true,
                message: 'Has enviado partidas Sin Oc',
              }),
            );
            return followPPromiseDetailsActions.SEND_ENTRIES_WITHOUT_OC_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al mandar las partidas Sin OC',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(followPPromiseDetailsActions.SEND_ENTRIES_WITHOUT_OC_FAILED());
          }),
        );
      }),
    ),
  );
  fetchBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followPPromiseDetailsActions.FETCH_BRANDS_LOAD),
      mergeMap((action) => {
        return this.brandServices
          .PartidaCotizacionCerrarOfertaDetalleObtener_1({
            AjusteDeOferta: false,
            Cancelacion: false,
            IdCotCotizacion: action.idQuotation,
            PartidaConfigAjusteOferta: 0,
            PromesaDeCompra: false,
            Seguimiento: false,
            Todas: true,
          })
          .pipe(
            map((response) => {
              return followPPromiseDetailsActions.GET_BRANDS_SUCCESS({
                brands: _map(response, (brand: apiLogistic.Marca) => {
                  return {value: brand.IdMarca, label: brand.Nombre};
                }),
                idQuotation: action.idQuotation,
              });
            }),
          );
      }),
    ),
  );

  getIDArchivoDetalle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(followPPromiseDetailsActions.SET_IDARCHIVO),
        mergeMap((action) => {
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map((response) => {
              this.store.dispatch(
                DOWLOAD_FILE_LOAD({
                  IdArchivo: response.IdArchivo,
                  FileKey: response.FileKey,
                  newTab: true,
                }),
              );
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  // DOCS: EFFECT TO GET HISTORY BY PURCHASE PROMISE
  fetchHistoryPC$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followPPromiseDetailsActions.FETCH_HISTORY_PURCHASE_PROMISE),
      mergeMap(({idcotPromesaDeCompraPartida}) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.purchasePromiseQuotationService
          .cotPromesaDeCompraPartidaGetHistorialPorPartidaCotizacion(idcotPromesaDeCompraPartida)
          .pipe(
            map((response: CotPromesaDeCompraPartida[]) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las justificaciones de Promesa de Compra',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.dialog.open(HistoryDialogComponent, buildDialogConfig({}));
              return followPPromiseDetailsActions.FETCH_HISTORY_PURCHASE_PROMISE_SUCCESS({
                justifications: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las justificaciones de Promesa de Compra',
                ),
                error,
              );
              return of(followPPromiseDetailsActions.FETCH_HISTORY_PURCHASE_PROMISE_ERROR());
            }),
          );
      }),
    ),
  );
}
