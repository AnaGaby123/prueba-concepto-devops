import {createSelector} from '@ngrx/store';
import {selectPurchasingManager} from '@appSelectors/pendings/pendings.selectors';

export const selectRegisterConfirmation = createSelector(
  selectPurchasingManager,
  (state) => state.registerConfirmation,
);
export const selectTitle = createSelector(selectRegisterConfirmation, (state) => state.title);
export const selectIsDetails = createSelector(
  selectRegisterConfirmation,
  (state) => state.detailsMode,
);
export const selectAllowToDetails = createSelector(
  selectRegisterConfirmation,
  (state) => state.allowToDetails,
);
export const selectRegisterConfirmationList = createSelector(
  selectRegisterConfirmation,
  (state) => state.registerConfirmationList,
);
export const selectRegisterConfirmationDetails = createSelector(
  selectRegisterConfirmation,
  (state) => state.registerConfirmationDetails,
);
