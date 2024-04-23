import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, lastValueFrom, of} from 'rxjs';

// Services
import {MinioService} from '@appServices/minio/minio.service';

// Models
import {ArchivoDetalle, ConfiguracionProductosLotesService} from 'api-catalogos';

// Actions
import {
  declareTransitArrivalActions,
  declareTransitArrivalDetailsActions,
  declareTransitArrivalListActions,
} from '@appActions/pendings/imports-phs/declare-transit-arrival';
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';

// Selectors
import {declareTransitArrivalDetailsSelectors} from '@appSelectors/pendings/imports-phs/declare-transit-arrival';
import {selectIdUser} from '@appSelectors/auth/auth.selectors';

// Utils
import {findIndex, isEmpty, map as _map} from 'lodash-es';

import * as servicesLogger from '@appUtil/logger';
import {extractID, getArrayForDropDownList} from '@appUtil/util';

import {
  ProcesosL06OrdenDeCompraDeclararArribosService,
  ProcesosL06OrdenDeCompraPartidasService,
  QueryResultVOcOrdenDeCompraDeclararArribo,
  QueryResultVOcPartidaDetalle,
  QueryResultVOcProveedorDeclararArribo,
  VOcOrdenDeCompraDeclararArribo,
  VOcPartidaDetalle,
} from 'api-logistica';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  MINIO_BUCKETS,
} from '@appUtil/common.protocols';
import {
  IDeclareTransitArrivalEffect,
  IItemsDeclareTransitArrival,
  initialLot,
  IPurchaseOrderTransitArrival,
} from '@appModels/store/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-details/declare-transit-arrival-details.models';
import {
  getSelectedCompleteLot,
  getSelectedCountry,
  getSelectedLot,
} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details.models';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'declare-transit-arrival-details.effects.ts';

@Injectable()
export class DeclareTransitArrivalDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private minioService: MinioService,
    private productsLotsConfig: ConfiguracionProductosLotesService,
    private purchaseOrdersDeclareArrivalService: ProcesosL06OrdenDeCompraDeclararArribosService,
    private purchaseOrderItemServices: ProcesosL06OrdenDeCompraPartidasService,
  ) {}

  viewDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(declareTransitArrivalDetailsActions.SET_SELECTED_PROVIDER),
      mergeMap((action) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        this.router
          .navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.declareTransitArrival.declareTransitArrival,
            appRoutes.declareTransitArrival.details,
          ])
          .then(() => {
            this.store.dispatch(
              declareTransitArrivalActions.SET_IS_IN_DETAILS_VIEW({
                isInDetailsView: true,
              }),
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          });
        this.store.dispatch(declareTransitArrivalDetailsActions.FETCH_PURCHASE_ORDERS_LOAD());
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // Obtener Ordenes de compra
  fetchPurchaseOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        declareTransitArrivalDetailsActions.FETCH_PURCHASE_ORDERS_LOAD,
        declareTransitArrivalDetailsActions.SET_SELECTED_TAB_OPTION,
        declareTransitArrivalDetailsActions.SET_SEARCH_TERM,
        declareTransitArrivalDetailsActions.SET_SORT_SELECTED,
        declareTransitArrivalDetailsActions.REFRESH_SELECTED_PROVIDER,
      ),
      withLatestFrom(
        this.store.select(declareTransitArrivalDetailsSelectors.selectNeedsToReloadOrders),
        this.store.select(declareTransitArrivalDetailsSelectors.selectGetOrdersFilters),
      ),
      mergeMap(([action, needsToReloadOrders, params]) => {
        if (needsToReloadOrders) {
          this.store.dispatch(
            declareTransitArrivalDetailsActions.SET_ORDERS_STATUS({
              purchaseOrdersStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
          this.store.dispatch(
            declareTransitArrivalDetailsActions.SET_ITEMS_STATUS({
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
                const orders: Array<IPurchaseOrderTransitArrival> = _map(
                  response.Results,
                  (order: VOcOrdenDeCompraDeclararArribo, index: number) =>
                    ({
                      ...order,
                      Index: index,
                      isSelected: index === 0,
                      needsToReloadItems: true,
                      items: [],
                      packingList: null,
                    } as IPurchaseOrderTransitArrival),
                );
                this.store.dispatch(
                  declareTransitArrivalDetailsActions.INITIAL_PURCHASE_ORDER({
                    order: {
                      ...orders[0],
                    },
                  }),
                );
                this.store.dispatch(
                  declareTransitArrivalDetailsActions.SET_ORDERS_STATUS({
                    purchaseOrdersStatus: API_REQUEST_STATUS_SUCCEEDED,
                  }),
                );
                if (isEmpty(orders)) {
                  this.store.dispatch(
                    declareTransitArrivalDetailsActions.SET_ITEMS_STATUS({
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
                      appRoutes.declareTransitArrival.declareTransitArrival,
                    ]);
                  }
                }
                return declareTransitArrivalDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS({
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
                  declareTransitArrivalDetailsActions.SET_ORDERS_STATUS({
                    purchaseOrdersStatus: API_REQUEST_STATUS_FAILED,
                  }),
                );
                return EMPTY;
              }),
            );
        } else {
          this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          return of(declareTransitArrivalDetailsActions.FETCH_ITEMS_LOAD());
        }
      }),
    ),
  );

  // Obtener Partidas
  fetchItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        declareTransitArrivalDetailsActions.FETCH_ITEMS_LOAD,
        declareTransitArrivalDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS,
        declareTransitArrivalDetailsActions.SET_SELECTED_ORDER,
      ),
      withLatestFrom(
        this.store.select(declareTransitArrivalDetailsSelectors.selectedOrder),
        this.store.select(declareTransitArrivalDetailsSelectors.selectGetItemsFilters),
      ),
      mergeMap(([action, selectedOrder, params]) => {
        if (!isEmpty(selectedOrder) && selectedOrder.needsToReloadItems) {
          this.store.dispatch(
            declareTransitArrivalDetailsActions.SET_ITEMS_STATUS({
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
                declareTransitArrivalDetailsActions.SET_ITEMS_STATUS({
                  itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              const items: Array<IItemsDeclareTransitArrival> = _map(
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
              return declareTransitArrivalDetailsActions.FETCH_ITEMS_SUCCESS({
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
                declareTransitArrivalDetailsActions.SET_ITEMS_STATUS({
                  itemsStatus: API_REQUEST_STATUS_FAILED,
                }),
              );
              return EMPTY;
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // Generar
  confirmItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(declareTransitArrivalDetailsActions.GENERATE_LOAD),
      withLatestFrom(
        this.store.select(declareTransitArrivalDetailsSelectors.selectedItems),
        this.store.select(declareTransitArrivalDetailsSelectors.selectOcPackingList),
        this.store.select(declareTransitArrivalDetailsSelectors.selectPackingList),
        this.store.select(declareTransitArrivalDetailsSelectors.selectProvider),
        this.store.select(selectIdUser),
      ),
      mergeMap(async ([action, items, ocPackingList, packingList, provider, idUser]) => {
        if (!packingList || isEmpty(items) || isEmpty(ocPackingList)) {
          return declareTransitArrivalDetailsActions.GENERATE_FAILED();
        }
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        let data: IDeclareTransitArrivalEffect = {
          items,
          ocPackingList,
          packingList,
        };
        // Subir Archivo
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
            IdUsuario: idUser,
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
        // Meter IdImpListaSrribo de la primera partida vOcPartidadetalle.ocPackingList.IdImpListaArribo al OcPacking list
        data = {
          ...data,
          ocPackingList: {
            ...data.ocPackingList,
            IdOcPackingList: ocPackingListId,
          },
          items: _map(data.items, (o: IItemsDeclareTransitArrival) => ({
            ...o,
            ocPartida: {...o.ocPartida, IdOcPackingList: ocPackingListId},
          })),
        };
        // Iterar arreglo de items
        for (let item of data.items) {
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
                message: 'Ha ocurrido un error en el servicio web',
              }),
            );
            return declareTransitArrivalDetailsActions.GENERATE_FAILED();
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
        return declareTransitArrivalDetailsActions.GENERATE_SUCCESS();
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
        return of(declareTransitArrivalDetailsActions.GENERATE_FAILED());
      }),
    ),
  );

  // Refrescar proveedor seleccionado
  fetchProvidersDeclare$ = createEffect(() =>
    this.actions$.pipe(
      ofType(declareTransitArrivalDetailsActions.GENERATE_SUCCESS),
      withLatestFrom(this.store.select(declareTransitArrivalDetailsSelectors.selectProvider)),
      mergeMap(([action, provider]) => {
        const params = new FiltersOnlyActive(true);
        params.Filters.push(
          {
            NombreFiltro: 'IdProveedor',
            ValorFiltro: provider.IdProveedor,
          },
          {
            NombreFiltro: 'PHS',
            ValorFiltro: true,
          },
        );
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
              return declareTransitArrivalDetailsActions.REFRESH_SELECTED_PROVIDER({
                selectedProvider: response.Results[0],
              });
            }),
            catchError((error) => {
              this.store.dispatch(
                declareTransitArrivalListActions.SET_STATUS_API({
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
              return EMPTY;
            }),
          );
      }),
    ),
  );
}
