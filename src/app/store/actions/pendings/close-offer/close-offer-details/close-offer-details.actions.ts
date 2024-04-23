import {createAction, props} from '@ngrx/store';
import {IPurchase} from '@appModels/store/pendings/not-processed/not-processed-details/not-processed-details.models';
import {ClientsListItemForCloseOffer} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import {
  IBrandWithContract,
  IGeneralDataStrategy,
} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';
import {CorreoEnviado, Marca, VProveedor} from 'api-catalogos';
import {IContact} from '@appModels/catalogos/contacto/contacto';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  CustomerDetails,
  IClientTotals,
  IEntriesPercentages,
  IFormPrice,
  IItemQuotation,
  IQuotation,
  IQuotationStrategyResponse,
  IQuotes,
  ITipoAjustePrecioObj,
  ResumeSection,
} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';
import {
  CatMotivoCancelacionPartidaCotizacion,
  CatMotivoSeguimientoCotizacion,
  GMCotFletes,
  QueryResultVCOCotizacionesTotalesPartidas,
  TipoAjusteTEntregaFleteExpressObj,
  TipoAjusteTEntregaMenosDosDiasObj,
  TotalesPartidasConfiguradasMarcadas,
  VCOCotizacionesTotalesPartidas,
  VMarca,
} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Close Offer Details';
const typeApi = 'Api Close Offer Details';

export const SET_CLIENT_SELECTED_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set Client Selected LOAD'),
  props<{client: ClientsListItemForCloseOffer}>(),
);
export const SET_BURGER_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set burger option selected'),
  props<{selectedBurgerOption: DropListOption}>(),
);
export const SET_ADJUSTMENT_TAB_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set adjustment tab option selected'),
  props<{selectedTabOption: ITabOption}>(),
);
export const SET_IN_PROGRESS_TAB_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set in progress tab option selected'),
  props<{selectedTabOption: ITabOption}>(),
);
export const SET_RESUME_TAB_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set resume tab option selected'),
  props<{selectedTabOption: ITabOption}>(),
);
export const CLEAN_ALL_CLOSE_OFFER_DETAIL = createAction(
  buildingStringActionType(typeReducer, 'Clean data from Details component'),
);
export const GET_PURCHASE_ORDERS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get Purchase Orders LOAD'),
);
export const FETCH_PURCHASE_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Purchase Orders SUCCESS'),
  props<{data: IPurchase}>(),
);
export const SET_SEE_RESUME = createAction(
  buildingStringActionType(typeReducer, 'Set see resume'),
  props<{seeResumeActive: boolean}>(),
);
export const SET_RESET_SEE_RESUME = createAction(
  buildingStringActionType(typeReducer, 'Set reset see resume'),
);
export const SET_ALLOWED_TO_RESUME = createAction(
  buildingStringActionType(typeReducer, 'Set allowed to resume'),
  props<{allowedToResume: boolean}>(),
);
export const SET_IS_IS_RESUME_VIEW = createAction(
  buildingStringActionType(typeReducer, 'Set is in resume view'),
  props<{isInResumeView: boolean}>(),
);
export const GET_SELECTED_QUOTE_DATA_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get selected quote data load'),
);
export const GET_SELECTED_QUOTE_DATA_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get selected quote data failed'),
);
export const GET_SELECTED_QUOTE_DATA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get selected quote data success'),
);
export const SET_SELECTED_QUOTE = createAction(
  buildingStringActionType(typeReducer, 'Set Selected quote'),
  props<{quoteId: string}>(),
);
export const SET_QUOTES = createAction(
  buildingStringActionType(typeReducer, 'Set Quotes'),
  props<{quotes: IQuotes}>(),
);
export const SET_QUOTATION_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set Quotation data'),
  props<{quotation: IQuotation}>(),
);
export const SET_CLIENT_DATA = createAction(
  buildingStringActionType(typeApi, 'Set Data Client'),
  props<{clientData: CustomerDetails}>(),
);
export const FETCH_QUOTE_ITEMS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch quote items load'),
);
export const SET_CLIENT_TOTALS = createAction(
  buildingStringActionType(typeApi, 'Set Totals of Client'),
  props<{clientTotals: IClientTotals}>(),
);
export const SET_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set Contact'),
  props<{contact: IContact; idQuotation: string}>(),
);
export const SET_CONTACTS = createAction(
  buildingStringActionType(typeReducer, 'Set Contacts'),
  props<{contacts: Array<IContact>}>(),
);
export const SET_CONTACTS_EMAIL = createAction(
  buildingStringActionType(typeReducer, 'Set Contacts of Email'),
  props<{contacts: Array<IDropListMulti>}>(),
);
export const SET_FREIGHTS_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Set freights quotation'),
  props<{freights: GMCotFletes; idQuotation: string}>(),
);
export const SET_GENERAL_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set General Data'),
  props<{generalData: IGeneralDataStrategy; idQuotation: string}>(),
);
export const SET_ITEMS_QUOTATIONS = createAction(
  buildingStringActionType(typeReducer, 'Set Items Quotations'),
  props<{itemsQuotation: Array<IItemQuotation>}>(),
);
export const SET_QUOTE_IS_EXPRESS_FREIGHT = createAction(
  buildingStringActionType(typeReducer, 'Set quote is express freight'),
  props<{expressFreight: boolean; twoDays: boolean}>(),
);
export const SET_ENTRIES_PERCENTAGES = createAction(
  buildingStringActionType(typeReducer, 'Set entries percentages'),
  props<{entriesPercentages: IEntriesPercentages}>(),
);
export const FETCH_GENERAL_DATA_CLIENT = createAction(
  buildingStringActionType(typeApi, 'Fetch General Data Client'),
);
export const FETCH_BRANDS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Brands Success'),
  props<{brands: Array<IBrandWithContract>}>(),
);
export const FETCH_BRANDS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Brands Failed'),
);
export const FETCH_QUOTATION_STRATEGY_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Quotation Strategy Failed'),
);
export const FETCH_QUOTATION_STRATEGY_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Quotation Strategy Success'),
  props<IQuotationStrategyResponse>(),
);
export const SET_ENTRIES_API_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set entries api status'),
  props<{status: number}>(),
);
export const ADD_TO_QUOTATION = createAction(
  buildingStringActionType(typeApi, 'Add item to quotation'),
  props<{item: IItemQuotation}>(),
);
export const ADD_TO_QUOTATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Add item to quotation success'),
);
export const ADD_TO_QUOTATION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Add item to quotation failed'),
);
export const CLASSIFY_ENTRIES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Classify entries load'),
);
export const CLASSIFY_ENTRIES_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Classify entries success'),
);
export const CLASSIFY_ENTRIES_FAILED = createAction(
  buildingStringActionType(typeApi, 'Classify entries failed'),
);
export const GET_ENTRIES_TOTALS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get entries totals load'),
);
export const GET_ENTRIES_TOTALS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get entries totals success'),
  props<{entriesTotals: TotalesPartidasConfiguradasMarcadas}>(),
);
export const GET_ENTRIES_TOTALS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get entries totals failed'),
);

export const SET_ENTRY_POP_UP_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set entry popup open'),
  props<{
    itemId: string;
    isChild: boolean;
    node: string;
    isOpen: boolean;
  }>(),
);
export const SET_POP_UP_ADJUST_PRICE_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set pop up adjust price is open'),
  props<{
    itemId: string;
    isOpen: boolean;
  }>(),
);
export const SAVE_FORM_PRICE = createAction(
  buildingStringActionType(typeReducer, 'Save Form Price By Item'),
  props<{
    idItem: string;
    formPrice: IFormPrice;
  }>(),
);
export const SET_ENTRY_POP_UP_IS_IN_RANGE = createAction(
  buildingStringActionType(typeReducer, 'Set entry popup is in range'),
  props<{
    startIndex: number;
    endIndex: number;
    node: string;
    counter: number;
  }>(),
);
export const CLOSE_ALL_ENTRIES_POPS = createAction(
  buildingStringActionType(typeReducer, 'Close all entries pops'),
);
export const SET_CHECK_BOX_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set check box value'),
  props<{
    itemId: string;
    isChild: boolean;
    field: string;
    value: boolean;
  }>(),
);
export const SET_SEARCH_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set search option'),
  props<{
    searchOption: DropListOption;
    node: string;
  }>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set search term'),
  props<{
    searchTerm: string;
    node: string;
  }>(),
);
export const SET_CLIENT_PANEL_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set client panel is open'),
  props<{
    sendValue: boolean;
    clientPanelIsOpen?: boolean;
  }>(),
);
export const SET_CHECK_BOX_RESUME_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set check box resume value'),
  props<{
    itemId: string;
    isChild: boolean;
    allItems?: boolean;
    value?: boolean;
  }>(),
);
export const SET_PURCHASE_PROMISE_FOLLOWING_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set purchase promise and following date'),
  props<{date: Date; stringDate: string; node: string}>(),
);
export const SET_JUSTIFICATION_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set justification value'),
  props<{justification: string; node: string}>(),
);
export const SET_FREIGHT_CHECK_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set freight check value'),
  props<{value: boolean; node: string}>(),
);
export const SET_RESTORE_RESUME_VALUES = createAction(
  buildingStringActionType(typeReducer, 'Set restore resume values'),
);
export const SET_REASON_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set reason value'),
  props<{reason: DropListOption; node: string}>(),
);
export const SET_PAYMENT_CONDITIONS = createAction(
  buildingStringActionType(typeReducer, 'Set payment conditions'),
  props<{value: DropListOption}>(),
);
export const SET_ADDITIONAL_DAYS = createAction(
  buildingStringActionType(typeReducer, 'Set additional days'),
  props<{value: number}>(),
);
export const SET_SELECTED_BRAND_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set selected brand value'),
  props<{value: number}>(),
);
export const SEND_ENTRIES_TO_PURCHASE_PROMISE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set entries for any process load'),
  props<{typeProcess: string}>(),
);
export const SEND_ENTRIES_TO_PURCHASE_PROMISE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set entries for any process success'),
);
export const SEND_ENTRIES_TO_PURCHASE_PROMISE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set entries for any process failed'),
);
export const SEND_ENTRIES_TO_ADJUSTMENT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set entries to adjustment load'),
  props<{entries: Array<IItemQuotation>}>(),
);
export const SEND_ENTRIES_TO_ADJUSTMENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set entries to adjustment success'),
  props<{resume: ResumeSection}>(),
);
export const SEND_ENTRIES_IN_PROCESS_STATUS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set entries in process status load'),
);
export const SEND_ENTRIES_IN_PROCESS_STATUS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set entries in process status success'),
);
export const SEND_ENTRIES_TO_FOLLOWING_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set entries to following load'),
  props<{entries: Array<IItemQuotation>}>(),
);
export const GET_CAT_MOTIVO_SEGUIMIENTO_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get cat motivo seguimiento load'),
);
export const GET_CAT_MOTIVO_SEGUIMIENTO_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat motivo seguimiento success'),
  props<{catMotivosSeguimiento: Array<CatMotivoSeguimientoCotizacion>}>(),
);
export const GET_CAT_MOTIVO_SEGUIMIENTO_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get cat motivo seguimiento failed'),
);
export const GET_CAT_MOTIVO_CANCELACION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get cat motivo cancelacion load'),
);
export const GET_CAT_MOTIVO_CANCELACION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat motivo cancelacion success'),
  props<{
    catMotivosCancelacion: Array<CatMotivoCancelacionPartidaCotizacion>;
  }>(),
);
export const GET_CAT_MOTIVO_CANCELACION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get cat motivo cancelacion failed'),
);
export const GET_CAT_ENTRIES_BRANDS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat entries brands success'),
  props<{
    catMarcas: Array<Marca>;
  }>(),
);
export const GET_CAT_ENTRIES_PROVIDERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get cat entries providers load'),
);
export const GET_CAT_ENTRIES_PROVIDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat entries providers success'),
  props<{
    catProviders: Array<VProveedor>;
  }>(),
);
export const GET_CAT_ENTRIES_PROVIDERS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get cat entries providers failed'),
);
export const CHANGE_COT_COTIZACION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Change cot cotizacion success'),
  props<{newQuotationData: IQuotation}>(),
);
export const CHANGE_TOTALS_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Change totals quotation success'),
  props<{totals: VCOCotizacionesTotalesPartidas}>(),
);
export const CHANGE_COT_COTIZACION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Change cot cotizacion failed'),
);
export const REFRESH_CLOSE_OFFER_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Refresh close offer details'),
);
// Eliminar Partidad Cancelación
export const DELETE_ENTRIES_CANCEL_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Delete entries on cancel Load'),
  props<{item: IItemQuotation}>(),
);
export const DELETE_ENTRIES_CANCEL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Delete entries on cancel Success'),
);
export const DELETE_ENTRIES_CANCEL_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Delete entries on cancel failed'),
);
// Eliminar Partidad Promesa
export const DELETE_ENTRIES_PROMISE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Delete entries on promise Load'),
  props<{item: IItemQuotation}>(),
);
export const DELETE_ENTRIES_PROMISE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Delete entries on promise Success'),
);
export const DELETE_ENTRIES_PROMISE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Delete entries on promise failed'),
);
// Eliminar Partidad Seguimiento
export const DELETE_ENTRIES_FOLLOW_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Delete entries on follow Load'),
  props<{item: IItemQuotation}>(),
);
export const DELETE_ENTRIES_FOLLOW_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Delete entries on follow Success'),
);
export const DELETE_ENTRIES_FOLLOW_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Delete entries on follow Failed'),
);
export const DELETE_ENTRIES_ADJUSTMENT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Delete entries on adjustment Load'),
  props<{item: IItemQuotation}>(),
);
export const DELETE_ENTRIES_ADJUSTMENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Delete entries on adjustment Success'),
  props<{item: IItemQuotation}>(),
);
export const SET_FILTER_BY_BRAND = createAction(
  buildingStringActionType(typeReducer, 'Set Filter Brand'),
  props<{value: DropListOption}>(),
);
export const SEND_QUOTATION_PART_1 = createAction(
  buildingStringActionType(typeApi, 'Send Quotation Init Part 1'),
  props<{
    activeChangeQuotationState: boolean;
    sendEmailData: CorreoEnviado;
    comments: string;
  }>(),
);
export const SET_MODAL_IS_OPEN_SEND_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Set is open sen d quotation'),
  props<{value: boolean}>(),
);
export const SET_QUOTE_BRANDS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set quote brands success'),
  props<{quoteBrands: Array<VMarca>}>(),
);
export const FETCH_FREIGHT_POP_UP_DATA = createAction(
  buildingStringActionType(typeApi, 'Fetch Freight Pop Up Data'),
);
export const FETCH_FREIGHT_POP_UP_DATA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Freight Pop Up Data Success'),
  props<{expressFreightItems: TipoAjusteTEntregaFleteExpressObj[]}>(),
);
export const FETCH_FREIGHT_POP_UP_DATA_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Freight Pop Up Data Error'),
);
export const FETCH_TWO_DAYS_POP_UP_DATA = createAction(
  buildingStringActionType(typeApi, 'Fetch Two Days Pop Up Data'),
);
export const FETCH_TWO_DAYS_POP_UP_DATA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Two Days Pop Up Data Success'),
  props<{twoDaysItems: TipoAjusteTEntregaMenosDosDiasObj[]}>(),
);
export const FETCH_TWO_DAYS_POP_UP_DATA_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Two Days Pop Up Data Error'),
);
export const FETCH_PRICE_POP_UP_DATA = createAction(
  buildingStringActionType(typeApi, 'Fetch Price Pop Up Data'),
);
export const FETCH_PRICE_POP_UP_DATA_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Price Pop Up Data Success'),
  props<{priceItems: ITipoAjustePrecioObj[]}>(),
);
export const FETCH_PRICE_POP_UP_DATA_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Price Pop Up Data Error'),
);
export const SET_ALL_CHECKED = createAction(
  buildingStringActionType(typeApi, 'Set All Checked'),
  props<{
    field: string;
    value: boolean;
  }>(),
);
export const SET_LOAD_QUOTATION_FILE = createAction(
  buildingStringActionType(typeApi, 'Set load quotation file'),
);
export const SET_ERROR_QUOTATION_FILE = createAction(
  buildingStringActionType(typeApi, 'Set error quotation file'),
);
export const SHOW_SEND_EMAIL_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Send Email Dialog'),
  props<{isShow: boolean}>(),
);
