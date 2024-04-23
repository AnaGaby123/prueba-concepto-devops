import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {
  IEvisOffer,
  IEvisResults,
  IOfferAdjustment,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-list/offer-adjustment-list.model';
import {
  AttributeDashboard,
  QueryResultVClienteCotizacionAjusteOferta,
  QueryResultVMarcaPartidaAjusteOferta,
  TotalAjustesPorTipoObj,
  TotalClientesCotizacionesObj,
  TotalClientesPorTipoAjusteDeOfertaObj,
  TotalPartidasPorTipoObj,
} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'OfferAdjustmentList';
const typeApi = 'OfferAdjustmentListAPI';

export const CLEAN_ALL_OFFER_ADJUSTMENT_LIST = createAction(
  buildingStringActionType(typeReducer, 'Clean All Offer Adjustment'),
);
export const SET_TAP = createAction(
  buildingStringActionType(typeReducer, 'Set Tab'),
  props<{tabSelected: ITabOption}>(),
);
export const SET_FILTER_BY_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Filter By Type'),
  props<{filterByType: DropListOption}>(),
);
export const SET_FILTER_BY_DATES = createAction(
  buildingStringActionType(typeReducer, 'Set Filter By Dates'),
  props<{filterByDates: IFilterDate}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_CUSTOMER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customer Load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_CUSTOMER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customer Success'),
  props<{data: IEvisOffer}>(),
);
export const FETCH_CHART_TRADEMARK_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Chart Trademark Load'),
);
export const FETCH_CHART_TRADEMARK_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Chart Trademark Success'),
  props<{data: QueryResultVMarcaPartidaAjusteOferta}>(),
);
export const FETCH_CHART_CUSTOMER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Chart Customer Load'),
);
export const FETCH_CHART_CUSTOMER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Chart Customer Success'),
  props<{data: QueryResultVClienteCotizacionAjusteOferta}>(),
);
export const FETCH_CHART_ADJUSTMENT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Chart Adjustment Load'),
);
export const FETCH_CHART_ADJUSTMENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Chart Adjustment Success'),
  props<{data: TotalAjustesPorTipoObj}>(),
);
export const FETCH_TOTALS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Totals Load'),
);
export const FETCH_TOTALS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Totals Success'),
  props<{data: TotalClientesPorTipoAjusteDeOfertaObj}>(),
);
export const FETCH_TOTAL_AMOUNTS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Total Amount Load'),
);
export const FETCH_TOTAL_AMOUNTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Total Amount Success'),
  props<{data: TotalClientesCotizacionesObj}>(),
);
export const FETCH_CHART_ITEMS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Chart Items Load'),
);
export const FETCH_CHART_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Chart Items Success'),
  props<{data: TotalPartidasPorTipoObj}>(),
);
export const SET_LOADING_LIST = createAction(
  buildingStringActionType(typeReducer, 'Set status of list evis'),
  props<{status: number}>(),
);
export const SET_USER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set User Selected'),
  props<{userSelected: IEvisResults}>(),
);
export const CLEAN_USER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Clean User Selected'),
);
// DOCS: ACTIONS FOR NEW SERVICES
export const FETCH_TOTALS_TABS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch totals tabs load'),
);
export const FETCH_TOTALS_TABS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch totals tabs success'),
  props<{tabs: Array<AttributeDashboard>}>(),
);
export const FETCH_TOTALS_TABS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch totals tabs error'),
);
export const FETCH_OFFER_ADJUSTMENT_DASHBOARD_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetc_SUICh Offer Adjustment Dashboard Success'),
  props<{offerAdjustments: IOfferAdjustment[]}>(),
);
export const FETCH_OFFER_ADJUSTMENT_DASHBOARD_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Offer Adjustment Dashboard Errror'),
);
