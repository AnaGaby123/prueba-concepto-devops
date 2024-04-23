import {createAction, props} from '@ngrx/store';

// Models
import {
  CatNivelIngreso,
  CatRutaEntrega,
  ConceptoAgenteAduanal,
  MarcaFamiliaProveedor,
  MarcaFamiliaProveedorConsolidacion,
} from 'api-catalogos';
import {
  IConfProvider,
  IOfferAsidePricesList,
  IOfferClassificationsList,
  IOfferListPricesList,
  IOfferProductsList,
  IVMarcaFamiliaIndustriaObj,
  IVProductListPriceConfiguration,
  IVProductProviderListPrice,
  IVProviderProductClassification,
  IVProviderProductConfiguration,
  IVTrademarkFamily,
  LevelConfigurationOption,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

// Utils
import {ICard} from '@appModels/card/card';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'ProviderFormStep8';
const typeApi = 'ProviderFormStep8Api';

// DOCS: General Offer
export const GET_PROVIDER_NIVEL_INGRESO_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get NivelIngreso catalog success'),
  props<{incomeLevelList: CatNivelIngreso[]}>(),
);
export const GET_PROVIDER_RUTA_ENTREGA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get RutasEntrega catalog success'),
  props<{deliveryRoutesList: Array<CatRutaEntrega>}>(),
);
export const GET_PROVIDER_CUSTOMS_AGENT_CONCEPT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get customs agent concept catalog success'),
  props<{customsAgentsConceptList: Array<ConceptoAgenteAduanal>}>(),
);
export const GET_INITIAL_CONFIGURATION = createAction(
  buildingStringActionType(typeApi, 'Initial configuration'),
);
export const GET_FAMILIES_PROVIDER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get families provider load'),
);
export const SET_INITIAL_STATE_OFFER = createAction(
  buildingStringActionType(typeApi, 'Set initial state offer'),
);
export const GET_FAMILIES_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get families provider success'),
  props<{familiesList: Array<IVTrademarkFamily>}>(),
);
export const GET_FAMILIES_PROVIDER_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get families provider failed'),
);

export const GET_FAMILY_DROP_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get for drop family '),
);
export const GET_FAMILY_DROP_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Success family list'),
  props<{familyList: Array<MarcaFamiliaProveedorConsolidacion>}>(),
);
// DOCS: Family level
export const GET_GENERAL_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get offer general configuration load'),
);
export const GET_GENERAL_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get offer general configuration success'),
  props<{newGeneralConfiguration: IConfProvider}>(),
);
export const GET_GENERAL_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get offer general configuration failed'),
);
export const REFRESH_FAMILY_DATA = createAction(
  buildingStringActionType(typeApi, 'Refresh family data'),
);
// DOCS: Cost level
export const GET_PRICE_LIST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get offer price list load'),
);
export const GET_PRICE_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get offer price list success'),
  props<{prices: IOfferListPricesList}>(),
);
export const GET_PRICE_LIST_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get offer price list failed'),
);
export const SET_PRICE_LIST_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set price list search term'),
  props<{searchTerm: string}>(),
);
export const GET_PERFORMANCE_LIST_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get performance list failed'),
);
export const GET_PRICE_LIST_FILTERED_BY_THIS_LEVEL_CONFIG = createAction(
  buildingStringActionType(typeApi, 'Get price list filtered by this level configuration'),
);
export const GET_PRICE_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get offer price configuration load'),
  props<{priceItem: IVProductListPriceConfiguration}>(),
);
export const GET_PRICE_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get offer price configuration success'),
  props<{configuration: IConfProvider}>(),
);
export const GET_PRICE_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get offer price configuration failed'),
);
export const SET_PRICE_CONFIGURATION_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeApi, 'Set offer price configuration needs to reload'),
  props<{
    priceItem: IVProductProviderListPrice;
    needsToReload: boolean;
  }>(),
);
export const RESET_PRICE_LIST_DESIRED_PAGE = createAction(
  buildingStringActionType(typeApi, 'Reset offer price list desired page'),
);
export const REFRESH_SELECTED_LIST_PRICE_DATA = createAction(
  buildingStringActionType(typeApi, 'Refresh selected list price data'),
);
export const REFRESH_SELECTED_LIST_PRICE_DATA_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Refresh selected list price data success'),
  props<{
    prices: Array<IVProductListPriceConfiguration>;
  }>(),
);
export const REFRESH_SELECTED_LIST_PRICE_DATA_FAILED = createAction(
  buildingStringActionType(typeApi, 'Refresh selected list price data failed'),
);
/*DOCS: characteristic grouper level*/
export const GET_CHARACTERISTIC_GROUPER_LIST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get offer characteristic grouper list load'),
);
export const GET_CHARACTERISTIC_GROUPER_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get offer characteristic grouper list success'),
  props<{classifications: IOfferClassificationsList}>(),
);
export const GET_CHARACTERISTIC_GROUPER_LIST_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get offer characteristic grouper list failed'),
);
export const SET_CHARACTERISTIC_GROUPER_LIST_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set characteristic grouper list search term'),
  props<{searchTerm: string}>(),
);
export const RESET_CHARACTERISTIC_GROUPER_DESIRED_PAGE = createAction(
  buildingStringActionType(typeApi, 'Reset offer characteristic grouper desired page'),
);
export const GET_CHARACTERISTIC_GROUPER_LIST_FILTERED_BY_THIS_LEVEL_CONFIG = createAction(
  buildingStringActionType(
    typeApi,
    'Get characteristic grouper list filtered by this level configuration',
  ),
);
export const GET_CHARACTERISTIC_GROUPER_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get offer characteristic grouper configuration load'),
  props<{classificationItem: IVProviderProductClassification}>(),
);
export const GET_CHARACTERISTIC_GROUPER_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get offer characteristic grouper configuration success'),
  props<{configuration: IConfProvider}>(),
);
export const GET_CHARACTERISTIC_GROUPER_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get offer characteristic grouper configuration failed'),
);
export const SET_CHARACTERISTIC_GROUPER_CONFIGURATION_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(
    typeApi,
    'Set offer characteristic grouper configuration needs to reload',
  ),
  props<{
    classificationItem: IVProviderProductClassification;
    needsToReload: boolean;
  }>(),
);
export const REFRESH_SELECTED_CHARACTERISTIC_GROUPER_DATA = createAction(
  buildingStringActionType(typeApi, 'Refresh selected characteristic grouper data'),
);
export const REFRESH_SELECTED_CHARACTERISTIC_GROUPER_DATA_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Refresh selected characteristic grouper data success'),
  props<{
    characteristicGrouper: IVProviderProductClassification;
  }>(),
);
export const REFRESH_SELECTED_CHARACTERISTIC_GROUPER_DATA_FAILED = createAction(
  buildingStringActionType(typeApi, 'Refresh selected characteristic grouper data failed'),
);
// DOCS: Products level
export const GET_PRODUCT_LIST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get offer product list load'),
);
export const GET_PRODUCT_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get offer product list success'),
  props<{products: IOfferProductsList}>(),
);
export const GET_PRODUCT_LIST_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get offer product list failed'),
);
export const SET_PRODUCT_LIST_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set product list search term'),
  props<{searchTerm: string}>(),
);
export const SET_PRODUCT_LIST_SEARCH_FILTER = createAction(
  buildingStringActionType(typeReducer, 'Set product list search filter'),
  props<{searchFilter: DropListOption}>(),
);
export const RESET_PRODUCT_DESIRED_PAGE = createAction(
  buildingStringActionType(typeApi, 'Reset offer product desired page'),
);
export const GET_PRODUCT_LIST_FILTERED_BY_THIS_LEVEL_CONFIG = createAction(
  buildingStringActionType(typeApi, 'Get product list filtered by this level configuration'),
);
export const GET_PRODUCT_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get offer product configuration load'),
  props<{productItem: IVProviderProductConfiguration}>(),
);
export const GET_PRODUCT_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get offer product configuration success'),
  props<{configuration: IConfProvider}>(),
);
export const GET_PRODUCT_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get offer product configuration failed'),
);
export const SET_PRODUCT_CONFIGURATION_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeApi, 'Set offer product configuration needs to reload'),
  props<{
    productItem: IVProviderProductConfiguration;
    needsToReload: boolean;
  }>(),
);
export const REFRESH_SELECTED_PRODUCT_DATA = createAction(
  buildingStringActionType(typeApi, 'Refresh selected product data'),
);
export const REFRESH_SELECTED_PRODUCT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Refresh selected product data success'),
  props<{
    product: IVProviderProductConfiguration;
  }>(),
);
export const REFRESH_SELECTED_PRODUCT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Refresh selected product data failed'),
);
// DOCS: Two or more levels
export const GET_PRICE_LIST_FOR_PANEL_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get offer price list for panel load'),
);
export const SET_OPEN_ALERT_POP_UPDATE_BREAKDOWN = createAction(
  buildingStringActionType(typeApi, 'Set open alert pop update breakdown'),
  props<{value: boolean}>(),
);
export const SET_IS_OPEN_POP_BREAKDOWN = createAction(
  buildingStringActionType(typeApi, 'Set is open pop breakdown'),
  props<{value: boolean}>(),
);
export const SET_OPEN_POP_AFTER_SAVE = createAction(
  buildingStringActionType(typeApi, 'Set open pop afeter save'),
  props<{value: boolean}>(),
);
export const SET_SELECTED_CAT_INDUSTRY_RAND_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set selected cat industry brand family'),
  props<{catIndustryFamilyBrand: IVMarcaFamiliaIndustriaObj}>(),
);
export const GET_PRICE_LIST_FOR_PANEL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get offer price list for panel success'),
  props<{
    prices: IOfferAsidePricesList;
  }>(),
);
export const GET_PRICE_LIST_FOR_PANEL_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get offer price list for panel failed'),
);
export const SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'Set offer list of tab configuration is loading'),
  props<{tabConfigurationName: string; isLoading: boolean}>(),
);
export const SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeReducer, 'Set offer list of tab configuration needs to reload'),
  props<{tabConfigurationName: string; needsToReload: boolean}>(),
);
export const SET_LIST_OF_TAB_CONFIGURATION_HAS_FILTER = createAction(
  buildingStringActionType(typeReducer, 'Set offer list of tab configuration has configuration'),
  props<{tabConfigurationName: string}>(),
);
// DOCS: Saves
export const SAVE_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save offer actual configuration load'),
);
export const SAVE_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save offer actual configuration success'),
  props<{selectedFamily: IVTrademarkFamily}>(),
);
export const SAVE_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Save offer actual configuration failed'),
);
export const SAVE_FAMILY_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save offer family configuration load'),
  props<{selectedFamily: IVTrademarkFamily}>(),
);
export const SAVE_PRICE_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save offer price configuration load'),
  props<{selectedFamily: IVTrademarkFamily}>(),
);
export const SAVE_CLASSIFICATION_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save offer characteristic grouper configuration load'),
  props<{selectedFamily: IVTrademarkFamily}>(),
);
export const SAVE_PRODUCT_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save offer product configuration load'),
  props<{selectedFamily: IVTrademarkFamily}>(),
);
export const SET_LEVEL_CONFIGURATION_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set level configuration tab selected'),
  props<{selectedLevelConfigurationTab: LevelConfigurationOption}>(),
);
export const SET_LEVEL_SUB_CONFIGURATION_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set level sub configuration tab selected'),
  props<{selectedLevelSubConfigurationTab: OptionBar}>(),
);
export const SET_SELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set selected family'),
  props<{familyId: string}>(),
);
export const GET_TRADEMARK_FAMILIES_LIST_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get trademark families list Success'),
  props<{
    trademarkFamiliesList: Array<IVTrademarkFamily>;
    trademarkFamilyProvider: MarcaFamiliaProveedor;
  }>(),
);
export const GET_TRADEMARK_FAMILIES_LIST_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get trademark families list Failed'),
);
export const SET_SELECTED_FAMILY_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeReducer, 'Set selected family needs to reload'),
  props<{needsToReload: boolean}>(),
);
export const SET_SELECTED_DELIVERY_ROUTE = createAction(
  buildingStringActionType(typeReducer, 'Set selected delivery route'),
  props<{deliveryRouteId: string}>(),
);
export const SET_PROVIDER_PRICE_CONFIGURATION_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set provider price configuration value'),
  props<{field: string; value: number}>(),
);
export const SET_PROVIDER_PERFORMANCE_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set provider performance value'),
  props<{field: string; value: number; itemId: string}>(),
);
export const SET_FAMILY_PROVIDER_PRICE_CONFIGURATION_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set family provider price configuration value'),
  props<{field: string; value: number | string | DropListOption}>(),
);
export const SET_TRADEMARK_FAMILY_PROVIDER_CONFIGURATION_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set trademark family provider price configuration value'),
  props<{field: string; value: boolean}>(),
);
export const SET_TRADEMARK_FAMILY_ITEM_IS_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set trademark family item is selected'),
  props<{item: DropListOption}>(),
);
export const SET_CUSTOMS_AGENT_CONFIGURATION_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set customs agents configuration value'),
  props<{field: string; value: DropListOption}>(),
);
export const SET_PROVIDER_DELIVERY_ROUTE_DELIVERY_TIME_CONFIGURATION_VALUE = createAction(
  buildingStringActionType(
    typeReducer,
    'Set provider delivery route delivery time configuration value',
  ),
  props<{field: string; value: number}>(),
);
export const SET_PROVIDER_UTILITIES_CONFIGURATION_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set provider utilities configuration value'),
  props<{value: number; field: string; idCatIndustryBrandFamily: string}>(),
);
// DOCS: Panel of PriceList
export const SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM = createAction(
  buildingStringActionType(typeApi, 'Set offer price list for panel search term'),
  props<{searchTerm: string}>(),
);
export const SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE = createAction(
  buildingStringActionType(typeApi, 'Set offer price list for panel desired page'),
  props<{value: number}>(),
);
export const RESET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE = createAction(
  buildingStringActionType(typeApi, 'Reset offer price list for panel desired page'),
);
export const SET_PRICE_LIST_FOR_PANEL_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'Set offer price list for panel is loading'),
  props<{isLoading: boolean}>(),
);
export const SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeReducer, 'Set offer price list for panel needs to reload'),
  props<{needsToReload: boolean}>(),
);
export const RESET_ASIDE_PRICES = createAction(
  buildingStringActionType(typeReducer, 'Reset aside prices'),
);
// DOCS: Utils
export const CLEAN_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Clean actual configuration'),
);
export const RESTORE_GENERAL_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Restore offer general actual configuration'),
);
export const RESTORE_PRICE_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Restore offer price actual configuration'),
);
export const RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(
    typeReducer,
    'Restore offer characteristic grouper actual configuration',
  ),
);
export const RESTORE_PRODUCT_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Restore offer product actual configuration'),
);
export const SET_ALL_PRICES_WITH_FAMILY_CONFIG_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeReducer, 'Set all prices with Family config needs to reload'),
);
export const SET_SELECTED_PRICE_INCOME_LEVEL_FOR_PANEL = createAction(
  buildingStringActionType(typeReducer, 'Set selected income level for panel price'),
  props<{incomeLevel: string}>(),
);
export const SET_BACKUP_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Set offer backup configuration'),
);
export const RESTORE_BACKUP_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Restore offer backup configuration'),
);
export const SET_FAMILY_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Set family backup'),
);
export const RETURN_PROCESS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Return offer process success'),
);

export const SET_INCOME_LEVEL_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Set income level component effect'),
  props<{incomeLevel: string}>(),
);
export const SEARCH_PRICE_FOR_PANEL_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Search price for panel component effect'),
  props<{searchTerm: string}>(),
);
export const SET_TARGET_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Set target component effect'),
  props<{catIndustryFamilyBrand: IVMarcaFamiliaIndustriaObj}>(),
);
export const GET_PRICE_PAGE_FOR_PANEL_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Get price page for panel component effect'),
  props<{value: number}>(),
);
export const HANDLE_SELECTED_FAMILY_CHANGED_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Handle selected family changed component effect'),
  props<{selectedFamily: ICard}>(),
);
export const SET_PRESELECTED_LEVEL_CONFIG = createAction(
  buildingStringActionType(typeReducer, 'Set preselected level config'),
  props<{preSelectedLevelConfiguration: LevelConfigurationOption}>(),
);
export const SET_PRESELECTED_FAMILY_CHANGED = createAction(
  buildingStringActionType(typeReducer, 'Set pre selected family chnged'),
  props<{selectedFamily: ICard}>(),
);
export const ALERT_POP = createAction(
  buildingStringActionType(typeReducer, 'Alert pop'),
  props<{active: boolean}>(),
);
export const SHOW_CONFIRM_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Confirm Dialog'),
  props<{typeOfPop?: string}>(),
);
export const SELECT_FAMILY = createAction(buildingStringActionType(typeReducer, 'Select family'));
export const SET_LEVEL_CONFIGURATION_TAB_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Set level configuration tab component effect'),
);
export const HANDLE_LEVEL_CONFIG_TAB_CHANGE_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Handle level config tab change component effect'),
  props<{selectedLevelConfigurationTab: LevelConfigurationOption; typeOfPop?: string}>(),
);
export const FETCH_MORE_PRICES_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more prices component provider effect'),
  props<{event: IPageInfo}>(),
);
export const FETCH_MORE_CLASSIFICATIONS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more classifications component effect'),
  props<{event: IPageInfo}>(),
);
export const FETCH_MORE_PRODUCTS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more products component effect'),
  props<{event: IPageInfo}>(),
);

/// DOCS Save ProviderConfigurationPerformance
export const SET_LOADING_SAVE_PROVIDER_CONFIGURATION_PERFORMANCE = createAction(
  buildingStringActionType(typeReducer, 'Set loading save provider configuration performance'),
);
export const SET_SUCCESS_SAVE_PROVIDER_CONFIGURATION_PERFORMANCE = createAction(
  buildingStringActionType(typeReducer, 'Set success save provider configuration performance'),
  props<{familyBrandIndustry: IVMarcaFamiliaIndustriaObj}>(),
);
export const SET_FAILED_SAVE_PROVIDER_CONFIGURATION_PERFORMANCE = createAction(
  buildingStringActionType(typeReducer, 'Set failed save provider configuration performance'),
);
