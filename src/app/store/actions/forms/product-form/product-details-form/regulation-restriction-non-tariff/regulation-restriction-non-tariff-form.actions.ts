import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ArchivoDetalle} from 'api-catalogos';
import {buildingStringActionType} from '@appUtil/strings';

const typeReduce = 'Regulation-products-reduce';
const typeApi = 'Regulation-products-api';

export const SET_NEW_FILE = createAction(
  buildingStringActionType(typeReduce, 'Set new file'),
  props<{file: File; node: string}>(),
);
export const SET_PRODUCT_DATA = createAction(
  buildingStringActionType(typeReduce, 'Set product data'),
  props<{data: string; node: string}>(),
);
export const SET_SELECTED_CLASSIFICATION = createAction(
  buildingStringActionType(typeReduce, 'Set selected classification'),
  props<{value: DropListOption}>(),
);
export const SET_LETTER_REGULATORY = createAction(
  buildingStringActionType(typeReduce, 'Set letter regulatory'),
  props<{data: string}>(),
);
export const SAVE_REGULATION_DATA = createAction(
  buildingStringActionType(typeApi, 'Save regulation data'),
);
export const SAVE_PRODUCT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save product success'),
);
export const SAVE_AVAILABLE_LETTER_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save available letter success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_USE_LETTER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save use letter load'),
);
export const SAVE_USE_LETTER_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save use letter success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_ACQUISITION_IN_PLACE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save acquisition in place load'),
);
export const SAVE_ACQUISITION_IN_PLACE_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save acquisition in place success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_IMPORT_LICENSE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save import license load'),
);
export const SAVE_IMPORT_LICENSE_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save import license success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_ESSENTIAL_CHEMICALS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save essential chemicals load'),
);
export const SAVE_ESSENTIAL_CHEMICALS_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save essential chemicals success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_ZOOSANITARIE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save zoosanitarie load'),
);
export const SAVE_ZOOSANITARIE_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save zoosanitarie success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_CICLOPAFEST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save ciclopafest load'),
);
export const SAVE_CICLOPAFEST_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save ciclopafest success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_OTHER_PERMISSION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save other permission load'),
);
export const SAVE_OTHER_PERMISION_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save other permisssion success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_TYPE_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save type configuration load'),
  props<{typeName: string}>(),
);
export const SAVE_TYPE_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save type configuration success'),
);
export const SET_LABWARE_DATA = createAction(
  buildingStringActionType(typeReduce, 'Set labware Data'),
  props<{data: string}>(),
);
export const SET_DATE = createAction(
  buildingStringActionType(typeReduce, 'Set date'),
  props<{date: string; dateFormat: Date}>(),
);
