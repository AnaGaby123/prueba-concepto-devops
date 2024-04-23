/* Services Imports */
import * as apiLogistic from 'api-logistica';
import {AttributeDashboard, Resumen} from 'api-logistica';

/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {ITabOption} from '@appModels/botonera/botonera-option';

/* Tools Imports */
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {addRowIndex} from '@appUtil/util';
import {forEach, map as _map} from 'lodash-es';

import {SortOptionsDashboard} from '@appModels/store/utils/utils.model';

export enum StrategyStatus {
  Todas = 'Todas',
  Confirmada = 'Confirmadas',
  Pendiente = 'Pendientes',
  ErrorEnEnvio = 'Error en envio',
}

export enum StrategyStatusApiRequest {
  Confirmadas = 'Confirmada',
  Pendientes = 'Pendiente',
  Errorenenvio = 'ErrorEnEnvio',
}

enum StrategyStatusApiResponse {
  Total = 'Total',
  EstadoCorreoCotizacionConfirmada = 'EstadoCorreoCotizacionConfirmada',
  EstadoCorreoCotizacionPendiente = 'EstadoCorreoCotizacionPendiente',
  EstadoCorreoCotizacionErrorEnEnvio = 'EstadoCorreoCotizacionErrorEnEnvio',
}

export interface StrategyDashboardyState {
  tabOptionsApi?: Array<AttributeDashboard>;
  tabOptions: Array<ITabOption>;
  selectedTabOption: ITabOption;
  typeFilterOptions: DropListOption[];
  selectedTypeFilterOption: DropListOption;
  selectSearchTypes: Array<DropListOption>;
  selectedSearchType: DropListOption;
  activeChart: boolean;
  listStrategies: Array<IStrategyByClient>;
  listStrategiesStatus: number;
  filterByDates: IFilterDate;
  searchTerm: string;
}

export interface IStrategyByClient extends apiLogistic.VClienteCotizaciones, Resumen {
  Cotizaciones: number;
  Index?: number;
  TotalCotizado: number;
  Total: number;
  EstadoCorreoCotizacionConfirmada: number;
  EstadoCorreoCotizacionErrorEnEnvio: number;
  EstadoCorreoCotizacionPendiente: number;
}

export const buildClientsStrategyFromDashboard = (
  clientsList: Array<Resumen>,
): Array<IStrategyByClient> => {
  clientsList = addRowIndex(0, 0, clientsList);
  return _map(clientsList, (o: IStrategyByClient) => {
    const newObject = {...o, IdCliente: o.DescripcionLlave};
    forEach(o.Atributos, (i: AttributeDashboard) => {
      newObject[i.DescriptionField] = i.ValueField;
    });
    return newObject;
  });
};

export const mapStrategyStatusFromApi = {
  [StrategyStatus.Todas]: StrategyStatusApiResponse.Total,
  [StrategyStatus.Confirmada]: StrategyStatusApiResponse.EstadoCorreoCotizacionConfirmada,
  [StrategyStatus.Pendiente]: StrategyStatusApiResponse.EstadoCorreoCotizacionPendiente,
  [StrategyStatus.ErrorEnEnvio]: StrategyStatusApiResponse.EstadoCorreoCotizacionErrorEnEnvio,
};
const initialStrategyListTabOptions = (): Array<ITabOption> => [
  {
    id: '1',
    label: 'Todas',
    activeSubtitle: true,
    labelSubtitle: 'Cotizaciones',
    totalSubtitle: 0,
  },
  {
    id: '2',
    label: 'Confirmadas',
    activeSubtitle: true,
    labelSubtitle: 'Cotizaciones',
    totalSubtitle: 0,
  },
  {
    id: '3',
    label: 'Pendientes',
    activeSubtitle: true,
    labelSubtitle: 'Cotizaciones',
    totalSubtitle: 0,
  },
  {
    id: '4',
    label: 'Error en envio',
    activeSubtitle: true,
    labelSubtitle: 'Cotizaciones',
    totalSubtitle: 0,
  },
];
const initialTypeFilterOptions = (): Array<DropListOption> => [
  {value: '1', label: SortOptionsDashboard.MasNuevas},
  {value: '2', label: SortOptionsDashboard.MasAntiguas},
];
const initialSearchTypesOptions = (): Array<DropListOption> => [
  {
    value: 'Nombre',
    label: 'Cliente',
  },
  {
    value: 'Folio',
    label: 'Cotización',
  },
];
export const initialStrategyDashboardState = (): StrategyDashboardyState => ({
  tabOptions: initialStrategyListTabOptions(),
  selectedTabOption: initialStrategyListTabOptions()[0],
  typeFilterOptions: initialTypeFilterOptions(),
  selectedTypeFilterOption: initialTypeFilterOptions()[0],
  selectSearchTypes: initialSearchTypesOptions(),
  selectedSearchType: initialSearchTypesOptions()[0],
  activeChart: false,
  listStrategies: [],
  listStrategiesStatus: API_REQUEST_STATUS_DEFAULT,
  filterByDates: null,
  searchTerm: '',
});
