/* Store Imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialIWarehouse,
  IWarehouse,
  TITLE_WAREHOUSE,
} from '@appModels/store/pendings/assorting-manager/warehouse/warehouse.models';

/* Reducers Imports */
import {warehouseDetailsReducer} from '@appReducers/pendings/assorting-manager/wareouse/warehouse-details/warehouse-details.reducer';
import {warehouseDashboardReducer} from '@appReducers/pendings/assorting-manager/wareouse/warehouse-dashboard/warehouse-dashboard.reducer';

/* Actions Imports */
import {warehouseActions} from '@appActions/pendings/assorting-manager/warehouse';

export const warehouseReducer: ActionReducer<IWarehouse> = combineReducers({
  title: createReducer(TITLE_WAREHOUSE),
  detailsMode: createReducer(
    initialIWarehouse().detailsMode,
    on(warehouseActions.SET_IS_IN_DETAILS_VIEW, (state, {detailsMode}) => detailsMode),
  ),
  allowToDetails: createReducer(
    initialIWarehouse().allowToDetails,
    on(warehouseActions.SET_ALLOWED_TO_DETAILS, (state, {allowToDetails}) => allowToDetails),
  ),
  warehouseDashboard: warehouseDashboardReducer,
  warehouseDetails: warehouseDetailsReducer,
});
