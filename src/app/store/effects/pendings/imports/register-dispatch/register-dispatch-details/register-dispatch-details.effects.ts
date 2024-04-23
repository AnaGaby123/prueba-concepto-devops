import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {forkJoin, lastValueFrom, of} from 'rxjs';

// Services
import {MinioService} from '@appServices/minio/minio.service';

// Models
import * as apiCatalogs from 'api-catalogos';
import {ArchivoDetalle, QueryResultUsuario} from 'api-catalogos';
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY, SET_LOADING_ERROR, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import {
  ProcesosL07ImportacionesRegistrarDespachoService,
  ProcesosL07ImportacionesService,
  QueryResultVRDImpOrdenDespacho,
  VRDImpOrdenDespacho,
  VRDProveedorOrdenDespachoDetalle,
} from 'api-logistica';
import {
  IDispatchOrder,
  IItemsDispatchOrder,
} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-details/register-dispatch-details.models';
import {FiltersOnlyActive} from '@appModels/filters/Filters';

// Actions
import {
  registerDispatchActions,
  registerDispatchDetailsActions,
} from '@appActions/pendings/imports/register-dispatch';

// Selectors
import {registerDispatchDetailsSelectors} from '@appSelectors/pendings/imports/register-dispatch';

// Utils
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
  MINIO_BUCKETS,
} from '@appUtil/common.protocols';
import * as servicesLogger from '@appUtil/logger';
import {extractID, getArrayForDropDownList} from '@appUtil/util';
import {findIndex, isEmpty, map as _map} from 'lodash-es';
import {IUploadFileCustom} from '@appModels/files/files.models';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'register-dispatch-details.effects.ts';

@Injectable()
export class RegisterDispatchDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private minioService: MinioService,
    private usersSystemService: apiCatalogs.SistemaUsuariosService,
    private importsService: ProcesosL07ImportacionesService,
    private registerDispatchImportsService: ProcesosL07ImportacionesRegistrarDespachoService,
  ) {}

  viewDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerDispatchDetailsActions.SET_SELECTED_AGENT),
      mergeMap((action) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        this.router
          .navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.registerDispatch.registerDispatch,
            appRoutes.registerDispatch.details,
          ])
          .then(() => {
            this.store.dispatch(
              registerDispatchActions.SET_IS_IN_DETAILS_VIEW({
                isInDetailsView: true,
              }),
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            this.store.dispatch(registerDispatchDetailsActions.FETCH_USERS_BUYERS_LOAD());
            this.store.dispatch(registerDispatchDetailsActions.FETCH_PURCHASE_ORDERS_LOAD());
          });
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // Obtener catálogo de compradores
  getCatCustomer = createEffect(() =>
    this.actions$.pipe(
      ofType(registerDispatchDetailsActions.FETCH_USERS_BUYERS_LOAD),
      mergeMap((action) => {
        const body = new FiltersOnlyActive();
        body.Filters.push({NombreFiltro: 'Comprador', ValorFiltro: true});
        return this.usersSystemService.UsuarioQueryResult(body).pipe(
          map((response: QueryResultUsuario) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al consultar compradores.',
              ),
              response,
            );
            return registerDispatchDetailsActions.FETCH_USERS_BUYERS_SUCCESS({
              usersList: getArrayForDropDownList(response.Results, 'IdUsuario', 'NombreCompleto'),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al consultar compradores.',
              ),
              error,
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );

  // Obtener ordenes de despacho
  fetchPurchaseOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        registerDispatchDetailsActions.FETCH_PURCHASE_ORDERS_LOAD,
        registerDispatchDetailsActions.SET_SEARCH_TERM,
        registerDispatchDetailsActions.FINALIZE_OD_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(registerDispatchDetailsSelectors.selectNeedsToReloadOrders),
        this.store.select(registerDispatchDetailsSelectors.selectGetDispatchOrdersFilters),
      ),
      mergeMap(([action, needsToReloadOrders, params]) => {
        if (needsToReloadOrders) {
          this.store.dispatch(
            registerDispatchDetailsActions.SET_ORDERS_STATUS({
              dispatchOrdersStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
          this.store.dispatch(
            registerDispatchDetailsActions.SET_ITEMS_STATUS({
              itemsStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
          return this.registerDispatchImportsService.vRDImpOrdenDespachoQueryResult(params).pipe(
            map((response: QueryResultVRDImpOrdenDespacho) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar ordenes de despacho.',
                ),
                response,
              );
              const orders: Array<IDispatchOrder> = _map(
                response.Results,
                (order: VRDImpOrdenDespacho, index: number) => ({
                  ...order,
                  Index: index,
                  isSelected: index === 0,
                  needsToReloadItems: true,
                  items: [],
                }),
              );
              this.store.dispatch(
                registerDispatchDetailsActions.INITIAL_PURCHASE_ORDER({
                  dispatchOrder: {
                    ...orders[0],
                  },
                }),
              );
              this.store.dispatch(
                registerDispatchDetailsActions.SET_ORDERS_STATUS({
                  dispatchOrdersStatus: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );

              if (isEmpty(orders)) {
                this.store.dispatch(
                  registerDispatchDetailsActions.SET_ITEMS_STATUS({
                    itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
                  }),
                );
                if (findIndex(params.Filters, (o) => o.NombreFiltro === 'Folio') !== -1) {
                  this.router.navigate([
                    appRoutes.protected,
                    appRoutes.pendings.pendings,
                    appRoutes.registerDispatch.registerDispatch,
                  ]);
                }
              }
              return registerDispatchDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS({
                dispatchOrders: orders,
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
                registerDispatchDetailsActions.SET_ORDERS_STATUS({
                  dispatchOrdersStatus: API_REQUEST_STATUS_FAILED,
                }),
              );
              return of(RETURN_EMPTY());
            }),
          );
        } else {
          this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          return of(registerDispatchDetailsActions.FETCH_ITEMS_LOAD());
        }
      }),
    ),
  );

  // Obtener items
  fetchItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        registerDispatchDetailsActions.FETCH_ITEMS_LOAD,
        registerDispatchDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS,
        registerDispatchDetailsActions.SET_SELECTED_ORDER,
      ),
      withLatestFrom(this.store.select(registerDispatchDetailsSelectors.selectedDispatchOrder)),
      mergeMap(([action, selectedOrder]) => {
        if (!isEmpty(selectedOrder) && selectedOrder.needsToReloadItems) {
          this.store.dispatch(
            registerDispatchDetailsActions.SET_ITEMS_STATUS({
              itemsStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
          return this.registerDispatchImportsService
            .RegistrarDespachoGraficaTotalesRegistrarDespachoProveedoresOrdenDespacho(
              selectedOrder.IdImpOrdenDespacho,
            )
            .pipe(
              map((response: Array<VRDProveedorOrdenDespachoDetalle>) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al consultar ordenes de despacho por proveedor.',
                  ),
                  response,
                );
                this.store.dispatch(
                  registerDispatchDetailsActions.SET_ITEMS_STATUS({
                    itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
                  }),
                );
                const items: Array<IItemsDispatchOrder> = _map(
                  response,
                  (o: VRDProveedorOrdenDespachoDetalle, index: number) => ({
                    ...o,
                    Index: index,
                  }),
                );
                return registerDispatchDetailsActions.FETCH_ITEMS_SUCCESS({
                  list: items,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al consultar ordenes de despacho por proveedor.',
                  ),
                  error,
                );
                this.store.dispatch(
                  registerDispatchDetailsActions.SET_ITEMS_STATUS({
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

  // Finalizar
  confirmItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerDispatchDetailsActions.FINALIZE_OD_LOAD),
      withLatestFrom(
        this.store.select(registerDispatchDetailsSelectors.validatorForFinalizeButton),
        this.store.select(registerDispatchDetailsSelectors.selectedDispatchOrder),
      ),
      mergeMap(async ([action, validator, order]) => {
        if (!validator) {
          return registerDispatchDetailsActions.FINALIZE_OD_FAILED();
        }
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));

        // Subir archivo
        const date = new Date();
        const fileName = `${date.getFullYear()}/${order.IdImpOrdenDespacho}/${date.getTime()}/${
          order.petitionFile.name
        }`;
        const petitionFile: ArchivoDetalle = await this.minioService.uploadFile(
          order.petitionFile,
          fileName,
          MINIO_BUCKETS.Imports,
        );

        // Put a ImpOrdenDespacho
        const newOrder: IDispatchOrder = {
          ...order,
          IdArchivoPedimento: petitionFile.IdArchivo,
        };
        const dispatchOrderId = extractID(
          await lastValueFrom(this.importsService.impOrdenDespachoGuardarOActualizar(newOrder)),
        );

        // Subir evidencias
        const filesRequest: Array<IUploadFileCustom> = _map(
          order.evidenceFiles,
          (o: File, index: number) => ({
            file: o,
            name: `${date.getFullYear()}/${order.IdImpOrdenDespacho}/${date.getTime()}${index}/${
              o.name
            }`,
            destinyBucketName: MINIO_BUCKETS.Imports,
          }),
        );
        const filesDetails: Array<ArchivoDetalle> = await this.minioService.uploadFiles(
          filesRequest,
        );
        const evidencesRequest: Array<any> = _map(order.evidenceFiles, (o: File, index: number) =>
          this.registerDispatchImportsService.impArchivoEvidenciaGuardarOActualizar({
            Activo: true,
            FechaRegistro: DEFAULT_DATE,
            FechaUltimaActualizacion: DEFAULT_DATE,
            IdArchivo: filesDetails[index].IdArchivo,
            IdImpArchivoEvidencia: DEFAULT_UUID,
            IdImpOrdenDespacho: order.IdImpOrdenDespacho,
          }),
        );
        const evidences = await lastValueFrom(forkJoin(evidencesRequest));

        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        this.store.dispatch(
          utilsActions.SET_LOADING_SUCCESS({
            active: true,
            message: 'Has registrado ',
            extraMessage: 'el despacho de la OD-' + order.Folio,
          }),
        );
        return registerDispatchDetailsActions.FINALIZE_OD_SUCCESS();
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al registrar el despacho.',
          ),
          error,
        );
        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        return of(registerDispatchDetailsActions.FINALIZE_OD_FAILED());
      }),
    ),
  );

  readBarcode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerDispatchDetailsActions.READ_BARCODE_LOAD),
      withLatestFrom(this.store.select(registerDispatchDetailsSelectors.selectedDispatchOrder)),
      mergeMap(([action, order]) => {
        if (action.barcode === order.NumeroPedimento) {
          this.store.dispatch(registerDispatchDetailsActions.READ_BARCODE_SUCCESS());
          this.store.dispatch(
            SET_LOADING_SUCCESS({
              active: true,
              message: `Lectura del código de barras del pedimento de la`,
              successText: `OD-${order.Folio} Correcta.`,
            }),
          );
          this.store.dispatch(registerDispatchDetailsActions.SET_ACTUAL_STEP({actualStep: 3}));
        } else {
          this.store.dispatch(
            SET_LOADING_ERROR({
              active: true,
              message: `Lectura del código de barras del pedimento de la OD-${order.Folio} incorrecto`,
            }),
          );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
