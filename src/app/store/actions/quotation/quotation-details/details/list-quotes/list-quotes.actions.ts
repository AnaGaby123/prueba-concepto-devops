import {createAction, props} from '@ngrx/store';
import * as apiCatalogs from 'api-catalogos';
import {CatMedioDifusion, VProductoDetalle} from 'api-catalogos';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IRelate,
  ISendQuotation,
  ProductSearchResult,
} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {IDataMail} from '@appModels/correo/correo';
import {IQuoteSummaryItem} from '@appModels/store/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'List-Quotes-Api';
const typeReducer = 'List-Quotes-Reducer';
export const GET_OPTIONS_OF_PRODUCTS_ACTION = buildingStringActionType(
  typeApi,
  'Get Options Of Products',
);
export const GET_OPTIONS_OF_PRODUCTS = createAction(
  GET_OPTIONS_OF_PRODUCTS_ACTION,
  props<{runSearchTerm: string}>(),
);
export const GET_OPTIONS_OF_PRODUCTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get Options Of Products Failed'),
);
export const GET_OPTIONS_OF_PRODUCTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get Options Of Products Success'),
  props<{products: Array<apiCatalogs.SugerenciaBusqueda>}>(),
);
export const FETCH_PRODUCTS = createAction(
  buildingStringActionType(typeApi, 'Fetch Products'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_PRODUCTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Products Failed'),
);
export const FETCH_PRODUCTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Products Success'),
  props<{
    products: Array<ProductSearchResult>;
    universeProducts: Array<apiCatalogs.VProducto>;
    total: number;
  }>(),
);
export const SET_FILTER_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Set Filter for Products'),
  props<{item: DropListOption; field: string}>(),
);
export const SET_OPTION_FILTER_PRODUCT = createAction(
  buildingStringActionType(typeApi, 'Set Option Filter of Products'),
  props<{item: ITabOption}>(),
);
export const SET_RUN_SEARCH_TERM = createAction(
  buildingStringActionType(typeApi, 'Set Run Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_OPTION_OF_PRODUCT_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Set Option Of Product Selected'),
  props<{option: DropListOption}>(),
);
export const CLEAR_SEARCH_TERM = createAction(
  buildingStringActionType(typeApi, 'Clear Search Term'),
);
export const SET_PRODUCT_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Set Product Selected'),
  props<{product: ProductSearchResult}>(),
);
export const SET_PRODUCT_SELECTED_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set Product Selected Success'),
  props<{vProductDetails?: VProductoDetalle}>(),
);
export const SET_PRODUCT_SELECTED_FAILED = createAction(
  buildingStringActionType(typeApi, 'Set Product Selected Failed'),
);
export const SET_PIECES_PRODUCT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set Pieces of Producto Load'),
  props<{
    pieces: number;
    item: ProductSearchResult;
  }>(),
);
export const SET_DATE_REALIZATION = createAction(
  buildingStringActionType(typeReducer, 'Set date of realization'),
  props<{input: string; date: any}>(),
);
export const SET_PIECES_PRODUCT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set Pieces of Producto Success'),
  props<{item: ProductSearchResult}>(),
);
export const SET_PIECES_PRODUCT_ERROR = createAction(
  buildingStringActionType(typeApi, 'Set Pieces of Producto Error'),
  props<{error: any}>(),
);
export const FETCH_QUOTATION_RELATED_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotation Related Load'),
  props<{product: ProductSearchResult}>(),
);
export const FETCH_QUOTATION_RELATED_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotation Related Success'),
  props<{list: Array<IRelate>; IdProduct: string}>(),
);
export const FETCH_QUOTATION_RELATED_ERROR = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotation Related Error'),
  props<{error: any}>(),
);
export const SET_LINKED_QUOTE = createAction(
  buildingStringActionType(typeApi, 'Set Linked Quotes Selected'),
  props<{item: IRelate}>(),
);
export const FETCH_FILE_PDF_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Archivo PDF Load'),
);
export const FETCH_FILE_PDF_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Archivo PDF Success'),
  props<{base64: string}>(),
);
export const FETCH_FILE_PDF_ERROR = createAction(
  buildingStringActionType(typeApi, 'Fetch Archivo PDF Error'),
  props<{error: any}>(),
);
export const FETCH_FILE_BASE64_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Archivo PDF Base 64 Load'),
  props<{IdArchivo: string}>(),
);
export const SET_MODAL_IS_OPEN_RESEND_QUOTATION = createAction(
  buildingStringActionType(typeApi, 'Set Modal Is Open Resend Quotation'),
  props<{value: boolean}>(),
);
export const SEND_EMAIL_QUOTATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Enviar Correo Cotización Load'),
  props<{listContact: IDataMail}>(),
);

export const SEND_EMAIL_QUOATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Enviar Correo Cotización Success'),
);
export const SEND_EMAIL_QUOATION_ERROR = createAction(
  buildingStringActionType(typeApi, 'Enviar Correo Cotización Error'),
);
export const SET_TYPE_SEARCH = createAction(
  buildingStringActionType(typeApi, 'Guardar Tipo de Búsqueda'),
  props<{typeSearch: DropListOption}>(),
);
export const SEND_QUOTATION_PART_1 = createAction(
  buildingStringActionType(typeApi, 'Send Quotation Init Part 1'),
  props<{
    activeChangeQuotationState: boolean;
    sendEmailData: apiCatalogs.CorreoEnviado;
    comments: string;
  }>(),
);
export const SEND_QUOTATION_PART_2 = createAction(
  buildingStringActionType(typeApi, 'Send Quotation Init Part 2'),
  props<{
    sendQuotationObj: ISendQuotation;
  }>(),
);
export const SEND_QUOTATION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Send Quotation Failed'),
);
export const SEND_QUOTATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Send Quotation Success'),
);
export const GET_PROCESS_SYSTEM = createAction(
  buildingStringActionType(typeApi, 'Get Process System'),
  props<{id: string}>(),
);
export const SET_ITEM_LINKED = createAction(
  buildingStringActionType(typeReducer, 'Set item linked'),
  props<{item: IQuoteSummaryItem}>(),
);
export const UPDATE_LIST_PRODUCTS = createAction(
  buildingStringActionType(typeReducer, 'Update List Products'),
  props<{IdProducto: string}>(),
);
export const SET_ID_ARCHIVO_PDF = createAction(
  buildingStringActionType(typeApi, 'Set Archivo PDF'),
  props<{IdArchivo: string}>(),
);
export const VIEW_FILE_IS_LOADING = createAction(
  buildingStringActionType(typeReducer, 'View file is loading'),
  props<{value: boolean}>(),
);
export const VIEW_FILE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Update View File Load'),
  props<{IdArchivo: string; ext: string}>(),
);
export const VIEW_FILE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Update View Success'),
  props<{fileBase64: string}>(),
);
export const SET_MEDIA_OUTLET_TO_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Set Media Outlet To Product'),
  props<{CatMedioDeDifusion: CatMedioDifusion[]}>(),
);
export const SHOW_SEND_EMAIL_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Send Email Dialog'),
  props<{isResend: boolean}>(),
);
