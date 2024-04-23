import {createReducer, on} from '@ngrx/store';
/*Actions Imports*/
import {followPPromiseListActions} from '@appActions/pendings/follow-purchase-promise';
/*Models Imports*/
import {
  IFollowPPromiseList,
  initialFollowPPromiseList,
} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise.models';
import {API_REQUEST_STATUS_FAILED, API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {AttributeDashboard} from 'api-logistica';
// Librerías
import {find, map} from 'lodash-es';
import {mapFollowPurchasePromiseApiResponse} from '@appHelpers/pending/follow-purchase-promise/follow-purchase-promise.helpers';

const initialStateFollowPPromiseList: IFollowPPromiseList = {
  ...initialFollowPPromiseList(),
};
export const followPPromiseListReducer = createReducer(
  initialStateFollowPPromiseList,
  on(
    followPPromiseListActions.INIT_FOLLOW_PURCHASE_PROMISE_LIST_COMPONENT_EFFECT,
    (state: IFollowPPromiseList): IFollowPPromiseList => ({
      ...state,
      dataDonutRequestStatus: ApiRequestStatus.Loading,
      listRequestStatus: ApiRequestStatus.Loading,
    }),
  ),
  on(
    followPPromiseListActions.SET_INITIAL_STATE,
    (state): IFollowPPromiseList => initialStateFollowPPromiseList,
  ),
  on(
    followPPromiseListActions.GET_FOLLOW_PURCHASE_PROMISE_LIST_TABS_TOTALS,
    (state: IFollowPPromiseList): IFollowPPromiseList => ({
      ...state,
    }),
  ),
  on(
    followPPromiseListActions.GET_FOLLOW_PURCHASE_PROMISE_LIST_TABS_TOTALS_SUCCESS,
    (state: IFollowPPromiseList, {tabs}): IFollowPPromiseList => ({
      ...state,
      options: map(
        state.options,
        (o: ITabOption): ITabOption => ({
          ...o,
          totalSubtitle: find(
            tabs,
            (i: AttributeDashboard) =>
              i.DescriptionField === mapFollowPurchasePromiseApiResponse[o.label],
          )?.ValueField as number,
          labelSubtitle:
            find(
              tabs,
              (i: AttributeDashboard) =>
                i.DescriptionField === mapFollowPurchasePromiseApiResponse[o.label],
            )?.ValueField === 1
              ? 'Partida'
              : 'Partidas',
        }),
      ),
      totalTabs: tabs,
    }),
  ),
  on(
    followPPromiseListActions.GET_FOLLOW_PURCHASE_PROMISE_LIST_TABS_TOTALS_FAILED,
    (state: IFollowPPromiseList): IFollowPPromiseList => ({
      ...state,
      listRequestStatus: ApiRequestStatus.Error,
    }),
  ),
  on(
    followPPromiseListActions.GET_FOLLOW_PURCHASE_PROMISE_DASHBOARD_SUCCESS,
    (state: IFollowPPromiseList, {customerList}): IFollowPPromiseList => ({
      ...state,
      customerList,
      listRequestStatus: ApiRequestStatus.Success,
    }),
  ),
  on(followPPromiseListActions.SET_TAB, (state, {tab}) => ({
    ...state,
    tabSelected: tab,
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(followPPromiseListActions.SET_FILTER_ORDER, (state, {filter}) => ({
    ...state,
    filterByType: filter,
  })),
  on(followPPromiseListActions.SET_FILTERS_DATE_RANGE, (state, {dateRange}) => ({
    ...state,
    queryInfo: {...state.queryInfo, dateRange, desiredPage: 1},
  })),
  on(followPPromiseListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    queryInfo: {...state.queryInfo, desiredPage: 1, searchTerm},
  })),
  on(followPPromiseListActions.FETCH_CUSTOMER_LIST_LOAD, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
      requestStatus: API_REQUEST_STATUS_LOADING,
    },
  })),
  on(followPPromiseListActions.SET_CUSTOMERS_LIST_API_STATUS, (state, {requestStatus}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      requestStatus,
    },
  })),
  on(followPPromiseListActions.FETCH_CUSTOMER_LIST_FAILED, (state) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      requestStatus: API_REQUEST_STATUS_FAILED,
    },
  })),
  on(followPPromiseListActions.FETCH_DONUT_CHART_FOLLOW_SUCCESS, (state, {data}) => ({
    ...state,
    dataDonutRequestStatus: ApiRequestStatus.Success,
    donutChart: data,
  })),
  on(followPPromiseListActions.FETCH_DONUT_CHART_FOLLOW_ERROR, (state) => ({
    ...state,
    dataDonutRequestStatus: ApiRequestStatus.Error,
  })),
  on(followPPromiseListActions.SET_API_STATUS_DONUT_CHART, (state, {status}) => ({
    ...state,
    isSuccessDataDonut: status,
  })),
  on(
    followPPromiseListActions.CHANGE_LOADING_STATUS,
    (state: IFollowPPromiseList): IFollowPPromiseList => ({
      ...state,
      customerList: [],
      dataDonutRequestStatus: ApiRequestStatus.Loading,
      listRequestStatus: ApiRequestStatus.Loading,
    }),
  ),
);
