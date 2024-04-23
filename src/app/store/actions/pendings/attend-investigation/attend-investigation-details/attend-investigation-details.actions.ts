import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {typeApi} from '@appActions/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.actions';
import {IProvider} from '@appModels/store/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.model';
import {AttributeDashboard} from 'api-logistica';
import {
  ICotPartidaInvetigacionAtencionComentariosObj,
  IProductInvestigation,
} from '@appModels/store/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.model';
import {IProduct} from '@appModels/store/forms/product-form/list-products-form/list-products-form.model';
import {IDataMail} from '@appModels/correo/correo';
import {buildingStringActionType} from '@appUtil/strings';

export const typeReducer = 'Attend Investigation Details';

export const SET_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Client Selected'),
  props<{providerSelected: IProvider}>(),
);
export const SET_TAB_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Option Selected'),
  props<{tabOptionSelected: ITabOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_FILTER_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Filter Option Selected'),
  props<{filterSelected: DropListOption}>(),
);
export const FETCH_TAB_OPTIONS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch tab options load'),
  props<{fetchList: boolean}>(),
);
export const SET_ACTUAL_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set actual provider'),
);
export const FETCH_TAB_OPTIONS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch tab options success'),
  props<{tabs: Array<AttributeDashboard>}>(),
);
export const FETCH_TAB_OPTIONS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch tab options failed'),
);
export const FETCH_PROVIDER_PRODUCTS_LIST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch provider products list load'),
);
export const FETCH_PROVIDER_PRODUCTS_LIST_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch provider products list success'),
  props<{items: Array<IProductInvestigation>}>(),
);
export const FETCH_PROVIDER_PRODUCTS_LIST_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch provider products list failed'),
);
export const SET_SELECTED_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Set selected product'),
  props<{product: IProductInvestigation}>(),
);
export const OPEN_PRODUCT_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Open product details'),
  props<{value: boolean; index: number; isOnlineInvestigation: boolean}>(),
);
export const CHECK_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Check item'),
  props<{index: number}>(),
);
export const CHECK_ALL_ITEMS = createAction(
  buildingStringActionType(typeReducer, 'Check all items'),
  props<{value: boolean}>(),
);
export const SET_RADIO_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set radio value'),
  props<{prop: string; value: boolean}>(),
);
export const FETCH_PRODUCT_INVESTIGATION_DETAIL = createAction(
  buildingStringActionType(typeReducer, 'Fetch product investigation detail'),
  props<{details: ICotPartidaInvetigacionAtencionComentariosObj}>(),
);
export const DROP_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Drop Product'),
  props<{product: IProduct}>(),
);
export const REMOVE_PRODUCT_TO_ATTEND = createAction(
  buildingStringActionType(typeReducer, 'Remove product to attend'),
);
export const SET_EVI_COMMENT = createAction(
  buildingStringActionType(typeReducer, 'Set evi comment'),
  props<{comment: string}>(),
);
export const SEND_RESPONSE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Send response load'),
);
export const UPDATE_ITEMS_ATTENTION_LIST = createAction(
  buildingStringActionType(typeReducer, 'Update items attention list'),
  props<{items: Array<IProductInvestigation>}>(),
);
// ACCIONES PARA RESPUESTA A PROVEDOR
export const SET_RADIO_BUTTON_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set radio button value'),
  props<{prop: string; value: boolean}>(),
);
export const SET_NOTES = createAction(
  buildingStringActionType(typeReducer, 'Set notes'),
  props<{notes: string}>(),
);
export const SET_FILE = createAction(
  buildingStringActionType(typeReducer, 'Set file'),
  props<{file: File}>(),
);
export const SEND_PROVIDER_RESPONSE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Send provider response load'),
);
export const HANDLE_CANCEL_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Handle cancel product'),
);
export const CANCEL_SELECTED_NEW_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Cancel selected new status'),
);
export const GET_PROVIDER_CONTACTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get provider contacts load'),
);
export const FOUND_OR_NOT_METHOD = createAction(
  buildingStringActionType(typeReducer, 'Found or not method'),
);
export const GET_PROVIDER_CONTACTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get provider contacts success'),
  props<{contacts: Array<IDropListMulti>}>(),
);
export const SEND_PROVIDER_MAIL_LOAD = createAction(
  buildingStringActionType(typeApi, 'Send provider mail load'),
  props<{data: IDataMail}>(),
);
export const CHANGE_INVESTIGATION_STATUS = createAction(
  buildingStringActionType(typeApi, 'Change Investigation Status'),
);
export const SET_BRAND_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set brand family'),
  props<{brand: DropListOption; IdFamily: string}>(),
);
export const SHOW_SEND_EMAIL_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Send Email Dialog'),
  props<{viewType: string}>(),
);
