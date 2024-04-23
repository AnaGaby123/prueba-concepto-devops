import {
  IAttendReviewPayment,
  initialIAttendReviewPayment,
} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment.models';
import {
  IIndirectPayment,
  initialIIndirectPayment,
} from '@appModels/store/pendings/payment-manager/indirect-payment/indirect-payment.models';
import {
  initialIPaymentOrder,
  IPaymentOrder,
} from '@appModels/store/pendings/payment-manager/payment-order/payment-order.models';
import {
  IExecutePayment,
  initialIExecutePayment,
} from '@appModels/store/pendings/payment-manager/execute-payment/execute-payment.models';

export interface IPaymentManagerState {
  attendReviewPayment: IAttendReviewPayment;
  executePayment: IExecutePayment;
  indirectPayment: IIndirectPayment;
  paymentOrder: IPaymentOrder;
}

export const initialIPaymentManagerState = (): IPaymentManagerState => ({
  attendReviewPayment: initialIAttendReviewPayment(),
  executePayment: initialIExecutePayment(),
  indirectPayment: initialIIndirectPayment(),
  paymentOrder: initialIPaymentOrder(),
});
