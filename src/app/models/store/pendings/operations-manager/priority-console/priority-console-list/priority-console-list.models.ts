import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';

export interface IPriorityConsoleList {
  searchTerm: string;
  filterByPriority: DropListOption[];
  filterByType: DropListOption[];
  filterByPrioritySelected: DropListOption;
  filterByTypeSelected: DropListOption;
  tabOptions: Array<ITabOption>;
  tabOptionSelected: ITabOption;
}

export const initialIPriorityConsoleList = (): IPriorityConsoleList => ({
  searchTerm: '',
  filterByPriority: [
    {
      value: '1',
      label: 'Todos',
    },
    {
      value: '2',
      label: 'Por sistema',
    },
    {
      value: '3',
      label: 'Urgencia',
    },
  ],
  filterByType: [
    {value: '1', label: 'Todos'},
    {value: '2', label: 'Embalaje'},
    {value: '3', label: 'Inspección'},
  ],
  filterByPrioritySelected: {value: '1', label: 'Todos'},
  filterByTypeSelected: {value: '1', label: 'Todos'},
  tabOptions: [
    {
      id: '1',
      label: 'TODAS',
      activeSubtitle: true,
      totalSubtitle: 10,
      labelSubtitle: 'Clientes',
    },
    {
      id: '2',
      label: 'NORTE',
      activeSubtitle: true,
      totalSubtitle: 10,
      labelSubtitle: 'Clientes',
    },
    {
      id: '3',
      label: 'SUR',
      activeSubtitle: true,
      totalSubtitle: 10,
      labelSubtitle: 'Clientes',
    },
    {
      id: '4',
      label: 'TOLUCA',
      activeSubtitle: true,
      totalSubtitle: 10,
      labelSubtitle: 'Clientes',
    },
    {
      id: '5',
      label: 'CUERNAVACA',
      activeSubtitle: true,
      totalSubtitle: 10,
      labelSubtitle: 'Clientes',
    },
    {
      id: '6',
      label: 'FORANEO',
      activeSubtitle: true,
      totalSubtitle: 10,
      labelSubtitle: 'Clientes',
    },
  ],
  tabOptionSelected: {
    id: '1',
    label: 'TODAS',
    activeSubtitle: true,
    totalSubtitle: 10,
    labelSubtitle: 'Clientes',
  },
});
