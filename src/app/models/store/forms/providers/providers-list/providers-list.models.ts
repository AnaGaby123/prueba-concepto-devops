import {Proveedor, QueryInfo, VProveedor} from 'api-catalogos';
import {
  initialFiltersState,
  ProvidersFormFilter,
} from '@appModels/store/forms/providers/providers-list/providers-form-filter';
import {initialProviderQueryInfo} from '@appModels/store/forms/providers/providers-list/providers-query-info';
import {ALL_VALUE, API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IImageItem} from '@appModels/shared/shared.models';

export interface ProvidersListState {
  filters: Array<ProvidersFormFilter>;
  queryInfo: QueryInfo;
  providersList: QueryResultIVProveedor;
  providersRequestStatus: number;
  searchTerm: string;
  productTypesOptions: Array<DropListOption>;
  customAgentsOptions: Array<DropListOption>;
  providersOptions: Array<DropListOption>;
  regionOptions: Array<DropListOption>;
  buyerOptions: Array<DropListOption>;
  payerOptions: Array<DropListOption>;
  selectedStrategiesOption: DropListOption;
  strategicIsSelected: boolean;
  selectedProductTypesOption: DropListOption;
  selectedCustomAgentsOption: DropListOption;
  selectedProvidersOption: DropListOption;
  selectedRegionOption: DropListOption;
  selectedBuyerOption: DropListOption;
  selectedPayerOption: DropListOption;
}

export interface IVProveedor extends VProveedor, Proveedor, IImageItem {}

export interface QueryResultIVProveedor {
  Results?: Array<IVProveedor>;
  TotalResults?: number;
}

export const initialListProvidersForm = (): ProvidersListState => ({
  filters: initialFiltersState(),
  queryInfo: initialProviderQueryInfo(),
  providersList: {
    Results: [],
    TotalResults: 0,
  },
  providersRequestStatus: API_REQUEST_STATUS_DEFAULT,
  searchTerm: '',
  productTypesOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
  ],
  customAgentsOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
  ],
  providersOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
    {
      value: '2',
      label: 'Habilitados',
    },
    {
      value: '3',
      label: 'Deshabilitados',
    },
  ],
  regionOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
    {
      value: '2',
      label: 'Nacional',
    },
    {
      value: '3',
      label: 'Internacional',
    },
  ],
  buyerOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
  ],
  payerOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
  ],
  selectedStrategiesOption: {
    value: '1',
    label: ALL_VALUE,
  },
  strategicIsSelected: false,
  selectedProductTypesOption: {
    value: '1',
    label: ALL_VALUE,
  },
  selectedCustomAgentsOption: {
    value: '1',
    label: ALL_VALUE,
  },
  selectedProvidersOption: {
    value: '1',
    label: ALL_VALUE,
  },
  selectedRegionOption: {
    value: '1',
    label: ALL_VALUE,
  },
  selectedBuyerOption: {
    value: '1',
    label: ALL_VALUE,
  },
  selectedPayerOption: {
    value: '1',
    label: ALL_VALUE,
  },
});
