/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectImports} from '@appSelectors/pendings/pendings.selectors';

/* Models Imports */
import {IImportsState} from '@appModels/store/pendings/imports/imports.models';
import {ILoadMissingState} from '@appModels/store/pendings/imports/load-missing/load-missing.models';

export const selectLoadMissing = createSelector(
  selectImports,
  (state: IImportsState) => state.loadMissing,
);
export const selectTitleLM = createSelector(
  selectLoadMissing,
  (state: ILoadMissingState) => state.title,
);
export const selectIsDetails = createSelector(
  selectLoadMissing,
  (state: ILoadMissingState) => state.detailsMode,
);
export const selectPlanDispatchList = createSelector(
  selectLoadMissing,
  (state: ILoadMissingState) => state.loadMissingList,
);
