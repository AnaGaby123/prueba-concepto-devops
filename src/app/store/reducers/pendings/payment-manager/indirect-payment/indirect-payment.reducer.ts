import {ActionReducer, createReducer} from '@ngrx/store';
import {
  IIndirectPayment,
  initialIIndirectPayment,
} from '@appModels/store/pendings/payment-manager/indirect-payment/indirect-payment.models';

export const indirectPaymentReducer: ActionReducer<IIndirectPayment> = createReducer({
  ...initialIIndirectPayment(),
});
