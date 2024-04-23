import {createAction, props} from '@ngrx/store';
import {Cliente} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {VUsuario} from 'api-finanzas';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Review-Results';
export const FETCH_FILTERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customer Load'),
);
export const FETCH_CUSTOMER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customer Success'),
  props<{customers: Array<Cliente>}>(),
);
export const FETCH_CUSTOMER_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Customer Error'),
  props<{error: any}>(),
);

export const FETCH_MESSENGERS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Messengers Error'),
  props<{error: any}>(),
);
export const SET_FILTER = createAction(
  buildingStringActionType(typeReducer, 'Set Filter of List'),
  props<{item: DropListOption; attribute: string}>(),
);
export const FETCH_MESSAGES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Messages Success'),
  props<{messengers: Array<VUsuario>}>(),
);
export const FETCH_MESSAGES_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Fetch Messages Error'),
  props<{error: any}>(),
);
export const EXECUTE_FILTERS = createAction(
  buildingStringActionType(typeReducer, 'Execute Filter of Reviews'),
);
