import {
  DailyMeetingDashboardState,
  initialDailyMeetingDashboardState,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard.model';
import {createReducer, on} from '@ngrx/store';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {dailyMeetingDashboardActions} from '@appActions/pendings/daily-meeting';

const initialStateDailyMeetingDashboard: DailyMeetingDashboardState = {
  ...initialDailyMeetingDashboardState(),
};

export const dailyMeetingDashboardReducer = createReducer(
  initialStateDailyMeetingDashboard,
  on(
    dailyMeetingDashboardActions.INIT_DAILY_MEETING_DASHBOARD_COMPONENT_EFFECT,
    (state: DailyMeetingDashboardState): DailyMeetingDashboardState => ({
      ...state,
      listDailyMeetingsStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    dailyMeetingDashboardActions.CHANGE_LOADING_STATUS,
    (state: DailyMeetingDashboardState): DailyMeetingDashboardState => ({
      ...state,
      listEvisDailyMeetings: [],
      listDailyMeetingsStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    dailyMeetingDashboardActions.FETCH_EVIS_QUOTATIONS_FOR_DAILY_MEETING_SUCCESS,
    (state: DailyMeetingDashboardState, {listEvisDailyMeetings}): DailyMeetingDashboardState => ({
      ...state,
      listEvisDailyMeetings,
      listDailyMeetingsStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    dailyMeetingDashboardActions.FETCH_EVIS_QUOTATIONS_FOR_DAILY_MEETING_FAILED,
    (state: DailyMeetingDashboardState): DailyMeetingDashboardState => ({
      ...state,
      listEvisDailyMeetings: [],
      listDailyMeetingsStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(
    dailyMeetingDashboardActions.SET_SEARCH_TYPE,
    (state: DailyMeetingDashboardState, {searchType}): DailyMeetingDashboardState => ({
      ...state,
      selectedSearchType: searchType,
    }),
  ),
  on(
    dailyMeetingDashboardActions.SET_SEARCH_TERM,
    (state: DailyMeetingDashboardState, {searchTerm}): DailyMeetingDashboardState => ({
      ...state,
      searchTerm,
    }),
  ),
  on(
    dailyMeetingDashboardActions.SET_FILTER_BY_DATES,
    (state: DailyMeetingDashboardState, {filters}): DailyMeetingDashboardState => ({
      ...state,
      selectedDateFilterOption: filters,
    }),
  ),
  on(
    dailyMeetingDashboardActions.CLEAN_ALL_DAILY_MEETING_LIST,
    (state: DailyMeetingDashboardState): DailyMeetingDashboardState => ({
      ...initialDailyMeetingDashboardState(),
    }),
  ),
  on(
    dailyMeetingDashboardActions.SET_FILTER_BY_TYPE,
    (state: DailyMeetingDashboardState, {filter}): DailyMeetingDashboardState => ({
      ...state,
      selectedTypeFilterOption: filter,
    }),
  ),
);
