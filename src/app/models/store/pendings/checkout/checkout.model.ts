import {
  CheckoutListState,
  initialCheckoutListState,
} from '@appModels/store/pendings/checkout/checkout-list/checkout-list.model';
import {
  CheckoutDetailsState,
  initialCheckoutDetailsState,
} from '@appModels/store/pendings/checkout/checkout-details/checkout-details.model';

export interface CheckoutState {
  checkoutList: CheckoutListState;
  checkoutDetails: CheckoutDetailsState;
  detailsMode: boolean;
  enableEdit: boolean;
  checkoutDetailsComponent: boolean;
  title: string;
}

export const initialCheckoutState = (): CheckoutState => ({
  checkoutList: initialCheckoutListState(),
  checkoutDetails: initialCheckoutDetailsState(),
  detailsMode: false,
  enableEdit: false,
  checkoutDetailsComponent: false,
  title: TITLE_CHECKOUT,
});

export const TITLE_CHECKOUT = 'Tramitar Pedido';
