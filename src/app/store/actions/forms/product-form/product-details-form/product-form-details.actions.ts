import {createAction, props} from '@ngrx/store';
import {Archivo} from 'api-catalogos';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = '[ProductForm-details]';
const typeApi = '[ProductForm-details-Api]';

export const INIT_PRODUCT_DETAILS_EFFECT = createAction(
  buildingStringActionType(typeApi, 'Init product details effect'),
);
export const INIT_PRODUCT_DETAILS_EFFECT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Init product details effect success'),
);
export const DESTROY_PRODUCT_DETAILS_EFFECT = createAction(
  buildingStringActionType(typeApi, 'Destroy product details effect'),
);
export const DESTROY_PRODUCT_DETAILS_EFFECT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Destroy product details effect success'),
);
export const GENERATE_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Generate backup'),
);
export const CLEAN_BACKUP = createAction(buildingStringActionType(typeReducer, 'Clean backup'));
export const SET_ID_FILE_TO_DELETE = createAction(
  buildingStringActionType(typeReducer, 'Set id file to delete'),
  props<{idFile: string; tabId: number; node: string}>(),
);
export const FETCH_EXTERNAL_FILE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch external file load'),
  props<{node: string; file?: Archivo}>(),
);
export const VIEW_FILE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'View File load'),
  props<{IdArchivo: string}>(),
);
export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set initial State'),
);
export const SHOW_CONFIRM_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Confirm Dialog'),
  props<{currentTab?: ITabOption}>(),
);
export const SET_TAB_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set tab option'),
  props<{tabOption: ITabOption}>(),
);
export const SAVE_DATA_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Save data component effect'),
);
