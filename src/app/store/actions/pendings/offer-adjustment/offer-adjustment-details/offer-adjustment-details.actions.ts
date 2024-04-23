import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IClientAdjustmentOffer,
  ITotalClientesPorTipoAjusteDeOfertaObj,
  offerAdjustCarrousel,
  quotationOfferAdjustmentConfig,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';
import {buildingStringActionType} from '@appUtil/strings';
import {AutorizacionCodigo, AutorizacionDetalle} from 'api-logistica';
import {ICard} from '@appModels/card/card';

const typeApi = 'OfferAdjustmentDetailsApi';
const typeReducer = 'OfferAdjustmentDetails';

export const CLEAN_ALL_OFFER_ADJUSTMENT_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Clean All Offer Adjustment Detail'),
);
export const FETCH_CLIENTS = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients With Quotation'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_CLIENT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients Success'),
  props<{
    listClients: Array<IClientAdjustmentOffer>;
    totalClients: number;
  }>(),
);
export const FETCH_CLIENT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Clients Failed'),
);
export const SET_TAB = createAction(
  buildingStringActionType(typeReducer, 'Set Tab MacBook Selected'),
  props<{tabSelected: ITabOption}>(),
);
export const SAVE_TOTAL_TABS = createAction(
  buildingStringActionType(typeReducer, 'Save Total Tabs'),
  props<{totals: ITotalClientesPorTipoAjusteDeOfertaObj}>(),
);
export const SET_TYPE_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Type Selected'),
  props<{typeSelected: DropListOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_VALUE_FILTER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Value Filter Selected'),
  props<{valueFilterSelected: DropListOption}>(),
);
export const SET_IS_LOADING_MORE_CLIENTS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Clients'),
  props<{isLoadingMoreClients: boolean}>(),
);
export const FETCH_CLIENTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch clients load'),
);
export const SET_CLIENT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Client Selected'),
  props<{
    clientSelected: IClientAdjustmentOffer;
    idClient: string;
    idAjOfQuotationStrategy: string;
    needsToReload?: boolean;
  }>(),
);
export const CLEAN_CLIENT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Clean Client Selected'),
);

// NUEVOS SERVICIOS
export const SET_CLIENT_QUOTES = createAction(
  buildingStringActionType(typeReducer, 'Set client quotes'),
  props<{clientQuotations: Array<offerAdjustCarrousel>}>(),
);
export const SET_QUOTATION_CONFIG_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set quotation config load'),
);
export const SET_QUOTATION_CONFIG_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set quotation config success'),
  props<{quotationConfig: quotationOfferAdjustmentConfig}>(),
);
export const SET_SELECTED_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Set selectedQuotation'),
  props<{quotation: ICard}>(),
);
export const SET_TWO_DAYS_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set two days option'),
  props<{value: boolean}>(),
);
export const SET_EXPRESS_FREIGHT_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set express freight option'),
  props<{value: boolean}>(),
);
export const SET_SHOW_COMMENTS = createAction(
  buildingStringActionType(typeReducer, 'Set show comments'),
  props<{index: number}>(),
);
export const SET_SHOW_ITEMS = createAction(
  buildingStringActionType(typeReducer, 'Set show items'),
  props<{index: number}>(),
);
export const SET_CHECK_ITEM_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set check item value'),
  props<{index: number; value: boolean}>(),
);
export const SET_EXPRESS_FREIGHT_POP_CONFIG = createAction(
  buildingStringActionType(typeReducer, 'Set express freight pop config'),
  props<{config: any}>(),
);
export const SET_PAYMENT_CONDITIONS_FORM_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set payment conditions form value'),
  props<{field: string; value: any}>(),
);
export const UPDATE_PAYMENT_CONFIG = createAction(
  buildingStringActionType(typeReducer, 'Update payment config'),
  props<{ammount: number; comments: string; IdCotPartidaCotizacion: string; percentage: number}>(),
);

// DOCS: ACCIONES PARA FUNCIONALIDAD DEL CÓDIGO DE AUTORIZACIÓN
export const VERIFICATION_CODE_REVIEW_LOAD = createAction(
  buildingStringActionType(typeApi, 'Verification code review load'),
  props<{code: string}>(),
);
export const VERIFICATION_CORE_REVIEW_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Verification code review success'),
  props<{valid: boolean; status: string}>(),
);
export const REQUEST_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'request verification code load'),
);
export const REQUEST_VERIFICATION_CODE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Request verification code success'),
  props<{AutorizacionDetalle: AutorizacionDetalle}>(),
);
export const SET_CODE_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set code value'),
  props<{code: Array<string>}>(),
);
export const SEND_CODE_VERIFICATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Send code verification load'),
  props<{code: string}>(),
);
export const SEND_CODE_VERIFICATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Send code verification success'),
  props<{response: AutorizacionCodigo}>(),
);
export const SET_INITIAL_AUTHORIZATION_OBJ = createAction(
  buildingStringActionType(typeReducer, 'Set initial authorization obj'),
);
export const CANCEL_AUTHORIZATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Cancel authorization code load'),
);
export const CANCEL_AUTHORIZATION_CODE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Cancel authrization code success'),
);
export const CLEAR_QUOTATIONS_AND_CLIENT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Clear quotations and client selected'),
);
