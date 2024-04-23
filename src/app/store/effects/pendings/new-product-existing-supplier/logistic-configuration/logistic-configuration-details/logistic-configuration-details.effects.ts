import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {DashboardData, ProcesosL01CotizacionInvestigacionService} from 'api-logistica';
import {logisticConfigurationDetailsActions} from '@appActions/pendings/new-product-existing-supplier/logistic-configuration/index';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {logisticConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/logistic-configuration/index';
import * as servicesLogger from '@appUtil/logger';
import {EMPTY, forkJoin, of} from 'rxjs';
import {
  buildAddImageItemsConfigurationLogistic,
  buildProvidersFromLogisticConfiguration,
  buildResponseSaveChangesConfigurationLogistic,
} from '@appHelpers/pending/new-product-existing-supplier/logistic-configuration/logistic-configuration.helpers';
import {
  ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService,
  ConfiguracionProveedoresCalculosService,
  ConfProveedorLogistica,
} from 'api-catalogos';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';

import {map as _map} from 'lodash-es';
import {SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import {
  IFamilyLogisticConfiguration,
  IOfferDeliveryRoutes,
} from '@appModels/store/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.model';

const FILE_NAME = '[logistic-configuration-details.effects.ts]';

@Injectable()
export class LogisticConfigurationDetailsEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private processQuotationInvestigation: ProcesosL01CotizacionInvestigacionService,
    private configurationProviderCalculateService: ConfiguracionProveedoresCalculosService,
    private configurationProductsConfigurationPriceTimeProvidersService: ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService,
  ) {}

  //DOCS: OBTENER LOS CATALOGOS INICIALES

  initialConfiguration$ = createEffect(() =>
    this.action$.pipe(
      ofType(logisticConfigurationDetailsActions.GET_INITIAL_CONFIGURATION),
      map((action) => {
        this.store.dispatch(catalogsActions.GET_CAT_RUTA_ENTREGA_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_PRODUCT_INVESTIGATION_FOLLOW_LOAD());
        return logisticConfigurationDetailsActions.FETCH_FAMILIES_LIST_LOAD();
      }),
    ),
  );

  //DOCS: OBTENER EL LISTADO DE FAMILIAS
  getLogisticConfigurationList$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        logisticConfigurationDetailsActions.FETCH_FAMILIES_LIST_LOAD,
        logisticConfigurationDetailsActions.SET_SEARCH_TERM,
        logisticConfigurationDetailsActions.SET_FILTER_SELECTED,
        logisticConfigurationDetailsActions.FETCH_FINISH_CONFIGURATION_LOGISTIC_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(
          logisticConfigurationDetailsSelectors.selectQueryInfoLogisticConfigurationList,
        ),
      ),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(logisticConfigurationDetailsActions.CHANGE_LOADING_API_STATUS());
        return this.processQuotationInvestigation
          .ConfiguracionProductoInvestigacionObtenerDashboardLogistica(queryInfo)
          .pipe(
            map((response: DashboardData) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener lista de familias para configuración logistica',
                ),
              );
              if (response.Resumen?.length === 0) {
                return logisticConfigurationDetailsActions.FETCH_SUCCESS_WITHOUT_RESULTS();
              }
              const items: Array<IFamilyLogisticConfiguration> = buildProvidersFromLogisticConfiguration(
                response.Resumen,
              );
              const itemsImage = buildAddImageItemsConfigurationLogistic(items);
              return logisticConfigurationDetailsActions.FETCH_FAMILIES_LIST_SUCCESS({
                logisticItems: itemsImage,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener lista de familias para configuración logistica',
                ),
                error,
              );
              return of(logisticConfigurationDetailsActions.FETCH_FAMILIES_LIST_FAILED());
            }),
          );
      }),
    ),
  );

  //DOCS: OBTENER LOS DETALLES DE LA FAMILIA SELECCIONADA
  getDetailsConfiguration$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        logisticConfigurationDetailsActions.FETCH_FAMILIES_LIST_SUCCESS,
        logisticConfigurationDetailsActions.SET_SELECTED_FAMILY,
      ),
      withLatestFrom(
        this.store.select(
          logisticConfigurationDetailsSelectors.selectLogisticConfigurationSelected,
        ),
      ),
      mergeMap(([action, configurationSelected]) => {
        if (!configurationSelected.needsToReloadInfo) {
          this.store.dispatch(logisticConfigurationDetailsActions.CHANGE_SUCCESS_API_STATUS());
          return EMPTY;
        }
        return this.configurationProviderCalculateService
          .ConfiguracionProveedorExtensionConfiguracionProveedorLogistica(
            configurationSelected.IdMarcaFamiliaProveedor,
          )
          .pipe(
            map((response: ConfProveedorLogistica) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener los detalles de la familia seleccionada',
                ),
              );
              return logisticConfigurationDetailsActions.FETCH_DETAILS_SELECTED_LOGISTIC_CONFIGURATION_SUCCESS(
                {
                  familyDetails: response.ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega,
                },
              );
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener los detalles de la familia seleccioanda',
                ),
                error,
              );
              return of(
                logisticConfigurationDetailsActions.FETCH_DETAILS_SELECTED_LOGISTIC_CONFIGURATION_FAILED(),
              );
            }),
          );
      }),
    ),
  );

  // DOCS: GUARDAR LOS CAMBIOS DE LA CONFIGURACIÓN LOGISTICA SIN TERMINAR LA CONFIGURACIÓN
  saveDeliveryRoute$ = createEffect(() =>
    this.action$.pipe(
      ofType(logisticConfigurationDetailsActions.FETCH_SAVE_DELIVERY_ROUTE),
      withLatestFrom(
        this.store.select(
          logisticConfigurationDetailsSelectors.selectLogisticConfigurationSelected,
        ),
      ),
      mergeMap(([{finisConfiguration}, selectedFamily]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const request: any[] = _map(
          selectedFamily.detailsConfiguration,
          (o: IOfferDeliveryRoutes) =>
            this.configurationProductsConfigurationPriceTimeProvidersService.ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaGuardarOActualizar(
              o,
            ),
        );
        return forkJoin(request).pipe(
          map((response: string[]) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al guardar los cambios de una configuración logistica',
              ),
              response,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            if (finisConfiguration) {
              return logisticConfigurationDetailsActions.FETCH_FINISH_CONFIGURATION_LOGISTIC();
            }
            this.store.dispatch(
              SET_LOADING_SUCCESS({
                active: true,
                message: 'Has guardado un pendiente',
              }),
            );
            const family: IFamilyLogisticConfiguration = buildResponseSaveChangesConfigurationLogistic(
              response,
              selectedFamily,
            );
            return logisticConfigurationDetailsActions.FETCH_SAVE_DELIVERY_ROUTE_SUCCESS({
              family,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al guardar los cambios de una configuración logistica',
              ),
              error,
            );
            this.store.dispatch(
              logisticConfigurationDetailsActions.FETCH_SAVE_DELIVERY_ROUTE_FAILED(),
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
    ),
  );
  //DOCS: TERMINAR LA CONFIGURACIÓN LOGÍSTICA
  finishConfigurationLogistic$ = createEffect(() =>
    this.action$.pipe(
      ofType(logisticConfigurationDetailsActions.FETCH_FINISH_CONFIGURATION_LOGISTIC),
      withLatestFrom(
        this.store.select(
          logisticConfigurationDetailsSelectors.selectLogisticConfigurationSelected,
        ),
        this.store.select(logisticConfigurationDetailsSelectors.selectProductInvestigationFollow),
      ),
      mergeMap(([action, selectedFamily, productInvestigationFollow]) => {
        return this.processQuotationInvestigation
          .cotPartidaCotizacionInvestigacionSeguimientoGuardarOActualizar({
            IdCotPartidaCotizacionInvestigacion: selectedFamily.IdCotPartidaCotizacionInvestigacion,
            IdCatProductoInvestigacionSeguimiento:
              productInvestigationFollow.IdCatProductoInvestigacionSeguimiento,
          })
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al terminar la configuración logistica',
                ),
              );
              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has terminado un pendiente',
                }),
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return logisticConfigurationDetailsActions.FETCH_FINISH_CONFIGURATION_LOGISTIC_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al terminar la configuración logistica',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(
                logisticConfigurationDetailsActions.FETCH_FINISH_CONFIGURATION_LOGISTIC_FAILED(),
              );
            }),
          );
      }),
    ),
  );
}
