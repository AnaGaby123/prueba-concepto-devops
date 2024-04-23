import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Execute Payment';
const typeApi = 'Api Execute Payment';

export const SET_IS_DETAILS_VIEW = createAction(
  buildingStringActionType(typeReducer, 'Set Is In Details View'),
  props<{isInDetailsView: boolean}>(),
);

export const SET_ALLOWED_TO_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set Allowed To Details'),
);
