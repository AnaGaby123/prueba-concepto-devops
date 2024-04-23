import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {ICustomerOrderM} from '@appModels/store/pendings/order-modification/order-modification-list/order-modification-list.model';
import {TotalesIncidenciaPedidoModificacionObj} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Order-Modification-List';
const typeApi = 'Order-Modification-List';
export const SET_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set tab selected'),
  props<{tab: ITabOption}>(),
);
export const SET_FILTER_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set filter by order'),
  props<{filter: DropListOption}>(),
);
export const SET_TERM_SEARCH = createAction(
  buildingStringActionType(typeReducer, 'Set term search'),
  props<{termSearch: string}>(),
);
export const SET_FILTER_DATE_RANGE = createAction(
  buildingStringActionType(typeReducer, 'Set filter range date'),
  props<{dateRange: IFilterDate}>(),
);
export const FETCH_CUSTOMER_ORDER_MODIFICATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customer List Load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_CUSTOMER_ORDER_MODIFICATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customer List Success'),
  props<{data: ICustomerOrderM}>(),
);
export const SET_STATUS_API = createAction(
  buildingStringActionType(typeReducer, 'Set Status Api'),
  props<{status: number}>(),
);
export const FETCH_TOTALS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Total Load'),
);
export const FETCH_TOTALS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Total Success'),
  props<{totals: TotalesIncidenciaPedidoModificacionObj}>(),
);
export const SET_NEEDS_TO_RELOAD_TOTALS = createAction(
  buildingStringActionType(typeReducer, 'Set Needs to Reload Totals'),
);
