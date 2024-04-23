import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {
  CatRutaEntrega,
  ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj,
} from 'api-catalogos';
import {IPopUp} from '@appModels/shared-components/pqf-pop-up';
import {IFamilyLogisticConfiguration} from '@appModels/store/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.model';

const typeReducer = 'Logistic-configuration-details';
const typeApi = 'Logistic-configuration-details-API';

//DOCS: ACTIONS PARA OBTENER EL LISTADO DE FAMILIAS PARA LA CONFIGURACIÓN LOGISTICA
export const GET_INITIAL_CONFIGURATION = createAction(
  buildingStringActionType(typeReducer, 'Get Initial Configuration'),
);
export const FETCH_FAMILIES_LIST_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Families  List Load'),
);
export const FETCH_FAMILIES_LIST_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Families List Success'),
  props<{
    logisticItems: Array<IFamilyLogisticConfiguration>;
  }>(),
);

export const FETCH_FAMILIES_LIST_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Families List Failed'),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);

export const CLEAN_DATA = createAction(buildingStringActionType(typeReducer, 'Clean Data'));
export const SET_FILTER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set filter selected'),
  props<{filters: Array<FilterOptionPqf>}>(),
);

export const SET_FAMILY_ITEM_METHODS = createAction(
  buildingStringActionType(typeReducer, 'Set Family Item Methods'),
  props<{family: IFamilyLogisticConfiguration}>(),
);
export const SET_SELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set item selected'),
  props<{selectedFamily: IFamilyLogisticConfiguration}>(),
);

export const FETCH_DETAILS_SELECTED_LOGISTIC_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Details  Selected Logistic Configuration Success'),
  props<{familyDetails: Array<ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaObj>}>(),
);
export const FETCH_DETAILS_SELECTED_LOGISTIC_CONFIGURATION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch  Details Selected Logistic Configuration Failed'),
);
export const CHANGE_LOADING_API_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Change Loading API Status'),
);

export const CHANGE_SUCCESS_API_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Change Success API Status'),
);
export const FETCH_SUCCESS_WITHOUT_RESULTS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Success Without Results'),
);

//DOCS: ACTIONS DE LA CONFIGURACIÓN LOGISTICA
export const FETCH_DELIVERY_ROUTE_LOGISTIC_CONFIGURATION_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Fetch Delivery Route Logistic Configuration Success'),
  props<{deliveryRoutesList: CatRutaEntrega[]}>(),
);
export const FETCH_SAVE_DELIVERY_ROUTE = createAction(
  buildingStringActionType(typeApi, 'Fetch Save Delivery Route Load'),
  props<{finisConfiguration: boolean}>(),
);

export const FETCH_SAVE_DELIVERY_ROUTE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Save Delivery Route Success'),
  props<{family: IFamilyLogisticConfiguration}>(),
);

export const FETCH_SAVE_DELIVERY_ROUTE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Save Delivery Route Failed'),
);

export const FETCH_FINISH_CONFIGURATION_LOGISTIC = createAction(
  buildingStringActionType(typeApi, 'Fetch Finish Configuration Logistic'),
);

export const FETCH_FINISH_CONFIGURATION_LOGISTIC_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Finish Configuration Logistic Success'),
);

export const FETCH_FINISH_CONFIGURATION_LOGISTIC_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Finish Configuration Logistic Failed'),
);

export const SET_SELECTED_DELIVERY_ROUTE = createAction(
  buildingStringActionType(typeApi, 'Set Selected Delivery Route'),
  props<{deliveryRouteId: string}>(),
);

export const SET_DELIVERY_ROUTE_DELIVERY_TIME_CONFIGURATION_VALUE = createAction(
  buildingStringActionType(typeApi, 'Set Delivery Route Delivery Time Configuration Value'),
  props<{field: string; value: number}>(),
);

export const SHOW_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Show Pop Up'),
  props<{value: boolean}>(),
);

export const SET_EVENT_POP_UP = createAction(
  buildingStringActionType(typeReducer, 'Set Event Pop Up'),
  props<{popUp: IPopUp}>(),
);

export const RESTORE_BACKUP_SELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Restore Backup Selected Family'),
);

export const SET_PRESELECTED_FAMILY = createAction(
  buildingStringActionType(typeReducer, 'Set Preselected Family'),
  props<{preSelectedFamily: IFamilyLogisticConfiguration}>(),
);
