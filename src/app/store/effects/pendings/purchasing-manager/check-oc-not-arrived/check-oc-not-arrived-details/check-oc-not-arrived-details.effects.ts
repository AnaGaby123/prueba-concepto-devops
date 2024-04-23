/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {lastValueFrom, of} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';

/* Actions Imports */
import {
  checkOcNotArrivedActions,
  checkOcNotArrivedDetailsActions,
} from '@appActions/pendings/purchasing-manager/check-oc-not-arrived';

/* Selectors Imports */
import {checkNotArrivedDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/check-oc-not-arrived';

/* Services Imports */
import * as apiLogistic from 'api-logistica';
import {QueryInfo} from 'api-logistica';
import * as servicesLogger from '@appUtil/logger';
import * as apiCatalogs from 'api-catalogos';
import {ArchivoDetalle, RequestMoverArchivo, UrlSubirArchivo} from 'api-catalogos';

/* Tools Imports */
import {isEmpty, map as _map} from 'lodash-es';

/* Routes Imports */
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_UUID, MINIO_BUCKETS} from '@appUtil/common.protocols';

/* Models Imports */
import {
  IItems,
  initialItem,
  IPurchaseOrder,
  ITotals,
} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-details/check-oc-not-arrived-details.model';
import {
  initialOcPartidaCancelacion,
  initialOcPartidaEdicionBackOrder,
  initialOcPartidaEdicionConImpactoFEE,
  TYPES_OF_CONFIG,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {FiltersOnlyActive} from '@appModels/filters/Filters';

/* Utils Imports */
import {addRowIndex, extractID} from '@appUtil/util';
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'check-oc-not-arrived-details.effects.ts';

@Injectable()
export class CheckOcNotArrivedDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private purchaseOrderServices: apiLogistic.ProcesosL06OrdenDeCompraService,
    private purchaseOrderItemsServices: apiLogistic.ProcesosL06OrdenDeCompraPartidasService,
    private purchaseOrderEntriesServices: apiLogistic.ProcesosL06OrdenDeCompraPartidasService,
    private filesSystemService: apiCatalogs.SistemaArchivosService,
    private purchaseOrderItemModificationServices: apiLogistic.ProcesosL06OrdenDeCompraPartidasModificacionesService,
    private contactsServiceProviders: apiCatalogs.ConfiguracionProveedoresService,
  ) {}

  setProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkOcNotArrivedDetailsActions.SET_PROVIDER),
      mergeMap((action) => {
        this.store.dispatch(
          checkOcNotArrivedActions.SET_ALLOWED_TO_DETAILS_VALUE({
            allowedToDetails: true,
          }),
        );
        this.store.dispatch(
          checkOcNotArrivedActions.SET_IS_IN_DETAILS_VIEW({
            isInDetailsView: true,
          }),
        );
        this.store.dispatch(checkOcNotArrivedDetailsActions.FETCH_FAMILIES_LOAD());
        this.store.dispatch(checkOcNotArrivedDetailsActions.CONTACTS_PROVIDER_LOAD());
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.checkOcNotArrived.checkOcNotArrived,
          appRoutes.checkOcNotArrived.details,
        ]);
        return of(RETURN_EMPTY());
      }),
    ),
  );

  getProviderContacts = createEffect(() =>
    this.actions$.pipe(
      ofType(checkOcNotArrivedDetailsActions.CONTACTS_PROVIDER_LOAD),
      withLatestFrom(this.store.select(checkNotArrivedDetailsSelectors.selectIdProviderSelected)),
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
              return checkOcNotArrivedDetailsActions.SET_PROVIDER_CONTACT({
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
      ofType(checkOcNotArrivedDetailsActions.FETCH_FAMILIES_LOAD),
      withLatestFrom(
        this.store.select(
          checkNotArrivedDetailsSelectors.selectIdProviderSelected,
        ),
      ),
      mergeMap(([action, idProvider]) => {
        const queryInfo: QueryInfo = {
          Filters: [
            {
              NombreFiltro: 'IdProveedor',
              ValorFiltro: idProvider,
            },
          ],
        };
        return this.purchaseOrderServices
          .vOcProveedorFamiliaMonitorearQueryResult(queryInfo)
          .pipe(
            map((response) => {
              const families: Array<IFamily> = _.map(
                response.Results,
                (family, index) => ({
                  ...family,
                  isSelected: index === 0,
                  purchaseOrders: [],
                  totalPurchaseOrders: 0,
                  purchaseOrdersStatus: API_REQUEST_STATUS_DEFAULT,
                  needsToReloadPurchaseOrders: true,
                  desiredPage: 1,
                  isLoadingMorePurchases: false,
                  selectedPurchaseOrder: {} as IPurchaseOrder,
                  totals: {
                    pieces: 0,
                    products: 0,
                    amount: 0,
                  },
                  needsToReloadTotals: true,
                  searchTerm: '',
                  tabOptions: [
                    {
                      value: 1,
                      label: 'Todas las Gestiones',
                    },
                    {
                      value: 2,
                      label: 'Primera Gestión',
                    },
                    {
                      value: 3,
                      label: 'Gestionadas',
                    },
                  ],
                  tabSelected: {
                    value: 1,
                    label: 'Todas las Gestiones',
                  },
                  dropDownValues: {
                    yesterday: 0,
                    dayBeforeYesterday: 0,
                    past: 0,
                    today: 0,
                    all: 0,
                    tomorrow: 0,
                    dayAfterTomorrow: 0,
                    future: 0,
                  },
                  dropDownOptionSelected: 'Todos',
                }),
              );
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las familias por proveedor.',
                ),
                response,
              );

              return checkOcNotArrivedDetailsActions.FETCH_FAMILIES_SUCCESS({
                families,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las familias por proveedor.',
                ),
                error,
              );

              this.store.dispatch(
                checkOcNotArrivedDetailsActions.FETCH_FAMILIES_FAILED(),
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );*/

  fetchOcsFamily$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        checkOcNotArrivedDetailsActions.FETCH_PURCHASE_ORDERS_LOAD,
        checkOcNotArrivedDetailsActions.SET_FAMILY_SELECTED,
        checkOcNotArrivedDetailsActions.FETCH_FAMILIES_SUCCESS,
        checkOcNotArrivedDetailsActions.SET_TAB_OPTION_SELECTED,
        checkOcNotArrivedDetailsActions.SET_DROPDOWN_OPTION_SELECTED,
        checkOcNotArrivedDetailsActions.SET_SEARCH_TERM,
        checkOcNotArrivedDetailsActions.REFRESH_PURCHASE_ORDERS,
      ),
      withLatestFrom(
        this.store.select(checkNotArrivedDetailsSelectors.selectQueryInfoPurchaseOrders),
        this.store.select(checkNotArrivedDetailsSelectors.selectNeedsToReloadPurchaseOrders),
        this.store.select(checkNotArrivedDetailsSelectors.selectIsLoadingMorePurchaseOrders),

        this.store.select(checkNotArrivedDetailsSelectors.selectFamilySelected),
      ),
      mergeMap(([action, queryInfo, firstTime, morePurchaseOrders, familySelected]) => {
        if (
          firstTime ||
          morePurchaseOrders
          // FIXME: Corregir por cambio en modelos
          /*&& familySelected.IdFamilia !== DEFAULT_UUID*/
        ) {
          return this.purchaseOrderServices
            .vOcOrdenDeCompraMonitorearDetalleQueryResult(queryInfo)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener las órdenes de compra.',
                  ),
                  response,
                );

                const purchaseOrders: Array<IPurchaseOrder> = _map(
                  response.Results,
                  (oc, index) =>
                    ({
                      ...oc,
                      items: [],
                      totalItems: 0,
                      itemsStatus: API_REQUEST_STATUS_DEFAULT,
                      needsToReloadItems: true,
                      desiredPage: 1,
                      isLoadingMoreItems: false,
                      isSelected: index === 0,
                    } as IPurchaseOrder),
                );
                if (morePurchaseOrders) {
                  this.store.dispatch(
                    checkOcNotArrivedDetailsActions.SET_IS_LOADING_MORE_PURCHASE_ORDERS({
                      isLoadingMorePurchases: false,
                    }),
                  );
                }
                return checkOcNotArrivedDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS({
                  purchaseOrders: addRowIndex(
                    queryInfo.desiredPage,
                    queryInfo.pageSize,
                    purchaseOrders,
                  ),
                  totalPurchaseOrders: response.TotalResults,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener las órdenes de compra.',
                  ),
                  error,
                );
                return of(checkOcNotArrivedDetailsActions.FETCH_PURCHASE_ORDERS_FAILED());
              }),
            );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );

  fetchItemsOc$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        checkOcNotArrivedDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS,
        checkOcNotArrivedDetailsActions.FETCH_ITEMS_LOAD,
        checkOcNotArrivedDetailsActions.SET_PURCHASE_ORDER_SELECTED,
        checkOcNotArrivedDetailsActions.CONFIRM_ITEMS_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(checkNotArrivedDetailsSelectors.selectQueryInfoItems),
        this.store.select(checkNotArrivedDetailsSelectors.selectNeedsToReloadItems),
        this.store.select(checkNotArrivedDetailsSelectors.selectIsLoadingMoreItems),
        this.store.select(checkNotArrivedDetailsSelectors.selectIdPurchaseOrderSelected),
      ),
      switchMap(([action, queryInfo, firstTime, moreItems, selectedIdPurchaseOrder]) => {
        if (selectedIdPurchaseOrder === DEFAULT_UUID) {
          return of(RETURN_EMPTY());
        }
        if (firstTime || moreItems) {
          return this.purchaseOrderItemsServices.vOcPartidaDetalleQueryResult(queryInfo).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las partidas.',
                ),
                response,
              );

              if (action.type === '[checkOcNotArrivedDetailsApi] Confirm Items of Order Success') {
                if (isEmpty(response.Results)) {
                  return checkOcNotArrivedDetailsActions.REFRESH_PURCHASE_ORDERS();
                }
                this.store.dispatch(
                  checkOcNotArrivedDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER(),
                );
              }
              const items: Array<Array<IItems>> = _map(
                addRowIndex(queryInfo.desiredPage, queryInfo.pageSize, response.Results),
                (o: IItems, index) => [
                  {
                    ...o,
                    Number: index + 1,
                    NumberToSave: o.ocPartida.SubIndice
                      ? Number(`${o.ocPartida.Indice}.${o.ocPartida.SubIndice}`)
                      : o.ocPartida.Indice,
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
                  },
                ],
              );

              if (moreItems) {
                this.store.dispatch(
                  checkOcNotArrivedDetailsActions.SET_IS_LOADING_MORE_ITEMS({
                    isLoadingMoreItems: false,
                  }),
                );
              }
              return checkOcNotArrivedDetailsActions.FETCH_ITEMS_SUCCESS({
                items,
                totalItems: response.TotalResults,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las partidas.',
                ),
                error,
              );
              return of(checkOcNotArrivedDetailsActions.FETCH_ITEMS_FAILED());
            }),
          );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );

  fetchTotalOfFamilies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        checkOcNotArrivedDetailsActions.FETCH_FAMILIES_SUCCESS,
        checkOcNotArrivedDetailsActions.SET_FAMILY_SELECTED,
      ),
      withLatestFrom(
        this.store.select(checkNotArrivedDetailsSelectors.selectNeedsToReloadTotals),
        this.store.select(checkNotArrivedDetailsSelectors.selectIdFamilySelected),
      ),
      switchMap(([action, needsToReload, idFamily]) => {
        if (needsToReload) {
          const queryInfo: QueryInfo = {
            Filters: [
              {
                NombreFiltro: 'Confirmada',
                ValorFiltro: true,
              },
              {
                NombreFiltro: 'IdFamilia',
                ValorFiltro: idFamily,
              },
            ],
          };
          return this.purchaseOrderEntriesServices
            .vOcPartidaDatosGraficaOrdenDeCompraObj(queryInfo)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al consultar los totales del proveedor.',
                  ),
                  response,
                );
                const totals: ITotals = {
                  pieces: response.TotalPieza,
                  products: response.TotalProducto,
                  amount: response.ValorTotal,
                };
                return checkOcNotArrivedDetailsActions.FETCH_TOTALS_OF_FAMILY({
                  totals,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al consultar los totales del proveedor.',
                  ),
                  error,
                );
                return of(RETURN_EMPTY());
              }),
            );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );

  confirmItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkOcNotArrivedDetailsActions.CONFIRM_ITEMS_LOAD),
      withLatestFrom(
        this.store.select(checkNotArrivedDetailsSelectors.selectItemsOfPurchaseOrderCurrent),
      ),
      mergeMap(async ([action, itemsArray]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        if (!isEmpty(itemsArray)) {
          for (let i = 0; i < itemsArray.length; i++) {
            const secondArray: Array<IItems> = [...itemsArray[i]];
            for (let j = 0; j < secondArray.length; j++) {
              const item: IItems = {...secondArray[j]};
              const typeOfConfig = item.cancelConfig
                ? TYPES_OF_CONFIG.cancel
                : item.backOrderConfig
                ? TYPES_OF_CONFIG.backOrder
                : item.impactConfig
                ? TYPES_OF_CONFIG.impact
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
                    message: 'Ha ocurrido un error en el servicio web.',
                  }),
                );
                return checkOcNotArrivedDetailsActions.CONFIRM_ITEMS_FAILED;
              }

              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar el monitoreo de la ocPartida.',
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
              };

              const deletes = {
                [TYPES_OF_CONFIG.impact]: () => {
                  const itemImpact = {
                    ...item.ListaOcPartidaEdicionConImpactoFEE[0],
                    Activo: false,
                  };
                  return lastValueFrom(
                    this.purchaseOrderItemModificationServices.ocPartidaEdicionConImpactoFEEGuardarOActualizar(
                      itemImpact,
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
                const responseDelete = await deletes[TYPES_OF_CONFIG.impact]();
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
              message: 'Has registrado monitoreo',
            }),
          );
          return checkOcNotArrivedDetailsActions.CONFIRM_ITEMS_SUCCESS();
        }
        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        return checkOcNotArrivedDetailsActions.CONFIRM_ITEMS_FAILED();
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al guardar el monitoreo de la ocPartida.',
          ),
          error,
        );
        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        return of(checkOcNotArrivedDetailsActions.CONFIRM_ITEMS_FAILED());
      }),
    ),
  );

  fetchSelectedPurchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkOcNotArrivedDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER),
      withLatestFrom(
        this.store.select(checkNotArrivedDetailsSelectors.selectIdPurchaseOrderSelected),
      ),
      mergeMap(([action, orderId]) => {
        const params = new FiltersOnlyActive(true);
        params.Filters.push({
          NombreFiltro: 'IdOcOrdenDeCompra',
          ValorFiltro: orderId,
        });
        return this.purchaseOrderServices.vOcOrdenDeCompraMonitorearDetalleQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al refrescar la orden de compra seleccionada.',
              ),
              response,
            );

            return checkOcNotArrivedDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER_SUCCESS({
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
              checkOcNotArrivedDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER_FAILED(),
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );
}
