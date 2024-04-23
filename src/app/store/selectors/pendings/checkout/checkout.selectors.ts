import {createSelector} from '@ngrx/store';
import {selectCheckout} from '@appSelectors/pendings/pendings.selectors';
import {CheckoutState} from '@appModels/store/pendings/checkout/checkout.model';

export const selectCheckoutList = createSelector(
  selectCheckout,
  (state: CheckoutState) => state.checkoutList,
);
export const selectCheckoutDetails = createSelector(
  selectCheckout,
  (state: CheckoutState) => state.checkoutDetails,
);
export const selectDetailsMode = createSelector(
  selectCheckout,
  (state: CheckoutState) => state.detailsMode,
);
export const selectEnableEdit = createSelector(
  selectCheckout,
  (state: CheckoutState) => state.enableEdit,
);
export const selectCheckoutDetailsComponent = createSelector(
  selectCheckout,
  (state: CheckoutState) => state.checkoutDetailsComponent,
);
export const selectTitle = createSelector(selectCheckout, (state: CheckoutState) => state.title);
