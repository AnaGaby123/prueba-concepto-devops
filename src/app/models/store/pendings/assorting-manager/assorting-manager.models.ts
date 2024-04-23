/* Models Imports */
import {
  initialIShipping,
  IShipping,
} from '@appModels/store/pendings/assorting-manager/shipping/shipping.models';
import {
  initialIWarehouse,
  IWarehouse,
} from '@appModels/store/pendings/assorting-manager/warehouse/warehouse.models';
import {
  initialIShippingPaidByCustomer,
  IShippingPaidByCustomer,
} from '@appModels/store/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer.models';

export interface IAssortingManager {
  shipping: IShipping;
  warehouse: IWarehouse;
  shippingPaidByCustomer: IShippingPaidByCustomer;
}

export const initialIAssortingManager = (): IAssortingManager => ({
  shipping: initialIShipping(),
  warehouse: initialIWarehouse(),
  shippingPaidByCustomer: initialIShippingPaidByCustomer(),
});
