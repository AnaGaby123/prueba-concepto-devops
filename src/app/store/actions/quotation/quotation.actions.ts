import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Quotation';

export const SET_DETAILS_MODE = createAction(
  buildingStringActionType(typeReducer, 'Set Details Mode'),
  props<{detailsMode: boolean}>(),
);
export const SET_DETAILS_COMPONENT = createAction(
  buildingStringActionType(typeReducer, 'Set Details Component'),
  props<{detailsComponent: boolean}>(),
);
export const SET_TITLE = createAction(
  buildingStringActionType(typeReducer, 'Set title'),
  props<{title: string}>(),
);
export const SET_ENABLE_EDIT = createAction(
  buildingStringActionType(typeReducer, 'Set enable edit'),
  props<{enableEdit: boolean}>(),
);
export const HIDDE_BACK = createAction(
  buildingStringActionType(typeReducer, 'Hidde Back'),
  props<{hiddeBack: boolean}>(),
);
export const SHOW_NAV_BAR = createAction(
  buildingStringActionType(typeReducer, 'Show Navbar Clients new'),
  props<{isCustomerNew: boolean}>(),
);
export const SHOW_NAV_BAR_REQUEST = createAction(
  buildingStringActionType(typeReducer, 'Show Navbar Request Quotation Clients new'),
  props<{isRequestNew: boolean}>(),
);
