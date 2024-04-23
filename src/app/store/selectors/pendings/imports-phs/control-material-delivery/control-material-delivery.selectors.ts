import {createSelector} from '@ngrx/store';
import {selectImportsPhs} from '@appSelectors/pendings/pendings.selectors';

export const selectControlMaterialDelivery = createSelector(
  selectImportsPhs,
  (state) => state.controlMaterialDelivery,
);
export const selectTitle = createSelector(selectControlMaterialDelivery, (state) => state.title);
export const selectIsDetails = createSelector(
  selectControlMaterialDelivery,
  (state) => state.detailsMode,
);
