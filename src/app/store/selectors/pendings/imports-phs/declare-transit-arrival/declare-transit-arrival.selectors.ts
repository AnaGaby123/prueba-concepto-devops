import {createSelector} from '@ngrx/store';
import {selectImportsPhs} from '@appSelectors/pendings/pendings.selectors';
import {IImportsPhsState} from '@appModels/store/pendings/imports-phs/imports-phs.models';

export const selectDeclareTransitArrival = createSelector(
  selectImportsPhs,
  (state: IImportsPhsState) => state.declareTransitArrival,
);
export const selectTitle = createSelector(selectDeclareTransitArrival, (state) => state.title);
export const selectDeclareTransitArrivalList = createSelector(
  selectDeclareTransitArrival,
  (state) => state.declareTransitArrivalList,
);
export const selectDeclareTransitArrivalDetails = createSelector(
  selectDeclareTransitArrival,
  (state) => state.declareTransitArrivalDetails,
);
export const selectIsInDetailsView = createSelector(
  selectDeclareTransitArrival,
  (state) => state.isInDetailsView,
);
export const selectAllowedToDetails = createSelector(
  selectDeclareTransitArrival,
  (state) => state.allowedToDetails,
);
