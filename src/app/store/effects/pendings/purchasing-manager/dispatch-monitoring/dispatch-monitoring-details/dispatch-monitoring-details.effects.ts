import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {isEmpty, map as _map} from 'lodash-es';
import {EMPTY, lastValueFrom, of} from 'rxjs';
/*Selectors Imports*/
import * as apiLogistic from 'api-logistica';
import {
  ProcesosL06OrdenDeCompraPartidasService,
  QueryResultVImpMDGuia,
  QueryResultVOcPartidaDetalle,
} from 'api-logistica';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  MINIO_BUCKETS,
} from '@appUtil/common.protocols';
import * as utilsActions from '@appActions/utils/utils.action';

import {dispatchMonitoringDetailsActions} from '@appActions/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring.dictionaty.actions';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {dispatchMonitoringDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/dispatch-monitoring';
import * as servicesLogger from '@appUtil/logger';
import {
  IGuidesDispatchMonitoring,
  IItem,
  initialGuiaCancelacion,
  initialGuide,
  initialGuideConfirm,
  initialImpactFee,
} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-details/dispatch-monitoring-details.models';
import * as apiCatalogs from 'api-catalogos';
import {ArchivoDetalle} from 'api-catalogos';
import {MinioService} from '@appServices/minio/minio.service';

const FILE_NAME = 'dispatch-monitoring-details-effects';

@Injectable()
export class DispatchMonitoringDetailsEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private guidesService: apiLogistic.ProcesosL07ImportacionesMonitorearDespachoService,
    private purchaseOrderItemsServices: ProcesosL06OrdenDeCompraPartidasService,
    private minioService: MinioService,
    private contactsServiceProviders: apiCatalogs.ConfiguracionProveedoresService,
  ) {}

  getProviderContacts = createEffect(() =>
    this.actions$.pipe(
      ofType(dispatchMonitoringDetailsActions.SET_PROVIDER_SELECTED),
      withLatestFrom(this.store.select(dispatchMonitoringDetailsSelectors.selectProvider)),
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
              return dispatchMonitoringDetailsActions.SET_PROVIDER_CONTACT({
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
  // OBTENER GUIAS
  fetchGuides$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        dispatchMonitoringDetailsActions.FETCH_GUIDES_LOAD,
        dispatchMonitoringDetailsActions.SET_PROVIDER_SELECTED,
        dispatchMonitoringDetailsActions.SET_TAB_SELECTED,
        dispatchMonitoringDetailsActions.REFRESH_GUIDES,
      ),
      withLatestFrom(
        this.store.select(dispatchMonitoringDetailsSelectors.selectQueryGuides),
        this.store.select(dispatchMonitoringDetailsSelectors.selectNeedsToReloadGuides),
      ),
      mergeMap(([action, queryInfo, needsToReload]) => {
        if (needsToReload) {
          return this.guidesService.vImpMDGuiaQueryResult(queryInfo).pipe(
            map((response: QueryResultVImpMDGuia) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar las guias.',
                ),
                response,
              );
              const guides: Array<IGuidesDispatchMonitoring> = _map(
                response.Results,
                (guide, index) => ({
                  ...guide,
                  Index: index + 1,
                  isSelected: index === 0,
                  items: [],
                  itemsStatus: API_REQUEST_STATUS_DEFAULT,
                  itemsNeedsToReload: true,
                  cancelConfig: false,
                  withImpactFeeConfig: false,
                  confirmedConfig: false,
                  ...initialGuide(),
                  guiaCancelacion: {
                    ...initialGuiaCancelacion(),
                    IdOcPackingList: guide.IdOcPackingList,
                  },
                  guiaImpactoFee: {
                    ...initialImpactFee(),
                    IdOcPackingList: guide.IdOcPackingList,
                  },
                  guideConfirm: {
                    ...initialGuideConfirm(),
                    IdOcPackingList: guide.IdOcPackingList,
                  },
                  file: null,
                }),
              );
              return dispatchMonitoringDetailsActions.FETCH_GUIDES_SUCCESS({
                guides,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar las guias.',
                ),
                error,
              );
              return of(dispatchMonitoringDetailsActions.FETCH_GUIDES_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // OBTENER PARTIDAS
  fetchItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        dispatchMonitoringDetailsActions.SET_GUIDE_SELECTED,
        dispatchMonitoringDetailsActions.FETCH_GUIDES_SUCCESS,
        dispatchMonitoringDetailsActions.CONFIRM_ITEMS_SUCCESS,
        dispatchMonitoringDetailsActions.FETCH_ITEMS_LOAD,
      ),
      withLatestFrom(
        this.store.select(dispatchMonitoringDetailsSelectors.selectQueryItems),
        this.store.select(dispatchMonitoringDetailsSelectors.selectNeedToReloadItems),
        this.store.select(dispatchMonitoringDetailsSelectors.selectGuideSelected),
      ),
      mergeMap(([action, queryInfo, needsToReload, selectedGuide]) => {
        if (!isEmpty(selectedGuide) && needsToReload) {
          this.store.dispatch(
            dispatchMonitoringDetailsActions.SET_ITEMS_STATUS({
              itemsStatus: API_REQUEST_STATUS_LOADING,
            }),
          );
          return this.purchaseOrderItemsServices.vOcPartidaDetalleQueryResult(queryInfo).pipe(
            map((response: QueryResultVOcPartidaDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar las partidas',
                ),
                response,
              );
              this.store.dispatch(
                dispatchMonitoringDetailsActions.SET_ITEMS_STATUS({
                  itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              if (action.type === '[Dispatch-Monitoring-DetailsApi] Confirm Item Success') {
                this.store.dispatch(dispatchMonitoringDetailsActions.REFRESH_SELECTED_PROVIDER());
                if (isEmpty(response.Results)) {
                  return dispatchMonitoringDetailsActions.REFRESH_GUIDES();
                }
                this.store.dispatch(dispatchMonitoringDetailsActions.REFRESH_SELECTED_GUIDE());
              }
              // FIXME: Las propiedades no coinciden con la interfaz
              const items: Array<IItem> = _map(response.Results, (item: IItem, index) => ({
                ...item,
                Number: index + 1,
                NumberToSave: item.ocPartida.SubIndice
                  ? Number(`${item.ocPartida.Indice}.${item.ocPartida.SubIndice}`)
                  : item.ocPartida.Indice,
                // tempNumeroDePiezas: item.NumeroDePiezas,
                // tempPrecioLista: item.PrecioLista,
                tempTotalPartida: item.TotalPartida,
                // tempFechaEstimadaDeArribo: item.FechaEstimadaDeArribo,
              }));
              return dispatchMonitoringDetailsActions.FETCH_ITEMS_SUCCESS({
                items,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar las partidas',
                ),
                error,
              );
              this.store.dispatch(
                dispatchMonitoringDetailsActions.SET_ITEMS_STATUS({
                  itemsStatus: API_REQUEST_STATUS_FAILED,
                }),
              );
              return of(dispatchMonitoringDetailsActions.FETCH_ITEMS_FAILED);
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // CANCELAR GUIAS
  cancelGuides$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dispatchMonitoringDetailsActions.SET_SELECTED_GUIDE_CANCEL_CONFIGURATION),
      withLatestFrom(this.store.select(dispatchMonitoringDetailsSelectors.selectGuideSelected)),
      mergeMap(([action, guide]) => {
        const cancelConfig = guide.guiaCancelacion;
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        return this.guidesService.CancelarGuiaMonitorearDespachoProcess(cancelConfig).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al cancelar la guia',
              ),
              response,
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            this.store.dispatch(
              utilsActions.SET_LOADING_SUCCESS({
                active: true,
                message: 'Has monitoreado despacho de la guia ' + guide.NumeroGuia,
                successText: 'Exitosamente!',
              }),
            );
            this.store.dispatch(dispatchMonitoringDetailsActions.REFRESH_GUIDES());
            return dispatchMonitoringDetailsActions.SET_CANCEL_GUIDE_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al cancelar la guia',
              ),
              error,
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return of(dispatchMonitoringDetailsActions.SET_CANCEL_GUIDE_FAILED());
          }),
        );
      }),
    ),
  );

  // ENVIAR CON IMPACTO FEE
  impactFeeGuides$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dispatchMonitoringDetailsActions.SET_SELECTED_GUIDE_IMPACT_FEE_CONFIGURATION),
      withLatestFrom(
        this.store.select(dispatchMonitoringDetailsSelectors.selectGuideSelected),
        this.store.select(dispatchMonitoringDetailsSelectors.selectProvider),
      ),
      mergeMap(async ([action, guide, provider]) => {
        let feeConfig = guide.guiaImpactoFee;
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        // SUBIR ARCHIVO
        const date = new Date();
        const fileName = `${date.getFullYear()}/${provider.IdProveedor}/${date.getTime()}/${
          guide.file.name
        }`;
        const impactFeeFile: ArchivoDetalle = await this.minioService.uploadFile(
          guide.file,
          fileName,
          MINIO_BUCKETS.Purchases,
        );
        feeConfig = {
          ...feeConfig,
          IdArchivo: impactFeeFile.IdArchivo,
        };
        const impListaArribo = await lastValueFrom(
          this.guidesService.FEEMonitorearDespachoProcess(feeConfig),
        );
        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        if (impListaArribo) {
          this.logger.debug(
            servicesLogger.generateMessage(
              FILE_NAME,
              servicesLogger.LOG_SUCCEEDED,
              'Al cancelar la guia',
            ),
            impListaArribo,
          );
          this.store.dispatch(dispatchMonitoringDetailsActions.REFRESH_GUIDES());
          this.store.dispatch(
            utilsActions.SET_LOADING_SUCCESS({
              active: true,
              message: 'Has monitoreado despacho de la guia ' + guide.NumeroGuia,
              successText: 'Exitosamente!',
            }),
          );
          return dispatchMonitoringDetailsActions.SET_IMPACT_FEE_CONFIG_SUCCESS();
        } else {
          this.logger.debug(
            servicesLogger.generateMessage(
              FILE_NAME,
              servicesLogger.LOG_FAILED,
              'Al cancelar la guia',
            ),
          );
          return dispatchMonitoringDetailsActions.SET_IMPACT_FEE_CONFIG_FAILED();
        }
      }),
    ),
  );

  // CONFIRMAR GUIAS
  confirmGuides$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dispatchMonitoringDetailsActions.SET_CONFIRM_GUIDE),
      withLatestFrom(
        this.store.select(dispatchMonitoringDetailsSelectors.selectConfirmGuide),
        this.store.select(dispatchMonitoringDetailsSelectors.selectGuideSelected),
      ),
      mergeMap(([action, params, guide]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        return this.guidesService.CancelarGuiaMonitorearDespachoProcess(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al confirmar la guia',
              ),
              response,
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            this.store.dispatch(
              utilsActions.SET_LOADING_SUCCESS({
                active: true,
                message: 'Has monitoreado despacho de la guia ' + guide.NumeroGuia,
                successText: 'Exitosamente!',
              }),
            );
            this.store.dispatch(dispatchMonitoringDetailsActions.REFRESH_GUIDES());
            return dispatchMonitoringDetailsActions.SET_CONFIRM_GUIDE_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al confirmar la guia',
              ),
              error,
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return of(dispatchMonitoringDetailsActions.SET_CONFIRM_GUIDE_FAILED());
          }),
        );
      }),
    ),
  );
}
