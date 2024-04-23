import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICustomerFPP} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise.models';
import {
  IFollowPPromiseClientData,
  IFollowPPromiseItems,
} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-details/follow-purchase-promise-details.models';
import {buildingStringActionType} from '@appUtil/strings';
import {CotPromesaDeCompraPartida, GMCotFletes, VCotCotizacion} from 'api-logistica';

const typeApi = 'API Follow-Purchase-Promise-Details';
const typeReducer = 'Follow-Purchase-Promise-Details';

export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all details state'),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set search term'),
  props<{searchTerm: string}>(),
);
export const SET_SELECTED_SEARCH_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set selected search option'),
  props<{selectedSearchOption: DropListOption}>(),
);
export const SET_CLIENT_FOLLOW_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Set selected client'),
  props<{customer: ICustomerFPP}>(),
);
export const GET_CLIENT_DATA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Client Data Success'),
  props<{clientData: IFollowPPromiseClientData}>(),
);
export const GET_CLIENT_DATA_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get Client Data Failed'),
);
export const GET_PURCHASE_ORDERS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Purchase Orders Load'),
);
export const GET_PURCHASE_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Purchase Orders Success'),
  props<{purchaseOrders: IFollowPPromiseItems}>(),
);
export const GET_PURCHASE_ORDERS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get Purchase Orders Failed'),
);
export const SET_ENTRIES_API_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set entries api status'),
  props<{status: number}>(),
);
export const SET_PROMISE_CHECK_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set promise check value'),
  props<{value: boolean}>(),
);
export const SET_JUSTIFICATION_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set justification value'),
  props<{justification: string}>(),
);
export const SET_PURCHASE_PROMISE_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set purchase promise date'),
  props<{date: Date; stringDate: string}>(),
);
export const SET_ITEM_CHECK_BOX_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set check box resume value'),
  props<{
    itemId?: string;
    isCheckAllItems?: boolean;
  }>(),
);
export const SEND_ENTRIES_TO_PURCHASE_PROMISE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set entries to purchase promise load'),
);
export const SEND_ENTRIES_TO_PURCHASE_PROMISE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set entries to purchase promise success'),
);
export const SEND_ENTRIES_TO_PURCHASE_PROMISE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set entries to purchase promise failed'),
);
export const SEND_ENTRIES_WITHOUT_OC_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set entries without oc load'),
);
export const SEND_ENTRIES_WITHOUT_OC_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set entries without oc success'),
);
export const SEND_ENTRIES_WITHOUT_OC_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set entries without oc failed'),
);
export const GET_JUSTIFICATION_HISTORY_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get justification history load'),
);
export const GET_JUSTIFICATION_HISTORY_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set justification history success'),
  props<{
    justifications: CotPromesaDeCompraPartida[];
  }>(),
);
export const GET_JUSTIFICATION_HISTORY_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set justification history failed'),
);
export const SET_IDARCHIVO = createAction(
  buildingStringActionType(typeReducer, 'Download file load'),
  props<{IdArchivo: string}>(),
);
export const FETCH_BRANDS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch brands load'),
  props<{idQuotation: string}>(),
);
export const GET_BRANDS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Brands Success'),
  props<{brands: Array<DropListOption>; idQuotation: string}>(),
);
export const SET_BRAND_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Brand Selected'),
  props<{brand: DropListOption}>(),
);
export const FETCH_HISTORY_PURCHASE_PROMISE = createAction(
  buildingStringActionType(typeApi, 'Fetch History Purchase Promise'),
  props<{
    idcotPromesaDeCompraPartida: string;
  }>(),
);
export const FETCH_HISTORY_PURCHASE_PROMISE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch History Purchase Promise Success'),
  props<{
    justifications: CotPromesaDeCompraPartida[];
  }>(),
);
export const FETCH_HISTORY_PURCHASE_PROMISE_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch History Purchase Promise Error'),
);
export const FETCH_QUOTATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotation Success'),
  props<{quotation: VCotCotizacion}>(),
);
export const FETCH_QUOTATION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotation Failed'),
);
export const FETCH_FREIGHTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Freights Success'),
  props<{freights: GMCotFletes}>(),
);
export const FETCH_FREIGHTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Freights Failed'),
);

export const FETCH_DATES_TRAINING_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Dates Training Success'),
  props<{items?: IFollowPPromiseItems}>(),
);
