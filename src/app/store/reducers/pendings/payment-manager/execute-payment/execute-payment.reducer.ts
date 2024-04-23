import {ActionReducer, combineReducers, createReducer} from '@ngrx/store';

import {
  IExecutePayment,
  TITLE_EXECUTE_PAYMENT,
} from '@appModels/store/pendings/payment-manager/execute-payment/execute-payment.models';

import {executePaymentListReducer} from '@appReducers/pendings/payment-manager/execute-payment/execute-payment-list/execute-payment-list.reducer';

export const executePaymentReducer: ActionReducer<IExecutePayment> = combineReducers({
  title: createReducer(TITLE_EXECUTE_PAYMENT),
  isInDetailsView: createReducer(false),
  allowedToDetails: createReducer(false),
  executePaymentList: executePaymentListReducer,
});
