import {
  API_REQUEST_STATUS_DEFAULT,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
/*Models Imports*/
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {GraficasDashboardDeclararArribos, VOcProveedorDeclararArribo} from 'api-logistica';

export interface IDeclareArrivalList {
  tabSelected: ITabOption;
  queryInfo: IQueryInfoOptions;
  dataByType: DropListOption[];
  filterByType: DropListOption;
  charts: any;
  statusApiDonut: number;
  providers: IDeclareArrivalProvider;
  donutChart: Array<VOcProveedorDeclararArribo>;
  totals: GraficasDashboardDeclararArribos;
}

export const initialIDeclareArrivalList = (): IDeclareArrivalList => ({
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
  charts: {},
  statusApiDonut: API_REQUEST_STATUS_DEFAULT,
  providers: {TotalResults: 0, Results: []},
  donutChart: [],
  totals: {
    Piezas: 0,
    PiezasEnTiempo: 0,
    PiezasFueraDeTiempo: 0,
    PiezasUrgente: 0,
    Proveedores: 0,
  },
});

export interface IDeclareArrivalProvider {
  TotalResults: number;
  Results: Array<IProvider>;
}

export interface IProvider extends VOcProveedorDeclararArribo {
  Index: number;
}
