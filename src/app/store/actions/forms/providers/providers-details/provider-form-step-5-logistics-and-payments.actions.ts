import {createAction, props} from '@ngrx/store';
import {
  ConfiguracionDatos,
  RutaEntrega,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  CatBanco,
  ConfiguracionPagos,
  ConfiguracionPagosDatosBancariosDetalle,
  ConfiguracionTiempoEntregaProveedor,
  ValorConfiguracionTiempoEntrega,
  VProveedor,
} from 'api-catalogos';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'ProviderFormStep5Api';
const typeReducer = 'ProviderFormStep5Reducer';
export const SET_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Get Provider'),
  props<{provider: VProveedor}>(),
);
export const GET_CAT_ROUTES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Cat Routes of Delivery'),
);
export const GET_CAT_ROUTES_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Cat Routes of Delivery Success'),
  props<{list: RutaEntrega[]; catUnitTime: Array<DropListOption>}>(),
);
export const SAVE_DELIVERY_TIME = createAction(
  buildingStringActionType(typeApi, 'Save Delivery time of Freight'),
  props<{data: string; value: any; index: number}>(),
);
export const GET_CAT_BANK_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Cat Bank Success Bank'),
  props<{listCatBanco: Array<CatBanco>}>(),
);
export const SET_FREIGHT_CONFIG = createAction(
  buildingStringActionType(typeReducer, 'Set freight config'),
  props<{input: string; value: any}>(),
);
export const CLEAN_ALL_LOGISTIC_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all logistics state'),
);
export const CLEAN_LOGISTIC_CONFIG = createAction(
  buildingStringActionType(typeReducer, 'Clean logistic config'),
);
export const UPDATE_ROUTE_LIST_BACKUP = createAction(
  buildingStringActionType(typeApi, 'Update Route List'),
);
export const UPDATE_ID_DELIVERY_TIME = createAction(
  buildingStringActionType(typeApi, 'Update Ids of Delivery Time'),
  props<{item: RutaEntrega}>(),
);
export const SET_CREDTI_LINE = createAction(
  buildingStringActionType(typeApi, 'Set Credit Line of Payment'),
  props<{value: number}>(),
);
export const SET_CREDIT_LIMIT = createAction(
  buildingStringActionType(typeApi, 'Set Credit Limit od Payment'),
  props<{value: number}>(),
);
export const SET_CONDITION_PAYMENT = createAction(
  buildingStringActionType(typeApi, 'Set Condition Payment'),
  props<{event: DropListOption}>(),
);
export const SET_DATA_TRANSFER_AND_CARD = createAction(
  buildingStringActionType(typeApi, 'Update Transfer or Card of Payment'),
  props<{tipo: string; parametro: string; value: any}>(),
);

export const SET_ID_CONFIGURATION_PAYMENT = createAction(
  buildingStringActionType(typeApi, 'Set Id of Configuration Payment'),
);

export const SET_IDS_PAYMENTS = createAction(
  buildingStringActionType(typeApi, 'Set Ids of Payment'),
  props<{item: ConfiguracionDatos}>(),
);
export const GET_DATAS_PROVIDER = createAction(
  buildingStringActionType(typeApi, 'Get Datas of Provider'),
);
export const SET_DATAS_TIME_DELIVERY = createAction(
  buildingStringActionType(typeApi, 'Set Datas of Delivery Time'),
  props<{list: RutaEntrega[]}>(),
);
export const GET_CONFIGURATION_PAYMENT = createAction(
  buildingStringActionType(typeApi, 'Get Configuration Payment'),
  props<{itemConfiguracionPagos: ConfiguracionPagos}>(),
);
export const GET_BANK_DATAS = createAction(
  buildingStringActionType(typeApi, 'Get Bank Datas of Payment'),
  props<{item: ConfiguracionDatos}>(),
);
export const SET_LOGISTIC_AND_PAYMENT_BACKUP = createAction(
  buildingStringActionType(typeApi, 'Set Logistic and Payment backUp'),
);
export const RESTORE_LOGISTIC_AND_PAYMENT_BACKUP = createAction(
  buildingStringActionType(typeApi, 'Restore Logistic and Payment backUp'),
);
export const FETCH_ACCOUNTS_BANK_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch accounts bank load'),
);
export const FETCH_ACCOUNTS_BANK_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch accounts bank success'),
  props<{accounts: Array<ConfiguracionPagosDatosBancariosDetalle>}>(),
);
export const SET_PAYMENT_METHOD = createAction(
  buildingStringActionType(typeReducer, 'Set payment method'),
  props<{value: DropListOption}>(),
);
export const SET_BANK_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set bank'),
  props<{value: DropListOption}>(),
);
export const SET_BANK_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set bank data'),
  props<{input: string; value: string}>(),
);
export const ADD_ACCOUNT = createAction(buildingStringActionType(typeReducer, 'Add account'));
export const DELETE_SELECTED_ACCOUNT = createAction(
  buildingStringActionType(typeReducer, 'Delete selected account'),
  props<{account: ConfiguracionPagosDatosBancariosDetalle}>(),
);
export const SAVE_PROVIDER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save provider load'),
);
export const SAVE_ROUTE_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save route list success'),
  props<{routeList: Array<ValorConfiguracionTiempoEntrega>}>(),
);
export const SAVE_PROVIDER_DELIVERY_TIME_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save provider delivery time success'),
  props<{config: Array<ConfiguracionTiempoEntregaProveedor>}>(),
);
export const DELETE_BAK_ACCOUNTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Delete bank accounts load'),
);
export const SAVE_BANK_ACCOUNTS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save bank accounts load'),
);
export const SET_ID_DATOS_BANCARIOS = createAction(
  buildingStringActionType(typeReducer, 'Set IdDatosBancarios'),
  props<{IdDatosBancarios: string; index: number}>(),
);
export const SAVE_PAYMENT_CONDITIONS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save payment conditions load'),
);
export const SAVE_PAYMENT_CONDITIONS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save payment conditions success'),
  props<{IdConfiguracionPagos: string}>(),
);
export const SET_ID_CONFIGURACION_PAGOS_DATOS_BANCARIOS = createAction(
  buildingStringActionType(typeReducer, 'Save configuracion pagos datos bancarios'),
  props<{IdConfiguracionPagosDatosBancarios: string; index: number}>(),
);
export const CLEAN_BACK_UP = createAction(buildingStringActionType(typeReducer, 'Clean BackUp'));
export const SET_CHECK_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set check value'),
  props<{idCheck: string; value: boolean}>(),
);

export const UPDATE_CARD_MARK_LIST = createAction(
  buildingStringActionType(typeReducer, 'Update card mark list'),
  props<{cardsSaved: Array<ConfiguracionPagosDatosBancariosDetalle>}>(),
);

export const NG_ON_INIT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Ng on init component effect'),
);
