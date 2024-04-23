import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {API_REQUEST_STATUS_DEFAULT, PAGING_LIMIT} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {ClienteAtenderRevisionObj} from 'api-finanzas';

export interface IAttendReviewList {
  queryInfo: IQueryInfoOptions;
  selectedOption: ITabOption;
  filters: Array<DropListOption>;
  selectedFilter: DropListOption;
  customers: Array<ICustomerAttend>;
  termSearch: string;
  statusApi: number;
  dataChartCustomer: Array<ClienteAtenderRevisionObj>;
}

export const initialIAttendReviewList = (): IAttendReviewList => ({
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  selectedOption: {
    id: '1',
    label: 'Todos',
    activeSubtitle: true,
    labelSubtitle: 'Revisiones',
    totalSubtitle: 0,
  },
  filters: [
    {value: '1', label: 'Más Nuevas'},
    {value: '2', label: 'Más Antiguas'},
  ],
  selectedFilter: {value: '1', label: 'Más Nuevas'},
  customers: [],
  termSearch: null,
  statusApi: API_REQUEST_STATUS_DEFAULT,
  dataChartCustomer: [],
});

export interface ICustomerAttend extends ClienteAtenderRevisionObj {
  index: number;
}
