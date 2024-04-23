import {createSelector} from '@ngrx/store';
import {selectPurchasingManager} from '@appSelectors/pendings/pendings.selectors';
import {IPurchasingManagerState} from '@appModels/store/pendings/purchasing-manager/purchasing-manager.models';
import {IPlanCollection} from '@appModels/store/pendings/purchasing-manager/plan-collection/plan-collection.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const selectPlanCollection = createSelector(
  selectPurchasingManager,
  (state: IPurchasingManagerState): IPlanCollection => state.planCollection,
);
export const selectTabsOptions = createSelector(
  selectPlanCollection,
  (state: IPlanCollection): Array<ITabOption> => state.tabOptions,
);
export const selectIsDetails = createSelector(
  selectPlanCollection,
  (state: IPlanCollection): boolean => state.detailsMode,
);
export const selectFilterByValue = createSelector(
  selectPlanCollection,
  (state: IPlanCollection): Array<DropListOption> => state?.filterByValue,
);
export const selectFilterBySearch = createSelector(
  selectPlanCollection,
  (state: IPlanCollection): Array<DropListOption> => state?.filterBySearch,
);
export const selectedFilterByValue = createSelector(
  selectPlanCollection,
  (state: IPlanCollection): DropListOption => state?.selectedByValue,
);
export const selectedFilterBySearch = createSelector(
  selectPlanCollection,
  (state: IPlanCollection): DropListOption => state?.selectedBySearch,
);
