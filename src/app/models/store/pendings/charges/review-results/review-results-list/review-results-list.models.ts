import {API_REQUEST_STATUS_DEFAULT, PAGING_LIMIT} from '@appUtil/common.protocols';
/*Models Imports*/
import {ITabOption} from '@appModels/botonera/botonera-option';
import {Cliente, DatosFacturacionCliente, DireccionClienteDetalle} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  Archivo,
  FccRevisionProgramada,
  ResultadosRevisionTotales,
  VRevisionFactura,
  VUsuario,
} from 'api-finanzas';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {IChip} from '@appModels/chip/chip';

export interface IReviewResultsList {
  queryInfo: IQueryInfoOptions;
  selectedTab: ITabOption;
  customers: Array<Cliente>;
  messengers: Array<VUsuario>;
  selectedReview: DropListOption;
  selectedCustomer: DropListOption;
  selectedMessenger: DropListOption;
  reviews: IReviewsInvoice;
  totals: ResultadosRevisionTotales;
  optionsChip: Array<IChip>;
  activePop: boolean;
  selectedReviewC: IReviewInvoice;
}

export const initialIReviewResultsList = (): IReviewResultsList => ({
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  selectedTab: {
    id: '1',
    label: 'TODAS',
    activeSubtitle: false,
  },
  customers: [],
  messengers: [],
  selectedReview: undefined,
  selectedCustomer: undefined,
  selectedMessenger: undefined,
  reviews: {Results: [], TotalResults: 0},
  totals: {
    Clientes: 0,
    Revisiones: 0,
    Total: 0,
    TotalACobrar: 0,
    TotalConIncidencias: 0,
  },
  optionsChip: [
    {
      value: '1',
      label: 'TOTAL',
      total: null,
      active: false,
      disable: false,
      color: '#008894',
      colorDefault: '#c2c3c9',
    },
    {
      value: '2',
      label: 'A COBRAR',
      total: null,
      active: false,
      disable: false,
      color: '#4ba92b',
      colorDefault: '#c2c3c9',
    },
    {
      value: '3',
      label: 'CON INCIDENCIAS',
      total: null,
      active: false,
      disable: false,
      color: '#d55252',
      colorDefault: '#c2c3c9',
    },
  ],
  activePop: false,
  selectedReviewC: {} as IReviewInvoice,
});

export interface IReviewsInvoice {
  TotalResults: number;
  Results: Array<IReviewInvoice>;
}

export interface IReviewInvoice extends VRevisionFactura {
  Index: number;
  digitalReview: DatosFacturacionCliente;
  addressCustomer: DireccionClienteDetalle;
  evidenceReview: Array<Archivo>;
  evidenceMessenger: Array<Archivo>;
  incidences: Array<FccRevisionProgramada>;
  needToReload: boolean;
  dateFormat: Date;
}
