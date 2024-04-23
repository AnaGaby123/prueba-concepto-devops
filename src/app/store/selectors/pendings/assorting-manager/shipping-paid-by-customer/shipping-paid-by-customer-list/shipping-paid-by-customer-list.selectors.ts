import {createSelector} from '@ngrx/store';
import {selectShippingPaidByCustomer} from '@appSelectors/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer.selectors';
import {IShippingPaidByCustomer} from '@appModels/store/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer.models';
import {IShippingPaidByCustomerList} from '@appModels/store/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer-list/shipping-paid-by-customer-list.models';

export const selectShippingPaidByCustomerList = createSelector(
  selectShippingPaidByCustomer,
  (state: IShippingPaidByCustomer): IShippingPaidByCustomerList => state.shippingPaidByCustomerList,
);
export const selectSearchTerm = createSelector(
  selectShippingPaidByCustomerList,
  (state: IShippingPaidByCustomerList): string => state.searchTerm,
);
export const selectClients = createSelector(
  selectShippingPaidByCustomerList,
  (state: IShippingPaidByCustomerList): Array<any> => state.clients,
);
export const selectClientsStatus = createSelector(
  selectShippingPaidByCustomerList,
  (state: IShippingPaidByCustomerList): number => state.clientsStatus,
);
