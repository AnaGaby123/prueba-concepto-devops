import {
  initialIShippingPaidByCustomerList,
  IShippingPaidByCustomerList,
} from '@appModels/store/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer-list/shipping-paid-by-customer-list.models';
import {
  initialIShippingPaidByCustomerDetails,
  IShippingPaidByCustomerDetails,
} from '@appModels/store/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer-details/shipping-paid-by-customer-details.models';

export const TITLE_SHIPPING_PAID_BY_CUSTOMER = 'TRABAJAR RUTAS · ENVÍO PAGADO POR CLIENTE';

export interface IShippingPaidByCustomer {
  title: string;
  detailsMode: boolean;
  allowToDetails: boolean;
  shippingPaidByCustomerList: IShippingPaidByCustomerList;
  shippingPaidByCustomerDetails: IShippingPaidByCustomerDetails;
}

export const initialIShippingPaidByCustomer = (): IShippingPaidByCustomer => ({
  title: TITLE_SHIPPING_PAID_BY_CUSTOMER,
  detailsMode: false,
  allowToDetails: false,
  shippingPaidByCustomerList: initialIShippingPaidByCustomerList(),
  shippingPaidByCustomerDetails: initialIShippingPaidByCustomerDetails(),
});
