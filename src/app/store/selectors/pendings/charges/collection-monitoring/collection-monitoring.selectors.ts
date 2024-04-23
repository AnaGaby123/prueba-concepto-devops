import {createSelector} from '@ngrx/store';
import {selectCharges} from '@appSelectors/pendings/pendings.selectors';

export const selectCollectionMonitoring = createSelector(
  selectCharges,
  (state) => state.collectionMonitoring,
);
export const selectTitle = createSelector(selectCollectionMonitoring, (state) => state.title);
export const selectIsDetails = createSelector(
  selectCollectionMonitoring,
  (state) => state.detailsMode,
);
export const selectAllowToDetails = createSelector(
  selectCollectionMonitoring,
  (state) => state.allowToDetails,
);
export const selectCollectionMonitoringList = createSelector(
  selectCollectionMonitoring,
  (state) => state.collectionMonitoringList,
);
export const selectCollectionMonitoringDetails = createSelector(
  selectCollectionMonitoring,
  (state) => state.collectionMonitoringDetails,
);
