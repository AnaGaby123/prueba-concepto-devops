/* Store Imports */
import {createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialIPurchasePromiseList,
  IPurchasePromiseList,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-list/purchase-promise-list.model';

/* Actions Imports */
import {purchasePromiseListActions} from '@appActions/pendings/purchase-promise';

/* Common Imports */
import {API_REQUEST_STATUS_LOADING, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {AttributeDashboard} from 'api-logistica';
import {find, map} from 'lodash-es';
import {mapPurchasePromiseApiResponse} from '@appHelpers/pending/purchase-promise/purchase-promise.helpers';

const initialStatePurchasePromiseList: IPurchasePromiseList = {
  ...initialIPurchasePromiseList(),
};
export const purchasePromiseListReducer = createReducer(
  initialStatePurchasePromiseList,
  on(
    purchasePromiseListActions.INIT_PURCHASE_PROMISE_LIST_COMPONENT_EFFECT,
    (state): IPurchasePromiseList => ({
      ...state,
      listRequestStatus: ApiRequestStatus.Loading,
    }),
  ),
  on(
    purchasePromiseListActions.GET_PURCHASE_PROMISE_LIST_TABS_INFO,
    (state: IPurchasePromiseList): IPurchasePromiseList => ({
      ...state,
      customerList: [],
      tabsRequestStatus: ApiRequestStatus.Loading,
    }),
  ),
  on(purchasePromiseListActions.CHANGE_LOADING_STATUS, (state: IPurchasePromiseList) => ({
    ...state,
    listRequestStatus: ApiRequestStatus.Loading,
  })),
  on(
    purchasePromiseListActions.GET_PURCHASE_PROMISE_LIST_TABS_INFO_SUCCESS,
    (state: IPurchasePromiseList, {tabs}): IPurchasePromiseList => ({
      ...state,
      options: map(state.options, (o: ITabOption) => ({
        ...o,
        totalSubtitle: find(
          tabs,
          (i: AttributeDashboard) => i.DescriptionField === mapPurchasePromiseApiResponse[o.label],
        )?.ValueField as string,
      })),
      tabsRequestStatus: ApiRequestStatus.Success,
    }),
  ),
  on(
    purchasePromiseListActions.GET_PURCHASE_PROMISE_LIST_TABS_INFO_ERROR,
    (state: IPurchasePromiseList): IPurchasePromiseList => ({
      ...state,
      tabsRequestStatus: ApiRequestStatus.Error,
    }),
  ),
  on(
    purchasePromiseListActions.FETCH_CUSTOMER_PURCHASE_PROMISE_LIST_SUCCESS,
    (state: IPurchasePromiseList, {customerList}): IPurchasePromiseList => ({
      ...state,
      customerList,
      listRequestStatus: ApiRequestStatus.Success,
    }),
  ),
  on(
    purchasePromiseListActions.FETCH_CUSTOMER_PURCHASE_PROMISE_LIST_ERROR,
    (state: IPurchasePromiseList): IPurchasePromiseList => ({
      ...state,
      listRequestStatus: ApiRequestStatus.Error,
    }),
  ),
  on(purchasePromiseListActions.FETCH_CUSTOMER_PURCHASE_PROMISE_LOAD, (state, {isFirstPage}) => ({
    ...state,
    clientsOptions: {
      ...state.clientsOptions,
      desiredPage: isFirstPage ? 1 : state.clientsOptions.desiredPage + 1,
    },
    isLoadingList: API_REQUEST_STATUS_LOADING,
  })),
  on(purchasePromiseListActions.FETCH_DONUT_CHART_PROMISE_SUCCESS, (state, {data}) => ({
    ...state,
    donutChart: data,
    isLoadingDonutChart: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(purchasePromiseListActions.SET_TAB_PROMISE, (state, {tab}) => ({
    ...state,
    tapSelected: tab,
    clientsOptions: {
      ...state.clientsOptions,
      desiredPage: 1,
    },
  })),
  on(purchasePromiseListActions.SET_FILTER_PROMISE, (state, {filter}) => ({
    ...state,
    filterByType: filter,
    clientsOptions: {
      ...state.clientsOptions,
      desiredPage: 1,
    },
  })),
  on(purchasePromiseListActions.SET_DATE_RANGE_PROMISE, (state, {dateRange}) => ({
    ...state,
    clientsOptions: {...state.clientsOptions, dateRange, desiredPage: 1},
  })),
  on(purchasePromiseListActions.SET_SEARCH_TERM_PROMISE, (state, {searchTerm}) => ({
    ...state,
    clientsOptions: {...state.clientsOptions, searchTerm, desiredPage: 1},
  })),
);
