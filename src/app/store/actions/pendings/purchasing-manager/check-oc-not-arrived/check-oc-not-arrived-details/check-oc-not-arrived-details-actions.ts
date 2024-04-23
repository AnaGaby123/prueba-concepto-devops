/* Core Imports */
import {createAction, props} from '@ngrx/store';

/* Models Imports */
import {
  IFamily,
  IItems,
  IPurchaseOrder,
  ITotals,
} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-details/check-oc-not-arrived-details.model';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-list/check-oc-not-arrived-list.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {VOcOrdenDeCompraMonitorearDetalle} from 'api-logistica';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'checkOcNotArrivedDetails';
const typeApi = 'checkOcNotArrivedDetailsApi';

export const CLEAN_ALL_CHECK_OC = createAction(
  buildingStringActionType(typeReducer, 'Clean All Check OC Not Arrived'),
);
export const SET_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Provider'),
  props<{providerSelected: IProvider}>(),
);
export const FETCH_FAMILIES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Families Load'),
);
export const FETCH_FAMILIES_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Families Success'),
  props<{families: Array<IFamily>}>(),
);
export const FETCH_FAMILIES_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Families Failed'),
);
export const SET_FAMILY_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Family Selected'),
  props<{idFamily: string}>(),
);
export const SET_TAB_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Option Selected'),
  props<{tabSelected: DropListOption}>(),
);
export const SET_DROPDOWN_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Dropdown Option Selected'),
  props<{dropDownOptionSelected: string}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_PURCHASE_ORDERS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchases Orders Load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_PURCHASE_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchase Orders Success'),
  props<{purchaseOrders: Array<IPurchaseOrder>; totalPurchaseOrders: number}>(),
);
export const FETCH_PURCHASE_ORDERS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchase Orders Failed'),
);
export const SET_IS_LOADING_MORE_PURCHASE_ORDERS = createAction(
  buildingStringActionType(typeReducer, 'Set Is Loading More Purchase Orders'),
  props<{isLoadingMorePurchases: boolean}>(),
);
export const FETCH_ITEMS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Success'),
  props<{items: Array<Array<IItems>>; totalItems: number}>(),
);
export const FETCH_ITEMS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Failed'),
);
export const SET_IS_LOADING_MORE_ITEMS = createAction(
  buildingStringActionType(typeReducer, 'Set Is Loading More Items'),
  props<{isLoadingMoreItems: boolean}>(),
);
export const SET_PURCHASE_ORDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Purchase Order Selected'),
  props<{IdOcOrdenDeCompra: string}>(),
);
export const FETCH_TOTALS_OF_FAMILY = createAction(
  buildingStringActionType(typeApi, 'Fetch Totals of Family'),
  props<{totals: ITotals}>(),
);
export const SET_ITEM_CHECK_ACTIVE = createAction(
  buildingStringActionType(typeReducer, 'Set Item Check Active'),
  props<{i: number; item: IItems; typeOfCheck: string; newStatus: string}>(),
);
export const SET_ITEM_CHECK_CANCEL = createAction(
  buildingStringActionType(typeReducer, 'Set Item Check Cancel'),
  props<{i: number; item: IItems; typeOfCheck: string}>(),
);
export const RESTORE_SOME_ITEMS = createAction(
  buildingStringActionType(typeReducer, 'Delete Some Items'),
  props<{i: number; k: number}>(),
);
export const DELETE_ITEM_LOCAL_CONFIGURATION_CANCEL = createAction(
  buildingStringActionType(typeReducer, 'Delete Item Local Configuration Cancel'),
  props<{i: number; item: IItems}>(),
);
export const DELETE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Delete Item Local Configuration Back Order'),
  props<{i: number; item: IItems}>(),
);
export const DELETE_ITEM_LOCAL_CONFIGURATION_IMPACT = createAction(
  buildingStringActionType(typeReducer, 'Delete Item Local Configuration Impact'),
  props<{i: number; item: IItems}>(),
);
export const SAVE_ITEM_LOCAL_CONFIGURATION_CANCEL = createAction(
  buildingStringActionType(typeReducer, 'Save Item Local Configuration Cancel'),
  props<{i: number; item: IItems}>(),
);
export const SAVE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Save Item Local Configuration Back Order'),
  props<{i: number; item: IItems}>(),
);
export const SAVE_ITEM_LOCAL_CONFIGURATION_IMPACT = createAction(
  buildingStringActionType(typeReducer, 'Save Item Local Configuration Impact'),
  props<{i: number; item: IItems}>(),
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
export const SET_ITEM_FIELD_VALUE_RADIO_BUTTON_IMPACT = createAction(
  buildingStringActionType(typeReducer, 'Set Item Field Value Radio Button Impact'),
  props<{
    i: number;
    itemNumber: number;
    field: string;
    value: boolean;
  }>(),
);
export const SET_ITEM_FIELD_VALUE_IMPACT = createAction(
  buildingStringActionType(typeReducer, 'Set Item Field Value Impact'),
  props<{
    i: number;
    itemNumber: number;
    field: string;
    value: string | Date | File;
  }>(),
);
export const MODIFIED_PRICE_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Update Price of Item'),
  props<{i: number; item: IItems}>(),
);
export const CONFIRM_ITEMS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Confirm Items of Order Load'),
);
export const CONFIRM_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Confirm Items of Order Success'),
);
export const CONFIRM_ITEMS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Confirm Items of Order Failed'),
);
export const REFRESH_PURCHASE_ORDERS = createAction(
  buildingStringActionType(typeApi, 'Refresh Purchase Orders'),
);
export const REFRESH_SELECTED_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeApi, 'Refresh Selected Purchase Order'),
);
export const REFRESH_SELECTED_PURCHASE_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Refresh Selected Purchase Order Success'),
  props<{order: VOcOrdenDeCompraMonitorearDetalle}>(),
);
export const REFRESH_SELECTED_PURCHASE_ORDER_FAILED = createAction(
  buildingStringActionType(typeApi, 'Refresh Selected Purchase Order Failed'),
);
export const SET_SELECTED_CONTACT_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Contact Provider'),
  props<{contactSelected: DropListOption}>(),
);

export const SET_PROVIDER_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set Provider Contacts'),
  props<{contacts: Array<ContactoDetalleProvObj>}>(),
);

export const CONTACTS_PROVIDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Load Contacts Provider'),
);
