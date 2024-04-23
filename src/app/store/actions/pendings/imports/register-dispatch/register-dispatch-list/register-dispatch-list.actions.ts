import {createAction, props} from '@ngrx/store';
import {ICustomsBroken} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-list/register-dispatch-list.models';
import {RegistrarDespachoGraficaTotales} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'RegisterDispatchList';
const typeApi = 'RegisterDispatchListAPI';

export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_CUSTOMS_BROKER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customs Broker Load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_CUSTOMS_BROKER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customs Broker Success'),
  props<{data: ICustomsBroken}>(),
);
export const FETCH_CUSTOMS_BROKER_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customs Broker Error'),
  props<{error: any}>(),
);
export const FETCH_TOTALS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Totals Load'),
);
export const FETCH_TOTALS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Totals Success'),
  props<{totals: RegistrarDespachoGraficaTotales}>(),
);
export const FETCH_TOTALS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Totals Error'),
  props<{error: any}>(),
);
export const SET_SELECTED_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Option'),
  props<{selectedOption: DropListOption}>(),
);
export const SET_STATUS_API = createAction(
  buildingStringActionType(typeReducer, 'Set Status Api'),
  props<{status: number}>(),
);
