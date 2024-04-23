import {createAction, props} from '@ngrx/store';
import {popAlert} from '@appModels/store/forms/brand-form/brand-form.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'Api - [BrandForm]';
const typeReducer = 'Reducer - [BrandForm]';

export const SET_ALLOW_TO_DETAILS = createAction(
  buildingStringActionType(typeApi, 'Set allow to details'),
  props<{allowToDetails: boolean}>(),
);
export const SET_IS_IN_DETAILS = createAction(
  buildingStringActionType(typeApi, 'Set is in details'),
  props<{isInDetails: boolean}>(),
);
export const SET_TITLE = createAction(
  buildingStringActionType(typeApi, 'Set title'),
  props<{title: string}>(),
);
export const SET_POP_BRAND_IS_OPEN = createAction(
  buildingStringActionType(typeApi, 'Set pop cancel is open'),
  props<{popAlert: popAlert}>(),
);
export const GO_BACK = createAction(buildingStringActionType(typeReducer, 'Go back'));
