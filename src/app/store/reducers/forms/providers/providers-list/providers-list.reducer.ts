import {createReducer, on} from '@ngrx/store';
import {
  initialListProvidersForm,
  ProvidersListState,
} from '@appModels/store/forms/providers/providers-list/providers-list.models';
import {providerActions, providersListActions} from '@appActions/forms/providers';
import {map} from 'lodash-es';
import {ProvidersFormFilter} from '@appModels/store/forms/providers/providers-list/providers-form-filter';
import {
  ALL_VALUE,
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

const initialStateListProvidersForm: ProvidersListState = {
  ...initialListProvidersForm(),
};

export const listProvidersFormReducer = createReducer(
  initialStateListProvidersForm,
  on(
    providerActions.CLEAN_ALL_PROVIDERS_STATE,
    (): ProvidersListState => ({...initialListProvidersForm()}),
  ),
  on(
    providersListActions.FETCH_CAT_PROVIDERS_SUCCESS,
    (state: ProvidersListState, {response}): ProvidersListState => ({
      ...state,
      providersList: {
        ...state.providersList,
        Results:
          state.queryInfo.desiredPage === 1
            ? [...response.Results]
            : [...state.providersList.Results, ...response.Results],
        TotalResults: response.TotalResults,
      },
      providersRequestStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(providersListActions.FETCH_CAT_PROVIDERS_FAILED, (state, action) => ({
    ...state,
    providersRequestStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(providersListActions.SELECTED_OPTION_PROVIDER_FILTERS, (state, action) => ({
    ...state,
    filters: map(state.filters, (o: ProvidersFormFilter) => {
      if (o.id === action.option.id) {
        return {
          ...o,
          selected: o.hasOptions ? action.value : o.selected,
          isSelected: true,
        };
      }
      return {
        ...o,
        isSelected: false,
      };
    }),
  })),
  on(
    providersListActions.FETCH_PROVIDERS_FILTERS_SUCCESS,
    (
      state: ProvidersListState,
      {productTypesOptions, customAgentsOptions, regionOptions, buyerOptions, payerOptions},
    ): ProvidersListState => ({
      ...state,
      productTypesOptions: [
        {
          value: '1',
          label: ALL_VALUE,
        },
        ...productTypesOptions,
      ],
      customAgentsOptions: [
        {
          value: '1',
          label: ALL_VALUE,
        },
        ...customAgentsOptions,
      ],
      // regionOptions: [...state.regionOptions, ...regionOptions],
      buyerOptions: [
        {
          value: '1',
          label: ALL_VALUE,
        },
        ...buyerOptions,
      ],
      payerOptions: [
        {
          value: '1',
          label: ALL_VALUE,
        },
        ...payerOptions,
      ],
      queryInfo: {
        ...state.queryInfo,
        desiredPage: 1,
      },
      providersRequestStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(providersListActions.SELECTED_OPTION_PROVIDER_FILTERS, (state, action) => ({
    ...state,
    filters: map(state.filters, (o: ProvidersFormFilter) => {
      if (o.id === action.option.id) {
        return {
          ...o,
          selected: o.hasOptions ? action.value : o.selected,
          isSelected: true,
        };
      }
      return {
        ...o,
        isSelected: false,
      };
    }),
  })),
  on(providersListActions.SET_QUERY_INFO, (state, action) => ({
    ...state,
    queryInfo: {...state.queryInfo, ...action.payload},
  })),
  on(providersListActions.SET_PROVIDERS_FILTER, (state, {selectedFilter, filterName}) => ({
    ...state,
    [filterName]: selectedFilter,
  })),
  on(
    providersListActions.SET_STRATEGIC_IS_SELECTED,
    (state: ProvidersListState): ProvidersListState => ({
      ...state,
      strategicIsSelected: !state.strategicIsSelected,
    }),
  ),
  on(providersListActions.FETCH_CAT_PROVIDERS, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
    providersRequestStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(
    providersListActions.SET_SEARCH_TERM,
    (state: ProvidersListState, {searchTerm}): ProvidersListState => ({
      ...state,
      searchTerm,
    }),
  ),
  on(
    providersListActions.CLEAR_PROVIDER_LIST,
    (state: ProvidersListState): ProvidersListState => ({
      ...state,
      queryInfo: {...state.queryInfo, desiredPage: 1},
      providersRequestStatus: API_REQUEST_STATUS_LOADING,
      providersList: {
        Results: [],
        TotalResults: 0,
      },
    }),
  ),
  on(
    providersListActions.SET_PROVIDERS_REQUEST_STATUS,
    (state: ProvidersListState, {providersRequestStatus}): ProvidersListState => ({
      ...state,
      providersRequestStatus,
    }),
  ),
);
