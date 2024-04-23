import {createSelector} from '@ngrx/store';
import {selectPreProcessingState} from '@appSelectors/pendings/pendings.selectors';
import {IPreProcessingState} from '@appModels/store/pre-processing/pre-processing.models';
import {IPreprocessOrderDetails} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';

export const selectPreProcessing = createSelector(selectPreProcessingState, (state) => state);

export const selectTitle = createSelector(selectPreProcessing, (state) => state.title);
export const selectDetailsMode = createSelector(selectPreProcessing, (state) => state.detailsMode);
export const selectPreprocessOrderDashboard = createSelector(
  selectPreProcessing,
  (state) => state.preprocessOrderDashboard,
);

export const selectPreprocessOrder = createSelector(
  selectPreProcessing,
  (state: IPreProcessingState): IPreprocessOrderDetails => state.preProcessOrderDetails,
);
export const selectIsPreProcessDetailsComponent = createSelector(
  selectPreProcessing,
  (state: IPreProcessingState) => state.preProcessDetailsComponent,
);
