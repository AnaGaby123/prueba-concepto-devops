import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {filter, flow, isEmpty, map as _map} from 'lodash-es';

/*Actions Imports*/
import {
  registerConfirmationActions,
  registerConfirmationDetailsActions,
} from '@appActions/pendings/purchasing-manager/register-confirmation';
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
/*Selectors Imports*/
import {registerConfirmationDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/register-confirmation';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import * as apiLogistic from 'api-logistica';
import {
  QueryResultVOcOrdenDeCompra,
  QueryResultVOcPartidaDetalle,
  VOcOrdenDeCompra,
  VOcPartidaDetalle,
} from 'api-logistica';
import {lastValueFrom, of} from 'rxjs';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import * as servicesLogger from '@appUtil/logger';
import {Router} from '@angular/router';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  MINIO_BUCKETS,
} from '@appUtil/common.protocols';
import {
  IItemsFamily,
  initialItem,
  initialOcPartidaCancelacion,
  initialOcPartidaEdicionBackOrder,
  initialOcPartidaEdicionConImpactoFEE,
  initialOcPartidaEdicionSinImpactoFEE,
  IOrdersFamily,
  TYPES_OF_CONFIG,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {
  GET_CAT_MEDIO_DE_PAGO_LOAD,
  GET_CAT_PAYMENT_CONDITIONS_LOAD,
} from '@appActions/catalogs/catalogos.actions';
import {
  selectCatMedioDePagoForDropDown,
  selectCatPaymentConditionsForDropDown,
} from '@appSelectors/catalogs/catalogs.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {extractID} from '@appUtil/util';
import * as apiCatalogs from 'api-catalogos';
import {ArchivoDetalle, RequestMoverArchivo, UrlSubirArchivo} from 'api-catalogos';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'register-confirmation-details.effects.ts';

@Injectable()
export class RegisterConfirmationDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private purchaseOrderServices: apiLogistic.ProcesosL06OrdenDeCompraService,
    private purchaseOrderDashboardServices: apiLogistic.ProcesosL06OrdenDeCompraDashboardService,
    private purchaseOrderItemServices: apiLogistic.ProcesosL06OrdenDeCompraPartidasService,
    private purchaseOrderItemModificationServices: apiLogistic.ProcesosL06OrdenDeCompraPartidasModificacionesService,
    private filesSystemService: apiCatalogs.SistemaArchivosService,
    private contactsServiceProviders: apiCatalogs.ConfiguracionProveedoresService,
  ) {}

  viewDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerConfirmationDetailsActions.SET_PROVIDER_SELECTED),
      mergeMap((action) => {
        this.store.dispatch(GET_CAT_PAYMENT_CONDITIONS_LOAD());
        this.store.dispatch(GET_CAT_MEDIO_DE_PAGO_LOAD());
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        this.router
          .navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.registerConfirmation.registerConfirmation,
            appRoutes.registerConfirmation.details,
          ])
          .then(() => {
            this.store.dispatch(
              registerConfirmationActions.SET_IS_DETAILS({
                detailsMode: true,
              }),
            );
          });

        this.store.dispatch(registerConfirmationDetailsActions.FETCH_FAMILIES_LOAD());
        return of(RETURN_EMPTY());
      }),
    ),
  );
  // FIXME: Corregir por cambio en modelos
  /*fetchFamilies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerConfirmationDetailsActions.FETCH_FAMILIES_LOAD),
      withLatestFrom(
        this.store.select(registerConfirmationDetailsSelectors.selectProvider),
      ),
      mergeMap(([action, provider]) => {
        const params = new FiltersOnlyActive();
        params.Filters.push({
          NombreFiltro: 'IdProveedor',
          ValorFiltro: provider.IdProveedor,
        });
        return this.purchaseOrderConfirmationServices
          .vOcProveedorFamiliaNoConfirmadaQueryResult(params)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las familias.',
                ),
                response,
              );
              const families: Array<IFamily> = _map(response.Results, (o) => ({
                ...o,
                isSelected: false,
                needsToReloadOrders: true,
                purchaseOrders: [],
                selectedTabOption: initialSelectedTabOption(),
                selectedPaymentMedia: {} as DropListOption,
                selectedPaymentConditions: {} as DropListOption,
              }));
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              this.store.dispatch(
                registerConfirmationDetailsActions.PROVIDER_CONTACTS_LOAD(),
              );
              return registerConfirmationDetailsActions.FETCH_FAMILIES_SUCCESS({
                list: families,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las familias.',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );*/

  // Docs Obtener los contactos del proveedor
  getProviderContacts = createEffect(() =>
    this.actions$.pipe(
      ofType(registerConfirmationDetailsActions.PROVIDER_CONTACTS_LOAD),
      withLatestFrom(this.store.select(registerConfirmationDetailsSelectors.selectProvider)),
      mergeMap(([action, provider]) => {
        return this.contactsServiceProviders
          .ProveedorExtensionsObtenerListaContactoDetalle(provider.IdProveedor)
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
              return registerConfirmationDetailsActions.SET_PROVIDER_CONTACT({
                contacts: response,
              });
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
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );

  // Obtener ordenes de compra
  fetchPurchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        registerConfirmationDetailsActions.FETCH_FAMILIES_SUCCESS,
        registerConfirmationDetailsActions.FETCH_PURCHASE_ORDERS_LOAD,
        registerConfirmationDetailsActions.SET_SELECTED_FAMILY,
        registerConfirmationDetailsActions.SET_SELECTED_TAB_OPTION,
        registerConfirmationDetailsActions.SET_SEARCH_TERM,
        registerConfirmationDetailsActions.REFRESH_PURCHASE_ORDERS,
      ),
      withLatestFrom(
        this.store.select(registerConfirmationDetailsSelectors.selectGetOrdersFilters),
        this.store.select(registerConfirmationDetailsSelectors.selectedFamily),
        this.store.select(selectCatMedioDePagoForDropDown),
        this.store.select(selectCatPaymentConditionsForDropDown),
      ),
      mergeMap(([action, params, family, paymentMedia, paymentConditions]) => {
        if (isEmpty(family)) {
          this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          this.store.dispatch(
            registerConfirmationDetailsActions.SET_ORDERS_STATUS({
              ordersStatus: API_REQUEST_STATUS_FAILED,
            }),
          );
          return of(RETURN_EMPTY());
        }
        if (family.needsToReloadOrders) {
          this.store.dispatch(
            registerConfirmationDetailsActions.SET_ORDERS_STATUS({
              ordersStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
          this.store.dispatch(
            registerConfirmationDetailsActions.SET_ITEMS_STATUS({
              itemsStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
          return this.purchaseOrderDashboardServices.vOcOrdenDeCompraQueryResult(params).pipe(
            map((response: QueryResultVOcOrdenDeCompra) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar ordenes de compra.',
                ),
                response,
              );
              const orders: Array<IOrdersFamily> = _map(
                response.Results,
                (order: VOcOrdenDeCompra, index: number) => ({
                  ...order,
                  Index: index,
                  isSelected: index === 0,
                  needsToReloadItems: true,
                  items: [],
                  statusItems: API_REQUEST_STATUS_DEFAULT,
                  selectedPaymentMedia: this.getPaymentMedia(paymentMedia, order.IdCatMedioDePago),
                  selectedPaymentConditions: this.getPaymentConditions(
                    paymentConditions,
                    order.IdCatCondicionesDePago,
                  ),
                }),
              );
              this.store.dispatch(
                registerConfirmationDetailsActions.INITIAL_PURCHASE_ORDER({
                  order: {
                    ...orders[0],
                  },
                }),
              );
              this.store.dispatch(
                registerConfirmationDetailsActions.SET_ORDERS_STATUS({
                  ordersStatus: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              if (isEmpty(orders)) {
                this.store.dispatch(
                  registerConfirmationDetailsActions.SET_ITEMS_STATUS({
                    itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
                  }),
                );
              }
              return registerConfirmationDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS({
                orders,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar ordenes de compra.',
                ),
                error,
              );
              this.store.dispatch(
                registerConfirmationDetailsActions.SET_ORDERS_STATUS({
                  ordersStatus: API_REQUEST_STATUS_FAILED,
                }),
              );
              return of(RETURN_EMPTY());
            }),
          );
        } else {
          this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          return of(registerConfirmationDetailsActions.FETCH_ITEMS_LOAD());
        }
      }),
    ),
  );

  // Obtener partidas
  fetchItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        registerConfirmationDetailsActions.FETCH_ITEMS_LOAD,
        registerConfirmationDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS,
        registerConfirmationDetailsActions.SET_SELECTED_ORDER,
        registerConfirmationDetailsActions.CONFIRM_ITEMS_SUCCESS,
      ),
      withLatestFrom(this.store.select(registerConfirmationDetailsSelectors.selectedFamily)),
      mergeMap(([action, family]) => {
        if (!isEmpty(family.selectedOrder) && family.selectedOrder.needsToReloadItems) {
          this.store.dispatch(
            registerConfirmationDetailsActions.SET_ITEMS_STATUS({
              itemsStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
          const params = new FiltersOnlyActive(true);
          params.Filters.push(
            {
              NombreFiltro: 'IdOcOrdenDeCompra',
              ValorFiltro: family.selectedOrder.IdOcOrdenDeCompra,
            },
            {
              NombreFiltro: 'Confirmada',
              ValorFiltro: false,
            },
          );
          params.SortField = 'Indice';
          params.SortDirection = 'asc';
          return this.purchaseOrderItemServices.vOcPartidaDetalleQueryResult(params).pipe(
            map((response: QueryResultVOcPartidaDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar partidas de  la orden de compra.',
                ),
                response,
              );
              this.store.dispatch(
                registerConfirmationDetailsActions.SET_ITEMS_STATUS({
                  itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              if (action.type === '[RegisterConfirmationDetails] Confirm Items of Order Success') {
                if (isEmpty(response.Results)) {
                  return registerConfirmationDetailsActions.REFRESH_PURCHASE_ORDERS();
                }
                this.store.dispatch(
                  registerConfirmationDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER(),
                );
              }
              const items: Array<Array<IItemsFamily>> = _map(
                response.Results,
                (o: VOcPartidaDetalle, index: number) => [
                  {
                    ...o,
                    Index: index,
                    Number: index + 1,
                    NumberToSave: o.ocPartida.SubIndice
                      ? Number(`${o.ocPartida.Indice}.${o.ocPartida.SubIndice}`)
                      : o.ocPartida.Indice,
                    tempId: o.IdOcPartida,
                    tempNumeroDePiezas: o.NumeroDePiezas,
                    tempPrecioLista: o.PrecioLista,
                    tempTotalPartida: o.TotalPartida,
                    tempFechaEstimadaDeArribo: o.FechaEstimadaDeArribo,
                    ...initialItem(),
                    ocPartida: {
                      ...o.ocPartida,
                    },
                    ocPartidaCancelacion: {
                      ...initialOcPartidaCancelacion(),
                      IdOcPartida: o.IdOcPartida,
                    },
                    ocPartidaEdicionBackOrder: {
                      ...initialOcPartidaEdicionBackOrder(),
                      IdOcPartida: o.IdOcPartida,
                    },
                    ocPartidaEdicionConImpactoFEE: {
                      ...initialOcPartidaEdicionConImpactoFEE(),
                      IdOcPartida: o.IdOcPartida,
                    },
                    ocPartidaEdicionSinImpactoFEE: {
                      ...initialOcPartidaEdicionSinImpactoFEE(),
                      IdOcPartida: o.IdOcPartida,
                    },
                  },
                ],
              );
              return registerConfirmationDetailsActions.FETCH_ITEMS_SUCCESS({
                list: items,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar partidas de  la orden de compra.',
                ),
                error,
              );
              this.store.dispatch(
                registerConfirmationDetailsActions.SET_ITEMS_STATUS({
                  itemsStatus: API_REQUEST_STATUS_FAILED,
                }),
              );
              return of(RETURN_EMPTY());
            }),
          );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );
  // Confirmar partidas
  confirmItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerConfirmationDetailsActions.CONFIRM_ITEMS_LOAD),
      withLatestFrom(this.store.select(registerConfirmationDetailsSelectors.selectedOrder)),
      mergeMap(([action, order]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        return this.purchaseOrderServices.ocOrdenDeCompraGuardarOActualizar(order).pipe(
          map((response: string) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar la orden de compra.',
              ),
              response,
            );
            return order;
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar la orden de compra.',
              ),
              error,
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            this.store.dispatch(
              registerConfirmationDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER_FAILED(),
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
      withLatestFrom(this.store.select(registerConfirmationDetailsSelectors.selectItems)),
      mergeMap(async ([order, itemsArray]) => {
        if (!isEmpty(itemsArray)) {
          // Iterar arreglo de arreglos
          for (let i = 0; i < itemsArray.length; i++) {
            const secondArray: Array<IItemsFamily> = [...itemsArray[i]];
            // Iterar arreglo de items
            for (let j = 0; j < secondArray.length; j++) {
              const item: IItemsFamily = {...secondArray[j]};
              const typeOfConfig = item.cancelConfig
                ? TYPES_OF_CONFIG.cancel
                : item.backOrderConfig
                ? TYPES_OF_CONFIG.backOrder
                : item.impactConfig
                ? TYPES_OF_CONFIG.impact
                : item.withoutImpactConfig
                ? TYPES_OF_CONFIG.withoutImpact
                : null;
              const itemId = extractID(
                await lastValueFrom(
                  this.purchaseOrderItemServices.ocPartidaGuardarOActualizar(item.ocPartida),
                ),
              );
              if (!itemId) {
                this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
                this.store.dispatch(
                  utilsActions.SET_LOADING_ERROR({
                    active: true,
                    message: 'Ha ocurrido un error en el servicio web.',
                  }),
                );
                return registerConfirmationDetailsActions.CONFIRM_ITEMS_FAILED();
              }
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar la confirmación de la ocPartida.',
                ),
                itemId,
              );

              const uploads = {
                [TYPES_OF_CONFIG.backOrder]: (url) => {
                  return fetch(url.UploadUrl, {
                    method: 'PUT',
                    body: item.ocPartidaEdicionBackOrder.File,
                  });
                },
                [TYPES_OF_CONFIG.impact]: (url) => {
                  return fetch(url.UploadUrl, {
                    method: 'PUT',
                    body: item.ocPartidaEdicionConImpactoFEE.File,
                  });
                },
              };

              const moves = {
                [TYPES_OF_CONFIG.backOrder]: (requestMoverArchivo) => {
                  const date = new Date();
                  const request: RequestMoverArchivo = {
                    ...requestMoverArchivo,
                    DestinyFileName: `${date.getFullYear()}/${item.IdProveedor}/${
                      item.IdOcOrdenDeCompra
                    }/${Date.now()}/${item.ocPartidaEdicionBackOrder.File.name}`,
                  };
                  return lastValueFrom(
                    this.filesSystemService.ArchivoExtensionsMoverArchivoMinIO(request),
                  );
                },
                [TYPES_OF_CONFIG.impact]: (requestMoverArchivo) => {
                  const date = new Date();
                  const request: RequestMoverArchivo = {
                    ...requestMoverArchivo,
                    DestinyFileName: `${date.getFullYear()}/${item.IdProveedor}/${
                      item.IdOcOrdenDeCompra
                    }/${Date.now()}/${item.ocPartidaEdicionConImpactoFEE.File.name}`,
                  };
                  return lastValueFrom(
                    this.filesSystemService.ArchivoExtensionsMoverArchivoMinIO(request),
                  );
                },
              };

              const configs = {
                [TYPES_OF_CONFIG.cancel]: (fileId) => {
                  const itemCancel = {
                    ...item.ocPartidaCancelacion,
                    IdOcPartida: itemId,
                  };
                  return lastValueFrom(
                    this.purchaseOrderItemModificationServices.ocPartidaCancelacionGuardarOActualizar(
                      itemCancel,
                    ),
                  );
                },
                [TYPES_OF_CONFIG.backOrder]: (fileId) => {
                  const itemBackOrder = {
                    ...item.ocPartidaEdicionBackOrder,
                    IdOcPartida: itemId,
                    IdArchivo: fileId,
                  };
                  return lastValueFrom(
                    this.purchaseOrderItemModificationServices.ocPartidaEdicionBackOrderFEEGuardarOActualizar(
                      itemBackOrder,
                    ),
                  );
                },
                [TYPES_OF_CONFIG.impact]: (fileId) => {
                  const itemImpact = {
                    ...item.ocPartidaEdicionConImpactoFEE,
                    IdOcPartida: itemId,
                    IdArchivo: fileId,
                  };
                  return lastValueFrom(
                    this.purchaseOrderItemModificationServices.ocPartidaEdicionConImpactoFEEGuardarOActualizar(
                      itemImpact,
                    ),
                  );
                },
                [TYPES_OF_CONFIG.withoutImpact]: (fileId) => {
                  const itemWithoutImpact = {
                    ...item.ocPartidaEdicionSinImpactoFEE,
                    IdOcPartida: itemId,
                  };
                  return lastValueFrom(
                    this.purchaseOrderItemModificationServices.ocPartidaEdicionSinImpactoFEEGuardarOActualizar(
                      itemWithoutImpact,
                    ),
                  );
                },
              };

              if (typeOfConfig) {
                let fileId = null;
                if (
                  typeOfConfig === TYPES_OF_CONFIG.backOrder ||
                  typeOfConfig === TYPES_OF_CONFIG.impact
                ) {
                  const url: UrlSubirArchivo = await lastValueFrom(
                    this.filesSystemService.ArchivoExtensionsObtenerUrlSubirArchivo(),
                  );
                  const upload: Response = await uploads[typeOfConfig](url);
                  const requestMoverArchivo: RequestMoverArchivo = {
                    OriginBucketName: url.BucketName,
                    OriginFileName: url.FileKey,
                    DestinyBucketName: MINIO_BUCKETS.Purchases,
                    DestinyFileName: '',
                  };
                  const fileDetail: ArchivoDetalle = await moves[typeOfConfig](requestMoverArchivo);
                  fileId = fileDetail.IdArchivo;
                }
                const response = await configs[typeOfConfig](fileId);
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar la configuración de la ocPartida.',
                  ),
                  itemId,
                );
              }
            }
          }
          this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          this.store.dispatch(
            utilsActions.SET_LOADING_SUCCESS({
              active: true,
              message: 'Has registrado confirmación',
            }),
          );
          return registerConfirmationDetailsActions.CONFIRM_ITEMS_SUCCESS();
        }
        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        return registerConfirmationDetailsActions.CONFIRM_ITEMS_FAILED();
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al guardar la confirmación de la ocPartida.',
          ),
          error,
        );
        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        return of(registerConfirmationDetailsActions.CONFIRM_ITEMS_FAILED());
      }),
    ),
  );

  // Refrescar orden de compra seleccionada
  fetchSelectedPurchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerConfirmationDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER),
      withLatestFrom(this.store.select(registerConfirmationDetailsSelectors.selectedOrderId)),
      mergeMap(([action, orderId]) => {
        const params = new FiltersOnlyActive(true);
        params.Filters.push({
          NombreFiltro: 'IdOcOrdenDeCompra',
          ValorFiltro: orderId,
        });
        return this.purchaseOrderDashboardServices.vOcOrdenDeCompraQueryResult(params).pipe(
          map((response: QueryResultVOcOrdenDeCompra) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al refrescar la orden de compra seleccionada.',
              ),
              response,
            );

            return registerConfirmationDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER_SUCCESS({
              order: response.Results[0],
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al consultar ordenes de compra.',
              ),
              error,
            );
            this.store.dispatch(
              registerConfirmationDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER_FAILED(),
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );

  getPaymentMedia(
    catPaymentMedia: Array<DropListOption>,
    IdCatMedioDePago: string,
  ): DropListOption {
    return flow(
      () =>
        !isEmpty(catPaymentMedia) && IdCatMedioDePago
          ? filter(catPaymentMedia, (o: DropListOption) => o.value === IdCatMedioDePago)
          : [],
      (filter) => (!isEmpty(filter) ? filter[0] : ({} as DropListOption)),
    )();
  }

  getPaymentConditions(
    catPaymentConditions: Array<DropListOption>,
    IdCatCondicionesDePago: string,
  ): DropListOption {
    return flow(
      () =>
        !isEmpty(catPaymentConditions) && IdCatCondicionesDePago
          ? filter(catPaymentConditions, (o: DropListOption) => o.value === IdCatCondicionesDePago)
          : [],
      (filter) => (!isEmpty(filter) ? filter[0] : ({} as DropListOption)),
    )();
  }
}
