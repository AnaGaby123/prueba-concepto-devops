import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';

export interface IShippingPaidByCustomerList {
  clients: Array<any>;
  clientsStatus: number;
  searchTerm: string;
}

export const initialIShippingPaidByCustomerList = (): IShippingPaidByCustomerList => ({
  clients: [],
  clientsStatus: API_REQUEST_STATUS_DEFAULT,
  searchTerm: '',
});
