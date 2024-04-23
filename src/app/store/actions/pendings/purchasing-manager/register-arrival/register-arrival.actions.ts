import {createAction} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Register-Arrival';

export const SET_IS_DETAILS = createAction(buildingStringActionType(typeReducer, 'Set is Details'));
