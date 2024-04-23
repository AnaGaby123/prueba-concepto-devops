import {createSelector} from '@ngrx/store';
import {selectPaymentManager} from '@appSelectors/pendings/pendings.selectors';
import {IPaymentManagerState} from '@appModels/store/pendings/payment-manager/payment-manager.models';
import {IAttendReviewPayment} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment.models';
import {IAttendReviewPaymentDetails} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment-details/attend-review-payment-details.models';
import {IAttendReviewPaymentList} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment-list/attend-review-payment-list.models';

export const selectAttendReviewPayment = createSelector(
  selectPaymentManager,
  (state: IPaymentManagerState): IAttendReviewPayment => state.attendReviewPayment,
);
export const selectTitle = createSelector(
  selectAttendReviewPayment,
  (state: IAttendReviewPayment): string => state.title,
);
export const selectIsInDetailsView = createSelector(
  selectAttendReviewPayment,
  (state: IAttendReviewPayment): boolean => state.isInDetailsView,
);
export const selectAllowedToDetails = createSelector(
  selectAttendReviewPayment,
  (state: IAttendReviewPayment): boolean => state.allowedToDetails,
);
export const selectAttendReviewPaymentList = createSelector(
  selectAttendReviewPayment,
  (state: IAttendReviewPayment): IAttendReviewPaymentList => state.attendReviewPaymentList,
);
export const selectAttendReviewPaymentDetails = createSelector(
  selectAttendReviewPayment,
  (state: IAttendReviewPayment): IAttendReviewPaymentDetails => state.attendReviewPaymentDetails,
);
