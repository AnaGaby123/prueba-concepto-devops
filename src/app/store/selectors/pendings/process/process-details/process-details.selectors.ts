import {createSelector} from '@ngrx/store';
import {selectProcessNode} from '@appSelectors/pendings/process/process.selectors';
import {ProcessState} from '@appModels/store/pendings/process/process.models';
import {ProcessDetailsState} from '@appModels/store/pendings/process/process-details/process-details.models';

export const selectProcessDetails = createSelector(
  selectProcessNode,
  (state: ProcessState): ProcessDetailsState => state.processDetails,
);
export const selectClient = createSelector(
  selectProcessDetails,
  (state: ProcessDetailsState) => state.clientSelected,
);
export const selectQuotes = createSelector(
  selectProcessDetails,
  (state: ProcessDetailsState) => state.quotes,
);
