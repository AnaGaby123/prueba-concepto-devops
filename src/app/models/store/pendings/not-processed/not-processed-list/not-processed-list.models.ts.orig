import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {IFilterDate} from '@appModels/filters/Filters';
import {Resumen} from 'api-logistica';
import {NotProcessedStatus} from '@appHelpers/pending/not-processed/not-processed.helpers';

export interface NotProcessedDashboardState {
  clients: Array<IClientItemForNotProcessed>;
  tabOptions: Array<ITabOption>;
  selectedTabOption?: ITabOption;
  searchTypes: DropListOption[];
  searchTypeSelected: DropListOption;
  searchTerm: string;
  burgerOptions: Array<DropListOption>;
  selectedBurgerOption?: DropListOption;
  dateRange: IFilterDate;
  apiStatus: number;
}

export interface ISearchOptions {
  searchTerm?: string;
  desiredPage?: number;
  pagingLimit?: number;
  requestStatus?: number;
  dateRange?: IFilterDate;
}

const initialNotProcessedTabsOptionsDashboardState = (): ITabOption[] => [
  {
    id: '1',
    label: NotProcessedStatus.Todo,
    activeSubtitle: true,
    labelSubtitle: 'OC',
    totalSubtitle: 0,
  },
  {
    id: '2',
    label: NotProcessedStatus.ConOC,
    activeSubtitle: true,
    labelSubtitle: 'OC',
    totalSubtitle: 0,
  },
  {
    id: '3',
    label: NotProcessedStatus.SinOC,
    activeSubtitle: true,
    labelSubtitle: 'OC',
    totalSubtitle: 0,
  },
];

const initialNotProcessedBurgerOptionsDashboardState = (): DropListOption[] => [
  {
    value: '1',
    label: 'Todas las FEAS',
  },
  {
    value: '2',
    label: 'FEA a Tiempo',
  },
  {
    value: '3',
    label: 'FEA Fuera de Tiempo',
  },
  {
    value: '4',
    label: 'FEA por Vencer',
  },
  {
    value: '5',
    label: 'Sin FEA',
  },
];

const initialNoProcessedSearchTypesDashboard = (): DropListOption[] => [
  {
    value: 'Nombre',
    label: 'Nombre',
  },
  {
    value: 'OCFolio',
    label: '#OC',
  },
];

export const initialNotProcessedDashboardState = (): NotProcessedDashboardState => ({
  clients: [],
  searchTerm: '',
  searchTypes: initialNoProcessedSearchTypesDashboard(),
  searchTypeSelected: initialNoProcessedSearchTypesDashboard()[0],
  tabOptions: initialNotProcessedTabsOptionsDashboardState(),
  selectedTabOption: initialNotProcessedTabsOptionsDashboardState()[0],
  burgerOptions: initialNotProcessedBurgerOptionsDashboardState(),
  selectedBurgerOption: initialNotProcessedBurgerOptionsDashboardState()[0],
  dateRange: null,
  apiStatus: API_REQUEST_STATUS_DEFAULT,
});

export interface ITotals {
  totalOC: number;
  totalItem: number;
  valueTotal: number;
}

export interface IClientItemForNotProcessed extends Resumen {
  Index?: number;
  SinFEA?: number;
  FEAFueraDeTiempo?: number;
  FEAPorVencer?: number;
  FEAATiempo?: number;
  NumeroPartidasTotal?: number;
  TotalUSD?: number;
  SinOrdenDeCompratrue?: number;
  ConOrdenDeCompratrue?: number;
  Total?: number;
  Nombre?: string;
  IdCliente?: string;
}
