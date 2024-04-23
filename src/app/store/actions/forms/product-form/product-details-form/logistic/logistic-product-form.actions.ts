import {createAction, props} from '@ngrx/store';
import {IRadioButton} from '@appModels/radio-button/radio-button.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  ArchivoDetalle,
  ArchivoTratadosOtrosDetalle,
  ProductoTarifaAgenteAduanal,
} from 'api-catalogos';
import {buildingStringActionType} from '@appUtil/strings';

const typeReduce = 'ProductLogisticReducer';
const typeApi = 'ProductLogisticApi';

export const SET_RADIOBUTTON = createAction(
  buildingStringActionType(typeReduce, 'Set radiobutton'),
  props<{option: IRadioButton}>(),
);
export const SAVE_LOGISTIC_FORM_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save logistic form load'),
);
export const SET_NEW_PRODUCT_FILE = createAction(
  buildingStringActionType(typeReduce, 'Set new product file'),
  props<{newFile: File; node: string}>(),
);
export const ADD_OTHER_FILE = createAction(
  buildingStringActionType(typeReduce, 'Add other file'),
  props<{file: File}>(),
);
export const SET_DROP_OPTION = createAction(
  buildingStringActionType(typeReduce, 'Set drop option'),
  props<{option: DropListOption}>(),
);
export const FETCH_CUSTOM_AGENT_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch custom Agent Load'),
);
export const FETCH_CUSTOM_AGENT_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Fetch custom agent Success'),
  props<{customAgenteData: ProductoTarifaAgenteAduanal}>(),
);
export const SET_OTHER_FILE_TO_DELETE = createAction(
  buildingStringActionType(typeReduce, 'Set other file to delete'),
  props<{index?: number; IdArchivoTratadosOtros?: string}>(),
);
export const SAVE_CERTIFICATE_FILE_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save certificate file success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_SECURITY_FILE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save security file load'),
);
export const SAVE_SECURITY_FILE_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save security file success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_PRODUCT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save product success'),
);
export const SAVE_DATASHEET_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save datasheet load'),
);
export const SAVE_DATASHEET_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save datasheet success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_TREATY_FILE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save treaty file load'),
);
export const SAVE_TREATY_FILE_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save treaty file success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_OTHER_FILES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save other files load'),
);
export const SAVE_OTHER_FILES_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save other files success'),
  props<{otherFiles: Array<ArchivoDetalle>}>(),
);
export const SAVE_PRODUCT_CONFIG_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save product config load'),
  props<{typeName: string}>(),
);
export const SAVE_PRODUCT_CONFIG_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save product config success'),
);
export const SAVE_TREATY_LIST_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save treaty list success'),
  props<{list: Array<ArchivoTratadosOtrosDetalle>}>(),
);
export const DISABLE_TREATY_FILES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Disable treaty files load'),
);
