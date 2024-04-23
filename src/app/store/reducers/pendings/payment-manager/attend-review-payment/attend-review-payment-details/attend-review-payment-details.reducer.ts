import {ActionReducer, createReducer} from '@ngrx/store';
import {
  IAttendReviewPaymentDetails,
  initialIAttendReviewPaymentDetails,
} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment-details/attend-review-payment-details.models';

export const attendReviewPaymentDetailsReducer: ActionReducer<IAttendReviewPaymentDetails> = createReducer(
  {
    ...initialIAttendReviewPaymentDetails(),
  },
);
