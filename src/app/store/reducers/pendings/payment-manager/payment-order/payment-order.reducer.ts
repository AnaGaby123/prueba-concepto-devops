import {ActionReducer, createReducer} from '@ngrx/store';
import {
  initialIPaymentOrder,
  IPaymentOrder,
} from '@appModels/store/pendings/payment-manager/payment-order/payment-order.models';

export const paymentOrderReducer: ActionReducer<IPaymentOrder> = createReducer({
  ...initialIPaymentOrder(),
});
