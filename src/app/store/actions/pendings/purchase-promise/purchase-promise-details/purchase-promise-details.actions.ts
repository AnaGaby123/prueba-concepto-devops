import {createAction, props} from '@ngrx/store';

// Models
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICustomerResults} from '@appModels/store/pendings/purchase-promise/purchase-promise-list/purchase-promise-list.model';
import {
  IPurchasePromiseOrder,
  IPurchasePromiseOrders,
  IPurchasePromiseQuotation,
  IPurchasePromiseQuotations,
  IQuoteItem,
  IQuotesSummary,
  IQuoteSummaryItem,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.models';
import * as apiLogistic from 'api-logistica';
import {
  CorreoRecibidoClienteRequerimientoObj,
  CotCotizacion,
  GMPartidaPromesaDeCompra,
  QueryResultVPromesaDeCompra,
  VPromesaDeCompra,
} from 'api-logistica';
import {ContactoDetalleObj, SugerenciaBusqueda} from 'api-catalogos';
import {IClientTotals} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';
import {buildingStringActionType} from '@appUtil/strings';
import {QuoteItemExtension} from '@appModels/purchase-promise/QuoteItemExtension';

const typeApi = 'API Purchase-Promise-Details';
const typeReducer = 'Purchase-Promise-Details';

export const closeSaleSuccessType = buildingStringActionType(typeReducer, 'Close Sale Success');

export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all details state'),
);
export const SET_SELECTED_OC_BURGER_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set selected OC burger option'),
  props<{selectedOption: DropListOption; field: string; reloadStates: boolean}>(),
);
export const SET_OC_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set OC search term'),
  props<{ocSearchTerm: string; reloadStates: boolean}>(),
);
export const SET_SELECTED_QUOTE_SEARCH_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set selected quote search option'),
  props<{selectedPurchaseSearchOption: DropListOption}>(),
);
export const SET_QUOTE_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set quote search term'),
  props<{purchaseSearchTerm: string}>(),
);
export const SET_SEE_RESUME_ACTIVE = createAction(
  buildingStringActionType(typeReducer, 'Set see resume active'),
  props<{seeResumeActive?: boolean}>(),
);
export const SET_CUSTOMER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Customer Selected'),
  props<{customer: ICustomerResults}>(),
);
export const SET_CUSTOMER_SELECTED_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Customer Selected Success'),
  props<{customer: ICustomerResults}>(),
);
export const SET_API_STATUS_REQUEST = createAction(
  buildingStringActionType(typeReducer, 'Set Api Status Request'),
  props<{status: number}>(),
);
export const FETCH_MAIL_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Error'),
  props<{error: any}>(),
);
export const SET_CLIENT_TOTALS = createAction(
  buildingStringActionType(typeApi, 'Set Totals of Client'),
  props<{clientTotals: IClientTotals}>(),
);
export const FETCH_PURCHASE_ORDERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_PURCHASE_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Success'),
  props<{data: IPurchasePromiseOrders}>(),
);
export const FETCH_PURCHASE_ORDER_UPDATE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Update Success'),
  props<{order: VPromesaDeCompra}>(),
);
export const FETCH_QUOTATIONS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Quotations Load'),
  props<{DescripcionLlave: string}>(),
);
export const FETCH_QUOTATIONS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Quotations Success'),
  props<{quotations: IPurchasePromiseQuotations}>(),
);
export const FETCH_CONTACT_CUSTOMER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Contact Customer Load'),
  props<{idCustomer: string}>(),
);
export const FETCH_CONTACT_CUSTOMER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Contact Customer Success'),
  props<{contact: ContactoDetalleObj}>(),
);
export const FETCH_CONTACT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Contact Load'),
  props<{quote: IPurchasePromiseQuotation}>(),
);
export const FETCH_CONTACT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Contact Success'),
  props<{contact: ContactoDetalleObj; IdCotCotizacion: string}>(),
);
export const FETCH_CLIENT_TOTALS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch quotes load'),
  props<{IdClient: string}>(),
);
export const FETCH_CLIENTS_TOTALS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch quotes success'),
  props<{totals: IClientTotals}>(),
);
export const SET_PURCHASE_ORDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Purchase Order Selected'),
  props<{item: IPurchasePromiseOrder}>(),
);
export const SET_STATUS_API_REQUEST = createAction(
  buildingStringActionType(typeReducer, 'Set Status Api Request'),
  props<{status: number}>(),
);
export const FETCH_MAIL_PURCHASE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Mail Purchase Success'),
  props<{mail: CorreoRecibidoClienteRequerimientoObj; idPPedido: string}>(),
);
export const VIEW_FILE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Update View File Load'),
  props<{IdArchivo: string; ext: string}>(),
);
export const VIEW_FILE_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'View file is loading'),
  props<{value: boolean}>(),
);
export const VIEW_FILE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Update View Success'),
  props<{fileBase64: string}>(),
);
export const VIEW_FILE_ERROR = createAction(buildingStringActionType(typeApi, 'Update View Error'));
export const SET_OPEN_VIEW_FILE = createAction(
  buildingStringActionType(typeApi, 'Actualizar visualización'),
  props<{active: boolean}>(),
);
export const SET_RUN_SEARCH_TERM = createAction(
  buildingStringActionType(typeApi, 'Set Run Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_QUOTES_CLIENT_OF_SEARCH = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotes of Search'),
  props<{product: DropListOption; isSearch: boolean}>(),
);
export const FETCH_PRODUCTS_IN_CONTRACT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Product In Contract Load'),
);
export const SET_ITEM_LIST_CONTRACT = createAction(
  buildingStringActionType(typeReducer, 'Set Item List Contract'),
  props<{items: Array<IQuoteItem>}>(),
);
export const FETCH_OPTIONS_OF_PRODUCTS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Options Search Load'),
  props<{searchTerm: string}>(),
);
export const FETCH_OPTIONS_PRODUCTS_IN_QUOTATIONS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Options Products In Quotation Search Success'),
  props<{product: Array<SugerenciaBusqueda>}>(),
);

export const FETCH_OPTIONS_PRODUCTS_IN_QUOTATIONS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Options Products In Quotation Search Failed'),
);
export const FETCH_OPTIONS_PRODUCTS_IN_CONTRACT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Options Products In Contract Search Success'),
  props<{product: Array<SugerenciaBusqueda>}>(),
);

export const FETCH_OPTIONS_PRODUCTS_IN_CONTRACT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Options Products In Contract Search Failed'),
);

export const SET_STATUS_API_PRODUCTS = createAction(
  buildingStringActionType(typeReducer, 'Set Status Api Products'),
  props<{status: number}>(),
);
export const FETCH_QUOTED_ITEMS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Quote Items Load'),
  props<{quote: IPurchasePromiseQuotation}>(),
);
export const FETCH_QUOTED_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Quote Items Success'),
  props<{list: Array<IQuoteItem>}>(),
);
export const SELECT_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Select Item of Summary'),
  props<{item: IQuoteItem; i: number}>(),
);
export const ADD_ITEMS_SUMMARY_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Add Items Summary Load'),
);
export const ADD_ITEMS_SUMMARY_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Add Items Summary Success'),
);
export const FETCH_SUMMARY_LIST_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Summary List Load'),
  props<{ignoreLength: boolean}>(),
);
export const FETCH_SUMMARY_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Summary List Success'),
  props<{data: IQuotesSummary}>(),
);
export const FETCH_QUOTED_SELECT_ITEMS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Quote Select Items Load'),
  props<{quote: IPurchasePromiseQuotation}>(),
);
export const SET_API_STATUS_ITEM_LIST = createAction(
  buildingStringActionType(typeReducer, 'Set Api Status of Item List'),
  props<{status: number; node: string}>(),
);
export const SET_VALIDATE_ENTRY_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Set Partida esta validada'),
  props<{IdCotPartidaCotizacion: string; value: boolean}>(),
);
export const SET_INCIDENCE_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set incidence value'),
  props<{IdCotPartidaCotizacion: string; field: string; value: boolean | string}>(),
);
export const SET_SANOFI_VALUE_2 = createAction(
  buildingStringActionType(typeReducer, 'Set sanofi value'),
  props<{field: string; value: boolean | string}>(),
);
export const DELETE_ITEM_SUMMARY_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Delete Item Summary Load'),
  props<{item: IQuoteSummaryItem}>(),
);

export const REMOVE_IQUOTE_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Remove Item Summary Load'),
  props<{IdCotPartidaCotizacion: string}>(),
);
export const DELETE_ITEM_SUMMARY_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Delete Item Summary Success'),
);
export const UPDATE_PRICE_QUANTITY_ITEM_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Update Price Quantity Item Load'),
  props<{item: IQuoteSummaryItem}>(),
);
export const UPDATE_PRICE_QUANTITY_ITEM_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Update Price Quantity Item Success'),
);
export const SET_INPUT_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set input está visible'),
  props<{entryId: string; field: string}>(),
);
export const SET_INPUT_IS_CLOSE = createAction(
  buildingStringActionType(typeReducer, 'Set input está invisible'),
);
export const FETCH_TOTALS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Totals Load'),
);
export const FETCH_TOTALS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Totals Success'),
  props<{result: QueryResultVPromesaDeCompra}>(),
);
export const CLOSE_SALE_WITH_OC_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Close Sale Load'),
);
export const CLOSE_SALE_WITH_OC_SUCCESS = createAction(closeSaleSuccessType);
export const SET_ITEM_LINKED = createAction(
  buildingStringActionType(typeReducer, 'Set item linked'),
  props<{item: IQuoteSummaryItem}>(),
);
export const UPDATE_ITEM_LIST = createAction(
  buildingStringActionType(typeReducer, 'Update item list'),
  props<{IdCotPartidaCotizacion: string; linkedQuotes: Array<CotCotizacion>}>(),
);
export const UPDATE_SUMMARY_LIST = createAction(
  buildingStringActionType(typeReducer, 'Update Summary List'),
  props<{
    IdPcPartidaPromesaDeCompra: string;
    linkedQuotes: Array<CotCotizacion>;
  }>(),
);
export const SET_ID_ARCHIVO_PDF = createAction(
  buildingStringActionType(typeApi, 'Set Archivo PDF'),
  props<{IdArchivo: string}>(),
);

export const ADD_SUMMARY_PURCHASE_PROMISE = createAction(
  buildingStringActionType(typeApi, 'Set partida de compra'),
);

export const RESET_PURCHASE_PROMISE_LIST = createAction(
  buildingStringActionType(typeApi, 'Reset promesas de compra'),
);

export const SET_ESTATUS_SUMMARY_LIST = createAction(
  buildingStringActionType(typeApi, 'Set status request'),
  props<{statusRequest: number}>(),
);

export const SELECTED_IQUOTE_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Selected Iquote Item'),
  props<{item: GMPartidaPromesaDeCompra & QuoteItemExtension; i: number}>(),
);
export const RESTORE_SELECTED_IQUOTE_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Remove selected Iquote Item'),
);

export const UPDATE_IQUOTE_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Update selected Iquote Item'),
  props<{value: string | number | boolean; node: string}>(),
);
export const SET_IQUOTE_ITEM_DATE_ESTIMATED_FEE = createAction(
  buildingStringActionType(typeReducer, 'Set date estimated fee'),
  props<{date: Date; dateString: string}>(),
);

export const SAVE_CHANGES_IQUOTE_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Save selected Iquote item'),
);

export const FETCH_NON_WORKING_DAYS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Non Working Days Success'),
  props<{nonWorkingDays: Array<string>}>(),
);
export const UPDATE_SELECTED_PURCHASE_PROMISE = createAction(
  buildingStringActionType(typeReducer, 'Update selected purchase promise'),
  props<{value: boolean | string; node: string}>(),
);

export const FETCH_FREIGHT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch freight Load'),
  props<{IdCotCotizacion: string}>(),
);

export const FETCH_FREIGHT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch freight Success'),
  props<{fletes: apiLogistic.GMCotFletes; IdCotCotizacion: string}>(),
);

export const SELECT_FLETE = createAction(
  buildingStringActionType(typeReducer, 'Select flete quotation'),
  props<{IdCotCotizacion: string; status: boolean}>(),
);

export const DELETE_FLETE = createAction(
  buildingStringActionType(typeReducer, 'Delete flete quotation'),
  props<{IdCotCotizacionFleteExpress: string | null; IdsFletesUltimaMilla: string[]}>(),
);

export const CHECK_ALL_ORDERS = createAction(
  buildingStringActionType(typeReducer, 'Check All Orders'),
  props<{checked: boolean}>(),
);

export const SET_QUOTE_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set quote value'),
  props<{IdCotPartidaCotizacion: string; field: string; value: boolean | string | number}>(),
);

export const SET_VALUE_TOTAL_IN_PROMISE = createAction(
  buildingStringActionType(typeReducer, 'Set Value Total In Promise'),
  props<{total: number}>(),
);
export const PURCHASE_ORDERS_EMPTY = createAction(
  buildingStringActionType(typeReducer, 'Purchase Orders Empty'),
);
export const RESET_ITEM_LIST = createAction(
  buildingStringActionType(typeReducer, 'Reset Item List'),
);
export const SET_UPDATE_REFERENCE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set update reference load'),
  props<{reference: string}>(),
);
export const SET_UPDATE_REFERENCE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set update reference success'),
  props<{reference: string}>(),
);
