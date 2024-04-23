import {createSelector} from '@ngrx/store';
import {IAttendReviewPayment} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment.models';
import {selectAttendReviewPayment} from '@appSelectors/pendings/payment-manager/attend-review-payment/attend-review-payment.selectors';
import {
  IAttendReviewPaymentList,
  IProviderAttendReviewPayment,
} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment-list/attend-review-payment-list.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const selectAttendReviewPaymentList = createSelector(
  selectAttendReviewPayment,
  (state: IAttendReviewPayment): IAttendReviewPaymentList => state.attendReviewPaymentList,
);
export const selectDataByType = createSelector(
  selectAttendReviewPaymentList,
  (state: IAttendReviewPaymentList): Array<DropListOption> => state.dataByType,
);
export const selectFilterByType = createSelector(
  selectAttendReviewPaymentList,
  (state: IAttendReviewPaymentList): DropListOption => state.filterByType,
);
export const selectSearchTerm = createSelector(
  selectAttendReviewPaymentList,
  (state: IAttendReviewPaymentList): string => state.searchTerm,
);
export const selectProviders = createSelector(
  selectAttendReviewPaymentList,
  (state: IAttendReviewPaymentList): Array<IProviderAttendReviewPayment> => state.providers,
);
