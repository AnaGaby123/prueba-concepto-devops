import {createAction, props} from '@ngrx/store';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {IPqfTabOption} from '@appModels/shared-components/pqf-tab-options';
import {buildingStringActionType} from '@appUtil/strings';
import {ProviderListItemForRegulatoryResearch} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-dashboard/regulatory-research-dashboard.models';

const typeReducer = 'Reducer [Regulatory-research-dashboard]';
const typeApi = 'Api [Regulatory-research-dashboard]';

export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set search term'),
  props<{searchTerm: string}>(),
);
export const SET_FILTER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set filter selected'),
  props<{filters: Array<FilterOptionPqf>}>(),
);
export const SET_TAB_OPTIONS = createAction(
  buildingStringActionType(typeReducer, 'Set tab options'),
  props<{tabOptions: Array<IPqfTabOption>}>(),
);
export const HANDLE_SET_SELECTED_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Handle Set Selected Provider'),
  props<{item: ProviderListItemForRegulatoryResearch}>(),
);
export const SET_SELECTED_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Provider'),
  props<{item: ProviderListItemForRegulatoryResearch}>(),
);
export const FETCH_PROVIDER_LIST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch providers load'),
);
export const FETCH_PROVIDER_LIST_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch providers success'),
  props<{data: Array<ProviderListItemForRegulatoryResearch>}>(),
);
export const FETCH_PROVIDER_LIST_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch providers failed'),
);
export const CHANGE_LOADING_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Change loading status'),
);
