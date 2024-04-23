import {ArchivoDetalle, QueryInfo, VCliente} from 'api-catalogos';
import {
  IClientsFormFilter,
  initialClientFilterState,
} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form-filters.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {initialClientQueryInfo} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form-query-info.models';
import {ALL_VALUE, API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {ResultCorporates} from '@appModels/store/catalogs/catalogs.models';
import {IImageItem} from '@appModels/shared/shared.models';

export interface IClientsListForm {
  filters: Array<IClientsFormFilter>;
  queryInfo: QueryInfo;
  clientsList: IQueryResultVCliente;
  clientsRequestStatus: number;
  corporates: ResultCorporates;
  searchTerm: string;
  incomeLevelOptions: Array<DropListOption>;
  routeOptions: Array<DropListOption>;
  clientsOptions: Array<DropListOption>;
  esacOptions: Array<DropListOption>;
  evOptions: Array<DropListOption>;
  corporativeIsSelected: boolean;
  KeyAccountIsSelected: boolean;
  selectedIncomeLevelOption: DropListOption;
  selectedRouteOption: DropListOption;
  selectedClientsOption: DropListOption;
  selectedEsacOption: DropListOption;
  selectedEvOption: DropListOption;
  csvFile: ArchivoDetalle;
}

export interface IVClient extends VCliente, IImageItem {}

export interface IQueryResultVCliente {
  Results?: Array<IVClient>;
  TotalResults?: number;
}

export const initialStateClientsList = (): IClientsListForm => ({
  filters: initialClientFilterState(),
  queryInfo: initialClientQueryInfo(),
  clientsList: {
    Results: [],
    TotalResults: 0,
  },
  clientsRequestStatus: API_REQUEST_STATUS_DEFAULT,
  corporates: {
    totalCorporates: 0,
    corporatesToShow: [],
    corporatesStatus: API_REQUEST_STATUS_DEFAULT,
    needsToReloadCorporates: true,
  },
  searchTerm: '',
  incomeLevelOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
  ],
  routeOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
  ],
  clientsOptions: [
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
  esacOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
  ],
  evOptions: [
    {
      value: '1',
      label: ALL_VALUE,
    },
  ],
  corporativeIsSelected: false,
  KeyAccountIsSelected: false,
  selectedIncomeLevelOption: {
    value: '1',
    label: ALL_VALUE,
  },
  selectedRouteOption: {
    value: '1',
    label: ALL_VALUE,
  },
  selectedClientsOption: {
    value: '1',
    label: ALL_VALUE,
  },
  selectedEsacOption: {
    value: '1',
    label: ALL_VALUE,
  },

  selectedEvOption: {
    value: '1',
    label: ALL_VALUE,
  },
  csvFile: null,
});
