/* Store Imports */
import {ActionReducer, createReducer} from '@ngrx/store';

/* Models Imports */
import {
  initialIWareHouseDetails,
  IWareHouseDetails,
} from '@appModels/store/pendings/assorting-manager/warehouse/warehouse-details/warehouse-details.models';

export const warehouseDetailsReducer: ActionReducer<IWareHouseDetails> = createReducer(
  initialIWareHouseDetails(),
);
