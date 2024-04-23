import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {Evi} from '@appModels/store/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard.model';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'DailyMeetingDashboard';
const typeApi = 'DailyMeetingListAPI';

export const INIT_DAILY_MEETING_DASHBOARD_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Init daily meeting dashboard component Effect'),
);
export const CHANGE_LOADING_STATUS = createAction(
  buildingStringActionType(typeApi, 'Loading Status'),
);
export const HANDLE_SET_SELECTED_EVI_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Hanlde set selected client Effect'),
  props<{eviSelected: Evi}>(),
);
export const SET_TAP = createAction(
  buildingStringActionType(typeReducer, 'Set Tab'),
  props<{tab: ITabOption}>(),
);
export const SET_FILTER_BY_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Filter By Type'),
  props<{filter: DropListOption}>(),
);
export const SET_FILTER_BY_DATES = createAction(
  buildingStringActionType(typeReducer, 'Set Filter By Dates'),
  props<{filters: IFilterDate}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_SEARCH_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Search type'),
  props<{searchType: DropListOption}>(),
);
export const FETCH_EVIS_QUOTATIONS_FOR_DAILY_MEETING = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients Quotations For Daily Meeting'),
);
export const FETCH_EVIS_QUOTATIONS_FOR_DAILY_MEETING_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients Quotations For Daily Meeting Failed'),
);
export const FETCH_EVIS_QUOTATIONS_FOR_DAILY_MEETING_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients Quotations For Daily Meeting Success'),
  props<{listEvisDailyMeetings: Array<Evi>}>(),
);
export const CLEAN_ALL_DAILY_MEETING_LIST = createAction(
  buildingStringActionType(typeReducer, 'Clean All Daily Meeting'),
);
