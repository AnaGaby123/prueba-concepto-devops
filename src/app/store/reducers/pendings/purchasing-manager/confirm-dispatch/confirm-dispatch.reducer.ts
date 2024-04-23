/* Core Imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  IConfirmDispatch,
  initialIConfirmDispatch,
  TITLE_CONFIRM_DISPATCH,
} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch.models';

/* Reducers Imports */
import {confirmDispatchListReducer} from '@appReducers/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-list/confirm-dispatch-list.reducer';
import {confirmDispatchDetailsReducer} from '@appReducers/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-details/confirm-dispatch-details.reducer';

/* Actions Imports */
import {confirmDispatchActions} from '@appActions/pendings/purchasing-manager/confirm-dispatch';

export const confirmDispatchReducer: ActionReducer<IConfirmDispatch> = combineReducers(
  {
    title: createReducer(TITLE_CONFIRM_DISPATCH),
    confirmDispatchList: confirmDispatchListReducer,
    confirmDispatchDetails: confirmDispatchDetailsReducer,
    allowedToDetails: createReducer(
      initialIConfirmDispatch().allowedToDetails,
      on(
        confirmDispatchActions.SET_ALLOWED_TO_DETAILS_VALUE,
        (state, {allowedToDetails}) => allowedToDetails,
      ),
    ),
    isInDetailsView: createReducer(
      initialIConfirmDispatch().isInDetailsView,
      on(
        confirmDispatchActions.SET_IS_IN_DETAILS_VIEW,
        (state, {isInDetailsView}) => isInDetailsView,
      ),
    ),
  },
  {...initialIConfirmDispatch()},
);
