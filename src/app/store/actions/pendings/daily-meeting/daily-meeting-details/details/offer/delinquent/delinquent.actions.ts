import {createAction, props} from '@ngrx/store';
import {FacturasPendientesClienteObj} from 'api-finanzas';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'DailyMeetingDetailsOfferDelinquentApi';
const typeReducer = 'DailyMeetingDetailsOfferDelinquent';

export const FETCH_PENDING_INVOICES_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Pending Invoices Success'),
  props<{dataPendingInvoices: FacturasPendientesClienteObj}>(),
);
export const FETCH_PENDING_INVOICES_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Pending Invoices Failed'),
);
export const SET_FILTER_BY_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Filter by Type'),
  props<{filterByType: DropListOption}>(),
);
export const CLEAN_ALL_DELINQUENT = createAction(
  buildingStringActionType(typeReducer, 'Clean All Delinquent'),
);
