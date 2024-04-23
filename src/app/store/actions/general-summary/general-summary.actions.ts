import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {QueryResultVEviCotizaciones, QueryResultVEviResumenGeneral} from 'api-logistica';
import {
  ICustomerSummary,
  IDataCustomerSummary,
  IStrategy,
} from '@appModels/store/general-summary/general-summary.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'General-Summary';
export const FETCH_CUSTOMER_GENERAL_SUMMARY_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customer Load'),
);
export const FETCH_CUSTOMER_GENERAL_SUMMARY_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customer Success'),
  props<{data: IDataCustomerSummary}>(),
);
export const FETCH_EVI_LIST_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Evi List Load'),
);
export const FETCH_EVI_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Evi List Success'),
  props<{data: QueryResultVEviCotizaciones}>(),
);
export const FILTER_CONTRACT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Filter Contract Selected'),
  props<{filter: DropListOption}>(),
);
export const FILTER_STATUS_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Filter Status Selected'),
  props<{filter: DropListOption}>(),
);
export const OPTION_EVI_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Filter Evi Selected'),
  props<{option: ITabOption}>(),
);
export const SET_ALL_CLIENTS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set list of all customer load'),
);
export const SET_ALL_CLIENTS = createAction(
  buildingStringActionType(typeReducer, 'Set list of all customer'),
  props<{data: QueryResultVEviResumenGeneral}>(),
);
export const FILTER_CUSTOMER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Filter Customer Selected'),
  props<{filter: DropListOption}>(),
);
export const FETCH_STRATEGIES_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Strategy of Customer Load'),
  props<{customer: ICustomerSummary}>(),
);
export const FETCH_STRATEGIES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Strategy of Customer Success'),
  props<{strategy: IStrategy}>(),
);
export const CUSTOMER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Customer Selected'),
  props<{customer: ICustomerSummary}>(),
);
