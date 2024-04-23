/* Core Imports */
import {createAction, props} from '@ngrx/store';

/* Models Imports */
import {OcOrdenDeCompra, OcPartida, TramitarCompraElaborar} from 'api-logistica';
import {
  IFamily,
  IProducts,
} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase-details/process-purchase-details.models';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase-list/process-purchase-list.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {Archivo, ContactoDetalleProvObj} from 'api-catalogos';
import {IDataMail} from '@appModels/correo/correo';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'ProcessPurchaseDetails';
const typeApi = 'ProcessPurchaseDetailsApi';

export const SET_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Provider'),
  props<{provider: IProvider}>(),
);
export const CLEAN_DATA = createAction(buildingStringActionType(typeReducer, 'Clean Data'));
export const RELOAD_GENERAL_DATA = createAction(
  buildingStringActionType(typeReducer, 'Reload General Data'),
);
export const FETCH_GENERAL_DATA_PURCHASE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch General Data Success'),
  props<{
    generalData: TramitarCompraElaborar;
    modifiedContacts: Array<IDropListMulti>;
    contacts: Array<ContactoDetalleProvObj>;
  }>(),
);
export const FETCH_GENERAL_DATA_PURCHASE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch General Data Failed'),
);
export const SET_FAMILIES = createAction(
  buildingStringActionType(typeReducer, 'Set Families'),
  props<{families: Array<IFamily>; totalFamilies: number}>(),
);
export const SET_FAMILY_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Family Selected'),
  props<{IdProveedorFamilia: string}>(),
);
export const SET_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Selected'),
  props<{tabSelected: ITabOption; IdProveedorFamilia: string}>(),
);

export const SET_SELECTED_CONTACT_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Contact Provider'),
  props<{contactSelected: DropListOption}>(),
);
export const SET_COMPANY_BUYS_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Company Buys Selected'),
  props<{companyBuysSelected: DropListOption}>(),
);
export const SET_SHIPPING_COMPANY_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Shipping Company Selected'),
  props<{shippingCompanySelected: DropListOption}>(),
);
export const FETCH_PRODUCTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Products Load'),
  props<{IdProveedorFamilia: string; isFirstPage: boolean}>(),
);
export const FETCH_PRODUCTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Products Success'),
  props<{
    products: Array<IProducts>;
    IdProveedorFamilia: string;
    totalProducts: number;
  }>(),
);
export const FETCH_PRODUCTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Products Failed'),
  props<{IdProveedorFamilia: string}>(),
);
export const SET_IS_LOADING_MORE_PRODUCTS = createAction(
  buildingStringActionType(typeApi, 'Fetch More Products of Current Family'),
  props<{isLoadingMoreProducts: boolean; IdProveedorFamilia: string}>(),
);
export const SET_NEW_PRODUCT_TO_GENERATE_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set New Product to Generate Order'),
  props<{newProduct: IProducts; IdProveedorFamilia: string}>(),
);
export const REMOVE_PRODUCT_OF_LIST_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Delete Product of Order'),
  props<{
    productToRemove: IProducts;
    IdProveedorFamilia: string;
    typeOfProduct: string;
  }>(),
);
export const SET_FILTER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Filter Selected'),
  props<{
    dataByTypeSelected: DropListOption;
    IdProveedorFamilia: string;
  }>(),
);
export const GENERATE_OC_AND_PDF_LOAD = createAction(
  buildingStringActionType(typeApi, 'Generate OC and PDF Load'),
);
export const GENERATE_OC_AND_PDF_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Generate OC and PDF Success'),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{
    searchTerm: string;
    IdProveedorFamilia: string;
  }>(),
);
export const HANDLE_POP_UP_SEND_MAIL = createAction(
  buildingStringActionType(typeReducer, 'Handle Pop Up Send Mail'),
  props<{popUpSendMail: boolean}>(),
);
export const SET_DATA_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeApi, 'Set Data Purchase Order'),
  props<{purchaseOrderData: OcOrdenDeCompra}>(),
);
export const SET_DATA_PDF = createAction(
  buildingStringActionType(typeApi, 'Set Data PDF'),
  props<{pdfData: Archivo}>(),
);
export const SEND_MAIL_LOAD = createAction(
  buildingStringActionType(typeApi, 'Send Mail Load'),
  props<{mailData: IDataMail}>(),
);
export const SEND_MAIL_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Send Mail Success'),
);
export const SEND_MAIL_FAILED = createAction(buildingStringActionType(typeApi, 'Send Mail Failed'));
export const SAVE_ID_PURCHASE_ORDER = createAction(
  buildingStringActionType(typeApi, 'Save Id Purchase Order'),
  props<{idPurchaseOrder: string}>(),
);
export const DELETE_PURCHASE_ORDER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Delete Purchase Order Load'),
  props<{idPurchaseOrder: string}>(),
);
export const DELETE_PURCHASE_ORDER_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Delete Purchase Order Success'),
);
export const SET_POP_UP_STOCK_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set Pop Up Stock Is Open'),
  props<{
    IdProveedorFamilia: string;
    IdPurchaseOrderPending: string;
    isOpen: boolean;
  }>(),
);
export const SET_POP_UP_STOCK_IS_IN_RANGE = createAction(
  buildingStringActionType(typeReducer, 'Set Pop Up Stock Is In Range'),
  props<{
    IdProveedorFamilia: string;
    IdPurchaseOrderPending: string;
    startIndex: number;
    endIndex: number;
    counter: number;
  }>(),
);
export const ADD_MAIL_TO_LIST = createAction(
  buildingStringActionType(typeReducer, 'Add Mail to List'),
  props<{newMail: IDropListMulti}>(),
);
export const LINK_TO_PROVIDER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Link to Provider Load'),
);
export const LINK_TO_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Link to Provider Success'),
  props<{nameToLink: string; totalProducts: number}>(),
);
export const TAKE_PIECES_OF_STOCK_LOAD = createAction(
  buildingStringActionType(typeApi, 'Take Pieces Of Stock Load'),
  props<{product: IProducts; generateOtherOcItem: boolean}>(),
);
export const TAKE_PIECES_OF_STOCK_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Take Pieces Of Stock Success'),
  props<{IdProveedorFamilia: string}>(),
);
export const GENERATE_OTHER_OC_LOAD = createAction(
  buildingStringActionType(typeApi, 'Generate Other OC Load'),
  props<{ocPartida: OcPartida; difPieces: number}>(),
);
export const GENERATE_OTHER_OC_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Generate Other OC Success'),
  props<{IdProveedorFamilia: string}>(),
);
