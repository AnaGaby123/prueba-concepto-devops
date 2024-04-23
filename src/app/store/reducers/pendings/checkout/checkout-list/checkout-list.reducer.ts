/* Core Import */
import {createReducer, on} from '@ngrx/store';

import {
  CheckoutListState,
  initialCheckoutListState,
} from '@appModels/store/pendings/checkout/checkout-list/checkout-list.model';

/* Actions Imports */
import {checkoutActions, checkoutListActions} from '@appActions/pendings/checkout';
import {API_REQUEST_STATUS_LOADING, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';
import {find, map} from 'lodash-es';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {AttributeDashboard} from 'api-logistica';
import {checkOutStatusFormApi} from '@appHelpers/pending/processing/processing.helpers';

const initialStateCheckoutList: CheckoutListState = {
  ...initialCheckoutListState(),
};

export const checkoutListReducer = createReducer(
  initialStateCheckoutList,
  on(checkoutListActions.SET_TAB, (state, {tab}) => ({
    ...state,
    tapSelected: tab,
  })),
  on(checkoutListActions.SET_FILTER_BY_TYPE, (state, {filter}) => ({
    ...state,
    filterByType: filter,
  })),
  on(checkoutListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
  on(checkoutListActions.SET_SEARCH_TYPE, (state, {searchType}) => ({
    ...state,
    selectedSearchType: searchType,
  })),
  on(checkoutListActions.FETCH_CUSTOMER_SUCCESS, (state, {data}) => ({
    ...state,
    listOrders: {
      TotalResults: data.length,
      Results: data,
    },
  })),
  on(checkoutListActions.FETCH_TOTALS_TABS_SUCCESS, (state, {options}) => ({
    ...state,
    options: map(state.options, (o: ITabOption) => ({
      ...o,
      totalSubtitle: find(
        options,
        (i: AttributeDashboard) => i.DescriptionField === checkOutStatusFormApi[o.label],
      )?.ValueField as string,
    })),
    tapSelected: state.options[0],
  })),
  on(checkoutListActions.FETCH_DONUT_CHART_LOAD, (state) => ({
    ...state,
    donutChartStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(checkoutListActions.FETCH_DONUT_CHART_SUCCESS, (state, {data}) => ({
    ...state,
    donutChart: data,
    donutChartStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(checkoutListActions.SET_IS_LOADING_CUSTOMER, (state, {status}) => ({
    ...state,
    listOrdersStatus: status,
  })),
  on(checkoutActions.CLEAN_ALL_CHECKOUT, () => initialCheckoutListState()),
);
