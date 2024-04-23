// Dev Tools
import {createAction, props} from '@ngrx/store';
// Utils
import {VMarca} from 'api-catalogos';
// Models
import {IBrandItemConfig} from '@appModels/store/forms/brand-form/brand-form-details/brand-form-details.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Reducer - [BrandFormDetails]';
const typeApi = 'Api - [BrandFormDetails]';

export const SET_SELECTED_BRAND = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Brand'),
  props<{brand: VMarca | null}>(),
);
export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set Initial State Brand Details'),
);
export const SET_LOADING = createAction(
  buildingStringActionType(typeReducer, 'Set Loading Charger'),
  props<{brandsStatus: number}>(),
);
export const INIT_BRAND_DETAILS_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Init brand details effect'),
);
export const DESTROY_BRAND_DETAILS_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Destroy brand details effect'),
);
export const CHECK_ALL = createAction(
  buildingStringActionType(typeReducer, 'Check All'),
  props<{value: boolean}>(),
);
export const HANDLE_FILTER_CHECKED = createAction(
  buildingStringActionType(typeReducer, 'Handle filter checked'),
  props<{node: string; idName: string; id: string; value: boolean}>(),
);
export const FETCH_ITEMS_DETAILS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch items details load'),
);
export const FETCH_ITEMS_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch items details success'),
  props<{items: Array<IBrandItemConfig>}>(),
);
export const HANDLE_CHECK_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Handle check item'),
  props<{item: IBrandItemConfig; value: boolean}>(),
);
export const CLEAN_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean details state'),
);
export const HANDLE_SAVE_BRAND_LOAD = createAction(
  buildingStringActionType(typeApi, 'Handle save load'),
);
export const HANDLE_SAVE_BRAND_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Handle save brand success'),
  props<{IdMarca: string}>(),
);
export const HANDLE_SAVE_ITEMS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Handle save items load'),
);
export const HANDLE_SAVE_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Handle save items success'),
);
export const HANDLE_POP_ACTIONS = createAction(
  buildingStringActionType(typeReducer, 'Handle pop actions'),
  props<{value: boolean}>(),
);
export const HANDLE_SET_BRAND_DATA = createAction(
  buildingStringActionType(typeReducer, 'Handle set brand data'),
  props<{node: string; value: string}>(),
);
export const GENERATE_BRAND_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Generate brand backup'),
);
export const RESTORE_BACKUP = createAction(buildingStringActionType(typeReducer, 'Restore Backup'));
export const FORCE_ERRORS = createAction(
  buildingStringActionType(typeReducer, 'Force errors'),
  props<{value: boolean}>(),
);
