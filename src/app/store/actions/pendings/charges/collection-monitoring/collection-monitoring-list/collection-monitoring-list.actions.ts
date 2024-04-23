import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IChip} from '@appModels/chip/chip';
import {CalendarioEjecutarCobranzaPeriodo} from 'api-finanzas';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Collection-Monitoring-List';
const typeApi = 'Collection-Monitoring-List-Api';

export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_SELECTED_TAB_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Tab Option'),
  props<{selectedTabOption: ITabOption}>(),
);
export const SET_ACTIVE_CHIP = createAction(
  buildingStringActionType(typeReducer, 'Set Active Chip'),
  props<{activeChip: IChip}>(),
);
export const SET_CALENDAR_API_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Calendar Api Status'),
  props<{calendarApiStatus: number}>(),
);
export const SET_CURRENT_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set Current Date'),
  props<{currentDate: Date}>(),
);
export const SET_ACTUAL_WEEK = createAction(
  buildingStringActionType(typeReducer, 'Set Actual Week'),
  props<{actualWeek: Array<string>}>(),
);
export const FETCH_CALENDAR_DATA_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Calendar Data Load '),
);
export const FETCH_CALENDAR_DATA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Calendar Data Success'),
  props<{calendarWeek: CalendarioEjecutarCobranzaPeriodo}>(),
);
export const SET_SELECTED_CLIENT_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Client'),
  props<{selectedClientOption: DropListOption}>(),
);
export const SET_SELECTED_COLLECTION_STATUS_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Status Collection'),
  props<{selectedCollectionStatusOption: DropListOption}>(),
);
export const SET_SELECTED_TYPE_COLLECTION_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Type Collection'),
  props<{selectedTypeCollectionOption: DropListOption}>(),
);

export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set Initial State'),
);

export const SET_SELECTED_TYPE_CLIENT_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Type Client'),
  props<{selectedTypeClientOption}>(),
);

export const SET_FROM_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set Date Collection'),
  props<{node: string; value: Date | string}>(),
);
