import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {IProviderData} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase-list/process-purchase-list.models';
import {TramitarCompraDonas} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Process-Purchase-List';
export const SET_SORT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Sort Selected'),
  props<{typeSort: DropListOption}>(),
);
export const SET_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Selected'),
  props<{tab: ITabOption}>(),
);
export const SET_RANGE_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set Range Date'),
  props<{dateRange: IFilterDate}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_PROVIDERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Providers Load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_PROVIDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Providers Success'),
  props<{data: IProviderData}>(),
);
export const SET_STATUS_API = createAction(
  buildingStringActionType(typeReducer, 'Set Status Api Providers'),
  props<{status: number}>(),
);
export const FETCH_CHARTS_DONUT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Data Donut Of Transit Load'),
);
export const FETCH_CHARTS_DONUT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Data Donut Of Transit Success'),
  props<{data: TramitarCompraDonas}>(),
);
