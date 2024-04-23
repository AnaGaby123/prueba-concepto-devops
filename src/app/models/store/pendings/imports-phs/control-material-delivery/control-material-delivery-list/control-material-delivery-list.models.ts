import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  API_REQUEST_STATUS_DEFAULT,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {AsistenteImportacionAcuseReciboGraficaTotales, VGARImportador} from 'api-logistica';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';

export interface IControlMaterialDeliveryList {
  dataByType: DropListOption[];
  filterByType: DropListOption;
  customsAgents: ICustomsAgents;
  queryInfo: IQueryInfoOptions;
  totals: AsistenteImportacionAcuseReciboGraficaTotales;
  listAgent: Array<VGARImportador>;
}

export const initialIControlMaterialDeliveryList = (): IControlMaterialDeliveryList => ({
  dataByType: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  filterByType: {value: '1', label: HIGHER_VALUE},
  customsAgents: {} as ICustomsAgents,
  queryInfo: {
    searchTerm: null,
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  totals: {} as AsistenteImportacionAcuseReciboGraficaTotales,
  listAgent: [],
});

export interface ICustomsAgents {
  TotalResults: number;
  Results: Array<ICustomAgent>;
}

export interface ICustomAgent extends VGARImportador {
  Index: number;
}
