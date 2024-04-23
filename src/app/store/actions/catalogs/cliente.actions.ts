import {createAction, props} from '@ngrx/store';
import {QueryInfo, QueryResultVCliente} from 'api-catalogos';
import {ClientFilter} from '@appModels/filters/ClientFilter';
import {ResultCorporates} from '@appModels/store/catalogs/catalogs.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const FETCH_CAT_CLIENTS = createAction(
  '[API] Fetch Cat Clients',
  props<{isFirstPage: boolean}>(),
);
export const FETCH_CAT_CLIENTS_FAILED = createAction(
  '[API] Fetch Cat Clients Failed',
  props<{error: any}>(),
);
export const FETCH_CAT_CLIENTS_SUCCESS = createAction(
  '[API] Fetch Cat Clients Success',
  props<{response: QueryResultVCliente; currentPage: number}>(),
);
export const FETCH_CLIENT_FILTER = createAction('[API] Fetch Client Filter');
export const FETCH_CLIENT_FILTER_ERROR = createAction(
  '[API] Fetch Client Filter Failed',
  props<{error: any}>(),
);
export const FETCH_CLIENT_FILTER_SUCCESS = createAction(
  '[API] Fetch Client Filter Success',
  props<{
    incomeLevelOptions: Array<DropListOption>;
    routeOptions: Array<DropListOption>;
    esacOptions: Array<DropListOption>;
    evOptions: Array<DropListOption>;
  }>(),
);
export const FETCH_CORPORATES = createAction('[API] Fetch Corporates Loading');
export const FETCH_CORPORATES_FAILED = createAction('[API] Fetch Corporates Failed');
export const FETCH_CORPORATES_SUCCESS = createAction(
  '[API] Fetch Corporates Success',
  props<ResultCorporates>(),
);
export const FETCH_DROP_LIST_FOR_CUSTOMER_SUCCESS = createAction(
  '[API] Fetch DropList For Customer Success',
  props<{payload: any}>(),
);
export const FETCH_DROP_LIST_FOR_CUSTOMER_ERROR = createAction(
  '[API] Fetch DropList For Customer Error',
  props<{error: any}>(),
);
export const GET_SAVE_CUSTOMER_LOAD = createAction(
  '[API] Load SaveCustomer',
  props<{payload: any}>(),
);
export const GET_SAVE_CUSTOMER_SUCCESS = createAction(
  '[API] SaveCustomer Loaded Success',
  props<{payload: any}>(),
);
export const GET_SAVE_CUSTOMER_ERROR = createAction(
  '[API] SaveCustomer Loaded Error',
  props<{error: any}>(),
);
export const GET_DATASDROPLIST_CONTACT_LOAD = createAction(
  '[API] Load DropListContact',
  props<{payload: any}>(),
);
export const GET_DATASDROPLIST_CONTACT_SUCCESS = createAction(
  '[API] DropListContact Loaded Success',
  props<{payload: any}>(),
);
export const GET_DATASDROPLIST_CONTACT_ERROR = createAction(
  '[API] DropListContact Loaded Error',
  props<{error: any}>(),
);
export const GET_DATADROPLIST_ADDRES_LOAD = createAction('[API] DropListAddress');
export const GET_DATADROPLIST_ADDRES_SUCCESS = createAction(
  '[API] DropListAddress Loaded Success',
  props<{payload: any}>(),
);
export const GET_DATADROPLIST_ADDRES_ERROR = createAction(
  '[API] DropListAddress Loaded Error',
  props<{error: any}>(),
);
export const GET_DATADROPLIST_PAGO_SUCCESS = createAction(
  '[API] Datadroplist Pago Succes',
  props<{payload: any[]}>(),
);
export const GET_DATADROPLIST_PAGO_ERROR = createAction(
  '[API] Datadroplist Pago Error',
  props<{error: any}>(),
);
export const GET_DATADROPLIST_UNIDADTIEMPO_LOAD = createAction(
  '[API] Datadroplist Unidad Tiempo Load',
  props<{payload: any}>(),
);
export const GET_DATADROPLIST_UNIDADTIEMPO_SUCCESS = createAction(
  '[API] Datadroplist Unidad Tiempo Succes',
  props<{payload: any}>(),
);
export const GET_DATADROPLIST_UNIDADTIEMPO_ERROR = createAction(
  '[API] Datadroplist Unidad Tiempo Error',
  props<{error: any}>(),
);
export const GET_LISTACONTACTOS_CLIENTE_LOAD = createAction(
  '[API] LISTA CONTACTOS LOAD',
  props<{payload: any}>(),
);
export const GET_LISTACONTACTOS_CLIENTE_SUCCES = createAction(
  '[API] LISTA CONTACTOS SUCCES',
  props<{payload: any}>(),
);
export const GET_LISTACONTACTOS_CLIENTE_ERROR = createAction(
  '[API] LISTA CONTACTOS ERROR',
  props<{error: any}>(),
);
export const GET_DATOSGENERALES_UPDATE = createAction(
  '[API] Update Datos Generales LOAD',
  props<{payload: any}>(),
);
export const GET_DATOSGENERALES_UPDATE_SUCCES = createAction(
  '[API] Update Datos Generales SUCCES',
  props<{payload: any}>(),
);
export const GET_DATOSGENERALES_UPDATE_ERROR = createAction(
  '[API] Update Datos Generales ERROR',
  props<{error: any}>(),
);
export const SET_SEARCH_TERM = createAction(
  '[CatalogClient] Set Search Term',
  props<{
    searchTerm: string;
    queryInfo: QueryInfo;
  }>(),
);
export const SET_QUERY_INFO = createAction(
  '[CatalogClient] Set Query Info',
  props<{payload: QueryInfo}>(),
);
export const SELECTED_OPTION_CLIENT_FILTERS = createAction(
  '[CatalogClient] Selected Option Client Filters',
  props<{option: ClientFilter; value: string}>(),
);
export const SET_CLIENTS_FILTER = createAction(
  '[CatalogClient] Set Client Filter',
  props<{selectedFilter: DropListOption; filterName: string}>(),
);
export const SET_NEEDS_TO_RELOAD_CORPORATES = createAction(
  '[CatalogClient] Set Needs To Reload Corporates',
  props<{value: boolean}>(),
);
export const CLEAN_ALL_CLIENTS_STATE = createAction('[CatalogClient] Clean all clients state');
export const SET_CLIENTS_STATUS = createAction(
  '[CatalogClient] Set client status',
  props<{clientsStatus: number}>(),
);
