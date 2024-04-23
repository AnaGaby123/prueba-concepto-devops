import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {SegVisitante, SegVisitaVisitanteTotales} from 'api-logistica';
import {ISegVisitaVisitanteDetalle} from '@appModels/store/pendings/security-guard/security-guard-details/security-guard-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFile} from '@appModels/files/files.models';
import {buildingStringActionType} from '@appUtil/strings';
// import {type} from 'os';

const typeReducer = 'SecurityGuardDetails';

export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all details state'),
);

export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);

export const SET_ACTUAL_STEP = createAction(
  buildingStringActionType(typeReducer, 'Set Actual Step'),
  props<{actualStep: number}>(),
);

export const SET_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Selected'),
  props<{tabSelected: ITabOption}>(),
);

export const FETCH_CUSTOMS_AGENT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Custom agent  Load'),
  props<{isFirstPage: boolean}>(),
);

export const FETCH_CUSTOM_AGENT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Custom agent Failed'),
);

export const FETCH_CUSTOM_AGENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Custom Agent Success'),
  props<{
    customAgentListResult: Array<ISegVisitaVisitanteDetalle>;
    total: number;
  }>(),
);
export const SET_STATUS_CHARGER_IMAGE = createAction(
  buildingStringActionType(typeReducer, 'Set Status Charger Image'),
  props<{statusImageCharger}>(),
);
export const SET_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Option Selected'),
  props<{selectedCustomAgent: ISegVisitaVisitanteDetalle}>(),
);

export const FETCH_INITIAL_VIEW = createAction(
  buildingStringActionType(typeReducer, 'Fetch Initial view'),
);

export const FETCH_VISIT_LIST_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch full name visit Load'),
);

export const FETCH_VISIT_LIST_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch full name visit Failed'),
);

export const FETCH_VISIT_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch full name visit Success'),
  props<{visitorList: Array<SegVisitante>}>(),
);

export const SET_VISIT_LIST_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Full Name Visit Selected'),
  props<{payload: DropListOption}>(),
);
export const SET_VEHICLE_TYPE_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Vehicle Type Selected'),
  props<{payload: DropListOption}>(),
);

export const SET_COLOR_VEHICLE = createAction(
  buildingStringActionType(typeReducer, 'Set Color Vechicle'),
  props<{color: string}>(),
);
export const SET_PLATES_VEHICLE = createAction(
  buildingStringActionType(typeReducer, 'Set Plates Vechicle'),
  props<{plates: string}>(),
);
export const SET_VEHICLE_BRAND_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Vehicle Brand Selected'),
  props<{payload: DropListOption}>(),
);

export const LOAD_TOTALS_FILTERS = createAction(
  buildingStringActionType(typeReducer, 'Load Totals Filters'),
);
export const SUCCESS_TOTALS_FILTERS = createAction(
  buildingStringActionType(typeReducer, 'Success Totals Filters'),
  props<{totals: SegVisitaVisitanteTotales}>(),
);

export const FAILED_TOTALS_FILTERS = createAction(
  buildingStringActionType(typeReducer, 'Failed Totals Filters'),
);

export const SET_STATUS_CHARGER = createAction(
  buildingStringActionType(typeReducer, 'Set Status Charger'),
  props<{status: number}>(),
);
export const SET_APPLICATION_VEHICLE = createAction(
  buildingStringActionType(typeReducer, 'Set Aplication Vehicle'),
  props<{value: boolean}>(),
);
export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set Initial State'),
);
export const SET_DATA_VISITOR = createAction(
  buildingStringActionType(typeReducer, 'Set Data Visitor'),
  props<{value: string; action: string; node: string}>(),
);
export const SET_IMAGE_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Image Selected'),
  props<{file: IFile}>(),
);
export const LOAD_SAVE_VISITOR = createAction(
  buildingStringActionType(typeReducer, 'Set Load Save Visitor'),
);
export const SUCCESS_SAVE_VISITOR = createAction(
  buildingStringActionType(typeReducer, 'Set Success Save Visitor'),
  props<{value: string; action: boolean}>(),
);
export const FAILED_SAVE_VISITOR = createAction(
  buildingStringActionType(typeReducer, 'Set Failed Save Visitor'),
);
export const VIEW_FILE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'View File Load'),
  props<{value: string}>(),
);

export const VIEW_FILE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'View File Success'),
  props<{value: string}>(),
);
export const VIEW_FILE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'View File Failed'),
);
export const RELOAD_VISITORS = createAction(
  buildingStringActionType(typeReducer, 'Reload Visitor List'),
);
export const CLEAN_FIELDS_VISITOR = createAction(
  buildingStringActionType(typeReducer, 'Clean Fields Visitor'),
);
export const SET_BACKUP_VISITOR_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Backup Visitor'),
);
export const SET_RELOAD_BACKUP_VISITOR_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Reload Backup Visitor'),
);
export const SET_GUIDE_VISIT = createAction(
  buildingStringActionType(typeReducer, 'Set Guide Visit'),
  props<{guide}>(),
);
export const SET_ARRAY_IMAGES = createAction(
  buildingStringActionType(typeReducer, 'Set Array Images'),
  props<{images: Array<IFile>}>(),
);
export const SET_COMMENT_GUIDE = createAction(
  buildingStringActionType(typeReducer, 'Set Comment Guide'),
  props<{comment; incidence}>(),
);
export const SET_LOAD_INCIDENCE_IMAGE = createAction(
  buildingStringActionType(typeReducer, 'Set Load Incidence Image'),
);
export const SET_SUCCESS_INCIDENCE_IMAGE = createAction(
  buildingStringActionType(typeReducer, 'Set Success Incidence Image'),
);
export const SET_FAILED_SAVE_VISITOR_VEHICLE = createAction(
  buildingStringActionType(typeReducer, 'Set Failed Save Visitor Vehicle'),
);
export const SET_FAILED_SAVE_VISIT = createAction(
  buildingStringActionType(typeReducer, 'Set Success Save Visit'),
);
export const SET_LOAD_SAVE_GUIDE_INTERNATIONAL = createAction(
  buildingStringActionType(typeReducer, 'Set Load Save Guide International'),
);
export const SET_LOAD_SAVE_GUIDE_NATIONAL = createAction(
  buildingStringActionType(typeReducer, 'Set Load Save Guide National'),
);
export const SET_SUCCESS_SAVE_GUIDE_INTERNATIONAL = createAction(
  buildingStringActionType(typeReducer, 'Set Success Save Guide National'),
);
export const SET_FAILED_SAVE_GUIDE_INTERNATIONAL = createAction(
  buildingStringActionType(typeReducer, 'Set Failed Save Guide National'),
);
export const SET_RELOAD_LIST_VISITS = createAction(
  buildingStringActionType(typeReducer, 'Reload List Visit'),
);
export const SET_LOAD_VISIT_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set Load Visit Data'),
);
export const SET_SUCCESS_VISIT_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set Success Visit Data'),
  props<{selectedCustomAgent: ISegVisitaVisitanteDetalle}>(),
);
export const SET_FAILED_VISIT_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set Failed Visit Data'),
);

export const SET_ERROR_POP = createAction(
  buildingStringActionType(typeReducer, 'Set Value error Pop'),
  props<{value: boolean}>(),
);
export const SET_RELOAD_IMAGE_VISITOR = createAction(
  buildingStringActionType(typeReducer, 'Set Reload Image Visitor'),
);
