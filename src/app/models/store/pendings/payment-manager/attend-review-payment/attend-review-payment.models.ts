import {
  IAttendReviewPaymentList,
  initialIAttendReviewPaymentList,
} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment-list/attend-review-payment-list.models';
import {
  IAttendReviewPaymentDetails,
  initialIAttendReviewPaymentDetails,
} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment-details/attend-review-payment-details.models';

export const TITLE_ATTEND_REVIEW_PAYMENT = 'Atender Revisión';

export interface IAttendReviewPayment {
  title: string;
  isInDetailsView: boolean;
  allowedToDetails: boolean;
  attendReviewPaymentList: IAttendReviewPaymentList;
  attendReviewPaymentDetails: IAttendReviewPaymentDetails;
}

export const initialIAttendReviewPayment = (): IAttendReviewPayment => ({
  title: TITLE_ATTEND_REVIEW_PAYMENT,
  isInDetailsView: false,
  allowedToDetails: false,
  attendReviewPaymentList: initialIAttendReviewPaymentList(),
  attendReviewPaymentDetails: initialIAttendReviewPaymentDetails(),
});
