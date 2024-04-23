import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';

export interface IShippingDetails {
  // selectedClient: any;
  packingList: Array<IPackingListShipping>;
  packingListStatus: number;
  selectedPackingList: IPackingListShipping;
}

export const initialIShippingDetails = (): IShippingDetails => ({
  // selectedClient: {},
  packingList: [],
  packingListStatus: API_REQUEST_STATUS_DEFAULT,
  selectedPackingList: {} as IPackingListShipping,
});

export interface IPackingListShipping {
  isSelected: boolean;
  IdFCCFolioPagoCliente: string; // Quitar
}
