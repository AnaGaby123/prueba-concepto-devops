/*  Store Imports */
import {ActionReducer, combineReducers} from '@ngrx/store';

/* Models Imports */
import {
  IAssortingManager,
  initialIAssortingManager,
} from '@appModels/store/pendings/assorting-manager/assorting-manager.models';

/* Reducers Imports */
import {warehouseReducer} from '@appReducers/pendings/assorting-manager/wareouse/warehouse.reducer';
import {shippingReducer} from '@appReducers/pendings/assorting-manager/shipping/shipping.reducer';
import {shippingPaidByCustomerReducer} from '@appReducers/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer.reducer';

export const assortingManagerReducer: ActionReducer<IAssortingManager> = combineReducers(
  {
    shipping: shippingReducer,
    warehouse: warehouseReducer,
    shippingPaidByCustomer: shippingPaidByCustomerReducer,
  },
  {...initialIAssortingManager()},
);
