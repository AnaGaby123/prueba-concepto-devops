import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  API_REQUEST_STATUS_DEFAULT,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {
  DatosGraficaOrdenDeCompraProveedorObj,
  DatosGraficaOrdenDeCompraTipoEntregaObj,
  VOcProveedor,
} from 'api-logistica';

export interface IManageBackOrderList {
  queryInfo: IQueryInfoOptions;
  dataByType: DropListOption[];
  filterByType: DropListOption;
  dataChartProvider: DatosGraficaOrdenDeCompraProveedorObj;
  statusApiDonut: number;
  providers: IProviders;
  dataChartMonitoring: DatosGraficaOrdenDeCompraTipoEntregaObj;
  typeOptionsSearch: Array<DropListOption>;
  typeOfSearch: DropListOption;
}

export const initialIManageBackOrderList = (): IManageBackOrderList => ({
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
  dataChartProvider: {} as DatosGraficaOrdenDeCompraProveedorObj,
  statusApiDonut: API_REQUEST_STATUS_DEFAULT,
  providers: {TotalResults: 0, Results: []},
  dataChartMonitoring: {} as DatosGraficaOrdenDeCompraTipoEntregaObj,
  typeOptionsSearch: [
    {value: '1', label: 'Proveedor'},
    {value: '2', label: '#OC'},
  ],
  typeOfSearch: {value: '1', label: 'Proveedor'},
});

export interface IProviders {
  TotalResults: number;
  Results: Array<IProvider>;
}

export interface IProvider extends VOcProveedor {
  Index: number;
}
