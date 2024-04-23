import {createSelector} from '@ngrx/store';
import {selectNotProcessed} from '@appSelectors/pendings/pendings.selectors';
import {NotProcessedState} from '@appModels/store/pendings/not-processed/not-processed.models';

export const selectNotProcessedNode = createSelector(
  selectNotProcessed,
  (state: NotProcessedState) => state,
);
export const selectTitle = createSelector(
  selectNotProcessedNode,
  (state: NotProcessedState) => state.title,
);
export const selectIsInDetailsView = createSelector(
  selectNotProcessedNode,
  (state: NotProcessedState) => state.isInDetailsView,
);
export const selectAllowedToDetails = createSelector(
  selectNotProcessedNode,
  (state: NotProcessedState) => state.allowedToDetails,
);
