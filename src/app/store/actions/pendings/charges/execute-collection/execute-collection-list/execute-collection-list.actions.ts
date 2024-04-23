import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IChip} from '@appModels/chip/chip';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {CalendarioEjecutarCobranzaPeriodo} from 'api-finanzas';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Execute-Collection-Calendar';
const typeApi = 'Execute-Collection-Calendar-Api';

export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_TAB_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Option Selected'),
  props<{tabSelected: ITabOption}>(),
);
export const SET_CHIP_ACTIVE = createAction(
  buildingStringActionType(typeReducer, 'Set Chip Active'),
  props<{chipActive: IChip}>(),
);
export const SET_CHARGE_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Charge Option Selected'),
  props<{chargeOptionSelected: DropListOption}>(),
);
export const FETCH_COLLECTION_CALENDAR_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch collection calendar Load '),
);
export const FETCH_COLLECTION_CALENDAR_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch collection calendar success'),
  props<{calendarWeek: CalendarioEjecutarCobranzaPeriodo}>(),
);
export const SET_CALENDAR_WEEK = createAction(
  buildingStringActionType(typeReducer, 'Set calendar week'),
  props<{calendarWeek: CalendarioEjecutarCobranzaPeriodo}>(),
);
export const SET_ACTUAL_WEEK = createAction(
  buildingStringActionType(typeReducer, 'Set actual week'),
  props<{actualWeek: Array<string>}>(),
);
export const SET_SELECTED_WEEK = createAction(
  buildingStringActionType(typeReducer, 'Set selected week'),
  props<{value: string}>(),
);
export const SET_DAY_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set day status'),
  props<{dayStatus: number}>(),
);

export const SET_SELECTED_CLIENT_OPTIONS = createAction(
  buildingStringActionType(typeReducer, 'Set client'),
  props<{selectedClientOption: DropListOption}>(),
);

export const SET_SELECTED_PAYMENT_STATUS_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set status payment'),
  props<{selectedPaymentStatusOption: DropListOption}>(),
);

export const SET_SELECTED_TYPE_PAYMENT_OPTIONS = createAction(
  buildingStringActionType(typeReducer, 'Set type payment'),
  props<{selectedTypePaymentOption: DropListOption}>(),
);

export const SET_SELECTED_TYPE_CLIENT_OPTIONS = createAction(
  buildingStringActionType(typeReducer, 'Set type client'),
  props<{selectedTypeClientOption: DropListOption}>(),
);

export const SET_FROM_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set Date'),
  props<{node: string; value: Date | string}>(),
);

export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set Initial State'),
);
