/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectImports} from '@appSelectors/pendings/pendings.selectors';

/* Models Imports */
import {IImportsState} from '@appModels/store/pendings/imports/imports.models';
import {IPlanDispatchState} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch.models';

export const selectPlanDispatch = createSelector(
  selectImports,
  (state: IImportsState) => state.planDispatch,
);
export const selectTitlePD = createSelector(
  selectPlanDispatch,
  (state: IPlanDispatchState) => state.title,
);
export const selectIsDetails = createSelector(
  selectPlanDispatch,
  (state: IPlanDispatchState) => state.detailsMode,
);
export const selectAllowedToDetails = createSelector(
  selectPlanDispatch,
  (state: IPlanDispatchState) => state.allowedToDetails,
);
export const selectIsSteps = createSelector(
  selectPlanDispatch,
  (state: IPlanDispatchState) => state.stepsMode,
);
export const selectAllowedToSteps = createSelector(
  selectPlanDispatch,
  (state: IPlanDispatchState) => state.allowedToSteps,
);
export const selectAllowedToStepsComplete = createSelector(
  selectPlanDispatch,
  (state: IPlanDispatchState) => state.allowedToSteps && state.allowedToDetails,
);
export const selectPlanDispatchList = createSelector(
  selectPlanDispatch,
  (state: IPlanDispatchState) => state.planDispatchList,
);
export const selectPlanDispatchDetails = createSelector(
  selectPlanDispatch,
  (state: IPlanDispatchState) => state.planDispatchDetails,
);
