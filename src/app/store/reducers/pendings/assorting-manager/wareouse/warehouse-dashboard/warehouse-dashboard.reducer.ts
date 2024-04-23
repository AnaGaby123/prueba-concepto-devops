/* Store Imports */
import {ActionReducer, createReducer} from '@ngrx/store';

/* Models Imports */
import {
  initialIWareHouseDashboard,
  IWareHouseDashboard,
} from '@appModels/store/pendings/assorting-manager/warehouse/warehouse-dashboard/warehouse-dashboard.models';

export const warehouseDashboardReducer: ActionReducer<IWareHouseDashboard> = createReducer(
  initialIWareHouseDashboard(),
);
