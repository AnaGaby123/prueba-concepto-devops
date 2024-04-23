import * as importAttendReviewPaymentSelectors from '@appSelectors/pendings/payment-manager/attend-review-payment/attend-review-payment.selectors';
import * as importAttendReviewPaymentListSelectors from '@appSelectors/pendings/payment-manager/attend-review-payment/attend-review-payment-list/attend-review-payment-list.selectors';
import * as importAttendReviewPaymentDetailsSelectors from '@appSelectors/pendings/payment-manager/attend-review-payment/attend-review-payment-details/attend-review-payment-details.selectors';
import * as importIndirectPaymentSelectors from '@appSelectors/pendings/payment-manager/indirect-payment/indirect-payment.selectors';
import * as importExecutePaymentSelectors from '@appSelectors/pendings/payment-manager/execute-payment/execute-payment.selectors';
import * as importExecutePaymentListSelectors from '@appSelectors/pendings/payment-manager/execute-payment/execute-payment.selectors';
import * as importPaymentOrderSelectors from '@appSelectors/pendings/payment-manager/execute-payment/execute-payments-list/execute-payments-list.selectors';
import * as importPlanCollectionSelectors from '@appSelectors/pendings/payment-manager/plan-collection/plan-collection.selectors';

export const attendReviewPaymentSelectors = importAttendReviewPaymentSelectors;
export const attendReviewPaymentListSelectors = importAttendReviewPaymentListSelectors;
export const attendReviewPaymentDetailsSelectors = importAttendReviewPaymentDetailsSelectors;
export const executePaymentSelectors = importExecutePaymentSelectors;
export const executePaymentList = importExecutePaymentListSelectors;
export const indirectPaymentSelectors = importIndirectPaymentSelectors;
export const paymentOrderSelectors = importPaymentOrderSelectors;
export const planCollectionSelectors = importPlanCollectionSelectors;
