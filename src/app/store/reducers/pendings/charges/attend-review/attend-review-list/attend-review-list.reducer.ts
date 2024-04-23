import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IAttendReviewList,
  initialIAttendReviewList,
} from '@appModels/store/pendings/charges/attend-review/attend-review-list/attend-review-list.models';
/*Actions Imports*/
import {attendReviewListActions} from '@appActions/pendings/charges/attend-review';

export const attendReviewListReducer: ActionReducer<IAttendReviewList> = createReducer(
  {...initialIAttendReviewList()},
  on(attendReviewListActions.SET_TAB_SELECTED, (state, {tab}) => ({
    ...state,
    selectedOption: tab,
  })),
  on(attendReviewListActions.SET_OPTION_ORDER, (state, {option}) => ({
    ...state,
    selectedFilter: option,
  })),
  on(attendReviewListActions.FETCH_CUSTOMER_SUCCESS, (state, {customers}) => ({
    ...state,
    customers,
  })),
  on(attendReviewListActions.SET_TERM_SEARCH, (state, {termSearch}) => ({
    ...state,
    termSearch,
  })),
  on(attendReviewListActions.SET_API_STATUS, (state, {status}) => ({
    ...state,
    statusApi: status,
  })),
  on(attendReviewListActions.SET_DATA_CHART, (state, {data}) => ({
    ...state,
    dataChartCustomer: data,
  })),
);
