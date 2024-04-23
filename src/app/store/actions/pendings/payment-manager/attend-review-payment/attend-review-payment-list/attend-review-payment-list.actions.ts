import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProviderAttendReviewPayment} from '@appModels/store/pendings/payment-manager/attend-review-payment/attend-review-payment-list/attend-review-payment-list.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Attend Review Payment List';
const typeApi = 'Api Attend Review Payment List';

export const SET_FILTER_BY_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set Filter By Type'),
  props<{filterByType: DropListOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_PROVIDERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Providers Load'),
);
export const FETCH_PROVIDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Providers Success'),
  props<{providers: Array<IProviderAttendReviewPayment>}>(),
);
