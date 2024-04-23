import {createAction, props} from '@ngrx/store';
import {VClasificacionCustom} from '@appModels/catalogos/offerSegmentation/offerSegmentation';
import {CatRutaEntrega, VMarcaFamilia, VPrecioListaClienteProducto} from 'api-catalogos';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IClientClassificationsList,
  IClientListPricesList,
  IClientProductList,
  IVClientProductConfiguration,
  IVProductListPriceConfigurationClient,
  IVProviderResume,
  IVProviderResumeQueryResult,
  IVTrademarkFamily,
} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import {LevelConfigurationOption} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {ICard} from '@appModels/card/card';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Prices';

export const GET_INITIAL_PRICES_STATE_LOAD = createAction(
  '[API] Get offer segmentation initial state load',
);
export const SET_PROVIDER_SELECTED_LOAD = createAction(
  '[ClientForm] Set provider selected load',
  props<{provider: IVProviderResume | null}>(),
);
export const SET_LEVEL_CONFIGURATION_SELECTED_LOAD = createAction(
  '[ClientForm] Set level configuration selected load',
  props<{selectedLevelConfigurationTab: LevelConfigurationOption}>(),
);
export const SET_LEVEL_SUB_CONFIGURATION_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set level sub configuration tab selected'),
  props<{selectedLevelSubConfigurationTab: OptionBar}>(),
);
export const SET_TRADEMARK_CONSOLIDATION_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set trademark consolidation provider success'),
  props<{trademarkFamilyProviderConsolidation: Array<VMarcaFamilia>}>(),
);
export const SET_TRADEMARK_CONSOLIDATION_PROVIDER_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set trademark consolidation provider failed'),
);
export const GET_PROVIDER_RUTA_ENTREGA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get RutasEntrega catalog success'),
  props<{deliveryRoutesList: Array<CatRutaEntrega>}>(),
);
export const SET_EDIT_MODE = createAction('[ClientForm] Set edit mode load');
export const CLEAN_PRICES_CLIENT_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set Clean Prices Client State'),
);
export const SET_ENABLE_EDIT = createAction(
  buildingStringActionType(typeReducer, '[ClientForm] Set edit mode load'),
  props<{enableEdit: boolean}>(),
);
export const GET_ADDRESSES_CLIENT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get addresses client load'),
);
export const GET_ADDRESSES_CLIENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get address client success'),
  props<{clientAddresses: any}>(),
);
export const GET_ADDRESSES_CLIENT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get address client failed'),
);
export const SET_SEARCH_TERM_BY_PROVIDER = createAction(
  '[ClientForm] Set Search Term By Provider',
  props<{searchTerm: string}>(),
);
export const GET_PROVIDERS_LIST_LOAD = createAction(
  '[API] Get providers load',
  props<{isFirstPage: boolean}>(),
);
export const GET_PROVIDERS_LIST_SUCCESS = createAction(
  '[ClientForm] Get providers success',
  props<{providers: IVProviderResumeQueryResult}>(),
);
export const SET_PROVIDER_LIST_SUCCESS = createAction('[ClientForm] Set provider list success');
export const GET_PROVIDERS_LIST_FAILED = createAction('[ClientForm] Get providers FAILED');
export const SET_SELECTED_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set selected provider'),
  props<{providerId: string}>(),
);
export const GET_FAMILIES_SUCCESS = createAction(
  '[ClientForm] Get families success',
  props<{families: Array<IVTrademarkFamily>}>(),
);
export const GET_FAMILIES_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get family failed'),
);
export const SET_SELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set selected family'),
  props<{familyId: string}>(),
);
export const GET_FAMILY_GENERAL_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get family general configuration load'),
);
export const GET_FAMILY_GENERAL_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get family general configuration success'),
  props<{configuration: any}>(),
);
export const GET_FAMILY_GENERAL_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get family general configuration failed'),
);
export const GET_FAMILY_PRICE_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get family price configuration load'),
  props<{priceItem: IVProductListPriceConfigurationClient}>(),
);
export const GET_FAMILY_PRICE_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get family price configuration success'),
  props<{configuration: any}>(),
);
export const GET_FAMILY_PRICE_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get family price configuration failed'),
);
export const GET_FAMILY_CLASSIFICATION_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get family classification configuration load'),
  props<{classificationItem: VClasificacionCustom}>(),
);
export const GET_FAMILY_CLASSIFICATION_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get family classification configuration success'),
  props<{configuration: any}>(),
);
export const GET_FAMILY_CLASSIFICATION_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get family classification configuration failed'),
);
export const GET_FAMILY_PRODUCT_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get family product configuration load'),
  props<{productItem: IVClientProductConfiguration}>(),
);
export const GET_FAMILY_PRODUCT_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get family product configuration success'),
  props<{configuration: any}>(),
);
export const GET_FAMILY_PRODUCT_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get family product configuration failed'),
);

export const SET_SEARCH_TERM_BY_CLASSIFICATIONS_LIST = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term By classifications list'),
  props<{searchTerm: string}>(),
);

export const SET_SHOW_PRICE_LIST = createAction(
  buildingStringActionType(typeReducer, 'Set show price list'),
);
export const GET_THIS_LEVEL_CLASSIFICATIONS_LIST_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get this level classifications list load'),
);
export const GET_THIS_LEVEL_PRODUCTS_LIST_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get this level products list load'),
);
export const GET_PRICE_LOAD = createAction(buildingStringActionType(typeReducer, 'Get price load'));
export const GET_PRICE_SUCCESS = createAction(
  '[ClientForm] Get price success',
  props<{prices: IClientListPricesList}>(),
);
export const GET_CLASSIFICATIONS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Classification Load'),
);
export const GET_CLASSIFICATIONS_SUCCESS = createAction(
  '[ClientForm] Get CLASSIFICATIONS success',
  props<{classifications: IClientClassificationsList}>(),
);
export const GET_CLASSIFICATIONS_FAILED = createAction('[ClientForm] Get CLASSIFICATIONS failed');
export const GET_PRODUCTS_LIST_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get products list load'),
);
export const GET_PRODUCTS_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get products list success'),
  props<{products: IClientProductList}>(),
);
export const GET_PRODUCTS_LIST_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get products list failed'),
);
export const SET_PROVIDERS_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'Set providers is loading'),
  props<{apiStatus: number}>(),
);
export const SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'Set list of tab configuration is loading'),
  props<{tabConfigurationName: string; isLoading: boolean}>(),
);
export const SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeReducer, 'Set list of tab configuration needs to reload'),
  props<{tabConfigurationName: string; needsToReload: boolean}>(),
);
export const SET_LIST_OF_TAB_CONFIGURATION_HAS_FILTER = createAction(
  buildingStringActionType(typeReducer, 'Set list of tab configuration has configuration'),
  props<{tabConfigurationName: string}>(),
);
export const SET_PRICE_LIST_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set price list search term'),
  props<{searchTerm: string}>(),
);
export const GET_PRICE_LIST_FILTERED_BY_THIS_LEVEL_CONFIG = createAction(
  buildingStringActionType(typeReducer, 'Set price list filtered by configuration'),
);

export const SET_FAMILY_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Set family backup'),
);
export const SET_PRICE_LIST_SEARCH_TERM_CHARACTERISITC_GROUPER = createAction(
  buildingStringActionType(typeReducer, 'Set price list search term characteristic grouper'),
  props<{searchTerm: string}>(),
);
export const SET_FAMILY_SUBCONFIGURATION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set family sub configuration selected'),
  props<{subConfiguration: ITabOption}>(),
);
export const QUIT_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Quit actual configuration'),
);
export const RESTORE_GENERAL_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Restore general actual configuration'),
);
export const RESTORE_PRICE_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Restore price actual configuration'),
);
export const RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Restore classification actual configuration'),
);
export const RESTORE_PRODUCT_ACTUAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Restore product actual configuration'),
);
export const SET_CLIENT_PRICE_CONFIGURATION_FIELD_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set client price configuration field data'),
  props<{field: string; value: number | string | DropListOption}>(),
);
export const SET_VIGENCIA = createAction(
  buildingStringActionType(typeReducer, 'Set vigencia'),
  props<{Vigencia: string; selectedTabConfiguration: string; typeConfiguration: string}>(),
);
export const SET_CONFIGURATION_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Configuration Type'),
  props<{value: DropListOption}>(),
);
export const SAVE_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save configuration load'),
);
export const SAVE_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save configuration success'),
  props<{configuration: IVTrademarkFamily}>(),
);
export const SAVE_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save configuration failed'),
);
export const SAVE_GENERAL_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save general configuration load'),
  props<{selectedFamily: IVTrademarkFamily}>(),
);
export const SAVE_PRICE_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save price configuration load'),
  props<{selectedFamily: IVTrademarkFamily}>(),
);
export const SAVE_CLASSIFICATION_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save classification configuration load'),
  props<{selectedFamily: IVTrademarkFamily}>(),
);
export const SAVE_PRODUCT_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save product configuration load'),
  props<{selectedFamily: IVTrademarkFamily}>(),
);
export const GET_PRICE_LIST_FOR_PANEL_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get price list for panel load'),
);
export const GET_PRICE_LIST_FOR_PANEL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get price list for panel success'),
  props<{
    prices;
  }>(),
);
export const GET_PRICE_LIST_FOR_PANEL_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get price list for panel failed'),
);
export const SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set price list for panel search term'),
  props<{searchTerm: string}>(),
);
export const SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE = createAction(
  buildingStringActionType(typeReducer, 'Set price list for panel desired page'),
  props<{value: number}>(),
);
export const RESET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE = createAction(
  buildingStringActionType(typeReducer, 'Reset price list for panel desired page'),
);
export const SET_PRICE_LIST_FOR_PANEL_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'Set price list for panel is loading'),
  props<{isLoading: boolean}>(),
);
export const SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeReducer, 'Set price list for panel needs to reload'),
  props<{needsToReload: boolean}>(),
);
export const RETURN_PROCESS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Return process success'),
);
export const SET_BACKUP_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Set backup configuration'),
);
export const SET_PRODUCT_LIST_SEARCH_FILTER = createAction(
  buildingStringActionType(typeReducer, 'Set product list search filter'),
  props<{searchFilter: DropListOption}>(),
);
export const SET_SEARCH_TERM_BY_PRODUCTS_LIST = createAction(
  buildingStringActionType(typeReducer, 'Set product list search term'),
  props<{searchTerm: string}>(),
);
export const RESET_PRICE_LIST_DESIRED_PAGE = createAction(
  buildingStringActionType(typeReducer, 'Reset offer price list desired page'),
);
export const RESET_CLASSIFICATION_LIST_DESIRED_PAGE = createAction(
  buildingStringActionType(typeReducer, 'Reset offer classification list desired page'),
);
export const RESET_PRODUCT_LIST_DESIRED_PAGE = createAction(
  buildingStringActionType(typeReducer, 'Reset offer product list desired page'),
);
export const SET_RESTORE_DATA_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Set Restore Data Bakup'),
);
export const UPDATE_SELECTED_PRICE_ITEM_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Update selected price item load'),
  props<{priceItem: any}>(),
);
export const UPDATE_SELECTED_PRICE_ITEM_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Update selected price item success'),
  props<{prices: VPrecioListaClienteProducto[]}>(),
);
export const UPDATE_SELECTED_CHARACTERISTIC_GROUPER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'update selected characteristic grouper load'),
  props<{productItem: any}>(),
);
export const UPDATE_SELECTED_CHARACTERISTIC_GROUPER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'update selected characteristic grouper success'),
  props<{productItem: any}>(),
);
export const UPDATE_SELECTED_PRODUCT_PRICE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'update selected product price load'),
  props<{productItem: any}>(),
);
export const UPDATE_SELECTED_PRODUCT_PRICE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'update selected product price success'),
  props<{productItem: any}>(),
);
export const SHOW_PROVIDERS_LIST = createAction(
  buildingStringActionType(typeReducer, 'Show providers list'),
);
export const SET_PRE_SELECTED_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set pre selected provider'),
  props<{value: IVProviderResume | null}>(),
);
export const SET_PRE_SELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set pre selected family'),
  props<{value: ICard | null}>(),
);
export const SET_PRE_SELECTED_LEVEL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Set pre selected level configuration'),
  props<{value: LevelConfigurationOption | null}>(),
);
// DOCS Acciones de la refactorización de precios
export const SELECT_CONFIGURATION_TAB_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Select configuration tab component effect'),
  props<{selectedLevelConfigurationTab: LevelConfigurationOption}>(),
);
export const SELECTED_FAMILY_CHANGES_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Selected family changes component effect'),
  props<{selectedFamily: ICard}>(),
);
export const SELECTED_PROVIDER_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Selected provider component effect'),
  props<{providerSelected: IVProviderResume}>(),
);
export const HANDLE_ACTIVE_ALERT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Handle active alert component effect'),
  props<{status: boolean}>(),
);
export const SET_CONFIGURATION_SEARCH_TERM_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Search configuration search term component effect'),
  props<{searchTerm: string}>(),
);
export const SAVE_CONFIGURATION_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Save configuration component effect'),
  props<{value: boolean}>(),
);
// DOCS Acciones de la refactorización de precios (Shared)
export const GET_PRICE_PAGE_FOR_PANEL_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Get price page for panel component effect'),
  props<{value: number}>(),
);
export const SEARCH_FOR_PANEL_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Search for panel component effect'),
  props<{searchTerm: string}>(),
);
// DOCS Acciones para el providers-panel component
export const FETCH_MORE_PROVIDERS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more providers component effect'),
  props<{event: IPageInfo}>(),
);
// DOCS Acciones para el product component
export const FILTER_CONFIGURED_PRODUCTS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch configured products component effect'),
);
export const FETCH_MORE_PRODUCTS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more products component effect'),
  props<{event: IPageInfo}>(),
);
// DOCS Acciones para offer-classification component

export const SET_SEARCH_TERM_CHARACTERISTIC_GROUPER_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Set search term characteristic grouper component effect'),
  props<{searchTerm: string}>(),
);
export const FILTER_CONFIGURED_CLASSIFICATIONS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Filter configured classifications component effect'),
);
export const FETCH_MORE_CLASSIFICATION_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more classifications component effect'),
  props<{event: IPageInfo}>(),
);
// DOCS Acciones para el list-price component
export const FETCH_MORE_PRICES_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more prices component client effect'),
  props<{event: IPageInfo}>(),
);
export const SET_SEARCH_TERM_PRICES_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Set search term prices component effect'),
  props<{searchTerm: string}>(),
);
export const FILTER_CONFIGURED_PRICES_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Filter configured prices component effect'),
);
export const SET_IS_OPEN_POP_BREAKDOWN = createAction(
  buildingStringActionType(typeReducer, 'Set is open pop breakdown'),
  props<{value: boolean}>(),
);
export const SET_OPEN_POP_AFTER_SAVE = createAction(
  buildingStringActionType(typeReducer, 'Set open pop after save'),
  props<{value: boolean}>(),
);
export const RESET_ASIDE_PRICES = createAction(
  buildingStringActionType(typeReducer, 'Reset aside prices'),
);
export const SET_OPEN_ALERT_POP_UPDATE_BREAKDOWN = createAction(
  buildingStringActionType(typeReducer, 'Set open alert pop update breakdown'),
  props<{value: boolean}>(),
);
export const SET_PREPARE_BREAKDOWN = createAction(
  buildingStringActionType(typeReducer, 'Set prepare breakdown'),
);
// DOCS Exportar csv
export const SET_LOAD_CSV_DOWNLOAD_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set load csv download load'),
);
export const SET_LOAD_CSV_DOWNLOAD_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set load csv download success'),
);
//
export const SHOW_CONFIRM_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Confirm Dialog'),
);
