/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectAssortingManager} from '@appSelectors/pendings/pendings.selectors';

/* Models Imports */
import {IAssortingManager} from '@appModels/store/pendings/assorting-manager/assorting-manager.models';
import {IWarehouse} from '@appModels/store/pendings/assorting-manager/warehouse/warehouse.models';

export const selectWarehouse = createSelector(
  selectAssortingManager,
  (state: IAssortingManager) => state.warehouse,
);
export const selectTitle = createSelector(selectWarehouse, (state: IWarehouse) => state.title);
export const selectIsInDetails = createSelector(
  selectWarehouse,
  (state: IWarehouse) => state.detailsMode,
);
export const selectAllowedToDetails = createSelector(
  selectWarehouse,
  (state: IWarehouse) => state.allowToDetails,
);
export const selectWarehouseDashboard = createSelector(
  selectWarehouse,
  (state: IWarehouse) => state.warehouseDashboard,
);
export const selectWarehouseDetails = createSelector(
  selectWarehouse,
  (state: IWarehouse) => state.warehouseDetails,
);
