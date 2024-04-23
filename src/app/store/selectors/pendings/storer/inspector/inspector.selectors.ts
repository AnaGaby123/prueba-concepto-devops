/* Store Imports */
import {createSelector} from '@ngrx/store';
import {selectStorerState} from '@appSelectors/pendings/pendings.selectors';
import {IInspectorState} from '@appModels/store/pendings/storer/inspector/inspector.models';

export const selectInspector = createSelector(selectStorerState, (state) => state.inspector);
export const selectTitle = createSelector(selectInspector, (state: IInspectorState) => state.title);
export const selectAllowToDetails = createSelector(
  selectInspector,
  (state: IInspectorState) => state.allowedToDetails,
);
export const selectDetailsMode = createSelector(
  selectInspector,
  (state: IInspectorState) => state.detailsMode,
);
