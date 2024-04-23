/* Store Imports */
import {createAction, props} from '@ngrx/store';

/* Utils Imports */
/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IPorter} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-list/register-arrival-list.models';
import {ExportadorOrdenDespachoObj} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Register-Arrival-List';
const typeApi = 'Register-Arrival-List-Api';

export const CLEAN_ALL_REGISTER_ARRIVAL_LIST = createAction(
  buildingStringActionType(typeReducer, 'Clean All Register Arrival List'),
);
export const SET_SORT_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Sort Option'),
  props<{sort: DropListOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_PORTERS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Porters Load'),
);
export const FETCH_PORTERS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Porters Success'),
  props<{porters: Array<IPorter>}>(),
);
export const FETCH_PORTERS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Porters Failed'),
);
export const FETCH_DONUT_DATA_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Donut Data Load'),
);
export const FETCH_DONUT_DATA_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch  Donut Data Success'),
  props<{donutData: Array<ExportadorOrdenDespachoObj>}>(),
);
export const FETCH_DONUT_DATA_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch  Donut Data Failed'),
);
export const SET_IS_OPEN_PORTER = createAction(
  buildingStringActionType(typeReducer, 'Set Is Open Porter'),
  props<{namePorter: string}>(),
);
