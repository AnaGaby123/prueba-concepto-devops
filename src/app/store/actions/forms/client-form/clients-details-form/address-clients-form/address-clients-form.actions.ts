import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IDireccion,
  IHorarioAtencion,
} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
import {
  DatosDireccionClienteComentario,
  ResultadoValidadorDireccion,
  ResultadoValidarCodigoPostal,
} from 'api-catalogos';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = '[Reducer] - Cat Clients - Address';
const typeApi = '[Api] - Cat Clients - Address';

export const CLEAN_ADDRESS_CLIENT_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean address client state'),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeApi, 'Set search term'),
  props<{searchTerm: string}>(),
);
export const SET_COMMENT = createAction(
  buildingStringActionType(typeReducer, 'Set comment'),
  props<{comment: DatosDireccionClienteComentario}>(),
);
export const DELETE_COMMENT = createAction(
  buildingStringActionType(typeReducer, 'Delete comment'),
  props<{comment: DatosDireccionClienteComentario}>(),
);
export const SELECT_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Select Address'),
  props<{address: IDireccion}>(),
);
export const EDIT_ADDRESS_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Edit address selected'),
  props<{address: IDireccion; index: number; isEdit: boolean}>(),
);
export const SET_ALLOWED_EDIT_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set allowed form'),
  props<{value: boolean}>(),
);
export const SET_COMMENT_SCHEDULE_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set comment schedule type'),
  props<{value; node}>(),
);
export const SET_INITIAL_COMMENT_SCHEDULE_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set initial comment schedule type'),
  props<{node}>(),
);
export const ADD_NEW_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Add new address'),
  props<{address: IDireccion}>(),
);
export const RESET_ADDRESS_FORM = createAction(
  buildingStringActionType(typeReducer, 'Reset address form'),
);
export const SET_INPUT_FORM_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set input form data'),
  props<{input: string; value: string}>(),
);
export const SET_DROP_FORM_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set drop form data'),
  props<{input: string; value: DropListOption}>(),
);
export const SET_RESET_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set reset form address'),
);
export const RESET_CP_FORM = createAction(
  buildingStringActionType(typeReducer, 'Reset cp form'),
  props<{value: string}>(),
);
export const CLEAN_DISTANCE_MAPS = createAction(
  buildingStringActionType(typeReducer, 'Clean inputs and state distance maps'),
);
export const FETCH_MAP_LOCATION_SUCCESS_NEW_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Fetch map location success'),
  props<{lng: number; lat: number}>(),
);
export const FETCH_DISTANCE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch distance success'),
  props<{DistanciaCartaPorte: number}>(),
);
export const SAVE_OR_UPDATE_FORM = createAction(
  buildingStringActionType(typeReducer, 'Save or update form'),
);
export const SCHEDULE_POP_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Schedule pop open'),
  props<{value: boolean}>(),
);
export const ADDRESS_MODAL_TITLE = createAction(
  buildingStringActionType(typeReducer, 'Address modal title'),
  props<{value: string}>(),
);
export const SCHEDULE_MODAL_TITLE = createAction(
  buildingStringActionType(typeReducer, 'Schedule modal title'),
  props<{value: string}>(),
);
export const ADDRESS_POP_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Address pop open'),
  props<{value: boolean}>(),
);
export const SAVE_SCHEDULE = createAction(
  buildingStringActionType(typeReducer, 'Save schedule'),
  props<{schedule: Array<IHorarioAtencion>; scheduleType: string}>(),
);
export const SET_DELIVERY_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set delivery data'),
  props<{input: string; value: any}>(),
);
export const DELETE_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Delete address'),
  props<{address: IDireccion}>(),
);
export const GET_DATA_ADDRESS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get data address success'),
  props<{payload: Array<IDireccion>}>(),
);
export const GET_ADDRESS_CLIENT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get address client load'),
  props<{payload: any}>(),
);
export const GET_ADDRESS_CLIENT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get address client failed'),
);
export const SET_BACKUP_EDIT_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Set backUp edit address'),
);
export const VALIDATE_ZIP_CODE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Validate zip code success'),
  props<{value: boolean}>(),
);
export const SAVE_ADDRESS_CLIENT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save address client load'),
);
export const SAVE_ADDRESS_CLIENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save addres client success'),
  props<{address: Array<IDireccion>}>(),
);
export const DELETE_ADDRESS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Delete  address success'),
);
export const SET_SCHEDULE_ID = createAction(
  buildingStringActionType(typeReducer, 'Set schedule id'),
  props<{scheduleType: any; value: any; index: number; indexSchedule}>(),
);
export const SET_ADDRESS_ID = createAction(
  buildingStringActionType(typeReducer, 'Set address Id'),
  props<{IdDireccion: string; index: number}>(),
);
export const SET_CLIENTE_DIRECCION_ID = createAction(
  buildingStringActionType(typeReducer, 'Set cliente direccion'),
  props<{IdClienteDireccion: string; index: number}>(),
);
export const SET_ID_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set id client'),
  props<{IdCliente: string}>(),
);
export const SET_DELIVERY_DATA_ID = createAction(
  buildingStringActionType(typeReducer, 'Set delivery data id'),
  props<{IdDatosDireccionCliente: string; index: number}>(),
);
export const SET_COMMENTS_ID = createAction(
  buildingStringActionType(typeReducer, 'Set comment id'),
  props<{comments: Array<DatosDireccionClienteComentario>; index: number}>(),
);
export const CLEAN_ADDRESS_FORM = createAction(
  buildingStringActionType(typeReducer, 'Clean address form'),
);
export const DELETED_COMMENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Deleted comment success'),
);
export const CHECK_ZIP_CODE_INFO_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Check zip code info success'),
  props<{zipCodeInfo: ResultadoValidarCodigoPostal}>(),
);
export const FETCH_MAP_LOCATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch map location load'),
  props<{value: boolean}>(),
);
export const FETCH_MAP_LOCATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch map location success'),
  props<{lng: number; lat: number}>(),
);
export const FETCH_MAP_LOCATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch map location failed'),
);
export const SHOW_MAP = createAction(
  buildingStringActionType(typeReducer, 'Show map'),
  props<{value: boolean}>(),
);
export const FETCH_DISTANCE = createAction(buildingStringActionType(typeApi, 'Fetch distance'));
export const UPDATE_LAT_LNG = createAction(
  buildingStringActionType(typeReducer, 'Update lat lng'),
  props<{lat: number; lng: number}>(),
);
export const FETCH_ADDRESS_CONFIG_VALIDATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch address config validation load'),
);
export const FETCH_ADDRESS_CONFIG_VALIDATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'fetch addres config validation success'),
  props<{validation: ResultadoValidadorDireccion}>(),
);
export const ADD_COMMENT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Add comment component effect'),
  props<{addressType: string}>(),
);
export const ON_INIT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'On init component effect'),
);
export const EDIT_ADDRESS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Edit address component effect'),
  props<{address: IDireccion; index: number; isEdit: boolean}>(),
);
export const CLOSE_MODAL_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Close modal component effect'),
  props<{value: boolean}>(),
);
export const CLOSE_MAP_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Close map component effect'),
  props<{lat: number; lng: number}>(),
);
