import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {API_REQUEST_STATUS_DEFAULT, HIGHER_VALUE, LOWER_VALUE} from '@appUtil/common.protocols';
import {QueryResultVClienteTramitarPedido, VClienteTramitarPedido} from 'api-logistica';
import {checkOutStatus} from '@appHelpers/pending/processing/processing.helpers';

export interface CheckoutListState {
  searchTerm: string;
  options: Array<ITabOption>;
  tapSelected: ITabOption;
  dataByType: DropListOption[];
  filterByType: DropListOption;
  filterByDates: IFilterDate;
  searchTypes: Array<DropListOption>;
  selectedSearchType: DropListOption;
  listOrders: IQueryResultCustomer;
  listOrdersStatus: number;
  donutChart: QueryResultVClienteTramitarPedido;
  donutChartStatus: number;
}

export interface ISearchOptions {
  searchTerm?: string;
  desiredPage?: number;
  pageSize?: number;
  requestStatus?: number;
  dateRange?: IFilterDate;
}

export interface IQueryResultCustomer {
  TotalResults: number;
  Results: Array<ICheckOutDashboardItems>;
}

export interface ICustomerCheckOut extends VClienteTramitarPedido {
  Index: number;
  contacts: [];
}

export const initialCheckoutListState = (): CheckoutListState => ({
  searchTerm: '',
  options: [
    {
      id: '1',
      label: checkOutStatus.Todos,
      activeSubtitle: true,
      labelSubtitle: 'OC',
      totalSubtitle: 0,
    },
    {
      id: '2',
      label: checkOutStatus.OcInterna,
      activeSubtitle: true,
      labelSubtitle: 'OC',
      totalSubtitle: 0,
    },
    {
      id: '3',
      label: checkOutStatus.OcPendiente,
      activeSubtitle: true,
      labelSubtitle: 'OC',
      totalSubtitle: 0,
    },
  ],
  tapSelected: {
    id: '1',
    label: checkOutStatus.Todos,
    activeSubtitle: true,
    labelSubtitle: 'OC',
    totalSubtitle: 0,
  },
  dataByType: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  filterByType: {value: '1', label: HIGHER_VALUE},
  filterByDates: null,
  searchTypes: [
    {
      value: '1',
      label: 'Cliente',
    },
    {
      value: '2',
      label: '#OC',
    },
  ],
  selectedSearchType: {
    value: '1',
    label: 'Cliente',
  },
  listOrders: {TotalResults: 0, Results: []},
  listOrdersStatus: API_REQUEST_STATUS_DEFAULT,
  donutChart: {},
  donutChartStatus: API_REQUEST_STATUS_DEFAULT,
});
export const PROCEDURES_TYPES = {
  editData: 'EditarDatosFacturacion',
  invoiceInAdvance: 'FacturarPorAdelantado',
  delinquentCustomer: 'TramitarPClienteMoroso',
  cancelItem: 'CancelarPartida',
  cancelOrder: 'CancelarPedido',
};

export interface ICheckOutDashboardItems {
  DescripcionLlave?: string;
  IdCliente: string;
  Index: number;
  contacts: [];
  Nombre?: string;
  TipoPartidaOriginal?: number;
  TipoPartidaAhorro?: number;
  TipoPartidaAlternativa?: number;
  TipoPartidaComplementaria?: number;
  TipoPartidaProgramada?: number;
  TotalUSD?: number;
  Total?: number;
  ConOcInterna?: number;
  OcInternaPendientetrue?: number;
  ConOC?: number;
  SinOc?: number;
}

export interface IChekoutListTotals {
  index: number;
  purchaseOrders: number;
  totalValue: number;
}
