import {createSelector} from '@ngrx/store';
import {selectDailyMeeting} from '@appSelectors/pendings/pendings.selectors';
import {DailyMeetingState} from '@appModels/store/pendings/daily-meeting/daily-meeting.model';

export const selectDailyMeetingDashboard = createSelector(
  selectDailyMeeting,
  (state: DailyMeetingState) => state.dailyMeetingDashboard,
);
export const selectDailyMeetingDetails = createSelector(
  selectDailyMeeting,
  (state: DailyMeetingState) => state.dailyMeetingDetails,
);
export const selectDetailsMode = createSelector(
  selectDailyMeeting,
  (state: DailyMeetingState) => state.detailsMode,
);
export const selectEnableEdit = createSelector(
  selectDailyMeeting,
  (state: DailyMeetingState) => state.enableEdit,
);
export const selectDailyMeetingDetailsComponent = createSelector(
  selectDailyMeeting,
  (state: DailyMeetingState) => state.dailyMeetingDetailsComponent,
);
export const selectTitle = createSelector(
  selectDailyMeeting,
  (state: DailyMeetingState) => state.title,
);
