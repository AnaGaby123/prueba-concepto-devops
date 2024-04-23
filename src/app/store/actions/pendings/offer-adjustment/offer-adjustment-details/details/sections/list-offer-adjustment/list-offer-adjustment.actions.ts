import {createAction, props} from '@ngrx/store';
import {
  ICatProvidersFreight,
  IClientQuotes,
  IFormPrice,
  IItemQuotation,
  IItemQuotationByBrand,
  TypeFormExpressFreight,
  TypeFormPrice,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {AjOfEstrategiaCotizacionTactica, BarraTipoPartidaCerrarOfertaObj} from 'api-logistica';
import {
  CatEstrategiaCotizacionSubtactica,
  CatEstrategiaCotizacionTactica,
  SolicitudAutorizacionCambio,
} from 'api-catalogos';
import {IChip} from '@appModels/chip/chip';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'OfferAdjustmentDetailsLisOfferAdjustmentApi';
const typeReducer = 'OfferAdjustmentDetailsLisOfferAdjustment';

export const FETCH_QUOTATIONS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotations Success'),
);
export const FETCH_QUOTATIONS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotations Failed'),
);
export const SET_QUOTES_ON_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set Quotes On Client'),
  props<{quotes: IClientQuotes; update?: boolean}>(),
);
export const SET_QUOTATION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Quotation Selected'),
  props<{
    idQuotation: string;
    idClient: string;
    idAjOfQuotationStrategy: string;
    needsToReload?: boolean;
  }>(),
);
export const SET_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Set Quotation'),
  props<{
    idQuotation: string;
    idClient: string;
    idAjOfQuotationStrategy: string;
  }>(),
);
export const FETCH_AMOUNT_BILLED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Amount Billed'),
);
export const FETCH_AMOUNT_BILLED_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Amount Billed Success'),
  props<{TotalFacturadoUSD: number; ObjetivoFundamentalUSD: number}>(),
);
export const FETCH_AMOUNT_BILLED_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Amount Billed Failed'),
);
export const CLEAN_CONTENT_DETAILS_GENERAL = createAction(
  buildingStringActionType(typeReducer, 'Clean Content Details'),
);
export const SET_REASON_OF_REJECTION_SELECTED = createAction(
  buildingStringActionType(typeApi, 'Set Reason of Rejections Selected'),
  props<{reasonOfRejectionSelected: DropListOption}>(),
);
export const FETCH_PROGRESS_BAR_TOTAL_IN_CLOSING = createAction(
  buildingStringActionType(typeReducer, 'Fetch Progress Bar Total In Closing'),
);
export const FETCH_PROGRESS_BAR_TOTAL_IN_CLOSING_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Bar Total In Closing Success'),
  props<{dataProgressBar: BarraTipoPartidaCerrarOfertaObj}>(),
);
export const FETCH_PROGRESS_BAR_TOTAL_IN_CLOSING_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Bar Total In Closing Failed'),
);
export const SET_OPTION_BAR_ACTIVITY = createAction(
  buildingStringActionType(typeReducer, 'Set Option Bar Activity'),
  props<{barActivitySelected: number}>(),
);
export const FETCH_TACTIC_OF_QUOTATIONS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Tactic of Quotations Success'),
  props<{tactics: Array<CatEstrategiaCotizacionTactica>}>(),
);
export const FETCH_TACTIC_OF_QUOTATIONS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Tactic of Quotations Failed'),
);
export const FETCH_SUBTACTIC_OF_QUOTATIONS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Subtactic of Quotations Success'),
  props<{subtactics: Array<CatEstrategiaCotizacionSubtactica>}>(),
);
export const FETCH_SUBTACTIC_OF_QUOTATIONS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Subtactic of Quotations Failed'),
);
export const FETCH_QUOTATION_STRATEGY_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotation Strategy Success'),
  props<{
    listQuotationStrategyTacticOptions: Array<AjOfEstrategiaCotizacionTactica>;
    idClient: string;
    idQuotation: string;
  }>(),
);
export const FETCH_QUOTATION_STRATEGY_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Quotation Strategy Failed'),
);
export const SET_CURRENCY = createAction(
  buildingStringActionType(typeReducer, 'Set Currency'),
  props<{currency: string; idClient: string; idQuotation: string}>(),
);
export const SET_ITEMS_QUOTATIONS = createAction(
  buildingStringActionType(typeReducer, 'Set Items Quotations'),
  props<{
    itemsQuotation: Array<IItemQuotationByBrand>;
    itemsQuotationBySingle: Array<IItemQuotation>;
    idQuotation: string;
    idClient: string;
    idAjOfQuotationStrategy: string;
  }>(),
);
export const SET_BRAND_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Brand Selected'),
  props<{
    brand: IItemQuotationByBrand;
  }>(),
);
export const SET_POP_UP_PROVIDERS_FREIGHT = createAction(
  buildingStringActionType(typeReducer, 'Set Brand Providers Freight'),
  props<{
    brand: IItemQuotationByBrand;
    node: string;
  }>(),
);
export const SET_OPTION_BRAND_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Option Brand Selected'),
  props<{
    option: IChip;
  }>(),
);
export const SET_ADJUSTMENT_DELIVERY_ACCEPT = createAction(
  buildingStringActionType(typeReducer, 'Set Adjustment Delivery Accept'),
  props<{
    idBrand: string;
  }>(),
);
export const SET_ADJUSTMENT_DELIVERY_DECLINE = createAction(
  buildingStringActionType(typeReducer, 'Set Adjustment Delivery Decline'),
  props<{
    idBrand: string;
  }>(),
);
export const SET_ADJUSTMENT_DELIVERY_INCIDENCE = createAction(
  buildingStringActionType(typeReducer, 'Set Adjustment Delivery Incidence'),
  props<{
    idBrand: string;
    value: string;
  }>(),
);
export const SAVE_ADJUSTMENT_DELIVERY_INCIDENCE = createAction(
  buildingStringActionType(typeReducer, 'Save Adjustment Delivery Incidence'),
  props<{
    idBrand: string;
  }>(),
);
export const SET_FORM_EXPRESS_FREIGHT = createAction(
  buildingStringActionType(typeReducer, 'Set Form Express Freight'),
  props<{
    node: TypeFormExpressFreight;
    idBrand: string;
    activeExpressFreight?: boolean;
    commentsExpressFreight?: string;
    option?: DropListOption;
  }>(),
);
export const SAVE_FORM_EXPRESS_FREIGHT = createAction(
  buildingStringActionType(typeReducer, 'Save Form Express Freight'),
  props<{
    idBrand: string;
  }>(),
);
export const SET_FORM_PRICE = createAction(
  buildingStringActionType(typeReducer, 'Set Form Price By Item'),
  props<{
    node: TypeFormPrice;
    id: string;
    typeAmount?: boolean;
    typePercentage?: boolean;
    price?: number;
    applyToAllItems?: boolean;
    comments?: string;
  }>(),
);
export const SAVE_FORM_PRICE = createAction(
  buildingStringActionType(typeReducer, 'Save Form Price By Item'),
  props<{
    idItem: string;
    idBrand: string;
    formPrice: IFormPrice;
  }>(),
);
export const GET_CAT_PROVIDERS_FREIGHT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get cat providers freight load'),
  props<{
    idBrand: string;
  }>(),
);
export const GET_CAT_PROVIDERS_FREIGHT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get cat providers freight success'),
  props<{
    catProvidersFreight: ICatProvidersFreight;
  }>(),
);
export const GET_CAT_PROVIDERS_FREIGHT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get cat providers freight failed'),
);
export const SAVE_MASSIVE_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save Massive Configuration Success'),
);
export const SET_AUTHORIZATION_REQUEST_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set Authorization Request Success'),
  props<{
    authorizationRequest: SolicitudAutorizacionCambio;
    idQuotation: string;
    idClient: string;
    idAjOfQuotationStrategy: string;
  }>(),
);
export const GENERATE_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Generate Verification Code'),
);
export const GENERATE_VERIFICATION_CODE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Generate Verification Code Success'),
);
export const SET_CODE_VALUE_BY_POSITION = createAction(
  buildingStringActionType(typeReducer, 'Set Digit In Position'),
  props<{position: number; value: number}>(),
);
export const RESTORE_CODE_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Clean Verification Code'),
);
export const SET_SHAKED = createAction(
  buildingStringActionType(typeReducer, 'Set Shaked'),
  props<{value: boolean}>(),
);
export const COMPARE_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Go to Compare Verification Code'),
);
export const SET_AUTHORIZED_VERIFICATION_CODE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set Authorization Code Like a Valid Success'),
);
export const HANDLE_POP_UP_CODE = createAction(
  buildingStringActionType(typeReducer, 'Handle Pop Up Code'),
  props<{popUpCode: boolean}>(),
);
export const SET_EMAIL_SENT_TO = createAction(
  buildingStringActionType(typeApi, 'Set Email Sent to'),
  props<{
    emailSentTo: string;
    idQuotation: string;
    idClient: string;
    idAjOfQuotationStrategy: string;
  }>(),
);
export const REJECT_ADJUSTMENT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Reject Adjustment Load'),
  props<{IdAjOfRazonRechazo: string}>(),
);
export const REJECT_ADJUSTMENT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Reject Adjustment Success'),
);
export const HANDLE_POP_UP_REJECT = createAction(
  buildingStringActionType(typeReducer, 'Handle Pop Up Reject'),
  props<{popUpReject: boolean}>(),
);
export const CLEAN_QUOTATIONS = createAction(buildingStringActionType(typeApi, 'Clean Quotations'));
export const SET_ID_REQUEST_AUTHORIZATION_CHANGE = createAction(
  buildingStringActionType(typeApi, 'Set Id Request Authorization Change'),
  props<{
    IdSolicitudAutorizacionCambio: string;
    idQuotation: string;
    idClient: string;
    idAjOfQuotationStrategy: string;
  }>(),
);
export const SEND_ADJUSTMENT_OFFER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Send adjustment offer load'),
);
export const SEND_ADJUSTMENT_OFFER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Send adjustment offer success'),
);
