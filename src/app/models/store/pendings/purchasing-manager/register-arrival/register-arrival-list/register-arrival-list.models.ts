/* Common Imports */
import {API_REQUEST_STATUS_DEFAULT, HIGHER_VALUE, LOWER_VALUE} from '@appUtil/common.protocols';

/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ExportadorOrdenDespachoObj} from 'api-logistica';

export interface IRegisterArrivalList {
  sortList: DropListOption[];
  sortByType: DropListOption;
  searchTerm: string;
  porters: Array<IPorter>;
  portersStatus: number;
  needsToReloadPorter: boolean;
  donutData: Array<ExportadorOrdenDespachoObj>;
  donutDataStatus: number;
  needsToReloadDonutData: boolean;
}

export const initialIRegisterArrivalList = (): IRegisterArrivalList => ({
  sortList: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  sortByType: {value: '1', label: HIGHER_VALUE},
  searchTerm: '',
  porters: [],
  portersStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadPorter: true,
  donutData: [],
  donutDataStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadDonutData: true,
});

export interface IPorter extends ExportadorOrdenDespachoObj {
  Index: number;
  isOpen: boolean;
}

export interface ITotalPorters {
  results: number;
  packages: number;
  petitions: number;
  amountTotal: number;
  guides: number;
}
