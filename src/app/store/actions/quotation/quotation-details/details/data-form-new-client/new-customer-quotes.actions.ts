import {createAction, props} from '@ngrx/store';
import {ContactoDetalleObj, VCliente} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = '[Reducer] - Quote New Client';
const typeApi = '[Api] - Quote Clients';

export const GET_NEW_CLIENT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Get new client'),
  props<{client: VCliente}>(),
);
export const SET_DATA_MEW_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set data new client'),
  props<{input: string; value: any}>(),
);
export const SET_DATA_CONTACT_MEW_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set data form contact new client'),
  props<{input: string; value: any}>(),
);
export const GENERATE_BACKUP_MEW_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Generate New client backup'),
);
export const SET_SELECTED_NEW_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set selected new contact'),
  props<{contact: ContactoDetalleObj}>(),
);
export const SET_CONTACT_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set contact form'),
);
export const SET_ID_CONTACT_PERSON = createAction(
  buildingStringActionType(typeReducer, 'Set id contact person'),
  props<{idContact: string; index: number}>(),
);
export const UPDATE_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Update new client '),
  props<{idClient: string}>(),
);
export const REMOVE_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Remove contact'),
  props<{contact: ContactoDetalleObj}>(),
);
export const CLEAN__NEW_CLIENT_FORM = createAction(
  buildingStringActionType(typeReducer, 'Clean new Form'),
);
export const FETCH_MAP_LOCATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch map location load new client'),
  props<{value: boolean}>(),
);
export const FETCH_MAP_LOCATION_SUCCESS_NEW_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Fetch map location success'),
  props<{lng: number; lat: number}>(),
);
export const SHOW_MAP_NEW_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Show map new client'),
  props<{value: boolean}>(),
);
export const SET_INPUT_FORM_NEW_CLIENT_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Set input form Address to new client'),
  props<{input: string; value: string}>(),
);
export const VALIDATE_ZIP_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Validate Address Form zip code load '),
);
export const CHECK_ZIP_CODE_INFO_LOAD = createAction(
  buildingStringActionType(typeApi, 'Check zip code info Address Form'),
);
export const VALIDATE_ZIP_CODE_SUCCESS_ADRESS = createAction(
  buildingStringActionType(typeApi, 'Validate zip code success Address Form'),
  props<{value: boolean}>(),
);
export const SET_INPUT_FORM_NEW_CLIENT_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set input form data new client'),
  props<{input: string; value: string}>(),
);
export const SET_DROP_FORM_NEW_ADDRESS_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set Drop form data new client'),
  props<{input: string; value: DropListOption}>(),
);
export const FETCH_ADDRESS_CONFIG_VALIDATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch address config validation load'),
);
export const SET_PHONE_EXTENSION = createAction(
  buildingStringActionType(typeReducer, 'Set phone extension'),
  props<{value: string; id: number}>(),
);
export const SET_DROP_NEW_FORM_DATA_ROL = createAction(
  buildingStringActionType(typeReducer, 'Set drop form data new client'),
  props<{idInput: string; stringInput: string; value: DropListOption}>(),
);
export const SET_DROP_DATA_CONTACT_MEW_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set drop form Contact data new client'),
  props<{idInput: string; value: DropListOption}>(),
);
export const SET_CONTACT_FORM_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set contact form data'),
  props<{input: string; value: any}>(),
);
export const CHECK_PICK_UP = createAction(
  buildingStringActionType(typeReducer, 'Check Pick up in proquifa'),
  props<{value: boolean}>(),
);
export const CLEAN_FORM_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Clean Form Client Address'),
);
export const CLEAN_FORM_DATA = createAction(
  buildingStringActionType(typeReducer, 'Clean Form Client data'),
);
export const CLEAN_FORM_DATA_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Clean Form Client data contact'),
);
export const UPDATE_LAT_LNG = createAction(
  buildingStringActionType(typeReducer, 'Update lat lng'),
  props<{lat: number; lng: number}>(),
);
export const FETCH_DISTANCE = createAction(buildingStringActionType(typeApi, 'Fetch distance'));
export const SAVE_FORM_CONTACT_CLIENT = createAction(
  buildingStringActionType(typeApi, 'save client news'),
);
export const SET_SELECTED_NEW_CONTACT_EDIT = createAction(
  buildingStringActionType(typeApi, 'save client news edit'),
);
export const SAVE_OR_UPDATE_CONTACT = createAction(
  buildingStringActionType(typeApi, 'save client new'),
);
export const SAVE_FORM_CONTACT = createAction(
  buildingStringActionType(typeApi, 'save contact form client new'),
);
export const CHECK_EXISTING_EMAIL = createAction(
  buildingStringActionType(typeApi, 'Check existing email'),
  props<{email: string}>(),
);
export const VERIFY_EMAIL = createAction(
  buildingStringActionType(typeReducer, 'Verify Email'),
  props<{value: boolean}>(),
);
export const SET_ID_PHONE2 = createAction(
  buildingStringActionType(typeReducer, 'Set id phone2'),
  props<{idPhone2: string; index: number}>(),
);
export const SET_ID_PHONE1 = createAction(
  buildingStringActionType(typeReducer, 'Set id phone1'),
  props<{idPhone1: string; index: number}>(),
);
export const SET_ID_MOBILE = createAction(
  buildingStringActionType(typeReducer, 'Set id mobile'),
  props<{idMobile: string; index: number}>(),
);
export const SET_ID_CONTACT_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set id contact client'),
  props<{idContactClient: string; index: number}>(),
);
export const DISABLE_CONTACTS = createAction(buildingStringActionType(typeApi, 'Disable contacts'));
export const SET_ENABLE_EDIT = createAction(
  buildingStringActionType(typeApi, ' Set enable edit'),
  props<{value: boolean}>(),
);
export const SET_EDIT_MODE = createAction(
  buildingStringActionType(typeApi, 'Set edit mode'),
  props<{value: boolean}>(),
);
export const SET_ID_MAIL = createAction(
  buildingStringActionType(typeReducer, 'Set id mail'),
  props<{idEmail: string; index: number}>(),
);
export const SET_ID_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set contact id'),
  props<{idPerson: string; index: number}>(),
);
export const SET_PHONE_NUMBER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set phone number load quotes'),
  props<{field: string; value: string; phoneType: string}>(),
);
export const SET_PHONE_NUMBER = createAction(
  buildingStringActionType(typeReducer, 'Set phone number'),
  props<{
    field: string;
    value: string;
    phoneType: string;
    phoneTypeId: string | number;
  }>(),
);
