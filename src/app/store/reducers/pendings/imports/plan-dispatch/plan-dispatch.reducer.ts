/* Store Imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

/* Reducers Imports */
import {planDispatchListReducer} from '@appReducers/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.reducer';
import {planDispatchDetailsReducer} from '@appReducers/pendings/imports/plan-dispatch/plan-dispatch-details/plan-dispatch-details.reducer';

/* Models Imports */
import {
  initialIPlanDispatchState,
  IPlanDispatchState,
  TITLE_PLAN_DISPATCH,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch.models';

/* Actions Imports */
import {planDispatchActions} from '@appActions/pendings/imports/plan-dispatch';

export const planDispatchReducer: ActionReducer<IPlanDispatchState> = combineReducers({
  title: createReducer(TITLE_PLAN_DISPATCH),
  detailsMode: createReducer(
    initialIPlanDispatchState().detailsMode,
    on(planDispatchActions.SET_IS_IN_DETAILS_VIEW, (state, {isInDetailsView}) => isInDetailsView),
  ),
  allowedToDetails: createReducer(
    initialIPlanDispatchState().allowedToDetails,
    on(
      planDispatchActions.SET_ALLOWED_TO_DETAILS_VALUE,
      (state, {allowedToDetails}) => allowedToDetails,
    ),
  ),
  stepsMode: createReducer(
    initialIPlanDispatchState().stepsMode,
    on(planDispatchActions.SET_IS_IN_STEPS_VIEW, (state, {isInSteps}) => isInSteps),
  ),
  allowedToSteps: createReducer(
    initialIPlanDispatchState().allowedToSteps,
    on(planDispatchActions.SET_ALLOWED_TO_STEPS_VALUE, (state, {allowedToSteps}) => allowedToSteps),
  ),
  planDispatchList: planDispatchListReducer,
  planDispatchDetails: planDispatchDetailsReducer,
});
