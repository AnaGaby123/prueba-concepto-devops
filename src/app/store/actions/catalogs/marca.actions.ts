import {createAction, props} from '@ngrx/store';
import {DropListOptionCustom} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = '[Cat-Trademark]';
export const GET_CAT_BRANDS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Brands Load'),
);
export const GET_CAT_BRANDS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Brands Success'),
  props<{list: DropListOptionCustom[]}>(),
);
export const GET_CAT_BRANDS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get Brands Error'),
  props<{error: any}>(),
);
