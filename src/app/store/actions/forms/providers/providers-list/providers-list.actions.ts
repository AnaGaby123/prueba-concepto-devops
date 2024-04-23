import {createAction, props} from '@ngrx/store';
import {QueryInfo, VProveedor} from 'api-catalogos';
import {ProvidersFormFilter} from '@appModels/store/forms/providers/providers-list/providers-form-filter';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {QueryResultIVProveedor} from '@appModels/store/forms/providers/providers-list/providers-list.models';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'ProviderFormList';
const typeApi = 'ProviderFormListApi';

export const FETCH_CAT_PROVIDERS = createAction(
  '[API-ProviderForm] get list providers',
  props<{isFirstPage: boolean}>(),
);
export const SET_SEARCH_TERM = createAction(
  '[API-ProviderForm] set term search list providers',
  props<{
    searchTerm: string;
  }>(),
);
export const SET_SELECTED_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set selected Provider'),
  props<{provider: VProveedor}>(),
);

export const CLEAR_PROVIDER_LIST = createAction('[API-ProviderForm] Clear Provider List');
export const SET_QUERY_INFO = createAction(
  '[API-ProviderForm] set query info list providers',
  props<{payload: QueryInfo}>(),
);
export const FETCH_CAT_PROVIDERS_SUCCESS = createAction(
  '[ProviderForm] get list providers success',
  props<{response: QueryResultIVProveedor}>(),
);
export const FETCH_CAT_PROVIDERS_FAILED = createAction('[ProviderForm] get list providers failed');
export const SELECTED_OPTION_PROVIDER_FILTERS = createAction(
  '[ProviderForm] Selected Option Provider Filters',
  props<{option: ProvidersFormFilter; value: string}>(),
);
export const SET_PROVIDERS_FILTER = createAction(
  '[ProviderForm] Set Providers Filter',
  props<{selectedFilter: DropListOption; filterName: string}>(),
);
export const SET_STRATEGIC_IS_SELECTED = createAction('[ProviderForm] Set Strategic Is Selected');
export const FETCH_PROVIDERS_FILTERS = createAction('[API-ProviderForm] Get providers filters');
export const FETCH_PROVIDERS_FILTERS_SUCCESS = createAction(
  '[ProviderForm] Get providers filters success',
  props<{
    productTypesOptions: Array<DropListOption>;
    customAgentsOptions: Array<DropListOption>;
    regionOptions: Array<DropListOption>;
    buyerOptions: Array<DropListOption>;
    payerOptions: Array<DropListOption>;
  }>(),
);
export const FETCH_PROVIDERS_FILTERS_FAILED = createAction(
  '[ProviderForm] Get providers filters failed',
  props<{error}>(),
);
export const SET_PROVIDERS_REQUEST_STATUS = createAction(
  buildingStringActionType(typeApi, 'Set providersRequestStatus'),
  props<{providersRequestStatus: number}>(),
);
export const ON_INIT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'OnInit component effect'),
);
export const FETCH_MORE_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more component effect'),
  props<{event: IPageInfo}>(),
);
export const NAVIGATE_TO_ADD_OR_EDIT = createAction(
  buildingStringActionType(typeReducer, 'Navigate to add or edit'),
  props<{edit: boolean; provider: VProveedor}>(),
);
