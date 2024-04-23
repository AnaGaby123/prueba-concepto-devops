import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  IAttendReviewPayment,
  initialIAttendReviewPayment,
  TITLE_ATTEND_REVIEW_PAYMENT,
} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment.models';
import {attendReviewPaymentListReducer} from '@appReducers/pendings/payment-manager/attend-review-payment/attend-review-payment-list/attend-review-payment-list.reducer';
import {attendReviewPaymentDetailsReducer} from '@appReducers/pendings/payment-manager/attend-review-payment/attend-review-payment-details/attend-review-payment-details.reducer';
import {attendReviewPaymentActions} from '@appActions/pendings/payment-manager';

export const attendReviewPaymentReducer: ActionReducer<IAttendReviewPayment> = combineReducers(
  {
    title: createReducer(TITLE_ATTEND_REVIEW_PAYMENT),
    isInDetailsView: createReducer(
      initialIAttendReviewPayment().isInDetailsView,
      on(
        attendReviewPaymentActions.SET_IS_IN_DETAILS_VIEW,
        (state, {isInDetailsView}) => isInDetailsView,
      ),
    ),
    allowedToDetails: createReducer(
      initialIAttendReviewPayment().allowedToDetails,
      on(
        attendReviewPaymentActions.SET_ALLOWED_TO_DETAILS_VALUE,
        (state, {allowedToDetails}) => allowedToDetails,
      ),
    ),
    attendReviewPaymentList: attendReviewPaymentListReducer,
    attendReviewPaymentDetails: attendReviewPaymentDetailsReducer,
  },
  {...initialIAttendReviewPayment()},
);
