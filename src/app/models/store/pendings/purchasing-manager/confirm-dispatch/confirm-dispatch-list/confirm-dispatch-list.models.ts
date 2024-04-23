/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {initialOptions} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.models';
import {ImpCDDashBoardGraficasTotales, VImpCDProveedores} from 'api-logistica';

/* Common Imports */
import {API_REQUEST_STATUS_DEFAULT, HIGHER_VALUE, LOWER_VALUE} from '@appUtil/common.protocols';

export interface IConfirmDispatchList {
  searchTerm: string;
  dataByType: Array<DropListOption>;
  filterByType: DropListOption;
  listTypesOfSearch: Array<DropListOption>;
  typeOfSearch: DropListOption;
  providers: Array<IProvidersConfirmDispatch>;
  providersStatus: number;
  needsToReloadProviders: boolean;
  dataCharts: ImpCDDashBoardGraficasTotales;
  dataChartsStatus: number;
  needsToReloadDataCharts: boolean;
}

export const initialIConfirmDispatchList = (): IConfirmDispatchList => ({
  searchTerm: '',
  dataByType: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  filterByType: {value: '1', label: HIGHER_VALUE},
  listTypesOfSearch: initialOptions(),
  typeOfSearch: initialOptions()[0],
  providers: [],
  providersStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadProviders: true,
  dataCharts: {} as ImpCDDashBoardGraficasTotales,
  dataChartsStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadDataCharts: true,
});

export interface IProvidersConfirmDispatch extends VImpCDProveedores {
  Index: number;
}
