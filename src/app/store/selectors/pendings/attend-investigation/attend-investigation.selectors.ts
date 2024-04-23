import {createSelector} from '@ngrx/store';
import {selectAttendInvestigation} from '@appSelectors/pendings/pendings.selectors';

export const selectAttendInvestigationList = createSelector(
  selectAttendInvestigation,
  (state) => state.attendInvestigationList,
);

export const selectAttendInvestigationDetails = createSelector(
  selectAttendInvestigation,
  (state) => state.attendInvestigationDetails,
);

export const selectTitle = createSelector(selectAttendInvestigation, (state) => state.title);

export const selectDetailsMode = createSelector(
  selectAttendInvestigation,
  (state) => state.detailsMode,
);

export const selectAllowToDetails = createSelector(
  selectAttendInvestigation,
  (state) => state.allowToDetails,
);
