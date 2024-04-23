/*Models Import*/
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {
  API_REQUEST_STATUS_DEFAULT,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {TramitarCompraDonas, VProveedorOcPendienteCompra} from 'api-logistica';

export interface IProcessPurchaseList {
  tabSelected: ITabOption;
  queryInfo: IQueryInfoOptions;
  dataByType: DropListOption[];
  filterByType: DropListOption;
  providers: IProviderData;
  dataDonuts: TramitarCompraDonas;
  statusApiDonut: number;
}

export const initialIProcessPurchaseList = (): IProcessPurchaseList => ({
  tabSelected: {
    id: '1',
    label: 'Todas',
    activeSubtitle: true,
    labelSubtitle: 'PZAS',
    totalSubtitle: 41,
  },
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  dataByType: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  filterByType: {value: '1', label: HIGHER_VALUE},
  providers: {Results: [], TotalResults: 0},
  dataDonuts: {},
  statusApiDonut: API_REQUEST_STATUS_DEFAULT,
});

export interface IProviderData {
  Results: Array<IProvider>;
  TotalResults: number;
}

export interface IProvider extends VProveedorOcPendienteCompra {
  Index: number;
}
