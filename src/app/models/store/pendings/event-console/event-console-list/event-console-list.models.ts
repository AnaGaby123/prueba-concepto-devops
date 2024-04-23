import {
  ALL_VALUE,
  API_REQUEST_STATUS_DEFAULT,
  LESS_VALUE,
  NEAREST_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
/*Models Imports*/
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface IEventConsoleList {
  queryInfo: IQueryInfoOptions;
  selectedTab: ITabOption;
  orderDateData: Array<DropListOption>;
  filterPriority: Array<DropListOption>;
}

export const initialIEventConsoleList = (): IEventConsoleList => ({
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  selectedTab: {
    id: '0',
    label: 'todas los eventos',
    activeSubtitle: true,
    labelSubtitle: 'eventos',
    totalSubtitle: 10,
  },
  orderDateData: [
    {value: '1', label: NEAREST_VALUE},
    {value: '2', label: LESS_VALUE},
  ],
  filterPriority: [
    {value: '1', label: ALL_VALUE},
    {value: '2', label: 'Normal'},
    {value: '2', label: 'Urgente'},
    {value: '2', label: 'Inaplazable'},
  ],
});
