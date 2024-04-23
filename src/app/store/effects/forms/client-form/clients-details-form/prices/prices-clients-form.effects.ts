// CORE
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';
import {AppState} from '@appCore/core.state';
// MODELS
import {
  buildConfigurationFromResponse,
  buildProviders,
  paramsCharacteristicGrouperListConfiguration,
  paramsPriceListConfiguration,
  paramsProductListConfiguration,
} from '@appHelpers/catalogs/clients/prices.helpers';
import {
  IClientClassificationsList,
  IClientListPricesList,
  IClientProductList,
  IVClientProductClassification,
  IVClientProductConfiguration,
  IVProductListPriceConfigurationClient,
  IVProviderResumeQueryResult,
  IVTrademarkFamily,
} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import * as api from 'api-catalogos';
import {
  ArchivoDetalle,
  ArchivoExportarCSVParameter,
  CatRutaEntrega,
  ConfiguracionClientesDireccionesService,
  ConfiguracionPrecioClienteObj,
  ConfiguracionProductosMarcasFamiliasService,
  QueryInfo,
  QueryResultDireccionClienteDetalle,
  QueryResultVClasificacionProductoCliente,
  QueryResultVMarcaFamilia,
  QueryResultVPrecioListaClienteProducto,
  QueryResultVPrecioListaClienteProductoFamilia,
  QueryResultVPrecioProductoCliente,
  QueryResultVProveedorResumen,
  VPrecioListaClienteProducto,
} from 'api-catalogos';
import {GeneralConfigurationCustom} from '@appModels/catalogos/offerSegmentation/offerSegmentation';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {
  Configs,
  Levels,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// ACTIONS
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY, SET_LOADING} from '@appActions/utils/utils.action';
import {pricesActions} from '@appActions/forms/client-form';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
// SELECTORS
import {
  clientPricesSelectors,
  clientsDetailsSelectors,
  clientsGeneralDataSelectors,
} from '@appSelectors/forms/clients-form';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
// UTILS
import {initializeTrademarkFamilies} from '@appHelpers/catalogs/providers/offer.helpers';
import {deburr, filter, forEach, isEmpty, map as _map} from 'lodash-es';
import {PAGING_LIMIT} from '@appUtil/common.protocols';
import {addRowIndex} from '@appUtil/util';
import {getObjectPercentagePriceList} from '@appUtil/math';
import {getOnlyFileName} from '@appUtil/files';

const FILE_NAME = 'prices-clients-form.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class PricesClientsFormEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private configuracionClientesRelacionesService: api.ConfiguracionClientesRelacionesService,
    private configuracionClientesCalculosService: api.ConfiguracionClientesCalculosService,
    private configuracionProveedoresService: api.ConfiguracionProveedoresService,
    private sistemaArchivosCSVService: api.SistemaArchivosCSVsService,
    private productsTrademarkFamiliesConfigService: ConfiguracionProductosMarcasFamiliasService,
    private clientAddressesConfigService: ConfiguracionClientesDireccionesService,
  ) {}

  /*DOCS: Peticiones a servicios al cargar la pantalla*/
  getInitState = createEffect(
    () =>
      this.actions$.pipe(
        ofType(pricesActions.GET_INITIAL_PRICES_STATE_LOAD),
        mergeMap((action) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          this.store.dispatch(pricesActions.GET_ADDRESSES_CLIENT_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_RUTA_ENTREGA_LOAD());
          this.store.dispatch(catalogsActions.GET_LIST_ADUANA_LOAD());
          this.store.dispatch(catalogsActions.GET_LIST_AGENTE_ADUANAL_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_UNIDAD_TIEMPO_LOAD());
          this.store.dispatch(catalogsActions.GET_LIST_CONCEPTS_CUSTOM_AGENT_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_NIVEL_INGRESO_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_ADDRESS_TYPE_LOAD());
          this.store.dispatch(pricesActions.GET_PROVIDERS_LIST_LOAD({isFirstPage: true}));

          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: Obtiene las direcciones del cliente
  getClientAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.GET_ADDRESSES_CLIENT_LOAD),
      withLatestFrom(this.store.select(clientsDetailsSelectors.selectedClient)),
      mergeMap(([action, clientSelected]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdCliente',
          ValorFiltro: clientSelected.IdCliente,
        });
        return this.clientAddressesConfigService.DireccionClienteDetalleQueryResult(body).pipe(
          map((response: QueryResultDireccionClienteDetalle) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener las direcciones del cliente',
              ),
              response,
            );
            return pricesActions.GET_ADDRESSES_CLIENT_SUCCESS({
              clientAddresses: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener las direcciones del cliente',
              ),
              error,
            );
            return of(pricesActions.GET_ADDRESSES_CLIENT_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: Obtener rutas de entrega
  getCatRutaEntregaSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(catalogsActions.GET_CAT_RUTA_ENTREGA_SUCCESS),
        mergeMap((action) => {
          /*DOCS: No se porque se están filtrando*/
          const filtered: CatRutaEntrega[] = filter(
            action.lisCatRutaEntrega,
            (o: CatRutaEntrega) =>
              deburr(o.RutaEntrega)?.toLowerCase() !== 'ninguno' &&
              deburr(o.RutaEntrega)?.toLowerCase() !== 'internacional',
          );
          this.store.dispatch(
            pricesActions.GET_PROVIDER_RUTA_ENTREGA_SUCCESS({
              deliveryRoutesList: filtered,
            }),
          );
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  /*DOCS: Obtener lista de proveedores*/
  getProviders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.GET_PROVIDERS_LIST_LOAD, pricesActions.SET_SEARCH_TERM_BY_PROVIDER),
      withLatestFrom(this.store.select(clientPricesSelectors.selectProvidersQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        return this.configuracionProveedoresService.vProveedorResumenQueryResult(queryInfo).pipe(
          map((response: QueryResultVProveedorResumen) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener una página de la lista de proveedores',
              ),
              response,
            );
            if (response.Results.length === 0) {
              this.store.dispatch(pricesActions.SET_PROVIDER_SELECTED_LOAD({provider: null}));
              this.store.dispatch(pricesActions.SET_PROVIDER_LIST_SUCCESS());
            } else {
              const providers: IVProviderResumeQueryResult = buildProviders(response);
              this.store.dispatch(
                pricesActions.GET_PROVIDERS_LIST_SUCCESS({
                  providers,
                }),
              );
              if (queryInfo.desiredPage === 1 && providers.Results.length > 0) {
                return pricesActions.SET_SELECTED_PROVIDER({
                  providerId: providers.Results[0].IdProveedor,
                });
              }
            }
            this.store.dispatch(SET_LOADING({payload: false}));
            return pricesActions.RETURN_PROCESS_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener una página de la lista de proveedores',
              ),
              error,
            );
            return of(pricesActions.GET_PROVIDERS_LIST_FAILED());
          }),
        );
      }),
    ),
  );

  /*DOCS: Obtener lista de familias asociadas al proveedor seleccionado para el carrusel*/
  getXProvidersFamilies = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.SET_SELECTED_PROVIDER),
      withLatestFrom(
        this.store.select(clientPricesSelectors.selectTrademarkFamiliesQueryInfo),
        this.store.select(clientPricesSelectors.selectedProviderNeedsToReload),
      ),
      mergeMap(([action, queryInfo, needsToReload]) => {
        if (!needsToReload) {
          return EMPTY;
        }
        return this.productsTrademarkFamiliesConfigService.vMarcaFamiliaQueryResult(queryInfo).pipe(
          map((response: QueryResultVMarcaFamilia) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener las familias del proveedor',
              ),
              response,
            );
            const mappedFamilies: Array<IVTrademarkFamily> = initializeTrademarkFamilies(
              response.Results,
            );
            this.store.dispatch(
              pricesActions.GET_FAMILIES_SUCCESS({
                families: mappedFamilies,
              }),
            );
            if (!isEmpty(mappedFamilies)) {
              return pricesActions.SET_SELECTED_FAMILY({
                familyId: mappedFamilies[0].IdMarcaFamilia,
              });
            }

            return utilsActions.SET_LOADING({payload: false});
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener las familias del proveedor',
              ),
              error,
            );
            this.store.dispatch(pricesActions.GET_FAMILIES_FAILED());
            return of(utilsActions.SET_LOADING({payload: false}));
          }),
        );
      }),
    ),
  );

  /*DOCS: Nivel Familia
     Obtener configuracion general de una familia*/
  getFamilyConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(
        pricesActions.GET_FAMILY_GENERAL_CONFIGURATION_LOAD,
        pricesActions.SET_SELECTED_FAMILY,
      ),
      withLatestFrom(
        this.store.select(clientPricesSelectors.selectedProviderFamily),
        this.store.select(clientsDetailsSelectors.selectedClient),
        this.store.select(catalogsSelectors.selectCustomsAgentsListForDropDown),
        this.store.select(catalogsSelectors.selectCustomsListForDropDown),
        this.store.select(catalogsSelectors.selectCustomsAgentsConceptListForDrop),
        this.store.select(clientPricesSelectors.selectClientAddresses),
        this.store.select(catalogsSelectors.getIdAddreessTypeEntrega),
        this.store.select(catalogsSelectors.dropListRutasEntrega),
        this.store.select(clientPricesSelectors.selectedProvider),
        this.store.select(clientsGeneralDataSelectors.selectClientIncomeLevel),
        this.store.select(clientPricesSelectors.selectFamilyLevelConfigQueryInfo),
      ),
      mergeMap(
        ([
          action,
          selectedFamily,
          clientSelected,
          customsAgentsList,
          customsList,
          customsAgentsConceptsList,
          clientAddresses,
          idCatTipeAddressEntrega,
          rutasEntrega,
          selectedProvider,
          nivelIngreso,
          queryInfo,
        ]) => {
          if (selectedFamily?.generalConfiguration?.needsToReload) {
            this.store.dispatch(SET_LOADING({payload: true}));
            return this.configuracionClientesCalculosService
              .ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedor(queryInfo)
              .pipe(
                map((response: ConfiguracionPrecioClienteObj) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'al obtener la configuracion general de la familia seleccionada.',
                    ),
                    response,
                  );
                  const configuration: GeneralConfigurationCustom = buildConfigurationFromResponse({
                    responseConf: response,
                    familyTrademarkId: selectedFamily.IdMarcaFamilia,
                    clientId: clientSelected.IdCliente,
                    customsAgentsList,
                    customsList,
                    customsAgentsConceptsList,
                    levelConfiguration: Configs.General,
                    hasConfigurationAt: Levels.Family,
                    clientAddresses,
                    deliveryAddressId: idCatTipeAddressEntrega,
                    deliveryRoutesList: rutasEntrega,
                    isMexican: selectedProvider.Mexicano,
                    incomeLevel: nivelIngreso,
                  });
                  this.store.dispatch(
                    pricesActions.GET_FAMILY_GENERAL_CONFIGURATION_SUCCESS({
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
                  this.store.dispatch(pricesActions.GET_FAMILY_GENERAL_CONFIGURATION_FAILED());
                  return of(utilsActions.SET_LOADING({payload: false}));
                }),
              );
          } else {
            switch (selectedFamily.selectedLevelConfigurationTab.level) {
              case Levels.Family:
                this.store.dispatch(pricesActions.RESTORE_GENERAL_ACTUAL_CONFIGURATION());
                break;
              case Levels.listPrice:
                this.store.dispatch(pricesActions.RESTORE_PRICE_ACTUAL_CONFIGURATION());
                break;
              case Levels.CharacteristicGrouper:
                this.store.dispatch(pricesActions.RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION());
                break;
              case Levels.Product:
                this.store.dispatch(pricesActions.RESTORE_PRODUCT_ACTUAL_CONFIGURATION());
                break;
              default:
                this.store.dispatch(pricesActions.RESTORE_GENERAL_ACTUAL_CONFIGURATION());
                break;
            }
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al restaurar la configuración de la familia seleccionada',
              ),
            );
            return of(utilsActions.SET_LOADING({payload: false}));
          }
        },
      ),
    ),
  );
  trademarkFamilyProviderConsolidation = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.SET_SELECTED_FAMILY),
      withLatestFrom(this.store.select(clientPricesSelectors.selectedProviderFamily)),
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

            return pricesActions.SET_TRADEMARK_CONSOLIDATION_PROVIDER_SUCCESS({
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
            return of(pricesActions.SET_TRADEMARK_CONSOLIDATION_PROVIDER_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS Se obtiene una pagina de precios de lista para la tab precio de lista
  getPrices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        pricesActions.GET_PRICE_LOAD,
        pricesActions.SET_PRICE_LIST_SEARCH_TERM,
        pricesActions.GET_PRICE_LIST_FILTERED_BY_THIS_LEVEL_CONFIG,
      ),
      withLatestFrom(
        this.store.select(clientPricesSelectors.selectedProviderFamily),
        this.store.select(clientPricesSelectors.selectQueryInfoPricesTab),
      ),
      mergeMap(([action, familySelected$, queryInfo]) => {
        if (!familySelected$.IdMarcaFamilia) {
          return EMPTY;
        }
        if (familySelected$.prices.needsToReload) {
          this.store.dispatch(
            pricesActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
              tabConfigurationName: 'prices',
              isLoading: true,
            }),
          );
          return this.configuracionClientesCalculosService
            .vPrecioListaClienteProductoQueryResult(queryInfo)
            .pipe(
              map((response: QueryResultVPrecioListaClienteProducto) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener una página de la lista de precios de la familia seleccionada',
                  ),
                  response,
                );
                this.store.dispatch(
                  pricesActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'prices',
                    isLoading: false,
                  }),
                );
                this.store.dispatch(
                  pricesActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                    tabConfigurationName: 'prices',
                    needsToReload: false,
                  }),
                );
                const prices: IClientListPricesList = {
                  Results: _map(
                    response.Results,
                    (o: VPrecioListaClienteProducto): IVProductListPriceConfigurationClient => ({
                      ...o,
                      needsToReload: true,
                      isNegative: getObjectPercentagePriceList(o.PrecioProquifaNet, o.PrecioLista)
                        .isNegative,
                      percentage: getObjectPercentagePriceList(o.PrecioProquifaNet, o.PrecioLista)
                        .percentage,
                    }),
                  ),
                  TotalResults: response.TotalResults,
                };
                this.store.dispatch(
                  pricesActions.GET_PRICE_SUCCESS({
                    prices: prices,
                  }),
                );
                if (familySelected$.prices.desiredPage === 1 && prices.Results.length > 0) {
                  return pricesActions.GET_FAMILY_PRICE_CONFIGURATION_LOAD({
                    priceItem: prices.Results[0],
                  });
                }
                if (prices.Results.length === 0) {
                  return pricesActions.QUIT_ACTUAL_CONFIGURATION();
                } else {
                  return pricesActions.RETURN_PROCESS_SUCCESS();
                }
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
                this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
                this.store.dispatch(pricesActions.SAVE_CONFIGURATION_FAILED());
                return of<any>();
              }),
            );
        } else {
          const selectedPrice = filter(
            familySelected$.prices.pricesList.Results,
            (o) => o.isSelected,
          )[0];
          if (selectedPrice) {
            this.store.dispatch(
              pricesActions.GET_FAMILY_PRICE_CONFIGURATION_LOAD({
                priceItem: selectedPrice,
              }),
            );
          }
          return EMPTY;
        }
      }),
    ),
  );

  // Actualiza el precio de lista seleccionado
  updatePriceItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.UPDATE_SELECTED_PRICE_ITEM_LOAD),
      withLatestFrom(this.store.select(clientPricesSelectors.selectQueryInfoPricesTab)),
      mergeMap(([action, queryInfo]) => {
        queryInfo.Filters.push({
          NombreFiltro: 'PrecioLista',
          ValorFiltro: action.priceItem.PrecioLista,
        });
        return this.configuracionClientesCalculosService
          .vPrecioListaClienteProductoQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultVPrecioListaClienteProducto) => {
              return pricesActions.UPDATE_SELECTED_PRICE_ITEM_SUCCESS({
                prices: response.Results,
              });
            }),
            catchError((error) => {
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS Se obtiene la configuracion precio de un precio de lista
  getPriceConfiguration = createEffect(
    () =>
      this.actions$.pipe(
        ofType(pricesActions.GET_FAMILY_PRICE_CONFIGURATION_LOAD),
        withLatestFrom(
          this.store.select(clientPricesSelectors.selectedProviderFamily),
          this.store.select(clientsDetailsSelectors.selectedClient),
          this.store.select(catalogsSelectors.selectCustomsAgentsListForDropDown),
          this.store.select(catalogsSelectors.selectCustomsListForDropDown),
          this.store.select(catalogsSelectors.selectCustomsAgentsConceptListForDrop),
          this.store.select(clientPricesSelectors.selectClientAddresses),
          this.store.select(catalogsSelectors.getIdAddreessTypeEntrega),
          this.store.select(catalogsSelectors.dropListRutasEntrega),
          this.store.select(clientPricesSelectors.selectedProvider),
          this.store.select(clientsGeneralDataSelectors.selectClientIncomeLevel),
        ),
        mergeMap(
          ([
            action,
            selectedFamily,
            selectedClient,
            customsAgentsList,
            customsList,
            customsAgentsConceptsList,
            clientAddresses,
            idCatTipeAddressEntrega,
            rutasEntrega,
            selectedProvider,
            nivelIngreso,
          ]) => {
            if (action.priceItem.needsToReload) {
              this.store.dispatch(SET_LOADING({payload: true}));
              const hasConfigurationAt = action.priceItem.NivelConfiguracionProductoCliente
                ? action.priceItem.NivelConfiguracionProductoCliente
                : action.priceItem.NivelConfiguracionProductoProveedor;
              return this.configuracionClientesCalculosService
                .ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedor(
                  paramsPriceListConfiguration(
                    action.priceItem,
                    selectedClient.IdCliente,
                    selectedFamily,
                  ),
                )
                .pipe(
                  map((response: ConfiguracionPrecioClienteObj) => {
                    this.logger.debug(
                      servicesLogger.generateMessage(
                        FILE_NAME,
                        servicesLogger.LOG_SUCCEEDED,
                        'al obtener la configuracion del precio de lista seleccionado.',
                      ),
                      response,
                    );
                    this.store.dispatch(SET_LOADING({payload: false}));
                    const configuration: GeneralConfigurationCustom = buildConfigurationFromResponse(
                      {
                        responseConf: response,
                        familyTrademarkId: selectedFamily.IdMarcaFamilia,
                        clientId: selectedClient.IdCliente,
                        customsAgentsList,
                        customsList,
                        customsAgentsConceptsList,
                        levelConfiguration: Configs.Price,
                        hasConfigurationAt,
                        clientAddresses,
                        deliveryAddressId: idCatTipeAddressEntrega,
                        deliveryRoutesList: rutasEntrega,
                        isMexican: selectedProvider.Mexicano,
                        incomeLevel: nivelIngreso,
                        price: action.priceItem.PrecioLista,
                      },
                    );

                    this.store.dispatch(
                      pricesActions.GET_FAMILY_PRICE_CONFIGURATION_SUCCESS({
                        configuration,
                      }),
                    );
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
                    this.store.dispatch(pricesActions.GET_FAMILY_PRICE_CONFIGURATION_FAILED());
                    this.store.dispatch(SET_LOADING({payload: false}));
                    return EMPTY;
                  }),
                );
            } else {
              this.store.dispatch(pricesActions.RESTORE_PRICE_ACTUAL_CONFIGURATION());
              return EMPTY;
            }
          },
        ),
      ),
    {dispatch: false},
  );

  // DOCS Se obtiene una pagina de agrupadores por caracteristica (clasificaciones) para la tab agrupador caracteristica
  getClassificationsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        pricesActions.GET_CLASSIFICATIONS_LOAD,
        pricesActions.SET_PRICE_LIST_SEARCH_TERM_CHARACTERISITC_GROUPER,
        pricesActions.GET_THIS_LEVEL_CLASSIFICATIONS_LIST_LOAD,
      ),
      withLatestFrom(
        this.store.select(clientPricesSelectors.selectedProviderFamily),
        this.store.select(clientPricesSelectors.selectFiltersToCharacteristicGrouper),
      ),
      mergeMap(([action, selectedFamily$, queryInfo]) => {
        if (!selectedFamily$.IdMarcaFamilia) {
          return EMPTY;
        }
        if (selectedFamily$.classifications.needsToReload) {
          this.store.dispatch(
            pricesActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
              tabConfigurationName: 'classifications',
              isLoading: true,
            }),
          );
          return this.configuracionClientesCalculosService
            .vClasificacionProductoClienteQueryResult(queryInfo)
            .pipe(
              map((response: QueryResultVClasificacionProductoCliente) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener una página de la lista de clasificaciones de la familia seleccionada',
                  ),
                  response,
                );
                this.store.dispatch(
                  pricesActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'classifications',
                    isLoading: false,
                  }),
                );
                this.store.dispatch(
                  pricesActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                    tabConfigurationName: 'classifications',
                    needsToReload: false,
                  }),
                );
                forEach(response.Results, (o: IVClientProductClassification) => {
                  o.needsToReload = true;
                });
                const indexedResults: IVClientProductClassification[] = addRowIndex(
                  selectedFamily$.classifications.desiredPage,
                  PAGING_LIMIT,
                  response.Results,
                );
                const classifications: IClientClassificationsList = {
                  TotalResults: response.TotalResults,
                  Results: _map(indexedResults, (o: IVClientProductClassification) => ({
                    ...o,
                    isSelected: false,
                    needsToReload: true,
                  })),
                };
                this.store.dispatch(
                  pricesActions.GET_CLASSIFICATIONS_SUCCESS({
                    classifications,
                  }),
                );
                if (
                  selectedFamily$.classifications.desiredPage === 1 &&
                  response.Results.length > 0
                ) {
                  return pricesActions.GET_FAMILY_CLASSIFICATION_CONFIGURATION_LOAD({
                    classificationItem: response.Results[0],
                  });
                }
                if (response.Results.length === 0) {
                  return pricesActions.QUIT_ACTUAL_CONFIGURATION();
                } else {
                  return pricesActions.RETURN_PROCESS_SUCCESS();
                }
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener una página de la lista de clasificaciones de la familia seleccionada',
                  ),
                  error,
                );
                this.store.dispatch(pricesActions.GET_CLASSIFICATIONS_FAILED());
                this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
                return of<any>();
              }),
            );
        } else {
          const selectedClassification = filter(
            selectedFamily$.classifications.classificationsList.Results,
            (o) => o.isSelected,
          )[0];
          if (selectedClassification) {
            this.store.dispatch(
              pricesActions.GET_FAMILY_CLASSIFICATION_CONFIGURATION_LOAD({
                classificationItem: selectedClassification,
              }),
            );
          }
          return EMPTY;
        }
      }),
    ),
  );
  updateCharacteristicGrouperItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.UPDATE_SELECTED_CHARACTERISTIC_GROUPER_LOAD),
      withLatestFrom(this.store.select(clientPricesSelectors.selectFiltersToCharacteristicGrouper)),
      mergeMap(([action, queryInfo]) => {
        queryInfo.Filters.push({
          NombreFiltro: 'IdAgrupadorCaracteristica',
          ValorFiltro: action.productItem.IdAgrupadorCaracteristica,
        });
        return this.configuracionClientesCalculosService
          .vClasificacionProductoClienteQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultVClasificacionProductoCliente) => {
              return pricesActions.UPDATE_SELECTED_CHARACTERISTIC_GROUPER_SUCCESS({
                productItem: response.Results[0],
              });
            }),
            catchError((error) => {
              return EMPTY;
            }),
          );
      }),
    ),
  );
  // DOCS Accion que obtiene la configuracion de una clasificacion
  getClassificationConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.GET_FAMILY_CLASSIFICATION_CONFIGURATION_LOAD),
      withLatestFrom(
        this.store.select(clientPricesSelectors.selectedProviderFamily),
        this.store.select(clientsDetailsSelectors.selectedClient),
        this.store.select(catalogsSelectors.selectCustomsAgentsListForDropDown),
        this.store.select(catalogsSelectors.selectCustomsListForDropDown),
        this.store.select(catalogsSelectors.selectCustomsAgentsConceptListForDrop),
        this.store.select(clientPricesSelectors.selectClientAddresses),
        this.store.select(catalogsSelectors.getIdAddreessTypeEntrega),
        this.store.select(catalogsSelectors.dropListRutasEntrega),
        this.store.select(clientPricesSelectors.selectedProvider),
        this.store.select(clientsGeneralDataSelectors.selectClientIncomeLevel),
      ),
      mergeMap(
        ([
          action,
          selectedFamily,
          selectedClient,
          customsAgentsList,
          customsList,
          customsAgentsConceptsList,
          clientAddresses,
          idCatTipeAddressEntrega,
          rutasEntrega,
          selectedProvider,
          nivelIngreso,
        ]) => {
          if (action.classificationItem.needsToReload) {
            this.store.dispatch(SET_LOADING({payload: true}));
            const hasConfigurationAt = action.classificationItem.NivelConfiguracionProductoCliente
              ? action.classificationItem.NivelConfiguracionProductoCliente
              : action.classificationItem.NivelConfiguracionProductoProveedor;
            return this.configuracionClientesCalculosService
              .ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedor(
                paramsCharacteristicGrouperListConfiguration(
                  action.classificationItem,
                  selectedClient.IdCliente,
                  selectedFamily,
                ),
              )
              .pipe(
                map((response: ConfiguracionPrecioClienteObj) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'al obtener la configuracion de la clasificación seleccionada.',
                    ),
                    response,
                  );
                  const configuration: GeneralConfigurationCustom = buildConfigurationFromResponse({
                    responseConf: response,
                    familyTrademarkId: selectedFamily.IdMarcaFamilia,
                    clientId: selectedClient.IdCliente,
                    customsAgentsList,
                    customsList,
                    customsAgentsConceptsList,
                    levelConfiguration: Configs.Classification,
                    hasConfigurationAt,
                    clientAddresses,
                    deliveryAddressId: idCatTipeAddressEntrega,
                    deliveryRoutesList: rutasEntrega,
                    isMexican: selectedProvider.Mexicano,
                    incomeLevel: nivelIngreso,
                    classificationId: action.classificationItem.IdAgrupadorCaracteristica,
                    price: null,
                    productId: null,
                  });
                  this.store.dispatch(SET_LOADING({payload: false}));

                  return pricesActions.GET_FAMILY_CLASSIFICATION_CONFIGURATION_SUCCESS({
                    configuration,
                  });
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'al obtener la configuracion de la clasificación seleccionada.',
                    ),
                    error,
                  );
                  this.store.dispatch(
                    pricesActions.GET_FAMILY_CLASSIFICATION_CONFIGURATION_FAILED(),
                  );
                  return of(SET_LOADING({payload: false}));
                }),
              );
          } else {
            return of(pricesActions.RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION());
          }
        },
      ),
    ),
  );

  // DOCS Effect que obtiene la lista de productos paginada
  getProductsList = createEffect(() =>
    this.actions$.pipe(
      ofType(
        pricesActions.GET_PRODUCTS_LIST_LOAD,
        pricesActions.SET_SEARCH_TERM_BY_PRODUCTS_LIST,
        pricesActions.GET_THIS_LEVEL_PRODUCTS_LIST_LOAD,
      ),
      withLatestFrom(
        this.store.select(clientPricesSelectors.selectedProviderFamily),
        this.store.select(clientPricesSelectors.selectFiltersToProductList),
      ),
      mergeMap(([action, selectedFamily$, queryInfo]) => {
        if (selectedFamily$.products.needsToReload) {
          this.store.dispatch(
            pricesActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
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
                  pricesActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'products',
                    isLoading: false,
                  }),
                );
                this.store.dispatch(
                  pricesActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                    tabConfigurationName: 'products',
                    needsToReload: false,
                  }),
                );
                forEach(response.Results, (o: IVClientProductConfiguration) => {
                  o.needsToReload = true;
                  o.isNegative = o.PrecioProquifaNet < o.PrecioLista;
                  o.percentage = Math.abs(
                    ((o.PrecioProquifaNet - o.PrecioLista) / o.PrecioLista) * 100,
                  );
                });

                const indexedResults: IVClientProductConfiguration[] = addRowIndex(
                  selectedFamily$.products.desiredPage,
                  PAGING_LIMIT,
                  response.Results,
                );

                const products: IClientProductList = {
                  TotalResults: response.TotalResults,
                  Results: addRowIndex(
                    selectedFamily$.products.desiredPage,
                    PAGING_LIMIT,
                    indexedResults,
                  ),
                };
                this.store.dispatch(
                  pricesActions.GET_PRODUCTS_LIST_SUCCESS({
                    products,
                  }),
                );
                if (selectedFamily$.products.desiredPage === 1 && response.Results.length > 0) {
                  return pricesActions.GET_FAMILY_PRODUCT_CONFIGURATION_LOAD({
                    productItem: response.Results[0],
                  });
                }
                if (response.Results.length === 0) {
                  return pricesActions.QUIT_ACTUAL_CONFIGURATION();
                }
                return pricesActions.RETURN_PROCESS_SUCCESS();
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
                this.store.dispatch(pricesActions.GET_PRODUCTS_LIST_FAILED());
                this.store.dispatch(
                  pricesActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'products',
                    isLoading: false,
                  }),
                );
                this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
                return of<any>();
              }),
            );
        } else {
          const selectedProduct = filter(
            selectedFamily$.products.productsList.Results,
            (o) => o.isSelected,
          )[0];
          if (selectedProduct) {
            this.store.dispatch(
              pricesActions.GET_FAMILY_PRODUCT_CONFIGURATION_LOAD({
                productItem: selectedProduct,
              }),
            );
          }
          return of(pricesActions.RETURN_PROCESS_SUCCESS());
        }
      }),
    ),
  );

  updateProductItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.UPDATE_SELECTED_PRODUCT_PRICE_LOAD),
      withLatestFrom(this.store.select(clientPricesSelectors.selectFiltersToProductList)),
      mergeMap(([action, queryInfo]) => {
        queryInfo.Filters.push({
          NombreFiltro: 'IdProducto',
          ValorFiltro: action.productItem.IdProducto,
        });
        return this.configuracionClientesCalculosService
          .vPrecioProductoClienteQueryResult(queryInfo)
          .pipe(
            map((response) => {
              return pricesActions.UPDATE_SELECTED_PRODUCT_PRICE_SUCCESS({
                productItem: response.Results[0],
              });
            }),
            catchError((error) => {
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS Se obtiene la configuracion de un producto
  getProductConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.GET_FAMILY_PRODUCT_CONFIGURATION_LOAD),
      withLatestFrom(
        this.store.select(clientPricesSelectors.selectedProviderFamily),
        this.store.select(clientsDetailsSelectors.selectedClient),
        this.store.select(catalogsSelectors.selectCustomsAgentsListForDropDown),
        this.store.select(catalogsSelectors.selectCustomsListForDropDown),
        this.store.select(catalogsSelectors.selectCustomsAgentsConceptListForDrop),
        this.store.select(clientPricesSelectors.selectClientAddresses),
        this.store.select(catalogsSelectors.getIdAddreessTypeEntrega),
        this.store.select(catalogsSelectors.dropListRutasEntrega),
        this.store.select(clientPricesSelectors.selectedProvider),
        this.store.select(clientsGeneralDataSelectors.selectClientIncomeLevel),
      ),
      mergeMap(
        ([
          action,
          selectedFamily,
          selectedClient,
          customsAgentsList,
          customsList,
          customsAgentsConceptsList,
          clientAddresses,
          idCatTipeAddressEntrega,
          rutasEntrega,
          selectedProvider,
          nivelIngreso,
        ]) => {
          if (action.productItem.needsToReload) {
            this.store.dispatch(SET_LOADING({payload: true}));
            const hasConfigurationAt = action.productItem.NivelConfiguracionProductoCliente
              ? action.productItem.NivelConfiguracionProductoCliente
              : action.productItem.NivelConfiguracionProductoProveedor;
            return this.configuracionClientesCalculosService
              .ConfiguracionClienteProveedorExtensionConfiguracionClienteProveedor(
                paramsProductListConfiguration(
                  action.productItem,
                  selectedClient.IdCliente,
                  selectedFamily,
                  hasConfigurationAt,
                  action.productItem.NivelConfiguracionProductoProveedor,
                ),
              )
              .pipe(
                map((response: ConfiguracionPrecioClienteObj) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'al obtener la configuracion del producto seleccionado.',
                    ),
                    response,
                  );
                  const configuration: GeneralConfigurationCustom = buildConfigurationFromResponse({
                    responseConf: response,
                    familyTrademarkId: selectedFamily.IdMarcaFamilia,
                    clientId: selectedClient.IdCliente,
                    customsAgentsList,
                    customsList,
                    customsAgentsConceptsList,
                    levelConfiguration: Configs.Product,
                    hasConfigurationAt,
                    clientAddresses,
                    deliveryAddressId: idCatTipeAddressEntrega,
                    deliveryRoutesList: rutasEntrega,
                    isMexican: selectedProvider.Mexicano,
                    incomeLevel: nivelIngreso,
                    productId: action.productItem.IdProducto,
                  });
                  this.store.dispatch(SET_LOADING({payload: false}));
                  return pricesActions.GET_FAMILY_PRODUCT_CONFIGURATION_SUCCESS({
                    configuration,
                  });
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'al obtener la configuracion del producto seleccionado.',
                    ),
                    error,
                  );
                  this.store.dispatch(pricesActions.GET_FAMILY_PRODUCT_CONFIGURATION_FAILED());
                  return of(SET_LOADING({payload: false}));
                }),
              );
          } else {
            return of(pricesActions.RESTORE_PRODUCT_ACTUAL_CONFIGURATION());
          }
        },
      ),
    ),
  );

  // DOCS Efectos para obtener el desglose en los 4 niveles de configuracion

  // DOCS Obtiene los precios de lista para el pop de ver desglose a nivel familia
  getPriceListForPanelss = createEffect(() =>
    this.actions$.pipe(
      ofType(
        pricesActions.GET_PRICE_LIST_FOR_PANEL_LOAD,
        pricesActions.SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(clientPricesSelectors.selectedProviderFamily),
        this.store.select(clientPricesSelectors.selectGeneralLevelAsidePricesQueryInfo),
      ),
      mergeMap(([action, selectedFamily, queryInfo]) => {
        if (selectedFamily.selectedLevelConfigurationTab.id !== 1) {
          return EMPTY;
        }
        return this.configuracionClientesCalculosService
          .vPrecioListaClienteProductoFamiliaQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultVPrecioListaClienteProductoFamilia) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener una pagina del desglose de la familia seleccionada',
                ),
                response,
              );
              this.store.dispatch(
                pricesActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD({
                  needsToReload: false,
                }),
              );
              if (response.Results.length === 0) {
                this.store.dispatch(
                  pricesActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                    value: -1,
                  }),
                );
              }
              this.store.dispatch(
                pricesActions.GET_PRICE_LIST_FOR_PANEL_SUCCESS({
                  prices: response,
                }),
              );
              return pricesActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                isLoading: false,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener una pagina del desglose de la familia seleccionada',
                ),
                error,
              );
              this.store.dispatch(pricesActions.GET_PRICE_LIST_FOR_PANEL_FAILED());
              this.store.dispatch(
                pricesActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                  isLoading: false,
                }),
              );
              this.store.dispatch(
                pricesActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                  value: 0,
                }),
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS Obtiene los precios de lista para el pop de ver desglose a nivel precio de lista

  getPriceListForPanelPriceList = createEffect(() =>
    this.actions$.pipe(
      ofType(
        pricesActions.GET_PRICE_LIST_FOR_PANEL_LOAD,
        pricesActions.SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(clientPricesSelectors.selectedProviderFamily),
        this.store.select(clientPricesSelectors.selectPriceLevelAsidePricesQueryInfo),
      ),
      mergeMap(([action, selectedFamily, queryInfo]) => {
        if (selectedFamily.selectedLevelConfigurationTab.id !== 2) {
          return EMPTY;
        }
        return this.configuracionClientesCalculosService
          .vPrecioListaClienteProductoQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultVPrecioListaClienteProducto) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener una pagina del desglose de la familia seleccionada',
                ),
                response,
              );
              this.store.dispatch(
                pricesActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD({
                  needsToReload: false,
                }),
              );
              if (response.Results.length === 0) {
                this.store.dispatch(
                  pricesActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                    value: -1,
                  }),
                );
              }
              this.store.dispatch(
                pricesActions.GET_PRICE_LIST_FOR_PANEL_SUCCESS({
                  prices: response,
                }),
              );
              return pricesActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                isLoading: false,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener una pagina del desglose de de la familia seleccionada',
                ),
                error,
              );
              this.store.dispatch(pricesActions.GET_PRICE_LIST_FOR_PANEL_FAILED());
              this.store.dispatch(
                pricesActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                  isLoading: false,
                }),
              );
              this.store.dispatch(
                pricesActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                  value: 0,
                }),
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS Obtiene los precios de lista para el pop de ver desglose a nivel agrupador caracteristica

  getPriceListForPanelCharacteristicGrouper = createEffect(() =>
    this.actions$.pipe(
      ofType(
        pricesActions.GET_PRICE_LIST_FOR_PANEL_LOAD,
        pricesActions.SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(clientPricesSelectors.selectedProviderFamily),
        this.store.select(
          clientPricesSelectors.selectCharacteristicGrouperlLevelAsidePricesQueryInfo,
        ),
      ),
      mergeMap(([action, selectedFamily, queryInfo]) => {
        if (selectedFamily.selectedLevelConfigurationTab.id !== 3) {
          return EMPTY;
        }
        return this.configuracionClientesCalculosService
          .vPrecioListaClienteProductoClasificacionQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultVPrecioListaClienteProducto) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener una pagina del desglose de la familia seleccionada',
                ),
                response,
              );
              this.store.dispatch(
                pricesActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD({
                  needsToReload: false,
                }),
              );
              if (response.Results.length === 0) {
                this.store.dispatch(
                  pricesActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                    value: -1,
                  }),
                );
              }
              this.store.dispatch(
                pricesActions.GET_PRICE_LIST_FOR_PANEL_SUCCESS({
                  prices: response,
                }),
              );
              return pricesActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                isLoading: false,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener una pagina del desglose de de la familia seleccionada',
                ),
                error,
              );
              this.store.dispatch(pricesActions.GET_PRICE_LIST_FOR_PANEL_FAILED());
              this.store.dispatch(
                pricesActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                  isLoading: false,
                }),
              );
              this.store.dispatch(
                pricesActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                  value: 0,
                }),
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS Obtiene los precios de lista para el pop de ver desglose a nivel producto

  getPriceListForPanelProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(
        pricesActions.GET_PRICE_LIST_FOR_PANEL_LOAD,
        pricesActions.SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(clientPricesSelectors.selectedProviderFamily),
        this.store.select(clientPricesSelectors.selectProductlLevelAsidePricesQueryInfo),
      ),
      mergeMap(([action, selectedFamily, queryInfo]) => {
        if (selectedFamily.selectedLevelConfigurationTab.id !== 4) {
          return EMPTY;
        }
        return this.configuracionClientesCalculosService
          .vPrecioProductoClienteQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultVPrecioProductoCliente) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener una pagina del desglose de la familia seleccionada',
                ),
                response,
              );
              this.store.dispatch(
                pricesActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD({
                  needsToReload: false,
                }),
              );
              if (response.Results.length === 0) {
                this.store.dispatch(
                  pricesActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                    value: -1,
                  }),
                );
              }
              this.store.dispatch(
                pricesActions.GET_PRICE_LIST_FOR_PANEL_SUCCESS({
                  prices: response,
                }),
              );
              return pricesActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                isLoading: false,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener una pagina del desglose de de la familia seleccionada',
                ),
                error,
              );
              this.store.dispatch(pricesActions.GET_PRICE_LIST_FOR_PANEL_FAILED());
              this.store.dispatch(
                pricesActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                  isLoading: false,
                }),
              );
              this.store.dispatch(
                pricesActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                  value: 0,
                }),
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );
  downloadCsvFile = createEffect(() =>
    this.actions$.pipe(
      ofType(pricesActions.SET_LOAD_CSV_DOWNLOAD_LOAD),
      withLatestFrom(
        this.store.select(clientPricesSelectors.selectedProviderFamily),
        this.store.select(clientsDetailsSelectors.selectedClient),
      ),
      mergeMap(([action, selectedFamily$, clientSelected$]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        const body: ArchivoExportarCSVParameter = this.generateCSVBodyRequest(
          selectedFamily$.IdProveedor,
          selectedFamily$.IdMarcaFamilia,
          clientSelected$.IdCliente,
        );
        return this.sistemaArchivosCSVService.ArchivoExportarCSVsObtenerDetalle(body).pipe(
          map((response: ArchivoDetalle) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener la url para descargar el archivo CSV.',
              ),
              response,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            const a = document.createElement('a');
            const fileName = getOnlyFileName(response.FileKey);
            a.setAttribute('href', response.Url);
            a.setAttribute('download', fileName);
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            return pricesActions.SET_LOAD_CSV_DOWNLOAD_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener la url para descargar el archivo CSV.',
              ),
              error,
            );
            return of(RETURN_EMPTY());
          }),
        );
      }),
    ),
  );
  generateCSVBodyRequest(providerId: string, brandFamily: string, clientId: string) {
    return {
      POCO: 'vPrecioProductoCliente',
      info: {
        SortField: 'DescripcionProducto',
        SortDirection: 'asc',
        Filters: [
          {
            NombreFiltro: 'IdMarcaFamilia',
            ValorFiltro: brandFamily,
          },
          {
            NombreFiltro: 'IdProveedor',
            ValorFiltro: providerId,
          },
          {
            NombreFiltro: 'IdCliente',
            ValorFiltro: clientId,
          },
          {
            NombreFiltro: 'ConfiguracionClienteActiva',
            ValorFiltro: null,
          },
        ],
      },

      Columnas: [
        'DescripcionProducto:Producto',
        'Catalogo: Catalogo',
        'Tipo:Tipo',
        'Subtipo:Subtipo',
        'Control:Control',
        'NumPiezas:Número de Piezas',
        'PrecioLista:Precio Lista',
        'PrecioUnitario:Precio Unitario',
        'PrecioProquifaNet:Precio Proquifa',
        'PrecioTotal:Precio Total',
        'DescripcionAgrupador: Agrupador Caracteristica',
        'TiempoEntrega:Tiempo de Entrega',
        'NivelConfiguracionProductoProveedor:Nivel de Configuración Proveedor',
        'NivelConfiguracionProductoCliente:Nivel de Configuración Cliente',
        'NivelConfiguracionProductoContratoCliente:Nivel de Configuración Contrato',
        'ClasificacionProducto:Clasificación',
        'Sector: Sector',
        'Industria: Industria',
        'Importacion:Importación',
        'CVT:Costo de Venta Total',
        'CVU:Costo de Venta Unitario',
        'CFT:Costo Fijo Total',
        'UtilidadTotal:Utilidad Total',
        'CostoFijoUnitario:Costo Fijo Unitario',
        'UtilidadUnitaria:Utilidad Unitaria',
        'ValorEnAduana:Valor en Aduana',
        'FactorCostoFijo:Factor de Costo Fijo',
        'Utilidad:Utilidad',
        'MontoConceptoAA:Honorarios de Agente Aduanal',
        'CostoTotalIndicador: Costo Total Indicador',
        'UtilidadIndicador: Utilidad Indicador',
        'PorcentajeUtilidadIndicador: Porcentaje Utilidad Indicador',
        'PorcentajeRendimientoIndicador: Porcentaje Rendimiento Indicador',
        'UtilidadPrecioListaIndicador: Utilidad Precio Lista Indicador',
        'PorcentajeUtilidadPrecioListaIndicador: Porcentaje Utilidad Precio Lista Indicador',
      ],
    };
  }
}
