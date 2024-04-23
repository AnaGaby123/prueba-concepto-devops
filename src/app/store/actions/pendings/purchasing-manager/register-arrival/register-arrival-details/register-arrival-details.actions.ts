/* Store Imports */
import {createAction, props} from '@ngrx/store';

/* Utils Imports */
/* Models Imports */
import {
  IDispatchOder,
  IProvidersPiecesArrived,
} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-details/register-arrival-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {OcPackingList} from 'api-logistica';
import {IFile} from '@appModels/files/files.models';
import {IPorter} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-list/register-arrival-list.models';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Register-Arrival-Details';
const typeApi = 'Register-Arrival-Details-Api';

export const SET_STEP_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Step Selected'),
  props<{stepSelected: number}>(),
);
export const SET_ARRAY_IMAGES = createAction(
  buildingStringActionType(typeReducer, 'Set Array Images'),
  props<{packageImages: Array<IFile>}>(),
);
export const SET_PORTER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Porter Selected'),
  props<{porterSelected: IPorter}>(),
);
export const RESET_DETAILS_VIEWS = createAction(
  buildingStringActionType(typeReducer, 'Reset Details View'),
);
export const RESET_STEPS_COMPONENT = createAction(
  buildingStringActionType(typeReducer, 'Reset Steps Component'),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_ORDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Order Selected'),
  props<{dataByTypeSelected: DropListOption}>(),
);
export const FETCH_DISPATCH_ORDERS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Dispatch Orders Failed'),
);
export const FETCH_DISPATCH_ORDERS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set Dispatch Orders'),
  props<{dispatchOrders: Array<IDispatchOder>}>(),
);
export const SET_DISPATCH_ORDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Dispatch Order Selected'),
  props<{dispatchOrderSelected: IDispatchOder}>(),
);
export const READ_BARCODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Read Barcode Load'),
  props<{barcode: string}>(),
);
export const READ_BARCODE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Read Barcode Success'),
);
export const FETCH_STEP_ARRIVED_PIECES_DATA_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Step Arrived Pieces Data Load'),
);
export const FETCH_STEP_ARRIVED_PIECES_DATA_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Step Arrived Pieces Data Success'),
  props<{
    providersWithItems: Array<IProvidersPiecesArrived>;
    packingListObj: Array<OcPackingList>;
  }>(),
);
export const FETCH_STEP_ARRIVED_PIECES_DATA_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Step Arrived Pieces Data Failed'),
);
export const SET_PROVIDER_IS_OPEN = createAction(
  buildingStringActionType(typeReducer, 'Set Provider Is Open'),
  props<{IdOcPackingList: string}>(),
);
export const SET_PIECES_ARRIVED_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Pieces Arrived Provider'),
  props<{pieces: number; IdOcPackingList: string}>(),
);
export const SET_CODE_VALUE_BY_POSITION = createAction(
  buildingStringActionType(typeReducer, 'Set Digit In Position'),
  props<{position: number; value: number; name: 'securityGuard' | 'buyer'}>(),
);
export const COMPARE_VERIFICATION_CODE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Compare Verification Code Load'),
  props<{name: 'securityGuard' | 'buyer'}>(),
);
export const COMPARE_VERIFICATION_CODE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Compare Verification Code Failed'),
);
export const SET_AUTHORIZED_CODE_IS_VALID = createAction(
  buildingStringActionType(typeApi, 'Set Authorized Code Is Valid'),
  props<{name: 'securityGuard' | 'buyer'}>(),
);
export const SET_SHAKED = createAction(
  buildingStringActionType(typeReducer, 'Set Shaked'),
  props<{value: boolean; name: 'securityGuard' | 'buyer'}>(),
);
export const RESTORE_CODE_VALUE = createAction(
  buildingStringActionType(typeReducer, 'Restore Verification Code'),
  props<{name: 'securityGuard' | 'buyer'}>(),
);
export const REGISTER_ARRIVAL_LOAD = createAction(
  buildingStringActionType(typeApi, 'Register Arrival Load'),
);
export const REGISTER_ARRIVAL_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Register Arrival Success'),
);
export const FETCH_IS_EXIST_VERIFICATION_CODES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Is Exist Verification Codes Load'),
);
export const FETCH_VERIFICATION_CODES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Verification Codes Load'),
);
export const FETCH_VERIFICATION_CODES_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Verification Codes Success'),
  props<{
    authorizationRequestChangeSecurity: string;
    authorizationRequestChangeBuyer: string;
  }>(),
);
