/* Store Imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

/* Reducers Imports */
import {registerDispatchListReducer} from '@appReducers/pendings/imports/register-dispatch/register-dispatch-list/register-dispatch-list.reducer';

/* Models Imports */
import {
  initialIRegisterDispatchState,
  IRegisterDispatchState,
  TITLE_REGISTER_DISPATCH,
} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch.models';
import {registerDispatchActions} from '@appActions/pendings/imports/register-dispatch';
import {registerDispatchDetailsReducer} from '@appReducers/pendings/imports/register-dispatch/register-dispatch-details/register-dispatch-details.reducer';

/* Actions Imports */

export const registerDispatchReducer: ActionReducer<IRegisterDispatchState> = combineReducers({
  title: createReducer(TITLE_REGISTER_DISPATCH),
  detailsMode: createReducer(
    initialIRegisterDispatchState().detailsMode,
    on(
      registerDispatchActions.SET_IS_IN_DETAILS_VIEW,
      (state, {isInDetailsView}) => isInDetailsView,
    ),
  ),
  allowedToDetails: createReducer(
    initialIRegisterDispatchState().allowedToDetails,
    on(
      registerDispatchActions.SET_ALLOWED_TO_DETAILS_VALUE,
      (state, {allowedToDetails}) => allowedToDetails,
    ),
  ),
  registerDispatchList: registerDispatchListReducer,
  registerDispatchDetails: registerDispatchDetailsReducer,
});
