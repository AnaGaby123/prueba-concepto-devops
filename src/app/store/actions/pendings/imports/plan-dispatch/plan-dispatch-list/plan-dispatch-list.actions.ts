/* Core Imports */
import {createAction, props} from '@ngrx/store';

/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProvider} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.models';
import {DatosGraficaSemaforoEntregaObj} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Plan-Dispatch-List';
const typeApi = 'Plan-dispatch-List-Api';

export const SET_SELECTED_BURGER_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Burger Option'),
  props<{selectedBurgerOption: DropListOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_PROVIDERS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Providers Load'),
);
export const FETCH_PROVIDERS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Providers Failed'),
);
export const FETCH_PROVIDERS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Providers Success'),
  props<{providersList: Array<IProvider>}>(),
);
export const FETCH_BARS_CHART_DATA_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Bars Chart Data Load'),
);
export const FETCH_BARS_CHART_DATA_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Bars Chart Data Failed'),
);
export const FETCH_BARS_CHART_DATA_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Bars Chart Data Success'),
  props<{barsChartData: DatosGraficaSemaforoEntregaObj}>(),
);
