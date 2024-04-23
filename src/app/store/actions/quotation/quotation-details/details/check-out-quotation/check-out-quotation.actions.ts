import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IItemQuotationWithProduct} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {
  IFlete,
  IFreightExpress,
} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';
import {CotPartidaCotizacionCapacitacionFecha, CotProductoOferta} from 'api-logistica';
import {QuotationItemCombined} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {buildingStringActionType} from '@appUtil/strings';
import {VProductoDetalle} from 'api-catalogos';

const typeReducer = 'Check-Out-Quotation';

export const SET_TAB = createAction(
  buildingStringActionType(typeReducer, 'Set Tab'),
  props<{tab: ITabOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_DETAILS_PRODUCT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Details Product Load'),
  props<{itemQuotation: QuotationItemCombined; index: number}>(),
);
export const SET_DETAILS_PRODUCT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Details Product'),
  props<{item: QuotationItemCombined}>(),
);
export const SET_UNIT_PRICE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'SET UNIT PRICE LOAD'),
  props<{item: IItemQuotationWithProduct; idCurrency: string}>(),
);
export const SET_UNIT_PRICE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'SET UNIT PRICE SUCCESS'),
  props<{priceUnit: number}>(),
);
export const SET_UNIT_PRICE_ERROR = createAction(
  buildingStringActionType(typeReducer, 'SET UNIT PRICE ERROR'),
  props<{error: any}>(),
);
export const GET_CAT_FREIGHT_EXPRESS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Freight Express Load'),
);
export const GET_CAT_FREIGHT_EXPRESS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Freight Express Success'),
  props<{list: IFreightExpress[]; statusQuotation: string}>(),
);
export const GET_CAT_FREIGHT_EXPRESS_UPDATE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Freight Express Success Update'),
  props<{list: IFreightExpress[]; statusQuotation: string}>(),
);
export const GET_CAT_FREIGHT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Freight Load'),
);
export const GET_CAT_FREIGHT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Freight Success'),
  props<{list: IFlete[]; statusQuotation: string}>(),
);
export const SET_IS_SELECTED_FREIGHT_EXPRESS = createAction(
  buildingStringActionType(typeReducer, 'Set is selected freight express'),
  props<{item: IFreightExpress}>(),
);
export const SET_OPTION_FREIGHT_CONVENTIONAL = createAction(
  buildingStringActionType(typeReducer, 'Set Option Freight Conventional'),
  props<{item: IFlete}>(),
);
export const SET_FREIGHT_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Save Freight Load'),
  props<{comment: string; isBrokenDown: boolean}>(),
);
export const SELECTED_ALL_FREIGHT_EXPRESS = createAction(
  buildingStringActionType(typeReducer, 'Selected all Freight Express'),
  props<{status: boolean}>(),
);
export const RESTORE_FREIGHT_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set restore freight data'),
);
export const SET_MODAL_IS_OPEN_SEND_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Set Modal Is Open Send Quotation'),
  props<{value: boolean}>(),
);
export const SET_VPRODUCTO_DETALLE = createAction(
  buildingStringActionType(typeReducer, 'Set vPRoductoDetalle'),
  props<{vProductoDetalle: VProductoDetalle}>(),
);
export const CLOSE_ITEM_DETAILS_POP = createAction(
  buildingStringActionType(typeReducer, 'Close item details pop'),
  props<{value: boolean}>(),
);
export const SET_PIECES_IN_PRODUCT_DETAIL = createAction(
  buildingStringActionType(typeReducer, 'Set pieces in product detail'),
  props<{NumeroDePiezas: number}>(),
);
export const SET_ITEM_NOTE = createAction(
  buildingStringActionType(typeReducer, 'Set item note'),
  props<{Comentarios: string}>(),
);

export const UPDATE_COT_COTIZACION = createAction(
  buildingStringActionType(typeReducer, 'Update cotCotizacion'),
  props<{CotCotizacion: CotProductoOferta}>(),
);
export const SET_NEW_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set new date'),
  props<{dates: Array<CotPartidaCotizacionCapacitacionFecha>}>(),
);
