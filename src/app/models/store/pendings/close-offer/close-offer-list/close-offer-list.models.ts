import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {API_REQUEST_STATUS_DEFAULT, PAGING_LIMIT} from '@appUtil/common.protocols';
import {IFilterDate} from '@appModels/filters/Filters';
import {
  QueryResultCerrarOfertaGraficaDonaObj,
  Resumen,
  VClienteCotizacionesConfirmadasTotalizadores,
} from 'api-logistica';
import {CloseOfferStatus, CloseOfferTypes} from '@appHelpers/pending/closeOffer/closeOffer.helpers';
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';

export interface CloseOfferListState {
  clients: Array<ClientsListItemForCloseOffer>;
  tabOptions: Array<ITabOption>;
  selectedTabOption?: ITabOption;
  burgerOptions: Array<DropListOption>;
  selectedBurgerOption?: DropListOption;
  searchTypeOptions: DropListOption[];
  selectedSearchTypeOption: DropListOption;
  selectedDateFilterOption: IFilterDate;
  clientsSearchOptions?: ISearchOptions;
  searchTerm: string;
  donutChart: QueryResultCerrarOfertaGraficaDonaObj;
  donutChartStatus: number;
  clientsListRequestStatus: number;
}

export interface ISearchOptions {
  searchTerm?: string;
  desiredPage?: number;
  pageSize?: number;
  pagingLimit?: number;
  requestStatus?: number;
  dateRange?: IFilterDate;
}

export const initialCloseOfferListState = (): CloseOfferListState => ({
  clients: [],
  tabOptions: [
    {
      id: '1',
      label: CloseOfferStatus.Todas,
      activeSubtitle: true,
      labelSubtitle: 'Cotizaciones',
      totalSubtitle: 0,
    },
    {
      id: '2',
      label: CloseOfferStatus.Nueva,
      activeSubtitle: true,
      labelSubtitle: 'Cotizaciones',
      totalSubtitle: 0,
    },
    {
      id: '3',
      label: CloseOfferStatus.EnProgreso,
      activeSubtitle: true,
      labelSubtitle: 'Cotizaciones',
      totalSubtitle: 0,
    },
    {
      id: '4',
      label: CloseOfferStatus.AjusteDeOferta,
      activeSubtitle: true,
      labelSubtitle: 'Cotizaciones',
      totalSubtitle: 0,
    },
  ],
  selectedTabOption: {
    id: '1',
    label: CloseOfferStatus.Todas,
    activeSubtitle: true,
    labelSubtitle: 'Cotizaciones',
    totalSubtitle: 0,
  },
  burgerOptions: [
    {
      value: '1',
      label: CloseOfferTypes.MasNuevas,
    },
    {
      value: '2',
      label: CloseOfferTypes.MasAntiguas,
    },
  ],
  selectedBurgerOption: {
    value: '1',
    label: CloseOfferTypes.MasNuevas,
  },
  searchTypeOptions: [
    {label: 'Cliente', value: 'Nombre'},
    {label: 'Estrategia', value: 'Estrategia'},
  ],
  searchTerm: '',
  selectedSearchTypeOption: {label: 'Cliente', value: 'Nombre'},
  selectedDateFilterOption: null,
  clientsSearchOptions: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    pagingLimit: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  donutChart: {Results: [], TotalResults: 0},
  donutChartStatus: API_REQUEST_STATUS_DEFAULT,
  clientsListRequestStatus: ApiRequestStatus.Default,
});

export interface ICloseOfferCustomer
  extends VClienteCotizacionesConfirmadasTotalizadores,
    ClientsListItemForCloseOffer {
  Index?: number;
  TotalCotizadoUSD?: number;
}

export interface ClientsListItemForCloseOffer extends Resumen {
  EstadoCotizacionAjusteDeOferta?: number;
  EstadoCotizacionEnProgreso?: number;
  EstadoCotizacionEnviada?: number;
  Estrategia?: string;
  IdCliente?: string;
  Index?: number;
  Nombre?: string;
  NumeroPartidas?: number;
  Total?: number;
  TotalCotizado?: number;
  TotalCotizadoUSD?: number;
  IdAjOfEstrategiaCotizacion?: string;
}
