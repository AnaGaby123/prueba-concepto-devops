import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {TITLE_DECLARE_TRANSIT_ARRIVAL} from '@appModels/store/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival.models';
import {
  initialIShippingPaidByCustomer,
  IShippingPaidByCustomer,
} from '@appModels/store/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer.models';
import {shippingPaidByCustomerDetailsReducer} from '@appReducers/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer-details/shipping-paid-by-customer-details.reducer';
import {shippingPaidByCustomerListReducer} from '@appReducers/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer-list/shipping-paid-by-customer-list.reducer';
import {shippingPaidByCustomerActions} from '@appActions/pendings/assorting-manager/shipping-paid-by-customer';

export const shippingPaidByCustomerReducer: ActionReducer<IShippingPaidByCustomer> = combineReducers(
  {
    title: createReducer(TITLE_DECLARE_TRANSIT_ARRIVAL),
    detailsMode: createReducer(
      initialIShippingPaidByCustomer().detailsMode,
      on(
        shippingPaidByCustomerActions.SET_IS_IN_DETAILS_VIEW,
        (state, {detailsMode}) => detailsMode,
      ),
    ),
    allowToDetails: createReducer(
      initialIShippingPaidByCustomer().allowToDetails,
      on(
        shippingPaidByCustomerActions.SET_ALLOWED_TO_DETAILS,
        (state, {allowToDetails}) => allowToDetails,
      ),
    ),
    shippingPaidByCustomerList: shippingPaidByCustomerListReducer,
    shippingPaidByCustomerDetails: shippingPaidByCustomerDetailsReducer,
  },
  {...initialIShippingPaidByCustomer()},
);
