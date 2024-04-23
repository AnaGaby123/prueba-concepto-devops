import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  IAttendInvestigationDetails,
  initialIAttendInvestigationDetails,
} from '@appModels/store/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.model';
import {productDetailsReducer} from '@appReducers/pendings/attend-investigation/attend-investigation-details/attend-investigation-details-details.product.reducer';
import {listProductsFormReducer} from '@appReducers/pendings/attend-investigation/attend-investigation-details/attend-investigation-details-list-product.reducer';
import {attendInvestigationDetailsActions} from '@appActions/pendings/attend-investigation';
import {API_REQUEST_STATUS_LOADING, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';
import {buildAttendInvestigationTabs} from '@appHelpers/pending/new-product-existing-supplier/attend-investigation/attend-investigation.helper';
import {productInvestigationListReducer} from '@appReducers/pendings/attend-investigation/attend-investigation-details/investigation-list.reducer';

export const attendInvestigationDetailsReducer: ActionReducer<IAttendInvestigationDetails> = combineReducers(
  {
    providerSelected: createReducer(
      initialIAttendInvestigationDetails().providerSelected,
      on(
        attendInvestigationDetailsActions.SET_PROVIDER,
        (state, {providerSelected}) => providerSelected,
      ),
    ),
    tabOptions: createReducer(
      initialIAttendInvestigationDetails().tabOptions,
      on(attendInvestigationDetailsActions.FETCH_TAB_OPTIONS_SUCCESS, (state, {tabs}) =>
        buildAttendInvestigationTabs(state, tabs),
      ),
    ),
    tabOptionSelected: createReducer(
      initialIAttendInvestigationDetails().tabOptionSelected,
      on(
        attendInvestigationDetailsActions.SET_TAB_OPTION_SELECTED,
        (state, {tabOptionSelected}) => tabOptionSelected,
      ),
    ),
    filterOptions: createReducer(initialIAttendInvestigationDetails().filterOptions),
    filterSelected: createReducer(
      initialIAttendInvestigationDetails().filterSelected,
      on(
        attendInvestigationDetailsActions.SET_FILTER_OPTION_SELECTED,
        (state, {filterSelected}) => filterSelected,
      ),
    ),
    productList: listProductsFormReducer,
    productDetails: productDetailsReducer,
    productInvestigationList: productInvestigationListReducer,
    productInvestigationApiStatus: createReducer(
      initialIAttendInvestigationDetails().productInvestigationApiStatus,
      on(
        attendInvestigationDetailsActions.FETCH_PROVIDER_PRODUCTS_LIST_LOAD,
        (state) => API_REQUEST_STATUS_LOADING,
      ),
      on(
        attendInvestigationDetailsActions.FETCH_PROVIDER_PRODUCTS_LIST_SUCCESS,
        (state, {items}) => API_REQUEST_STATUS_SUCCEEDED,
      ),
    ),
    providerContacts: createReducer(
      initialIAttendInvestigationDetails().providerContacts,
      on(
        attendInvestigationDetailsActions.GET_PROVIDER_CONTACTS_SUCCESS,
        (state, {contacts}) => contacts,
      ),
    ),
  },
  initialIAttendInvestigationDetails(),
);
