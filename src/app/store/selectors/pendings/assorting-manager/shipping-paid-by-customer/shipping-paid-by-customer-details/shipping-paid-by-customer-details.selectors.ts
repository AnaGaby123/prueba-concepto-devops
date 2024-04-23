import {createSelector} from '@ngrx/store';
import {selectShippingPaidByCustomer} from '@appSelectors/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer.selectors';
import {IShippingPaidByCustomer} from '@appModels/store/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer.models';
import {IShippingPaidByCustomerDetails} from '@appModels/store/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer-details/shipping-paid-by-customer-details.models';

export const selectShippingPaidByCustomerDetails = createSelector(
  selectShippingPaidByCustomer,
  (state: IShippingPaidByCustomer): IShippingPaidByCustomerDetails =>
    state.shippingPaidByCustomerDetails,
);
