import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  QueryResultVEviCotizaciones,
  QueryResultVEviResumenGeneral,
  VEviResumenGeneral,
} from 'api-logistica';
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_UUID} from '@appUtil/common.protocols';
import {QueryInfo} from 'api-catalogos';
import {initialSummaryInfo} from '@appModels/store/general-summary/general-summary-query-info';

export interface IGeneralSummaryState {
  listEvi: QueryResultVEviCotizaciones;
  option: ITabOption;
  contractFilters: Array<DropListOption>;
  contractFilter: DropListOption;
  stateFilters: Array<DropListOption>;
  stateFilter: DropListOption;
  customerFilter: DropListOption;
  allCustomer: QueryResultVEviResumenGeneral;
  customers: IDataCustomerSummary;
  queryInfo: QueryInfo;
  statusApi: number;
  customerSelected: ICustomerSummary;
}
export const initialIGeneralSummary = (): IGeneralSummaryState => ({
  option: {
    id: DEFAULT_UUID,
    label: 'TODOS LOS EVIS',
    activeSubtitle: false,
  },
  contractFilters: [
    {value: '1', label: 'Todos'},
    {value: '2', label: 'Con Contrato'},
    {value: '3', label: 'Sin Contrato'},
  ],
  contractFilter: {value: '1', label: 'Todos'},
  stateFilters: [
    {value: '1', label: 'Todos'},
    {value: '2', label: 'En Tiempo'},
    {value: '3', label: 'Por Expirar'},
  ],
  stateFilter: {value: '1', label: 'Todos'},
  allCustomer: {Results: [], TotalResults: 0},
  customerFilter: {value: DEFAULT_UUID, label: 'Todos'},
  customers: {Results: [], TotalResults: 0},
  listEvi: {TotalResults: 0, Results: []},
  queryInfo: initialSummaryInfo(),
  statusApi: API_REQUEST_STATUS_DEFAULT,
  customerSelected: {} as ICustomerSummary,
});

// Interface para obtener los clientes con index
export interface IDataCustomerSummary {
  TotalResults: number;
  Results: Array<ICustomerSummary>;
}

export interface ICustomerSummary extends VEviResumenGeneral {
  Index: number;
  strategy: IStrategy;
}

export interface IStrategy {
  idStrategy: string;
  strategy: string;
  tactics: Array<ITactics>;
}

export interface ITactics {
  tactic: string;
  subTactic: string;
  justification: string;
  observations: string;
}

export interface ITacticService {
  ids: string;
  idStrategy: string;
}
