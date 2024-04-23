import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {
  API_REQUEST_STATUS_DEFAULT,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';

export interface IUploadReceiptList {
  dataByType: DropListOption[];
  filterByType: DropListOption;
  queryInfo: IQueryInfoOptions;
}

export const initialIUploadReceiptList = (): IUploadReceiptList => ({
  dataByType: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  filterByType: {value: '1', label: HIGHER_VALUE},
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
});
