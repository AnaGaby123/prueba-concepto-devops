import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProviderAttendReviewPayment} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment-list/attend-review-payment-list.models';
import {IBillAttendReviewPayment} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment-details/attend-review-payment-details.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Attend Review Payment Details';
const typeApi = 'Api Attend Review Payment Details';

export const SET_SELECTED_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Provider'),
  props<{selectedProvider: IProviderAttendReviewPayment}>(),
);
export const SET_FILTER_BY_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Filter By Type'),
  props<{filterByType: DropListOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_BILLS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Bills Load'),
);
export const FETCH_BILLS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Bills Success'),
  props<{bills: Array<IBillAttendReviewPayment>}>(),
);
export const SET_SELECTED_BILL = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Bill'),
  props<{selectedBill: IBillAttendReviewPayment}>(),
);
