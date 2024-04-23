import {createSelector} from '@ngrx/store';
import {selectValidateAdjustment} from '@appSelectors/pendings/pendings.selectors';
import {ValidateAdjustmentState} from '@appModels/store/pendings/validate-adjustment/validate-adjustment.models';

export const selectValidateAdjustmentNode = createSelector(
  selectValidateAdjustment,
  (state: ValidateAdjustmentState) => state,
);
export const selectTitle = createSelector(
  selectValidateAdjustmentNode,
  (state: ValidateAdjustmentState) => state.title,
);
export const selectIsInDetailsView = createSelector(
  selectValidateAdjustmentNode,
  (state: ValidateAdjustmentState) => state.isInDetailsView,
);
export const selectAllowedToDetails = createSelector(
  selectValidateAdjustmentNode,
  (state: ValidateAdjustmentState) => state.allowedToDetails,
);
