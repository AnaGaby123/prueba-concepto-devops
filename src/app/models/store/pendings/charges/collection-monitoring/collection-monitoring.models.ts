import {
  ICollectionMonitoringList,
  initialICollectionMonitoringList,
} from '@appModels/store/pendings/charges/collection-monitoring/collection-monitoring-list/collection-monitoring-list.models';
import {
  ICollectionMonitoringDetails,
  initialICollectionMonitoringDetails,
} from '@appModels/store/pendings/charges/collection-monitoring/collection-monitoring-details/collection-monitoring-details.models';

export const TITLE_COLLECTION_MONITORING = 'Monitoreo de cobro';

export interface ICollectionMonitoring {
  title: string;
  allowToDetails: boolean;
  detailsMode: boolean;
  collectionMonitoringList: ICollectionMonitoringList;
  collectionMonitoringDetails: ICollectionMonitoringDetails;
}

export const initialICollectionMonitoring = (): ICollectionMonitoring => ({
  title: TITLE_COLLECTION_MONITORING,
  allowToDetails: false,
  detailsMode: false,
  collectionMonitoringList: initialICollectionMonitoringList(),
  collectionMonitoringDetails: initialICollectionMonitoringDetails(),
});
