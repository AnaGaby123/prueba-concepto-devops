/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectDeliveryManager} from '@appSelectors/pendings/pendings.selectors';

export const selectAssignMessenger = createSelector(
  selectDeliveryManager,
  (state) => state.assignMessenger,
);
export const selectTitle = createSelector(selectAssignMessenger, (state) => state.title);
export const selectAssignMessengerCharts = createSelector(
  selectAssignMessenger,
  (state) => state.assignMessengerCharts,
);
export const selectAssignMessengerDetails = createSelector(
  selectAssignMessenger,
  (state) => state.assignMessengerDetails,
);
export const selectIsInDetailsView = createSelector(
  selectAssignMessenger,
  (state) => state.detailsMode,
);
export const selectAllowedToDetails = createSelector(
  selectAssignMessenger,
  (state) => state.allowToDetails,
);
