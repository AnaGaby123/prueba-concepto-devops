import {
  DailyMeetingDashboardState,
  initialDailyMeetingDashboardState,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard.model';
import {DailyMeetingDetailsState} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.model';
import {initialDailyMeetingDetails} from '@appHelpers/pending/daily-meeting/daily-meeting.helpers';

export interface DailyMeetingState {
  dailyMeetingDashboard: DailyMeetingDashboardState;
  dailyMeetingDetails: DailyMeetingDetailsState;
  detailsMode: boolean;
  enableEdit: boolean;
  dailyMeetingDetailsComponent: boolean;
  title: string;
}

export const initialDailyMeetingState = (): DailyMeetingState => ({
  dailyMeetingDashboard: initialDailyMeetingDashboardState(),
  dailyMeetingDetails: initialDailyMeetingDetails(),
  detailsMode: false,
  enableEdit: false,
  dailyMeetingDetailsComponent: false,
  title: TITLE_DAILY_MEETING,
});

export const TITLE_DAILY_MEETING = 'Junta Diaria';
