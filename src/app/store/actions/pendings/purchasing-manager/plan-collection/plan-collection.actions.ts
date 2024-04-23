import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'plan-collection';

export const SET_IS_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set is Details'),
  props<{isDetails: boolean}>(),
);
export const SET_PROVIDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Provider Selected'),
  /*  props<{provider: IProvider}>(),*/
);
export const CLEAN_SERVICES_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Clean services contact'),
);
