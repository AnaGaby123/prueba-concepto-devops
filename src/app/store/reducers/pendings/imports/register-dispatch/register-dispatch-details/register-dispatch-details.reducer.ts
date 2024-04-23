import {ActionReducer, createReducer, on} from '@ngrx/store';
import {registerDispatchDetailsActions} from '@appActions/pendings/imports/register-dispatch';
import {
  IDispatchOrder,
  initialIRegisterDispatchDetails,
  IRegisterDispatchDetails,
} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-details/register-dispatch-details.models';
import {filter, map} from 'lodash-es';

export const registerDispatchDetailsReducer: ActionReducer<IRegisterDispatchDetails> = createReducer(
  null,
  on(
    registerDispatchDetailsActions.SET_SELECTED_AGENT,
    (state: IRegisterDispatchDetails, {selectedCustomBroker}): IRegisterDispatchDetails => ({
      ...state,
      selectedCustomBroker,
    }),
  ),
  on(
    registerDispatchDetailsActions.SET_ACTUAL_STEP,
    (state: IRegisterDispatchDetails, {actualStep}): IRegisterDispatchDetails => ({
      ...state,
      actualStep,
    }),
  ),
  on(
    registerDispatchDetailsActions.CLEAN_ALL_DETAILS_STATE,
    (): IRegisterDispatchDetails => initialIRegisterDispatchDetails(),
  ),
  on(
    registerDispatchDetailsActions.SET_SEARCH_TERM,
    (state: IRegisterDispatchDetails, {searchTerm}): IRegisterDispatchDetails => ({
      ...state,
      searchTerm,
      needsToReloadOrders: true,
    }),
  ),
  on(
    registerDispatchDetailsActions.SET_ORDERS_STATUS,
    (state: IRegisterDispatchDetails, {dispatchOrdersStatus}): IRegisterDispatchDetails => ({
      ...state,
      dispatchOrdersStatus,
    }),
  ),
  on(
    registerDispatchDetailsActions.SET_ITEMS_STATUS,
    (state: IRegisterDispatchDetails, {itemsStatus}): IRegisterDispatchDetails => ({
      ...state,
      itemsStatus,
    }),
  ),
  on(
    registerDispatchDetailsActions.INITIAL_PURCHASE_ORDER,
    (state: IRegisterDispatchDetails, {dispatchOrder}): IRegisterDispatchDetails => ({
      ...state,
      selectedDispatchOrder: dispatchOrder,
      needsToReloadOrders: false,
    }),
  ),
  on(
    registerDispatchDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS,
    (state: IRegisterDispatchDetails, {dispatchOrders}): IRegisterDispatchDetails => ({
      ...state,
      dispatchOrders,
    }),
  ),
  on(
    registerDispatchDetailsActions.FETCH_ITEMS_SUCCESS,
    (state: IRegisterDispatchDetails, {list}): IRegisterDispatchDetails => ({
      ...state,
      selectedDispatchOrder: {
        ...state.selectedDispatchOrder,
        items: list,
        needsToReloadItems: false,
      },
    }),
  ),
  on(
    registerDispatchDetailsActions.FETCH_USERS_BUYERS_SUCCESS,
    (state: IRegisterDispatchDetails, {usersList}): IRegisterDispatchDetails => ({
      ...state,
      usersList,
    }),
  ),
  on(
    registerDispatchDetailsActions.SET_SELECTED_ORDER,
    (state: IRegisterDispatchDetails, {dispatchOrderId}): IRegisterDispatchDetails => ({
      ...state,
      dispatchOrders: map(state.dispatchOrders, (o: IDispatchOrder) => {
        if (o.IdImpOrdenDespacho === state.selectedDispatchOrder.IdImpOrdenDespacho) {
          return {
            ...state.selectedDispatchOrder,
            isSelected: o.IdImpOrdenDespacho === dispatchOrderId,
          };
        } else if (o.IdImpOrdenDespacho === dispatchOrderId) {
          return {...o, isSelected: true};
        }
        return {...o, isSelected: false};
      }),
      selectedDispatchOrder: filter(
        state.dispatchOrders,
        (o: IDispatchOrder) => o.IdImpOrdenDespacho === dispatchOrderId,
      )[0],
      actualStep: 1,
    }),
  ),
  on(
    registerDispatchDetailsActions.SET_DISPATCH_ORDER_FIELD_VALUE,
    (state: IRegisterDispatchDetails, {node, value}): IRegisterDispatchDetails => ({
      ...state,
      selectedDispatchOrder: {
        ...state.selectedDispatchOrder,
        [node]: node === 'TipoDeCambio' ? Number(value) : value,
        IdUsuarioComprador:
          node === 'selectedBuyerUser'
            ? value.value.toString()
            : state.selectedDispatchOrder.IdUsuarioComprador,
      },
    }),
  ),
  on(
    registerDispatchDetailsActions.SET_PETITION_FILE,
    (state: IRegisterDispatchDetails, {file}): IRegisterDispatchDetails => ({
      ...state,
      selectedDispatchOrder: {
        ...state.selectedDispatchOrder,
        petitionFile: file,
      },
    }),
  ),
  on(
    registerDispatchDetailsActions.SET_EVIDENCE_FILES,
    (state: IRegisterDispatchDetails, {files}): IRegisterDispatchDetails => ({
      ...state,
      selectedDispatchOrder: {
        ...state.selectedDispatchOrder,
        evidenceFiles: files,
      },
    }),
  ),
  on(
    registerDispatchDetailsActions.FINALIZE_OD_SUCCESS,
    (state: IRegisterDispatchDetails): IRegisterDispatchDetails => ({
      ...state,
      needsToReloadOrders: true,
      actualStep: 1,
    }),
  ),
);
