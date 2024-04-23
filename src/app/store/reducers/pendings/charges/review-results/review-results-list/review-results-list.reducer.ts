import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  initialIReviewResultsList,
  IReviewResultsList,
} from '@appModels/store/pendings/charges/review-results/review-results-list/review-results-list.models';
import {
  reviewResultsActions,
  reviewResultsListActions,
} from '@appActions/pendings/charges/review-results';
import {isEmpty, map as _map} from 'lodash-es';

export const reviewResultsListReducer: ActionReducer<IReviewResultsList> = createReducer(
  {...initialIReviewResultsList()},
  on(reviewResultsActions.FETCH_CUSTOMER_SUCCESS, (state, {customers}) => ({
    ...state,
    customers,
  })),
  on(reviewResultsActions.SET_FILTER, (state, {item, attribute}) => ({
    ...state,
    [attribute]: item,
  })),
  on(reviewResultsActions.FETCH_MESSAGES_SUCCESS, (state, {messengers}) => ({
    ...state,
    messengers,
  })),
  on(reviewResultsListActions.FETCH_REVIEWS_SUCCESS, (state, {reviews}) => ({
    ...state,
    reviews,
  })),
  on(reviewResultsListActions.FETCH_REVIEWS_LOAD, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
  })),
  on(reviewResultsActions.EXECUTE_FILTERS, (state) => ({
    ...state,
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(reviewResultsListActions.SET_OPTION_TAB, (state, {tab}) => ({
    ...state,
    queryInfo: {...state.queryInfo, desiredPage: 1},
    selectedTab: tab,
  })),
  on(reviewResultsListActions.SET_STATUS_API, (state, {status}) => ({
    ...state,
    queryInfo: {...state.queryInfo, requestStatus: status},
  })),
  on(reviewResultsListActions.GET_TOTALS_SUCCESS, (state, {totals}) => ({
    ...state,
    totals,
  })),
  on(reviewResultsListActions.SELECTED_OPTION_CHIP, (state, {chip}) => ({
    ...state,
    optionsChip: _map(state.optionsChip, (item) => ({
      ...item,
      active: item.value === chip.value,
    })),
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(reviewResultsListActions.SET_STATUS_POP_UP, (state, {isShow}) => ({
    ...state,
    activePop: isShow,
  })),
  on(reviewResultsListActions.SELECTED_CUSTOMER, (state, {customer}) => ({
    ...state,
    reviews: {
      ...state.reviews,
      Results: !isEmpty(state.selectedReviewC)
        ? _map(state.reviews.Results, (review) => {
            if (state.selectedReviewC.IdFccRevisionProgramada === review.IdFccRevisionProgramada) {
              return {...state.selectedReviewC, needsToReload: false};
            }
            return review;
          })
        : state.reviews.Results,
    },
    selectedReviewC: {
      ...customer,
      dateFormat: customer.FechaProgramacionCobro
        ? new Date(customer.FechaProgramacionCobro)
        : null,
    },
    activePop: true,
  })),
  on(reviewResultsListActions.FETCH_BILLS_CLIENT_SUCCESS, (state, {dataBill}) => ({
    ...state,
    selectedReviewC: {...state.selectedReviewC, digitalReview: dataBill},
  })),
  on(reviewResultsListActions.FETCH_ADDRESS_CLIENT_SUCCESS, (state, {dataAddress}) => ({
    ...state,
    selectedReviewC: {...state.selectedReviewC, addressCustomer: dataAddress},
  })),
  on(
    reviewResultsListActions.FETCH_EVIDENCE_REVIEW_SUCCESS,
    (state, {evidenceReview, evidenceMessenger}) => ({
      ...state,
      selectedReviewC: {
        ...state.selectedReviewC,
        evidenceReview,
        evidenceMessenger,
      },
    }),
  ),
  on(reviewResultsListActions.FETCH_INCIDENCES_SUCCESS, (state, {incidences}) => ({
    ...state,
    selectedReviewC: {...state.selectedReviewC, incidences},
  })),
  on(reviewResultsListActions.SET_SCHEDULE_CHARGE_DATE, (state, {date, dateFormat}) => ({
    ...state,
    selectedReviewC: {
      ...state.selectedReviewC,
      FechaProgramacionCobro: date,
      dateFormat: new Date(date),
    },
  })),
);
