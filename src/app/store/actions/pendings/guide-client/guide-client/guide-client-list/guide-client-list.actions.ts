import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'GuideClientListReducer';
const typeApi = 'GuideClientListApi';

export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_FREIGHT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Freight Selected'),
  props<{value: DropListOption}>(),
);
export const SET_GUIDE_NUMBER = createAction(
  buildingStringActionType(typeReducer, 'Set Guide Number'),
  props<{guideNumber: string}>(),
);
export const REGISTER_LOAD = createAction(buildingStringActionType(typeReducer, 'Generate Load'));
