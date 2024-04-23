import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProviders} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-list/manage-back-order-list.models';
import {
  DatosGraficaOrdenDeCompraProveedorObj,
  DatosGraficaOrdenDeCompraTipoEntregaObj,
} from 'api-logistica';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Manage-Back-Order-List';
export const SET_SORT_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Sort Option'),
  props<{sort: DropListOption}>(),
);
export const SET_TERM_SEARCH = createAction(
  buildingStringActionType(typeReducer, 'Set Term Search'),
  props<{searchTerm: string}>(),
);
export const FETCH_PROVIDERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Providers Load'),
  props<{isFirstPage: boolean}>(),
);
export const FETCH_PROVIDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Providers Success'),
  props<{data: IProviders}>(),
);
export const SET_STATUS_API = createAction(
  buildingStringActionType(typeReducer, 'Set Status Api'),
  props<{status: number}>(),
);
export const FETCH_DONUT_PROVIDERS_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Provider Load'),
);
export const FETCH_DONUT_PROVIDERS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Provider Success'),
  props<{data: DatosGraficaOrdenDeCompraProveedorObj}>(),
);
export const FETCH_DONUT_MONITORING_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Monitoring Load'),
);
export const FETCH_DONUT_MONITORING_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Donut Monitoring Success'),
  props<{data: DatosGraficaOrdenDeCompraTipoEntregaObj}>(),
);
export const SET_TYPE_SEARCH = createAction(
  buildingStringActionType(typeReducer, 'Set Type of Search'),
  props<{typeOfSearch: DropListOption}>(),
);
