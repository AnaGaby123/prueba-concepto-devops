import {createAction, props} from '@ngrx/store';
import {Direccion, Proveedor} from 'api-catalogos';
import {Persona} from '@appModels/catalogos/persona/persona';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  GeneralData,
  IContactoDetalleProvObj,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-1-general-data.model';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = '[ProviderFormStep1Api]';
const typeReducer = '[ProviderFormStep1]';

export const ADD_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Add Contact'),
  props<{contact: Persona}>(),
);
export const SET_FORM_DATA_BY_FIELD_NAME = createAction(
  buildingStringActionType(typeReducer, 'Set form data by field name'),
  props<{fieldName: string; fieldValue: any; dataModelType: string}>(),
);
export const SET_RESET_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set reset form address'),
);
export const SET_ALLOWED_EDIT_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set allowed form'),
  props<{value: boolean}>(),
);
export const SET_CONTACT_DATA_BY_FIELD_NAME = createAction(
  buildingStringActionType(typeApi, 'Set Contact Data By Field Name'),
  props<{
    fieldName: string;
    fieldValue: string | DropListOption;
    objectId: string;
    phoneTypeId?: string;
  }>(),
);
export const GET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Get initial state'),
);
export const CLEAN_GENERAL_DATA_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean general data state'),
);
export const SAVE_GENERAL_DATA_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save general data load'),
);
export const SAVE_GENERAL_DATA_PROVIDER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save General Data Provider Load'),
  props<{generalDataProvider: GeneralData}>(),
);
export const GET_GENERAL_DATA_PROVIDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get general data provider load'),
);
export const GET_GENERAL_DATA_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get general data provider success'),
  props<{generalDataProvider: Proveedor}>(),
);
// Get general data
export const GET_GENERAL_DATA_PROVIDER_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get general data provider failed'),
);
export const GET_ADDRESS_DATA_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get address data provider success'),
  props<{addressDataProvider: Direccion}>(),
);
// Get address
export const GET_CONTACTS_DATA_PROVIDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get contacts data provider load'),
);
// Get contacts
export const GET_CONTACTS_DATA_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get contacts data provider success'),
  props<{contacts: Array<IContactoDetalleProvObj>}>(),
);
// Save contacts
export const SAVE_PROVIDER_CONTACTS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save provider contacts load'),
  props<{generalDataProvider: GeneralData}>(),
);
export const DISABLE_CONTACTS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Disable contacts load'),
  props<{generalDataProvider: GeneralData}>(),
);
export const SET_DISABLE_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set disable contact'),
  props<{contactId: string; mail: string}>(),
);
export const SET_CONTACT_TO_EDIT = createAction(
  buildingStringActionType(typeApi, 'Set Contact to Edit'),
  props<{contactId: string; index?: number}>(),
);
export const ADD_EDIT_CONTACT_TO_ARRAY = createAction(
  buildingStringActionType(typeApi, 'Add Edit Contact To Array'),
);
export const UPDATE_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set update contact'),
  props<{contact: Persona; index: number}>(),
);
export const SET_PROVIDER_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Set Provider backUp'),
);
export const RESTORE_PROVIDER_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Restore Provider backUp'),
);
export const DELETE_PROVIDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Delete Provider load'),
);
export const DELETE_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Delete Provider success'),
);
/// Datos del paso 5
export const SET_HABILITY = createAction(
  buildingStringActionType(typeApi, 'Set Hability Freight'),
  props<{value: boolean}>(),
);
export const SET_CONCEPT = createAction(
  buildingStringActionType(typeApi, 'Set Concept Freight'),
  props<{value: string}>(),
);
export const SET_LEGEND_FREIGHT = createAction(
  buildingStringActionType(typeApi, 'Set Legend Freight'),
  props<{value: string}>(),
);
export const SET_AMOUNT_FREIGHT = createAction(
  buildingStringActionType(typeApi, 'Set Mount Freight'),
  props<{value: number}>(),
);
export const VALIDATE_ZIP_CODE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Validate Zip Code Success'),
  props<{value: boolean}>(),
);
export const SET_RFC_VALIDATION = createAction(
  buildingStringActionType(typeApi, 'Set RFC validation'),
  props<{value: boolean}>(),
);
export const CHECK_EXISTING_EMAIL = createAction(
  buildingStringActionType(typeApi, 'Check Existing Email'),
  props<{email: string}>(),
);
export const SET_EXISTING_EMAIL = createAction(
  buildingStringActionType(typeApi, 'Set Duplicated Mail'),
  props<{duplicateMail: boolean}>(),
);

export const FORM_HANDLER_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Form handler component effect'),
  props<{fieldValue: string | DropListOption; fieldName: string}>(),
);
