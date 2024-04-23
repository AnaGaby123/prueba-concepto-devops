import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  initialIShippingPaidByCustomerList,
  IShippingPaidByCustomerList,
} from '@appModels/store/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer-list/shipping-paid-by-customer-list.models';
import {shippingPaidByCustomerListActions} from '@appActions/pendings/assorting-manager/shipping-paid-by-customer';

export const shippingPaidByCustomerListReducer: ActionReducer<IShippingPaidByCustomerList> = createReducer(
  initialIShippingPaidByCustomerList(),
  on(
    shippingPaidByCustomerListActions.SET_SEARCH_TERM,
    (state: IShippingPaidByCustomerList, {searchTerm}): IShippingPaidByCustomerList => ({
      ...state,
      searchTerm,
    }),
  ),
  on(
    shippingPaidByCustomerListActions.FETCH_CLIENTS_SUCCESS,
    (state: IShippingPaidByCustomerList, {clients}): IShippingPaidByCustomerList => ({
      ...state,
      clients,
    }),
  ),
  on(
    shippingPaidByCustomerListActions.SET_CLIENTS_STATUS,
    (state: IShippingPaidByCustomerList, {clientsStatus}): IShippingPaidByCustomerList => ({
      ...state,
      clientsStatus,
    }),
  ),
);
