/* Core Imports */
import {createAction, props} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IProvidersDispatchMonitoring} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list.models';
import {
  IGuidesDispatchMonitoring,
  IItem,
} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-details/dispatch-monitoring-details.models';
import {IUploadFileCustom} from '@appModels/files/files.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Dispatch-Monitoring-Details';
const typeApi = 'Dispatch-Monitoring-DetailsApi';

export const CLEAN_ALL_DETAILS_STATE = createAction(
  buildingStringActionType(typeReducer, 'Clean all details state'),
);
export const SET_PROVIDER_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Provider'),
  props<{providerSelected: IProvidersDispatchMonitoring}>(),
);
export const SET_TAB_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Tab Selected'),
  props<{tab: ITabOption}>(),
);
export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const FETCH_GUIDES_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch Guides Load'),
);
export const FETCH_GUIDES_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Guides Success'),
  props<{guides: Array<IGuidesDispatchMonitoring>}>(),
);
export const FETCH_GUIDES_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Guides Failed'),
);
export const SET_GUIDE_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set Guide Selected'),
  props<{index: string}>(),
);
export const SET_GUIDES_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Guides Status'),
  props<{guidesStatus: number}>(),
);
export const SET_ITEMS_STATUS = createAction(
  buildingStringActionType(typeReducer, 'Set Items Status'),
  props<{itemsStatus: number}>(),
);
export const FETCH_ITEMS_LOAD = createAction(buildingStringActionType(typeApi, 'Fetch Items Load'));
export const FETCH_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Success'),
  props<{items: Array<IItem>}>(),
);
export const FETCH_ITEMS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch Items Failed'),
);
export const CHECK_CANCEL_ITEMS = createAction(
  buildingStringActionType(typeReducer, 'Check All Cancel Items'),
  props<{active: boolean}>(),
);
export const CHECK_IMPACT_ITEMS = createAction(
  buildingStringActionType(typeReducer, 'Check All Impact Items'),
  props<{active: boolean}>(),
);
export const CHECK_CONFIRM_ITEMS = createAction(
  buildingStringActionType(typeReducer, 'Check All Confirm Items'),
  props<{active: boolean}>(),
);
export const CONFIRM_ITEMS_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Confirm Item Success'),
);
export const REFRESH_GUIDES = createAction(buildingStringActionType(typeReducer, 'Refresh Guides'));
export const REFRESH_SELECTED_GUIDE = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Guide'),
);
export const REFRESH_SELECTED_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Refresh Selected Provider'),
);
export const SET_CANCEL_GUIDE_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Set Cancel Guide Success'),
);
export const SET_CANCEL_GUIDE_FAILED = createAction(
  buildingStringActionType(typeApi, 'Set Cancel Guide Failed'),
);
export const SAVE_FILE_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Save File Load'),
  props<{file: IUploadFileCustom}>(),
);
export const ACCEPT_CANCEL_GUIDE = createAction(
  buildingStringActionType(typeReducer, 'Accept Cancel Guide'),
  props<{value: string}>(),
);
export const ACCEPT_IMPORT_FEE_GUIDE = createAction(
  buildingStringActionType(typeReducer, 'Accept Import Fee Guide'),
  props<{FEA: string; justificacion: string}>(),
);
export const SET_SELECTED_GUIDE_CANCEL_CONFIGURATION = createAction(
  buildingStringActionType(typeApi, 'Set Selected Guide Cancel Configuration'),
);
export const SET_SELECTED_GUIDE_IMPACT_FEE_CONFIGURATION = createAction(
  buildingStringActionType(typeApi, 'Set Selected Guide Impact Fee Configuration'),
);
export const SET_FEE_FILE = createAction(
  buildingStringActionType(typeReducer, 'Set Guide Selected File'),
  props<{file: File}>(),
);
export const SET_CONFIRM_GUIDE = createAction(
  buildingStringActionType(typeApi, 'Set Confirm Guide'),
);
export const SET_CONFIRM_GUIDE_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Confirm Guide Success'),
);
export const SET_CONFIRM_GUIDE_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Confirm Guide Failed'),
);
export const SET_IMPACT_FEE_CONFIG_SUCCESS = createAction(
  buildingStringActionType(typeReducer, 'Set Impact Guide Success'),
);
export const SET_IMPACT_FEE_CONFIG_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Set Impact Guide Failed'),
);
export const SET_SELECTED_CONTACT_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Provider Contact'),
  props<{contactSelected: DropListOption}>(),
);

export const LOAD_CONTACTS_PROVIDER = createAction(
  buildingStringActionType(typeReducer, 'Load Provider Contacts'),
);

export const SET_PROVIDER_CONTACT = createAction(
  buildingStringActionType(typeReducer, 'Set Provider Contacts'),
  props<{contacts: Array<ContactoDetalleProvObj>}>(),
);
