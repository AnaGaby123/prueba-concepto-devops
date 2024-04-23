import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ISearchOptions} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import {
  API_REQUEST_STATUS_DEFAULT,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';

export interface ProcessListState {
  clients: any;
  tabOptions: Array<ITabOption>;
  selectedTabOption?: ITabOption;
  burgerOptions: Array<DropListOption>;
  selectedBurgerOption?: DropListOption;
  clientsSearchOptions?: ISearchOptions;
  donutChart: any;
  donutChartStatus: number;
  barChart: any;
}

export const initialProcessListState = (): ProcessListState => ({
  clients: {TotalResults: 0, Results: []},
  tabOptions: [
    {
      id: '1',
      label: 'TODOS',
      activeSubtitle: true,
      labelSubtitle: 'OC',
      totalSubtitle: 0,
    },
    {
      id: '2',
      label: 'OC TEMPORAL',
      activeSubtitle: true,
      labelSubtitle: 'OC',
      totalSubtitle: 0,
    },
  ],
  selectedTabOption: {
    id: '1',
    label: 'TODOS',
    activeSubtitle: true,
    labelSubtitle: 'OC',
    totalSubtitle: 0,
  },
  burgerOptions: [
    {
      value: '1',
      label: HIGHER_VALUE,
    },
    {
      value: '2',
      label: LOWER_VALUE,
    },
  ],
  selectedBurgerOption: {
    value: '1',
    label: 'Mayor Valor',
  },
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
  barChart: {Nuevas: 0, EnProgreso: 0, AjusteOferta: 0},
});
