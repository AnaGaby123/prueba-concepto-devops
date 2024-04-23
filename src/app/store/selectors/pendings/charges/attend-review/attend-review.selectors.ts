import {createSelector} from '@ngrx/store';
import {selectCharges} from '@appSelectors/pendings/pendings.selectors';

export const selectAttendReview = createSelector(selectCharges, (state) => state.attendReview);
export const selectTile = createSelector(selectAttendReview, (state) => state.title);
export const selectIsDetails = createSelector(selectAttendReview, (state) => state.detailsMode);
export const selectAllowedToDetails = createSelector(
  selectAttendReview,
  (state) => state.allowedToDetails,
);
export const selectIsInRebillView = createSelector(
  selectAttendReview,
  (state) => state.isInRebillView,
);
