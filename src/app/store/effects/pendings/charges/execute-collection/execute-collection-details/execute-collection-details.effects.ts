import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {lastValueFrom, of} from 'rxjs';
/*Models*/
import * as apiCatalogs from 'api-catalogos';
import {
  ArchivoDetalle,
  QueryResultContactoDetalleObj,
  QueryResultDatosBancarios,
} from 'api-catalogos';
import * as apiFinance from 'api-finanzas';
import {
  CobranzaClientesArchivosService,
  CobranzaClientesCalendariosService,
  CobranzaClientesEjecutarCobranzaService,
  CobranzaClientesService,
  FacturasPendientesClienteObj,
  FccArchivoPagoCliente,
  ParametroDistribuidorParcialidadesPagos,
  QueryResultFccNotaCredito,
  QueryResultVFCCFolioPagoCliente,
  VFCCFolioPagoCliente,
} from 'api-finanzas';
import {
  IExecuteCollectionPayment,
  IFccNotaCredito,
  IInvoice,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
/*Actions Imports*/
import {
  executeCollectionActions,
  executeCollectionDetailsActions,
} from '@appActions/pendings/charges/execute-collection';
import {
  GET_CAT_MEDIO_DE_PAGO_LOAD,
  GET_CAT_MONEDA_LOAD,
} from '@appActions/catalogs/catalogos.actions';
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
/*Selectors*/
import {executeCollectionDetailsSelectors} from '@appSelectors/pendings/charges/execute-collection';
/*Utils*/
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
  MINIO_BUCKETS,
} from '@appUtil/common.protocols';
import {isEmpty, map as _map} from 'lodash-es';
import * as servicesLogger from '@appUtil/logger';
import {extractID} from '@appUtil/util';
import {MinioService} from '@appServices/minio/minio.service';
import {convertPDFFileFromURLToBase64, getBase64FromUrl} from '@appUtil/files';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'execute-collection-details.effects.ts';

@Injectable()
export class ExecuteCollectionDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private minioService: MinioService,
    private contactServices: apiCatalogs.ConfiguracionContactosService,
    private accountsConfigurationService: apiCatalogs.ConfiguracionCuentasService,
    private mailSystemServices: apiCatalogs.SistemaCorreosService,
    private collectionClientsService: CobranzaClientesService,
    private collectionClientsFilesService: CobranzaClientesArchivosService,
    private executeCollectionCalendarService: CobranzaClientesCalendariosService,
    private executeCollectionService: CobranzaClientesEjecutarCobranzaService,
    private collectionClientsExecuteService: apiFinance.CobranzaClientesEjecutarCobranzaService,
    private systemFileServices: apiCatalogs.SistemaArchivosService,
    private collectionClientsCreditNotesService: apiFinance.CobranzaClientesNotasCreditoService,
    private collectionClientsPartialPaymentsService: apiFinance.CobranzaClientesParcialidadesPagosService,
  ) {}

  viewDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(executeCollectionDetailsActions.SET_SELECTED_CLIENT),
      mergeMap((action) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        this.store.dispatch(GET_CAT_MEDIO_DE_PAGO_LOAD());
        this.store.dispatch(GET_CAT_MONEDA_LOAD());
        this.router
          .navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.executeCollection.executeCollection,
            appRoutes.executeCollection.details,
          ])
          .then(() => {
            this.store.dispatch(
              executeCollectionActions.SET_IS_IN_DETAILS_VIEW({
                isInDetailsView: true,
              }),
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          });

        this.store.dispatch(executeCollectionDetailsActions.FETCH_PAYMENTS_LOAD());
        return of(RETURN_EMPTY());
      }),
    ),
  );
  fetchRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        executeCollectionDetailsActions.FETCH_REQUEST_LOAD,
        executeCollectionDetailsActions.SET_SELECTED_PAYMENT,
      ),
      withLatestFrom(this.store.select(executeCollectionDetailsSelectors.selectPayment)),
      mergeMap(([action, payment]) => {
        return this.mailSystemServices.vCorreoClienteObtener(payment.IdCorreoRecibido).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los datos del correo.',
              ),
              response,
            );
            return executeCollectionDetailsActions.FETCH_REQUEST_SUCCESS({
              email: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener los datos del correo.',
              ),
              error,
            );
            return of(executeCollectionDetailsActions.FETCH_REQUEST_ERROR());
          }),
        );
      }),
    ),
  );
  fetchFilesMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        executeCollectionDetailsActions.SET_SELECTED_PAYMENT,
        executeCollectionDetailsActions.FETCH_FILES_MAIL_LOAD,
      ),
      withLatestFrom(this.store.select(executeCollectionDetailsSelectors.selectPayment)),
      mergeMap(([action, payment]) => {
        return this.systemFileServices.ArchivoObtener(payment.IdArchivo).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener el archivo.',
              ),
              response,
            );
            return executeCollectionDetailsActions.FETCH_FILES_MAIL_SUCCESS({
              file: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener el archivo.',
              ),
              error,
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );
  // DOCS: Obtener lista de pagos
  fetchPayments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        executeCollectionDetailsActions.FETCH_PAYMENTS_LOAD,
        executeCollectionDetailsActions.SET_SELECTED_BURGER_OPTION,
        executeCollectionDetailsActions.SET_SEARCH_TERM,
        // declareArrivalDetailsActions.REFRESH_SELECTED_PROVIDER,
      ),
      withLatestFrom(
        this.store.select(executeCollectionDetailsSelectors.selectNeedsToReload),
        this.store.select(executeCollectionDetailsSelectors.selectPaymentListFilters),
      ),
      mergeMap(([action, needsToReload, params]) => {
        if (needsToReload) {
          this.store.dispatch(
            executeCollectionDetailsActions.SET_ITEMS_STATUS({
              itemsStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
          this.store.dispatch(
            executeCollectionDetailsActions.SET_PAYMENTS_STATUS({
              paymentStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
          return this.executeCollectionService.vFCCFolioPagoClienteQueryResult(params).pipe(
            map((response: QueryResultVFCCFolioPagoCliente) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar los pagos.',
                ),
                response,
              );
              const paymentList: Array<IExecuteCollectionPayment> = _map(
                response.Results,
                (payment: VFCCFolioPagoCliente, index: number) => ({
                  ...payment,
                  Index: index,
                  isSelected: index === 0,
                  needsToReloadItems: true,
                }),
              );
              this.store.dispatch(
                executeCollectionDetailsActions.SET_PAYMENTS_STATUS({
                  paymentStatus: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );

              if (!isEmpty(paymentList)) {
                this.store.dispatch(
                  executeCollectionDetailsActions.INITIAL_PAYMENT({
                    selectedPayment: {
                      ...paymentList[0],
                    },
                  }),
                );
                this.store.dispatch(executeCollectionDetailsActions.FETCH_CLIENT_CONTACT_LOAD());
                this.store.dispatch(executeCollectionDetailsActions.FETCH_REQUEST_LOAD());
                this.store.dispatch(executeCollectionDetailsActions.FETCH_FILES_MAIL_LOAD());
              }
              /**/
              return executeCollectionDetailsActions.FETCH_PAYMENTS_SUCCESS({
                paymentList,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar los pagos.',
                ),
                error,
              );
              this.store.dispatch(
                executeCollectionDetailsActions.SET_PAYMENTS_STATUS({
                  paymentStatus: API_REQUEST_STATUS_FAILED,
                }),
              );
              return of(RETURN_EMPTY());
            }),
          );
        } else {
          this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          return of(executeCollectionDetailsActions.FETCH_ITEMS_LOAD());
        }
      }),
    ),
  );

  // DOCS: Obtener info de las barras
  fetchPaymentsBars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        // executeCollectionDetailsActions.FETCH_PAYMENT_BARS_LOAD,
        executeCollectionDetailsActions.SET_SELECTED_CLIENT,
      ),
      withLatestFrom(this.store.select(executeCollectionDetailsSelectors.selectedClient)),
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
              return executeCollectionDetailsActions.FETCH_PAYMENT_BARS_SUCCESS({
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
              this.store.dispatch(executeCollectionDetailsActions.FETCH_PAYMENT_BARS_FAILED());
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );

  // DOCS: Obtener info de las tabs
  fetchTotalsTab$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        // executeCollectionDetailsActions.FETCH_DATA_TABS_LOAD,
        executeCollectionDetailsActions.SET_SELECTED_CLIENT,
      ),
      withLatestFrom(this.store.select(executeCollectionDetailsSelectors.selectCustomer)),
      mergeMap(([action, customer]) => {
        return this.executeCollectionCalendarService
          .FacturasPendientesClienteDetalleDiccionarioFacturasPendientesCliente(customer.IdCliente)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar empresas.',
                ),
                response,
              );
              return executeCollectionDetailsActions.FETCH_DATA_TABS_SUCCESS({
                tabs: response,
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
              return of(executeCollectionDetailsActions.FETCH_DATA_TABS_ERROR(error));
            }),
          );
      }),
    ),
  );
  // DOCS: Obtener contacto del cliente
  fetchContactQuote = createEffect(() =>
    this.actions$.pipe(
      ofType(
        executeCollectionDetailsActions.FETCH_CLIENT_CONTACT_LOAD,
        executeCollectionDetailsActions.SET_SELECTED_PAYMENT,
      ),
      withLatestFrom(this.store.select(executeCollectionDetailsSelectors.selectedPayment)),
      mergeMap(([action, payment]) => {
        if (!payment.needsToReloadItems) {
          return of(RETURN_EMPTY());
        }
        const params = new FiltersOnlyActive(true);
        params.Filters = [
          {
            NombreFiltro: 'IdContactoCliente',
            ValorFiltro: payment.IdContactoCliente,
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
            return executeCollectionDetailsActions.FETCH_CLIENT_CONTACT_SUCCESS({
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
            return of(executeCollectionDetailsActions.FETCH_CLIENT_CONTACT_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: Obtener lista de facturas
  fetchInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        // executeCollectionDetailsActions.FETCH_LIST_INVOICE_LOAD
        executeCollectionDetailsActions.SET_SELECTED_CLIENT,
        executeCollectionDetailsActions.SET_SELECTED_DROP_OPTION,
        executeCollectionDetailsActions.SET_SELECTED_PAYMENT_SEARCH_TERM,
      ),
      withLatestFrom(this.store.select(executeCollectionDetailsSelectors.selectQueryInfoInvoice)),
      mergeMap(([action, param]) => {
        return this.collectionClientsExecuteService
          .vFacturaClienteCalendarioQueryResult(param)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar facturas.',
                ),
                response,
              );
              return executeCollectionDetailsActions.FETCH_LIST_INVOICE_SUCCESS({
                itemsList: _map(response.Results, (item, index) => {
                  // FIXME: Quitar as IInvoice y llenar las propiedades que hacen falta
                  return {
                    ...item,
                    Index: index + 1,
                    selected: false,
                    openInput: false,
                    isUSD: false,
                    isMXN: false,
                  } as IInvoice;
                }),
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
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );
  viewFileRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(executeCollectionDetailsActions.VIEW_FILE_LOAD),
        mergeMap((action) => {
          return this.systemFileServices.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
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
                executeCollectionDetailsActions.SET_OPEN_VIEW_FILE({
                  active: true,
                }),
              );
              this.store.dispatch(
                executeCollectionDetailsActions.VIEW_FILE_SUCCESS({
                  fileBase64: base64,
                }),
              );
            }),
            catchError((error) => {
              return of(executeCollectionDetailsActions.VIEW_FILE_ERROR({error}));
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  // Obtener notas de crédito
  fetchCreditNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        // executeCollectionDetailsActions.FETCH_LIST_INVOICE_LOAD
        executeCollectionDetailsActions.SET_SELECTED_CLIENT,
      ),
      withLatestFrom(
        this.store.select(executeCollectionDetailsSelectors.selectFiltersForCreditNotes),
      ),
      mergeMap(([action, params]) => {
        return this.collectionClientsCreditNotesService.fccNotaCreditoQueryResult(params).pipe(
          map((response: QueryResultFccNotaCredito) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al consultar las notas de credito del cliente.',
              ),
              response,
            );
            return executeCollectionDetailsActions.FETCH_CREDIT_NOTES_SUCCESS({
              creditNotes: _map(response.Results, (item, index) => {
                return {...item, Index: index, isSelected: false};
              }),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al consultar las notas de credito del cliente.',
              ),
              error,
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );

  // Obtener Catalogo de Datos bancarios
  fetchBakData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        // executeCollectionDetailsActions.FETCH_LIST_INVOICE_LOAD
        executeCollectionDetailsActions.SET_INITIAL_PAYMENT_TRANSACTION_DATA,
      ),
      withLatestFrom(this.store.select(executeCollectionDetailsSelectors.selectFiltersForBankData)),
      mergeMap(([action, params]) => {
        return this.accountsConfigurationService.DatosBancariosQueryResult(params).pipe(
          map((response: QueryResultDatosBancarios) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al consultar el catalogo de datos bancarios.',
              ),
              response,
            );
            return executeCollectionDetailsActions.FETCH_BANK_DATA_SUCCESS({
              bankData: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al consultar el catalogo de datos bancarios.',
              ),
              error,
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );

  managePayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(executeCollectionDetailsActions.MANAGE_PAYMENT_LOAD),
      withLatestFrom(
        this.store.select(executeCollectionDetailsSelectors.selectFccPagoCliente),
        this.store.select(executeCollectionDetailsSelectors.selectedBillList),
        this.store.select(executeCollectionDetailsSelectors.selectedCreditNotes),
        this.store.select(executeCollectionDetailsSelectors.selectFiles),
      ),
      mergeMap(async ([action, fccPagoCliente, selectedBills, selectedCreditNotes, files]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        const paymentId = extractID(
          await lastValueFrom(
            this.collectionClientsService.fccPagoClienteGuardarOActualizar(fccPagoCliente),
          ),
        );
        if (!paymentId) {
          this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          this.store.dispatch(
            utilsActions.SET_LOADING_ERROR({
              active: true,
              message: 'Ha ocurrido un error en el servicio web.',
            }),
          );
          return executeCollectionDetailsActions.MANAGE_PAYMENT_FAILED();
        }
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_SUCCEEDED,
            'Al guardar fccPagoCliente.',
          ),
          paymentId,
        );
        for (const file of files) {
          const date = new Date();
          const filename = `${date.getFullYear()}/${
            fccPagoCliente.IdCliente
          }/${paymentId}/${date.getTime()}/${file.name}`;
          const fileDetail: ArchivoDetalle = await this.minioService.uploadFile(
            file.file,
            filename,
            MINIO_BUCKETS.Charges,
          );
          const fccArchivoPagoCliente: FccArchivoPagoCliente = {
            Activo: true,
            FechaRegistro: DEFAULT_DATE,
            FechaUltimaActualizacion: DEFAULT_DATE,
            IdArchivo: fileDetail.IdArchivo,
            IdFCCArchivoPagoCliente: DEFAULT_UUID,
            IdFCCPagoCliente: paymentId,
          };
          const fccArchivoPagoClienteId = await lastValueFrom(
            this.collectionClientsFilesService.fccArchivoPagoClienteGuardarOActualizar(
              fccArchivoPagoCliente,
            ),
          );
          this.logger.debug(
            servicesLogger.generateMessage(
              FILE_NAME,
              servicesLogger.LOG_SUCCEEDED,
              'Al subir archivo.',
            ),
            paymentId,
          );
        }
        const params: ParametroDistribuidorParcialidadesPagos = {
          Facturas: _map(selectedBills, (o: IInvoice) => ({
            IdTPProformaPedido: o.IdTPProformaPedido,
            Monto: o.MontoPagado,
            MontoPendienteAnterior: o.MontoPendiente,
          })),
          IdFCCPagoCliente: paymentId,
          ListaFCCNotaCredito: _map(
            selectedCreditNotes,
            (o: IFccNotaCredito) => o.IdFCCNotaCredito,
          ),
        };
        const paymentProcess = await lastValueFrom(
          this.collectionClientsPartialPaymentsService.DistribuidorParcialidadesPagosProcess(
            params,
          ),
        );
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_SUCCEEDED,
            'Al generar el pago.',
          ),
          paymentProcess,
        );
        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        return executeCollectionDetailsActions.MANAGE_PAYMENT_SUCCESS();
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al generar el pago.',
          ),
          error,
        );
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
