import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IControlMaterialDeliveryList,
  initialIControlMaterialDeliveryList,
} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery-list/control-material-delivery-list.models';
/*Actions Import*/
import {controlMaterialDeliveryListActions} from '@appActions/pendings/imports-phs/control-material-delivery';

export const controlMaterialDeliveryListReducer: ActionReducer<IControlMaterialDeliveryList> = createReducer(
  {...initialIControlMaterialDeliveryList()},
  on(controlMaterialDeliveryListActions.SET_FILTER_ORDER, (state, {filter}) => ({
    ...state,
    filterByType: filter,
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(controlMaterialDeliveryListActions.FETCH_CUSTOMS_AGENTS_LOAD, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
  })),
  on(controlMaterialDeliveryListActions.FETCH_CUSTOMS_AGENTS_SUCCESS, (state, {data}) => ({
    ...state,
    customsAgents: data,
  })),
  on(controlMaterialDeliveryListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    queryInfo: {...state.queryInfo, searchTerm, desiredPage: 1},
  })),
  on(controlMaterialDeliveryListActions.FETCH_TOTALS_AGENT_SUCCESS, (state, {totals}) => ({
    ...state,
    totals,
  })),
  on(controlMaterialDeliveryListActions.SET_API_STATUS, (state, {status}) => ({
    ...state,
    queryInfo: {...state.queryInfo, requestStatus: status},
  })),
  on(controlMaterialDeliveryListActions.FETCH_DONUT_AGENT_SUCCESS, (state, {list}) => ({
    ...state,
    listAgent: list,
  })),
);
