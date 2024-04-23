import {createAction, props} from '@ngrx/store';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {IPqfTabOption} from '@appModels/shared-components/pqf-tab-options';
import {
  ProductRatificationExtended,
  ProductRatificationExtendedList,
} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.models';
import {
  Archivo,
  ArchivoDetalle,
  VMarcaFamilia,
  VProductoDetalle,
  VProductoSuplementario,
} from 'api-catalogos';
import {buildingStringActionType} from '@appUtil/strings';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {ISupplements} from '@appModels/store/forms/product-form/products-details-form/product-details.model';

const typeReducer = 'Regulatory-research-details [Reducer]';
const typeApi = 'Regulatory-research-details [Api]';
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set search term'),
  props<{searchTerm: string}>(),
);
export const SET_FILTER_OPTIONS = createAction(
  buildingStringActionType(typeReducer, 'Set filter options'),
  props<{filterOptions: Array<FilterOptionPqf>}>(),
);
export const SET_TAB_OPTIONS = createAction(
  buildingStringActionType(typeReducer, 'Set tab options'),
  props<{tabOptions: Array<IPqfTabOption>}>(),
);
export const RESET_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Reset details state'),
);
export const FETCH_FAMILIES_LIST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Families List load'),
);
export const FETCH_FAMILIES_LIST_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Families List success'),
  props<{productList: ProductRatificationExtendedList}>(),
);
export const FETCH_FAMILIES_LIST_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Families List failed'),
);
export const FETCH_SELECTED_PRODUCT_DETAILS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Selected Product Details success'),
  props<{productDetails: VProductoDetalle}>(),
);
export const FETCH_SELECTED_PRODUCT_DETAILS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Selected Product Details failed'),
);
export const SET_SUPPLEMENTARY_PRODUCT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Suplementary Product Success'),
  props<{payload: Array<VProductoSuplementario>}>(),
);

export const SET_SUPPLEMENTARY_PRODUCT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Suplementary Product Failed'),
);
export const FETCH_PRODUCT_CLASSIFICATIONS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Product Classifications success'),
  props<{classificationList: DropListOptionPqf[]}>(),
);
export const FETCH_PRODUCT_CLASSIFICATIONS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Product Classifications failed'),
);
export const FETCH_PRODUCT_FAMILIES_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Product Families success'),
  props<{
    familiesList: DropListOptionPqf[];
    hasRestrictionsAndRegularizations: boolean;
    familyBrandList: VMarcaFamilia[];
  }>(),
);
export const FETCH_PRODUCT_FAMILIES_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Product Families failed'),
);

export const SET_CHANGE_SELECT_PROPERTY_PRODUCT = createAction(
  buildingStringActionType(typeApi, 'Fetch Product select change'),
  props<{property: string; dropListOptionPqf: DropListOptionPqf}>(),
);

// TODO:alberthosys -> ver si se elimina
export const SET_CHANGE_INPUT_PROPERTY_PRODUCT_DETAILS = createAction(
  buildingStringActionType(typeApi, 'Fetch Product input change'),
  props<{key: string; value: any}>(),
);

export const CHANGE_NODE_DETAILS = createAction(
  buildingStringActionType(typeApi, 'Fetch Product input change node'),
  props<{node: string; key: string; value: string | number | boolean}>(),
);

export const SET_CHANGE_SELECT_PROPERTY_PRODUCT_BRAND_FAMILY = createAction(
  buildingStringActionType(typeApi, 'Fetch Product brand family failed'),
  props<{property: string; dropListOptionPqf: DropListOptionPqf}>(),
);

export const FETCH_PRODUCT_GROUP_CHARACTERISTICS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Product group characteristics success'),
  props<{groupCharacteristic: DropListOptionPqf[]}>(),
);
export const SET_INITIAL_DATA_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Set Initial Data Configuration'),
  props<{nodeRoot: string; familySelected: VMarcaFamilia}>(),
);

export const RESET_INFORMATION_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Reset status of product'),
  props<{
    nodeRootBefore: string;
    nodeRootAfter: string;
    hasRestrictionsAndRegularizations: boolean;
  }>(),
);

export const SET_SAVE_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Save product, details and suplements'),
);

export const SET_SAVE_PRODUCT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product Success'),
  props<{idProducto: string}>(),
);
export const SAVE_MOLECULAR_STRUCTURE_FILE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Save  Molecular Structure Success'),
  props<{file}>(),
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

export const SET_SAVE_PRODUCT_SUPPLEMENT = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product Supplement Load'),
);

export const SET_SAVE_PRODUCT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product Failed'),
);

export const SET_DELETE_PRODUCT_SUPPLEMENT_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Set Delete Supplement Product Load'),
);

export const SET_DATE_VALIDITY_CURATORSHIP = createAction(
  buildingStringActionType(typeReducer, 'Set Date Validity Curatorships'),
  props<{stringDate: string; key: string}>(),
);
export const SET_DATE_BACK_ORDER = createAction(
  buildingStringActionType(typeReducer, 'Set Date BackOrder'),
  props<{stringDate: string; key: string}>(),
);

export const FETCH_EXTERNAL_FILE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch external file load'),
  props<{node: string; file?: Archivo}>(),
);
export const SET_NEW_PRODUCT_FILE = createAction(
  buildingStringActionType(typeReducer, 'Set new product File Configuration'),
  props<{newFile: File; node: string}>(),
);

export const SET_NODE_SUPPLEMENTARY = createAction(
  buildingStringActionType(typeReducer, 'Set node suplementary'),
  props<{key: string; value: string | number}>(),
);

export const SET_SUPLEMENTARY_TO_LIST_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Add supplementary to product list'),
  props<{supplementary: ISupplements}>(),
);
export const REMOVE_SUPLEMENTARY = createAction(
  buildingStringActionType(typeReducer, 'Remove supplementary'),
  props<{index: number}>(),
);

export const SET_SAVE_PRODUCT_SUPPLEMENT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product Supplement Failed'),
);

export const SET_SAVE_PRODUCT_SUPPLEMENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Save Product Supplement Success'),
);

export const SET_DELETE_PRODUCT_SUPPLEMENT_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Delete Supplement Product Failed'),
);

export const SET_PRODUCT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Product Selected'),
  props<{productSelectedId: string}>(),
);

export const SET_DELETE_PRODUCT_SUPPLEMENT_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Delete Supplement Product Success'),
);

export const RESTORE_BACK_UP_PRODUCT = createAction(
  buildingStringActionType(typeReducer, 'Restore producto'),
);

export const SET_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set date'),
  props<{date: string; dateFormat: Date}>(),
);

export const CHANGE_NODE_DETAILS_PRODUCT_DETAILS = createAction(
  buildingStringActionType(typeApi, 'Fetch files input change node product details'),
  props<{newFile: File; node: string}>(),
);

export const SAVE_REGULATION_DATA = createAction(
  buildingStringActionType(typeApi, 'Save regulation data'),
);

export const SAVE_PRODUCT_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save product success'),
);

export const SAVE_AVAILABLE_LETTER_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save available letter success'),
  props<{file: ArchivoDetalle}>(),
);

export const SAVE_USE_LETTER_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save use letter load'),
);

export const SAVE_USE_LETTER_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save use letter success'),
  props<{file: ArchivoDetalle}>(),
);

export const SAVE_ACQUISITION_IN_PLACE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save acquisition in place load'),
);

export const SAVE_ACQUISITION_IN_PLACE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save acquisition in place success'),
  props<{file: ArchivoDetalle}>(),
);

export const SAVE_IMPORT_LICENSE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save import license load'),
);

export const SAVE_IMPORT_LICENSE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save import license success'),
  props<{file: ArchivoDetalle}>(),
);

export const SAVE_ESSENTIAL_CHEMICALS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save essential chemicals load'),
);

export const SAVE_ESSENTIAL_CHEMICALS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save essential chemicals success'),
  props<{file: ArchivoDetalle}>(),
);

export const SAVE_ZOOSANITARIE_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save zoosanitarie load'),
);

export const SAVE_ZOOSANITARIE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save zoosanitarie success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_CICLOPAFEST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save ciclopafest load'),
);

export const SAVE_CICLOPAFEST_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save ciclopafest success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_OTHER_PERMISSION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save other permission load'),
);

export const SAVE_OTHER_PERMISION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save other permisssion success'),
  props<{file: ArchivoDetalle}>(),
);
export const SAVE_TYPE_CONFIGURATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save type configuration load'),
  props<{typeName: string}>(),
);
export const SAVE_TYPE_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Save type configuration success'),
);
export const SET_NEW_PRODUCT_RATIFICATION = createAction(
  buildingStringActionType(typeApi, 'Set new product ratification'),
  props<{selectedProduct: ProductRatificationExtended; index: number}>(),
);
export const FINISH_PURCHASING_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Finish purchasing configuration success'),
);
export const FINISH_PURCHASING_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Finish purchasing configuration failed'),
);
export const CONITUE_WITH_CLOSE_INVESTIGATION = createAction(
  buildingStringActionType(typeReducer, 'Continue with close investigation'),
);
export const SET_VALIDATE_CAS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Set validate cas load'),
  props<{value: string}>(),
);
export const SET_VALIDATE_CAS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set validate cas success'),
  props<{value: boolean}>(),
);
export const SET_DOWNLOAD_FILE = createAction(
  buildingStringActionType(typeApi, 'set download file'),
);
