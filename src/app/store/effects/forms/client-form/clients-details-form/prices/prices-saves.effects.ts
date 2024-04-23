// CORE
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import * as api from 'api-catalogos';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
// MODELS
import {
  IVTrademarkFamily,
  Levels,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// SELECTORS
import {clientPricesSelectors, clientsDetailsSelectors} from '@appSelectors/forms/clients-form';
// ACTIONS
import {clientFormActions, pricesActions} from '@appActions/forms/client-form';
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
// UTILS
import * as servicesLogger from '@appUtil/logger';
import {
  buildIVTrademarkFamilyAfterClienteFamilia,
  buildIVTrademarkFamilyAfterConfiguracionClienteClasificacion,
  buildIVTrademarkFamilyAfterConfiguracionClienteFamiliaGeneral,
  buildIVTrademarkFamilyAfterConfiguracionClientePrecio,
  buildIVTrademarkFamilyAfterConfiguracionClienteProducto,
  buildIVTrademarkFamilyAfterConfiguracionPrecioCliente,
  buildIVTrademarkFamilyAfterValorConfiguracionTiempoEntrega,
} from '@appHelpers/catalogs/clients/prices.helpers';
import {extractID} from '@appUtil/util';
import {filter, find} from 'lodash-es';

const FILE_NAME = 'prices-saves.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class PricesSavesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private configuracionProductosConfiguracionPrecioTiempoEntregaService: api.ConfiguracionProductosConfiguracionPrecioTiempoEntregaService,
    private configuracionProductosConfiguracionPrecioTiempoEntregaClientesService: api.ConfiguracionProductosConfiguracionPrecioTiempoEntregaClientesService,
    private configuracionClientesRelacionesService: api.ConfiguracionClientesRelacionesService,
  ) {}

  /*DOCS: Guardar una configuracion*/
  saveConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.SAVE_CONFIGURATION_LOAD),
      withLatestFrom(
        this.store.select(clientPricesSelectors.selectedProviderFamily),
        this.store.select(clientsDetailsSelectors.selectedClient),
      ),
      // DOCS: Guardar ClienteFamilia
      mergeMap(([action, selectedFamily, clientSelected]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        const body = selectedFamily.actualConfiguration.ClienteFamilia;
        return this.configuracionClientesRelacionesService
          .ClienteFamiliaGuardarOActualizar(body)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ClienteFamilia)',
                ),
                response,
              );
              return buildIVTrademarkFamilyAfterClienteFamilia(selectedFamily, extractID(response));
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ClienteFamilia)',
                ),
                error,
              );
              this.store.dispatch(pricesActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return of<any>();
            }),
          );
      }),
      // DOCS: Guardar ValorConfiguracionTiempoEntrega
      switchMap((selectedFamily: IVTrademarkFamily) => {
        const body = selectedFamily.actualConfiguration.ValorConfiguracionTiempoEntrega;
        return this.configuracionProductosConfiguracionPrecioTiempoEntregaService
          .ValorConfiguracionTiempoEntregaGuardarOActualizar(body)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ValorConfiguracionTiempoEntrega)',
                ),
                response,
              );
              return buildIVTrademarkFamilyAfterValorConfiguracionTiempoEntrega(
                selectedFamily,
                extractID(response),
              );
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ValorConfiguracionTiempoEntrega)',
                ),
                error,
              );
              this.store.dispatch(pricesActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return of<any>();
            }),
          );
      }),
      // DOCS: Guardar ConfiguracionPrecioCliente
      withLatestFrom(this.store.select(clientPricesSelectors.selectedLevelConfigurationTab)),
      switchMap(([selectedFamily, selectedConfiguration]) => {
        const configurationType = selectedConfiguration.level;
        const body = selectedFamily.actualConfiguration.ConfiguracionPrecioCliente;
        return this.configuracionProductosConfiguracionPrecioTiempoEntregaClientesService
          .ConfiguracionPrecioClienteGuardarOActualizar(body)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ConfiguracionPrecioCliente)',
                ),
                response,
              );
              return buildIVTrademarkFamilyAfterConfiguracionPrecioCliente(
                selectedFamily,
                extractID(response),
                configurationType,
              );
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ConfiguracionPrecioCliente)',
                ),
                error,
              );
              this.store.dispatch(pricesActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return of<any>();
            }),
          );
      }),
      withLatestFrom(this.store.select(clientPricesSelectors.selectedLevelConfigurationTab)),
      switchMap(([selectedFamily, selectedConfiguration]) => {
        const configurationType = selectedConfiguration.level;
        switch (configurationType) {
          case Levels.Family:
            return of(
              pricesActions.SAVE_GENERAL_CONFIGURATION_LOAD({
                selectedFamily,
              }),
            );
          case Levels.listPrice:
            return of(
              pricesActions.SAVE_PRICE_CONFIGURATION_LOAD({
                selectedFamily,
              }),
            );
          case Levels.CharacteristicGrouper:
            return of(
              pricesActions.SAVE_CLASSIFICATION_CONFIGURATION_LOAD({
                selectedFamily,
              }),
            );
          case Levels.Product:
            return of(
              pricesActions.SAVE_PRODUCT_CONFIGURATION_LOAD({
                selectedFamily,
              }),
            );
        }
      }),
    ),
  );
  // DOCS: Guardar ConfiguracionClienteFamiliaGeneral
  saveGeneralConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.SAVE_GENERAL_CONFIGURATION_LOAD),
      mergeMap(({selectedFamily}) => {
        const body = selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaGeneral;
        return this.configuracionProductosConfiguracionPrecioTiempoEntregaClientesService
          .ConfiguracionClienteFamiliaGeneralGuardarOActualizar(body)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración general (ConfiguracionClienteFamiliaGeneral)',
                ),
                response,
              );
              this.store.dispatch(
                pricesActions.SAVE_CONFIGURATION_SUCCESS({
                  configuration: buildIVTrademarkFamilyAfterConfiguracionClienteFamiliaGeneral(
                    selectedFamily,
                    extractID(response),
                  ),
                }),
              );
              this.store.dispatch(
                pricesActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                  tabConfigurationName: 'prices',
                  needsToReload: true,
                }),
              );
              this.store.dispatch(
                pricesActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                  tabConfigurationName: 'classifications',
                  needsToReload: true,
                }),
              );
              this.store.dispatch(
                pricesActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                  tabConfigurationName: 'products',
                  needsToReload: true,
                }),
              );
              this.store.dispatch(pricesActions.RESET_PRICE_LIST_DESIRED_PAGE());
              this.store.dispatch(pricesActions.RESET_CLASSIFICATION_LIST_DESIRED_PAGE());
              this.store.dispatch(pricesActions.RESET_PRODUCT_LIST_DESIRED_PAGE());
              return pricesActions.SET_FAMILY_SUBCONFIGURATION_SELECTED({
                subConfiguration: {
                  id: '1',
                  label: 'PRECIO',
                  activeSubtitle: false,
                },
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración general (ConfiguracionClienteFamiliaGeneral)',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              this.store.dispatch(pricesActions.SAVE_CONFIGURATION_FAILED());
              return of<any>();
            }),
          );
      }),
    ),
  );

  // DOCS: Guardar ConfiguracionClienteFamiliaCosto
  savePriceConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.SAVE_PRICE_CONFIGURATION_LOAD),
      mergeMap(({selectedFamily: selectedFamily$}) => {
        const body = selectedFamily$.actualConfiguration.ConfiguracionClienteFamiliaCosto;
        return this.configuracionProductosConfiguracionPrecioTiempoEntregaClientesService
          .ConfiguracionClienteFamiliaCostoGuardarOActualizar(body)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración precio de lista (ConfiguracionClienteFamiliaCosto)',
                ),
                response,
              );
              selectedFamily$ = buildIVTrademarkFamilyAfterConfiguracionClientePrecio(
                selectedFamily$,
                extractID(response),
              );
              this.store.dispatch(
                pricesActions.UPDATE_SELECTED_PRICE_ITEM_LOAD({
                  priceItem: filter(
                    selectedFamily$.prices.pricesList.Results,
                    (o) => o.isSelected,
                  )[0],
                }),
              );
              this.store.dispatch(
                pricesActions.SAVE_CONFIGURATION_SUCCESS({
                  configuration: selectedFamily$,
                }),
              );
              this.store.dispatch(
                pricesActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                  tabConfigurationName: 'classifications',
                  needsToReload: true,
                }),
              );
              this.store.dispatch(
                pricesActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                  tabConfigurationName: 'products',
                  needsToReload: true,
                }),
              );
              this.store.dispatch(pricesActions.RESET_CLASSIFICATION_LIST_DESIRED_PAGE());
              this.store.dispatch(pricesActions.RESET_PRODUCT_LIST_DESIRED_PAGE());
              return pricesActions.SET_FAMILY_SUBCONFIGURATION_SELECTED({
                subConfiguration: {
                  id: '1',
                  label: 'PRECIO',
                  activeSubtitle: false,
                },
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración precio de lista (ConfiguracionClienteFamiliaCosto)',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              this.store.dispatch(pricesActions.SAVE_CONFIGURATION_FAILED());
              return of<any>();
            }),
          );
      }),
    ),
  );

  // DOCS: Guardar ConfiguracionClienteFamiliaClasificacion
  saveClassificationConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.SAVE_CLASSIFICATION_CONFIGURATION_LOAD),
      mergeMap(({selectedFamily: selectedFamily$}) => {
        const body = selectedFamily$.actualConfiguration.ConfiguracionClienteFamiliaClasificacion;
        return this.configuracionProductosConfiguracionPrecioTiempoEntregaClientesService
          .ConfiguracionClienteFamiliaClasificacionGuardarOActualizar(body)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración clasificacion (ConfiguracionClienteFamiliaClasificacion)',
                ),
                response,
              );
              this.store.dispatch(
                pricesActions.UPDATE_SELECTED_CHARACTERISTIC_GROUPER_LOAD({
                  productItem: find(
                    selectedFamily$.classifications.classificationsList.Results,
                    (o) => o.isSelected,
                  ),
                }),
              );
              this.store.dispatch(
                pricesActions.SAVE_CONFIGURATION_SUCCESS({
                  configuration: buildIVTrademarkFamilyAfterConfiguracionClienteClasificacion(
                    selectedFamily$,
                    extractID(response),
                  ),
                }),
              );
              this.store.dispatch(
                pricesActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                  tabConfigurationName: 'products',
                  needsToReload: true,
                }),
              );
              this.store.dispatch(pricesActions.RESET_PRODUCT_LIST_DESIRED_PAGE());
              return pricesActions.SET_FAMILY_SUBCONFIGURATION_SELECTED({
                subConfiguration: {
                  id: '1',
                  label: 'PRECIO',
                  activeSubtitle: false,
                },
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración clasificación (ConfiguracionClienteFamiliaClasificacion)',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              this.store.dispatch(pricesActions.SAVE_CONFIGURATION_FAILED());
              return of<any>();
            }),
          );
      }),
    ),
  );

  // DOCS: Guardar ConfiguracionClienteFamiliaProducto
  saveProductConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.SAVE_PRODUCT_CONFIGURATION_LOAD),
      mergeMap(({selectedFamily}) => {
        const body = selectedFamily.actualConfiguration.ConfiguracionClienteFamiliaProducto;
        return this.configuracionProductosConfiguracionPrecioTiempoEntregaClientesService
          .ConfiguracionClienteFamiliaProductoGuardarOActualizar(body)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración producto (ConfiguracionClienteFamiliaProducto)',
                ),
                response,
              );
              selectedFamily = buildIVTrademarkFamilyAfterConfiguracionClienteProducto(
                selectedFamily,
                extractID(response),
              );
              this.store.dispatch(
                pricesActions.UPDATE_SELECTED_PRODUCT_PRICE_LOAD({
                  productItem: filter(
                    selectedFamily.products.productsList.Results,
                    (o) => o.isSelected,
                  )[0],
                }),
              );
              this.store.dispatch(
                pricesActions.SAVE_CONFIGURATION_SUCCESS({
                  configuration: selectedFamily,
                }),
              );
              return pricesActions.SET_FAMILY_SUBCONFIGURATION_SELECTED({
                subConfiguration: {
                  id: '1',
                  label: 'PRECIO',
                  activeSubtitle: false,
                },
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración producto (ConfiguracionClienteFamiliaProducto)',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              this.store.dispatch(pricesActions.SAVE_CONFIGURATION_FAILED());
              return of<any>();
            }),
          );
      }),
    ),
  );
  saveConfigurationSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.SAVE_CONFIGURATION_SUCCESS),
      withLatestFrom(this.store.select(clientPricesSelectors.selectOpenPopBreakdownAferSave)),
      mergeMap(([action, openPopAfterSave]) => {
        this.store.dispatch(
          utilsActions.SET_LOADING_SUCCESS({
            active: true,
            message: 'Has guardado',
          }),
        );
        this.store.dispatch(clientFormActions.SET_ENABLE_EDIT({value: false}));
        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        this.store.dispatch(pricesActions.SET_FAMILY_BACKUP());
        if (openPopAfterSave) {
          this.store.dispatch(pricesActions.SET_IS_OPEN_POP_BREAKDOWN({value: true}));
          this.store.dispatch(pricesActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({value: 1}));
          this.store.dispatch(
            pricesActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
              isLoading: true,
            }),
          );
          this.store.dispatch(pricesActions.GET_PRICE_LIST_FOR_PANEL_LOAD());
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
