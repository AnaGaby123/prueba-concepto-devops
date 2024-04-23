import {createAction, props} from '@ngrx/store';
// Models
import {
  IQuoted,
  IQuoteItem,
} from '@appModels/store/pre-processing/preprocess-order-details/sections/add-purchase-order-items/add-purchase-order-items.models';
import {SugerenciaBusqueda} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {CotCotizacion, GMCotFletes, GMPartidaPedido} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'AddPurchaseOrderItemsApi';
const typeReducer = 'AddPurchaseOrderItemsReducer';

export const REDIRECT_ADD_NEW_QUOTES_ITEM_CLIENT = createAction(
  buildingStringActionType(typeApi, 'Redirect Add New Quotes Item Client'),
);
//DOCS: OBTENER LAS COTIZACIONES DEL CLIENTE SELECCIONADO
export const FETCH_QUOTES_CLIENT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set Quotes Client Success'),
  props<{quoteList: Array<IQuoted>}>(),
);
export const FETCH_QUOTES_CLIENT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Set Quotes Client Failed'),
);

export const FETCH_QUOTES_CLIENT = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotes Client'),
);
export const FETCH_QUOTED_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Quote Items Success'),
  props<{items: Array<IQuoteItem>}>(),
);

export const CLEAR_SEARCH_SUGGESTION = createAction(
  buildingStringActionType(typeApi, ' Clear Search Suggestion'),
);

//DOCS: GUARDAR LA COTIZACIÓN SELECCIONADA

export const SET_QUOTED_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Set Quote Selected'),
  props<{item: IQuoted}>(),
);

//DOCS: CARGADOR DE LAS COTIZACIONES
export const FETCH_QUOTED_ITEMS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Quote Items'),
);

//DOCS: AGREGAR UNA PARTIDA
export const ADD_ITEM = createAction(
  buildingStringActionType(typeApi, 'Add item of List'),
  props<{item: IQuoteItem}>(),
);

//DOCS: ELIMINAR UNA PARTIDA

export const DELETE_ITEM = createAction(
  buildingStringActionType(typeApi, 'Delete item of List'),
  props<{item: IQuoteItem}>(),
);

//DOCS: ACTUALIZAR PARTIDA SELECCIONA
export const UPDATE_SELECT_ITEM = createAction(
  buildingStringActionType(typeApi, 'Update status of item'),
  props<{item: IQuoteItem; value: boolean}>(),
);

export const CHECKED_ALL_ITEMS = createAction(
  buildingStringActionType(typeReducer, 'Checked All Items'),
  props<{value: boolean}>(),
);
//DOCS: ACTUALIZAR COTIZACION
export const UPDATE_QUOTE_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Update quoted selected'),
  props<{idQuoted: string}>(),
);

//TODO: CAMBIAR NOMBRE  A LA ACCIÓN
//DOCS: BUSCAR POR TERMINO
export const GET_OPTIONS_OF_PRODUCTS = createAction(
  buildingStringActionType(typeApi, 'Get Options of Product'),
  props<{searchTerm: string}>(),
);
export const FETCH_OPTIONS_PRODUCTS_IN_QUOTATIONS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Options Products In Quotation Success'),
  props<{products: Array<SugerenciaBusqueda>}>(),
);

export const FETCH_OPTIONS_PRODUCTS_IN_CONTRACT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Options Products In Contract  Success'),
  props<{products: Array<SugerenciaBusqueda>}>(),
);

export const GET_OPTIONS_OF_PRODUCTS_ERROR = createAction(
  buildingStringActionType(typeApi, 'Save Products of Search Error'),
);

export const SET_RUN_SEARCH_TERM = createAction(
  buildingStringActionType(typeApi, 'Set Run Search Term'),
  props<{searchTerm: string}>(),
);

//DOCS: SELECCIONAR UN TIPO DE FILTRO DE BUSQUEDA
export const SET_TYPE_FILTER_SEARCH = createAction(
  buildingStringActionType(typeApi, 'Set Type Of Filter Search'),
  props<{filterType: DropListOption}>(),
);

//DOCS: PRESIONAR ENTER (CREO) //TODO: REVISAR PARA QUE SIRVE
export const FETCH_QUOTES_CLIENT_OF_SEARCH = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotes of Search'),
  props<{product: DropListOption; isSearch: boolean}>(),
);
export const FETCH_PRODUCTS_IN_CONTRACT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Product In Contract Load'),
);

export const FETCH_LIST_QUOTED_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch List Quote Items Success'),
  props<{list: Array<IQuoteItem>}>(),
);

//DOCS: OBTENER LOS PRODUCTOS DEL CATALGOO
export const SET_ITEM_LIST_IN_CONTRACT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set Items list in Contract success'),
  props<{items: Array<IQuoteItem>}>(),
);
export const SET_ITEM_LIST_IN_CONTRACT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Set Items list in Contract failed'),
);
export const INITIAL_STATE = createAction(
  buildingStringActionType(typeApi, 'Initial State of Add Items'),
);
export const FETCH_LIST_QUOTED_ITEMS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch List Quote Items'),
);

export const ADD_ITEMS_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeApi, 'Add Items to the selected Purchase Order'),
);
export const ADD_ITEMS_PURCHASE_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save Items to the selected Purchase Order Success'),
  props<{items: GMPartidaPedido[]}>(),
);
export const UPDATE_ADD_ITEM_LIST = createAction(
  buildingStringActionType(typeReducer, 'Update Add Item List'),
  props<{IdCotPartidaCotizacion: string; linkedQuotes: Array<CotCotizacion>}>(),
);
export const CLEAN_BACKUP = createAction(buildingStringActionType(typeReducer, 'Clean BackUp'));
export const FETCH_GM_FREIGHTS = createAction(
  buildingStringActionType(typeApi, 'Fetch Gm Freights'),
);
export const FETCH_GM_FREIGHTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Gm Freights Success'),
  props<{freights: GMCotFletes; IdCotCotizacion: string}>(),
);
export const FETCH_GM_FREIGHTS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Gm Freights Error'),
);
