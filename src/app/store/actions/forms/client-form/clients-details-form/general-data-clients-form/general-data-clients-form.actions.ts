import {createAction, props} from '@ngrx/store';
import {Cliente, VCliente} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  ClientTerceroAutorizadoRelacion,
  IContactoDetalleObj,
  IGeneralDataToSave,
} from '@appModels/store/forms/clients-form/clients-details-form/general-data/general-data-clients-form.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = '[Reducer] - Cat- Clients';
const typeApi = '[Api] - Cat Clients';

export const GET_CLIENT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Get client selected'),
  props<{client: VCliente}>(),
);
export const SET_DATA_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set data client'),
  props<{input: string; value: any}>(),
);
export const FETCH_ACTIVE_CONTACTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch active contacts load'),
);
export const FETCH_ACTIVE_CONTACTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch active contacts success'),
  props<{contacts: Array<IContactoDetalleObj>}>(),
);
export const FETCH_ACTIVE_CONTACTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch active clients failed'),
);
export const SET_SELECTED_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set selected contact'),
  props<{contact: IContactoDetalleObj}>(),
);
export const GENERATE_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Generate clients backup'),
);
export const SET_DROP_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set drop data'),
  props<{idInput: string; stringInput: string; value: DropListOption}>(),
);
export const CLEAN_GENERAL_DATA_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean general data state'),
);
export const SAVE_GENERAL_DATA_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save general data'),
);
export const GET_CAT_TERCEROS_AUTORIZADOS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat Terceros autorizados load'),
);
export const GET_CAT_TERCEROS_ATUORIZADOS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat terceros autorizados success'),
  props<{listTercerosAutorizados: Array<Cliente>}>(),
);
export const GET_CAT_TERCEROS_AUTORIZADOS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat tercers autorizados failed'),
);
export const GET_TERCEROS_AUTORIZADOS_CLIENT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get terceros autorizados client load'),
);
export const GET_TERCEROS_AUTORIZADOS_CLIENT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get terceros autorizados client success'),
  props<{
    tercerosAutorizadosSelected: Array<ClientTerceroAutorizadoRelacion>;
  }>(),
);
export const GET_TERCEROS_AUTORIZADOS_CLIENT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get terceros autorizados client failed'),
);
export const SET_TERCERO_AUTORIZADO = createAction(
  buildingStringActionType(typeReducer, 'Set tercero autorizado'),
  props<{terceroAutorizado: ClientTerceroAutorizadoRelacion}>(),
);
export const REMOVE_TERCERO_AUTORIZADO = createAction(
  buildingStringActionType(typeReducer, 'Remove tercero autorizado'),
  props<{terceroAutorizado: ClientTerceroAutorizadoRelacion}>(),
);
export const SET_AUTHORIZED_THIRD_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set tercero autorizado selected'),
  props<{value: DropListOption | null}>(),
);
export const SET_MODAL_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set modal is open'),
  props<{value: boolean}>(),
);
export const UPDATE_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Update client'),
  props<{idClient: string}>(),
);

export const UPDATE_NAME_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Update Name Client'),
  props<{name: string}>(),
);
export const SAVE_GENERAL_DATA_CLIENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save General Data Client Success'),
  props<{generalDataToSave: IGeneralDataToSave}>(),
);
export const SAVE_TERCER0S_AUTORIZADOS = createAction(
  buildingStringActionType(typeApi, 'Save Terceros autorizados'),
  props<{generalDataToSave: IGeneralDataToSave}>(),
);
export const DELETE_TERCEROS_AUTORIZADOS = createAction(
  buildingStringActionType(typeApi, 'Delete Terceros autorizados'),
  props<{generalDataToSave: IGeneralDataToSave}>(),
);
export const SAVE_OR_UPDATE_CONTACT = createAction(
  buildingStringActionType(typeApi, 'Save or update contacts'),
);
export const SAVE_OR_UPDATE_CONTACT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save or update contacts success'),
  props<{contacts: Array<IContactoDetalleObj>}>(),
);
export const REMOVE_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Remove contact'),
  props<{contact: IContactoDetalleObj}>(),
);
// DOCS: No se están usando
/*export const SET_ID_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set contact id'),
  props<{idPerson: string; index: number}>(),
);
export const SET_ID_MAIL = createAction(
  buildingStringActionType(typeReducer, 'Set id mail'),
  props<{idEmail: string; index: number}>(),
);
export const SET_ID_MOBILE = createAction(
  buildingStringActionType(typeReducer, 'Set id mobile'),
  props<{idMobile: string; index: number}>(),
);
export const SET_ID_PHONE1 = createAction(
  buildingStringActionType(typeReducer, 'Set id phone1'),
  props<{idPhone1: string; index: number}>(),
);
export const SET_ID_PHONE2 = createAction(
  buildingStringActionType(typeReducer, 'Set id phone2'),
  props<{idPhone2: string; index: number}>(),
);*/
export const SET_ID_CONTACT_PERSON = createAction(
  buildingStringActionType(typeReducer, 'Set id contact person'),
  props<{idContact: string; index: number}>(),
);
export const SET_ID_CONTACT_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set id contact client'),
  props<{idContactClient: string; index: number}>(),
);
export const DISABLE_CONTACTS = createAction(buildingStringActionType(typeApi, 'Disable contacts'));
// Acciones para formulario de clientes

export const CLEAN_FORM = createAction(buildingStringActionType(typeReducer, 'Clean Form'));
export const CLEAN_CONTACT_FORM = createAction(
  buildingStringActionType(typeReducer, 'Client contact form'),
);
export const SET_CONTACT_FORM_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set contact form data'),
  props<{input: string; value: any}>(),
);
export const SET_CLIENT_FORM_DROP_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set client form drop data'),
  props<{idInput: string; value: DropListOption}>(),
);
export const VERIFY_EMAIL = createAction(
  buildingStringActionType(typeReducer, 'Verify Email'),
  props<{value: boolean}>(),
);
export const SET_PHONE_NUMBER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set phone number load'),
  props<{field: string; value: string; phoneType: string}>(),
);
export const SET_PHONE_NUMBER = createAction(
  buildingStringActionType(typeReducer, 'Set phone number'),
  props<{
    field: string;
    value: string;
    phoneType: string;
    phoneTypeId: string;
  }>(),
);
export const SET_PHONE_EXTENSION = createAction(
  buildingStringActionType(typeReducer, 'Set phone extension'),
  props<{value: string; id: number}>(),
);
export const SET_CONTACT_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set contact form'),
);
export const INIT_GENERAL_DATA_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Init list component effect'),
);
export const OPEN_MODAL_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeApi, 'Open modal contacts load component effect'),
  props<{value: boolean}>(),
);
export const ADD_THIRD_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeApi, 'Add third component effect'),
);
