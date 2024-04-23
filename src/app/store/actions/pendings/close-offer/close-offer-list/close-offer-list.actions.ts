import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {ClientsListItemForCloseOffer} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import {AttributeDashboard, CerrarOfertaTotalesPartidasClienteObj} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'Api Close Offer List';
const typeReducer = 'Close Offer List';

export const GET_CLIENT_LIST_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get client list in Close Offer LOAD'),
);
export const SET_TAB_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set tab option selected'),
  props<{selectedTabOption: ITabOption}>(),
);
export const SET_BURGER_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set burger option selected'),
  props<{selectedBurgerOption: DropListOption}>(),
);
export const SET_DATE_RANGE_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set date range selected'),
  props<{dateRange: IFilterDate}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set search term'),
  props<{searchTerm: string}>(),
);
export const FETCH_TOTALS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch totals of close offer load'),
);
export const FETCH_TOTALS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch totals of close offer success'),
  props<{totals: CerrarOfertaTotalesPartidasClienteObj}>(),
);
export const INIT_CLOSE_OFFER = createAction(
  buildingStringActionType(typeReducer, 'Init close offer'),
);
export const FETCH_TAB_OPTIONS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch tab options load'),
);
export const FETCH_TAB_OPTIONS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch tab options failed'),
);
export const FETCH_TAB_OPTIONS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch tab options success'),
  props<{tabs: Array<AttributeDashboard>}>(),
);
export const FETCH_DASHBOARD_CLIENTS_LIST_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch dashboard list success'),
  props<{clientsList: Array<ClientsListItemForCloseOffer>}>(),
);
export const FETCH_DASHBOARD_CLIENTS_LIST_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch dashboard clients list failed'),
);
export const SET_SELECTED_SEARCH_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set selected search type'),
  props<{searchType: DropListOption}>(),
);
export const CHANGE_LOADING_STATUS = createAction(
  buildingStringActionType(typeApi, 'Loading Status'),
);
export const CLEAN_ALL_CLOSE_OFFER_LIST = createAction(
  buildingStringActionType(typeReducer, 'Clean data from List component'),
);
