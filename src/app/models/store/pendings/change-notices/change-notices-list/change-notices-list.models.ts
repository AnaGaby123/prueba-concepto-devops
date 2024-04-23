import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {NEWER_VALUE, OLDER_VALUE} from '@appUtil/common.protocols';

export interface IChangeNoticesList {
  dataByType: DropListOption[];
  filterByType: DropListOption;
  tabOptions: Array<ITabOption>;
  selectedTabOption?: ITabOption;
  searchTerm: string;
}

export const initialIChangeNoticesList = (): IChangeNoticesList => ({
  dataByType: [
    {value: '1', label: OLDER_VALUE},
    {value: '2', label: NEWER_VALUE},
  ],
  filterByType: {value: '1', label: OLDER_VALUE},
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
      label: 'Canceladas',
      activeSubtitle: true,
      labelSubtitle: 'Productos',
      totalSubtitle: 15,
    },
    {
      id: '3',
      label: 'Impacto FEE',
      activeSubtitle: true,
      labelSubtitle: 'Productos',
      totalSubtitle: 15,
    },
    {
      id: '4',
      label: 'Backorder',
      activeSubtitle: true,
      labelSubtitle: 'Productos',
      totalSubtitle: 15,
    },
    {
      id: '5',
      label: 'Almacén',
      activeSubtitle: true,
      labelSubtitle: 'Productos',
      totalSubtitle: 15,
    },
  ],
  selectedTabOption: {
    id: '1',
    label: 'Todos',
    activeSubtitle: true,
    labelSubtitle: 'Productos',
    totalSubtitle: 15,
  },
  searchTerm: '',
});
