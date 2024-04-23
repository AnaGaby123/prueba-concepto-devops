import {createAction, props} from '@ngrx/store';
import {VMarcaFamilia, VProductoSuplementario} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'ProductFormDetails-TechnicalCommercial';

export const SET_PRODUCT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Product Selected'),
  props<{productSelectedId: string}>(),
);
export const GET_PRODUCT_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Product Details Succcess'),
  props<{payload}>(),
);

export const SET_VALUE_DROP = createAction(
  buildingStringActionType(typeReducer, 'Set Value Drop Drown List Option'),
  props<{value: DropListOption; node: string; nodeSelected: string}>(),
);
export const SET_VALUE_DROP_TRADEMARK = createAction(
  buildingStringActionType(typeReducer, 'Set Value Drop Drown List Trademark Option'),
  props<{value: DropListOption; node: string; nodeSelected: string}>(),
);
export const SET_VALUE_DROP_WITH_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Set Value Drop Drown List Option With Configuration'),
  props<{
    value: DropListOption;
    nodeRoot: string;
    node: string;
    nodeSelected: string;
  }>(),
);
export const SET_VALUE_INPUT_PUBLICATIONS = createAction(
  buildingStringActionType(typeReducer, 'Set Value Input Publications Text'),
  props<{value: any; node: string}>(),
);
export const SET_VALUE_INPUT_SUPPLEMENT_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Set Value Input Suplemment Product'),
  props<{value: any; node: string}>(),
);
export const SET_VALUE_INPUT = createAction(
  buildingStringActionType(typeReducer, 'Set Value Input Text'),
  props<{value: any; node: string}>(),
);
export const SET_VALUE_INPUT_WITH_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Set Value Input Text With Configuration'),
  props<{value: any; node: string; nodeRoot: string}>(),
);
export const SET_INITIAL_DATA_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Set Initial Data Configuration'),
  props<{nodeRoot: string; familySelected: VMarcaFamilia}>(),
);
export const GET_PRODUCT_DETAILS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Set Product Details Failed'),
);
export const SET_LOAD_TYPE_PRODUCT_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set Load Type Product Family'),
  props<{selectedTradeMarkdId: string}>(),
);
export const SET_SUCCESS_TYPE_PRODUCT_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set Success Type Product Family'),
  props<{payload}>(),
);
export const SET_ERROR_TYPE_PRODUCT_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set Failed Type Product Family'),
);

export const SET_LOAD_CHARASTERISTIC_GROUPER = createAction(
  buildingStringActionType(typeReducer, 'Set Load Characteristic Grouper'),
  props<{payload}>(),
);
export const SET_SUCCESS_CHARASTERISTIC_GROUPER = createAction(
  buildingStringActionType(typeReducer, 'Set Success Characteristic Grouper'),
  props<{payload}>(),
);
export const SET_FAILED_CHARASTERISTIC_GROUPER = createAction(
  buildingStringActionType(typeReducer, 'Set Failed Characteristic Grouper'),
);
export const SET_CAS_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Set Cas Value'),
  props<{value}>(),
);
export const SAVE_MOLECULAR_STRUCTURE_FILE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Save  Molecular Structure Success'),
  props<{file}>(),
);
export const SET_SAVE_PRODUCT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product Load'),
);

export const SET_SAVE_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product'),
);
export const SET_SAVE_PRODUCT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product Success'),
  props<{payload: string}>(),
);
export const SET_SAVE_PRODUCT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product Failed'),
);

export const SET_SAVE_PRODUCT_FAMILY_TYPE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product Family Type Load'),
);
export const SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product Family Type Success'),
  props<{payload: string}>(),
);
export const SET_SAVE_PRODUCT_FAMILY_TYPE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product Family Type Failed'),
);

export const SET_VALIDATE_CAS = createAction(
  buildingStringActionType(typeReducer, 'Set Validate Cas'),
  props<{value: string}>(),
);
export const SET_VALIDATE_CAS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Validate Cas Success'),
  props<{value: boolean}>(),
);
export const SET_VALIDATE_CAS_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Validate Cas Failed'),
);
export const SET_SUPPLEMENTARY_PRODUCT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Suplementary Product Success'),
  props<{payload: Array<VProductoSuplementario>}>(),
);
export const SET_SUPPLEMENTARY_PRODUCT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Suplementary Product Failed'),
);

export const SET_NEW_PRODUCT_FILE = createAction(
  buildingStringActionType(typeReducer, 'Set new product File Configuration'),
  props<{newFile: File; node: string}>(),
);
export const SET_NEW_SUPPLEMENTS_PRODUCTS = createAction(
  buildingStringActionType(typeReducer, 'Set new Supplements Product'),
);
export const SET_DELETE_SUPPLEMENT = createAction(
  buildingStringActionType(typeReducer, 'Set Delete Supplement'),
  props<{payload: VProductoSuplementario}>(),
);
export const SET_DATE_VALIDITY_CURATORSHIP = createAction(
  buildingStringActionType(typeReducer, 'Set Date Validity Curatorships'),
  props<{finalDate: string; dateType: Date}>(),
);
export const SET_BACKORDER_AVAILABILITY_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set Backorder Availability Date'),
  props<{finalDate: string; dateType: Date}>(),
);
export const SET_DATE_EXPIRATION_HEALTH_REGISTER = createAction(
  buildingStringActionType(typeReducer, 'Set Date Expiration Health Register'),
  props<{finalDate: string; dateType: Date}>(),
);

export const SET_SAVE_PRODUCT_SUPPLEMENT = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product Supplement Load'),
);
export const SET_SAVE_PRODUCT_SUPPLEMENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product Supplement Success'),
);
export const SET_SAVE_PRODUCT_SUPPLEMENT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product Supplement Failed'),
);

export const SET_DELETE_PRODUCT_SUPPLEMENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Delete Supplement Product Success'),
);
export const SET_DELETE_PRODUCT_SUPPLEMENT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Delete Supplement Product Failed'),
);
export const SET_DELETE_PRODUCT_SUPPLEMENT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set Delete Supplement Product Load'),
);
export const SET_VALUE_DROP_DOWN_LIST_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Set value dropdown list component effect'),
  props<{value: any; node: string; nodeSelected: string}>(),
);
export const SET_VALUE_DROP_CONFIG_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Set value drop config component effect'),
  props<{value: any; node: string; nodeSelected: string}>(),
);
export const SET_VALUE_INPUT_WITH_CONFIG_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'set value input with config component effect'),
  props<{value: any; node: string}>(),
);
