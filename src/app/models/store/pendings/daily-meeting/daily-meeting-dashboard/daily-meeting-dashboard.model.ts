/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';

/* Tools Imports */
import {API_REQUEST_STATUS_DEFAULT, HIGHER_VALUE, LOWER_VALUE} from '@appUtil/common.protocols';
import * as apiLogistic from 'api-logistica';
import {Resumen} from 'api-logistica';

export interface DailyMeetingDashboardState {
  // tapSelected: ITabOption;
  allowAccessToDetails: boolean;
  typeFilterOptions: DropListOption[];
  selectedTypeFilterOption: DropListOption;
  selectSearchTypes: Array<DropListOption>;
  selectedSearchType: DropListOption;
  activeChart: boolean;
  selectedDateFilterOption: IFilterDate;
  searchTerm: string;
  listEvisDailyMeetings: Array<Evi>;
  listDailyMeetingsStatus: number;
}

export interface Evi extends apiLogistic.VEviCotizaciones, Resumen {
  Index?: number;
  IdUsuario: string;
  IdCliente: number;
  UsuarioTramita: string;
  TotalCotizado?: number;
  IdCotCotizacion: number;
  TotalCotizadoUSD?: number;
}

const initialTypeFilterOptions = (): Array<DropListOption> => [
  {value: '1', label: HIGHER_VALUE},
  {value: '2', label: LOWER_VALUE},
];

const initialSearchTypesOptions = (): Array<DropListOption> => [
  {
    value: 'Folio',
    label: 'Cotización',
  },
  {
    value: 'NombreEvi',
    label: 'EVI',
  },
];

export const initialDailyMeetingDashboardState = (): DailyMeetingDashboardState => ({
  allowAccessToDetails: false,
  typeFilterOptions: initialTypeFilterOptions(),
  selectedTypeFilterOption: initialTypeFilterOptions()[0],
  selectSearchTypes: initialSearchTypesOptions(),
  selectedSearchType: initialSearchTypesOptions()[0],
  activeChart: true,
  selectedDateFilterOption: null,
  searchTerm: '',
  listEvisDailyMeetings: [] as Array<Evi>,
  listDailyMeetingsStatus: API_REQUEST_STATUS_DEFAULT,
});
