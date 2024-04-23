import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {
  IFamily,
  IVMarcaFamilia,
} from '@appModels/store/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details.model';
import {ConceptoAgenteAduanal, ConfProveedorCompra} from 'api-catalogos';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {IPopUp} from '@appModels/shared-components/pqf-pop-up';

const typeReducer = 'Logistic-configuration';

export const SET_TITLE = createAction(
  buildingStringActionType(typeReducer, 'Set title'),
  props<{title: string}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set search term'),
  props<{searchTerm: string}>(),
);
export const SET_FAMILIES_LIST_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set families list status'),
  props<{status: boolean}>(),
);
export const SET_FILTER_OPTIONS = createAction(
  buildingStringActionType(typeReducer, 'Set filter options'),
  props<{filterOptions: Array<FilterOptionPqf>}>(),
);
export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set initial state'),
);
export const FETCH_FAMILIES_LIST_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set families list load'),
);
export const FETCH_FAMILIES_LIST_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set families list failed'),
);
export const FETCH_FAMILIES_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set families list success'),
  props<{listFamilies: Array<IFamily>}>(),
);
export const SET_FAMILY_ITEM = createAction(
  buildingStringActionType(typeReducer, 'Set family item'),
  props<{family: IFamily}>(),
);
export const FETCH_FAMILY_SELECTED_DETAILS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set family selected details failed'),
);
export const FETCH_FAMILY_SELECTED_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set family selected details success'),
  props<{configuration: ConfProveedorCompra}>(),
);
export const FETCH_FAMILY_SELECTED_DETAILS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set family selected details load'),
);
export const SET_FAMILY_PROVIDER_PRICE_CONFIGURATION_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set family provider price configuration value'),
  props<{field: string; value: number | string | DropListOptionPqf}>(),
);
export const SET_TRADEMARK_FAMILY_PROVIDER_CONFIGURATION_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set trademark family provider price configuration value'),
  props<{field: string; value: boolean}>(),
);
export const SET_TRADEMARK_FAMILY_ITEM_IS_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set trademark family item is selected'),
  props<{item: DropListOptionPqf}>(),
);
export const SET_PROVIDER_PRICE_CONFIGURATION_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set provider price configuration value'),
  props<{field: string; value: number}>(),
);
export const SET_PRICE_lIST_TOGGLE_CHANGE = createAction(
  buildingStringActionType(typeReducer, 'Set family provider price configuration toggle value'),
  props<{value: boolean}>(),
);
export const SET_CUSTOMS_AGENT_CONFIGURATION_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set customs agents configuration value'),
  props<{field: string; value: DropListOptionPqf}>(),
);
export const GET_PROVIDER_CUSTOMS_AGENT_CONCEPT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get customs agent concept catalog success'),
  props<{customsAgentsConceptList: Array<ConceptoAgenteAduanal>}>(),
);
export const GET_TRADEMARK_FAMILIES_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Get trademark families list Success'),
  props<{
    trademarkFamiliesList: Array<IVMarcaFamilia>;
  }>(),
);
export const GET_TRADEMARK_FAMILIES_LIST_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Get trademark families list Failed'),
);
export const ACTIVE_POP = createAction(
  buildingStringActionType(typeReducer, 'Active pop up'),
  props<{value: boolean}>(),
);
export const SET_PRESELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set preselected family'),
  props<{preSelectedFamily: IFamily}>(),
);
export const SET_EVENT_EMITTER_POP_UP_METHODS = createAction(
  buildingStringActionType(typeReducer, 'Set event emitter pop up methods'),
  props<{popUp: IPopUp}>(),
);
export const SET_FAMILY_ITEM_METHODS = createAction(
  buildingStringActionType(typeReducer, 'Set family item methods'),
  props<{family: IFamily}>(),
);
export const RESTORE_BACKUP_SELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Restore backup selected family'),
);

// DOCS Acciones del guardado

export const SAVE_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save actual configuration load'),
  props<{finishConfiguration: boolean}>(),
);
export const SAVE_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save actual configuration success'),
  props<{selectedFamily: IFamily}>(),
);
export const SAVE_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Save offer actual configuration failed'),
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
