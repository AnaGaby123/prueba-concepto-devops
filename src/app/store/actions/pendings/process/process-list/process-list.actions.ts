import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'Api Process List';
const typeReducer = 'Process List';

export const GET_CLIENT_LIST_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get client list in Process LOAD'),
  props<{isFirstPage: boolean}>(),
);
export const GET_CLIENT_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get client list in Process SUCCESS'),
  props<{clients: any}>(),
);
export const SET_TAB_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set tab option selected'),
  props<{selectedTabOption: ITabOption}>(),
);
export const SET_BURGER_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set burger option selected'),
  props<{selectedBurgerOption: DropListOption}>(),
);
export const SET_DATE_RANGE_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set date range selected'),
  props<{dateRange: IFilterDate}>(),
);
export const FETCH_DONUNT_CHART_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch data donut chart load'),
);
export const FETCH_DONUNT_CHART_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch data donut chart success'),
  props<{data: any}>(),
);
