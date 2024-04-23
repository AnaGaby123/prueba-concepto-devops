import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {EMPTY, forkJoin, of} from 'rxjs';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';

// Models
// Services
import {
  CatRutaEntrega,
  ConfiguracionPrecioListaProveedorObj,
  ConfiguracionProductosClasificacionService,
  ConfiguracionProductosMarcasFamiliasService,
  ConfiguracionProductosService,
  ConfiguracionProveedoresCalculosService,
  ConfiguracionProveedoresRelacionesService,
  ConfiguracionProveedoresService,
  ConfProveedor,
  ConfProveedorUtilidadComision,
  MarcaFamiliaProveedor,
  QueryInfo,
  QueryResultVClasificacionProductoProveedor,
  QueryResultVConfiguracionPrecioListaProducto,
  QueryResultVConfiguracionProductoProveedor,
  QueryResultVMarcaFamilia,
  QueryResultVPrecioListaProducto,
  QueryResultVPrecioListaProductoClasificacion,
  QueryResultVPrecioListaProveedorProducto,
  QueryResultVPrecioListaProveedorProductoClasificacion,
  QueryResultVPrecioListaProveedorProductoFamilia,
  QueryResultVPrecioProductoProveedor,
  VMarcaFamilia,
  VMarcaFamiliaIndustriaObj,
} from 'api-catalogos';

import {
  Configs,
  dropDownListConfiguration,
  IConfProvider,
  IOfferAsidePricesList,
  IOfferClassificationsList,
  IOfferDeliveryRoutes,
  IOfferListPricesList,
  IOfferProductsList,
  IProviderCategoryUtilityPriceConfiguration,
  IVProductListPrice,
  IVProductListPriceConfiguration,
  IVProviderProductClassification,
  IVTrademarkFamily,
  Levels,
  performanceClassification,
  performancePrice,
  performanceProduct,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';

//  Actions
import {offerActions} from '@appActions/forms/providers';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import * as utilsActions from '@appActions/utils/utils.action';

// Selectors
import {generalDataProviderSelectors, offerSelectors} from '@appSelectors/forms/providers';

/*Utils && helpers*/
import {deburr, filter, isEmpty, map as _map} from 'lodash-es';
import * as servicesLogger from '@appUtil/logger';
import {PAGING_LIMIT} from '@appUtil/common.protocols';
import {addRowIndex} from '@appUtil/util';
import {
  buildCharacteristicGrouperObject,
  buildClassifLevelAsidePrices,
  buildGeneralLevelAsidePrices,
  buildPerformanceQuery,
  buildPriceLevelListOfPrices,
  buildPriceListLevelAsidePrices,
  buildProductLevelAsidePrices,
  buildProductLevelListOfProducts,
  buildProductLevelObject,
  buildProviderConfFromResponse,
  buildQueryInfoForIncomeLevelsByListPrice,
  buildQueryInfoForIncomeLevelsByPrice,
  buildQueryInfoForIncomeLevelsByProduct,
  initializeTrademarkFamilies,
} from '@appHelpers/catalogs/providers/offer.helpers';
import ConfiguracionProveedorExtensionConfiguracionProveedorParams = ConfiguracionProveedoresCalculosService.ConfiguracionProveedorExtensionConfiguracionProveedorParams;

const FILE_NAME = 'offer.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class OfferEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private configuracionProductosService: ConfiguracionProductosService,
    private configuracionProductosClasificacionService: ConfiguracionProductosClasificacionService,
    private configuracionProveedoresService: ConfiguracionProveedoresService,
    private configuracionProveedoresCalculosService: ConfiguracionProveedoresCalculosService,
    private providersRelationsService: ConfiguracionProveedoresRelacionesService,
    private productsTrademarkFamiliesConfigService: ConfiguracionProductosMarcasFamiliasService,
  ) {}

  // DOCS: Obtener catálogos iniciales para la pantalla
  initialConfigurationOffer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(offerActions.GET_INITIAL_CONFIGURATION),
        mergeMap((action) => {
          this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
          this.store.dispatch(catalogsActions.GET_CAT_UNIDAD_TIEMPO_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_RUTA_ENTREGA_LOAD());
          this.store.dispatch(catalogsActions.GET_LIST_AGENTE_ADUANAL_LOAD());
          this.store.dispatch(catalogsActions.GET_LIST_ADUANA_LOAD());
          this.store.dispatch(catalogsActions.GET_LIST_CONCEPTS_CUSTOM_AGENT_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_NIVEL_INGRESO_LOAD());
          this.store.dispatch(offerActions.GET_FAMILIES_PROVIDER_LOAD());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: Obtener niveles de ingreso
  getCatNivelIngresoSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(catalogsActions.GET_CAT_NIVEL_INGRESO_SUCCESS),
        mergeMap((action) => {
          this.store.dispatch(
            offerActions.GET_PROVIDER_NIVEL_INGRESO_SUCCESS({
              incomeLevelList: action.listCatNivelIngreso,
            }),
          );
          return EMPTY;
        }),
      ),
    {dispatch: false},
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
            offerActions.GET_PROVIDER_RUTA_ENTREGA_SUCCESS({
              deliveryRoutesList: filtered,
            }),
          );
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: Obtener Tarifas del agente aduanal
  getCustomsAgentConceptList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_LIST_CONCEPTS_CUSTOM_AGENT_SUCCESS),
      mergeMap(({listConceptoAgenteAduanal}) => {
        return of(
          offerActions.GET_PROVIDER_CUSTOMS_AGENT_CONCEPT_SUCCESS({
            customsAgentsConceptList: listConceptoAgenteAduanal,
          }),
        );
      }),
    ),
  );

  // DOCS: Obtener Familias de las marcas asociadas al proveedor (MarcaFamilia para el carousel)
  getTrademarkFamilies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.GET_FAMILIES_PROVIDER_LOAD),
      withLatestFrom(this.store.select(offerSelectors.selectTrademarkFamiliesQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        return this.productsTrademarkFamiliesConfigService.vMarcaFamiliaQueryResult(queryInfo).pipe(
          map((response: QueryResultVMarcaFamilia) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener las familias de las marcas asociadas al proveedor',
              ),
              response,
            );
            const mappedFamilies: Array<IVTrademarkFamily> = initializeTrademarkFamilies(
              response.Results,
            );
            this.store.dispatch(
              offerActions.GET_FAMILIES_PROVIDER_SUCCESS({
                familiesList: mappedFamilies,
              }),
            );
            if (!isEmpty(mappedFamilies)) {
              return offerActions.SET_SELECTED_FAMILY({
                familyId: mappedFamilies[0].IdMarcaFamilia,
              });
            }
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return offerActions.GET_FAMILIES_PROVIDER_FAILED();
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
            this.store.dispatch(offerActions.GET_FAMILIES_PROVIDER_FAILED());
            return of(utilsActions.SET_LOADING({payload: false}));
          }),
        );
      }),
    ),
  );

  // DOCS: Obtener lista de familias de la marca de la familia seleccionada seleccionada para el drop
  getTrademarkFamiliesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.SET_SELECTED_FAMILY),
      withLatestFrom(this.store.select(offerSelectors.selectedFamily)),
      mergeMap(([{familyId}, selectedFamily]) => {
        if (selectedFamily.needsToReload) {
          this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
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
                  'al obtener la lista de familias de la marca a la que pertenece la familia seleccionada.',
                ),
                response,
              );
              return [
                selectedFamily.IdMarcaFamiliaProveedor,
                _map(
                  response.Results,
                  (o: VMarcaFamilia): IVTrademarkFamily => ({
                    ...o,
                    isSelected: false,
                  }),
                ),
              ];
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener la lista de familias de la marca a la que pertenece la familia seleccionada.',
                ),
                error,
              );
              return of(offerActions.GET_TRADEMARK_FAMILIES_LIST_FAILED());
            }),
          );
        } else {
          switch (selectedFamily.selectedLevelConfigurationTab.level) {
            case Levels.Family:
              this.store.dispatch(offerActions.RESTORE_GENERAL_ACTUAL_CONFIGURATION());
              break;
            case Levels.listPrice:
              this.store.dispatch(offerActions.RESTORE_PRICE_ACTUAL_CONFIGURATION());
              break;
            case Levels.CharacteristicGrouper:
              this.store.dispatch(offerActions.RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION());
              break;
            case Levels.Product:
              this.store.dispatch(offerActions.RESTORE_PRODUCT_ACTUAL_CONFIGURATION());
              break;
            default:
              this.store.dispatch(offerActions.RESTORE_GENERAL_ACTUAL_CONFIGURATION());
              break;
          }
          this.logger.debug(
            servicesLogger.generateMessage(
              FILE_NAME,
              servicesLogger.LOG_SUCCEEDED,
              'al restaurar la configuración de la familia seleccionada',
            ),
          );
          this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          return EMPTY;
        }
      }),
      switchMap(
        ([trademarkFamilyProviderId, trademarkFamiliesList]: [
          string,
          Array<IVTrademarkFamily>,
        ]) => {
          return this.providersRelationsService
            .MarcaFamiliaProveedorObtener(trademarkFamilyProviderId)
            .pipe(
              map((response: MarcaFamiliaProveedor) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener el objeto MarcaFamiliaProveedor para la familia seleccionada',
                  ),
                  response,
                );
                return offerActions.GET_TRADEMARK_FAMILIES_LIST_SUCCESS({
                  trademarkFamiliesList,
                  trademarkFamilyProvider: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener la lista de familias de la marca a la que pertenece la familia seleccionada.',
                  ),
                  error,
                );
                this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
                return of(offerActions.GET_TRADEMARK_FAMILIES_LIST_FAILED());
              }),
            );
        },
      ),
    ),
  );

  /*DOCS: Nivel Familia
     Obtener configuracion general de una familia*/
  getGeneralConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        offerActions.GET_GENERAL_CONFIGURATION_LOAD,
        offerActions.GET_TRADEMARK_FAMILIES_LIST_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(offerSelectors.selectedFamily),
        this.store.select(offerSelectors.selectFamilyLevelConfigQueryInfo),
      ),
      mergeMap(([action, selectedFamily, params]) => {
        if (selectedFamily.needsToReload) {
          this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
          return this.configuracionProveedoresCalculosService
            .ConfiguracionProveedorExtensionConfiguracionProveedor(params)
            .pipe(
              map((response: ConfiguracionPrecioListaProveedorObj) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener la configuracion general de la familia seleccionada.',
                  ),
                  response,
                );
                return response.ConfProveedor;
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
                this.store.dispatch(offerActions.GET_GENERAL_CONFIGURATION_FAILED());
                return of(utilsActions.SET_LOADING({payload: false}));
              }),
            );
        } else {
          switch (selectedFamily.selectedLevelConfigurationTab.level) {
            case Levels.Family:
              this.store.dispatch(offerActions.RESTORE_GENERAL_ACTUAL_CONFIGURATION());
              break;
            case Levels.listPrice:
              this.store.dispatch(offerActions.RESTORE_PRICE_ACTUAL_CONFIGURATION());
              break;
            case Levels.CharacteristicGrouper:
              this.store.dispatch(offerActions.RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION());
              break;
            case Levels.Product:
              this.store.dispatch(offerActions.RESTORE_PRODUCT_ACTUAL_CONFIGURATION());
              break;
            default:
              this.store.dispatch(offerActions.RESTORE_GENERAL_ACTUAL_CONFIGURATION());
              break;
          }
          this.logger.debug(
            servicesLogger.generateMessage(
              FILE_NAME,
              servicesLogger.LOG_SUCCEEDED,
              'al restaurar la configuración de la familia seleccionada',
            ),
          );
          this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          return EMPTY;
        }
      }),
      withLatestFrom(
        this.store.select(offerSelectors.selectedFamily),
        this.store.select(generalDataProviderSelectors.selectedProviderIsMexican),
        this.store.select(offerSelectors.selectDropDownListForGetConfiguration),
        this.store.select(offerSelectors.selectCatIncomeLevelsList),
        this.store.select(offerSelectors.selectCatDeliveryRoutesList),
      ),
      switchMap(
        ([
          confProvider,
          selectedFamily,
          providerIsMexican,
          {customsAgentsList, customsAgentsConceptsList, customsList},
          incomeLevelsList,
          deliveryRoutesList,
        ]: [
          ConfProveedor,
          IVTrademarkFamily,
          boolean,
          dropDownListConfiguration,
          Array<IProviderCategoryUtilityPriceConfiguration>,
          Array<IOfferDeliveryRoutes>,
        ]) => {
          return this.configuracionProveedoresCalculosService
            .ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidad(
              buildPerformanceQuery(selectedFamily, confProvider),
            )
            .pipe(
              map((response: ConfProveedorUtilidadComision) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener la configuracion de utilidad del proveedor.',
                  ),
                  response,
                );
                const configuration: IConfProvider = buildProviderConfFromResponse({
                  providerConf: confProvider,
                  performanceProvider: response,
                  trademarkFamilyId: selectedFamily.IdMarcaFamilia,
                  trademarkFamiliesList: selectedFamily.actualConfiguration.trademarkFamiliesList,
                  trademarkFamilyProvider: selectedFamily.MarcaFamiliaProveedor,
                  providerIsMexican,
                  customsAgentsList,
                  customsList,
                  customsAgentsConceptsList,
                  incomeLevelsList,
                  deliveryRoutesList,
                  levelConfiguration: Configs.General,
                  hasConfigurationAt: Levels.Family,
                });
                this.store.dispatch(
                  offerActions.GET_GENERAL_CONFIGURATION_SUCCESS({
                    newGeneralConfiguration: configuration,
                  }),
                );
                this.store.dispatch(
                  offerActions.SET_SELECTED_FAMILY_NEEDS_TO_RELOAD({
                    needsToReload: false,
                  }),
                );
                return utilsActions.SET_LOADING({payload: false});
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener la configuracion de utilidad del proveedor.',
                  ),
                  error,
                );
                this.store.dispatch(offerActions.GET_PERFORMANCE_LIST_FAILED());
                return of(utilsActions.SET_LOADING({payload: false}));
              }),
            );
        },
      ),
    ),
  );
  /*DOCS: Nivel Precio de lista
     Obtener lista de precios de lista de la familia*/
  getPriceList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        offerActions.GET_PRICE_LIST_LOAD,
        offerActions.SET_PRICE_LIST_SEARCH_TERM,
        offerActions.GET_PRICE_LIST_FILTERED_BY_THIS_LEVEL_CONFIG,
      ),
      withLatestFrom(
        this.store.select(offerSelectors.selectedFamily),
        this.store.select(offerSelectors.selectPriceLevelListOfPricesQueryInfo),
        this.store.select(offerSelectors.selectPriceResults),
      ),
      mergeMap(([action, selectedFamily, queryInfo, priceListResults]) => {
        if (selectedFamily.prices.needsToReload) {
          this.store.dispatch(
            offerActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
              tabConfigurationName: 'prices',
              isLoading: true,
            }),
          );
          return this.configuracionProveedoresCalculosService
            .vConfiguracionPrecioListaProductoQueryResult(queryInfo)
            .pipe(
              map((response: QueryResultVConfiguracionPrecioListaProducto) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener una página de la lista de precios de la familia seleccionada',
                  ),
                  response,
                );
                const priceList: IOfferListPricesList = buildPriceLevelListOfPrices(
                  selectedFamily.prices.desiredPage,
                  response,
                );
                this.store.dispatch(
                  offerActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'prices',
                    isLoading: false,
                  }),
                );
                this.store.dispatch(
                  offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                    tabConfigurationName: 'prices',
                    needsToReload: false,
                  }),
                );
                this.store.dispatch(
                  offerActions.GET_PRICE_LIST_SUCCESS({
                    prices: priceList,
                  }),
                );
                if (selectedFamily.prices.desiredPage === 1 && priceList.Results.length > 0) {
                  return offerActions.GET_PRICE_CONFIGURATION_LOAD({
                    priceItem: priceList.Results[0],
                  });
                }
                if (priceList.Results.length === 0) {
                  return offerActions.CLEAN_ACTUAL_CONFIGURATION();
                } else {
                  return offerActions.RETURN_PROCESS_SUCCESS();
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
                this.store.dispatch(offerActions.GET_PRICE_LIST_FAILED());
                this.store.dispatch(
                  offerActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'prices',
                    isLoading: false,
                  }),
                );
                return of(utilsActions.SET_LOADING({payload: false}));
              }),
            );
        } else {
          const selectedPriceList = filter(
            priceListResults,
            (o: IVProductListPriceConfiguration) => o.isSelected,
          );
          if (!isEmpty(selectedPriceList)) {
            this.store.dispatch(
              offerActions.GET_PRICE_CONFIGURATION_LOAD({
                priceItem: selectedPriceList[0],
              }),
            );
          }
          return EMPTY;
        }
      }),
    ),
  );

  /*DOCS: Obtener la configuración de un precio de lista de una familia*/
  getPriceConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.GET_PRICE_CONFIGURATION_LOAD),
      withLatestFrom(this.store.select(offerSelectors.selectListPriceLevelConfigQueryInfo)),
      mergeMap(([{priceItem}, params]) => {
        if (priceItem.needsToReload) {
          this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
          return this.configuracionProveedoresCalculosService
            .ConfiguracionProveedorExtensionConfiguracionProveedor(params)
            .pipe(
              map((response: ConfiguracionPrecioListaProveedorObj) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener la configuracion de un precio de lista.',
                  ),
                  response,
                );
                return {priceItem, confProvider: response.ConfProveedor};
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener la configuracion de un precio de lista.',
                  ),
                  error,
                );
                this.store.dispatch(offerActions.GET_PRICE_CONFIGURATION_FAILED());
                return of(utilsActions.SET_LOADING({payload: false}));
              }),
            );
        } else {
          this.store.dispatch(offerActions.RESTORE_PRICE_ACTUAL_CONFIGURATION());
          return EMPTY;
        }
      }),
      withLatestFrom(
        this.store.select(offerSelectors.selectedFamily),
        this.store.select(generalDataProviderSelectors.selectedProviderIsMexican),
        this.store.select(offerSelectors.selectDropDownListForGetConfiguration),
        this.store.select(offerSelectors.selectCatIncomeLevelsList),
        this.store.select(offerSelectors.selectCatDeliveryRoutesList),
        this.store.select(offerSelectors.selectListPriceLevelConfigQueryInfo),
      ),
      switchMap(
        ([
          {priceItem, confProvider},
          selectedFamily,
          providerIsMexican,
          {customsAgentsList, customsAgentsConceptsList, customsList},
          incomeLevelsList,
          deliveryRoutesList,
          params,
        ]: [
          performancePrice,
          IVTrademarkFamily,
          boolean,
          dropDownListConfiguration,
          Array<IProviderCategoryUtilityPriceConfiguration>,
          Array<IOfferDeliveryRoutes>,
          ConfiguracionProveedorExtensionConfiguracionProveedorParams,
        ]) => {
          return this.configuracionProveedoresCalculosService
            .ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidad(
              buildPerformanceQuery(selectedFamily, confProvider),
            )
            .pipe(
              map((response: ConfProveedorUtilidadComision) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener la configuracion de utilidad del proveedor.',
                  ),
                  response,
                );
                const configuration: IConfProvider = buildProviderConfFromResponse({
                  providerConf: confProvider,
                  trademarkFamilyProvider: selectedFamily.MarcaFamiliaProveedor,
                  providerIsMexican,
                  customsAgentsList,
                  customsList,
                  customsAgentsConceptsList,
                  incomeLevelsList,
                  deliveryRoutesList,
                  levelConfiguration: Configs.Price,
                  hasConfigurationAt: params.NivelConfiguracion,
                  price: params.PrecioLista,
                  performanceProvider: response,
                });
                this.store.dispatch(
                  offerActions.GET_PRICE_CONFIGURATION_SUCCESS({
                    configuration,
                  }),
                );
                this.store.dispatch(
                  offerActions.SET_PRICE_CONFIGURATION_NEEDS_TO_RELOAD({
                    priceItem,
                    needsToReload: false,
                  }),
                );
                return utilsActions.SET_LOADING({payload: false});
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener la configuracion de utilidad del proveedor.',
                  ),
                  error,
                );
                this.store.dispatch(offerActions.GET_PERFORMANCE_LIST_FAILED());
                return of(utilsActions.SET_LOADING({payload: false}));
              }),
            );
        },
      ),
    ),
  );

  /*DOCS: Obtener los datos mas recientes del precio de lista después de guardar su configuración*/
  getNewDataOfListPrice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.REFRESH_SELECTED_LIST_PRICE_DATA),
      withLatestFrom(this.store.select(offerSelectors.selectedPriceLevelQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        return this.configuracionProveedoresCalculosService
          .vConfiguracionPrecioListaProductoQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultVConfiguracionPrecioListaProducto) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener una página de la lista de precios de la familia seleccionada',
                ),
                response,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return offerActions.REFRESH_SELECTED_LIST_PRICE_DATA_SUCCESS({
                prices: response.Results,
              });
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
              this.store.dispatch(offerActions.REFRESH_SELECTED_LIST_PRICE_DATA_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );

  /*DOCS: Nivel Agrupador por característica
     Obtener lista de clasificaciones en nivel Clasificación*/
  getClassificationsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        offerActions.GET_CHARACTERISTIC_GROUPER_LIST_LOAD,
        offerActions.SET_CHARACTERISTIC_GROUPER_LIST_SEARCH_TERM,
        offerActions.GET_CHARACTERISTIC_GROUPER_LIST_FILTERED_BY_THIS_LEVEL_CONFIG,
      ),
      withLatestFrom(
        this.store.select(offerSelectors.selectFeatureGroupListQueryInfo),
        this.store.select(offerSelectors.selectClassificationsNeedsToReload),
        this.store.select(offerSelectors.selectClassificationsResults),
      ),
      mergeMap(([action, params, needsToReload, classificationsList]) => {
        if (needsToReload) {
          this.store.dispatch(
            offerActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
              tabConfigurationName: 'classifications',
              isLoading: true,
            }),
          );
          return this.configuracionProductosClasificacionService
            .vClasificacionProductoProveedorQueryResult(params)
            .pipe(
              map((response: QueryResultVClasificacionProductoProveedor) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener una página de la lista de clasificaciones de la familia seleccionada',
                  ),
                  response,
                );
                this.store.dispatch(
                  offerActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'classifications',
                    isLoading: false,
                  }),
                );
                this.store.dispatch(
                  offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                    tabConfigurationName: 'classifications',
                    needsToReload: false,
                  }),
                );
                const indexedResults: IVProviderProductClassification[] = addRowIndex(
                  params.desiredPage,
                  PAGING_LIMIT,
                  response.Results,
                );
                const classifications: IOfferClassificationsList = {
                  TotalResults: response.TotalResults,
                  Results: _map(indexedResults, (o: IVProviderProductClassification) => ({
                    ...o,
                    isSelected: false,
                    needsToReload: true,
                  })),
                };
                this.store.dispatch(
                  offerActions.GET_CHARACTERISTIC_GROUPER_LIST_SUCCESS({
                    classifications,
                  }),
                );
                if (params.desiredPage === 1 && classifications.Results.length > 0) {
                  return offerActions.GET_CHARACTERISTIC_GROUPER_CONFIGURATION_LOAD({
                    classificationItem: classifications.Results[0],
                  });
                }
                if (classifications.Results.length === 0) {
                  return offerActions.CLEAN_ACTUAL_CONFIGURATION();
                } else {
                  return offerActions.RETURN_PROCESS_SUCCESS();
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
                this.store.dispatch(offerActions.GET_CHARACTERISTIC_GROUPER_LIST_FAILED());
                this.store.dispatch(
                  offerActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'classifications',
                    isLoading: false,
                  }),
                );
                return of(utilsActions.SET_LOADING({payload: false}));
              }),
            );
        } else {
          const selectedClassification = filter(classificationsList, (o) => o.isSelected);
          if (!isEmpty(selectedClassification)) {
            this.store.dispatch(
              offerActions.GET_CHARACTERISTIC_GROUPER_CONFIGURATION_LOAD({
                classificationItem: selectedClassification[0],
              }),
            );
          }
          return EMPTY;
        }
      }),
    ),
  );
  // DOCS: Effect que obtiene la configuración de una clasificación
  getClassificationConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.GET_CHARACTERISTIC_GROUPER_CONFIGURATION_LOAD),
      withLatestFrom(this.store.select(offerSelectors.selectFeatureGroupLevelConfigQueryInfo)),
      mergeMap(([{classificationItem}, params]) => {
        if (classificationItem.needsToReload) {
          this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
          return this.configuracionProveedoresCalculosService
            .ConfiguracionProveedorExtensionConfiguracionProveedor(params)
            .pipe(
              map((response: ConfiguracionPrecioListaProveedorObj) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener la configuracion de una clasificacion',
                  ),
                  response,
                );
                return {classificationItem, confProvider: response.ConfProveedor};
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener la configuracion de una clasificacion',
                  ),
                  error,
                );
                this.store.dispatch(offerActions.GET_CHARACTERISTIC_GROUPER_CONFIGURATION_FAILED());
                return of(utilsActions.SET_LOADING({payload: false}));
              }),
            );
        } else {
          this.store.dispatch(offerActions.RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION());
          return EMPTY;
        }
      }),
      withLatestFrom(
        this.store.select(offerSelectors.selectedFamily),
        this.store.select(generalDataProviderSelectors.selectedProviderIsMexican),
        this.store.select(offerSelectors.selectDropDownListForGetConfiguration),
        this.store.select(offerSelectors.selectCatIncomeLevelsList),
        this.store.select(offerSelectors.selectCatDeliveryRoutesList),
        this.store.select(offerSelectors.selectFeatureGroupLevelConfigQueryInfo),
      ),
      switchMap(
        ([
          {classificationItem, confProvider},
          selectedFamily,
          providerIsMexican,
          {customsAgentsList, customsAgentsConceptsList, customsList},
          incomeLevelsList,
          deliveryRoutesList,
          params,
        ]: [
          performanceClassification,
          IVTrademarkFamily,
          boolean,
          dropDownListConfiguration,
          Array<IProviderCategoryUtilityPriceConfiguration>,
          Array<IOfferDeliveryRoutes>,
          ConfiguracionProveedorExtensionConfiguracionProveedorParams,
        ]) => {
          return this.configuracionProveedoresCalculosService
            .ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidad(
              buildPerformanceQuery(selectedFamily, confProvider),
            )
            .pipe(
              map((response: ConfProveedorUtilidadComision) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener la configuracion de utilidad del proveedor.',
                  ),
                  response,
                );
                const configuration: IConfProvider = buildProviderConfFromResponse({
                  providerConf: confProvider,
                  trademarkFamilyProvider: selectedFamily.MarcaFamiliaProveedor,
                  providerIsMexican,
                  customsAgentsList,
                  customsList,
                  customsAgentsConceptsList,
                  incomeLevelsList,
                  deliveryRoutesList,
                  levelConfiguration: Configs.Classification,
                  hasConfigurationAt: params.NivelConfiguracion,
                  classificationId: params.IdAgrupadorCaracteristica,
                  performanceProvider: response,
                });
                this.store.dispatch(
                  offerActions.GET_CHARACTERISTIC_GROUPER_CONFIGURATION_SUCCESS({
                    configuration,
                  }),
                );
                this.store.dispatch(
                  offerActions.SET_CHARACTERISTIC_GROUPER_CONFIGURATION_NEEDS_TO_RELOAD({
                    classificationItem,
                    needsToReload: false,
                  }),
                );
                return utilsActions.SET_LOADING({payload: false});
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener la configuracion de utilidad del proveedor.',
                  ),
                  error,
                );
                this.store.dispatch(offerActions.GET_PERFORMANCE_LIST_FAILED());
                return of(utilsActions.SET_LOADING({payload: false}));
              }),
            );
        },
      ),
    ),
  );

  /*DOCS: Obtener los datos mas recientes de un agrupador por caracteristica después de guardar su configuración*/
  getNewDataOfChracteristicGrouper = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.REFRESH_SELECTED_CHARACTERISTIC_GROUPER_DATA),
      withLatestFrom(this.store.select(offerSelectors.selectedCharacteristicGrouperLevelQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        return this.configuracionProductosClasificacionService
          .vClasificacionProductoProveedorQueryResult(queryInfo)
          .pipe(
            map((response: QueryResultVClasificacionProductoProveedor) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener una página de los agrupadores por caracteristicas de la familia seleccionada',
                ),
                response,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return offerActions.REFRESH_SELECTED_CHARACTERISTIC_GROUPER_DATA_SUCCESS({
                characteristicGrouper: buildCharacteristicGrouperObject(response.Results[0]),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener una página de los agrupadores por caracteristicas de la familia seleccionada',
                ),
                error,
              );
              this.store.dispatch(
                offerActions.REFRESH_SELECTED_CHARACTERISTIC_GROUPER_DATA_FAILED(),
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS: Nivel Producto

  // DOCS: Obtener lista de productos
  getProductsList = createEffect(() =>
    this.actions$.pipe(
      ofType(
        offerActions.GET_PRODUCT_LIST_LOAD,
        offerActions.SET_PRODUCT_LIST_SEARCH_TERM,
        offerActions.GET_PRODUCT_LIST_FILTERED_BY_THIS_LEVEL_CONFIG,
      ),
      withLatestFrom(
        this.store.select(offerSelectors.selectedFamily),
        this.store.select(offerSelectors.selectProductListQueryInfo),
        this.store.select(offerSelectors.selectProductsResults),
      ),
      mergeMap(([action, selectedFamily$, params, productsListResults]) => {
        if (selectedFamily$.products.needsToReload) {
          this.store.dispatch(
            offerActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
              tabConfigurationName: 'products',
              isLoading: true,
            }),
          );
          return this.configuracionProveedoresCalculosService
            .vConfiguracionProductoProveedorQueryResult(params)
            .pipe(
              map((response: QueryResultVConfiguracionProductoProveedor) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener una página de la lista de porductos de la familia seleccionada',
                  ),
                  response,
                );
                const productsList: IOfferProductsList = buildProductLevelListOfProducts(
                  selectedFamily$.products.desiredPage,
                  response,
                );
                this.store.dispatch(
                  offerActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'products',
                    isLoading: false,
                  }),
                );
                this.store.dispatch(
                  offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                    tabConfigurationName: 'products',
                    needsToReload: false,
                  }),
                );
                this.store.dispatch(
                  offerActions.GET_PRODUCT_LIST_SUCCESS({
                    products: productsList,
                  }),
                );
                if (selectedFamily$.products.desiredPage === 1 && productsList.Results.length > 0) {
                  /*return offerActions.RETURN_PROCESS_SUCCESS();*/
                  return offerActions.GET_PRODUCT_CONFIGURATION_LOAD({
                    productItem: productsList.Results[0],
                  });
                }
                if (productsList.Results.length === 0) {
                  return offerActions.CLEAN_ACTUAL_CONFIGURATION();
                } else {
                  return offerActions.RETURN_PROCESS_SUCCESS();
                }
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener una página de la lista de porductos de la familia seleccionada',
                  ),
                  error,
                );
                this.store.dispatch(offerActions.GET_PRODUCT_LIST_FAILED());
                this.store.dispatch(
                  offerActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING({
                    tabConfigurationName: 'products',
                    isLoading: false,
                  }),
                );
                return of(utilsActions.SET_LOADING({payload: false}));
              }),
            );
        } else {
          const selectedProduct = filter(productsListResults, (o) => o.isSelected);
          if (!isEmpty(selectedProduct)) {
            this.store.dispatch(
              offerActions.GET_PRODUCT_CONFIGURATION_LOAD({
                productItem: selectedProduct[0],
              }),
            );
          }
          return EMPTY;
        }
      }),
    ),
  );
  // DOCS: Effect que obtiene la configuración de un producto
  getProductConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.GET_PRODUCT_CONFIGURATION_LOAD),
      withLatestFrom(this.store.select(offerSelectors.selectProductLevelConfigQueryInfo)),
      mergeMap(([{productItem}, params]) => {
        if (productItem.needsToReload) {
          this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
          return this.configuracionProveedoresCalculosService
            .ConfiguracionProveedorExtensionConfiguracionProveedor(params)
            .pipe(
              map((response: ConfiguracionPrecioListaProveedorObj) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener la configuracion de un producto.',
                  ),
                  response,
                );
                return {productItem, confProvider: response.ConfProveedor};
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener la configuracion de un producto.',
                  ),
                  error,
                );
                this.store.dispatch(offerActions.GET_PRODUCT_CONFIGURATION_FAILED());
                return of(utilsActions.SET_LOADING({payload: false}));
              }),
            );
        } else {
          this.store.dispatch(offerActions.RESTORE_PRODUCT_ACTUAL_CONFIGURATION());
          return EMPTY;
        }
      }),
      withLatestFrom(
        this.store.select(offerSelectors.selectedFamily),
        this.store.select(generalDataProviderSelectors.selectedProviderIsMexican),
        this.store.select(offerSelectors.selectDropDownListForGetConfiguration),
        this.store.select(offerSelectors.selectCatIncomeLevelsList),
        this.store.select(offerSelectors.selectCatDeliveryRoutesList),
        this.store.select(offerSelectors.selectProductLevelConfigQueryInfo),
      ),
      switchMap(
        ([
          {productItem, confProvider},
          selectedFamily,
          providerIsMexican,
          {customsAgentsList, customsAgentsConceptsList, customsList},
          incomeLevelsList,
          deliveryRoutesList,
          params,
        ]: [
          performanceProduct,
          IVTrademarkFamily,
          boolean,
          dropDownListConfiguration,
          Array<IProviderCategoryUtilityPriceConfiguration>,
          Array<IOfferDeliveryRoutes>,
          ConfiguracionProveedorExtensionConfiguracionProveedorParams,
        ]) => {
          return this.configuracionProveedoresCalculosService
            .ConfiguracionProveedorExtensionConfiguracionProveedorComisionUtilidad(
              buildPerformanceQuery(selectedFamily, confProvider),
            )
            .pipe(
              map((response: ConfProveedorUtilidadComision) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener la configuracion de utilidad del proveedor.',
                  ),
                  response,
                );
                const configuration: IConfProvider = buildProviderConfFromResponse({
                  providerConf: confProvider,
                  trademarkFamilyProvider: selectedFamily.MarcaFamiliaProveedor,
                  providerIsMexican,
                  customsAgentsList,
                  customsList,
                  customsAgentsConceptsList,
                  incomeLevelsList,
                  deliveryRoutesList,
                  levelConfiguration: Configs.Product,
                  hasConfigurationAt: params.NivelConfiguracion,
                  productId: productItem.IdProducto,
                  performanceProvider: response,
                });
                this.store.dispatch(
                  offerActions.GET_PRODUCT_CONFIGURATION_SUCCESS({
                    configuration,
                  }),
                );
                this.store.dispatch(
                  offerActions.SET_PRODUCT_CONFIGURATION_NEEDS_TO_RELOAD({
                    productItem,
                    needsToReload: false,
                  }),
                );
                return utilsActions.SET_LOADING({payload: false});
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener la configuracion de utilidad del proveedor.',
                  ),
                  error,
                );
                this.store.dispatch(offerActions.GET_PERFORMANCE_LIST_FAILED());
                return of(utilsActions.SET_LOADING({payload: false}));
              }),
            );
        },
      ),
    ),
  );

  /*DOCS: Obtener los datos mas recientes del producto después de guardar su configuración*/
  getNewDataOfProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.REFRESH_SELECTED_PRODUCT_DATA),
      withLatestFrom(this.store.select(offerSelectors.selectedProductLevelQueryInfo)),
      mergeMap(([action, params]) => {
        return this.configuracionProveedoresCalculosService
          .vConfiguracionProductoProveedorQueryResult(params)
          .pipe(
            map((response: QueryResultVConfiguracionProductoProveedor) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener una página de la lista de porductos de la familia seleccionada',
                ),
                response,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return offerActions.REFRESH_SELECTED_PRODUCT_SUCCESS({
                product: buildProductLevelObject(response.Results[0]),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener una página de la lista de porductos de la familia seleccionada',
                ),
                error,
              );
              this.store.dispatch(offerActions.REFRESH_SELECTED_PRODUCT_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );

  /*DOCS: Obtener lista de precios con config nivel Familia para el panel derecho*/

  getPriceListForPanelss = createEffect(() =>
    this.actions$.pipe(
      ofType(
        offerActions.GET_PRICE_LIST_FOR_PANEL_LOAD,
        offerActions.SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(offerSelectors.selectedFamily),
        this.store.select(offerSelectors.selectGeneralLevelAsidePricesQueryInfo),
        this.store.select(offerSelectors.selectedCatIndustryBrandFamily),
      ),
      mergeMap(([action, selectedFamily, queryInfo, catIndustryBrandFamily]) => {
        if (selectedFamily.selectedLevelConfigurationTab.id !== 1) {
          return EMPTY;
        }
        return this.configuracionProductosService.vPrecioListaProductoQueryResult(queryInfo).pipe(
          map((response: QueryResultVPrecioListaProducto) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener una página de la lista de precios aside de la familia seleccionada',
              ),
              response,
            );
            return [selectedFamily, response, catIndustryBrandFamily];
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
            this.store.dispatch(offerActions.GET_PRICE_LIST_FOR_PANEL_FAILED());
            this.store.dispatch(
              offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                isLoading: false,
              }),
            );
            this.store.dispatch(
              offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                value: -1,
              }),
            );
            return EMPTY;
          }),
        );
      }),
      // DOCS: Obtener config de todos los niveles de ingreso para el precio obtenido
      switchMap(
        ([selectedFamily, prices, catIndustryBrandFamily]: [
          IVTrademarkFamily,
          QueryResultVPrecioListaProducto,
          VMarcaFamiliaIndustriaObj,
        ]) => {
          if (!isEmpty(prices.Results)) {
            const request: any[] = _map(prices.Results, (o: IVProductListPrice) =>
              this.configuracionProveedoresCalculosService.vPrecioListaProveedorProductoFamiliaQueryResult(
                buildQueryInfoForIncomeLevelsByPrice(o, catIndustryBrandFamily),
              ),
            );
            return forkJoin(request).pipe(
              map((response: QueryResultVPrecioListaProveedorProductoFamilia[]) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener los niveles de ingreso de los precios listados',
                  ),
                  response,
                );
                const priceList: IOfferAsidePricesList = buildGeneralLevelAsidePrices(
                  prices,
                  response,
                );
                this.store.dispatch(
                  offerActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD({
                    needsToReload: false,
                  }),
                );
                if (response.length === 0) {
                  this.store.dispatch(
                    offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                      value: -1,
                    }),
                  );
                }
                this.store.dispatch(
                  offerActions.GET_PRICE_LIST_FOR_PANEL_SUCCESS({
                    prices: priceList,
                  }),
                );
                return offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                  isLoading: false,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener los niveles de ingreso de los precios listados',
                  ),
                  error,
                );
                this.store.dispatch(offerActions.GET_PRICE_LIST_FOR_PANEL_FAILED());
                this.store.dispatch(
                  offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                    isLoading: false,
                  }),
                );
                this.store.dispatch(
                  offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                    value: -1,
                  }),
                );
                return EMPTY;
              }),
            );
          } else {
            this.store.dispatch(
              offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                isLoading: false,
              }),
            );
            this.store.dispatch(
              offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                value: -1,
              }),
            );
            return of(
              offerActions.GET_PRICE_LIST_FOR_PANEL_SUCCESS({
                prices,
              }),
            );
          }
        },
      ),
    ),
  );
  /*DOCS: Obtener lista de precios con config nivel precio lista para el panel derecho*/

  getPriceListForPanelPriceList = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.GET_PRICE_LIST_FOR_PANEL_LOAD),
      withLatestFrom(
        this.store.select(offerSelectors.selectedFamily),
        this.store.select(offerSelectors.selectedFamilyPrice),
        this.store.select(offerSelectors.selectedCatIndustryBrandFamily),
      ),
      mergeMap(([action, selectedFamily, selectedPriceList, catIndustryBrandFamily]) => {
        if (selectedFamily.selectedLevelConfigurationTab.id !== 2 || isEmpty(selectedPriceList)) {
          return EMPTY;
        }
        return this.configuracionProveedoresCalculosService
          .vPrecioListaProveedorProductoQueryResult(
            buildQueryInfoForIncomeLevelsByListPrice(selectedPriceList, catIndustryBrandFamily),
          )
          .pipe(
            map((response: QueryResultVPrecioListaProveedorProducto) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener los niveles de ingreso del precio seleccionado',
                ),
                response,
              );
              const priceList: IOfferAsidePricesList = buildPriceListLevelAsidePrices(
                selectedPriceList,
                response,
              );
              this.store.dispatch(
                offerActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD({
                  needsToReload: false,
                }),
              );
              if (response.Results.length === 0) {
                this.store.dispatch(
                  offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                    value: -1,
                  }),
                );
              }
              this.store.dispatch(
                offerActions.GET_PRICE_LIST_FOR_PANEL_SUCCESS({
                  prices: priceList,
                }),
              );
              return offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                isLoading: false,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener los niveles de ingreso del precio seleccionado en la tab de precios de lista',
                ),
                error,
              );
              this.store.dispatch(offerActions.GET_PRICE_LIST_FOR_PANEL_FAILED());
              this.store.dispatch(
                offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                  isLoading: false,
                }),
              );
              this.store.dispatch(
                offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                  value: -1,
                }),
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );
  // DOCS: Obtener lista de precios con config nivel Clasificación para el panel derecho

  getPriceListForPanelClassif = createEffect(() =>
    this.actions$.pipe(
      ofType(
        offerActions.GET_PRICE_LIST_FOR_PANEL_LOAD,
        offerActions.SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(offerSelectors.selectedFamily),
        this.store.select(offerSelectors.selectSFActualClassification),
        this.store.select(offerSelectors.selectClassifLevelAsidePricesQueryInfo),
        this.store.select(offerSelectors.selectedCatIndustryBrandFamily),
      ),
      mergeMap(
        ([action, selectedFamily, selectedClassification, queryInfo, catIndustryBrandFamily]) => {
          if (
            selectedFamily.selectedLevelConfigurationTab.id !== 3 ||
            isEmpty(selectedClassification)
          ) {
            return EMPTY;
          }
          return this.configuracionProveedoresCalculosService
            .vPrecioListaProductoClasificacionQueryResult(queryInfo)
            .pipe(
              map((response: QueryResultVPrecioListaProductoClasificacion) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener una página de la lista de precios aside de la familia seleccionada',
                  ),
                  response,
                );
                return {selectedFamily, prices: response, catIndustryBrandFamily};
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
                this.store.dispatch(offerActions.GET_PRICE_LIST_FOR_PANEL_FAILED());
                this.store.dispatch(
                  offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                    isLoading: false,
                  }),
                );
                this.store.dispatch(
                  offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                    value: -1,
                  }),
                );
                return EMPTY;
              }),
            );
        },
      ),
      // DOCS: Obtener config de todos los niveles de ingreso para el precio obtenido*
      withLatestFrom(this.store.select(offerSelectors.selectSFActualClassification)),
      switchMap(([{selectedFamily, prices, catIndustryBrandFamily}, featureCharacteristic]) => {
        if (!isEmpty(prices.Results)) {
          const request: any[] = _map(prices.Results, (o: IVProductListPrice) =>
            this.configuracionProveedoresCalculosService.vPrecioListaProveedorProductoClasificacionQueryResult(
              buildQueryInfoForIncomeLevelsByPrice(
                o,
                catIndustryBrandFamily,
                featureCharacteristic,
              ),
            ),
          );
          return forkJoin(request).pipe(
            map((response: QueryResultVPrecioListaProveedorProductoClasificacion[]) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener los niveles de ingreso de los precios listados',
                ),
                response,
              );
              const priceList: IOfferAsidePricesList = buildClassifLevelAsidePrices(
                prices,
                response,
              );
              this.store.dispatch(
                offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                  isLoading: false,
                }),
              );
              this.store.dispatch(
                offerActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD({
                  needsToReload: false,
                }),
              );
              if (response.length === 0) {
                this.store.dispatch(
                  offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                    value: -1,
                  }),
                );
              }
              return offerActions.GET_PRICE_LIST_FOR_PANEL_SUCCESS({
                prices: priceList,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener los niveles de ingreso de los precios listados',
                ),
                error,
              );
              this.store.dispatch(offerActions.GET_PRICE_LIST_FOR_PANEL_FAILED());
              this.store.dispatch(
                offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                  isLoading: false,
                }),
              );
              this.store.dispatch(
                offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                  value: -1,
                }),
              );
              return EMPTY;
            }),
          );
        } else {
          this.store.dispatch(
            offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
              isLoading: false,
            }),
          );
          this.store.dispatch(
            offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
              value: -1,
            }),
          );
          return of(
            offerActions.GET_PRICE_LIST_FOR_PANEL_SUCCESS({
              prices,
            }),
          );
        }
      }),
    ),
  );

  // DOCS: Obtener lista de precios con config nivel Clasificación para el panel derecho

  getPriceListForPanelProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.GET_PRICE_LIST_FOR_PANEL_LOAD),
      withLatestFrom(
        this.store.select(offerSelectors.selectedFamily),
        this.store.select(offerSelectors.selectedFamilyProduct),
        this.store.select(offerSelectors.selectedCatIndustryBrandFamily),
      ),
      mergeMap(([action, selectedFamily, selectedProduct, catIndustryBrandFamily]) => {
        if (selectedFamily.selectedLevelConfigurationTab.id !== 4 || isEmpty(selectedProduct)) {
          return EMPTY;
        }
        return this.configuracionProveedoresCalculosService
          .vPrecioProductoProveedorQueryResult(
            buildQueryInfoForIncomeLevelsByProduct(
              selectedFamily,
              selectedProduct,
              catIndustryBrandFamily,
            ),
          )
          .pipe(
            map((response: QueryResultVPrecioProductoProveedor) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener los niveles de ingreso del producto seleccionado',
                ),
                response,
              );
              const priceList: IOfferAsidePricesList = buildProductLevelAsidePrices(
                selectedProduct,
                response,
              );
              this.store.dispatch(
                offerActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD({
                  needsToReload: false,
                }),
              );
              if (response.Results.length === 0) {
                this.store.dispatch(
                  offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                    value: -1,
                  }),
                );
              }
              this.store.dispatch(
                offerActions.GET_PRICE_LIST_FOR_PANEL_SUCCESS({
                  prices: priceList,
                }),
              );
              return offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                isLoading: false,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener los niveles de ingreso del producto seleccionado',
                ),
                error,
              );
              this.store.dispatch(offerActions.GET_PRICE_LIST_FOR_PANEL_FAILED());
              this.store.dispatch(
                offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                  isLoading: false,
                }),
              );
              this.store.dispatch(
                offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({
                  value: -1,
                }),
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );
}
