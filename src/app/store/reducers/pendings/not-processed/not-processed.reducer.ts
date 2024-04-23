import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

// Models
import {
  initialNotProcessedState,
  NotProcessedState,
} from '@appModels/store/pendings/not-processed/not-processed.models';

// Actions
import {notProcessedActions, notProcessedDetailActions} from '@appActions/pendings/not-processed';

// Reducers
import {notProcessedDashboardReducer} from '@appReducers/pendings/not-processed/not-processed-dashboard/not-processed-dashboard.reducer';
import {notProcessedDetailsReducer} from '@appReducers/pendings/not-processed/not-processed-details/not-processed-details.reducer';

export const notProcessedReducer: ActionReducer<NotProcessedState> = combineReducers(
  {
    notProcessedDetails: notProcessedDetailsReducer,
    notProcessedDashboard: notProcessedDashboardReducer,
    title: createReducer(initialNotProcessedState().title),
    allowedToDetails: createReducer(
      initialNotProcessedState().allowedToDetails,
      on(
        notProcessedActions.SET_ALLOWED_TO_DETAILS_VALUE,
        (state, {allowedToDetails}) => allowedToDetails,
      ),
      on(notProcessedDetailActions.CLEAN_ALL_NOT_PROCESSED_DETAIL, () => false),
    ),
    isInDetailsView: createReducer(
      initialNotProcessedState().isInDetailsView,
      on(notProcessedActions.SET_IS_IN_DETAILS_VIEW, (state, {isInDetailsView}) => isInDetailsView),
      on(notProcessedDetailActions.CLEAN_ALL_NOT_PROCESSED_DETAIL, () => false),
    ),
  },
  {...initialNotProcessedState()},
);
