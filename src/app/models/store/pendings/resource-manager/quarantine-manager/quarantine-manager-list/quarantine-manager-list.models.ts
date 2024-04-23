import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface IQuarantineManagerList {
  searchTerm: string;
  filterOptions: DropListOption[];
  filterSelected: DropListOption;
}

export const initialIQuarantineManagerList = (): IQuarantineManagerList => ({
  searchTerm: '',
  filterOptions: [
    {
      value: '1',
      label: 'Más Nuevos',
    },
    {
      value: '2',
      label: 'Más Antiguos',
    },
  ],
  filterSelected: {value: '1', label: 'Más Nuevos'},
});
