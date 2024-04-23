import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {API_REQUEST_STATUS_DEFAULT, HIGHER_VALUE, LOWER_VALUE} from '@appUtil/common.protocols';
import {MonitorearDespachoTotales, VImpMDProveedor} from 'api-logistica';

export interface IDispatchMonitoringList {
  sortList: DropListOption[];
  sortByType: DropListOption;
  searchTerm: string;
  providers: Array<IProvidersDispatchMonitoring>;
  providerStatus: number;
  needsToReloadProviders: boolean;
  dataCharts: MonitorearDespachoTotales;
  dataChartsStatus: number;
  needsToReloadCharts: boolean;
}

export const initialIDispatchMonitoringList = (): IDispatchMonitoringList => ({
  sortList: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  sortByType: {value: '1', label: HIGHER_VALUE},
  searchTerm: '',
  providers: [],
  providerStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadProviders: true,
  dataCharts: {} as MonitorearDespachoTotales,
  dataChartsStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadCharts: true,
});

export interface IProvidersDispatchMonitoring extends VImpMDProveedor {
  Index: number;
}
