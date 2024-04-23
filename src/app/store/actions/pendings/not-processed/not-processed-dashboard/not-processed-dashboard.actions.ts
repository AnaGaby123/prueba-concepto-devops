import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import * as apiLogistic from 'api-logistica';
import {AttributeDashboard} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';
import {IClientItemForNotProcessed} from '@appModels/store/pendings/not-processed/not-processed-list/not-processed-list.models';

const typeApi = 'Api Not Processed List';
const typeReducer = 'Not Processed List';

export const SET_TAB_OPTIONS = createAction(
  buildingStringActionType(typeReducer, 'Set tab options'),
  props<{tabOptions: ITabOption[]}>(),
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
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set search term'),
  props<{searchTerm: string}>(),
);
export const SET_SEARCH_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set search type'),
  props<{searchType: DropListOption}>(),
);
export const FETCH_CLIENT_LIST = createAction(
  buildingStringActionType(typeReducer, 'Fetch List of Not Processed Client'),
);
export const FETCH_CLIENT_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch List of Not Processed Client Success'),
  props<{clients: Array<IClientItemForNotProcessed>}>(),
);
export const FETCH_DONUT_CHART_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Data of Donut Chart Success'),
  props<{data: apiLogistic.QueryResultPpPedidoIntramitableDonaObj}>(),
);
export const FETCH_TABS_LOAD = createAction(buildingStringActionType(typeApi, 'Fetch tabs load'));
export const FETCH_TABS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch tabs success'),
  props<{tabs: Array<AttributeDashboard>}>(),
);
export const SET_API_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set ai status'),
  props<{status: number}>(),
);
export const CLEAN_DASHBOARD_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean dashboard state'),
);
