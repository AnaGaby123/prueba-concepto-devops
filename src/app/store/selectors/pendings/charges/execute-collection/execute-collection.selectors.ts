import {createSelector} from '@ngrx/store';
import {selectCharges} from '@appSelectors/pendings/pendings.selectors';
import {IChargesState} from '@appModels/store/pendings/charges/charges.models';
import {IExecuteCollection} from '@appModels/store/pendings/charges/execute-collection/execute-collection.models';

export const selectExecuteCollection = createSelector(
  selectCharges,
  (state: IChargesState) => state.executeCollection,
);

export const selectTile = createSelector(
  selectExecuteCollection,
  (state: IExecuteCollection): string => state.title,
);
export const selectIsDetails = createSelector(
  selectExecuteCollection,
  (state: IExecuteCollection): boolean => state.detailsMode,
);
export const selectAllowedToDetails = createSelector(
  selectExecuteCollection,
  (state: IExecuteCollection): boolean => state.allowedToDetails,
);
export const selectExecuteCollectionCalendar = createSelector(
  selectExecuteCollection,
  (state: IExecuteCollection) => state.executeCollectionCalendar,
);
export const selectExecuteCollectionDetails = createSelector(
  selectExecuteCollection,
  (state: IExecuteCollection) => state.executeCollectionDetails,
);
export const selectIsInRebillView = createSelector(
  selectExecuteCollection,
  (state: IExecuteCollection) => state.isInRebillView,
);
