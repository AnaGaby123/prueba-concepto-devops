import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface IQuarantineManagerDetails {
  searchOC: string;
  searchTerm: string;
  filterOptions: DropListOption[];
  filterSelected: DropListOption;
}

export const initialIQuarantineManagerDetails = (): IQuarantineManagerDetails => ({
  searchOC: '',
  searchTerm: '',
  filterOptions: [
    {
      value: '1',
      label: 'Más Nuevas',
    },
    {
      value: '2',
      label: 'Más Antiguos',
    },
  ],
  filterSelected: {value: '1', label: 'Más Nuevos'},
});
