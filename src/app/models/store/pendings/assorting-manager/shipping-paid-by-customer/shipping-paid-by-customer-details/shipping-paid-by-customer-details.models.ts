import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {IPackingListShipping} from '@appModels/store/pendings/assorting-manager/shipping/shipping-details/shipping-details.models';

export interface IShippingPaidByCustomerDetails {
  selectedClient: any;
  packingList: Array<IPackingListShipping>;
  packingListStatus: number;
  selectedPackingList: IPackingListShipping;
}

export const initialIShippingPaidByCustomerDetails = (): IShippingPaidByCustomerDetails => ({
  selectedClient: {},
  packingList: [],
  packingListStatus: API_REQUEST_STATUS_DEFAULT,
  selectedPackingList: {} as IPackingListShipping,
});
