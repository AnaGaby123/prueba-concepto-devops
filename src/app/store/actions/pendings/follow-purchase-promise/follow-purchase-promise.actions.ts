import {createAction} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Follow Purchase Promise';
export const SET_IS_DETAILS = createAction(buildingStringActionType(typeReducer, 'Set is Details'));
export const SET_ALLOWED_TO_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Set allowed to Details'),
);
