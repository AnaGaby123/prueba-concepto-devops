import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  initialPreProcessingState,
  IPreProcessingState,
  TITLE_PRE_PROCESSING,
} from '@appModels/store/pre-processing/pre-processing.models';
import {preprocessOrderDashboard} from '@appReducers/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.reducer';
/// Actions
import * as actions from '@appActions/pre-processing';
import {preProcessOrderDetailReducer} from '@appReducers/pre-processing/preprocess-order-details/preprocess-order-details.reducer';

export const preProcessingReducer: ActionReducer<IPreProcessingState> = combineReducers(
  {
    preprocessOrderDashboard: preprocessOrderDashboard,
    title: createReducer(
      TITLE_PRE_PROCESSING,
      on(actions.preProcessingActions.SET_TITLLE, (state, {title}) => title),
      on(actions.preProcessingActions.SET_INITIAL_STATE, () => initialPreProcessingState().title),
    ),
    detailsMode: createReducer(
      initialPreProcessingState().detailsMode,
      on(actions.preProcessingActions.SET_DETAILS_MODE, (state, {detailsMode}) => detailsMode),
      on(
        actions.preProcessingActions.SET_INITIAL_STATE,
        () => initialPreProcessingState().detailsMode,
      ),
    ),
    preProcessDetailsComponent: createReducer(
      initialPreProcessingState().preProcessDetailsComponent,
      on(
        actions.preProcessingActions.SET_DETAILS_COMPONENT,
        (state, {detailsComponent}) => detailsComponent,
      ),
      on(
        actions.preProcessingActions.SET_INITIAL_STATE,
        () => initialPreProcessingState().preProcessDetailsComponent,
      ),
    ),
    preProcessOrderDetails: preProcessOrderDetailReducer,
  },
  {...initialPreProcessingState()},
);
