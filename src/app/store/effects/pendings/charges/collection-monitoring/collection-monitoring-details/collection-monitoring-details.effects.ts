import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {Router} from '@angular/router';
import {forkJoin, of} from 'rxjs';

// Services
// Models
import {ConfiguracionContactosService, QueryResultContactoDetalleObj} from 'api-catalogos';
import {
  CobranzaClientesCalendariosService,
  CobranzaClientesEjecutarCobranzaService,
  CobranzaClientesMonitoreoCobrosService,
  FacturasPendientesClienteObj,
  FccProgramacionCobro,
  ParametroAgregarComentarioFacturaCliente,
  QueryResultVFacturaClienteCalendario,
  TpProformaPedido,
  VFacturaClienteCalendario,
} from 'api-finanzas';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {IInvoice} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';

// Actions
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {
  collectionMonitoringActions,
  collectionMonitoringDetailsActions,
} from '@appActions/pendings/charges/collection-monitoring';
import {GET_CAT_MEDIO_DE_PAGO_LOAD} from '@appActions/catalogs/catalogos.actions';

// Selectors
import {collectionMonitoringDetailsSelectors} from '@appSelectors/pendings/charges/collection-monitoring';

// Utils
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import * as servicesLogger from '@appUtil/logger';
import {map as _map} from 'lodash-es';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'collection-monitoring-details.effects.ts';

@Injectable()
export class CollectionMonitoringDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router,
    private logger: NGXLogger,
    private executeCollectionCalendarService: CobranzaClientesCalendariosService,
    private collectionClientsExecuteService: CobranzaClientesEjecutarCobranzaService,
    private clientsCollectionMonitoringService: CobranzaClientesMonitoreoCobrosService,
    private contactServices: ConfiguracionContactosService,
  ) {}

  // Navigate to details and dispatch actions
  viewDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(collectionMonitoringDetailsActions.SET_SELECTED_CLIENT),
      mergeMap((action) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        this.store.dispatch(GET_CAT_MEDIO_DE_PAGO_LOAD());
        this.router
          .navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.collectionMonitoring.collectionMonitoring,
            appRoutes.collectionMonitoring.details,
          ])
          .then(() => {
            this.store.dispatch(
              collectionMonitoringActions.SET_IS_IN_DETAILS_VIEW({
                isInDetailsView: true,
              }),
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          });
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // Get companies for tabs
  fetchCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        // collectionMonitoringDetailsActions.FETCH_COMPANIES_LOAD,
        collectionMonitoringDetailsActions.SET_SELECTED_CLIENT,
      ),
      withLatestFrom(this.store.select(collectionMonitoringDetailsSelectors.selectedClient)),
      mergeMap(([action, customer]) => {
        return this.executeCollectionCalendarService
          .FacturasPendientesClienteDetalleDiccionarioFacturasPendientesCliente(customer.IdCliente)
          .pipe(
            map((response: {[key: string]: number}) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar empresas.',
                ),
                response,
              );
              return collectionMonitoringDetailsActions.FETCH_COMPANIES_SUCCESS({
                companiesList: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar empresas.',
                ),
                error,
              );
              return of(collectionMonitoringDetailsActions.FETCH_COMPANIES_FAILED(error));
            }),
          );
      }),
    ),
  );

  // Get client contact
  fetchClientContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        // collectionMonitoringDetailsActions.FETCH_CLIENT_CONTACT_LOAD,
        collectionMonitoringDetailsActions.SET_SELECTED_CLIENT,
      ),
      withLatestFrom(this.store.select(collectionMonitoringDetailsSelectors.selectedClient)),
      mergeMap(([action, customer]) => {
        const params = new FiltersOnlyActive(true);
        // params.Filters.push({
        //   NombreFiltro: 'IdContactoCliente',
        //   ValorFiltro: customer.IdContactoCliente,
        // });
        params.Filters = [
          {
            NombreFiltro: 'IdContactoCliente',
            ValorFiltro: customer.IdContactoCliente,
          },
        ];
        return this.contactServices.ContactoDetalleQueryResult(params).pipe(
          map((response: QueryResultContactoDetalleObj) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Obtener Contacto de Cliente.',
              ),
              response,
            );
            return collectionMonitoringDetailsActions.FETCH_CLIENT_CONTACT_SUCCESS({
              clientContact: response.Results[0] || {},
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Obtener Contacto de Cliente.',
              ),
              error,
            );
            return of(collectionMonitoringDetailsActions.FETCH_CLIENT_CONTACT_FAILED());
          }),
        );
      }),
    ),
  );

  // Get bars info
  fetchPaymentsBars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        // collectionMonitoringDetailsActions.FETCH_CHARGES_BARS_LOAD,
        collectionMonitoringDetailsActions.SET_SELECTED_CLIENT,
      ),
      withLatestFrom(this.store.select(collectionMonitoringDetailsSelectors.selectedClient)),
      mergeMap(([action, selectedClient]) => {
        return this.executeCollectionCalendarService
          .FacturasPendientesClienteDetalleObtener(selectedClient.IdCliente)
          .pipe(
            map((response: FacturasPendientesClienteObj) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar la info de las barras.',
                ),
                response,
              );
              return collectionMonitoringDetailsActions.FETCH_CHARGES_BARS_SUCCESS({
                barsData: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar la info de las barras.',
                ),
                error,
              );
              this.store.dispatch(collectionMonitoringDetailsActions.FETCH_CHARGES_BARS_FAILED());
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );

  // Get invoices
  fetchInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        collectionMonitoringDetailsActions.SET_SELECTED_CLIENT,
        collectionMonitoringDetailsActions.SET_SELECTED_TAB_OPTION,
        collectionMonitoringDetailsActions.SET_SELECTED_DROP_LIST_OPTION,
        collectionMonitoringDetailsActions.SET_SEARCH_TERM,
        collectionMonitoringDetailsActions.SET_FILTER_RANGE_DATE,
        collectionMonitoringDetailsActions.FINALIZE_INVOICES_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(collectionMonitoringDetailsSelectors.selectQueryInfoInvoice),
      ),
      mergeMap(([action, param]) => {
        this.store.dispatch(
          collectionMonitoringDetailsActions.SET_ITEMS_STATUS({
            itemsStatus: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.collectionClientsExecuteService
          .vFacturaClienteCalendarioQueryResult(param)
          .pipe(
            map((response: QueryResultVFacturaClienteCalendario) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar facturas.',
                ),
                response,
              );
              const invoices: Array<IInvoice> = _map(
                response.Results,
                (item: VFacturaClienteCalendario, index: number) => {
                  // FIXME: Quitar as IInvoice y llenar las propiedades que hacen falta
                  return {
                    ...item,
                    Index: index + 1,
                    selected: false,
                    comments: '',
                    FechaCompromisoPagoDate: new Date(item.FechaCompromisoPago),
                    hasTemporaryDate: false,
                    fccProgramacionCobro: {
                      Activo: true,
                      Comentarios: null,
                      FechaProgramacion: item.FechaCompromisoPago,
                      FechaRegistro: DEFAULT_DATE,
                      FechaUltimaActualizacion: DEFAULT_DATE,
                      IdFCCProgramacionCobro: DEFAULT_UUID,
                      IdTPProformaPedido: item.IdTPProformaPedido,
                    },
                  } as IInvoice;
                },
              );
              this.store.dispatch(
                collectionMonitoringDetailsActions.SET_ITEMS_STATUS({
                  itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              return collectionMonitoringDetailsActions.FETCH_INVOICES_SUCCESS({
                invoices,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar facturas.',
                ),
                error,
              );
              this.store.dispatch(
                collectionMonitoringDetailsActions.SET_ITEMS_STATUS({
                  itemsStatus: API_REQUEST_STATUS_FAILED,
                }),
              );
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );

  // Finalize invoices
  finalizeInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(collectionMonitoringDetailsActions.FINALIZE_INVOICES_LOAD),
      withLatestFrom(this.store.select(collectionMonitoringDetailsSelectors.paramsForComments)),
      mergeMap(([action, params]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        const request: Array<any> = _map(params, (o: ParametroAgregarComentarioFacturaCliente) =>
          this.clientsCollectionMonitoringService.AgregarComentarioFacturaClienteProcess(o),
        );
        return forkJoin(request).pipe(
          map((response: Array<TpProformaPedido>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar los comentarios de las facturas',
              ),
              response,
            );
            return collectionMonitoringDetailsActions.SAVE_INVOICES_COMMENTS_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar los comentarios de las facturas',
              ),
              error,
            );
            this.store.dispatch(collectionMonitoringDetailsActions.FINALIZE_INVOICES_FAILED());
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return of(RETURN_EMPTY());
          }),
        );
      }),
      withLatestFrom(this.store.select(collectionMonitoringDetailsSelectors.paramsForNewDates)),
      switchMap(([action, params]) => {
        const request: Array<any> = _map(params, (o: FccProgramacionCobro) =>
          this.clientsCollectionMonitoringService.fccProgramacionCobroGuardarOActualizar(o),
        );
        return forkJoin(request).pipe(
          map((response: Array<TpProformaPedido>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar la fecha programada',
              ),
              response,
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            this.store.dispatch(
              utilsActions.SET_LOADING_SUCCESS({
                active: true,
                message: 'Has monitoreado cobranza',
              }),
            );
            return collectionMonitoringDetailsActions.FINALIZE_INVOICES_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar la fecha programada',
              ),
              error,
            );
            this.store.dispatch(collectionMonitoringDetailsActions.FINALIZE_INVOICES_FAILED());
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );
}
