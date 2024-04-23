import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {API_REQUEST_STATUS_DEFAULT, HIGHER_VALUE, LOWER_VALUE} from '@appUtil/common.protocols';
import {IFilterDate} from '@appModels/filters/Filters';
import {Resumen} from 'api-logistica';

export interface ValidateAdjustmentDashboardState {
  listClients: Array<IValidateAdjustment>;
  typeFiltersOptions: Array<DropListOption>;
  selectedFilterOption: DropListOption;
  searchTypes: Array<DropListOption>;
  selectedSearchType: DropListOption;
  filtersDate: IFilterDate;
  listClientsApiStatus: number;
  searchTerm: string;
}

export interface IValidateAdjustment extends Resumen {
  Index?: number;
  IdCliente?: string;
  Nombre?: string;
  NumeroConOrdenDeCompra?: number;
  NumeroSinOrdenDeCompra?: number;
  TotalMXN?: number;
  TotalUSD?: number;
  FechaRegistro?: Date;
  NumeroPartidas?: number;
  POriginales?: number;
  PAlternativas?: number;
  PComplementarias?: number;
  PPromocion?: number;
  PAhorro?: number;
}

interface SearchTypeOptions {
  label: string;
  value: string;
}

const initialTypeFilterOptions = (): Array<DropListOption> => [
  {
    value: '1',
    label: HIGHER_VALUE,
  },
  {
    value: '2',
    label: LOWER_VALUE,
  },
];
const initialSearchTypes = (): Array<DropListOption> => [
  {label: 'Cliente', value: '1'},
  {label: '#OC', value: '2'},
];
export const initialValidateAdjustmentDashboardState = (): ValidateAdjustmentDashboardState => ({
  listClientsApiStatus: API_REQUEST_STATUS_DEFAULT,
  listClients: [],
  typeFiltersOptions: initialTypeFilterOptions(),
  selectedFilterOption: initialTypeFilterOptions()[0],
  searchTerm: '',
  filtersDate: null,
  searchTypes: initialSearchTypes(),
  selectedSearchType: initialSearchTypes()[0],
});

export interface ITotals {
  totalOC: number;
  totalItem: number;
  valueTotal: number;
}
