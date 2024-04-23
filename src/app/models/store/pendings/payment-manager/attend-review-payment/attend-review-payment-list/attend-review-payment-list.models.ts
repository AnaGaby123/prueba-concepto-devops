import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface IAttendReviewPaymentList {
  dataByType: Array<DropListOption>;
  filterByType: DropListOption;
  searchTerm: string;
  providers: Array<IProviderAttendReviewPayment>;
}

export interface IProviderAttendReviewPayment {
  isSelected: boolean;
}

export const initialIAttendReviewPaymentList = (): IAttendReviewPaymentList => ({
  dataByType: [
    {value: '1', label: 'Más Nuevas'},
    {value: '2', label: 'Más Antiguas'},
  ],
  filterByType: {value: '1', label: 'Mas Nuevas'},
  searchTerm: '',
  providers: [],
});
