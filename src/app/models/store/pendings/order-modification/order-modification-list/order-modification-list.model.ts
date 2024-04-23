import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {API_REQUEST_STATUS_DEFAULT, PAGING_LIMIT} from '@appUtil/common.protocols';

import {
  TotalesIncidenciaPedidoModificacionObj,
  VClienteModificacionPedido,
  VClienteTramitarPedido,
} from 'api-logistica';

export interface IOrderModificationList {
  tabSelected: ITabOption;
  dataByType: DropListOption[];
  filterByType: DropListOption;
  queryInfo: ISearchOptions;
  customers: ICustomerOrderM;
  totals: TotalesIncidenciaPedidoModificacionObj;
  totalsStatus: number;
  totalsNeedsToReload: boolean;
  barchart?: IBarChartOM;
  doughnutChart: IDoughnutChartOM;
}

export const initialIOrderModificationList = (): IOrderModificationList => ({
  tabSelected: {
    id: '1',
    label: 'Todos los pedidos',
    activeSubtitle: true,
    labelSubtitle: 'Pedidos',
    totalSubtitle: 0,
  },
  dataByType: [
    {value: '1', label: 'Más Nuevos'},
    {value: '2', label: 'Más Antiguos'},
  ],
  filterByType: {value: '1', label: 'Mayor Nuevos'},
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  customers: initialICustomerOrderM(),
  totals: {
    TotalPedidos: 10,
    TotalPedidosConIncidencias: 6,
    TotalPedidosSinIncidencias: 4,
    ValorTotal: 90000,
    ValorTotalPedidosConIncidencias: 70000,
    ValorTotalPedidosSinIncidencias: 20000,
  },
  totalsStatus: API_REQUEST_STATUS_DEFAULT,
  totalsNeedsToReload: true,
  doughnutChart: {
    customers: [],
    Clientes: 0,
    TotalPedidos: 0,
    ValorTotal: 0,
  },
});

export interface ISearchOptions {
  searchTerm: string;
  desiredPage: number;
  pageSize: number;
  requestStatus: number;
  dateRange: IFilterDate;
}

export interface ICustomerOrderM {
  Results: Array<ICustomerResults>;
  TotalResults: number;
}

const initialICustomerOrderM = (): ICustomerOrderM => ({
  Results: [],
  TotalResults: 0,
});

export interface ICustomerResults extends VClienteModificacionPedido {
  Index: number;
}

export interface ICustomerOrderModification extends VClienteTramitarPedido {
  Index: number;
  contacts: [];
}

export interface IBarChartOM {
  TotalPedidosConIncidencias: number;
  TotalPedidosSinIncidencias: number;
}

export interface IDoughnutChartOM {
  customers: Array<VClienteModificacionPedido>;
  Clientes: number;
  TotalPedidos: number;
  ValorTotal: number;
}
