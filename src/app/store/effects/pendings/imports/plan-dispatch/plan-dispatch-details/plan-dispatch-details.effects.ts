import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {of} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {Router} from '@angular/router';

// Models
// Services
import {
  GroupQueryResultVPDImpListaArriboPartidaDetalle,
  ProcesosL07ImportacionesPlanificarDespachoService,
  ProcesosL07ImportacionesService,
  ProveedorListaArriboObj,
  QueryResultVImpOrdenDespachoDetalle,
  QueryResultVPDImpListaArriboPartidaDetalle,
  VImpOrdenDespachoDetalle,
  VPDImpListaArriboPartidaDetalle,
} from 'api-logistica';
import {
  IDispatchOrder,
  IGroupArrivalList,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-details/plan-dispatch-details.models';

// Actions
import {
  planDispatchActions,
  planDispatchDetailsActions,
} from '@appActions/pendings/imports/plan-dispatch';
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {GET_EMPRESAS_LOAD} from '@appActions/forms/providers/providers-details/provider-form-step-6-buy-sale-and-licences.actions';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';

// Selectors
import {planDispatchDetailsSelectors} from '@appSelectors/pendings/imports/plan-dispatch';

// Utils
import {isEmpty, map as _map, sumBy} from 'lodash-es';
import * as servicesLogger from '@appUtil/logger';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {extractID} from '@appUtil/util';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'plan-dispatch-details.effects.ts';

@Injectable()
export class PlanDispatchDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router,
    private logger: NGXLogger,
    private planDispatchImportsService: ProcesosL07ImportacionesPlanificarDespachoService,
    private importsService: ProcesosL07ImportacionesService,
  ) {}

  // DOCS: Navigate to details-dashboard and dispatch actions
  viewDetailsDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(planDispatchDetailsActions.SET_SELECTED_PROVIDER),
      mergeMap((action) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        this.router
          .navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.planDispatch.planDispatch,
            appRoutes.planDispatch.details,
          ])
          .then(() => {
            this.store.dispatch(
              planDispatchActions.SET_IS_IN_DETAILS_VIEW({
                isInDetailsView: true,
              }),
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          });
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // DOCS: Navigate to details-steps and dispatch actions
  viewDetailsSteps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        planDispatchDetailsActions.SET_SELECTED_DISPATCH_ORDER,
        planDispatchDetailsActions.INIT_NEW_DISPATCH_ORDER,
      ),
      mergeMap((action) => {
        this.store.dispatch(GET_EMPRESAS_LOAD());
        this.store.dispatch(catalogsActions.GET_LIST_ADUANA_LOAD());
        this.store.dispatch(catalogsActions.GET_LIST_AGENTE_ADUANAL_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_INCOTERM_LOAD());
        this.router
          .navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.planDispatch.planDispatch,
            appRoutes.planDispatch.details,
            appRoutes.planDispatch.steps,
          ])
          .then(() => {
            this.store.dispatch(
              planDispatchActions.SET_IS_IN_DETAILS_VIEW({
                isInDetailsView: true,
              }),
            );
            this.store.dispatch(planDispatchActions.SET_IS_IN_STEPS_VIEW({isInSteps: true}));
          });
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // DOCS: Get saved ODs
  fetchODs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(planDispatchDetailsActions.SET_SELECTED_PROVIDER),
      withLatestFrom(this.store.select(planDispatchDetailsSelectors.selectQueryInfoOds)),
      mergeMap(([action, params]) => {
        return this.planDispatchImportsService.vImpOrdenDespachoDetalleQueryResult(params).pipe(
          map((response: QueryResultVImpOrdenDespachoDetalle) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al consultar las ODs ya guardadas.',
              ),
              response,
            );
            const dispatchOrdersList: Array<IDispatchOrder> = _map(
              response.Results,
              (item: VImpOrdenDespachoDetalle, index: number) => {
                return {
                  ...item,
                  Index: index + 1,
                };
              },
            );
            return planDispatchDetailsActions.FETCH_DISPATCH_ORDERS_SUCCESS({
              dispatchOrdersList,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al consultar las ODs ya guardadas.',
              ),
              error,
            );
            return of(planDispatchDetailsActions.FETCH_DISPATCH_ORDERS_FAILED(error));
          }),
        );
      }),
    ),
  );

  // DOCS: Change step
  changeStep$ = createEffect(() =>
    this.actions$.pipe(
      ofType(planDispatchDetailsActions.SET_STEP_SELECTED),
      mergeMap(({selectedStep, direction}) => {
        if (direction === 'previous') {
          return of(RETURN_EMPTY());
        }
        // DOCS: Dispatch to save only the correct step
        const saves = {
          1: () => this.store.dispatch(planDispatchDetailsActions.SAVE_DISPATCH_ORDER_LOAD()),
        };
        saves[selectedStep]();
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // DOCS: Save step 0
  saveStep0$ = createEffect(() =>
    this.actions$.pipe(
      ofType(planDispatchDetailsActions.SAVE_DISPATCH_ORDER_LOAD),
      withLatestFrom(this.store.select(planDispatchDetailsSelectors.selectedDispatchOrder)),
      mergeMap(([action, dispatchOrder]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        return this.importsService.impOrdenDespachoGuardarOActualizar(dispatchOrder).pipe(
          map((response: string) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Guardar la OD.',
              ),
              response,
            );
            // DOCS: After save, prepare the next screen
            this.store.dispatch(planDispatchDetailsActions.INIT_STEP_1());
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return planDispatchDetailsActions.SAVE_DISPATCH_ORDER_SUCCESS({
              dispatchOrderId: extractID(response),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Guardar la OD.',
              ),
              error,
            );
            // DOCS: If failed, return to the previous step
            this.store.dispatch(
              planDispatchDetailsActions.SET_STEP_SELECTED({
                selectedStep: 0,
                direction: 'previous',
              }),
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return of(planDispatchDetailsActions.SAVE_DISPATCH_ORDER_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: Init step 1
  initStep1$ = createEffect(() =>
    this.actions$.pipe(
      ofType(planDispatchDetailsActions.INIT_STEP_1),
      mergeMap(() => {
        // DOCS: Get the OD updated
        this.store.dispatch(planDispatchDetailsActions.REFRESH_SELECTED_DISPATCH_ORDER_LOAD());
        // DOCS: Dispatch get providers for step 1
        this.store.dispatch(planDispatchDetailsActions.FETCH_STEP_1_PROVIDERS_LOAD());
        // DOCS: Dispatch get Arrival List in Dispatch Order
        this.store.dispatch(planDispatchDetailsActions.FETCH_STEP_1_ARRIVAL_LIST_IN_OD_LOAD());
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // DOCS: Get the updated Dispatch Order
  refreshSelectedDispatchOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(planDispatchDetailsActions.REFRESH_SELECTED_DISPATCH_ORDER_LOAD),
      withLatestFrom(this.store.select(planDispatchDetailsSelectors.selectQueryInfoRefreshOd)),
      mergeMap(([action, params]) => {
        return this.planDispatchImportsService.vImpOrdenDespachoDetalleQueryResult(params).pipe(
          map((response: QueryResultVImpOrdenDespachoDetalle) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener la Orden de despacho actualizada.',
              ),
              response,
            );
            return planDispatchDetailsActions.REFRESH_SELECTED_DISPATCH_ORDER_SUCCESS({
              selectedDispatchOrder: !isEmpty(response.Results) ? response.Results[0] : {},
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener la Orden de despacho actualizada.',
              ),
              error,
            );
            return of(planDispatchDetailsActions.REFRESH_SELECTED_DISPATCH_ORDER_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: Get Step 1 Providers
  getStep1Providers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        planDispatchDetailsActions.FETCH_STEP_1_PROVIDERS_LOAD,
        planDispatchDetailsActions.SET_PROVIDERS_SEARCH_TERM,
        planDispatchDetailsActions.REFRESH_ALL_STEP_1_PROVIDERS_LOAD,
      ),
      withLatestFrom(
        this.store.select(planDispatchDetailsSelectors.selectQueryInfoProviders),
        this.store.select(planDispatchDetailsSelectors.selectedNeedsToReloadProviders),
      ),
      mergeMap(([action, params, needsToReload]) => {
        if (!needsToReload) {
          this.store.dispatch(
            planDispatchDetailsActions.SET_STEP_1_PROVIDERS_STATUS({
              providersStatus: API_REQUEST_STATUS_SUCCEEDED,
            }),
          );
          return of(RETURN_EMPTY());
        }
        return this.planDispatchImportsService
          .vPDImpListaArriboDetalleProveedorListaArriboObj(params)
          .pipe(
            map((response: Array<ProveedorListaArriboObj>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'AL obtener la lista de proveedores step 1',
                ),
                response,
              );
              const providersList = _map(response, (o: ProveedorListaArriboObj, index: number) => ({
                ...o,
                Index: index + 1,
                IsSelected: index === 0,
                arrivalList: [],
                needsToReloadArrivalList: true,
                arrivalListStatus: API_REQUEST_STATUS_DEFAULT,
              }));
              if (!isEmpty(providersList)) {
                this.store.dispatch(
                  planDispatchDetailsActions.INITIAL_PROVIDER_STEP_1({
                    selectedProvider: {
                      ...providersList[0],
                    },
                  }),
                );
              }
              return planDispatchDetailsActions.FETCH_STEP_1_PROVIDERS_SUCCESS({
                providersList,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'AL obtener la lista de proveedores step 1',
                ),
                error,
              );
              return of(planDispatchDetailsActions.FETCH_STEP_1_PROVIDERS_FAILED());
            }),
          );
      }),
    ),
  );

  // DOCS: Get Step 1 Arrival List
  getStep1ArrivalList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        planDispatchDetailsActions.INITIAL_PROVIDER_STEP_1,
        planDispatchDetailsActions.SET_SELECTED_STEP_1_PROVIDER,
        planDispatchDetailsActions.ADD_TO_DISPATCH_ORDER_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(planDispatchDetailsSelectors.selectQueryInfoArrivalList),
        this.store.select(planDispatchDetailsSelectors.selectedNeedsToReloadArrivalList),
      ),
      mergeMap(([action, params, needsToReload]) => {
        if (!needsToReload) {
          return of(RETURN_EMPTY());
        }
        this.store.dispatch(
          planDispatchDetailsActions.SET_STEP_1_ARRIVAL_LIST_STATUS({
            arrivalListStatus: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.planDispatchImportsService
          .vPDImpListaArriboPartidaDetalleQueryResult(params)
          .pipe(
            map((response: QueryResultVPDImpListaArriboPartidaDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'AL obtener la lista de proveedores step 1',
                ),
                response,
              );
              const arrivalList = _map(
                response.Results,
                (o: VPDImpListaArriboPartidaDetalle, index: number) => ({
                  ...o,
                  Index: index + 1,
                  IsOpen: false,
                }),
              );
              return planDispatchDetailsActions.FETCH_STEP_1_ARRIVAL_LIST_SUCCESS({
                arrivalList,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'AL obtener la lista de proveedores step 1',
                ),
                error,
              );
              return of(planDispatchDetailsActions.FETCH_STEP_1_ARRIVAL_LIST_FAILED());
            }),
          );
      }),
    ),
  );

  // DOCS: Get Step 1 Arrival List in Dispatch Order
  getStep1ArrivalListInDispatchOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        planDispatchDetailsActions.FETCH_STEP_1_ARRIVAL_LIST_IN_OD_LOAD,
        planDispatchDetailsActions.ADD_TO_DISPATCH_ORDER_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(planDispatchDetailsSelectors.selectQueryInfoArrivalListInOD),
      ),
      mergeMap(([action, params]) => {
        return this.planDispatchImportsService
          .vPDImpListaArriboPartidaDetalleGroupQueryResult(params)
          .pipe(
            map((response: GroupQueryResultVPDImpListaArriboPartidaDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener las listas de arribo en la OD step 1',
                ),
                response,
              );
              let index = 0;
              let arrivalListGroup: IGroupArrivalList = {
                ...response,
                Groups: _map(
                  response.Groups,
                  (o: QueryResultVPDImpListaArriboPartidaDetalle, key) => {
                    index++;
                    const dates = _map(
                      o.Results,
                      (i: VPDImpListaArriboPartidaDetalle) => new Date(i.FEAMasAntigua),
                    );
                    return {
                      ...o,
                      NombreProveedor: key,
                      Index: index,
                      IsOpen: false,
                      NumeroDePiezas: sumBy(
                        o.Results,
                        (i: VPDImpListaArriboPartidaDetalle) => i.NumeroDePiezas,
                      ),
                      TotalUSD: sumBy(
                        o.Results,
                        (i: VPDImpListaArriboPartidaDetalle) => i.TotalUSD,
                      ),
                      FechaEstimadaEntrega: new Date(Math.min.apply(null, dates)).toISOString(),
                    };
                  },
                ),
              };

              arrivalListGroup = {
                ...arrivalListGroup,
                TotalArrivalList: sumBy(
                  arrivalListGroup.Groups,
                  (o: QueryResultVPDImpListaArriboPartidaDetalle) => o.TotalResults,
                ),
              };
              return planDispatchDetailsActions.FETCH_STEP_1_ARRIVAL_LIST_IN_OD_SUCCESS({
                arrivalListGroup,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener las listas de arribo en la OD step 1',
                ),
                error,
              );
              return of(planDispatchDetailsActions.FETCH_STEP_1_ARRIVAL_LIST_FAILED());
            }),
          );
      }),
    ),
  );

  // DOCS: Add Step 1 Arrival List into Dispatch Order
  addStep1ArrivalListIntoDispatchOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(planDispatchDetailsActions.ADD_TO_DISPATCH_ORDER_LOAD),
      withLatestFrom(this.store.select(planDispatchDetailsSelectors.selectedDispatchOrder)),
      mergeMap(([{arrivalList}, dispatchOrder]) => {
        const arrivalListToSave = {
          ...arrivalList,
          IdImpOrdenDespacho: dispatchOrder.IdImpOrdenDespacho,
        };
        return this.importsService.impListaArriboGuardarOActualizar(arrivalListToSave).pipe(
          map((response: string) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al agregar una lista de arribo a la OD',
              ),
              response,
            );
            return planDispatchDetailsActions.ADD_TO_DISPATCH_ORDER_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al agregar una lista de arribo a la OD',
              ),
              error,
            );
            return of(planDispatchDetailsActions.ADD_TO_DISPATCH_ORDER_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: Refresh Step 1 Selected Provider
  refreshStep1SelectedProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(planDispatchDetailsActions.ADD_TO_DISPATCH_ORDER_SUCCESS),
      withLatestFrom(this.store.select(planDispatchDetailsSelectors.selectedStepsProvider)),
      mergeMap(([action, provider]) => {
        const queryInfo = {
          Filters: [{NombreFiltro: 'IdProveedor', ValorFiltro: provider.IdProveedor}],
        };
        return this.planDispatchImportsService
          .vPDImpListaArriboDetalleProveedorListaArriboObj(queryInfo)
          .pipe(
            map((response: Array<ProveedorListaArriboObj>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al refrescar el proveedor seleccionado step 1',
                ),
                response,
              );
              if (isEmpty(response)) {
                return planDispatchDetailsActions.REFRESH_STEP_1_SELECTED_PROVIDER_FAILED();
              }

              // DOCS: Si tiene 0 Listas de arribo refrescar toda la lista
              if (response[0].TotalListaArribo === 0) {
                return planDispatchDetailsActions.REFRESH_ALL_STEP_1_PROVIDERS_LOAD();
              } else {
                return planDispatchDetailsActions.REFRESH_STEP_1_SELECTED_PROVIDER_SUCCESS({
                  selectedProvider: response[0],
                });
              }
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al refrescar el proveedor seleccionado step 1',
                ),
                error,
              );
              return of(planDispatchDetailsActions.REFRESH_STEP_1_SELECTED_PROVIDER_FAILED());
            }),
          );
      }),
    ),
  );
}
