import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';

export interface IControlSupplierClaimDetails {
  searchTerm: string;
  sortOptions: DropListOption[];
  sortSelected: DropListOption;
  tabOptions: ITabOption[];
  tabSelected: ITabOption;
}

export const initialIControlSupplierClaimDetails = (): IControlSupplierClaimDetails => ({
  searchTerm: '',
  sortOptions: [
    {
      value: '1',
      label: 'Más Nuevas',
    },
    {
      value: '2',
      label: 'Más Antiguos',
    },
  ],
  sortSelected: {value: '1', label: 'Más Nuevos'},
  tabOptions: [
    {
      id: '1',
      label: 'Todos',
      activeSubtitle: true,
      labelSubtitle: 'Productos',
      totalSubtitle: 15,
    },
    {
      id: '2',
      label: 'Fuera de tiempo',
      activeSubtitle: true,
      labelSubtitle: 'Productos',
      totalSubtitle: 15,
    },
    {
      id: '3',
      label: 'Urgente',
      activeSubtitle: true,
      labelSubtitle: 'Productos',
      totalSubtitle: 15,
    },
    {
      id: '4',
      label: 'En tiempo',
      activeSubtitle: true,
      labelSubtitle: 'Productos',
      totalSubtitle: 15,
    },
  ],
  tabSelected: {
    id: '1',
    label: 'Todos',
    activeSubtitle: true,
    labelSubtitle: 'Entregas',
    totalSubtitle: 15,
  },
});
