import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  initialOfferAdjustmentListState,
  OfferAdjustmentListState,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-list/offer-adjustment-list.model';
import {offerAdjustmentListActions} from '@appActions/pendings/offer-adjustment';
import {API_REQUEST_STATUS_LOADING, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';
import {find, map} from 'lodash-es';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {AttributeDashboard} from 'api-catalogos';
import {mapOfferAdjustmentPromiseApiResponse} from '@appHelpers/pending/offer-adjustment/offer-adjustment.helpers';
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';

const initialOfferAdjustmentList: OfferAdjustmentListState = {
  ...initialOfferAdjustmentListState(),
};

export const offerAdjustmentListReducer: ActionReducer<OfferAdjustmentListState> = createReducer(
  initialOfferAdjustmentList,
  on(offerAdjustmentListActions.CLEAN_ALL_OFFER_ADJUSTMENT_LIST, (state) => ({
    ...initialOfferAdjustmentList,
  })),
  on(offerAdjustmentListActions.SET_TAP, (state, {tabSelected}) => ({
    ...state,
    tabSelected,
    dashboardApiStatus: ApiRequestStatus.Loading,
  })),
  on(offerAdjustmentListActions.SET_FILTER_BY_TYPE, (state, {filterByType}) => ({
    ...state,
    filterByType,
    dashboardApiStatus: ApiRequestStatus.Loading,
  })),
  on(offerAdjustmentListActions.SET_FILTER_BY_DATES, (state, {filterByDates}) => ({
    ...state,
    filterByDates,
    clientsOptions: {
      ...state.clientsOptions,
      desiredPage: 1,
    },
  })),
  on(offerAdjustmentListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
    dashboardApiStatus: ApiRequestStatus.Loading,
  })),
  on(offerAdjustmentListActions.FETCH_CUSTOMER_LOAD, (state, {isFirstPage}) => ({
    ...state,
    clientsOptions: {
      ...state.clientsOptions,
      desiredPage: isFirstPage ? 1 : state.clientsOptions.desiredPage + 1,
    },
    /*      listUsersStatus: API_REQUEST_STATUS_LOADING,*/
  })),
  on(offerAdjustmentListActions.FETCH_CUSTOMER_SUCCESS, (state, {data}) => ({
    ...state,
    users: {
      ...state.users,
      TotalResults: data.TotalResults,
      Results:
        state.clientsOptions.desiredPage === 1
          ? [...data.Results]
          : [...state.users.Results, ...data.Results],
    },
  })),
  on(offerAdjustmentListActions.FETCH_CHART_TRADEMARK_LOAD, (state) => ({
    ...state,
    isLoadingTrademark: API_REQUEST_STATUS_LOADING,
  })),
  on(offerAdjustmentListActions.FETCH_CHART_TRADEMARK_SUCCESS, (state, {data}) => ({
    ...state,
    trademarks: data,
    isLoadingTrademark: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(offerAdjustmentListActions.FETCH_CHART_CUSTOMER_LOAD, (state) => ({
    ...state,
    isLoadingCustomers: API_REQUEST_STATUS_LOADING,
  })),
  on(offerAdjustmentListActions.FETCH_CHART_CUSTOMER_SUCCESS, (state, {data}) => ({
    ...state,
    isLoadingCustomers: API_REQUEST_STATUS_SUCCEEDED,
    customers: data,
  })),
  on(offerAdjustmentListActions.FETCH_CHART_ADJUSTMENT_SUCCESS, (state, {data}) => ({
    ...state,
    adjustmentsTotals: data,
  })),
  on(offerAdjustmentListActions.FETCH_TOTALS_SUCCESS, (state, {data}) => ({
    ...state,
    totals: data,
  })),
  on(offerAdjustmentListActions.FETCH_TOTAL_AMOUNTS_SUCCESS, (state, {data}) => ({
    ...state,
    totalAmounts: data,
  })),
  on(offerAdjustmentListActions.FETCH_CHART_ITEMS_SUCCESS, (state, {data}) => ({
    ...state,
    chartItems: data,
  })),
  on(offerAdjustmentListActions.SET_LOADING_LIST, (state, {status}) => ({
    ...state,
    listUsersStatus: status,
  })),
  on(
    offerAdjustmentListActions.FETCH_TOTALS_TABS_SUCCESS,
    (state: OfferAdjustmentListState, {tabs}): OfferAdjustmentListState => ({
      ...state,
      options: map(
        state.options,
        (o: ITabOption): ITabOption => ({
          ...o,
          totalSubtitle: find(
            tabs,
            (i: AttributeDashboard) =>
              i.DescriptionField === mapOfferAdjustmentPromiseApiResponse[o.label],
          )?.ValueField as string,
          labelSubtitle:
            find(
              tabs,
              (i: AttributeDashboard) =>
                i.DescriptionField === mapOfferAdjustmentPromiseApiResponse[o.label],
            )?.ValueField === 1
              ? 'Cliente'
              : 'Clientes',
        }),
      ),
    }),
  ),
  on(offerAdjustmentListActions.FETCH_TOTALS_TABS_LOAD, (state) => ({
    ...state,
    dashboardApiStatus: ApiRequestStatus.Loading,
  })),
  on(offerAdjustmentListActions.FETCH_TOTALS_TABS_ERROR, (state) => ({
    ...state,
    dashboardApiStatus: ApiRequestStatus.Error,
  })),
  on(
    offerAdjustmentListActions.FETCH_OFFER_ADJUSTMENT_DASHBOARD_SUCCESS,
    (state, {offerAdjustments}) => ({
      ...state,
      offerAdjustments,
      dashboardApiStatus: ApiRequestStatus.Success,
    }),
  ),
);
