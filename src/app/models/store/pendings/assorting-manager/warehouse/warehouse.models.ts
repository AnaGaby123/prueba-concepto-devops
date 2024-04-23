/* Models Imports */
import {
  initialIWareHouseDashboard,
  IWareHouseDashboard,
} from '@appModels/store/pendings/assorting-manager/warehouse/warehouse-dashboard/warehouse-dashboard.models';
import {
  initialIWareHouseDetails,
  IWareHouseDetails,
} from '@appModels/store/pendings/assorting-manager/warehouse/warehouse-details/warehouse-details.models';

export const TITLE_WAREHOUSE = 'TRABAJAR RUTA ALMACÉN';

export interface IWarehouse {
  title: string;
  detailsMode: boolean;
  allowToDetails: boolean;
  warehouseDashboard: IWareHouseDashboard;
  warehouseDetails: IWareHouseDetails;
}

export const initialIWarehouse = (): IWarehouse => ({
  title: TITLE_WAREHOUSE,
  detailsMode: false,
  allowToDetails: false,
  warehouseDashboard: initialIWareHouseDashboard(),
  warehouseDetails: initialIWareHouseDetails(),
});
