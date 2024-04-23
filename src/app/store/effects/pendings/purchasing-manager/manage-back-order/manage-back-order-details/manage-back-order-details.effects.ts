import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {forkJoin, of} from 'rxjs';
import {Router} from '@angular/router';
import {map as _map} from 'lodash-es';

/*Actions Imports*/
import {manageBackOrderDetailsActions} from '@appActions/pendings/purchasing-manager/manage-back-order';
/*Selectors Import*/
import {manageBackOrderDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/manage-back-order';
/*Models Imports*/
import * as apiLogistic from 'api-logistica';
import {ParametroModificacionMasivaBackOrder} from 'api-logistica';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import * as servicesLogger from '@appUtil/logger';
import {
  IItems,
  IOrdersBackOrder,
} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-details/manage-back-order-details.models';
import {RETURN_EMPTY, SET_LOADING} from '@appActions/utils/utils.action';
import * as apiCatalogs from 'api-catalogos';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'Manage-Back-Order-Details';

@Injectable()
export class ManageBackOrderDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private purchaseOrderBackOrder: apiLogistic.ProcesosL06OrdenDeCompraGestionarBackOrderService,
    private purchaseOrderItems: apiLogistic.ProcesosL06OrdenDeCompraPartidasModificacionesService,
    private itemsBackOrderServices: apiLogistic.ProcesosL06OrdenDeCompraPartidasService,
    private contactsServiceProviders: apiCatalogs.ConfiguracionProveedoresService,
  ) {}

  setProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manageBackOrderDetailsActions.SET_PROVIDER_SELECTED),
      mergeMap((action) => {
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.manageBackOrder.manageBackOrder,
          appRoutes.manageBackOrder.details,
        ]);
        this.store.dispatch(manageBackOrderDetailsActions.LOAD_CONTACTS_PROVIDER());
        this.store.dispatch(manageBackOrderDetailsActions.FETCH_FAMILIES_LOAD());
        return of(RETURN_EMPTY());
      }),
    ),
  );

  getProviderContacts = createEffect(() =>
    this.actions$.pipe(
      ofType(manageBackOrderDetailsActions.LOAD_CONTACTS_PROVIDER),
      withLatestFrom(this.store.select(manageBackOrderDetailsSelectors.selectProvider)),
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
              return manageBackOrderDetailsActions.SET_PROVIDER_CONTACT({
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
  // FIXME: Corregir por cambio en modelos
  /*fetchFamilies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manageBackOrderDetailsActions.FETCH_FAMILIES_LOAD),
      withLatestFrom(
        this.store.select(manageBackOrderDetailsSelectors.selectProvider),
      ),
      mergeMap(([action, provider]) => {
        const params = new FiltersOnlyActive();
        params.Filters.push({
          NombreFiltro: 'IdProveedor',
          ValorFiltro: provider.IdProveedor,
        });
        return this.purchaseOrderBackOrder
          .vOcProveedorFamiliaBackOrderQueryResult(params)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta Familias.',
                ),
                response,
              );

              return manageBackOrderDetailsActions.FETCH_FAMILIES_SUCCESS({
                families: _.map(response.Results, (family, index) => {
                  return {
                    ...family,
                    selectedOrder: {} as IOrdersBackOrder,
                    orders: [],
                    needsToReloadOrders: true,
                    selectedProduct: {} as IProduct,
                    products: [],
                    needsToReloadProducts: true,
                    index: index + 1,
                  };
                }),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Consulta Familias.',
                ),
                error,
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );*/
  fetchOrdersBackOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        manageBackOrderDetailsActions.FETCH_ORDERS_LOAD,
        manageBackOrderDetailsActions.FETCH_FAMILIES_SUCCESS,
      ),
      withLatestFrom(this.store.select(manageBackOrderDetailsSelectors.selectFamily)),
      mergeMap(([action, family]) => {
        if (family.needsToReloadOrders) {
          const params = new FiltersOnlyActive();
          params.Filters.push(
            {
              NombreFiltro: 'IdFamilia',
              // FIXME: Corregir por cambio en modelos
              ValorFiltro: 'family.IdFamilia',
              /*ValorFiltro: family.IdFamilia,*/
            },
            {
              NombreFiltro: 'PorCancelar',
              ValorFiltro: true,
            },
          );
          return this.purchaseOrderBackOrder.vOcOrdenDeCompraGBackOrderQueryResult(params).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta Ordenes de Compra.',
                ),
                response,
              );
              return manageBackOrderDetailsActions.FETCH_ORDERS_SUCCESS({
                orders: _map(
                  response.Results,
                  (order, index): IOrdersBackOrder => {
                    return {
                      ...order,
                      items: [],
                      needsToReloadItems: true,
                      index: index + 1,
                    };
                  },
                ),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Consulta Ordenes de Compra.',
                ),
                error,
              );
              return of(RETURN_EMPTY());
            }),
          );
        } else {
          return of(RETURN_EMPTY());
        }
      }),
    ),
  );
  // Obtener Items de la OC
  fetchItemsBackOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        manageBackOrderDetailsActions.FETCH_ITEMS_LOAD,
        manageBackOrderDetailsActions.FETCH_ORDERS_SUCCESS,
      ),
      withLatestFrom(this.store.select(manageBackOrderDetailsSelectors.selectOrder)),
      mergeMap(([action, order]) => {
        if (order.needsToReloadItems) {
          const params = new FiltersOnlyActive();
          params.Filters.push(
            {
              NombreFiltro: 'IdOcOrdenDeCompra',
              ValorFiltro: order.IdOcOrdenDeCompra,
            },
            {NombreFiltro: 'PorCancelar', ValorFiltro: true},
          );
          return this.purchaseOrderBackOrder.vOcPartidaGBackOrderQueryResult(params).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta partidas de la OC.',
                ),
                response,
              );
              return manageBackOrderDetailsActions.FETCH_ITEMS_SUCCESS({
                items: _map(
                  response.Results,
                  (item, index): IOrdersBackOrder => {
                    // FIXME: Los tipados no coinciden. Revisar.
                    return {
                      ...item,
                      index: index + 1,
                      sendStock: false,
                      cancel: false,
                    } as IOrdersBackOrder;
                  },
                ),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Consulta partidas de la OC.',
                ),
                error,
              );
              return of(RETURN_EMPTY());
            }),
          );
        } else {
          return of(RETURN_EMPTY());
        }
      }),
    ),
  );
  // Obtener Partidas Por Gestionar
  fetchItemsManage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        manageBackOrderDetailsActions.FETCH_PRODUCTS_LOAD,
        manageBackOrderDetailsActions.SET_FILTER_TYPE,
        manageBackOrderDetailsActions.FETCH_FAMILIES_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(manageBackOrderDetailsSelectors.selectFamily),
        this.store.select(manageBackOrderDetailsSelectors.selectSelectedTab),
      ),
      mergeMap(([action, family, tab]) => {
        if (family.needsToReloadProducts && tab.id === '2') {
          const params = new FiltersOnlyActive();
          params.Filters.push(
            {
              NombreFiltro: 'IdFamilia',
              // FIXME: Corregir por cambio en modelos
              ValorFiltro: 'family.IdFamilia',
              /*ValorFiltro: family.IdFamilia,*/
            },
            {
              NombreFiltro: 'PartidaPorGestionar',
              ValorFiltro: true,
            },
          );
          return this.purchaseOrderBackOrder.vOcProductoTotalesGBackOrderQueryResult(params).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta partidas de la OC.',
                ),
                response,
              );
              return manageBackOrderDetailsActions.FETCH_PRODUCTS_SUCCESS({
                list: _map(response.Results, (item, index) => {
                  return {
                    ...item,
                    index: index + 1,
                    items: [],
                    needsToReloadItems: true,
                    history: [],
                  };
                }),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Consulta partidas de la OC.',
                ),
                error,
              );
              return of(RETURN_EMPTY());
            }),
          );
        } else {
          return of(RETURN_EMPTY());
        }
      }),
    ),
  );
  // Obtener  Items
  fetchItemsProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        manageBackOrderDetailsActions.FETCH_PRODUCTS_LOAD,
        manageBackOrderDetailsActions.FETCH_PRODUCTS_SUCCESS,
        manageBackOrderDetailsActions.SELECTED_PRODUCT,
      ),
      withLatestFrom(
        this.store.select(manageBackOrderDetailsSelectors.selectProduct),
        this.store.select(manageBackOrderDetailsSelectors.selectSelectedTab),
      ),
      mergeMap(([action, product, tab]) => {
        if (product.needsToReloadItems) {
          this.store.dispatch(
            manageBackOrderDetailsActions.SET_STATUS_ITEMS({
              status: API_REQUEST_STATUS_LOADING,
              param: 'selectedProduct',
              itemParam: 'statusApiItems',
            }),
          );
          const params = new FiltersOnlyActive();
          params.Filters.push(
            {
              NombreFiltro: 'IdProducto',
              ValorFiltro: product.IdProducto,
            },
            {
              NombreFiltro: 'PorGestionar',
              ValorFiltro: true,
            },
          );
          return this.purchaseOrderBackOrder.vOcPartidaGBackOrderQueryResult(params).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta partidas de la OC.',
                ),
                response,
              );
              this.store.dispatch(
                manageBackOrderDetailsActions.SET_STATUS_ITEMS({
                  status: API_REQUEST_STATUS_SUCCEEDED,
                  param: 'selectedProduct',
                  itemParam: 'statusApiItems',
                }),
              );
              this.store.dispatch(
                manageBackOrderDetailsActions.GET_HISTORY_BACK_ORDER_LOAD({
                  product,
                }),
              );
              return manageBackOrderDetailsActions.FETCH_ITEMS_PRODUCTS_SUCCESS({
                items: _map(response.Results, (item, index) => {
                  return {...item, index: index + 1};
                }),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Consulta partidas de la OC.',
                ),
                error,
              );
              this.store.dispatch(
                manageBackOrderDetailsActions.SET_STATUS_ITEMS({
                  status: API_REQUEST_STATUS_FAILED,
                  param: 'selectedProduct',
                  itemParam: 'statusApiItems',
                }),
              );
              return of(RETURN_EMPTY());
            }),
          );
        } else {
          return of(RETURN_EMPTY());
        }
      }),
    ),
  );
  saveToManage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manageBackOrderDetailsActions.SAVE_TO_MANAGE_LOAD),
      withLatestFrom(
        this.store.select(manageBackOrderDetailsSelectors.selectProduct),
        this.store.select(manageBackOrderDetailsSelectors.selectProvider),
        this.store.select(manageBackOrderDetailsSelectors.selectStatus),
      ),
      mergeMap(([action, product, provider, status]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const params: ParametroModificacionMasivaBackOrder = {
          IdProducto: product.IdProducto,
          IdProveedor: provider.IdProveedor,
          ContinuarBackOrder: status.value === '1',
          ProductoDescontinuado: status.value === '2',
          Ninguna: false,
          ProductoDisponible: status.value === '3',
          JustificacionProductoDescontinuado:
            status.value === '2' ? action.data.justification : null,
          GenerarNuevasOrdenesDeCompra:
            status.value === '3' ? action.data.dataAvailable.isNewOc : null,
          ContinuarConLaOrdenDeCompra:
            status.value === '3' ? action.data.dataAvailable.isOldOc : null,
          FechaEstimadaDeArribo:
            status.value === '3' ? action.data.dataAvailable.estimatedArrival : null,
        };
        return this.purchaseOrderBackOrder.ModificacionMasivaBackOrderProcess(params).pipe(
          map((response) => {
            if (status.value !== '1') {
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(manageBackOrderDetailsActions.SHOW_POP_UP({status: false}));
            }
            return status.value === '1'
              ? manageBackOrderDetailsActions.UPDATE_ITEMS_BACK_ORDER_LOAD({
                  data: action.data.backOrderContinue,
                })
              : manageBackOrderDetailsActions.FETCH_FAMILIES_LOAD();
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manageBackOrderDetailsActions.UPDATE_ITEMS_BACK_ORDER_LOAD),
      withLatestFrom(this.store.select(manageBackOrderDetailsSelectors.selectProduct)),
      mergeMap(([action, product]) => {
        const request = _map(product.items, (o) =>
          this.purchaseOrderItems.ocPartidaEdicionBackOrderFEEGuardarOActualizar({
            ...o,
            IdOcPartidaEdicionBackOrder: DEFAULT_UUID,
            // FIXME: Se pasaron a string pero no se validó que funcione
            FechaMonitoreo: action.data.nextMonitoring.toString(),
            FechaEstimadaDisponibilidadProveedor: action.data.fdp.toString(),
            FechaEstimadaEntrega: action.data.newFEE.toString(),
            Justificacion: action.data.reason,
          }),
        );
        this.store.dispatch(manageBackOrderDetailsActions.SHOW_POP_UP({status: false}));

        return forkJoin(request).pipe(
          map((response) => {
            // return manageBackOrderDetailsActions.SAVE_TO_MANAGE_SUCCESS();
            this.store.dispatch(SET_LOADING({payload: false}));
            return manageBackOrderDetailsActions.FETCH_FAMILIES_LOAD();
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );
  /*** GUARDADO DE PARTIDAS POR CANCELAR ***/
  saveItemsCancel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manageBackOrderDetailsActions.SAVE_ITEMS_CANCEL_LOAD),
      withLatestFrom(
        this.store.select(manageBackOrderDetailsSelectors.selectItemsCancel),
        this.store.select(manageBackOrderDetailsSelectors.selectItemsSotck),
      ),
      mergeMap(([action, list, listStock]) => {
        if (list && list.length > 0) {
          this.store.dispatch(SET_LOADING({payload: true}));
          const request = _map(list, (item: IItems) => {
            return this.itemsBackOrderServices.ocPartidaDesactivar(item.IdOcPartida);
          });
          return forkJoin(request).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Eliminación en OcPartida.',
                ),
                response,
              );
              if (listStock && listStock.length > 0) {
                return manageBackOrderDetailsActions.SAVE_ITEMS_STOCK_LOAD();
              } else {
                this.store.dispatch(SET_LOADING({payload: false}));
                return manageBackOrderDetailsActions.SAVE_ITEMS_CANCEL_SUCCESS();
              }
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Eliminación en OcPartida.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(RETURN_EMPTY());
            }),
          );
        } else {
          return of(manageBackOrderDetailsActions.SAVE_ITEMS_STOCK_LOAD());
        }
      }),
    ),
  );
  saveSendStock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manageBackOrderDetailsActions.SAVE_ITEMS_STOCK_LOAD),
      withLatestFrom(this.store.select(manageBackOrderDetailsSelectors.selectItemsSotck)),
      mergeMap(([action, list]) => {
        const request = _map(list, (o) => {
          return this.itemsBackOrderServices.ocPartidaGuardarOActualizar({
            ...o,
            IdOCPendienteCompraProducto: null,
          });
        });
        return forkJoin(request).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Guardado en OcPartida.',
              ),
              response,
            );
            return list;
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Guardado en OcPartida.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(RETURN_EMPTY());
          }),
        );
      }),
      switchMap((data: Array<IItems>) => {
        const request = _map(data, (item) => {
          return this.purchaseOrderItems.ocPartidaEdicionBackOrderFEEGuardarOActualizar({
            ...item,
            Activo: false,
            EnviarAStock: true,
          });
        });
        return forkJoin(request).pipe(
          map((response) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return manageBackOrderDetailsActions.FETCH_FAMILIES_LOAD();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Guardado en OcPartidaEdicionBackOrder.',
              ),
              error,
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );
  getHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(manageBackOrderDetailsActions.GET_HISTORY_BACK_ORDER_LOAD),
      mergeMap((action) => {
        const params = new FiltersOnlyActive();
        params.Filters.push({
          NombreFiltro: 'IdProducto',
          ValorFiltro: action.product.IdProducto,
        });
        return this.purchaseOrderBackOrder
          .HistorialBackOrderProcess(action.product.IdProducto)
          .pipe(
            map((response) => {
              return manageBackOrderDetailsActions.GET_HISTORY_BACK_ORDER_SUCCESS({
                history: response,
              });
            }),
          );
      }),
    ),
  );
}
