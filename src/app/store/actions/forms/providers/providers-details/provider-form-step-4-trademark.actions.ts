import {createAction, props} from '@ngrx/store';
// Actions
import {VMarca} from 'api-catalogos';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  IQueryResultIVMarca,
  ITrademarkFamilyChange,
  IVTrademarkDetail,
  IVTrademarkFamilyDetail,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-4-trademark.model';
import {VProveedor} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';

const typeApi = 'ProviderFormStep4Api';
const typeReducer = 'ProviderFormStep4';
export const INITIALIZE_TRADEMARK_MODULE = createAction(
  buildingStringActionType(typeApi, 'Initialize trademark module'),
);
export const CLEAN_TRADEMARK_OFFER_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean trademark offer state'),
);
// DOCS: Obtiene el proveedor actual
export const GET_PROVIDER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get provider load'),
);
export const GET_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get provider success'),
  props<{provider: VProveedor}>(),
);
export const GET_PROVIDER_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get provider failed'),
  props<{error: any}>(),
);
// DOCS: Obtiene la lista de marcas
export const GET_TRADEMARK_LIST_LOAD = createAction(
  buildingStringActionType(typeApi, 'List Trademark Load'),
  props<{isFirstPage}>(),
);
export const GET_TRADEMARK_LIST_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'List Trademark Success'),
  props<{response: IQueryResultIVMarca}>(),
);
export const GET_TRADEMARK_LIST_ERROR = createAction(
  buildingStringActionType(typeApi, 'List Trademark Error'),
  props<{error: any}>(),
);
// DOCS: Obtiene las marcas asociadas a un proveedor
export const GET_ASSOCIATES_TRADEMARK_LOAD = createAction(
  buildingStringActionType(typeApi, 'Recuperar Asociadas de Proveedor'),
);
export const GET_ASSOCIATES_TRADEMARK_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Associated of Provider Success'),
  props<{list: Array<IVTrademarkDetail>}>(),
);
export const GET_ASSOCIATES_TRADEMARK_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get Associated of Provider Error'),
  props<{error: any}>(),
);
// DOCS: Guarda la información de la pantalla
export const SAVE_ASSOCIATES_TRADEMARK_FAMILY_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save associated trademark family load'),
);
export const SAVE_ASSOCIATES_TRADEMARK_FAMILY_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save associated trademark family success'),
  props<{payload: Array<IVTrademarkDetail>}>(),
);
export const SAVE_ASSOCIATES_TRADEMARK_FAMILY_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save associated trademark family failed'),
  props<{error: any}>(),
);
export const SAVE_ASSOCIATES_TRADEMARK_FAMILY_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save associated trademark family provider success'),
  props<{payload: Array<IVTrademarkDetail>}>(),
);
export const SAVE_ASSOCIATES_TRADEMARK_FAMILY_PROVIDER_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save associated trademark family provider failed'),
  props<{error: any}>(),
);

export const SEARCH_FILTER_TRADEMAK = createAction(
  buildingStringActionType(typeApi, 'Buscar Marcas'),
  props<{searchTerm: string}>(),
);
export const FILTER_TRADEMAK = createAction(
  buildingStringActionType(typeApi, 'Filtrar Marcas'),
  props<{isfirstPage: boolean; filter: ITabOption}>(),
);
export const CLEAR_TRADEMARK_LIST = createAction(
  buildingStringActionType(typeApi, 'Clear Trademark List'),
);
export const SET_ASSOCIATED_TRADEMARK = createAction(
  buildingStringActionType(typeApi, 'Set associated trademark'),
  props<{trademark: VMarca}>(),
);
export const GET_TRADEMARK_FAMILIES_LIST_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get trademark families list Success'),
  props<{
    trademarkId: string;
    trademarkFamilies: Array<IVTrademarkFamilyDetail>;
  }>(),
);
export const GET_TRADEMARK_FAMILIES_LIST_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get trademark families list Failed'),
  props<{error: any}>(),
);
export const DELETE_ASSOCIATED_TRADEMARK = createAction(
  buildingStringActionType(typeApi, 'Delete associated trademark'),
  props<{trademarkId: string}>(),
);
export const SET_TRADEMARK_FAMILY_VALUE = createAction(
  buildingStringActionType(typeApi, 'Set trademark family value'),
  props<{familyChange: ITrademarkFamilyChange}>(),
);
export const SET_MAIN_PROVIDER_TRADEMARK_FAMILY_VALUE = createAction(
  buildingStringActionType(typeApi, 'Set main provider trademark family value'),
  props<{familyChange: ITrademarkFamilyChange}>(),
);
export const SET_TRADEMARK_BACKUP = createAction(
  buildingStringActionType(typeApi, 'Set Trademark backUp'),
);
export const RESTORE_TRADEMARK_BACKUP = createAction(
  buildingStringActionType(typeApi, 'Restore Trademark backUp'),
);
export const UPDATE_IS_FIRST_LOADING = createAction(
  buildingStringActionType(typeApi, 'Update Status Loading'),
  props<{value: boolean}>(),
);
export const SET_IS_OPEN_TRADEMARK_POP_UP = createAction(
  buildingStringActionType(typeApi, 'Set is open trademark pop up'),
  props<{value: boolean}>(),
);
export const FETCH_MORE_TRADEMARK_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more trademark component effect'),
  props<{event: IPageInfo}>(),
);
