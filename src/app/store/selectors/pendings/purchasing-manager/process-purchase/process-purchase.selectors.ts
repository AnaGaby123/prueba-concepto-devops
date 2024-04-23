import {createSelector} from '@ngrx/store';
import {selectPurchasingManager} from '@appSelectors/pendings/pendings.selectors';

export const selectProcessPurchase = createSelector(
  selectPurchasingManager,
  (state) => state.processPurchase,
);
export const selectTitlePP = createSelector(selectProcessPurchase, (state) => state.title);
export const selectIsDetails = createSelector(selectProcessPurchase, (state) => state.detailsMode);
export const selectProcessPurchaseList = createSelector(
  selectProcessPurchase,
  (state) => state.processPurchaseList,
);
export const selectProcessPurchaseDetails = createSelector(
  selectProcessPurchase,
  (state) => state.processPurchaseDetails,
);
