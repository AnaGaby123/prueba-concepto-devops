import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {buildingStringActionType} from '@appUtil/strings';
import {IValidateAdjustment} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard.models';

const typeApi = 'Api Validate Adjustment List';
const typeReducer = 'Validate Adjustment List';

export const SET_FILTER_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Filter Option Selected'),
  props<{selectedFilterOption: DropListOption}>(),
);
export const SET_DATE_RANGE_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Date Range Selected'),
  props<{dateRange: IFilterDate}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_CLIENTS_ADJUSTMENT_DASHBOARD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Clients of Adjustment Dashboard'),
);
export const FETCH_CLIENTS_ADJUSTMENT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients of Adjustment Success'),
  props<{listClients: IValidateAdjustment[]}>(),
);
export const FETCH_CLIENTS_ADJUSTMENT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients of Adjustment Failed'),
);
export const SET_SEARCH_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set search type'),
  props<{searchType: DropListOption}>(),
);
export const CLEAN_DASHBOARD_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean dashboard state'),
);
