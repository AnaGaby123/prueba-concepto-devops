import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Offer Adjustment Details Payment';
const typeApi = 'Api Offer Adjustment Details Payment';

export const SET_ENTRY_POP_UP_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set entry popup open'),
  props<{
    itemId: string;
    brandId: string;
    isOpen: boolean;
  }>(),
);
export const SET_ENTRY_POP_UP_IS_IN_RANGE = createAction(
  buildingStringActionType(typeReducer, 'Set entry popup is in range'),
  props<{
    startIndex: number;
    endIndex: number;
    counter: number;
  }>(),
);
export const CLOSE_ALL_ENTRIES_POPS = createAction(
  buildingStringActionType(typeReducer, 'Close all entries pops'),
);
