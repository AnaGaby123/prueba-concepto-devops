import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProvidersUpload} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list.models';
import {CargarFacturaDonaTotales} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Upload-Invoice-List';
export const SET_SORT_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Sort Selected'),
  props<{sort: DropListOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_PROVIDER_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Provider Load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_PROVIDER_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Provider Success'),
  props<{data: IProvidersUpload}>(),
);
export const FETCH_DONUT_CHART_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch doNUT Chart Load'),
);
export const FETCH_DONUT_CHART_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch doNUT Chart Success'),
  props<{data: CargarFacturaDonaTotales}>(),
);
export const SET_STATUS_API = createAction(
  buildingStringActionType(typeReducer, 'Set Status Api'),
  props<{status: number}>(),
);
