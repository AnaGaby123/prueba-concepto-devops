/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectWarehouseDetails} from '@appSelectors/pendings/assorting-manager/warehouse/warehouse.selectors';

/* Models Imports */
import {IWareHouseDetails} from '@appModels/store/pendings/assorting-manager/warehouse/warehouse-details/warehouse-details.models';

export const selectSearchTerm = createSelector(
  selectWarehouseDetails,
  (state: IWareHouseDetails) => state.searchTerm,
);
