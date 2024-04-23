/* Store Imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  IDispatchMonitoring,
  initialDispatchMonitoring,
  TITLE_DISPATCH_MONITORING,
} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring.models';

/* Reducers Imports */
import {dispatchMonitoringListReducer} from '@appReducers/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list.reducer';
import {dispatchMonitoringDetailsReducer} from '@appReducers/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-details/dispatch-monitoring-details.reducer';
import {dispatchMonitoringActions} from '@appActions/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring.dictionaty.actions';

export const dispatchMonitoringReducer: ActionReducer<IDispatchMonitoring> = combineReducers(
  {
    title: createReducer(TITLE_DISPATCH_MONITORING),
    dispatchMonitoringList: dispatchMonitoringListReducer,
    dispatchMonitoringDetails: dispatchMonitoringDetailsReducer,
    allowedToDetails: createReducer(
      initialDispatchMonitoring().allowedToDetails,
      on(
        dispatchMonitoringActions.SET_ALLOWED_TO_DETAILS_VALUE,
        (state, {allowedToDetails}) => allowedToDetails,
      ),
    ),
    isInDetailsView: createReducer(
      initialDispatchMonitoring().isInDetailsView,
      on(
        dispatchMonitoringActions.SET_IS_IN_DETAILS_VIEW,
        (state, {isInDetailsView}) => isInDetailsView,
      ),
    ),
  },
  {...initialDispatchMonitoring()},
);
