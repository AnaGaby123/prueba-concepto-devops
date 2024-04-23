import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {
  ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService,
  ConfiguracionProveedoresRelacionesService,
} from 'api-catalogos';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import * as utilsActions from '@appActions/utils/utils.action';
import * as servicesLogger from '@appUtil/logger';
import {extractID, extractIDs} from '@appUtil/util';
import {EMPTY, forkJoin, of} from 'rxjs';
import {purchasingConfigurationActions} from '@appActions/pendings/new-product-existing-supplier/purchasing-configuration';
import {purchasingConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/purchasing-configuration';
import {
  buildFamilyFromDeliveryTimeResp,
  buildFamilyFromFamilyProviderPriceResp,
  buildFamilyFromGeneralConfigResp,
  buildFamilyFromProviderPriceResp,
  buildFamilyFromTrademarkFamilyProviderConsolidationResp,
  buildFamilyFromTrademarkFamilyProviderResp,
} from '@appHelpers/pending/new-product-existing-supplier/purchasing-configuration/purchasing-configuration.helpers';
import {ITrademarkFamilyProviderConsolidation} from '@appModels/store/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details.model';
import {concat, filter, isEmpty, map as _map} from 'lodash-es';

import {ProcesosL01CotizacionInvestigacionService} from 'api-logistica';

const FILE_NAME = 'purchasigq-configuration-saves.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class PurchasingConfigurationDetailsSavesEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private configuracionPrecioTiempoEntregaProveedorService: ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService,
    private providersRelationsService: ConfiguracionProveedoresRelacionesService,
    private processQuotationsInvestigationService: ProcesosL01CotizacionInvestigacionService,
  ) {}

  /*DOCS: Guardar MarcaFamiliaProveedor*/
  saveConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasingConfigurationActions.SAVE_CONFIGURATION_LOAD),
      withLatestFrom(
        this.store.select(purchasingConfigurationDetailsSelectors.selectFamilySelected),
      ),
      mergeMap(([{finishConfiguration}, selectedFamily]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        return this.providersRelationsService
          .MarcaFamiliaProveedorGuardarOActualizar(
            selectedFamily.configuration.MarcaFamiliaProveedor,
          )
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (MarcaFamiliaProveedor)',
                ),
                response,
              );
              return {
                selectedFamily: buildFamilyFromTrademarkFamilyProviderResp({
                  selectedFamily,
                  id: extractID(response),
                }),
                finishConfiguration,
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ConfiguracionPrecioProveedor)',
                ),
                error,
              );
              this.store.dispatch(purchasingConfigurationActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
      /*DOCS: Guardar ConfiguracionPrecioProveedor*/
      switchMap(({selectedFamily, finishConfiguration}) => {
        return this.configuracionPrecioTiempoEntregaProveedorService
          .ConfiguracionPrecioProveedorGuardarOActualizar(
            selectedFamily.configuration.ConfiguracionPrecioProveedor,
          )
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ConfiguracionPrecioProveedor)',
                ),
                response,
              );
              return {
                selectedFamily: buildFamilyFromProviderPriceResp({
                  selectedFamily,
                  id: extractID(response),
                }),
                finishConfiguration,
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ConfiguracionPrecioProveedor)',
                ),
                error,
              );
              this.store.dispatch(purchasingConfigurationActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
      /*DOCS: Guardar ConfiguracionPrecioProveedorFamilia*/
      switchMap(({selectedFamily, finishConfiguration}) => {
        return this.configuracionPrecioTiempoEntregaProveedorService
          .ConfiguracionPrecioProveedorFamiliaGuardarOActualizar(
            selectedFamily.configuration.ConfiguracionPrecioProveedorFamilia,
          )
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ConfiguracionPrecioProveedorFamilia)',
                ),
                response,
              );
              return {
                selectedFamily: buildFamilyFromFamilyProviderPriceResp({
                  selectedFamily,
                  id: extractID(response),
                }),
                finishConfiguration,
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ConfiguracionPrecioProveedorFamilia)',
                ),
                error,
              );
              this.store.dispatch(purchasingConfigurationActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
      /*DOCS: Guardar ConfiguracionTiempoEntregaProveedorFamilia*/
      switchMap(({selectedFamily, finishConfiguration}) => {
        return this.configuracionPrecioTiempoEntregaProveedorService
          .ConfiguracionTiempoEntregaProveedorFamiliaGuardarOActualizar(
            selectedFamily.configuration.ConfiguracionTiempoEntregaProveedorFamilia,
          )
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ConfiguracionTiempoEntregaProveedorFamilia)',
                ),
                response,
              );
              return {
                selectedFamily: buildFamilyFromDeliveryTimeResp({
                  selectedFamily,
                  id: extractID(response),
                }),
                finishConfiguration,
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ConfiguracionTiempoEntregaProveedorFamilia)',
                ),
                error,
              );
              this.store.dispatch(purchasingConfigurationActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
      // DOCS Guardar ConfiguracionProveedorFamiliaGeneral
      switchMap(({selectedFamily, finishConfiguration}) => {
        return this.configuracionPrecioTiempoEntregaProveedorService
          .ConfiguracionProveedorFamiliaGeneralGuardarOActualizar(
            selectedFamily.configuration.ConfiguracionProveedorFamiliaGeneral,
          )
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ConfiguracionProveedorFamiliaGeneral)',
                ),
                response,
              );
              return {
                selectedFamily: buildFamilyFromGeneralConfigResp({
                  selectedFamily,
                  id: extractID(response),
                }),
                finishConfiguration,
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ConfiguracionProveedorFamiliaGeneral)',
                ),
                error,
              );
              this.store.dispatch(purchasingConfigurationActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
      /*DOCS: Guardar los elementos nuevos del arreglo de familias consolidación y los que se van a desactivar*/
      switchMap(({selectedFamily, finishConfiguration}) => {
        /*DOCS: Al guardar la configuración se indica que los precios de lista, clasificaciones, y productos deben*/
        /* recargarse para mostrar la configuración correcta en caso de que aun hereden la configuración general*/
        const selectedFamilies = concat(
          filter(
            selectedFamily.configuration.trademarkFamilyProviderConsolidation,

            (o: ITrademarkFamilyProviderConsolidation) => o.isChecked && !o.isOriginal,
          ),
          selectedFamily.configuration.trademarkFamilyProviderConsolidationToDelete,
        );
        if (!isEmpty(selectedFamilies)) {
          const requestMap: Array<any> = _map(
            selectedFamilies,
            (o: ITrademarkFamilyProviderConsolidation) =>
              this.providersRelationsService.MarcaFamiliaProveedorConsolidacionGuardarOActualizar(
                o,
              ),
          );
          return forkJoin(requestMap).pipe(
            map((response: Array<string>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar el arreglo de MarcaFamiliaProveedorConsolidacion',
                ),
                response,
              );
              selectedFamily = buildFamilyFromTrademarkFamilyProviderConsolidationResp({
                selectedFamily,
                ids: extractIDs(response),
              });
              if (finishConfiguration) {
                return purchasingConfigurationActions.FINISH_PURCHASING_CONFIGURATION_LOAD();
              }
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              this.store.dispatch(
                utilsActions.SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has guardado la familia',
                }),
              );
              /*DOCS: Gurdamos la configuración actualizada*/
              return purchasingConfigurationActions.SAVE_CONFIGURATION_SUCCESS({
                selectedFamily,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar el arreglo de MarcaFamiliaProveedorConsolidacion',
                ),
                error,
              );
              this.store.dispatch(purchasingConfigurationActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
        }
        if (finishConfiguration) {
          return of(purchasingConfigurationActions.FINISH_PURCHASING_CONFIGURATION_LOAD());
        }
        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        this.store.dispatch(
          utilsActions.SET_LOADING_SUCCESS({
            active: true,
            message: 'Has guardado la familia',
          }),
        );
        return of(
          purchasingConfigurationActions.SAVE_CONFIGURATION_SUCCESS({
            selectedFamily,
          }),
        );
      }),
    ),
  );

  // DOCS Terminar la configuracion en compras para pasarlo a la siguiente configuracion
  finishPurchasingConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(purchasingConfigurationActions.FINISH_PURCHASING_CONFIGURATION_LOAD),
      withLatestFrom(
        this.store.select(
          purchasingConfigurationDetailsSelectors.selectQueryFinishPurchasingConfiguration,
        ),
      ),
      mergeMap(([action, queryInfo]) => {
        return this.processQuotationsInvestigationService
          .cotPartidaCotizacionInvestigacionSeguimientoGuardarOActualizar(queryInfo)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al terminar la configuracion de compras en investigacion de producto',
                ),
                response,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              this.store.dispatch(
                utilsActions.SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has terminado de configurar la familia',
                }),
              );
              this.store.dispatch(
                purchasingConfigurationActions.FINISH_PURCHASING_CONFIGURATION_SUCCESS(),
              );
              return purchasingConfigurationActions.FETCH_FAMILIES_LIST_LOAD();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al terminar la configuracion de compras en investigacion de producto',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));

              return of(purchasingConfigurationActions.FINISH_PURCHASING_CONFIGURATION_FAILED());
            }),
          );
      }),
    ),
  );
}
