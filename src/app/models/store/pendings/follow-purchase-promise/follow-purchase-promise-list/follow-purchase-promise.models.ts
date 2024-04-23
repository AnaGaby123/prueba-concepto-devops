import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {
  API_REQUEST_STATUS_DEFAULT,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {
  AttributeDashboard,
  ControlarSeguimientoPCDashboardTotales,
  ControlarSeguimientoPromesaDeCompraGraficas,
  VClienteCotizacionesPromesaDeCompra,
} from 'api-logistica';

export interface IFollowPPromiseList {
  customerList: Array<ICustomerFPP>;
  dataByType: DropListOption[];
  dataItems: any;
  datesPurchasePromise: any;
  donutChart: ControlarSeguimientoPromesaDeCompraGraficas;
  filterByType: DropListOption;
  isLoadingList: number;
  dataDonutRequestStatus: number;
  options: Array<ITabOption>;
  queryInfo: ISearchOptions;
  listRequestStatus?: number;
  tabSelected: ITabOption;
  totalTabs?: Array<AttributeDashboard>;
  totals: ControlarSeguimientoPCDashboardTotales;
}

export const initialFollowPPromiseList = (): IFollowPPromiseList => ({
  options: [
    {
      id: '1',
      label: 'Todos',
      activeSubtitle: true,
      labelSubtitle: 'Partidas',
      totalSubtitle: 0,
    },
    {
      id: '2',
      label: 'A TIEMPO',
      activeSubtitle: true,
      labelSubtitle: 'Partidas',
      totalSubtitle: 0,
    },
    {
      id: '3',
      label: 'FUERA DE TIEMPO',
      activeSubtitle: true,
      labelSubtitle: 'Partidas',
      totalSubtitle: 0,
    },
  ],
  tabSelected: {
    id: '1',
    label: 'Todos',
    activeSubtitle: true,
    labelSubtitle: 'Partidas',
    totalSubtitle: 0,
  },
  dataByType: [
    {value: 'desc', label: HIGHER_VALUE},
    {value: 'asc', label: LOWER_VALUE},
  ],
  filterByType: {value: 'desc', label: HIGHER_VALUE},
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  customerList: [],
  donutChart: {ATiempo: 0, FueraDeTiempo: 0, Partidas: {}},
  dataDonutRequestStatus: API_REQUEST_STATUS_DEFAULT,
  totals: {Clientes: 0, Cotizaciones: 0, PartidasEnPC: 0, valorTotalPC: 0},
  dataItems: {TotalRsults: 0, Results: []},
  datesPurchasePromise: {TotalRsults: 0, Results: []},
  isLoadingList: API_REQUEST_STATUS_DEFAULT,
});

export interface ISearchOptions {
  searchTerm: string;
  desiredPage: number;
  pageSize: number;
  requestStatus: number;
  dateRange: IFilterDate;
}

export interface ICustomerFollowP {
  Results: Array<ICustomerFPP>;
  TotalResults: number;
}

export const initialICustomerFollowP = (): ICustomerFollowP => ({
  Results: [],
  TotalResults: 0,
});

export interface ICustomerFPP extends VClienteCotizacionesPromesaDeCompra {
  Index?: number;
  Atributos?: Array<AttributeDashboard>;
  DescripcionLlave?: string;
}
