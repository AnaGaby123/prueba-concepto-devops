import {createAction, props} from '@ngrx/store';
import {DropListOptionCustom} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Cat-Lines';

export const GET_CAT_LINES_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Lines Load'),
);
export const GET_CAT_LINES_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Lines Success'),
  props<{list: DropListOptionCustom[]}>(),
);
export const GET_CAT_LINES_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Get Cat Lines Error'),
  props<{error: any}>(),
);
