import {createAction, props} from '@ngrx/store';
/*Models Imports*/
import {IProvider} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-list/manage-back-order-list.models';
import {
  IBackOrder,
  IFamiliesBackOrder,
  IItems,
  IOptionsIBackOrder,
  IOrdersBackOrder,
  IProduct,
} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-details/manage-back-order-details.models';
import {OcPartidaEdicionBackOrderHistorial, VOcProductoTotalesGBackOrder} from 'api-logistica';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Manage-Back-Order-Details';
export const SET_PROVIDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Provider Selected'),
  props<{provider: IProvider}>(),
);
export const FETCH_FAMILIES_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Families Load'),
);
export const FETCH_FAMILIES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Families Success'),
  props<{families: Array<IFamiliesBackOrder>}>(),
);
export const FETCH_ORDERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Orders of BackOrder Load'),
);
export const FETCH_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Orders of BackOrder Success'),
  props<{orders: Array<IOrdersBackOrder>}>(),
);
export const FETCH_ITEMS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items od BackOrder Load'),
);
export const FETCH_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items od BackOrder Success'),
  props<{items: Array<IOrdersBackOrder>}>(),
);
export const SELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Selected Family'),
  props<{idFamily: string}>(),
);
export const FETCH_PRODUCTS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Products of BackOrder Load'),
);
export const FETCH_PRODUCTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Products of BackOrder Success'),
  props<{list: Array<VOcProductoTotalesGBackOrder>}>(),
);
export const FETCH_ITEMS_PRODUCTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items of Products od BackOrder Success'),
  props<{items: Array<IItems>}>(),
);
export const SET_FILTER_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Filter Of Type'),
  props<{filter: ITabOption}>(),
);
export const SET_STATUS_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Set Status Item'),
  props<{param: string; IdOcPartidaEdicionBackOrder: string}>(),
);
export const SET_STATUS_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Set Status Product'),
  props<{option: DropListOption}>(),
);
export const SHOW_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Show Pop Up Back Order'),
  props<{status: boolean}>(),
);
export const SAVE_TO_MANAGE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save to Manage Load'),
  props<{data: IOptionsIBackOrder}>(),
);
export const SAVE_TO_MANAGE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save to Manage Success'),
);
export const UPDATE_ITEMS_BACK_ORDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Update Items Backs Order Load'),
  props<{data: IBackOrder}>(),
);
export const SELECTED_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Selected Purchase Order'),
  props<{oc: IOrdersBackOrder}>(),
);
export const SELECTED_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Selected Product'),
  props<{product: IProduct}>(),
);
export const SAVE_ITEMS_CANCEL_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save Items Cancel Load'),
);
export const SAVE_ITEMS_CANCEL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save Items Cancel Success'),
);
export const SAVE_ITEMS_STOCK_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save Items Send Stock Load'),
);
export const SET_STATUS_ITEMS = createAction(
  buildingStringActionType(typeReducer, 'Set Status Api Items'),
  props<{status: number; param: string; itemParam: string}>(),
);
export const CLEAN_ALL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean State Details'),
);
export const GET_HISTORY_BACK_ORDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get History Back Order Load'),
  props<{product: IProduct}>(),
);
export const GET_HISTORY_BACK_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get History Back Order Success'),
  props<{history: Array<OcPartidaEdicionBackOrderHistorial>}>(),
);
export const SET_SELECTED_CONTACT_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Contact Provider'),
  props<{contactSelected: DropListOption}>(),
);

export const SET_PROVIDER_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set Provider Contacts'),
  props<{contacts: Array<ContactoDetalleProvObj>}>(),
);

export const LOAD_CONTACTS_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Load Provider Contacts'),
);
