/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {NGXLogger} from 'ngx-logger';
import {EMPTY, lastValueFrom, of} from 'rxjs';
import * as servicesLogger from '@appUtil/logger';

/* Actions Imports */
import {
  confirmDispatchDetailsActions,
  confirmDispatchListActions,
} from '@appActions/pendings/purchasing-manager/confirm-dispatch';

/* Selectors Imports */
import {
  confirmDispatchDetailsSelectors,
  confirmDispatchSelectors,
} from '@appSelectors/pendings/purchasing-manager/confirm-dispatch';

/* Models Imports */
import {
  IItem,
  initialIItem,
  IPurchaseOrder,
} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-details/confirm-dispatch-details.models';
import {
  initialOcPartidaCancelacion,
  initialOcPartidaEdicionBackOrder,
  TYPES_OF_CONFIG,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {
  OcPartida,
  ProcesosL06OrdenDeCompraDeclararArribosService,
  ProcesosL06OrdenDeCompraPartidasModificacionesService,
  ProcesosL06OrdenDeCompraPartidasService,
  ProcesosL07ImportacionesConfirmarDespachoService,
  ProcesosL07ImportacionesService,
  QueryResultVImpCDOrdenesDeCompra,
  QueryResultVImpCDProveedores,
  QueryResultVOcPartidaDetalle,
} from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import {
  ArchivoDetalle,
  RequestMoverArchivo,
  SistemaArchivosService,
  UrlSubirArchivo,
} from 'api-catalogos';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {MinioService} from '@appServices/minio/minio.service';

/* Utils Imports */
import {isEmpty, map as _map} from 'lodash-es';

import * as utilsActions from '@appActions/utils/utils.action';
import {extractID} from '@appUtil/util';

/* Common Imports */
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  MINIO_BUCKETS,
} from '@appUtil/common.protocols';
import {selectIdUser} from '@appSelectors/auth/auth.selectors';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'confirm-dispatch-details.effects.ts';

@Injectable()
export class ConfirmDispatchDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private minioService: MinioService,
    private filesSystemService: SistemaArchivosService,
    private purchaseOrderItemsServices: ProcesosL06OrdenDeCompraPartidasService,
    private purchaseOrdersDeclareArrivalService: ProcesosL06OrdenDeCompraDeclararArribosService,
    private purchaseOrderItemServices: ProcesosL06OrdenDeCompraPartidasService,
    private purchaseOrderItemModificationServices: ProcesosL06OrdenDeCompraPartidasModificacionesService,
    private importsServices: ProcesosL07ImportacionesService,
    private confirmDispatchServices: ProcesosL07ImportacionesConfirmarDespachoService,
    private contactsServiceProviders: apiCatalogs.ConfiguracionProveedoresService,
  ) {}

  getProviderContacts = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmDispatchListActions.SET_PROVIDER_SELECTED),
      withLatestFrom(this.store.select(confirmDispatchDetailsSelectors.selectedProviderId)),
      mergeMap(([action, provider]) => {
        return this.contactsServiceProviders
          .ProveedorExtensionsObtenerListaContactoDetalle(provider)
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
              return confirmDispatchDetailsActions.SET_PROVIDER_CONTACT({
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
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // Obtener ordenes de compra
  fetchPurchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        confirmDispatchDetailsActions.FETCH_PURCHASE_ORDERS_LOAD,
        confirmDispatchDetailsActions.REFRESH_ALL_PURCHASE_ORDERS,
        confirmDispatchDetailsActions.SET_TERM_SEARCH,
        confirmDispatchDetailsActions.SET_TAB_SELECTED,
        confirmDispatchDetailsActions.REFRESH_PURCHASE_ORDERS,
        confirmDispatchDetailsActions.FETCH_RESTORE_ITEM_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(confirmDispatchDetailsSelectors.selectQueryInfoPurchaseOrders),
        this.store.select(confirmDispatchDetailsSelectors.selectNeedsToReloadPurchaseOrders),
      ),
      mergeMap(([action, queryInfo, needsToReload]) => {
        const log = `Entró a ${action}`;
        this.logger.debug(
          servicesLogger.generateMessage(FILE_NAME, servicesLogger.LOG_SUCCEEDED, log),
        );
        if (needsToReload) {
          this.store.dispatch(
            confirmDispatchDetailsActions.SET_ITEMS_STATUS({
              itemsStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
          return this.confirmDispatchServices.vImpCDOrdenesDeCompraQueryResult(queryInfo).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar las órdenes de compra.',
                ),
                response,
              );
              const purchaseOrders: Array<IPurchaseOrder> = _map(response.Results, (oc, index) => ({
                ...oc,
                Index: index + 1,
                isSelected: index === 0,
                items: [],
                itemsStatus: API_REQUEST_STATUS_DEFAULT,
                itemsNeedsToReload: true,
              }));
              if (isEmpty(purchaseOrders)) {
                this.store.dispatch(
                  confirmDispatchDetailsActions.SET_ITEMS_STATUS({
                    itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
                  }),
                );
              }
              return confirmDispatchDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS({
                purchaseOrders,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar las órdenes de compra.',
                ),
                error,
              );
              return of(confirmDispatchDetailsActions.FETCH_PURCHASE_ORDERS_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // Obtener partidas
  fetchItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        confirmDispatchDetailsActions.SET_PURCHASE_ORDER_SELECTED,
        confirmDispatchDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS,
        confirmDispatchDetailsActions.CONFIRM_ITEMS_SUCCESS,
        confirmDispatchDetailsActions.FETCH_ITEMS_LOAD,
      ),
      withLatestFrom(
        this.store.select(confirmDispatchDetailsSelectors.selectQueryInfoItems),
        this.store.select(confirmDispatchDetailsSelectors.selectNeedsToReloadItemsCurrentOC),
        this.store.select(confirmDispatchDetailsSelectors.selectPurchaseOrderSelected),
      ),
      mergeMap(([action, queryInfo, needsToReload, selectedOrder]) => {
        if (!isEmpty(selectedOrder) && needsToReload) {
          this.store.dispatch(
            confirmDispatchDetailsActions.SET_ITEMS_STATUS({
              itemsStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
          return this.purchaseOrderItemsServices.vOcPartidaDetalleQueryResult(queryInfo).pipe(
            map((response: QueryResultVOcPartidaDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar las partidas de la OC.',
                ),
                response,
              );
              this.store.dispatch(
                confirmDispatchDetailsActions.SET_ITEMS_STATUS({
                  itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              if (action.type === '[Confirm-Dispatch-Details] Confirm Items of Order Success') {
                this.store.dispatch(confirmDispatchDetailsActions.REFRESH_SELECTED_PROVIDER());
                if (isEmpty(response.Results)) {
                  return confirmDispatchDetailsActions.REFRESH_PURCHASE_ORDERS();
                }
                this.store.dispatch(
                  confirmDispatchDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER(),
                );
              }
              const items: Array<Array<IItem>> = _map(response.Results, (item: IItem, index) => [
                {
                  ...item,
                  Number: index + 1,
                  NumberToSave: item.ocPartida.SubIndice
                    ? Number(`${item.ocPartida.Indice}.${item.ocPartida.SubIndice}`)
                    : item.ocPartida.Indice,
                  tempNumeroDePiezas: item.NumeroDePiezas,
                  tempPrecioLista: item.PrecioLista,
                  tempTotalPartida: item.TotalPartida,
                  tempFechaEstimadaDeArribo: item.FechaEstimadaDeArribo,
                  ...initialIItem(),
                  ocPartida: {
                    ...item.ocPartida,
                  },
                  ocPartidaCancelacion: {
                    ...initialOcPartidaCancelacion(),
                    IdOcPartida: item.IdOcPartida,
                  },
                  ocPartidaEdicionBackOrder: {
                    ...initialOcPartidaEdicionBackOrder(),
                    IdOcPartida: item.IdOcPartida,
                  },
                },
              ]);

              return confirmDispatchDetailsActions.FETCH_ITEMS_SUCCESS({
                items,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar las partidas de la OC.',
                ),
                error,
              );
              this.store.dispatch(
                confirmDispatchDetailsActions.SET_ITEMS_STATUS({
                  itemsStatus: API_REQUEST_STATUS_FAILED,
                }),
              );
              return of(confirmDispatchDetailsActions.FETCH_ITEMS_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // Cancelar, backorder y confirmar partidas
  confirmItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmDispatchDetailsActions.CONFIRM_ITEMS_LOAD),
      withLatestFrom(this.store.select(confirmDispatchDetailsSelectors.selectItems)),
      mergeMap(async ([action, itemsArray]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        if (!isEmpty(itemsArray)) {
          for (const itemArray of itemsArray) {
            for (const item of itemArray) {
              const typeOfConfig = item.cancelConfig
                ? TYPES_OF_CONFIG.cancel
                : item.backOrderConfig
                ? TYPES_OF_CONFIG.backOrder
                : null;

              const itemId = extractID(
                await lastValueFrom(
                  this.purchaseOrderItemsServices.ocPartidaGuardarOActualizar(item.ocPartida),
                ),
              );
              if (!itemId) {
                this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
                this.store.dispatch(
                  utilsActions.SET_LOADING_ERROR({
                    active: true,
                    message: 'Al guardar la confirmación de la ocPartida.',
                  }),
                );
                return confirmDispatchDetailsActions.CONFIRM_ITEMS_FAILED();
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
              };

              if (typeOfConfig) {
                let fileId = null;
                if (typeOfConfig === TYPES_OF_CONFIG.backOrder) {
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
              message: 'Has confirmado partidas',
            }),
          );
          return confirmDispatchDetailsActions.CONFIRM_ITEMS_SUCCESS();
        }
        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        return confirmDispatchDetailsActions.CONFIRM_ITEMS_FAILED();
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al guardar el despacho de la ocPartida.',
          ),
          error,
        );
        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        return of(confirmDispatchDetailsActions.CONFIRM_ITEMS_FAILED());
      }),
    ),
  );

  // Obtener partidas en resumen
  fetchItemsInSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        confirmDispatchDetailsActions.FETCH_ITEMS_CONFIRMED_LOAD,
        confirmDispatchDetailsActions.FETCH_RESTORE_ITEM_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(confirmDispatchDetailsSelectors.selectQueryInfoItemsInSummary),
        this.store.select(confirmDispatchDetailsSelectors.selectNeedsToReloadItemsInSummary),
      ),
      mergeMap(([action, queryInfo, needsToReload]) => {
        if (needsToReload) {
          return this.purchaseOrderItemsServices.vOcPartidaDetalleQueryResult(queryInfo).pipe(
            map((response: QueryResultVOcPartidaDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar las partidas confirmadas.',
                ),
                response,
              );
              if (action.type === '[Confirm-Dispatch-Details] Fetch Restore Item Success') {
                if (isEmpty(response.Results)) {
                  this.store.dispatch(
                    confirmDispatchDetailsActions.SET_VIEW_MODE({
                      viewMode: 'normal',
                    }),
                  );
                  this.store.dispatch(confirmDispatchDetailsActions.REFRESH_SELECTED_PROVIDER());
                  return confirmDispatchDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER();
                }
              }
              const itemsInSummary: Array<IItem> = _map(
                response.Results,
                (item, index): IItem =>
                  ({
                    ...item,
                    Number: index + 1,
                    NumberToSave: item.ocPartida.SubIndice
                      ? Number(`${item.ocPartida.Indice}.${item.ocPartida.SubIndice}`)
                      : item.ocPartida.Indice,
                  } as IItem),
              );

              return confirmDispatchDetailsActions.FETCH_ITEMS_CONFIRMED_SUCCESS({
                itemsInSummary,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar las partidas confirmadas.',
                ),
                error,
              );
              return of(confirmDispatchDetailsActions.FETCH_ITEMS_CONFIRMED_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // Quitar partidas de resumen
  restoreItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmDispatchDetailsActions.FETCH_RESTORE_ITEM_LOAD),
      mergeMap((action) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        let ocPartida: OcPartida = action.ocPartida;
        ocPartida = {
          ...ocPartida,
          CDResumen: false,
        };
        return this.purchaseOrderItemsServices.ocPartidaGuardarOActualizar(ocPartida).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al actualizar la Partida.',
              ),
              response,
            );
            this.store.dispatch(confirmDispatchDetailsActions.REFRESH_SELECTED_PROVIDER());
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return confirmDispatchDetailsActions.FETCH_RESTORE_ITEM_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al actualizar la Partida.',
              ),
              error,
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return of(confirmDispatchDetailsActions.FETCH_RESTORE_ITEM_FAILED());
          }),
        );
      }),
    ),
  );

  // Refrescar orden de compra seleccionada
  fetchSelectedPurchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmDispatchDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER),
      withLatestFrom(this.store.select(confirmDispatchDetailsSelectors.selectedOrderId)),
      mergeMap(([action, orderId]) => {
        const params = new FiltersOnlyActive(true);
        params.Filters.push({
          NombreFiltro: 'IdOcOrdenDeCompra',
          ValorFiltro: orderId,
        });
        return this.confirmDispatchServices.vImpCDOrdenesDeCompraQueryResult(params).pipe(
          map((response: QueryResultVImpCDOrdenesDeCompra) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al refrescar la orden de compra seleccionada.',
              ),
              response,
            );
            if (isEmpty(response.Results)) {
              return confirmDispatchDetailsActions.REFRESH_PURCHASE_ORDERS();
            }
            return confirmDispatchDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER_SUCCESS({
              order: response.Results[0],
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al refrescar la orden de compra seleccionada.',
              ),
              error,
            );
            this.store.dispatch(
              confirmDispatchDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER_FAILED(),
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // Refrescar Proveedor seleccionado
  fetchSelectedProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmDispatchDetailsActions.REFRESH_SELECTED_PROVIDER),
      withLatestFrom(this.store.select(confirmDispatchDetailsSelectors.selectedProviderId)),
      mergeMap(([action, providerId]) => {
        const params = new FiltersOnlyActive(true);
        params.Filters.push({
          NombreFiltro: 'IdProveedor',
          ValorFiltro: providerId,
        });
        return this.confirmDispatchServices.vImpCDProveedoresQueryResult(params).pipe(
          map((response: QueryResultVImpCDProveedores) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al refrescar el Proveedor seleccionado.',
              ),
              response,
            );
            if (isEmpty(response.Results)) {
              this.router.navigate([
                appRoutes.protected,
                appRoutes.pendings.pendings,
                appRoutes.confirmDispatch.confirmDispatch,
              ]);
            }
            return confirmDispatchDetailsActions.REFRESH_SELECTED_PROVIDER_SUCCESS({
              provider: response.Results[0],
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al refrescar el Proveedor seleccionado.',
              ),
              error,
            );
            this.store.dispatch(confirmDispatchDetailsActions.REFRESH_SELECTED_PROVIDER_FAILED());
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // Finish Items
  finishItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmDispatchDetailsActions.FINISH_ITEMS_LOAD),
      withLatestFrom(
        this.store.select(confirmDispatchSelectors.selectConfirmDispatchDetails),
        this.store.select(confirmDispatchDetailsSelectors.selectItemsInSummary),
        this.store.select(selectIdUser),
      ),
      mergeMap(async ([action, data, items, userId]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));

        // Upload guide file
        let date = new Date();
        let filename = `${date.getFullYear()}/${
          data.providerSelected.IdProveedor
        }/${date.getTime()}/${data.guideFile.name}`;

        const guideFileDetail: ArchivoDetalle = await this.minioService.uploadFile(
          data.guideFile,
          filename,
          MINIO_BUCKETS.Purchases,
        );

        // Save ImpListaArribo
        const arrivalListId = extractID(
          await lastValueFrom(
            this.importsServices.impListaArriboGuardarOActualizar({
              ...data.arrivalList,
              IdArchivoGuia: guideFileDetail.IdArchivo,
            }),
          ),
        );

        // Upload ocPackingList file
        date = new Date();
        filename = `${date.getFullYear()}/${data.providerSelected.IdProveedor}/${date.getTime()}/${
          data.packingListFile.name
        }`;

        const packingFileDetail: ArchivoDetalle = await this.minioService.uploadFile(
          data.packingListFile,
          filename,
          MINIO_BUCKETS.Purchases,
        );

        // Save packing list
        const ocPackingListId = extractID(
          await lastValueFrom(
            this.purchaseOrdersDeclareArrivalService.ocPackingListGuardarOActualizar({
              ...data.ocPackingList,
              IdArchivo: packingFileDetail.IdArchivo,
              IdImpListaArribo: arrivalListId,
              IdUsuario: userId,
            }),
          ),
        );

        // Save items
        for (const item of items) {
          const itemId = extractID(
            await lastValueFrom(
              this.purchaseOrderItemServices.ocPartidaGuardarOActualizar({
                ...item.ocPartida,
                IdOcPackingList: ocPackingListId,
                CDConfirmado: true,
              }),
            ),
          );
        }
        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        this.store.dispatch(
          utilsActions.SET_LOADING_SUCCESS({
            active: true,
            message: 'Has confirmado despacho',
          }),
        );
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_SUCCEEDED,
            'Al confirmar el despacho.',
          ),
        );
        this.store.dispatch(
          confirmDispatchDetailsActions.SET_VIEW_MODE({
            viewMode: 'normal',
          }),
        );
        this.store.dispatch(confirmDispatchDetailsActions.REFRESH_SELECTED_PROVIDER());
        this.store.dispatch(confirmDispatchDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER());
        return confirmDispatchDetailsActions.FINISH_ITEMS_SUCCESS();
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al confirmar el despacho.',
          ),
          error,
        );
        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        return of(confirmDispatchDetailsActions.FINISH_ITEMS_FAILED());
      }),
    ),
  );
}
