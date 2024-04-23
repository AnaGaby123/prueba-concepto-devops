import {createSelector} from '@ngrx/store';
import {selectMaterialReceiver} from '@appSelectors/pendings/pendings.selectors';

export const selectDeclareArrivalGuide = createSelector(
  selectMaterialReceiver,
  (state) => state.declareArrivalGuide,
);
export const selectTitle = createSelector(selectDeclareArrivalGuide, (state) => state.title);
export const selectIsDetails = createSelector(
  selectDeclareArrivalGuide,
  (state) => state.detailsMode,
);
