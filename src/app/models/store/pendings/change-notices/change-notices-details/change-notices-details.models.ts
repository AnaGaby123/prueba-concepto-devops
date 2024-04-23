import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {NEWER_VALUE, OLDER_VALUE} from '@appUtil/common.protocols';

export interface IChangeNoticesDetails {
  selectedClient: any;
  products: Array<any>;
  selectedProduct: any;
  searchTermOptions: Array<DropListOption>;
  selectedSearchTermOption: DropListOption;
  searchTerm: string;
  dataByType: Array<DropListOption>;
  filterByType: DropListOption;
  tabOptions: Array<ITabOption>;
  selectedTabOption?: ITabOption;
  productsStatus?: number;
}

export const initialIChangeNoticesDetails = (): IChangeNoticesDetails => ({
  selectedClient: {},
  products: [],
  selectedProduct: {},
  searchTermOptions: [
    {value: '1', label: 'Producto'},
    {value: '2', label: 'P.I'},
  ],
  selectedSearchTermOption: {value: '1', label: 'Producto'},
  searchTerm: '',
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
});
