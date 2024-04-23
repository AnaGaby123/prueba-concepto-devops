import {createAction, props} from '@ngrx/store';
import {ICustomAgent} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery-list/control-material-delivery-list.models';
import {
  IDispatchOrder,
  IDispatchOrders,
} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery-details/control-material-delivery-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

import {IUploadFile} from '@appModels/UploadFile/UploadFile';
import {ArchivoDetalle} from 'api-catalogos';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Control-Material-Delivery-Details';

export const INITIAL_VIEW_DETAILS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Initial View Details'),
  props<{agent: ICustomAgent}>(),
);
export const ACKNOWLEDGMENT_DISPATCH_ORDERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Acknowledgment Dispatch Orders Load'),
);
export const ACKNOWLEDGMENT_DISPATCH_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Acknowledgment Dispatch Orders Success'),
  props<{orders: IDispatchOrders}>(),
);
export const ACKNOWLEDGMENT_DISPATCH_ORDERS_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Acknowledgment Dispatch Orders Error'),
  props<{error: any}>(),
);
export const SET_PARAM_ORDER_LIST = createAction(
  buildingStringActionType(typeReducer, 'Set Param Order List'),
  props<{param: DropListOption}>(),
);
export const SET_API_REQUEST_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set API Request Status'),
  props<{status: number}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SELECTED_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Order'),
  props<{order: IDispatchOrder}>(),
);
export const SET_FILE_UPLOAD = createAction(
  buildingStringActionType(typeReducer, 'Set File Upload'),
  props<{file: IUploadFile; base64: string}>(),
);
export const SET_NUMBER_OF_PACKAGES = createAction(
  buildingStringActionType(typeReducer, 'Set Number of Packages'),
  props<{numberOfPackages: number}>(),
);
export const SAVE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save Generate Acknowledgment Load'),
);
export const SAVE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save Generate Acknowledgment Success'),
);
export const SAVE_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Save Generate Acknowledgment Error'),
  props<{error: any}>(),
);
export const GENERATE_ACKNOWLEDGMENT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Generate Acknowledgment Load'),
);
export const GENERATE_ACKNOWLEDGMENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Generate Acknowledgment Success'),
);
export const GENERATE_ACKNOWLEDGMENT_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Generate Acknowledgment Error'),
  props<{error: any}>(),
);
export const GENERATE_FILE_DETAILS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Generate File Details Load'),
  props<{idFile: string}>(),
);
export const GENERATE_FILE_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Generate File Details Success'),
  props<{file: ArchivoDetalle}>(),
);
export const GENERATE_CONVERT_BASE64_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Convert Base64 Load'),
  props<{url: string}>(),
);
export const GENERATE_CONVERT_BASE64_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Convert Base64 Success'),
  props<{base64: string}>(),
);
export const CHECK_FILE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Check File Load'),
  props<{idFile: string}>(),
);
export const CHECK_FILE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Check File Success'),
);
export const CHECK_FILE_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Check File Error'),
  props<{error: any}>(),
);
export const SET_STATUS_API_FILE = createAction(
  buildingStringActionType(typeReducer, 'Set Status Api File'),
  props<{status: number}>(),
);
