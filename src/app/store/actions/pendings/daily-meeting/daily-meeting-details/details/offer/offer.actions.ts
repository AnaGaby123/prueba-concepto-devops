import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = 'DailyMeetingDetailsOfferApi';
const typeReducer = 'DailyMeetingDetailsOffer';

export const CLEAN_ALL_OFFER = createAction(
  buildingStringActionType(typeReducer, 'Clean All Offer'),
);
export const SET_SEARCH_TERM_ITEMS_OFFER = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_FILTER_BY_BRAND_ITEMS_OFFER = createAction(
  buildingStringActionType(typeReducer, 'Set Filter Brand'),
  props<{value: DropListOption}>(),
);
export const SET_SEARCH_TYPE_ITEMS_OFFER = createAction(
  buildingStringActionType(typeReducer, 'Set Search Type'),
  props<{searchType: DropListOption}>(),
);
export const SET_ENTRY_POP_UP_IS_IN_RANGE = createAction(
  buildingStringActionType(typeReducer, 'Set Entry Popup Is In Range'),
  props<{
    startIndex: number;
    endIndex: number;
    counter: number;
  }>(),
);
export const SET_ENTRY_POP_UP_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set Entry Popup Open'),
  props<{
    itemId: string;
    node: string;
    isOpen: boolean;
  }>(),
);
export const FETCH_SELECTED_QUOTE_BRANDS_OFFER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get Brands Success'),
  props<{brands: Array<DropListOption>}>(),
);
export const SET_BRAND_OFFER_ITEMS_OFFER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Brand Selected'),
  props<{brand: DropListOption}>(),
);
