import {createAction, props} from '@ngrx/store';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {buildingStringActionType} from '@appUtil/strings';
import {
  IFamiliesSalesConfig,
  IVMarcaFamiliaIndustriaObj,
} from '@appModels/store/pendings/new-product-existing-supplier/sales-configuration/sales-configuration-details.models';
import {IPopUp} from '@appModels/shared-components/pqf-pop-up';

const typeReducer = 'Reducer - [Sales Configuration Details]';
const typeApi = 'Api - [Sales Configuration Details]';

export const SET_TITLE = createAction(
  buildingStringActionType(typeReducer, 'Set title'),
  props<{title: string}>(),
);
export const SET_ENABLE_EDIT = createAction(
  buildingStringActionType(typeReducer, 'Set enable edit'),
  props<{enableEdit: boolean}>(),
);

export const SET_FILTERS = createAction(
  buildingStringActionType(typeReducer, 'Set Filter'),
  props<{filters: Array<FilterOptionPqf>}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_FAMILIES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch families load'),
);
export const FETCH_FAMILIES_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch families success'),
  props<{families: Array<IFamiliesSalesConfig>}>(),
);
export const UPDATE_LIST_ITEMS_API_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Update list items api status'),
  props<{status: number}>(),
);
export const UPDATE_DETAILS_CONFIGURATION_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Update details configuration status'),
  props<{status: number}>(),
);
export const SET_SELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set selected family'),
  props<{family: IFamiliesSalesConfig}>(),
);
export const FETCH_FAMILY_SELECTED_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set family selected details success'),
  props<{configuration: Array<IVMarcaFamiliaIndustriaObj>}>(),
);
export const FETCH_FAMILY_SELECTED_DETAILS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set family selected details failed'),
);
export const SET_PROVIDER_UTILITIES_CONFIGURATION_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set provider utilities configuration value'),
  props<{value: number; field: string; indexCatIndustryBrandFamily: number}>(),
);
export const SET_PROVIDER_PERFORMANCE_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set provider performance value'),
  props<{field: string; value: number; indexCatIndustryBrandFamily: number}>(),
);
export const SET_ACTIVE_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Set active configuration'),
  props<{value: boolean; indexCatIndustryBrandFamily: number}>(),
);
export const SET_EVENT_EMITTER_POP_UP_METHODS = createAction(
  buildingStringActionType(typeReducer, 'Set event emitter pop up methods'),
  props<{popUp: IPopUp}>(),
);
export const SET_EVENT_SECURE_CODE_ARRAY = createAction(
  buildingStringActionType(typeReducer, 'Set event secure code array'),
  props<{secureCode: Array<string>}>(),
);
export const RESTORE_BACKUP_SELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Restore backup selected family'),
);
export const ACTIVE_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Set active pop'),
  props<{value: boolean}>(),
);
export const ACTIVE_SECURE_CODE_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Set secure code active pop'),
  props<{value: boolean}>(),
);
export const RESET_SECURE_CODE_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Reset secure code pop up'),
);
export const ACTIVE_SECURE_MESSAGE_CODE_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Set message secure code active pop'),
  props<{value: boolean}>(),
);
export const ACTIVE_DISCARD_SECURE_MESSAGE_CODE_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Set discard message secure code active pop'),
  props<{value: boolean}>(),
);
export const SET_PRESELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set preselect family'),
  props<{preSelectedFamily: IFamiliesSalesConfig}>(),
);
export const SET_FAMILY_ITEM_METHODS = createAction(
  buildingStringActionType(typeReducer, 'Set family item methods'),
  props<{family: IFamiliesSalesConfig}>(),
);
export const SAVE_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save actual configuration load'),
  props<{finishConfiguration: boolean}>(),
);
export const SAVE_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save actual configuration success'),
  props<{familyBrandIndustry: IVMarcaFamiliaIndustriaObj}>(),
);
export const SAVE_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save actual configuration failed'),
);
export const SET_BACKUP_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Set offer backup configuration'),
);
export const VERIFY_UTILITIES_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Verify utilities load'),
);
export const FINISH_PURCHASING_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Finish purchasing configuration load'),
);
export const FINISH_PURCHASING_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Finish purchasing configuration success'),
);
export const FINISH_PURCHASING_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Finish purchasing configuration failed'),
);
export const SET_AUTHORIZATION_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set authorization data'),
);
export const SET_CODE_DIGIT = createAction(
  buildingStringActionType(typeReducer, 'Set code digit'),
  props<{value: string}>(),
);
export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set initial state'),
);
