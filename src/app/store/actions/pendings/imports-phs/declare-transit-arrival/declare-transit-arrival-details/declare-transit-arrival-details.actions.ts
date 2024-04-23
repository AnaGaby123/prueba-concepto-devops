import {createAction, props} from '@ngrx/store';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';
import {
  IItemsDeclareArrival,
  IPurchaseOrderArrival,
} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {VOcProveedorDeclararArribo} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'DeclareTransitArrivalDetails';
const typeApi = 'DeclareTransitArrivalDetailsApi';

export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all details state'),
);
export const SET_SELECTED_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Provider'),
  props<{selectedProvider: IProvider}>(),
);
export const FETCH_PURCHASE_ORDERS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Purchase Order Load'),
);
export const FETCH_PURCHASE_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Success'),
  props<{orders: Array<IPurchaseOrderArrival>}>(),
);
export const FETCH_ITEMS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Items of Order Load'),
);
export const FETCH_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items of Order Success'),
  props<{list: Array<IItemsDeclareArrival>}>(),
);
export const SET_ITEMS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set items status'),
  props<{itemsStatus: number}>(),
);
export const SET_ORDERS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set orders status'),
  props<{purchaseOrdersStatus: number}>(),
);
export const SET_SELECTED_TAB_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set selected tab option'),
  props<{selectedTabOption: ITabOption}>(),
);
export const SET_SORT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Sort Selected'),
  props<{sort: DropListOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set search term'),
  props<{searchTerm: string}>(),
);
export const SET_SELECTED_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set selected order'),
  props<{purchaseOrderId: string}>(),
);
export const SET_SELECTED_FILTER_BY_LETTER_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set selected filter by letter details'),
  props<{filterByLetter: ITabOption}>(),
);
export const SET_SELECTED_FILTER_BY_LETTER = createAction(
  buildingStringActionType(typeReducer, 'Set selected filter by letter'),
  props<{filterByLetter: ITabOption}>(),
);
export const INITIAL_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Initial Purchase Order'),
  props<{order: IPurchaseOrderArrival}>(),
);
export const SET_SELECTED_COUNTRY = createAction(
  buildingStringActionType(typeReducer, 'Set Selected country'),
  props<{node: string; itemId: string; country: DropListOption}>(),
);
export const SET_SELECTED_LOT = createAction(
  buildingStringActionType(typeReducer, 'Set Selected lot'),
  props<{node: string; itemId: string; lot: DropListOption}>(),
);
export const SET_SELECTED_LOT_NAME = createAction(
  buildingStringActionType(typeReducer, 'Set Selected lot name'),
  props<{node: string; itemId: string; lot: string}>(),
);
export const SET_CHECK_WITHOUT_CERTIFICATE = createAction(
  buildingStringActionType(typeReducer, 'Set check without certificate'),
  props<{node: string; itemId: string; value: boolean}>(),
);
export const SET_ITEM_CERTIFICATE_FILE = createAction(
  buildingStringActionType(typeReducer, 'Set item certificate file'),
  props<{node: string; itemId: string; file: File}>(),
);
export const SET_PACKING_LIST_FILE = createAction(
  buildingStringActionType(typeReducer, 'Set packing list file'),
  props<{file: File}>(),
);
export const SET_ITEM_DOWN = createAction(
  buildingStringActionType(typeReducer, 'Set item down'),
  props<{itemId: string}>(),
);
export const DELETE_ITEM_DOWN = createAction(
  buildingStringActionType(typeReducer, 'Delete item down'),
  props<{itemId: string}>(),
);
export const GENERATE_LOAD = createAction(buildingStringActionType(typeReducer, 'Generate load'));
export const GENERATE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Generate success'),
);
export const GENERATE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Generate failed'),
);
export const REFRESH_SELECTED_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Provider'),
  props<{selectedProvider: VOcProveedorDeclararArribo}>(),
);
