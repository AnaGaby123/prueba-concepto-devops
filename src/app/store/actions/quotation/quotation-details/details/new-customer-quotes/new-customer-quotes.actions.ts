import {createAction, props} from '@ngrx/store';
import {CatNivelIngreso, CatTipoDireccion} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';
import {GMContactoClienteCompleto} from 'api-logistica';
import {IVClient} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';
import {ClientsListItemForQuotation} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';

const typeReducer = '[Reducer] - Quote New Client';
const typeApi = '[Api] - Quote Clients';
export const SAVE_NEW_CLIENT_SUCCESS_NAME = '[Api] - Quote Clients Save New Client Success';
export const SAVE_NEW_CLIENT_NAME = buildingStringActionType(typeApi, 'Save New Client');
export const LINK_NEW_CONTACT_TO_CLIENT_SUCCESS_NAME = buildingStringActionType(
  typeApi,
  'Link New Contact To Client Success',
);

export const INIT_LIST_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeApi, 'Init quotation new client component effect'),
);
export const SET_DATA_CONTACT_NEW_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set data form contact new client'),
  props<{input: string; value: string | boolean; property: string}>(),
);
export const SET_DATA_DROP_CONTACT_MEW_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set data drop form contact new client'),
  props<{input: string; option: DropListOption}>(),
);
export const GENERATE_BACKUP_MEW_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Generate New client backup'),
);
export const SET_SELECTED_NEW_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set selected new contact'),
  props<{contact: GMContactoClienteCompleto; index: number}>(),
);
export const SET_CONTACT_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set contact form'),
);
export const SET_ID_CONTACT_PERSON = createAction(
  buildingStringActionType(typeApi, 'Set id contact person'),
  props<{idContact: string; index: number}>(),
);
export const UPDATE_CLIENT = createAction(
  buildingStringActionType(typeApi, 'Update id in client selected'),
  props<{idClient: string}>(),
);
export const REMOVE_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Remove contact'),
  props<{index: number}>(),
);
export const ACTIVATE_NEW_CLIENT_QUOTATION = createAction(
  buildingStringActionType(typeApi, 'Activate new client effect'),
);
export const FETCH_MAP_LOCATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch map location load new client'),
  props<{value: boolean}>(),
);
export const SET_ALERT_EXIT = createAction(
  buildingStringActionType(typeApi, 'Set alert exit'),
  props<{value: boolean}>(),
);
export const ACTIVATE_ALERT_EXIT = createAction(
  buildingStringActionType(typeApi, 'Activate alert exit'),
);
export const FETCH_MAP_LOCATION_SUCCESS_NEW_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Fetch map location success'),
  props<{lng: number; lat: number}>(),
);
export const SHOW_MAP_NEW_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Show map new client'),
  props<{value: boolean}>(),
);
export const SET_INPUT_FORM_ADDRESS_NEW_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set data in form Address'),
  props<{input: string; value: string}>(),
);
export const SET_RESET_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set reset form address'),
);
export const VALIDATE_ZIP_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Validate Address Form zip code load '),
);
export const CHECK_ZIP_CODE_INFO_LOAD = createAction(
  buildingStringActionType(typeApi, 'Check zip code info Address Form'),
);
export const VALIDATE_ZIP_CODE_SUCCESS_ADDRESS = createAction(
  buildingStringActionType(typeApi, 'Validate zip code success Address Form'),
  props<{value: boolean}>(),
);
export const SET_DATA_INPUT_FORM_NEW_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set data in form new client'),
  props<{input: string; value: string}>(),
);
export const SET_DATA_CONTACT_FORM_EMAIL = createAction(
  buildingStringActionType(typeReducer, 'Set data in form email,'),
  props<{input: string; value: string}>(),
);
export const SET_DROP_FORM_NEW_ADDRESS_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set Drop form data address'),
  props<{input: string; value: DropListOption}>(),
);
export const SET_DROP_NEW_FORM_DATA_ROL = createAction(
  buildingStringActionType(typeReducer, 'Set drop form data new client'),
  props<{idInput: string; stringInput: string; value: DropListOption}>(),
);
export const CHECK_PICK_UP = createAction(
  buildingStringActionType(typeReducer, 'Check Pick up in Proquifa'),
  props<{deliveryAddressSelected: DropListOption}>(),
);
export const CLEAN_DATA_FORM_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Clean Form Address new client'),
);
export const CLEAN_GM_CLIENT_QUOTATION_DATA = createAction(
  buildingStringActionType(typeReducer, 'Clean Form Client data'),
);
export const CLEAN_FORM_DATA_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Clean Form Client data contact'),
);
export const CLOSE_MAP_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Close map component effect'),
  props<{lat: number; lng: number}>(),
);
export const CLEAN_GENERAL_DATA_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all forms in quotation'),
);
export const UPDATE_LAT_LNG = createAction(
  buildingStringActionType(typeReducer, 'Update lat and lng'),
  props<{lat: number; lng: number}>(),
);
export const FETCH_DISTANCE = createAction(buildingStringActionType(typeApi, 'Fetch distance'));
export const FETCH_DISTANCE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch distance success'),
  props<{distanceCartaPorte: number}>(),
);
export const SET_PAY_SHIPPING = createAction(
  buildingStringActionType(typeReducer, 'Set pay shipping'),
  props<{value: boolean}>(),
);
export const SAVE_FORM_CONTACT_CLIENT = createAction(
  buildingStringActionType(typeApi, 'save form contact client new'),
);
export const SET_SELECTED_NEW_CONTACT_EDIT = createAction(
  buildingStringActionType(typeReducer, 'save client news edit'),
);
export const SAVE_OR_UPDATE_CONTACT = createAction(
  buildingStringActionType(typeApi, 'save and update client new'),
);
export const SAVE_ADDRESS_CLIENT = createAction(
  buildingStringActionType(typeApi, 'save address client new'),
);
export const SAVE_FORM_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'save contact form client new'),
);
export const SET_DELIVERY_DATA_ID = createAction(
  buildingStringActionType(typeReducer, 'Set delivery data id'),
  props<{IdDataDirectionClient: string}>(),
);
export const CHECK_EXISTING_EMAIL = createAction(
  buildingStringActionType(typeApi, 'Check existing email'),
  props<{email: string}>(),
);
export const CLEAN_DISTANCE_MAPS = createAction(
  buildingStringActionType(typeReducer, 'Clean inputs and state distance maps'),
);
export const VERIFY_EMAIL = createAction(
  buildingStringActionType(typeApi, 'Verify Email'),
  props<{value: boolean}>(),
);
export const SET_ID_CONTACT_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set id contact client'),
  props<{idContactClient: string; index: number}>(),
);
export const SET_ENABLE_EDIT = createAction(
  buildingStringActionType(typeApi, ' Set enable edit'),
  props<{value: boolean}>(),
);
export const SET_ID_MAIL = createAction(
  buildingStringActionType(typeApi, 'Set id mail'),
  props<{idEmail: string; index: number}>(),
);
export const SET_ID_CONTACT = createAction(
  buildingStringActionType(typeApi, 'Set contact id'),
  props<{idPerson: string; index: number}>(),
);
export const SET_PHONE_NUMBER_CONTACT_EFFECT = createAction(
  buildingStringActionType(typeApi, 'Set phone number load in effect'),
  props<{field: string; value: string; phoneType: string}>(),
);
export const SHOW_MAPS_LOADING = createAction(
  buildingStringActionType(typeApi, 'show maps loading'),
);
export const SET_PHONE_NUMBER = createAction(
  buildingStringActionType(typeReducer, 'Set phone number contact client'),
  props<{
    field: string;
    value: string;
    phoneType: string;
    phoneTypeId: string;
  }>(),
);
export const SET_SELECTED_CLIENT_TO_LINK_NEW_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Client To Link New Contact'),
  props<{client: IVClient}>(),
);
export const GET_CONTACTS_BY_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Get Contacts By Quotation'),
);
export const GET_CONTACTS_BY_QUOTATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Contacts By Quotation Success'),
  props<{contacts: GMContactoClienteCompleto[]}>(),
);
export const GET_CONTACTS_BY_QUOTATION_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get Contacts By Quotation Error'),
);
export const SET_GM_CONTACT_CLIENT_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Set GM Contact Client Quotation'),
  props<{isLinkContact: boolean}>(),
);
export const LINK_NEW_CONTACT_TO_CLIENT = createAction(
  buildingStringActionType(typeApi, 'Link New Contact To Client'),
);
export const LINK_NEW_CONTACT_TO_CLIENT_SUCCESS = createAction(
  LINK_NEW_CONTACT_TO_CLIENT_SUCCESS_NAME,
  props<{selectedClient: ClientsListItemForQuotation}>(),
);
export const LINK_NEW_CONTACT_TO_CLIENT_ERROR = createAction(
  buildingStringActionType(typeApi, 'Link New Contact To Client Error'),
);
export const SAVE_NEW_CLIENT = createAction(SAVE_NEW_CLIENT_NAME);
export const SAVE_NEW_CLIENT_SUCCESS = createAction(
  SAVE_NEW_CLIENT_SUCCESS_NAME,
  props<{selectedClient: ClientsListItemForQuotation}>(),
);
export const SAVE_NEW_CLIENT_ERROR = createAction(
  buildingStringActionType(typeApi, 'Save New Client Error'),
);
export const SET_ID_ENTRY_LEVEL = createAction(
  buildingStringActionType(typeReducer, 'Set Id Entry Level'),
  props<{listCatNivelIngreso: Array<CatNivelIngreso>}>(),
);
export const SET_ID_CAT_ADDRESS_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Id Cat Address Type'),
  props<{lisCatAddressType: Array<CatTipoDireccion>}>(),
);
export const CLEAR_SEARCH_TERM = createAction(
  buildingStringActionType(typeApi, 'Clear Search Term'),
);
export const SET_RUN_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Run Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_ALLOW_EDIT_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set Allow Edit Form'),
  props<{allowed: boolean}>(),
);
