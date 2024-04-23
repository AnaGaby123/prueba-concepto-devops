// CORE
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
// MODELS
import {
  ConfiguracionClientesCalculosService,
  ConfiguracionClientesContratoCalculosService,
  ConfiguracionPrecioContratoClienteObj,
  ConfiguracionProductosMarcasFamiliasService,
  QueryInfo,
  QueryResultVClasificacionProductoMarcaCliente,
  QueryResultVMarcaFamilia,
  QueryResultVPrecioListaClienteProductoFamiliaContrato,
  QueryResultVPrecioListaProductoMarcaCliente,
  QueryResultVPrecioProductoCliente,
} from 'api-catalogos';
import {
  Configs,
  Levels,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {IConfContratoCliente} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
// SELECTORS
import {clientContractsSelectors, clientsDetailsSelectors} from '@appSelectors/forms/clients-form';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
// ACTIONS
import {clientContractActions} from '@appActions/forms/client-form/clients-details-form';
import * as utilsActions from '@appActions/utils/utils.action';
// UTILS
import {
  buildConfContratoClienteFromResponse,
  buildIFamilyCharacteristicGrouperList,
  buildIFamilyPricesList,
  buildIFamilyProductsList,
  buildIVProveedorFamilia,
  paramsFilterListCharacteristicGrouperConfiguration,
  paramsFilterListPriceConfiguration,
  paramsFilterListProductConfiguration,
} from '@appHelpers/catalogs/clients/contracts.helpers';
import * as servicesLogger from '@appUtil/logger';
import {isEmpty} from 'lodash-es';
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';

const FILE_NAME = 'client-contacts-load-data-form.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class ClientContractFamiliesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private configuracionClientesCalculosService: ConfiguracionClientesCalculosService,
    private configuracionClientesContratoCalculosService: ConfiguracionClientesContratoCalculosService,
    private configuracionProductosMarcaFamiliaService: ConfiguracionProductosMarcasFamiliasService,
    private productsTrademarkFamiliesConfigService: ConfiguracionProductosMarcasFamiliasService,
  ) {}

  // DOCS Obtiene las marcas que tengan consolidacion en caso e que enl aloferta dle proveedor se haya marcada alguno
  trademarkFamilyProviderConsolidation = createEffect(() =>
    this.actions$.pipe(
      ofType(contractActions.SET_FAMILY_SELECTED),
      withLatestFrom(this.store.select(clientContractsSelectors.selectedFamily)),
      mergeMap(([action, selectedFamily]) => {
        const info: QueryInfo = {
          Filters: [
            {
              NombreFiltro: 'Activo',
              ValorFiltro: true,
            },
            {
              NombreFiltro: 'IdMarca',
              ValorFiltro: selectedFamily.IdMarca,
            },
            {
              NombreFiltro: 'IdMarcaMarcaFamiliaProveedor',
              ValorFiltro: selectedFamily.IdMarcaFamiliaProveedor,
            },
          ],
        };
        return this.productsTrademarkFamiliesConfigService.vMarcaFamiliaQueryResult(info).pipe(
          map((response: QueryResultVMarcaFamilia) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener las demas familias que pertenecen a la marca seleccionada',
              ),
              response,
            );

            return clientContractActions.SET_TRADEMARK_CONSOLIDATION_PROVIDER_SUCCESS({
              trademarkFamilyProviderConsolidation: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener las demas familias que pertenecen a la marca seleccionada',
              ),
              error,
            );
            return of(clientContractActions.SET_TRADEMARK_CONSOLIDATION_PROVIDER_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS Inicio efectos de tab familia
  // DOCS: Obtener la configuracion a nivel familia en contratos del cliente
  getGeneralConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(
        clientContractActions.SET_FAMILY_SELECTED,
        clientContractActions.GET_GENERAL_CONFIGURATION_LOAD,
      ),
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectedFamily),
        this.store.select(clientsDetailsSelectors.selectedClient),
        this.store.select(clientContractsSelectors.selectedContractBrand),
        this.store.select(catalogsSelectors.selectCustomsAgentsConceptListForDrop),
        this.store.select(catalogsSelectors.selectCustomsListForDropDown),
        this.store.select(clientContractsSelectors.selectAddressOnly),
        this.store.select(catalogsSelectors.getIdAddreessTypeFacturacion),
        this.store.select(catalogsSelectors.getIdAddreessTypeEntrega),
        this.store.select(catalogsSelectors.dropListRutasEntrega),
        this.store.select(catalogsSelectors.selectCatUnidadTiempoList),
        this.store.select(clientContractsSelectors.selectNewContract),
        this.store.select(clientContractsSelectors.selectFamilyLevelConfigQueryInfo),
        this.store.select(catalogsSelectors.selectCustomsAgentsListForDropDown),
      ),
      mergeMap(
        ([
          action,
          selectedFamily$,
          client$,
          brandSelected,
          customsAgentsConceptsList,
          customList,
          clientAddress$,
          billingAddressId$,
          deliveryAddressId$,
          deliveryRoutesList$,
          timeUnitList$,
          contract$,
          queryInfo$,
          customsAgentsList,
        ]) => {
          if (selectedFamily$?.generalConfiguration?.needsToReload) {
            this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
            return this.configuracionClientesCalculosService
              .ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedor(
                queryInfo$,
              )
              .pipe(
                map((response: ConfiguracionPrecioContratoClienteObj) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'al obtener la configuracion general de la familia seleccionada.',
                    ),
                    response,
                  );
                  const configuration: IConfContratoCliente = buildConfContratoClienteFromResponse(
                    response,
                    contract$,
                    selectedFamily$,
                    client$,
                    brandSelected,
                    timeUnitList$,
                    deliveryRoutesList$,
                    clientAddress$,
                    billingAddressId$,
                    deliveryAddressId$,
                    Configs.General,
                    Levels.Family,
                    null,
                    null,
                    null,
                    customsAgentsConceptsList,
                    customList,
                    customsAgentsList,
                  );
                  this.store.dispatch(
                    clientContractActions.GET_GENERAL_CONFIGURATION_SUCCESS({
                      configuration,
                    }),
                  );
                  return utilsActions.SET_LOADING({payload: false});
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'al obtener la configuracion general de la familia seleccionada.',
                    ),
                    error,
                  );
                  this.store.dispatch(clientContractActions.GET_GENERAL_CONFIGURATION_FAILED());
                  return of(utilsActions.SET_LOADING({payload: false}));
                }),
              );
          } else {
            switch (selectedFamily$.selectedLevelConfigurationTab.level) {
              case Levels.Family:
                this.store.dispatch(clientContractActions.RESTORE_GENERAL_ACTUAL_CONFIGURATION());
                break;
              case Levels.listPrice:
                this.store.dispatch(clientContractActions.RESTORE_PRICE_ACTUAL_CONFIGURATION());
                break;
              case Levels.CharacteristicGrouper:
                this.store.dispatch(
                  clientContractActions.RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION(),
                );
                break;
              case Levels.Product:
                this.store.dispatch(clientContractActions.RESTORE_PRODUCT_ACTUAL_CONFIGURATION());
                break;
              default:
                this.store.dispatch(clientContractActions.RESTORE_GENERAL_ACTUAL_CONFIGURATION());
                break;
            }
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al restaurar la configuración de la familia seleccionada',
              ),
            );
          }
          return EMPTY;
        },
      ),
    ),
  );
  // DOCS: Obtiene las familias de la marca seleccionada
  getvFamiliasContrato = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.SET_BRAND_SELECTED),
      withLatestFrom(this.store.select(clientContractsSelectors.selectContractFamiliesFilters)),
      mergeMap(([{brand}, queryInfo$]) => {
        if (brand.needsToReload) {
          return this.configuracionProductosMarcaFamiliaService
            .vMarcaFamiliaQueryResult(queryInfo$)
            .pipe(
              map((response: QueryResultVMarcaFamilia) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener las familias de la marca',
                  ),
                  response,
                );
                this.store.dispatch(
                  clientContractActions.SET_V_FAMILY_CONTRATO_SUCCESS({
                    families: buildIVProveedorFamilia(response.Results),
                  }),
                );
                if (!isEmpty(response.Results)) {
                  return clientContractActions.SET_FAMILY_SELECTED({
                    familyId: response.Results[0].IdMarcaFamilia,
                  });
                }
                return utilsActions.SET_LOADING({payload: false});
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener las familias de la marca',
                  ),
                  error,
                );
                this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
                return of(clientContractActions.GET_V_FAMILY_CONTRATO_ERROR({error}));
              }),
            );
        }
        return EMPTY;
      }),
    ),
  );
  // DOCS Inicio efectos de tab precio lista
  // DOCS: Obtener lista de precios de lista de la sección familias a nivel precio
  getPriceList = createEffect(() =>
    this.actions$.pipe(
      ofType(
        clientContractActions.GET_PRICE_LIST_LOAD,
        clientContractActions.SET_PRICE_LIST_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectedFamily),
        this.store.select(clientContractsSelectors.selectFiltersListLevels),
      ),
      mergeMap(([action, selectedFamily$, queryInfo$]) => {
        if (selectedFamily$.prices.needsToReload) {
          this.store.dispatch(
            clientContractActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
              tabConfigurationName: 'prices',
              isLoading: true,
            }),
          );
          return this.configuracionClientesCalculosService
            .vPrecioListaProductoMarcaClienteQueryResult(queryInfo$)
            .pipe(
              map((response: QueryResultVPrecioListaProductoMarcaCliente) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener una página de la lista de precios de la familia seleccionada',
                  ),
                  response,
                );
                this.store.dispatch(
                  clientContractActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'prices',
                    isLoading: false,
                  }),
                );
                this.store.dispatch(
                  clientContractActions.GET_PRICE_LIST_SUCCESS({
                    prices: buildIFamilyPricesList(selectedFamily$, response),
                  }),
                );
                return clientContractActions.RETURN_PROCESS_SUCCESS();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener una página de la lista de precios de la familia seleccionada',
                  ),
                  error,
                );
                this.store.dispatch(
                  clientContractActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'prices',
                    isLoading: false,
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

  // DOCS: Obtener configuración de un precio de lista
  getPriceConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.SET_CONTRACT_PRICE),
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectedFamily),
        this.store.select(clientsDetailsSelectors.selectedClient),
        this.store.select(clientContractsSelectors.selectedContractBrand),
        this.store.select(catalogsSelectors.selectCustomsAgentsConceptListForDrop),
        this.store.select(catalogsSelectors.selectCustomsListForDropDown),
        this.store.select(clientContractsSelectors.selectAddressOnly),
        this.store.select(catalogsSelectors.getIdAddreessTypeFacturacion),
        this.store.select(catalogsSelectors.getIdAddreessTypeEntrega),
        this.store.select(catalogsSelectors.dropListRutasEntrega),
        this.store.select(catalogsSelectors.selectCatUnidadTiempoList),
        this.store.select(clientContractsSelectors.selectNewContract),
        this.store.select(catalogsSelectors.selectCustomsAgentsListForDropDown),
        this.store.select(clientContractsSelectors.selectFamilyLevelConfigQueryInfo),
      ),
      mergeMap(
        ([
          {price},
          selectedFamily$,
          client$,
          brandSelected,
          customsAgentsConceptsList,
          customList,
          clientAddress$,
          billingAddressId$,
          deliveryAddressId$,
          deliveryRoutesList$,
          timeUnitList$,
          contract$,
          customsAgentsList,
        ]) => {
          if (price.needsToReload) {
            this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
            const hasConfigurationAt = price.NivelConfiguracionProductoContrato
              ? price.NivelConfiguracionProductoContrato
              : price.NivelConfiguracionProductoCliente
              ? price.NivelConfiguracionProductoCliente
              : price.NivelConfiguracionProductoProveedor;
            return this.configuracionClientesCalculosService
              .ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedor(
                paramsFilterListPriceConfiguration(
                  price,
                  client$,
                  selectedFamily$,
                  contract$,
                  brandSelected,
                ),
              )
              .pipe(
                map((response: ConfiguracionPrecioContratoClienteObj) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'al obtener la configuracion del precio de lista de la familia seleccionada.',
                    ),
                    response,
                  );
                  const configuration: IConfContratoCliente = buildConfContratoClienteFromResponse(
                    response,
                    contract$,
                    selectedFamily$,
                    client$,
                    brandSelected,
                    timeUnitList$,
                    deliveryRoutesList$,
                    clientAddress$,
                    billingAddressId$,
                    deliveryAddressId$,
                    Configs.Price,
                    hasConfigurationAt,
                    price.PrecioLista,
                    null,
                    null,
                    customsAgentsConceptsList,
                    customList,
                    customsAgentsList,
                  );
                  this.store.dispatch(
                    clientContractActions.GET_PRICE_CONFIGURATION_SUCCESS({
                      configuration,
                    }),
                  );
                  return utilsActions.SET_LOADING({payload: false});
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'al obtener la configuracion general de la familia seleccionada.',
                    ),
                    error,
                  );
                  return of(utilsActions.SET_LOADING({payload: false}));
                }),
              );
          }
          return of(clientContractActions.RESTORE_PRICE_ACTUAL_CONFIGURATION());
        },
      ),
    ),
  );
  // DOCS: Obtener lista de precios de lista del panel derecho nivel Familia
  getGeneralAsidePrices = createEffect(() =>
    this.actions$.pipe(
      ofType(
        clientContractActions.GET_PRICE_LIST_FOR_PANEL_FAMILY_LEVEL_LOAD,
        clientContractActions.SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM,
      ),
      withLatestFrom(this.store.select(clientContractsSelectors.selectGeneralAsidePricesFilters)),
      mergeMap(([action, queryInfo]) => {
        // @ts-ignore
        if (action.searchTerm === '') {
          return EMPTY;
        }
        return this.configuracionClientesContratoCalculosService
          .vPrecioListaClienteProductoFamiliaContratoQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultVPrecioListaClienteProductoFamiliaContrato) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener una página de la lista de precios aside de la familia seleccionada',
                ),
                response,
              );
              this.store.dispatch(
                clientContractActions.GET_PRICE_LIST_FOR_PANEL_FAMILY_LEVEL_SUCCESS({
                  prices: response,
                  node: 'generalAsidePrices',
                }),
              );
              this.store.dispatch(
                clientContractActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                  isLoading: false,
                  node: 'generalAsidePrices',
                }),
              );
              return clientContractActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD({
                needsToReload: false,
                node: 'generalAsidePrices',
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener una página de la lista de precios aside de la familia seleccionada',
                ),
                error,
              );
              this.store.dispatch(
                clientContractActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                  isLoading: false,
                  node: 'generalAsidePrices',
                }),
              );
              return of(clientContractActions.GET_PRICE_LIST_FOR_PANEL_FAMILY_LEVEL_FAILED());
            }),
          );
      }),
    ),
  );
  // DOCS Inicio efectos de tab agrupador por caracteristica
  // DOCS: Obtener lista de agrupadores por caracterisicas nivel AgrupadorCaracteristica
  getCharacteristicGroupersList = createEffect(() =>
    this.actions$.pipe(
      ofType(
        clientContractActions.GET_CHARACTERISTIC_GROUPER_LIST_LOAD,
        clientContractActions.SET_CHARACTERISTIC_GROUPER_LIST_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectedFamily),
        this.store.select(clientContractsSelectors.selectFiltersListCharacteristicGrouper),
      ),
      mergeMap(([action, selectedFamily$, queryInfo$]) => {
        if (selectedFamily$.characteristicGroupers.needsToReload) {
          this.store.dispatch(
            clientContractActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
              tabConfigurationName: 'characteristicGroupers',
              isLoading: true,
            }),
          );
          return this.configuracionClientesCalculosService
            .vClasificacionProductoMarcaClienteQueryResult(queryInfo$)
            .pipe(
              map((response: QueryResultVClasificacionProductoMarcaCliente) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener una página de la lista de agrupadores caracteristica de la familia seleccionada',
                  ),
                  response,
                );
                this.store.dispatch(
                  clientContractActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'characteristicGroupers',
                    isLoading: false,
                  }),
                );
                this.store.dispatch(
                  clientContractActions.GET_CHARACTERISTIC_GROUPER_LIST_SUCCESS({
                    characteristicGroupers: buildIFamilyCharacteristicGrouperList(
                      selectedFamily$,
                      response,
                    ),
                  }),
                );
                return clientContractActions.RETURN_PROCESS_SUCCESS();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener una página de la lista de agrupadores caracteristica de la familia seleccionada',
                  ),
                  error,
                );
                this.store.dispatch(
                  clientContractActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'characteristicGroupers',
                    isLoading: false,
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

  // DOCS: Obtener configuración de un agrupador caracteristica
  getCharacteristicGrouperConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.SET_CONTRACT_CLASSIFICATION),
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectedFamily),
        this.store.select(clientsDetailsSelectors.selectedClient),
        this.store.select(clientContractsSelectors.selectedContractBrand),
        this.store.select(catalogsSelectors.selectCustomsAgentsConceptListForDrop),
        this.store.select(catalogsSelectors.selectCustomsListForDropDown),
        this.store.select(clientContractsSelectors.selectAddressOnly),
        this.store.select(catalogsSelectors.getIdAddreessTypeFacturacion),
        this.store.select(catalogsSelectors.getIdAddreessTypeEntrega),
        this.store.select(catalogsSelectors.dropListRutasEntrega),
        this.store.select(catalogsSelectors.selectCatUnidadTiempoList),
        this.store.select(clientContractsSelectors.selectNewContract),
        this.store.select(catalogsSelectors.selectCustomsAgentsListForDropDown),
      ),
      mergeMap(
        ([
          {classification},
          selectedFamily$,
          client$,
          selectedBrand$,
          customsAgentsConceptsList,
          customList,
          clientAddress$,
          billingAddressId$,
          deliveryAddressId$,
          deliveryRoutesList$,
          timeUnitList$,
          contract$,
          customsAgentsList,
        ]) => {
          if (classification.needsToReload) {
            this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
            const hasConfigurationAt = classification.NivelConfiguracionProductoContrato
              ? classification.NivelConfiguracionProductoContrato
              : classification.NivelConfiguracionProductoCliente
              ? classification.NivelConfiguracionProductoCliente
              : classification.NivelConfiguracionProductoProveedor;
            return this.configuracionClientesCalculosService
              .ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedor(
                paramsFilterListCharacteristicGrouperConfiguration(
                  classification,
                  client$,
                  selectedFamily$,
                  contract$,
                  selectedBrand$,
                ),
              )
              .pipe(
                map((response: ConfiguracionPrecioContratoClienteObj) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'al obtener la configuracion del agrupador caracteristica de la familia seleccionada.',
                    ),
                    response,
                  );
                  const configuration: IConfContratoCliente = buildConfContratoClienteFromResponse(
                    response,
                    contract$,
                    selectedFamily$,
                    client$,
                    selectedBrand$,
                    timeUnitList$,
                    deliveryRoutesList$,
                    clientAddress$,
                    billingAddressId$,
                    deliveryAddressId$,
                    Configs.Classification,
                    hasConfigurationAt,
                    null,
                    classification.IdAgrupadorCaracteristica,
                    null,
                    customsAgentsConceptsList,
                    customList,
                    customsAgentsList,
                  );
                  this.store.dispatch(
                    clientContractActions.GET_CHARACTERISTIC_GROUPER_CONFIGURATION_SUCCESS({
                      configuration,
                    }),
                  );
                  return utilsActions.SET_LOADING({payload: false});
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'al obtener la configuracion del agrupador caracteristica de la familia seleccionada.',
                    ),
                    error,
                  );
                  return of(utilsActions.SET_LOADING({payload: false}));
                }),
              );
          }
          return of(clientContractActions.RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION());
        },
      ),
    ),
  );

  // DOCS: Product level
  // DOCS: Obtener lista de productos
  getProductsList = createEffect(() =>
    this.actions$.pipe(
      ofType(
        clientContractActions.GET_PRODUCT_LIST_LOAD,
        clientContractActions.SET_PRODUCT_LIST_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectedFamily),
        this.store.select(clientContractsSelectors.selectVPrecioProductoClienteFilters),
      ),
      mergeMap(([action, selectedFamily$, queryInfo]) => {
        if (selectedFamily$.products.needsToReload) {
          this.store.dispatch(
            clientContractActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
              tabConfigurationName: 'products',
              isLoading: true,
            }),
          );
          return this.configuracionClientesCalculosService
            .vPrecioProductoClienteQueryResult(queryInfo)
            .pipe(
              map((response: QueryResultVPrecioProductoCliente) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener una página de la lista de productos de la familia seleccionada',
                  ),
                  response,
                );
                this.store.dispatch(
                  clientContractActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'products',
                    isLoading: false,
                  }),
                );
                this.store.dispatch(
                  clientContractActions.GET_PRODUCT_LIST_SUCCESS({
                    products: buildIFamilyProductsList(selectedFamily$, response),
                  }),
                );
                return clientContractActions.RETURN_PROCESS_SUCCESS();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener una página de la lista de productos de la familia seleccionada',
                  ),
                  error,
                );
                this.store.dispatch(
                  clientContractActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'products',
                    isLoading: false,
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

  // DOCS: Obtener configuración de un producto
  getProductConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.SET_CONTRACT_PRODUCT),
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectedFamily),
        this.store.select(clientsDetailsSelectors.selectedClient),
        this.store.select(clientContractsSelectors.selectedContractBrand),
        this.store.select(catalogsSelectors.selectCustomsAgentsConceptListForDrop),
        this.store.select(catalogsSelectors.selectCustomsListForDropDown),
        this.store.select(clientContractsSelectors.selectAddressOnly),
        this.store.select(catalogsSelectors.getIdAddreessTypeFacturacion),
        this.store.select(catalogsSelectors.getIdAddreessTypeEntrega),
        this.store.select(catalogsSelectors.dropListRutasEntrega),
        this.store.select(catalogsSelectors.selectCatUnidadTiempoList),
        this.store.select(clientContractsSelectors.selectNewContract),
        this.store.select(catalogsSelectors.selectCustomsAgentsListForDropDown),
      ),
      mergeMap(
        ([
          {product},
          selectedFamily$,
          client$,
          selectedBrand$,
          customsAgentsConceptsList,
          customList,
          clientAddress$,
          billingAddressId$,
          deliveryAddressId$,
          deliveryRoutesList$,
          timeUnitList$,
          contract$,
          customsAgentsList,
        ]) => {
          if (product.needsToReload) {
            this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
            const hasConfigurationAt = product.NivelConfiguracionProductoContratoCliente
              ? product.NivelConfiguracionProductoContratoCliente
              : product.NivelConfiguracionProductoCliente
              ? product.NivelConfiguracionProductoCliente
              : product.NivelConfiguracionProductoProveedor;

            return this.configuracionClientesCalculosService
              .ConfiguracionContratoClienteProveedorExtensionConfiguracionContratoClienteProveedor(
                paramsFilterListProductConfiguration(
                  product,
                  client$,
                  selectedFamily$,
                  contract$,
                  selectedBrand$,
                ),
              )
              .pipe(
                map((response: ConfiguracionPrecioContratoClienteObj) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'al obtener la configuracion del producto de la familia seleccionada.',
                    ),
                    response,
                  );
                  const configuration: IConfContratoCliente = buildConfContratoClienteFromResponse(
                    response,
                    contract$,
                    selectedFamily$,
                    client$,
                    selectedBrand$,
                    timeUnitList$,
                    deliveryRoutesList$,
                    clientAddress$,
                    billingAddressId$,
                    deliveryAddressId$,
                    Configs.Product,
                    hasConfigurationAt,
                    null,
                    null,
                    product.IdProducto,
                    customsAgentsConceptsList,
                    customList,
                    customsAgentsList,
                  );
                  this.store.dispatch(
                    clientContractActions.GET_PRODUCT_CONFIGURATION_SUCCESS({
                      configuration,
                    }),
                  );
                  return utilsActions.SET_LOADING({payload: false});
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'al obtener la configuracion del producto de la familia seleccionada.',
                    ),
                    error,
                  );
                  this.store.dispatch(clientContractActions.GET_PRODUCT_CONFIGURATION_FAILED());
                  return of(utilsActions.SET_LOADING({payload: false}));
                }),
              );
          }
          return of(clientContractActions.RESTORE_PRODUCT_ACTUAL_CONFIGURATION());
        },
      ),
    ),
  );
}
