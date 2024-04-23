import {createSelector} from '@ngrx/store';
import {selectPaymentManager} from '@appSelectors/pendings/pendings.selectors';
import {IPaymentManagerState} from '@appModels/store/pendings/payment-manager/payment-manager.models';
import {IIndirectPayment} from '@appModels/store/pendings/payment-manager/indirect-payment/indirect-payment.models';

export const selectIndirectPayment = createSelector(
  selectPaymentManager,
  (state: IPaymentManagerState): IIndirectPayment => state.indirectPayment,
);
export const selectTitle = createSelector(
  selectIndirectPayment,
  (state: IIndirectPayment): string => state.title,
);
export const selectSeeResume = createSelector(
  selectIndirectPayment,
  (state: IIndirectPayment): boolean => state.seeResume,
);
