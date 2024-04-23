import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';
import {NGXLogger} from 'ngx-logger';
/*Utils Imports*/
import {isEmpty, map as _map} from 'lodash-es';

/*Actions Import*/
import {uploadInvoiceDetailsActions} from '@appActions/pendings/purchasing-manager/upload-invoice';
/*Selectors Imports*/
import {uploadInvoiceDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/upload-invoice';
/*Models Import*/
import * as apiLogistic from 'api-logistica';
import {
  CompradorActualizarPrecioProductoParametro,
  OcFacturaProveedor,
  ParametroCalcularMontosImportacion,
} from 'api-logistica';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  MINIO_BUCKETS,
} from '@appUtil/common.protocols';
import {Router} from '@angular/router';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import * as servicesLogger from '@appUtil/logger';
import {addRowIndex, extractID} from '@appUtil/util';

import {RETURN_EMPTY, SET_LOADING} from '@appActions/utils/utils.action';
import * as apiCatalogs from 'api-catalogos';
import {ArchivoDetalle, RequestMoverArchivo, UrlSubirArchivo} from 'api-catalogos';
import {IFileUpload} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-details/upload-invoice-details.models';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'Upload-Invoice-Details';

@Injectable()
export class UploadInvoiceDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private route: Router,
    private purchaseOrderDashboardService: apiLogistic.ProcesosL06OrdenDeCompraDashboardService,
    private purchaseOrderUploadServices: apiLogistic.ProcesosL06OrdenDeCompraCargarFacturaService,
    private purchaseOrderUploadFileServices: apiLogistic.ProcesosL06OrdenDeCompraCargarFacturaCalculosService,
    private purchaseOrderServices: apiLogistic.ProcesosL06OrdenDeCompraService,
    private filesSystemService: apiCatalogs.SistemaArchivosService,
    private contactsServiceProviders: apiCatalogs.ConfiguracionProveedoresService,
  ) {}

  setProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadInvoiceDetailsActions.SET_CURRENT_PROVIDER),
      mergeMap((action) => {
        this.route.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.uploadInvoice.uploadInvoice,
          appRoutes.uploadInvoice.details,
        ]);
        this.store.dispatch(
          uploadInvoiceDetailsActions.FETCH_PURCHASE_ORDERS_LOAD({
            isFirstPage: true,
          }),
        );
        return of(RETURN_EMPTY());
      }),
    ),
  );
  getIsNational$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadInvoiceDetailsActions.SET_CURRENT_PROVIDER),
      mergeMap((action) => {
        return this.purchaseOrderDashboardService
          .vProveedorCCargarFacturaObtenerProveedorEsNacional(action.provider.IdProveedor)
          .pipe(
            map((response) => {
              return uploadInvoiceDetailsActions.PROVIDER_IS_NATIONAL({
                isNational: response,
              });
            }),
          );
      }),
    ),
  );
  getProviderContacts = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadInvoiceDetailsActions.SET_CURRENT_PROVIDER),
      mergeMap((action) => {
        return this.contactsServiceProviders
          .ProveedorExtensionsObtenerListaContactoDetalle(action.provider.IdProveedor)
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
              return uploadInvoiceDetailsActions.SET_PROVIDER_CONTACT({
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

  fetchPurchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        uploadInvoiceDetailsActions.FETCH_PURCHASE_ORDERS_LOAD,
        uploadInvoiceDetailsActions.FETCH_MORE_PURCHASE_ORDER,
        uploadInvoiceDetailsActions.SET_TERM_SEARCH,
        uploadInvoiceDetailsActions.SET_OPTION_SORT,
      ),
      withLatestFrom(this.store.select(uploadInvoiceDetailsSelectors.selectParams)),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          uploadInvoiceDetailsActions.SET_STATUS_API_ORDERS({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.purchaseOrderDashboardService.vOcOrdenDeCompraQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Obtener ordenes de compra',
              ),
              response,
            );

            const result = addRowIndex(params.desiredPage, params.pageSize, response.Results);
            if (
              action.type === '[Upload-Invoice-Details] Fetch Purchase Orders Load' &&
              response.TotalResults > 0
            ) {
              this.store.dispatch(
                uploadInvoiceDetailsActions.FETCH_ITEMS_PURCHASE_ORDER_LOAD({
                  oc: {...result[0], needsToReloadItems: true},
                }),
              );
            }
            this.store.dispatch(
              uploadInvoiceDetailsActions.SET_STATUS_API_ORDERS({
                status: API_REQUEST_STATUS_SUCCEEDED,
              }),
            );
            return uploadInvoiceDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS({
              purchaseOrder: {
                TotalResults: response.TotalResults,
                Results: _map(result, (item) => {
                  return {...item, needsToReloadItems: true};
                }),
              },
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Obtener ordenes de compra',
              ),
              error,
            );
            this.store.dispatch(
              uploadInvoiceDetailsActions.SET_STATUS_API_ORDERS({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );
  fetchItemsOC = createEffect(() =>
    this.actions$.pipe(
      ofType(
        uploadInvoiceDetailsActions.FETCH_ITEMS_PURCHASE_ORDER_LOAD,
        uploadInvoiceDetailsActions.SELECTED_PURCHASE_ORDER,
      ),
      withLatestFrom(this.store.select(uploadInvoiceDetailsSelectors.selectOrderSelected)),
      mergeMap(([action, order]) => {
        if (order.needsToReloadItems) {
          const params = new FiltersOnlyActive();
          params.Filters.push({
            NombreFiltro: 'IdOcOrdenDeCompra',
            ValorFiltro: order.IdOcOrdenDeCompra,
          });
          return this.purchaseOrderUploadServices
            .vPartidaComprasCargarFacturaQueryResult(params)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al Obtener partidas de la orden de compra',
                  ),
                  response,
                );
                return uploadInvoiceDetailsActions.FETCH_ITEMS_PURCHASE_ORDER_SUCCESS({
                  items: addRowIndex(1, 24, response.Results),
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al Obtener partidas de la orden de compra',
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
  calculateAmount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        uploadInvoiceDetailsActions.DELETE_ITEM_INVOICE,
        uploadInvoiceDetailsActions.SET_ITEM_INVOICE,
        uploadInvoiceDetailsActions.SET_PARAM_INVOICE,
        uploadInvoiceDetailsActions.MODIFIED_PRICE_ITEM_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(uploadInvoiceDetailsSelectors.selectOrderSelected),
        this.store.select(uploadInvoiceDetailsSelectors.selectInvoiceData),
        this.store.select(uploadInvoiceDetailsSelectors.selectItemsOfInvoice),
      ),
      mergeMap(([action, order, invoiceData, list]) => {
        const param: ParametroCalcularMontosImportacion = {} as ParametroCalcularMontosImportacion;
        param.IdOcOrdenDeCompra = order.IdOcOrdenDeCompra;
        param.MontoFlete = invoiceData.amount;
        param.ListaIdOcPartida =
          list.length > 0
            ? list.map((item) => {
                return item.IdOcPartida;
              })
            : [];
        return this.purchaseOrderUploadFileServices.CalcularMontosImportacionProcess(param).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Calcular Monto de Importación',
              ),
              response,
            );
            return uploadInvoiceDetailsActions.SET_CALCULATED_DATA({
              amounts: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Calcular Monto de Importación',
              ),
              error,
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );
  // Subir archivos de la factura
  uploadAdditionalFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadInvoiceDetailsActions.UPLOAD_INVOICE_FILES_LOAD),
      withLatestFrom(
        this.store.select(uploadInvoiceDetailsSelectors.selectOrderSelected),
        this.store.select(uploadInvoiceDetailsSelectors.selectArrayFiles),
      ),
      switchMap(([action, order, files]) => {
        if (isEmpty(files)) {
          return of(RETURN_EMPTY());
        }
        this.store.dispatch(SET_LOADING({payload: true}));
        // FIXME: Creo que esto no funciona. No debería ir el pipe
        const filesUrlRequest: any[] = _map(files, (o: File) =>
          this.filesSystemService.ArchivoExtensionsObtenerUrlSubirArchivo().pipe(
            map(
              (response: UrlSubirArchivo): IFileUpload => ({
                order,
                file: o,
                url: response,
              }),
            ),
          ),
        );
        return forkJoin(filesUrlRequest).pipe(
          map((response: Array<IFileUpload>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener url para subir archivos',
              ),
              response,
            );
            return response;
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener url para subir archivos adicionales',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(RETURN_EMPTY());
          }),
        );
      }),
      switchMap((fileData: Array<IFileUpload>) => {
        const filesRequest: any[] = _map(fileData, (o: IFileUpload) =>
          fetch(o.url.UploadUrl, {
            method: 'PUT',
            body: o.file,
          }),
        );
        return forkJoin(filesRequest).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al subir los archivos a temporal',
              ),
              response,
            );
            return fileData;
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al subir los archivos a temporal',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(RETURN_EMPTY());
          }),
        );
      }),
      withLatestFrom(this.store.select(uploadInvoiceDetailsSelectors.selectInvoiceData)),
      switchMap(([fileData, dataInvoice]) => {
        const date = new Date();
        const filesMinIORequest: any[] = _map(fileData, (o: IFileUpload) => {
          const body: RequestMoverArchivo = {
            OriginBucketName: o.url.BucketName,
            OriginFileName: o.url.FileKey,
            DestinyBucketName: MINIO_BUCKETS.Purchases,
            DestinyFileName: `${date.getFullYear()}/${o.order.IdProveedor}/${
              o.order.IdOcOrdenDeCompra
            }/${Date.now()}/${dataInvoice.invoiceNum}/${o.file.name}`,
          };
          return this.filesSystemService
            .ArchivoExtensionsMoverArchivoMinIO(body)
            .pipe(map((response: ArchivoDetalle) => ({...o, fileDetail: response})));
        });
        return forkJoin(filesMinIORequest).pipe(
          map((response: Array<IFileUpload>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al mover los archivos de la factura',
              ),
              response,
            );
            return uploadInvoiceDetailsActions.UPLOAD_INVOICE_FILES_SUCCESS({
              fileData: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al mover los archivos de la factura',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );
  generateInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadInvoiceDetailsActions.UPLOAD_INVOICE_FILES_SUCCESS),
      withLatestFrom(
        this.store.select(uploadInvoiceDetailsSelectors.selectImportAmount),
        this.store.select(uploadInvoiceDetailsSelectors.selectProvider),
        this.store.select(uploadInvoiceDetailsSelectors.selectInvoiceData),
      ),
      mergeMap(([action, amounts, provider, dataInvoice]) => {
        // Fechas

        let params: OcFacturaProveedor = {};
        params = {
          ...amounts,
          FechaUltimaActualizacion: DEFAULT_DATE,
          Activo: true,
          IdProveedor: provider.IdProveedor,
          FTE: amounts.MontoFlete,
          FechaFacturacion: dataInvoice.invoiceDate,
          FechaRegistro: dataInvoice.receptionDate,
          MontoTotal: amounts.Total,
        };
        params.IdArchivo = action.fileData[0].fileDetail.IdArchivo;

        if (action.fileData.length > 1) {
          params.IdArchivoXml = action.fileData[1].fileDetail.IdArchivo;
        }
        return this.purchaseOrderServices.ocFacturaProveedorGuardarOActualizar(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Guardar la Factura',
              ),
              response,
            );
            return extractID(response);
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Guardar la Factura',
              ),
              error,
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
      withLatestFrom(
        this.store.select(uploadInvoiceDetailsSelectors.selectItemsOfInvoice),
        this.store.select(uploadInvoiceDetailsSelectors.selectOrderSelected),
      ),
      switchMap(([data, list, order]) => {
        const request = list.map((item) => {
          return this.purchaseOrderUploadServices.CompradorCargarFacturaProductoProcess({
            idOcPartida: item.IdOcPartida,
            // idOcOrdenDeCompra: order.IdOcOrdenDeCompra,
            idOcFacturaProveedor: data,
          });
        });
        return forkJoin(request).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Guardar los productos de la Factura',
              ),
              response,
            );
            this.store.dispatch(uploadInvoiceDetailsActions.CLEAN_INPUTS_FILES());
            setTimeout(
              () => this.store.dispatch(uploadInvoiceDetailsActions.CLEAN_INVOICE_LOCAL_DATA()),
              50,
            );
            if (isEmpty(order.items)) {
              this.store.dispatch(SET_LOADING({payload: false}));
              return uploadInvoiceDetailsActions.FETCH_PURCHASE_ORDERS_LOAD({
                isFirstPage: true,
              });
            }
            // Solo actualizar la orden seleccionada
            return uploadInvoiceDetailsActions.FETCH_SELECTED_PURCHASE_ORDER_LOAD({
              IdOcOrdenDeCompra: order.IdOcOrdenDeCompra,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Guardar la Factura',
              ),
              error,
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );

  updatePrice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadInvoiceDetailsActions.MODIFIED_PRICE_ITEM),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const params: CompradorActualizarPrecioProductoParametro = {
          Catalogo: false,
          IdOcOrdenDeCompra: action.item.IdOcOrdenDeCompra,
          IdProducto: action.item.IdProducto,
          PrecioLista: action.item.PrecioLista,
        };
        return this.purchaseOrderUploadServices
          .CompradorActualizarPrecioProductoProcess(params)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al Modificar el precio',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));

              return uploadInvoiceDetailsActions.MODIFIED_PRICE_ITEM_SUCCESS({
                item: action.item,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al Modificar el precio',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );

  fetchSelectedPurchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadInvoiceDetailsActions.FETCH_SELECTED_PURCHASE_ORDER_LOAD),
      mergeMap((action) => {
        const params = new FiltersOnlyActive(true);
        params.Filters.push({
          NombreFiltro: 'IdOcOrdenDeCompra',
          ValorFiltro: action.IdOcOrdenDeCompra,
        });
        return this.purchaseOrderDashboardService.vOcOrdenDeCompraQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al actualizar la orden de compra seleccionada',
              ),
              response,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return uploadInvoiceDetailsActions.FETCH_SELECTED_PURCHASE_ORDER_SUCCESS({
              purchaseOrder: response.Results[0],
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al actualizar la orden de compra seleccionada',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );
}
