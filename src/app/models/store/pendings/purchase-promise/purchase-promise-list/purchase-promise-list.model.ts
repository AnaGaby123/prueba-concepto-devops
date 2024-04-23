import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {API_REQUEST_STATUS_DEFAULT, PAGING_LIMIT} from '@appUtil/common.protocols';
import {IFilterDate} from '@appModels/filters/Filters';
import {
  AttributeDashboard,
  DatosFacturacionClienteDetalle,
  QueryResultVClientePromesasDeCompra,
  VClientePromesasDeCompra,
} from 'api-logistica';

export interface IPurchasePromiseList {
  options?: Array<ITabOption>;
  tapSelected: ITabOption;
  dataByType: DropListOption[];
  filterByType: DropListOption;
  clientsOptions: ISearchOptions;
  customerList: ICustomerResults[];
  donutChart: QueryResultVClientePromesasDeCompra;
  isLoadingDonutChart: number;
  listRequestStatus: number;
  tabsRequestStatus?: number;
}

export const initialIPurchasePromiseList = (): IPurchasePromiseList => ({
  options: [
    {
      activeSubtitle: true,
      id: '1',
      label: 'Todos',
      labelSubtitle: 'OC',
      totalSubtitle: 0,
    },
    {
      activeSubtitle: true,
      id: '2',
      label: 'Con OC',
      labelSubtitle: 'OC',
      totalSubtitle: 0,
    },
    {
      activeSubtitle: true,
      id: '3',
      label: 'Sin OC',
      labelSubtitle: 'OC',
      totalSubtitle: 0,
    },
  ],
  tapSelected: {
    id: '1',
    label: 'Todos',
    activeSubtitle: true,
    labelSubtitle: 'OC',
    totalSubtitle: 0,
  },
  dataByType: [
    {value: 'desc', label: 'Más Nuevas'},
    {value: 'asc', label: 'Más Antiguas'},
  ],
  filterByType: {value: 'desc', label: 'Más Nuevas'},
  clientsOptions: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  customerList: [],
  donutChart: {Results: [], TotalResults: 0},
  isLoadingDonutChart: API_REQUEST_STATUS_DEFAULT,
  listRequestStatus: API_REQUEST_STATUS_DEFAULT,
});

export interface ISearchOptions {
  searchTerm?: string;
  desiredPage?: number;
  pageSize?: number;
  requestStatus?: number;
  dateRange?: IFilterDate;
}

export interface ICustomerPromise {
  Results: Array<ICustomerResults>;
  TotalResults: number;
}

const initialICustomerPromise = (): ICustomerPromise => ({
  Results: [],
  TotalResults: 0,
});

export interface ICustomerResults extends VClientePromesasDeCompra, DatosFacturacionClienteDetalle {
  Atributos?: Array<AttributeDashboard>;
  IdCliente: string;
  DescripcionLlave: string;
  Index: number;
  category: string;
  level: string;
  NombreImagen: string;
  imageHover: string;
  IdDireccionCliente: string;
}
