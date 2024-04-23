import {
  initialProduct,
  Product,
} from '@appModels/store/quotation/quotation-details/details/sections/offline-product.models';
import {
  ICheckOutQuotation,
  initialCheckOutQuotation,
} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';
import {
  INewClientForm,
  initialNewClientFormState,
} from '@appModels/store/quotation/quotation-details/details/sections/new-customer-quotes.models';

export interface IDetails {
  offlineProduct: Product;
  checkOutQuotation: ICheckOutQuotation;
  newCustomer: INewClientForm;
}

export const initialDetails = (): IDetails => ({
  offlineProduct: initialProduct(),
  checkOutQuotation: initialCheckOutQuotation(),
  newCustomer: initialNewClientFormState(),
});
