import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {Resumen, VClienteppPedidoObj} from 'api-logistica';
import {VCliente} from 'api-catalogos';
import {API_REQUEST_STATUS_DEFAULT, HIGHER_VALUE, LOWER_VALUE} from '@appUtil/common.protocols';
import {IFilterDate} from '@appModels/filters/Filters';
import {PreProcessingStatus} from '@appHelpers/pending/pre-processing/pre-processing.helpers';
import {IImageItem} from '@appModels/shared/shared.models';

export interface IPreprocessOrderDashboardState {
  tabOptions: Array<ITabOption>;
  tapSelected: ITabOption;
  optionsFilter: DropListOption[];
  filterSelected: DropListOption;
  customerList: Array<IListItemForPreProcessing>;
  preProcessingCustomerStatus: number;
  searchTypes: DropListOption[];
  typeSelected: DropListOption;
  termSearch: string;
  filterByDates: IFilterDate;
}

const initialTabsPreProcessOrderDashboard = (): ITabOption[] => [
  {
    id: '1',
    label: PreProcessingStatus.Todos,
    activeSubtitle: true,
    labelSubtitle: 'OC',
    totalSubtitle: 0,
  },
  {
    id: '2',
    label: PreProcessingStatus.ConOC,
    activeSubtitle: true,
    labelSubtitle: 'OC',
    totalSubtitle: 0,
  },
  {
    id: '3',
    label: PreProcessingStatus.SinOC,
    activeSubtitle: true,
    labelSubtitle: 'OC',
    totalSubtitle: 0,
  },
];

const optionsFilterPreprocessOrderDashboard = (): DropListOption[] => [
  {value: '1', label: HIGHER_VALUE},
  {value: '2', label: LOWER_VALUE},
];

const searchTypesPreprocessOrderDashboard = (): DropListOption[] => [
  {label: 'Cliente', value: '1'},
  {label: '#OC', value: '2'},
];
export const initialPreprocessOrderDashboard = (): IPreprocessOrderDashboardState => ({
  tabOptions: initialTabsPreProcessOrderDashboard(),
  tapSelected: initialTabsPreProcessOrderDashboard()[0],
  optionsFilter: optionsFilterPreprocessOrderDashboard(),
  filterSelected: optionsFilterPreprocessOrderDashboard()[0],
  customerList: [],
  preProcessingCustomerStatus: API_REQUEST_STATUS_DEFAULT,
  searchTypes: searchTypesPreprocessOrderDashboard(),
  typeSelected: searchTypesPreprocessOrderDashboard()[0],
  termSearch: '',
  filterByDates: null,
});

export interface DataCustomer {
  TotalResults: number;
  Results: CustomerList[];
}

export interface CustomerList extends VClienteppPedidoObj, VCliente, IImageItem {
  Index?: number;
  level: string;
  imageHover: string;
}

export interface IListItemForPreProcessing extends Resumen {
  ConOrdenDeCompratrue?: number;
  ConOrdenDeCompraInternatrue?: number;
  FechaRegistroRecepcion?: string;
  Index?: number;
  Nombre?: string;
  NumeroPartidasTotal?: number;
  SinOrdenDeCompraPretramitarPedidotrue?: number;
  TotalUSD?: number;
  NumeroPartidasOriginal?: number;
  NumeroPartidasAlternativas?: number;
  NumeroPartidasComplementarias?: number;
  NumeroPartidasPromocion?: number;
  NumeroPartidasAhorro?: number;
  IdCliente: string;
}
