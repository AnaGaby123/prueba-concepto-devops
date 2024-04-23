import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {AttributeDashboard} from 'api-logistica';
import {IListItemForPreProcessing} from '@appModels/store/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'PreProcessOrderDashboardAPI';
const typeReducer = 'PreProcessOrderDashboardReducer';

export const INIT_PRE_PROCESSING_DASHBOARD_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Init Pre Processing Dashboard Component Effect'),
);
export const SET_TAB_FILTER = createAction(
  buildingStringActionType(typeApi, 'Filter tab'),
  props<{tab: ITabOption}>(),
);
export const FETCH_CLIENTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch clients of Pre-Processing Load'),
);
export const FETCH_CLIENTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch clients of Pre-Processing Success'),
  props<{data: Array<IListItemForPreProcessing>}>(),
);
export const FETCH_CLIENTS_ERROR = createAction(
  buildingStringActionType(typeApi, 'Fetch clients of Pre-Processing Error'),
  props<{error: any}>(),
);
export const FETCH_TOTAL_TABS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Obtener Totales de la botonera'),
);
export const FETCH_TOTAL_TABS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Totales de la botonera Guardados'),
  props<{tabs: Array<AttributeDashboard>}>(),
);
export const FETCH_TOTAL_TABS_ERROR = createAction(
  buildingStringActionType(typeApi, 'Error al obtener totales de la botonera'),
  props<{error: any}>(),
);
export const SET_SEARCH_TYPE = createAction(
  buildingStringActionType(typeApi, 'Actualizar el tipo de búsqueda'),
  props<{searchType: DropListOption}>(),
);
export const SET_TERM_SEARCH = createAction(
  buildingStringActionType(typeApi, 'Actualizar termino a buscar'),
  props<{term: string}>(),
);
export const SET_FILTER_DATES = createAction(
  buildingStringActionType(typeApi, 'Actualizar filtrado de fechas'),
  props<{dates: IFilterDate}>(),
);
export const SET_ORDER_TYPE = createAction(
  buildingStringActionType(typeApi, 'Actualizar ordenamiento'),
  props<{order: DropListOption}>(),
);
export const SET_API_STATUS = createAction(
  buildingStringActionType(typeApi, 'Set api status'),
  props<{status: number}>(),
);
export const CLEAN_DATA_DASHBOARD = createAction(
  buildingStringActionType(typeReducer, 'Clean Data Dashboard'),
);
