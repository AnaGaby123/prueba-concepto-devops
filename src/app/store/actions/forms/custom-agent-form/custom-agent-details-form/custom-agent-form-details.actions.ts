import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {
  Aduana,
  AduanaDetalle,
  CatTipoNumeroTelefonico,
  ConceptoAgenteAduanal,
  ContactoDetalleAgenteAduanalObj,
  VAgenteAduanal,
} from 'api-catalogos';
import {ICustomAgentContact} from '@appModels/store/forms/custom-agents-forms/custom-agents-details-forms/custom-agents-details-forms.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = '[CustomAgentDetails]';
const typeReducer = '[CustomAgentDetails]';

export const SET_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set tab selected'),
  props<{option: ITabOption}>(),
);
export const SET_OPTION_BAR_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set option bar selected'),
  props<{option: OptionBar}>(),
);
export const SET_CUSTOM_AGENT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set custom agent selected'),
  props<{customAgent: VAgenteAduanal}>(),
);
export const SET_EDIT_MODE = createAction(
  buildingStringActionType(typeApi, 'Set edit mode'),
  props<{editMode: boolean}>(),
);
export const RESET_DETAILS = createAction(buildingStringActionType(typeReducer, 'Reset details'));
export const NEXT_STEP = createAction(
  buildingStringActionType(typeReducer, 'Next Step'),
  props<{step: number}>(),
);
export const ADD_OR_EDIT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Add or edit component effect'),
  props<{mode: string}>(),
);
export const CANCEL_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Cancel component effect'),
);
export const SAVE_DATA_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Save data component effect'),
);
export const INIT_DETAILS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Init details component effect'),
);
export const ON_DESTROY_DETAILS_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'On destroy details component effect'),
);
export const CHANGE_TAB_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Change tab component effect'),
  props<{option: ITabOption}>(),
);
export const CHANGE_DISPATCH_POINT_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Change dispatch point component effect'),
  props<{option: OptionBar}>(),
);
export const CANCEL_POP_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Cancel pop component effect'),
  props<{event: boolean; tab?: ITabOption; optionBar?: OptionBar}>(),
);
export const NEXT_STEP_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Next step component effect'),
  props<{step: number}>(),
);
export const ADD_NEW_RATE_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Add new rate component effect'),
);
export const ADD_NEW_DISPATCH_POINT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Add new dispatch point effect '),
);
// DOCS: Acciones para datos generales
export const RESET_GENERAL_DATA = createAction(
  buildingStringActionType(typeReducer, 'Reset general data'),
);
export const SET_NEW_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set new data'),
  props<{input: string; value: any}>(),
);
export const CHECK_EXISTING_EMAIL = createAction(
  buildingStringActionType(typeApi, ' Check Existing Email'),
  props<{email: string}>(),
);
export const VERIFY_EMAIL = createAction(
  buildingStringActionType(typeReducer, 'Verify Email'),
  props<{value: boolean}>(),
);
export const RESET_CONTACT_FORM = createAction(
  buildingStringActionType(typeReducer, 'Reset contact form'),
);
export const SET_ZIP_CODE = createAction(
  buildingStringActionType(typeApi, 'Set zip code'),
  props<{zipCode: string}>(),
);
export const VALIDATE_ZIP_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Validate zip Success'),
  props<{value: boolean}>(),
);
export const RESET_CUSTOM_AGENT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Reset custom agent selected'),
);
export const FETCH_CONTACTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch contacts load'),
);
export const FETCH_CONTACTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch contacts success'),
  props<{contacts: Array<ICustomAgentContact>}>(),
);
export const FETCH_CONTACTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch contacts failed'),
);
export const SET_PHONE_NUMBER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set Phone Number Load'),
  props<{field: string; value: string; phoneType: string}>(),
);
export const SET_PHONE_NUMBER = createAction(
  buildingStringActionType(typeReducer, 'Set Phone Number'),
  props<{
    field: string;
    value: string;
    phoneType: string;
    phoneTypeId: string;
  }>(),
);
export const SET_CONTACT_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set contact data'),
  props<{input: string; value: any}>(),
);
export const SET_CONTACT_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set contact form'),
);
export const SET_CONTACT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set contact selected'),
  props<{contact: ICustomAgentContact}>(),
);
export const SET_CONTACT_ACTION = createAction(
  buildingStringActionType(typeReducer, 'Set contact Action'),
  props<{action: string}>(),
);
export const SET_OPEN_CONTACT_POP = createAction(
  buildingStringActionType(typeReducer, 'Set open contact pop'),
  props<{value: boolean}>(),
);
export const GENERATE_BACKUP = createAction(
  buildingStringActionType(typeReducer, 'Generate backup'),
  props<{tabOption: ITabOption}>(),
);
export const SEND_GENERAL_DATA = createAction(
  buildingStringActionType(typeReducer, 'Send general data'),
);
export const SET_CANCEL_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set cancel form'),
);
export const SET_CANCEL_POP = createAction(
  buildingStringActionType(typeReducer, 'Set cancel pop'),
  props<{value: boolean; origen: string}>(),
);
export const SHOW_CONFIRM_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Confirm Dialog'),
  props<{currentTab?: ITabOption; origin?: string}>(),
);
export const SET_PRESELECTED_DISPATCH_POINT = createAction(
  buildingStringActionType(typeReducer, 'Set preselected dispatch point'),
  props<{value: OptionBar}>(),
);
export const SET_NAME_NEW_DISPATCH_POINT = createAction(
  buildingStringActionType(typeReducer, 'Set name new dispatch point'),
  props<{name: string}>(),
);
export const SET_CONTACT_TO_DISABLE = createAction(
  buildingStringActionType(typeReducer, 'Set contact to disable'),
  props<{contact: ContactoDetalleAgenteAduanalObj}>(),
);
export const DELETE_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Delete contact'),
  props<{contact: ContactoDetalleAgenteAduanalObj}>(),
);
export const SET_ADDRESS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Address success'),
  props<{IdDireccion: string}>(),
);
export const SET_ADDRESS_ERROR = createAction(
  buildingStringActionType(typeApi, 'Set address error'),
);
export const SET_CUSTOM_AGENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set custom agent success'),
  props<{IdAgenteAduanal: string}>(),
);
export const SET_CUSTOM_AGENT_FAILED = createAction(
  buildingStringActionType(typeApi, 'Set custom agent failed'),
);
export const DISABLE_CONTACTS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Disable contacts success'),
);
export const DISABLE_CONTACTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Save contacts configuration failed'),
);
export const SAVE_CONTACTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save contacts'),
  props<{updateState: boolean; contact?: ICustomAgentContact}>(),
);
export const GET_CAT_TIPO_TELEFONO_LOAD = createAction(
  buildingStringActionType(typeApi, 'Get cat tipo telefono load'),
);
export const GET_CAT_TIPO_TELEFONO_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Get cat tipo telefono success'),
  props<{lisCatTIipoTelefono: Array<CatTipoNumeroTelefonico>}>(),
);
export const GET_CAT_TIPO_TELEFONO_FAILED = createAction(
  buildingStringActionType(typeApi, 'Get cat tipo telefono success'),
);
export const CLEAN_BACKUP = createAction(buildingStringActionType(typeReducer, 'Clean backup'));

// DOCS: ACCIONES PARA DESADUANAJE

export const RESET_DISPATCH_POINT_STATE = createAction(
  buildingStringActionType(typeReducer, 'Reset dispatch point state'),
);
export const FETCH_DISPATCH_POINTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch dispatch points load'),
);
export const FETCH_DISPATCH_POINTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch dispatch points success'),
  props<{dispatchPoints: Array<Aduana>}>(),
);
export const FETCH_DISPATCH_POINTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch dispatch points failed'),
);
export const SET_DISPATCH_POINT_OPTIONS = createAction(
  buildingStringActionType(typeReducer, 'Set dispatch point options'),
  props<{dispatchPoints: Array<OptionBar>}>(),
);
export const FETCH_DISPATCH_POINT_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch dispatch point detail success'),
  props<{dispatchPointList: Array<AduanaDetalle>}>(),
);
export const SET_RATE_INFO = createAction(
  buildingStringActionType(typeReducer, 'Set rate info'),
  props<{input: string; value: any}>(),
);
export const SET_ADDRESS_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set address data'),
  props<{input: string; value: any}>(),
);
export const SET_DATA = createAction(
  buildingStringActionType(typeReducer, 'Set data'),
  props<{input: string; value: any}>(),
);
export const SET_RESET_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set reset form address'),
);
export const SET_ALLOWED_EDIT_FORM = createAction(
  buildingStringActionType(typeReducer, 'Set allowed form'),
  props<{value: boolean}>(),
);
export const DELETE_RATE = createAction(
  buildingStringActionType(typeReducer, 'Delete rate'),
  props<{rate: ConceptoAgenteAduanal}>(),
);
export const ADD_NEW_RATE = createAction(buildingStringActionType(typeReducer, 'Add new rate'));
export const SET_DISPATCH_POINT_TO_LIST = createAction(
  buildingStringActionType(typeReducer, 'Set dispatch point to list'),
  props<{dispatchPoint: AduanaDetalle}>(),
);
export const SAVE_DISPATCH_POINT = createAction(
  buildingStringActionType(typeApi, 'Save dispatch point'),
);
export const ADD_DISPATCH_POINT_TO_LIST = createAction(
  buildingStringActionType(typeReducer, 'Add dispatch Point to list'),
);
export const SAVE_ADDRESS_DISPATCH_POINT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save address dispatch point success'),
  props<{IdDireccion: string}>(),
);
export const SAVE_DISPATCH_POINT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save dispatch point success'),
  props<{IdAduana: string}>(),
);
export const DELETE_FEE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Delete fee success'),
);
export const SAVE_FEE = createAction(buildingStringActionType(typeApi, 'Save Fee'));
export const SAVE_FEE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save fee success'),
  props<{fees: Array<ConceptoAgenteAduanal>}>(),
);
export const CHECK_ZIP_CODE_VALIDATE = createAction(
  buildingStringActionType(typeApi, 'Check zip code validate'),
);
export const ZIP_CODE_VALIDATE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Zip code validate success'),
  props<{value: boolean}>(),
);
