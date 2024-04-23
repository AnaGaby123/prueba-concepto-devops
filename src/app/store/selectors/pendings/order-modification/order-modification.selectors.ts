import {createSelector} from '@ngrx/store';
import {selectOrderModificationS} from '@appSelectors/pendings/pendings.selectors';

export const selectOrderModification = createSelector(selectOrderModificationS, (state) => state);
export const selectTitle = createSelector(selectOrderModification, (state) => state.title);
export const selectIsDetails = createSelector(
  selectOrderModification,
  (state) => state.isInDetailsView,
);
export const selectAllowedToDetails = createSelector(
  selectOrderModification,
  (state) => state.allowedToDetails,
);
export const selectOrderModificationL = createSelector(
  selectOrderModification,
  (state) => state.orderModificationList,
);
