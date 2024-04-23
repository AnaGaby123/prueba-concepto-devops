import {createSelector} from '@ngrx/store';
import {selectPurchasingManager} from '@appSelectors/pendings/pendings.selectors';

export const selectDeclareArrival = createSelector(
  selectPurchasingManager,
  (state) => state.declareArrival,
);
export const selectTitle = createSelector(selectDeclareArrival, (state) => state.title);
export const selectIsDetails = createSelector(selectDeclareArrival, (state) => state.detailsMode);
export const selectAllowToDetails = createSelector(
  selectDeclareArrival,
  (state) => state.allowToDetails,
);
export const selectDeclareArrivalList = createSelector(
  selectDeclareArrival,
  (state) => state.declareArrivalList,
);
export const selectDeclareArrivalDetails = createSelector(
  selectDeclareArrival,
  (state) => state.declareArrivalDetails,
);
