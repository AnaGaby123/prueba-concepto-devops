/* Store Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialIPlanDispatchDetails,
  initialIPlanDispatchSteps,
  IPlanDispatchDetails,
  IQueryResultVPDImpListaArriboPartidaDetalle,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-details/plan-dispatch-details.models';
import {planDispatchDetailsActions} from '@appActions/pendings/imports/plan-dispatch';

/* Utils Imports */
import {find, map} from 'lodash-es';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {
  IPlanDispatchArrivalList,
  IProvider,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.models';

const initialPlanDispatchDetails: IPlanDispatchDetails = {
  ...initialIPlanDispatchDetails(),
};

export const planDispatchDetailsReducer: ActionReducer<IPlanDispatchDetails> = createReducer(
  initialPlanDispatchDetails,
  on(
    planDispatchDetailsActions.CLEAN_ALL_DETAILS_STATE,
    (): IPlanDispatchDetails => ({
      ...initialIPlanDispatchDetails(),
    }),
  ),
  on(
    planDispatchDetailsActions.CLEAN_ALL_DETAILS_STEPS_STATE,
    (state: IPlanDispatchDetails): IPlanDispatchDetails => ({
      ...state,
      stepsState: {...initialIPlanDispatchSteps()},
      selectedStep: 0,
    }),
  ),
  on(
    planDispatchDetailsActions.SET_STEP_SELECTED,
    (state: IPlanDispatchDetails, {selectedStep}): IPlanDispatchDetails => ({
      ...state,
      selectedStep,
    }),
  ),
  on(
    planDispatchDetailsActions.SET_SELECTED_PROVIDER,
    (state: IPlanDispatchDetails, {selectedProvider}): IPlanDispatchDetails => ({
      ...state,
      selectedProvider,
      dispatchOrdersStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    planDispatchDetailsActions.SET_SELECTED_DISPATCH_ORDER,
    (state: IPlanDispatchDetails, {selectedDispatchOrder}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        selectedDispatchOrder,
      },
    }),
  ),
  on(
    planDispatchDetailsActions.FETCH_DISPATCH_ORDERS_SUCCESS,
    (state: IPlanDispatchDetails, {dispatchOrdersList}): IPlanDispatchDetails => ({
      ...state,
      dispatchOrdersList,
      dispatchOrdersStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    planDispatchDetailsActions.FETCH_DISPATCH_ORDERS_FAILED,
    (state: IPlanDispatchDetails): IPlanDispatchDetails => ({
      ...state,
      dispatchOrdersStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(
    planDispatchDetailsActions.SET_RADIO_BUTTON_ID,
    (state: IPlanDispatchDetails, {node, radioButtonId}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        selectedDispatchOrder: {
          ...state.stepsState.selectedDispatchOrder,
          PackingListSimplificado:
            node === 'PackingListSimplificado' ||
            node === 'PackingListDetallado' ||
            node === 'PackingListAmbos'
              ? false
              : state.stepsState.selectedDispatchOrder.PackingListSimplificado,
          PackingListDetallado:
            node === 'PackingListSimplificado' ||
            node === 'PackingListDetallado' ||
            node === 'PackingListAmbos'
              ? false
              : state.stepsState.selectedDispatchOrder.PackingListDetallado,
          PackingListAmbos:
            node === 'PackingListSimplificado' ||
            node === 'PackingListDetallado' ||
            node === 'PackingListAmbos'
              ? false
              : state.stepsState.selectedDispatchOrder.PackingListAmbos,
          IdAduana:
            node === 'IdAgenteAduanal' ? null : state.stepsState.selectedDispatchOrder.IdAduana,
          [node]: radioButtonId,
        },
      },
    }),
  ),
  on(
    planDispatchDetailsActions.SAVE_DISPATCH_ORDER_SUCCESS,
    (state: IPlanDispatchDetails, {dispatchOrderId}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        selectedDispatchOrder: {
          ...state.stepsState.selectedDispatchOrder,
          IdImpOrdenDespacho: dispatchOrderId,
        },
      },
    }),
  ),
  on(
    planDispatchDetailsActions.REFRESH_SELECTED_DISPATCH_ORDER_SUCCESS,
    (state: IPlanDispatchDetails, {selectedDispatchOrder}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        selectedDispatchOrder: {
          ...state.stepsState.selectedDispatchOrder,
          ...selectedDispatchOrder,
        },
      },
    }),
  ),
  on(
    planDispatchDetailsActions.SET_STEP_1_PROVIDERS_STATUS,
    (state: IPlanDispatchDetails, {providersStatus}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        providersStatus,
      },
    }),
  ),
  on(
    planDispatchDetailsActions.FETCH_STEP_1_PROVIDERS_LOAD,
    (state: IPlanDispatchDetails): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        providersStatus: API_REQUEST_STATUS_LOADING,
      },
    }),
  ),
  on(
    planDispatchDetailsActions.FETCH_STEP_1_PROVIDERS_FAILED,
    (state: IPlanDispatchDetails): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        providersStatus: API_REQUEST_STATUS_SUCCEEDED,
      },
    }),
  ),
  on(
    planDispatchDetailsActions.FETCH_STEP_1_PROVIDERS_SUCCESS,
    (state: IPlanDispatchDetails, {providersList}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        providersList,
        providersStatus: API_REQUEST_STATUS_SUCCEEDED,
      },
    }),
  ),
  on(
    planDispatchDetailsActions.SET_PROVIDERS_SEARCH_TERM,
    (state: IPlanDispatchDetails, {providersSearchTerm}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        providersSearchTerm,
        needsToReloadProviders: true,
      },
    }),
  ),
  on(
    planDispatchDetailsActions.REFRESH_ALL_STEP_1_PROVIDERS_LOAD,
    (state: IPlanDispatchDetails): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        providersStatus: API_REQUEST_STATUS_LOADING,
        needsToReloadProviders: true,
      },
    }),
  ),
  on(
    planDispatchDetailsActions.INITIAL_PROVIDER_STEP_1,
    (state: IPlanDispatchDetails, {selectedProvider}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        selectedProvider,
        needsToReloadProviders: false,
      },
    }),
  ),
  on(
    planDispatchDetailsActions.FETCH_STEP_1_ARRIVAL_LIST_IN_OD_LOAD,
    (state: IPlanDispatchDetails): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        arrivalListGroupStatus: API_REQUEST_STATUS_LOADING,
      },
    }),
  ),
  on(
    planDispatchDetailsActions.ADD_TO_DISPATCH_ORDER_SUCCESS,
    (state: IPlanDispatchDetails): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        arrivalListGroupStatus: API_REQUEST_STATUS_LOADING,
        selectedProvider: {
          ...state.stepsState.selectedProvider,
          needsToReloadArrivalList: true,
        },
      },
    }),
  ),
  on(
    planDispatchDetailsActions.REFRESH_STEP_1_SELECTED_PROVIDER_SUCCESS,
    (state: IPlanDispatchDetails, {selectedProvider}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        selectedProvider: {
          ...state.stepsState.selectedProvider,
          MontoTotal: selectedProvider.MontoTotal,
          TotalPiezas: selectedProvider.TotalPiezas,
          TotalListaArribo: selectedProvider.TotalListaArribo,
        },
        providersList: map(state.stepsState.providersList, (o: IProvider) => {
          if (o.IdProveedor === selectedProvider.IdProveedor) {
            return {
              ...o,
              MontoTotal: selectedProvider.MontoTotal,
              TotalPiezas: selectedProvider.TotalPiezas,
              TotalListaArribo: selectedProvider.TotalListaArribo,
            };
          }
          return {...o};
        }),
      },
    }),
  ),
  on(
    planDispatchDetailsActions.FETCH_STEP_1_PROVIDERS_FAILED,
    (state: IPlanDispatchDetails): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        arrivalListGroupStatus: API_REQUEST_STATUS_FAILED,
      },
    }),
  ),
  on(
    planDispatchDetailsActions.FETCH_STEP_1_ARRIVAL_LIST_IN_OD_SUCCESS,
    (state: IPlanDispatchDetails, {arrivalListGroup}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        arrivalListGroup,
        arrivalListGroupStatus: API_REQUEST_STATUS_SUCCEEDED,
      },
    }),
  ),
  on(
    planDispatchDetailsActions.FETCH_STEP_1_ARRIVAL_LIST_SUCCESS,
    (state: IPlanDispatchDetails, {arrivalList}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        selectedProvider: {
          ...state.stepsState.selectedProvider,
          arrivalList,
          arrivalListStatus: API_REQUEST_STATUS_SUCCEEDED,
          needsToReloadArrivalList: false,
        },
      },
    }),
  ),
  on(
    planDispatchDetailsActions.FETCH_STEP_1_ARRIVAL_LIST_FAILED,
    (state: IPlanDispatchDetails): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        selectedProvider: {
          ...state.stepsState.selectedProvider,
          arrivalListStatus: API_REQUEST_STATUS_FAILED,
        },
      },
    }),
  ),
  on(
    planDispatchDetailsActions.SET_STEP_1_ARRIVAL_LIST_STATUS,
    (state: IPlanDispatchDetails, {arrivalListStatus}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        selectedProvider: {
          ...state.stepsState.selectedProvider,
          arrivalListStatus,
        },
      },
    }),
  ),
  on(
    planDispatchDetailsActions.SET_SELECTED_STEP_1_PROVIDER,
    (state: IPlanDispatchDetails, {providerId}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        selectedProvider: find(
          state.stepsState.providersList,
          (o: IProvider) => o.IdProveedor === providerId,
        ),
        providersList: map(state.stepsState.providersList, (o: IProvider) => {
          if (o.IdProveedor === state.stepsState.selectedProvider.IdProveedor) {
            // Es igual al proveedor actualmente seleccionado
            return {
              ...state.stepsState.selectedProvider,
              IsSelected: o.IdProveedor === providerId,
            };
          } else if (o.IdProveedor === providerId) {
            // Es igual al nuevo proveedor seleccionado
            return {...o, IsSelected: true};
          }
          // Es diferente al actual y al nuevo proveedor seleccionado
          return {...o, IsSelected: false};
        }),
      },
    }),
  ),
  on(
    planDispatchDetailsActions.SET_ARRIVAL_LIST_IS_OPEN,
    (state: IPlanDispatchDetails, {arrivalListId}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        selectedProvider: {
          ...state.stepsState.selectedProvider,
          arrivalList: map(
            state.stepsState.selectedProvider.arrivalList,
            (o: IPlanDispatchArrivalList) => {
              if (o.IdImpListaArribo === arrivalListId) {
                return {...o, IsOpen: !o.IsOpen};
              }
              return {...o, IsOpen: false};
            },
          ),
        },
      },
    }),
  ),
  on(
    planDispatchDetailsActions.SET_PROVIDER_DISPATCH_ORDER_IS_OPEN,
    (state: IPlanDispatchDetails, {providerName}): IPlanDispatchDetails => ({
      ...state,
      stepsState: {
        ...state.stepsState,
        arrivalListGroup: {
          ...state.stepsState.arrivalListGroup,
          Groups: map(
            state.stepsState.arrivalListGroup.Groups,
            (o: IQueryResultVPDImpListaArriboPartidaDetalle) => ({
              ...o,
              IsOpen: o.NombreProveedor === providerName && o.IsOpen === false,
            }),
          ),
        },
      },
    }),
  ),
);
