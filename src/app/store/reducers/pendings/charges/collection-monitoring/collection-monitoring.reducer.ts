import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  ICollectionMonitoring,
  initialICollectionMonitoring,
  TITLE_COLLECTION_MONITORING,
} from '@appModels/store/pendings/charges/collection-monitoring/collection-monitoring.models';
import {collectionMonitoringListReducer} from '@appReducers/pendings/charges/collection-monitoring/collection-monitoring-list/collection-monitoring-list.reducer';
import {collectionMonitoringDetailsReducer} from '@appReducers/pendings/charges/collection-monitoring/collection-monitoring-details/collection-monitoring-details.reducer';
import {collectionMonitoringActions} from '@appActions/pendings/charges/collection-monitoring';

export const collectionMonitoringReducer: ActionReducer<ICollectionMonitoring> = combineReducers(
  {
    title: createReducer(TITLE_COLLECTION_MONITORING),
    allowToDetails: createReducer(
      initialICollectionMonitoring().allowToDetails,
      on(
        collectionMonitoringActions.SET_ALLOWED_TO_DETAILS,
        (state, {allowedToDetails}) => allowedToDetails,
      ),
    ),
    detailsMode: createReducer(
      initialICollectionMonitoring().detailsMode,
      on(
        collectionMonitoringActions.SET_IS_IN_DETAILS_VIEW,
        (state, {isInDetailsView}) => isInDetailsView,
      ),
    ),
    collectionMonitoringList: collectionMonitoringListReducer,
    collectionMonitoringDetails: collectionMonitoringDetailsReducer,
  },
  initialICollectionMonitoring(),
);
