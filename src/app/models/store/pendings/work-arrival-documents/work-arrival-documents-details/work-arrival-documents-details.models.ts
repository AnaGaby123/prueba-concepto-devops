import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';

export interface IWorkArrivalDocumentsDetails {
  selectedProvider: any;
  products: Array<any>;
  selectedProduct: any;
  searchTerm: string;
  productsStatus: number;
  contact: any;
}

export const initialIWorkArrivalDocumentsDetails = (): IWorkArrivalDocumentsDetails => ({
  selectedProvider: {},
  products: [],
  selectedProduct: {},
  searchTerm: '',
  productsStatus: API_REQUEST_STATUS_DEFAULT,
  contact: {},
});
