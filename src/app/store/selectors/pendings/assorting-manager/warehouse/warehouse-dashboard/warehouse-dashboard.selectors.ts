/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectWarehouseDashboard} from '@appSelectors/pendings/assorting-manager/warehouse/warehouse.selectors';

/* Models Imports */
import {IWareHouseDashboard} from '@appModels/store/pendings/assorting-manager/warehouse/warehouse-dashboard/warehouse-dashboard.models';

export const selectTabs = createSelector(
  selectWarehouseDashboard,
  (state: IWareHouseDashboard) => state.tabs,
);
export const selectTabSelected = createSelector(
  selectWarehouseDashboard,
  (state: IWareHouseDashboard) => state.tabSelected,
);
