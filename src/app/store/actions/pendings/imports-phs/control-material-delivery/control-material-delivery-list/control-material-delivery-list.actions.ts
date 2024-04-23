import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICustomsAgents} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery-list/control-material-delivery-list.models';
import {AsistenteImportacionAcuseReciboGraficaTotales, VGARImportador} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Control-Material-Delivery-List';
export const SET_FILTER_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set filter by order'),
  props<{filter: DropListOption}>(),
);
export const FETCH_CUSTOMS_AGENTS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customs Agents Load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_CUSTOMS_AGENTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customs Agents Success'),
  props<{data: ICustomsAgents}>(),
);
export const FETCH_CUSTOMS_AGENTS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customs Agents Error'),
  props<{error: any}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_TOTALS_AGENT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Totals Agent'),
);
export const FETCH_TOTALS_AGENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Totals Success'),
  props<{totals: AsistenteImportacionAcuseReciboGraficaTotales}>(),
);
export const FETCH_TOTALS_AGENT_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Totals Error'),
  props<{error: any}>(),
);
export const SET_API_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Api Status'),
  props<{status: number}>(),
);
export const FETCH_DONUT_AGENT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Agent Load'),
);
export const FETCH_DONUT_AGENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Agent Success'),
  props<{list: Array<VGARImportador>}>(),
);
export const FETCH_DONUT_AGENT_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Agent Error'),
  props<{error: any}>(),
);
