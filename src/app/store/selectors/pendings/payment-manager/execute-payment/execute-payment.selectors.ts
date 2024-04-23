import {createSelector} from '@ngrx/store';
import {selectPaymentManager} from '@appSelectors/pendings/pendings.selectors';
import {IPaymentManagerState} from '@appModels/store/pendings/payment-manager/payment-manager.models';
import {IExecutePayment} from '@appModels/store/pendings/payment-manager/execute-payment/execute-payment.models';

export const selectExecutePayment = createSelector(
  selectPaymentManager,
  (state: IPaymentManagerState): IExecutePayment => state.executePayment,
);
export const selectTitle = createSelector(
  selectExecutePayment,
  (state: IExecutePayment): string => state.title,
);

export const selectIsInDetailsView = createSelector(
  selectExecutePayment,
  (state: IExecutePayment): boolean => state.isInDetailsView,
);

export const selectAllowedToDetails = createSelector(
  selectExecutePayment,
  (state: IExecutePayment): boolean => state.allowedToDetails,
);
