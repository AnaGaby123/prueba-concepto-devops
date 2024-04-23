/* Core Imports */
import {createAction, props} from '@ngrx/store';

/* Models Imports */
import {
  IItem,
  IPurchaseOrder,
} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-details/confirm-dispatch-details.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {OcPartida, VImpCDOrdenesDeCompra, VImpCDProveedores} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Confirm-Dispatch-Details';
const typeApi = 'Confirm-Dispatch-Details-Api';

export const CLEAN_ALL_CONFIRM_DISPATCH_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Clean All Confirm Dispatch Details'),
);
export const SET_TERM_SEARCH = createAction(
  buildingStringActionType(typeReducer, 'Set Term Search'),
  props<{searchTerm: string}>(),
);
export const SET_VIEW_MODE = createAction(
  buildingStringActionType(typeReducer, 'Set View Mode'),
  props<{viewMode: 'normal' | 'summary'}>(),
);
export const FETCH_PURCHASE_ORDERS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchase Orders Load'),
);
export const FETCH_PURCHASE_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchase Orders Success'),
  props<{purchaseOrders: Array<IPurchaseOrder>}>(),
);
export const FETCH_PURCHASE_ORDERS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchase Orders Failed'),
);
export const SET_TAB_TOTALS = createAction(
  buildingStringActionType(typeReducer, 'Set Totals in Tab'),
  props<{
    all: number;
    oneDay: number;
    twoDays: number;
    threeDays: number;
    moreThanThreeDays: number;
  }>(),
);
export const SET_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Orders Success'),
  props<{tabSelected: ITabOption}>(),
);
export const SET_PURCHASE_ORDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Purchase Order Selected'),
  props<{IdOcPackingList: string}>(),
);
export const SET_ITEMS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set items status'),
  props<{itemsStatus: number}>(),
);
export const FETCH_ITEMS_LOAD = createAction(buildingStringActionType(typeApi, 'Fetch Items Load'));
export const FETCH_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Success'),
  props<{items: Array<Array<IItem>>}>(),
);
export const FETCH_ITEMS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Failed'),
);
export const SET_ITEM_CHECK_ACTIVE = createAction(
  buildingStringActionType(typeReducer, 'Set Item Check Active'),
  props<{i: number; item: IItem; typeOfCheck: string; newStatus: string}>(),
);
export const RESTORE_SOME_ITEMS = createAction(
  buildingStringActionType(typeReducer, 'Delete Some Items'),
  props<{i: number; k: number}>(),
);
export const SET_ITEM_CHECK_CANCEL = createAction(
  buildingStringActionType(typeReducer, 'Set Item Check Cancel'),
  props<{i: number; item: IItem; typeOfCheck: string}>(),
);
export const DELETE_ITEM_LOCAL_CONFIGURATION_CANCEL = createAction(
  buildingStringActionType(typeReducer, 'Delete Item Local Configuration Cancel'),
  props<{i: number; item: IItem}>(),
);
export const DELETE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Delete Item Local Configuration Back Order'),
  props<{i: number; item: IItem}>(),
);
export const SAVE_ITEM_LOCAL_CONFIGURATION_CANCEL = createAction(
  buildingStringActionType(typeReducer, 'Save Item Local Configuration Cancel'),
  props<{i: number; item: IItem}>(),
);
export const SAVE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Save Item Local Configuration Back Order'),
  props<{i: number; item: IItem}>(),
);
export const SET_ITEM_FIELD_VALUE_RADIO_BUTTON_CANCEL = createAction(
  buildingStringActionType(typeReducer, 'Set Item Field Value Radio Button Cancel'),
  props<{
    i: number;
    itemNumber: number;
    field: string;
    value: boolean;
  }>(),
);
export const SET_ITEM_FIELD_VALUE_STRING_CANCEL = createAction(
  buildingStringActionType(typeReducer, 'Set Item Field Value String Cancel'),
  props<{
    i: number;
    itemNumber: number;
    field: string;
    value: string;
  }>(),
);
export const SET_ITEM_FIELD_VALUE_BACK_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set Item Field Value Back Order'),
  props<{
    i: number;
    itemNumber: number;
    field: string;
    value: string | Date | File;
  }>(),
);
export const SET_PACKING_LIST_GUIDE_FILE = createAction(
  buildingStringActionType(typeReducer, 'Set Item Field Value Back Order'),
  props<{field: string; file: File}>(),
);
export const SET_ITEM_FIELD_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set Item Field Value'),
  props<{field: string; value: string | DropListOption | File}>(),
);
export const CHECK_ALL_ITEMS = createAction(
  buildingStringActionType(typeReducer, 'Check All Items'),
);
export const CONFIRM_ITEMS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Confirm Items of Order Load'),
);
export const CONFIRM_ITEMS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Confirm Items of Order Failed'),
);
export const CONFIRM_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Confirm Items of Order Success'),
);
export const FINISH_ITEMS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Finish Items of Order Load'),
);
export const FINISH_ITEMS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Finish Items of Order Failed'),
);
export const FINISH_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Finish Items of Order Success'),
);
export const FETCH_ITEMS_CONFIRMED_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Confirmed Load'),
);
export const FETCH_ITEMS_CONFIRMED_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Confirmed Success'),
  props<{
    itemsInSummary: Array<IItem>;
  }>(),
);
export const FETCH_ITEMS_CONFIRMED_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Confirmed Failed'),
);
export const FETCH_RESTORE_ITEM_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Restore Item Load'),
  props<{
    ocPartida: OcPartida;
  }>(),
);
export const FETCH_RESTORE_ITEM_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Restore Item Success'),
);
export const FETCH_RESTORE_ITEM_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Restore Item Failed'),
);
export const REFRESH_PURCHASE_ORDERS = createAction(
  buildingStringActionType(typeReducer, 'Refresh Purchase Orders'),
);
export const REFRESH_SELECTED_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Purchase Order'),
);
export const REFRESH_SELECTED_PURCHASE_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Purchase Order Success'),
  props<{order: VImpCDOrdenesDeCompra}>(),
);
export const REFRESH_SELECTED_PURCHASE_ORDER_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Purchase Order Failed'),
);
export const REFRESH_SELECTED_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Provider'),
);
export const REFRESH_SELECTED_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Provider Success'),
  props<{provider: VImpCDProveedores}>(),
);
export const REFRESH_SELECTED_PROVIDER_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Provider Failed'),
);
export const REFRESH_ALL_PURCHASE_ORDERS = createAction(
  buildingStringActionType(typeReducer, 'Refresh All Purchase Orders'),
);
export const SET_SELECTED_CONTACT_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Provider Contact'),
  props<{contactSelected: DropListOption}>(),
);

export const LOAD_CONTACTS_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Load Provider Contacts'),
);

export const SET_PROVIDER_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set Provider Contacts'),
  props<{contacts: Array<ContactoDetalleProvObj>}>(),
);
