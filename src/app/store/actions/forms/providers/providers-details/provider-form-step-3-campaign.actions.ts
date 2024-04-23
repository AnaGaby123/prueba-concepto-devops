import {createAction, props} from '@ngrx/store';
import {QueryResultVMarca, QueryResultVMarcaFamilia, QueryResultVProducto} from 'api-catalogos';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  IVCampana,
  IVQueryResultVCampana,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-3-campaign.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {CampaignsViewConfigurations} from '@appModels/catalogos/providers/campaigns/campaigns';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {typeActionFetchProvider} from '@appHelpers/catalogs/providers/campaign.helpers';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'ProviderFormStep3';
const typeApi = 'ProviderFormStep3Api';

export const SET_ADD_CAMPAING = createAction(
  buildingStringActionType(typeApi, 'Set add component campaing'),
  props<{addCampaing: boolean}>(),
);
export const INITIAL_STATE_ADD_CAMPAIGN = createAction(
  buildingStringActionType(typeApi, 'initial state add campaign'),
);
export const SET_SELECTED_TAB_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set selected tab option'),
  props<{selectedCampaignTabOption: ITabOption}>(),
);
export const SET_ID_CAMPAIGN_BY_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set id Campaign Selected'),
  props<{idCampaignBy: DropListOption}>(),
);
export const GET_PRODUCTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get products load'),
);
export const GET_PRODUCTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get products success'),
  props<{products: QueryResultVProducto}>(),
);
export const GET_CLASSIFICATIONS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Classifications load'),
);
export const GET_CLASSIFICATIONS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Classifications success'),
  props<{classifications: any}>(),
);
export const GET_TRADEMARK_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Trademark load'),
);
export const GET_TRADEMARK_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Trademark success'),
  props<{trademark: QueryResultVMarca}>(),
);
export const GET_TRADEMARK_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get trademark failed'),
);
export const RESET_CURRENT_PAGES = createAction(
  buildingStringActionType(typeReducer, 'reset current pages'),
);
export const RESET_ITEMS_RELATED = createAction(
  buildingStringActionType(typeReducer, 'reset current pages'),
);
export const SET_API_STATUS_PRODUCTS = createAction(
  buildingStringActionType(typeReducer, 'set api status products'),
  props<{status: number}>(),
);
export const SET_API_STATUS_CLASSIFICATIONS = createAction(
  buildingStringActionType(typeReducer, 'set api status classifications'),
  props<{status: number}>(),
);
export const SET_API_STATUS_FAMILIES_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'set api status families provider'),
  props<{status: number}>(),
);
export const SET_API_STATUS_TRADEMARK = createAction(
  buildingStringActionType(typeReducer, 'set api status trademark'),
  props<{status: number}>(),
);
export const SET_API_STATUS_ITEMS_RELATED = createAction(
  buildingStringActionType(typeReducer, 'set api status items related'),
  props<{status: number}>(),
);
export const ADD_CAMPAIGN_ITEM = createAction(
  buildingStringActionType(typeReducer, 'add campaign item'),
  props<{item: any; idByType: string}>(),
);
export const REMOVE_CAMPAIGN_ITEM = createAction(
  buildingStringActionType(typeReducer, 'remove campaign item'),
  props<{item: any}>(),
);
export const SET_FORM_GENERAL_DATA_BY_FIELD_NAME = createAction(
  buildingStringActionType(typeReducer, 'set form general data by field name'),
  props<{fieldName: string; fieldValue: any}>(),
);
export const SET_DELETE_CAMPAIGN_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set delete campaign load'),
);
export const SET_DELETE_CAMPAIGN_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set delete campaign success'),
);
export const SAVE_CAMPAIGN_LOAD = createAction(
  buildingStringActionType(typeApi, 'save campaign load'),
);
export const SAVE_CAMPAIGN_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save campaign success'),
);
export const SAVE_ITEMS_RELATED_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save items related load'),
  props<{IdCampana: string}>(),
);
export const SAVE_CAMPAIGN_FAILED = createAction(
  buildingStringActionType(typeApi, 'save campaign failed'),
);
export const GET_CAPAIGNS_LOAD = createAction(
  buildingStringActionType(typeApi, 'get campaigns load'),
  props<{active: boolean; isFirstPage: boolean}>(),
);
export const GET_CAPAIGNS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'get campaigns success'),
  props<{campaigns: IVQueryResultVCampana}>(),
);
export const GET_CAPAIGNS_FAILED = createAction(
  buildingStringActionType(typeApi, 'get campaigns failed'),
);
export const SET_SEARCH_TERM_PRODUCTS = createAction(
  buildingStringActionType(typeReducer, 'set search term products'),
  props<{fieldValue: string}>(),
);
export const SET_SEARCH_TERM_CLASSIFICATIONS = createAction(
  buildingStringActionType(typeReducer, 'set search term classifications'),
  props<{fieldValue: string}>(),
);
export const SET_SEARCH_TERM_FAMILIES_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'set search term families providers'),
  props<{fieldValue: string}>(),
);
export const SET_SEARCH_TERM_TRADEMARK = createAction(
  buildingStringActionType(typeReducer, 'set search term trademark'),
  props<{fieldValue: string}>(),
);
export const SET_SEARCH_TERM_CAMPAIGN = createAction(
  buildingStringActionType(typeReducer, 'set search term campaign'),
  props<{searchTerm: string}>(),
);
export const SET_SELECTED_CAMPAIGN = createAction(
  buildingStringActionType(typeApi, 'Set selected campaign'),
  props<{campaignId: string; event?: string}>(),
);
export const GET_CAMPAIGNS_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'get campaigns details success'),
  props<{items: any; IdCampaign: string}>(),
);
export const CAMPAIGN_EDIT = createAction(
  buildingStringActionType(typeApi, 'edit campaign'),
  props<{campaign: IVCampana}>(),
);
export const ADD_CAMPAIGN_LIST_DELETE = createAction(
  buildingStringActionType(typeApi, 'add campaign list delete'),
  props<{campaign: IVCampana}>(),
);
export const GET_CAMPAIGNS_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'get campaigns items success'),
  props<{items: any; IdCampaign: string}>(),
);
export const SET_CAMPAIGNS_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Set campaigns backup'),
);
export const RESTORE_CAMPAIGNS_BACKUP = createAction(
  buildingStringActionType(typeApi, 'restore campaigns backup'),
);
export const CLEAN_CAMPAIGNS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean campaigns state'),
);
export const FETCH_PROVIDER_FAMILIES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch provider families load'),
  props<{idSelected: string}>(),
);
export const FETCH_PROVIDER_FAMILIES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, typeActionFetchProvider),
  props<{items: QueryResultVMarcaFamilia}>(),
);
export const FETCH_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch provider success'),
  props<{items: QueryResultVMarcaFamilia}>(),
);
export const FETCH_PROVIDER_FAMILIES_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch provider families failed'),
);
export const SET_DETAILS_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Set details backup'),
);
export const DELETE_ITEMS_RELATED_LOAD = createAction(
  buildingStringActionType(typeApi, 'Delete items related load'),
);
export const SET_CAMPAIGN_ID = createAction(
  buildingStringActionType(typeReducer, 'Set campaign id'),
  props<{IdCampana: string}>(),
);
export const SET_RADIO_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set radio value'),
  props<{label: string}>(),
);
export const GET_DATA_HANDLER_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Get data handler component effect'),
  props<{data: any; from: string}>(),
);
export const TEXT_SEARCH_HANDLER_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Text search handler component effect'),
  props<{fieldValue: any; viewConfiguration: CampaignsViewConfigurations}>(),
);
export const FETCH_MORE_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more component effect'),
  props<{event: IPageInfo; listName: string}>(),
);
export const FETCH_MORE_CAMPAIGNS = createAction(
  buildingStringActionType(typeApi, 'Fetch more campaigns'),
  props<{event: IPageInfo}>(),
);
