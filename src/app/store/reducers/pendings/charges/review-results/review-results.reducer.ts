import {ActionReducer, combineReducers, createReducer} from '@ngrx/store';
import {
  IReviewResults,
  TITLE_REVIEW_RESULTS,
} from '@appModels/store/pendings/charges/review-results/review-results.models';
import {reviewResultsListReducer} from '@appReducers/pendings/charges/review-results/review-results-list/review-results-list.reducer';

export const reviewResultsReducer: ActionReducer<IReviewResults> = combineReducers({
  title: createReducer(TITLE_REVIEW_RESULTS),
  detailsMode: createReducer(false),
  reviewResultsList: reviewResultsListReducer,
});
