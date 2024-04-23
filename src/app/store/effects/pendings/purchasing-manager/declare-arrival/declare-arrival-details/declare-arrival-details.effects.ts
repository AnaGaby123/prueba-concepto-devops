import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {lastValueFrom, of} from 'rxjs';

// Services
import {MinioService} from '@appServices/minio/minio.service';

// Models
import {
  ProcesosL06OrdenDeCompraDeclararArribosService,
  ProcesosL06OrdenDeCompraPartidasService,
  QueryResultVOcOrdenDeCompraDeclararArribo,
  QueryResultVOcPartidaDetalle,
  QueryResultVOcProveedorDeclararArribo,
  VOcOrdenDeCompraDeclararArribo,
  VOcPartidaDetalle,
} from 'api-logistica';
import * as apiCatalogs from 'api-catalogos';
import {ArchivoDetalle, ConfiguracionProductosLotesService} from 'api-catalogos';
import {
  getSelectedCompleteLot,
  getSelectedCountry,
  getSelectedLot,
  IDeclareArrivalEffect,
  IItemsDeclareArrival,
  initialLot,
  IPurchaseOrderArrival,
} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details.models';
import {FiltersOnlyActive} from '@appModels/filters/Filters';

// Actions
import {
  declareArrivalActions,
  declareArrivalDetailsActions,
  declareArrivalListActions,
} from '@appActions/pendings/purchasing-manager/declare-arrival';
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';

// Selectors
import {declareArrivalDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/declare-arrival';

// Utils
import {filter, findIndex, isEmpty, map as _map} from 'lodash-es';

import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  MINIO_BUCKETS,
} from '@appUtil/common.protocols';
import * as servicesLogger from '@appUtil/logger';
import {extractID, getArrayForDropDownList} from '@appUtil/util';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'declare-arrival-details.effects.ts';

@Injectable()
export class DeclareArrivalDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private purchaseOrdersDeclareArrivalService: ProcesosL06OrdenDeCompraDeclararArribosService,
    private purchaseOrderItemServices: ProcesosL06OrdenDeCompraPartidasService,
    private minioService: MinioService,
    private productsLotsConfig: ConfiguracionProductosLotesService,
    private contactsServiceProviders: apiCatalogs.ConfiguracionProveedoresService,
  ) {}

  viewDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(declareArrivalDetailsActions.SET_SELECTED_PROVIDER),
      mergeMap((action) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        this.router
          .navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.declareArrival.declareArrival,
            appRoutes.declareArrival.details,
          ])
          .then(() => {
            this.store.dispatch(
              declareArrivalActions.SET_IS_DETAILS({
                detailsMode: true,
              }),
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          });

        this.store.dispatch(declareArrivalDetailsActions.FETCH_PURCHASE_ORDERS_LOAD());
        this.store.dispatch(declareArrivalDetailsActions.LOAD_CONTACTS_PROVIDER());
        return of(RETURN_EMPTY());
      }),
    ),
  );

  getProviderContacts = createEffect(() =>
    this.actions$.pipe(
      ofType(declareArrivalDetailsActions.LOAD_CONTACTS_PROVIDER),
      withLatestFrom(this.store.select(declareArrivalDetailsSelectors.selectProvider)),
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
              return declareArrivalDetailsActions.SET_PROVIDER_CONTACT({
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
        declareArrivalDetailsActions.FETCH_PURCHASE_ORDERS_LOAD,
        declareArrivalDetailsActions.SET_SELECTED_TAB_OPTION,
        declareArrivalDetailsActions.SET_SEARCH_TERM,
        declareArrivalDetailsActions.SET_SORT_SELECTED,
        declareArrivalDetailsActions.REFRESH_SELECTED_PROVIDER,
      ),
      withLatestFrom(
        this.store.select(declareArrivalDetailsSelectors.selectNeedsToReloadOrders),
        this.store.select(declareArrivalDetailsSelectors.selectGetOrdersFilters),
      ),
      mergeMap(([action, needsToReloadOrders, params]) => {
        if (needsToReloadOrders) {
          this.store.dispatch(
            declareArrivalDetailsActions.SET_ORDERS_STATUS({
              purchaseOrdersStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
          this.store.dispatch(
            declareArrivalDetailsActions.SET_ITEMS_STATUS({
              itemsStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
          return this.purchaseOrdersDeclareArrivalService
            .vOcOrdenDeCompraDeclararArriboQueryResult(params)
            .pipe(
              map((response: QueryResultVOcOrdenDeCompraDeclararArribo) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al consultar ordenes de compra.',
                  ),
                  response,
                );
                const orders: Array<IPurchaseOrderArrival> = _map(
                  response.Results,
                  (
                    order: VOcOrdenDeCompraDeclararArribo,
                    index: number,
                  ): IPurchaseOrderArrival => ({
                    ...order,
                    Index: index,
                    isSelected: index === 0,
                    needsToReloadItems: true,
                    items: [],
                  }),
                );
                this.store.dispatch(
                  declareArrivalDetailsActions.INITIAL_PURCHASE_ORDER({
                    order: {
                      ...orders[0],
                    },
                  }),
                );
                this.store.dispatch(
                  declareArrivalDetailsActions.SET_ORDERS_STATUS({
                    purchaseOrdersStatus: API_REQUEST_STATUS_SUCCEEDED,
                  }),
                );

                if (isEmpty(orders)) {
                  this.store.dispatch(
                    declareArrivalDetailsActions.SET_ITEMS_STATUS({
                      itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
                    }),
                  );
                  if (
                    findIndex(params.Filters, (o) => o.NombreFiltro === 'NumeroOrdenDeCompra') !==
                    -1
                  ) {
                    this.router.navigate([
                      appRoutes.protected,
                      appRoutes.pendings.pendings,
                      appRoutes.declareArrival.declareArrival,
                    ]);
                  }
                }
                return declareArrivalDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS({
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
                  declareArrivalDetailsActions.SET_ORDERS_STATUS({
                    purchaseOrdersStatus: API_REQUEST_STATUS_FAILED,
                  }),
                );
                return of(RETURN_EMPTY());
              }),
            );
        } else {
          this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          return of(declareArrivalDetailsActions.FETCH_ITEMS_LOAD());
        }
      }),
    ),
  );

  // Obtener partidas
  fetchItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        declareArrivalDetailsActions.FETCH_ITEMS_LOAD,
        declareArrivalDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS,
        declareArrivalDetailsActions.SET_SELECTED_ORDER,
      ),
      withLatestFrom(
        this.store.select(declareArrivalDetailsSelectors.selectedOrder),
        this.store.select(declareArrivalDetailsSelectors.selectGetItemsFilters),
      ),
      mergeMap(([action, selectedOrder, params]) => {
        if (!isEmpty(selectedOrder) && selectedOrder.needsToReloadItems) {
          this.store.dispatch(
            declareArrivalDetailsActions.SET_ITEMS_STATUS({
              itemsStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
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
                declareArrivalDetailsActions.SET_ITEMS_STATUS({
                  itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              const items: Array<IItemsDeclareArrival> = _map(
                response.Results,
                (o: VOcPartidaDetalle, index: number) => ({
                  ...o,
                  Index: index,
                  isPublish: o.vProducto.Tipo === 'Publicaciones',
                  Number: o.ocPartida.SubIndice
                    ? Number(`${o.ocPartida.Indice}.${o.ocPartida.SubIndice}`)
                    : o.ocPartida.Indice,
                  Initial: o.Descripcion.charAt(0).toUpperCase(),
                  withoutCertificate: false,
                  certificate: null,
                  countriesForDropDown: getArrayForDropDownList(
                    o.PaisesOrdenLotes,
                    'IdCatPais',
                    'NombreEspanol',
                  ),
                  lotsForDropDown: getArrayForDropDownList(o.ListaLotes, 'IdLote', 'Nombre'),
                  selectedCountry: getSelectedCountry(
                    o.PaisesOrdenLotes,
                    o.ListaLotes,
                    o.ocPartida?.IdLote,
                  ),
                  selectedLot: getSelectedLot(o.ListaLotes, o.ocPartida?.IdLote),
                  selectedCompleteLot: getSelectedCompleteLot(o.ListaLotes, o.ocPartida?.IdLote),
                  newLot: {
                    ...initialLot(),
                    IdProducto: o.ocPartida.IdProducto,
                    PrecioLista: o.PrecioLista,
                    Presentacion: o.vProducto.Presentacion,
                  },
                }),
              );
              return declareArrivalDetailsActions.FETCH_ITEMS_SUCCESS({
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
                declareArrivalDetailsActions.SET_ITEMS_STATUS({
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
  // Generar
  confirmItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(declareArrivalDetailsActions.GENERATE_LOAD),
      withLatestFrom(
        this.store.select(declareArrivalDetailsSelectors.selectedItems),
        this.store.select(declareArrivalDetailsSelectors.selectOcPackingList),
        this.store.select(declareArrivalDetailsSelectors.selectPackingList),
        this.store.select(declareArrivalDetailsSelectors.selectProvider),
      ),
      mergeMap(async ([action, items, ocPackingList, packingList, provider]) => {
        if (!packingList || isEmpty(items) || isEmpty(ocPackingList)) {
          return declareArrivalDetailsActions.GENERATE_FAILED();
        }
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        let data: IDeclareArrivalEffect = {
          items,
          ocPackingList,
          packingList,
        };
        // Subir archivo
        let date = new Date();
        let fileName = `${date.getFullYear()}/${provider.IdProveedor}/${date.getTime()}/${
          packingList.name
        }`;
        const packingListFile: ArchivoDetalle = await this.minioService.uploadFile(
          packingList,
          fileName,
          MINIO_BUCKETS.Purchases,
        );

        data = {
          ...data,
          ocPackingList: {
            ...data.ocPackingList,
            IdArchivo: packingListFile.IdArchivo,
            IdImpListaArribo: data.items[0].IdImpListaArribo,
          },
        };
        // Guardar packing list
        const ocPackingListId = extractID(
          await lastValueFrom(
            this.purchaseOrdersDeclareArrivalService.ocPackingListGuardarOActualizar(
              data.ocPackingList,
            ),
          ),
        );
        data = {
          ...data,
          ocPackingList: {
            ...data.ocPackingList,
            IdOcPackingList: ocPackingListId,
          },
          items: _map(data.items, (o: IItemsDeclareArrival) => ({
            ...o,
            ocPartida: {...o.ocPartida, IdOcPackingList: ocPackingListId},
          })),
        };
        // Iterar arreglo de items
        for (let i = 0; i < data.items.length; i++) {
          let item: IItemsDeclareArrival = filter(data.items, (o, index: number) => index === i)[0];
          if (
            (provider.NombreProveedor === 'USP' || provider.NombreProveedor === 'EP') &&
            item.vProducto.Tipo !== 'Publicaciones'
          ) {
            if (!item.withoutCertificate && item.certificate) {
              // Subir archivo de certificado de lote
              date = new Date();
              fileName = `${date.getFullYear()}/${provider.IdProveedor}/${
                item.IdProducto
              }/${date.getTime()}/${item.certificate.name}`;
              const certificateFile: ArchivoDetalle = await this.minioService.uploadFile(
                item.certificate,
                fileName,
                MINIO_BUCKETS.Purchases,
              );
              item = {
                ...item,
                selectedCompleteLot: {
                  ...item.selectedCompleteLot,
                  IdArchivoCertificado: certificateFile.IdArchivo,
                },
              };
            }
            item = {
              ...item,
              selectedCompleteLot: {
                ...item.selectedCompleteLot,
                IdCatPaisOrigen: item.selectedCountry.value.toString(),
              },
            };
            const lotId = extractID(
              await lastValueFrom(
                this.productsLotsConfig.LoteGuardarOActualizar(item.selectedCompleteLot),
              ),
            );
            item = {
              ...item,
              ocPartida: {
                ...item.ocPartida,
                IdLote: lotId,
              },
            };
          } else {
            if (
              !item.withoutCertificate &&
              item.certificate &&
              item.vProducto.Tipo !== 'Publicaciones'
            ) {
              date = new Date();
              fileName = `${date.getFullYear()}/${provider.IdProveedor}/${
                item.IdProducto
              }/${date.getTime()}/${item.certificate.name}`;
              const certificateFile: ArchivoDetalle = await this.minioService.uploadFile(
                item.certificate,
                fileName,
                MINIO_BUCKETS.Purchases,
              );
              item = {
                ...item,
                newLot: {
                  ...item.newLot,
                  IdArchivoCertificado: certificateFile.IdArchivo,
                },
              };
            }
            item = {
              ...item,
              newLot: {
                ...item.newLot,
                IdCatPaisOrigen: item.selectedCountry.value.toString(),
              },
            };
            const lotId = extractID(
              await lastValueFrom(this.productsLotsConfig.LoteGuardarOActualizar(item.newLot)),
            );
            item = {
              ...item,
              ocPartida: {
                ...item.ocPartida,
                IdLote: lotId,
              },
            };
          }
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
            return declareArrivalDetailsActions.GENERATE_FAILED();
          }
          this.logger.debug(
            servicesLogger.generateMessage(
              FILE_NAME,
              servicesLogger.LOG_SUCCEEDED,
              'Al guardar la ocPartida.',
            ),
            itemId,
          );
        }

        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        this.store.dispatch(
          utilsActions.SET_LOADING_SUCCESS({
            active: true,
            message: 'Has generado una lista de arribo',
          }),
        );
        return declareArrivalDetailsActions.GENERATE_SUCCESS();
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
        return of(declareArrivalDetailsActions.GENERATE_FAILED());
      }),
    ),
  );
  // Refrescar proveedor seleccionado
  fetchProvidersDeclare$ = createEffect(() =>
    this.actions$.pipe(
      ofType(declareArrivalDetailsActions.GENERATE_SUCCESS),
      withLatestFrom(this.store.select(declareArrivalDetailsSelectors.selectProvider)),
      mergeMap(([action, provider]) => {
        const params = new FiltersOnlyActive(true);
        params.Filters.push({
          NombreFiltro: 'IdProveedor',
          ValorFiltro: provider.IdProveedor,
        });
        return this.purchaseOrdersDeclareArrivalService
          .vOcProveedorDeclararArriboQueryResult(params)
          .pipe(
            map((response: QueryResultVOcProveedorDeclararArribo) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Obtener proveedores',
                ),
                response,
              );
              return declareArrivalDetailsActions.REFRESH_SELECTED_PROVIDER({
                selectedProvider: response.Results[0],
              });
            }),
            catchError((error) => {
              this.store.dispatch(
                declareArrivalListActions.SET_STATUS_API({
                  status: API_REQUEST_STATUS_FAILED,
                }),
              );
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Obtener proveedores',
                ),
                error,
              );
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );
}
