import {createAction, props} from '@ngrx/store';
import {
  ClientsListItemForQuotation,
  IClientQuotes,
} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';
import {
  ICotPartidaInvetigacionAtencionComentariosObj,
  ICotPartidasInvetigacionCotizacion,
  IGMCotCotizacionDetalle,
  IGMCotPartidasDetalle,
  IVProducto,
  IQuotation,
  QuotationClientInfo,
  QuotationItemCombined,
  IInvestigationProductData,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {
  IAdddProductQTY,
  ProductSearchResult,
} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {Archivo, CatTipoCotizacion, CorreoEnviado, VCliente, VProducto} from 'api-catalogos';
import {IContact} from '@appModels/catalogos/contacto/contacto';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {
  CorreoRecibidoClienteRequerimientoObj,
  CotPartidaCotizacionCapacitacionFecha,
  CotPartidaInvetigacionAtencionComentariosObj,
  CotProductoOferta,
  GMCotCotizacionDetalle,
  VCotCotizacion,
} from 'api-logistica';
import {IDireccion} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {buildingStringActionType} from '@appUtil/strings';
import {IQueryResultVCliente} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';

const typeReducer = 'QuotationsDetails';
const typeApi = 'QuotationDetailsAPI';

export const FETCH_QUOTATION_DETAIL = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotation Detail'),
  props<{
    idQuotation: string;
  }>(),
);
export const FETCH_QUOTATIONS_LIST_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotation List Success'),
  props<{quotationsList: Array<IQuotation>}>(),
);
export const FETCH_QUOTATIONS_LIST_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotation List Failed'),
);

export const FETCH_SELECTED_QUOTATION_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Selected Quotation Details Success'),
  props<{selectedQuotationDetails: IGMCotCotizacionDetalle}>(),
);
export const FETCH_QUOTATION_DETAIL_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotation Detail Failed'),
);
export const FETCH_UPDATE_SELECTED_QUOTATION_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Update Selected Quotation Details Success'),
  props<{selectedQuotationDetails: IGMCotCotizacionDetalle}>(),
);
export const FETCH_CLIENT_INFO_FOR_SELECTED_QUOTATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Client Info For Selected Quotation Success'),
  props<{queryResult: QuotationClientInfo}>(),
);

export const FETCH_RELOAD_QUOTATION_DATA = createAction(
  buildingStringActionType(typeApi, 'Fetch reload Quotation Data'),
);

export const SET_DATA_SELECTED_CLIENT_QUOTATION_DETAIL = createAction(
  buildingStringActionType(typeReducer, 'Set data client quotation'),
  props<{input: string; value: any}>(),
);
export const SET_SELECTED_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set selected client'),
  props<{selectedClient: ClientsListItemForQuotation}>(),
);
export const SET_CLIENT_QUOTES_SELECTED_CLIENT_NEW = createAction(
  buildingStringActionType(typeReducer, 'Set General data quotation'),
  props<{clients: VCliente}>(),
);
export const SET_CLIENT_QUOTES_SELECTED_CLIENT_NEW_DIRECTION_DELIVERY = createAction(
  buildingStringActionType(
    typeReducer,
    'Set Client Quotes Selected new quotation direction and delivery',
  ),
  props<{route: string; name: string}>(),
);
export const SET_CLIENT_QUOTES_SELECTED_CLIENT_NEW_DIRECTION = createAction(
  buildingStringActionType(typeReducer, 'Set Client Quotes Selected new quotation direction'),
  props<{direction: IDireccion}>(),
);
export const SET_CLIENT_QUOTES_SELECTED_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Set Client Quotes Selected quotation'),
  props<{client: IClientQuotes}>(),
);
export const SET_CLIENT_QUOTES_SELECTED_QUOTATION_ACTIVATE = createAction(
  buildingStringActionType(typeReducer, 'Set Client Quotes Selected quotation activate'),
);
export const SET_QUOTATION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Quotation Selected'),
  props<{idQuotation: string}>(),
);
export const SET_SELECTED_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Quotation'),
  props<{quotationId: string}>(),
);

export const SET_TYPE_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Set Type Quotation'),
  props<{option: DropListOption}>(),
);
export const SET_TYPE_DELIVERY_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Set Type Delivery Quotation'),
  props<{option: DropListOption}>(),
);
export const SET_FREIGHT_APPORTION = createAction(
  buildingStringActionType(typeReducer, 'Set Freight apportion'),
  props<{value: boolean}>(),
);
export const SET_ID_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set Id Contact'),
  props<{idContact: string}>(),
);
export const SET_DELIVERY_ADDRESS = createAction(
  buildingStringActionType(typeReducer, 'Set delivery address'),
  props<{deliveryAddress: DropListOption; typesQuotations: Array<CatTipoCotizacion>}>(),
);

export const SET_CONTACTS = createAction(
  buildingStringActionType(typeReducer, 'Set Contacts'),
  props<{contacts: Array<IContact>}>(),
);
export const SET_SEARCH_TERM_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term Client'),
  props<{
    searchTerm: string;
  }>(),
);

export const FETCH_CAT_CLIENTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Cat Clients Success'),
  props<{response: IQueryResultVCliente}>(),
);
export const FETCH_CAT_CLIENTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Cat Clients Failed'),
  props<{error: any}>(),
);

export const SAVE_QUOTATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save Quotation load'),
  props<{hasPreviewQuotation: boolean; showMessageSuccess: boolean}>(),
);
export const SAVE_QUOTATION_LOAD2 = createAction(
  buildingStringActionType(typeApi, 'Save Quotation load'),
  props<{hasPreviewQuotation: boolean}>(),
);

export const SAVE_QUOTATION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Save Quotation Failed'),
);
export const SAVE_QUOTATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save Quotation Success'),
  props<{quotation: IGMCotCotizacionDetalle}>(),
);
export const SET_LOAD_PREVIEW_QUOTATION = createAction(
  buildingStringActionType(typeApi, 'Set load preview quotation'),
);

export const SEND_QUOTATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Send Quotation Load'),
  props<{
    resendQuotation: boolean;
    sendEmailData: CorreoEnviado;
    comments: string;
  }>(),
);
export const SEND_QUOTATION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Send Quotation Failed'),
);

export const SAVE_ITEM_QUOTATION = createAction(
  buildingStringActionType(typeApi, 'Save Item Quotation'),
  props<{
    itemQuotationType: string;
    product: IAdddProductQTY;
    isNewProduct: boolean;
  }>(),
);
export const ADD_ITEM_TO_SELECTED_QUOTATION = createAction(
  buildingStringActionType(typeApi, 'Add Item To Selected Quotation'),
  props<{
    product: ProductSearchResult;
    dates?: Array<CotPartidaCotizacionCapacitacionFecha>;
  }>(),
);
export const ADD_ITEM_TO_SELECTED_QUOTATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Add Item To Selected Quotation Success'),
  props<{itemQuotation: IGMCotPartidasDetalle}>(),
);
export const ADD_ITEM_SAVING_TO_SELECTED_QUOTATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Add item saving to selected quotation load'),
  props<{item: QuotationItemCombined; itemsNumberPieces: Array<number>; productIndex: number}>(),
);
export const ADD_ITEM_SAVING_TO_SELECTED_QUOTATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Add item saving to selected quotation success'),
  props<{itemsQuotation: Array<IGMCotPartidasDetalle>; productIndex}>(),
);
export const FETCH_MORE_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Fetch more component effect'),
  props<{event: IPageInfo}>(),
);
export const SAVE_ITEM_QUOTATION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Save Item Quotation Failed'),
);

export const SAVE_ITEM_QUOTATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save Item Quotation Success'),
  props<{idProduct: string}>(),
);

export const DELETE_ITEM_QUOTATION = createAction(
  buildingStringActionType(typeApi, 'Delete Item Quotation'),
  props<{index: number}>(),
);

export const ACTIVE_INPUT_CONTROLLED_IN_ITEM_QUOTATION = createAction(
  buildingStringActionType(typeApi, 'Active Input Controlled In Item Quotation'),
  props<{idItemQuotation: string; productIndex?: number}>(),
);

export const CLEAN_ALL_QUOTATION_DETAIL = createAction(
  buildingStringActionType(typeReducer, 'Set All Quotation Detail'),
);
export const FETCH_MAIL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Mail Success'),
  props<{data: CorreoRecibidoClienteRequerimientoObj; idQuotation: string}>(),
);
export const FETCH_MAIL_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Mail Error'),
  props<{error: any}>(),
);
export const SET_CONTACTS_EMAIL = createAction(
  buildingStringActionType(typeReducer, 'Set Contacts of Email'),
  props<{contacts: Array<IDropListMulti>}>(),
);
export const SET_STATUS_CONTACTS = createAction(
  buildingStringActionType(typeReducer, 'Update status Contact of Email'),
  props<{contact: IDropListMulti}>(),
);
export const UPDATE_STATUS_SELECTED_QUOTATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Update status selected quotation load'),
  props<{activeNavigate: boolean}>(),
);
export const UPDATE_STATUS_SELECTED_QUOTATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Update status selected quotation success'),
  props<{quotationsUpdate: VCotCotizacion[]}>(),
);
export const UPDATE_STATUS_SELECTED_QUOTATION_ERROR = createAction(
  buildingStringActionType(typeApi, 'Update status selected quotation error'),
);
export const SET_STATUS_CONTACTS_CANCEL = createAction(
  buildingStringActionType(typeApi, 'Update status Contact of Email Cancel'),
);
export const SET_INITIAL_CONTACTS_MAIL = createAction(
  buildingStringActionType(typeApi, 'Initial Contacs of Mail'),
);
export const SHOW_LINK_NEW_CONTACT_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Show New Contact Pop Up'),
  props<{open: boolean}>(),
);
export const CLEAN_LINK_ADD_NEW_CONTACT_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Clean Link Add New Contact Pop Up'),
);
export const SHOW_LINK_ADD_NEW_CONTACT_POP_UP_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Show Add New Contact Pop Up Success'),
  props<{open: boolean}>(),
);
export const CLEAN_LINK_NEW_CONTACT_CLIENT_LIST = createAction(
  buildingStringActionType(typeReducer, 'Clean Client List'),
);
export const RESTORE_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Restore initial state'),
);
export const UPDATE_TRAININGS_DATES = createAction(
  buildingStringActionType(typeReducer, 'Update trainings dates'),
  props<{dates: Array<CotPartidaCotizacionCapacitacionFecha>; index: number}>(),
);
export const SET_INVESTIGATION_PRODUCT_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Set investigation product pop up'),
  props<{item: ICotPartidasInvetigacionCotizacion}>(),
);
export const SET_INVESTIGATION_PRODUCT_ACTIVE_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Set investigation product active pop up'),
  props<{isOpen: boolean}>(),
);
export const FETCH_FILE_EVIDENCE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set investigation file evidence'),
  props<{file: Archivo}>(),
);
export const FETCH_EXTERNAL_FILE_LOAD_EVIDENCE = createAction(
  buildingStringActionType(typeApi, 'Fetch external file load evidence'),
);
export const SET_OPEN_DETAILS_PRODUCT_INVESTIGATION = createAction(
  buildingStringActionType(typeApi, 'Set open details product investigation'),
  props<{value: boolean}>(),
);
export const SET_ACTIVE_ERROR_ADDRESS = createAction(
  buildingStringActionType(typeApi, 'Set active error address'),
  props<{value: boolean}>(),
);
export const SET_ATTEND_INVESTIGATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set attend investigation load'),
  props<{itemInvestigation: ICotPartidasInvetigacionCotizacion}>(),
);
export const SET_ATTEND_INVESTIGATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set attend investigation success'),
  props<{attendedInvestigationData: ICotPartidaInvetigacionAtencionComentariosObj}>(),
);
export const SET_ADD_PRODUCT_FOUND_BY_PROVIDER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set add product found by provider load'),
  props<{item: ICotPartidasInvetigacionCotizacion}>(),
);
export const SET_PRODUCT_TO_INVESTIGATION_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Set product to investigation selected'),
  props<{product: VProducto}>(),
);
export const SET_EVI_COMMENT = createAction(
  buildingStringActionType(typeReducer, 'Set evi comment'),
  props<{comment: string}>(),
);
export const SET_REATTEND_INVESTIGATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set reattend investigation load'),
);
export const SET_REATTEND_INVESTIGATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set reattend investigation success'),
  props<{IdCotPartidaCotizacionInvestigacion: string}>(),
);
export const HANDLE_SAVE_QUOTATION = createAction(
  buildingStringActionType(typeApi, 'Handle save quotation'),
  props<{payload: IGMCotCotizacionDetalle}>(),
);
export const SET_ADD_ITEM_INVESTIGATION_TO_QUOTATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set add item investigation to quotation load'),
  props<{investigationId: string}>(),
);

export const FETCH_EXTERNAL_FILE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch external file load'),
  props<{node: string; location: string}>(),
);
export const SET_GM_ID_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Set Gm Id Quotation'),
);
export const VIEW_FILE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'View File Load'),
  props<{IdArchivo: string; ext: string}>(),
);
export const CHANGE_CURRENCY_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Change currency quotation'),
  props<{currency: DropListOption}>(),
);
export const CHANGE_CURRENCY_QUOTATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Change currency quotation load'),
  props<{currency: DropListOption}>(),
);
export const CHANGE_CURRENCY_QUOTATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Change currency quotation success'),
  props<{value: GMCotCotizacionDetalle}>(),
);
export const CHANGE_CURRENCY_QUOTATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Change currency quotation failed'),
);
export const SHOW_REALIZATION_DATES_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Realization Dates Dialog'),
  props<{trainingItem: ProductSearchResult}>(),
);
export const FETCH_ITEMS_INVESTIGATION_ATTENDED_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items Investigation Attended Success'),
  props<{itemsInvestigationAttended: CotPartidaInvetigacionAtencionComentariosObj[]}>(),
);
export const FETCH_ITEMS_INVESTIGATION_FINISHED_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items Investigation Finished Success'),
  props<{
    itemsInvestigationAttended: CotPartidaInvetigacionAtencionComentariosObj[];
    itemsInvestigationFinished: VProducto[];
  }>(),
);
export const FETCH_ITEMS_INVESTIGATION_OFFERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Items Investigation Offers Success'),
  props<{
    itemsInvestigationAttended: CotPartidaInvetigacionAtencionComentariosObj[];
    itemsInvestigationFinished: VProducto[];
    itemsQuotation: Array<IGMCotPartidasDetalle>;
  }>(),
);
export const SET_ADD_ITEMS_INVESTIGATION_NEEDS_TO_RELOAD = createAction(
  buildingStringActionType(typeReducer, 'Set add items investigation needs to reload'),
  props<{value: boolean}>(),
);
export const GET_CONFIGURATION_INVESTIGATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get configuration investigation load'),
  props<{product: IVProducto; investigationId: string; openChat: boolean}>(),
);
export const GET_CONFIGURATION_INVESTIGATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get configuration investigation succeess'),
  props<{productDataInvestigation: IInvestigationProductData}>(),
);
