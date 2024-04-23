import {createSelector} from '@ngrx/store';
import {selectPurchasingManager} from '@appSelectors/pendings/pendings.selectors';

export const selectManageBackOrder = createSelector(
  selectPurchasingManager,
  (state) => state.manageBackOrder,
);
export const selectTitle = createSelector(selectManageBackOrder, (state) => state.title);
export const selectIsDetails = createSelector(selectManageBackOrder, (state) => state.detailsMode);
export const selectDataList = createSelector(selectManageBackOrder, (state) => state.backOrderList);
export const selectDataDetails = createSelector(
  selectManageBackOrder,
  (state) => state.backOrderDetails,
);
