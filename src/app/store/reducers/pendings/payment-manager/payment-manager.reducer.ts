import {ActionReducer, combineReducers} from '@ngrx/store';
import {
  initialIPaymentManagerState,
  IPaymentManagerState,
} from '@appModels/store/pendings/payment-manager/payment-manager.models';
import {paymentOrderReducer} from '@appReducers/pendings/payment-manager/payment-order/payment-order.reducer';
import {indirectPaymentReducer} from '@appReducers/pendings/payment-manager/indirect-payment/indirect-payment.reducer';
import {executePaymentReducer} from '@appReducers/pendings/payment-manager/execute-payment/execute-payment.reducer';
import {attendReviewPaymentReducer} from '@appReducers/pendings/payment-manager/attend-review-payment/attend-review-payment.reducer';

export const paymentManageReducer: ActionReducer<IPaymentManagerState> = combineReducers(
  {
    attendReviewPayment: attendReviewPaymentReducer,
    executePayment: executePaymentReducer,
    indirectPayment: indirectPaymentReducer,
    paymentOrder: paymentOrderReducer,
  },
  {...initialIPaymentManagerState()},
);
