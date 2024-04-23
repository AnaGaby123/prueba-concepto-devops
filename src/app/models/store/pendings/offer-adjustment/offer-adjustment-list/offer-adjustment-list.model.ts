/* Models Imports */
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';

/* Tools Imports */
import {
  API_REQUEST_STATUS_DEFAULT,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
/*Models*/
import {
  AttributeDashboard,
  CotCotizacionAjusteOfertaObj,
  QueryResultVClienteCotizacionAjusteOferta,
  QueryResultVMarcaPartidaAjusteOferta,
  TotalAjustesPorTipoObj,
  TotalClientesCotizacionesObj,
  TotalClientesPorTipoAjusteDeOfertaObj,
  TotalPartidasPorTipoObj,
  VEVIcotizacionesAjusteOferta,
} from 'api-logistica';

export interface OfferAdjustmentListState {
  tabSelected: ITabOption;
  dataByType: DropListOption[];
  filterByType: DropListOption;
  filterByDates: IFilterDate;
  searchTerm: string;
  searchTypes: Array<DropListOption>;
  typeSelected: DropListOption;
  isLoading: boolean;
  users: IEvisOffer;
  listUsersStatus: number;
  dataCharts: any;
  clientsOptions: ISearchOptions;
  trademarks: QueryResultVMarcaPartidaAjusteOferta;
  isLoadingTrademark: number;
  customers: QueryResultVClienteCotizacionAjusteOferta;
  isLoadingCustomers: number;
  adjustmentsTotals: TotalAjustesPorTipoObj;
  totals: TotalClientesPorTipoAjusteDeOfertaObj;
  totalAmounts: TotalClientesCotizacionesObj;
  chartItems: TotalPartidasPorTipoObj;
  offerAdjustments: IOfferAdjustment[];
  options: Array<ITabOption>;
  dashboardApiStatus: number;
}

export const initialOfferAdjustmentListState = (): OfferAdjustmentListState => ({
  tabSelected: {
    id: '1',
    label: 'Todos',
    activeSubtitle: true,
    labelSubtitle: 'Clientes',
    totalSubtitle: 41,
  },
  dataByType: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  filterByType: {value: '1', label: HIGHER_VALUE},
  filterByDates: null,
  searchTerm: '',
  searchTypes: [
    {label: '# Cotización', value: '1'},
    {label: 'Nombre', value: '2'},
  ],
  isLoading: false,
  typeSelected: {label: '# Cotización', value: '1'},
  listUsersStatus: API_REQUEST_STATUS_DEFAULT,
  dataCharts: {} as any,
  clientsOptions: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  users: initialIEvisOffer(),
  trademarks: {TotalResults: 0, Results: []},
  isLoadingTrademark: API_REQUEST_STATUS_DEFAULT,
  customers: {TotalResults: 0, Results: []},
  isLoadingCustomers: API_REQUEST_STATUS_DEFAULT,
  adjustmentsTotals: {
    TotalAjustesCondicionesDePago: 0,
    TotalAjustesPrecio: 0,
    TotalAjustesTiempoEntrega: 0,
  },
  totals: {
    TotalClientesAjusteCondicionesDePago: 0,
    TotalClientesAjustePrecio: 0,
    TotalClientesAjusteTiempoEntrega: 0,
  },
  totalAmounts: {
    TotalClientes: 0,
    TotalCotizacionesEnAjusteDeOferta: 0,
    ValorTotalEnAjusteDeOferta: 0,
  },
  chartItems: {
    TotalPartidasAhorro: 0,
    TotalPartidasAlternativas: 0,
    TotalPartidasComplementarias: 0,
    TotalPartidasOriginales: 0,
    TotalPartidasPromocion: 0,
  },
  offerAdjustments: [],
  options: [
    {
      id: '1',
      label: 'Todos',
      activeSubtitle: true,
      labelSubtitle: 'Clientes',
      totalSubtitle: 0,
    },
    {
      id: '2',
      label: 'T.Entrega',
      activeSubtitle: true,
      labelSubtitle: 'Clientes',
      totalSubtitle: 0,
    },
    {
      id: '3',
      label: 'C.Pago',
      activeSubtitle: true,
      labelSubtitle: 'Clientes',
      totalSubtitle: 0,
    },
    {
      id: '4',
      label: 'Precio',
      activeSubtitle: true,
      labelSubtitle: 'Clientes',
      totalSubtitle: 0,
    },
  ],
  dashboardApiStatus: ApiRequestStatus.Default,
});

export interface ISearchOptions {
  searchTerm?: string;
  desiredPage?: number;
  pageSize?: number;
  requestStatus?: number;
  dateRange?: IFilterDate;
}

export interface IEvisOffer {
  Results: Array<IEvisResults>;
  TotalResults: number;
}

const initialIEvisOffer = (): IEvisOffer => ({
  Results: [],
  TotalResults: 0,
});

export interface IEvisResults extends VEVIcotizacionesAjusteOferta {
  Index: number;
}
export interface IOfferAdjustment extends CotCotizacionAjusteOfertaObj {
  Index?: number;
  Atributos?: Array<AttributeDashboard>;
  DescripcionLlave?: string;
  IdCotCotizacion?: number;
}
