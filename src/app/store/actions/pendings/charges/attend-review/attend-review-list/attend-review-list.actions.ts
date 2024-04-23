import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {ClienteAtenderRevisionObj} from 'api-finanzas';
import {ICustomerAttend} from '@appModels/store/pendings/charges/attend-review/attend-review-list/attend-review-list.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Attend-Review-List';

export const SET_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Selected'),
  props<{tab: ITabOption}>(),
);
export const SET_OPTION_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set Option Order'),
  props<{option: DropListOption}>(),
);
export const SET_TERM_SEARCH = createAction(
  buildingStringActionType(typeReducer, 'Set Term Search'),
  props<{termSearch: string}>(),
);
export const FETCH_CUSTOMER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customer Load'),
);
export const FETCH_CUSTOMER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customer Success'),
  props<{customers: Array<ICustomerAttend>}>(),
);
export const FETCH_CUSTOMER_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customer Error'),
);
export const SET_API_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Api Status Request'),
  props<{status: number}>(),
);
export const SET_DATA_CHART = createAction(
  buildingStringActionType(typeReducer, 'Set Data Chart'),
  props<{data: Array<ClienteAtenderRevisionObj>}>(),
);
