/* Store Imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  IInspectorState,
  initialIInspectorState,
  TITLE_INSPECTOR,
} from '@appModels/store/pendings/storer/inspector/inspector.models';
import {inspectorActions} from '@appActions/pendings/storer/inspector';
import {inspectorDashboardReducer} from '@appReducers/pendings/storer/inspector/inspector-dashboard/inspector-dashboard.reducer';
import {inspectorDetailsReducer} from '@appReducers/pendings/storer/inspector/inspector-details/inspector-details.reducer';

export const inspectorReducer: ActionReducer<IInspectorState> = combineReducers({
  title: createReducer(TITLE_INSPECTOR),
  allowedToDetails: createReducer(
    initialIInspectorState().allowedToDetails,
    on(
      inspectorActions.SET_ALLOWED_TO_DETAILS_VALUE,
      (state, {allowedToDetails}) => allowedToDetails,
    ),
  ),
  detailsMode: createReducer(
    initialIInspectorState().detailsMode,
    on(inspectorActions.SET_IS_IN_DETAILS_VIEW, (state, {isInDetailsView}) => isInDetailsView),
  ),
  inspectorDashboard: inspectorDashboardReducer,
  inspectorDetails: inspectorDetailsReducer,
});
