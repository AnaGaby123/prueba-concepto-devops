import {createSelector} from '@ngrx/store';
import {selectPaymentManager} from '@appSelectors/pendings/pendings.selectors';
import {IPaymentManagerState} from '@appModels/store/pendings/payment-manager/payment-manager.models';
import {IPaymentOrder} from '@appModels/store/pendings/payment-manager/payment-order/payment-order.models';

export const selectPaymentOrder = createSelector(
  selectPaymentManager,
  (state: IPaymentManagerState): IPaymentOrder => state.paymentOrder,
);
export const selectTitle = createSelector(
  selectPaymentOrder,
  (state: IPaymentOrder): string => state.title,
);
export const selectWeek = createSelector(
  selectPaymentOrder,
  (state: IPaymentOrder): any => state.week,
);
