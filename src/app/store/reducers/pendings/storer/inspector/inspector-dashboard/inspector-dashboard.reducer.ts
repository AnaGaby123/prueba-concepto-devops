/* Core Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IInspectorDashboard,
  initialIInspectorDashBoard,
} from '@appModels/store/pendings/storer/inspector/inspector-dashboard/inspector-dashboard.models';
import {inspectorDashboardActions} from '@appActions/pendings/storer/inspector';

const initialIInspectorDashboard: IInspectorDashboard = {
  ...initialIInspectorDashBoard(),
};
export const inspectorDashboardReducer: ActionReducer<IInspectorDashboard> = createReducer(
  initialIInspectorDashboard,
  on(inspectorDashboardActions.RESTORE_ALL, (state) => ({
    ...initialIInspectorDashBoard(),
  })),
  on(inspectorDashboardActions.SET_SELECTED_TAB, (state, {tab}) => ({
    ...state,
    selectedTab: tab,
  })),
);
