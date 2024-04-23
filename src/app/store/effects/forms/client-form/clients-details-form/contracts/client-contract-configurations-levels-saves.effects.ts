// CORE
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import {EMPTY, of} from 'rxjs';
// MODELS
import {
  ConfiguracionClientesContratoMarcasConfiguracionesParametrizacionService,
  ConfiguracionClientesContratoMarcasConfiguracionesService,
  ContratoClienteMarcaConfiguracion,
  ContratoClienteMarcaConfiguracionCatClasificacionProducto,
  ContratoClienteMarcaConfiguracionGeneral,
  ContratoClienteMarcaConfiguracionPrecioLista,
  ContratoClienteMarcaConfiguracionProducto,
} from 'api-catalogos';
import {
  IConfContratoCliente,
  IVClasificacionProductoMarcaCliente,
  IVContractFamily,
  IVPrecioListaClienteProductoContrato,
  IVPrecioProductoCliente,
} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {Levels} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// SELECTORS
import {clientContractsSelectors} from '@appSelectors/forms/clients-form';
// ACTIONS
import {clientContractActions} from '@appActions/forms/client-form/clients-details-form';
import * as utilsActions from '@appActions/utils/utils.action';
// UTILS
import * as servicesLogger from '@appUtil/logger';
import {extractID} from '@appUtil/util';
import {map as _map} from 'lodash-es';
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';

const FILE_NAME = 'client-contacts-saves-form.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class ClientContractConfigurationsLevelsSavesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private configuracionClientesContratoMarcasConfiguracionesService: ConfiguracionClientesContratoMarcasConfiguracionesService,
    private configuracionClientesContratoMarcasConfiguracionesParametrizacionService: ConfiguracionClientesContratoMarcasConfiguracionesParametrizacionService,
  ) {}

  // DOCS: Guarda una configuración de precios
  saveConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.SAVE_CONFIGURATION_LOAD),
      withLatestFrom(this.store.select(clientContractsSelectors.selectedFamily)),
      mergeMap(([action, selectedFamily$]) => {
        const body: ContratoClienteMarcaConfiguracion =
          selectedFamily$.actualConfiguration.ContratoClienteMarcaConfiguracion;
        return this.configuracionClientesContratoMarcasConfiguracionesParametrizacionService
          .ContratoClienteMarcaConfiguracionGuardarOActualizar(body)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ContratoClienteMarcaConfiguracion)',
                ),
                response,
              );
              const configurationType = selectedFamily$.selectedLevelConfigurationTab.level;
              const selectedFamily: IVContractFamily = {
                ...selectedFamily$,
                actualConfiguration: {
                  ...selectedFamily$.actualConfiguration,
                  ContratoClienteMarcaConfiguracion: {
                    ...selectedFamily$.actualConfiguration.ContratoClienteMarcaConfiguracion,
                    IdContratoClienteMarcaConfiguracion: extractID(response),
                  },
                  ContratoClienteMarcaConfiguracionGeneral: {
                    ...selectedFamily$.actualConfiguration.ContratoClienteMarcaConfiguracionGeneral,
                    IdContratoClienteMarcaConfiguracion:
                      configurationType === Levels.Family
                        ? extractID(response)
                        : selectedFamily$.actualConfiguration
                            .ContratoClienteMarcaConfiguracionGeneral
                            .IdContratoClienteMarcaConfiguracion,
                  },
                  ContratoClienteMarcaConfiguracionPrecioLista: {
                    ...selectedFamily$.actualConfiguration
                      .ContratoClienteMarcaConfiguracionPrecioLista,
                    IdContratoClienteMarcaConfiguracion:
                      configurationType === Levels.listPrice
                        ? extractID(response)
                        : selectedFamily$.actualConfiguration
                            .ContratoClienteMarcaConfiguracionPrecioLista
                            .IdContratoClienteMarcaConfiguracion,
                  },
                  ContratoClienteMarcaConfiguracionCatClasificacionProducto: {
                    ...selectedFamily$.actualConfiguration
                      .ContratoClienteMarcaConfiguracionCatClasificacionProducto,
                    IdContratoClienteMarcaConfiguracion:
                      configurationType === Levels.CharacteristicGrouper
                        ? extractID(response)
                        : selectedFamily$.actualConfiguration
                            .ContratoClienteMarcaConfiguracionCatClasificacionProducto
                            .IdContratoClienteMarcaConfiguracion,
                  },
                  ContratoClienteMarcaConfiguracionProducto: {
                    ...selectedFamily$.actualConfiguration
                      .ContratoClienteMarcaConfiguracionProducto,
                    IdContratoClienteMarcaConfiguracion:
                      configurationType === Levels.Product
                        ? extractID(response)
                        : selectedFamily$.actualConfiguration
                            .ContratoClienteMarcaConfiguracionProducto
                            .IdContratoClienteMarcaConfiguracion,
                  },
                },
              };
              return selectedFamily;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ContratoClienteMarcaConfiguracion)',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              this.store.dispatch(clientContractActions.SAVE_CONFIGURATION_FAILED());
              return EMPTY;
            }),
          );
      }),
      // TODO: Validar que nivel se esta guardando
      switchMap((selectedFamily$: IVContractFamily) => {
        const configurationType = selectedFamily$.selectedLevelConfigurationTab.level;
        switch (configurationType) {
          case Levels.Family:
            return of(
              clientContractActions.SAVE_GENERAL_CONFIGURATION_LOAD({
                selectedFamily: selectedFamily$,
              }),
            );
          case Levels.listPrice:
            return of(
              clientContractActions.SAVE_PRICE_CONFIGURATION_LOAD({
                selectedFamily: selectedFamily$,
              }),
            );
          case Levels.CharacteristicGrouper:
            return of(
              clientContractActions.SAVE_CLASSIFICATION_CONFIGURATION_LOAD({
                selectedFamily: selectedFamily$,
              }),
            );
          case Levels.Product:
            return of(
              clientContractActions.SAVE_PRODUCT_CONFIGURATION_LOAD({
                selectedFamily: selectedFamily$,
              }),
            );
          default:
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return of(clientContractActions.SAVE_CONFIGURATION_FAILED());
        }
      }),
    ),
  );
  // TODO: Guardar ContratoClienteMarcaConfiguracionGeneral
  saveGeneralConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.SAVE_GENERAL_CONFIGURATION_LOAD),
      mergeMap(({selectedFamily}) => {
        const body: ContratoClienteMarcaConfiguracionGeneral =
          selectedFamily.actualConfiguration.ContratoClienteMarcaConfiguracionGeneral;
        return this.configuracionClientesContratoMarcasConfiguracionesService
          .ContratoClienteMarcaConfiguracionGeneralGuardarOActualizar(body)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración general (ContratoClienteMarcaConfiguracionGeneral)',
                ),
                response,
              );
              const configuration: IConfContratoCliente = {
                ...selectedFamily.actualConfiguration,
                ContratoClienteMarcaConfiguracionGeneral: {
                  ...selectedFamily.actualConfiguration.ContratoClienteMarcaConfiguracionGeneral,
                  IdContratoClienteMarcaConfiguracionGeneral: extractID(response),
                },
              };
              const newFamily: IVContractFamily = {
                ...selectedFamily,
                actualConfiguration: configuration,
                generalConfiguration: configuration,
                backupConfiguration: configuration,
              };
              this.store.dispatch(
                clientContractActions.SAVE_CONFIGURATION_SUCCESS({
                  newFamily,
                }),
              );
              this.store.dispatch(
                utilsActions.SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has guardado',
                }),
              );
              this.setNeedsToReload('prices');
              this.setNeedsToReload('characteristicGroupers');
              this.setNeedsToReload('products');
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return clientContractActions.SET_FAMILY_BACKUP();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración general (ContratoClienteMarcaConfiguracionGeneral)',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return of(clientContractActions.SAVE_CONFIGURATION_FAILED());
            }),
          );
      }),
    ),
  );
  // TODO: Guardar ContratoClienteMarcaConfiguracionPrecioLista
  savePriceConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.SAVE_PRICE_CONFIGURATION_LOAD),
      mergeMap(({selectedFamily}) => {
        const body: ContratoClienteMarcaConfiguracionPrecioLista =
          selectedFamily.actualConfiguration.ContratoClienteMarcaConfiguracionPrecioLista;
        return this.configuracionClientesContratoMarcasConfiguracionesService
          .ContratoClienteMarcaConfiguracionPrecioListaGuardarOActualizar(body)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración precio de lista (ContratoClienteMarcaConfiguracionPrecioLista)',
                ),
                response,
              );
              const configuration: IConfContratoCliente = {
                ...selectedFamily.actualConfiguration,
                ContratoClienteMarcaConfiguracionPrecioLista: {
                  ...selectedFamily.actualConfiguration
                    .ContratoClienteMarcaConfiguracionPrecioLista,
                  IdContratoClienteMarcaConfiguracionPrecioLista: extractID(response),
                },
              };

              const newFamily: IVContractFamily = {
                ...selectedFamily,
                actualConfiguration: configuration,
                backupConfiguration: configuration,
                prices: {
                  ...selectedFamily.prices,
                  pricesList: {
                    ...selectedFamily.prices.pricesList,
                    Results: _map(
                      selectedFamily.prices.pricesList.Results,
                      (o: IVPrecioListaClienteProductoContrato) => {
                        if (o.isSelected) {
                          return {
                            ...o,
                            NivelConfiguracionProductoContrato: 'PrecioLista',
                            isConfigured: true,
                            configuration,
                          };
                        }

                        return {...o};
                      },
                    ),
                  },
                },
              };
              this.store.dispatch(
                clientContractActions.SAVE_CONFIGURATION_SUCCESS({
                  newFamily,
                }),
              );
              this.store.dispatch(
                utilsActions.SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has guardado',
                }),
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              this.setNeedsToReload('characteristicGroupers');
              this.setNeedsToReload('products');
              return clientContractActions.SET_FAMILY_BACKUP();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración precio de lista (ContratoClienteMarcaConfiguracionPrecioLista)',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return of(clientContractActions.SAVE_CONFIGURATION_FAILED());
            }),
          );
      }),
    ),
  );
  // TODO: Guardar ContratoClienteMarcaConfiguracionCatClasificacionProducto
  saveClassificationConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.SAVE_CLASSIFICATION_CONFIGURATION_LOAD),
      mergeMap(({selectedFamily}) => {
        const body: ContratoClienteMarcaConfiguracionCatClasificacionProducto =
          selectedFamily.actualConfiguration
            .ContratoClienteMarcaConfiguracionCatClasificacionProducto;
        return this.configuracionClientesContratoMarcasConfiguracionesService
          .ContratoClienteMarcaConfiguracionCatClasificacionProductoGuardarOActualizar(body)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración clasificación (ContratoClienteMarcaConfiguracionCatClasificacionProducto)',
                ),
                response,
              );
              const configuration: IConfContratoCliente = {
                ...selectedFamily.actualConfiguration,
                ContratoClienteMarcaConfiguracionCatClasificacionProducto: {
                  ...selectedFamily.actualConfiguration
                    .ContratoClienteMarcaConfiguracionCatClasificacionProducto,
                  IdContratoClienteMarcaConfiguracionCatClasificacionProducto: extractID(response),
                },
              };
              const newFamily: IVContractFamily = {
                ...selectedFamily,
                actualConfiguration: configuration,
                backupConfiguration: configuration,
                characteristicGroupers: {
                  ...selectedFamily.characteristicGroupers,
                  characteristicGroupersList: {
                    ...selectedFamily.characteristicGroupers.characteristicGroupersList,
                    Results: _map(
                      selectedFamily.characteristicGroupers.characteristicGroupersList.Results,
                      (o: IVClasificacionProductoMarcaCliente) => {
                        if (o.isSelected) {
                          return {
                            ...o,
                            NivelConfiguracionProductoContrato: 'AgrupadorCaracteristica',
                            isConfigured: true,
                            configuration,
                          };
                        }

                        return {...o};
                      },
                    ),
                  },
                },
              };

              this.store.dispatch(
                clientContractActions.SAVE_CONFIGURATION_SUCCESS({
                  newFamily,
                }),
              );
              this.store.dispatch(
                utilsActions.SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has guardado',
                }),
              );
              this.setNeedsToReload('products');
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return clientContractActions.SET_FAMILY_BACKUP();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración clasificación (ContratoClienteMarcaConfiguracionCatClasificacionProducto)',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return of(clientContractActions.SAVE_CONFIGURATION_FAILED());
            }),
          );
      }),
    ),
  );
  // TODO: Guardar ContratoClienteMarcaConfiguracionProducto
  saveProductConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.SAVE_PRODUCT_CONFIGURATION_LOAD),
      mergeMap(({selectedFamily}) => {
        const body: ContratoClienteMarcaConfiguracionProducto =
          selectedFamily.actualConfiguration.ContratoClienteMarcaConfiguracionProducto;
        return this.configuracionClientesContratoMarcasConfiguracionesService
          .ContratoClienteMarcaConfiguracionProductoGuardarOActualizar(body)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración producto (ContratoClienteMarcaConfiguracionProducto)',
                ),
                response,
              );
              const configuration: IConfContratoCliente = {
                ...selectedFamily.actualConfiguration,
                ContratoClienteMarcaConfiguracionProducto: {
                  ...selectedFamily.actualConfiguration.ContratoClienteMarcaConfiguracionProducto,
                  IdContratoClienteMarcaConfiguracionProducto: extractID(response),
                },
              };
              const newFamily: IVContractFamily = {
                ...selectedFamily,
                actualConfiguration: configuration,
                backupConfiguration: configuration,
                products: {
                  ...selectedFamily.products,
                  productsList: {
                    ...selectedFamily.products.productsList,
                    Results: _map(
                      selectedFamily.products.productsList.Results,
                      (o: IVPrecioProductoCliente): IVPrecioProductoCliente => {
                        if (o.isSelected) {
                          return {
                            ...o,
                            isConfigured: true,
                            NivelConfiguracionProductoCliente: 'Producto',
                            configuration,
                          };
                        }
                        return {...o};
                      },
                    ),
                  },
                },
              };
              this.store.dispatch(
                clientContractActions.SAVE_CONFIGURATION_SUCCESS({
                  newFamily,
                }),
              );
              this.store.dispatch(
                utilsActions.SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has guardado',
                }),
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return clientContractActions.SET_FAMILY_BACKUP();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración producto (ContratoClienteMarcaConfiguracionProducto)',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return of(clientContractActions.SAVE_CONFIGURATION_FAILED());
            }),
          );
      }),
    ),
  );

  setNeedsToReload(selectedTab: string) {
    this.store.dispatch(
      contractActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
        needsToReload: true,
        tabConfigurationName: selectedTab,
      }),
    );
    this.store.dispatch(
      contractActions.SET_LIST_OF_CONFIGURED_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
        tabConfigurationName: selectedTab,
      }),
    );
  }
}
