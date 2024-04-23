import {createAction, props} from '@ngrx/store';
/*Models Imports*/
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IDeclareArrivalProvider} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';
import {GraficasDashboardDeclararArribos} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Declare-Transit-Arrival-List-Reducer';
const typeApi = 'Declare-Transit-Arrival-List-Api';
export const SET_FILTER_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set filter by order'),
  props<{filter: DropListOption}>(),
);
export const SET_TERM_SEARCH = createAction(
  buildingStringActionType(typeReducer, 'Set Term Search'),
  props<{searchTerm: string}>(),
);
export const SET_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Option Tab'),
  props<{tab: ITabOption}>(),
);
export const FETCH_PROVIDERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Providers Load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_PROVIDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Providers Success'),
  props<{data: IDeclareArrivalProvider}>(),
);
export const SET_STATUS_API = createAction(
  buildingStringActionType(typeReducer, 'Set Status Api'),
  props<{status: number}>(),
);
export const FETCH_DONUT_CHART_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Chart Load'),
);
export const FETCH_DONUT_CHART_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Chart Success'),
  props<{data: GraficasDashboardDeclararArribos}>(),
);
export const FETCH_TOTALS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Totals Load'),
);
export const FETCH_TOTALS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Totals Success'),
  props<{data: GraficasDashboardDeclararArribos}>(),
);
