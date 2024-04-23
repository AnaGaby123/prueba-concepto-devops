/* Store Imports */
import {ActionReducer, combineReducers} from '@ngrx/store';

/* Models Import */
import {IChargesState} from '@appModels/store/pendings/charges/charges.models';

/* Reducers Imports */
import {attendReviewReducer} from '@appReducers/pendings/charges/attend-review/attend-review.reducer';
import {reviewResultsReducer} from '@appReducers/pendings/charges/review-results/review-results.reducer';

import {executeCollectionReducer} from '@appReducers/pendings/charges/execute-collection/execute-collection.reducer';

import {collectionMonitoringReducer} from '@appReducers/pendings/charges/collection-monitoring/collection-monitoring.reducer';

export const chargesReducer: ActionReducer<IChargesState> = combineReducers({
  attendReview: attendReviewReducer,
  reviewResults: reviewResultsReducer,
  executeCollection: executeCollectionReducer,
  collectionMonitoring: collectionMonitoringReducer,
});
