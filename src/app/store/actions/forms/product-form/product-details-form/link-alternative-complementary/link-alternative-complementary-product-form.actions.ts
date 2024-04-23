import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {SugerenciaBusqueda, VProducto, VProductoAlternativo} from 'api-catalogos';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {typeActionSearchOption} from '@appHelpers/catalogs/providers/campaign.helpers';
import {buildingStringActionType} from '@appUtil/strings';
import {
  IVProducto,
  IVProductoAlternativo,
  IVProductoComplementario,
} from '@appModels/store/forms/product-form/products-details-form/product-details.model';

const typeReduce = 'link-products-reduce';
const typeApi = 'link-products-api';
export const CLEAN_PRODUCTS_LINKED = createAction(
  buildingStringActionType(typeReduce, 'Clean products linked'),
);
export const SET_SELECTED_TAB_OPTION = createAction(
  buildingStringActionType(typeReduce, 'Set Tab Ootion Selected'),
  props<{tabOptionSelected: ITabOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReduce, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_SEARCH_TYPE = createAction(
  buildingStringActionType(typeReduce, 'Set search type'),
  props<{searchType: DropListOption}>(),
);
export const SET_SELECTED_SEARCH_TYPE = createAction(
  buildingStringActionType(typeReduce, 'Set Search Type'),
  props<{searchTypeSelected: DropListOption}>(),
);
export const FETCH_PRODUCTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch products load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_PRODUCTS_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Fetch products success'),
  props<{list: Array<IVProducto>; totalResults: number}>(),
);
export const FETCH_OPTIONS_OF_PRODUCTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch options of products load'),
);
export const FETCH_OPTIONS_OF_PRODUCTS_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Fetch options of products success'),
  props<{products: Array<SugerenciaBusqueda>}>(),
);
export const CLEAN_SEARCH_FILTER = createAction(
  buildingStringActionType(typeReduce, 'Clean search filter'),
);
export const SET_SELECTED_SEARCH_OPTION = createAction(
  buildingStringActionType(typeReduce, typeActionSearchOption),
  props<{option: DropListOption}>(),
);
export const SAVE_PRODUCT_RELATED_LOAD = createAction(
  buildingStringActionType(typeApi, 'Save product related load'),
  props<{product: VProducto}>(),
);
export const SAVE_PRODUCT_ALTERNATIVE_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save product alternative success'),
  props<{product: VProductoAlternativo; IdProducto: string}>(),
);
export const SAVE_PRODUCT_COMPLEMENTARY_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Save product complementary success'),
  props<{product: VProductoAlternativo; IdProducto: string}>(),
);
export const DISABLE_PRODUCT_RELATED_LOAD = createAction(
  buildingStringActionType(typeReduce, 'Disable product related load'),
  props<{product: any}>(),
);
export const DISABLE_ALTERNATIVE_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Disable alternative success'),
  props<{response: string; IdProducto: string}>(),
);
export const DISABLE_COMPLEMENTARY_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Disable coplementary success'),
  props<{response: string; IdProducto: string}>(),
);
export const FETCH_ALTERNATIVE_PRODUCTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch products alternative load'),
);
export const FETCH_ALTERNATIVE_PRODUCTS_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Fetch alternative products success'),
  props<{alternatives: Array<IVProductoAlternativo>}>(),
);
export const FETCH_COMPLEMENTARIES_PRODUCTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch complementaries products load'),
);
export const FETCH_COMPLEMENTARIES_PRODUCTS_SUCCESS = createAction(
  buildingStringActionType(typeReduce, 'Fetch complementaries products success'),
  props<{complementaries: Array<IVProductoComplementario>}>(),
);

export const FETCH_MORE_COMPONENT_EFFECT = createAction(
  buildingStringActionType(typeReduce, 'Fetch more component effect'),
  props<{event: IPageInfo}>(),
);
