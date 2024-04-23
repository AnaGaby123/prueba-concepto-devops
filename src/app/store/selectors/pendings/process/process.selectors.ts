import {createSelector} from '@ngrx/store';
import {selectProcess} from '@appSelectors/pendings/pendings.selectors';
import {ProcessState} from '@appModels/store/pendings/process/process.models';

export const selectProcessNode = createSelector(selectProcess, (state: ProcessState) => state);
export const selectTitle = createSelector(selectProcessNode, (state: ProcessState) => state.title);
export const selectIsInDetailsView = createSelector(
  selectProcessNode,
  (state: ProcessState) => state.isInDetailsView,
);
export const selectAllowedToDetails = createSelector(
  selectProcessNode,
  (state: ProcessState) => state.allowedToDetails,
);
