import {createSelector} from '@ngrx/store';
import {selectAttendReviewPayment} from '@appSelectors/pendings/payment-manager/attend-review-payment/attend-review-payment.selectors';
import {IAttendReviewPayment} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment.models';
import {
  IAttendReviewPaymentDetails,
  IBillAttendReviewPayment,
} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment-details/attend-review-payment-details.models';
import {IProviderAttendReviewPayment} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment-list/attend-review-payment-list.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const selectAttendReviewPaymentDetails = createSelector(
  selectAttendReviewPayment,
  (state: IAttendReviewPayment): IAttendReviewPaymentDetails => state.attendReviewPaymentDetails,
);
export const selectSelectedProvider = createSelector(
  selectAttendReviewPaymentDetails,
  (state: IAttendReviewPaymentDetails): IProviderAttendReviewPayment => state.selectedProvider,
);
export const selectDataByType = createSelector(
  selectAttendReviewPaymentDetails,
  (state: IAttendReviewPaymentDetails): Array<DropListOption> => state.dataByType,
);
export const selectFilterByType = createSelector(
  selectAttendReviewPaymentDetails,
  (state: IAttendReviewPaymentDetails): DropListOption => state.filterByType,
);
export const selectSearchTerm = createSelector(
  selectAttendReviewPaymentDetails,
  (state: IAttendReviewPaymentDetails): string => state.searchTerm,
);
export const selectBills = createSelector(
  selectAttendReviewPaymentDetails,
  (state: IAttendReviewPaymentDetails): Array<IBillAttendReviewPayment> => state.bills,
);
export const selectedBill = createSelector(
  selectAttendReviewPaymentDetails,
  (state: IAttendReviewPaymentDetails): IBillAttendReviewPayment => state.selectedBill,
);
