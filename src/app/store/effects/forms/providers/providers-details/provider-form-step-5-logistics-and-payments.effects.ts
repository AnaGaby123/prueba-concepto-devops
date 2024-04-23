import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  CatalogosService,
  ConfiguracionCuentasService,
  ConfiguracionPagosDatosBancariosDetalle,
  ConfiguracionProductosConfiguracionPrecioTiempoEntregaService,
  ConfiguracionProveedoresRelacionesService,
  ConfiguracionProveedoresService,
  ConfiguracionTiempoEntregaProveedor,
  ValorConfiguracionTiempoEntrega,
} from 'api-catalogos';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {NGXLogger} from 'ngx-logger';
// Actions
import * as logisticAction from '@appActions/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.actions';
import {Store} from '@ngrx/store';
// Selectors
import {extractID, patchBody} from '@appUtil/util';
import {RutaEntrega} from '@appModels/store/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.model';
import {
  logisticsAndPaymentsSelectors,
  providersDetailsSelectors,
} from '@appSelectors/forms/providers';
import {EMPTY, forkJoin, lastValueFrom, of} from 'rxjs';
import {SET_LOADING, SET_LOADING_ERROR, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import * as servicesLogger from '@appUtil/logger';
import {Proveedor} from '@appInterfaces/catalogos';
import {filter, map as _map} from 'lodash-es';
import {providerActions, providersListActions} from '@appActions/forms/providers';
import {pathCat} from '@appHelpers/catalogs/providers/logisticPayments';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {paymentMethods} from '@appUtil/common.protocols';

const FILE_NAME = '[Providers-Logistic]';

@Injectable({
  providedIn: 'root',
})
export class ProviderFormStep5LogisticsAndPaymentsEffects {
  constructor(
    private logger: NGXLogger,
    private actions$: Actions,
    private store: Store,
    private serviceCatalogos: CatalogosService,
    private serviceProvider: ConfiguracionProveedoresService,
    private serviceTimeDelivery: ConfiguracionProductosConfiguracionPrecioTiempoEntregaService,
    private serviceConfiguracionRelaciones: ConfiguracionProveedoresRelacionesService,
    private serviceCuentas: ConfiguracionCuentasService,
  ) {}

  // DOCS: OBTIENE LAS RUTAS EN ORDEN DE DISTANCIA
  getCatRoutes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logisticAction.GET_CAT_ROUTES_LOAD),
        withLatestFrom(
          this.store.select(logisticsAndPaymentsSelectors.selectCatRoute),
          this.store.select(providersDetailsSelectors.selectedProvider),
          this.store.select(catalogsSelectors.selectCatUnidadTiempoForDropDown),
        ),
        mergeMap(([action, list, provider, catUnitTime]) => {
          const body = patchBody(null, null, true, null, 'Orden', [
            {NombreFiltro: 'AplicaFleteExpress', ValorFiltro: true},
          ]);
          this.store.dispatch(SET_LOADING({payload: true}));
          this.store.dispatch(logisticAction.SET_PROVIDER({provider}));
          if (list.length < 1) {
            return this.serviceCatalogos
              .catRutaEntregaQueryResult({...body, SortDirection: 'asc', SortField: 'RutaEntrega'})
              .pipe(
                map(async (response) => {
                  /* if (isEdit) {*/
                  this.store.dispatch(
                    logisticAction.GET_CAT_ROUTES_SUCCESS({
                      list: pathCat(response.Results),
                      catUnitTime,
                    }),
                  );
                  const datasConfigurationTime = await lastValueFrom(
                    this.serviceConfiguracionRelaciones.ConfiguracionTiempoEntregaProveedorQueryResult(
                      patchBody(null, null, true, null, null, [
                        {
                          NombreFiltro: 'IdProveedor',
                          ValorFiltro: provider.IdProveedor,
                        },
                      ]),
                    ),
                  );
                  if (datasConfigurationTime.TotalResults > 0) {
                    const listRoute: RutaEntrega[] = [];
                    for (let i = 0; i < datasConfigurationTime.TotalResults; i++) {
                      const item: RutaEntrega = new (class implements RutaEntrega {
                        IdConfiguracionTiempoEntregaProveedor: string;
                        IdValorConfiguracionTiempoEntrega: string;
                        ValorEsperado: number;
                        id: string;
                        idSelected: string;
                        identificador: number;
                        name: string;
                        FechaRegistro: string;
                        FechaUltimaActualizacion: string;
                      })();
                      const itemAux = datasConfigurationTime.Results[i];
                      item.id = itemAux.IdCatRutaEntrega;
                      item.IdValorConfiguracionTiempoEntrega =
                        itemAux.IdValorConfiguracionTiempoEntrega;
                      item.IdConfiguracionTiempoEntregaProveedor =
                        itemAux.IdConfiguracionTiempoEntregaProveedor;
                      item.FechaRegistro = itemAux.FechaRegistro;
                      item.FechaUltimaActualizacion = itemAux.FechaUltimaActualizacion;
                      const datosValorEntrega = await lastValueFrom(
                        this.serviceTimeDelivery.ValorConfiguracionTiempoEntregaObtener(
                          item.IdValorConfiguracionTiempoEntrega,
                        ),
                      );
                      item.ValorEsperado = datosValorEntrega.ValorEsperado;
                      item.idSelected = datosValorEntrega.IdCatUnidadTiempo;
                      listRoute.push(item);
                    }
                    this.store.dispatch(
                      logisticAction.SET_DATAS_TIME_DELIVERY({
                        list: listRoute,
                      }),
                    );
                    this.store.dispatch(logisticAction.UPDATE_ROUTE_LIST_BACKUP());
                    this.store.dispatch(logisticAction.GET_DATAS_PROVIDER());
                  } else {
                    this.store.dispatch(logisticAction.GET_DATAS_PROVIDER());
                  }
                }),
                catchError((error) => {
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
    {dispatch: false},
  );
  // DOCS: OBTIENE DATOS DEL PROVEEDOR
  getDatasProvider = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logisticAction.GET_DATAS_PROVIDER),
        withLatestFrom(this.store.select(providersDetailsSelectors.selectedProvider)),
        mergeMap(async ([action, provider]) => {
          if (provider.IdConfiguracionPagos) {
            const itemConfiguracionPagos = await lastValueFrom(
              this.serviceCuentas.ConfiguracionPagosObtener(provider.IdConfiguracionPagos),
            );
            this.store.dispatch(
              logisticAction.GET_CONFIGURATION_PAYMENT({
                itemConfiguracionPagos,
              }),
            );
          }

          this.store.dispatch(logisticAction.FETCH_ACCOUNTS_BANK_LOAD());
        }),
      ),
    {dispatch: false},
  );
  // DOCS: OBTIENE CUENTAS BANCARIAS
  getAccounstBank$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logisticAction.FETCH_ACCOUNTS_BANK_LOAD),
      withLatestFrom(this.store.select(providersDetailsSelectors.selectedProvider)),
      mergeMap(([action, provider]) => {
        if (provider.IdConfiguracionPagos) {
          return this.serviceCuentas
            .ConfiguracionPagosDatosBancariosConsultaProcess(provider.IdConfiguracionPagos)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener configuracion de pags bancarios',
                  ),
                  response,
                );
                const cardsSaved: ConfiguracionPagosDatosBancariosDetalle[] = filter(
                  response,
                  (o: ConfiguracionPagosDatosBancariosDetalle) => !!o.IdCatMarcaTarjeta,
                );
                this.store.dispatch(logisticAction.UPDATE_CARD_MARK_LIST({cardsSaved}));
                this.store.dispatch(SET_LOADING({payload: false}));
                return logisticAction.FETCH_ACCOUNTS_BANK_SUCCESS({
                  accounts: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener configuracion de pags bancarios',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        }
        return of(SET_LOADING({payload: false}));
      }),
    ),
  );

  // EFECTOR PARA GUARDADO
  savePaymentConditions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logisticAction.SAVE_PAYMENT_CONDITIONS_LOAD),
      withLatestFrom(this.store.select(logisticsAndPaymentsSelectors.selectPaymentconfig)),
      mergeMap(([action, paymentConfig]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.serviceCuentas.ConfiguracionPagosGuardarOActualizar(paymentConfig).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar condiciones de pago',
              ),
              response,
            );
            this.store.dispatch(
              logisticAction.SAVE_PAYMENT_CONDITIONS_SUCCESS({
                IdConfiguracionPagos: extractID(response),
              }),
            );
            return logisticAction.SAVE_PROVIDER_LOAD();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar condiciones de pago',
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

  // DOCS: GUARDA EN Proveedor
  saveProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logisticAction.SAVE_PROVIDER_LOAD),
      withLatestFrom(
        this.store.select(logisticsAndPaymentsSelectors.selectLogistic),
        this.store.select(providersDetailsSelectors.selectedProvider),
      ),
      mergeMap(([action, logistic, provider]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        provider = {
          ...provider,
          IdConfiguracionPagos: logistic.IdConfiguracionPagos,
          TieneFleteExpress: logistic.TieneFleteExpress,
          ConceptoFleteExpress: logistic.ConceptoFleteExpress,
          LeyendaFleteExpress: logistic.LeyendaFleteExpress,
          PrecioFleteExpress: logistic.PrecioFleteExpress,
        };
        return this.serviceProvider.ProveedorGuardarOActualizar(provider).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar proveedor',
              ),
              response,
            );
            this.store.dispatch(providersListActions.SET_SELECTED_PROVIDER({provider}));
            return {
              logistic,
              provider,
            };
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar proveedor',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
      // DOCS: GUARDA EN ValorConfiguracionTiempoEntrega
      withLatestFrom(this.store.select(logisticsAndPaymentsSelectors.getConfigDeliveryTime)),
      switchMap(([{provider, logistic}, routeList]) => {
        if (logistic.TieneFleteExpress) {
          const request: Array<any> = _map(routeList, (o: ValorConfiguracionTiempoEntrega) => {
            return this.serviceTimeDelivery.ValorConfiguracionTiempoEntregaGuardarOActualizar(o);
          });
          return forkJoin(request).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar configuracion tiempo de entrega',
                ),
                response,
              );
              routeList = _map(routeList, (o: ValorConfiguracionTiempoEntrega, index) => {
                return {
                  ...o,
                  IdValorConfiguracionTiempoEntrega: extractID(response[index]),
                };
              });
              this.store.dispatch(logisticAction.SAVE_ROUTE_LIST_SUCCESS({routeList}));
              return routeList;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar configuracion tiempo de entrega',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
        }
        return of(null);
      }),
      withLatestFrom(
        this.store.select(logisticsAndPaymentsSelectors.getConfigDeliveryTimeProvider),
        this.store.select(providersDetailsSelectors.selectedProvider),
      ),
      // DOCS: GUARDA EN ConfiguracionTiempoEntregaProveedor
      switchMap(
        ([routeList, config, provider]: [
          Array<ValorConfiguracionTiempoEntrega>,
          Array<ConfiguracionTiempoEntregaProveedor>,
          Proveedor,
        ]) => {
          if (routeList) {
            config = _map(config, (o: ConfiguracionTiempoEntregaProveedor, index) => {
              return {
                ...o,
                IdValorConfiguracionTiempoEntrega:
                  routeList[index].IdValorConfiguracionTiempoEntrega,
                IdProveedor: provider.IdProveedor,
              };
            });
            const request: Array<any> = _map(config, (o: ConfiguracionTiempoEntregaProveedor) => {
              return this.serviceConfiguracionRelaciones.ConfiguracionTiempoEntregaProveedorGuardarOActualizar(
                o,
              );
            });
            return forkJoin(request).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar configuracion tiempo entrega proveedor',
                  ),
                  response,
                );
                config = _map(config, (o: ConfiguracionTiempoEntregaProveedor, index) => {
                  return {
                    ...o,
                    IdConfiguracionTiempoEntregaProveedor: extractID(response[index]),
                  };
                });
                this.store.dispatch(logisticAction.SAVE_PROVIDER_DELIVERY_TIME_SUCCESS({config}));
                return logisticAction.DELETE_BAK_ACCOUNTS_LOAD();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar configuracion tiempo entrega proveedor',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(
                  SET_LOADING_ERROR({
                    active: true,
                    message: 'Ha ocurrido un error al guardar',
                  }),
                );
                return EMPTY;
              }),
            );
          }
          return of(logisticAction.DELETE_BAK_ACCOUNTS_LOAD());
        },
      ),
    ),
  );

  // DOCS: ELIMINA CUENTAS BANCARIAS
  deleteBakAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logisticAction.DELETE_BAK_ACCOUNTS_LOAD),
      withLatestFrom(this.store.select(logisticsAndPaymentsSelectors.selectAccountstoDelete)),
      mergeMap(([action, accounts]) => {
        if (accounts.length > 0) {
          const request: Array<any> = _map(
            accounts,
            (o: ConfiguracionPagosDatosBancariosDetalle) => {
              return this.serviceCuentas.ConfiguracionPagosDatosBancariosDesactivar(
                o.IdConfiguracionPagosDatosBancarios,
              );
            },
          );
          return forkJoin(request).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar cuentas bancarias',
                ),
                response,
              );
              return logisticAction.SAVE_BANK_ACCOUNTS_LOAD();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar cuentas bancarias',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_ERROR({
                  active: true,
                  message: 'Ha ocurrido un error al guardar',
                }),
              );
              return EMPTY;
            }),
          );
        }
        return of(logisticAction.SAVE_BANK_ACCOUNTS_LOAD());
      }),
    ),
  );

  // DOCS: GUARDA CUENTAS BANCARIAS (DatosBancarios)
  saveAccountsBank$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logisticAction.SAVE_BANK_ACCOUNTS_LOAD),
        withLatestFrom(this.store.select(logisticsAndPaymentsSelectors.selectAccounts)),
        mergeMap(async ([action, accounts]) => {
          for (let item of accounts) {
            const cont = accounts.indexOf(item);
            if (item.DatosBancarios !== null) {
              try {
                // DOCS: SOLO ENTRA SI NO SON TARJETAS DE CREDITO
                if (item.catMedioDePago.Clave !== paymentMethods.creditCard) {
                  const IdDatosBancarios = await lastValueFrom(
                    this.serviceCuentas.DatosBancariosGuardarOActualizar(item.DatosBancarios),
                  );
                  this.store.dispatch(
                    logisticAction.SET_ID_DATOS_BANCARIOS({
                      IdDatosBancarios: extractID(IdDatosBancarios),
                      index: cont,
                    }),
                  );
                  item = {
                    ...item,
                    IdDatosBancarios: extractID(IdDatosBancarios),
                  };
                }
              } catch (error) {
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }
              try {
                const IdConfiguracionPagosDatosBancarios = await lastValueFrom(
                  this.serviceCuentas.ConfiguracionPagosDatosBancariosGuardarOActualizar(item),
                );
                this.store.dispatch(
                  logisticAction.SET_ID_CONFIGURACION_PAGOS_DATOS_BANCARIOS({
                    IdConfiguracionPagosDatosBancarios: extractID(
                      IdConfiguracionPagosDatosBancarios,
                    ),
                    index: cont,
                  }),
                );
              } catch (error) {
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }
            }
          }
          this.store.dispatch(SET_LOADING({payload: false}));
          this.store.dispatch(logisticAction.CLEAN_BACK_UP());
          this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
          this.store.dispatch(SET_LOADING_SUCCESS({active: true, message: 'Has guardado'}));
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
