/*MODELS*/
import {ResultCorporates} from '@appModels/store/catalogs/catalogs.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ArchivoDetalle, VCliente} from 'api-catalogos';

import {createAction, props} from '@ngrx/store';
import {IQueryResultVCliente} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = '[Catalogs - Clients] - List';
const typeApi = '[Catalogs - Clients] - Api';

export const CLEAR_CLIENTS_LIST = createAction(
  buildingStringActionType(typeReducer, 'Clear provider list'),
);
export const SET_CLIENTS_FILTER = createAction(
  buildingStringActionType(typeReducer, 'Set clients filter'),
  props<{selectedFilter: DropListOption; filterName: string}>(),
);

export const DOWNLOAD_CSV_CLIENTS_FILE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Download CSV file load'),
);

export const DOWNLOAD_CSV_CLIENTS_FILE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Download CSV file success'),
  props<{csvFile: ArchivoDetalle}>(),
);
export const DOWNLOAD_CSV_CLIENTS_FILE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Download CSV file failed'),
);
export const CLEAN_STATE = createAction(buildingStringActionType(typeReducer, 'Celan state'));

// Acciones de cliente.actions

export const FETCH_CLIENT_FILTER = createAction(
  buildingStringActionType(typeApi, 'Fetch Client Filter'),
);
export const SET_CLIENTS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set client status'),
  props<{clientsStatus: number}>(),
);
export const FETCH_CAT_CLIENTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Cat Clients Failed'),
  props<{error: any}>(),
);
export const FETCH_CAT_CLIENTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Cat Clients Success'),
  props<{response: IQueryResultVCliente}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{
    searchTerm: string;
  }>(),
);
export const FETCH_CLIENT_FILTER_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Client Filter Success'),
  props<{
    incomeLevelOptions: Array<DropListOption>;
    routeOptions: Array<DropListOption>;
    esacOptions: Array<DropListOption>;
    evOptions: Array<DropListOption>;
  }>(),
);
export const FETCH_CAT_CLIENTS = createAction(
  buildingStringActionType(typeApi, 'Fetch Cat Clients'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_CORPORATES = createAction(
  buildingStringActionType(typeApi, 'Fetch Corporates Loading'),
);
export const FETCH_KAY_ACCOUNT = createAction(
  buildingStringActionType(typeApi, 'Fetch kay account'),
);
export const FETCH_CORPORATES_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Corporates Failed'),
);
export const FETCH_CORPORATES_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Corporates Success'),
  props<ResultCorporates>(),
);

export const FETCH_MORE_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more component effect'),
  props<{event: IPageInfo}>(),
);
export const INIT_LIST_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Init list component effect'),
);
export const HANDLE_SHOW_CLIENT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Handle show client component effect'),
  props<{client: VCliente}>(),
);
export const ADD_CLIENT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Add client component effect'),
);
