import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  API_REQUEST_STATUS_DEFAULT,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';
import {GraficasDashboardDeclararArribos} from 'api-logistica';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';

export interface IDeclareTransitArrivalList {
  dataByType: DropListOption[];
  queryInfo: IQueryInfoOptions;
  filterByType: DropListOption;
  optionsTab: Array<ITabOption>;
  selectedTab: ITabOption;

  statusApiDonut: number;
  providers: IDeclareArrivalProvider;
  donutChart: GraficasDashboardDeclararArribos;
  totals: GraficasDashboardDeclararArribos;
}

export const initialIDeclareTransitArrivalList = (): IDeclareTransitArrivalList => ({
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },

  statusApiDonut: API_REQUEST_STATUS_DEFAULT,
  providers: {TotalResults: 0, Results: []},
  donutChart: {},
  totals: {
    Piezas: 0,
    PiezasEnTiempo: 0,
    PiezasFueraDeTiempo: 0,
    PiezasUrgente: 0,
    Proveedores: 0,
  },
  dataByType: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  filterByType: {value: '1', label: HIGHER_VALUE},
  optionsTab: [
    {
      id: '1',
      label: 'Todos',
      activeSubtitle: true,
      labelSubtitle: 'Entregas',
      totalSubtitle: 15,
    },
  ],
  selectedTab: {
    id: '1',
    label: 'Todos',
    activeSubtitle: true,
    labelSubtitle: 'Entregas',
    totalSubtitle: 15,
  },
});

export interface IDeclareArrivalProvider {
  TotalResults: number;
  Results: Array<IProvider>;
}
