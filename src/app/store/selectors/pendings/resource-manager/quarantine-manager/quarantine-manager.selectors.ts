/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectResourceManager} from '@appSelectors/pendings/pendings.selectors';

export const selectQuarantineManager = createSelector(
  selectResourceManager,
  (state) => state.quarantineManager,
);
export const selectTitle = createSelector(selectQuarantineManager, (state) => state.title);
export const selectQuarantineManagerList = createSelector(
  selectQuarantineManager,
  (state) => state.quarantineManagerList,
);
export const selectQuarantineManagerDetails = createSelector(
  selectQuarantineManager,
  (state) => state.quarantineManagerDetails,
);
export const selectIsInDetailsView = createSelector(
  selectQuarantineManager,
  (state) => state.detailsMode,
);
export const selectAllowedToDetails = createSelector(
  selectQuarantineManager,
  (state) => state.allowToDetails,
);
