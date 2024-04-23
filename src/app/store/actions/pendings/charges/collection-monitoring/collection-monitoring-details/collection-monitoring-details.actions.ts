import {createAction, props} from '@ngrx/store';
import {FacturasPendientesClienteObj, VFacturaClienteCalendarioTotales} from 'api-finanzas';
import {ContactoDetalleObj} from 'api-logistica';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {IInvoice} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'collection-monitoring-details';
const typeApi = 'collection-monitoring-details-api';

export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all details state'),
);
export const SET_SELECTED_CLIENT = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Client'),
  props<{selectedClient: VFacturaClienteCalendarioTotales}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_COMPANIES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Companies Load'),
);
export const FETCH_COMPANIES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Companies Success'),
  props<{companiesList: {[key: string]: number}}>(),
);
export const FETCH_COMPANIES_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Companies Failed'),
  props<{error: any}>(),
);
export const FETCH_CLIENT_CONTACT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Client Contact Load'),
);
export const FETCH_CLIENT_CONTACT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Client Contact Success'),
  props<{clientContact: ContactoDetalleObj}>(),
);
export const FETCH_CLIENT_CONTACT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Client Contact Failed'),
);
export const FETCH_CHARGES_BARS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Charges Bars Load'),
);
export const FETCH_CHARGES_BARS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Charges Bars Success'),
  props<{barsData: FacturasPendientesClienteObj}>(),
);
export const FETCH_CHARGES_BARS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Charges Bars Failed'),
);
export const FETCH_INVOICES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Invoices Success'),
  props<{invoices: Array<IInvoice>}>(),
);
export const FETCH_INVOICES_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Invoices Failed'),
);
export const FINALIZE_INVOICES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Finalize Invoices Load'),
);
export const SAVE_INVOICES_COMMENTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Finalize Invoices Comments Success'),
);
export const FINALIZE_INVOICES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Finalize Invoices Success'),
);
export const FINALIZE_INVOICES_FAILED = createAction(
  buildingStringActionType(typeApi, 'Finalize Invoices Failed'),
);
export const SET_SELECTED_TAB_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Tab Option'),
  props<{selectedTabOption: ITabOption}>(),
);
export const SET_SELECTED_DROP_LIST_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Drop List Option'),
  props<{node: string; selectedOption: DropListOption}>(),
);
export const SET_ITEMS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Items Status'),
  props<{itemsStatus: number}>(),
);
export const SET_FILTER_RANGE_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set Range Filter Date'),
  props<{node: string; rangeDate: IFilterDate}>(),
);
export const SET_INVOICE_IS_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Invoice Is Selected'),
  props<{invoiceId: string; allItems?: boolean; value?: boolean}>(),
);
export const SET_INVOICE_COMMENT = createAction(
  buildingStringActionType(typeReducer, 'Set Invoice Comment'),
  props<{invoiceId: string; allItems?: boolean; comments?: string}>(),
);
export const SET_FPP_INVOICE_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set FPP Invoice Date'),
  props<{invoiceId: string; date: Date; stringDate: string}>(),
);
