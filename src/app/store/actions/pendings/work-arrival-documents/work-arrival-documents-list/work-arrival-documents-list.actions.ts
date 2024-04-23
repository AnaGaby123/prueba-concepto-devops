import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'WorkArrivalDocumentsList';
const typeApi = 'WorkArrivalDocumentsListApi';

export const FETCH_PROVIDERS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Providers Load'),
);
export const FETCH_PROVIDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Providers Success'),
  props<{providers: Array<any>}>(),
);
export const SET_PROVIDERS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Providers Status'),
  props<{providersStatus: number}>(),
);
export const SET_SELECTED_BURGER_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Burger Option'),
  props<{selectedBurgerOption: DropListOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
