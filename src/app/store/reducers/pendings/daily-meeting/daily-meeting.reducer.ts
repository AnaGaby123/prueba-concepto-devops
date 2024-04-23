import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  DailyMeetingState,
  initialDailyMeetingState,
  TITLE_DAILY_MEETING,
} from '@appModels/store/pendings/daily-meeting/daily-meeting.model';
import {dailyMeetingDashboardReducer} from '@appReducers/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard.reducer';
import {dailyMeetingDetailsReducer} from '@appReducers/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.reducer';
import {dailyMeetingActions} from '@appActions/pendings/daily-meeting';

export const dailyMeetingReducer: ActionReducer<DailyMeetingState> = combineReducers({
  dailyMeetingDashboard: dailyMeetingDashboardReducer,
  dailyMeetingDetails: dailyMeetingDetailsReducer,
  detailsMode: createReducer(
    initialDailyMeetingState().detailsMode,
    on(dailyMeetingActions.SET_DETAILS_MODE, (state: boolean, {detailsMode}) => detailsMode),
  ),
  enableEdit: createReducer(
    initialDailyMeetingState().enableEdit,
    on(dailyMeetingActions.SET_ENABLE_EDIT, (state: boolean, {enableEdit}) => enableEdit),
  ),
  dailyMeetingDetailsComponent: createReducer(
    initialDailyMeetingState().dailyMeetingDetailsComponent,
    on(
      dailyMeetingActions.SET_DETAILS_COMPONENT,
      (state: boolean, {detailsComponent}) => detailsComponent,
    ),
  ),
  title: createReducer(
    TITLE_DAILY_MEETING,
    on(dailyMeetingActions.SET_TITLE, (state: string, {title}) => title),
  ),
});
