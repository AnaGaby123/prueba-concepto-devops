import {createSelector} from '@ngrx/store';
import {selectStorerState} from '@appSelectors/pendings/pendings.selectors';
import {IStorerState} from '@appModels/store/pendings/storer/storer.models';
import {IInspectorDashboard} from '@appModels/store/pendings/storer/inspector/inspector-dashboard/inspector-dashboard.models';

export const selectInspectorDashboard = createSelector(
  selectStorerState,
  (state: IStorerState) => state.inspector.inspectorDashboard,
);
export const selectTabOptions = createSelector(
  selectInspectorDashboard,
  (state: IInspectorDashboard) => state.tabOptions,
);
export const selectedTab = createSelector(
  selectInspectorDashboard,
  (state: IInspectorDashboard) => state.selectedTab,
);
