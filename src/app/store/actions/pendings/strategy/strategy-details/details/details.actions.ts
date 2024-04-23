import {createAction} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'StrategyDetailsDetails';

export const CLEAN_ALL_DETAILS = createAction(
  buildingStringActionType(typeReducer, 'Clean All Details'),
);
