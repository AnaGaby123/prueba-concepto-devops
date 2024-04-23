import {createReducer, on} from '@ngrx/store';
import {initialIRegulatoryResearchDashboard} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-dashboard/regulatory-research-dashboard.models';
import {regulatoryResearchDashboardActions} from '@appActions/pendings/new-product-existing-supplier/regulatory-research';
import {API_REQUEST_STATUS_LOADING, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';

export const regulatoryResearchDashboardReducer = createReducer(
  initialIRegulatoryResearchDashboard(),
  on(regulatoryResearchDashboardActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
  on(regulatoryResearchDashboardActions.SET_FILTER_SELECTED, (state, {filters}) => ({
    ...state,
    filters,
  })),
  on(regulatoryResearchDashboardActions.CHANGE_LOADING_STATUS, (state) => ({
    ...state,
    apiStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(regulatoryResearchDashboardActions.FETCH_PROVIDER_LIST_SUCCESS, (state, {data}) => ({
    ...state,
    listItems: data,
    apiStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
);
