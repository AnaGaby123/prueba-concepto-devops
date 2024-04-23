import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {QueryResultVMarcaFamilia} from 'api-catalogos';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {buildingStringActionType} from '@appUtil/util';

const typeReducer = 'Offline-Product';
const typeApi = 'Offline-Product-Api';

export const NAVIGATE_OFFLINE_PRODUCT_INIT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Navigate Offline Product Init Effect'),
);
export const FETCH_DATA_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Types Family With Principal Provider Load'),
);
export const FETCH_TYPES_FAMILY_WITH_PRINCIPAL_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Types Family With Principal Provider Success'),
  props<{
    typesFamiliesOptionsApi: QueryResultVMarcaFamilia;
    typesFamiliesOptionsDropList: Array<DropListOption>;
  }>(),
);
export const FETCH_TYPES_FAMILY_WITH_PRINCIPAL_PROVIDER_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Fetch Types Family With Principal Provider Failed'),
  props<{error: any}>(),
);

export const SET_TYPE_FAMILY_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Type Family Option'),
  props<{familyOption: DropListOption}>(),
);
export const SET_CATALOG = createAction(
  buildingStringActionType(typeReducer, 'Set Catalog'),
  props<{catalog: string}>(),
);
export const SET_PIECES = createAction(
  buildingStringActionType(typeReducer, 'Set Pieces'),
  props<{pieces: number}>(),
);
export const FETCH_PRODUCT_EXISTING_SUCCESS_WITH_RESULTS = createAction(
  buildingStringActionType(typeApi, 'Fetch Product Existing Success With Results'),
  props<{response: ProductSearchResult}>(),
);
export const RESET_PRODUCT_EXISTING = createAction(
  buildingStringActionType(typeReducer, 'Reset Product Existing'),
);
export const FETCH_PRODUCT_EXISTING_SUCCESS_WITHOUT_RESULTS = createAction(
  buildingStringActionType(typeApi, 'Fetch Product Existing Success Without Results'),
);
export const SAVE_OFFLINE_PRODUCT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Save Offline Product Success'),
);
export const FETCH_PRODUCT_EXISTING_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Product Existing Failed'),
  props<{error: any}>(),
);
export const ADD_PRODUCT_QUOTATION = createAction(
  buildingStringActionType(typeReducer, 'Add Product Quotation'),
  props<{value: boolean}>(),
);
export const SET_QUANTITY = createAction(
  buildingStringActionType(typeReducer, 'Set Count of Product'),
  props<{quantity: string}>(),
);
export const SET_UNIT_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Set Id Unit of Product'),
  props<{idUnit: DropListOption}>(),
);
export const SET_NAME_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Set Name of Product'),
  props<{name: string}>(),
);
export const SET_NOTES = createAction(
  buildingStringActionType(typeReducer, 'Set Notes'),
  props<{notes: string}>(),
);
export const SAVE_OFFLINE_PRODUCT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save Offline Product Load'),
);
export const SAVE_OFFLINE_PRODUCT_ERROR = createAction(
  buildingStringActionType(typeReducer, 'Save Offline Product Error'),
  props<{error: any}>(),
);
export const SET_STATUS_API = createAction(
  buildingStringActionType(typeReducer, 'Set Status Api Save'),
  props<{offlineProductStatus: number}>(),
);
export const INITIAL_OFFLINE_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Inicializar la información'),
);
