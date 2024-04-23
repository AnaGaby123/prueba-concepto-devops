import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
/*Models Import*/
import {
  IAttendView,
  initialIAttendView,
  TITLE_ATTEND_VIEW,
} from '@appModels/store/pendings/charges/attend-review/attend-review.models';
import {attendReviewListReducer} from '@appReducers/pendings/charges/attend-review/attend-review-list/attend-review-list.reducer';
import {attendReviewDetailsReducer} from '@appReducers/pendings/charges/attend-review/attend-review-details/attend-review-details.reducer';
import {attendReviewActions} from '@appActions/pendings/charges/attend-review';

export const attendReviewReducer: ActionReducer<IAttendView> = combineReducers(
  {
    title: createReducer(TITLE_ATTEND_VIEW),
    detailsMode: createReducer(
      initialIAttendView().detailsMode,
      on(attendReviewActions.SET_IS_IN_DETAILS_VIEW, (state, {isInDetailsView}) => isInDetailsView),
    ),
    isInRebillView: createReducer(
      initialIAttendView().isInRebillView,
      on(attendReviewActions.SET_IS_IN_REBILL_VIEW, (state, {isInRebillView}) => isInRebillView),
    ),
    allowedToDetails: createReducer(false),
    attendReviewList: attendReviewListReducer,
    attendReviewDetails: attendReviewDetailsReducer,
  },
  initialIAttendView(),
);
