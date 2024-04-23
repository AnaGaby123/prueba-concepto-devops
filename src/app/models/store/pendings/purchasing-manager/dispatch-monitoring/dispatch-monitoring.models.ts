import {
  IDispatchMonitoringList,
  initialIDispatchMonitoringList,
} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list.models';
import {
  IDispatchMonitoringDetails,
  initialDispatchMonitoringDetails,
} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-details/dispatch-monitoring-details.models';

export const TITLE_DISPATCH_MONITORING = 'MONITOR DESPACHO';

export interface IDispatchMonitoring {
  title: string;
  allowedToDetails: boolean;
  isInDetailsView: boolean;
  dispatchMonitoringList: IDispatchMonitoringList;
  dispatchMonitoringDetails: IDispatchMonitoringDetails;
}

export const initialDispatchMonitoring = (): IDispatchMonitoring => ({
  title: TITLE_DISPATCH_MONITORING,
  allowedToDetails: false,
  isInDetailsView: false,
  dispatchMonitoringList: initialIDispatchMonitoringList(),
  dispatchMonitoringDetails: initialDispatchMonitoringDetails(),
});
