/* Utils Imports */
import {createAction, props} from '@ngrx/store';

/* Models Imports */
import {IMenuOption} from '@appModels/store/utils/utils.model';
import {buildingStringActionType} from '@appUtil/strings';
import {AutorizacionDetalle, ParametroAutorizacion} from 'api-logistica';
import {ColumnNotes} from '@appModels/table/internal-sales-item';

const typeReducer = 'Utils';
const typeApi = 'Utils Api';

export const SET_LOADING = createAction(
  buildingStringActionType(typeReducer, 'Set Loading'),
  props<{payload: boolean}>(),
);
export const SET_MENU_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set Menu Is Open'),
  props<{isOpen: boolean}>(),
);
export const SET_SUBMENU_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set Submenu Is Open'),
  props<{isOpen: boolean}>(),
);
export const SET_FIRST_LEVEL_OPTION_FROM_MENU = createAction(
  buildingStringActionType(typeReducer, 'Set Option From Menu'),
  props<{selectedOption: IMenuOption}>(),
);
export const SET_SECOND_LEVEL_OPTION_FROM_MENU = createAction(
  buildingStringActionType(typeReducer, 'Set Option From Submenu'),
  props<{selectedOption: IMenuOption}>(),
);
export const SET_THIRD_LEVEL_OPTION_FROM_MENU = createAction(
  buildingStringActionType(typeReducer, 'Set Option From Option'),
  props<{selectedOption: IMenuOption}>(),
);
export const SET_LOADING_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set Loading Error'),
  props<{active: boolean; message: string}>(),
);
export const DOWLOAD_FILE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Dowload File Load'),
  props<{IdArchivo: string; FileKey: string; newTab?: boolean}>(),
);
export const DOWLOAD_FILE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Dowload File Success'),
);
export const DOWLOAD_FILE_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Dowload File Error'),
  props<{error: any}>(),
);
export const SET_LOADING_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Loading Success'),
  props<{
    active: boolean;
    message: string;
    extraMessage?: string;
    successText?: string;
  }>(),
);
export const SET_IS_POP_FILE_EMAIL_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set is pop file email open'),
  props<{titleHeader: string; IdArchivo: string}>(),
);
export const SET_IS_POP_FILE_EMAIL_CLOSE = createAction(
  buildingStringActionType(typeReducer, 'Set is pop file email close'),
);
export const VIEW_FILE_EMAIL_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set view file email success'),
  props<{fileBase64Email: string}>(),
);
export const VIEW_FILE_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set view file email error'),
);
export const SET_ACTIVE_MENUOPTIONS = createAction(
  buildingStringActionType(typeReducer, 'Set Active Menu Options'),
  props<{url: string; roles: string[]}>(),
);
export const FETCH_NON_WORKING_DAYS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Non Working Days'),
  props<{nonWorkingDays: Array<string>}>(),
);
export const FETCH_NON_WORKING_DAYS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Non Working Days Load'),
);
export const SET_VIEW_TYPE = createAction(
  buildingStringActionType(typeReducer, 'Set View Type'),
  props<{viewType: string; screenSize: number}>(),
);
export const SET_ACTIVE_A_MENU_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Active A Menu Option'),
  props<{mainMenuOptions: Array<IMenuOption>}>(),
);
export const RETURN_EMPTY = createAction(
  buildingStringActionType(typeReducer, 'Return EMPTY ACTION'),
);
export const RETURN_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Return Error ACTION'),
  props<{error: any}>(),
);
export const SET_APP_VERSION = createAction(
  buildingStringActionType(typeReducer, 'Set version of system'),
  props<{appVersion: string}>(),
);

// DOCS: Acciones para código de autorización
export const REQUEST_VALIDATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Request validation code load'),
  props<{authorizationType: string; IdOperacion: string}>(),
);
export const REQUEST_VALIDATION_CODE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Request validation code success'),
  props<{authorization: AutorizacionDetalle}>(),
);
export const REQUEST_VALIDATION_CODE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Request validation code failed'),
);
export const SEND_AUTHORIZATION_CODE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set code digit'),
  props<{authorizationObj: ParametroAutorizacion}>(),
);
export const SEND_AUTHORIZATION_CODE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Send authorization code success'),
  props<{valid: boolean}>(),
);
export const RESET_CODE_POP_INPUTS = createAction(
  buildingStringActionType(typeReducer, 'reset code pop inputs'),
);
export const SEND_AUTHORIZATION_CODE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Send authorization code failed'),
);
export const SET_POP_UP_NOTES_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set pop up notes data'),
  props<{modalIsOpen; notes: ColumnNotes}>(),
);
