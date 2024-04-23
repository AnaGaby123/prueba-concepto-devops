/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectPurchasingManager} from '@appSelectors/pendings/pendings.selectors';

/* Models Imports */
import {IPurchasingManagerState} from '@appModels/store/pendings/purchasing-manager/purchasing-manager.models';
import {IDispatchMonitoring} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring.models';

export const selectDispatchMonitoring = createSelector(
  selectPurchasingManager,
  (state: IPurchasingManagerState) => state.dispatchMonitoring,
);

export const selectTitle = createSelector(
  selectDispatchMonitoring,
  (state: IDispatchMonitoring) => state.title,
);
export const selectDispatchMonitoringList = createSelector(
  selectDispatchMonitoring,
  (state: IDispatchMonitoring) => state.dispatchMonitoringList,
);
export const selectDispatchMonitoringDetails = createSelector(
  selectDispatchMonitoring,
  (state: IDispatchMonitoring) => state.dispatchMonitoringDetails,
);
export const selectIsInDetailsView = createSelector(
  selectDispatchMonitoring,
  (state: IDispatchMonitoring) => state.isInDetailsView,
);
export const selectAllowedToDetails = createSelector(
  selectDispatchMonitoring,
  (state: IDispatchMonitoring) => state.allowedToDetails,
);
