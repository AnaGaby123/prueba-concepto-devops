import {createSelector} from '@ngrx/store';
import {selectStorerState} from '@appSelectors/pendings/pendings.selectors';
import {IStorerState} from '@appModels/store/pendings/storer/storer.models';
import {
  IInspectorDetails,
  IStep2Inspector,
} from '@appModels/store/pendings/storer/inspector/inspector-details/inspector-details.models';
import {find} from 'lodash-es';

import {OptionBar} from '@appModels/options-bar/options-bar';

export const selectInspectorDetails = createSelector(
  selectStorerState,
  (state: IStorerState) => state.inspector.inspectorDetails,
);
export const selectStepOption = createSelector(
  selectInspectorDetails,
  (state: IInspectorDetails) => state.steps,
);
export const selectedStep = createSelector(selectInspectorDetails, (state: IInspectorDetails) =>
  find(state.steps, (o: OptionBar) => o.isSelected),
);
export const selectStep2 = createSelector(
  selectInspectorDetails,
  (state: IInspectorDetails) => state.step2,
);
export const selectedTab = createSelector(
  selectStep2,
  (state: IStep2Inspector) => state.popTabSelected,
);
export const selectStep3 = createSelector(
  selectInspectorDetails,
  (state: IInspectorDetails) => state.step3,
);
