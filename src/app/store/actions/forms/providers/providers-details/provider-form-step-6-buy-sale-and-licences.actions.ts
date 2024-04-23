import {createAction, props} from '@ngrx/store';
import {Empresa, Proveedor, ProveedorRegalias} from 'api-catalogos';
import {ProviderCompanyList} from '@appModels/store/forms/providers/providers-details/provider-form-step-6-buy-sale-and-licences.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'ProviderFormStep6';
const typeApi = 'ProviderFormStep6Api';

export const GET_INITIAL_STATE = createAction(
  buildingStringActionType(typeApi, 'Get initial state step 6'),
);
// GET PROVIDER COMPANIES DATA
export const GET_PROVIDER_COMPANIES_DATA_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Provider companies data load'),
);
export const GET_PROVIDER_COMPANIES_DATA_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Provider companies data success'),
  props<{providerCompanies: Array<ProviderCompanyList>}>(),
);
export const GET_PROVIDER_COMPANIES_DATA_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get Provider companies data failed'),
);
// GET PROVIDER LICENSES DATA
export const GET_PROVIDER_LICENSES_DATA_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Provider licenses data load'),
);
export const GET_PROVIDER_LICENSES_DATA_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Provider licenses data success'),
  props<{providerLicenses: Array<ProveedorRegalias>}>(),
);
export const GET_PROVIDER_LICENSES_DATA_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get Provider licenses data failed'),
);

export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set initial state'),
  props<{fieldNameCompanies: string; fieldNameCurrency: string}>(),
);
export const SET_KIND_OF_BUY = createAction(
  buildingStringActionType(typeReducer, 'Set kind of buy'),
  props<{
    fieldValue: boolean;
    fieldName: string;
    otherfieldValue: boolean;
    otherFieldName: string;
    dataModelType: string;
  }>(),
);

export const GET_EMPRESAS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get empresas list load'),
);
export const GET_EMPRESAS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get empresas list success'),
  props<{listEmpresas: Array<Empresa>}>(),
);
export const GET_EMPRESAS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get empresas list failed'),
);
export const SAVE_PROVIDER_DATA_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save provider data load'),
);
export const SAVE_PROVIDER_DATA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save provider data success'),
);
export const SET_BUY_SALE_LICENSES_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Set buy sale licenses backup'),
);
export const RESTORE_BUY_SALE_LICENSES_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Restore buy sale licenses backup'),
);
export const SET_NEW_LICENSE_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set new license data'),
  props<{input: string; value: any}>(),
);
export const SET_LICENSE_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set license form'),
);

export const FETCH_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get provider info'),
  props<{providerNode: Proveedor; months: Array<DropListOption>}>(),
);
export const EDIT_ITEM_CHECKED = createAction(
  buildingStringActionType(typeReducer, 'Edit item checked'),
  props<{item: ProveedorRegalias; value: boolean}>(),
);
export const SET_MONTH = createAction(
  buildingStringActionType(typeReducer, 'Set month'),
  props<{month: DropListOption}>(),
);
export const SET_CUSTOMIZED_CHECK = createAction(
  buildingStringActionType(typeReducer, 'set customized check'),
  props<{value: boolean}>(),
);
export const UPDATE_COMPANY_INFO = createAction(
  buildingStringActionType(typeReducer, 'Update company info'),
  props<{company: string; value: boolean}>(),
);
export const SET_CLIENT_NUMBER = createAction(
  buildingStringActionType(typeReducer, 'Set client number'),
  props<{IdEmpresa: string; value: string}>(),
);
export const SET_PROVIDER_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set provider data'),
  props<{input: string; value: any}>(),
);
export const CLEAN_STATE = createAction(buildingStringActionType(typeReducer, 'Clean State'));
export const SAVE_COMPANIES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save companies load'),
);
export const SAVE_PROVIDER_LICENSES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save provider licenses load'),
);
export const DISABLE_LICENSES_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Disable licenses load'),
);
export const DISABLE_LICENSES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Disable licenses success'),
);
export const DISABLE_PROVIDER_COMPANY = createAction(
  buildingStringActionType(typeApi, 'Disable provider company'),
);
export const DISABLE_PROVIDER_COMPANY_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Disable provider company success'),
  props<{companies: Array<ProviderCompanyList>}>(),
);
export const SET_ID_PROVEEDOR_EMPRESA = createAction(
  buildingStringActionType(typeReducer, 'Set id proveedor empresa'),
  props<{IdProveedorEmpresa: string; index: number}>(),
);
export const SET_ID_PROVEEDOR_REGALIAS = createAction(
  buildingStringActionType(typeReducer, 'Set id proveedor regalias'),
  props<{IdProveedorRegalias: string; index}>(),
);
