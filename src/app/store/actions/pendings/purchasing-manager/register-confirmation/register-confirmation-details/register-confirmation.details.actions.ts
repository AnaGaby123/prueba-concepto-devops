/* Core Imports */
import {createAction, props} from '@ngrx/store';

/* Models Imports */
import {
  IFamily,
  IItemsFamily,
  IOrdersFamily,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {VOcOrdenDeCompra} from 'api-logistica';

/*Models Imports*/
import {IProvider} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'RegisterConfirmationDetails';

export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all details state'),
);
export const SET_PROVIDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Provider Register confirmation'),
  props<{providerSelected: IProvider}>(),
);
export const FETCH_FAMILIES_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Families Load'),
);
export const FETCH_FAMILIES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Families Success'),
  props<{list: Array<IFamily>}>(),
);
export const REFRESH_PURCHASE_ORDERS = createAction(
  buildingStringActionType(typeReducer, 'Refresh Purchase Orders'),
);
export const REFRESH_SELECTED_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Purchase Order'),
);
export const REFRESH_SELECTED_PURCHASE_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Purchase Order Success'),
  props<{order: VOcOrdenDeCompra}>(),
);
export const REFRESH_SELECTED_PURCHASE_ORDER_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Purchase Order Failed'),
);
export const FETCH_PURCHASE_ORDERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Orde of Family Loas'),
);
export const FETCH_PURCHASE_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Orde of Family Success'),
  props<{orders: Array<IOrdersFamily>}>(),
);
export const FETCH_ITEMS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items of Order Load'),
);
export const FETCH_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items of Order Success'),
  props<{list: Array<Array<IItemsFamily>>}>(),
);
export const INITIAL_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Initial Purchase Order'),
  props<{order: IOrdersFamily}>(),
);
export const SET_ITEMS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set items status'),
  props<{itemsStatus: number}>(),
);
export const SET_ORDERS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set orders status'),
  props<{ordersStatus: number}>(),
);
export const SET_SELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set selected family'),
  props<{familyId: string}>(),
);
export const SET_SELECTED_TAB_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set selected tab option'),
  props<{selectedTabOption: ITabOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set search term'),
  props<{searchTerm: string}>(),
);
export const SET_SELECTED_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set selected order'),
  props<{orderId: string}>(),
);
export const SET_SELECTED_ORDER_FIELD_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set selected order field value'),
  props<{field: string; value: any}>(),
);
export const SET_ITEM_CHECK_ACTIVE = createAction(
  buildingStringActionType(typeReducer, 'Set item check active'),
  props<{
    i: number;
    item: IItemsFamily;
    typeOfCheck: string;
    newStatus: string;
  }>(),
);
export const SET_ITEM_CHECK_CANCEL = createAction(
  buildingStringActionType(typeReducer, 'Set item check cancel'),
  props<{
    i: number;
    item: IItemsFamily;
    typeOfCheck: string;
  }>(),
);
export const SET_ITEM_FIELD_VALUE_RADIO_BUTTON_CANCEL = createAction(
  buildingStringActionType(typeReducer, 'Set item field value radio button cancel'),
  props<{
    i: number;
    itemNumber: number;
    field: string;
    value: boolean;
  }>(),
);
export const SET_ITEM_FIELD_VALUE_STRING_CANCEL = createAction(
  buildingStringActionType(typeReducer, 'Set item field value string cancel'),
  props<{
    i: number;
    itemNumber: number;
    field: string;
    value: string;
  }>(),
);
export const SET_ITEM_FIELD_VALUE_BACK_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set item field value back order'),
  props<{
    i: number;
    itemNumber: number;
    field: string;
    value: string | Date | File;
  }>(),
);
export const SET_ITEM_FIELD_VALUE_RADIO_BUTTON_IMPACT = createAction(
  buildingStringActionType(typeReducer, 'Set item field value radio button impact'),
  props<{
    i: number;
    itemNumber: number;
    field: string;
    value: boolean;
  }>(),
);
export const SET_ITEM_FIELD_VALUE_WITHOUT_IMPACT = createAction(
  buildingStringActionType(typeReducer, 'Set item field value without impact'),
  props<{
    i: number;
    itemNumber: number;
    field: string;
    value: string | Date;
  }>(),
);
export const SET_ITEM_FIELD_VALUE_IMPACT = createAction(
  buildingStringActionType(typeReducer, 'Set item field value impact'),
  props<{
    i: number;
    itemNumber: number;
    field: string;
    value: string | Date | File;
  }>(),
);
export const SAVE_ITEM_LOCAL_CONFIGURATION_CANCEL = createAction(
  buildingStringActionType(typeReducer, 'Save item local configuration cancel'),
  props<{
    i: number;
    item: IItemsFamily;
  }>(),
);
export const SAVE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Save item local configuration back order'),
  props<{
    i: number;
    item: IItemsFamily;
  }>(),
);
export const SAVE_ITEM_LOCAL_CONFIGURATION_IMPACT = createAction(
  buildingStringActionType(typeReducer, 'Save item local configuration impact'),
  props<{
    i: number;
    item: IItemsFamily;
  }>(),
);
export const SAVE_ITEM_LOCAL_CONFIGURATION_WITHOUT_IMPACT = createAction(
  buildingStringActionType(typeReducer, 'Save item local configuration without impact'),
  props<{
    i: number;
    item: IItemsFamily;
  }>(),
);
export const DELETE_ITEM_LOCAL_CONFIGURATION_CANCEL = createAction(
  buildingStringActionType(typeReducer, 'Delete item local configuration cancel'),
  props<{
    i: number;
    item: IItemsFamily;
  }>(),
);
export const DELETE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Delete item local configuration back order'),
  props<{
    i: number;
    item: IItemsFamily;
  }>(),
);
export const DELETE_ITEM_LOCAL_CONFIGURATION_IMPACT = createAction(
  buildingStringActionType(typeReducer, 'Delete item local configuration impact'),
  props<{
    i: number;
    item: IItemsFamily;
  }>(),
);
export const DELETE_ITEM_LOCAL_CONFIGURATION_WITHOUT_IMPACT = createAction(
  buildingStringActionType(typeReducer, 'Delete item local configuration without impact'),
  props<{
    i: number;
    item: IItemsFamily;
  }>(),
);
export const RESTORE_SOME_ITEMS = createAction(
  buildingStringActionType(typeReducer, 'Delete some items'),
  props<{
    i: number;
    k: number;
  }>(),
);
export const CHECK_ALL_ITEMS = createAction(
  buildingStringActionType(typeReducer, 'Check all items'),
  props<{
    FechaEstimadaArribo: string;
    FechaEstimadaArriboDate: Date;
  }>(),
);
export const CONFIRM_ITEMS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Confirm Items of Order Load'),
);
export const CONFIRM_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Confirm Items of Order Success'),
);
export const CONFIRM_ITEMS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Confirm Items of Order Failed'),
);
export const MODIFIED_PRICE_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Update Price of Item'),
  props<{i: number; item: IItemsFamily}>(),
);

export const PROVIDER_CONTACTS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Load Provider Contacts'),
);
export const SET_PROVIDER_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set Provider Contacts'),
  props<{contacts: Array<ContactoDetalleProvObj>}>(),
);

export const SET_SELECTED_CONTACT_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Contact Provider'),
  props<{contactSelected: DropListOption}>(),
);
