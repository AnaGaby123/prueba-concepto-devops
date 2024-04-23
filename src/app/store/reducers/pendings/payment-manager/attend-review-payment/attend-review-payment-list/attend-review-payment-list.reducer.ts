import {ActionReducer, createReducer} from '@ngrx/store';
import {
  IAttendReviewPaymentList,
  initialIAttendReviewPaymentList,
} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment-list/attend-review-payment-list.models';

export const attendReviewPaymentListReducer: ActionReducer<IAttendReviewPaymentList> = createReducer(
  {
    ...initialIAttendReviewPaymentList(),
  },
);
