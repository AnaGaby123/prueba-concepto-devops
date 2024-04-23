import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProviderAttendReviewPayment} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment-list/attend-review-payment-list.models';

export interface IAttendReviewPaymentDetails {
  selectedProvider: IProviderAttendReviewPayment;
  dataByType: Array<DropListOption>;
  filterByType: DropListOption;
  searchTerm: string;
  bills: Array<IBillAttendReviewPayment>;
  selectedBill: IBillAttendReviewPayment;
}

export interface IBillAttendReviewPayment {
  isSelected: boolean;
}

export const initialIAttendReviewPaymentDetails = (): IAttendReviewPaymentDetails => ({
  selectedProvider: {} as IProviderAttendReviewPayment,
  dataByType: [
    {value: '1', label: 'Más Nuevas'},
    {value: '2', label: 'Más Antiguas'},
  ],
  filterByType: {value: '1', label: 'Mas Nuevas'},
  searchTerm: '',
  bills: [],
  selectedBill: {} as IBillAttendReviewPayment,
});
